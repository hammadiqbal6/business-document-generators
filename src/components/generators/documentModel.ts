import type { ClauseItem, LineItem, ToolDefinition } from '../../data/tools/types';
import { formatMoney, lineItemTotal, sumLineItems } from '../../lib/money';

export interface DocBlock {
  type: 'heading' | 'subheading' | 'kv' | 'paragraph' | 'table' | 'clauses' | 'hr' | 'totals';
  text?: string;
  pairs?: { label: string; value: string }[];
  rows?: string[][];
  clauses?: ClauseItem[];
  totals?: { label: string; value: string; emphasize?: boolean }[];
}

function str(v: unknown): string {
  if (v == null) return '';
  return String(v);
}

function money(v: unknown): string {
  return formatMoney(Number(v) || 0);
}

function items(values: Record<string, unknown>): LineItem[] {
  return (values.lineItems as LineItem[]) || [];
}

function enabledClauses(values: Record<string, unknown>): ClauseItem[] {
  return ((values.clauses as ClauseItem[]) || []).filter((c) => c.enabled);
}

function taxFromSubtotal(subtotal: number, taxRate: number): number {
  return Math.round(subtotal * (taxRate / 100) * 100) / 100;
}

export function buildDocumentBlocks(
  tool: ToolDefinition,
  values: Record<string, unknown>,
): DocBlock[] {
  const blocks: DocBlock[] = [
    { type: 'heading', text: tool.documentTitle },
  ];

  switch (tool.slug) {
    case 'construction-estimate-template':
    case 'contractor-invoice':
    case 'cleaning-service-invoice':
    case 'catering-quote':
    case 'quote-estimate-generator':
    case 'receipt-generator':
    case 'work-order':
      return buildCommercialDoc(tool, values, blocks);
    case 'purchase-order-template':
      return buildPurchaseOrder(values, blocks);
    case 'timesheet-template':
      return buildTimesheet(values, blocks);
    case 'change-order-template':
      return buildChangeOrder(values, blocks);
    case 'photography-contract-template':
      return buildPhotoContract(values, blocks);
    case 'videography-contract':
      return buildVideoContract(values, blocks);
    case 'freelance-web-design-contract':
      return buildWebContract(values, blocks);
    case 'event-wedding-vendor-contract':
      return buildEventContract(values, blocks);
    case 'independent-contractor-agreement':
      return buildIndependentContractor(values, blocks);
    case 'service-agreement-template':
      return buildServiceAgreement(values, blocks);
    case 'simple-nda':
      return buildNda(values, blocks);
    case 'tattoo-consent-form-template':
      return buildTattoo(values, blocks);
    case 'rental-lease-application':
      return buildRental(values, blocks);
    case 'podcast-script-template':
      return buildPodcast(values, blocks);
    case 'real-estate-flyer-template':
      return buildFlyer(values, blocks);
    default:
      blocks.push({ type: 'paragraph', text: 'Fill the form to preview this document.' });
      return blocks;
  }
}

function lineTable(lineItems: LineItem[]): DocBlock {
  const rows = [
    ['Description', 'Qty', 'Unit', 'Rate', 'Amount'],
    ...lineItems.map((i) => [
      i.description || '—',
      String(i.quantity ?? 0),
      i.unit || '',
      money(i.rate),
      money(lineItemTotal(i.quantity, i.rate)),
    ]),
  ];
  return { type: 'table', rows };
}

function totalsBlock(
  lineItems: LineItem[],
  taxRate: number,
  extras: { amountPaid?: number; depositPercent?: number; serviceFeePercent?: number } = {},
): DocBlock {
  const subtotal = sumLineItems(lineItems);
  const serviceFee = extras.serviceFeePercent
    ? Math.round(subtotal * (extras.serviceFeePercent / 100) * 100) / 100
    : 0;
  const taxable = subtotal + serviceFee;
  const tax = taxFromSubtotal(taxable, taxRate);
  const total = taxable + tax;
  const totals: DocBlock['totals'] = [
    { label: 'Subtotal', value: money(subtotal) },
  ];
  if (serviceFee) totals.push({ label: 'Service fee', value: money(serviceFee) });
  if (taxRate) totals.push({ label: `Tax (${taxRate}%)`, value: money(tax) });
  totals.push({ label: 'Total', value: money(total), emphasize: true });
  if (extras.depositPercent) {
    const dep = Math.round(total * (extras.depositPercent / 100) * 100) / 100;
    totals.push({ label: `Deposit (${extras.depositPercent}%)`, value: money(dep) });
  }
  if (extras.amountPaid != null && extras.amountPaid > 0) {
    totals.push({ label: 'Amount paid', value: money(extras.amountPaid) });
    totals.push({
      label: 'Balance due',
      value: money(Math.max(0, total - extras.amountPaid)),
      emphasize: true,
    });
  }
  return { type: 'totals', totals };
}

