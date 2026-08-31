"use client";

import { useState } from "react";
import { TONGUE_ZONES } from "@/lib/tcm/tongue-knowledge";
import type { TongueFeatures } from "@/lib/types";

type ZoneKey = keyof typeof TONGUE_ZONES;

const ZONE_PATHS: Record<ZoneKey, string> = {
  tip: "M100 28 C128 28 148 52 148 78 C148 96 128 108 100 108 C72 108 52 96 52 78 C52 52 72 28 100 28 Z",
  sides: "M48 100 C58 92 78 96 86 118 C90 132 88 160 82 178 C70 170 52 148 48 128 C44 112 44 106 48 100 Z M152 100 C148 106 148 112 152 128 C156 148 138 170 126 178 C120 160 118 132 122 118 C130 96 150 92 160 100 Z",
  center: "M78 112 C90 104 110 104 122 112 C136 122 140 150 132 176 C120 188 80 188 68 176 C60 150 64 122 78 112 Z",
  root: "M70 188 C84 198 116 198 130 188 C142 204 138 228 118 240 C100 248 84 240 70 228 C58 212 58 198 70 188 Z",
};

type Props = {
  features: TongueFeatures;
  imageDataUrl?: string;
};

export function TongueMap({ features, imageDataUrl }: Props) {
  const [active, setActive] = useState<ZoneKey>("center");
  const zone = TONGUE_ZONES[active];
  const observation = features.zones[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[linear-gradient(160deg,#e8f3ef_0%,#f7faf8_45%,#eef4f6_100%)] p-4">
        {imageDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt="Captured tongue"
            className="mb-4 max-h-40 w-full rounded-2xl object-cover opacity-90"
          />
        )}
        <svg viewBox="0 0 200 270" className="mx-auto h-auto w-full max-w-sm" role="img" aria-label="Tongue zone map">
          <ellipse cx="100" cy="145" rx="78" ry="110" fill="#f4cfc4" stroke="#c9897a" strokeWidth="2" />
          {(Object.keys(ZONE_PATHS) as ZoneKey[]).map((key) => (
            <path
              key={key}
              d={ZONE_PATHS[key]}
              fill={active === key ? "rgba(42,111,106,0.45)" : "rgba(42,111,106,0.18)"}
              stroke={active === key ? "#1b3a2f" : "#2a6f6a"}
              strokeWidth={active === key ? 2.5 : 1.5}
              className="cursor-pointer transition"
              onClick={() => setActive(key)}
            />
          ))}
        </svg>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {(Object.keys(TONGUE_ZONES) as ZoneKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`rounded-full px-3 py-1 text-xs ${
                active === key
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white/80 text-[var(--ink-muted)]"
              }`}
            >
              {TONGUE_ZONES[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_12px_40px_rgba(20,40,36,0.06)]">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Tongue map</p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          {zone.label}
          <span className="block text-base font-normal text-[var(--ink-muted)]">{zone.organs}</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{zone.notes}</p>
        <div className="mt-4 rounded-2xl bg-[var(--panel)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
            Observation from your photo
          </p>
          <p className="mt-2 text-sm text-[var(--ink)]">{observation}</p>
        </div>
        <dl className="mt-4 grid gap-3 text-sm">
          <div>
            <dt className="text-[var(--ink-muted)]">Body color</dt>
            <dd className="font-medium text-[var(--ink)]">{features.bodyColor}</dd>
          </div>
          <div>
            <dt className="text-[var(--ink-muted)]">Coating</dt>
            <dd className="font-medium text-[var(--ink)]">
              {features.coating.color}, {features.coating.thickness}, {features.coating.distribution}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--ink-muted)]">Shape / moisture</dt>
            <dd className="font-medium text-[var(--ink)]">
              {(features.shape.length ? features.shape.join(", ") : "unremarkable")} · {features.moisture}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
