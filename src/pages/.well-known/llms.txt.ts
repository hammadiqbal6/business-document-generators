import type { APIRoute } from 'astro';
import { siteConfig } from '../../config/site';

/** Alias for crawlers that look under /.well-known/llms.txt */
export const GET: APIRoute = () => {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  return new Response(null, {
    status: 301,
    headers: {
      Location: `${origin}/llms.txt`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
