# Growth / SEO status

Living tracker for Docuklin SEO and growth work. **Read this before planning growth, SEO, or content work.** Update it in the **same PR** when an item is completed, started, or added. Do not invent metrics, dates, or off-repo actions — only record owner-reported or in-repo facts.

Settled technical SEO policy (IndexNow wiring, jev-seo false alarms, title/schema rules) still lives under **SEO state** in `AGENTS.md`. This file holds current metrics and the work queue.

Last updated: **2026-11-18**

---

## Baseline metrics

As of **2026-11-18** (owner-reported unless noted).

| Source | Fact |
|--------|------|
| Site | [docuklin.com](https://docuklin.com) |
| Stack | Astro on Cloudflare Workers (`worker` name: `business-document-generators`) |
| GA4 | Measurement ID `G-HR4DDMD97H` (property `559564505`) |
| Build env | Build-time `PUBLIC_*` in Workers Builds env (production env overrides `siteDefaults`) |
| GSC (last 28 days → 2026-11-18) | **0** clicks, **354** impressions, avg position **60.1** |
| Indexing (GSC) | **48** pages indexed, **6** not indexed |
| GA4 (28 days) | **2** users vs ~**5.6k** Cloudflare page views (GA4 only fires after cookie consent Accept; Cloudflare includes bot traffic) |
| Domain rating | Ahrefs-style DR **2** (owner-reported) |

---

## Done (dated)

- **2026-11-18 — PR #33 merged:** redirects `/tools/invoice/` and `/tools/invoice-generator/` → `/tools/contractor-invoice/`, `/sitemap_index.xml`, `/privacy-policy/`; `/favicon.png`; fixed embed GTM/gtag beacon 404s; `workers_dev` disabled; stale `siteDefaults` updated.
- **2026-11-18 — PR #33 also:** SEO for GSC-impression tool pages (quote/estimate generator, contractor invoice, receipt, construction estimate): stronger titles/metas, FAQs + FAQPage JSON-LD, internal links.
- **Nov 2026 — Google AdSense:** application submitted; status **Getting ready**.
- **2026-11-18 — Reddit (`u/ihammadiqbal117`):**
  - Docuklin promo comment in r/smallbusiness Q4 2026 promote thread: https://www.reddit.com/r/smallbusiness/comments/1wwpjlw/comment/19stad4gftdid/
  - Advice-only comment (no link) in r/Contractor “Itemizing estimates”: https://www.reddit.com/r/Contractor/comments/1xt414g/comment/19stc7h27vygz/

Earlier settled in-repo SEO (IndexNow, Bing/GSC verification, PRs #30–#32) is summarized in `AGENTS.md` **SEO state** — do not re-litigate those false alarms here.

---

## In progress

- **AdSense review** — application status **Getting ready** (Nov 2026); expect review ~3–4 weeks; keep publishing on schedule (see Pending #9).
- No other in-repo SEO/growth code work is actively in progress as of 2026-11-18.

---

## Pending / next (prioritized)

1. **Owner to post manually:** r/Contractor “Net 30, 15 or Due on receipt?” advice comment (check if already posted); r/freelance “Microsoft Word Contract” advice comment (no link — sub bans self-promo); r/SideProject Docuklin launch post (on/after **2026-11-19**).
2. **GA4 Consent Mode v2** (default denied + cookieless pings) so traffic is measured without waiting on Accept.
3. **After deploy:** ping IndexNow and use GSC URL Inspection → Request indexing for the updated tool pages; resubmit the **6** not-indexed pages once internal links are stronger.
4. **Free-tool/template directory submissions** — owner says some already done; record which ones here as confirmed when known.
5. **Keep answering real Reddit/Quora questions** (r/freelance, r/smallbusiness, r/sweatystartup, r/Contractor) — value-first; most ban self-promo links; use promo threads for links.
6. **Outreach** to freelancer/small-business bloggers offering embeds/templates.
7. **Add closely related variants** of tools that already get impressions — not new topics.
8. **Weekly GSC check** (clicks, impressions, avg position, indexing) and record deltas in this file.
9. **AdSense:** keep publishing on schedule; expect review ~3–4 weeks.

---

## Off-repo work

Things done (or pending) outside the codebase. Move dated completions into **Done** above when confirmed; keep open owner actions here or in Pending.

| When | What | Status |
|------|------|--------|
| Nov 2026 | Google AdSense application | **Getting ready** (awaiting review) |
| 2026-11-18 | Reddit r/smallbusiness promo comment | Done (link in Done) |
| 2026-11-18 | Reddit r/Contractor advice comment (no link) | Done (link in Done) |
| Pending | Reddit r/Contractor Net 30 / r/freelance Word contract / r/SideProject launch | Owner posts (Pending #1) |
| Partial | Free-tool/template directory submissions | Some done (owner); list confirmed names here when known |
| Ongoing | Reddit/Quora value-first answers; blogger embed outreach | Pending #5–#6 |
| Console | GSC / Bing Webmaster / IndexNow Self submissions | Verified earlier (see `AGENTS.md` SEO state); refresh metrics in Baseline on weekly check |

---

## How to update this file

1. **Before** planning growth, SEO, or content work: read this file end-to-end (and `AGENTS.md` SEO state for settled technical policy).
2. **In the same PR** that completes or starts an item:
   - Move finished work into **Done** with an ISO date (`YYYY-MM-DD`) and PR number or off-repo proof link when available.
   - Adjust **In progress** / **Pending** so the queue stays accurate and prioritized.
   - Record new off-repo actions under **Off-repo work** (and **Done** when dated).
   - On weekly GSC review (Pending #8), update **Baseline metrics** with the new window and a short delta note (do not invent numbers).
3. **Never** invent stats, directory listings, Reddit posts, or console screenshots. If unknown, leave a “not yet recorded” note.
4. Keep this docs-only concern in its own PR when possible (`agent-workflow`: content ≠ CMP ≠ generator UX ≠ docs).
5. Filename convention: `docs/SCREAMING-KEBAB.md` (this file: `GROWTH-STATUS.md`).
