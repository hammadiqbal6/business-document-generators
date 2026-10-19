import type { FieldDef, LineItem } from '../data/tools/types';

export interface ValidationError {
  fieldId: string;
  message: string;
}

export function validateForm(
  fields: FieldDef[],
  values: Record<string, unknown>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of fields) {
    const raw = values[field.id];

    if (field.required) {
      if (field.type === 'lineItems') {
        const items = (raw as LineItem[]) || [];
        if (!items.length || items.every((i) => !i.description?.trim())) {
          errors.push({ fieldId: field.id, message: `${field.label} needs at least one item.` });
        }
        continue;
      }
      if (field.type === 'clauses') continue;
      if (field.type === 'checkbox') continue;
      if (raw === undefined || raw === null || String(raw).trim() === '') {
        errors.push({ fieldId: field.id, message: `${field.label} is required.` });
      }
    }

    if (field.type === 'email' && raw && String(raw).trim()) {
      const email = String(raw).trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ fieldId: field.id, message: 'Enter a valid email address.' });
      }
    }

    if ((field.type === 'number' || field.type === 'currency') && raw !== '' && raw != null) {
      const n = Number(raw);
      if (!Number.isFinite(n)) {
        errors.push({ fieldId: field.id, message: `${field.label} must be a number.` });
      } else {
        if (field.min != null && n < field.min) {
          errors.push({ fieldId: field.id, message: `${field.label} must be at least ${field.min}.` });
        }
        if (field.max != null && n > field.max) {
          errors.push({ fieldId: field.id, message: `${field.label} must be at most ${field.max}.` });
        }
      }
    }
  }

  return errors;
}
