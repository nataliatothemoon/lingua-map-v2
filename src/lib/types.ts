export type Confidence = "low" | "medium" | "high";

export type QualityResult = {
  clear: boolean;
  isTongue: boolean;
  issues: string[];
  retakeTips: string[];
};

export type TongueFeatures = {
  bodyColor: string;
  coating: {
    color: string;
    thickness: string;
    distribution: string;
  };
  shape: string[];
  moisture: string;
  zones: {
    tip: string;
    center: string;
    sides: string;
    root: string;
  };
  notableSigns: string[];
};

export type FollowUpQuestion = {
  id: string;
  question: string;
  why: string;
  options: string[];
};

export type TongueAnalysis = {
  features: TongueFeatures;
  followUpQuestions: FollowUpQuestion[];
};

export type IntakeAnswers = {
  ageRange: string;
  sex: string;
  primaryConcerns: string[];
  coldHeat: string;
  energy: string;
  digestion: string;
  sleep: string;
  thirst: string;
  stool: string;
  urine: string;
};

export type PatternFinding = {
  name: string;
  confidence: Confidence;
  rationale: string;
  citations: string[];
};

export type PatternRole = "root" | "branch" | "trigger" | "vulnerability";

export type EvidenceSource = "tongue" | "intake" | "followup";

export type TraditionalTreatment = {
  kind: "acupuncture" | "herbal";
  name: string;
  traditionalUse: string;
  whyForYou: string;
  caution?: string;
};

export type PatternDeepDive = {
  patternId: string;
  name: string;
  role: PatternRole;
  confidence: Confidence;
  plainLanguageSummary: string;
  yourEvidence: { source: EvidenceSource; detail: string }[];
  mechanism: string;
  howYourTongueShowsIt: { zone: string; sign: string; explanation: string }[];
  bodyGeography: { area: string; system: string; explanation: string }[];
  whyItFeelsThisWay: string;
  whyItDevelops: string[];
  dailyLifeConsiderations: { theme: string; actions: { action: string; why: string }[] }[];
  foodTherapy: { food: string; why: string }[];
  traditionalTreatments: TraditionalTreatment[];
  whatToObserve: string[];
  goDeeper: { title: string; body: string }[];
  citations: string[];
  isFallback: boolean;
};

export type FeatureDifferential = {
  feature: string;
  observed: string;
  possibleReadings: string[];
  photoCaveat: string;
};

export type DetailedReport = {
  summaryCard: {
    presentation: string;
    coreImbalance: string;
    topActions: string[];
  };
  coreStory: { title: string; body: string };
  featureDifferentials: FeatureDifferential[];
  deepDives: PatternDeepDive[];
  howPatternsRelate: string;
  setAside: { pattern: string; reason: string }[];
  rootAndBranchPlan: { calmTheBranches: string[]; strengthenTheRoot: string[] };
  redFlags: string[];
  glossary: { term: string; definition: string }[];
};

export type DiagnosisReport = {
  features: TongueFeatures;
  patterns: PatternFinding[];
  lifestyleSuggestions: string[];
  limitations: string[];
  summary: string;
  disclaimer: string;
  detailed?: DetailedReport;
};

export type AssessmentSession = {
  imageDataUrl: string;
  quality: QualityResult | null;
  analysis: TongueAnalysis | null;
  intake: Partial<IntakeAnswers>;
  followUpAnswers: Record<string, string>;
  report: DiagnosisReport | null;
};
