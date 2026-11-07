/**
 * Cloudflare Worker entry (runs before static assets):
 * 1. Hosts in LEGACY_REDIRECT_HOSTS → single-hop 301 to CANONICAL_ORIGIN
 *    (path + query preserved; trailing slash applied in the same response)
 * 2. Otherwise permanent trailing-slash redirects (308)
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

export interface Env {
  ASSETS: Fetcher;
  /** Canonical https origin (no trailing slash). */
  CANONICAL_ORIGIN?: string;
  /** Comma-separated exact Host values that 301 → CANONICAL_ORIGIN. */
  LEGACY_REDIRECT_HOSTS?: string;
}

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

    return env.ASSETS.fetch(request);
  },
};
