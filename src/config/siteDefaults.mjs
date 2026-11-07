/**
 * Single source for this site's canonical origin and brand fallbacks.
 * Import from astro.config.mjs, site.ts, indexnow, audits, OG scripts, and the
 * Worker — do not duplicate the custom-domain hostname elsewhere in src/.
 *
 * Build-time PUBLIC_SITE_URL / PUBLIC_SITE_NAME override these. The Worker does
 * not receive PUBLIC_* vars; it uses wrangler `vars.CANONICAL_ORIGIN` (defaulting
 * to DEFAULT_SITE_URL) for legacy-host 301s — see docs/CUSTOM-DOMAIN.md.
 */
export const DEFAULT_SITE_URL = 'https://docuklin.com';

/** Hostname only — used by audits to detect scattered hardcoding. */
export const DEFAULT_SITE_HOST = new URL(DEFAULT_SITE_URL).host;

/** Brand shown in header, titles, schema Organization when PUBLIC_SITE_NAME is unset. */
export const DEFAULT_SITE_NAME = 'Docuklin';

/** Short name for apple-mobile-web-app-title / manifest / JSON-LD alternateName. */
export const DEFAULT_SITE_SHORT_NAME = 'Docuklin';

/**
 * Exact workers.dev production hostname to 301 → canonical origin.
 * Preview hosts (`<version>-business-document-generators.…`) must NOT match.
 */
export const LEGACY_WORKERS_DEV_HOST =
  'business-document-generators.hammadiqbal117.workers.dev';
