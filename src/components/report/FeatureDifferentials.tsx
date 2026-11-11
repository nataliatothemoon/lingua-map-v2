import { InlineText } from "@/components/report/RichText";
import { Section } from "@/components/report/Section";
import type { FeatureDifferential } from "@/lib/types";

export function FeatureDifferentials({ items }: { items: FeatureDifferential[] }) {
  if (!items.length) return null;
  return (
    <Section id="tongue-features" eyebrow="Reading your tongue" title="What each tongue feature could mean">
      <p className="max-w-[70ch] text-sm leading-relaxed text-[var(--ink-muted)]">
        In TCM, each feature can point in more than one direction. A practitioner narrows it down using your answers,
        pulse, and an in-person look. Here are the most likely readings for what your photo shows.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.feature} className="rounded-2xl border border-[var(--line)] bg-white/85 p-5">
            <h3 className="text-base font-semibold text-[var(--ink)]">{item.feature}</h3>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              <span className="font-medium text-[var(--ink)]">Observed:</span> {item.observed}
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ink-muted)]">
              {item.possibleReadings.map((reading) => (
                <li key={reading}>
                  <InlineText text={reading} />
                </li>
              ))}
            </ol>
            <p className="mt-3 rounded-lg bg-[var(--panel-strong)]/50 px-3 py-2 text-xs text-[var(--ink-muted)]">
              📷 {item.photoCaveat}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
