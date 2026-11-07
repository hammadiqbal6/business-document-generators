# Google AdSense readiness

## Before you apply

- [ ] 20–30+ quality pages (this site ships 16 tools + 5 guides + hubs + trust pages)
- [ ] Original prose on every tool page (600+ words below the tool)
- [ ] About, Contact, Privacy (with ad cookie disclosures), Terms, Methodology
- [ ] Working tools—no deceptive UX
- [ ] `ads.txt` emits your publisher line after you set `PUBLIC_ADSENSE_PUBLISHER_ID` and rebuild
- [ ] Certified CMP for EEA/UK/CH if serving personalized ads ([Google CMP requirement](https://support.google.com/adsense/answer/13554116))

## Enable ads in this repo

1. Set `PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX` (Workers Builds / `.env`)
2. Set `PUBLIC_ADS_ENABLED=true`
3. Create a **Display** ad unit in AdSense and set its numeric id:
   - `PUBLIC_ADSENSE_SLOT_DISPLAY=XXXXXXXXXX` — shared id for fixed in-page slots (`AdSlot` on home + tools)
   - Optional overrides: `PUBLIC_ADSENSE_SLOT_HOME`, `PUBLIC_ADSENSE_SLOT_TOOL` (same digits-only format)
4. Rebuild/redeploy — `src/pages/ads.txt.ts` writes `google.com, pub-…, DIRECT, f08c47fec0942fa0` when the publisher ID is set (comment placeholder when unset)
5. Verify `/ads.txt` on the live origin; verify `ins.adsbygoogle` appears with `data-ad-client`, numeric `data-ad-slot`, `data-ad-format="auto"`, and `data-full-width-responsive="true"`. Reserved `min-height` on the wrapper limits CLS.

If ads are enabled but no numeric slot id is set, fixed `AdSlot` placements render **nothing** (so Auto ads are not blocked by empty/broken units). Do not pass Astro’s reserved `slot` attribute into `AdSlot` — use the `placement` prop (`home-top` | `tool-mid`).

## Policy pitfalls for tool sites

- Tool-only pages without explanatory content
- Copied legal templates or scraped clauses
- Misleading “download” buttons near ads
- Thin programmatic duplicates

## Eligibility references

- [AdSense eligibility](https://support.google.com/adsense/answer/9724)
- [Not approved reasons](https://support.google.com/adsense/answer/81904)
- [Privacy policy requirements](https://support.google.com/adsense/answer/1348695)
