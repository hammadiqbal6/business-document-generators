import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

/** Build-time robots.txt — Sitemap origin from PUBLIC_SITE_URL. */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  const body = `User-agent: *
Allow: /
Disallow: /tools/*/embed/

# AI search / answer engines (allow citations)
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Claude-SearchBot
Allow: /

# AI model training — owner may disallow; documented in docs/SEO-GUIDE.md
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Disallow: /

Sitemap: ${origin}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
