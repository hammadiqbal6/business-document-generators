# Per-page SEO / AEO checklist

Use for every new or reworked page: tool, calculator, guide, hub, or reference.
Enforced in CI by `npm run audit:pages` (`scripts/audit/page-checklist.mjs`).

## 1. Before you write: keyword and intent

- [ ] One primary query. Check volume/trend (Search Console, Keyword Planner, Ahrefs/Semrush, or autocomplete + “People also ask”).
- [ ] Name the intent: do (use a tool), know (get an answer), compare (X vs Y), or navigate. Match the page type.
- [ ] Look at the top 5 results. Note format (tool first, table, steps) and one gap you will fill.
- [ ] Check the site for a page on the same query (cannibalization). Extend that page instead of duplicating.
- [ ] List 3–6 secondary questions from PAA / related searches → H2s and FAQ.
- [ ] Map the keyword in `docs/KEYWORD-MAP.md`.

## 2. Structure

- [ ] One H1 that matches the query in plain words.
- [ ] Answer first: opening 40–60 words answer the query directly, with a number or definition where one exists.
- [ ] On a tool page, the editor/form is usable above the fold on mobile (390×844); no “Open editor” click gate; ≤60 words before the first input.
- [ ] H2/H3 in order with no skipped levels. Phrase H2s as questions where people search that way.
- [ ] Worked example with real numbers.
- [ ] At least one table, chart, or diagram you made yourself.
- [ ] Page-specific content; keep sitewide boilerplate short or link out.
- [ ] Visible published / last updated dates matching schema and sitemap lastmod.

## 3. Metadata

- [ ] Title 30–60 characters (CI allows 25–65), unique, primary query near the start, brand at the end.
- [ ] Meta description 70–155 characters (CI allows 70–160), unique, answer or benefit, no stuffing.
- [ ] Canonical absolute, self-referencing, https, trailing slash matching sitemap.
- [ ] Robots: index,follow for real pages; noindex for embed/print/thin utility. Never Disallow a page you rely on noindex for.
- [ ] Open Graph and Twitter: title, description, url, 1200×630 image (not SVG preferred for social; site may use SVG OG), alt text.
- [ ] `<html lang>` and viewport set.

## 4. Schema (JSON-LD)

- [ ] Valid JSON. BreadcrumbList on every page except homepage.
- [ ] Tools: WebApplication/SoftwareApplication (name, applicationCategory, offers price 0, operatingSystem Any).
- [ ] Guides: Article with headline, dates, author Person url, publisher Organization.
- [ ] FAQPage only when Q&A is visible. Hubs + `/tools/` + `/guides/`: CollectionPage + ItemList.
- [ ] Schema values match visible text.

## 5. Internal links

- [ ] Guide ↔ matching tool high on the page; 2–3 related guides/tools.
- [ ] Hub links to the new page; nav if it is a top page.
- [ ] Descriptive anchors; trailing-slash URLs; no links to redirects/404s.

## 6. Trust and sources

- [ ] Numbers/formulas cite primary sources with inline links; re-check outbound citations.
- [ ] Byline links to About; no overstated credentials.
- [ ] Safety / “consult a professional” only where it matters (health, legal, money).

## 7. Mobile (390×844)

- [ ] No horizontal overflow. Tap targets ≥44×44. Body/inputs ≥16px.
- [ ] Cookie banner is a single bottom bar ≤56px and does not cover the tool.
- [ ] Tool works: enter values, result updates.

## 8. Performance

- [ ] LCP &lt; 2.5s / INP &lt; 200ms targets on mobile. Lazy-load heavy export JS until export.
- [ ] Images with dimensions; hashed assets long-cache.

## 9. Ship and verify

- [ ] In sitemap with correct lastmod. `npm test && npm run audit` green.
- [ ] Live: 200, canonical resolves, slash URL canonicalization works, not blocked in robots.txt.