function buildCommercialDoc(
  tool: ToolDefinition,
  values: Record<string, unknown>,
  blocks: DocBlock[],
): DocBlock[] {
  const label =
    str(values.docType) ||
    str(values.docLabel) ||
    tool.documentTitle;
  blocks[0] = { type: 'heading', text: label };

  const companyPairs = [
    { label: 'From', value: str(values.companyName) },
    { label: 'Address', value: str(values.companyAddress) },
    { label: 'Phone', value: str(values.companyPhone) },
    { label: 'Email', value: str(values.companyEmail) },
  ].filter((p) => p.value);
  blocks.push({ type: 'kv', pairs: companyPairs });

  const metaLabels: Record<string, string> = {
    estimateNumber: 'Estimate #',
    invoiceNumber: 'Invoice #',
    docNumber: 'Document #',
    quoteNumber: 'Quote #',
    receiptNumber: 'Receipt #',
    invoiceRef: 'Invoice / reference #',
    woNumber: 'Work order #',
    estimateDate: 'Estimate date',
    invoiceDate: 'Invoice date',
    docDate: 'Date',
    quoteDate: 'Quote date',
    receiptDate: 'Receipt date',
    woDate: 'Work order date',
    dueDate: 'Due date',
    validUntil: 'Valid until',
    poNumber: 'PO / job #',
    priority: 'Priority',
    frequency: 'Frequency',
    serviceDate: 'Service date',
    eventDate: 'Event date',
    guestCount: 'Guest count',
    paymentMethod: 'Payment method',
    amountPaid: 'Amount paid',
    balanceRemaining: 'Balance remaining',
  };
  const meta: { label: string; value: string }[] = [];
  for (const key of Object.keys(metaLabels)) {
    if (values[key] != null && str(values[key]) !== '') {
      // Amount paid / balance remaining are rendered with currency formatting below for receipts.
      if (tool.slug === 'receipt-generator' && (key === 'amountPaid' || key === 'balanceRemaining')) {
        continue;
      }
      meta.push({
        label: metaLabels[key],
        value: str(values[key]),
      });
    }
  }
  if (meta.length) blocks.push({ type: 'kv', pairs: meta });

  const clientBits = [
    { label: 'Client', value: str(values.clientName) },
    { label: 'Address', value: str(values.clientAddress || values.serviceAddress || values.siteAddress) },
    { label: 'Email', value: str(values.clientEmail) },
  ].filter((p) => p.value);
  if (clientBits.length) blocks.push({ type: 'kv', pairs: clientBits });

  for (const key of ['projectName', 'projectTitle', 'eventName', 'venue']) {
    if (str(values[key])) blocks.push({ type: 'subheading', text: str(values[key]) });
  }

  for (const key of ['scope', 'description', 'menuSummary', 'problem', 'tasks', 'paymentInstructions', 'notes']) {
    if (str(values[key])) {
      blocks.push({
        type: 'paragraph',
        text: `${key === 'notes' ? 'Notes' : key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}: ${str(values[key])}`,
      });
    }
  }

  if (str(values.assignedTo) || str(values.scheduledDate)) {
    blocks.push({
      type: 'kv',
      pairs: [
        { label: 'Assigned to', value: str(values.assignedTo) },
        { label: 'Scheduled', value: str(values.scheduledDate) },
        { label: 'Authorization', value: str(values.customerAuth) },
      ].filter((p) => p.value),
    });
  }

  const lineItems = items(values);
  if (lineItems.length) {
    blocks.push({ type: 'subheading', text: 'Line items' });
    blocks.push(lineTable(lineItems));
    blocks.push(
      totalsBlock(lineItems, Number(values.taxRate) || 0, {
        amountPaid: Number(values.amountPaid) || 0,
        depositPercent: Number(values.depositPercent) || 0,
        serviceFeePercent: Number(values.serviceFeePercent) || 0,
      }),
    );
  }

  if (tool.slug === 'receipt-generator' && Number(values.amountPaid) > 0) {
    blocks.push({
      type: 'paragraph',
      text: `Amount paid (${str(values.paymentMethod) || 'payment'}): ${money(values.amountPaid)}`,
    });
    if (values.balanceRemaining != null && str(values.balanceRemaining) !== '') {
      const bal = Number(values.balanceRemaining);
      blocks.push({
        type: 'paragraph',
        text:
          bal > 0
            ? `Balance remaining: ${money(values.balanceRemaining)}`
            : 'Balance remaining: $0.00 (paid in full)',
      });
    }
  }

  return blocks;
}

