# AdSense readiness evidence

Generated: 2026-10-23T11:18:06.318Z UTC

## Required pages

- [x] **About** — `about/index.html` (527 words rendered)
- [x] **Contact** — `contact/index.html` (174 words rendered)
- [x] **Privacy** — `privacy/index.html` (364 words rendered)
- [x] **Terms** — `terms/index.html` (227 words rendered)
- [x] **Methodology** — `methodology/index.html` (460 words rendered)

## Privacy / ads language

- AdSense/third-party mention: YES — see `privacy/index.html` in dist
- Opt-out links (aboutads / Google Ads Settings): YES

## ads.txt
```
# AdSense publisher line intentionally omitted until approval.
# When approved, add: google.com, pub-YOUR_PUBLISHER_ID, DIRECT, f08c47fec0942fa0
```

## CMP / consent banner

- Site ships **placeholder** AdSense slots disabled until `PUBLIC_ADS_ENABLED=true`.
- Owner must integrate a **Google-certified CMP** for EEA/UK/CH before personalized ads (`docs/ADSENSE.md`).

## Content depth (sample tool page)

- `tools/construction-estimate-template/index.html`: **1134** words (target ≥600 for tool pages)

## Navigation

- Footer links present on home: YES

## Automated check

Run `node scripts/audit/adsense-audit.mjs` (included in `npm run audit` / `seo-audit.txt`).
