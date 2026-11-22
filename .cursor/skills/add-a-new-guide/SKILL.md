---
name: add-a-new-guide
description: Add a new SEO/AEO guide article to Docuklin with answer-first structure, Sources, schema, and tool links.
---
# Add a new guide

Use this instead of inventing a new outline. Companion: **`add-seo-page`** (full SEO/AEO checklist), `refresh-an-existing-guide`, `pre-merge-seo-aeo-checklist`, `document-generator-niche`. Rules: `AGENTS.md` §5, `.cursor/rules/seo.mdc`.

## Research

1. One primary query; check `docs/KEYWORD-MAP.md` for cannibalization (merge + 301 if cluster already covered).
2. Collect 3–6 real search questions (GSC / PAA) for H2s + FAQ.
3. Gather primary sources (IRS, SBA, FTC, HUD, Cornell LII, Copyright Office, etc.) — no invented stats.
4. Run through `add-seo-page` for titles, toolGuideMap, hub links, sitemap, and AI Overview answer-first H2s.

## Implement

1. Add a `Guide` object to `src/data/guides.ts`:
   - `title`, `metaDescription`, `slug`
   - `answerFirst` (~40–60 words; answer in sentence 1)
   - `legalNote` when contract/consent/rental/health-adjacent
   - `howTo` only if steps appear on-page (feeds HowTo JSON-LD)
   - `sources[]` with `label` + `url` (+ optional `usedFor`)
   - `sections[]` with question H2s (**first 1–2 sentences = direct answer**), worked example, optional comparison `table` / checklist
   - `faq` (4–6; visible Q&A; answers start with the direct reply)
   - `relatedToolSlugs` (matching tool first), `relatedGuideSlugs`
   - `publishedAt` / `updatedAt` as real `YYYY-MM-DD` (drives sitemap lastmod)
2. Wire `src/data/toolGuideMap.ts` (tool → guide and reverse where needed).
3. Row in `docs/KEYWORD-MAP.md`.
4. If the intent is question-heavy, add a line to the question map in `src/lib/llmsTxt.ts` (and keep `llms-full.txt.ts` coherent). `/.well-known/llms.txt` reuses the same plain-text body — do not add a separate redirect.
5. Titles: leave room for `buildPageTitle()` brand suffix; aim ≤60 chars.
6. OG: after build, confirm `/og/guide-<slug>.png` (from `scripts/generate-og-svg.mjs` prebuild). Pages reference **PNG**, not SVG.

## Page contract (`src/pages/guides/[slug].astro`)

Order: H1 → answer box (+ legal note) → **guide-cta** to primary tool (use tool “template” name when that matches the query) → byline → body → FAQ → Sources → AuthorBox.

## Verify

```bash
npm test && npm run audit
```

After deploy: `npm run indexnow`.
