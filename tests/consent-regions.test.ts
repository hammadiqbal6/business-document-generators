import { describe, expect, it } from 'vitest';
import {
  CONSENT_MODE_REGIONS,
  geoBootstrapScript,
  isConsentRegion,
} from '../src/lib/consentRegions';
import { injectGeoIntoHtml, isHtmlContentType } from '../src/lib/workerHtml';

describe('consent regions (EEA/UK/CH)', () => {
  it('includes GB and CH and excludes US', () => {
    expect(CONSENT_MODE_REGIONS).toContain('GB');
    expect(CONSENT_MODE_REGIONS).toContain('CH');
    expect(CONSENT_MODE_REGIONS).toContain('DE');
    expect(CONSENT_MODE_REGIONS).toContain('NO');
    expect(isConsentRegion('DE')).toBe(true);
    expect(isConsentRegion('gb')).toBe(true);
    expect(isConsentRegion('CH')).toBe(true);
    expect(isConsentRegion('US')).toBe(false);
    expect(isConsentRegion('XX')).toBe(false);
    expect(isConsentRegion('')).toBe(false);
    expect(isConsentRegion(null)).toBe(false);
  });

  it('does not treat UK as a Cloudflare country code (use GB)', () => {
    expect(isConsentRegion('UK')).toBe(false);
    expect(isConsentRegion('GB')).toBe(true);
  });

  it('builds a safe geo bootstrap script', () => {
    const s = geoBootstrapScript('de');
    expect(s).toContain('window.__docuklinGeo=');
    expect(s).toContain('"DE"');
    expect(s).toContain('consentRegion:true');
    expect(geoBootstrapScript('US')).toContain('consentRegion:false');
  });
});

describe('worker HTML geo injection', () => {
  it('detects HTML content types', () => {
    expect(isHtmlContentType('text/html; charset=utf-8')).toBe(true);
    expect(isHtmlContentType('application/json')).toBe(false);
    expect(isHtmlContentType(null)).toBe(false);
  });

  it('injects bootstrap after <head>', () => {
    const out = injectGeoIntoHtml(
      '<!doctype html><html><head><title>x</title></head><body></body></html>',
      'FR',
    );
    expect(out).toMatch(/<head><script>window\.__docuklinGeo=\{country:"FR",consentRegion:true\}/);
    expect(out).toContain('<title>x</title>');
  });

  it('is idempotent if bootstrap already present', () => {
    const once = injectGeoIntoHtml('<html><head></head></html>', 'IE');
    const twice = injectGeoIntoHtml(once, 'US');
    expect(twice).toBe(once);
  });
});
