import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

/** Build-time llms.txt — links use PUBLIC_SITE_URL (optional for AI crawlers). */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  const name = siteConfig.siteName;
  const body = `# ${name} (optional llms.txt — not used by Google Search)
# ${origin}/

> Free in-browser niche business document generators. Privacy-first: no server-side storage.

- [All tools](${origin}/tools/)
- [Construction estimate](${origin}/tools/construction-estimate-template/)
- [Photography contract](${origin}/tools/photography-contract-template/)
- [Guides](${origin}/guides/)
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
