import { Section } from "@/components/report/Section";

export function Glossary({ items }: { items: { term: string; definition: string }[] }) {
  if (!items.length) return null;
  return (
    <Section id="glossary" eyebrow="Reference" title="Glossary">
      <p className="text-sm text-[var(--ink-muted)]">Hover over or tap highlighted terms in the report for a quick definition.</p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {items.map((g) => (
          <div key={g.term} className="rounded-xl bg-[var(--panel)] px-4 py-3">
            <dt className="font-semibold text-[var(--ink)]">{g.term}</dt>
            <dd className="mt-1 text-sm text-[var(--ink-muted)]">{g.definition}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
