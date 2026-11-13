import type { FieldDef } from '../data/tools/types';

/** Local calendar date as YYYY-MM-DD (editor “today”). */
export function localTodayIso(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysIso(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return localTodayIso(dt);
}

/** Dates that should stay as sample identity/history, not “today”. */
const PRESERVE_DATE_IDS = new Set(['clientDob', 'originalContractDate']);

/**
 * Shift sample document dates to today when opening the editor so demos are not stuck on a hard-coded day.
 * Validity / due / schedule fields stay relative offsets from today.
 */
export function withTodayDateDefaults(
  fields: FieldDef[],
  defaults: Record<string, unknown>,
  now = new Date(),
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...defaults };
  const today = localTodayIso(now);
  const dateIds = new Set(fields.filter((f) => f.type === 'date').map((f) => f.id));

  for (const id of dateIds) {
    if (PRESERVE_DATE_IDS.has(id)) continue;
    if (id === 'validUntil') {
      out[id] = addDaysIso(today, 14);
      continue;
    }
    if (id === 'dueDate') {
      out[id] = addDaysIso(today, 14);
      continue;
    }
    if (id === 'scheduledDate') {
      out[id] = addDaysIso(today, 2);
      continue;
    }
    if (id === 'neededBy') {
      out[id] = addDaysIso(today, 7);
      continue;
    }
    if (id === 'periodStart') {
      out[id] = addDaysIso(today, -4);
      continue;
    }
    if (id === 'periodEnd') {
      out[id] = today;
      continue;
    }
    // Primary document / event dates → today
    out[id] = today;
  }

  return out;
}
