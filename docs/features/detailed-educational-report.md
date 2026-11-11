# Feature Requirement Document: Detailed Educational Report (v2)

## Feature Name
Detailed Educational Report

## Goal
Users prefer long, in-depth reports they can read through and explore further. v1's report is short: a summary, a list of patterns, and lifestyle bullets. v2 replaces it with a long-form, educational report modeled on [Case Study A](../reference/report-case-study.md). It explains which body imbalances the tongue and answers point to, how those imbalances connect, and what TCM would traditionally do about them. It covers body imbalances in general and is not condition-specific.

## User Story
As someone who has just had my tongue analyzed, I want a detailed report that explains what's going on in my body in TCM terms, ties every conclusion back to my own tongue and answers, and lets me explore further, so that I understand the reasoning and can bring informed questions to a practitioner.

## Functional Requirements
1. The report opens with a **summary card**: the presentation, the core imbalance, and three top actions, with a **Print / save** button.
2. A **core story** follows: one narrative built around a single memorable image explaining how the imbalances feed each other.
3. The interactive **tongue map** is shown unchanged.
4. **What each tongue feature could mean**: for each feature (body color, coating, shape, moisture, cracks), what was observed, two or three possible TCM readings, and a lighting/camera caveat.
5. The report identifies one to four patterns. Each has a **role** (exactly one root, plus any of branch, trigger, vulnerability) and a confidence level.
6. Each pattern has a deep dive containing:
   - your evidence, with each item labeled by source
   - the mechanism
   - tongue signs by zone
   - body area to organ system ties
   - why it feels this way
   - daily-life actions grouped by theme, each with a reason
   - food therapy
   - traditional treatment options to explore
   - what to watch for
   - two or three collapsible "Go deeper" sections
7. **Traditional treatment options to explore** name acupuncture points and classical formulas from a curated list only. Each item shows its traditional use. A licensed-practitioner warning is always rendered. There are no doses, preparations, or home remedies.
8. **How your patterns relate**: an explanation of how the root, branch, trigger, and vulnerability patterns connect.
9. **What this is not**: patterns that were considered and set aside, with the reasoning.
10. **Care plan**: "Calm what shows up now" and "Strengthen the underlying weakness".
11. **When to see a doctor**: general red flags only. No Western diagnoses.
12. A **glossary** of the TCM terms used, plus sources, limitations, and the disclaimer.
13. A **table of contents** for jumping between sections.

## Data Requirements
- No database. The expanded `DiagnosisReport` is still stored in `sessionStorage`.
- New curated data: pattern library, food therapy, the allowed acupuncture points and formulas, body geography, and the glossary.
- Older v1 report fields are kept so the tongue map and older sessions still render.

## User Flow
1. The user completes capture, intake, and follow-ups exactly as in v1.
2. The client calls `/api/analyze/diagnose`.
3. The server runs stage one (synthesis: patterns, roles, core story, and the other overview sections), then stage two (one deep dive per pattern, run in parallel), then merges and validates the result.
4. `/results` renders the long-form report. The user reads, expands "Go deeper" sections, uses the table of contents, and prints the summary card.

## Acceptance Criteria
- [ ] Every section in the Functional Requirements renders for a real photo and answers.
- [ ] Every report has exactly one root pattern, and every pattern has a role.
- [ ] Deep dives don't contradict the synthesis (same pattern names and roles).
- [ ] Points and formulas not on the curated list are removed on the server.
- [ ] The licensed-practitioner warning is always visible in the traditional treatments section.
- [ ] There are no Western diagnoses, doses, or herbal preparations anywhere in the output.
- [ ] If a deep dive fails, the report still renders with a curated fallback for that pattern.
- [ ] The tongue map component is unchanged.
- [ ] Printing produces the summary card and report without the navigation.

## Edge Cases
- The model returns zero patterns or no root pattern. The server promotes the highest-confidence pattern to root, or falls back to an "insufficient certainty" report.
- A pattern name isn't in the curated library. A generic deep-dive prompt is used, and the treatment list is empty.
- A deep-dive call times out or returns malformed JSON. A curated fallback is used.
- The tongue and the answers point in different directions. Confidence is lowered and the disagreement is explained in "How your patterns relate".
- The user mentions a specific condition. It's used only as context, and the report stays about general imbalances.
- An old v1 session is in `sessionStorage`. The results page shows the v1-style summary and links to a new assessment.

## Non-Functional Requirements
- Total report generation under about 45 seconds, with a progress message.
- Readable long-form layout: body text about 70 characters wide, comfortable line height, works on mobile.
- Educational framing and the disclaimer on every view.
