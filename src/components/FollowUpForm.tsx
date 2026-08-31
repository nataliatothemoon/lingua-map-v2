"use client";

import type { FollowUpQuestion } from "@/lib/types";

type Props = {
  questions: FollowUpQuestion[];
  answers: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
};

export function FollowUpForm({ questions, answers, onChange }: Props) {
  return (
    <div className="space-y-5">
      {questions.map((q) => (
        <fieldset key={q.id} className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
          <legend className="px-1 text-sm font-medium text-[var(--ink)]">{q.question}</legend>
          <p className="mt-1 text-xs text-[var(--ink-muted)]">{q.why}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {q.options.map((opt) => {
              const active = answers[q.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ ...answers, [q.id]: opt })}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--line)] bg-white text-[var(--ink-muted)]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export function areFollowUpsComplete(
  questions: FollowUpQuestion[],
  answers: Record<string, string>,
) {
  return questions.every((q) => Boolean(answers[q.id]));
}
