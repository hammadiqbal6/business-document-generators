# AGENTS.md — DocuForge Tools

## Overview

Static Astro + TypeScript site with React islands for in-browser document generators. Privacy-first: no server-side storage of user form data. Target niche: **idea #20 — niche business document generators** (see `docs/ideas/README.md`).

## Architecture

- `src/config/site.ts` — single owner config (domain, brand, AdSense, GA4, EmailJS, verification tokens)
- `/contact/` — optional EmailJS form (`PUBLIC_EMAILJS_*`); mailto fallback when unset — `docs/CONTACT-EMAILJS.md`
- `src/data/tools/` — tool definitions (fields, defaults, SEO content)
- `src/components/generators/` — `DocumentGenerator` island, preview model, lazy PDF/DOCX export
- `src/pages/tools/[slug].astro` — tool shell + static educational content
- `scripts/audit/` — SEO, AdSense, budget, link checks (`npm run audit`)
- `lighthouserc.cjs` — mobile Lighthouse CI budgets

## Add a new tool

1. Create or extend a file under `src/data/tools/` with a full `ToolDefinition`.
2. Register in `src/data/tools/index.ts`.
3. If needed, add a branch in `documentModel.ts` `buildDocumentBlocks()`.
4. Map keyword in `docs/KEYWORD-MAP.md`.
5. Set `relatedSlugs` and hub category.
6. Run `npm test`, `npm run build`, `npm run audit`, `npx lhci autorun`.

## Content / SEO / AdSense rules

- Governing playbook: `docs/SEO-PLAYBOOK.md`
- Hard do/don’t + CI: `docs/SEO-GUARDRAILS.md` (also `.cursor/rules/seo-guardrails.mdc`)
- **Research first for every new/reworked page:** `.cursor/rules/seo-pages.mdc` + full checklist `docs/PAGE-CHECKLIST.md`
- Custom domain cutover (do not change domain until ready): `docs/CUSTOM-DOMAIN.md`
- Site origin: **only** `PUBLIC_SITE_URL` / `src/config/siteDefaults.mjs` — canonicals, sitemap, robots, llms, JSON-LD, OG, IndexNow
- One primary keyword per URL; answer-first intro; 600+ words on tool pages; guides ≥800 (target ~1000+)
- **Answer-first tools:** H1 → short lead → static form shell with real inputs (no click-only “Open editor” gate) → byline under tool; ≤60 words before first input; full React editor on first edit; cookie bar ≤56px; keep proof Lighthouse CLS ≤0.05
- Never render Ahrefs/KD notes or internal keyword scores on public pages
- Tool pages must link topical guides (`src/data/toolGuideMap.ts` + Learn more block)
- FAQ on page + FAQPage JSON-LD; hubs/`/tools/`/`/guides/` need BreadcrumbList + CollectionPage
- AdSense: `docs/ADSENSE.md` — privacy ad disclosures, ads.txt, CMP for EEA
- CI page checklist: `npm run audit:pages` (wired into `npm run audit`)

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Static `dist/` |
| `npm test` | Vitest (validation + PDF export) |
| `npm run audit` | Build + SEO/guardrails/page-checklist/AdSense/budget/links |
| `npm run audit:pages` | Per-page checklist only (needs `dist/`) |
| `npx lhci autorun` | Lighthouse mobile budgets |
| `npm run proof` | Regenerate committed `docs/proof/` evidence |

## Definition of done

- All tools work end-to-end (preview, PDF, DOCX, localStorage)
- Trust pages complete; audits + tests green; Lighthouse mobile ≥ 95
- PROGRESS.md at 100%; PR ready for review with scores and 360px screenshots

## Subagents (`.cursor/agents/`)

| Agent | Role |
|-------|------|
| seo-auditor | `npm run audit`, KEYWORD-MAP, schema |
| content-writer | guides + tool prose |
| adsense-reviewer | privacy/ads.txt/CMP checklist |
| performance-auditor | Lighthouse + JS budgets |
| link-builder-researcher | outreach ideas in SEO-GUIDE |
| document-fact-checker | legal-adjacent disclaimers, sources |

## Cursor skills

See `.cursor/skills/*/SKILL.md` — especially `add-new-tool` and `document-generator-niche`.

## UI/UX Pro Max

Use this skill for **any change to how the site looks or behaves** (layout, components, forms, motion, responsive, a11y).

1. Read `.cursor/skills/ui-ux-pro-max/SKILL.md`.
2. Search the local design/UX database:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>
```

Optional flags from the skill (when relevant):

- `--design-system` — product-wide visual direction
- `--stack astro` (or `react`) — stack-specific implementation guidance

Example (verified):

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "form accessibility contrast focus" --domain ux
```

Priority checks before shipping UI:

- Contrast ≥ 4.5:1
- Touch targets ≥ 44×44px
- Visible focus indicators
- Form labels + inline errors (not placeholder-only)
- Dark mode contrast / safe areas where applicable
- No horizontal scroll
- Respect `prefers-reduced-motion`
