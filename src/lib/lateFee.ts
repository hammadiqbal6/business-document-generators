/** Fee mode for the late fee calculator / notice generator. */
export type LateFeeMode = 'monthlyPercent' | 'flat';

export interface LateFeeInput {
  principal: number;
  /** `monthlyPercent` uses monthlyPercent; `flat` uses flatFee. */
  feeMode: LateFeeMode;
  /** Percent per month (e.g. 1.5 means 1.5%/month), prorated by chargeableDays / 30. */
  monthlyPercent?: number;
  /** Flat late fee applied once when chargeable days > 0. */
  flatFee?: number;
  daysLate: number;
  gracePeriodDays: number;
}

export interface LateFeeResult {
  chargeableDays: number;
  fee: number;
  totalDue: number;
}

function roundMoney(n: number): number {
  return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}

function nonNeg(n: unknown): number {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 0) return 0;
  return v;
}

/**
 * Late fee math used by the calculator preview and Vitest.
 *
 * chargeableDays = max(0, daysLate − gracePeriodDays)
 * monthly %: fee = principal × (monthlyPercent ÷ 100) × (chargeableDays ÷ 30)
 * flat:      fee = flatFee when chargeableDays > 0, else 0
 * totalDue = principal + fee
 *
 * Does not apply jurisdiction caps — legal limits vary by state; this tool claims none.
 */
export function calculateLateFee(input: LateFeeInput): LateFeeResult {
  const principal = nonNeg(input.principal);
  const daysLate = nonNeg(input.daysLate);
  const gracePeriodDays = nonNeg(input.gracePeriodDays);
  const chargeableDays = Math.max(0, daysLate - gracePeriodDays);

  let fee = 0;
  if (chargeableDays > 0) {
    if (input.feeMode === 'flat') {
      fee = nonNeg(input.flatFee);
    } else {
      const rate = nonNeg(input.monthlyPercent);
      fee = principal * (rate / 100) * (chargeableDays / 30);
    }
  }

  fee = roundMoney(fee);
  return {
    chargeableDays,
    fee,
    totalDue: roundMoney(principal + fee),
  };
}

export function parseLateFeeMode(raw: unknown): LateFeeMode {
  return raw === 'flat' ? 'flat' : 'monthlyPercent';
}
