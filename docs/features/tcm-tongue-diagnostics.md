# Feature Requirement Document: TCM Tongue Map Diagnostics

## Feature Name
TCM Tongue Map Diagnostics Web App (MVP)

## Goal
Give users an educational Traditional Chinese Medicine (TCM)–inspired tongue reading from a guided photo capture (or upload), combined with a short intake and photo-driven follow-up questions—so they can explore possible patterns and lifestyle considerations without claiming medical diagnosis.

## User Story
As a wellness-curious user, I want to capture or upload a clear photo of my tongue, answer a short intake plus adaptive follow-ups, and receive a structured TCM-style tongue map analysis, so that I can better understand possible patterns and discuss them with a licensed practitioner.

## Functional Requirements
1. Landing page explains how to photograph the tongue and shows a prominent non-medical disclaimer.
2. Primary capture uses device camera (`getUserMedia`) with a tongue silhouette overlay and lighting checklist; user captures a still frame.
3. Fallback: “Use a photo instead” opens a file picker for an existing image.
4. Quality gate API rejects unclear / non-tongue images and returns concrete retake tips.
5. After a clear photo, extract tongue features (body color, coating, shape, moisture, zone notes) via vision LLM.
6. Always present a base intake form (age range, optional sex, concerns, cold/heat, energy, digestion, sleep, thirst, stool/urine).
7. Present 3–6 adaptive follow-up questions derived from extracted tongue features.
8. Diagnose synthesis API merges tongue features + answers into a structured report with patterns, rationale, citations labels, lifestyle suggestions, and limitations.
9. Results page shows an interactive SVG tongue zone map, findings, patterns, and lifestyle notes.
10. No permanent photo storage; API keys stay server-side; simple rate limiting on analyze endpoints.
11. No herb formulas, drug dosing, or disease claims in MVP output.

## Data Requirements
- No database in MVP.
- In-session client state holds image (data URL / base64), quality result, tongue features, intake answers, follow-up answers, and final report.
- Server processes images ephemerally (request lifetime only).

## User Flow
1. User opens `/` → reads tips + disclaimer → starts assessment.
2. On `/assess`, camera opens with overlay + checklist → Capture, or “Use a photo instead”.
3. Image sent to `/api/analyze/quality`.
4. If unclear → show issues + retake tips → return to capture.
5. If clear → `/api/analyze/tongue` extracts features + follow-up questions.
6. User completes base intake, then adaptive follow-ups.
7. Client calls `/api/analyze/diagnose` with features + answers.
8. Navigate to `/results` with interactive tongue map and full report.
9. User may start over or recapture.

## Acceptance Criteria
- [ ] Guided camera capture works on modern mobile/desktop browsers that support `getUserMedia`; graceful message if denied.
- [ ] File upload fallback works for JPEG/PNG/WebP.
- [ ] Unclear photos are blocked from full diagnosis and show actionable retake tips.
- [ ] Clear photos produce structured feature extraction and 3–6 follow-ups.
- [ ] Base intake fields are required before diagnosis (except optional sex).
- [ ] Report includes zone map, patterns with confidence, citation labels, lifestyle suggestions, limitations, and disclaimer.
- [ ] Output language stays educational / non-prescriptive (no herb prescriptions).
- [ ] Missing `OPENAI_API_KEY` returns a clear server error without crashing the UI.
- [ ] Analyze routes are rate-limited per IP.

## Edge Cases
- Camera permission denied → show upload fallback prominently.
- Non-tongue image → quality gate fails with tip to show tongue only.
- Conflicting tongue vs intake signals → report notes tension / lower confidence.
- API timeout or OpenAI error → friendly retry message; no partial “fake” diagnosis.
- Very large images → client-side resize/compress before upload.
- HTTPS / localhost required for camera on most browsers.

## Non-Functional Requirements
- Target quality+tongue analysis under ~20s combined on typical connections.
- English-first UI.
- Calm clinical-wellness visual direction (no purple AI cliché theme).
- Privacy: images not written to disk or cloud storage by the app.
- Educational framing only; encourage licensed TCM/medical care for health decisions.

## Sources (knowledge grounding)
Prompts and curated mappings summarize commonly taught concepts from:
- Classical tradition as taught in TCM curricula (*Huangdi Neijing* inspection principles)
- Giovanni Maciocia — *The Foundations of Chinese Medicine*; *Diagnosis in Chinese Medicine*
- Nigel Wiseman & Feng Ye — *A Practical Dictionary of Chinese Medicine* (terminology)
- Standard teaching tongue zone map (tip Heart/Lung; center Spleen/Stomach; sides Liver/Gallbladder; root Kidney)

No verbatim copyrighted textbook text is reproduced in the product.
