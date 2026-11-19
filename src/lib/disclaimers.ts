import type { ToolDefinition } from '../data/tools/types';

/** Invoice / receipt tools sit next to tax and payment rules — show a short YMYL disclaimer. */
export function isInvoiceOrReceiptTool(tool: Pick<ToolDefinition, 'slug' | 'name'>): boolean {
  return (
    /invoice|receipt|late-fee/i.test(tool.slug) ||
    /invoice|receipt|late fee/i.test(tool.name)
  );
}

export function toolDisclaimerBanner(tool: Pick<ToolDefinition, 'slug' | 'name' | 'isLegalAdjacent'>): string | null {
  if (tool.isLegalAdjacent) {
    return 'Not legal advice. Editable sample language only—not a substitute for an attorney. For consent/health forms, also not medical advice; follow local licensing rules.';
  }
  if (isInvoiceOrReceiptTool(tool)) {
    return 'Not legal or tax advice. This template helps you draft a document; confirm tax rates, required fields, and local rules for your situation.';
  }
  return null;
}

export function toolTrustDisclaimer(tool: Pick<ToolDefinition, 'slug' | 'name' | 'isLegalAdjacent'>): string {
  if (tool.isLegalAdjacent) {
    return 'Editable sample language only — not legal advice. Laws vary by state and country; have a licensed attorney review before you rely on any clause.';
  }
  if (isInvoiceOrReceiptTool(tool)) {
    return 'Not legal or tax advice. Templates only — confirm tax rates, payment terms, and local requirements for your job.';
  }
  return 'Estimates and templates only. Confirm tax rates, payment terms, and local requirements for your job.';
}

/** Shared note for invoice / receipt guides (answer-box legalNote). */
export const INVOICE_RECEIPT_GUIDE_LEGAL_NOTE =
  'This article is not legal or tax advice. Recordkeeping and tax rules vary by jurisdiction. Confirm requirements with a qualified professional for your situation.';
