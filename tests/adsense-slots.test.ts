import { describe, expect, it } from 'vitest';
import {
  isNumericAdUnitId,
  resolveAdUnitId,
  type AdsenseSlotConfig,
} from '../src/lib/adsenseSlots';

const empty: AdsenseSlotConfig = { display: '', home: '', tool: '' };

describe('isNumericAdUnitId', () => {
  it('accepts AdSense-style numeric unit ids', () => {
    expect(isNumericAdUnitId('1234567890')).toBe(true);
    expect(isNumericAdUnitId(' 9876543210 ')).toBe(true);
  });

  it('rejects placement labels and empty values', () => {
    expect(isNumericAdUnitId('')).toBe(false);
    expect(isNumericAdUnitId(undefined)).toBe(false);
    expect(isNumericAdUnitId('home-top')).toBe(false);
    expect(isNumericAdUnitId('tool-mid')).toBe(false);
    expect(isNumericAdUnitId('ca-pub-123')).toBe(false);
  });
});

describe('resolveAdUnitId', () => {
  it('returns empty when no numeric ids are configured', () => {
    expect(resolveAdUnitId('home-top', empty)).toBe('');
    expect(resolveAdUnitId('tool-mid', empty)).toBe('');
  });

  it('uses PUBLIC_ADSENSE_SLOT_DISPLAY for every placement', () => {
    const slots: AdsenseSlotConfig = {
      display: '1111111111',
      home: '',
      tool: '',
    };
    expect(resolveAdUnitId('home-top', slots)).toBe('1111111111');
    expect(resolveAdUnitId('tool-mid', slots)).toBe('1111111111');
  });

  it('prefers per-placement overrides when numeric', () => {
    const slots: AdsenseSlotConfig = {
      display: '1111111111',
      home: '2222222222',
      tool: '3333333333',
    };
    expect(resolveAdUnitId('home-top', slots)).toBe('2222222222');
    expect(resolveAdUnitId('tool-mid', slots)).toBe('3333333333');
  });

  it('ignores non-numeric overrides and falls back to display', () => {
    const slots: AdsenseSlotConfig = {
      display: '1111111111',
      home: 'home-top',
      tool: 'not-a-number',
    };
    expect(resolveAdUnitId('home-top', slots)).toBe('1111111111');
    expect(resolveAdUnitId('tool-mid', slots)).toBe('1111111111');
  });
});

