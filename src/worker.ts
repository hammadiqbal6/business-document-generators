/**
 * Cloudflare Worker entry (runs before static assets):
 * 1. Exact legacy workers.dev host → single-hop 301 to CANONICAL_ORIGIN
 *    (path + query preserved; trailing slash applied in the same response)
 * 2. Otherwise permanent trailing-slash redirects (308)
 *
 * Built-in assets html_handling uses temporary 307; this worker upgrades slash
 * consolidation to 308. Preview/versioned workers.dev hosts and localhost are
 * not host-redirected. FILE_EXT allows long extensions (e.g. .webmanifest).
 *
 * Runtime config: wrangler `vars.CANONICAL_ORIGIN` (defaults to docuklin.com).
 * Build-time PUBLIC_* vars are not available here — see docs/CUSTOM-DOMAIN.md.
 */
import {
  DEFAULT_CANONICAL_ORIGIN,
  legacyHostRedirectLocation,
  needsTrailingSlashRedirect,
} from './lib/workerRedirect';

export interface Env {
  ASSETS: Fetcher;
  /** Canonical https origin (no trailing slash). Set in wrangler.jsonc vars. */
  CANONICAL_ORIGIN?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const canonical = env.CANONICAL_ORIGIN || DEFAULT_CANONICAL_ORIGIN;

    const legacyLocation = legacyHostRedirectLocation(request.url, canonical);
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
