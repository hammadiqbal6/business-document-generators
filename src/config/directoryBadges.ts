/**
 * Footer directory / launch-board badges.
 * Prefer PUBLIC_DIRECTORY_BADGES (JSON array). When unset, fall back to the
 * Fazier badge gated by PUBLIC_FAZIER_BADGE_ENABLED.
 *
 * Do not use Astro-reserved names like `slot` on badge objects or component props.
 */

export const DEFAULT_DIRECTORY_BADGE_WIDTH = 182;
export const DEFAULT_DIRECTORY_BADGE_HEIGHT = 43;

export type DirectoryBadgeConfig = {
  href: string;
  /** Image URL (mapped from JSON `img`). */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional link rel (e.g. "noopener"). Omitted → no rel attribute (followable). */
  rel?: string;
};

/** Current Fazier “Featured on” embed — keep in sync with legacy fallback. */
export const FAZIER_DIRECTORY_BADGE: DirectoryBadgeConfig = {
  href: 'https://fazier.com',
  src: 'https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=featured&theme=light',
  alt: 'Featured on Fazier',
  width: DEFAULT_DIRECTORY_BADGE_WIDTH,
  height: DEFAULT_DIRECTORY_BADGE_HEIGHT,
};

/**
 * JSON value equivalent to the legacy Fazier-only footer badge.
 * Set as PUBLIC_DIRECTORY_BADGES in Cloudflare / Workers Builds to migrate off
 * PUBLIC_FAZIER_BADGE_ENABLED while keeping the same render.
 */
export const FAZIER_DIRECTORY_BADGES_JSON = JSON.stringify([
  {
    href: FAZIER_DIRECTORY_BADGE.href,
    img: FAZIER_DIRECTORY_BADGE.src,
    alt: FAZIER_DIRECTORY_BADGE.alt,
    width: FAZIER_DIRECTORY_BADGE.width,
    height: FAZIER_DIRECTORY_BADGE.height,
  },
]);

function positiveInt(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.round(value);
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  return fallback;
}

/**
 * Parse PUBLIC_DIRECTORY_BADGES JSON.
 * Invalid JSON / non-array → warn and return [] (do not fall back to Fazier).
 * Malformed entries are skipped with a warning.
 */
export function parseDirectoryBadgesJson(raw: string): DirectoryBadgeConfig[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[directoryBadges] PUBLIC_DIRECTORY_BADGES is invalid JSON (${message}); rendering no badges.`,
    );
    return [];
  }

  if (!Array.isArray(parsed)) {
    console.warn(
      '[directoryBadges] PUBLIC_DIRECTORY_BADGES must be a JSON array; rendering no badges.',
    );
    return [];
  }

  const badges: DirectoryBadgeConfig[] = [];
  parsed.forEach((entry, index) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      console.warn(`[directoryBadges] Skipping badge[${index}]: expected an object.`);
      return;
    }
    const record = entry as Record<string, unknown>;
    const href = typeof record.href === 'string' ? record.href.trim() : '';
    const img = typeof record.img === 'string' ? record.img.trim() : '';
    const alt = typeof record.alt === 'string' ? record.alt.trim() : '';
    if (!href || !img || !alt) {
      console.warn(
        `[directoryBadges] Skipping badge[${index}]: href, img, and alt are required non-empty strings.`,
      );
      return;
    }

    const badge: DirectoryBadgeConfig = {
      href,
      src: img,
      alt,
      width: positiveInt(record.width, DEFAULT_DIRECTORY_BADGE_WIDTH),
      height: positiveInt(record.height, DEFAULT_DIRECTORY_BADGE_HEIGHT),
    };

    if (typeof record.rel === 'string' && record.rel.trim() !== '') {
      badge.rel = record.rel.trim();
    }

    badges.push(badge);
  });

  return badges;
}

/**
 * Resolve footer badges from env-style strings.
 * - PUBLIC_DIRECTORY_BADGES set (non-empty) → parse JSON (invalid → []).
 * - Unset/blank → Fazier badge when PUBLIC_FAZIER_BADGE_ENABLED is not `false`.
 */
export function resolveDirectoryBadges(options: {
  directoryBadgesJson?: string | undefined;
  fazierBadgeEnabled?: string | undefined;
}): DirectoryBadgeConfig[] {
  const raw = options.directoryBadgesJson;
  if (raw != null && String(raw).trim() !== '') {
    return parseDirectoryBadgesJson(String(raw).trim());
  }

  if ((options.fazierBadgeEnabled || 'true') === 'true') {
    return [{ ...FAZIER_DIRECTORY_BADGE }];
  }
  return [];
}
