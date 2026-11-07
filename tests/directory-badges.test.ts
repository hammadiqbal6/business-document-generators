import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_DIRECTORY_BADGE_HEIGHT,
  DEFAULT_DIRECTORY_BADGE_WIDTH,
  FAZIER_DIRECTORY_BADGE,
  FAZIER_DIRECTORY_BADGES_JSON,
  parseDirectoryBadgesJson,
  resolveDirectoryBadges,
} from '../src/config/directoryBadges';
import { siteConfig } from '../src/config/site';

describe('parseDirectoryBadgesJson', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('parses a valid badge array and maps img → src', () => {
    const badges = parseDirectoryBadgesJson(
      JSON.stringify([
        {
          href: 'https://example.com',
          img: 'https://example.com/badge.svg',
          alt: 'Example',
          width: 120,
          height: 40,
          rel: 'noopener',
        },
      ]),
    );
    expect(badges).toEqual([
      {
        href: 'https://example.com',
        src: 'https://example.com/badge.svg',
        alt: 'Example',
        width: 120,
        height: 40,
        rel: 'noopener',
      },
    ]);
  });

  it('applies default width/height when omitted', () => {
    const badges = parseDirectoryBadgesJson(
      JSON.stringify([
        {
          href: 'https://example.com',
          img: 'https://example.com/b.png',
          alt: 'Badge',
        },
      ]),
    );
    expect(badges[0]?.width).toBe(DEFAULT_DIRECTORY_BADGE_WIDTH);
    expect(badges[0]?.height).toBe(DEFAULT_DIRECTORY_BADGE_HEIGHT);
    expect(badges[0]?.rel).toBeUndefined();
  });

  it('returns [] and warns on invalid JSON without throwing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(parseDirectoryBadgesJson('{not-json')).toEqual([]);
    expect(warn).toHaveBeenCalled();
  });

  it('returns [] and warns when top-level value is not an array', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(parseDirectoryBadgesJson('{"href":"x"}')).toEqual([]);
    expect(warn).toHaveBeenCalled();
  });

  it('skips entries missing required fields', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const badges = parseDirectoryBadgesJson(
      JSON.stringify([
        { href: 'https://ok.example', img: 'https://ok.example/i.svg', alt: 'OK' },
        { href: '', img: 'https://x', alt: 'bad' },
        { href: 'https://x', img: 'https://x', alt: '' },
      ]),
    );
    expect(badges).toHaveLength(1);
    expect(badges[0]?.alt).toBe('OK');
    expect(warn).toHaveBeenCalled();
  });
});

describe('resolveDirectoryBadges', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('falls back to Fazier when PUBLIC_DIRECTORY_BADGES is unset', () => {
    expect(resolveDirectoryBadges({})).toEqual([FAZIER_DIRECTORY_BADGE]);
    expect(
      resolveDirectoryBadges({ directoryBadgesJson: '', fazierBadgeEnabled: 'true' }),
    ).toEqual([FAZIER_DIRECTORY_BADGE]);
  });

  it('hides Fazier when fallback flag is false', () => {
    expect(
      resolveDirectoryBadges({ fazierBadgeEnabled: 'false' }),
    ).toEqual([]);
  });

  it('uses JSON badges and ignores Fazier flag when JSON is set', () => {
    const json = JSON.stringify([
      {
        href: 'https://tinylaunch.com',
        img: 'https://tinylaunch.com/badge.svg',
        alt: 'TinyLaunch',
      },
    ]);
    expect(
      resolveDirectoryBadges({
        directoryBadgesJson: json,
        fazierBadgeEnabled: 'false',
      }),
    ).toEqual([
      {
        href: 'https://tinylaunch.com',
        src: 'https://tinylaunch.com/badge.svg',
        alt: 'TinyLaunch',
        width: DEFAULT_DIRECTORY_BADGE_WIDTH,
        height: DEFAULT_DIRECTORY_BADGE_HEIGHT,
      },
    ]);
  });

  it('FAZIER_DIRECTORY_BADGES_JSON round-trips to the legacy Fazier badge', () => {
    expect(parseDirectoryBadgesJson(FAZIER_DIRECTORY_BADGES_JSON)).toEqual([
      FAZIER_DIRECTORY_BADGE,
    ]);
  });
});

describe('siteConfig.directoryBadges (default env)', () => {
  it('includes the Fazier badge when PUBLIC_DIRECTORY_BADGES is unset in test env', () => {
    expect(siteConfig.directoryBadges).toEqual([FAZIER_DIRECTORY_BADGE]);
  });
});
