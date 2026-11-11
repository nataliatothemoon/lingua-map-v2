import { NextResponse } from "next/server";
import { enforceRateLimit, jsonError } from "@/lib/api";
import { runDeepDive } from "@/lib/report/deep-dive";
import { runSynthesis } from "@/lib/report/synthesis";
import { GLOSSARY, RED_FLAGS } from "@/lib/tcm/patterns";
import { DISCLAIMER } from "@/lib/tcm/tongue-knowledge";
import type {
  DetailedReport,
  DiagnosisReport,
  FollowUpQuestion,
  IntakeAnswers,
  TongueFeatures,
} from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

function glossaryFor(report: Omit<DetailedReport, "glossary">) {
  const text = JSON.stringify(report).toLowerCase();
  return GLOSSARY.filter((g) => new RegExp(`\\b${g.term.toLowerCase()}\\b`).test(text));
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
    followUpQuestions?: FollowUpQuestion[];
  };

  if (!payload.features || !payload.intake) {
    return jsonError("features and intake are required");
  }

  const answers = payload.followUpAnswers || {};
  const followUps = (payload.followUpQuestions || []).map((q) => ({
    question: q.question,
    answer: answers[q.id] ?? "not answered",
  }));

  const userInput = JSON.stringify({
    tongueFeatures: payload.features,
    intake: payload.intake,
    followUps: followUps.length ? followUps : answers,
  });

  try {
    const synthesis = await runSynthesis(userInput);
    if (!synthesis.patterns.length) {
      return jsonError("We couldn't identify a clear pattern from this photo and these answers. Please try again.", 422);
    }

    const deepDives = await Promise.all(
      synthesis.patterns.map((pattern) => runDeepDive(pattern, synthesis, userInput)),
    );

    const detailedWithoutGlossary = {
      summaryCard: synthesis.summaryCard,
      coreStory: synthesis.coreStory,
      featureDifferentials: synthesis.featureDifferentials,
      deepDives,
      howPatternsRelate: synthesis.howPatternsRelate,
      setAside: synthesis.setAside,
      rootAndBranchPlan: synthesis.rootAndBranchPlan,
      redFlags: RED_FLAGS,
    };

    const report: DiagnosisReport = {
      features: payload.features,
      patterns: synthesis.patterns.map((p, i) => ({
        name: p.displayName,
        confidence: p.confidence,
        rationale: p.rationale,
        citations: deepDives[i]?.citations ?? [],
      })),
      lifestyleSuggestions: synthesis.summaryCard.topActions,
      limitations: synthesis.limitations.length
        ? synthesis.limitations
        : ["Tongue photos and questionnaires cannot replace in-person pulse and full clinical intake."],
      summary: synthesis.summaryCard.coreImbalance,
      disclaimer: DISCLAIMER,
      detailed: { ...detailedWithoutGlossary, glossary: glossaryFor(detailedWithoutGlossary) },
    };

    return NextResponse.json(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Diagnosis synthesis failed";
    const status = message.includes("OPENAI_API_KEY") ? 500 : 502;
    return jsonError(message, status);
  }
}
