# AGENTS.md — Docuklin

Standing instructions for agents. Read **[`docs/GROWTH-STATUS.md`](docs/GROWTH-STATUS.md)** before planning growth, SEO, or content work (live metrics + Done / Remaining queue). **Mandatory on every change/PR:** update **[`README.md`](README.md)** and **[`docs/GROWTH-STATUS.md`](docs/GROWTH-STATUS.md)** in the **same PR** with what was done and what remains (clear **Done** / **Remaining** sections). Do not invent metrics. Also read **SEO state** below before rediscovering indexing, Bing/GSC, or re-litigating settled audit findings. Guide and article voice: **[`docs/WRITING-GUIDE.md`](docs/WRITING-GUIDE.md)** (practitioner peer voice; banned filler; `scripts/audit/ai-style-check.mjs`). `.cursor/rules/` points here.

## 1. Project overview

- **What:** Privacy-first niche business document generators (idea #20) for Docuklin — fill a form in the browser, preview, export PDF/DOCX. No server-side storage of user form data. Canonical origin comes from `PUBLIC_SITE_URL` / `siteDefaults.mjs` only.
- **Stack:** Astro 5 + TypeScript, React islands for the editor, Vitest, Cloudflare Worker (`src/worker.ts`) serving static `dist/` assets (`wrangler.jsonc`).
- **Deploy:** Merge to `main` auto-deploys via Cloudflare Workers Builds (`npm run build` → `npx wrangler deploy && node scripts/indexnow.mjs`). Details: `docs/DEPLOYMENT.md`.

## SEO state (as of 2026-11-15)

Snapshot of settled technical SEO so agents do not re-probe finished wiring or false alarms. **Current metrics and the growth/SEO work queue live in [`docs/GROWTH-STATUS.md`](docs/GROWTH-STATUS.md)** — read and update that file for planning; keep this section for IndexNow / jev-seo / policy “don’t re-fix” notes. Owner-reported console facts below are marked; paths are verified in-repo.

### Done

- **IndexNow (active — do not add a second submitter).** Bing Webmaster showed IndexNow active with ~350 URLs submitted on 2026-11-13 from source **Self** (owner). Mechanism in this repo:
  - Key file: `public/4d6f1ea5473a0968a83c67ceda5a0387.txt` (contents = key; also `siteConfig.indexNowKey` / `PUBLIC_INDEXNOW_KEY`).
  - Ping: `scripts/indexnow.mjs` — reads `dist/sitemap-index.xml` (+ child sitemaps), POSTs batches to `https://api.indexnow.org/indexnow`, always exits 0 (`INDEXNOW_DISABLE=1` to skip; `--dry-run` supported).
  - How it runs: Workers Builds deploy command `npx wrangler deploy && node scripts/indexnow.mjs` (see `wrangler.jsonc` header + `docs/DEPLOYMENT.md`). npm: `npm run indexnow` / `npm run deploy:indexnow`. Not wired into `npm run build`. Current sitemap is ~56 URLs; Bing’s ~350 count is cumulative Self submissions across deploys, not a second pipeline.
- **Bing Webmaster Tools:** verified; sitemap `https://docuklin.com/sitemap-index.xml` submitted (owner).
- **Google Search Console:** verified (meta token in `siteConfig.googleSiteVerification`); **43 pages indexed**; impressions started **2026-11-08** (owner).
- **jev-seo audit → PR #30** (merged): titles ≤60 with brand via `buildPageTitle()`, expanded `/contact/`, tool JSON-LD `@graph` uses `@id` refs (no duplicate Person/Org blobs), `/.well-known/llms.txt` serves the same plain text as `/llms.txt` (`src/pages/.well-known/llms.txt.ts` — not an Astro API 301). **Known false alarms — do not “fix” again:** R23 cannibalization (guide/tool pairs follow `docs/KEYWORD-MAP.md`); trailing-slash R08/R25/R44 (Worker 308 + `trailingSlash: 'always'`); R19/R20/R55 heuristics.
- **PR #31** (merged): GSC-impression content — wedding vendor contract checklist; receipt generator + receipt guide (cross-linked); quote/estimate long-tails (“free instant quote”, construction); catering quote samples with illustrative per-head pricing.
- **This PR (#32):** embed credit `Powered by Docuklin` with `rel="nofollow"` (keep nofollow); factual About/trust page; “not legal or tax advice” on invoice/receipt tools + guides (`src/lib/disclaimers.ts`).
- **`/tools/<slug>/embed/`** pages are intentionally `noindex, follow` (`src/pages/tools/[slug]/embed.astro`); audits enforce this.
- **Contact:** `hello@docuklin.com` (`DEFAULT_CONTACT_EMAIL`); forwarded via Cloudflare Email Routing (owner).

### Policy / don’t do

- `llms.txt` / `llms-full.txt` do **not** help Google ranking; keep them for AI crawlers only.
- Don’t rely on FAQ schema for rich results (still emit FAQPage only when FAQs are visible on-page).
- No thin programmatic variant pages.
- No invented experts, credentials, headshots, or statistics.
- Don’t chase the head term **“estimate generator free”** (secondary/long-tail only in `docs/KEYWORD-MAP.md`).

### Open / off-page (not code)

- Directory submissions; Fazier listing already wired (`src/config/directoryBadges.ts`, footer badge).
- Featured/MentionMatch journalist requests, Product Hunt launch, and editorial backlinks — site has essentially none yet; Thread Reader App unroll link is minor.

## 2. Repo map

| Path | Role |
|------|------|
| `src/config/site.ts`, `siteDefaults.mjs` | Brand, domain, AdSense/GA4/EmailJS — see `docs/CONFIGURATION.md` |
| `src/data/tools/` | Tool definitions (`estimates.ts`, `contracts.ts`, `forms-creative.ts`, `shared-sources.ts`, `index.ts`) |
| `src/data/guides.ts` | Guide articles |
| `src/data/toolGuideMap.ts` | Tool ↔ guide links |
| `src/components/generators/` | `DocumentGenerator`, `documentModel.ts`, lazy shell |
| `src/pages/tools/[slug].astro`, `guides/[slug].astro` | Tool/guide page shells + JSON-LD |
| `src/pages/llms.txt.ts`, `llms-full.txt.ts`, `.well-known/llms.txt.ts` | AI crawler indexes (well-known serves same plain text) |
| `src/lib/seo.ts` | `buildPageTitle`, JSON-LD helpers |
| `src/lib/consentRegions.ts`, `src/worker.ts` | EEA/UK/CH geo bootstrap for CMP |
| `src/components/seo/Analytics.astro` | Consent Mode v2 + GA4 |
| `public/_headers` | CSP + security headers |
| `scripts/lib/content-dates.mjs` | Sitemap `lastmod` from real `updatedAt` |
| `scripts/generate-og-svg.mjs` | OG SVG → PNG (`prebuild`) |
| `scripts/indexnow.mjs` | Post-deploy IndexNow ping |
| `scripts/audit/` | SEO / pages / AdSense / budget / links |
| `docs/` | GROWTH-STATUS (living SEO/growth queue), DEPLOYMENT, SEO-PLAYBOOK, SEO-GUARDRAILS, PAGE-CHECKLIST, ADSENSE, KEYWORD-MAP |
| `.cursor/skills/`, `.cursor/rules/` | Agent skills and always-on rules |

## 3. Commands

```bash
npm ci                 # install
npm run dev            # local Astro server
npm test               # Vitest
npm run audit          # build + full SEO/AdSense/budget/link audits
npm run build          # static dist/ (runs OG prebuild)
npm run indexnow       # ping IndexNow from dist sitemap (after deploy)
npx lhci autorun       # mobile Lighthouse budgets (when UI/perf changes)
```

Shortcut: `npm run check` → `test` + `audit`.

## 4. Content rules

- **Voice:** Careful human editor — concrete, specific, scannable. Not AI-sounding. Full brief: [`docs/WRITING-GUIDE.md`](docs/WRITING-GUIDE.md).
- **Banned filler (examples):** “in today’s digital landscape”, “delve into”, “leverage”, “unlock the power”, “comprehensive guide to”, “whether you’re a … or a …”, “it’s important to note that”, “navigate the complexities”, stacked “furthermore/moreover”, empty “in conclusion”.
- **Sourcing:** No invented stats. Every number, rate, deadline, or legal claim needs a primary URL (IRS, SBA, FTC, HUD, Cornell LII, Copyright Office, OSHA, CDC preferred).
- **Guides structure:** H1 → answer-first (~40–60 words, answer in sentence 1) → primary tool CTA above the fold → byline `Reviewed by Hammad Iqbal · Last updated` → body with question H2s → worked example → FAQ → **Sources** list.
- **Tools structure:** H1 → short lead → usable form shell (real inputs, no “Open editor” gate) → byline → how-to / what to include / worked example / FAQ / sources.
- **Legal:** Contracts, NDA, consent, rental, health-adjacent → guide `legalNote` + tool `isLegalAdjacent: true` + visible “not legal advice” (and medical where relevant). Never claim attorney review.
- Full page checklist: `docs/PAGE-CHECKLIST.md`. Rule: `.cursor/rules/content-quality.mdc`.

## 5. SEO / AEO rules

- One primary keyword per URL; map in `docs/KEYWORD-MAP.md`. Research first: `.cursor/rules/seo-pages.mdc`.
- **Titles:** Pass through `buildPageTitle()` (`src/lib/seo.ts`); leave room for ` | Docuklin`; aim ≤60 chars at source (CI 25–65). Do not strip the brand.
- **Schema:** FAQPage only for visible FAQs. HowTo only from on-page steps (`tool.content.howToUse` / `guide.howTo`). Guides also get Article. Tools get WebApplication/SoftwareApplication.
- **Featured tools:** `featuredToolSlugs` / `getFeaturedTools()` in `src/data/tools/index.ts` — never `allTools.slice(0, N)`.
- **Sitemap lastmod:** From real `updatedAt` via `scripts/lib/content-dates.mjs` + `astro.config.mjs`. Never set lastmod to “now”.
- **IndexNow:** After production deploy (`npm run indexnow` / Workers Builds deploy command).
- **llms:** Keep `llms.txt` / `llms-full.txt` question maps in sync when adding intent pages; `/.well-known/llms.txt` serves the same plain-text body as `/llms.txt` (do not use an Astro API 301 — static builds turn those into HTML meta-refresh).
- **OG images:** PNG only (`/og/guide-*.png`, `/og/tool-*.png`). Generated in `prebuild`; do not point social tags at SVG.
- Origin for canonicals/sitemap/robots/llms/JSON-LD/OG: **only** `PUBLIC_SITE_URL` / `siteDefaults.mjs`.

## 6. Security & consent

### CSP (`public/_headers`)

Keep the allowlist tight. Widen only for a live console violation + vendor docs.

| Purpose | Hosts (why) |
|---------|-------------|
| GA4 | `googletagmanager.com`, `google-analytics.com`, `*.google-analytics.com`, `*.analytics.google.com` |
| AdSense + Funding Choices CMP | `pagead2.googlesyndication.com`, `googlesyndication.com`, `fundingchoicesmessages.google.com`, `*.adtrafficquality.google`, DoubleClick frames |
| Cloudflare Web Analytics | `static.cloudflareinsights.com`, `cloudflareinsights.com` |
| EmailJS | `api.emailjs.com`, `cdn.jsdelivr.net` (SDK) |

### Consent

- Consent Mode v2: **denied by default** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`) in `Analytics.astro`.
- **EEA / UK (`GB`) / CH:** Google AdSense Privacy & messaging (Funding Choices / IAB TCF v2.2) is the CMP. Worker injects `window.__docuklinGeo` (`consentRegions.ts`); site cookie bar suppressed there when ads are on.
- **Elsewhere:** site Accept/Reject cookie banner.
- See `docs/ADSENSE.md`, `docs/DEPLOYMENT.md`, `.cursor/rules/consent-and-csp.mdc`.

## 7. Adding pages / tools

Follow the skill — do not skip files:

| Task | Skill |
|------|--------|
| New generator tool | `.cursor/skills/add-a-new-generator-tool/SKILL.md` |
| New guide | `.cursor/skills/add-a-new-guide/SKILL.md` |
| Refresh existing guide | `.cursor/skills/refresh-an-existing-guide/SKILL.md` |
| Pre-merge gate | `.cursor/skills/pre-merge-seo-aeo-checklist/SKILL.md` |
| Legal-adjacent niche | `.cursor/skills/document-generator-niche/SKILL.md` |
| UI/look/behavior change | `.cursor/skills/ui-ux-pro-max/SKILL.md` |

## 8. Workflow

- **One agent / one concern per repo stream:** separate focused PRs (content ≠ CMP ≠ generator UX ≠ docs). Do not mix.
- Branch from latest `main`: `cursor/<descriptive-name>-1fce`. Open the PR; do not merge unless asked.
- Prefer `.cursor/skills/` over reinventing process. Always-on: `.cursor/rules/agent-workflow.mdc`.
- **Done / Remaining docs (mandatory every PR):** update `README.md` and `docs/GROWTH-STATUS.md` in the same PR with what changed and what is still open. Use explicit **Done** and **Remaining** sections; never invent stats, console screenshots, or off-repo actions.
- **Growth / SEO / content planning:** read `docs/GROWTH-STATUS.md` first; keep its queue accurate when items start or finish.
- **Pre-merge:** `npm test && npm run audit` (see `pre-merge-seo-aeo-checklist`). UI/perf → also `npx lhci autorun` when relevant. Indexing gate: `npm run audit:indexing` (wired into `npm run audit`).
- Optional subagents: `.cursor/agents/` (`seo-auditor`, `content-writer`, `adsense-reviewer`, `performance-auditor`, `document-fact-checker`).

## 9. Don'ts

- Don’t invent stats, legal requirements, or attorney-reviewed claims.
- Don’t ship AI filler voice or banned phrases above.
- Don’t use `allTools.slice` for home/footer/404 featured lists.
- Don’t set sitemap `lastmod` to “now”; don’t skip bumping real `updatedAt` on edits.
- Don’t point `og:image` at SVG; don’t leave new pages out of KEYWORD-MAP / toolGuideMap / llms question maps.
- Don’t emit HowTo/FAQPage JSON-LD without matching on-page content.
- Don’t loosen CSP broadly; don’t add a second CMP in EEA/UK/CH alongside Funding Choices.
- Don’t render Ahrefs/KD scores or internal keyword notes on public pages.
- Don’t use an “Open editor” click gate; don’t cover the tool with a tall cookie bar (>56px).
- Don’t merge unrelated workstreams into one PR; don’t merge without green `npm test` + `npm run audit`.
