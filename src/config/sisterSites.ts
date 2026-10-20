/**
 * Sister-site origins for sparse cross-links (About + topical tool pages).
 * Same env var names on all five repos. Fallbacks keep builds green when unset.
 * Origins are normalized without a trailing slash.
 */

const DEFAULTS = {
  paymentFees: 'https://payment-fee-calculators.hammadiqbal117.workers.dev',
  businessDocs: 'https://business-document-generators.hammadiqbal117.workers.dev',
  homeGarden: 'https://home-garden-calculators.hammadiqbal117.workers.dev',
  fiberArts: 'https://fiber-arts-calculators.hammadiqbal117.workers.dev',
  pet: 'https://pet-calculators.hammadiqbal117.workers.dev',
} as const;

function origin(envValue: string | undefined, fallback: string): string {
  const raw = (envValue || fallback).trim();
  return raw.replace(/\/$/, '');
}

/**
 * Read via import.meta.env (Astro/Vite) so values are inlined at build time.
 * Fall back to workers.dev defaults when a variable is missing.
 */
export const sisterSites = {
  paymentFees: origin(import.meta.env.PUBLIC_SITE_URL_PAYMENT_FEES, DEFAULTS.paymentFees),
  businessDocs: origin(import.meta.env.PUBLIC_SITE_URL_BUSINESS_DOCS, DEFAULTS.businessDocs),
  homeGarden: origin(import.meta.env.PUBLIC_SITE_URL_HOME_GARDEN, DEFAULTS.homeGarden),
  fiberArts: origin(import.meta.env.PUBLIC_SITE_URL_FIBER_ARTS, DEFAULTS.fiberArts),
  pet: origin(import.meta.env.PUBLIC_SITE_URL_PET, DEFAULTS.pet),
} as const;

export type SisterSiteKey = keyof typeof sisterSites;

/** Absolute URL to a path on a sister site (path may be with or without leading slash). */
export function sisterUrl(key: SisterSiteKey, path = '/'): string {
  const base = sisterSites[key];
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/') return `${base}/`;
  return `${base}${p.endsWith('/') ? p : `${p}/`}`;
}

export { DEFAULTS as sisterSiteDefaults };
