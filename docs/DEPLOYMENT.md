# Deployment guide (step-by-step)

This guide walks you from a local clone to a live, HTTPS site on a custom domain, with Search Console, optional AdSense, and analytics. It matches **this repository’s** real commands, config files, and build output (`dist/`).

**Recommended host:** Cloudflare Workers (static assets) via Workers Builds — Worker name `business-document-generators`, see `wrangler.jsonc`. **Alternatives:** Cloudflare Pages, Vercel, Netlify.

---

## 1. Prerequisites

### Accounts and access

| Item | Why you need it |
|------|-----------------|
| **GitHub** (or GitLab) | Source repo; most hosts connect via Git |
| **Domain registrar** (Namecheap, Cloudflare Registrar, Google Domains, etc.) | Custom domain |
| **Cloudflare account** (or Vercel / Netlify) | Hosting |
| **Google account** | Search Console, optional GA4, later AdSense |
| **Bing Microsoft account** | Bing Webmaster Tools (optional but recommended) |

You do **not** need AdSense or GA4 on day one of deploy.

### Software on your machine

- **Node.js 20 or newer** (LTS). Check:

```bash
node -v   # should print v20.x or v22.x
npm -v
```

- **Git**

### Clone and install

```bash
git clone https://github.com/hammadiqbal6/business-document-generators.git
cd business-document-generators
npm ci
```

### Local commands (use before every deploy)

| Command | What it does |
|---------|----------------|
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Production static site → `dist/` |
| `npm run preview` | Serves `dist/` locally (smoke-test production build) |
| `npm test` | Vitest — form validation + PDF export |
| `npm run audit` | Build + SEO / AdSense readiness / JS budget / link check |
| `npm run proof` | Regenerates committed evidence in `docs/proof/` (Lighthouse, screenshots, etc.) |
| `npm run check` | `npm test` + `npm run audit` |

**Before first production deploy**, run:

```bash
npm run check
npm run proof   # optional but recommended; same as CI
```

Fix any failures before pushing to `main`.

---

## 2. Configure the site (owner values)

All owner-specific branding and IDs should be set via **environment variables** at build time. Astro exposes variables prefixed with `PUBLIC_` to the client bundle.

Defaults live in `src/config/site.ts` (fallback origin is the Workers `workers.dev` hostname). **Do not commit real secrets**; set env vars in your host’s dashboard. See `.env.example` for the full list.

### Environment variables (complete list)

| Variable | Required at launch? | Example | Used for |
|----------|---------------------|---------|----------|
| `PUBLIC_SITE_URL` | **Yes** | `https://tools.yourbrand.com` | Canonical URLs, sitemap, Open Graph, JSON-LD |
| `PUBLIC_SITE_NAME` | **Yes** | `Your Brand Tools` | Titles, header, Organization schema |
| `PUBLIC_SITE_TAGLINE` | No | Short one-liner | Homepage lead, Organization description |
| `PUBLIC_CONTACT_EMAIL` | **Yes** | `hello@yourbrand.com` | Contact page, footer, schema |
| `PUBLIC_TWITTER_HANDLE` | No | `yourbrand` (no `@`) | Twitter card meta |
| `PUBLIC_GA4_MEASUREMENT_ID` | No | `G-XXXXXXXXXX` | Google Analytics 4 script in `BaseLayout.astro` |
| `PUBLIC_GSC_VERIFICATION` | Recommended | Meta **content** token only | `<meta name="google-site-verification" content="…">` (alias: `PUBLIC_GOOGLE_SITE_VERIFICATION`) |
| `PUBLIC_BING_SITE_VERIFICATION` | Recommended | Bing meta content | `<meta name="msvalidate.01" content="…">` |
| `PUBLIC_INDEXNOW_KEY` | Recommended | Random string, e.g. `a1b2c3d4e5` | IndexNow; must match key file (below) |
| `PUBLIC_ADSENSE_PUBLISHER_ID` | After AdSense approval | `ca-pub-XXXXXXXXXXXXXXXX` | AdSense script + `ads.txt` |
| `PUBLIC_ADS_ENABLED` | After approval | `true` or `false` | Gates ad slots in `AdSlot.astro` |
| `PUBLIC_ADSENSE_AUTO_ADS` | Optional | `true` / `false` | Documented in `docs/ADSENSE.md`; Auto ads |

