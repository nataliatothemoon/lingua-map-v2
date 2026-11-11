import { arr, enm, obj, str, structuredCall } from "@/lib/report/structured";
import { REPORT_STYLE_PROMPT } from "@/lib/report/style";
import { findPattern, PATTERN_IDS, PATTERNS } from "@/lib/tcm/patterns";
import type { Confidence, FeatureDifferential, PatternRole } from "@/lib/types";

export const ROLES: PatternRole[] = ["root", "branch", "trigger", "vulnerability"];
const CONFIDENCES: Confidence[] = ["low", "medium", "high"];

export type SynthesizedPattern = {
  patternId: string;
  displayName: string;
  role: PatternRole;
  confidence: Confidence;
  rationale: string;
};

export type Synthesis = {
  patterns: SynthesizedPattern[];
  summaryCard: { presentation: string; coreImbalance: string; topActions: string[] };
  coreStory: { title: string; body: string };
  featureDifferentials: FeatureDifferential[];
  howPatternsRelate: string;
  setAside: { pattern: string; reason: string }[];
  rootAndBranchPlan: { calmTheBranches: string[]; strengthenTheRoot: string[] };
  limitations: string[];
};

const schema = obj({
  evidenceMap: arr(
    obj({
      evidence: str("One tongue sign, intake answer, or follow-up answer, quoted"),
      pointsTo: str("Which catalog pattern(s) it supports, or 'none'"),
    }),
    "Work through EVERY tongue sign and EVERY answer before deciding patterns",
  ),
  patterns: arr(
    obj({
      patternId: enm(PATTERN_IDS),
      displayName: str("Pattern name as shown to the user, e.g. 'Spleen Qi Deficiency'"),
      role: enm(ROLES),
      confidence: enm(CONFIDENCES),
      rationale: str("One or two sentences tying this pattern to the user's evidence"),
    }),
    "1 to 4 patterns. Exactly one has role 'root'.",
  ),
  summaryCard: obj({
    presentation: str("One-sentence description of what the user is experiencing, from their answers and tongue"),
    coreImbalance: str("Two or three sentences: the core imbalance in plain language"),
    topActions: arr(str(), "Exactly three concrete, high-impact actions"),
  }),
  coreStory: obj({
    title: str("A short title built on one memorable image, e.g. 'A Structural Tug-of-War'"),
    body: str("Three to five paragraphs telling how the patterns feed each other, using that image"),
  }),
  featureDifferentials: arr(
    obj({
      feature: str("Body color, Coating, Shape and edges, Moisture, or Cracks and lines"),
      observed: str(),
      possibleReadings: arr(str(), "Two or three possible TCM readings"),
      photoCaveat: str("How lighting, camera, or how the tongue was held could distort this feature"),
    }),
  ),
  howPatternsRelate: str("Two or three paragraphs: how the root, branch, trigger, and vulnerability connect"),
  setAside: arr(
    obj({ pattern: str(), reason: str("Why it was considered and set aside, citing the evidence") }),
    "One to three patterns that were considered but don't fit",
  ),
  rootAndBranchPlan: obj({
    calmTheBranches: arr(str(), "Three to five steps that calm what shows up now"),
    strengthenTheRoot: arr(str(), "Three to five steps that strengthen the underlying weakness"),
  }),
  limitations: arr(str()),
});

export async function runSynthesis(input: string): Promise<Synthesis> {
  const catalog = PATTERNS.map(
    (p) =>
      `- ${p.id}: ${p.name}. Tongue: ${p.tongueSigns.join("; ")}. Signs: ${p.associatedSigns.join("; ")}.`,
  ).join("\n");

  const raw = await structuredCall<Synthesis & { evidenceMap?: unknown }>({
    name: "report_synthesis",
    schema,
    maxTokens: 4000,
    system: `${REPORT_STYLE_PROMPT}

Stage 1 of 2: decide the single, final set of patterns and write the overview sections.
Every later section builds on this decision, so it must be internally consistent.

Rules:
- Choose 1 to 4 patterns from the catalog below. Exactly one is the root (the underlying weakness). Others are branch (what shows up), trigger (what sets it off), or vulnerability (what leaves the body exposed).
- Check every answer against every catalog pattern. If an answer directly matches a pattern's signs (for example, sensitivity to weather matches Weak Defensive Qi; iced drinks match Cold or Dampness), either include that pattern or explain in setAside why not.
- Weigh tongue signs AND answers. If they disagree, lower confidence and say so in howPatternsRelate.
- setAside lists plausible patterns you ruled out by their display name, with the evidence that ruled them out.
- featureDifferentials covers each visible tongue feature with two or three readings plus a photo caveat.

Be specific, never generic:
- The core story's image must be built from this user's actual habits and answers (for example, a tug-of-war between iced drinks and spicy cravings). Name those habits in the story.
- Each top action must target a specific habit or answer the user gave, and say which. Avoid generic advice such as "exercise more" or "practice mindfulness" unless it's tied to their evidence.
- Care-plan steps follow the same rule.
- Never state a symptom the user did not report. For typical signs they didn't mention, say "you may notice".

Pattern catalog:
${catalog}`,
    user: input,
  });

  return normalizeSynthesis(raw);
}

function normalizeSynthesis({ evidenceMap: _evidenceMap, ...raw }: Synthesis & { evidenceMap?: unknown }): Synthesis {
  const seen = new Set<string>();
  const patterns = (raw.patterns || [])
    .filter((p) => PATTERN_IDS.includes(p.patternId) && !seen.has(p.patternId) && seen.add(p.patternId))
    .slice(0, 4);

  const rootIndex = patterns.findIndex((p) => p.role === "root");
  if (patterns.length && rootIndex === -1) {
    const order: Confidence[] = ["high", "medium", "low"];
    const best = [...patterns].sort((a, b) => order.indexOf(a.confidence) - order.indexOf(b.confidence))[0];
    best.role = "root";
  } else {
    patterns.forEach((p, i) => {
      if (p.role === "root" && i !== rootIndex) p.role = "branch";
    });
  }

  return {
    ...raw,
    patterns,
    summaryCard: { ...raw.summaryCard, topActions: (raw.summaryCard?.topActions || []).slice(0, 3) },
    setAside: (raw.setAside || []).map((s) => ({ ...s, pattern: findPattern(s.pattern)?.name ?? s.pattern })),
    featureDifferentials: (raw.featureDifferentials || []).map((f) => ({
      ...f,
      possibleReadings: f.possibleReadings.slice(0, 3),
    })),
  };
}
