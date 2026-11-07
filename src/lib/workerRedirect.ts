/**
 * Pure redirect helpers for the Cloudflare Worker (trailing slash + legacy hosts).
 * Kept separate from the Worker entry so Vitest can cover SEO cutover behavior.
 */
import {
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  DEFAULT_SITE_URL,
  parseList,
} from '../config/siteDefaults.mjs';

/** Long enough for `.webmanifest` (11 chars) and similar asset extensions. */
export const FILE_EXT = /\.[a-zA-Z0-9]{1,16}$/;

export { DEFAULT_SITE_URL as DEFAULT_CANONICAL_ORIGIN, DEFAULT_LEGACY_REDIRECT_HOSTS };

/** First legacy host (compat for older tests / docs). */
export const LEGACY_WORKERS_DEV_HOST = DEFAULT_LEGACY_REDIRECT_HOSTS.split(',')[0].trim();

export function normalizeCanonicalOrigin(origin: string): string {
  return origin.trim().replace(/\/$/, '');
}

/** Parse comma-separated Host values from Worker `LEGACY_REDIRECT_HOSTS`. */
export function parseLegacyRedirectHosts(
  value: string | undefined | null,
  fallback: string = DEFAULT_LEGACY_REDIRECT_HOSTS,
): string[] {
  return parseList(value ?? '', fallback).map((h) => h.toLowerCase());
}

/** True when Host is in the exact legacy redirect list (not versioned previews). */
export function isLegacyRedirectHost(
  host: string,
  legacyHosts: string[] | string = DEFAULT_LEGACY_REDIRECT_HOSTS,
): boolean {
  const list = Array.isArray(legacyHosts)
    ? legacyHosts.map((h) => h.toLowerCase())
    : parseLegacyRedirectHosts(legacyHosts);
  return list.includes(host.toLowerCase());
}

/** @deprecated use isLegacyRedirectHost */
export function isLegacyWorkersDevHost(
  host: string,
  legacyHost: string = LEGACY_WORKERS_DEV_HOST,
): boolean {
  return isLegacyRedirectHost(host, legacyHost);
}

/**
 * Match Worker trailing-slash policy: add `/` for directory-like paths without
 * a file extension. Root `/` and asset paths are left unchanged.
 */
export function withTrailingSlashPath(pathname: string): string {
  if (pathname.length > 1 && !pathname.endsWith('/') && !FILE_EXT.test(pathname)) {
    return `${pathname}/`;
  }
  return pathname;
}

export function needsTrailingSlashRedirect(pathname: string): boolean {
  return withTrailingSlashPath(pathname) !== pathname;
}

/**
 * If the request Host is in the legacy redirect list, return the single-hop 301
 * Location on the canonical origin (path + query preserved, trailing slash
 * applied in the same hop). Otherwise null.
 */
export function legacyHostRedirectLocation(
  requestUrl: string,
  canonicalOrigin: string = DEFAULT_SITE_URL,
  legacyHosts: string[] | string = DEFAULT_LEGACY_REDIRECT_HOSTS,
): string | null {
  const url = new URL(requestUrl);
  if (!isLegacyRedirectHost(url.host, legacyHosts)) return null;
  const origin = normalizeCanonicalOrigin(canonicalOrigin || DEFAULT_SITE_URL);
  const path = withTrailingSlashPath(url.pathname);
  return `${origin}${path}${url.search}`;
}
