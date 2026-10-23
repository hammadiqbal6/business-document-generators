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

  const body = [
    `# ${name}`,
    '',
    `> ${siteConfig.tagline}`,
    '',
    `Privacy-first niche business document generators. Fill forms in the browser, preview live, export PDF or DOCX. No server-side storage of user form data. Educational templates are not legal, medical, or tax advice.`,
    '',
    `Site: ${origin}/`,
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
