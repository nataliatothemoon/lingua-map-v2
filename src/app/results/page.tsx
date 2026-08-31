"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { TongueMap } from "@/components/TongueMap";
import { clearSession, loadSession } from "@/lib/session";
import type { AssessmentSession } from "@/lib/types";

export default function ResultsPage() {
  const [session, setSession] = useState<AssessmentSession | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  if (!session?.report) {
    return (
      <main className="space-y-4 rounded-3xl border border-[var(--line)] bg-white/80 p-8 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl">No report yet</h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Complete a tongue assessment to see your educational map and pattern suggestions.
        </p>
        <Link
          href="/assess"
          className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Start assessment
        </Link>
      </main>
    );
  }

  const { report, imageDataUrl } = session;

  return (
    <main className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Results</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
            Your tongue map
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">{report.summary}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/assess"
            onClick={() => clearSession()}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-sm"
          >
            New assessment
          </Link>
        </div>
      </div>

      <DisclaimerBanner />

      <TongueMap features={report.features} imageDataUrl={imageDataUrl} />

      <section className="space-y-4">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">Suggested patterns</h2>
        <div className="grid gap-4">
          {report.patterns.map((pattern) => (
            <article
              key={pattern.name}
              className="rounded-2xl border border-[var(--line)] bg-white/85 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-[var(--ink)]">{pattern.name}</h3>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium capitalize text-[var(--accent)]">
                  {pattern.confidence} confidence
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{pattern.rationale}</p>
              {pattern.citations.length > 0 && (
                <p className="mt-3 text-xs text-[var(--ink-muted)]">
                  Sources: {pattern.citations.join(" · ")}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl">Lifestyle considerations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--ink-muted)]">
            {report.lifestyleSuggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl">Limitations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--ink-muted)]">
            {report.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <p className="text-center text-sm text-[var(--ink-muted)]">
        For personal health decisions, consult a licensed physician or qualified TCM practitioner.
      </p>
    </main>
  );
}
