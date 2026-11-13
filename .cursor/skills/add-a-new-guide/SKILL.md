---
name: add-a-new-guide
description: Add a new SEO/AEO guide article to Docuklin with answer-first structure, Sources, schema, and tool links.
---
# Add a new guide

Use this instead of inventing a new outline. Companion: `refresh-an-existing-guide`, `pre-merge-seo-aeo-checklist`, `document-generator-niche`.

## Research

1. One primary query; check `docs/KEYWORD-MAP.md` for cannibalization.
2. Collect 3–6 real search questions (GSC / PAA) for H2s + FAQ.
3. Gather primary sources (IRS, SBA, FTC, HUD, Cornell LII, Copyright Office, etc.) — no invented stats.

## Implement

1. Add a `Guide` object to `src/data/guides.ts`:
   - `title`, `metaDescription`, `slug`
   - `answerFirst` (~40–60 words; answer in sentence 1)
   - `legalNote` when contract/consent/rental/health-adjacent
   - `howTo` only if steps appear on-page (feeds HowTo JSON-LD)
   - `sources[]` with `label` + `url` (+ optional `usedFor`)
   - `sections[]` with question H2s, worked example, optional `table`
   - `faq` (4–6; visible Q&A)
   - `relatedToolSlugs` (matching tool first), `relatedGuideSlugs`
   - `publishedAt` / `updatedAt` as real `YYYY-MM-DD` (drives sitemap lastmod)
2. Wire `src/data/toolGuideMap.ts` (tool → guide and reverse where needed).
3. Row in `docs/KEYWORD-MAP.md`.
4. If the intent is question-heavy, add a line to the question map in `src/pages/llms.txt.ts` (and keep `llms-full.txt.ts` coherent). `/.well-known/llms.txt` redirects — no duplicate body.
5. Titles: leave room for `buildPageTitle()` brand suffix; aim ≤60 chars.
6. OG: after build, confirm `/og/guide-<slug>.png` (from `scripts/generate-og-svg.mjs` prebuild). Pages reference **PNG**, not SVG.

## Page contract (`src/pages/guides/[slug].astro`)

Order: H1 → answer box (+ legal note) → **guide-cta** to primary tool (use tool “template” name when that matches the query) → byline → body → FAQ → Sources → AuthorBox.

## Verify

```bash
npm test && npm run audit
```

After deploy: `npm run indexnow`.
