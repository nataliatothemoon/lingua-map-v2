export type TocItem = { id: string; label: string; indent?: boolean };

export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Report contents" className="no-print lg:sticky lg:top-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">Contents</p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.indent ? "pl-3" : ""}>
            <a href={`#${item.id}`} className="text-[var(--ink-muted)] hover:text-[var(--accent)]">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
