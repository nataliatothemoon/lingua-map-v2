"use client";

import { InlineText } from "@/components/report/RichText";
import type { DetailedReport } from "@/lib/types";

function printReport() {
  document.querySelectorAll("details").forEach((d) => d.setAttribute("open", ""));
  window.print();
}

export function SummaryCard({ card }: { card: DetailedReport["summaryCard"] }) {
  return (
    <section
      id="summary"
      className="scroll-mt-24 rounded-3xl border border-[var(--line)] bg-[linear-gradient(150deg,#ffffff_0%,#eef6f3_100%)] p-6 shadow-[0_16px_45px_rgba(20,40,36,0.08)] sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">🌿 Your wellness care plan</p>
        <button
          type="button"
          onClick={printReport}
          className="no-print rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)]"
        >
          Print / save as PDF
        </button>
      </div>

      <dl className="mt-5 space-y-5">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">What you&apos;re experiencing</dt>
          <dd className="mt-1 text-[var(--ink)]">
            <InlineText text={card.presentation} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">⚖️ The core imbalance</dt>
          <dd className="mt-1 font-[family-name:var(--font-display)] text-xl leading-snug text-[var(--ink)]">
            <InlineText text={card.coreImbalance} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">✅ Your top three actions</dt>
          <dd>
            <ol className="mt-2 space-y-2">
              {card.topActions.map((action, i) => (
                <li key={action} className="flex gap-3 text-[var(--ink)]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <InlineText text={action} />
                  </span>
                </li>
              ))}
            </ol>
          </dd>
        </div>
      </dl>
    </section>
  );
}