function buildPurchaseOrder(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks[0] = { type: 'heading', text: 'Purchase Order' };
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Buyer', value: str(values.companyName) },
      { label: 'Bill-to', value: str(values.companyAddress) },
      { label: 'Phone', value: str(values.companyPhone) },
      { label: 'Email', value: str(values.companyEmail) },
      { label: 'PO #', value: str(values.poNumber) },
      { label: 'PO date', value: str(values.poDate) },
      { label: 'Need by', value: str(values.neededBy) },
    ].filter((p) => p.value),
  });
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Vendor', value: str(values.vendorName) },
      { label: 'Vendor address', value: str(values.vendorAddress) },
    ].filter((p) => p.value),
  });
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Ship to', value: str(values.shipToName) },
      { label: 'Ship-to address', value: str(values.shipToAddress) },
    ].filter((p) => p.value),
  });
  const lineItems = items(values);
  if (lineItems.length) {
    blocks.push({ type: 'subheading', text: 'Line items' });
    blocks.push(lineTable(lineItems));
    blocks.push(totalsBlock(lineItems, Number(values.taxRate) || 0));
  }
  if (str(values.paymentInstructions)) {
    blocks.push({ type: 'paragraph', text: `Payment / shipping terms: ${str(values.paymentInstructions)}` });
  }
  if (str(values.notes)) {
    blocks.push({ type: 'paragraph', text: `Notes: ${str(values.notes)}` });
  }
  return blocks;
}

function buildTimesheet(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks[0] = { type: 'heading', text: 'Timesheet' };
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Company', value: str(values.companyName) },
      { label: 'Address', value: str(values.companyAddress) },
      { label: 'Worker', value: str(values.employeeName) },
      { label: 'Role', value: str(values.employeeRole) },
      { label: 'Period start', value: str(values.periodStart) },
      { label: 'Period end', value: str(values.periodEnd) },
      { label: 'Default rate', value: values.hourlyRate != null && str(values.hourlyRate) !== '' ? money(values.hourlyRate) : '' },
    ].filter((p) => p.value),
  });
  const lineItems = items(values);
  if (lineItems.length) {
    const hoursTotal = lineItems.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);
    blocks.push({ type: 'subheading', text: 'Hours by day' });
    blocks.push(lineTable(lineItems));
    blocks.push({
      type: 'totals',
      totals: [
        { label: 'Hours total', value: String(Math.round(hoursTotal * 100) / 100) },
        { label: 'Amount', value: money(sumLineItems(lineItems)), emphasize: true },
      ],
    });
  }
  if (str(values.notes)) {
    blocks.push({ type: 'paragraph', text: `Notes: ${str(values.notes)}` });
  }
  if (str(values.approverName)) {
    blocks.push({
      type: 'paragraph',
      text: `Approver: ${str(values.approverName)} __________________ Date ______`,
    });
  }
  return blocks;
}

