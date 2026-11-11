import { SubHeading } from "@/components/report/Section";
import { PRACTITIONER_WARNING } from "@/lib/tcm/treatments";
import type { TraditionalTreatment } from "@/lib/types";

function TreatmentList({ title, items }: { title: string; items: TraditionalTreatment[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">{title}</p>
      <ul className="mt-2 space-y-3">
        {items.map((t) => (
          <li key={t.name} className="rounded-xl bg-white px-4 py-3">
            <p className="font-medium text-[var(--ink)]">{t.name}</p>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">{t.traditionalUse}</p>
            {t.whyForYou && (
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                <span className="font-medium text-[var(--ink)]">Why it could fit you:</span> {t.whyForYou}
              </p>
            )}
            {t.caution && <p className="mt-1 text-xs font-medium text-amber-800">⚠ {t.caution}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TraditionalTreatments({ items }: { items: TraditionalTreatment[] }) {
  return (
    <div className="space-y-4 rounded-2xl border border-amber-700/25 bg-amber-50/60 p-5">
      <SubHeading>Traditional treatment options to explore</SubHeading>
      <p className="rounded-lg border border-amber-700/30 bg-amber-100/70 px-3 py-2 text-xs leading-relaxed text-amber-950" role="note">
        <span className="font-semibold">Licensed practitioners only. </span>
        {PRACTITIONER_WARNING}
      </p>
      {items.length ? (
        <>
          <p className="text-sm text-[var(--ink-muted)]">
            If you choose to see a licensed practitioner, here is what TCM treatment for this pattern could look like.
          </p>
          <TreatmentList title="Acupuncture points" items={items.filter((t) => t.kind === "acupuncture")} />
          <TreatmentList title="Classical herbal formulas" items={items.filter((t) => t.kind === "herbal")} />
        </>
      ) : (
        <p className="text-sm text-[var(--ink-muted)]">A practitioner would tailor treatment after an in-person assessment.</p>
      )}
    </div>
  );
}
