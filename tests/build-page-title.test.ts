import { describe, expect, it } from 'vitest';
import { buildPageTitle } from '../src/lib/seo';

describe('buildPageTitle', () => {
  it('appends the short brand without truncating typical titles', () => {
    const title = buildPageTitle('How to Write a Construction Estimate');
    expect(title).toBe('How to Write a Construction Estimate | Docuklin');
    expect(title).not.toContain('…');
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it('keeps tattoo consent title under 60 chars without ellipsis', () => {
    const title = buildPageTitle('Tattoo Consent Form: Studio Checklist');
    expect(title).not.toContain('…');
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title.endsWith('| Docuklin')).toBe(true);
  });

  it('does not double-brand titles that already include the site name', () => {
    const title = buildPageTitle('Contact Docuklin – Email and Corrections');
    expect(title).toBe('Contact Docuklin – Email and Corrections');
  });
});
