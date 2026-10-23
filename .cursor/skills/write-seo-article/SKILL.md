---
name: write-seo-article
description: Write a supporting guide article for DocuForge with answer-first intro and internal links.
---
# Write a guide

1. Add entry to `src/data/guides.ts` (answerFirst, sections with optional table, FAQ, relatedToolSlugs, relatedGuideSlugs).
2. Page auto-generates at `/guides/[slug]/` (Article + FAQPage JSON-LD, author/dateModified).
3. ≥800 words (target ~1000+), one H1, worked example, table, 4–6 FAQ; link 2+ topic-specific tools.
4. For contracts/NDAs/consent/rental: set `legalNote` (not legal advice) outside the FAQ.
5. Register in `src/data/toolGuideMap.ts`, hub lists, KEYWORD-MAP, and ensure `llms.txt` / sitemap pick it up.
6. Follow `docs/SEO-GUARDRAILS.md`.