**Local testing with env vars** (one-off build):

```bash
PUBLIC_SITE_URL=https://tools.yourbrand.com \
PUBLIC_SITE_NAME="Your Brand Tools" \
PUBLIC_CONTACT_EMAIL=hello@yourbrand.com \
npm run build
npm run preview
```

### Files in `public/` you must edit (placeholders)

These ship in the repo with **neutral placeholders**. Replace before or right after first deploy.

#### `robots.txt` / `llms.txt`

Generated at build from `PUBLIC_SITE_URL` (`src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`). Set the env var in Workers Builds — no manual domain edit in `public/`.

#### `public/ads.txt` (before / after AdSense)

Uncomment and set your publisher ID (must match `PUBLIC_ADSENSE_PUBLISHER_ID`):

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

#### IndexNow key file

1. Choose a key string (e.g. 32 random alphanumeric characters).
2. Set `PUBLIC_INDEXNOW_KEY` to that string in the host env.
3. Rename or replace `public/docuforge-indexnow-key-replace-me.txt` so the filename is **`public/{YOUR_KEY}.txt`** containing only the key on one line.

Example: key `myindexnowkey99` → file `public/myindexnowkey99.txt`.

#### `public/_headers` (security + embed)

Copied to `dist/` on build. Cloudflare Pages and Netlify read `_headers` from the publish root. For **Vercel**, security headers are partially duplicated in `vercel.json` — prefer Cloudflare or Netlify if you rely on `_headers` for embed `frame-ancestors`.

No change required unless you tighten CSP or change embed policy.

---

## 3. Custom domain, DNS, HTTPS, www vs apex

### Buy or use a domain

Register a domain at any registrar. For Cloudflare Pages, you can also transfer DNS to **Cloudflare** (free DNS + easy Pages integration).

### Pick one canonical host

Choose **either**:

- **Apex (root):** `https://yourbrand.com` — common for marketing sites  
- **www:** `https://www.yourbrand.com` — some teams prefer this  

Set `PUBLIC_SITE_URL` to the **canonical** choice (no trailing slash). All other hostnames should **301 redirect** to it.

### DNS records (typical Cloudflare Pages)

After connecting the repo in Cloudflare Pages, add a **Custom domain** in the Pages project. Cloudflare will show required records.

**Apex domain (`yourbrand.com`):**

| Type | Name | Content |
|------|------|---------|
| A | `@` | Cloudflare Pages IPs (shown in dashboard) |
| or CNAME | `@` | `your-project.pages.dev` (if supported) |

**www subdomain:**

| Type | Name | Content |
|------|------|---------|
| CNAME | `www` | `your-project.pages.dev` |

### www ↔ apex redirect (Cloudflare)

1. Cloudflare dashboard → **Rules** → **Redirect Rules** (or Bulk Redirects).
2. Example: if canonical is apex, redirect `www.yourbrand.com/*` → `https://yourbrand.com/$1` (301).

For **Vercel**, edit `vercel.json` `redirects` and replace `docuforge.example` with your domain.

### HTTPS

Cloudflare Pages, Vercel, and Netlify issue **free TLS certificates** automatically once DNS points correctly. Wait 5–30 minutes after DNS propagation, then confirm `https://` loads without certificate warnings.

---

## 4. Deploy on Cloudflare Pages (primary)

### Step 1: Push code

Ensure production branch (usually `main`) contains your config changes (`robots.txt`, optional `llms.txt`, IndexNow file).

### Step 2: Create Pages project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the repository `business-document-generators` (or your fork).
3. **Production branch:** `main`
4. **Build settings:**
   - **Framework preset:** None (or Astro if offered)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (repo root)

### Step 3: Environment variables

In Pages → **Settings** → **Environment variables** → **Production** (and **Preview** if you want PR previews to use a staging URL):

