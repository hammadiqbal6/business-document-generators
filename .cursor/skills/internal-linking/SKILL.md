---
name: internal-linking
description: Run the internal-linking workflow for DocuForge Tools (see docs/SEO-PLAYBOOK.md).
---
# internal-linking

1. Maintain `src/data/toolGuideMap.ts` (tool→guides, guide→guides, hub→guides).
2. Tool pages: `LearnMoreGuides` block; guides: topic-specific `relatedToolSlugs` (never identical lists) + RelatedGuides.
3. Strengthen weak tools (tattoo-consent, cleaning-invoice, rental-lease) with multiple inbound guide links.
4. Follow `docs/SEO-PLAYBOOK.md` / `docs/SEO-GUARDRAILS.md`; run `npm run audit`. Update `docs/KEYWORD-MAP.md`.
