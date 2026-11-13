---
name: refresh-an-existing-guide
description: Refresh an existing Docuklin guide for rankings, AEO, sources, and tool CTA alignment without inventing a new page.
---
# Refresh an existing guide

Prefer rewriting the current URL over creating a near-duplicate. See `docs/SEO-PLAYBOOK.md` and `add-a-new-guide` for the target shape.

## When to refresh

- Guide ranks but the matching **tool** does not (or vice versa): align titles/CTA to shared “template” language; put the tool CTA above the fold.
- Thin, AI-sounding, or unsourced claims; missing FAQ/HowTo; outdated `updatedAt`.
- Cannibalization risk with a new keyword idea — expand this guide instead.

## Steps

1. Open the guide in `src/data/guides.ts` and the matching tool in `src/data/tools/*`.
2. Re-check primary query + PAA; update H2s to real questions.
3. Rewrite `answerFirst` (~40–60 words, sourced). Fix voice (see `.cursor/rules/content-quality.mdc`).
4. Ensure `sources[]`, `legalNote` if needed, worked example, FAQ, optional `howTo` matching body.
5. Primary CTA: first `relatedToolSlugs` entry; CTA copy should say the tool’s template name when that is the query.
6. Bump `updatedAt` to the real edit day (feeds sitemap lastmod — never fake “now” in serialize).
7. Sync `docs/KEYWORD-MAP.md`, `toolGuideMap.ts`, and llms question maps if intent wording changed.
8. Rebuild so OG PNG titles refresh (`scripts/generate-og-svg.mjs`).

## Verify

```bash
npm test && npm run audit
```

After deploy: `npm run indexnow`.
