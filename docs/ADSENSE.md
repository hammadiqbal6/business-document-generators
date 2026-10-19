# Google AdSense readiness

## Before you apply

- [ ] 20–30+ quality pages (this site ships 16 tools + 5 guides + hubs + trust pages)
- [ ] Original prose on every tool page (600+ words below the tool)
- [ ] About, Contact, Privacy (with ad cookie disclosures), Terms, Methodology
- [ ] Working tools—no deceptive UX
- [ ] `ads.txt` updated with your publisher ID after approval
- [ ] Certified CMP for EEA/UK/CH if serving personalized ads ([Google CMP requirement](https://support.google.com/adsense/answer/13554116))

## Enable ads in this repo

1. Set `PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX`
2. Set `PUBLIC_ADS_ENABLED=true`
3. Update `public/ads.txt` with the same publisher line
4. Redeploy; verify slots in `AdSlot.astro` render without CLS (reserved min-height)

## Policy pitfalls for tool sites

- Tool-only pages without explanatory content
- Copied legal templates or scraped clauses
- Misleading “download” buttons near ads
- Thin programmatic duplicates

## Eligibility references

- [AdSense eligibility](https://support.google.com/adsense/answer/9724)
- [Not approved reasons](https://support.google.com/adsense/answer/81904)
- [Privacy policy requirements](https://support.google.com/adsense/answer/1348695)
