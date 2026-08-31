import { DISCLAIMER } from "@/lib/tcm/tongue-knowledge";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`rounded-md border border-[var(--line)] bg-[var(--panel)] text-[var(--ink-muted)] ${
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
      }`}
      role="note"
    >
      <p className="leading-relaxed">{DISCLAIMER}</p>
    </aside>
  );
}
