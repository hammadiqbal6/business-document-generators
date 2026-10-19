import { describe, expect, it } from 'vitest';
import { constructionEstimate } from '../src/data/tools/estimates';
import { validateForm } from '../src/lib/validation';

describe('validateForm', () => {
  it('requires company and client on construction estimate', () => {
    const errors = validateForm(constructionEstimate.fields, {
      ...constructionEstimate.defaults,
      companyName: '',
      clientName: '',
    });
    expect(errors.some((e) => e.fieldId === 'companyName')).toBe(true);
    expect(errors.some((e) => e.fieldId === 'clientName')).toBe(true);
  });

  it('passes with full defaults', () => {
    const errors = validateForm(constructionEstimate.fields, constructionEstimate.defaults);
    expect(errors).toHaveLength(0);
  });

  it('rejects invalid email', () => {
    const errors = validateForm(constructionEstimate.fields, {
      ...constructionEstimate.defaults,
      companyEmail: 'not-an-email',
    });
    expect(errors.some((e) => e.fieldId === 'companyEmail')).toBe(true);
  });
});
