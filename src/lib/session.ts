import type { AssessmentSession } from "@/lib/types";

const KEY = "tcm-tongue-assessment-v1";

export function saveSession(session: AssessmentSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(session));
}

export function loadSession(): AssessmentSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

export function emptySession(imageDataUrl = ""): AssessmentSession {
  return {
    imageDataUrl,
    quality: null,
    analysis: null,
    intake: {},
    followUpAnswers: {},
    report: null,
  };
}

/** Resize/compress an image File or data URL for API upload. */
export async function compressImageToDataUrl(
  source: Blob | string,
  maxSide = 1280,
  quality = 0.82,
): Promise<string> {
  const blob =
    typeof source === "string"
      ? await (await fetch(source)).blob()
      : source;

  const bitmap = await createImageBitmap(blob);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL("image/jpeg", quality);
}
