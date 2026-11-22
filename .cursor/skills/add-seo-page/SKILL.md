---
name: add-seo-page
description: Step-by-step SEO/AEO checklist for adding or editing a Docuklin tool or guide (cannibalization, titles, answer-first H2s, toolGuideMap, hubs, sitemap, AI Overviews).
---
# Add or edit an SEO page (tool or guide)

Use for every new or substantially rewritten tool/guide. Companions: `add-a-new-generator-tool`, `add-a-new-guide`, `refresh-an-existing-guide`, `pre-merge-seo-aeo-checklist`, `document-generator-niche`. Standing rules: `AGENTS.md` §5, `.cursor/rules/seo.mdc`, `docs/PAGE-CHECKLIST.md`. Read `docs/GROWTH-STATUS.md` first.

## 1. Research and cannibalization

1. One primary query + intent (do / know / compare / navigate).
2. Check `docs/KEYWORD-MAP.md` and existing URLs for the same cluster.
3. If overlap: **extend or merge** the existing page and 301 the loser in `public/_redirects` — do not ship a near-duplicate.
4. Collect 3–6 real questions (GSC / PAA / autocomplete) → H2s + FAQ.
5. Prefer tool = template/generator; guide = how-to / checklist / example (distinct title words).

## 2. Title, H1, meta

1. Source title ≤60 chars (prefer ≤54); unique; real query wording near the start.
2. Pass through `buildPageTitle()` — leave room for ` | Docuklin`. Prefer colon over en dash.
3. Unique H1 and meta (~70–160). Flagship estimate copy: lead with “Free Estimate Generator” and “no signup, no watermark.”
4. `/tools/` index targets **business document generator** → title `Free Business Document Generators`; never hard-code “16+” — use `allTools.length`.

## 3. Answer-first body (SEO + AI Overviews / AI Mode)

1. Page lead / `answerFirst`: answer in sentence 1 (~40–60 words guides; ≤45-word tool lead).
2. **Every question H2:** first 1–2 sentences = direct answer; then detail.
3. Add plain-HTML **comparison tables** and **checklists** where the query compares docs or asks “what to include.”
4. Concrete examples: sample estimate lines, sample clauses (labeled illustrative if unsourced).
5. Visible Reviewed by / author + Last updated (`updatedAt`) + link to `/methodology/`.
6. Legal topics = general information only (`legalNote` / `isLegalAdjacent`).

Pages already seen in Google generative AI features (keep strong; do not thin out):  
`line-item-totals-explained`, `tattoo-consent-documentation` (keep URL), `work-order-vs-invoice-vs-estimate` — answer-first H2s, tables, clear links to invoice / estimate / quote / consent tools.

## 4. Wire discovery (mandatory)

1. `src/data/toolGuideMap.ts` — tool→guides and guide→guides.
2. Hub: update `hubs/[category].astro` copy/`whichTable`/FAQ when the hub gains a tool; fix stale hub titles.
3. Internal links from hub + **2–3** related tools/guides (topical anchors).
4. `docs/KEYWORD-MAP.md` row; `llms.txt` / `llms-full` question maps for new intents (`src/lib/llmsTxt.ts`).
5. Confirm URL will be in sitemap (real route + `updatedAt`). Self-canonical, trailing slash.
6. Never build URLs from null/undefined. Do not block AI crawlers in robots.

## 5. Schema

- Tools: WebApplication + BreadcrumbList; FAQPage/HowTo only if visible.
- Guides: Article + BreadcrumbList; FAQPage/HowTo only if visible.
- Values must match on-page text.

## 6. Verify and docs

```bash
npm test && npm run audit
```

Update `README.md` + `docs/GROWTH-STATUS.md` Done/Remaining in the same PR. Confirm new URLs appear in `dist` sitemap after build (IndexNow reads that list — do not change the IndexNow key file).

### After production deploy (owner / post-merge — not in the PR agent)

1. **IndexNow:** `npm run indexnow` (or Workers Builds already runs `npx wrangler deploy && node scripts/indexnow.mjs`). Submits every sitemap URL, including new pages and **redirect targets**. Do not run IndexNow before deploy.
2. **Google Search Console:** URL Inspection → **Request indexing** for each new or substantially changed page (and spot-check that 301 sources land on the canonical target).
3. Do not add a second IndexNow submitter; do not rotate/replace `public/4d6f1ea5473a0968a83c67ceda5a0387.txt` unless the owner asks.
