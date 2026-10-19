# AGENTS.md — DocuForge Tools

## Overview

Static Astro + TypeScript site with React islands for in-browser document generators. Privacy-first: no server-side storage of user form data. Target niche: **idea #20 — niche business document generators** (see `docs/ideas/README.md`).

## Architecture

- `src/config/site.ts` — single owner config (domain, brand, AdSense, GA4, verification tokens)
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
- One primary keyword per URL; answer-first intro; 600+ words on tool pages
- FAQ on page (no reliance on FAQ rich results)
- AdSense: `docs/ADSENSE.md` — privacy ad disclosures, ads.txt, CMP for EEA

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Static `dist/` |
| `npm test` | Vitest (validation + PDF export) |
| `npm run audit` | Build + SEO/AdSense/budget/links |
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
