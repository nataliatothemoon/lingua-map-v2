"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FollowUpForm, areFollowUpsComplete } from "@/components/FollowUpForm";
import { IntakeForm, isIntakeComplete } from "@/components/IntakeForm";
import { TongueCapture } from "@/components/TongueCapture";
import {
  compressImageToDataUrl,
  emptySession,
  saveSession,
} from "@/lib/session";
import type {
  IntakeAnswers,
  QualityResult,
  TongueAnalysis,
} from "@/lib/types";

type Step = "capture" | "intake" | "followups" | "synthesizing";

export default function AssessPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("capture");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<QualityResult | null>(null);
  const [analysis, setAnalysis] = useState<TongueAnalysis | null>(null);
  const [intake, setIntake] = useState<Partial<IntakeAnswers>>({
    sex: "Prefer not to say",
    primaryConcerns: [],
  });
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const followUpsReady = useMemo(
    () => analysis && areFollowUpsComplete(analysis.followUpQuestions, followUpAnswers),
    [analysis, followUpAnswers],
  );

  async function handleCaptured(rawDataUrl: string) {
    setError(null);
    setBusy(true);
    setQuality(null);
    try {
      const compressed = await compressImageToDataUrl(rawDataUrl);
      setImageDataUrl(compressed);

      const qualityRes = await fetch("/api/analyze/quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: compressed }),
      });
      const qualityJson = await qualityRes.json();
      if (!qualityRes.ok) throw new Error(qualityJson.error || "Quality check failed");

      const qualityResult = qualityJson as QualityResult;
      setQuality(qualityResult);
      if (!qualityResult.clear) {
        setBusy(false);
        return;
      }

      const tongueRes = await fetch("/api/analyze/tongue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: compressed }),
      });
      const tongueJson = await tongueRes.json();
      if (!tongueRes.ok) throw new Error(tongueJson.error || "Tongue analysis failed");

      setAnalysis(tongueJson as TongueAnalysis);
      setFollowUpAnswers({});
      setStep("intake");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function runDiagnosis() {
    if (!imageDataUrl || !analysis || !isIntakeComplete(intake)) return;
    setError(null);
    setBusy(true);
    setStep("synthesizing");
    try {
      const res = await fetch("/api/analyze/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: analysis.features,
          intake,
          followUpAnswers,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not synthesize report");

      saveSession({
        ...emptySession(imageDataUrl),
        quality,
        analysis,
        intake,
        followUpAnswers,
        report: json,
      });
      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Diagnosis failed");
      setStep("followups");
      setBusy(false);
    }
  }

  return (
    <main className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Assessment</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
          {step === "capture" && "Capture your tongue"}
          {step === "intake" && "Base intake"}
          {step === "followups" && "Follow-up questions"}
          {step === "synthesizing" && "Building your report"}
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          {step === "capture" && "Use the guided camera, or fall back to an existing photo."}
          {step === "intake" && "A short questionnaire used alongside tongue inspection in TCM inquiry (问)."}
          {step === "followups" && "These questions were suggested from signs in your photo."}
          {step === "synthesizing" && "Combining tongue features with your answers…"}
        </p>
      </div>

      <DisclaimerBanner compact />

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </div>
      )}

      {step === "capture" && (
        <TongueCapture onCaptured={handleCaptured} quality={quality} busy={busy} />
      )}

      {step === "intake" && (
        <div className="space-y-5 rounded-3xl border border-[var(--line)] bg-white/80 p-5 sm:p-6">
          <IntakeForm value={intake} onChange={setIntake} />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep("capture")}
              className="rounded-full border border-[var(--line)] px-4 py-2.5 text-sm"
            >
              Recapture
            </button>
            <button
              type="button"
              disabled={!isIntakeComplete(intake)}
              onClick={() => setStep("followups")}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Continue to follow-ups
            </button>
          </div>
        </div>
      )}

      {step === "followups" && analysis && (
        <div className="space-y-5 rounded-3xl border border-[var(--line)] bg-white/80 p-5 sm:p-6">
          <FollowUpForm
            questions={analysis.followUpQuestions}
            answers={followUpAnswers}
            onChange={setFollowUpAnswers}
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep("intake")}
              className="rounded-full border border-[var(--line)] px-4 py-2.5 text-sm"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!followUpsReady || busy}
              onClick={runDiagnosis}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Generate report
            </button>
          </div>
        </div>
      )}

      {step === "synthesizing" && (
        <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-10 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
          <p className="mt-4 text-sm text-[var(--ink-muted)]">Synthesizing your educational tongue map…</p>
        </div>
      )}
    </main>
  );
}
