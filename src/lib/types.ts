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

export type DiagnosisReport = {
  features: TongueFeatures;
  patterns: PatternFinding[];
  lifestyleSuggestions: string[];
  limitations: string[];
  summary: string;
  disclaimer: string;
};

export type AssessmentSession = {
  imageDataUrl: string;
  quality: QualityResult | null;
  analysis: TongueAnalysis | null;
  intake: Partial<IntakeAnswers>;
  followUpAnswers: Record<string, string>;
  report: DiagnosisReport | null;
};
