# Lingua Map v2 — Report Style Guide

Derived from [Case Study A](./report-case-study.md). The case study is about eczema; these rules are generalized so they apply to **any** body imbalance. The generation prompts in `src/lib/report/` and the results page layout both follow this guide.

## Section order

1. **Summary card** — presentation, core imbalance (two or three sentences), top three actions. Printable and shareable.
2. **Core story** — one opening narrative built around a single memorable image (Case Study A: the "tug-of-war" between iced drinks and spicy cravings).
3. **Tongue map** (unchanged component) and **what each tongue feature could mean** — two or three possible readings per feature, plus a lighting/camera caveat.
4. **Patterns at a glance** — each pattern with its role.
5. **Pattern deep dives** — one per pattern.
6. **How your patterns relate** and **What this is not**.
7. **Care plan** — calm what shows up now; strengthen the underlying weakness.
8. **When to see a doctor** — general red flags only.
9. **Glossary**, **sources and limitations**, **disclaimer**.

## Pattern roles

Every pattern has exactly one role:

- **Root** — the underlying weakness (Case Study A: Spleen and Kidney deficiency).
- **Branch** — what shows up (Case Study A: Wind-Dampness in the skin).
- **Trigger** — what sets it off (Case Study A: stress turning into Wind).
- **Vulnerability** — what leaves the body exposed (Case Study A: weak Defensive Qi with weather changes).

Every report has exactly one root pattern.

## Inside each deep dive

1. **Your evidence** — quote the user's own tongue signs and answers back to them. Label each by source (tongue, intake, follow-up).
2. **The mechanism** — the cause-and-effect story in TCM terms, in plain language.
3. **How your tongue shows it** — zone, sign, explanation.
4. **Where it shows up in your body** — body area tied to its organ system or channel.
5. **Why it feels this way** — explain the felt experience and what it rules out (Case Study A: itchy rather than hot, so Wind-Damp rather than Heat).
6. **Daily-life actions** — grouped under short themed headings, with a reason for every action. Be concrete (warm water, ginger tea, keep the lower back covered).
7. **Food therapy** — foods traditionally used for the pattern, with a reason.
8. **Traditional treatment options to explore** — named acupuncture points and classical formulas, education only. Names come only from the curated list. No doses, no preparation, no home soaks.
9. **What to watch for** — self-observation prompts for the coming weeks.
10. **Go deeper** — two or three collapsible rabbit-hole sections, phrased as the follow-up questions a curious reader would ask.

## Consistency rules

- One agreed set of patterns is decided first. Every section builds on that set and nothing contradicts it.
- Patterns considered and set aside go in **What this is not**, with the reasoning (Case Study A: Blood Heat was set aside because the skin itches without heat).
- If the tongue and the answers disagree, say so and lower the confidence. Don't hide the disagreement.

## Tone

- Warm, encouraging, confident, careful. Second person ("your body", "you may notice").
- TCM terms are **bold** on first use and explained in plain words straight away.
- Memorable images are welcome: drainage ditch, pressure valve, shield.
- Educational framing throughout: "in TCM this is understood as...", never "you have...".
- Don't build the report around a disease. If the user mentions a condition in the intake, use it only as context.

## Boundaries

- No Western diagnoses or differentials.
- No doses, no herbal preparation, no home remedies made from herbs.
- Every traditional treatment item carries the licensed-practitioner warning. The UI always shows it.
- Red flags stay general (for example, persistent pain, sudden unexplained weight loss, blood in stool or urine, high fever, worsening symptoms).
