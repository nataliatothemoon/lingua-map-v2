import { RichText } from "@/components/report/RichText";
import { SubHeading } from "@/components/report/Section";

export function GoDeeper({ items }: { items: { title: string; body: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="space-y-3">
      <SubHeading>Go deeper</SubHeading>
      {items.map((item) => (
        <details key={item.title} className="group rounded-xl border border-[var(--line)] bg-white/80 px-4 py-3">
          <summary className="cursor-pointer list-none font-medium text-[var(--ink)] marker:hidden">
            <span className="mr-2 inline-block text-[var(--accent)] transition group-open:rotate-90">›</span>
            {item.title}
          </summary>
          <RichText text={item.body} className="mt-3 max-w-[70ch] text-sm" />
        </details>
      ))}
    </div>
  );
}
