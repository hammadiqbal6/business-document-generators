import { describe, expect, it } from 'vitest';
import {
  DEFAULT_CANONICAL_ORIGIN,
  DEFAULT_LEGACY_REDIRECT_HOSTS,
  LEGACY_WORKERS_DEV_HOST,
  isLegacyRedirectHost,
  legacyHostRedirectLocation,
  needsTrailingSlashRedirect,
  parseLegacyRedirectHosts,
  withTrailingSlashPath,
} from '../src/lib/workerRedirect';

describe('legacy host → canonical 301', () => {
  it('redirects the exact legacy host to docuklin.com with path and query', () => {
    const location = legacyHostRedirectLocation(
      `https://${LEGACY_WORKERS_DEV_HOST}/tools/invoice/?a=1`,
    );
    expect(location).toBe('https://docuklin.com/tools/invoice/?a=1');
  });

  it('applies trailing slash in the same hop (no 308-then-301 chain)', () => {
    const location = legacyHostRedirectLocation(
      `https://${LEGACY_WORKERS_DEV_HOST}/tools/invoice?a=1`,
    );
    expect(location).toBe('https://docuklin.com/tools/invoice/?a=1');
  });

  it('preserves root path and query on the legacy host', () => {
    expect(legacyHostRedirectLocation(`https://${LEGACY_WORKERS_DEV_HOST}/?utm=1`)).toBe(
      'https://docuklin.com/?utm=1',
    );
  });

  it('does not redirect the canonical host', () => {
    expect(
      legacyHostRedirectLocation('https://docuklin.com/tools/invoice/?a=1'),
    ).toBeNull();
    expect(legacyHostRedirectLocation('https://docuklin.com/tools/invoice')).toBeNull();
  });

  it('does not redirect versioned Workers preview hosts', () => {
    const preview = `https://abc123-${LEGACY_WORKERS_DEV_HOST}/tools/`;
    expect(legacyHostRedirectLocation(preview)).toBeNull();
    expect(isLegacyRedirectHost(`abc123-${LEGACY_WORKERS_DEV_HOST}`)).toBe(false);
  });

  it('does not redirect localhost', () => {
    expect(legacyHostRedirectLocation('http://localhost:4321/tools/')).toBeNull();
    expect(legacyHostRedirectLocation('http://127.0.0.1:8787/tools/invoice')).toBeNull();
  });

  it('uses CANONICAL_ORIGIN override when provided', () => {
    const location = legacyHostRedirectLocation(
      `https://${LEGACY_WORKERS_DEV_HOST}/guides/`,
      'https://example.test/',
    );
    expect(location).toBe('https://example.test/guides/');
  });

  it('accepts a configurable comma-separated legacy host list', () => {
    const hosts = parseLegacyRedirectHosts(
      'old.example, business-document-generators.hammadiqbal117.workers.dev',
    );
    expect(hosts).toEqual([
      'old.example',
      'business-document-generators.hammadiqbal117.workers.dev',
    ]);
    expect(
      legacyHostRedirectLocation('https://old.example/tools/?x=1', undefined, hosts),
    ).toBe('https://docuklin.com/tools/?x=1');
  });

  it('defaults canonical origin and legacy list to Docuklin cutover values', () => {
    expect(DEFAULT_CANONICAL_ORIGIN).toBe('https://docuklin.com');
    expect(DEFAULT_LEGACY_REDIRECT_HOSTS).toContain(
      'business-document-generators.hammadiqbal117.workers.dev',
    );
  });
});

describe('trailing-slash helpers (canonical host behavior)', () => {
  it('adds a slash for directory-like paths', () => {
    expect(withTrailingSlashPath('/tools/invoice')).toBe('/tools/invoice/');
    expect(needsTrailingSlashRedirect('/tools/invoice')).toBe(true);
  });

  it('leaves already-slashed paths and file assets alone', () => {
    expect(withTrailingSlashPath('/tools/invoice/')).toBe('/tools/invoice/');
    expect(withTrailingSlashPath('/site.webmanifest')).toBe('/site.webmanifest');
    expect(withTrailingSlashPath('/og/home.svg')).toBe('/og/home.svg');
    expect(withTrailingSlashPath('/')).toBe('/');
    expect(needsTrailingSlashRedirect('/site.webmanifest')).toBe(false);
  });
});
