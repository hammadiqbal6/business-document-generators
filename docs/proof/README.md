# Proof artifacts

Regenerated: **2026-10-19T06:50:26.832Z** (UTC)

Reproduce everything:

```bash
npm run proof
```

## Index

| Check | Tool | Version | Date (UTC) | Result | Reproduce |
|-------|------|---------|------------|--------|-----------|
| Unit tests | Vitest | ^3.0.9 | 2026-10-19T06:50:26.832Z | PASS | `npm test` → [tests.txt](./tests.txt) |
| SEO / links / budget | Node audit scripts | repo | 2026-10-19T06:50:26.832Z | PASS | `npm run audit` → [seo-audit.txt](./seo-audit.txt) |
| Lighthouse | Lighthouse CLI | 12.8.2 | 2026-10-19T06:50:26.832Z | PASS | [lighthouse/SUMMARY.md](./lighthouse/SUMMARY.md) |
| Structured data | Node extractor | repo | 2026-10-19T06:50:26.832Z | see validation log | [structured-data/](./structured-data/) |
| Sitemap / robots | Node script | repo | 2026-10-19T06:50:26.832Z | see file | [sitemap-robots.txt](./sitemap-robots.txt) |
| Mobile UX | Playwright | — | 2026-10-19T06:50:26.832Z | see viewport log | [mobile/](./mobile/) |
| AdSense readiness | Node script | repo | 2026-10-19T06:50:26.832Z | see checklist | [adsense-readiness.md](./adsense-readiness.md) |
| Bundle sizes | Node script | repo | 2026-10-19T06:50:26.832Z | see file | [bundle-size.txt](./bundle-size.txt) |
| Build | Astro | ^5.18.2 | 2026-10-19T06:50:26.832Z | PASS | `npm run build` |

Numbers in Lighthouse JSON/HTML reports are machine-generated; do not edit by hand.

After production deploy, re-run [Google Rich Results Test](https://search.google.com/test/rich-results) on live URLs (see `structured-data/README-snippet.txt`).
