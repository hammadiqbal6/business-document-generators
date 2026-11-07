import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { buildAdsTxt } from '../lib/adsTxt';

/** Build-time ads.txt from PUBLIC_ADSENSE_PUBLISHER_ID (see docs/ADSENSE.md). */
export const GET: APIRoute = () => {
  const body = buildAdsTxt(siteConfig.adsensePublisherId);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
