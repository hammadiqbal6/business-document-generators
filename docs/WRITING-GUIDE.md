# Human-quality writing guide

All guides, articles, and long-form tool copy must read as written by an experienced practitioner—not flagged as AI by common detectors (target: AI probability **&lt;30%** on each detector used).

## Voice

- Write as a contractor, freelancer, or bookkeeper talking to a peer.
- First-hand and practical. Specific situations (“on a kitchen remodel with a $400 substrate allowance…”). Real worked numbers clearly labeled as examples.
- Vary sentence length a lot (burstiness). Mix short punchy lines with longer ones. Use contractions.
- Occasional first-person practical asides are fine (“I’d put the due date next to Net 15 so AP doesn’t guess.”).
- Never invent statistics, quotes, named customer stories, or credentials.

## Banned patterns

Do not use: “delve”, “in today’s fast-paced world” / “in today’s digital landscape”, “it’s important to note”, “navigate”, “landscape”, “robust”, “seamless”, “leverage”, “unlock”, “elevate”, “comprehensive guide”, “in conclusion”, “whether you’re a … or a …”, “game-changer”, “dive into”, stacked “furthermore/moreover”, em-dash chains, triads of adjectives, every section ending with a summary sentence, uniform bullet lists of 3–5 bolded items.

Don’t open every section the same way. Avoid symmetrical structure across articles. Prefer prose over padded lists.

## SEO structure (keep)

- Question-phrased H2s where people search that way.
- Direct 40–60 word answer first (`answerFirst` / lead).
- FAQPage schema only for Q&A visible on the page.
- One primary keyword per URL (`docs/KEYWORD-MAP.md`).
- No invented legal/tax claims; use `legalNote` / disclaimers where relevant.

## Verification

1. Run `node scripts/audit/ai-style-check.mjs` (banned phrases, em-dash density, sentence-length variance). Wired into `npm run audit`.
2. When feasible, run `node scripts/audit/ai-detector.mjs` (optional local HF detectors). Target AI probability &lt;30%. Rewrite until it passes.
3. Record per-article scores in the PR description and in `docs/GROWTH-STATUS.md` Done / Remaining.
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
