import { describe, expect, it } from 'vitest';
import { buildAdsTxt } from '../src/lib/adsTxt';

describe('buildAdsTxt', () => {
  it('emits a comment placeholder when publisher id is empty', () => {
    const body = buildAdsTxt('');
    expect(body).toContain('intentionally omitted');
    expect(body).not.toMatch(/^google\.com,/m);
  });

  it('normalizes ca-pub-… to the ads.txt pub-… line', () => {
    expect(buildAdsTxt('ca-pub-1234567890123456')).toBe(
      'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n',
    );
  });

  it('accepts pub-… ids unchanged', () => {
    expect(buildAdsTxt('pub-999')).toBe('google.com, pub-999, DIRECT, f08c47fec0942fa0\n');
  });
});
