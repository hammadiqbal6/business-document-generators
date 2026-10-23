export interface GuideSection {
  heading: string;
  body: string;
  table?: { caption?: string; headers: string[]; rows: string[][] };
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  answerFirst: string;
  publishedAt: string;
  updatedAt: string;
  relatedToolSlugs: string[];
  relatedGuideSlugs?: string[];
  legalNote?: string;
  sections: GuideSection[];
  faq: { question: string; answer: string }[];
}

export const guides: Guide[] = [
  {
    "slug": "construction-estimate-that-wins-jobs",
    "title": "How to Write a Construction Estimate That Wins Jobs",
    "metaDescription": "Learn what to include in a construction estimate, how to price line items, set validity dates, and avoid disputes—plus a free template generator.",
    "answerFirst": "A winning construction estimate names the scope in measurable terms, separates labor and materials, shows tax and deposit clearly, and states how long the price holds. Tie every major line item to written scope so clients can compare bids fairly and you can defend the number when site conditions or selections change.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "construction-estimate-template",
      "contractor-invoice",
      "work-order"
    ],
    "relatedGuideSlugs": [
      "line-item-totals-explained",
      "invoice-vs-estimate",
      "work-order-vs-invoice-vs-estimate"
    ],
    "sections": [
      {
        "heading": "Start with scope, not price",
        "body": "Before you type a dollar amount, describe what you will demolish, install, haul away, protect, and leave behind. List rooms, surfaces, fixtures, and finishes with enough detail that another contractor could price the same job. Vague scopes force clients to guess what is included, and they often choose the lowest number that may omit critical steps.\n\nTie every major line item to a sentence in the scope section. If the estimate says install luxury vinyl plank flooring, the scope should name rooms, square footage source, subfloor prep limits, and whether baseboards are removed and reset. When site conditions are unknown, say so and reserve a line for discovery or a written change-order process.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Line-item structure clients trust",
        "body": "Group demolition, materials, labor, equipment, permits, and allowances so the client sees where money goes. Show units on every line: square feet, linear feet, hours, or lump sum when the package is fixed. The U.S. Small Business Administration encourages transparent pricing when small businesses evaluate vendors; clarity reduces haggling on hidden markup.\n\nSeparate labor and materials when tax treatment or client comparison benefits. Call out owner-supplied items, excluded work such as electrical by others, and warranty length. A short assumptions block covering working hours, access, parking, and debris path prevents I thought you included that conversations after demo starts.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Validity, deposits, and change orders",
        "body": "State how long the price holds, often fourteen to thirty days on residential remodels and shorter when lumber or steel prices move quickly. Note that concealed conditions, code upgrades, or client selections may require written change orders with revised totals.\n\nPhotograph existing conditions before you price. Document moisture, rot, out-of-level floors, and panel schedules. Deposits tied to material orders should appear on the estimate with the percentage and what triggers the next draw. Pair large jobs with a work order or signed contract that references the estimate line items.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Presentation and follow-up",
        "body": "Send a PDF with your license number, insurance summary, and payment methods if your state expects it on consumer jobs. Use consistent naming: Estimate in the title, not Invoice. Follow up once before validity expires with a short note offering to walk through line items on a call.\n\nWhen you win the job, convert agreed lines into your contractor invoice template for deposits and progress billing without retyping math. Clients who understood the estimate rarely dispute invoices that mirror the same structure.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: bathroom refresh estimate",
        "body": "A client wants a hall bath gut refresh. Scope: remove vanity, toilet, and tub surround; repair subfloor as needed up to one sheet of plywood; install new vanity, toilet, tub-shower surround, exhaust fan, and paint walls and ceiling. You price demolition at one lump sum, labor by phase, and materials from supplier quotes.\n\nLine items might read: Demo and haul-off lump sum eight hundred fifty dollars; Subfloor repair allowance four hundred dollars; Plumbing rough adjustments four hours at ninety-five dollars; Electrical fan replace two hours at ninety-five dollars; Surround install lump sum twelve hundred dollars; Vanity set and trim three hours at ninety-five dollars; Materials package lump sum twenty-one hundred dollars; Paint one room lump sum six hundred fifty dollars. Subtotal five thousand eight hundred fifty-five dollars plus tax and a thirty percent deposit to order the surround and vanity. Validity fourteen days; unknown rot may add change orders. Enter the same structure in the construction estimate generator so the PDF matches your narrative.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Estimate checklist before you send",
        "body": "Use this table as a quality check. Missing rows are where disputes start.",
        "table": {
          "caption": "Construction estimate sections to include",
          "headers": [
            "Section",
            "What to state",
            "Why it matters"
          ],
          "rows": [
            [
              "Header",
              "Estimate label, date, job address, client name",
              "Sets document type and audit trail"
            ],
            [
              "Scope",
              "Rooms, materials, exclusions, who buys fixtures",
              "Defines the promise behind each line"
            ],
            [
              "Line items",
              "Quantity, unit, rate, extended amount",
              "Enables fair comparison and change orders"
            ],
            [
              "Tax and total",
              "Rate, taxable subtotal, grand total",
              "Avoids surprise at invoice time"
            ],
            [
              "Deposit",
              "Percent or amount, due date, what it orders",
              "Protects cash flow and lead times"
            ],
            [
              "Validity",
              "Expiration date and price-change note",
              "Protects you on volatile material costs"
            ]
          ]
        }
      },
      {
        "heading": "Communicating allowances and exclusions",
        "body": "Allowances for fixtures, tile, or appliances should name the allowance amount and what happens when the client selects above or below that number. Credit unused allowance on the final invoice or bill overages through a change order signed before purchase. Exclusions belong in bold plain language: asbestos abatement, structural engineering, permit fees paid by owner, and weekend overtime if the job is weekdays-only.\n\nWhen subs quote you, attach their numbers to your estimate memo so you can defend markup and schedule. If the client supplies materials, state that you are not warranting owner-supplied product and that delays waiting for delivery extend the timeline. Review each estimate against your checklist the day before the walkthrough so you do not promise crown molding in every room when only the living room was discussed.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      }
    ],
    "faq": [
      {
        "question": "Should estimates include sales tax?",
        "answer": "Follow your state and local rules. Many contractors show one tax rate applied to a taxable subtotal and label exempt items such as certain labor or materials. If you are unsure, ask your accountant how to split taxable and non-taxable lines before you send the PDF."
      },
      {
        "question": "What deposit is normal on a remodel?",
        "answer": "Residential remodels often use twenty-five to forty percent deposits tied to material orders or schedule lock-in. Commercial jobs may use smaller deposits with progress billing. Put the percentage and due date on the estimate so it matches your contract."
      },
      {
        "question": "How detailed should labor hours be?",
        "answer": "Detailed enough that you can explain the total if challenged, but not so granular that the client micromanages each hour. Phase-level labor lines for rough-in, finish, and punch are a practical middle ground."
      },
      {
        "question": "Can I reuse the same estimate for insurance?",
        "answer": "Insurance carriers may want photos, codes, and separate material and labor breakdowns. Keep your original estimate and add supplements as change orders rather than editing history silently."
      },
      {
        "question": "When does an estimate become a contract?",
        "answer": "When both parties sign a written agreement or you accept a deposit with clear terms referencing the estimate. Until then, treat the estimate as an offer that can expire."
      },
      {
        "question": "Should I itemize subcontractor quotes?",
        "answer": "Show client-facing lines that match your scope story. You may collapse sub quotes into one line with backup in your internal file. Transparency reduces change-order fights when the client sees HVAC as its own line instead of hidden in general conditions."
      }
    ]
  },
  {
    "slug": "photography-contract-clauses",
    "title": "Photography Contract Clauses Explained (Editable Template)",
    "metaDescription": "Understand retainer, cancellation, copyright, and usage clauses in photography contracts. Not legal advice—use our free editable template as a starting point.",
    "answerFirst": "Photography contracts usually cover scope such as date, hours, and locations, payment and retainer, cancellation, copyright ownership, client usage rights, and liability limits. Edit each clause to match your session type, deliverables, and local law before you sign.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "photography-contract-template",
      "videography-contract",
      "simple-nda"
    ],
    "relatedGuideSlugs": [
      "videography-contract-clauses",
      "freelance-payment-schedule-milestones",
      "nda-basics-for-freelancers"
    ],
    "legalNote": "This article is not legal advice. Contract requirements vary by state and session type. Use our template as a starting point and have a licensed attorney review your final agreement.",
    "sections": [
      {
        "heading": "Parties, scope, and deliverables",
        "body": "Open with who is hiring whom, the event or session date, start time, primary location, and backup weather plan for outdoor work. Define deliverables in countable terms: number of edited images, album pages, or hours of coverage. List what is excluded, such as raw files, rush editing, or travel beyond a stated radius.\n\nSecond shooters, assistants, and studio rental should appear in scope if clients expect them included. If the client receives a gallery link, note how long the gallery stays live and whether downloads are permitted.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Retainer vs balance",
        "body": "The retainer reserves the date and compensates scheduling risk. State the retainer amount, when it is due, and whether it is applied to the total fee. Spell out when the balance is due, often one to two weeks before a wedding or on delivery day for portraits.\n\nLate payment language can pause editing or withhold gallery access; have an attorney tune enforcement wording. Acceptable payment methods and who pays processor fees belong in the same section so bookkeeping stays simple.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Copyright and usage rights",
        "body": "Photographers typically retain copyright under U.S. law while granting clients personal use rights. The U.S. Copyright Office publishes guidance for creators that you can reference when clients ask why they cannot resell images to a magazine without a license.\n\nSeparate personal print and social use from commercial use. Commercial licenses should name media, territory, duration, and credit requirements. A print release is not the same as a commercial license; label each clearly.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Cancellation, rescheduling, and force majeure",
        "body": "Spell out what happens if the client postpones, cancels, or if weather affects an outdoor shoot. Many wedding contracts keep the retainer if cancellation is inside a stated window. Offer one courtesy reschedule when availability allows.\n\nIf you must substitute a second shooter of equal skill, say so. Liability caps and insurance requirements are common in event photography; do not copy generic waivers without review.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: portrait session clause set",
        "body": "A family portrait package might read: Session on Saturday at the riverside park, ninety minutes, up to twenty-five fully edited digital files delivered via online gallery within twenty-one days. Retainer one hundred fifty dollars due at booking, balance two hundred fifty dollars due before session start. Copyright remains with photographer; client receives personal print and social sharing rights without commercial resale.\n\nCancellation more than fourteen days before session: retainer transferable to new date within six months. Cancellation within fourteen days: retainer forfeited. Rain plan: move to covered location or reschedule once without fee. That pattern maps cleanly into the photography contract template fields.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Clause quick-reference table",
        "body": "Match each row to a heading in your contract so nothing is buried in fine print.",
        "table": {
          "caption": "Common photography contract clauses",
          "headers": [
            "Clause",
            "Typical content",
            "Client question it answers"
          ],
          "rows": [
            [
              "Scope",
              "Date, hours, locations, deliverable count",
              "What am I buying?"
            ],
            [
              "Payment",
              "Retainer, balance due date, late fees",
              "When do I pay?"
            ],
            [
              "Copyright",
              "Owner and granted uses",
              "Can I post or sell these photos?"
            ],
            [
              "Cancellation",
              "Forfeiture windows and reschedule",
              "What if we cancel?"
            ],
            [
              "Liability",
              "Limits, insurance, equipment loss",
              "Who is responsible if something goes wrong?"
            ]
          ]
        }
      },
      {
        "heading": "Timeline, backup gear, and file delivery",
        "body": "Delivery timelines should account for peak season backlog. State calendar days or business days and what happens if illness delays editing. Backup camera bodies, cards, and batteries are operational details that belong in scope when weddings cannot be reshot.\n\nFile delivery method matters: gallery host, download expiration, and whether social-sized crops are included. If clients need DNG or TIFF for print shops, price that as an add-on. Walk clients through the contract section by section on a kickoff call so retainer and copyright questions do not surface after the event.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      }
    ],
    "faq": [
      {
        "question": "Do I need a model release?",
        "answer": "For commercial use of recognizable people, you usually need a model release in addition to the services contract. Personal client galleries often rely on the portrait agreement plus implied consent for private sharing; commercial campaigns need explicit releases."
      },
      {
        "question": "Should raw files be included?",
        "answer": "State explicitly whether raw files are excluded or available for a fee. Most portrait and wedding photographers deliver edited finals only to control quality and workflow."
      },
      {
        "question": "Can clients edit my photos?",
        "answer": "Your copyright clause can prohibit filters or cropping that misrepresent your work for commercial contexts. Personal social posts are usually allowed when the usage section says so."
      },
      {
        "question": "What about GDPR or privacy requests?",
        "answer": "If you photograph EU residents or store data abroad, privacy policies may apply beyond the contract. Ask counsel how retention and deletion fit your gallery host."
      },
      {
        "question": "Is a verbal booking enough?",
        "answer": "A signed contract or written confirmation with retainer terms is safer than verbal promises. Dates fill quickly; written terms protect both sides."
      },
      {
        "question": "How do I handle image theft online?",
        "answer": "Your copyright clause supports takedown requests, but enforcement is separate from contract drafting. Register important work with the U.S. Copyright Office when appropriate and document licenses you grant in writing."
      }
    ]
  },
  {
    "slug": "catering-quote-deposits",
    "title": "Catering Quotes: Guest Counts, Fees, and Deposits",
    "metaDescription": "Build catering quotes with per-guest pricing, staff fees, service charges, tax, and deposit terms. Free catering quote generator included.",
    "answerFirst": "Catering quotes should lock event date, guest count assumptions, menu summary, per-guest or package pricing, staff hours, service fee, tax, and deposit percentage with a final head-count deadline. Clear math on overages protects margin when attendance grows.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "catering-quote",
      "event-wedding-vendor-contract",
      "quote-estimate-generator"
    ],
    "relatedGuideSlugs": [
      "wedding-vendor-contract-checklist",
      "invoice-vs-estimate",
      "line-item-totals-explained"
    ],
    "sections": [
      {
        "heading": "Anchor the event basics",
        "body": "Put the event name, date, service window, venue address, and on-site contact at the top. Note whether service is plated, buffet, or stations because labor differs. Include load-in constraints, kitchen access, and whether you provide linens, bar service, or rentals.\n\nIf the venue requires named insured certificates, say who orders them and any rush fees. A quote that ignores logistics looks cheap until the day of the event.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Guest count buffers and final counts",
        "body": "Price against a guaranteed minimum guest count and state when final counts are due, often seven days before the event. Overage policies prevent margin loss when one hundred twenty guests arrive though the client guaranteed one hundred.\n\nSome caterers bill overages at the same per-guest rate; others add a premium for last-minute meals. Write the rule plainly on the quote so the client initials it.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Service fee vs gratuity",
        "body": "Label administrative or service fees separately from voluntary gratuity so clients understand the total. Service fees often cover staffing overhead, disposables, or coordinator time; gratuity goes to service staff when allowed by law and venue policy.\n\nTax treatment of fees varies by state. Show tax on the appropriate subtotal and note if gratuity is not taxed in your jurisdiction.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Deposits, tastings, and contract timing",
        "body": "A deposit holds the date and may credit toward the final invoice. Tie deposit percentage to your food cost exposure: large weddings with custom menus may need forty to fifty percent at signing. Balance due dates often sit three to seven days before service.\n\nUntil deposit and signed event agreement land, treat the quote as an offer subject to availability. After signing, convert line items into invoices using the same per-guest math.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: corporate lunch quote",
        "body": "A firm books boxed lunches for eighty guaranteed guests with coffee service. Menu: sandwich, salad, cookie at twenty-eight dollars per guest. Coffee station flat fee one hundred fifty dollars. Delivery and setup two hours for two staff at forty-five dollars per hour equals one hundred eighty dollars. Service fee ten percent on food subtotal. Tax at local rate on taxable items.\n\nFood eighty times twenty-eight equals two thousand two hundred forty dollars. Add coffee one hundred fifty and labor one hundred eighty for subtotal before fees. Service fee applies to food subtotal unless your policy differs. Deposit fifty percent at contract signing, final count due seven days out, overages billed at quoted per-guest rate. Enter the same lines in the catering quote generator for a clean PDF.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Quote line items to show",
        "body": "Clients compare caterers on more than price per plate. Use the table to show professionalism.",
        "table": {
          "caption": "Catering quote building blocks",
          "headers": [
            "Line",
            "Example label",
            "Purpose"
          ],
          "rows": [
            [
              "Per-guest food",
              "$28 × 80 guests",
              "Core revenue"
            ],
            [
              "Beverage or bar",
              "Coffee station flat",
              "Add-on clarity"
            ],
            [
              "Labor",
              "Staff hours × rate",
              "Shows service cost"
            ],
            [
              "Rentals",
              "Linens, china",
              "Avoid surprise pass-through"
            ],
            [
              "Service fee",
              "Percent of subtotal",
              "Overhead separate from tip"
            ],
            [
              "Deposit",
              "50% at signing",
              "Date hold and purchasing"
            ]
          ]
        }
      },
      {
        "heading": "Kitchen reality and vendor coordination",
        "body": "Confirm whether the venue kitchen has convection ovens, loading docks, and ware-washing before you promise plated service. Quotes should list who provides tables, chairs, and bussing staff when the venue is blank-slate.\n\nCoordinate with bar vendors on pour policies and last call times. Tasting fees can be credited toward the final quote when stated upfront. After the event, reconcile actual meals served against the guarantee and invoice overages within the window your contract allows.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      }
    ],
    "faq": [
      {
        "question": "When is a catering quote binding?",
        "answer": "Usually after signed agreement and deposit. Until then treat it as an offer subject to ingredient availability and staffing. Put that sentence on the PDF."
      },
      {
        "question": "How do I handle dietary accommodations?",
        "answer": "List allergens you can accommodate, separate meal counts, and any upcharge for special plates. Final allergy list deadline should match your kitchen prep schedule."
      },
      {
        "question": "Should children pay full price?",
        "answer": "State a child rate or age cutoff on the quote. Ambiguity at a wedding reception creates billing disputes."
      },
      {
        "question": "What if the venue bans outside caterers?",
        "answer": "Confirm exclusivity before quoting. Note in writing that client verified caterer access and power and water hookups."
      },
      {
        "question": "Can I change menu prices after quoting?",
        "answer": "Use a validity date on proteins and seasonal items. Renegotiate with a revised quote before prep begins, not after grocery purchase."
      },
      {
        "question": "How do I quote bar service?",
        "answer": "Separate per-drink packages from consumption tabs, note cutoff times, and state who provides bartenders and liquor liability insurance. Bar math belongs on its own lines so food per-guest rates stay comparable across caterers."
      }
    ]
  },
  {
    "slug": "tattoo-consent-documentation",
    "title": "Tattoo Consent Forms: What Studios Should Document",
    "metaDescription": "Health acknowledgements, ID verification, design approval, and aftercare on tattoo consent forms. Free template—not legal or medical advice.",
    "answerFirst": "Tattoo consent forms should record client identity, design approval, placement, risk acknowledgements, aftercare receipt, and signatures. Follow your local body-art regulations and infection-control standards; this article is not medical or legal advice.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "tattoo-consent-form-template",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "what-to-include-on-a-receipt",
      "nda-basics-for-freelancers"
    ],
    "legalNote": "This article is not legal or medical advice. Tattoo studios must follow state and local body-art regulations and infection-control standards. Have qualified counsel and your health department requirements guide your actual forms and policies.",
    "sections": [
      {
        "heading": "ID and age verification",
        "body": "Document that government photo ID was checked and record the ID type and number where regulations allow. Minors require guardian consent rules per your jurisdiction; many areas prohibit certain placements or require notarized guardian forms.\n\nKeep copies according to local retention rules. Digital storage should be access-controlled because forms contain personal health information.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Health disclosures and contraindications",
        "body": "Ask about allergies to inks or metals, skin conditions, bleeding disorders, pregnancy or nursing, immunosuppression, and recent sunburn on the site. CDC infection-control resources are useful client-education links for aftercare and studio hygiene expectations.\n\nThe form should state that the client answered truthfully and understands risks including infection, scarring, and allergic reaction. Artists should refuse service when medical risk is unclear and refer clients to a physician when appropriate.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Design, placement, and photo consent",
        "body": "Attach or reference the approved design, note placement on the body, and record size and color plan. Initials on a printed stencil photo reduce he said she said disputes.\n\nIf you photograph healed work for portfolio use, separate marketing release language from medical consent. Clients may sign both, but the purposes differ.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Aftercare and follow-up",
        "body": "Check a box that written aftercare instructions were provided in person or digitally. Note recommended healing window and when to return for touch-ups if your shop offers them.\n\nPayment receipts for deposits or sessions can be generated separately so the consent file stays clinical and the receipt stays financial.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: walk-in session documentation",
        "body": "Client presents ID, age verified over eighteen. Form records no known ink allergies, no blood thinners, skin clear at inner forearm placement. Design three-inch floral approved on stencil photo initialed by client and artist. Risks explained; client declines when advised to wait on sunburned skin.\n\nAlternatively, when cleared: session fee paid, consent signed and dated, aftercare sheet provided, artist documents needle configuration and ink lot if your board requires batch tracking. Store scan in shop records per local retention period.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Consent form sections",
        "body": "Regulators often expect these topics to appear somewhere in your packet.",
        "table": {
          "caption": "Tattoo consent documentation checklist",
          "headers": [
            "Topic",
            "What to capture",
            "Operational reason"
          ],
          "rows": [
            [
              "Identity",
              "Legal name, ID check",
              "Age and liability"
            ],
            [
              "Health",
              "Allergies, conditions, medications",
              "Safety screening"
            ],
            [
              "Design",
              "Art approval, placement",
              "Scope agreement"
            ],
            [
              "Risks",
              "Infection, scarring acknowledgements",
              "Informed consent"
            ],
            [
              "Aftercare",
              "Instructions provided",
              "Follow-up standard of care"
            ],
            [
              "Signatures",
              "Client, artist, date",
              "Audit trail"
            ]
          ]
        }
      },
      {
        "heading": "Studio workflow and record retention",
        "body": "Build consent into the appointment flow: no stencil until the form is complete. Train front desk staff to spot incomplete health questions rather than rushing walk-ins.\n\nBatch-scan forms nightly if your board allows digital storage. Separate financial receipts from clinical consent files for cleaner audits. When a client returns for cover-up work, open a new consent rather than assuming the old file covers a different design and placement.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Bloodborne pathogen and sanitation cues",
        "body": "Consent forms complement—not replace—your exposure control plan. Note that clients were offered the opportunity to ask questions about sterilization and single-use items. When state inspectors visit, they often ask whether artists documented client education, not just signatures.\n\nIf a client faints or has a reaction, incident notes may belong in a separate log linked to the appointment date. Never alter a signed consent retroactively; add a supplemental note initialed by staff if regulations allow."
      }
    ],
    "faq": [
      {
        "question": "Can clients sign digitally?",
        "answer": "Many studios use tablets; ensure your e-sign process meets local recordkeeping rules and that clients can read the full form before signing. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How long should we keep forms?",
        "answer": "Follow your health department or state board retention schedule. When in doubt, ask the agency that licenses your shop rather than guessing. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do walk-ins need the same form as appointments?",
        "answer": "Yes. Rush pressure is when documentation gets skipped. Use the same template every time. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should we document ink brands?",
        "answer": "If your regulator requires lot numbers for traceability, add a field artists complete per session. It saves time during a recall inquiry. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Is aftercare legally binding?",
        "answer": "Aftercare is education, not a guarantee of outcome. Still document that you provided it to show you met professional standards. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What if a client refuses to answer health questions?",
        "answer": "Follow studio policy and local rules. Many shops decline service when screening is incomplete because artist liability and board compliance are at stake. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "rental-application-fair-housing",
    "title": "Rental Applications: Fair Housing and What to Ask",
    "metaDescription": "What belongs on a residential rental application, authorization to verify, and fair housing basics. Free application form generator.",
    "answerFirst": "A rental application collects contact details, housing and employment history, references, and written authorization to verify, without questions that violate fair housing laws. Use the same screening criteria for every applicant and pair approvals with a proper lease.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "rental-lease-application",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "what-to-include-on-a-receipt",
      "nda-basics-for-freelancers"
    ],
    "legalNote": "This article is not legal advice. Fair housing and tenant screening rules vary by federal, state, and local law. Consult an attorney or HUD-certified housing counselor before finalizing application questions and screening policies.",
    "sections": [
      {
        "heading": "What belongs on the form",
        "body": "Standard applications include legal name, contact information, desired move-in date, current and prior addresses, employer and income source, and landlord references. Ask for written authorization to run credit and background checks and to contact prior landlords.\n\nState clearly that the application is not a lease and that approval is subject to verification. Application fees, if allowed, should be disclosed up front with whether they are refundable.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Fair housing and consistent screening",
        "body": "The U.S. Department of Housing and Urban Development enforces fair housing protections that limit questions about protected characteristics and discriminatory screening. Use the same questions and the same income and credit thresholds for every applicant for a given unit.\n\nDocument your criteria in a written policy: minimum credit score, income multiple, eviction history, and criminal record standards that comply with local guidance. Train anyone who shows units to avoid steering or informal rules.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Authorization and privacy",
        "body": "Include signatures permitting verification of employment, income, rental history, and credit. Note how long you retain applications and who may access them. If you use a third-party screening service, name the provider.\n\nDo not collect bank passwords or unnecessary sensitive data. Store paper and digital files securely and shred outdated applications on schedule.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "After approval: deposits and receipts",
        "body": "When an applicant pays a holding deposit, issue a receipt that states whether the deposit is refundable, under what conditions, and how it applies to move-in costs. Separate application payments from security deposits in your ledger.\n\nUpon approval, move terms into a written lease rather than relying on the application alone.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: uniform screening flow",
        "body": "You list a two-bedroom at twelve hundred dollars per month. Applicant A and Applicant B both submit the same PDF application. You verify income at three times rent for each, run credit for each with signed authorization, and call prior landlords using the same script.\n\nApplicant A meets policy; Applicant B does not due to recent eviction documented in court records as allowed in your written policy. You send adverse action notice if required by credit reporting rules. Applicant A receives lease and security deposit instructions with a receipt for funds received. No additional questions were asked of either applicant about family status or national origin.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Application content map",
        "body": "Use this table to audit your form against common best practices.",
        "table": {
          "caption": "Rental application sections",
          "headers": [
            "Section",
            "Include",
            "Avoid"
          ],
          "rows": [
            [
              "Identity",
              "Legal name, phone, email",
              "Questions about protected classes"
            ],
            [
              "Housing history",
              "Addresses, landlord contacts",
              "Subjective character judgments"
            ],
            [
              "Income",
              "Employer, income source",
              "Irrelevant medical questions"
            ],
            [
              "References",
              "Professional and prior landlord",
              "Steering preferences"
            ],
            [
              "Authorization",
              "Credit and verification consent",
              "Blanket bans not tied to policy"
            ],
            [
              "Disclosure",
              "Fees, timing, not a lease",
              "Promising approval before screening"
            ]
          ]
        }
      },
      {
        "heading": "Processing applications consistently",
        "body": "Use a scoring sheet that mirrors your written policy so every applicant is measured the same way. Document the reason for denial in neutral business terms tied to criteria such as income shortfall or insufficient rental history.\n\nTrain leasing agents not to comment on family size, accent, or source of income beyond lawful verification. When applicants need reasonable accommodations, route requests to decision-makers who understand fair housing obligations. Keep an application log with dates received and decisions sent to prove timely responses.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      }
    ],
    "faq": [
      {
        "question": "Can I charge an application fee?",
        "answer": "Depends on state and local law. Disclose the amount, purpose, and refund rules before collecting. Some jurisdictions cap or ban application fees."
      },
      {
        "question": "May I ask about pets?",
        "answer": "Pet policies and fees are common, but service and assistance animals are not pets under fair housing rules. Train staff on the difference and consult counsel on accommodation requests."
      },
      {
        "question": "Should I run criminal background checks?",
        "answer": "Many landlords do, but policies must comply with federal, state, and local guidance on how records may be considered. Use a written standard applied uniformly."
      },
      {
        "question": "How long can I keep applications?",
        "answer": "Keep only as long as needed for compliance and disputes, then destroy securely. Local privacy laws may set expectations."
      },
      {
        "question": "Can I reject someone without explanation?",
        "answer": "Adverse action and credit denial notices may be required when credit reports influence denial. Follow FCRA obligations and local landlord-tenant rules."
      },
      {
        "question": "Can I require a minimum credit score?",
        "answer": "Many landlords set objective thresholds applied uniformly. Document the score source and provide required notices when credit reports influence denial. Local law may restrict or ban credit screening—verify before you publish criteria."
      }
    ]
  },
  {
    "slug": "invoice-vs-estimate",
    "title": "Invoice vs Estimate: When to Use Each Document",
    "metaDescription": "Learn the difference between an estimate and an invoice, when to send each, and how deposits and change orders fit. Free templates for both.",
    "answerFirst": "An estimate or quote proposes price and scope before work starts; an invoice bills for work done or a deposit due. Use an estimate to win the job, then convert agreed line items into an invoice when you request payment.",
    "publishedAt": "2026-10-20",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "quote-estimate-generator",
      "construction-estimate-template",
      "contractor-invoice",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "work-order-vs-invoice-vs-estimate",
      "line-item-totals-explained",
      "what-to-include-on-a-receipt"
    ],
    "sections": [
      {
        "heading": "What an estimate does",
        "body": "An estimate sets expectations: parties, job address, scope narrative, line items, tax, deposit, and how long the price holds. It is usually an offer, not a demand for payment. Clients compare estimates to decide whom to hire.\n\nKeep validity dates realistic on material-heavy jobs so lumber, steel, or chip prices do not strand you. Note exclusions and assumptions so the lowest bid is not missing scope.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "What an invoice does",
        "body": "An invoice requests payment. It should show invoice number, issue date, due date, bill-to, line items for completed or progress-billed work, tax, amount paid, and balance due with payment instructions.\n\nPair invoices with receipts once money clears. The invoice asks; the receipt confirms.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Quotes, proposals, and binding language",
        "body": "Many trades use quote and estimate interchangeably. Some industries treat a quote as firmer for a fixed catalog SKU. Label the document clearly and state whether prices can change with material markets or change orders.\n\nA signed proposal may incorporate terms that make specific lines binding; still use the word invoice when you bill.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Bookkeeping and client confusion",
        "body": "Mixing estimate and invoice language on one PDF without a clear document type confuses clients and your own books. Use separate templates: quote estimate generator for selling, contractor invoice for billing.\n\nAccounting exports rely on document dates and numbers. Invoices should be sequential; estimates can be versioned when scope changes.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: kitchen remodel flow",
        "body": "A kitchen remodel starts as a construction estimate totaling eight thousand four hundred twenty dollars with thirty percent deposit. After cabinet install, you send a contractor invoice for the deposit or first progress draw using the same line labels. A final invoice bills the balance minus payments received.\n\nEach document reuses quantity times rate math, then tax. If the client adds a pendant light package, issue a change order on the estimate or a new line on the next invoice with client approval noted.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Document comparison",
        "body": "Share this table with office staff so they pick the right generator.",
        "table": {
          "caption": "Estimate vs invoice at a glance",
          "headers": [
            "Element",
            "Estimate / quote",
            "Invoice"
          ],
          "rows": [
            [
              "Purpose",
              "Propose scope and price",
              "Request payment"
            ],
            [
              "Timing",
              "Before or early in job",
              "After milestone or completion"
            ],
            [
              "Validity",
              "Often has expiration date",
              "Due date instead"
            ],
            [
              "Deposit",
              "Shown as future payment",
              "May bill deposit now"
            ],
            [
              "Numbering",
              "Quote or estimate ID",
              "Invoice number sequence"
            ]
          ]
        }
      },
      {
        "heading": "Accounts receivable habits",
        "body": "Number invoices sequentially and never reuse numbers even if a client rejects a PDF. Estimates can be versioned E-104 v2 when scope changes without affecting invoice sequence.\n\nTeach clients that signed estimates authorize deposits while invoices trigger due dates in their accounting system. When a job spans months, send progress invoices that show contract total, billed to date, and retainage if applicable. Match memo lines to estimate sections so commercial AP clerks approve faster.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "International and retainer billing",
        "body": "Export clients may need estimates in one currency and invoices in another; state exchange rate date on both documents. Retainer invoices for agencies should reference the statement of work period so retainers are not confused with deposits on goods.\n\nWhen government grants fund work, invoices may need grant codes and milestone language copied from the award letter. Keep estimate assumptions about grant reimbursement separate from what you bill the client directly."
      }
    ],
    "faq": [
      {
        "question": "Is a quote the same as an estimate?",
        "answer": "In practice many businesses use the words interchangeably. Some treat quotes as firmer for fixed SKUs. Label the PDF and state whether prices can change. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "When should I send a receipt?",
        "answer": "After payment posts. A receipt confirms amount received and method; it does not replace the invoice that requested the money. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can one document be both?",
        "answer": "Avoid combining types on one PDF. If you convert an estimate to a bill, reissue with an invoice title and new number. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do estimates affect sales tax filing?",
        "answer": "Tax is typically due when income is earned or invoiced per your accountant's method. Estimates are planning documents unless your jurisdiction treats signed quotes differently. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What about progress billing?",
        "answer": "Use invoices labeled progress one, progress two, with remaining contract balance noted. Reference the original estimate in memo lines. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should estimates show hourly rates?",
        "answer": "Yes when time-and-materials is possible. Fixed bids can hide hours internally but client-facing clarity on T&M jobs prevents invoice shock. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "line-item-totals-explained",
    "title": "How Line-Item Totals Work on Estimates and Invoices",
    "metaDescription": "Plain-English math for quantity × rate, subtotals, tax, deposits and amount due—with a worked example you can recreate in our free generators.",
    "answerFirst": "Most trade documents price each line as quantity times rate, sum those amounts into a subtotal, apply a tax percentage, then show deposits or amounts already paid. Understanding that chain prevents underbilling when you mix labor hours and lump-sum materials.",
    "publishedAt": "2026-10-20",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "construction-estimate-template",
      "contractor-invoice",
      "quote-estimate-generator",
      "cleaning-service-invoice"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "cleaning-invoice-rates-line-items",
      "construction-estimate-that-wins-jobs"
    ],
    "sections": [
      {
        "heading": "The core formula",
        "body": "Line amount equals quantity multiplied by rate. Subtotal equals the sum of line amounts. Tax equals subtotal times tax rate divided by one hundred when all lines are taxable at one rate. Total equals subtotal plus tax.\n\nDeposit equals total times deposit percent divided by one hundred when you collect an upfront percentage. Amount due on an invoice equals total minus amount already paid.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Mixed units and lump sums",
        "body": "Labor may be hourly while materials are lump sum and flooring is per square foot. The math is the same per line; only the unit label changes. Do not put a full package price in the rate column and also set quantity above one unless you mean multiple packages.\n\nLabel tax-exempt lines when your state exempts certain labor or products. Generators may apply one rate to the subtotal you enter; adjust lines before export if you need split tax.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Rounding and client-facing PDFs",
        "body": "Round money to cents on the PDF your client sees. Tiny floating-point differences in spreadsheets should not change the printed total. If your tool shows extended amounts per line, verify each line equals quantity times rate before trusting the subtotal.\n\nWhen deposit percent produces fractional cents, round deposit to cents and state that the final invoice reconciles any penny difference.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Deposits vs partial payments",
        "body": "A deposit line on an estimate is informational until you invoice it. On an invoice, move paid amounts into amount paid so balance due reflects reality. Multiple partial payments sum into amount paid.\n\nReceipts document each payment event without replacing running balance on the next invoice.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: remodel subtotal",
        "body": "Three lines: twenty-four hours labor at seventy-five dollars equals eighteen hundred dollars; materials lump sum forty-two hundred dollars; flooring two hundred twenty square feet at two dollars fifty equals five hundred fifty dollars. Subtotal six thousand five hundred fifty dollars. Tax at eight point three one percent equals about five hundred forty-four dollars thirty-one cents. Total about seven thousand ninety-four dollars thirty-one cents.\n\nThirty percent deposit is about two thousand one hundred twenty-eight dollars twenty-nine cents. Change any rate in the construction estimate generator and the live preview recalculates the same way.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Formula reference",
        "body": "Keep this table near your desk when training new office staff.",
        "table": {
          "caption": "Line-item math chain",
          "headers": [
            "Step",
            "Formula",
            "Notes"
          ],
          "rows": [
            [
              "Line total",
              "Qty × rate",
              "One row at a time"
            ],
            [
              "Subtotal",
              "Sum of line totals",
              "Before tax"
            ],
            [
              "Tax",
              "Subtotal × rate%",
              "Confirm exempt lines"
            ],
            [
              "Grand total",
              "Subtotal + tax",
              "What client owes if nothing paid"
            ],
            [
              "Deposit",
              "Total × deposit%",
              "Often on estimates"
            ],
            [
              "Balance due",
              "Total − paid",
              "On invoices after payments"
            ]
          ]
        }
      },
      {
        "heading": "Teaching crews and clients the same math",
        "body": "Field staff who understand quantity times rate catch typos before clients do. Post a one-page cheat sheet near the office printer with your standard tax rate and deposit percent.\n\nWhen clients ask why the total changed, walk them line by line rather than debating the bottom number. Export PDFs from the same generator for estimates and invoices so formatting stays familiar. If you import CSV from suppliers, round only at the line level you show the client to avoid penny drift.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Retainage and holdbacks",
        "body": "Commercial construction sometimes shows retainage withheld from each progress invoice. Amount due may be line total minus retainage percent until substantial completion. Your generator may show amount paid including retainage tracked off-document in your ledger.\n\nExplain retainage in cover email so clients do not think you forgot to bill the last ten percent."
      }
    ],
    "faq": [
      {
        "question": "Should labor and materials be separate lines?",
        "answer": "Yes when tax treatment or client comparison benefits. Separation also makes change orders clearer when material cost swings. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Does the generator file my taxes?",
        "answer": "No. It multiplies and sums the numbers you enter. Confirm rates with your accountant or local rules. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What if tax rates change mid-project?",
        "answer": "Use the rate effective on invoice date for billed work. Note the rate on each PDF. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can I discount after subtotal?",
        "answer": "Apply discounts as negative lines or adjust subtotal before tax per your accountant's preference. Be consistent across jobs. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Why does my spreadsheet total differ by a penny?",
        "answer": "Rounding order matters. Round per line or per total consistently with your generator settings. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How do I show multiple tax rates?",
        "answer": "Split lines by rate or show separate subtotals per jurisdiction if your generator supports one rate at a time. Manual PDFs may need two tax lines labeled city and state. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "freelance-payment-schedule-milestones",
    "title": "Freelance Payment Schedules: Deposits and Milestones",
    "metaDescription": "How to structure deposits and milestone payments in freelance and web design contracts, plus a free contract template with editable clauses.",
    "answerFirst": "A clear payment schedule names the deposit to start, amounts tied to milestones such as design approval and launch, and when the final balance is due. Put those numbers in the contract before work begins so invoices are paperwork, not negotiation.",
    "publishedAt": "2026-10-20",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "freelance-web-design-contract",
      "contractor-invoice",
      "simple-nda",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "nda-basics-for-freelancers",
      "photography-contract-clauses",
      "invoice-vs-estimate"
    ],
    "legalNote": "This article is not legal advice. Payment, refund, and intellectual property clauses depend on your jurisdiction and project type. Have a licensed attorney review your contract before enforcement.",
    "sections": [
      {
        "heading": "Why schedules beat net thirty someday",
        "body": "Freelancers get stuck when scope creeps but payment stays vague. Milestones tied to deliverables such as wireframes approved, staging site live, or brand guide delivered give both sides a shared definition of done.\n\nIRS materials for independent contractors stress documenting business terms. Your contract is where payment clarity lives alongside scope and ownership.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "A simple three-part pattern",
        "body": "Common web projects use thirty to forty percent to start, thirty to forty percent at a mid milestone, and the balance before final files or go-live. Name each milestone in the statement of work with dates or review windows.\n\nLate-fee or pause-work language should be reviewed by counsel if you enforce it. State whether the deposit is refundable before work starts and non-refundable after a cancellation window.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Invoices, receipts, and processor fees",
        "body": "When you invoice each milestone, match line items to the contract schedule. If clients pay by card, factor processor fees into pricing so net cash still covers the work.\n\nIssue a receipt after each cleared payment. The invoice requests; the receipt proves payment for both tax records and client peace of mind.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "NDAs and kickoff",
        "body": "If kickoff requires confidential brand assets, a simple NDA can sit beside the services agreement. Keep documents separate so payment terms stay readable and confidentiality obligations stay in one place.\n\nDo not hide payment triggers inside NDA text.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: five-page marketing site",
        "body": "Total fee six thousand dollars. Deposit forty percent twenty-four hundred dollars due at signing to reserve calendar. Milestone two thirty percent eighteen hundred dollars due when client approves wireframes in writing. Final thirty percent eighteen hundred dollars due before DNS cutover to production.\n\nEach milestone invoice references the contract section and lists no additional hours unless a change order is signed. Rush requests after approval bill at stated hourly overage rate.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Milestone planning table",
        "body": "Adapt percents to project length; long retainers may use monthly billing instead.",
        "table": {
          "caption": "Freelance payment milestone template",
          "headers": [
            "Phase",
            "Typical %",
            "Trigger"
          ],
          "rows": [
            [
              "Kickoff deposit",
              "30–40%",
              "Signed contract"
            ],
            [
              "Design approval",
              "25–35%",
              "Wireframes or comps approved"
            ],
            [
              "Build complete",
              "15–25%",
              "Staging review accepted"
            ],
            [
              "Launch / handoff",
              "Balance",
              "Files delivered or site live"
            ],
            [
              "Optional retainer",
              "Monthly",
              "Support hours bucket"
            ]
          ]
        }
      },
      {
        "heading": "Scope changes without destroying cash flow",
        "body": "When clients request extra pages or features, pause and issue a written change order with new milestone amounts before coding continues. Track hours even on fixed bids so you learn which packages underprice discovery.\n\nAutomate reminder emails three days before milestone due dates tied to contract triggers, not vague when you feel like it. If a client disappears mid-project, your contract should say work pauses and dates shift; invoices already due remain owed. Pair milestone releases with tangible artifacts: PDF sign-off, ticket closure, or staging URL password handoff.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Joint ventures and shared credit",
        "body": "When two freelancers collaborate, split milestones in a simple collaboration memo before client signatures. One lead invoices the client; internal splits stay off the client PDF.\n\nCredit card autopay on milestone dates reduces awkward collection calls but requires written authorization stored with the contract."
      }
    ],
    "faq": [
      {
        "question": "Should the deposit be refundable?",
        "answer": "Say so explicitly. Many freelancers make the deposit non-refundable after a short cancellation window because calendar time was reserved. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What if the client stalls approvals?",
        "answer": "Contracts can include review periods after which work is deemed approved if feedback is silent. Have an attorney tailor auto-approval language. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can I withhold files until paid?",
        "answer": "License and delivery clauses often tie file release to final payment. Counsel should align wording with copyright ownership terms. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How do change orders affect milestones?",
        "answer": "Bill material scope changes on separate invoices or amended milestone amounts signed before extra work begins. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Is this legal advice?",
        "answer": "No. These are operational patterns. An attorney should review enforceability in your state. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What about hourly maintenance after launch?",
        "answer": "Bill retainers or prepaid hour buckets on separate invoices from the build milestones. State rollover and expiration in the contract. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "what-to-include-on-a-receipt",
    "title": "What to Include on a Payment Receipt (Small Business)",
    "metaDescription": "Payment receipt essentials: seller info, date, amount, method, and invoice reference. Free receipt generator for service businesses.",
    "answerFirst": "A clear payment receipt shows who paid whom, when, how much, payment method, and what the payment was for, often with an invoice or estimate number. It confirms money received; it does not replace an invoice that requested payment.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "receipt-generator",
      "contractor-invoice"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "line-item-totals-explained",
      "cleaning-invoice-rates-line-items"
    ],
    "sections": [
      {
        "heading": "Receipt vs invoice vs estimate",
        "body": "An estimate proposes work and price. An invoice requests payment. A receipt proves payment happened. Clients sometimes ask for a receipt after paying an invoice; contractors may issue a receipt for a walk-in deposit before a formal invoice exists.\n\nKeep titles accurate. A PDF labeled invoice that only confirms payment will confuse bookkeeping.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Seller and buyer identification",
        "body": "Include your business legal or trade name, address, and contact phone or email. Show client or payer name. For consumer jobs, the job site address may appear in the description field.\n\nIf you are a sole proprietor, your name and EIN or SSN handling follow IRS recordkeeping practices you discuss with your tax preparer; the receipt should still show a professional business identity.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Amount, method, and reference numbers",
        "body": "State the amount received in dollars and cents, payment method such as check, card, cash, or transfer, and the date paid. Reference the invoice number, estimate number, or contract section the payment applies to.\n\nIf the payment is a partial deposit, say remaining balance per the invoice. If it is final payment, say paid in full.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Description of goods or services",
        "body": "One or two lines are enough: deposit for kitchen remodel per invoice 1042, or annual maintenance plan renewal. Detailed line items usually stay on the invoice; the receipt summarizes.\n\nFor donations or retail, SKU detail may matter; for services, link to the invoice line items instead of duplicating entire tables.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: contractor deposit receipt",
        "body": "Smith Renovations LLC receives twenty-five hundred thirty dollars from Jane Doe on March 4 by card for thirty percent deposit on bathroom remodel per invoice 2026-014. Receipt notes balance due per invoice before final inspection. Client email and phone appear in header for delivery.\n\nYou generate the PDF from the receipt generator, store a copy with the job file, and attach to the thank-you email. The invoice 2026-014 still shows amount paid updating on the next progress bill.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Receipt field checklist",
        "body": "Missing fields cause client accounting departments to reject your paperwork.",
        "table": {
          "caption": "Payment receipt fields",
          "headers": [
            "Field",
            "Example",
            "Why include it"
          ],
          "rows": [
            [
              "Receipt number",
              "RCP-2026-089",
              "Traceability"
            ],
            [
              "Date paid",
              "2026-03-04",
              "Tax and audit trail"
            ],
            [
              "Amount",
              "$2,530.00",
              "Proof of value"
            ],
            [
              "Method",
              "Visa ending 4242",
              "Reconciliation"
            ],
            [
              "Invoice ref",
              "INV-2026-014",
              "Links to scope"
            ],
            [
              "Description",
              "30% deposit, bath remodel",
              "Human-readable context"
            ]
          ]
        }
      },
      {
        "heading": "Recordkeeping for taxes and disputes",
        "body": "Store receipts with the same job number as invoices in your folder structure. The IRS expects income records; receipts support cash sales when no invoice preceded payment.\n\nFor chargebacks, the receipt plus signed authorization helps your processor. Voided payments need a new receipt or credit memo note, not a silent delete. When clients pay in foreign currency, show the amount received in the currency you book unless your policy states otherwise.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Retail and service hybrids",
        "body": "Shops that sell products and services on one visit can show product SKUs on the invoice and summarize on the receipt, or issue itemized receipts when returns are common. Warranty start dates on receipts help both parties for tool and equipment sales."
      }
    ],
    "faq": [
      {
        "question": "Do I need a receipt if I sent an invoice?",
        "answer": "Yes when clients want proof of payment for reimbursement or taxes. Mark the invoice paid in your books and still issue a receipt if they ask. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should receipts show tax?",
        "answer": "If tax was on the invoice, the receipt can repeat total tax paid or say see invoice for tax detail. Follow your accountant's preference. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Are digital receipts valid?",
        "answer": "Email PDF receipts are widely accepted. Keep copies as long as your record retention policy requires. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What about tips?",
        "answer": "Show tip as a separate line when it is not part of the invoiced service fee so restaurant and event clients can reconcile payroll. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can one receipt cover multiple invoices?",
        "answer": "Yes if you list each invoice number and amount allocated. Avoid vague lump sums when clients use cost centers. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do charities need special receipt wording?",
        "answer": "Tax-exempt organizations follow IRS acknowledgment rules for donations, which differ from service receipts. This guide focuses on business payments for goods and services. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "cleaning-invoice-rates-line-items",
    "title": "Cleaning Service Invoices: Rates and Line Items",
    "metaDescription": "Price house and commercial cleaning with hourly, flat, and per-room line items. Tax, supplies, and travel on your cleaning service invoice template.",
    "answerFirst": "Cleaning invoices work best when you separate recurring service, deep-clean extras, supplies, and travel into labeled lines with clear units. Match the quote you gave so clients see the same math on billing day.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "cleaning-service-invoice",
      "quote-estimate-generator",
      "construction-estimate-template"
    ],
    "relatedGuideSlugs": [
      "line-item-totals-explained",
      "invoice-vs-estimate",
      "what-to-include-on-a-receipt"
    ],
    "sections": [
      {
        "heading": "Choose a pricing model",
        "body": "Residential cleaners often bill flat per visit based on bedrooms, bathrooms, and square footage, or hourly with a minimum. Commercial accounts may use contracted monthly square footage or nightly janitorial hours.\n\nPick one primary model per client and document it on the first quote. Switching models mid-relationship without notice creates disputes.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Line items clients understand",
        "body": "Standard visit might be one line: recurring clean three bed two bath flat rate one hundred forty dollars. Add-ons get their own lines: inside oven, inside fridge, interior windows, laundry fold.\n\nSupplies can be included in the flat rate or itemized when clients provide products versus when you bring eco-certified supplies at a markup.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Travel, keys, and access fees",
        "body": "Long drive times or parking fees belong on the invoice if they were disclosed in the quote. After-hours or holiday service often carries a multiplier stated upfront.\n\nIf a lockout or missed access wastes a trip, your policy should appear in terms; the invoice references the trip fee line when charged.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Tax and tips",
        "body": "Sales tax on cleaning varies by state and whether labor is taxable. Show tax on a labeled subtotal. Gratuity is voluntary unless your jurisdiction treats mandatory service charges differently; label accordingly.\n\nCommercial clients may require PO numbers on the invoice header.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: move-out deep clean",
        "body": "Move-out clean empty three bed two bath home: base deep clean flat three hundred twenty dollars. Add-ons: oven forty dollars, fridge thirty-five dollars, interior windows twelve panes at four dollars forty-eight dollars. Travel zone fee fifteen dollars. Subtotal four hundred twenty-three dollars plus tax.\n\nInvoice notes service date and that supplies were provided by company. Client pays by card; receipt issued after capture. Same lines could have appeared on a quote estimate generator PDF before booking.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Common cleaning invoice lines",
        "body": "Use the table to standardize names across your team.",
        "table": {
          "caption": "Cleaning service line-item examples",
          "headers": [
            "Line type",
            "Unit",
            "When to use"
          ],
          "rows": [
            [
              "Recurring maintenance",
              "Flat per visit",
              "Weekly or biweekly clients"
            ],
            [
              "Deep / move-out",
              "Flat by size",
              "One-time intensive jobs"
            ],
            [
              "Hourly crew",
              "Hours × rate",
              "Hoarding or post-construction"
            ],
            [
              "Add-on rooms",
              "Each",
              "Oven, fridge, windows"
            ],
            [
              "Supplies surcharge",
              "Flat or %",
              "When you bring all product"
            ],
            [
              "Travel",
              "Flat zone fee",
              "Outside primary territory"
            ]
          ]
        }
      },
      {
        "heading": "Scaling quotes to recurring clients",
        "body": "After three visits you know true time on site; adjust flat rates at renewal rather than surprising mid-contract. Document pet hair, clutter, or excessive soap scum policies in the quote so trip fees are expected.\n\nTeam leads should note add-ons completed on a job sheet that office staff translate to invoice lines the same day. Commercial clients may require monthly statements summarizing visits; line items should match work orders when you use them.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Green products and occupancy rules",
        "body": "Eco-friendly product lines may cost more; disclose surcharges in quotes tied to specific brands. Occupied homes need rules about moving fragile items—invoice notes when clients declined declutter add-on and extra time resulted."
      }
    ],
    "faq": [
      {
        "question": "Should I invoice before or after the visit?",
        "answer": "Residential recurring clients often auto-charge after service. Commercial accounts may invoice monthly in arrears. State terms on the first quote. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How do I price first-time cleans?",
        "answer": "Many companies charge a higher initial deep clean then drop to maintenance rate. Show both lines on the first invoice for transparency. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What if the home is dirtier than expected?",
        "answer": "Photograph conditions and get written approval before adding hours or a heavy-soil surcharge line. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do I list each cleaner's hours?",
        "answer": "Usually no for flat rates. Hourly jobs may show crew hours as one line unless contract requires detail. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can I bundle supplies into the flat rate?",
        "answer": "Yes if margin covers consumables. Itemize when commercial clients require cost separation. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How do I quote post-construction cleans?",
        "answer": "Use hourly or per-square-foot lines with a site visit. Construction dust loads differ from maintenance cleans; photos justify higher rates on the invoice. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "nda-basics-for-freelancers",
    "title": "NDA Basics for Freelancers and Contractors",
    "metaDescription": "When freelancers need NDAs, mutual vs one-way terms, and what to define before sharing client work. Free simple NDA template—not legal advice.",
    "answerFirst": "A non-disclosure agreement limits how parties may use confidential information shared during a project. Freelancers often sign one-way NDAs before receiving brand assets or one-way NDAs from clients, or mutual NDAs when both sides share sensitive data.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "simple-nda",
      "freelance-web-design-contract"
    ],
    "relatedGuideSlugs": [
      "freelance-payment-schedule-milestones",
      "photography-contract-clauses",
      "videography-contract-clauses"
    ],
    "legalNote": "This article is not legal advice. NDA enforceability, term length, and carve-outs vary by jurisdiction. Have a licensed attorney review your NDA before you rely on it for trade secrets or investor data.",
    "sections": [
      {
        "heading": "When freelancers need an NDA",
        "body": "Sign or offer an NDA before exchanging unreleased product designs, customer lists, financial projections, or unpublished marketing campaigns. Public websites and press releases are usually not confidential.\n\nSmall engagements may use a short mutual NDA at kickoff while the larger services contract is being finalized.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "One-way vs mutual",
        "body": "One-way NDAs bind the receiving party, often the freelancer, not to disclose the client's secrets. Mutual NDAs bind both sides when each shares sensitive roadmaps, as in agency partnerships.\n\nRead who is disclosing and who is receiving. Copy-paste mutual templates into one-way deals by mistake happens often.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Definition of confidential information",
        "body": "Good NDAs define what counts as confidential: marked confidential, orally identified and confirmed in writing, or reasonably understood as secret. They list exclusions such as public domain, independently developed, or rightfully received from a third party.\n\nOverbroad definitions may be unenforceable; counsel should tune scope.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Term, return of materials, and remedies",
        "body": "State how long confidentiality lasts after the project ends. Require return or destruction of files on termination. Remedies may include injunctive relief language reviewed by an attorney.\n\nNDAs do not replace work-for-hire or license terms in your services contract.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: brand asset handoff",
        "body": "A SaaS startup hires a freelance designer. Mutual NDA signed day one. Client shares Figma files and unreleased pricing PDF. Designer shares draft UI not yet public. Term two years from last disclosure. Exclusions apply to information already on the marketing site.\n\nServices contract follows with payment milestones. Portfolio rights for designer are negotiated in the services agreement, not silently assumed in the NDA.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "NDA clause map",
        "body": "Scan your template for these headings before signing a client paper.",
        "table": {
          "caption": "Typical NDA sections",
          "headers": [
            "Section",
            "Purpose",
            "Freelancer watch-out"
          ],
          "rows": [
            [
              "Parties",
              "Who is bound",
              "Subsidiaries included?"
            ],
            [
              "Definition",
              "What is secret",
              "Too broad?"
            ],
            [
              "Exclusions",
              "Public / independent dev",
              "Must exist"
            ],
            [
              "Term",
              "Duration",
              "Survives years after job"
            ],
            [
              "Permitted use",
              "Project only",
              "Blocks other clients?"
            ],
            [
              "Return / destroy",
              "End of engagement",
              "Backup copies?"
            ]
          ]
        }
      },
      {
        "heading": "Red flags in client NDAs",
        "body": "Watch for perpetual confidentiality on information that is not secret, non-competes disguised as NDAs, or one-sided indemnity. Ask to narrow definition to documents marked confidential and project-specific oral disclosures confirmed in email.\n\nIf a client refuses to sign your mutual NDA but demands yours, consider whether the engagement risk is worth it. Store executed NDAs with the project folder and note expiration dates on your calendar for destruction reminders.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Investor decks and beta programs",
        "body": "Startup NDAs often cover pitch decks and beta metrics. Freelancers building landing pages before public launch should confirm what screenshots may appear in portfolio after embargo lifts.\n\nWhistleblower and legal complaint carve-outs are standard in mature NDAs; do not accept language that blocks reporting unlawful conduct."
      }
    ],
    "faq": [
      {
        "question": "Can I use one NDA for all clients?",
        "answer": "A baseline mutual NDA helps, but clients may require their paper. Compare term and non-solicit clauses before signing. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Does an NDA stop me from showing portfolio work?",
        "answer": "Only if confidential information appears or the services contract restricts portfolio use. Negotiate portfolio carve-outs separately. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Are NDAs the same as non-competes?",
        "answer": "No. Non-competes restrict work; NDAs restrict disclosure. Some client NDAs sneak broad non-solicit language—read carefully. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should subcontractors sign too?",
        "answer": "Yes if they touch confidential files. Flow-down obligations should appear in your subcontractor agreement. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Is email without an NDA safe?",
        "answer": "Risky for true trade secrets. Use an NDA or at least mark attachments confidential and confirm in writing. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can an NDA cover public launch dates?",
        "answer": "Only if dates are confidential and not already marketed. Define embargo periods clearly and end them on the launch day in writing. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "work-order-vs-invoice-vs-estimate",
    "title": "Work Order vs Invoice vs Estimate: Which to Use",
    "metaDescription": "Compare work orders, estimates, and invoices for service and construction jobs—scope, authorization, and billing in plain English.",
    "answerFirst": "Use an estimate to propose price and scope, a work order to authorize specific tasks on site, and an invoice to request payment for completed or approved work. Many jobs use all three in sequence with matching line labels.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "work-order",
      "quote-estimate-generator",
      "contractor-invoice"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "line-item-totals-explained",
      "construction-estimate-that-wins-jobs"
    ],
    "sections": [
      {
        "heading": "Estimate: selling the job",
        "body": "Estimates and quotes explain what you will do and for how much before work starts. They include validity dates, deposits, and assumptions. Clients compare estimates to choose a vendor.\n\nEstimates are not usually payment demands unless labeled as a pro forma invoice, which confuses everyone.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Work order: authorizing the work",
        "body": "A work order is an operational document: who requested service, location, priority, tasks, parts needed, and technician assignment. Property managers and facilities teams issue work orders; contractors may issue them to crews after a contract is signed.\n\nWork orders may reference estimate line IDs so field labor knows what is in scope without renegotiating price on site.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Invoice: collecting money",
        "body": "Invoices bill for labor and materials delivered, often per work order completion or milestone. They include due dates, tax, and payment instructions.\n\nClose the loop with receipts when payments arrive.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Keeping numbering and scope aligned",
        "body": "Use cross-references: work order 5501 ties to estimate E-104 and invoices INV-2201 through INV-2203. When tasks change, issue a change order on the estimate before adding lines to the work order and invoice.\n\nField teams should not promise extras not on the work order without office approval.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: HVAC service call",
        "body": "Building manager requests annual service. Estimate lists twelve rooftop units at ninety-five dollars each plus filters lump sum. Manager signs contract. Work order WO-882 assigns tech for Tuesday with unit list and safety notes. Tech completes eleven units; one shut down by owner.\n\nInvoice bills eleven units and filters per estimate rates, notes unit twelve skipped per client instruction. Receipt issued after ACH payment. Work order marked complete in CMMS.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Document roles",
        "body": "Train office staff with this summary.",
        "table": {
          "caption": "Work order vs estimate vs invoice",
          "headers": [
            "Document",
            "Primary audience",
            "Typical timing"
          ],
          "rows": [
            [
              "Estimate",
              "Client / buyer",
              "Before sale"
            ],
            [
              "Work order",
              "Crew / technician",
              "Job start"
            ],
            [
              "Invoice",
              "Accounts payable",
              "After work or milestone"
            ],
            [
              "Receipt",
              "Payer records",
              "After payment"
            ]
          ]
        }
      },
      {
        "heading": "Software and paper workflows",
        "body": "Small shops may use estimate PDF plus texted work authorization; enterprises need CMMS integration. Pick a workflow your office will actually maintain.\n\nPhotos and notes on the work order support invoice disputes when clients forget they approved extra valve replacements. Close work orders when invoiced so technicians do not duplicate effort. Train clients that only signed change orders on the estimate authorize billable extras.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Emergency and after-hours calls",
        "body": "Emergency work orders should state after-hours rates that flow to the invoice without re-approval when the contract authorizes emergency response. Photos of failed equipment attached to the work order support invoice line descriptions for parts replaced."
      }
    ],
    "faq": [
      {
        "question": "Can a work order include prices?",
        "answer": "Some do for internal cost tracking; client-facing price usually stays on estimate and invoice. Avoid giving field staff client pricing they should not negotiate. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do I need a work order for every visit?",
        "answer": "Recurring maintenance contracts often generate automatic work orders. One-off residential jobs may skip formal work orders if the signed estimate is enough for a small crew. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What if actual hours exceed the estimate?",
        "answer": "Stop and get a change order before invoicing overages unless the contract allows time-and-materials caps. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Is a work order a contract?",
        "answer": "Usually not by itself. It executes against a contract or approved estimate. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How does this relate to tickets?",
        "answer": "Help desk tickets resemble work orders for IT. Same idea: authorize work, then bill separately. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should tenants see work orders?",
        "answer": "Property managers often share simplified work orders without internal cost codes. Tenants still receive invoices or ledger charges through the landlord portal separately. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "videography-contract-clauses",
    "title": "Videography Contract Clauses Explained",
    "metaDescription": "Delivery format, music rights, revision rounds, and cancellation in videography contracts. Editable template—not legal advice.",
    "answerFirst": "Videography contracts should define shoot days and deliverables, editing scope, delivery format and timeline, music and third-party clearance, payment schedule, cancellation, and ownership of raw and finished files. Tailor clauses to weddings, corporate, or commercial work, and spell out revision limits so post-production scope stays profitable.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "videography-contract",
      "event-wedding-vendor-contract",
      "photography-contract-template"
    ],
    "relatedGuideSlugs": [
      "photography-contract-clauses",
      "wedding-vendor-contract-checklist",
      "freelance-payment-schedule-milestones"
    ],
    "legalNote": "This article is not legal advice. Music licensing, union rules, and drone regulations add complexity. Have an attorney review your videography agreement for your state and project type.",
    "sections": [
      {
        "heading": "Scope, crew, and equipment",
        "body": "List event dates, hours, locations, number of operators, cameras, audio package, lighting, and drone use if applicable with permit responsibility. Note meal breaks for long wedding days.\n\nSecond shooters and backup gear should be promised only if written in scope.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Deliverables and post-production",
        "body": "Specify film length, highlight versus documentary cuts, color grade level, and number of revision rounds. State delivery format such as digital download, resolution, and whether raw footage is included.\n\nRush delivery fees belong here. Archival storage duration should be explicit before files are deleted.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Music, logos, and third-party rights",
        "body": "Licensed music for public YouTube or broadcast requires proper clearance. Contracts often state client must license music for commercial use or accept royalty-free tracks you provide.\n\nCorporate logos and trademarks in video may need client warranties that they have rights to depict branded assets.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Payment, cancellation, and liability",
        "body": "Mirror photography patterns: retainer, balance due dates, reschedule windows, and force majeure. Cap liability to fees paid where counsel approves.\n\nOvertime hours beyond package should have hourly rates stated before the event.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: wedding highlight package",
        "body": "Ten-hour coverage one lead and one second shooter. Deliverable five-to-seven minute highlight film within ninety days and ceremony audio on USB optional add-on. Two revision rounds on highlight length and song choice. Licensed song included for private sharing; client licenses separately for commercial use.\n\nRetainer forty percent, balance thirty days before wedding. Cancellation inside sixty days forfeits retainer. Raw footage not included unless purchased. Map these bullets into the videography contract template.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Clause checklist",
        "body": "Compare wedding and corporate packages against this list.",
        "table": {
          "caption": "Videography contract topics",
          "headers": [
            "Topic",
            "Wedding focus",
            "Corporate focus"
          ],
          "rows": [
            [
              "Schedule",
              "Multi-location day",
              "Shoot call times"
            ],
            [
              "Deliverables",
              "Highlight + speeches",
              "Edited master + b-roll"
            ],
            [
              "Revisions",
              "Song and length",
              "Brand compliance"
            ],
            [
              "Rights",
              "Personal vs commercial",
              "Work-for-hire or license"
            ],
            [
              "Music",
              "Licensed track",
              "Client-provided legal music"
            ],
            [
              "Payment",
              "Retainer + pre-event balance",
              "Milestone by deliverable"
            ]
          ]
        }
      },
      {
        "heading": "File handoff and archive policy",
        "body": "State how long project files remain on your NAS before deletion. Restoration fees motivate clients to download deliverables promptly.\n\nColor space and codec choices should match client use: broadcast, web, or internal training. If you subcontract color or sound, confidentiality should flow to those vendors via your agreements.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Corporate approval chains",
        "body": "Corporate clients may need brand legal to approve contract and shot list. Build review days into delivery timeline. Social cuts for LinkedIn versus broadcast spots may be separate deliverables with separate revision limits."
      }
    ],
    "faq": [
      {
        "question": "Should raw footage be sold?",
        "answer": "Price it as an add-on if offered. Raw files are large and not color-graded; set expectations in writing. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Who owns the final video?",
        "answer": "Copyright often stays with the creator unless a work-for-hire clause applies. License terms should match client distribution plans. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What about drone shots?",
        "answer": "State FAA compliance, insurance, and no-fly restrictions. Backup ground shots if drone is grounded. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can clients edit my work?",
        "answer": "Prohibit re-edits that misrepresent quality unless you grant source files and a license allowing modification. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How many revision rounds are fair?",
        "answer": "Two to three rounds for highlights is common. Additional rounds bill hourly when stated upfront. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What about live streaming the wedding?",
        "answer": "Add streaming platform, bandwidth responsibility, and recording rights. Streaming may require separate permissions from venue and musicians. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "wedding-vendor-contract-checklist",
    "title": "Wedding Vendor Contract Checklist for Couples and Planners",
    "metaDescription": "Dates, deposits, cancellation, insurance, and deliverables to verify in wedding vendor contracts—from catering to photo and video.",
    "answerFirst": "Before you sign wedding vendor contracts, verify event date and timeline, deposit and refund rules, final guest counts or deliverables, insurance and venue requirements, cancellation and force majeure, and who owns creative work after the wedding.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "event-wedding-vendor-contract",
      "catering-quote",
      "photography-contract-template"
    ],
    "relatedGuideSlugs": [
      "catering-quote-deposits",
      "videography-contract-clauses",
      "photography-contract-clauses"
    ],
    "legalNote": "This article is not legal advice. Wedding contracts are governed by state consumer and contract law. Consult an attorney for high-value disputes or non-refundable deposit questions in your state.",
    "sections": [
      {
        "heading": "Universal items every vendor contract needs",
        "body": "Confirm legal business name, event date, start and end times, venue address, and on-site contact. Payment schedule should list deposit, interim payments, and balance due dates tied to calendar triggers, not vague upon receipt language.\n\nRead cancellation and postponement: who keeps the deposit, whether dates can transfer, and pandemic or venue closure language if still relevant to your market.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Catering and rental specifics",
        "body": "Final guest count deadline, per-guest price, service style, bar rules, and who provides linens and dinnerware. Overage charges and children's meals should be explicit.\n\nRental contracts need delivery windows, damage fees, and who strikes equipment. Tie catering service fees to the quote you compared.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Photo, video, and entertainment",
        "body": "Hours of coverage, number of shooters, deliverable counts or film length, turnaround time, and copyright or usage rights. DJ and band contracts need overtime rates, setup power needs, and song request policies.\n\nAsk whether assistants travel included or billed separately.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Insurance, permits, and venue compliance",
        "body": "Many venues require certificates of insurance naming the venue as additional insured. Vendors should list COI deadlines. Noise curfews and sparkler bans affect photographers and planners alike.\n\nDo not assume vendors know venue rules; attach venue rider when required.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: three-vendor review night",
        "body": "Couple compares photographer, caterer, and DJ contracts two months before wedding. Photographer: eight hours, second shooter included, gallery in sixty days, retainer non-refundable inside ninety days—matches quote. Caterer: guaranteed one hundred twenty guests, final count seven days out, service fee labeled, deposit fifty percent—matches catering quote PDF. DJ: four hours, overtime one hundred fifty dollars per hour after midnight, COI due fourteen days before—venue requirement satisfied.\n\nPlanner logs each deposit due date in master calendar and stores signed PDFs with event-wedding-vendor-contract template fields as reference for missing clauses.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Vendor contract checklist table",
        "body": "Print and mark each box before signing.",
        "table": {
          "caption": "Wedding vendor contract review",
          "headers": [
            "Item",
            "Question to answer",
            "Red flag"
          ],
          "rows": [
            [
              "Date / time",
              "Correct wedding date?",
              "Wrong year typo"
            ],
            [
              "Deposit",
              "Amount and refund rule clear?",
              "Vague non-refundable"
            ],
            [
              "Deliverables",
              "Counts and deadlines listed?",
              "TBD delivery"
            ],
            [
              "Overtime / overage",
              "Rates stated?",
              "Open-ended billing"
            ],
            [
              "Insurance",
              "COI deadline meets venue?",
              "No insurance mention"
            ],
            [
              "Rights",
              "Who owns photos/video/music?",
              "No usage defined"
            ]
          ]
        }
      },
      {
        "heading": "Timeline integration for planners",
        "body": "Load deposit due dates, insurance deadlines, and final head counts into a master calendar shared with the couple. Forty-five days out, reconfirm arrival windows with photographer, caterer, and venue.\n\nCompare force majeure language across vendors so postponement fees are not contradictory. Keep a single folder of executed contracts accessible offline on wedding day.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Destination and multi-day events",
        "body": "Destination weddings add travel windows, per diem, and backup dates for weather. Verify each vendor's passport and equipment customs rules before signing. Currency and tip customs abroad should appear in catering and photography contracts."
      }
    ],
    "faq": [
      {
        "question": "Should all vendors use the same contract template?",
        "answer": "No. Each service has different deliverables. Use a master checklist instead of one generic PDF for everyone. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "When should deposits be paid?",
        "answer": "Popular vendors book years out; pay retainer when you accept terms. Stagger deposits so cash flow is manageable. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What if we postpone the wedding?",
        "answer": "Read postponement clauses in each contract. Some allow date moves with fee; others treat as cancellation. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do we need contracts for friends helping?",
        "answer": "Informal help may skip contracts, but paid professionals should always sign. Insurance and liability still matter. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can planners sign on our behalf?",
        "answer": "Only if contract grants agency authority. Couples should sign or explicitly authorize planner signatures. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should we hire a lawyer to review every vendor?",
        "answer": "Couples often spot-check high-dollar vendors and those with strict cancellation terms. Attorneys can review a bundle of contracts when spend is large. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "podcast-script-structure",
    "title": "Podcast Script Structure: Interview, Solo, and Co-Host",
    "metaDescription": "Outline hooks, segments, questions, and outros for podcast episodes. Free podcast script template for consistent shows.",
    "answerFirst": "A solid podcast script defines the episode goal, cold open hook, intro, segment blocks with timing, guest questions or talking points, transitions, calls to action, and outro with disclaimer if needed. Scripts keep episodes consistent without sounding over-rehearsed.",
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "podcast-script-template",
      "real-estate-flyer-template"
    ],
    "relatedGuideSlugs": [
      "real-estate-flyer-what-to-include",
      "invoice-vs-estimate"
    ],
    "sections": [
      {
        "heading": "Start with episode intent",
        "body": "Write one sentence: after listening, the audience will know or feel X. Pick a primary keyword topic for show notes SEO separately from the script, but let intent guide segment choice.\n\nChoose format: solo teaching, co-host banter, or interview. Length target in minutes keeps rambling in check.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Cold open and intro",
        "body": "Cold open is thirty to ninety seconds of strongest clip or statement before theme music. Intro names show, episode number, host, guest credentials, and episode promise.\n\nSponsor read may sit pre-roll or mid-roll; mark ad slots in the script so editors find them.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Segment blocks and pacing",
        "body": "Break content into three to five segments with working titles and minute budgets. Solo shows use bullet talking points; interviews use question blocks with follow-up prompts.\n\nTransitions bridge segments with recap and teaser for what is next. Silence markers help editors place music stings.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "CTA, outro, and compliance",
        "body": "Calls to action might be newsletter signup, product link, or next episode tease. Outro thanks guest, repeats show name, and gives social handles.\n\nFinancial or health topics may need disclaimers; legal advice shows should state they are not attorneys. Mark disclaimer text verbatim in the script.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: twenty-eight minute interview",
        "body": "Goal: explain how small contractors use digital estimates. Cold open guest quote about losing bids. Intro thirty seconds. Segment one problem setup five minutes with host bullets. Segment two guest story twelve minutes with eight numbered questions and two follow-ups each. Segment three tool demo six minutes scripted screen share beats. CTA download checklist. Outro fifteen seconds plus music fade.\n\nTotal target twenty-eight minutes. Enter headings and bullets in the podcast script template so producers see timing column.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Script section map",
        "body": "Use consistent labels across episodes for faster editing.",
        "table": {
          "caption": "Podcast script building blocks",
          "headers": [
            "Block",
            "Purpose",
            "Typical length"
          ],
          "rows": [
            [
              "Cold open",
              "Hook attention",
              "0:30–1:30"
            ],
            [
              "Intro",
              "Context and guest bio",
              "1:00–2:00"
            ],
            [
              "Segment A",
              "Setup / thesis",
              "5–8 min"
            ],
            [
              "Segment B",
              "Deep dive / interview",
              "10–15 min"
            ],
            [
              "Segment C",
              "Actionable takeaway",
              "5–7 min"
            ],
            [
              "CTA + outro",
              "Next step and sign-off",
              "1–2 min"
            ]
          ]
        }
      },
      {
        "heading": "Repurposing script content",
        "body": "Segment bullets become show notes, blog posts, and newsletter blurbs with light editing. Mark timestamps in the script after recording for audiogram clips.\n\nGuest question lists help PR teams approve quotes before release. Keep a library of standard intros updated each season so episodes sound fresh without rewriting from scratch.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Accessibility and transcripts",
        "body": "Scripts make transcript generation faster for ADA-friendly show notes. Mark speaker names consistently in interview scripts so automated tools attribute quotes correctly. Sound effect descriptions in brackets help deaf and hard-of-hearing readers when transcripts publish."
      }
    ],
    "faq": [
      {
        "question": "Should I script word-for-word?",
        "answer": "Solo shows often need full script for clarity. Interviews work better with question outlines so conversation stays natural. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How do I mark ad reads?",
        "answer": "Use a clear AD READ header with sponsor name, offer, URL, and code. Editors need exact wording for compliance. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do I include music cues?",
        "answer": "Yes. Note intro bed, transition stings, and outro fade so levels stay consistent episode to episode. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "How long should episodes be?",
        "answer": "Match audience habit. Business how-to often lands twenty to thirty-five minutes; news may be shorter. Script to target length. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can I reuse segments?",
        "answer": "Evergreen explainer blocks can become library inserts; mark them in the script template for batch recording days. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Do I need a script for short news episodes?",
        "answer": "Even five-minute updates benefit from bullet scripts for dates, names, and sponsor URLs read correctly on first take. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  },
  {
    "slug": "real-estate-flyer-what-to-include",
    "title": "What to Include on a Real Estate Flyer",
    "metaDescription": "Property flyer essentials: hero photo, price, specs, agent branding, and compliance lines. Free real estate flyer template.",
    "answerFirst": "A real estate flyer should lead with a strong listing photo, address or neighborhood, price or call for offers, bed-bath-sqft facts, three to five bullet benefits, open house or tour info, and agent contact with brokerage disclaimer required in your market.",
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-10-23",
    "relatedToolSlugs": [
      "real-estate-flyer-template",
      "podcast-script-template"
    ],
    "relatedGuideSlugs": [
      "podcast-script-structure",
      "what-to-include-on-a-receipt"
    ],
    "sections": [
      {
        "heading": "Above the fold: photo and headline",
        "body": "Use the best horizontal exterior or living room image with even lighting. Headline states benefit: walkable to schools, renovated kitchen, or income potential. Price should be prominent unless your brokerage policy uses call for offers.\n\nAvoid cluttering the hero with every logo; agent branding can sit in a footer band.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Property facts buyers scan first",
        "body": "Beds, baths, square footage, lot size, year built, garage, and key upgrades in a scannable row. MLS number helps buyers reference online listings.\n\nBe accurate; misstated square footage creates liability. Source facts from MLS or appraisal docs.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Body copy and bullets",
        "body": "Three to five bullets beat long paragraphs on a flyer. Focus on lifestyle and differentiation: new roof 2024, primary suite on main, fenced yard.\n\nFair housing law requires neutral language. Describe property features, not ideal tenant or buyer demographics.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Open house, QR codes, and contact",
        "body": "Open house date, time, and address if different from listing. QR code to virtual tour or MLS page should be tested before print.\n\nAgent photo, phone, email, team name, and brokerage logo with equal housing opportunity and state license lines as your board requires.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Worked example: suburban listing flyer",
        "body": "Hero photo of front elevation. Headline: Bright four-bed family home on quiet cul-de-sac. Price four hundred ninety-five thousand dollars. Facts: four bed, two and a half bath, two thousand four hundred ten square feet, two-car garage, lot zero point three acres. Bullets: new HVAC 2025, finished basement office, patio and fenced yard, top-rated schools nearby per district site.\n\nOpen house Sunday one to four. QR to tour. Agent cell and brokerage disclaimer footer. Layout from real estate flyer template exported PDF for print and email.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Flyer content checklist",
        "body": "Review before sending to print.",
        "table": {
          "caption": "Real estate flyer elements",
          "headers": [
            "Element",
            "Tips",
            "Common miss"
          ],
          "rows": [
            [
              "Photo",
              "Landscape, well lit",
              "Dark phone snapshot"
            ],
            [
              "Price",
              "Clear or CFO policy",
              "Stale old price"
            ],
            [
              "Specs",
              "MLS-accurate",
              "Wrong bed count"
            ],
            [
              "Bullets",
              "Feature-based",
              "Discriminatory wording"
            ],
            [
              "Event",
              "OH date/time/place",
              "Missing directions"
            ],
            [
              "Compliance",
              "EHO logo, licenses",
              "Footer omitted"
            ]
          ]
        }
      },
      {
        "heading": "Distribution channels",
        "body": "Print flyers for sign riders and open houses; export a lighter PDF for email so mobile inboxes load quickly. Neighborhood farmers markets and local shops may allow flyer stacks when listings are nearby.\n\nTrack which listing URL the QR code points to and update immediately after price changes. Brokerage brand guidelines may dictate color and logo placement—check before creative layouts.\n\nPractical habit: keep a saved PDF of the last similar job and compare line labels before you send. Consistent naming speeds client approval and makes year-end bookkeeping easier when you filter by service type."
      },
      {
        "heading": "Luxury and privacy listings",
        "body": "High-end listings sometimes omit street address on public flyers, showing area name only until qualified buyers register. Match privacy strategy to MLS display rules. Luxury flyers may emphasize architect, designer, and smart-home specs with fewer price-per-square-foot comparisons."
      }
    ],
    "faq": [
      {
        "question": "Do flyers still matter with online listings?",
        "answer": "Yes for open houses, door hangers, and email attachments. Flyers summarize what buyers remember offline. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should I show sold comparables?",
        "answer": "Only if accurate and allowed by your MLS rules. Some agents use market snapshot on back panel. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Can I use listing photos from MLS?",
        "answer": "Follow MLS copyright and broker policies. Usually you may market your own listing per board rules. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "What font size for print?",
        "answer": "Body at least ten to eleven point for yard handouts; phone numbers larger. Test legibility at arm's length. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Digital vs print layout?",
        "answer": "Export PDF from template for both. Digital may use RGB; print may need bleed settings from your print shop. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      },
      {
        "question": "Should flyers mention HOA fees?",
        "answer": "When material to buyers, include monthly HOA or special assessments if accurate. Verify figures with HOA docs or seller disclosure. Keep a copy in the client file and note the date you last reviewed the policy so future you remembers the context."
      }
    ]
  }
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
