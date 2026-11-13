# AGENTS.md — Docuklin

## Overview

Static Astro + TypeScript site with React islands for in-browser document generators. Privacy-first: no server-side storage of user form data. Target niche: **idea #20 — niche business document generators** (see `docs/ideas/README.md`).

## Architecture

- `src/config/site.ts` + `siteDefaults.mjs` — single owner config (domain, brand, AdSense, GA4, EmailJS, verification tokens); see `docs/CONFIGURATION.md`
- `/contact/` — optional EmailJS form (`PUBLIC_EMAILJS_*`); mailto fallback when unset — `docs/CONTACT-EMAILJS.md`
- `src/data/tools/` — tool definitions (fields, defaults, SEO content)
- `src/components/generators/` — `DocumentGenerator` island, preview model, lazy PDF/DOCX export
- `src/pages/tools/[slug].astro` — tool shell + static educational content
- `src/data/guides.ts` — guide articles; `src/pages/guides/[slug].astro` renders them
- `scripts/audit/` — SEO, AdSense, budget, link checks (`npm run audit`)
- `lighthouserc.cjs` — mobile Lighthouse CI budgets

## Agent workflow (standing)

- **One focused PR per concern.** Do not mix content, CMP/consent, generator UX, and docs into one branch.
- Branch from latest `main`: `cursor/<descriptive-name>-1fce`. Open the PR; do not merge unless asked.
- Prefer the skills under `.cursor/skills/` over reinventing checklists.

## Standing rules (learned)

### Content voice

- Write like a careful human editor: concrete, specific, scannable. No AI filler.
- **Banned (non-exhaustive):** “in today’s digital landscape”, “delve into”, “leverage”, “unlock the power”, “comprehensive guide to”, “whether you’re a … or a …”, “it’s important to note that”, “navigate the complexities”, “furthermore/moreover” stacks, “in conclusion”.
- **No invented stats.** Every number, rate, deadline, or legal claim needs a primary source URL. Prefer IRS, SBA, FTC, HUD, Cornell LII, Copyright Office, OSHA, CDC over blogs.
- Guides: visible **Sources** list (`guide.sources`) + byline `Reviewed by Hammad Iqbal · Last updated <date>` (see `src/pages/guides/[slug].astro`).
- Contracts / NDA / consent / rental / health-adjacent: `legalNote` + “not legal advice” (and medical where relevant). Tools: `isLegalAdjacent: true` when applicable.

### Guide structure

- H1 → answer-first box (**~40–60 words**, sourced verdict in sentence 1) → **primary tool CTA above the fold** → byline → body.
- H2s as real search questions (PAA / GSC). Include a worked example + table when useful. FAQ 4–6 items that match visible Q&A.
- Guide CTA / body should use the same **template** naming as the matching tool when that is the ranking query (e.g. “podcast script template”).
- Full checklist: `docs/PAGE-CHECKLIST.md`. Skill: `add-a-new-guide`, `refresh-an-existing-guide`.

### Schema & titles

- Guides: `Article` + `FAQPage` (+ `HowTo` **only** when `guide.howTo` matches on-page steps).
- Tools: `WebApplication`/`SoftwareApplication` + `FAQPage` + `HowTo` from `tool.content.howToUse` (see `src/pages/tools/[slug].astro`).
- Titles go through `buildPageTitle()` in `src/lib/seo.ts` — leave room for ` | Docuklin`; aim ≤60 chars at the source (CI 25–65). Do not pre-strip the brand.

### Featured tools, sitemap, IndexNow, llms, OG

- Home/footer/404 featured list = **`featuredToolSlugs` / `getFeaturedTools()`** in `src/data/tools/index.ts`. Never `allTools.slice(0, N)` — array order hid quote/receipt.
- Sitemap `lastmod` comes from real `updatedAt` via `scripts/lib/content-dates.mjs` + `astro.config.mjs` serialize. **Never** set lastmod to “now”.
- After publish/deploy: `npm run indexnow` (or `deploy:indexnow`). See `scripts/indexnow.mjs`.
- `llms.txt` / `llms-full.txt` are generated from `src/pages/llms.txt.ts` and `llms-full.txt.ts` (tools/guides auto-list). Keep the **question map** in those files in sync when adding intent-heavy pages. `/.well-known/llms.txt` 301s to `/llms.txt`.
- Page `og:image` must be **PNG** (`/og/guide-*.png`, `/og/tool-*.png`). `prebuild` runs `scripts/generate-og-svg.mjs` (SVG source + PNG rasterize). Do not ship SVG-only OG URLs.

