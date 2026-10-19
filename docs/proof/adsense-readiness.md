# AdSense readiness evidence

Generated: 2026-10-19T06:36:55.130Z UTC

## Required pages

- [x] **About** — `about/index.html` (242 words rendered)
- [x] **Contact** — `contact/index.html` (134 words rendered)
- [x] **Privacy** — `privacy/index.html` (299 words rendered)
- [x] **Terms** — `terms/index.html` (212 words rendered)
- [x] **Methodology** — `methodology/index.html` (241 words rendered)

## Privacy / ads language

- AdSense/third-party mention: YES — see `privacy/index.html` in dist
- Opt-out links (aboutads / Google Ads Settings): YES

## ads.txt
```
# Replace pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID before launch.
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

## CMP / consent banner

- Site ships **placeholder** AdSense slots disabled until `PUBLIC_ADS_ENABLED=true`.
- Owner must integrate a **Google-certified CMP** for EEA/UK/CH before personalized ads (`docs/ADSENSE.md`).

## Content depth (sample tool page)

- `tools/construction-estimate-template/index.html`: **955** words (target ≥600 for tool pages)

## Navigation

- Footer links present on home: YES

## Automated check

Run `node scripts/audit/adsense-audit.mjs` (included in `npm run audit` / `seo-audit.txt`).
