import { NextResponse } from "next/server";
import { enforceRateLimit, jsonError, parseImagePayload } from "@/lib/api";
import { getOpenAI, VISION_MODEL } from "@/lib/openai";
import {
  DISCLAIMER,
  FEATURE_MAPPINGS,
  KNOWLEDGE_PROMPT_BLOCK,
  SOURCE_ATTRIBUTIONS,
} from "@/lib/tcm/tongue-knowledge";
import type { FollowUpQuestion, TongueAnalysis, TongueFeatures } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

function normalizeFeatures(raw: Partial<TongueFeatures> | undefined): TongueFeatures {
  return {
    bodyColor: String(raw?.bodyColor || "uncertain"),
    coating: {
      color: String(raw?.coating?.color || "uncertain"),
      thickness: String(raw?.coating?.thickness || "uncertain"),
      distribution: String(raw?.coating?.distribution || "uncertain"),
    },
    shape: Array.isArray(raw?.shape) ? raw!.shape.map(String) : [],
    moisture: String(raw?.moisture || "uncertain"),
    zones: {
      tip: String(raw?.zones?.tip || "not clearly assessable"),
      center: String(raw?.zones?.center || "not clearly assessable"),
      sides: String(raw?.zones?.sides || "not clearly assessable"),
      root: String(raw?.zones?.root || "not clearly assessable"),
    },
    notableSigns: Array.isArray(raw?.notableSigns) ? raw!.notableSigns.map(String) : [],
  };
}

function normalizeQuestions(raw: unknown): FollowUpQuestion[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 6)
    .map((item, index) => {
      const q = item as Partial<FollowUpQuestion>;
      const options = Array.isArray(q.options) ? q.options.map(String).slice(0, 5) : ["Yes", "Somewhat", "No"];
      return {
        id: String(q.id || `q${index + 1}`),
        question: String(q.question || "Any related symptoms recently?"),
        why: String(q.why || "Clarifies pattern differentiation from tongue signs."),
        options: options.length ? options : ["Yes", "Somewhat", "No"],
      };
    })
    .filter((q) => q.question.length > 0);
}

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
    const mappingHints = FEATURE_MAPPINGS.map(
      (m) => `- Signs: ${m.signs.join(", ")} → patterns: ${m.patterns.join("; ")}; follow-ups: ${m.followUpThemes.join(", ")} [${m.citations.join("; ")}]`,
    ).join("\n");

    const completion = await openai.chat.completions.create({
      model: VISION_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `${KNOWLEDGE_PROMPT_BLOCK}

Extract educational tongue features and generate adaptive lifestyle/symptom follow-up questions.
Return ONLY JSON:
{
  "features": {
    "bodyColor": string,
    "coating": { "color": string, "thickness": string, "distribution": string },
    "shape": string[],
    "moisture": string,
    "zones": { "tip": string, "center": string, "sides": string, "root": string },
    "notableSigns": string[]
  },
  "followUpQuestions": [
    { "id": string, "question": string, "why": string, "options": string[] }
  ]
}

Rules:
- Provide 3 to 6 followUpQuestions tightly based on observed tongue signs (sleep, diet, digestion, cold/heat, fluids, stress, activity).
- Each question needs short multiple-choice options.
- Do not diagnose yet; extraction + questions only.
- Sources for grounding: ${SOURCE_ATTRIBUTIONS.join(" | ")}
Feature mapping hints:
${mappingHints}
Disclaimer: ${DISCLAIMER}`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this tongue photo for educational TCM-inspired feature extraction and follow-up questions." },
            { type: "image_url", image_url: { url: imageDataUrl } },
          ],
        },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw) as Partial<TongueAnalysis>;
    const analysis: TongueAnalysis = {
      features: normalizeFeatures(parsed.features),
      followUpQuestions: normalizeQuestions(parsed.followUpQuestions),
    };

    if (analysis.followUpQuestions.length < 3) {
      analysis.followUpQuestions = [
        ...analysis.followUpQuestions,
        {
          id: "sleep",
          question: "How has your sleep been over the past week?",
          why: "Tongue tip and yin/heat signs are often clarified by sleep quality.",
          options: ["Poor / restless", "Mixed", "Mostly restorative"],
        },
        {
          id: "digestion",
          question: "How is your digestion after meals?",
          why: "Center coating and tooth marks often relate to Spleen/Stomach function.",
          options: ["Bloating or heaviness", "Variable", "Comfortable"],
        },
        {
          id: "coldheat",
          question: "Do you tend to feel cold or warm in daily life?",
          why: "Body color and moisture help differentiate cold vs heat presentations.",
          options: ["Often cold", "Neutral", "Often warm"],
        },
      ].slice(0, 6);
    }

    return NextResponse.json(analysis);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Tongue analysis failed";
    const status = message.includes("OPENAI_API_KEY") ? 500 : 502;
    return jsonError(message, status);
  }
}