### CSP (`public/_headers`)

Keep the allowlist tight. Widen only for a live CSP console violation + vendor docs. Required hosts today:

| Purpose | Hosts (why) |
|---------|-------------|
| GA4 | `googletagmanager.com`, `google-analytics.com`, `*.google-analytics.com`, `*.analytics.google.com` |
| AdSense + Funding Choices CMP | `pagead2.googlesyndication.com`, `googlesyndication.com`, `fundingchoicesmessages.google.com`, `*.adtrafficquality.google`, DoubleClick frames |
| Cloudflare Web Analytics | `static.cloudflareinsights.com`, `cloudflareinsights.com` |
| EmailJS contact | `api.emailjs.com`, `cdn.jsdelivr.net` (SDK) |

### Consent

- Consent Mode v2: **denied by default** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`) in `src/components/seo/Analytics.astro`.
- **EEA / UK (`GB`) / CH:** Google AdSense Privacy & messaging (Funding Choices / IAB TCF v2.2) is the CMP. Worker injects `window.__docuklinGeo` (`src/lib/consentRegions.ts`); site cookie bar is suppressed there when ads are on.
- **Elsewhere:** site Accept/Reject cookie banner. See `docs/ADSENSE.md`, `docs/DEPLOYMENT.md`.

## Add a new tool / guide

Use skills (do not skip files):

| Task | Skill |
|------|--------|
| New generator | `.cursor/skills/add-a-new-generator-tool/SKILL.md` |
| New guide | `.cursor/skills/add-a-new-guide/SKILL.md` |
| Refresh guide | `.cursor/skills/refresh-an-existing-guide/SKILL.md` |
| Pre-merge gate | `.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md` |

Also: `document-generator-niche`, `ui-ux-pro-max` when UI changes.

## Content / SEO / AdSense pointers

- Playbook: `docs/SEO-PLAYBOOK.md` · Guardrails: `docs/SEO-GUARDRAILS.md` · `.cursor/rules/seo-*.mdc`
- Research first: `.cursor/rules/seo-pages.mdc` + `docs/PAGE-CHECKLIST.md`
- Origin: **only** `PUBLIC_SITE_URL` / `siteDefaults.mjs`
- Answer-first tools: H1 → short lead → static form shell with real inputs (no “Open editor” gate) → byline under tool
- Never render Ahrefs/KD notes on public pages

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Static `dist/` (runs OG prebuild) |
| `npm test` | Vitest |
| `npm run audit` | Build + SEO/guardrails/page-checklist/AdSense/budget/links |
| `npm run audit:pages` | Per-page checklist only (needs `dist/`) |
| `npx lhci autorun` | Lighthouse mobile budgets |
| `npm run indexnow` | Ping IndexNow from built sitemap |
| `npm run proof` | Regenerate committed `docs/proof/` evidence |

## Definition of done

- Tools work end-to-end (preview, PDF, DOCX, localStorage) when changed
- Audits + tests green; Lighthouse mobile ≥ 95 when UI/perf touched
- Separate PR ready for review (scores / screenshots when relevant)

## Subagents (`.cursor/agents/`)

| Agent | Role |
|-------|------|
| seo-auditor | `npm run audit`, KEYWORD-MAP, schema |
| content-writer | guides + tool prose |
| adsense-reviewer | privacy/ads.txt/CMP checklist |
| performance-auditor | Lighthouse + JS budgets |
| link-builder-researcher | outreach ideas in SEO-GUIDE |
| document-fact-checker | legal-adjacent disclaimers, sources |

## UI/UX Pro Max

For **any** look/behavior change: read `.cursor/skills/ui-ux-pro-max/SKILL.md`, then:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>
```

Priority: contrast ≥ 4.5:1, touch ≥ 44×44, visible focus, labeled fields, no horizontal scroll, `prefers-reduced-motion`.
