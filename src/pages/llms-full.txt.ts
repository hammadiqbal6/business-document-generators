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

  const questionMap = [
    `- How do you write a receipt of payment? → ${origin}/guides/what-to-include-on-a-receipt/`,
    `- What is a payment receipt? → ${origin}/guides/what-to-include-on-a-receipt/`,
    `- How long should I keep receipt and invoice copies? → ${origin}/guides/what-to-include-on-a-receipt/ (IRS: generally 3 years; employment tax ≥4 years; 6 years if >25% of gross income unreported)`,
    `- What is a line item total / line total? → ${origin}/guides/line-item-totals-explained/`,
    `- Is a quote the same as an estimate? → ${origin}/guides/invoice-vs-estimate/`,
    `- How long is an estimate good for? → ${origin}/guides/how-to-write-a-business-estimate/ (no single federal period; put a validity date on the PDF)`,
    `- How do you write a business estimate? → ${origin}/guides/how-to-write-a-business-estimate/`,
    `- How do you write a construction quote or estimate? → ${origin}/guides/construction-estimate-that-wins-jobs/`,
    `- How do you invoice as a contractor (progress billing)? → ${origin}/guides/contractor-invoice-example/`,
    `- How do you write a work order? → ${origin}/guides/how-to-create-a-work-order/`,
    `- Work order vs invoice vs estimate? → ${origin}/guides/work-order-vs-invoice-vs-estimate/`,
    `- How do you write a photography contract? Who owns the photos? → ${origin}/guides/photography-contract-clauses/ (Copyright Office: protection when fixed; photographer generally the author unless work made for hire)`,
    `- Catering quotation example / how to create a catering quote? → ${origin}/guides/catering-quotation-example/ and ${origin}/guides/catering-quote-deposits/`,
    `- Freelance web design contract clauses (scope, IP, revisions, handover)? → ${origin}/guides/freelance-web-design-contract-clauses/`,
    `- Wedding videography contract? → ${origin}/guides/wedding-videography-contract/ (general clauses: ${origin}/guides/videography-contract-clauses/)`,
    `- How do you write a podcast script? → ${origin}/guides/podcast-script-structure/ (sponsor disclosures: 16 CFR Part 255)`,
    `- How do you make a real estate flyer? → ${origin}/guides/real-estate-flyer-what-to-include/`,
  ];

  const citedFigures = [
    '- IRS what-records: invoices, receipts, and receipt books support gross receipts.',
    '- IRS how-long: generally 3 years for income tax records; ≥4 years for employment tax records; 6 years if more than 25% of gross income was unreported.',
    '- Copyright Office (photographers): copyright exists from fixation; author is generally the person who takes the photo unless work made for hire.',
    '- Cornell LII Wex contract: offer, acceptance, and consideration; document title alone does not decide binding effect.',
    '- Deposit % and 30/40/30 milestone splits on Docuklin pages are working patterns in examples, not official federal rules.',
    '- FTC small-business scams PDF (July 2023): verify invoices before paying; watch fake invoices and unordered merchandise.',
    '- 16 CFR Part 255: disclose material connections clearly for endorsements and sponsor reads.',
  ];

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
    '## Questions → URLs',
    ...questionMap,
    '',
    '## Key cited figures',
    ...citedFigures,
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