function buildChangeOrder(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks[0] = { type: 'heading', text: 'Change Order' };
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Contractor', value: str(values.companyName) },
      { label: 'Address', value: str(values.companyAddress) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'Project address', value: str(values.clientAddress) },
      { label: 'Change order #', value: str(values.coNumber) },
      { label: 'Date', value: str(values.coDate) },
      { label: 'Original contract / estimate #', value: str(values.originalContractRef) },
      { label: 'Original contract date', value: str(values.originalContractDate) },
    ].filter((p) => p.value),
  });
  if (str(values.projectName)) {
    blocks.push({ type: 'subheading', text: str(values.projectName) });
  }
  if (str(values.changeDescription)) {
    blocks.push({ type: 'paragraph', text: `Description of change: ${str(values.changeDescription)}` });
  }
  if (str(values.reason)) {
    blocks.push({ type: 'paragraph', text: `Reason: ${str(values.reason)}` });
  }
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Cost impact', value: money(values.costImpact) },
      {
        label: 'Schedule impact (days)',
        value: values.scheduleDays != null && str(values.scheduleDays) !== '' ? str(values.scheduleDays) : '',
      },
      {
        label: 'Revised contract total',
        value:
          values.revisedTotal != null && Number(values.revisedTotal) !== 0
            ? money(values.revisedTotal)
            : '',
      },
    ].filter((p) => p.value),
  });
  const lineItems = items(values);
  if (lineItems.length) {
    blocks.push({ type: 'subheading', text: 'Price breakdown' });
    blocks.push(lineTable(lineItems));
    blocks.push(totalsBlock(lineItems, 0));
  }
  if (str(values.notes)) {
    blocks.push({ type: 'paragraph', text: `Notes: ${str(values.notes)}` });
  }
  blocks.push({ type: 'hr' });
  blocks.push({
    type: 'paragraph',
    text: `Contractor: ${str(values.contractorSigner) || '__________________'}  Signature __________________ Date ______`,
  });
  blocks.push({
    type: 'paragraph',
    text: `Client: ${str(values.clientSigner) || '__________________'}  Signature __________________ Date ______`,
  });
  return blocks;
}

function buildIndependentContractor(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Client', value: str(values.clientName) },
      { label: 'Client address', value: str(values.clientAddress) },
      { label: 'Contractor', value: str(values.contractorName) },
      { label: 'Contractor address', value: str(values.contractorAddress) },
      { label: 'Effective date', value: str(values.effectiveDate) },
      { label: 'Project', value: str(values.projectName) },
      { label: 'Fee', value: money(values.fee) },
      { label: 'Term', value: str(values.termSummary) },
      { label: 'Governing law', value: str(values.governingState) },
    ].filter((p) => p.value),
  });
  if (str(values.scope)) blocks.push({ type: 'paragraph', text: `Scope: ${str(values.scope)}` });
  if (str(values.paySchedule)) {
    blocks.push({ type: 'paragraph', text: `Payment schedule: ${str(values.paySchedule)}` });
  }
  if (str(values.expenses)) {
    blocks.push({ type: 'paragraph', text: `Expenses: ${str(values.expenses)}` });
  }
  blocks.push({ type: 'hr' });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  blocks.push({
    type: 'paragraph',
    text: 'Signature blocks: Client __________________ Date ______   Contractor __________________ Date ______',
  });
  return blocks;
}

function buildServiceAgreement(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Provider', value: str(values.providerName) },
      { label: 'Provider address', value: str(values.providerAddress) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'Client address', value: str(values.clientAddress) },
      { label: 'Effective date', value: str(values.effectiveDate) },
      { label: 'Service type', value: str(values.serviceType) },
      { label: 'Location', value: str(values.serviceLocation) },
      { label: 'Fee', value: money(values.fee) },
      { label: 'Deposit', value: values.deposit != null && Number(values.deposit) !== 0 ? money(values.deposit) : '' },
      { label: 'Governing law', value: str(values.governingState) },
    ].filter((p) => p.value),
  });
  if (str(values.scope)) blocks.push({ type: 'paragraph', text: `Services: ${str(values.scope)}` });
  if (str(values.billingTerms)) {
    blocks.push({ type: 'paragraph', text: `Billing terms: ${str(values.billingTerms)}` });
  }
  if (str(values.termSummary)) {
    blocks.push({ type: 'paragraph', text: `Term: ${str(values.termSummary)}` });
  }
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  blocks.push({
    type: 'paragraph',
    text: 'Signature blocks: Provider __________________ Date ______   Client __________________ Date ______',
  });
  return blocks;
}

function buildPhotoContract(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Photographer', value: str(values.photographerName) },
      { label: 'Address', value: str(values.photographerAddress) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'Client email', value: str(values.clientEmail) },
      { label: 'Event type', value: str(values.eventType) },
      { label: 'Date', value: str(values.eventDate) },
      { label: 'Start', value: str(values.startTime) },
      { label: 'Coverage hours', value: str(values.durationHours) },
      { label: 'Location(s)', value: str(values.location) },
      { label: 'Total fee', value: money(values.fee) },
      { label: 'Retainer', value: money(values.deposit) },
      { label: 'Delivery (days)', value: str(values.turnaroundDays) },
    ].filter((p) => p.value),
  });
  blocks.push({ type: 'paragraph', text: `Deliverables: ${str(values.deliverables)}` });
  if (str(values.usageSummary)) {
    blocks.push({ type: 'paragraph', text: `Usage: ${str(values.usageSummary)}` });
  }
  blocks.push({ type: 'hr' });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  blocks.push({
    type: 'paragraph',
    text: 'Signature blocks: Photographer __________________ Date ______   Client __________________ Date ______',
  });
  return blocks;
}

