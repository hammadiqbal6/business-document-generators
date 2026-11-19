# Growth / SEO status

Living tracker for Docuklin SEO and growth work. **Read this before planning growth, SEO, or content work.** Update **this file and `README.md`** in the **same PR** when an item is completed, started, or added (Done / Remaining). Do not invent metrics, dates, or off-repo actions — only record owner-reported or in-repo facts.

Settled technical SEO policy (IndexNow wiring, jev-seo false alarms, title/schema rules) still lives under **SEO state** in `AGENTS.md`. This file holds current metrics and the work queue.

Last updated: **2026-11-19**

---

## Baseline metrics

As of **2026-11-17** (owner-reported GSC/GA4 window) unless noted.

| Source | Fact |
|--------|------|
| Site | [docuklin.com](https://docuklin.com) |
| Stack | Astro on Cloudflare Workers (`worker` name: `business-document-generators`) |
| GA4 | Measurement ID `G-HR4DDMD97H` (property `559564505`) |
| Build env | Build-time `PUBLIC_*` in Workers Builds env (production env overrides `siteDefaults`) |
| GSC (last 28 days → 2026-11-17) | **0** clicks, **486** impressions, avg position **58.9** |
| Indexing (GSC) | **54** pages indexed, **7** not indexed (5 Excluded by noindex tag; 2 Discovered – currently not indexed); earlier “Page with redirect” notices on intentional aliases |
| GA4 (28 days) | **3** users (GA4 only fires after cookie consent Accept; Cloudflare page views include bots) |
| Domain rating | Ahrefs-style DR **2** (owner-reported, earlier window) |

---

## Done

In-repo and confirmed off-repo completions.

- **2026-11-19 — PAA question guides (this PR):** five AlsoAsked-based articles — invoice payment terms; what is a change order; work order vs PO vs invoice; freelance contract what to include; how to create a contractor estimate. Wired into `KEYWORD-MAP`, `toolGuideMap`, llms question maps. Added `docs/WRITING-GUIDE.md`, AGENTS.md human-writing rule, and `scripts/audit/ai-style-check.mjs` (in `npm run audit`). Heuristic style check: all five new guides **OK** (see PR detector table). HF classifier not available in CI image (no torch).
- **2026-11-19 — Progress invoice generator (PR #43 merged):** `/tools/progress-invoice/` with retainage math; hub/KEYWORD-MAP/llms wiring (dedicated agent).
- **2026-11-19 — CI / Cloudflare build speedup (PR #36 merged):**
- **2026-11-19 — Change order template upgrade (this PR):**
  - Running contract total on `/tools/change-order-template/`: original + prior COs + this CO → revised total.
  - Schedule impact days; contractor + client signatures; FAQ polish; Vitest for running-total math.
- **2026-11-19 — quote-estimate-generator upgrades (this PR):**
  - Local logo (data URL / localStorage); valid-until; convert-to-invoice handoff; FAQ estimate≠invoice.
- **2026-11-19 — Lien waiver generator (this PR):** `/tools/lien-waiver-generator/` — conditional/unconditional × partial/final fill-in form, live preview, PDF/DOCX export, plain-English “state forms vary / not legal advice” notice, FAQ; registered in `allTools`, contracts hub which-document table, KEYWORD-MAP, `toolGuideMap`, `llms.txt` / `llms-full.txt` question maps, change-order related tools; Vitest coverage in `tests/lien-waiver.test.ts`.
- **2026-11-19 — Progress invoice generator (this PR):**
- **2026-11-19 — Lien waiver generator (this PR #38):** `/tools/lien-waiver-generator/` — conditional/unconditional × partial/final fill-in form, live preview, PDF/DOCX export, plain-English “state forms vary / not legal advice” notice, FAQ; registered in `allTools`, contracts hub which-document table, KEYWORD-MAP, `toolGuideMap`, `llms.txt` / `llms-full.txt` question maps, change-order related tools; Vitest coverage in `tests/lien-waiver.test.ts`.
- **2026-11-19 — Progress invoice generator (PR #43, on main):**
  - New tool `/tools/progress-invoice/`: contract value, percent or amount complete this period, previously billed, retainage %, amount due this period, balance to finish; live preview + PDF/DOCX.
  - Wired into `allTools`, estimates-invoices hub which-document table, KEYWORD-MAP, `toolGuideMap`, `llms.txt` / `llms-full.txt` question maps; related from contractor invoice / change order; Vitest coverage for billing math.
- **2026-11-19 — CI / Cloudflare build speedup (merged to main):**
  - Baseline (recent successful `CI` workflow): wall ~**33–47s**; job ~**29–41s**; steps ~`npm ci` **12–18s**, `build` **5–7s**, `test` **3–5s** (e.g. run `44535495168` on main: 33s / 29s job).
  - Parallel `build` + `test` jobs; setup-node npm cache kept; Astro/Vite cache; `npm ci --prefer-offline --no-audit --fund=false`; concurrency cancel-in-progress kept.
  - Docs-only path filter skips heavy jobs; required check id `build-test-audit-proof` still reports green.
  - Full checks: Playwright **Chromium-only** + browser cache; root `.npmrc` + DEPLOYMENT/wrangler install notes for Workers Builds.
- **2026-11-19 — humanize existing guides (this PR):**
  - Rewrote all **22** existing guides in `src/data/guides.ts` for practitioner peer voice (`docs/WRITING-GUIDE.md`); kept slugs, title keywords, relatedToolSlugs/relatedGuideSlugs, sources URLs, schema fields.
  - Added `scripts/audit/ai-style-check.mjs` (banned phrases, em-dash density, sentence-length variance, contractions) and wired it into `npm run audit` / `npm run audit:ai-style`.
  - Optional local HF detectors: `openai-community/roberta-base-openai-detector` and `Hello-SimpleAI/chatgpt-detector-roberta` (via `scripts/audit/hf-ai-detect.py`); all 22 guides **&lt;30%** AI probability on both.
  - Did **not** add the five new PAA article slugs (owned by PR #46).
  - Per-guide score table (heuristic + OpenAI-detector AI%):
| Guide slug | Words | Sent. std | Contr/1k | HF AI% | Heuristic |
|------------|------:|----------:|---------:|-------:|-----------|
| `construction-estimate-that-wins-jobs` | 1853 | 7.5 | 14.6 | 0.0% | PASS |
| `photography-contract-clauses` | 1822 | 7.2 | 14.8 | 0.0% | PASS |
| `catering-quote-deposits` | 2070 | 7.5 | 11.1 | 0.1% | PASS |
| `tattoo-consent-documentation` | 2003 | 7.1 | 14.0 | 0.0% | PASS |
| `rental-application-fair-housing` | 1886 | 7.2 | 13.3 | 0.0% | PASS |
| `invoice-vs-estimate` | 1870 | 7.2 | 14.4 | 0.0% | PASS |
| `line-item-totals-explained` | 2253 | 8.6 | 14.2 | 0.1% | PASS |
| `freelance-payment-schedule-milestones` | 2157 | 8.9 | 13.9 | 17.9% | PASS |
| `what-to-include-on-a-receipt` | 2925 | 8.9 | 13.3 | 0.0% | PASS |
| `cleaning-invoice-rates-line-items` | 2209 | 8.5 | 14.9 | 0.0% | PASS |
| `nda-basics-for-freelancers` | 2156 | 8.7 | 17.2 | 0.0% | PASS |
| `work-order-vs-invoice-vs-estimate` | 2012 | 6.6 | 15.4 | 0.0% | PASS |
| `videography-contract-clauses` | 2128 | 8.8 | 13.6 | 0.0% | PASS |
| `wedding-vendor-contract-checklist` | 2254 | 6.7 | 16.9 | 0.0% | PASS |
| `podcast-script-structure` | 2007 | 8.5 | 12.0 | 0.3% | PASS |
| `real-estate-flyer-what-to-include` | 2147 | 9.0 | 14.0 | 9.1% | PASS |
| `how-to-write-a-business-estimate` | 1928 | 7.1 | 13.0 | 0.0% | PASS |
| `catering-quotation-example` | 1732 | 7.7 | 14.4 | 0.0% | PASS |
| `freelance-web-design-contract-clauses` | 1622 | 7.3 | 19.7 | 0.0% | PASS |
| `how-to-create-a-work-order` | 1598 | 7.8 | 15.6 | 0.0% | PASS |
| `wedding-videography-contract` | 1738 | 7.3 | 19.0 | 8.4% | PASS |
| `contractor-invoice-example` | 1585 | 7.6 | 18.3 | 0.0% | PASS |
- **2026-11-19 — Lien waiver generator (PR #38, on main):** `/tools/lien-waiver-generator/` — conditional/unconditional × partial/final fill-in form, live preview, PDF/DOCX, state-forms-vary disclaimer; Vitest coverage.
- **2026-11-19 — Progress invoice generator (PR #43, on main):** `/tools/progress-invoice/` contract draws + retainage; wired into hubs, KEYWORD-MAP, llms maps.
- **2026-11-19 — CI / Cloudflare build speedup (PR #36, on main):** parallel build+test, caches, docs-only path skip, Playwright Chromium-only; baseline wall ~**33–47s**.
- **2026-11-19 — PR #35:**
- **2026-11-19 — Invoice late fee calculator (PR #37):**
  - New tool `/tools/invoice-late-fee-calculator/`: invoice amount, due date, payment date (or today), fee type (flat / % per month prorated / annual→daily), optional grace period.
  - Outputs days past due, chargeable days, fee, new total, plus suggested late-fee line and payment-reminder wording (PDF/DOCX export).
  - Wired into `allTools`, estimates-invoices hub which-document table, related links on contractor/cleaning invoice + receipt tools, `KEYWORD-MAP`, `toolGuideMap`, `llms.txt` / `llms-full.txt` question maps. Not added to `featuredToolSlugs`.
  - Disclaimer: not legal/tax advice; caps vary by state/country (invoice/receipt banner via slug).
- **2026-11-19 — Roofing + painting estimate presets (this PR):**
  - New tools `/tools/roofing-estimate/` and `/tools/painting-estimate/` as trade presets of the shared commercial estimate fields/preview (tear-off / underlayment / shingles / flashing / disposal; prep / primer / coats / sq ft·rooms / materials). No DocumentGenerator fork.
  - Wired: `allTools`, hub which-document rows, `toolGuideMap`, `docs/KEYWORD-MAP.md`, `llms.txt` / `llms-full.txt` question map, Vitest `tests/roofing-painting-estimates.test.ts`.
  - README tool count 21 → 23.
  - Homepage links every tool via all-templates-by-category (`getToolsByCategory` / `CATEGORY_META`; featured still `getFeaturedTools()`).
  - Hub “which document” tables completed for estimates-invoices + contracts (timesheet / PO / change-order stay on estimates-invoices per tool categories — not forms/contracts).
  - Homepage title/H1 + site tagline/`llms.txt` intro aligned to contractor & freelancer document templates (avoid head “invoice”).
  - Indexing hardening: `scripts/audit/indexing-audit.mjs` (every sitemap URL self-canonical + not noindex); internal links must not target `_redirects` sources; `X-Robots-Tag: noindex, follow` on `/tools/:slug/embed/*` and `/404/`; Head normalizes trailing-slash self-canonicals.
- **2026-11-19 — TinyLaunch footer badge** removed from `PUBLIC_DIRECTORY_BADGES` in Cloudflare Workers Builds (owner).
- **2026-11-19 — Reddit (`u/ihammadiqbal117`):**
  - r/Contractor “Net 30, 15 or Due on receipt?” comment posted; now shows **[ Removed by Reddit ]**: https://www.reddit.com/r/Contractor/comments/1xyq1fk/comment/19svfgjuqhsud/
  - r/freelance “Microsoft Word Contract” advice comment (no link) posted; visible on profile at check: https://www.reddit.com/r/freelance/comments/1xsssk6/comment/19svg9lhm2zb9/
- **2026-11-18 — Reddit:**
  - r/smallbusiness Q4 2026 promote thread promo comment: https://www.reddit.com/r/smallbusiness/comments/1wwpjlw/comment/19stad4gftdid/
  - r/Contractor “Itemizing estimates” advice comment (no link): https://www.reddit.com/r/Contractor/comments/1xt414g/comment/19stc7h27vygz/ — now shows **[ Removed by Reddit ]**
- **2026-11-08 — TinyLaunch:** rejected (one product at a time per founder); resubmit after YardTally launches **2026-12-07**.
- **2026-11-18 — Uneed:** declined as saturated category; listing re-positioned (tagline *Contracts, estimates and change orders for contractors and freelancers*; tags Templates / Legal / Freelance); re-review pending via reply to decline email.
- **2026-11-18 — PR #33 merged:** redirects `/tools/invoice/` and `/tools/invoice-generator/` → `/tools/contractor-invoice/`, `/sitemap_index.xml`, `/privacy-policy/`; `/favicon.png`; embed GTM/gtag beacon 404s; `workers_dev` disabled; GSC-impression tool SEO.
- **Nov 2026 — Google AdSense:** application submitted; status **Getting ready**.
- Earlier settled in-repo SEO (IndexNow, GSC verification meta, PRs #30–#32): see `AGENTS.md` **SEO state**.

### Indexing buckets (dist audit, this PR)

| Bucket | What’s in it |
|--------|----------------|
| Sitemap / indexable | All sitemap URLs on `https://docuklin.com…/` with trailing slash, self-canonical, `index,follow`, matching `og:url`; all tools included with `lastmod` (23 tools after lien waiver + progress invoice) |
| Intentional noindex | `/tools/<slug>/embed/` (one per tool) + `/404/` — meta robots + `X-Robots-Tag`; **not** in sitemap. Matches GSC “Excluded by noindex” for crawled embeds/404 |
| Sitemap / indexable | Sitemap URLs on `https://docuklin.com…/` with trailing slash, self-canonical, `index,follow`, matching `og:url`; all tools (22 including late-fee calculator) included with `lastmod` |
| Sitemap / indexable | All sitemap URLs on `https://docuklin.com…/` with trailing slash, self-canonical, `index,follow`, matching `og:url`; all tools included with `lastmod` (23 after roofing/painting presets) |
| Redirects (final 200 only in sitemap/links) | `/tools/invoice[/]`, `/tools/invoice-generator[/]` → contractor invoice; `/privacy-policy[/]` → `/privacy/`; `/sitemap.xml` & `/sitemap_index.xml` → `/sitemap-index.xml`; `/authors[/]` → `/about/`; Worker trailing-slash 308 |

---

## Remaining

Prioritized open work. Owner-confirmed gaps preferred over guesses.

1. **Human rewrite of legacy guides** + HF detector scores &lt;30% AI; flip `ai-style-check` to `--strict-all` when done (separate PR).
2. **Estimate generator upgrades** (logo upload, expiry, convert-to-invoice) — separate PR (#48).
3. **Change order upgrades** (running contract total) — separate PR (#47).
4. **GSC after deploy:** ping IndexNow; URL Inspection for new guide URLs and `/tools/progress-invoice/`; confirm embed/404 noindex exclusions stay intentional.
5. **CI timings:** record after timings vs baseline; if Workers Builds has a custom Install command, set `npm ci --prefer-offline --no-audit --fund=false`.
6. **Bing Webmaster verification** — currently **unset** (owner); set `PUBLIC_BING_SITE_VERIFICATION` / console verification when ready.
7. **Author / `sameAs` env vars** — currently **unset** (owner); wire when profiles are public and stable.
8. **Backlinks** — site still has essentially none beyond minor directory/unroll mentions; outreach remains open.
9. **Reddit risk / pause promo:** account ~1 day old, **1 karma**; site-wide filter removed several posts/comments. **Pause promo / launch posts.** Build karma with plain non-link comments before any further r/SideProject (or similar) launch post. Earlier (~2026-11-18) r/SideProject Docuklin launch from `u/ihammadiqbal117` shows **[ Removed by Reddit on account of violating the content policy ]** — **not reposted**.
10. **GA4 Consent Mode v2** cookieless pings so traffic is measured without waiting on Accept.
11. **Uneed re-review** — reply to decline email with re-positioned listing (pending owner).
12. **TinyLaunch resubmit** after YardTally launch **2026-12-07**.
13. **AdSense** — keep publishing; status **Getting ready**; expect review ~3–4 weeks.
14. **Weekly GSC check** — record deltas in Baseline (do not invent numbers).
15. **Directory submissions / blogger embed outreach / related tool variants** — ongoing off-page; record confirmed listings when known.
1. **GSC after deploy of PR #35 + lien waiver:** ping IndexNow; URL Inspection → Request indexing for previously weak / “Discovered – not indexed” tool URLs and `/tools/lien-waiver-generator/`; confirm noindex exclusions are embeds/404 only (intentional).
1. **GSC after deploy:** ping IndexNow; URL Inspection → Request indexing for `/tools/lien-waiver-generator/`, `/tools/progress-invoice/`, and previously weak / “Discovered – not indexed” tool URLs; confirm noindex exclusions are embeds/404 only (intentional).
2. **Construction lien waiver basics guide** (listed in `docs/SEO-GUIDE.md` content calendar) — still open; tool currently Learn-mores to estimate/invoice/work-order guides until that article ships.
3. **GSC after deploy:** ping IndexNow; URL Inspection → Request indexing for `/tools/progress-invoice/` and any previously weak / “Discovered – not indexed” tool URLs; confirm noindex exclusions are embeds/404 only (intentional).
4. **CI timings:** record after timings vs baseline (~33–47s); if Workers Builds dashboard has a custom Install command, set `npm ci --prefer-offline --no-audit --fund=false` (`.npmrc` alone may be enough).
1. **Five new PAA article slugs** — PR #46 (not this humanize-guides change); estimate/change-order upgrades in #47/#48.
2. **GSC after deploy of PR #35 + lien waiver + progress invoice:** ping IndexNow; URL Inspection → Request indexing for weak / “Discovered – not indexed” tool URLs and `/tools/lien-waiver-generator/`, `/tools/progress-invoice/`; confirm noindex exclusions are embeds/404 only (intentional).
3. **Construction lien waiver basics guide** (listed in `docs/SEO-GUIDE.md` content calendar) — still open; tool currently Learn-mores to estimate/invoice/work-order guides until that article ships.
4. **CI timings:** record after timings vs baseline (~33–47s); if Workers Builds dashboard has a custom Install command, set `npm ci --prefer-offline --no-audit --fund=false`.
5. **Bing Webmaster verification** — currently **unset** (owner); set `PUBLIC_BING_SITE_VERIFICATION` / console verification when ready.
6. **Author / `sameAs` env vars** — currently **unset** (owner); wire when profiles are public and stable.
7. **Backlinks** — site still has essentially none beyond minor directory/unroll mentions; outreach remains open.
8. **Reddit risk / pause promo:** account ~1 day old, **1 karma**; site-wide filter removed several posts/comments. **Pause promo / launch posts.** Build karma with plain non-link comments before any further r/SideProject (or similar) launch post. Earlier (~2026-11-18) r/SideProject Docuklin launch from `u/ihammadiqbal117` shows **[ Removed by Reddit on account of violating the content policy ]** — **not reposted**.
9. **GA4 Consent Mode v2** cookieless pings so traffic is measured without waiting on Accept.
10. **Uneed re-review** — reply to decline email with re-positioned listing (pending owner).
11. **TinyLaunch resubmit** after YardTally launch **2026-12-07**.
12. **AdSense** — keep publishing; status **Getting ready**; expect review ~3–4 weeks.
13. **Weekly GSC check** — record deltas in Baseline (do not invent numbers).
14. **Directory submissions / blogger embed outreach / related tool variants** — ongoing off-page (progress invoice tool shipped in-repo); record confirmed listings when known.
1. **GSC after deploy of this PR + PR #35:** ping IndexNow; URL Inspection → Request indexing for `/tools/invoice-late-fee-calculator/` and previously weak / “Discovered – not indexed” tool URLs; confirm noindex exclusions are embeds/404 only (intentional).
2. **Bing Webmaster verification** — currently **unset** (owner); set `PUBLIC_BING_SITE_VERIFICATION` / console verification when ready.
3. **Author / `sameAs` env vars** — currently **unset** (owner); wire when profiles are public and stable.
4. **Backlinks** — site still has essentially none beyond minor directory/unroll mentions; outreach remains open.
5. **Reddit risk / pause promo:** account ~1 day old, **1 karma**; site-wide filter removed several posts/comments. **Pause promo / launch posts.** Build karma with plain non-link comments before any further r/SideProject (or similar) launch post. Earlier (~2026-11-18) r/SideProject Docuklin launch from `u/ihammadiqbal117` shows **[ Removed by Reddit on account of violating the content policy ]** — **not reposted**.
6. **GA4 Consent Mode v2** cookieless pings so traffic is measured without waiting on Accept.
7. **Uneed re-review** — reply to decline email with re-positioned listing (pending owner).
8. **TinyLaunch resubmit** after YardTally launch **2026-12-07**.
9. **AdSense** — keep publishing; status **Getting ready**; expect review ~3–4 weeks.
10. **Weekly GSC check** — record deltas in Baseline (do not invent numbers).
11. **Directory submissions / blogger embed outreach / related tool variants** — ongoing off-page; record confirmed listings when known.
12. **Other parallel agents’ tools/guides** — may still be in flight; keep this queue accurate when those PRs land (do not invent Done items).
1. **GSC after deploy of roofing + painting estimate presets:** ping IndexNow; URL Inspection → Request indexing for `/tools/roofing-estimate/` and `/tools/painting-estimate/`.
2. **GSC after deploy of PR #35:** ping IndexNow; URL Inspection → Request indexing for previously weak / “Discovered – not indexed” tool URLs; confirm the 5 noindex exclusions are embeds/404 only (intentional).
3. **Bing Webmaster verification** — currently **unset** (owner); set `PUBLIC_BING_SITE_VERIFICATION` / console verification when ready.
4. **Author / `sameAs` env vars** — currently **unset** (owner); wire when profiles are public and stable.
5. **Backlinks** — site still has essentially none beyond minor directory/unroll mentions; outreach remains open.
6. **Reddit risk / pause promo:** account ~1 day old, **1 karma**; site-wide filter removed several posts/comments. **Pause promo / launch posts.** Build karma with plain non-link comments before any further r/SideProject (or similar) launch post. Earlier (~2026-11-18) r/SideProject Docuklin launch from `u/ihammadiqbal117` shows **[ Removed by Reddit on account of violating the content policy ]** — **not reposted**.
7. **GA4 Consent Mode v2** cookieless pings so traffic is measured without waiting on Accept.
8. **Uneed re-review** — reply to decline email with re-positioned listing (pending owner).
9. **TinyLaunch resubmit** after YardTally launch **2026-12-07**.
10. **AdSense** — keep publishing; status **Getting ready**; expect review ~3–4 weeks.
11. **Weekly GSC check** — record deltas in Baseline (do not invent numbers).
12. **Directory submissions / blogger embed outreach / related tool variants** — ongoing off-page; record confirmed listings when known.
3. **CI timings:** record after timings vs baseline (~33–47s); if Workers Builds dashboard has a custom Install command, set `npm ci --prefer-offline --no-audit --fund=false` (`.npmrc` alone may be enough).
4. **Bing Webmaster verification** — currently **unset** (owner); set `PUBLIC_BING_SITE_VERIFICATION` / console verification when ready.
5. **Author / `sameAs` env vars** — currently **unset** (owner); wire when profiles are public and stable.
6. **Backlinks** — site still has essentially none beyond minor directory/unroll mentions; outreach remains open.
7. **Reddit risk / pause promo:** account ~1 day old, **1 karma**; site-wide filter removed several posts/comments. **Pause promo / launch posts.** Build karma with plain non-link comments before any further r/SideProject (or similar) launch post. Earlier (~2026-11-18) r/SideProject Docuklin launch from `u/ihammadiqbal117` shows **[ Removed by Reddit on account of violating the content policy ]** — **not reposted**.
8. **GA4 Consent Mode v2** cookieless pings so traffic is measured without waiting on Accept.
9. **Uneed re-review** — reply to decline email with re-positioned listing (pending owner).
10. **TinyLaunch resubmit** after YardTally launch **2026-12-07**.
11. **AdSense** — keep publishing; status **Getting ready**; expect review ~3–4 weeks.
12. **Weekly GSC check** — record deltas in Baseline (do not invent numbers).
13. **Directory submissions / blogger embed outreach / related tool variants** — ongoing off-page; record confirmed listings when known.

---

## In progress

- **AdSense review** — **Getting ready** (Nov 2026).
- **Uneed re-review** — pending owner reply to decline email.
- **Legacy guide human-rewrite + detector loop** — separate PR (this stream).
- **Estimate generator + change-order upgrades** — PRs #48 / #47 (this stream).
- New tools (lien waiver #38, late fee #37, roofing/painting #41; progress invoice #43 merged) — **owned by dedicated agents**.
- No other in-repo SEO/growth code work beyond the lien waiver and progress invoice tool PRs.
- **This PR (#50):** humanize existing guides + AI-style audit gate.
- **Open content/upgrade PRs (separate):** #46 PAA articles; #47 change-order upgrades; #48 estimate upgrades.
- CI speedup already on main — measure after timings when convenient.
- Parallel agent PRs may still be open for other tools/content; this PR only ships the invoice late fee calculator.
- No other in-repo SEO/growth code work beyond shipping the roofing/painting estimate presets PR (after PR #35).

---

## Off-repo work

| When | What | Status |
|------|------|--------|
| Nov 2026 | Google AdSense application | **Getting ready** |
| 2026-11-08 | TinyLaunch submission | Rejected (one product); retry after 2026-12-07 |
| 2026-11-18 | Uneed submission | Declined (saturated); re-positioned; re-review pending |
| 2026-11-19 | TinyLaunch badge removed from Workers Builds `PUBLIC_DIRECTORY_BADGES` | Done |
| 2026-11-19 | Reddit Net 30 / freelance Word contract comments | Posted; Net 30 removed by Reddit; freelance visible at check |
| 2026-11-18 | Reddit Itemizing estimates comment | Posted; later **Removed by Reddit** |
| ~2026-11-18 | r/SideProject Docuklin launch | **Removed by Reddit** (content policy); not reposted |
| Ongoing | Pause Reddit promo; karma via non-link comments | Remaining #7 |
| Console | Bing verification / author sameAs | Unset (Remaining #4–#5) |
| Console | GSC indexing validation after new tool deploys | Remaining #1 |

---

## How to update this file

1. **Before** planning growth, SEO, or content work: read this file end-to-end (and `AGENTS.md` SEO state for settled technical policy).
2. **In the same PR** that completes or starts an item:
   - Move finished work into **Done** with an ISO date (`YYYY-MM-DD`) and PR number or off-repo proof link when available.
   - Adjust **Remaining** / **In progress** so the queue stays accurate.
   - Update **`README.md` Done / Remaining** to match (mandatory — see `AGENTS.md` workflow).
   - On weekly GSC review, update **Baseline metrics** with the new window (do not invent numbers).
3. **Never** invent stats, directory listings, Reddit posts, or console screenshots. If unknown, leave a “not yet recorded” note.
4. Filename convention: `docs/SCREAMING-KEBAB.md` (this file: `GROWTH-STATUS.md`).
