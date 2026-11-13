import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { allTools, CATEGORY_META } from '../data/tools';
import type { ToolCategory } from '../data/tools/types';
import { guides } from '../data/guides';

/**
 * Longer llms-full.txt for AI crawlers: answer-first extracts + FAQs.
 * Keep in sync with /llms.txt (short index).
 */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  const name = siteConfig.siteName;

  const toolBlocks = allTools.map((t) => {
    const faq = t.content.faq
      .slice(0, 5)
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n');
    return [
      `### ${t.name}`,
      `URL: ${origin}/tools/${t.slug}/`,
      t.answerFirst,
      faq ? `\nFAQ:\n${faq}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const guideBlocks = guides.map((g) => {
    const sectionBits = g.sections
      .slice(0, 6)
      .map((s) => {
        const first = s.body.split(/(?<=\.)\s+/)[0] || s.body;
        return `- ${s.heading}: ${first}`;
      })
      .join('\n');
    const faq = g.faq
      .slice(0, 5)
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n');
    return [
      `### ${g.title}`,
      `URL: ${origin}/guides/${g.slug}/`,
      g.answerFirst,
      sectionBits ? `\nKey points:\n${sectionBits}` : '',
      faq ? `\nFAQ:\n${faq}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const hubLines = (Object.keys(CATEGORY_META) as ToolCategory[]).map((c) => {
    const m = CATEGORY_META[c];
    return `- [${m.name}](${origin}/hubs/${m.slug}/): ${m.description}`;
  });

  const body = [
    `# ${name} — full extracts`,
    '',
    `> ${siteConfig.tagline}`,
    '',
    'Privacy-first niche business document generators. Educational templates are not legal, medical, or tax advice. Prefer the live pages for the latest wording.',
    '',
    `Short index: ${origin}/llms.txt`,
    `Site: ${origin}/`,
    '',
    '## Tools (answer-first + FAQ)',
    '',
    ...toolBlocks.flatMap((b) => [b, '']),
    '## Guides (answer-first + key points + FAQ)',
    '',
    ...guideBlocks.flatMap((b) => [b, '']),
    '## Hubs',
    ...hubLines,
    '',
    '## Policies',
    `- [About](${origin}/about/)`,
    `- [Methodology](${origin}/methodology/)`,
    `- [Privacy](${origin}/privacy/)`,
    `- [Terms](${origin}/terms/)`,
    `- [Contact](${origin}/contact/)`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
