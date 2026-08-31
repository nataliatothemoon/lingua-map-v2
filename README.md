# Lingua Map — TCM Tongue Diagnostics (MVP)

Educational web app for TCM-inspired tongue map analysis: guided camera capture (with photo upload fallback), quality gating, base intake, adaptive follow-ups, and a structured report.

**Not medical advice.** Outputs are educational wellness information only and do not replace licensed medical or TCM care.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- OpenAI vision (`gpt-4o` by default) via server API routes
- Ephemeral in-session state (`sessionStorage`); photos are not persisted by the app

## Setup

1. Copy env template and add your key:

```bash
cp .env.example .env.local
```

2. Set `OPENAI_API_KEY` in `.env.local`.

3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Camera capture requires HTTPS or localhost.

## Flow

1. `/` — landing, photo tips, disclaimer, source notes  
2. `/assess` — guided capture → quality gate → tongue features + follow-ups → intake → synthesis  
3. `/results` — interactive tongue zone map + patterns + lifestyle notes  

API routes:

- `POST /api/analyze/quality`
- `POST /api/analyze/tongue`
- `POST /api/analyze/diagnose`

Analyze routes are rate-limited (~10 requests/minute/IP).

## Knowledge grounding

Prompts and curated mappings summarize commonly taught TCM inspection concepts (citation labels only; no verbatim copyrighted textbook text):

- Classical inspection tradition as taught in TCM curricula (*Huangdi Neijing* wang/inspection framing)
- Giovanni Maciocia — *The Foundations of Chinese Medicine*; *Diagnosis in Chinese Medicine*
- Nigel Wiseman & Feng Ye — *A Practical Dictionary of Chinese Medicine*
- Standard teaching tongue map (tip Heart/Lung; center Spleen/Stomach; sides Liver/Gallbladder; root Kidney)

See `docs/features/tcm-tongue-diagnostics.md` for the feature requirements document and `src/lib/tcm/tongue-knowledge.ts` for the curated module.

## Out of scope (MVP)

User accounts, photo history, herb formulas, acupuncture prescriptions, custom CV models, multilingual UI.
