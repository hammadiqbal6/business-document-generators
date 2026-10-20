import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

/** Build-time robots.txt — Sitemap origin from PUBLIC_SITE_URL. */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  // No Disallow on embeds: they carry noindex + canonical to the tool page.
  // Avoid per-bot Allow-only groups that would cancel Disallows for Googlebot/Bingbot.
  const body = `User-agent: *
Allow: /

# AI search / answer engines (allow citations)
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Claude-SearchBot
Allow: /

# AI model training — allowed (including CCBot / Common Crawl); see docs/SEO-GUIDE.md
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: ${origin}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
