import { InlineText } from "@/components/report/RichText";
import { Section } from "@/components/report/Section";
import type { DetailedReport } from "@/lib/types";

function PlanColumn({ title, subtitle, steps }: { title: string; subtitle: string; steps: string[] }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
      <h3 className="text-lg font-semibold text-[var(--ink)]">{title}</h3>
      <p className="mt-1 text-xs text-[var(--ink-muted)]">{subtitle}</p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-muted)]">
        {steps.map((s) => (
          <li key={s}>
            <InlineText text={s} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RootAndBranchPlan({ plan }: { plan: DetailedReport["rootAndBranchPlan"] }) {
  return (
    <Section id="care-plan" eyebrow="Putting it together" title="Your care plan">
      <p className="max-w-[70ch] text-sm leading-relaxed text-[var(--ink-muted)]">
        TCM works on two levels at once: calming the branches (what shows up now) and strengthening the root (the
        underlying weakness that keeps it coming back).
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <PlanColumn title="Calm what shows up now" subtitle="Clear the branches" steps={plan.calmTheBranches} />
        <PlanColumn title="Strengthen the underlying weakness" subtitle="Strengthen the root" steps={plan.strengthenTheRoot} />
      </div>
    </Section>
  );
}
