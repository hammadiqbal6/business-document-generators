# Growth / SEO status

Living tracker for Docuklin SEO and growth work. **Read this before planning growth, SEO, or content work.** Update **this file and `README.md`** in the **same PR** when an item is completed, started, or added (Done / Remaining). Do not invent metrics, dates, or off-repo actions — only record owner-reported or in-repo facts.

Settled technical SEO policy (IndexNow wiring, jev-seo false alarms, title/schema rules) still lives under **SEO state** in `AGENTS.md`. This file holds current metrics and the work queue.

Last updated: **2026-11-27**

---

## Baseline metrics

As of **2026-11-17** (owner-reported GSC/GA4 window) unless noted; **3-month GSC** row from owner on **2026-11-25**.

| Source | Fact |
|--------|------|
| Site | [docuklin.com](https://docuklin.com) |
| Stack | Astro on Cloudflare Workers (`worker` name: `business-document-generators`) |
| GA4 | Measurement ID `G-HR4DDMD97H` (property `559564505`) |
| Build env | Build-time `PUBLIC_*` in Workers Builds env (production env overrides `siteDefaults`) |
| GSC (last 28 days → 2026-11-17) | **0** clicks, **486** impressions, avg position **58.9** |
| GSC (last 3 months → ~2026-11-25, owner) | **1** click, **763** impressions, avg position **62.4**; top queries: estimate generator, estimate generator free, wedding videography contract, construction quote generator, free estimate, video production contract; top pages: `/tools/videography-contract/`, `/hubs/contracts/`, `/tools/quote-estimate-generator/` |
| Indexing (GSC) | **54** pages indexed, **7** not indexed (5 Excluded by noindex tag; 2 Discovered – currently not indexed); earlier “Page with redirect” notices on intentional aliases |
| GA4 (28 days) | **3** users (pre–geo consent grant outside EEA/UK/CH; Cloudflare page views include bots) |
| Domain rating | Ahrefs-style DR **2** (owner-reported, earlier window) |

---

## Done

In-repo and confirmed off-repo completions.

- **2026-11-27 — Sitemap completeness + quote-estimate SEO (this PR):**
  - Investigated live + GSC: `https://docuklin.com/sitemap-index.xml` → `sitemap-0.xml` already lists **69** URLs including canonical `https://docuklin.com/tools/quote-estimate-generator/` (trailing slash, https, non-www); robots.txt already points at sitemap-index; URL Inspection shows Submitted and indexed with that sitemap. GSC sitemap “indexed: 0” count on the index feed is a console lag quirk, not a missing-loc bug.
  - Hardened CI: `scripts/lib/expected-sitemap-paths.mjs` + `tests/sitemap-completeness.test.ts`; `indexing-audit.mjs` fails if any expected tool/guide/static path is absent from dist sitemap (exact origin + trailing slash).
  - Flagship `/tools/quote-estimate-generator/`: tighter title/meta/H1 for free estimate / quote estimate queries (no stuffing); `updatedAt` 2026-11-27; inbound links from estimates hub CTA + FAQ, `/tools/` index, work-order / change-order / progress-invoice related lists, and invoice-vs-estimate prose paths.
  - IndexNow not run in this PR (post-deploy only).
- **2026-11-27 — SEO title fixes (earlier PR #57):**
  - `/tools/videography-contract/` title: `Videography Contract Template (Free)` — removed `(Free Wedding & Video)` (KEYWORD-MAP: wedding → wedding-videography-contract-template; branded title ≤60).
  - `/guides/wedding-videography-contract/` title: `Wedding Videography Contract: What to Include` (was 64 with brand; now ≤60).
  - Bumped `updatedAt` on both; Vitest asserts branded titles ≤60. IndexNow not run.
- **2026-11-27 — GA4 geo consent + analytics reliability (merged #56):**
  - **Policy (owner / Sidney):** EEA/UK/CH keep analytics + ad storage **denied** by default (Google CMP when ads on). Everywhere else: analytics (and ad storage) **granted** by default; banner **Reject / Do not sell or share** denies and remembers (`docuforge:cookie-ok=0`).
  - **Implementation:** Consent Mode region defaults in `Analytics.astro`; Worker `__docuklinGeo` unchanged; GA loads promptly (removed idle deferral); `trackEvent` queues via `dataLayer` when gtag stub missing; cookies/privacy/methodology + `AGENTS.md` / `.cursor/rules/consent-and-csp.mdc` / DEPLOYMENT updated. Vitest for `trackEvent` queue.
  - Did **not** run IndexNow.
- **2026-11-25 — SEO authority / Consent Mode / GSC variants (earlier PR):**
  - **GA4 Consent Mode v2 (superseded by 2026-11-27 geo policy):** always load `gtag.js` on idle with denied defaults; Accept → granted; Reject keeps denied. Cookies + privacy copy updated. No second CMP.
  - **Author / sameAs:** defaults `PUBLIC_AUTHOR_SAME_AS` = GitHub + Reddit `u/ihammadiqbal117` (already in growth notes); About bio block expanded from in-repo facts only; hooks for LinkedIn/X/org sameAs/`PUBLIC_AUTHOR_BIO` documented.
  - **Variants (additive, no URL/title/H1 churn on existing pages):** wedding videography contract template, video production contract, landscaping estimate, flooring estimate; construction estimate gained construction-quote FAQ/section without title change; near-page-1 guides expanded (`photography-contract-clauses`, `line-item-totals-explained`, `podcast-script-structure`); wedding videography guide CTA → new wedding tool.
  - **Thin pages:** thicker `/`, `/methodology/`, `/hubs/forms/`, `/hubs/creative-templates/` (+ estimates/contracts hub rows); forms/creative meta descriptions lengthened to ~140–160 chars.
  - Wired: `allTools`, hubs, `toolGuideMap`, `KEYWORD-MAP`, llms question map, Vitest `tests/gsc-variant-tools.test.ts`. Tool count 26 → 30.
  - **Embed backlink credit:** `/tools/<slug>/embed/` and copy snippet show visible **Made with Docuklin** → canonical tool (dofollow). README links https://docuklin.com + Embed this tool section. Audits/tests updated (nofollow no longer required on that credit).
- **2026-11-22 — Sitewide SEO plan + AEO rules (earlier PR):**
  - Tool titles/H1s/metas/FAQs across estimates, contracts, forms; expanded videography, simple NDA, service agreement; flagship estimate leads with “Free Estimate Generator” / no signup, no watermark.
  - Merged `how-to-create-a-contractor-estimate` → `construction-estimate-that-wins-jobs` (301 in `_redirects`); business-estimate quote angle; invoice-vs-estimate covers quote; new guides `how-to-price-a-job`, `what-to-include-in-a-service-agreement`, `service-agreement-vs-contract` (+ KEYWORD-MAP, toolGuideMap, llms).
  - GSC generative AI pages strengthened (answer-first H2s, tables, tool links): `line-item-totals-explained`, `tattoo-consent-documentation` (URL kept), `work-order-vs-invoice-vs-estimate`.
  - Hubs/indexes: contracts hub names video+service; `/tools/` title **`Free Business Document Generators`** with `${allTools.length}` (GSC click query); cookies/privacy/terms `noindex`; estimate aliases + `/tools/:slug/null/` redirects. No geotargeting.
  - Durable agent docs: `AGENTS.md` §5, `.cursor/rules/seo.mdc`, `.cursor/skills/add-seo-page/SKILL.md`; IndexNow key unchanged — after deploy run IndexNow + GSC Request indexing (not run in this PR).
- **2026-11-22 — Hubs / indexes / noindex / redirects (same PR stream):**
  - Hub titles/meta/FAQs refreshed; CATEGORY_META aligned; homepage CTA “Free estimate generator”.
  - `toolGuideMap` strengthened; dropped `how-to-create-a-contractor-estimate` map refs.
- **2026-11-20 — Agathox ownership verification:** home `<head>` meta `agathox-verification` = `agathox-verify-9f40b3ccd8788104`; static `public/.well-known/agathox-verification.txt` (same token). Worker `FILE_EXT` already skips trailing-slash 308 for `.txt` (covered by Vitest).
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
| Intentional noindex | `/tools/<slug>/embed/` (one per tool) + `/404/` + `/cookies/` `/privacy/` `/terms/` — meta robots (+ `X-Robots-Tag` on embeds/404); **not** in sitemap |
| Sitemap / indexable | Sitemap URLs on `https://docuklin.com…/` with trailing slash, self-canonical, `index,follow`, matching `og:url`; all tools (22 including late-fee calculator) included with `lastmod` |
| Sitemap / indexable | All sitemap URLs on `https://docuklin.com…/` with trailing slash, self-canonical, `index,follow`, matching `og:url`; all tools included with `lastmod` (23 after roofing/painting presets) |
| Redirects (final 200 only in sitemap/links) | `/tools/invoice[/]`, `/tools/invoice-generator[/]` → contractor invoice; `/tools/estimate-generator[/]`, `/tools/quote-generator[/]`, `/tools/estimate[/]` → quote-estimate-generator; `/tools/:slug/null[/]` → `/tools/:slug/`; `/privacy-policy[/]` → `/privacy/`; `/sitemap.xml` & `/sitemap_index.xml` → `/sitemap-index.xml`; `/authors[/]` → `/about/`; Worker trailing-slash 308 |

---

## Remaining

Prioritized open work. Owner-confirmed gaps preferred over guesses.

1. **After merge/deploy of this sitemap/SEO PR:** run IndexNow (`npm run indexnow` / Workers Builds) — do not change the key; then GSC URL Inspection → Request indexing for `/tools/quote-estimate-generator/` (and confirm sitemap association). Also still request indexing for `/tools/videography-contract/` and `/guides/wedding-videography-contract/` if not done after #57.
1b. **After merge/deploy of earlier variant PR (if not done):** IndexNow + GSC Request indexing for new tools (`wedding-videography-contract-template`, `video-production-contract`, `landscaping-estimate`, `flooring-estimate`) and substantially thickened pages. Confirm cookies/privacy/terms stay noindex and out of sitemap; embeds/404 stay intentional noindex.
2. **Owner must supply (when real profiles exist):** LinkedIn URL(s), X/Twitter profile URL + `PUBLIC_TWITTER_HANDLE`, optional longer `PUBLIC_AUTHOR_BIO`, optional brand `PUBLIC_ORG_SAME_AS`. Defaults already ship GitHub + Reddit; do not invent missing socials.
3. **Construction lien waiver basics guide** (SEO-GUIDE content calendar) — still open.
4. **Bing Webmaster verification** — currently **unset** (owner).
5. **Backlinks / directory / embed outreach** — ongoing off-page; site still has essentially none beyond minor listings.
6. **Reddit:** pause promo/launch posts until karma recovers.
7. **Uneed re-review** / **TinyLaunch resubmit** after YardTally **2026-12-07** (owner).
8. **AdSense** — status **Getting ready**; keep publishing.
9. **Weekly GSC check** — record deltas in Baseline (do not invent numbers). No geotargeting from country mix. After geo-consent deploy, re-check GA4 users (owner); IndexNow only if deploy includes sitemap URL changes.
10. **Sister-site defaults** — YardTally already `https://getyardtally.com` on main; FeeCalc/FiberCalc/PetCalc still workers.dev until their custom domains exist (owner).
