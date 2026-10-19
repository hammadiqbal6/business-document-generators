# Deployment

Primary host: **Cloudflare Pages**. Alternatives: Vercel, Netlify.

## Prerequisites

- Node.js 20+
- `npm ci && npm run build` succeeds locally
- Custom domain DNS access

## Cloudflare Pages

1. Connect the GitHub repo; production branch `main`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables (Production):

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SITE_URL` | Canonical origin, e.g. `https://yourdomain.com` |
| `PUBLIC_SITE_NAME` | Brand name in titles/schema |
| `PUBLIC_CONTACT_EMAIL` | Contact + Organization schema |
| `PUBLIC_ADSENSE_PUBLISHER_ID` | `ca-pub-…` when approved |
| `PUBLIC_ADS_ENABLED` | `true` only after AdSense approval |
| `PUBLIC_GA4_MEASUREMENT_ID` | Optional analytics |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console meta token |
| `PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster meta token |
| `PUBLIC_INDEXNOW_KEY` | Must match `public/{key}.txt` |

5. **HTTPS**: automatic on Cloudflare.
6. **www redirect**: Page Rule or Redirect Rule `www` → apex (or reverse)—pick one canonical host and 301 the other.
7. Upload `public/_headers` for security headers (included in build output).

## Vercel

- Framework preset: Astro
- Output: static (`dist`)
- Same `PUBLIC_*` env vars
- Add `vercel.json` redirects for www canonicalization

## Netlify

- Build: `npm run build`, publish `dist`
- Copy `_headers` from `public/`
- Set env vars in UI

## Post-deploy

1. Replace `docuforge.example` in `public/robots.txt`, `llms.txt`, and `ads.txt` with your domain.
2. Submit `sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
3. Run IndexNow POST for changed URLs (see `docs/SEO-GUIDE.md`).
4. Verify Core Web Vitals in GSC after 28 days of traffic.
