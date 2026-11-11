"use client";

import { createContext, useContext, type ReactNode } from "react";

type GlossaryEntry = { term: string; definition: string };

const GlossaryContext = createContext<GlossaryEntry[]>([]);

export function GlossaryProvider({ glossary, children }: { glossary: GlossaryEntry[]; children: ReactNode }) {
  return <GlossaryContext.Provider value={glossary}>{children}</GlossaryContext.Provider>;
}

function definitionFor(phrase: string, glossary: GlossaryEntry[]) {
  const lower = phrase.toLowerCase();
  return (
    glossary.find((g) => g.term.toLowerCase() === lower) ||
    glossary.find((g) => new RegExp(`\\b${g.term.toLowerCase()}\\b`).test(lower))
  )?.definition;
}

function renderInline(text: string, glossary: GlossaryEntry[]): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (!part.startsWith("**") || !part.endsWith("**")) return part;
    const phrase = part.slice(2, -2);
    const definition = definitionFor(phrase, glossary);
    if (!definition) {
      return (
        <strong key={i} className="font-semibold text-[var(--ink)]">
          {phrase}
        </strong>
      );
    }
    return (
      <abbr
        key={i}
        title={definition}
        className="cursor-help font-semibold text-[var(--ink)] no-underline decoration-[var(--accent)] decoration-dotted underline-offset-4 hover:underline"
      >
        {phrase}
      </abbr>
    );
  });
}

export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const glossary = useContext(GlossaryContext);
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className={`space-y-4 leading-[1.75] text-[var(--ink-muted)] ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{renderInline(p, glossary)}</p>
      ))}
    </div>
  );
}

export function InlineText({ text }: { text: string }) {
  const glossary = useContext(GlossaryContext);
  return <>{renderInline(text, glossary)}</>;
}
