/**
 * Single source for this site's canonical origin fallback.
 * Import from astro.config.mjs, site.ts, indexnow, and audits — do not duplicate
 * the workers.dev hostname elsewhere in src/ or scripts/.
 *
 * Cutover: set PUBLIC_SITE_URL (and Workers Builds env) to the custom domain;
 * see docs/CUSTOM-DOMAIN.md. Do not change this default until DNS is live.
 */
export const DEFAULT_SITE_URL =
  'https://business-document-generators.hammadiqbal117.workers.dev';

/** Hostname only — used by audits to detect scattered hardcoding. */
export const DEFAULT_SITE_HOST = new URL(DEFAULT_SITE_URL).host;
