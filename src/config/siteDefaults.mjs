/**
 * Single source for brand / site-identity fallbacks.
 * Build-time PUBLIC_* (Workers Builds / .env) override these for Astro HTML.
 * Worker runtime vars (wrangler `vars`, not PUBLIC_*) override redirect-related
 * defaults — see docs/CONFIGURATION.md and docs/CUSTOM-DOMAIN.md.
 *
 * Defaults match the live Docuklin production site.
 */

/** Canonical origin (no trailing slash). */
export const DEFAULT_SITE_URL = 'https://docuklin.com';

/** Hostname only — used by audits to detect scattered hardcoding. */
export const DEFAULT_SITE_HOST = new URL(DEFAULT_SITE_URL).host;

/** Brand shown in header, titles, schema Organization. */
export const DEFAULT_SITE_NAME = 'Docuklin';

/** Short name for apple-mobile-web-app-title / manifest / JSON-LD alternateName. */
export const DEFAULT_SITE_SHORT_NAME = 'Docuklin';

/** Homepage / Organization description. */
export const DEFAULT_SITE_TAGLINE =
  'Free niche business document generators — fill a form, preview live, export PDF or DOCX. Nothing leaves your browser.';

/** Shorter description for site.webmanifest. */
export const DEFAULT_MANIFEST_DESCRIPTION =
  'Free niche business document generators with PDF export';

/** Public contact email (footer, Contact, schema). */
export const DEFAULT_CONTACT_EMAIL = 'hammadiqbal117@gmail.com';

/** Named maintainer (About, bylines, Person schema). */
export const DEFAULT_AUTHOR_NAME = 'Hammad Iqbal';

/** Maintainer email (Person schema); usually same as contact. */
export const DEFAULT_AUTHOR_EMAIL = DEFAULT_CONTACT_EMAIL;

/** Honest short bio for Person / About. */
export const DEFAULT_AUTHOR_BIO =
  'I build and maintain free in-browser tools. I turn published public sources into practical generators and show which sources each page uses. I am not a lawyer, accountant, or licensed professional advisor.';

/** Primary profile URL (Person @id / sameAs). */
export const DEFAULT_AUTHOR_URL = 'https://github.com/hammadiqbal6';

/**
 * Comma-separated profile URLs for Person.sameAs (and default Organization.sameAs).
 * First entry should usually match DEFAULT_AUTHOR_URL.
 */
export const DEFAULT_AUTHOR_SAME_AS = DEFAULT_AUTHOR_URL;

/** Comma-separated Organization.sameAs; empty → reuse author sameAs. */
export const DEFAULT_ORG_SAME_AS = '';

/** Footer © owner; empty → use site name. */
export const DEFAULT_COPYRIGHT_OWNER = '';

/** Browser chrome / manifest theme_color. */
export const DEFAULT_THEME_COLOR = '#0f6b5c';

/** Manifest background_color. */
export const DEFAULT_BACKGROUND_COLOR = '#ffffff';

/** Open Graph locale (og:locale). */
export const DEFAULT_LOCALE = 'en_US';

/** <html lang> (BCP 47). */
export const DEFAULT_HTML_LANG = 'en';

/** Sitewide published baseline (ISO date). */
export const DEFAULT_LAUNCHED_AT = '2026-10-19';

/** Default Open Graph image path (no domain). */
export const DEFAULT_OG_IMAGE_PATH = '/og-default.png';

/**
 * Default og:image:alt. `{name}` is replaced with the site name.
 */
export const DEFAULT_OG_IMAGE_ALT =
  '{name} — free invoice, estimate, and contract templates with PDF export';

/**
 * Footer line on per-page OG SVGs. `{name}` → site name.
 */
export const DEFAULT_OG_IMAGE_FOOTER = '{name} · Free PDF / DOCX templates';

/** Subtitle on the default OG card (og-default.svg). */
export const DEFAULT_OG_DEFAULT_SUBTITLE = 'Free niche business document generators';

/** Organization logo path (JSON-LD ImageObject). */
export const DEFAULT_LOGO_PATH = '/logo-512.png';

/**
 * Exact hostnames that 301 → CANONICAL_ORIGIN (Worker runtime).
 * Comma-separated. Preview hosts (`<version>-…workers.dev`) must NOT be listed.
 */
export const DEFAULT_LEGACY_REDIRECT_HOSTS =
  'business-document-generators.hammadiqbal117.workers.dev';

/** @deprecated use DEFAULT_LEGACY_REDIRECT_HOSTS; kept for older imports. */
export const LEGACY_WORKERS_DEV_HOST = DEFAULT_LEGACY_REDIRECT_HOSTS.split(',')[0].trim();

/** Sister-site origin fallbacks (no trailing slash). */
export const DEFAULT_SISTER_URL_PAYMENT_FEES =
  'https://payment-fee-calculators.hammadiqbal117.workers.dev';
export const DEFAULT_SISTER_URL_HOME_GARDEN =
  'https://home-garden-calculators.hammadiqbal117.workers.dev';
export const DEFAULT_SISTER_URL_FIBER_ARTS =
  'https://fiber-arts-calculators.hammadiqbal117.workers.dev';
export const DEFAULT_SISTER_URL_PET = 'https://pet-calculators.hammadiqbal117.workers.dev';

/** Sister-site display names (About list). */
export const DEFAULT_SISTER_NAME_PAYMENT_FEES = 'FeeCalc (payment fee calculators)';
export const DEFAULT_SISTER_NAME_HOME_GARDEN = 'YardCalc (home & garden calculators)';
export const DEFAULT_SISTER_NAME_FIBER_ARTS = 'FiberCalc (knitting & crochet calculators)';
export const DEFAULT_SISTER_NAME_PET = 'PetCalc (pet calculators)';

/** Replace `{name}` (and optional `{short}`) in brand templates. */
export function applyBrandTemplate(template, { name, shortName } = {}) {
  const n = name ?? DEFAULT_SITE_NAME;
  const s = shortName ?? DEFAULT_SITE_SHORT_NAME;
  return String(template).replaceAll('{name}', n).replaceAll('{short}', s);
}

/** Parse comma/whitespace-separated URL or host lists; drop empties. */
export function parseList(value, fallback = '') {
  const raw = (value == null || String(value).trim() === '' ? fallback : value)
    .toString()
    .trim();
  if (!raw) return [];
  return raw
    .split(/[, \n\r\t]+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
