import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">{eyebrow}</p>}
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--ink)]">{children}</h4>;
}
