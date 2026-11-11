"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { TongueMap } from "@/components/TongueMap";
import { CoreStory } from "@/components/report/CoreStory";
import { FeatureDifferentials } from "@/components/report/FeatureDifferentials";
import { Glossary } from "@/components/report/Glossary";
import { PatternDeepDive } from "@/components/report/PatternDeepDive";
import { patternAnchor, PatternsAtAGlance } from "@/components/report/PatternsAtAGlance";
import { ReadingProgress } from "@/components/report/ReadingProgress";
import { GlossaryProvider, RichText } from "@/components/report/RichText";
import { RootAndBranchPlan } from "@/components/report/RootAndBranchPlan";
import { Section } from "@/components/report/Section";
import { SummaryCard } from "@/components/report/SummaryCard";
import { TableOfContents, type TocItem } from "@/components/report/TableOfContents";
import { clearSession, loadSession } from "@/lib/session";
import { SOURCE_ATTRIBUTIONS } from "@/lib/tcm/tongue-knowledge";
import type { AssessmentSession, DiagnosisReport, DetailedReport } from "@/lib/types";

export default function ResultsPage() {
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSession(loadSession());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

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
  if (!report.detailed) return <LegacyReport report={report} />;
  return <DetailedReportView report={report} detailed={report.detailed} imageDataUrl={imageDataUrl} />;
}

function DetailedReportView({
  report,
  detailed,
  imageDataUrl,
}: {
  report: DiagnosisReport;
  detailed: DetailedReport;
  imageDataUrl?: string;
}) {
  const toc: TocItem[] = [
    { id: "summary", label: "Care plan summary" },
    { id: "core-story", label: "The big picture" },
    { id: "tongue-map", label: "Your tongue map" },
    { id: "tongue-features", label: "What each feature could mean" },
    { id: "patterns", label: "Your patterns" },
    ...detailed.deepDives.map((d) => ({ id: patternAnchor(d.patternId), label: d.name, indent: true })),
    { id: "how-they-relate", label: "How your patterns relate" },
    { id: "care-plan", label: "Your care plan" },
    { id: "see-a-doctor", label: "When to see a doctor" },
    { id: "glossary", label: "Glossary" },
    { id: "sources", label: "Sources and limitations" },
  ];

  return (
    <GlossaryProvider glossary={detailed.glossary}>
      <ReadingProgress />
      <main className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Your detailed report</p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
              What your tongue is telling you
            </h1>
          </div>
          <Link
            href="/assess"
            onClick={() => clearSession()}
            className="no-print rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-sm"
          >
            New assessment
          </Link>
        </div>

        <DisclaimerBanner compact />

        <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>

          <div className="min-w-0 space-y-14">
            <SummaryCard card={detailed.summaryCard} />
            <CoreStory story={detailed.coreStory} />

            <Section id="tongue-map" eyebrow="Inspection" title="Your tongue map">
              <TongueMap features={report.features} imageDataUrl={imageDataUrl} />
            </Section>

            <FeatureDifferentials items={detailed.featureDifferentials} />
            <PatternsAtAGlance dives={detailed.deepDives} />

            <div className="space-y-8">
              {detailed.deepDives.map((dive) => (
                <PatternDeepDive key={dive.patternId} dive={dive} />
              ))}
            </div>

            <Section id="how-they-relate" eyebrow="Connections" title="How your patterns relate">
              <RichText text={detailed.howPatternsRelate} className="max-w-[70ch]" />
              {detailed.setAside.length > 0 && (
                <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
                  <h3 className="text-lg font-semibold text-[var(--ink)]">What this is not</h3>
                  <p className="mt-1 text-xs text-[var(--ink-muted)]">Patterns we considered and set aside, and why.</p>
                  <ul className="mt-3 space-y-3 text-sm">
                    {detailed.setAside.map((s) => (
                      <li key={s.pattern}>
                        <p className="font-medium text-[var(--ink)]">{s.pattern}</p>
                        <p className="text-[var(--ink-muted)]">{s.reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            <RootAndBranchPlan plan={detailed.rootAndBranchPlan} />

            <Section id="see-a-doctor" eyebrow="Safety" title="When to see a doctor">
              <p className="max-w-[70ch] text-sm text-[var(--ink-muted)]">
                This report is educational. See a doctor promptly if you notice any of the following:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink-muted)]">
                {detailed.redFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </Section>

            <Glossary items={detailed.glossary} />

            <Section id="sources" eyebrow="Reference" title="Sources and limitations">
              <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink-muted)]">
                {SOURCE_ATTRIBUTIONS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink-muted)]">
                {report.limitations.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <DisclaimerBanner />
            </Section>
          </div>
        </div>
      </main>
    </GlossaryProvider>
  );
}

function LegacyReport({ report }: { report: DiagnosisReport }) {
  return (
    <main className="space-y-6 rounded-3xl border border-[var(--line)] bg-white/80 p-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl">Your earlier report</h1>
      <p className="text-sm text-[var(--ink-muted)]">{report.summary}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink-muted)]">
        {report.patterns.map((p) => (
          <li key={p.name}>
            <span className="font-medium text-[var(--ink)]">{p.name}</span>: {p.rationale}
          </li>
        ))}
      </ul>
      <p className="text-sm text-[var(--ink-muted)]">Run a new assessment to get the detailed educational report.</p>
      <Link
        href="/assess"
        onClick={() => clearSession()}
        className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
      >
        New assessment
      </Link>
      <DisclaimerBanner />
    </main>
  );
}
