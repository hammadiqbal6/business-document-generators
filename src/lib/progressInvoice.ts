/**
 * Progress / schedule-of-values invoice math.
 *
 * Per SOV line:
 *   earnedToDate = scheduledValue × (percentComplete ÷ 100)
 *
 * Document totals:
 *   contractSum = Σ scheduledValue
 *   earnedToDate = Σ line earnedToDate
 *   thisPeriodGross = max(0, earnedToDate − previouslyBilled)
 *   retainageThisPeriod = thisPeriodGross × (retainagePercent ÷ 100)
 *   amountDueBeforeTax = thisPeriodGross − retainageThisPeriod
 *   tax = amountDueBeforeTax × (taxRate ÷ 100)
 *   amountDueThisPeriod = amountDueBeforeTax + tax
 */

export interface ProgressSovLine {
  description: string;
  /** Contract / schedule value for the line */
  scheduledValue: number;
  /** 0–100 */
  percentComplete: number;
  unit?: string;
}

export interface ProgressInvoiceInput {
  lines: ProgressSovLine[];
  previouslyBilled: number;
  retainagePercent: number;
  taxRate?: number;
}

export interface ProgressInvoiceTotals {
  contractSum: number;
  earnedToDate: number;
  thisPeriodGross: number;
  retainageThisPeriod: number;
  amountDueBeforeTax: number;
  tax: number;
  amountDueThisPeriod: number;
  lineRows: {
    description: string;
    scheduledValue: number;
    percentComplete: number;
    unit: string;
    earnedToDate: number;
  }[];
}

function roundMoney(n: number): number {
  return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}

/** Earned to date for one SOV line. */
export function progressLineEarned(scheduledValue: number, percentComplete: number): number {
  const sv = Number(scheduledValue) || 0;
  const pct = Number(percentComplete) || 0;
  return roundMoney(sv * (pct / 100));
}

/** Full progress-invoice totals from SOV lines + prior billing + retainage. */
export function computeProgressInvoiceTotals(input: ProgressInvoiceInput): ProgressInvoiceTotals {
  const lineRows = (input.lines || []).map((line) => {
    const scheduledValue = Number(line.scheduledValue) || 0;
    const percentComplete = Number(line.percentComplete) || 0;
    const earnedToDate = progressLineEarned(scheduledValue, percentComplete);
    return {
      description: line.description || '—',
      scheduledValue,
      percentComplete,
      unit: line.unit || '%',
      earnedToDate,
    };
  });

  const contractSum = roundMoney(lineRows.reduce((s, r) => s + r.scheduledValue, 0));
  const earnedToDate = roundMoney(lineRows.reduce((s, r) => s + r.earnedToDate, 0));
  const previouslyBilled = Math.max(0, Number(input.previouslyBilled) || 0);
  const thisPeriodGross = roundMoney(Math.max(0, earnedToDate - previouslyBilled));
  const retainagePercent = Math.max(0, Number(input.retainagePercent) || 0);
  const retainageThisPeriod = roundMoney(thisPeriodGross * (retainagePercent / 100));
  const amountDueBeforeTax = roundMoney(thisPeriodGross - retainageThisPeriod);
  const taxRate = Math.max(0, Number(input.taxRate) || 0);
  const tax = roundMoney(amountDueBeforeTax * (taxRate / 100));
  const amountDueThisPeriod = roundMoney(amountDueBeforeTax + tax);

  return {
    contractSum,
    earnedToDate,
    thisPeriodGross,
    retainageThisPeriod,
    amountDueBeforeTax,
    tax,
    amountDueThisPeriod,
    lineRows,
  };
}
