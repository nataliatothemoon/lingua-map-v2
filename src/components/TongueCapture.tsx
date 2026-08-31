"use client";

import { useEffect, useRef, useState } from "react";
import type { QualityResult } from "@/lib/types";

type Props = {
  onCaptured: (dataUrl: string) => void;
  quality: QualityResult | null;
  busy?: boolean;
};

export function TongueCapture({ onCaptured, quality, busy }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setReady(false);
      setCameraError(null);
      streamRef.current?.getTracks().forEach((t) => t.stop());

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch {
        setCameraError(
          "Camera access was denied or is unavailable. You can still use a photo from your device.",
        );
      }
    }

    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [facingMode]);

  function captureFrame() {
    const video = videoRef.current;
    if (!video || !ready) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    onCaptured(canvas.toDataURL("image/jpeg", 0.9));
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onCaptured(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0f1c1a] shadow-[0_20px_50px_rgba(15,40,36,0.18)]">
        {!cameraError ? (
          <video
            ref={videoRef}
            playsInline
            muted
            className="aspect-[3/4] w-full object-cover sm:aspect-video"
          />
        ) : (
          <div className="flex aspect-[3/4] items-center justify-center bg-[var(--panel-strong)] p-6 text-center text-sm text-[var(--ink-muted)] sm:aspect-video">
            {cameraError}
          </div>
        )}

        {!cameraError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 260" className="h-[68%] w-auto opacity-90" aria-hidden>
              <ellipse
                cx="100"
                cy="130"
                rx="70"
                ry="95"
                fill="none"
                stroke="rgba(232,244,240,0.85)"
                strokeWidth="3"
                strokeDasharray="8 6"
              />
              <path
                d="M70 70 Q100 40 130 70"
                fill="none"
                stroke="rgba(232,244,240,0.55)"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-xs text-white/90">
          Align your tongue inside the outline. Bright, even light works best.
        </div>
      </div>

      <ul className="grid gap-2 text-sm text-[var(--ink-muted)] sm:grid-cols-2">
        {[
          "Bright even light in front of you",
          "Extend tongue fully, relaxed",
          "Face the camera; fill the outline",
          "No filters, food dye, or sticky residue",
        ].map((tip) => (
          <li key={tip} className="flex gap-2 rounded-lg bg-[var(--panel)] px-3 py-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      {quality && !quality.clear && (
        <div className="rounded-xl border border-amber-700/30 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <p className="font-medium">Let’s improve this photo</p>
          {quality.issues.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {quality.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          )}
          {quality.retakeTips.length > 0 && (
            <>
              <p className="mt-3 font-medium">Try this</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {quality.retakeTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={busy || !!cameraError || !ready}
          onClick={captureFrame}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Checking photo…" : "Capture tongue"}
        </button>
        <button
          type="button"
          disabled={busy || !!cameraError}
          onClick={() => setFacingMode((m) => (m === "user" ? "environment" : "user"))}
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] disabled:opacity-50"
        >
          Flip camera
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] disabled:opacity-50"
        >
          Use a photo instead
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
