import { GoDeeper } from "@/components/report/GoDeeper";
import { patternAnchor, RoleBadge } from "@/components/report/PatternsAtAGlance";
import { InlineText, RichText } from "@/components/report/RichText";
import { SubHeading } from "@/components/report/Section";
import { TraditionalTreatments } from "@/components/report/TraditionalTreatments";
import type { EvidenceSource, PatternDeepDive as Dive } from "@/lib/types";

const SOURCE_LABELS: Record<EvidenceSource, string> = {
  tongue: "Tongue",
  intake: "Intake",
  followup: "Follow-up",
};

export function PatternDeepDive({ dive }: { dive: Dive }) {
  return (
    <article
      id={patternAnchor(dive.patternId)}
      className="scroll-mt-24 space-y-7 rounded-3xl border border-[var(--line)] bg-white/90 p-6 shadow-[0_12px_40px_rgba(20,40,36,0.05)] sm:p-8"
    >
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <RoleBadge role={dive.role} />
          <span className="text-xs capitalize text-[var(--ink-muted)]">{dive.confidence} confidence</span>
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] sm:text-3xl">{dive.name}</h3>
        <RichText text={dive.plainLanguageSummary} className="max-w-[70ch]" />
        {dive.isFallback && (
          <p className="text-xs text-[var(--ink-muted)]">
            The personalized deep dive for this pattern couldn&apos;t be generated, so this section shows general reference material.
          </p>
        )}
      </header>

      {dive.yourEvidence.length > 0 && (
        <div className="space-y-3">
          <SubHeading>Your evidence</SubHeading>
          <ul className="space-y-2">
            {dive.yourEvidence.map((e) => (
              <li key={e.detail} className="flex gap-3 text-sm text-[var(--ink-muted)]">
                <span className="mt-0.5 h-fit shrink-0 rounded-md bg-[var(--panel-strong)] px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--ink)]">
                  {SOURCE_LABELS[e.source]}
                </span>
                <span>{e.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        <SubHeading>The mechanism</SubHeading>
        <RichText text={dive.mechanism} className="max-w-[70ch]" />
      </div>

      {dive.howYourTongueShowsIt.length > 0 && (
        <div className="space-y-3">
          <SubHeading>How your tongue shows it</SubHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dive.howYourTongueShowsIt.map((t) => (
              <li key={`${t.zone}-${t.sign}`} className="rounded-xl bg-[var(--panel)] p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{t.zone}</p>
                <p className="mt-1 font-medium text-[var(--ink)]">{t.sign}</p>
                <p className="mt-1 text-[var(--ink-muted)]">
                  <InlineText text={t.explanation} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {dive.bodyGeography.length > 0 && (
        <div className="space-y-3">
          <SubHeading>Where it shows up in your body</SubHeading>
          <ul className="space-y-2 text-sm text-[var(--ink-muted)]">
            {dive.bodyGeography.map((g) => (
              <li key={g.area}>
                <span className="font-medium text-[var(--ink)]">{g.area}</span> → {g.system}.{" "}
                <InlineText text={g.explanation} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {dive.whyItFeelsThisWay && (
        <div className="space-y-3">
          <SubHeading>Why it feels this way</SubHeading>
          <RichText text={dive.whyItFeelsThisWay} className="max-w-[70ch]" />
        </div>
      )}

      {dive.whyItDevelops.length > 0 && (
        <div className="space-y-3">
          <SubHeading>Why this pattern develops</SubHeading>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink-muted)]">
            {dive.whyItDevelops.map((w) => (
              <li key={w}>
                <InlineText text={w} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {dive.dailyLifeConsiderations.length > 0 && (
        <div className="space-y-4">
          <SubHeading>Actions and care</SubHeading>
          {dive.dailyLifeConsiderations.map((group) => (
            <div key={group.theme} className="rounded-2xl border border-[var(--line)] p-4">
              <p className="font-semibold text-[var(--ink)]">{group.theme}</p>
              <ul className="mt-2 space-y-2 text-sm">
                {group.actions.map((a) => (
                  <li key={a.action}>
                    <p className="font-medium text-[var(--ink)]">
                      <InlineText text={a.action} />
                    </p>
                    <p className="text-[var(--ink-muted)]">
                      <span className="font-medium">Why: </span>
                      <InlineText text={a.why} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {dive.foodTherapy.length > 0 && (
        <div className="space-y-3">
          <SubHeading>Food therapy</SubHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dive.foodTherapy.map((f) => (
              <li key={f.food} className="rounded-xl bg-[var(--panel)] p-4 text-sm">
                <p className="font-medium text-[var(--ink)]">{f.food}</p>
                <p className="mt-1 text-[var(--ink-muted)]">
                  <InlineText text={f.why} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <TraditionalTreatments items={dive.traditionalTreatments} />

      {dive.whatToObserve.length > 0 && (
        <div className="space-y-3">
          <SubHeading>What to watch for in the coming weeks</SubHeading>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--ink-muted)]">
            {dive.whatToObserve.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <GoDeeper items={dive.goDeeper} />

      {dive.citations.length > 0 && (
        <p className="text-xs text-[var(--ink-muted)]">Sources: {dive.citations.join(" · ")}</p>
      )}
    </article>
  );
}
