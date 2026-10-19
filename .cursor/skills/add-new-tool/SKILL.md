---
name: add-new-tool
description: Add a new document generator tool page to this Astro repo with SEO content and tests.
---
# Add a new tool

1. Add `ToolDefinition` in `src/data/tools/` (fields, defaults, 600+ words in `content`, FAQ, sources).
2. Register in `src/data/tools/index.ts`.
3. Extend `buildDocumentBlocks()` in `src/components/generators/documentModel.ts` if layout differs.
4. Add row to `docs/KEYWORD-MAP.md` (unique primary keyword).
5. Link from hub in `CATEGORY_META` category + `relatedSlugs` on 2–3 peer tools.
6. Run `npm test`, `npm run build`, `npm run audit`.
7. Update `README.md` tool list.
