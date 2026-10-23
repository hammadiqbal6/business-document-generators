# Custom domain cutover

This site is live on the Cloudflare Workers `workers.dev` hostname. Canonical URLs, the sitemap, `robots.txt`, `llms.txt`, JSON-LD, Open Graph, and IndexNow all read **one** origin:

| Setting | Where |
|---------|--------|
| `PUBLIC_SITE_URL` | Workers Builds / CI / `.env` (preferred) |
| `DEFAULT_SITE_URL` | `src/config/siteDefaults.mjs` (fallback when env unset) |
| Astro `site` | `astro.config.mjs` → `process.env.PUBLIC_SITE_URL \|\| DEFAULT_SITE_URL` |

**Do not** hardcode the workers.dev (or future custom) hostname in pages, components, or scripts. Sister-site origins use their own `PUBLIC_SITE_URL_*` vars (`src/config/sisterSites.ts`).

---

## Before you cut over

1. Keep shipping on workers.dev until the custom domain responds with this site’s HTML.
2. Confirm `npm run build && npm run audit` is green (includes a guardrail that the **this-site** workers.dev hostname only appears in allowlisted config/docs).
3. Decide the apex (and optional `www`) hostname. Prefer one canonical host; 301 the other.

---

## Cutover steps

1. **Set the variable**  
   In Cloudflare Workers Builds → Variables (Production), set:
   ```bash
   PUBLIC_SITE_URL=https://your-domain.example
   ```
   Update GitHub Actions `env.PUBLIC_SITE_URL` the same way. Rebuild/deploy so Astro bakes the new origin into canonicals, sitemap, robots, llms, OG, and JSON-LD.

2. **Attach the custom domain in Cloudflare**  
   Workers & Pages → this Worker → Custom Domains → Add. Complete DNS as prompted. Do **not** change routes or wrangler `name` for a simple hostname move.

3. **301 from workers.dev → custom domain**  
   After the custom domain serves the new build, redirect the old host (Worker route, bulk redirect, or a small worker branch on Host) so every `https://business-document-generators.hammadiqbal117.workers.dev/*` URL 301s to `https://your-domain.example/*` (preserve path + trailing slash).

4. **Google Search Console**  
   - Add a **new** URL-prefix (or domain) property for the custom origin.  
   - Verify (HTML tag via `PUBLIC_GSC_VERIFICATION` or DNS).  
   - Submit `https://your-domain.example/sitemap-index.xml`.  
   - Use Change of Address if both properties are in the same Search Console account and Google offers it for your property types.  
   - Keep the workers.dev property until coverage moves; then retire it.

5. **IndexNow**  
   Deploy already publishes `public/<key>.txt`. After cutover, run `node scripts/indexnow.mjs` (or your post-deploy hook) so pings use the new host from the rebuilt sitemap.

6. **Sisters / bookmarks**  
   When sister sites move too, update their `PUBLIC_SITE_URL_*` pointing at this site (`PUBLIC_SITE_URL_BUSINESS_DOCS`).

7. **Optional later**  
   Change `DEFAULT_SITE_URL` in `siteDefaults.mjs` to the custom origin so local builds without `.env` match production. Not required on day one if Production always sets `PUBLIC_SITE_URL`.

---

## Verify after cutover

```bash
curl -sI https://your-domain.example/ | head
curl -s https://your-domain.example/robots.txt | grep Sitemap
curl -s https://your-domain.example/sitemap-index.xml | head
# Old host should 301:
curl -sI https://business-document-generators.hammadiqbal117.workers.dev/tools/ | head
```

Canonical, `og:url`, and sitemap `<loc>` values must all use the custom origin—no mixed hosts.
