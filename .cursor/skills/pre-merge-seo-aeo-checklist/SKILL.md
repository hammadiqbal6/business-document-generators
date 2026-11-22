---
name: pre-merge-seo-aeo-checklist
description: Run the Docuklin pre-merge SEO/AEO gate (tests + full audit) and spot-check schema, sitemap, and discovery files.
---
# Pre-merge SEO / AEO checklist

Run before opening or updating a PR that touches pages, tools, guides, CSP, or consent.

## Required commands

```bash
npm test
npm run audit
```

`npm run audit` builds `dist/` then runs SEO audit, guardrails, page checklist, AdSense readiness, JS budget, and link check.

Optional when UI/perf changed:

```bash
npx lhci autorun
node scripts/verify-mobile.mjs
```

## Spot-checks (when relevant)

- [ ] One primary keyword per URL; mapped in `docs/KEYWORD-MAP.md`; no new cannibalization
- [ ] Titles leave room for `buildPageTitle()` brand; meta unique; `/tools/` still `Free Business Document Generators` with derived tool count
- [ ] FAQPage / HowTo / Article only where on-page content exists; BreadcrumbList present
- [ ] Guide: answer-first lead; question H2s open with 1–2 sentence answers; tables/checklists where useful; Sources; byline; tool CTA above the fold
- [ ] Tool: form shell usable without click-gate; `howToUse` present; Learn-more via `toolGuideMap`
- [ ] Hub copy/`whichTable` updated if tools added; no hard-coded “N+ tools”
- [ ] Featured list still uses `featuredToolSlugs` (includes money tools if intended)
- [ ] `updatedAt` real; sitemap lastmod not “now”; AI crawlers still Allow in robots
- [ ] OG references `.png`; llms question map updated for new intents
- [ ] CSP/`_headers` not loosened casually; consent region behavior unchanged unless intentional
- [ ] Separate PR scope (do not mix unrelated workstreams)
- [ ] `README.md` + `docs/GROWTH-STATUS.md` Done/Remaining updated in this PR
- [ ] `npm run audit:indexing` green (sitemap URLs self-canonical, not noindex)

## After merge/deploy (owner — not the PR agent before deploy)

```bash
npm run indexnow
```

Workers Builds already runs `npx wrangler deploy && node scripts/indexnow.mjs` on merge to `main`. Then in Google Search Console: URL Inspection → Request indexing for each new or substantially changed URL (redirect targets included via sitemap; do not change the IndexNow key file).