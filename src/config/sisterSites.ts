/**
 * Sister-site origins for sparse cross-links (About + topical tool pages).
 * Same env var names on all five repos. Fallbacks keep builds green when unset.
 * Origins are normalized without a trailing slash.
 * This site's own origin default comes from siteDefaults.mjs (not duplicated here).
 */
import {
  DEFAULT_SITE_URL,
  DEFAULT_SISTER_URL_FIBER_ARTS,
  DEFAULT_SISTER_URL_HOME_GARDEN,
  DEFAULT_SISTER_URL_PAYMENT_FEES,
  DEFAULT_SISTER_URL_PET,
} from './siteDefaults.mjs';

const DEFAULTS = {
  paymentFees: DEFAULT_SISTER_URL_PAYMENT_FEES,
  businessDocs: DEFAULT_SITE_URL,
  homeGarden: DEFAULT_SISTER_URL_HOME_GARDEN,
  fiberArts: DEFAULT_SISTER_URL_FIBER_ARTS,
  pet: DEFAULT_SISTER_URL_PET,
} as const;

function origin(envValue: string | undefined, fallback: string): string {
  const raw = (envValue || fallback).trim();
  return raw.replace(/\/$/, '');
}

/**
 * Read via import.meta.env (Astro/Vite) so values are inlined at build time.
 * Fall back to siteDefaults when a variable is missing.
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
