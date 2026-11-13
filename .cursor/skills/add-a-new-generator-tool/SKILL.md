---
name: add-a-new-generator-tool
description: Add a new in-browser document generator tool page with fields, preview model, SEO content, and discovery wiring.
---
# Add a new generator tool

Replaces ad-hoc checklists. Also read `document-generator-niche` for legal-adjacent tools and `ui-ux-pro-max` for UI.

## Files to touch

| Step | Path |
|------|------|
| 1. Definition | `src/data/tools/estimates.ts` **or** `contracts.ts` **or** `forms-creative.ts` — full `ToolDefinition` |
| 2. Register | `src/data/tools/index.ts` (`allTools`; optionally `featuredToolSlugs` if it belongs in home/footer) |
| 3. Preview/PDF/DOCX | `src/components/generators/documentModel.ts` — `buildDocumentBlocks()` / meta labels when layout differs |
| 4. Sources | Prefer `src/data/tools/shared-sources.ts` |
| 5. Guides map | `src/data/toolGuideMap.ts` + Learn-more guides |
| 6. Keywords | `docs/KEYWORD-MAP.md` (unique primary keyword) |
| 7. Related | `relatedSlugs` on peers; hub via `category` / `CATEGORY_META` |
| 8. llms Q-map | `src/pages/llms.txt.ts` (+ `llms-full.txt.ts` if needed) for new intents |
| 9. README | Update tool list in `README.md` when present |
| 10. Tests | Extend Vitest if validation/preview behavior is new (`tests/`) |

Do **not** use `allTools.slice` for featured chrome — edit `featuredToolSlugs` explicitly.

## ToolDefinition essentials

- SEO: `primaryKeyword`, `title`/`h1`/`answerFirst` (≤45-word lead), `metaDescription`
- UX: fields + defaults; answer-first shell shows real inputs (see `DocumentGeneratorLazy.astro`)
- Dates in sample defaults may stay fixed for SSR; editor should use today via `withTodayDateDefaults` when that helper exists
- Content: `howToUse` (→ HowTo JSON-LD), `whatToInclude`, `workedExample`, `faq`, `sources`
- Legal-adjacent: `isLegalAdjacent: true` + disclaimer copy
- `updatedAt` real date → sitemap lastmod via `scripts/lib/content-dates.mjs`

## Schema / OG

- Emitted by `src/pages/tools/[slug].astro`: WebApplication, FAQPage, HowTo from `howToUse`, breadcrumbs
- Titles via `buildPageTitle()` — keep brand
- OG PNG: `/og/tool-<slug>.png` after `npm run build`

## Verify

```bash
npm test && npm run audit
# UI change: npx lhci autorun
```

After deploy: `npm run indexnow`.
