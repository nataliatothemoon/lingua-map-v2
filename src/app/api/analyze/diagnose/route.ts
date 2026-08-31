import { NextResponse } from "next/server";
import { enforceRateLimit, jsonError } from "@/lib/api";
import { getOpenAI, VISION_MODEL } from "@/lib/openai";
import {
  DISCLAIMER,
  FEATURE_MAPPINGS,
  KNOWLEDGE_PROMPT_BLOCK,
  SOURCE_ATTRIBUTIONS,
} from "@/lib/tcm/tongue-knowledge";
import type {
  Confidence,
  DiagnosisReport,
  IntakeAnswers,
  PatternFinding,
  TongueFeatures,
} from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

function normalizePatterns(raw: unknown): PatternFinding[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 5).map((item) => {
    const p = item as Partial<PatternFinding>;
    const confidence = (["low", "medium", "high"].includes(String(p.confidence))
      ? p.confidence
      : "low") as Confidence;
    return {
      name: String(p.name || "Uncertain pattern"),
      confidence,
      rationale: String(p.rationale || ""),
      citations: Array.isArray(p.citations) ? p.citations.map(String) : [],
    };
  });
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

  const payload = body as {
    features?: TongueFeatures;
    intake?: IntakeAnswers;
    followUpAnswers?: Record<string, string>;
  };

  if (!payload.features || !payload.intake) {
    return jsonError("features and intake are required");
  }

  try {
    const openai = getOpenAI();
    const mappingHints = FEATURE_MAPPINGS.map(
      (m) => `- ${m.signs.join(", ")} → ${m.patterns.join("; ")} [${m.citations.join("; ")}]`,
    ).join("\n");

    const completion = await openai.chat.completions.create({
      model: VISION_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `${KNOWLEDGE_PROMPT_BLOCK}

Synthesize an educational TCM-inspired tongue + inquiry report.
Return ONLY JSON:
{
  "features": <echo refined features object>,
  "patterns": [{ "name": string, "confidence": "low"|"medium"|"high", "rationale": string, "citations": string[] }],
  "lifestyleSuggestions": string[],
  "limitations": string[],
  "summary": string,
  "disclaimer": string
}

Rules:
- 1 to 4 patterns max; prefer fewer high-quality suggestions.
- lifestyleSuggestions: gentle, non-prescriptive (sleep, meals, warmth/cool balance, hydration, stress hygiene). NO herbs, supplements dosing, acupuncture points, or drugs.
- If tongue and intake conflict, lower confidence and explain in limitations.
- citations must be short source labels from reputable TCM teaching references (not URLs required).
- disclaimer must include that this is not medical/TCM clinical diagnosis.
Sources: ${SOURCE_ATTRIBUTIONS.join(" | ")}
Mapping hints:
${mappingHints}
Canonical disclaimer: ${DISCLAIMER}`,
        },
        {
          role: "user",
          content: JSON.stringify({
            features: payload.features,
            intake: payload.intake,
            followUpAnswers: payload.followUpAnswers || {},
          }),
        },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw) as Partial<DiagnosisReport>;

    const report: DiagnosisReport = {
      features: payload.features,
      patterns: normalizePatterns(parsed.patterns),
      lifestyleSuggestions: Array.isArray(parsed.lifestyleSuggestions)
        ? parsed.lifestyleSuggestions.map(String).slice(0, 8)
        : [],
      limitations: Array.isArray(parsed.limitations)
        ? parsed.limitations.map(String).slice(0, 8)
        : ["Tongue photos and questionnaires cannot replace in-person pulse and full clinical intake."],
      summary: String(parsed.summary || "Educational tongue map summary based on photo and intake."),
      disclaimer: String(parsed.disclaimer || DISCLAIMER),
    };

    if (!report.patterns.length) {
      report.patterns = [
        {
          name: "Insufficient certainty for a clear pattern suggestion",
          confidence: "low",
          rationale:
            "Visible signs and intake answers did not converge strongly enough for a confident educational pattern label.",
          citations: ["Standard TCM teaching — pattern differentiation requires multi-method inquiry"],
        },
      ];
    }

    return NextResponse.json(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Diagnosis synthesis failed";
    const status = message.includes("OPENAI_API_KEY") ? 500 : 502;
    return jsonError(message, status);
  }
}
