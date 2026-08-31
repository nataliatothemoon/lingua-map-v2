import { NextResponse } from "next/server";
import { enforceRateLimit, jsonError, parseImagePayload } from "@/lib/api";
import { getOpenAI, VISION_MODEL } from "@/lib/openai";
import { DISCLAIMER, KNOWLEDGE_PROMPT_BLOCK } from "@/lib/tcm/tongue-knowledge";
import type { QualityResult } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const limited = enforceRateLimit(request);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body");
  }

  const imageDataUrl = parseImagePayload(body);
  if (!imageDataUrl) {
    return jsonError("Provide a valid imageDataUrl (data:image/...;base64,...)");
  }

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: VISION_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `${KNOWLEDGE_PROMPT_BLOCK}

You are a photo quality gate for tongue inspection images.
Return ONLY JSON with this shape:
{
  "clear": boolean,
  "isTongue": boolean,
  "issues": string[],
  "retakeTips": string[]
}

Mark clear=true only if: a human tongue is clearly visible, reasonably sharp, adequately lit, mostly fills the frame, front-facing-ish, and coating/body color can be assessed.
If not a tongue, set isTongue=false and clear=false.
retakeTips must be concrete (lighting, extend tongue fully, no food dye, remove filters, hold steady, fill frame, neutral background).
Disclaimer context: ${DISCLAIMER}`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Assess whether this image is suitable for educational TCM tongue inspection." },
            { type: "image_url", image_url: { url: imageDataUrl } },
          ],
        },
      ],
      temperature: 0.2,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw) as Partial<QualityResult>;
    const isTongue = parsed.isTongue !== false && Boolean(parsed.isTongue ?? true);
    const clear = Boolean(parsed.clear) && isTongue && parsed.isTongue !== false;

    const result: QualityResult = {
      clear,
      isTongue: parsed.isTongue === false ? false : isTongue,
      issues: Array.isArray(parsed.issues) ? parsed.issues.map(String) : [],
      retakeTips: Array.isArray(parsed.retakeTips) ? parsed.retakeTips.map(String) : [],
    };

    if (parsed.isTongue === false) {
      result.isTongue = false;
      result.clear = false;
      if (!result.issues.length) result.issues.push("No clear tongue detected in the image.");
    }

    if (!result.clear && !result.retakeTips.length) {
      result.retakeTips.push(
        "Open your mouth and fully extend your tongue toward the camera.",
        "Use bright, even daylight or a lamp in front of you (avoid strong backlight).",
        "Fill most of the frame with the tongue; keep the camera steady and skip filters.",
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Quality analysis failed";
    const status = message.includes("OPENAI_API_KEY") ? 500 : 502;
    return jsonError(message, status);
  }
}
