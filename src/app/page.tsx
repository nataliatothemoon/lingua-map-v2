import Link from "next/link";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { SOURCE_ATTRIBUTIONS } from "@/lib/tcm/tongue-knowledge";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(255,255,255,0.85),rgba(232,243,239,0.9))] px-6 py-12 sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(42,111,106,0.18), transparent 35%), radial-gradient(circle at 80% 30%, rgba(120,160,170,0.2), transparent 40%)",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">TCM-inspired wellness</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.05] text-[var(--ink)] sm:text-5xl">
            Lingua Map
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
            Capture your tongue with guided lighting cues, answer a short intake, and explore an educational
            tongue-map reading grounded in commonly taught TCM inspection principles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/assess"
              className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              Start tongue assessment
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Guided capture",
            body: "Live camera with a tongue outline, plus a photo upload fallback.",
          },
          {
            title: "Photo + inquiry",
            body: "Base intake and adaptive follow-ups based on what your tongue suggests.",
          },
          {
            title: "Zone map report",
            body: "Interactive tip, center, sides, and root findings with pattern suggestions.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[var(--line)] bg-white/70 p-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">How to photograph</h2>
        <ol className="grid gap-3 text-sm text-[var(--ink-muted)] sm:grid-cols-2">
          {[
            "Use daylight or a lamp in front of your face—avoid strong backlight.",
            "Extend your tongue fully and relax it; fill the on-screen outline.",
            "Skip filters, lipstick residue, and colored foods/drinks beforehand.",
            "Hold steady for a sharp still frame, then complete the intake.",
          ].map((step, i) => (
            <li key={step} className="rounded-xl bg-[var(--panel)] px-4 py-3">
              <span className="mr-2 font-semibold text-[var(--accent)]">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <DisclaimerBanner />
        <details className="rounded-xl border border-[var(--line)] bg-white/60 px-4 py-3 text-sm text-[var(--ink-muted)]">
          <summary className="cursor-pointer font-medium text-[var(--ink)]">Knowledge sources</summary>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {SOURCE_ATTRIBUTIONS.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </details>
      </section>
    </main>
  );
}
