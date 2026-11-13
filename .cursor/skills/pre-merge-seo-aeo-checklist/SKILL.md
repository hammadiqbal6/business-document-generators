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

- [ ] One primary keyword per URL; mapped in `docs/KEYWORD-MAP.md`
- [ ] Titles leave room for `buildPageTitle()` brand; meta unique
- [ ] FAQPage / HowTo / Article only where on-page content exists
- [ ] Guide: answer-first, Sources, byline, tool CTA above the fold
- [ ] Tool: form shell usable without click-gate; `howToUse` present
- [ ] Featured list still uses `featuredToolSlugs` (includes money tools if intended)
- [ ] `updatedAt` real; sitemap lastmod not “now”
- [ ] OG references `.png`; llms question map updated for new intents
- [ ] CSP/`_headers` not loosened casually; consent region behavior unchanged unless intentional
- [ ] Separate PR scope (do not mix unrelated workstreams)

## After merge/deploy

```bash
npm run indexnow
```
