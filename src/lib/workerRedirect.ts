/**
 * Pure redirect helpers for the Cloudflare Worker (trailing slash + legacy host).
 * Kept separate from the Worker entry so Vitest can cover SEO cutover behavior.
 */
import {
  DEFAULT_SITE_URL,
  LEGACY_WORKERS_DEV_HOST,
} from '../config/siteDefaults.mjs';

/** Long enough for `.webmanifest` (11 chars) and similar asset extensions. */
export const FILE_EXT = /\.[a-zA-Z0-9]{1,16}$/;

export { DEFAULT_SITE_URL as DEFAULT_CANONICAL_ORIGIN, LEGACY_WORKERS_DEV_HOST };

export function normalizeCanonicalOrigin(origin: string): string {
  return origin.trim().replace(/\/$/, '');
}

/** True only for the exact legacy production workers.dev host (not previews). */
export function isLegacyWorkersDevHost(
  host: string,
  legacyHost: string = LEGACY_WORKERS_DEV_HOST,
): boolean {
  return host.toLowerCase() === legacyHost.toLowerCase();
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
 * If the request Host is the legacy workers.dev production hostname, return the
 * single-hop 301 Location on the canonical origin (path + query preserved,
 * trailing slash applied in the same hop). Otherwise null.
 */
export function legacyHostRedirectLocation(
  requestUrl: string,
  canonicalOrigin: string = DEFAULT_SITE_URL,
  legacyHost: string = LEGACY_WORKERS_DEV_HOST,
): string | null {
  const url = new URL(requestUrl);
  if (!isLegacyWorkersDevHost(url.host, legacyHost)) return null;
  const origin = normalizeCanonicalOrigin(canonicalOrigin || DEFAULT_SITE_URL);
  const path = withTrailingSlashPath(url.pathname);
  return `${origin}${path}${url.search}`;
}
