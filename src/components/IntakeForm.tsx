"use client";

import type { ReactNode } from "react";
import { BASE_INTAKE_OPTIONS } from "@/lib/tcm/tongue-knowledge";
import type { IntakeAnswers } from "@/lib/types";

type Props = {
  value: Partial<IntakeAnswers>;
  onChange: (next: Partial<IntakeAnswers>) => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
      {children}
    </label>
  );
}

const selectClass =
  "w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]";

export function IntakeForm({ value, onChange }: Props) {
  function set<K extends keyof IntakeAnswers>(key: K, val: IntakeAnswers[K]) {
    onChange({ ...value, [key]: val });
  }

  function toggleConcern(concern: string) {
    const current = value.primaryConcerns || [];
    const next = current.includes(concern)
      ? current.filter((c) => c !== concern)
      : [...current, concern];
    set("primaryConcerns", next);
  }

  return (
    <div className="space-y-5">
      <Field label="Age range">
        <select
          className={selectClass}
          value={value.ageRange || ""}
          onChange={(e) => set("ageRange", e.target.value)}
        >
          <option value="" disabled>
            Select…
          </option>
          {BASE_INTAKE_OPTIONS.ageRange.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Sex (optional)">
        <select
          className={selectClass}
          value={value.sex || "Prefer not to say"}
          onChange={(e) => set("sex", e.target.value)}
        >
          {BASE_INTAKE_OPTIONS.sex.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--ink)]">Primary concerns</p>
        <div className="flex flex-wrap gap-2">
          {BASE_INTAKE_OPTIONS.primaryConcerns.map((concern) => {
            const active = (value.primaryConcerns || []).includes(concern);
            return (
              <button
                key={concern}
                type="button"
                onClick={() => toggleConcern(concern)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--line)] bg-white text-[var(--ink-muted)]"
                }`}
              >
                {concern}
              </button>
            );
          })}
        </div>
      </div>

      {(
        [
          ["coldHeat", "Cold / heat tendency", BASE_INTAKE_OPTIONS.coldHeat],
          ["energy", "Energy", BASE_INTAKE_OPTIONS.energy],
          ["digestion", "Digestion", BASE_INTAKE_OPTIONS.digestion],
          ["sleep", "Sleep", BASE_INTAKE_OPTIONS.sleep],
          ["thirst", "Thirst", BASE_INTAKE_OPTIONS.thirst],
          ["stool", "Stool", BASE_INTAKE_OPTIONS.stool],
          ["urine", "Urine", BASE_INTAKE_OPTIONS.urine],
        ] as const
      ).map(([key, label, options]) => (
        <Field key={key} label={label}>
          <select
            className={selectClass}
            value={(value[key] as string) || ""}
            onChange={(e) => set(key, e.target.value)}
          >
            <option value="" disabled>
              Select…
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      ))}
    </div>
  );
}

export function isIntakeComplete(value: Partial<IntakeAnswers>): value is IntakeAnswers {
  return Boolean(
    value.ageRange &&
      (value.primaryConcerns?.length || 0) > 0 &&
      value.coldHeat &&
      value.energy &&
      value.digestion &&
      value.sleep &&
      value.thirst &&
      value.stool &&
      value.urine,
  );
}
