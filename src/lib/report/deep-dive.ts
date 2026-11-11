import { arr, enm, obj, str, structuredCall } from "@/lib/report/structured";
import { REPORT_STYLE_PROMPT } from "@/lib/report/style";
import type { Synthesis, SynthesizedPattern } from "@/lib/report/synthesis";
import { BODY_GEOGRAPHY, findPattern, type PatternEntry } from "@/lib/tcm/patterns";
import { ACUPUNCTURE_POINTS, HERBAL_FORMULAS, type TreatmentEntry } from "@/lib/tcm/treatments";
import type { PatternDeepDive, TraditionalTreatment } from "@/lib/types";

type DeepDiveOutput = Omit<
  PatternDeepDive,
  "patternId" | "name" | "role" | "confidence" | "traditionalTreatments" | "citations" | "isFallback"
> & {
  traditionalTreatments: { key: string; whyForYou: string }[];
};

function allowedTreatments(entry: PatternEntry) {
  const map = new Map<string, TraditionalTreatment & Pick<TreatmentEntry, "caution">>();
  for (const key of entry.points) {
    const p = ACUPUNCTURE_POINTS[key];
    map.set(key, { kind: "acupuncture", name: p.name, traditionalUse: p.traditionalUse, whyForYou: "", caution: "caution" in p ? p.caution : undefined });
  }
  for (const key of entry.formulas) {
    const f = HERBAL_FORMULAS[key];
    map.set(key, { kind: "herbal", name: f.name, traditionalUse: f.traditionalUse, whyForYou: "", caution: "caution" in f ? f.caution : undefined });
  }
  return map;
}

function buildSchema(allowedKeys: string[]) {
  return obj({
    plainLanguageSummary: str("Two short paragraphs: what this pattern is, in plain words"),
    yourEvidence: arr(
      obj({ source: enm(["tongue", "intake", "followup"]), detail: str("The user's own sign or answer, quoted or paraphrased") }),
      "Three to six items",
    ),
    mechanism: str("Three or four paragraphs: the cause-and-effect story in TCM terms, using a memorable image"),
    howYourTongueShowsIt: arr(obj({ zone: str("tip, center, sides, root, or whole tongue"), sign: str(), explanation: str() })),
    bodyGeography: arr(
      obj({ area: str(), system: str("Organ system or channel"), explanation: str() }),
      "Areas of the body or tongue linked to this pattern for this user",
    ),
    whyItFeelsThisWay: str("Explain the felt experience and what it rules in or out"),
    whyItDevelops: arr(str(), "General contributors, personalized where the answers allow"),
    dailyLifeConsiderations: arr(
      obj({
        theme: str("A short, memorable heading, e.g. 'Break the thermal shock cycle'"),
        actions: arr(obj({ action: str("Concrete action with examples"), why: str("Why it helps, in TCM terms") })),
      }),
      "Two to four themes",
    ),
    foodTherapy: arr(obj({ food: str(), why: str() }), "Four to six foods or food habits"),
    traditionalTreatments: arr(
      obj({ key: enm(allowedKeys), whyForYou: str("Why a practitioner might consider this given the user's evidence") }),
      "Two to five items from the allowed list",
    ),
    whatToObserve: arr(str(), "Three to five things to notice over the coming weeks"),
    goDeeper: arr(
      obj({
        title: str("Phrased as a curious reader's question"),
        body: str("Two to four paragraphs exploring it in depth"),
      }),
      "Two or three rabbit-hole topics",
    ),
  });
}

