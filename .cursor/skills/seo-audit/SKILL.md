---
name: seo-audit
description: Run the seo-audit workflow for DocuForge Tools (see docs/SEO-PLAYBOOK.md).
---
# seo-audit

1. Read `docs/SEO-GUARDRAILS.md` and `docs/CUSTOM-DOMAIN.md`.
2. Run `npm run build && npm run audit` (includes `seo-audit.mjs` + `seo-guardrails.mjs`).
3. Optionally `npx lhci autorun` (median of 3, TBT ≤200ms).
4. Update `docs/KEYWORD-MAP.md` when adding pages.
