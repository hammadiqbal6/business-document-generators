import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackEvent } from '../src/lib/analytics';

describe('trackEvent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    // @ts-expect-error cleanup test globals
    delete globalThis.window;
  });

  it('calls gtag when present', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag, dataLayer: [] });
    trackEvent('tool_opened', { tool_slug: 'quote-estimate-generator', embed: '0' });
    expect(gtag).toHaveBeenCalledWith('event', 'tool_opened', {
      tool_slug: 'quote-estimate-generator',
      embed: '0',
    });
  });

  it('queues onto dataLayer when gtag is not ready yet', () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', { dataLayer });
    trackEvent('tool_opened', { tool_slug: 'videography-contract' });
    expect(dataLayer).toEqual([
      ['event', 'tool_opened', { tool_slug: 'videography-contract' }],
    ]);
  });

  it('creates dataLayer when missing and gtag is absent', () => {
    const win: { dataLayer?: unknown[]; gtag?: undefined } = {};
    vi.stubGlobal('window', win);
    trackEvent('tool_export_pdf', { tool_slug: 'contractor-invoice' });
    expect(win.dataLayer).toEqual([
      ['event', 'tool_export_pdf', { tool_slug: 'contractor-invoice' }],
    ]);
  });
});
