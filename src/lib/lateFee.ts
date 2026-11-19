import { formatMoney } from './money';

export type LateFeeType = 'flat' | 'monthly_percent' | 'annual_daily';

export interface LateFeeInput {
  invoiceAmount: number;
  dueDate: string;
  paymentDate: string;
  gracePeriodDays?: number;
  feeType: LateFeeType;
  flatFeeAmount?: number;
  monthlyPercent?: number;
  annualPercent?: number;
}

export interface LateFeeResult {
  daysPastDue: number;
  gracePeriodDays: number;
  chargeableDays: number;
  fee: number;
  newTotal: number;
  feeType: LateFeeType;
  feeMethodLabel: string;
  isLate: boolean;
}

/** Parse YYYY-MM-DD as a local calendar date (avoids UTC shift). */
export function parseLocalIsoDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return dt;
}

/** Whole calendar days from start → end (can be negative if end is before start). */
export function calendarDaysBetween(startIso: string, endIso: string): number | null {
  const a = parseLocalIsoDate(startIso);
  const b = parseLocalIsoDate(endIso);
  if (!a || !b) return null;
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86_400_000);
}

function roundCents(n: number): number {
  return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}

export function feeTypeLabel(feeType: LateFeeType): string {
  switch (feeType) {
    case 'flat':
      return 'Flat fee after grace';
    case 'monthly_percent':
      return '% per month (prorated by 30-day months)';
    case 'annual_daily':
      return 'Annual rate ÷ 365 × chargeable days';
    default:
      return 'Late fee';
  }
}

/**
 * Compute invoice late fee.
 * Days late = calendar days from due date to payment date.
 * Chargeable days = max(0, days late − grace).
 * Flat: one fee when any chargeable day exists.
 * Monthly %: invoice × (rate/100) × (chargeableDays / 30).
 * Annual daily: invoice × (annual%/100/365) × chargeableDays.
 */
export function calculateLateFee(input: LateFeeInput): LateFeeResult {
  const invoiceAmount = Math.max(0, Number(input.invoiceAmount) || 0);
  const gracePeriodDays = Math.max(0, Math.floor(Number(input.gracePeriodDays) || 0));
  const feeType: LateFeeType =
    input.feeType === 'flat' || input.feeType === 'monthly_percent' || input.feeType === 'annual_daily'
      ? input.feeType
      : 'flat';

  const rawDays = calendarDaysBetween(input.dueDate, input.paymentDate);
  const daysPastDue = rawDays == null ? 0 : Math.max(0, rawDays);
  const chargeableDays = Math.max(0, daysPastDue - gracePeriodDays);
  const isLate = chargeableDays > 0;

  let fee = 0;
  if (isLate) {
    if (feeType === 'flat') {
      fee = Math.max(0, Number(input.flatFeeAmount) || 0);
    } else if (feeType === 'monthly_percent') {
      const pct = Math.max(0, Number(input.monthlyPercent) || 0);
      fee = invoiceAmount * (pct / 100) * (chargeableDays / 30);
    } else {
      const pct = Math.max(0, Number(input.annualPercent) || 0);
      fee = invoiceAmount * (pct / 100 / 365) * chargeableDays;
    }
  }

  fee = roundCents(fee);
  const newTotal = roundCents(invoiceAmount + fee);

  return {
    daysPastDue,
    gracePeriodDays,
    chargeableDays,
    fee,
    newTotal,
    feeType,
    feeMethodLabel: feeTypeLabel(feeType),
    isLate,
  };
}

export interface LateFeeWordingContext {
  companyName?: string;
  clientName?: string;
  invoiceNumber?: string;
  invoiceAmount: number;
  dueDate: string;
  paymentDate: string;
  result: LateFeeResult;
}

/** One-line late-fee charge suitable for an invoice notes field. */
export function buildLateFeeLine(ctx: LateFeeWordingContext): string {
  const { result } = ctx;
  if (!result.isLate) {
    return 'No late fee: payment is within the due date and grace period.';
  }
  const graceNote =
    result.gracePeriodDays > 0 ? ` after ${result.gracePeriodDays}-day grace` : '';
  return `Late payment fee: ${formatMoney(result.fee)} (${result.chargeableDays} chargeable day${
    result.chargeableDays === 1 ? '' : 's'
  } past due${graceNote}; ${result.feeMethodLabel}). Balance due including fee: ${formatMoney(result.newTotal)}.`;
}

/** Short reminder the user can paste into email or a follow-up note. */
export function buildLateFeeReminder(ctx: LateFeeWordingContext): string {
  const who = ctx.clientName?.trim() ? ctx.clientName.trim() : 'the client';
  const from = ctx.companyName?.trim() ? ctx.companyName.trim() : 'our office';
  const inv = ctx.invoiceNumber?.trim() ? `Invoice ${ctx.invoiceNumber.trim()}` : 'Your invoice';
  const amount = formatMoney(ctx.invoiceAmount);
  const datesOk = Boolean(parseLocalIsoDate(ctx.dueDate) && parseLocalIsoDate(ctx.paymentDate));

  if (!datesOk) {
    return `${inv} for ${amount}: enter a valid due date and payment date (YYYY-MM-DD), then recalculate.`;
  }

  const { result } = ctx;
  if (!result.isLate) {
    const grace =
      result.gracePeriodDays > 0
        ? ` (grace: ${result.gracePeriodDays} day${result.gracePeriodDays === 1 ? '' : 's'})`
        : '';
    return `${inv} for ${amount} was due ${ctx.dueDate}. As of ${ctx.paymentDate} no late fee applies yet${grace}. — ${from}`;
  }

  return `${inv} for ${amount} was due ${ctx.dueDate}. As of ${ctx.paymentDate}, ${who} is ${result.daysPastDue} day${
    result.daysPastDue === 1 ? '' : 's'
  } past due (${result.chargeableDays} chargeable after grace). Per the agreed ${result.feeMethodLabel.toLowerCase()}, the late fee is ${formatMoney(
    result.fee,
  )}. New total due: ${formatMoney(result.newTotal)}. Please remit promptly. — ${from}`;
}
