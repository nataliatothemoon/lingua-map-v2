import { Section } from "@/components/report/Section";
import type { PatternDeepDive, PatternRole } from "@/lib/types";

const ROLE_LABELS: Record<PatternRole, { label: string; hint: string }> = {
  root: { label: "Root", hint: "The underlying weakness" },
  branch: { label: "Branch", hint: "What shows up" },
  trigger: { label: "Trigger", hint: "What sets it off" },
  vulnerability: { label: "Vulnerability", hint: "What leaves you exposed" },
};

export function RoleBadge({ role }: { role: PatternRole }) {
  const isRoot = role === "root";
  return (
    <span
      title={ROLE_LABELS[role].hint}
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isRoot ? "bg-[var(--accent)] text-white" : "bg-[var(--accent-soft)] text-[var(--accent)]"
      }`}
    >
      {ROLE_LABELS[role].label}
    </span>
  );
}

export function patternAnchor(id: string) {
  return `pattern-${id}`;
}

export function PatternsAtAGlance({ dives }: { dives: PatternDeepDive[] }) {
  return (
    <Section id="patterns" eyebrow="Your patterns" title="Your patterns at a glance">
      <div className="grid gap-4 sm:grid-cols-2">
        {dives.map((dive) => (
          <a
            key={dive.patternId}
            href={`#${patternAnchor(dive.patternId)}`}
            className="group rounded-2xl border border-[var(--line)] bg-white/85 p-5 transition hover:border-[var(--accent)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <RoleBadge role={dive.role} />
              <span className="text-xs capitalize text-[var(--ink-muted)]">{dive.confidence} confidence</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">{dive.name}</h3>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">{ROLE_LABELS[dive.role].hint}</p>
            <p className="mt-3 text-sm font-medium text-[var(--accent)] group-hover:underline">Read the deep dive ↓</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