export async function runDeepDive(
  pattern: SynthesizedPattern,
  synthesis: Synthesis,
  userInput: string,
): Promise<PatternDeepDive> {
  const entry = findPattern(pattern.patternId);
  if (!entry) return genericFallback(pattern);

  const allowed = allowedTreatments(entry);
  const others = synthesis.patterns
    .filter((p) => p.patternId !== pattern.patternId)
    .map((p) => `${p.displayName} (${p.role})`)
    .join(", ");

  try {
    const raw = await structuredCall<DeepDiveOutput>({
      name: "pattern_deep_dive",
      schema: buildSchema([...allowed.keys()]),
      maxTokens: 6000,
      system: `${REPORT_STYLE_PROMPT}

Stage 2 of 2: write the deep dive for ONE pattern. The pattern set is already decided; do not introduce new patterns or contradict the roles below.

This pattern: ${pattern.displayName} — role: ${pattern.role}, confidence: ${pattern.confidence}.
Why it was chosen: ${pattern.rationale}
Other patterns in this report: ${others || "none"}.
Core story of the report: ${synthesis.coreStory.title} — ${synthesis.coreStory.body}

Curated reference for this pattern (personalize it; don't contradict it):
- Explanation: ${entry.explanation}
- Typical tongue: ${entry.tongueSigns.join("; ")}
- Associated signs: ${entry.associatedSigns.join("; ")}
- Contributors: ${entry.contributors.join("; ")}
- Foods: ${entry.foods.map((f) => `${f.food} (${f.why})`).join("; ")}

Body geography reference:
${BODY_GEOGRAPHY.map((g) => `- ${g.area} → ${g.system}`).join("\n")}

Traditional treatments you may reference (keys only; education only, no doses or preparation):
${[...allowed.entries()].map(([key, t]) => `- ${key}: ${t.name} — ${t.traditionalUse}`).join("\n")}`,
      user: userInput,
    });

    const treatments = (raw.traditionalTreatments || [])
      .filter((t) => allowed.has(t.key))
      .map((t) => ({ ...allowed.get(t.key)!, whyForYou: t.whyForYou }));

    return {
      ...raw,
      patternId: entry.id,
      name: pattern.displayName,
      role: pattern.role,
      confidence: pattern.confidence,
      traditionalTreatments: treatments,
      citations: entry.citations,
      isFallback: false,
    };
  } catch {
    return curatedFallback(pattern, entry);
  }
}

function curatedFallback(pattern: SynthesizedPattern, entry: PatternEntry): PatternDeepDive {
  return {
    patternId: entry.id,
    name: pattern.displayName,
    role: pattern.role,
    confidence: pattern.confidence,
    plainLanguageSummary: entry.explanation,
    yourEvidence: [{ source: "tongue", detail: pattern.rationale }],
    mechanism: entry.explanation,
    howYourTongueShowsIt: entry.tongueSigns.map((sign) => ({ zone: "whole tongue", sign, explanation: "A typical tongue sign for this pattern." })),
    bodyGeography: [],
    whyItFeelsThisWay: `Common experiences with this pattern include ${entry.associatedSigns.join(", ")}.`,
    whyItDevelops: entry.contributors,
    dailyLifeConsiderations: [],
    foodTherapy: entry.foods,
    traditionalTreatments: [...allowedTreatments(entry).values()].map((t) => ({
      ...t,
      whyForYou: "Commonly taught for this pattern.",
    })),
    whatToObserve: entry.associatedSigns.map((s) => `Notice whether you experience ${s}.`),
    goDeeper: [],
    citations: entry.citations,
    isFallback: true,
  };
}

function genericFallback(pattern: SynthesizedPattern): PatternDeepDive {
  return {
    patternId: pattern.patternId,
    name: pattern.displayName,
    role: pattern.role,
    confidence: pattern.confidence,
    plainLanguageSummary: pattern.rationale,
    yourEvidence: [],
    mechanism: pattern.rationale,
    howYourTongueShowsIt: [],
    bodyGeography: [],
    whyItFeelsThisWay: "",
    whyItDevelops: [],
    dailyLifeConsiderations: [],
    foodTherapy: [],
    traditionalTreatments: [],
    whatToObserve: [],
    goDeeper: [],
    citations: [],
    isFallback: true,
  };
}
