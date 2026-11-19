/** Calendar-day difference (UTC-safe from YYYY-MM-DD parts). */
export function calendarDaysBetween(fromIso: string, toIso: string): number {
  const [fy, fm, fd] = fromIso.split('-').map(Number);
  const [ty, tm, td] = toIso.split('-').map(Number);
  if (![fy, fm, fd, ty, tm, td].every((n) => Number.isFinite(n))) return 0;
  const from = Date.UTC(fy, fm - 1, fd);
  const to = Date.UTC(ty, tm - 1, td);
  return Math.round((to - from) / 86_400_000);
}

export type LateFeeRatePeriod = 'monthly' | 'annual';

export interface LateFeeInput {
  invoiceAmount: number;
  dueDate: string;
  paymentDate: string;
  gracePeriodDays: number;
  flatFee: number;
  interestRate: number;
  ratePeriod: LateFeeRatePeriod;
}

export interface LateFeeResult {
  daysLate: number;
  chargeableDays: number;
  withinGrace: boolean;
  flatFeeApplied: number;
  interestAmount: number;
  lateFeeTotal: number;
  totalDue: number;
  ratePeriod: LateFeeRatePeriod;
  interestRate: number;
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Simple-interest late fee on an overdue invoice balance.
 * Flat fee (if any) applies once when chargeable days > 0.
 * Monthly rate uses day/30; annual uses day/365.
 */
export function calculateLateFee(input: LateFeeInput): LateFeeResult {
  const amount = Math.max(0, Number(input.invoiceAmount) || 0);
  const grace = Math.max(0, Math.floor(Number(input.gracePeriodDays) || 0));
  const flat = Math.max(0, Number(input.flatFee) || 0);
  const rate = Math.max(0, Number(input.interestRate) || 0);
  const period: LateFeeRatePeriod = input.ratePeriod === 'annual' ? 'annual' : 'monthly';

  const daysLate = calendarDaysBetween(input.dueDate, input.paymentDate);
  const chargeableDays = Math.max(0, daysLate - grace);
  const withinGrace = daysLate > 0 && chargeableDays === 0;

  if (chargeableDays <= 0 || amount <= 0) {
    return {
      daysLate: Math.max(0, daysLate),
      chargeableDays: 0,
      withinGrace,
      flatFeeApplied: 0,
      interestAmount: 0,
      lateFeeTotal: 0,
      totalDue: roundMoney(amount),
      ratePeriod: period,
      interestRate: rate,
    };
  }

  const dayFactor = period === 'annual' ? chargeableDays / 365 : chargeableDays / 30;
  const interestAmount = roundMoney(amount * (rate / 100) * dayFactor);
  const flatFeeApplied = flat > 0 ? roundMoney(flat) : 0;
  const lateFeeTotal = roundMoney(flatFeeApplied + interestAmount);

  return {
    daysLate,
    chargeableDays,
    withinGrace: false,
    flatFeeApplied,
    interestAmount,
    lateFeeTotal,
    totalDue: roundMoney(amount + lateFeeTotal),
    ratePeriod: period,
    interestRate: rate,
  };
}

export function buildLateFeeReminder(args: {
  companyName: string;
  clientName: string;
  invoiceNumber: string;
  invoiceAmount: number;
  dueDate: string;
  paymentDate: string;
  result: LateFeeResult;
  paymentInstructions?: string;
}): string {
  const money = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const client = args.clientName.trim() || 'there';
  const inv = args.invoiceNumber.trim() || 'your invoice';
  const company = args.companyName.trim() || 'our office';
  const r = args.result;

  const statusLine =
    r.daysLate <= 0
      ? `As of ${args.paymentDate}, ${inv} is not past due.`
      : r.withinGrace
        ? `As of ${args.paymentDate}, ${inv} is ${r.daysLate} day${r.daysLate === 1 ? '' : 's'} past the due date and still inside the grace period, so no late fee is calculated yet.`
        : `As of ${args.paymentDate}, ${inv} is ${r.daysLate} day${r.daysLate === 1 ? '' : 's'} past due (${r.chargeableDays} chargeable after grace).`;

  const feeLine =
    r.lateFeeTotal > 0
      ? `Late charges come to ${money(r.lateFeeTotal)}` +
        (r.flatFeeApplied > 0 && r.interestAmount > 0
          ? ` (flat ${money(r.flatFeeApplied)} + simple interest ${money(r.interestAmount)})`
          : r.flatFeeApplied > 0
            ? ` (flat fee)`
            : ` (simple interest)`) +
        `. Total now due: ${money(r.totalDue)}.`
      : `Balance due remains ${money(r.totalDue)}.`;

  const pay = args.paymentInstructions?.trim()
    ? `\n\nPayment: ${args.paymentInstructions.trim()}`
    : '\n\nPlease pay using the instructions on the original invoice, or reply if the amount looks wrong.';

  return [
    `Subject: Past-due notice — ${inv}`,
    '',
    `Hi ${client},`,
    '',
    `${inv} for ${money(args.invoiceAmount)} was due ${args.dueDate}. ${statusLine}`,
    '',
    feeLine,
    pay,
    '',
    'Thanks,',
    company,
  ].join('\n');
}