function buildVideoContract(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Company', value: str(values.companyName) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'Project', value: str(values.projectTitle) },
      { label: 'Shoot dates', value: str(values.shootDates) },
      { label: 'Locations', value: str(values.locations) },
      { label: 'Fee', value: money(values.fee) },
      { label: 'Deposit', value: money(values.deposit) },
      { label: 'Revision rounds', value: str(values.revisions) },
    ].filter((p) => p.value),
  });
  blocks.push({ type: 'paragraph', text: `Deliverables: ${str(values.deliverables)}` });
  if (str(values.license)) blocks.push({ type: 'paragraph', text: `License: ${str(values.license)}` });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  return blocks;
}

function buildWebContract(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Freelancer', value: str(values.freelancerName) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'Project', value: str(values.projectName) },
      { label: 'Total fee', value: money(values.totalFee) },
      { label: 'Deposit', value: money(values.deposit) },
      { label: 'Timeline (weeks)', value: str(values.timelineWeeks) },
    ].filter((p) => p.value),
  });
  blocks.push({ type: 'paragraph', text: `Scope: ${str(values.scope)}` });
  blocks.push({ type: 'paragraph', text: `Milestones: ${str(values.milestones)}` });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  return blocks;
}

function buildEventContract(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Vendor', value: str(values.vendorName) },
      { label: 'Service', value: str(values.serviceType) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'Event date', value: str(values.eventDate) },
      { label: 'Venue', value: str(values.venue) },
      { label: 'Service window', value: str(values.serviceWindow) },
      { label: 'Fee', value: money(values.fee) },
      { label: 'Deposit', value: money(values.deposit) },
    ].filter((p) => p.value),
  });
  if (str(values.setupNotes)) blocks.push({ type: 'paragraph', text: `Setup: ${str(values.setupNotes)}` });
  blocks.push({ type: 'paragraph', text: `Inclusions: ${str(values.inclusions)}` });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  return blocks;
}

function buildNda(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Type', value: str(values.ndaType) },
      { label: 'Party A', value: str(values.partyA) },
      { label: 'Party B', value: str(values.partyB) },
      { label: 'Effective', value: str(values.effectiveDate) },
      { label: 'Term (years)', value: str(values.termYears) },
      { label: 'Governing law', value: str(values.governingState) },
    ].filter((p) => p.value),
  });
  blocks.push({ type: 'paragraph', text: `Purpose: ${str(values.purpose)}` });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  return blocks;
}

function buildTattoo(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Studio', value: str(values.studioName) },
      { label: 'Artist', value: str(values.artistName) },
      { label: 'Client', value: str(values.clientName) },
      { label: 'DOB', value: str(values.clientDob) },
      { label: 'Phone', value: str(values.clientPhone) },
      { label: 'Email', value: str(values.clientEmail) },
      { label: 'Placement', value: str(values.placement) },
      { label: 'Session date', value: str(values.sessionDate) },
      { label: 'ID verified', value: values.idVerified ? 'Yes' : 'No' },
      { label: 'Aftercare provided', value: values.aftercareProvided ? 'Yes' : 'No' },
    ].filter((p) => p.value),
  });
  blocks.push({ type: 'paragraph', text: `Design: ${str(values.designDescription)}` });
  blocks.push({ type: 'clauses', clauses: enabledClauses(values) });
  blocks.push({
    type: 'paragraph',
    text: 'Client signature __________________ Date ______   Artist signature __________________ Date ______',
  });
  return blocks;
}

