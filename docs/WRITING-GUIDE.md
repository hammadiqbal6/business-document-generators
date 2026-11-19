# Docuklin writing guide (human voice)

Use this for every guide rewrite and new article in `src/data/guides.ts`. SEO structure stays; the voice should read like a practitioner talking to a peer.

## Voice

- **Practitioner to peer.** Write like a contractor, bookkeeper, photographer, or caterer explaining the job to someone who already runs a small business — not like a marketing page.
- **Contractions English.** Prefer “you’ll”, “don’t”, “it’s”, “we’ve” over stiff formal phrasing.
- **Varied sentence length.** Mix short punches with longer walkthroughs. Avoid every sentence landing near the same word count.
- **Concrete examples.** Label sample numbers and scenarios as examples (“Example: …”, “One schedule we use…”, “Say the client wants…”). Do not invent industry-wide statistics.
- **Occasional first-person asides.** A short “I’ve seen…” or “On my jobs…” is fine when it clarifies judgment; don’t invent credentials or case studies you can’t source.
- **Answer first.** Guides keep `answerFirst` at ~40–60 words with the answer in sentence 1. Question-form H2s, visible FAQ, worked example, Sources. Aim for a ≥800-word feel on the page.

## Banned filler and tells

Do not use:

- delve / dive into
- in today’s… / digital landscape
- navigate (the complexities) / landscape (as metaphor)
- robust / seamless / leverage / unlock / elevate
- comprehensive guide / in conclusion
- whether you’re X or Y
- game-changer
- it’s important to note
- stacked furthermore / moreover
- em-dash overuse (prefer commas, periods, or short clauses)
- uniform section shapes (same opener + same closer in every H2)

## Keep for SEO / schema

- Slugs, title keywords, `metaDescription` intent, `relatedToolSlugs` / `relatedGuideSlugs`
- `howTo` steps that match on-page content
- `sources[]` URLs (don’t invent citations)
- `legalNote` on legal/tax/health-adjacent guides
- FAQ questions visible on the page (FAQPage schema)
- Real `updatedAt` when you edit (feeds sitemap lastmod)

## Detector

Run `node scripts/audit/ai-style-check.mjs` (wired into `npm run audit`). It flags banned phrases, em-dash density, and low sentence-length variance. Optional local HF detector notes belong in the PR / `docs/GROWTH-STATUS.md` when available.
