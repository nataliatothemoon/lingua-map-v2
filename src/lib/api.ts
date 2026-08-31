import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export function enforceRateLimit(request: Request) {
  const limited = rateLimit(clientIp(request));
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait and try again.", retryAfterSec: limited.retryAfterSec },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }
  return null;
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function parseImagePayload(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const imageDataUrl = (body as { imageDataUrl?: unknown }).imageDataUrl;
  if (typeof imageDataUrl !== "string") return null;
  if (!imageDataUrl.startsWith("data:image/")) return null;
  if (imageDataUrl.length > 8_000_000) return null;
  return imageDataUrl;
}