Add all `PUBLIC_*` variables from section 2. **Preview** deployments can use a Pages default URL for `PUBLIC_SITE_URL` or a staging subdomain.

### Step 4: Build command & Node version

- Optional: set **Environment variable** `NODE_VERSION` = `22` (or `20`) under Builds if the default Node is too old.
- First deploy: **Save and Deploy**. Watch the build log; it should end with `51 page(s) built` (count may change as tools are added).

### Step 5: Custom domain

Pages → **Custom domains** → add `yourbrand.com` and `www.yourbrand.com` if needed → follow DNS instructions → enable **Always Use HTTPS**.

### Step 6: Verify live site

```bash
curl -I https://yourbrand.com/
curl -I https://yourbrand.com/sitemap-index.xml
curl -I https://yourbrand.com/robots.txt
```

Open a tool page, export PDF once (confirms lazy-loaded JS works on HTTPS).

### Preview deployments

Every pull request can get a `*.pages.dev` preview URL. Use it for QA; set `PUBLIC_SITE_URL` to the preview URL in **Preview** env vars only so canonicals on previews do not leak to production (production env stays on real domain).

---

## 5. Deploy on Vercel (alternative)

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → Import Git repository.
2. **Framework Preset:** Astro (auto-detected) or Other.
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm ci`
6. **Environment Variables:** add all `PUBLIC_*` for Production (and Preview).
7. Deploy. Attach custom domain under **Settings** → **Domains**.
8. Update `vercel.json` redirects: replace `docuforge.example` with your apex/www choice.
9. Note: `public/_headers` is **not** used by Vercel; add headers in `vercel.json` if needed.

---

## 6. Deploy on Netlify (alternative)

1. [netlify.com](https://www.netlify.com) → **Add new site** → **Import an existing project**.
2. **Branch to deploy:** `main`
3. **Build command:** `npm run build`
4. **Publish directory:** `dist`
5. **Environment variables:** all `PUBLIC_*` under **Site settings** → **Environment variables**.
6. **Build image:** ensure Node 20+ (Netlify → **Environment** → `NODE_VERSION` = `20` or `22`).
7. `public/_headers` is published automatically with `dist/` (Netlify reads `_headers` at site root).
8. **Domain management** → add custom domain → follow DNS → force HTTPS.

---

## 7. Post-deploy SEO (copy-paste workflow)

### Google Search Console (GSC)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → **Domain** `yourbrand.com` (recommended) OR **URL prefix** `https://yourbrand.com/`.
3. **Domain property verification:** add the TXT record Google gives you at your DNS host → Verify.
   - Alternatively, set `PUBLIC_GSC_VERIFICATION` to the **meta tag content** value, redeploy, then verify via HTML tag method.
4. **Sitemaps:** left menu → **Sitemaps** → submit:

```text
https://yourbrand.com/sitemap-index.xml
```

5. **URL Inspection** (request indexing for high-value URLs), one at a time:

```text
https://yourbrand.com/
https://yourbrand.com/tools/
https://yourbrand.com/tools/construction-estimate-template/
https://yourbrand.com/tools/photography-contract-template/
https://yourbrand.com/hubs/estimates-invoices/
https://yourbrand.com/guides/
```

Click **Request indexing** after each inspection (reasonable pace; no need to do all 50+ URLs on day one).

6. Over the next days, check **Pages** → **Indexing** for errors (404, redirect, excluded).

### Bing Webmaster Tools

