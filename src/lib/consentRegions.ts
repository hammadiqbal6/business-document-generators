/**
 * Regions where Google’s EU User Consent Policy requires a certified CMP
 * (IAB TCF) for personalized ads: EEA + UK + Switzerland.
 * ISO 3166-1 alpha-2 (Cloudflare `request.cf.country` / Consent Mode `region`).
 * UK is `GB` (not `UK`).
 */
export const CONSENT_MODE_REGIONS = [
  // EU
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  // EEA (non-EU)
  'IS',
  'LI',
  'NO',
  // UK + Switzerland
  'GB',
  'CH',
] as const;

export type ConsentModeRegion = (typeof CONSENT_MODE_REGIONS)[number];

const REGION_SET = new Set<string>(CONSENT_MODE_REGIONS);

/** True when the country code is EEA, UK (GB), or Switzerland. */
export function isConsentRegion(countryCode: string | null | undefined): boolean {
  if (!countryCode || typeof countryCode !== 'string') return false;
  const code = countryCode.trim().toUpperCase();
  if (!code || code === 'XX' || code === 'T1') return false; // Cloudflare unknowns / tor
  return REGION_SET.has(code);
}

/** Inline bootstrap for HTML pages (Worker injects after reading `request.cf.country`). */
export function geoBootstrapScript(countryCode: string | null | undefined): string {
  const country = (countryCode || '').trim().toUpperCase();
  const consentRegion = isConsentRegion(country);
  const safeCountry = JSON.stringify(country);
  return `<script>window.__docuklinGeo={country:${safeCountry},consentRegion:${consentRegion}};</script>`;
}
