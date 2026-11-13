/**
 * Cloudflare Worker entry (runs before static assets):
 * 1. Hosts in LEGACY_REDIRECT_HOSTS → single-hop 301 to CANONICAL_ORIGIN
 *    (path + query preserved; trailing slash applied in the same response)
 * 2. Otherwise permanent trailing-slash redirects (308)
 * 3. HTML responses get a tiny geo bootstrap (`window.__docuklinGeo`) from
 *    `request.cf.country` so the cookie banner can defer to Google’s CMP in
 *    EEA/UK/CH without a second popup.
 *
 * Built-in assets html_handling uses temporary 307; this worker upgrades slash
 * consolidation to 308. Preview/versioned workers.dev hosts and localhost are
 * not host-redirected unless explicitly listed.
 *
 * Runtime config (wrangler `vars` / dashboard Variables — not PUBLIC_*):
 *   CANONICAL_ORIGIN, LEGACY_REDIRECT_HOSTS
 * See docs/CONFIGURATION.md.
 */
import {
  DEFAULT_CANONICAL_ORIGIN,
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  legacyHostRedirectLocation,
  needsTrailingSlashRedirect,
  parseLegacyRedirectHosts,
} from './lib/workerRedirect';
import { isConsentRegion } from './lib/consentRegions';
import { injectGeoIntoHtml, isHtmlContentType } from './lib/workerHtml';

export interface Env {
  ASSETS: Fetcher;
  /** Canonical https origin (no trailing slash). */
  CANONICAL_ORIGIN?: string;
  /** Comma-separated exact Host values that 301 → CANONICAL_ORIGIN. */
  LEGACY_REDIRECT_HOSTS?: string;
}

type CfProperties = { country?: string };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const canonical = env.CANONICAL_ORIGIN || DEFAULT_CANONICAL_ORIGIN;
    const legacyHosts = parseLegacyRedirectHosts(
      env.LEGACY_REDIRECT_HOSTS,
      DEFAULT_LEGACY_REDIRECT_HOSTS,
    );

    const legacyLocation = legacyHostRedirectLocation(
      request.url,
      canonical,
      legacyHosts,
    );
    if (legacyLocation) {
      return Response.redirect(legacyLocation, 301);
    }

    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      needsTrailingSlashRedirect(url.pathname)
    ) {
      url.pathname = `${url.pathname}/`;
      return Response.redirect(url.toString(), 308);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (request.method === 'HEAD') return assetResponse;

    const contentType = assetResponse.headers.get('content-type');
    if (!isHtmlContentType(contentType)) return assetResponse;

    const cf = (request as Request & { cf?: CfProperties }).cf;
    const country = cf?.country || '';
    const html = await assetResponse.text();
    const body = injectGeoIntoHtml(html, country);

    const headers = new Headers(assetResponse.headers);
    if (country) headers.set('X-Docuklin-Country', country);
    headers.set(
      'X-Docuklin-Consent-Region',
      isConsentRegion(country) ? '1' : '0',
    );
    // Body length changed after injection.
    headers.delete('content-length');

    return new Response(body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};
