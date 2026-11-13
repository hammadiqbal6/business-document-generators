import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { allTools, CATEGORY_META } from '../data/tools';
import type { ToolCategory } from '../data/tools/types';
import { guides } from '../data/guides';

/** Build-time llms.txt — every tool and guide with one-liners; origin from PUBLIC_SITE_URL. */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  const name = siteConfig.siteName;

  const toolLines = allTools.map(
    (t) => `- [${t.name}](${origin}/tools/${t.slug}/): ${t.metaDescription}`,
  );
  const guideLines = guides.map(
    (g) => `- [${g.title}](${origin}/guides/${g.slug}/): ${g.metaDescription}`,
  );
  const hubLines = (Object.keys(CATEGORY_META) as ToolCategory[]).map((c) => {
    const m = CATEGORY_META[c];
    return `- [${m.name}](${origin}/hubs/${m.slug}/): ${m.description}`;
  });

  const questionMap = [
    `- How do you write a receipt of payment? → ${origin}/guides/what-to-include-on-a-receipt/`,
    `- What is a payment receipt? → ${origin}/guides/what-to-include-on-a-receipt/`,
    `- What is a line item total / line total? → ${origin}/guides/line-item-totals-explained/`,
    `- Is a quote the same as an estimate? → ${origin}/guides/invoice-vs-estimate/`,
    `- How long is an estimate good for? → ${origin}/guides/how-to-write-a-business-estimate/`,
    `- How do you write a construction quote or estimate? → ${origin}/guides/construction-estimate-that-wins-jobs/`,
    `- How do you invoice as a contractor? → ${origin}/guides/contractor-invoice-example/`,
    `- How do you write a work order? → ${origin}/guides/how-to-create-a-work-order/`,
    `- How do you write a photography contract? → ${origin}/guides/photography-contract-clauses/`,
    `- Who owns the photos from a paid shoot? → ${origin}/guides/photography-contract-clauses/`,
    `- How do you create a catering quote? → ${origin}/guides/catering-quote-deposits/`,
    `- Catering quotation example? → ${origin}/guides/catering-quotation-example/`,
    `- Freelance web design contract clauses? → ${origin}/guides/freelance-web-design-contract-clauses/`,
    `- Wedding videography contract? → ${origin}/guides/wedding-videography-contract/`,
    `- How do you write a podcast script? → ${origin}/guides/podcast-script-structure/`,
    `- How do you make a real estate flyer? → ${origin}/guides/real-estate-flyer-what-to-include/`,
    `- What is an independent contractor agreement? → ${origin}/tools/independent-contractor-agreement/`,
    `- How do you create a timesheet? → ${origin}/tools/timesheet-template/`,
    `- What should a service agreement include? → ${origin}/tools/service-agreement-template/`,
    `- Is a purchase order the same as a work order? → ${origin}/tools/purchase-order-template/`,
    `- What is a construction change order? → ${origin}/tools/change-order-template/`,
  ];

  const citedFigures = [
    '- IRS record retention (income tax): generally keep supporting records until the limitation period runs out; for most returns that is 3 years after filing.',
    '- IRS employment tax records: keep at least 4 years after the tax becomes due or is paid, whichever is later.',
    '- IRS: if more than 25% of gross income was unreported, the limitation period is generally 6 years.',
    '- IRS supporting documents for gross receipts include sales slips, invoices, receipts, receipt books, and deposit slips.',
    '- U.S. Copyright Office: copyright in a photograph exists when the image is fixed; the photographer is generally the author unless work made for hire.',
    '- Cornell LII Wex: a contract generally requires offer, acceptance, and consideration; whether a signed quote or work order binds depends on the wording.',
    '- Deposit percentages and freelance 30/40/30 splits on this site are common working patterns in examples, not official IRS/SBA/FTC rules.',
    '- Podcast sponsor reads: U.S. endorsement rules are in 16 CFR Part 255 (material connections must be disclosed clearly).',
  ];

  const body = [
    `# ${name}`,
    '',
    `> ${siteConfig.tagline}`,
    '',
    `Privacy-first niche business document generators. Fill forms in the browser, preview live, export PDF or DOCX. No server-side storage of user form data. Educational templates are not legal, medical, or tax advice.`,
    '',
    `Site: ${origin}/`,
    `Full extracts: ${origin}/llms-full.txt`,
    '',
    '## Questions → URLs',
    ...questionMap,
    '',
    '## Key cited figures',
    ...citedFigures,
    '',
    '## Tools',
    ...toolLines,
    '',
    '## Guides',
    ...guideLines,
    '',
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
