# SEO guardrails (business-document-generators)

Hard requirements so builds never ship the indexing / AEO bugs from the Oct 2026 multi-site audit. Enforced by `npm run audit` → `scripts/audit/seo-guardrails.mjs` after `npm run build`.

**Canonical origin:** `PUBLIC_SITE_URL` or `DEFAULT_SITE_URL` in `src/config/siteDefaults.mjs` (currently workers.dev). Cutover: [CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md).  
**Governing docs:** [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md), [SEO-GUIDE.md](./SEO-GUIDE.md), [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Issues covered (do / don’t)

### Do

- [ ] Keep **one** site origin: `PUBLIC_SITE_URL` / Astro `site` / `siteDefaults.mjs` — used for canonicals, sitemap, robots `Sitemap:`, llms.txt, JSON-LD, OG URLs, IndexNow host.
- [ ] Use run-first `src/worker.ts` for **308** trailing-slash redirects; `FILE_EXT` must allow `{1,16}` (`.webmanifest`).
- [ ] Cache `/_astro/*` as `public, max-age=31536000, immutable`; give favicons/images a sensible `max-age` (e.g. 86400).
- [ ] Inline critical CSS on tool pages (`astro.config` `inlineStylesheets: 'always'`).
- [ ] Emit BreadcrumbList + CollectionPage on hubs and `/guides/`.
- [ ] Keep **titles 25–65 chars** (target ~30–60, unique, include brand + topic); **meta descriptions 70–160 chars** (target ~120–160). `og:title` / `twitter:title` and OG/Twitter descriptions must match `<title>` / meta description. One H1; self-canonical.
- [ ] Homepage: 40–60 word direct-answer intro under H1 (not only brand tagline).
- [ ] Full `llms.txt` listing every tool and guide with one-liners.
- [ ] Tool pages link to topical guides (“Learn more”); guides use topic-specific related tools + guide↔guide links.
- [ ] Guides ≥800 words (target ~1000+) with worked example, table, FAQ + FAQPage schema, author/dateModified; legal note outside FAQ for contracts/NDAs/consent/rental.
- [ ] Keep IndexNow key at `public/<32-hex>.txt` (not placeholder `000…0`).
- [ ] Keep `assets.html_handling: "force-trailing-slash"` and `"previews": {}` in `wrangler.jsonc`.
- [ ] Put `PUBLIC_*` in Cloudflare Workers Builds **dashboard** env (build-time), not wrangler top-level `vars`.
- [ ] Production deploy: `npx wrangler deploy && node scripts/indexnow.mjs`.
- [ ] Lighthouse mobile: median of 3 runs, TBT ≤200ms (`lighthouserc.cjs` / proof).

### Don’t

- [ ] Don’t implement custom domains in SEO PRs unless asked — document only ([CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md)).
- [ ] Don’t hardcode this site’s workers.dev hostname outside `siteDefaults.mjs` (and env/docs allowlist).
- [ ] Don’t use `https://example.com` as a site URL fallback.
- [ ] Don’t append trailing slashes to file URLs (`og:image`, favicons, IndexNow `.txt`).
- [ ] Don’t put IndexNow keys only under `public/indexnow/` — IndexNow expects `https://host/<key>.txt`.
- [ ] Don’t commit `00000000000000000000000000000000.txt` as the live key.
- [ ] Don’t add wrangler top-level `vars` for `PUBLIC_*` on this Worker — breaks `npx wrangler preview` (file-converter-tools lesson). Always keep `"previews": {}`.
- [ ] Don’t ship classic inline `<script>` that uses `import` (GA/Analytics lesson on fiber).
- [ ] Don’t leave tool pages without a guide link, or guides under 800 words.
- [ ] Don’t serve `/_astro/*` with `max-age=0`.

---

## Lessons from siblings

| Lesson | Source | Rule |
|--------|--------|------|
| Top-level wrangler `vars` broke `npx wrangler preview` | file-converter-tools | No top-level `vars`; `"previews": {}`; build-time env in dashboard |
| `og:image` ending in `/` 404 | file-converter-tools | `absoluteUrl` must not force slash on file assets |
| `example.com` baked into sitemap | file-converter-tools | Default origin = live workers.dev via `siteDefaults.mjs` |
| Proof single-run LH flake vs LHCI median-of-3 | pet-calculators PR #8 | Proof retries up to 3 and takes median; TBT 200 |

---

## CI / audit enforcement

| Check | Where |
|-------|--------|
| No `example.com` in dist SEO surfaces | `seo-guardrails.mjs` |
| No hardcoded this-site workers.dev outside allowlist | same |
| Canonical host matches `PUBLIC_SITE_URL` | same |
| No `og:image` ending in `/` | same |
| Titles 25–65; meta 70–160; og/twitter match title+desc; canonical; single H1 | same |
| Tool→guide link; guides ≥800 words; pages in sitemap | same |
| Broken internal links; invalid JSON-LD | same |
| Inline classic scripts with `import` | same |
| `/_astro/*` immutable header | same |
| IndexNow placeholder key absent; real key present | same |
| Worker 308 + FILE_EXT `{1,16}`; no wrangler top-level `vars` | same |

```bash
npm run build && npm run audit
npm test
```
