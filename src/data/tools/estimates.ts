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
    'contractor estimate form',
    'building estimate template PDF',
  ],
  title: 'Free Construction Estimate Template (PDF)',
  metaDescription:
    'Fill a free construction estimate template with line items, labor, materials and tax, preview it live, then download a PDF or Word file. No signup required.',
  h1: 'Free Construction Estimate Template',
  answerFirst:
    'A construction estimate template lists project scope, labor and material line items, allowances, tax, and a total so a contractor can present pricing before work starts. Use this free generator to fill those fields in your browser, preview the estimate, and export PDF or DOCX—nothing is uploaded.',
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
        heading: 'What every construction estimate should include',
        body: 'A clear estimate names the parties, job address, date and validity window, numbered line items (labor vs materials where helpful), tax, deposit terms, and written exclusions. Ambiguous “lump sum” lines without scope invite disputes—tie each line to work you described above.',
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
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'work-order', 'quote-estimate-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
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
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['construction-estimate-template', 'receipt-generator', 'work-order'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
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
  documentTitle: 'Cleaning Service Document',
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
    docType: 'Estimate',
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
    tips: ['Offer first-clean deep-clean pricing separately from maintenance cleans.'],
    faq: [
      {
        question: 'Should cleaning estimates include supplies?',
        answer:
          'State whether pricing includes supplies or if the client provides preferred products. Call out eco-friendly product upcharges.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['quote-estimate-generator', 'receipt-generator', 'catering-quote'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const cateringQuote: ToolDefinition = {
  slug: 'catering-quote',
  name: 'Catering Quote Generator',
  shortName: 'Catering Quote',
  category: 'estimates-invoices',
  primaryKeyword: 'catering quote',
  secondaryKeywords: ['catering estimate template', 'catering proposal PDF', 'event catering quote'],
  title: 'Catering Quote Template – Free Generator',
  metaDescription:
    'Build a catering quote with guest count, menu packages, service fees, and deposit terms. Live preview plus PDF/DOCX export in your browser.',
  h1: 'Free Catering Quote Generator',
  answerFirst:
    'A catering quote lists the event date, guest count, menu package, per-person or package pricing, service/staff fees, tax, gratuity, and deposit. Create one free with this generator, preview it live, and export PDF or DOCX privately in your browser.',
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
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['event-wedding-vendor-contract', 'quote-estimate-generator', 'cleaning-service-invoice'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const quoteEstimate: ToolDefinition = {
  slug: 'quote-estimate-generator',
  name: 'Quote / Estimate Generator',
  shortName: 'Quote / Estimate',
  category: 'estimates-invoices',
  primaryKeyword: 'quote estimate generator',
  secondaryKeywords: ['free estimate generator', 'business quote template', 'service estimate PDF'],
  title: 'Free Quote & Estimate Generator (PDF)',
  metaDescription:
    'Generate a professional service quote or estimate with line items, tax and a validity date. Live preview, then download PDF or DOCX—no signup.',
  h1: 'Free Quote & Estimate Template Generator',
  answerFirst:
    'A quote or estimate presents proposed pricing for goods or services: parties, description, line items, tax, total, and how long the price holds. This free generator builds that document in your browser with live preview and PDF/DOCX export.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Quote',
  toolVersion: '1.0',
  formulaNote:
    "Each line is quantity × rate. Subtotal sums lines; tax = subtotal × (tax rate ÷ 100). Validity date is informational.",
  fields: [
    { id: 'docLabel', label: 'Label', type: 'select', section: 'Document', options: [
      { value: 'Quote', label: 'Quote' },
      { value: 'Estimate', label: 'Estimate' },
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
    docLabel: 'Quote',
    companyName: 'Northwind Services',
    companyEmail: 'hello@northwind.example',
    companyPhone: '(312) 555-0108',
    docNumber: 'Q-901',
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
      'Pick Quote, Estimate, or Proposal.',
      'Describe the job and add priced lines.',
      'Set validity and export.',
    ],
    whatToInclude: [
      {
        heading: 'Quote vs estimate',
        body: 'Quotes are often firmer offers; estimates signal approximate cost. Label the document the way your industry expects and say whether totals may change after discovery.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'Sample quote Q-901 prices a half-day assessment at $450 plus four hours of documentation at $95/hr for a $830 pre-tax total, valid 14 days.',
    },
    commonMistakes: ['No validity date', 'Scope that cannot be measured'],
    tips: ['Number every quote and archive the exported file.'],
    faq: [
      {
        question: 'Can I turn this quote into an invoice later?',
        answer:
          'Yes—reuse the same line items in the contractor invoice or receipt tools once work is accepted or paid.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['construction-estimate-template', 'contractor-invoice', 'receipt-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const receiptGenerator: ToolDefinition = {
  slug: 'receipt-generator',
  name: 'Receipt Generator',
  shortName: 'Receipt',
  category: 'estimates-invoices',
  primaryKeyword: 'receipt generator',
  secondaryKeywords: ['free receipt maker', 'payment receipt template', 'service receipt PDF'],
  title: 'Receipt Generator – Free Payment Receipt PDF',
  metaDescription:
    'Create a payment receipt online for cash, card, or transfer. Itemize charges, show amount paid, export PDF/DOCX. Runs entirely in your browser.',
  h1: 'Free Receipt Generator',
  answerFirst:
    'A payment receipt confirms who paid whom, when, how much, for what, and by which method. Generate a clean receipt here, preview it live, and download PDF or DOCX without sending data to a server.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Receipt',
  toolVersion: '1.0',
  formulaNote:
    "Amount received is what you enter; line items (if any) should match that total for your records.",
  fields: [
    { id: 'companyName', label: 'Business name', type: 'text', required: true, section: 'Business' },
    { id: 'companyAddress', label: 'Address', type: 'textarea', rows: 2, section: 'Business' },
    { id: 'receiptNumber', label: 'Receipt #', type: 'text', required: true, section: 'Receipt' },
    { id: 'receiptDate', label: 'Date', type: 'date', required: true, section: 'Receipt' },
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
    { id: 'notes', label: 'Notes', type: 'textarea', rows: 2, section: 'Notes' },
  ],
  defaults: {
    companyName: 'Northwind Services',
    companyAddress: '200 W Madison, Chicago, IL 60606',
    receiptNumber: 'RCPT-551',
    receiptDate: '2026-10-19',
    clientName: 'Taylor Brooks',
    paymentMethod: 'Card',
    lineItems: [
      { description: 'Consulting – October retainer', quantity: 1, unit: 'mo', rate: 800 },
    ],
    taxRate: 0,
    amountPaid: 800,
    notes: 'Paid in full. Thank you.',
  },
  content: {
    howToUse: [
      'Enter business and payer details.',
      'Itemize what was purchased or paid for.',
      'Confirm amount paid and method; export.',
    ],
    whatToInclude: [
      {
        heading: 'Receipt fields that matter',
        body: 'Unique receipt number, date, payer name, description of goods/services, tax if applicable, amount paid, method, and remaining balance if partial.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'Receipt RCPT-551 records an $800 card payment for an October consulting retainer, marked paid in full.',
    },
    commonMistakes: ['No receipt number', 'Amount paid not matching line totals without explanation'],
    tips: ['Keep PDF copies for bookkeeping alongside bank deposits.'],
    faq: [
      {
        question: 'Is this a tax invoice?',
        answer:
          'Receipts prove payment. Some regions require formal tax invoices with registration numbers—add those fields in Notes if your locality requires them.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['contractor-invoice', 'quote-estimate-generator', 'work-order'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
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
    ],
    sources: estimateSources,
  },
  relatedSlugs: ['construction-estimate-template', 'contractor-invoice', 'receipt-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};
