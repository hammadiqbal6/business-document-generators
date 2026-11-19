import { addDaysIso, localTodayIso } from './todayDefaults';

/** localStorage key for one-shot estimate → invoice handoff (cleared on consume). */
export const INVOICE_HANDOFF_KEY = 'docuforge:handoff:contractor-invoice';

export const INVOICE_TOOL_SLUG = 'contractor-invoice';
export const ESTIMATE_TOOL_SLUG = 'quote-estimate-generator';

/** Draft key used by DocumentGenerator — keep in sync with storageKey() there. */
export function draftStorageKey(slug: string): string {
  return `docuforge:draft:${slug}`;
}

/**
 * Map quote/estimate form values into contractor-invoice fields.
 * Logo data URLs are omitted (invoice tool has no logo field; keeps payload small).
 * Dates use “today” / +14 due so the invoice is ready to send.
 */
export function mapEstimateToInvoiceValues(
  estimate: Record<string, unknown>,
  now = new Date(),
): Record<string, unknown> {
  const today = localTodayIso(now);
  const dueDate = addDaysIso(today, 14);
  const estimateRef = String(estimate.docNumber ?? '').trim();
  const project = String(estimate.projectTitle ?? '').trim();
  const description = String(estimate.description ?? '').trim();
  const notes = String(estimate.notes ?? '').trim();
  const clientEmail = String(estimate.clientEmail ?? '').trim();

  const noteLines = [
    estimateRef ? `From estimate ${estimateRef}` : 'Converted from estimate',
    project ? `Project: ${project}` : '',
    description,
    notes,
    clientEmail ? `Client email: ${clientEmail}` : '',
  ].filter(Boolean);

  const lineItems = Array.isArray(estimate.lineItems) ? estimate.lineItems : [];

  return {
    companyName: estimate.companyName ?? '',
    companyPhone: estimate.companyPhone ?? '',
    companyEmail: estimate.companyEmail ?? '',
    invoiceNumber: estimateRef ? `INV-${estimateRef}` : '',
    invoiceDate: today,
    dueDate,
    poNumber: estimateRef,
    clientName: estimate.clientName ?? '',
    lineItems,
    taxRate: typeof estimate.taxRate === 'number' ? estimate.taxRate : Number(estimate.taxRate) || 0,
    amountPaid: 0,
    paymentInstructions: '',
    notes: noteLines.join('\n'),
  };
}

/** Persist handoff + invoice draft so /tools/contractor-invoice/ restores the mapped values. */
export function writeInvoiceHandoff(invoiceValues: Record<string, unknown>): void {
  const payload = JSON.stringify(invoiceValues);
  localStorage.setItem(INVOICE_HANDOFF_KEY, payload);
  localStorage.setItem(draftStorageKey(INVOICE_TOOL_SLUG), payload);
}

/** Read and clear the one-shot handoff marker. Returns null if none. */
export function consumeInvoiceHandoff(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(INVOICE_HANDOFF_KEY);
    if (!raw) return null;
    localStorage.removeItem(INVOICE_HANDOFF_KEY);
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** True when the URL signals an estimate→invoice handoff (query and/or hash). */
export function isEstimateHandoffUrl(search: string, hash: string): boolean {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  if (params.get('from') === 'estimate' || params.get('handoff') === 'estimate') return true;
  const h = hash.startsWith('#') ? hash.slice(1) : hash;
  return h === 'handoff' || h === 'from-estimate';
}

/** Path for Convert to invoice — query + hash document the localStorage handoff. */
export function invoiceHandoffHref(): string {
  return `/tools/${INVOICE_TOOL_SLUG}/?from=estimate#handoff`;
}
