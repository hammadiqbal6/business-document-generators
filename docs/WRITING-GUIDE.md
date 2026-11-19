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
