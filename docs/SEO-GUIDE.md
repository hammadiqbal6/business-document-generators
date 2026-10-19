# SEO launch & post-launch guide

See also `docs/SEO-PLAYBOOK.md` (governing playbook) and `docs/KEYWORD-MAP.md`.

## Pre-launch checklist

- [ ] `PUBLIC_SITE_URL` matches live canonical host (HTTPS, one www/non-www)
- [ ] Unique title + meta description per page
- [ ] `sitemap-index.xml` submitted
- [ ] `robots.txt` allows Googlebot + AI search bots
- [ ] JSON-LD: Organization, WebSite, BreadcrumbList, WebApplication on tools
- [ ] Mobile Lighthouse ≥ 95 (run `npm run build && npx lhci autorun`)
- [ ] `npm run audit` passes

## robots.txt / AI crawlers

Generated at build from `src/pages/robots.txt.ts` (Sitemap origin from `PUBLIC_SITE_URL`).

- Default `User-agent: *` allows `/` and disallows `/tools/*/embed/`.
- AI search / answer bots (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`) are allowed.
- AI training / dataset bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) are also **allowed**, including Common Crawl (`CCBot`), matching the other training crawlers.
- Keep the `Sitemap:` line pointing at `sitemap-index.xml`.

## Google Search Console

1. Add **domain** property; verify DNS.
2. Submit sitemap: `https://yourdomain.com/sitemap-index.xml`
3. URL Inspection → request indexing for home, hubs, top 5 tools.
4. Monitor Page indexing, Core Web Vitals, and Generative AI performance reports.

## Bing

1. Import from GSC in Bing Webmaster Tools.
2. Enable IndexNow: host key file at `https://yourdomain.com/{PUBLIC_INDEXNOW_KEY}.txt`
3. POST changed URLs:

```bash
KEY=your-indexnow-key
URL=https://yourdomain.com/tools/construction-estimate-template/
curl -s "https://api.indexnow.org/indexnow?url=$URL&key=$KEY"
```

(IndexNow does not affect Google.)

## Keyword workflow (free tools)

1. Autocomplete expansion (`suggestqueries.google.com`)
2. Ahrefs free keyword generator / KD checker (manual)
3. Map one intent per URL (`docs/KEYWORD-MAP.md`)
4. After launch: GSC queries positions 8–30 → expand FAQs

## 90-day plan (summary)

| Weeks | Actions |
|-------|---------|
| 1–2 | Launch, indexing, fix CWV regressions |
| 3–4 | 5 guides live, internal links, embed outreach |
| 5–8 | Resource-page outreach, Product Hunt, refresh fee/legal disclaimers |
| 9–12 | Double down on top 3 tools by impressions; prune thin pages |

## Content calendar (next 20 articles)

1. Contractor change order template guide  
2. Photography model release vs contract  
3. Videography music licensing checklist  
4. Podcast sponsor disclosure (FTC)  
5. Real estate flyer fair housing copy  
6. Cleaning service price list template  
7. Catering head-count deadline clauses  
8. Wedding vendor insurance / COI  
9. Freelance SOW vs MSA  
10. Simple NDA vs employment IP assignment  
11. Work order vs invoice timing  
12. Receipt vs invoice for taxes  
13. Quote validity windows by industry  
14. Construction lien waiver basics (not legal advice)  
15. Rental pet policy addendum  
16. Tattoo aftercare documentation  
17. Event deposit refund state laws overview  
18. Export PDF vs DOCX for clients  
19. localStorage privacy for tools  
20. Embedding generators on your site (SEO-safe)

## Link building

- Embeddable iframe with attribution link
- Niche directories and “free tools for contractors/photographers” resource pages
- Genuine community answers (Reddit, forums) with the tool when relevant
