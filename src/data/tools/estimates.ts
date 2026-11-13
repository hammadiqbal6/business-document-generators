import type { ToolDefinition } from './types';
import { clause } from './line-item-defaults';
import { estimateSources } from './shared-sources';

export const constructionEstimate: ToolDefinition = {
  slug: 'construction-estimate-template',
  name: 'Construction Estimate Template',
  shortName: 'Construction Estimate',
  category: 'estimates-invoices',
  primaryKeyword: 'construction estimate template',
  secondaryKeywords: [
    'free construction estimate template',
    'construction quote generator',
    'contractor estimate form',
    'building estimate template PDF',
  ],
  title: 'Free Construction Estimate & Quote Template (PDF)',
  metaDescription:
    'Fill a free construction estimate or quote template with line items, labor, materials and tax, preview it live, then download PDF or Word. No signup.',
  h1: 'Free Construction Estimate & Quote Template',
  answerFirst:
    'A construction estimate or construction quote lists project scope, labor and material line items, allowances, tax, and a total so you can present pricing before work starts. Use this free generator to fill those fields in your browser, preview the document, and export PDF or DOCX. Nothing is uploaded.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Construction Estimate',
  toolVersion: '1.0',
  formulaNote:
    'Line-item amount = quantity × rate. Subtotal = sum of line amounts. Tax = subtotal × (tax rate ÷ 100). Deposit = total × (deposit % ÷ 100). The sample kitchen remodel in the defaults walks through this with tax at 8.31% and a 30% deposit.',
  fields: [
    { id: 'companyName', label: 'Company name', type: 'text', required: true, section: 'Your business' },
    { id: 'companyAddress', label: 'Company address', type: 'textarea', rows: 2, section: 'Your business' },
    { id: 'companyPhone', label: 'Phone', type: 'tel', section: 'Your business' },
    { id: 'companyEmail', label: 'Email', type: 'email', section: 'Your business' },
    { id: 'estimateNumber', label: 'Estimate #', type: 'text', required: true, section: 'Estimate details' },
    { id: 'estimateDate', label: 'Date', type: 'date', required: true, section: 'Estimate details' },
    { id: 'validUntil', label: 'Valid until', type: 'date', section: 'Estimate details' },
    { id: 'clientName', label: 'Client name', type: 'text', required: true, section: 'Client' },
    { id: 'clientAddress', label: 'Job / client address', type: 'textarea', rows: 2, section: 'Client' },
    { id: 'projectName', label: 'Project name', type: 'text', required: true, section: 'Project' },
    { id: 'scope', label: 'Scope of work', type: 'textarea', rows: 4, required: true, section: 'Project' },
    { id: 'lineItems', label: 'Line items', type: 'lineItems', required: true, section: 'Pricing' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Pricing' },
    { id: 'depositPercent', label: 'Deposit required (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, section: 'Pricing' },
    { id: 'notes', label: 'Notes / exclusions', type: 'textarea', rows: 3, section: 'Notes' },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    companyAddress: '120 Industrial Way\nDenver, CO 80216',
    companyPhone: '(303) 555-0142',
    companyEmail: 'estimates@summitbuild.example',
    estimateNumber: 'CE-2026-014',
    estimateDate: '2026-10-19',
    validUntil: '2026-11-19',
    clientName: 'Jordan Lee',
    clientAddress: '88 Cedar Lane, Denver, CO 80220',
    projectName: 'Kitchen remodel – cabinets & flooring',
    scope:
      'Demolish existing cabinets and vinyl flooring; install soft-close base and wall cabinets; install LVP flooring in kitchen; haul debris; leave broom-clean.',
    lineItems: [
      { description: 'Cabinet demolition & haul-away', quantity: 1, unit: 'ls', rate: 850 },
      { description: 'Base & wall cabinets (materials)', quantity: 1, unit: 'ls', rate: 4200 },
      { description: 'Cabinet installation labor', quantity: 24, unit: 'hr', rate: 75 },
      { description: 'LVP flooring materials', quantity: 220, unit: 'sq ft', rate: 3.25 },
      { description: 'Flooring install labor', quantity: 220, unit: 'sq ft', rate: 2.5 },
    ],
    taxRate: 8.31,
    depositPercent: 30,
    notes: 'Excludes plumbing, electrical, and appliance relocation. Allowance for unknown substrate conditions: $400.',
  },
  content: {
    howToUse: [
      'Enter your company and client details, then the project name and scope.',
      'Add labor and material line items with quantities, units, and rates.',
      'Set tax and deposit percentages; review the live preview.',
      'Export PDF or DOCX, or save a draft to this browser with localStorage.',
    ],
    whatToInclude: [
      {
        heading: 'What every construction estimate or quote should include',
        body: 'A clear construction estimate or construction quote names the parties, job address, date and validity window, numbered line items (labor vs materials where helpful), tax, deposit terms, and written exclusions. Ambiguous “lump sum” lines without scope invite disputes. Tie each line to work you described above.',
      },
      {
        heading: 'Allowances and exclusions',
        body: 'Call out allowances for unknown conditions (rot, asbestos testing, permit fees) and list exclusions such as painting, fixtures, or owner-supplied materials. State whether prices include dumpster fees and sales tax.',
      },
    ],
    workedExample: {
      heading: 'Worked example: kitchen remodel estimate',
      body: 'The sample estimate totals demolition ($850), cabinets ($4,200 + 24 hrs × $75), and flooring (220 sq ft materials and labor). Subtotal is calculated from line items, tax at 8.31% is applied, and a 30% deposit is shown. Change any rate and the preview updates immediately.',
    },
    commonMistakes: [
      'Omitting a validity date so prices drift while the client delays.',
      'Mixing taxable and non-taxable items without noting tax treatment.',
      'Writing vague scopes like “fix kitchen” without measurable deliverables.',
      'Forgetting change-order language when actual conditions differ.',
    ],
    tips: [
      'Separate labor and materials when clients compare bids.',
      'Photograph existing conditions and attach notes before you price.',
      'Match estimate numbers to invoices for the same job.',
    ],
    faq: [
      {
        question: 'Is a construction estimate legally binding?',
        answer:
          'Often an estimate is an invitation to agree on price, not a contract—unless your wording or local law treats it as an offer you both accept. Pair accepted estimates with a signed contract or work order.',
      },
      {
        question: 'How long should an estimate stay valid?',
        answer:
          'Many contractors use 14–30 days. Material-heavy jobs may need shorter windows when lumber or appliance prices move quickly.',
      },
      {
        question: 'What is the difference between an estimate and a bid?',
        answer:
          'An estimate is typically a professional opinion of cost; a bid is often a firm offer in a competitive process. Confirm how your client uses the terms.',
      },
      {
        question: 'Do I need to include tax on every line?',
        answer:
          'Follow your jurisdiction’s rules. Many estimates show a single tax rate on taxable subtotal; some materials are tax-exempt for resale—label those clearly.',
      },
      {
        question: 'Should I include a contingency line?',
        answer:
          'A 5–15% contingency (or a clearly labeled allowance) helps when finishes, concealed conditions, or owner selections are still open. Spell out what triggers using it and how unused contingency is handled.',
      },
      {
        question: 'What should every construction estimate include?',
        answer:
          'Job address, dated scope with exclusions, measurable line items (labor vs materials), tax, deposit or draw schedule, validity window, and assumptions about access, permits, and owner-supplied items.',
      },
      {
        question: 'What should a construction quote generator include?',
        answer:
          'The same fields as a solid construction estimate: parties, job address, measurable scope, line items with units and rates, tax, deposit as your working pattern, a validity date, and exclusions. Whether you label the PDF “quote” or “estimate,” the math and scope clarity matter more than the title.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'work-order', 'change-order-template'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const contractorInvoice: ToolDefinition = {
  slug: 'contractor-invoice',
  name: 'Contractor Invoice Generator',
  shortName: 'Contractor Invoice',
  category: 'estimates-invoices',
  primaryKeyword: 'contractor invoice',
  secondaryKeywords: ['contractor invoice template', 'construction invoice PDF', 'free contractor invoice'],
  title: 'Free Contractor Invoice Template & Generator',
  metaDescription:
    'Make a contractor invoice online with line items, tax, deposits and payment terms. Live preview, then download a PDF or DOCX. Free, no account needed.',
  h1: 'Free Contractor Invoice Template',
  answerFirst:
    'A contractor invoice bills for completed or progress-billed work: invoice number, dates, client, line items, tax, amount due, and payment instructions. Generate yours here in the browser, preview it live, and download PDF or DOCX without uploading data.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Invoice',
  toolVersion: '1.0',
  formulaNote:
    "Line-item amount = quantity × rate. Subtotal = sum of lines. Tax = subtotal × (tax rate ÷ 100). Amount due = total − amount already paid.",
  fields: [
    { id: 'companyName', label: 'Company name', type: 'text', required: true, section: 'Your business' },
    { id: 'companyAddress', label: 'Company address', type: 'textarea', rows: 2, section: 'Your business' },
    { id: 'companyPhone', label: 'Phone', type: 'tel', section: 'Your business' },
    { id: 'companyEmail', label: 'Email', type: 'email', section: 'Your business' },
    { id: 'invoiceNumber', label: 'Invoice #', type: 'text', required: true, section: 'Invoice' },
    { id: 'invoiceDate', label: 'Invoice date', type: 'date', required: true, section: 'Invoice' },
    { id: 'dueDate', label: 'Due date', type: 'date', required: true, section: 'Invoice' },
    { id: 'poNumber', label: 'PO / job #', type: 'text', section: 'Invoice' },
    { id: 'clientName', label: 'Bill to', type: 'text', required: true, section: 'Client' },
    { id: 'clientAddress', label: 'Client address', type: 'textarea', rows: 2, section: 'Client' },
    { id: 'lineItems', label: 'Line items', type: 'lineItems', required: true, section: 'Charges' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Charges' },
    { id: 'amountPaid', label: 'Amount already paid', type: 'currency', inputMode: 'decimal', min: 0, section: 'Charges' },
    { id: 'paymentInstructions', label: 'Payment instructions', type: 'textarea', rows: 3, section: 'Payment' },
    { id: 'notes', label: 'Notes', type: 'textarea', rows: 2, section: 'Payment' },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    companyAddress: '120 Industrial Way\nDenver, CO 80216',
    companyPhone: '(303) 555-0142',
    companyEmail: 'billing@summitbuild.example',
    invoiceNumber: 'INV-2026-088',
    invoiceDate: '2026-10-19',
    dueDate: '2026-11-02',
    poNumber: 'CE-2026-014',
    clientName: 'Jordan Lee',
    clientAddress: '88 Cedar Lane, Denver, CO 80220',
    lineItems: [
      { description: 'Progress billing – cabinets installed', quantity: 1, unit: 'ls', rate: 3500 },
      { description: 'Flooring materials (delivered)', quantity: 1, unit: 'ls', rate: 715 },
    ],
    taxRate: 8.31,
    amountPaid: 2500,
    paymentInstructions: 'ACH to Summit Build Co. or check payable to Summit Build Co. Net 14.',
    notes: 'Thank you for your business.',
  },
  content: {
    howToUse: [
      'Fill contractor and client billing details.',
      'Add billable line items and tax; enter any prior payments.',
      'Add payment instructions and due date.',
      'Export PDF/DOCX or print from preview.',
    ],
    whatToInclude: [
      {
        heading: 'Invoice essentials for contractors',
        body: 'Include a unique invoice number, service dates or period, reference to the estimate or contract, taxable vs non-taxable amounts, balance due, and how to pay. Progress invoices should state the percent complete or milestone billed.',
      },
    ],
    workedExample: {
      heading: 'Worked example: progress invoice',
      body: 'Sample INV-2026-088 bills $3,500 labor progress plus $715 materials, applies 8.31% tax, subtracts a $2,500 deposit, and shows the remaining balance with Net 14 terms.',
    },
    commonMistakes: [
      'Reusing invoice numbers across jobs.',
      'Missing the estimate or PO reference clients need for AP.',
      'Not showing prior payments, which confuses balance due.',
    ],
    tips: [
      'Keep invoice numbers sequential and year-prefixed.',
      'Send PDF plus a plain-text payment reminder.',
    ],
    faq: [
      {
        question: 'When should a contractor send an invoice?',
        answer:
          'Follow the payment schedule in your contract—deposit, progress, or final. Send promptly after each milestone so cash flow stays predictable.',
      },
      {
        question: 'What payment terms are common?',
        answer:
          'Net 14 or Net 30 are common for residential work; commercial jobs may specify retainage. State late fees only if your agreement allows them.',
      },
      {
        question: 'How does progress billing work on a contractor invoice?',
        answer:
          'Bill a percentage or completed-phase amount that matches your contract draws—e.g. after demo, rough-in, or substantial completion. Reference the estimate or PO and show prior payments so the balance due is obvious.',
      },
      {
        question: 'Can I charge late fees on unpaid contractor invoices?',
        answer:
          'Only if your signed agreement allows a specific rate or fee and local law permits it. Put the late-fee rule on the invoice and the contract; do not invent penalties after the fact.',
      },
      {
        question: 'Do contractor invoices affect 1099 reporting?',
        answer:
          'In the U.S., businesses often need your taxpayer ID to issue Form 1099-NEC when they pay $600+ to an unincorporated contractor. Your invoice is a payment record—not a tax form—so keep W-9 and invoice PDFs together for year-end.',
      },
      {
        question: 'What is retainage and how do I show it?',
        answer:
          'Retainage is a contract holdback (often 5–10%) until punch-list or final acceptance. Show the earned amount, retainage withheld this period, retainage released, and net amount due so AP can match the contract.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['construction-estimate-template', 'change-order-template', 'purchase-order-template'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const cleaningInvoice: ToolDefinition = {
  slug: 'cleaning-service-invoice',
  name: 'Cleaning Service Invoice',
  shortName: 'Cleaning Invoice',
  category: 'estimates-invoices',
  primaryKeyword: 'cleaning service invoice',
  secondaryKeywords: ['house cleaning invoice', 'commercial cleaning invoice', 'maid service invoice template'],
  title: 'Free Cleaning Service Invoice Template (PDF)',
  metaDescription:
    'Create a cleaning service invoice with rooms, frequency, line items and tax. Live preview in your browser, then download PDF or DOCX—no signup.',
  h1: 'Free Cleaning Service Invoice Template',
  answerFirst:
    'A cleaning service invoice spells out the property, service frequency, rooms or square footage, add-ons, rate, tax, and total due. Build one free here with a live preview and PDF or DOCX export; your entries stay on your device.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Cleaning Invoice',
  toolVersion: '1.0',
  formulaNote:
    "Line items are summed (quantity × rate). Tax applies to the subtotal. Choose Estimate or Invoice with the document-type field—same math either way.",
  fields: [
    { id: 'docType', label: 'Document type', type: 'select', section: 'Document', options: [
      { value: 'Estimate', label: 'Estimate' },
      { value: 'Invoice', label: 'Invoice' },
    ]},
    { id: 'companyName', label: 'Business name', type: 'text', required: true, section: 'Your business' },
    { id: 'companyPhone', label: 'Phone', type: 'tel', section: 'Your business' },
    { id: 'companyEmail', label: 'Email', type: 'email', section: 'Your business' },
    { id: 'docNumber', label: 'Number', type: 'text', required: true, section: 'Document' },
    { id: 'docDate', label: 'Date', type: 'date', required: true, section: 'Document' },
    { id: 'clientName', label: 'Client name', type: 'text', required: true, section: 'Client' },
    { id: 'serviceAddress', label: 'Service address', type: 'textarea', rows: 2, required: true, section: 'Client' },
    { id: 'frequency', label: 'Frequency', type: 'select', section: 'Service', options: [
      { value: 'One-time', label: 'One-time' },
      { value: 'Weekly', label: 'Weekly' },
      { value: 'Bi-weekly', label: 'Bi-weekly' },
      { value: 'Monthly', label: 'Monthly' },
    ]},
    { id: 'serviceDate', label: 'Service date', type: 'date', section: 'Service' },
    { id: 'scope', label: 'Areas & checklist', type: 'textarea', rows: 4, required: true, section: 'Service' },
    { id: 'lineItems', label: 'Line items', type: 'lineItems', required: true, section: 'Pricing' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Pricing' },
    { id: 'notes', label: 'Notes', type: 'textarea', rows: 2, section: 'Notes' },
  ],
  defaults: {
    docType: 'Invoice',
    companyName: 'BrightPath Cleaning',
    companyPhone: '(512) 555-0199',
    companyEmail: 'book@brightpath.example',
    docNumber: 'CL-1042',
    docDate: '2026-10-19',
    clientName: 'Sam Rivera',
    serviceAddress: '410 Oak St, Austin, TX 78702',
    frequency: 'Bi-weekly',
    serviceDate: '2026-10-24',
    scope: 'Kitchen, 2 baths, living, 3 bedrooms. Includes floors, surfaces, bathrooms, kitchen sink & appliances exterior. Excludes oven interior and windows.',
    lineItems: [
      { description: 'Bi-weekly standard clean (3BR)', quantity: 1, unit: 'visit', rate: 165 },
      { description: 'Inside fridge add-on', quantity: 1, unit: 'ea', rate: 35 },
    ],
    taxRate: 0,
    notes: 'Please secure pets. Key code on file.',
  },
  content: {
    howToUse: [
      'Choose Estimate or Invoice.',
      'Describe frequency and rooms/checklist.',
      'Price line items and export.',
    ],
    whatToInclude: [
      {
        heading: 'Cleaning quotes clients actually understand',
        body: 'List rooms, what’s included vs add-ons (oven, fridge, windows), frequency discounts, and supply policy (you bring products vs green products only).',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'Sample bi-weekly clean at $165 plus a $35 fridge add-on produces a clear $200 pre-tax estimate with exclusions listed in the scope.',
    },
    commonMistakes: [
      'Not listing exclusions, leading to “I thought windows were included.”',
      'Using one flat rate for vastly different home sizes.',
    ],
    tips: [
      'Offer first-clean deep-clean pricing separately from maintenance cleans.',
      'Use this free cleaning service invoice template to match the same line labels on quote and invoice day.',
      'Read the cleaning invoice rates guide for move-out and recurring examples, then return here to export PDF.',
    ],
    faq: [
      {
        question: 'Should cleaning estimates include supplies?',
        answer:
          'State whether pricing includes supplies or if the client provides preferred products. Call out eco-friendly product upcharges.',
      },
      {
        question: 'How do cleaning services usually set rates?',
        answer:
          'Common approaches are flat per-visit pricing by home size, hourly crew rates, or per-room packages. Deep cleans and first visits often cost more than recurring maintenance cleans—list both so clients are not surprised.',
      },
      {
        question: 'How should recurring cleans appear on an invoice?',
        answer:
          'Show frequency (weekly, bi-weekly, monthly), the service date, and the same line labels used on the original quote. Note any skipped visits, holiday fees, or one-time add-ons on separate lines.',
      },
      {
        question: 'Is tipping expected for house cleaners?',
        answer:
          'Tips are optional and separate from the invoice total. If your team pools tips, say so on the receipt or booking confirmation; never bury a mandatory “tip” inside a service fee without labeling it clearly.',
      },
      {
        question: 'What should a cleaning invoice include?',
        answer:
          'Business name and contact, invoice number and date, client and service address, frequency, scope or rooms cleaned, priced line items, tax if applicable, amount due, and payment instructions.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['quote-estimate-generator', 'receipt-generator', 'catering-quote'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const cateringQuote: ToolDefinition = {
  slug: 'catering-quote',
  name: 'Catering Quote Generator',
  shortName: 'Catering Quote',
  category: 'estimates-invoices',
  primaryKeyword: 'catering quote',
  secondaryKeywords: ['catering quote template', 'catering quotation template', 'catering estimate template', 'event catering quote'],
  title: 'Catering Quote Template – Free Generator',
  metaDescription:
    'Build a catering quote with guest count, menu packages, service fees, and deposit terms. Live preview plus PDF/DOCX export in your browser.',
  h1: 'Free Catering Quote Template Generator',
  answerFirst:
    'A catering quote template lists event date, guest count, menu package, per-guest pricing, service fees, tax, and a deposit (often 25–50% to hold the date). Create one free here, preview live, and export PDF or DOCX in your browser.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Catering Quote',
  toolVersion: '1.0',
  formulaNote:
    "Per-guest or package lines use quantity × rate. Staff and fees are additional lines. Tax and deposit % apply to the computed total.",
  fields: [
    { id: 'companyName', label: 'Caterer name', type: 'text', required: true, section: 'Business' },
    { id: 'companyPhone', label: 'Phone', type: 'tel', section: 'Business' },
    { id: 'companyEmail', label: 'Email', type: 'email', section: 'Business' },
    { id: 'quoteNumber', label: 'Quote #', type: 'text', required: true, section: 'Event' },
    { id: 'quoteDate', label: 'Quote date', type: 'date', required: true, section: 'Event' },
    { id: 'clientName', label: 'Client name', type: 'text', required: true, section: 'Event' },
    { id: 'eventName', label: 'Event name', type: 'text', required: true, section: 'Event' },
    { id: 'eventDate', label: 'Event date', type: 'date', required: true, section: 'Event' },
    { id: 'venue', label: 'Venue', type: 'text', section: 'Event' },
    { id: 'guestCount', label: 'Guest count', type: 'number', inputMode: 'numeric', min: 1, required: true, section: 'Event' },
    { id: 'menuSummary', label: 'Menu summary', type: 'textarea', rows: 4, required: true, section: 'Menu' },
    { id: 'lineItems', label: 'Pricing lines', type: 'lineItems', required: true, section: 'Pricing' },
    { id: 'serviceFeePercent', label: 'Service fee (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.1, section: 'Pricing' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Pricing' },
    { id: 'depositPercent', label: 'Deposit (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, section: 'Pricing' },
    { id: 'notes', label: 'Terms / notes', type: 'textarea', rows: 3, section: 'Notes' },
  ],
  defaults: {
    companyName: 'Hearth & Table Catering',
    companyPhone: '(206) 555-0177',
    companyEmail: 'events@hearthtable.example',
    quoteNumber: 'CQ-226',
    quoteDate: '2026-10-19',
    clientName: 'Alex Chen',
    eventName: 'Company autumn lunch',
    eventDate: '2026-11-12',
    venue: 'Pier 56 Conference Room B',
    guestCount: 60,
    menuSummary: 'Buffet: herb chicken, roasted vegetables, grain salad, rolls, cookies. Water & iced tea included. Dietary: 6 vegetarian, 2 gluten-free plated.',
    lineItems: [
      { description: 'Buffet package per guest', quantity: 60, unit: 'guest', rate: 28 },
      { description: 'On-site staff (4 hrs)', quantity: 3, unit: 'staff', rate: 45 },
      { description: 'Delivery & setup', quantity: 1, unit: 'ls', rate: 125 },
    ],
    serviceFeePercent: 18,
    taxRate: 10.25,
    depositPercent: 40,
    notes: 'Final guest count due 7 days prior. Cancellation within 72 hours forfeits deposit.',
  },
  content: {
    howToUse: [
      'Enter event logistics and guest count.',
      'Summarize the menu and dietary notes.',
      'Price packages, staff, and fees; export.',
    ],
    whatToInclude: [
      {
        heading: 'Catering quote checklist',
        body: 'Include guest count assumptions, service style (buffet vs plated), dietary accommodations, staff hours, rentals if any, service fee vs gratuity, tax, tasting policy, and cancellation/deposit rules.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: '60 guests × $28 = $1,680 food, plus staff and delivery. An 18% service fee and 10.25% tax apply to the taxable base; a 40% deposit is calculated from the grand total.',
    },
    commonMistakes: [
      'Forgetting overtime staff rates for late events.',
      'Not locking a final guest-count deadline.',
    ],
    tips: ['Separate food, labor, and rentals so clients can trim scope cleanly.'],
    faq: [
      {
        question: 'Is a catering quote a contract?',
        answer:
          'Usually not until signed with deposit terms. Convert accepted quotes into a catering agreement covering cancelation and force majeure.',
      },
      {
        question: 'What deposit percentage is typical for catering?',
        answer:
          'Many caterers take 25–50% to reserve the date, with the balance due about 7–14 days before the event (or on a final guest-count deadline). State the percentage, due dates, and refund rules on the quote.',
      },
      {
        question: 'What is the difference between a service charge and gratuity?',
        answer:
          'A service charge is often a house fee that may go to the business; gratuity is typically a tip for staff. Label each clearly, say whether tax applies, and note if the service charge is in lieu of tipping.',
      },
      {
        question: 'When is the final headcount due?',
        answer:
          'A common rule is a guaranteed guest count 7–14 days before the event, with billing on that number (or actual attendance if higher). Put the deadline and overage rate on the quote so food and staffing can scale.',
      },
      {
        question: 'Should I use a catering quote or a full contract?',
        answer:
          'Use the quote to lock menu, pricing, and deposit math; use a signed catering or event contract for cancellation, force majeure, allergens, and venue rules. Many clients accept the quote, pay the deposit, then sign the agreement.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['event-wedding-vendor-contract', 'quote-estimate-generator', 'cleaning-service-invoice'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const quoteEstimate: ToolDefinition = {
  slug: 'quote-estimate-generator',
  name: 'Free Estimate Generator',
  shortName: 'Free Estimate',
  category: 'estimates-invoices',
  primaryKeyword: 'free estimate generator',
  secondaryKeywords: [
    'estimate generator free',
    'quote estimate generator',
    'business quote template',
    'service estimate PDF',
    'free quote generator',
  ],
  title: 'Free Estimate Generator – Quote & PDF',
  metaDescription:
    'Use this free estimate generator to price a job with line items, tax, and a validity date. Live preview, then download PDF or DOCX—no signup.',
  h1: 'Free Estimate Generator',
  answerFirst:
    'A free estimate generator builds a priced estimate (or quote) in your browser: parties, job description, line items, tax, total, and how long the price holds. Preview live, then export PDF or DOCX. Nothing is uploaded to a server.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Estimate',
  toolVersion: '1.1',
  formulaNote:
    "Each line is quantity × rate. Subtotal sums lines; tax = subtotal × (tax rate ÷ 100). Validity date is informational.",
  fields: [
    { id: 'docLabel', label: 'Label', type: 'select', section: 'Document', options: [
      { value: 'Estimate', label: 'Estimate' },
      { value: 'Quote', label: 'Quote' },
      { value: 'Proposal', label: 'Proposal' },
    ]},
    { id: 'companyName', label: 'Business name', type: 'text', required: true, section: 'Business' },
    { id: 'companyEmail', label: 'Email', type: 'email', section: 'Business' },
    { id: 'companyPhone', label: 'Phone', type: 'tel', section: 'Business' },
    { id: 'docNumber', label: 'Number', type: 'text', required: true, section: 'Document' },
    { id: 'docDate', label: 'Date', type: 'date', required: true, section: 'Document' },
    { id: 'validUntil', label: 'Valid until', type: 'date', section: 'Document' },
    { id: 'clientName', label: 'Client', type: 'text', required: true, section: 'Client' },
    { id: 'clientEmail', label: 'Client email', type: 'email', section: 'Client' },
    { id: 'projectTitle', label: 'Project / job title', type: 'text', required: true, section: 'Details' },
    { id: 'description', label: 'Description', type: 'textarea', rows: 3, section: 'Details' },
    { id: 'lineItems', label: 'Line items', type: 'lineItems', required: true, section: 'Pricing' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Pricing' },
    { id: 'notes', label: 'Notes', type: 'textarea', rows: 2, section: 'Notes' },
  ],
  defaults: {
    docLabel: 'Estimate',
    companyName: 'Northwind Services',
    companyEmail: 'hello@northwind.example',
    companyPhone: '(312) 555-0108',
    docNumber: 'E-901',
    docDate: '2026-10-19',
    validUntil: '2026-11-02',
    clientName: 'Taylor Brooks',
    clientEmail: 'taylor@client.example',
    projectTitle: 'Office network upgrade consult',
    description: 'On-site assessment, equipment recommendations, and configuration plan for a 25-person office.',
    lineItems: [
      { description: 'On-site assessment (half day)', quantity: 1, unit: 'day', rate: 450 },
      { description: 'Configuration documentation', quantity: 4, unit: 'hr', rate: 95 },
    ],
    taxRate: 0,
    notes: 'Hardware costs quoted separately after assessment.',
  },
  content: {
    howToUse: [
      'Choose Estimate or Quote as the document label.',
      'Enter your business and client details, then describe the job.',
      'Add priced line items, set tax and a valid-until date, and preview the totals.',
      'Export PDF or DOCX, or save a draft in this browser with localStorage.',
    ],
    whatToInclude: [
      {
        heading: 'What a free estimate generator should fill in',
        body: 'Parties, a measurable job description, line items with quantity × rate, tax if you collect it, a grand total, and a validity date. Switch the label to Quote when your industry expects that word—the math stays the same.',
      },
      {
        heading: 'Quote vs estimate',
        body: 'Quotes are often firmer offers; estimates signal approximate cost. Label the document the way your industry expects and say whether totals may change after discovery.',
      },
    ],
    workedExample: {
      heading: 'Worked example: free estimate generator',
      body: 'Sample estimate E-901 prices a half-day assessment at $450 plus four hours of documentation at $95/hr for an $830 pre-tax total, valid 14 days. Change the label to Quote if that is what your client expects.',
    },
    commonMistakes: ['No validity date', 'Scope that cannot be measured'],
    tips: ['Number every estimate and archive the exported file.', 'Reuse the same lines later in the contractor invoice tool.'],
    faq: [
      {
        question: 'Can I turn this quote into an invoice later?',
        answer:
          'Yes—reuse the same line items in the contractor invoice or receipt tools once work is accepted or paid.',
      },
      {
        question: 'What is the difference between a quote and an estimate?',
        answer:
          'Quotes are often firmer fixed offers for a defined scope; estimates signal approximate cost that may change after discovery. Label the document the way your industry expects and state whether totals can move.',
      },
      {
        question: 'Is a quote legally binding?',
        answer:
          'It can become binding if it is a clear offer that the client accepts, or if local law treats it that way. Many businesses treat unsigned quotes as proposals and require a signed contract or deposit to lock the job—confirm with counsel for your situation.',
      },
      {
        question: 'How long should a quote stay valid?',
        answer:
          'Fourteen to thirty days is common for services; shorter windows help when materials or labor rates change quickly. Put a “valid until” date on every quote and re-quote after it expires.',
      },
      {
        question: 'Do I need a signature for the client to accept a quote?',
        answer:
          'A written acceptance (signature, e-sign, or clear email “approved”) plus a deposit is stronger than a verbal yes. Match your acceptance method to how you want the job to become a contract.',
      },
      {
        question: 'What is a free estimate generator?',
        answer:
          'A free estimate generator is a browser form that builds a priced quote or estimate PDF with line items, tax, and a validity date. This tool does that without an account and without uploading your entries to a server.',
      },
      {
        question: 'How do I create an estimate or quote in the browser?',
        answer:
          'Choose Quote or Estimate, enter your business and client details, describe the job, add priced line items, set tax and a valid-until date, then preview and export PDF or DOCX. For a full walkthrough, see the how to write a business estimate guide.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['construction-estimate-template', 'contractor-invoice', 'receipt-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const receiptGenerator: ToolDefinition = {
  slug: 'receipt-generator',
  name: 'Receipt Generator',
  shortName: 'Receipt',
  category: 'estimates-invoices',
  primaryKeyword: 'receipt generator',
  secondaryKeywords: ['free receipt maker', 'payment receipt template', 'how to write a receipt of payment', 'service receipt PDF'],
  title: 'Receipt Generator – Free Payment Receipt PDF',
  metaDescription:
    'Create a payment receipt online for cash, card, or transfer. Itemize charges, show amount paid, export PDF/DOCX. Runs entirely in your browser.',
  h1: 'Free Receipt Generator',
  answerFirst:
    'A payment receipt confirms who paid whom, when, how much, for what, and by which method. Generate a clean receipt here, preview it live, and download PDF or DOCX without sending data to a server.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Receipt',
  toolVersion: '1.1',
  formulaNote:
    'Amount received is what you enter; line items (if any) should match that total for your records. Remaining balance is informational.',
  fields: [
    { id: 'companyName', label: 'Business name', type: 'text', required: true, section: 'Business' },
    { id: 'companyAddress', label: 'Address', type: 'textarea', rows: 2, section: 'Business' },
    { id: 'receiptNumber', label: 'Receipt #', type: 'text', required: true, section: 'Receipt' },
    { id: 'receiptDate', label: 'Date', type: 'date', required: true, section: 'Receipt' },
    {
      id: 'invoiceRef',
      label: 'Invoice / reference #',
      type: 'text',
      section: 'Receipt',
      help: 'Link this receipt of payment to the invoice or estimate it pays (for example INV-1042).',
    },
    { id: 'clientName', label: 'Received from', type: 'text', required: true, section: 'Payment' },
    { id: 'paymentMethod', label: 'Payment method', type: 'select', section: 'Payment', options: [
      { value: 'Cash', label: 'Cash' },
      { value: 'Card', label: 'Card' },
      { value: 'Check', label: 'Check' },
      { value: 'Bank transfer', label: 'Bank transfer' },
      { value: 'Other', label: 'Other' },
    ]},
    { id: 'lineItems', label: 'Items', type: 'lineItems', required: true, section: 'Items' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Items' },
    { id: 'amountPaid', label: 'Amount paid', type: 'currency', inputMode: 'decimal', min: 0, required: true, section: 'Payment' },
    {
      id: 'balanceRemaining',
      label: 'Balance remaining',
      type: 'currency',
      inputMode: 'decimal',
      min: 0,
      section: 'Payment',
      help: 'For deposits or partial payments, enter what is still owed. Use 0 when paid in full.',
    },
    { id: 'notes', label: 'Notes', type: 'textarea', rows: 2, section: 'Notes' },
  ],
  defaults: {
    companyName: 'Northwind Services',
    companyAddress: '200 W Madison, Chicago, IL 60606',
    receiptNumber: 'RCPT-551',
    receiptDate: '2026-11-13',
    invoiceRef: 'INV-1042',
    clientName: 'Taylor Brooks',
    paymentMethod: 'Card',
    lineItems: [
      { description: 'Consulting – October retainer', quantity: 1, unit: 'mo', rate: 800 },
    ],
    taxRate: 0,
    amountPaid: 800,
    balanceRemaining: 0,
    notes: 'Paid in full toward invoice INV-1042. Thank you.',
  },
  content: {
    howToUse: [
      'Enter your business name, a unique receipt number, and the payment date.',
      'Add the Invoice / reference # that this receipt of payment applies to (for example INV-1042).',
      'Name who paid, choose the payment method, and itemize what was covered.',
      'Enter Amount paid and Balance remaining (0 if paid in full), preview, then export PDF or DOCX.',
    ],
    whatToInclude: [
      {
        heading: 'How to write a receipt of payment',
        body: 'Show who paid whom, the date, a unique receipt number, the amount, the payment method, and what it covers. If the payment pays an invoice, fill Invoice / reference # so both documents link. Example: $1,200 by card toward invoice 1047, tax shown on the invoice lines, balance remaining if anything is still owed. Keep a PDF copy with your income records.',
      },
      {
        heading: 'How to fill out a receipt of payment in this form',
        body: 'Use Business name and Received from for the parties. Receipt # and Date identify the payment event. Invoice / reference # points at the prior bill. Items describe what was paid for. Amount paid is cash received; Balance remaining is what is still due after this payment (use 0 and “paid in full” in Notes when the job is settled).',
      },
      {
        heading: 'PDF receipt export',
        body: 'Export a PDF receipt after you preview the totals. File it with the related invoice. The IRS lists receipts and receipt books among supporting documents for gross receipts.',
      },
      {
        heading: 'Partial payments and paid-in-full',
        body: 'When the payer covers only a deposit, put cash received in Amount paid and the still-owed figure in Balance remaining (and say so in Notes). When settled, set balance remaining to 0 so the PDF stands alone as proof of payment.',
      },
    ],
    workedExample: {
      heading: 'Worked example: how to fill out a receipt of payment',
      body: 'Northwind issues receipt RCPT-551 to Taylor Brooks for $800 by card against Invoice / reference # INV-1042 (October consulting retainer). Line items total $800, tax 0%, amount paid $800, balance remaining $0, notes “Paid in full toward invoice INV-1042.” Export the PDF and file it with the invoice. For a $2,000 job with a $500 deposit, amount paid would be $500 and balance remaining $1,500 with the same invoice reference.',
    },
    commonMistakes: [
      'No receipt number',
      'Amount paid not matching line totals without explanation',
      'Missing invoice reference when the payment is against a prior bill',
      'Omitting remaining balance on partial deposits',
    ],
    tips: [
      'Keep PDF copies for bookkeeping alongside bank deposits.',
      'Reuse the same party names and invoice number on the next progress bill so the paper trail stays consistent.',
    ],
    faq: [
      {
        question: 'Is this a tax invoice?',
        answer:
          'Receipts prove payment. Some regions require formal tax invoices with registration numbers—add those fields in Notes if your locality requires them.',
      },
      {
        question: 'What should a payment receipt include?',
        answer:
          'Unique receipt number, date, business name, payer name, description of goods or services, amount paid, payment method, tax if shown, invoice reference when applicable, and remaining balance if the payment was partial.',
      },
      {
        question: 'How is a receipt different from an invoice?',
        answer:
          'An invoice requests payment; a receipt confirms payment was received. Issue the invoice first (or with a deposit request), then a receipt when money clears—or a combined “paid invoice” if that is your bookkeeping style.',
      },
      {
        question: 'Are DIY PDF receipts legally valid?',
        answer:
          'A clear, accurate receipt is generally useful proof of payment for customers and your books. Tax or consumer rules may require specific fields (registration numbers, itemization)—follow your locality; this tool is not tax advice.',
      },
      {
        question: 'Can I add a paid watermark or use this for thermal printers?',
        answer:
          'Export the PDF and add a “Paid” stamp in your PDF viewer or print workflow if you want a watermark. Thermal printers need a narrow layout. Use the PDF as a record and reprint on thermal stock from your POS if required.',
      },
      {
        question: 'How do I generate a receipt of payment?',
        answer:
          'Enter your business name, the payer, a unique receipt number, the date, what was paid for, amount paid, and payment method. Add an invoice reference when the payment applies to a prior bill. Preview, then export a PDF receipt for your books and the customer.',
      },
      {
        question: 'Can I export a PDF payment receipt?',
        answer:
          'Yes. This generator creates a PDF (and DOCX) payment receipt in your browser. File the PDF with the related invoice. The IRS lists receipts among supporting documents for gross receipts.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'quote-estimate-generator', 'work-order'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const workOrder: ToolDefinition = {
  slug: 'work-order',
  name: 'Work Order Generator',
  shortName: 'Work Order',
  category: 'estimates-invoices',
  primaryKeyword: 'work order',
  secondaryKeywords: ['work order template', 'job work order form', 'service work order PDF'],
  title: 'Work Order Template – Free Generator',
  metaDescription:
    'Create a service work order with job details, assigned tech, tasks, and authorization. Live preview and PDF/DOCX export—client-side only.',
  h1: 'Free Work Order Generator',
  answerFirst:
    'A work order authorizes and tracks a job: who requested it, where, what tasks, who is assigned, materials, and customer approval. Fill this template in your browser, preview it, and export PDF or DOCX without uploading.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Work Order',
  toolVersion: '1.0',
  formulaNote:
    "Labor and material lines use quantity × rate for planned cost; the work order itself is an assignment ticket, not a tax invoice.",
  fields: [
    { id: 'companyName', label: 'Company', type: 'text', required: true, section: 'Business' },
    { id: 'woNumber', label: 'Work order #', type: 'text', required: true, section: 'Job' },
    { id: 'woDate', label: 'Date', type: 'date', required: true, section: 'Job' },
    { id: 'priority', label: 'Priority', type: 'select', section: 'Job', options: [
      { value: 'Normal', label: 'Normal' },
      { value: 'High', label: 'High' },
      { value: 'Emergency', label: 'Emergency' },
    ]},
    { id: 'clientName', label: 'Customer', type: 'text', required: true, section: 'Customer' },
    { id: 'siteAddress', label: 'Job site', type: 'textarea', rows: 2, required: true, section: 'Customer' },
    { id: 'contactPhone', label: 'On-site contact phone', type: 'tel', section: 'Customer' },
    { id: 'assignedTo', label: 'Assigned to', type: 'text', section: 'Assignment' },
    { id: 'scheduledDate', label: 'Scheduled date', type: 'date', section: 'Assignment' },
    { id: 'problem', label: 'Problem / request', type: 'textarea', rows: 3, required: true, section: 'Work' },
    { id: 'tasks', label: 'Tasks to perform', type: 'textarea', rows: 4, required: true, section: 'Work' },
    { id: 'lineItems', label: 'Parts / labor lines', type: 'lineItems', section: 'Parts & labor' },
    { id: 'customerAuth', label: 'Customer authorization name', type: 'text', section: 'Authorization' },
    { id: 'notes', label: 'Technician notes', type: 'textarea', rows: 2, section: 'Authorization' },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    woNumber: 'WO-331',
    woDate: '2026-10-19',
    priority: 'Normal',
    clientName: 'Jordan Lee',
    siteAddress: '88 Cedar Lane, Denver, CO 80220',
    contactPhone: '(303) 555-0190',
    assignedTo: 'Crew A – M. Ortiz',
    scheduledDate: '2026-10-21',
    problem: 'Soft close hinge on cabinet #4 not latching; client requests adjustment before final walkthrough.',
    tasks: '1) Inspect hinge and door alignment\n2) Adjust or replace hinge\n3) Test all soft-close doors\n4) Photo completion for file',
    lineItems: [
      { description: 'Service call labor', quantity: 1, unit: 'hr', rate: 85 },
      { description: 'Soft-close hinge', quantity: 1, unit: 'ea', rate: 18 },
    ],
    customerAuth: 'Jordan Lee',
    notes: '',
  },
  content: {
    howToUse: [
      'Log job site and priority.',
      'Describe the problem and task list.',
      'Optionally price parts/labor; export for the crew.',
    ],
    whatToInclude: [
      {
        heading: 'Work order fields crews need',
        body: 'Clear problem statement, site access notes, assigned tech, scheduled window, parts list, and a signature/authorization line so work is approved before overtime starts.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'WO-331 schedules a one-hour callback to adjust a cabinet hinge, listing a replacement part at $18 and labor at $85.',
    },
    commonMistakes: ['Vague problem descriptions', 'No on-site contact number'],
    tips: ['Link WO numbers to the original estimate number.'],
    faq: [
      {
        question: 'Is a work order the same as an invoice?',
        answer:
          'No. A work order directs the job; an invoice bills for it afterward. Many shops convert completed work orders into invoices.',
      },
      {
        question: 'Should the technician sign off on the work order?',
        answer:
          'Yes—tech sign-off plus customer authorization (when required) creates a clear record of who did the work, what was completed, and any follow-up needed before invoicing.',
      },
      {
        question: 'How should parts and materials appear on a work order?',
        answer:
          'List each part with quantity and planned rate or cost, plus labor lines. Note serial numbers or warranty swaps when relevant so the later invoice matches what was installed.',
      },
      {
        question: 'How do I convert a work order into an invoice?',
        answer:
          'Copy completed labor and parts lines into your invoice tool, drop unused estimates, add tax and payment terms, and reference the work-order number so AP can match the job ticket.',
      },
      {
        question: 'What fields do crews need on a work order?',
        answer:
          'Customer and site address, on-site contact, priority, problem statement, task list, assigned tech, scheduled window, parts/labor lines, and an authorization signature line before overtime starts.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: [
    'construction-estimate-template',
    'purchase-order-template',
    'change-order-template',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const timesheetTemplate: ToolDefinition = {
  slug: 'timesheet-template',
  name: 'Timesheet Template',
  shortName: 'Timesheet',
  category: 'estimates-invoices',
  primaryKeyword: 'timesheet template',
  secondaryKeywords: [
    'timesheet generator',
    'weekly timesheet template',
    'employee timesheet PDF',
  ],
  title: 'Free Timesheet Template (PDF)',
  metaDescription:
    'Fill a free timesheet template with hours by day, hourly rate, and totals. Preview live, then download PDF or DOCX—nothing uploads to a server.',
  h1: 'Free Timesheet Template',
  answerFirst:
    'A timesheet template records who worked, which days, how many hours, the hourly rate, and the period total so payroll or client billing can match time to money. Enter hours by day below, review the live total, and export PDF or DOCX in your browser.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Timesheet',
  toolVersion: '1.0',
  formulaNote:
    'Hours total = sum of daily hour quantities. Amount = hours total × hourly rate (or per-line rate × hours when rates differ by day). Tax is not applied on this timesheet; move approved hours to an invoice if you bill clients.',
  fields: [
    { id: 'companyName', label: 'Company', type: 'text', required: true, section: 'Business' },
    { id: 'companyAddress', label: 'Company address', type: 'textarea', rows: 2, section: 'Business' },
    { id: 'employeeName', label: 'Worker / employee name', type: 'text', required: true, section: 'Worker' },
    { id: 'employeeRole', label: 'Role / department', type: 'text', section: 'Worker' },
    { id: 'periodStart', label: 'Period start', type: 'date', required: true, section: 'Period' },
    { id: 'periodEnd', label: 'Period end', type: 'date', required: true, section: 'Period' },
    { id: 'hourlyRate', label: 'Default hourly rate', type: 'currency', inputMode: 'decimal', min: 0, section: 'Period' },
    {
      id: 'lineItems',
      label: 'Hours by day',
      type: 'lineItems',
      required: true,
      section: 'Hours',
      help: 'Use description for the date/day, quantity for hours, unit “hr”, and rate for the hourly pay or bill rate.',
    },
    { id: 'notes', label: 'Notes / project codes', type: 'textarea', rows: 2, section: 'Notes' },
    { id: 'approverName', label: 'Approver name', type: 'text', section: 'Approval' },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    companyAddress: '120 Industrial Way\nDenver, CO 80216',
    employeeName: 'M. Ortiz',
    employeeRole: 'Carpenter – Crew A',
    periodStart: '2026-11-09',
    periodEnd: '2026-11-15',
    hourlyRate: 42,
    lineItems: [
      { description: 'Mon 2026-11-09 — site framing', quantity: 8, unit: 'hr', rate: 42 },
      { description: 'Tue 2026-11-10 — site framing', quantity: 8, unit: 'hr', rate: 42 },
      { description: 'Wed 2026-11-11 — material run + install', quantity: 7.5, unit: 'hr', rate: 42 },
      { description: 'Thu 2026-11-12 — punch list', quantity: 8, unit: 'hr', rate: 42 },
      { description: 'Fri 2026-11-13 — punch list', quantity: 6, unit: 'hr', rate: 42 },
    ],
    notes: 'Job CE-2026-014 kitchen remodel. Lunch unpaid; OT not applicable this week.',
    approverName: 'A. Nguyen, Superintendent',
  },
  content: {
    howToUse: [
      'Enter the company, worker name, and pay period start/end dates.',
      'Add one line per day (or shift) with hours in quantity and the hourly rate.',
      'Review the hours total and dollar total in the live preview.',
      'Export PDF/DOCX for payroll or client billing, or save a draft in this browser.',
    ],
    whatToInclude: [
      {
        heading: 'What belongs on a timesheet',
        body: 'Name the worker, the pay or billing period, each day worked with hours, and the rate used for that time. Add job or project codes in the description or notes so the sheet ties back to an estimate, work order, or invoice. An approver line helps when a supervisor must sign before payroll runs.',
      },
      {
        heading: 'Hours, rates, and totals',
        body: 'Put hours in the quantity column and the hourly rate in the rate column so each line amount is hours × rate. Summing those lines gives the period total. This template does not invent overtime multipliers—if your policy pays time-and-a-half after a threshold, add a separate OT line with the OT rate rather than burying the math.',
      },
      {
        heading: 'Timesheets next to invoices and work orders',
        body: 'Field crews often log hours on a timesheet, then office staff copy billable lines onto a contractor invoice or mark a work order complete. Keep the same job number across estimate, timesheet, and invoice so accounts payable can match the file. IRS recordkeeping guidance lists documents that support income and expenses; approved timesheets help explain labor costs when you need them.',
      },
    ],
    workedExample: {
      heading: 'Worked example: five-day crew timesheet',
      body: 'M. Ortiz logs 8 + 8 + 7.5 + 8 + 6 = 37.5 hours at $42/hr for job CE-2026-014. Line amounts sum to $1,575 before any payroll taxes or burden. Change a day’s hours and the preview recalculates immediately.',
    },
    commonMistakes: [
      'One lump “40 hours” line with no daily detail when the client or payroll needs day-level proof.',
      'Mixing bill rates and pay rates on the same sheet without labeling which is which.',
      'Forgetting the period end date so sheets overlap pay cycles.',
      'Skipping supervisor approval on client-billable T&M jobs.',
    ],
    tips: [
      'Use the same job number as your construction estimate or work order.',
      'Export PDF for the worker file and keep a DOCX if payroll edits descriptions.',
    ],
    faq: [
      {
        question: 'What is a timesheet?',
        answer:
          'A timesheet is a record of hours worked by day (or shift) for a stated period, often with a rate and approval signature so payroll or client billing can verify time.',
      },
      {
        question: 'How do you calculate a timesheet total?',
        answer:
          'Add the hours for each day, then multiply by the hourly rate—or sum each line’s hours × rate when rates differ. This generator shows both the hour total and the dollar total from your lines.',
      },
      {
        question: 'How do I create a weekly timesheet?',
        answer:
          'Set the period start and end (often Monday–Sunday), add one line per workday with hours and rate, note the job code, and have a supervisor approve before you export the PDF.',
      },
      {
        question: 'Should overtime be a separate line?',
        answer:
          'Yes when your policy uses a different OT rate. Keep regular hours on their lines and add OT hours at the OT rate so the math stays auditable.',
      },
      {
        question: 'Is a timesheet the same as an invoice?',
        answer:
          'No. A timesheet proves time; an invoice bills for it. Many contractors copy approved hours into a contractor invoice after the period closes.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'work-order', 'receipt-generator'],
  publishedAt: '2026-11-13',
  updatedAt: '2026-11-13',
};

export const purchaseOrderTemplate: ToolDefinition = {
  slug: 'purchase-order-template',
  name: 'Purchase Order Template',
  shortName: 'Purchase Order',
  category: 'estimates-invoices',
  primaryKeyword: 'purchase order template',
  secondaryKeywords: [
    'purchase order form',
    'PO template free',
    'business purchase order PDF',
  ],
  title: 'Purchase Order Template (Free)',
  metaDescription:
    'Create a purchase order with PO number, vendor, ship-to address, line items, and totals. Live preview plus free PDF or DOCX export.',
  h1: 'Free Purchase Order Template',
  answerFirst:
    'A purchase order (PO) tells a vendor what to supply: PO number, dates, bill-to and ship-to addresses, line items with quantities and rates, tax, and a total. Fill this template in your browser, preview the PO, and download PDF or DOCX without uploading data.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Purchase Order',
  toolVersion: '1.0',
  formulaNote:
    'Line amount = quantity × rate. Subtotal = sum of line amounts. Tax = subtotal × (tax rate ÷ 100). Total = subtotal + tax.',
  fields: [
    { id: 'companyName', label: 'Buyer company', type: 'text', required: true, section: 'Buyer' },
    { id: 'companyAddress', label: 'Bill-to address', type: 'textarea', rows: 2, section: 'Buyer' },
    { id: 'companyPhone', label: 'Phone', type: 'tel', section: 'Buyer' },
    { id: 'companyEmail', label: 'Email', type: 'email', section: 'Buyer' },
    { id: 'poNumber', label: 'PO number', type: 'text', required: true, section: 'Order' },
    { id: 'poDate', label: 'PO date', type: 'date', required: true, section: 'Order' },
    { id: 'neededBy', label: 'Need-by date', type: 'date', section: 'Order' },
    { id: 'vendorName', label: 'Vendor', type: 'text', required: true, section: 'Vendor' },
    { id: 'vendorAddress', label: 'Vendor address', type: 'textarea', rows: 2, section: 'Vendor' },
    { id: 'shipToName', label: 'Ship-to name', type: 'text', required: true, section: 'Ship-to' },
    { id: 'shipToAddress', label: 'Ship-to address', type: 'textarea', rows: 3, required: true, section: 'Ship-to' },
    { id: 'lineItems', label: 'Line items', type: 'lineItems', required: true, section: 'Items' },
    { id: 'taxRate', label: 'Tax rate (%)', type: 'number', inputMode: 'decimal', min: 0, max: 100, step: 0.01, section: 'Items' },
    { id: 'paymentInstructions', label: 'Payment / shipping terms', type: 'textarea', rows: 2, section: 'Terms' },
    { id: 'notes', label: 'Notes', type: 'textarea', rows: 2, section: 'Terms' },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    companyAddress: '120 Industrial Way\nDenver, CO 80216',
    companyPhone: '(303) 555-0142',
    companyEmail: 'purchasing@summitbuild.example',
    poNumber: 'PO-2026-441',
    poDate: '2026-11-13',
    neededBy: '2026-11-20',
    vendorName: 'Front Range Millwork Supply',
    vendorAddress: '400 Lumber Yard Rd, Aurora, CO 80011',
    shipToName: 'Summit Build Co. – Job CE-2026-014',
    shipToAddress: '88 Cedar Lane, Denver, CO 80220\nAttn: M. Ortiz / Crew A',
    lineItems: [
      { description: 'Soft-close cabinet hinges (pair)', quantity: 24, unit: 'ea', rate: 8.5 },
      { description: '3/4" plywood sheet (4x8)', quantity: 10, unit: 'ea', rate: 62 },
      { description: 'Delivery to job site', quantity: 1, unit: 'ls', rate: 95 },
    ],
    taxRate: 8.31,
    paymentInstructions: 'Net 30 from invoice. Reference PO-2026-441 on packing slip and invoice.',
    notes: 'Call superintendent 30 minutes before delivery. Forklift not on site—tailgate delivery OK.',
  },
  content: {
    howToUse: [
      'Enter buyer details, PO number, and date.',
      'Add vendor and ship-to addresses (they often differ from bill-to).',
      'List quantities, units, and rates; set tax if it applies.',
      'Export PDF/DOCX and send the PO to the vendor before goods ship.',
    ],
    whatToInclude: [
      {
        heading: 'Purchase order fields vendors need',
        body: 'A usable PO has a unique number, date, buyer bill-to, vendor name, ship-to address, line items with quantities and prices, tax treatment, and payment or shipping terms. Job-site ship-to lines should name the superintendent or receiving contact so trucks are not turned away.',
      },
      {
        heading: 'PO vs invoice vs work order',
        body: 'A purchase order is the buyer’s offer to buy; the vendor’s invoice bills for what shipped; a work order directs crews to perform labor. Earlier Docuklin research and the work-order guide treat those as three different documents—keep the PO number on the packing slip and the later invoice so receiving can three-way match.',
      },
      {
        heading: 'Totals and records',
        body: 'Line amount equals quantity × rate; tax usually applies to the taxable subtotal. Keep issued POs with receiving notes and vendor invoices. IRS small-business recordkeeping materials highlight invoices and related papers as support for purchases and expenses.',
      },
    ],
    workedExample: {
      heading: 'Worked example: millwork PO to a job site',
      body: 'PO-2026-441 orders 24 hinge pairs, 10 plywood sheets, and delivery to 88 Cedar Lane for kitchen remodel CE-2026-014. Subtotal is calculated from the lines, 8.31% tax is applied, and Net 30 terms reference the same PO number the vendor must print on the invoice.',
    },
    commonMistakes: [
      'Shipping to the office bill-to when materials must land on the job site.',
      'Reusing PO numbers across jobs.',
      'Omitting the need-by date on long-lead items.',
      'No instruction to put the PO number on the vendor invoice.',
    ],
    tips: [
      'Match PO numbers into your contractor invoice “PO / job #” field when billing owners for reimbursable materials.',
      'If quantities change after issue, send a revised PO or a short change note—do not silently alter receiving copies.',
    ],
    faq: [
      {
        question: 'What is a purchase order?',
        answer:
          'A purchase order is a buyer-issued document that authorizes a vendor to supply listed goods or services at stated quantities and prices, usually with bill-to and ship-to details.',
      },
      {
        question: 'Is a purchase order the same as a work order?',
        answer:
          'No. A PO buys materials or services from a vendor; a work order assigns labor tasks to a crew. Some shops reference both numbers on the same job file.',
      },
      {
        question: 'What should every purchase order include?',
        answer:
          'Unique PO number, date, buyer and vendor, ship-to address, line items with qty/price, tax if applicable, and payment or shipping terms—plus a note to reference the PO on invoices.',
      },
      {
        question: 'Do I need tax on a purchase order?',
        answer:
          'Follow your jurisdiction and whether the purchase is taxable. Many POs show an estimated tax rate; the vendor invoice may adjust based on actual tax rules.',
      },
      {
        question: 'Can I edit a purchase order after sending it?',
        answer:
          'Issue a revised PO with the same number and a revision note, or a new PO that supersedes the old one. Tell the vendor which document is active so receiving is not stuck with two totals.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['work-order', 'contractor-invoice', 'quote-estimate-generator'],
  publishedAt: '2026-11-13',
  updatedAt: '2026-11-13',
};

export const changeOrderTemplate: ToolDefinition = {
  slug: 'change-order-template',
  name: 'Change Order Template',
  shortName: 'Change Order',
  category: 'estimates-invoices',
  primaryKeyword: 'change order template',
  secondaryKeywords: [
    'construction change order template',
    'change order form',
    'contract change order PDF',
  ],
  title: 'Change Order Template (Free)',
  metaDescription:
    'Document a construction change order with original contract reference, change description, cost and time impact, and signature lines. Export PDF/DOCX free.',
  h1: 'Free Change Order Template',
  answerFirst:
    'A change order records a written change to an existing contract or estimate: the original reference, what is changing, the cost impact, any schedule impact, and signatures from both parties. Fill this template, preview it, and export PDF or DOCX before the extra work starts.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Change Order',
  toolVersion: '1.0',
  formulaNote:
    'Optional line items use quantity × rate. Cost impact fields should match the sum of added (or credited) lines when you price the change that way.',
  fields: [
    { id: 'companyName', label: 'Contractor / company', type: 'text', required: true, section: 'Parties' },
    { id: 'companyAddress', label: 'Company address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'clientName', label: 'Client / owner', type: 'text', required: true, section: 'Parties' },
    { id: 'clientAddress', label: 'Project address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'coNumber', label: 'Change order #', type: 'text', required: true, section: 'Reference' },
    { id: 'coDate', label: 'Change order date', type: 'date', required: true, section: 'Reference' },
    { id: 'originalContractRef', label: 'Original contract / estimate #', type: 'text', required: true, section: 'Reference' },
    { id: 'originalContractDate', label: 'Original contract date', type: 'date', section: 'Reference' },
    { id: 'projectName', label: 'Project name', type: 'text', required: true, section: 'Change' },
    { id: 'changeDescription', label: 'Description of change', type: 'textarea', rows: 4, required: true, section: 'Change' },
    { id: 'reason', label: 'Reason / discovery', type: 'textarea', rows: 2, section: 'Change' },
    { id: 'costImpact', label: 'Cost impact (+/−)', type: 'currency', inputMode: 'decimal', required: true, section: 'Impact' },
    { id: 'scheduleDays', label: 'Schedule impact (days)', type: 'number', inputMode: 'numeric', section: 'Impact' },
    { id: 'revisedTotal', label: 'Revised contract total', type: 'currency', inputMode: 'decimal', section: 'Impact' },
    { id: 'lineItems', label: 'Price breakdown (optional)', type: 'lineItems', section: 'Impact' },
    { id: 'notes', label: 'Notes / exclusions', type: 'textarea', rows: 2, section: 'Impact' },
    { id: 'contractorSigner', label: 'Contractor signer name', type: 'text', section: 'Signatures' },
    { id: 'clientSigner', label: 'Client signer name', type: 'text', section: 'Signatures' },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    companyAddress: '120 Industrial Way\nDenver, CO 80216',
    clientName: 'Jordan Lee',
    clientAddress: '88 Cedar Lane, Denver, CO 80220',
    coNumber: 'CO-03',
    coDate: '2026-11-13',
    originalContractRef: 'CE-2026-014 / Contract 2026-10-19',
    originalContractDate: '2026-10-19',
    projectName: 'Kitchen remodel – cabinets & flooring',
    changeDescription:
      'Replace damaged subfloor in the pantry (approx. 32 sq ft) discovered after vinyl removal; install matching LVP; haul debris. Work was not in the original scope exclusions for unknown substrate conditions beyond the $400 allowance.',
    reason: 'Concealed water damage under existing vinyl; photo log attached to job file.',
    costImpact: 980,
    scheduleDays: 2,
    revisedTotal: 0,
    lineItems: [
      { description: 'Subfloor repair labor', quantity: 6, unit: 'hr', rate: 75 },
      { description: 'Plywood & fasteners', quantity: 1, unit: 'ls', rate: 180 },
      { description: 'LVP materials (pantry)', quantity: 32, unit: 'sq ft', rate: 3.25 },
      { description: 'Haul-off & disposal', quantity: 1, unit: 'ls', rate: 120 },
    ],
    notes: 'Allowance of $400 on original estimate is exhausted; this CO is additive. No plumbing changes included.',
    contractorSigner: 'A. Nguyen, Summit Build Co.',
    clientSigner: 'Jordan Lee',
  },
  content: {
    howToUse: [
      'Reference the original estimate or contract number and project name.',
      'Describe the change and why it appeared (discovery, owner request, code).',
      'Enter cost impact, schedule days, and optional priced line items.',
      'Export PDF/DOCX and collect contractor and client signatures before starting the extra work.',
    ],
    whatToInclude: [
      {
        heading: 'Why change orders sit next to construction estimates',
        body: 'Estimates and contracts describe the work you priced. When conditions differ—rot, owner upgrades, or code corrections—a change order documents the new scope, money, and time so the job file stays aligned. Link CO numbers back to the construction estimate and later contractor invoices.',
      },
      {
        heading: 'Cost, time, and signatures',
        body: 'State the dollar impact as a positive add or a credit, the calendar days added to substantial completion, and whether a prior allowance is exhausted. Signature lines for contractor and client (or owner’s rep) show authorization before crews order materials. Optional line items make the cost impact auditable.',
      },
      {
        heading: 'Change order vs work order',
        body: 'A change order amends the commercial deal; a work order tells the crew what to do on site. Issue the signed change order first when price or time shifts, then update the work order tasks. Autocomplete noise often mixes “change order” with software UI phrases—this template is the construction document, not an Outlook or QuickBooks menu label.',
      },
    ],
    workedExample: {
      heading: 'Worked example: pantry subfloor change order',
      body: 'CO-03 adds $980 and two schedule days after vinyl removal revealed damaged pantry subfloor on kitchen remodel CE-2026-014. Labor, plywood, LVP, and haul-off lines support the cost impact, and both parties sign before repair starts. The original $400 substrate allowance is noted as exhausted.',
    },
    commonMistakes: [
      'Starting extra work on a verbal OK with no signed CO.',
      'Omitting schedule impact when material lead times slip.',
      'Forgetting to reference the original estimate or contract number.',
      'Cost impact that does not match the priced breakdown lines.',
    ],
    tips: [
      'Photo the condition before covering it up; note the photo log in the reason field.',
      'After signature, update the next progress invoice to include the CO number.',
    ],
    faq: [
      {
        question: 'What is a construction change order?',
        answer:
          'It is a written amendment to an existing construction contract or accepted estimate that describes new or changed work, the price adjustment, and any change to the schedule, with authorization signatures.',
      },
      {
        question: 'When should I issue a change order?',
        answer:
          'Before performing work that was not in the original scope or that exceeds a stated allowance—especially after concealed conditions, owner upgrades, or code-driven revisions.',
      },
      {
        question: 'Is a change order the same as a work order?',
        answer:
          'No. Change orders amend price and scope on the contract; work orders direct field labor. Many jobs need both: a signed CO, then an updated work order for the crew.',
      },
      {
        question: 'How do I show cost and time impact?',
        answer:
          'Enter the net dollar change, days added (or zero), and optional line items that sum to the cost impact. State whether prior allowances apply.',
      },
      {
        question: 'Do both parties need to sign?',
        answer:
          'Yes whenever you expect the change to be enforceable as part of the deal. Unsigned “field tickets” often turn into payment disputes at the end of the job.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['construction-estimate-template', 'contractor-invoice', 'work-order'],
  publishedAt: '2026-11-13',
  updatedAt: '2026-11-13',
};