function buildRental(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Property', value: `${str(values.propertyAddress)} ${str(values.unit)}`.trim() },
      { label: 'Desired move-in', value: str(values.desiredMoveIn) },
      { label: 'Listed rent', value: money(values.monthlyRent) },
      { label: 'Applicant', value: str(values.applicantName) },
      { label: 'Email', value: str(values.applicantEmail) },
      { label: 'Phone', value: str(values.applicantPhone) },
      { label: 'DOB', value: str(values.dob) },
      { label: 'Current address', value: str(values.currentAddress) },
      { label: 'Landlord', value: str(values.currentLandlord) },
      { label: 'Years at address', value: str(values.yearsAtAddress) },
      { label: 'Employer', value: str(values.employer) },
      { label: 'Title', value: str(values.jobTitle) },
      { label: 'Gross monthly income', value: money(values.monthlyIncome) },
      { label: 'Occupants', value: str(values.otherOccupants) },
      { label: 'Pets', value: str(values.pets) },
    ].filter((p) => p.value),
  });
  if (str(values.references)) blocks.push({ type: 'paragraph', text: `References:\n${str(values.references)}` });
  if (str(values.authorization)) blocks.push({ type: 'paragraph', text: str(values.authorization) });
  return blocks;
}

function buildPodcast(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  blocks.push({
    type: 'subheading',
    text: `${str(values.showName)} — Ep. ${str(values.episodeNumber)}: ${str(values.episodeTitle)}`,
  });
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Host(s)', value: str(values.hostName) },
      { label: 'Guest', value: str(values.guestName) },
      { label: 'Target length', value: values.targetMinutes ? `${values.targetMinutes} min` : '' },
    ].filter((p) => p.value),
  });
  const parts: [string, string][] = [
    ['Cold open', str(values.coldOpen)],
    ['Intro', str(values.intro)],
    ['Segment 1', str(values.segment1)],
    ['Segment 2', str(values.segment2)],
    ['Segment 3', str(values.segment3)],
    ['CTA', str(values.cta)],
    ['Outro', str(values.outro)],
    ['Show notes', str(values.showNotes)],
  ];
  for (const [label, text] of parts) {
    if (text) {
      blocks.push({ type: 'subheading', text: label });
      blocks.push({ type: 'paragraph', text });
    }
  }
  return blocks;
}

function buildFlyer(values: Record<string, unknown>, blocks: DocBlock[]): DocBlock[] {
  // Keep a stable document title as the preview heading (avoid marketing headline as H2).
  blocks[0] = { type: 'heading', text: 'Property Flyer' };
  if (str(values.headline)) {
    blocks.push({ type: 'paragraph', text: str(values.headline) });
  }
  if (str(values.price)) {
    blocks.push({ type: 'paragraph', text: str(values.price) });
  }
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Address', value: str(values.address) },
      { label: 'Beds', value: str(values.beds) },
      { label: 'Baths', value: str(values.baths) },
      { label: 'Sq ft', value: str(values.sqft) },
      { label: 'Lot', value: str(values.lotSize) },
      { label: 'Open house', value: str(values.openHouse) },
    ].filter((p) => p.value),
  });
  blocks.push({ type: 'paragraph', text: str(values.features) });
  if (str(values.neighborhood)) blocks.push({ type: 'paragraph', text: str(values.neighborhood) });
  blocks.push({
    type: 'kv',
    pairs: [
      { label: 'Agent', value: str(values.agentName) },
      { label: 'Brokerage', value: str(values.brokerage) },
      { label: 'Phone', value: str(values.agentPhone) },
      { label: 'Email', value: str(values.agentEmail) },
    ].filter((p) => p.value),
  });
  if (str(values.disclaimer)) blocks.push({ type: 'paragraph', text: str(values.disclaimer) });
  return blocks;
}

export function blocksToPlainText(blocks: DocBlock[]): string {
  const lines: string[] = [];
  for (const b of blocks) {
    if (b.type === 'heading' || b.type === 'subheading' || b.type === 'paragraph') {
      if (b.text) lines.push(b.text, '');
    } else if (b.type === 'kv' && b.pairs) {
      for (const p of b.pairs) lines.push(`${p.label}: ${p.value}`);
      lines.push('');
    } else if (b.type === 'table' && b.rows) {
      for (const row of b.rows) lines.push(row.join(' | '));
      lines.push('');
    } else if (b.type === 'totals' && b.totals) {
      for (const t of b.totals) lines.push(`${t.label}: ${t.value}`);
      lines.push('');
    } else if (b.type === 'clauses' && b.clauses) {
      for (const c of b.clauses) {
        lines.push(c.title.toUpperCase(), c.body, '');
      }
    } else if (b.type === 'hr') {
      lines.push('---', '');
    }
  }
  return lines.join('\n').trim();
}