1. [Bing Webmaster](https://www.bing.com/webmasters/) → **Add your site**.
2. **Import from Google Search Console** (fastest) or verify with `PUBLIC_BING_SITE_VERIFICATION` + redeploy.
3. Submit the same sitemap URL.
4. **IndexNow:** after deploy, notify Bing of key URLs:

```bash
KEY=your-indexnow-key-from-env
HOST=https://yourbrand.com
URL="$HOST/tools/construction-estimate-template/"
curl -s "https://api.indexnow.org/indexnow?url=${URL}&key=${KEY}"
```

Repeat for changed URLs after content updates (see `docs/SEO-GUIDE.md`).

### Rich Results Test (live)

After deploy, open [Rich Results Test](https://search.google.com/test/rich-results) and test:

```text
https://yourbrand.com/
https://yourbrand.com/tools/construction-estimate-template/
```

Compare with extracted JSON in `docs/proof/structured-data/` (proof was generated against `dist/` locally; live URLs should match structure).

### PageSpeed Insights (live)

Test production URLs (mobile):

```text
https://pagespeed.web.dev/analysis?url=https://yourbrand.com/
```

Compare to committed reports in `docs/proof/lighthouse/`. Regenerate proof locally after major changes: `npm run proof`.

---

## 8. Google AdSense (when and how)

**Do not rush AdSense.** Google expects real content, working tools, trust pages, and some traffic. See `docs/ADSENSE.md` and `docs/proof/adsense-readiness.md`.

### Readiness (this repo)

- About, Contact, Privacy (with ad/cookie disclosures), Terms, Methodology, Cookies  
- Original long-form content on tool pages  
- `ads.txt` template in `public/ads.txt`  
- Ad slots **disabled** until you set `PUBLIC_ADS_ENABLED=true`

### Apply

1. [AdSense signup](https://www.google.com/adsense/) → add site `https://yourbrand.com`.
2. Wait for review (often days to weeks). Keep publishing and fixing GSC issues while waiting.
3. After approval, note your **publisher ID** `ca-pub-XXXXXXXXXXXXXXXX`.

### Enable ads in this project

1. Set production env vars:

```text
PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
PUBLIC_ADS_ENABLED=true
```

2. Update `public/ads.txt` with the same publisher ID (uncomment line).
3. Redeploy.
4. In AdSense UI, confirm site shows **Ready** and ads serve on a tool page.

### Consent / CMP (EEA, UK, Switzerland)

For **personalized** ads in those regions you need a **Google-certified CMP** integrated with IAB TCF. Until CMP is configured:

- Keep `PUBLIC_ADS_ENABLED=false` in EU-facing tests, or  
- Use a CMP vendor (Google lists certified partners in AdSense help) and follow their Astro/embed instructions.

Document your CMP choice in your Privacy policy when enabled.

### Ad placement without hurting CLS

This site uses `AdSlot.astro` with **fixed min-height** placeholders so layout does not jump when ads load. Guidelines:

- Keep slots **below** the tool form on mobile (already structured in tool pages).  
- Do not add new ad code above the generator without reserving height.  
- After enabling ads, re-run `npm run proof` or PageSpeed Insights on a tool page and confirm **CLS ≤ 0.05**.

---

## 9. Analytics (GA4) and weekly monitoring

### Enable GA4

1. Create a [GA4 property](https://analytics.google.com/) for your domain.
2. Copy **Measurement ID** `G-XXXXXXXXXX`.
3. Set `PUBLIC_GA4_MEASUREMENT_ID` in production env → redeploy.
4. Use **Realtime** report to confirm hits when you visit the site.

### Weekly routine (15–30 minutes)

| Source | What to check |
|--------|----------------|
| **GSC → Performance** | Impressions, clicks, average position; new queries to add to FAQs |
| **GSC → Pages / Indexing** | New “Not indexed” reasons; fix 404s |
| **GSC → Core Web Vitals** | LCP, INP, CLS on real users (needs traffic) |
| **GA4** | Top pages, countries, engagement (optional) |
| **Bing Webmaster** | Crawl errors, IndexNow status |
| **AdSense** (if live) | Policy alerts, RPM trends, invalid traffic |

When you change templates or add tools, run `npm run audit` locally before deploy.

---

## 10. Updating, redeploying, and rollback

### Normal update

1. Edit code on a branch → `npm run check` locally.
2. Merge to `main` (or push to production branch).
3. Host auto-builds from Git (Cloudflare/Vercel/Netlify).
4. Confirm build green in host dashboard.
5. Spot-check live site + URL Inspection for changed URLs.
6. Optional: IndexNow POST for changed URLs.

### Regenerate proof (for releases)

```bash
npm run proof
git add docs/proof && git commit -m "Refresh proof artifacts" && git push
```

### Rollback

**Cloudflare Pages:** Deployments → select previous successful deployment → **Rollback to this deployment**.

**Vercel:** Deployments → … on previous deployment → **Promote to Production**.

**Netlify:** Deploys → **Publish deploy** on an older build.

Also revert the Git commit on `main` if the bad change is in source control.

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Build fails on host, works locally | Wrong Node version | Set `NODE_VERSION=22`; use `npm ci` not `npm install` |
| Canonical URLs still `docuforge.example` | `PUBLIC_SITE_URL` not set at build | Set env var in host; **redeploy** (rebuild required) |
| Sitemap has wrong domain | Same as above | Rebuild with correct `PUBLIC_SITE_URL` |
| Google verification fails | Meta not in HTML | Set `PUBLIC_GSC_VERIFICATION`, redeploy, view source |
| PDF export blank / error | Mixed content or blocked JS | Ensure site is HTTPS; check browser console |
| Horizontal scroll on mobile | Wide tables in preview | Fixed in generator CSS; pull latest, rebuild |
| `npm run audit` fails thin content | Tool page word count | Add content in `src/data/tools/*.ts` |
| `npm run proof` fails Lighthouse | Perf regression | Run `npm run proof` locally; read `docs/proof/lighthouse/SUMMARY.md` |
| Ads not showing | `PUBLIC_ADS_ENABLED` false or no approval | Complete AdSense approval; set publisher ID + `ads.txt` |
| Embed iframe blocked | `X-Frame-Options` | Embed routes use relaxed CSP in `public/_headers` for `/tools/*/embed/` |
| 404 on trailing slash | Host redirect rules | This site uses `trailingSlash: 'always'` in `astro.config.mjs`; links use `/path/` |

**Logs:** Cloudflare Pages → deployment → **View build log**. Compare with local `npm run build` output.

---

## 12. Launch checklist

Copy this into your issue tracker and check off on go-live day.

### Code & config

- [ ] `npm run check` passes locally  
- [ ] `PUBLIC_SITE_URL`, `PUBLIC_SITE_NAME`, `PUBLIC_CONTACT_EMAIL` set for **Production**  
- [ ] `public/robots.txt` Sitemap URL updated  
- [ ] `public/llms.txt` URLs updated (optional)  
- [ ] IndexNow key file renamed and `PUBLIC_INDEXNOW_KEY` set  
- [ ] Placeholder `docuforge.example` removed from user-visible copy where needed  

### Hosting

- [ ] Production deploy succeeded (`dist/` published)  
- [ ] Custom domain attached, HTTPS valid  
- [ ] www → apex (or apex → www) 301 redirect configured  
- [ ] `/_headers` active (Cloudflare/Netlify) or headers in `vercel.json`  

### SEO

- [ ] Google Search Console property verified  
- [ ] Sitemap `sitemap-index.xml` submitted  
- [ ] URL Inspection requested for home + top tools  
- [ ] Bing Webmaster Tools configured + sitemap  
- [ ] Rich Results Test run on live home + one tool page  
- [ ] PageSpeed Insights mobile run on live home  

### Optional (week 2+)

- [ ] `PUBLIC_GA4_MEASUREMENT_ID` set  
- [ ] AdSense applied and approved  
- [ ] `ads.txt` + `PUBLIC_ADSENSE_PUBLISHER_ID` + `PUBLIC_ADS_ENABLED=true`  
- [ ] CMP configured for EEA/UK/CH if using personalized ads  
- [ ] `npm run proof` refreshed and committed after launch tweaks  

---

## Related docs

- [README.md](../README.md) — project overview and **Proof** section (`npm run proof`)  
- [SEO-GUIDE.md](./SEO-GUIDE.md) — keyword workflow, 90-day plan  
- [ADSENSE.md](./ADSENSE.md) — eligibility and policy  
- [docs/proof/README.md](./proof/README.md) — reproducible Lighthouse and audit evidence  
