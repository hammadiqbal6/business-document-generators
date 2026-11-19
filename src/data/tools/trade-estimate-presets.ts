import type { ToolDefinition } from './types';
import { estimateSources } from './shared-sources';

/**
 * Trade-specific estimate landing pages that reuse the commercial estimate
 * field shape (parties, scope, line items, tax, deposit). Intentionally
 * separate from estimates.ts so parallel edits to the core estimate tools
 * stay easy to merge.
 */

const estimateFieldShell: ToolDefinition['fields'] = [
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
];

export const roofingEstimate: ToolDefinition = {
  slug: 'roofing-estimate-template',
  name: 'Roofing Estimate Template',
  shortName: 'Roofing Estimate',
  category: 'estimates-invoices',
  primaryKeyword: 'roofing estimate template',
  secondaryKeywords: [
    'roofing estimate form',
    'roof replacement estimate PDF',
    'asphalt shingle estimate',
    'roof tear-off quote',
  ],
  title: 'Free Roofing Estimate Template',
  metaDescription:
    'Roofing estimate template with squares, tear-off, underlayment, flashing, and disposal lines. Live preview; export PDF or DOCX in your browser—no signup.',
  h1: 'Free Roofing Estimate Template',
  answerFirst:
    'A roofing estimate prices the roof in measurable units—usually squares (100 sq ft)—with tear-off, underlayment, flashing, disposal, and labor called out as separate lines. Fill those fields here, preview the total with tax and deposit, then export PDF or DOCX. Nothing leaves your browser.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Roofing Estimate',
  toolVersion: '1.0',
  formulaNote:
    'Line-item amount = quantity × rate. Subtotal = sum of line amounts. Tax = subtotal × (tax rate ÷ 100). Deposit = total × (deposit % ÷ 100). Sample square counts and rates are working examples for the math, not market surveys.',
  fields: estimateFieldShell,
  defaults: {
    companyName: 'Ridge Line Roofing',
    companyAddress: '410 Commerce Dr\nFort Collins, CO 80524',
    companyPhone: '(970) 555-0164',
    companyEmail: 'bids@ridgelineroofing.example',
    estimateNumber: 'RF-2026-041',
    estimateDate: '2026-11-19',
    validUntil: '2026-12-03',
    clientName: 'Morgan Ellis',
    clientAddress: '19 Willow Court, Fort Collins, CO 80525',
    projectName: 'Asphalt shingle reroof – main house',
    scope:
      'Tear off existing 3-tab asphalt to deck; inspect decking and replace damaged sheets as a separate change order if needed; install synthetic underlayment; install architectural shingles on the main roof (22 measured squares including waste); replace step and pipe flashing at the chimney and two plumbing vents; haul debris in a roll-off. Excludes garage, skylight glass, and gutter replacement.',
    lineItems: [
      { description: 'Tear-off existing asphalt (labor)', quantity: 22, unit: 'sq', rate: 45 },
      { description: 'Architectural shingles (materials)', quantity: 22, unit: 'sq', rate: 125 },
      { description: 'Shingle install labor', quantity: 22, unit: 'sq', rate: 95 },
      { description: 'Synthetic underlayment', quantity: 22, unit: 'sq', rate: 28 },
      { description: 'Step & pipe flashing', quantity: 1, unit: 'ls', rate: 480 },
      { description: 'Dumpster / disposal', quantity: 1, unit: 'ls', rate: 450 },
    ],
    taxRate: 7.4,
    depositPercent: 30,
    notes:
      'Price holds 14 days. Decking repair billed only after photo log and signed change order. Ice-and-water shield in valleys included in underlayment line. Permit fees not included—owner or GC pulls permit.',
  },
  content: {
    howToUse: [
      'Enter your company and client details, then name the roof section (main house, garage, addition).',
      'Write a scope that states tear-off depth, underlayment type, shingle product, and flashing locations.',
      'Price squares for tear-off, materials, and install; add flashing and disposal as lump-sum or unit lines.',
      'Set tax and deposit, preview the total, then export PDF or DOCX.',
    ],
    whatToInclude: [
      {
        heading: 'What belongs on a roofing estimate',
        body: 'Start with the job address and which roof planes you measured. Roofers talk in squares—one square is 100 square feet of roof area—so put the measured square count (and waste factor you already baked in) on the PDF. Separate tear-off from new materials. Call out underlayment, ice-and-water shield if you use it in valleys or eaves, flashing at walls and penetrations, ridge vent or ridge cap, and disposal.\n\nIf decking might be soft, say you will photo the deck after tear-off and only replace sheets on a signed change order. That keeps the base bid honest without stuffing a huge contingency the homeowner cannot read. For multi-trade remodel packages that include a roof plus interiors, switch to /tools/construction-estimate-template/. Light single-trade punch work can stay on /tools/quote-estimate-generator/.',
      },
      {
        heading: 'Squares, tear-off, flashing, and disposal',
        body: 'I price tear-off and install on the same square count so the client sees labor move with area. Materials ride a second square line at your material rate. Flashing is rarely “per square”—chimney step flashing and a couple of pipe boots usually land as a lump sum once you walk the roof. Disposal is either a dumpster line or a haul fee; leave it blank and the cheap bid that forgot trash looks better on paper until the dumpster shows up.\n\nSample rates in the form are for teaching the math. Swap them for your supplier quote and crew production before you send the PDF.',
      },
    ],
    workedExample: {
      heading: 'Worked example: 22-square asphalt reroof',
      body: 'Estimate RF-2026-041 prices Morgan Ellis’s main-house reroof at 22 squares. Illustrative math (not a rate recommendation): tear-off 22 × $45 = $990; shingles 22 × $125 = $2,750; install labor 22 × $95 = $2,090; underlayment 22 × $28 = $616; flashing $480; dumpster $450. Subtotal $7,376. Tax at 7.4% is about $545.82; grand total about $7,921.82; 30% deposit about $2,376.55.\n\nChange any square count or rate and the preview recalculates. After acceptance, bill the deposit with /tools/contractor-invoice/ and keep the same square labels so draws match the bid.',
    },
    commonMistakes: [
      'One lump “roof replacement” line with no square count—clients cannot compare bids.',
      'Forgetting disposal or permit language so extras appear as surprises mid-job.',
      'Pricing tear-off for one layer when the roof has two, without a second-layer note.',
      'No validity window while asphalt and underlayment prices move.',
    ],
    tips: [
      'Photograph penetrations and soft spots before you quote; note them in scope.',
      'Keep ice-and-water and ridge details in the scope even when they sit inside a materials line.',
      'If scope grows after tear-off, use /tools/change-order-template/ before ordering extra decking.',
      'Reuse accepted lines on /tools/contractor-invoice/ for the deposit and final draw.',
    ],
    faq: [
      {
        question: 'What is a roofing square on an estimate?',
        answer:
          'One square equals 100 square feet of roof area. Most asphalt bids price tear-off, materials, and install per square so area changes scale cleanly. State whether your square count already includes waste.',
      },
      {
        question: 'Should tear-off and disposal be separate lines?',
        answer:
          'Yes when you can. Separate tear-off labor, disposal, and new materials so the client sees what they pay for haul-off versus product. Hidden dumpster fees are a common complaint after signing.',
      },
      {
        question: 'How do I show flashing and underlayment?',
        answer:
          'Underlayment usually follows the same square count as the field. Flashing at chimneys, sidewalls, and pipes is often a lump sum after a roof walk. Name the penetrations in the scope so the lump sum is not a mystery.',
      },
      {
        question: 'Is this a free roofing estimate template with PDF export?',
        answer:
          'Yes. Fill the form in your browser, preview live, and download PDF or DOCX with no account. Drafts can stay in localStorage on your device only.',
      },
      {
        question: 'When should I use the construction estimate instead?',
        answer:
          'Use /tools/construction-estimate-template/ for remodel packages with allowances across trades. Stay on this roofing page for a dedicated roof bid. For a quick mixed-service quote, use /tools/quote-estimate-generator/.',
      },
      {
        question: 'How long should a roofing estimate stay valid?',
        answer:
          'Many crews use 7–14 days when shingle and underlayment pricing is volatile, or up to 30 days on calmer supply weeks. Put the date on the PDF; do not rely on a text thread.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: [
    'construction-estimate-template',
    'painting-estimate-template',
    'change-order-template',
    'contractor-invoice',
  ],
  publishedAt: '2026-11-19',
  updatedAt: '2026-11-19',
};

export const paintingEstimate: ToolDefinition = {
  slug: 'painting-estimate-template',
  name: 'Painting Estimate Template',
  shortName: 'Painting Estimate',
  category: 'estimates-invoices',
  primaryKeyword: 'painting estimate template',
  secondaryKeywords: [
    'painting estimate form',
    'house painting quote template',
    'interior painting estimate PDF',
    'painter bid template',
  ],
  title: 'Free Painting Estimate Template',
  metaDescription:
    'Painting estimate template with rooms or sq ft, coats, prep, and materials vs labor lines. Live preview; export PDF or DOCX—no signup.',
  h1: 'Free Painting Estimate Template',
  answerFirst:
    'A painting estimate breaks the job into measurable paint areas or rooms, lists prep and coats, and separates materials from labor so the client can see what drives the price. Build that document here, preview tax and deposit, then export PDF or DOCX in your browser.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Painting Estimate',
  toolVersion: '1.0',
  formulaNote:
    'Line-item amount = quantity × rate. Subtotal = sum of lines. Tax = subtotal × (tax rate ÷ 100). Deposit = total × (deposit % ÷ 100). Sample gallons, hours, and sq-ft rates are working examples for the math, not recommended market prices.',
  fields: estimateFieldShell,
  defaults: {
    companyName: 'Clear Coat Painting',
    companyAddress: '88 Binder St\nMadison, WI 53704',
    companyPhone: '(608) 555-0191',
    companyEmail: 'estimates@clearcoatpainting.example',
    estimateNumber: 'PT-2026-118',
    estimateDate: '2026-11-19',
    validUntil: '2026-12-10',
    clientName: 'Sam Rivera',
    clientAddress: '742 Oakridge Rd, Madison, WI 53711',
    projectName: 'Interior repaint – living, hall, two bedrooms',
    scope:
      'Prep and paint living room, hallway, and two bedrooms (walls only). Includes patching nail pops under 2 in, caulk at trim, light sanding, and full mask of floors and fixed cabinets. Two coats of owner-selected interior latex over primer on repaired spots. Trim and doors are a separate line. Excludes ceilings, wallpaper removal, and exterior work.',
    lineItems: [
      { description: 'Prep, patch, mask (labor)', quantity: 18, unit: 'hr', rate: 55 },
      { description: 'Primer (materials)', quantity: 4, unit: 'gal', rate: 32 },
      { description: 'Interior latex walls (materials)', quantity: 6, unit: 'gal', rate: 48 },
      { description: 'Wall paint labor – 2 coats (850 sq ft)', quantity: 850, unit: 'sq ft', rate: 1.15 },
      { description: 'Bedroom accent wall (room package alt.)', quantity: 1, unit: 'room', rate: 175 },
      { description: 'Trim & doors (labor)', quantity: 12, unit: 'hr', rate: 60 },
    ],
    taxRate: 5.5,
    depositPercent: 25,
    notes:
      'Owner supplies color chips by 2026-11-26. Accent wall is a room-unit example beside sq-ft wall labor—delete it if that surface is already in the 850 sq ft. Move-out cleaning and furniture shifting not included unless added as a line.',
  },
  content: {
    howToUse: [
      'Fill company and client fields, then name the rooms or exterior elevations in the project title.',
      'Describe prep level, coat count, and whether ceilings or trim are included.',
      'Add materials and labor on separate lines—use sq ft, rooms, hours, or gallons as units.',
      'Set tax and deposit, check the live preview, and export PDF or DOCX.',
    ],
    whatToInclude: [
      {
        heading: 'Rooms, square footage, and coats',
        body: 'Pick units your client already understands. Room packages work for similar-size bedrooms; wall square footage works when room sizes vary or the client already measured. Say how many coats you price—one coat over a similar color is a different job than two coats over a dark-to-light change.\n\nWrite prep in plain language: how big a hole you patch in the base bid, whether you sand glossy enamel, and what you mask. If the living room has heavy nicotine stain, call that out and price stain-blocking primer instead of burying it in a “paint walls” lump.',
      },
      {
        heading: 'Materials vs labor on the PDF',
        body: 'Split gallons and labor. Clients who want to buy their own paint can see the materials lines drop; you keep the labor and prep. I still list primer gallons even on owner-supplied paint jobs when I insist on a product that sticks—otherwise people show up with bargain flat and blame adhesion on the crew.\n\nThe sample mixes sq-ft wall labor with one room-package accent wall so you can see both units. Drop the room line if that wall sits inside your sq-ft total. For full remodel bids that mix paint with cabinets or flooring, use /tools/construction-estimate-template/. For a quick service quote without paint-specific units, use /tools/quote-estimate-generator/.',
      },
    ],
    workedExample: {
      heading: 'Worked example: interior living + bedrooms',
      body: 'Estimate PT-2026-118 covers Sam Rivera’s living room, hall, and two bedrooms. Illustrative math: prep 18 hrs × $55 = $990; primer 4 × $32 = $128; wall paint 6 × $48 = $288; wall labor 850 sq ft × $1.15 = $977.50; accent room package $175; trim labor 12 × $60 = $720. Subtotal $3,278.50. Tax at 5.5% is about $180.32; total about $3,458.82; 25% deposit about $864.71.\n\nSwap the sq-ft labor line for per-room packages if that is how you sell. After the client accepts, bill the deposit on /tools/contractor-invoice/ with the same room names.',
    },
    commonMistakes: [
      'Pricing “paint house” with no room list or coat count.',
      'Bundling materials into labor so owner-supplied paint fights start after the deposit.',
      'Skipping prep assumptions—nail pops and caulk always show up somehow.',
      'No color-deadline note, then waiting on chips while the crew is scheduled.',
    ],
    tips: [
      'Measure walls once; write the sq-ft source in notes (laser, plan, owner drawing).',
      'Price ceilings and accent walls on their own lines—they do not track wall production.',
      'If the client adds a room mid-job, send /tools/change-order-template/ before you open that can.',
      'Pair the accepted estimate with /tools/work-order/ so the crew sees which rooms are in scope.',
    ],
    faq: [
      {
        question: 'Should a painting estimate use rooms or square feet?',
        answer:
          'Either works. Use rooms when spaces are similar and clients think in rooms. Use square feet when sizes vary or you already measured wall area. You can mix both on one PDF—just keep units clear on each line.',
      },
      {
        question: 'How do I show coats and prep?',
        answer:
          'State coat count in the scope and on the labor line description (for example, “Wall paint labor – 2 coats”). Put prep as hours or a lump sum so patching and masking are visible, not buried inside the paint rate.',
      },
      {
        question: 'Why separate materials and labor?',
        answer:
          'So the client can compare product cost versus crew time, and so owner-supplied paint jobs can drop materials lines without rewriting labor. It also makes change orders for extra gallons easier to explain.',
      },
      {
        question: 'Is this painting estimate template free to download?',
        answer:
          'Yes. Preview updates as you type; export PDF or DOCX with no signup. Optional drafts use localStorage on your device only.',
      },
      {
        question: 'Can I use this for exterior painting?',
        answer:
          'Yes—change the scope to elevations, scrape/prime notes, and weather windows, and switch units to elevation or sq ft. Keep materials and labor split the same way.',
      },
      {
        question: 'What comes after the client accepts the painting estimate?',
        answer:
          'Send a deposit invoice from /tools/contractor-invoice/, optionally a /tools/work-order/ for the crew, and a /tools/receipt-generator/ receipt when money clears.',
      },
    ],
    sources: estimateSources,
  },
  relatedSlugs: [
    'construction-estimate-template',
    'roofing-estimate-template',
    'quote-estimate-generator',
    'contractor-invoice',
  ],
  publishedAt: '2026-11-19',
  updatedAt: '2026-11-19',
};
