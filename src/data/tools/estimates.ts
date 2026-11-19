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
  title: 'Free Construction Estimate Template',
  metaDescription:
    'Free contractor estimate generator for remodel bids: scope, labor, materials, tax, and deposit. Live preview, then download PDF or DOCX—no signup.',
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
      'After acceptance, bill draws with the free invoice generator for contractors at /tools/contractor-invoice/.',
      'For a lighter service quote without remodel allowances, use the free quote generator at /tools/quote-estimate-generator/.',
    ],
    faq: [
      {
        question: 'What should every construction estimate include?',
        answer:
          'Job address, dated scope with exclusions, measurable line items (labor vs materials), tax, deposit or draw schedule, validity window, and assumptions about access, permits, and owner-supplied items.',
      },
      {
        question: 'Is this a free contractor estimate generator?',
        answer:
          'Yes. Fill the construction estimate template in your browser, preview live, and download PDF or DOCX with no account. For faster mixed-service quotes without remodel allowances, use /tools/quote-estimate-generator/.',
      },
      {
        question: 'Quote vs estimate vs invoice on a remodel?',
        answer:
          'Use this estimate (or quote) before work. Switch to /tools/contractor-invoice/ when you bill a deposit or progress draw. A receipt confirms money already received. See /guides/invoice-vs-estimate/.',
      },
      {
        question: 'Can I download a construction estimate PDF?',
        answer:
          'Yes. Export PDF or DOCX from the live preview. Keep the PDF with the job file so later invoices can reuse the same line labels.',
      },
      {
        question: 'How long should an estimate stay valid?',
        answer:
          'Many contractors use 14–30 days. Material-heavy jobs may need shorter windows when lumber or appliance prices move quickly.',
      },
      {
        question: 'Is a construction estimate legally binding?',
        answer:
          'Often an estimate is an invitation to agree on price, not a contract—unless your wording or local law treats it as an offer you both accept. Pair accepted estimates with a signed contract or work order.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'quote-estimate-generator', 'change-order-template'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-18',
};

export const contractorInvoice: ToolDefinition = {
  slug: 'contractor-invoice',
  name: 'Contractor Invoice Generator',
  shortName: 'Contractor Invoice',
  category: 'estimates-invoices',
  primaryKeyword: 'contractor invoice',
  secondaryKeywords: [
    'contractor invoice template',
    'construction invoice PDF',
    'free contractor invoice',
    'free invoice generator for contractors',
  ],
  title: 'Free Invoice Generator for Contractors',
  metaDescription:
    'Free invoice generator for contractors: line items, tax, deposits, balance due, and payment terms. Live preview, then download PDF or DOCX—no signup.',
  h1: 'Free Invoice Generator for Contractors',
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
      'Price the job first with the free quote generator at /tools/quote-estimate-generator/ or the construction estimate template at /tools/construction-estimate-template/.',
      'When a deposit clears, issue a payment receipt from /tools/receipt-generator/.',
    ],
    faq: [
      {
        question: 'Is this a free invoice generator for contractors?',
        answer:
          'Yes. Fill line items, tax, deposits, and payment terms in your browser, preview live, and download PDF or DOCX with no account. Entries stay on your device.',
      },
      {
        question: 'What should a contractor invoice include?',
        answer:
          'Unique invoice number, dates, bill-to, line items with quantity × rate, tax, amount already paid, balance due, payment instructions, and a reference to the estimate or PO when you have one.',
      },
      {
        question: 'Quote vs estimate vs invoice—which do I send?',
        answer:
          'Send a quote or estimate before work (see /tools/quote-estimate-generator/). Switch to this contractor invoice when you bill a deposit, progress draw, or completed work. A receipt confirms money already received.',
      },
      {
        question: 'Can I download a contractor invoice PDF?',
        answer:
          'Yes. Export PDF or DOCX from the live preview. Keep the PDF with the estimate so accounts payable can match line labels.',
      },
      {
        question: 'How does progress billing work on a contractor invoice?',
        answer:
          'Bill a percentage or completed-phase amount that matches your contract draws—e.g. after demo, rough-in, or substantial completion. Reference the estimate or PO and show prior payments so the balance due is obvious.',
      },
      {
        question: 'When should a contractor send an invoice?',
        answer:
          'Follow the payment schedule in your contract—deposit, progress, or final. Send promptly after each milestone so cash flow stays predictable.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: [
    'invoice-late-fee-calculator',
    'quote-estimate-generator',
    'construction-estimate-template',
    'receipt-generator',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-18',
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
  relatedSlugs: [
    'invoice-late-fee-calculator',
    'quote-estimate-generator',
    'receipt-generator',
    'catering-quote',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-13',
};

export const cateringQuote: ToolDefinition = {
  slug: 'catering-quote',
  name: 'Catering Quote Generator',
  shortName: 'Catering Quote',
  category: 'estimates-invoices',
  primaryKeyword: 'catering quote',
  secondaryKeywords: [
    'catering quote template',
    'catering quotation template',
    'catering estimate template',
    'event catering quote',
    'per guest catering quote',
  ],
  title: 'Catering Quote Template – Free Generator',
  metaDescription:
    'Build a catering quote with guest count, menu packages, service fees, and deposit terms. Live preview plus PDF/DOCX export in your browser.',
  h1: 'Free Catering Quote Template Generator',
  answerFirst:
    'A catering quote lists event date, guest count, menu, per-guest or package pricing, staff or delivery fees, service charge versus gratuity, tax, and deposit terms. Fill those fields here, preview live, and export PDF or DOCX in your browser. Deposit percents in the sample are a working pattern for that job, not an official rule.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Catering Quote',
  toolVersion: '1.1',
  formulaNote:
    'Per-guest or package lines use quantity × rate. Staff and fees are additional lines. Service fee % applies to the food subtotal in the sample math; tax and deposit % apply to the computed totals you configure.',
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
      'Enter caterer details, quote number, client, event date, venue, and guest count.',
      'Summarize the menu, service style, and dietary notes.',
      'Add per-guest or package lines, staff, delivery, service fee, tax, and deposit percent.',
      'Preview the totals, export PDF or DOCX, then file the quote with your event folder.',
    ],
    whatToInclude: [
      {
        heading: 'What to include on a catering quote',
        body: 'Name the event, date, service window, venue, and guaranteed guest count. State buffet versus plated (or stations), menu package, dietary accommodations, and who provides linens, dinnerware, and bar. Price food as per-guest or package lines, then add staff hours, delivery or setup, rentals, service charge versus gratuity, tax, overage rules, tasting policy, and deposit or cancellation notes.\n\nClients compare caterers on that package, not on a single per-guest number alone. After acceptance, pair the quote with a signed vendor agreement when cancellation and insurance language matter—start from /tools/event-wedding-vendor-contract/ and review /guides/wedding-vendor-contract-checklist/.',
      },
      {
        heading: 'Illustrative per-head pricing examples',
        body: 'The dollar figures below are illustrative working examples for teaching the math in this generator. They are not market surveys, official rates, or recommended prices. Set your own rates from labor, food cost, and margin.\n\nCorporate buffet lunch (illustrative): 60 guests × $28 per guest = $1,680 food. Add three staff for four hours at $45/hour = $540, plus $125 delivery. An 18% service fee on the food line and local tax on taxable items, then a 40% deposit on the grand total, match the sample defaults above.\n\nWedding plated dinner (illustrative): 120 guests × $65 per guest = $7,800 food. Children’s meals at a lower per-guest rate, cake-cutting as a flat add-on, and bar as a separate package keep the PDF readable. Put the final-count deadline and overage rate in Notes so the kitchen can scale.',
      },
      {
        heading: 'Sample catering quote layout',
        body: 'A readable sample quote usually has four blocks: event header (client, date, venue, guarantee), menu summary with dietary counts, priced lines (food, labor, delivery), and fees (service charge, tax, deposit). Keep service charge and gratuity on separate lines with short definitions.\n\nFor a longer walkthrough with a full corporate lunch quotation you can copy line by line, see /guides/catering-quotation-example/. Deposit timing patterns live in /guides/catering-quote-deposits/. When a deposit clears, issue a payment receipt from /tools/receipt-generator/ and keep the field list in /guides/what-to-include-on-a-receipt/.',
      },
      {
        heading: 'Service fee, tax, and deposit notes',
        body: 'Label administrative or service fees separately from voluntary gratuity, and apply tax only to taxable subtotals under local rules. Ask your accountant which lines are taxable. Deposit size is a working pattern for that job—state the percent, due date, and refund rule on the PDF rather than in a text thread.',
      },
    ],
    workedExample: {
      heading: 'Worked example: corporate lunch quote (illustrative)',
      body: 'Hearth & Table Catering issues quote CQ-226 for Alex Chen’s company autumn lunch on 12 Nov at Pier 56. Guest count 60. Menu: buffet herb chicken, roasted vegetables, grain salad, rolls, cookies; water and iced tea; six vegetarian and two gluten-free plated meals.\n\nIllustrative math (not a rate recommendation): food 60 × $28 = $1,680; staff 3 × 4 hrs × $45 = $540; delivery $125. Service fee 18% on the food line; tax at the local rate you confirm; deposit 40% of the grand total to hold the date, with final count due seven days prior. Enter the same lines in this generator, preview, and export. After the deposit clears, send a receipt from /tools/receipt-generator/.',
    },
    commonMistakes: [
      'Forgetting overtime staff rates for late events.',
      'Not locking a final guest-count deadline.',
      'Mixing service charge and gratuity on one unlabeled line.',
      'Leaving children’s meals, cake cutting, or bar packages off the PDF.',
    ],
    tips: [
      'Separate food, labor, and rentals so clients can trim scope cleanly.',
      'Store the accepted quote beside the signed vendor contract and deposit receipt.',
      'Re-quote after the validity window if food or labor costs change.',
    ],
    faq: [
      {
        question: 'Is a catering quote a contract?',
        answer:
          'Usually not until the client accepts and pays a deposit under clear terms. Convert accepted quotes into a catering or event agreement covering cancellation and force majeure—see /tools/event-wedding-vendor-contract/.',
      },
      {
        question: 'What deposit percentage should I put on a catering quote?',
        answer:
          'There is no official federal percentage. Many caterers use a working pattern such as 25–50% to reserve the date, with the balance due about 7–14 days before the event or on the final guest-count deadline. State the percentage, due dates, and refund rules on the quote. Deeper deposit language is in /guides/catering-quote-deposits/.',
      },
      {
        question: 'What is the difference between a service charge and gratuity?',
        answer:
          'A service charge is often a house fee that may go to the business; gratuity is typically a tip for staff. Label each clearly, say whether tax applies, and note if the service charge is in lieu of tipping.',
      },
      {
        question: 'When is the final headcount due?',
        answer:
          'A common working pattern is a guaranteed guest count 7–14 days before the event, with billing on that number (or actual attendance if higher). Put the deadline and overage rate on the quote so food and staffing can scale.',
      },
      {
        question: 'Should I use a catering quote or a full contract?',
        answer:
          'Use the quote to lock menu, pricing, and deposit math; use a signed catering or event contract for cancellation, force majeure, allergens, and venue rules. Couples comparing multiple vendors can run /guides/wedding-vendor-contract-checklist/ before paying.',
      },
      {
        question: 'How do I show per-guest pricing on a catering quote?',
        answer:
          'Add a line with unit “guest,” quantity equal to the guarantee, and your per-guest rate. Keep children’s meals, staff meals, and bar packages on separate lines so the client can trim without rewriting the whole PDF.',
      },
      {
        question: 'Where can I see a full sample catering quotation?',
        answer:
          'Open /guides/catering-quotation-example/ for a line-by-line corporate lunch sample, then recreate the fields in this generator and export PDF or DOCX.',
      },
      {
        question: 'What should I send after the client pays the catering deposit?',
        answer:
          'Issue a payment receipt from /tools/receipt-generator/ that references the quote number and deposit amount. Field checklist: /guides/what-to-include-on-a-receipt/.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['event-wedding-vendor-contract', 'receipt-generator', 'quote-estimate-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-15',
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
    'free instant quote',
    'construction quote generator',
  ],
  title: 'Free Quote & Estimate Generator',
  metaDescription:
    'Free quote generator and estimate template: line items, tax, validity date, live preview, PDF/DOCX. No signup. Works for services and light contractor quotes.',
  h1: 'Free Quote & Estimate Generator',
  answerFirst:
    'A free quote and estimate generator builds a priced document in your browser: parties, job description, line items, tax, total, and how long the price holds. Preview live for an instant quote PDF, then export DOCX if needed. Nothing is uploaded to a server.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Estimate',
  toolVersion: '1.2',
  formulaNote:
    'Each line is quantity × rate. Subtotal sums lines; tax = subtotal × (tax rate ÷ 100). Validity date is informational.',
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
      'Export PDF or DOCX for an instant quote the client can sign or reply to, or save a draft in this browser with localStorage.',
    ],
    whatToInclude: [
      {
        heading: 'What a free estimate generator should fill in',
        body: 'Parties, a measurable job description, line items with quantity × rate, tax if you collect it, a grand total, and a validity date. Switch the label to Quote when your industry expects that word—the math stays the same. Walk through the full process in /guides/how-to-write-a-business-estimate/.',
      },
      {
        heading: 'Free instant quote in the browser',
        body: 'This page is built for a free instant quote without signup: fill the form, watch the live preview update, and export PDF or DOCX before you leave the tab. Entries stay in your browser; optional drafts use localStorage on your device only.\n\nUse a short validity window when materials or labor rates move quickly. Number every quote and archive the PDF so you can compare what the client accepted later on the invoice.',
      },
      {
        heading: 'Construction quote generator (when to use this vs the trade template)',
        body: 'You can use this free estimate generator as a lightweight construction quote generator for punch-list work, small repairs, or a single-trade scope with clear units and rates. Label the document Quote, list labor and materials on separate lines, add tax and a valid-until date, and note exclusions in Notes.\n\nFor full remodel bids with allowances, alternate pricing, and change-order habits, use the dedicated construction estimate template at /tools/construction-estimate-template/ and the walkthrough in /guides/construction-estimate-that-wins-jobs/. That keeps deep construction intent on the construction URL and keeps this page focused on fast, general estimates.',
      },
      {
        heading: 'Industry variants that reuse the same form',
        body: 'Consulting and IT: fixed assessment day plus hourly documentation, as in the sample defaults. Landscaping or handyman: units such as sq ft, hour, or lump sum with a site-visit exclusion. Cleaning: flat visit plus add-on lines—when you bill after the visit, switch to /tools/cleaning-service-invoice/. Catering events belong in /tools/catering-quote/ so guest count and service fee fields stay filled.\n\nQuote vs estimate wording: quotes are often firmer offers; estimates signal approximate cost. Say whether totals may change after discovery. After acceptance, reuse lines in /tools/contractor-invoice/ and send a payment receipt from /tools/receipt-generator/.',
      },
    ],
    workedExample: {
      heading: 'Worked example: free instant quote',
      body: 'Sample estimate E-901 prices a half-day assessment at $450 plus four hours of documentation at $95/hr for an $830 pre-tax total, valid 14 days. Change the label to Quote for a free instant quote PDF the client can approve by email.\n\nIllustrative light construction variant (not a rate recommendation): fence repair with 16 linear feet of board replacement at your unit rate, two hours labor, haul-away as a lump sum, tax if you collect it, and a seven-day validity window. For multi-room remodel packages with allowances, switch to /tools/construction-estimate-template/.',
    },
    commonMistakes: [
      'No validity date',
      'Scope that cannot be measured',
      'Mixing catering or full remodel fields into a general estimate instead of the niche tool',
    ],
    tips: [
      'Number every estimate and archive the exported file.',
      'Reuse accepted lines in the free invoice generator for contractors at /tools/contractor-invoice/.',
      'When the client pays a deposit, issue a payment receipt from /tools/receipt-generator/.',
      'For full remodel bids with allowances, switch to the construction estimate template at /tools/construction-estimate-template/.',
    ],
    faq: [
      {
        question: 'What should I include in a quote or estimate?',
        answer:
          'Parties, a measurable job description, line items with quantity × rate, tax if you collect it, a grand total, and a valid-until date. Say whether prices can change after discovery. Full walkthrough: /guides/how-to-write-a-business-estimate/.',
      },
      {
        question: 'What is the difference between a quote, estimate, and invoice?',
        answer:
          'Quotes and estimates propose price before work; quotes are often firmer. An invoice requests payment after acceptance or completed work—reuse lines in /tools/contractor-invoice/. See /guides/invoice-vs-estimate/.',
      },
      {
        question: 'Is this free quote generator really free with no signup?',
        answer:
          'Yes. Fill the form, preview live, and export PDF or DOCX with no account. Optional drafts use localStorage on your device only; nothing is uploaded to a server.',
      },
      {
        question: 'Can I download a quote or estimate as a PDF?',
        answer:
          'Yes. Export PDF or DOCX from the live preview for an instant quote you can email the same day. Archive the PDF so the later invoice matches what the client accepted.',
      },
      {
        question: 'Can I turn this quote into an invoice later?',
        answer:
          'Yes—reuse the same line items in the free invoice generator for contractors at /tools/contractor-invoice/, or confirm payment with /tools/receipt-generator/.',
      },
      {
        question: 'Can I use this as a contractor estimate generator?',
        answer:
          'Yes for light or single-trade scopes with clear units. For full remodel bids with allowances and change-order workflows, use /tools/construction-estimate-template/.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'construction-estimate-template', 'receipt-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-18',
};

export const receiptGenerator: ToolDefinition = {
  slug: 'receipt-generator',
  name: 'Receipt Generator',
  shortName: 'Receipt',
  category: 'estimates-invoices',
  primaryKeyword: 'receipt generator',
  secondaryKeywords: [
    'free receipt maker',
    'payment receipt template',
    'how to write a receipt of payment',
    'service receipt PDF',
    'PDF receipt generator',
  ],
  title: 'Free Receipt Generator – Payment PDF',
  metaDescription:
    'Free receipt generator for cash, card, or transfer payments. Itemize charges, show amount paid and balance, then download PDF or DOCX—no signup.',
  h1: 'Free Receipt Generator',
  answerFirst:
    'A payment receipt confirms who paid whom, when, how much, for what, and by which method. Generate a clean receipt here, preview it live, and download PDF or DOCX without sending data to a server. Pair it with the field checklist in the payment receipt guide.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Receipt',
  toolVersion: '1.2',
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
        body: 'Show who paid whom, the date, a unique receipt number, the amount, the payment method, and what it covers. If the payment pays an invoice, fill Invoice / reference # so both documents link. Example: $1,200 by card toward invoice 1047, tax shown on the invoice lines, balance remaining if anything is still owed.\n\nKeep a PDF copy with your income records. The IRS lists receipts and receipt books among supporting documents for gross receipts. For the longer field-by-field walkthrough, see /guides/what-to-include-on-a-receipt/.',
      },
      {
        heading: 'How to fill out a receipt of payment in this form',
        body: 'Use Business name and Received from for the parties. Receipt # and Date identify the payment event. Invoice / reference # points at the prior bill or estimate. Items describe what was paid for. Amount paid is cash received; Balance remaining is what is still due after this payment (use 0 and “paid in full” in Notes when the job is settled).',
      },
      {
        heading: 'Deposits from estimates, invoices, and catering quotes',
        body: 'When a client pays a deposit on an accepted estimate from /tools/quote-estimate-generator/ or a contractor invoice from /tools/contractor-invoice/, put the quote or invoice number in Invoice / reference # and the still-owed balance in Balance remaining.\n\nCatering deposits from /tools/catering-quote/ should reference the catering quote number the same way. Wedding planners comparing vendor PDFs can keep deposit receipts beside contracts using /guides/wedding-vendor-contract-checklist/.',
      },
      {
        heading: 'Partial payments and paid-in-full',
        body: 'When the payer covers only a deposit, put cash received in Amount paid and the still-owed figure in Balance remaining (and say so in Notes). When settled, set balance remaining to 0 so the PDF stands alone as proof of payment. Issue the receipt the same day money clears so client expense reports match the bank date.',
      },
    ],
    workedExample: {
      heading: 'Worked example: how to fill out a receipt of payment',
      body: 'Northwind issues receipt RCPT-551 to Taylor Brooks for $800 by card against Invoice / reference # INV-1042 (October consulting retainer). Line items total $800, tax 0%, amount paid $800, balance remaining $0, notes “Paid in full toward invoice INV-1042.” Export the PDF and file it with the invoice.\n\nFor a $2,000 job with a $500 deposit, amount paid would be $500 and balance remaining $1,500 with the same invoice reference. After the final payment, issue a second receipt (or a paid-in-full note) so both payments have serial numbers. More examples: /guides/what-to-include-on-a-receipt/.',
    },
    commonMistakes: [
      'No receipt number',
      'Amount paid not matching line totals without explanation',
      'Missing invoice reference when the payment is against a prior bill',
      'Omitting remaining balance on partial deposits',
    ],
    tips: [
      'Keep PDF copies for bookkeeping alongside bank deposits.',
      'Link deposits to the free quote generator at /tools/quote-estimate-generator/ or the free invoice generator for contractors at /tools/contractor-invoice/.',
      'Read the companion guide at /guides/what-to-include-on-a-receipt/ before you train staff on defaults.',
    ],
    faq: [
      {
        question: 'What should a payment receipt include?',
        answer:
          'Unique receipt number, date, business name, payer name, description of goods or services, amount paid, payment method, tax if shown, invoice reference when applicable, and remaining balance if the payment was partial. Full checklist: /guides/what-to-include-on-a-receipt/.',
      },
      {
        question: 'Is this receipt generator free with no signup?',
        answer:
          'Yes. Build the receipt in your browser, preview live, and download PDF or DOCX with no account. Optional drafts stay in localStorage on your device.',
      },
      {
        question: 'Can I download a PDF payment receipt?',
        answer:
          'Yes. Export PDF or DOCX from the live preview and file it with the related invoice. The IRS lists receipts among supporting documents for gross receipts.',
      },
      {
        question: 'How is a receipt different from an invoice or estimate?',
        answer:
          'An estimate or quote proposes price; an invoice requests payment; a receipt confirms money was received. Price with /tools/quote-estimate-generator/, bill with /tools/contractor-invoice/, then receipt here.',
      },
      {
        question: 'How do I generate a receipt of payment?',
        answer:
          'Enter your business name, the payer, a unique receipt number, the date, what was paid for, amount paid, and payment method. Add an invoice reference when the payment applies to a prior bill. Preview, then export PDF.',
      },
      {
        question: 'Should wedding or catering deposits get a receipt?',
        answer:
          'Yes. Reference the catering quote or vendor contract number, state whether the deposit is refundable, and keep the PDF with the signed agreement. Build the catering PDF in /tools/catering-quote/.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: [
    'contractor-invoice',
    'invoice-late-fee-calculator',
    'quote-estimate-generator',
    'catering-quote',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-18',
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

export const invoiceLateFeeCalculator: ToolDefinition = {
  slug: 'invoice-late-fee-calculator',
  name: 'Invoice Late Fee Calculator',
  shortName: 'Late Fee Calculator',
  category: 'estimates-invoices',
  primaryKeyword: 'invoice late fee calculator',
  secondaryKeywords: [
    'late fee calculator invoice',
    'invoice overdue fee',
    'late payment fee calculator',
    'invoice interest calculator',
  ],
  title: 'Invoice Late Fee Calculator',
  metaDescription:
    'Calculate invoice late fees from amount, due date, payment date, and flat, monthly %, or daily annual rate—with grace days, copy-ready wording, and PDF export.',
  h1: 'Invoice Late Fee Calculator',
  answerFirst:
    'Enter the unpaid amount, due date, payment date (or today), fee type, and optional grace days. Get days late, the fee, the new total, and copy-ready reminder wording. Caps vary by state and country—this is math, not legal advice.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Late Fee Calculation',
  toolVersion: '1.0',
  formulaNote:
    'Days past due = calendar days from due date to payment date. Chargeable days = max(0, days past due − grace). Flat fee applies once when chargeable days > 0. Monthly % = amount × (rate ÷ 100) × (chargeable days ÷ 30). Annual daily = amount × (annual % ÷ 100 ÷ 365) × chargeable days. Results round to cents.',
  fields: [
    { id: 'companyName', label: 'Your business name', type: 'text', section: 'Parties' },
    { id: 'clientName', label: 'Client name', type: 'text', section: 'Parties' },
    { id: 'invoiceNumber', label: 'Invoice #', type: 'text', section: 'Invoice' },
    {
      id: 'invoiceAmount',
      label: 'Invoice amount due',
      type: 'currency',
      inputMode: 'decimal',
      required: true,
      min: 0,
      section: 'Invoice',
      help: 'Unpaid balance before any late fee.',
    },
    {
      id: 'invoiceDueDate',
      label: 'Due date',
      type: 'date',
      required: true,
      section: 'Invoice',
    },
    {
      id: 'paymentDate',
      label: 'Payment date (or today)',
      type: 'date',
      required: true,
      section: 'Invoice',
      help: 'Use today’s date to see what is owed if they paid right now.',
    },
    {
      id: 'gracePeriodDays',
      label: 'Grace period (days)',
      type: 'number',
      inputMode: 'numeric',
      min: 0,
      max: 365,
      step: 1,
      section: 'Fee terms',
      help: 'Days after the due date before a fee starts. 0 means fees start the day after due.',
    },
    {
      id: 'feeType',
      label: 'Fee type',
      type: 'select',
      required: true,
      section: 'Fee terms',
      options: [
        { value: 'flat', label: 'Flat fee' },
        { value: 'monthly_percent', label: '% per month (prorated)' },
        { value: 'annual_daily', label: 'Annual rate → daily' },
      ],
    },
    {
      id: 'flatFeeAmount',
      label: 'Flat fee amount',
      type: 'currency',
      inputMode: 'decimal',
      min: 0,
      section: 'Fee terms',
      help: 'Used when fee type is Flat fee.',
    },
    {
      id: 'monthlyPercent',
      label: 'Monthly rate (%)',
      type: 'number',
      inputMode: 'decimal',
      min: 0,
      max: 100,
      step: 0.01,
      section: 'Fee terms',
      help: 'Used when fee type is % per month. Prorated by chargeable days ÷ 30.',
    },
    {
      id: 'annualPercent',
      label: 'Annual rate (%)',
      type: 'number',
      inputMode: 'decimal',
      min: 0,
      max: 100,
      step: 0.01,
      section: 'Fee terms',
      help: 'Used when fee type is Annual rate → daily (÷ 365 × chargeable days).',
    },
    {
      id: 'notes',
      label: 'Internal notes',
      type: 'textarea',
      rows: 2,
      section: 'Notes',
      help: 'Optional—stays on the exported summary for your file.',
    },
  ],
  defaults: {
    companyName: 'Summit Build Co.',
    clientName: 'Jordan Lee',
    invoiceNumber: 'INV-2026-088',
    invoiceAmount: 4250,
    invoiceDueDate: '2026-10-01',
    paymentDate: '2026-11-13',
    gracePeriodDays: 5,
    feeType: 'monthly_percent',
    flatFeeAmount: 50,
    monthlyPercent: 1.5,
    annualPercent: 18,
    notes: 'Sample only—confirm the fee matches the signed terms before you bill it.',
  },
  content: {
    howToUse: [
      'Enter the unpaid invoice amount, due date, and payment date (or today’s date).',
      'Set any grace period your contract allows, then pick flat fee, monthly %, or annual→daily.',
      'Fill the matching rate or flat amount; leave unused rate fields alone.',
      'Copy the suggested late-fee line or reminder from the preview, or export PDF/DOCX for your file.',
    ],
    whatToInclude: [
      {
        heading: 'What this calculator outputs',
        body: 'You get calendar days past due, chargeable days after grace, the fee in dollars, and the new total (original amount + fee). The preview also drafts a one-line late-fee charge and a short payment reminder you can paste into email or onto a revised invoice from /tools/contractor-invoice/ or /tools/cleaning-service-invoice/.',
      },
      {
        heading: 'Pick a fee method that matches your contract',
        body: 'Flat fees are simple—“$50 after net 15”—and easy for clients to understand. A monthly percent fits many service agreements; this tool prorates by chargeable days ÷ 30 so a partial month is not billed as a full month. An annual rate converted daily suits interest-style clauses: annual % ÷ 100 ÷ 365 × chargeable days. Use the same method that already appears in your signed terms; do not invent a harsher rule after the fact.',
      },
      {
        heading: 'Grace periods and legal caps',
        body: 'A grace period is calendar days after the due date before chargeable days start. Caps, notice rules, and whether late fees are enforceable vary by state and country—and consumer jobs can differ from B2B. This page does arithmetic only. It is not legal or tax advice. If you are unsure whether your rate is allowed, ask a licensed attorney or accountant where you operate before you send the reminder.',
      },
    ],
    workedExample: {
      heading: 'Worked example: 1.5% per month after a 5-day grace',
      body: 'INV-2026-088 still shows $4,250 due. Due date 2026-10-01; payment date 2026-11-13 = 43 days past due. With a 5-day grace, chargeable days = 38. At 1.5% per month prorated: $4,250 × 0.015 × (38 ÷ 30) = $80.75. New total = $4,330.75. Paste the preview’s late-fee line onto a revised contractor invoice, or send the reminder text first and keep the receipt tool ready when payment clears.',
    },
    commonMistakes: [
      'Charging a fee that was never in the estimate, contract, or invoice terms.',
      'Counting grace days wrong—or applying a full month when your terms say prorate.',
      'Skipping the original invoice number so AP cannot match the balance.',
      'Treating this calculator’s output as a legal opinion on usury or consumer-credit caps.',
    ],
    tips: [
      'Put the late-fee rule on the original invoice so the reminder is not a surprise.',
      'After they pay, issue a receipt from /tools/receipt-generator/ that references the same invoice number.',
      'Keep the calculation PDF with the invoice in your records—IRS guidance expects documents that support gross receipts.',
    ],
    faq: [
      {
        question: 'How do you calculate an invoice late fee?',
        answer:
          'Measure calendar days from the due date to the payment date (or today). Subtract any grace days. Then apply your agreed method: a flat dollar amount, a monthly percent prorated by chargeable days ÷ 30, or an annual percent converted to a daily rate × chargeable days. This tool does that math and rounds to cents.',
      },
      {
        question: 'What is a grace period on an overdue invoice?',
        answer:
          'Grace is the number of days after the due date before a late fee starts. If the due date was the 1st and grace is 5, chargeable days begin on the 7th. Set grace to 0 if your terms start fees the day after due.',
      },
      {
        question: 'Flat fee vs monthly percent vs annual daily—which should I use?',
        answer:
          'Use whatever your signed terms already say. Flat fees are predictable. Monthly percent scales with the balance and, here, prorates partial months. Annual→daily mirrors interest-style wording. Switching methods after the invoice went out invites disputes.',
      },
      {
        question: 'Are late fees legal? What caps apply?',
        answer:
          'It depends on where you and the client are, the contract language, and whether the job is consumer or commercial. Some places cap fees or require clear disclosure. This calculator does not check caps and is not legal advice—confirm local rules before you bill a fee.',
      },
      {
        question: 'Can I add the fee to my contractor or cleaning invoice?',
        answer:
          'Yes. Copy the suggested late-fee line into notes or as its own line item on /tools/contractor-invoice/ or /tools/cleaning-service-invoice/, keep the same invoice number (or issue a clearly labeled revision), and export a fresh PDF.',
      },
      {
        question: 'Does this store my client data?',
        answer:
          'No. Calculation, preview, and export run in your browser. Optional drafts use localStorage on your device only.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'cleaning-service-invoice', 'receipt-generator'],
  publishedAt: '2026-11-19',
  updatedAt: '2026-11-19',
};
