# Custom domain cutover

This site’s canonical origin is **https://docuklin.com** (brand: **Docuklin**). Canonical URLs, the sitemap, `robots.txt`, `llms.txt`, JSON-LD, Open Graph, and IndexNow all read **one** origin:

| Setting | Where |
|---------|--------|
| `PUBLIC_SITE_URL` | Workers Builds / CI / `.env` (preferred) |
| `DEFAULT_SITE_URL` | `src/config/siteDefaults.mjs` (fallback when env unset) |
| Astro `site` | `astro.config.mjs` → `process.env.PUBLIC_SITE_URL \|\| DEFAULT_SITE_URL` |
| Worker `CANONICAL_ORIGIN` | `wrangler.jsonc` `vars` (runtime only; defaults to `https://docuklin.com`) |

**Do not** hardcode the custom-domain hostname in pages, components, or scripts beyond `siteDefaults.mjs` / wrangler vars. Sister-site origins use their own `PUBLIC_SITE_URL_*` vars (`src/config/sisterSites.ts`).

---

## Legacy workers.dev → custom domain (301)

The run-first Worker (`src/worker.ts`) permanently redirects the **exact** old production hostname:

`business-document-generators.hammadiqbal117.workers.dev`

to the same path + query on `CANONICAL_ORIGIN` (default `https://docuklin.com`), status **301**, in a **single hop** (trailing-slash normalization is applied in that same 301 — no 308-then-301 chain).

| Host | Behavior |
|------|----------|
| `business-document-generators.hammadiqbal117.workers.dev` | 301 → `https://docuklin.com` + path + query |
| `docuklin.com` | Normal site; trailing-slash only → **308** when needed |
| `<version>-business-document-generators.….workers.dev` (previews) | **No** host redirect (local/preview still works) |
| `localhost` / `127.0.0.1` | **No** host redirect |

Override the target apex without a rebuild of Astro HTML by setting Worker var `CANONICAL_ORIGIN` in `wrangler.jsonc` or the Cloudflare dashboard (must be `https://…` with no trailing slash). Build-time `PUBLIC_*` vars are **not** available to the Worker runtime.

Constant for the legacy host: `LEGACY_WORKERS_DEV_HOST` in `src/config/siteDefaults.mjs`. Unit coverage: `tests/worker-redirect.test.ts`.

---

## Before you cut over

1. Keep shipping on workers.dev until the custom domain responds with this site’s HTML.
2. Confirm `npm run build && npm run audit` is green (includes a guardrail that the **canonical** hostname only appears in allowlisted config/docs).
3. Decide the apex (and optional `www`) hostname. Prefer one canonical host; 301 the other.

---

## Cutover steps

1. **Set the variable**  
   In Cloudflare Workers Builds → Variables (Production), set:
   ```bash
   PUBLIC_SITE_URL=https://docuklin.com
   PUBLIC_SITE_NAME=Docuklin
   ```
   Update GitHub Actions `env.PUBLIC_SITE_URL` / `PUBLIC_SITE_NAME` the same way. Rebuild/deploy so Astro bakes the new origin into canonicals, sitemap, robots, llms, OG, and JSON-LD.

2. **Attach the custom domain in Cloudflare**  
   Workers & Pages → this Worker → Custom Domains → Add. Complete DNS as prompted. Do **not** change routes or wrangler `name` for a simple hostname move.

3. **301 from workers.dev → custom domain**  
   Deployed in `src/worker.ts` (see above). After deploy, verify:
   ```bash
   curl -sI 'https://business-document-generators.hammadiqbal117.workers.dev/tools/invoice/?a=1' | head
   # expect: 301 Location: https://docuklin.com/tools/invoice/?a=1
   ```

4. **Google Search Console**  
   - Add a **new** URL-prefix (or domain) property for `https://docuklin.com`.  
   - Verify (HTML tag via `PUBLIC_GSC_VERIFICATION` or DNS).  
   - Submit `https://docuklin.com/sitemap-index.xml`.  
   - Use **Change of Address** (requires the permanent 301 from the old host).  
   - Keep the workers.dev property until coverage moves; then retire it.

5. **IndexNow**  
   Deploy already publishes `public/<key>.txt`. After cutover, run `node scripts/indexnow.mjs` (or your post-deploy hook) so pings use the new host from the rebuilt sitemap.

6. **Sisters / bookmarks**  
   When sister sites move too, update their `PUBLIC_SITE_URL_*` pointing at this site (`PUBLIC_SITE_URL_BUSINESS_DOCS=https://docuklin.com`).

---

## Verify after cutover

```bash
curl -sI https://docuklin.com/ | head
curl -s https://docuklin.com/robots.txt | grep Sitemap
curl -s https://docuklin.com/sitemap-index.xml | head
# Old host should 301:
curl -sI https://business-document-generators.hammadiqbal117.workers.dev/tools/ | head
```

Canonical, `og:url`, and sitemap `<loc>` values must all use the custom origin—no mixed hosts.
