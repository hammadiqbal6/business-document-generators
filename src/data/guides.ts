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
        "body": "Before you type a dollar amount, describe what you will demolish, install, haul away, protect, and leave behind. List rooms, surfaces, fixtures, and finishes with enough detail that another contractor could price the same job. Vague scopes force clients to guess what is included, and they often choose the lowest number that may omit critical steps.\n\nTie every major line item to a sentence in the scope section. If the estimate says install luxury vinyl plank flooring, the scope should name rooms, square footage source, subfloor prep limits, and whether baseboards are removed and reset. When site conditions are unknown, say so and reserve a line for discovery or a written change-order process."
      },
      {
        "heading": "Line-item structure clients trust",
        "body": "Group demolition, materials, labor, equipment, permits, and allowances so the client sees where money goes. Show units on every line: square feet, linear feet, hours, or lump sum when the package is fixed. The U.S. Small Business Administration encourages transparent pricing when small businesses evaluate vendors; clarity reduces haggling on hidden markup.\n\nSeparate labor and materials when tax treatment or client comparison benefits. Call out owner-supplied items, excluded work such as electrical by others, and warranty length. A short assumptions block covering working hours, access, parking, and debris path prevents I thought you included that conversations after demo starts."
      },
      {
        "heading": "Validity, deposits, and change orders",
        "body": "State how long the price holds, often fourteen to thirty days on residential remodels and shorter when lumber or steel prices move quickly. Note that concealed conditions, code upgrades, or client selections may require written change orders with revised totals.\n\nPhotograph existing conditions before you price. Document moisture, rot, out-of-level floors, and panel schedules. Deposits tied to material orders should appear on the estimate with the percentage and what triggers the next draw. Pair large jobs with a work order or signed contract that references the estimate line items."
      },
      {
        "heading": "Presentation and follow-up",
        "body": "Send a PDF with your license number, insurance summary, and payment methods if your state expects it on consumer jobs. Use consistent naming: Estimate in the title, not Invoice. Follow up once before validity expires with a short note offering to walk through line items on a call.\n\nWhen you win the job, convert agreed lines into your contractor invoice template for deposits and progress billing without retyping math. Clients who understood the estimate rarely dispute invoices that mirror the same structure."
      },
      {
        "heading": "Worked example: bathroom refresh estimate",
        "body": "A client wants a hall bath gut refresh. Scope: remove vanity, toilet, and tub surround; repair subfloor as needed up to one sheet of plywood; install new vanity, toilet, tub-shower surround, exhaust fan, and paint walls and ceiling. You price demolition at one lump sum, labor by phase, and materials from supplier quotes.\n\nLine items might read: Demo and haul-off lump sum eight hundred fifty dollars; Subfloor repair allowance four hundred dollars; Plumbing rough adjustments four hours at ninety-five dollars; Electrical fan replace two hours at ninety-five dollars; Surround install lump sum twelve hundred dollars; Vanity set and trim three hours at ninety-five dollars; Materials package lump sum twenty-one hundred dollars; Paint one room lump sum six hundred fifty dollars. Subtotal five thousand eight hundred fifty-five dollars plus tax and a thirty percent deposit to order the surround and vanity. Validity fourteen days; unknown rot may add change orders. Enter the same structure in the construction estimate generator so the PDF matches your narrative."
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
        "body": "Allowances for fixtures, tile, or appliances should name the allowance amount and what happens when the client selects above or below that number. Credit unused allowance on the final invoice or bill overages through a change order signed before purchase. Exclusions belong in bold plain language: asbestos abatement, structural engineering, permit fees paid by owner, and weekend overtime if the job is weekdays-only.\n\nWhen subs quote you, attach their numbers to your estimate memo so you can defend markup and schedule. If the client supplies materials, state that you are not warranting owner-supplied product and that delays waiting for delivery extend the timeline. Review each estimate against your checklist the day before the walkthrough so you do not promise crown molding in every room when only the living room was discussed."
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
        "body": "Open with who is hiring whom, the event or session date, start time, primary location, and backup weather plan for outdoor work. Define deliverables in countable terms: number of edited images, album pages, or hours of coverage. List what is excluded, such as raw files, rush editing, or travel beyond a stated radius.\n\nSecond shooters, assistants, and studio rental should appear in scope if clients expect them included. If the client receives a gallery link, note how long the gallery stays live and whether downloads are permitted.\n\nCorporate headshot days need a shot list and turnaround for retouching batches. Wedding contracts should name getting-ready coverage end time and reception end time so open-bar overtime is priced before the event."
      },
      {
        "heading": "Retainer vs balance",
        "body": "The retainer reserves the date and compensates scheduling risk. State the retainer amount, when it is due, and whether it is applied to the total fee. Spell out when the balance is due, often one to two weeks before a wedding or on delivery day for portraits.\n\nLate payment language can pause editing or withhold gallery access; have an attorney tune enforcement wording. Acceptable payment methods and who pays processor fees belong in the same section so bookkeeping stays simple."
      },
      {
        "heading": "Copyright and usage rights",
        "body": "Photographers typically retain copyright under U.S. law while granting clients personal use rights. The U.S. Copyright Office publishes guidance for creators that you can reference when clients ask why they cannot resell images to a magazine without a license.\n\nSeparate personal print and social use from commercial use. Commercial licenses should name media, territory, duration, and credit requirements. A print release is not the same as a commercial license; label each clearly."
      },
      {
        "heading": "Cancellation, rescheduling, and force majeure",
        "body": "Spell out what happens if the client postpones, cancels, or if weather affects an outdoor shoot. Many wedding contracts keep the retainer if cancellation is inside a stated window. Offer one courtesy reschedule when availability allows.\n\nIf you must substitute a second shooter of equal skill, say so. Liability caps and insurance requirements are common in event photography; do not copy generic waivers without review."
      },
      {
        "heading": "Worked example: portrait session clause set",
        "body": "A family portrait package might read: Session on Saturday at the riverside park, ninety minutes, up to twenty-five fully edited digital files delivered via online gallery within twenty-one days. Retainer one hundred fifty dollars due at booking, balance two hundred fifty dollars due before session start. Copyright remains with photographer; client receives personal print and social sharing rights without commercial resale.\n\nCancellation more than fourteen days before session: retainer transferable to new date within six months. Cancellation within fourteen days: retainer forfeited. Rain plan: move to covered location or reschedule once without fee. That pattern maps cleanly into the photography contract template fields."
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
        "body": "Delivery timelines should account for peak season backlog. State calendar days or business days and what happens if illness delays editing. Backup camera bodies, cards, and batteries are operational details that belong in scope when weddings cannot be reshot.\n\nFile delivery method matters: gallery host, download expiration, and whether social-sized crops are included. If clients need DNG or TIFF for print shops, price that as an add-on. Walk clients through the contract section by section on a kickoff call so retainer and copyright questions do not surface after the event."
      },
      {
        "heading": "Venue restrictions and team meals",
        "body": "Many venues limit flash, drone use, or where photographers may stand during ceremonies. Attach venue rules to the contract exhibit or reference the planner's timeline.\n\nLong wedding days should address hot meals for second shooters in scope or courtesy language. Parking passes and load-in badges are small details that prevent day-of friction when security turns away your assistant."
      }
    ],
    "faq": [
      {
        "question": "Do I need a model release?",
        "answer": "For commercial use of recognizable people, you usually need a model release in addition to the services contract. Personal client galleries often rely on the portrait agreement plus implied consent for private sharing; commercial campaigns need explicit releases. Stock and advertising uses almost always require a separate release form with adult signers for minors."
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
        "answer": "A signed contract or written confirmation with retainer terms is safer than verbal promises. Dates fill quickly; written terms protect both sides. Follow up verbal yes with a contract link the same day."
      },
      {
        "question": "How do I handle image theft online?",
        "answer": "Your copyright clause supports takedown requests, but enforcement is separate from contract drafting. Register important work with the U.S. Copyright Office when appropriate and document licenses you grant in writing."
      },
      {
        "question": "Should engagement sessions share the wedding contract?",
        "answer": "Either fold engagement coverage into the wedding agreement with separate deliverable counts or sign a standalone portrait contract. Mixing terms without clear deliverable tables confuses gallery deadlines and retainer refund rules."
      },
      {
        "question": "What if the client loses gallery access?",
        "answer": "State reactivation fees and how long you keep backups after delivery. Clients who delay downloads should not expect indefinite free hosting when your contract lists archive limits. Send a reminder email before you delete archives so clients can export favorites."
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
        "body": "Put the event name, date, service window, venue address, and on-site contact at the top. Note whether service is plated, buffet, or stations because labor differs. Include load-in constraints, kitchen access, and whether you provide linens, bar service, or rentals.\n\nIf the venue requires named insured certificates, say who orders them and any rush fees. A quote that ignores logistics looks cheap until the day of the event.\n\nList setup and breakdown times separately from the meal service window so clients know when your team arrives and when the kitchen must be clear. Note whether you need a staging area for chafers, a dedicated hand-wash sink, or electrical outlets for warming equipment. Corporate events often need badge check-in buffers; weddings need a clear photo-line schedule before dinner service."
      },
      {
        "heading": "Guest count buffers and final counts",
        "body": "Price against a guaranteed minimum guest count and state when final counts are due, often seven days before the event. Overage policies prevent margin loss when one hundred twenty guests arrive though the client guaranteed one hundred.\n\nSome caterers bill overages at the same per-guest rate; others add a premium for last-minute meals. Write the rule plainly on the quote so the client initials it.\n\nSplit counts when the event mixes seated dinner guests with cocktail-only arrivals. Vendor meals, photographer plates, and security details are easy to forget unless you add a line for staff meals at a stated rate. If the client wants a ten percent cushion baked into purchasing, say whether unused meals are credited or donated rather than refunded."
      },
      {
        "heading": "Service fee vs gratuity",
        "body": "Label administrative or service fees separately from voluntary gratuity so clients understand the total. Service fees often cover staffing overhead, disposables, or coordinator time; gratuity goes to service staff when allowed by law and venue policy.\n\nTax treatment of fees varies by state. Show tax on the appropriate subtotal and note if gratuity is not taxed in your jurisdiction.\n\nOn the quote PDF, place service fee and suggested gratuity on separate lines with short definitions in plain English. Clients comparing three caterers should see the same fee structure, not a hidden markup buried in per-guest food. When venues mandate a specific gratuity distribution, reference that policy in writing so your invoice matches what the banquet captain expects on event night."
      },
      {
        "heading": "Deposits, tastings, and contract timing",
        "body": "A deposit holds the date and may credit toward the final invoice. Tie deposit percentage to your food cost exposure: large weddings with custom menus may need forty to fifty percent at signing. Balance due dates often sit three to seven days before service.\n\nUntil deposit and signed event agreement land, treat the quote as an offer subject to availability. After signing, convert line items into invoices using the same per-guest math.\n\nTasting fees belong on the quote as their own line with a note if the fee credits toward the event total when the client books. State what happens to the deposit if the client cancels inside thirty or sixty days, matching your event contract language. Second deposits tied to final head count or protein lock-in reduce last-minute grocery surprises."
      },
      {
        "heading": "Worked example: corporate lunch quote",
        "body": "A firm books boxed lunches for eighty guaranteed guests with coffee service. Menu: sandwich, salad, cookie at twenty-eight dollars per guest. Coffee station flat fee one hundred fifty dollars. Delivery and setup two hours for two staff at forty-five dollars per hour equals one hundred eighty dollars. Service fee ten percent on food subtotal. Tax at local rate on taxable items.\n\nFood eighty times twenty-eight equals two thousand two hundred forty dollars. Add coffee one hundred fifty and labor one hundred eighty for subtotal before fees. Service fee applies to food subtotal unless your policy differs. Deposit fifty percent at contract signing, final count due seven days out, overages billed at quoted per-guest rate. Enter the same lines in the catering quote generator for a clean PDF."
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
        "body": "Confirm whether the venue kitchen has convection ovens, loading docks, and ware-washing before you promise plated service. Quotes should list who provides tables, chairs, and bussing staff when the venue is blank-slate.\n\nCoordinate with bar vendors on pour policies and last call times. Tasting fees can be credited toward the final quote when stated upfront. After the event, reconcile actual meals served against the guarantee and invoice overages within the window your contract allows.\n\nShare a one-page event timeline with the venue captain showing drop-off, buffet reset, and dessert service. Note who cuts the cake if that is not your team. Allergen prep stations and separate serving utensils should appear on the quote when you promise nut-free or gluten-free options so kitchen labor is priced honestly."
      },
      {
        "heading": "Bar packages and liability on the quote",
        "body": "Bar service quotes should state whether you provide liquor liability coverage, who holds the pour license, and whether consumption is open bar, capped tab, or cash bar. List bartender headcount, bar setup hours, and mixers you supply versus what the venue stocks.\n\nIce, glassware, and garnish lines prevent pass-through surprises. Last-call time and responsible-service policies belong in the quote memo so clients know when service ends even if the dance floor continues."
      }
    ],
    "faq": [
      {
        "question": "When is a catering quote binding?",
        "answer": "Usually after signed agreement and deposit. Until then treat it as an offer subject to ingredient availability and staffing. Put that sentence on the PDF footer so event planners know the date is not held indefinitely."
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
      },
      {
        "question": "Should the quote list rental pass-through costs?",
        "answer": "Yes when you order china, linens, or tents from a rental house. Show rental subtotal, delivery fee, and damage waiver if you bill through. Clients then see your service fee separate from pass-through gear."
      },
      {
        "question": "How do I handle sales tax on catering quotes?",
        "answer": "Apply tax only to taxable items per your state rules—often food, rentals, and service fees differ. Label the tax rate and taxable subtotal on the PDF. Ask your accountant before you copy another caterer's tax block."
      }
    ]
  },
  {
    "slug": "tattoo-consent-documentation",
    "title": "Tattoo Consent Forms: What Studios Should Document",
    "metaDescription": "Health acknowledgements, ID verification, design approval, and aftercare on tattoo consent forms. Free template—not legal or medical advice.",
    "answerFirst": "Tattoo consent forms should record client identity, design approval, placement, risk acknowledgements, aftercare receipt, and signatures. Follow your local body-art regulations and infection-control standards; this article is not medical or legal advice. Treat each session as its own record even when the client is a regular—health answers and design approvals change over time.",
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
        "body": "Document that government photo ID was checked and record the ID type and number where regulations allow. Minors require guardian consent rules per your jurisdiction; many areas prohibit certain placements or require notarized guardian forms.\n\nKeep copies according to local retention rules. Digital storage should be access-controlled because forms contain personal health information.\n\nExpired ID policies should be written: some boards accept only current government ID while others allow grace periods. Photocopy only what regulations permit—full ID images may be restricted in your state."
      },
      {
        "heading": "Health disclosures and contraindications",
        "body": "Ask about allergies to inks or metals, skin conditions, bleeding disorders, pregnancy or nursing, immunosuppression, and recent sunburn on the site. CDC infection-control resources are useful client-education links for aftercare and studio hygiene expectations.\n\nThe form should state that the client answered truthfully and understands risks including infection, scarring, and allergic reaction. Artists should refuse service when medical risk is unclear and refer clients to a physician when appropriate.\n\nRecent antibiotics, accutane history, and diabetes may affect healing—use yes-no questions with space for medication names rather than open-ended boxes clients skip."
      },
      {
        "heading": "Design, placement, and photo consent",
        "body": "Attach or reference the approved design, note placement on the body, and record size and color plan. Initials on a printed stencil photo reduce he said she said disputes.\n\nIf you photograph healed work for portfolio use, separate marketing release language from medical consent. Clients may sign both, but the purposes differ."
      },
      {
        "heading": "Aftercare and follow-up",
        "body": "Check a box that written aftercare instructions were provided in person or digitally. Note recommended healing window and when to return for touch-ups if your shop offers them.\n\nPayment receipts for deposits or sessions can be generated separately so the consent file stays clinical and the receipt stays financial."
      },
      {
        "heading": "Worked example: walk-in session documentation",
        "body": "Client presents ID, age verified over eighteen. Form records no known ink allergies, no blood thinners, skin clear at inner forearm placement. Design three-inch floral approved on stencil photo initialed by client and artist. Risks explained; client declines when advised to wait on sunburned skin.\n\nAlternatively, when cleared: session fee paid, consent signed and dated, aftercare sheet provided, artist documents needle configuration and ink lot if your board requires batch tracking. Store scan in shop records per local retention period."
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
        "body": "Build consent into the appointment flow: no stencil until the form is complete. Train front desk staff to spot incomplete health questions rather than rushing walk-ins.\n\nBatch-scan forms nightly if your board allows digital storage. Separate financial receipts from clinical consent files for cleaner audits. When a client returns for cover-up work, open a new consent rather than assuming the old file covers a different design and placement."
      },
      {
        "heading": "Bloodborne pathogen and sanitation cues",
        "body": "Consent forms complement—not replace—your exposure control plan. Note that clients were offered the opportunity to ask questions about sterilization and single-use items. When state inspectors visit, they often ask whether artists documented client education, not just signatures.\n\nIf a client faints or has a reaction, incident notes may belong in a separate log linked to the appointment date. Never alter a signed consent retroactively; add a supplemental note initialed by staff if regulations allow."
      },
      {
        "heading": "Guest observers and guardian signatures",
        "body": "When friends watch the session, note whether minors are present in the procedure room per shop policy. Guardian signatures need full legal names matching ID.\n\nPhotography for portfolio during healing should be a separate checkbox so clients understand marketing use is optional."
      },
      {
        "heading": "Language access and readable forms",
        "body": "Offer forms in languages your clients commonly read when your board allows translations. Plain-language summaries of risks help clients who are nervous or unfamiliar with medical terms.\n\nIf a client needs an interpreter, document that they declined or accepted interpreter assistance. Never rush signatures when someone asks for time to read—pause the appointment rather than skipping initials on the design approval block.\n\nKeep a laminated copy of aftercare instructions at each station so clients can photograph them even if they lose the paper handout."
      }
    ],
    "faq": [
      {
        "question": "Can clients sign digitally?",
        "answer": "Many studios use tablets; ensure your e-sign process meets local recordkeeping rules and that clients can read the full form before signing. Save a timestamped PDF export if your board requires immutable records."
      },
      {
        "question": "How long should we keep forms?",
        "answer": "Follow your health department or state board retention schedule. When in doubt, ask the agency that licenses your shop rather than guessing."
      },
      {
        "question": "Do walk-ins need the same form as appointments?",
        "answer": "Yes. Rush pressure is when documentation gets skipped. Use the same template every time."
      },
      {
        "question": "Should we document ink brands?",
        "answer": "If your regulator requires lot numbers for traceability, add a field artists complete per session. It saves time during a recall inquiry."
      },
      {
        "question": "Is aftercare legally binding?",
        "answer": "Aftercare is education, not a guarantee of outcome. Still document that you provided it to show you met professional standards."
      },
      {
        "question": "What if a client refuses to answer health questions?",
        "answer": "Follow studio policy and local rules. Many shops decline service when screening is incomplete because artist liability and board compliance are at stake."
      },
      {
        "question": "Can we reuse the same form for touch-ups?",
        "answer": "Open a new consent for each session with updated design and placement fields. Touch-ups still carry infection risk and deserve fresh health screening when months have passed."
      },
      {
        "question": "Should piercers use the same template?",
        "answer": "Piercing consent overlaps but may need different risk language. Use a piercing-specific template if your shop offers both services so clients see accurate aftercare for jewelry type."
      },
      {
        "question": "How do cover-ups differ on consent forms?",
        "answer": "Note prior tattoo location, age of existing work, and client acknowledgment that cover-ups may need multiple sessions. Laser removal history affects ink absorption—capture it in health questions."
      },
      {
        "question": "Should artists initial the form too?",
        "answer": "Many shops require artist signature alongside the client to prove who performed the service and that risks were explained. Match your board's sample forms when available."
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
        "body": "Standard applications include legal name, contact information, desired move-in date, current and prior addresses, employer and income source, and landlord references. Ask for written authorization to run credit and background checks and to contact prior landlords.\n\nState clearly that the application is not a lease and that approval is subject to verification. Application fees, if allowed, should be disclosed up front with whether they are refundable.\n\nVehicle and pet counts belong in neutral policy sections—describe pet rules and fees, not whether you prefer certain breeds unless local law allows specific restrictions. Emergency contact fields help maintenance access but should not substitute for screening data."
      },
      {
        "heading": "Fair housing and consistent screening",
        "body": "The U.S. Department of Housing and Urban Development enforces fair housing protections that limit questions about protected characteristics and discriminatory screening. Use the same questions and the same income and credit thresholds for every applicant for a given unit.\n\nDocument your criteria in a written policy: minimum credit score, income multiple, eviction history, and criminal record standards that comply with local guidance. Train anyone who shows units to avoid steering or informal rules.\n\nSource-of-income rules in some cities treat vouchers like other income when verification is possible. Update applications when local law changes rather than relying on outdated PDFs downloaded years ago."
      },
      {
        "heading": "Authorization and privacy",
        "body": "Include signatures permitting verification of employment, income, rental history, and credit. Note how long you retain applications and who may access them. If you use a third-party screening service, name the provider.\n\nDo not collect bank passwords or unnecessary sensitive data. Store paper and digital files securely and shred outdated applications on schedule."
      },
      {
        "heading": "After approval: deposits and receipts",
        "body": "When an applicant pays a holding deposit, issue a receipt that states whether the deposit is refundable, under what conditions, and how it applies to move-in costs. Separate application payments from security deposits in your ledger.\n\nUpon approval, move terms into a written lease rather than relying on the application alone."
      },
      {
        "heading": "Worked example: uniform screening flow",
        "body": "You list a two-bedroom at twelve hundred dollars per month. Applicant A and Applicant B both submit the same PDF application. You verify income at three times rent for each, run credit for each with signed authorization, and call prior landlords using the same script.\n\nApplicant A meets policy; Applicant B does not due to recent eviction documented in court records as allowed in your written policy. You send adverse action notice if required by credit reporting rules. Applicant A receives lease and security deposit instructions with a receipt for funds received. No additional questions were asked of either applicant about family status or national origin."
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
        "body": "Use a scoring sheet that mirrors your written policy so every applicant is measured the same way. Document the reason for denial in neutral business terms tied to criteria such as income shortfall or insufficient rental history.\n\nTrain leasing agents not to comment on family size, accent, or source of income beyond lawful verification. When applicants need reasonable accommodations, route requests to decision-makers who understand fair housing obligations. Keep an application log with dates received and decisions sent to prove timely responses.\n\nRespond to complete applications within the timeframe your policy promises. Partial applications should get a written list of missing items rather than silent rejection."
      },
      {
        "heading": "Holding deposits and adverse action",
        "body": "When you accept a holding deposit, state whether it applies to first month's rent or security deposit and what happens if the applicant fails screening after acceptance. Issue receipts for every fee collected.\n\nIf credit reports influence denial, follow fair credit reporting notice requirements. Keep copies of screening reports with the application file for the retention period your counsel recommends.\n\nSend applicants a clear list of missing documents instead of denying without explanation when the file is incomplete. Timestamps on every outbound email help prove you did not favor one applicant with faster responses."
      }
    ],
    "faq": [
      {
        "question": "Can I charge an application fee?",
        "answer": "Depends on state and local law. Disclose the amount, purpose, and refund rules before collecting. Some jurisdictions cap or ban application fees. Never charge different fees to different applicants for the same unit."
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
      },
      {
        "question": "May I ask about eviction history?",
        "answer": "Landlords commonly verify court records where lawful. Apply the same look-back period to every applicant and document how a prior eviction affects eligibility under your written policy."
      },
      {
        "question": "Should co-signers use the same application?",
        "answer": "Yes—collect the same information and authorization from guarantors. Screen co-signers with the same income and credit standards you publish for primary applicants."
      },
      {
        "question": "Can I screen roommates separately?",
        "answer": "Each adult occupant should complete an application when your policy requires it. Apply the same criteria to every roommate for the unit and document who is on the lease versus occupant only."
      },
      {
        "question": "What if the unit is rent-controlled?",
        "answer": "Local rent-control programs may limit fees, deposits, or screening steps. Layer city rules on top of federal fair housing basics before you publish a standard application PDF."
      }
    ]
  },
  {
    "slug": "invoice-vs-estimate",
    "title": "Invoice vs Estimate: When to Use Each Document",
    "metaDescription": "Learn the difference between an estimate and an invoice, when to send each, and how deposits and change orders fit. Free templates for both.",
    "answerFirst": "An estimate or quote proposes price and scope before work starts; an invoice bills for work done or a deposit due. Use an estimate to win the job, then convert agreed line items into an invoice when you request payment. Clear document titles help clients, bookkeepers, and lenders understand whether money is proposed or due.",
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
        "body": "An estimate sets expectations: parties, job address, scope narrative, line items, tax, deposit, and how long the price holds. It is usually an offer, not a demand for payment. Clients compare estimates to decide whom to hire.\n\nKeep validity dates realistic on material-heavy jobs so lumber, steel, or chip prices do not strand you. Note exclusions and assumptions so the lowest bid is not missing scope.\n\nEstimates for insurance restoration may need separate line labels for code upgrades; still keep the document titled estimate until you invoice approved work."
      },
      {
        "heading": "What an invoice does",
        "body": "An invoice requests payment. It should show invoice number, issue date, due date, bill-to, line items for completed or progress-billed work, tax, amount paid, and balance due with payment instructions.\n\nPair invoices with receipts once money clears. The invoice asks; the receipt confirms."
      },
      {
        "heading": "Quotes, proposals, and binding language",
        "body": "Many trades use quote and estimate interchangeably. Some industries treat a quote as firmer for a fixed catalog SKU. Label the document clearly and state whether prices can change with material markets or change orders.\n\nA signed proposal may incorporate terms that make specific lines binding; still use the word invoice when you bill."
      },
      {
        "heading": "Bookkeeping and client confusion",
        "body": "Mixing estimate and invoice language on one PDF without a clear document type confuses clients and your own books. Use separate templates: quote estimate generator for selling, contractor invoice for billing.\n\nAccounting exports rely on document dates and numbers. Invoices should be sequential; estimates can be versioned when scope changes.\n\nTrain staff never to email a screenshot of an estimate as an invoice. Mobile photos lose line detail and look unprofessional when finance teams file vendor records."
      },
      {
        "heading": "Worked example: kitchen remodel flow",
        "body": "A kitchen remodel starts as a construction estimate totaling eight thousand four hundred twenty dollars with thirty percent deposit. After cabinet install, you send a contractor invoice for the deposit or first progress draw using the same line labels. A final invoice bills the balance minus payments received.\n\nEach document reuses quantity times rate math, then tax. If the client adds a pendant light package, issue a change order on the estimate or a new line on the next invoice with client approval noted."
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
        "body": "Number invoices sequentially and never reuse numbers even if a client rejects a PDF. Estimates can be versioned E-104 v2 when scope changes without affecting invoice sequence.\n\nTeach clients that signed estimates authorize deposits while invoices trigger due dates in their accounting system. When a job spans months, send progress invoices that show contract total, billed to date, and retainage if applicable. Match memo lines to estimate sections so commercial AP clerks approve faster."
      },
      {
        "heading": "International and retainer billing",
        "body": "Export clients may need estimates in one currency and invoices in another; state exchange rate date on both documents. Retainer invoices for agencies should reference the statement of work period so retainers are not confused with deposits on goods.\n\nWhen government grants fund work, invoices may need grant codes and milestone language copied from the award letter. Keep estimate assumptions about grant reimbursement separate from what you bill the client directly."
      },
      {
        "heading": "Credit memos and voided invoices",
        "body": "When you refund a deposit or correct a billing error, issue a credit memo or voided invoice with a new number rather than editing the original PDF. Accounting systems need an audit trail.\n\nNote on the credit memo which estimate or invoice it reverses so the client's AP team can reconcile."
      },
      {
        "heading": "Handoff from sales to billing",
        "body": "When a salesperson emails an estimate PDF, billing should receive the signed copy before the first invoice goes out. Mismatched line labels between estimate and invoice are the top reason small businesses lose disputes.\n\nCRM notes should link estimate ID, contract sign date, and first invoice number. Weekly review of open estimates past validity catches jobs that never converted to invoices."
      }
    ],
    "faq": [
      {
        "question": "Is a quote the same as an estimate?",
        "answer": "In practice many businesses use the words interchangeably. Some treat quotes as firmer for fixed SKUs. Label the PDF and state whether prices can change. Retail installers often call fixed-SKU jobs quotes while remodelers say estimate—pick one word per trade and stay consistent."
      },
      {
        "question": "When should I send a receipt?",
        "answer": "After payment posts. A receipt confirms amount received and method; it does not replace the invoice that requested the money."
      },
      {
        "question": "Can one document be both?",
        "answer": "Avoid combining types on one PDF. If you convert an estimate to a bill, reissue with an invoice title and new number."
      },
      {
        "question": "Do estimates affect sales tax filing?",
        "answer": "Tax is typically due when income is earned or invoiced per your accountant's method. Estimates are planning documents unless your jurisdiction treats signed quotes differently."
      },
      {
        "question": "What about progress billing?",
        "answer": "Use invoices labeled progress one, progress two, with remaining contract balance noted. Reference the original estimate in memo lines."
      },
      {
        "question": "Should estimates show hourly rates?",
        "answer": "Yes when time-and-materials is possible. Fixed bids can hide hours internally but client-facing clarity on T&M jobs prevents invoice shock."
      },
      {
        "question": "What goes in the invoice memo field?",
        "answer": "Reference the approved estimate number, job site gate code if relevant, and PO number for commercial clients. Memos are searchable in many accounting tools when clients ask about old jobs."
      },
      {
        "question": "When is a pro forma invoice used?",
        "answer": "Some exporters send pro forma invoices for customs or deposit approval before goods ship. Label them clearly as not a tax invoice if your accountant distinguishes document types."
      },
      {
        "question": "Should estimates show payment terms?",
        "answer": "Yes—deposit percent and net due days set expectations before the first invoice. Payment terms on the estimate should match the contract and every invoice that follows."
      },
      {
        "question": "Who keeps the signed estimate?",
        "answer": "Both parties should have a PDF copy. Your job file is the source of truth when the client misplaces email attachments years later during a warranty call."
      }
    ]
  },
  {
    "slug": "line-item-totals-explained",
    "title": "How Line-Item Totals Work on Estimates and Invoices",
    "metaDescription": "Plain-English math for quantity × rate, subtotals, tax, deposits and amount due—with a worked example you can recreate in our free generators.",
    "answerFirst": "Most trade documents price each line as quantity times rate, sum those amounts into a subtotal, apply a tax percentage, then show deposits or amounts already paid. Understanding that chain prevents underbilling when you mix labor hours and lump-sum materials. One wrong quantity field can skew an entire job—check line math before you send any PDF.",
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
        "body": "Line amount equals quantity multiplied by rate. Subtotal equals the sum of line amounts. Tax equals subtotal times tax rate divided by one hundred when all lines are taxable at one rate. Total equals subtotal plus tax.\n\nDeposit equals total times deposit percent divided by one hundred when you collect an upfront percentage. Amount due on an invoice equals total minus amount already paid.\n\nWhen a line uses lump sum, set quantity to one and put the full price in the rate column so the math chain stays consistent in spreadsheets and generators."
      },
      {
        "heading": "Mixed units and lump sums",
        "body": "Labor may be hourly while materials are lump sum and flooring is per square foot. The math is the same per line; only the unit label changes. Do not put a full package price in the rate column and also set quantity above one unless you mean multiple packages.\n\nLabel tax-exempt lines when your state exempts certain labor or products. Generators may apply one rate to the subtotal you enter; adjust lines before export if you need split tax."
      },
      {
        "heading": "Rounding and client-facing PDFs",
        "body": "Round money to cents on the PDF your client sees. Tiny floating-point differences in spreadsheets should not change the printed total. If your tool shows extended amounts per line, verify each line equals quantity times rate before trusting the subtotal.\n\nWhen deposit percent produces fractional cents, round deposit to cents and state that the final invoice reconciles any penny difference."
      },
      {
        "heading": "Deposits vs partial payments",
        "body": "A deposit line on an estimate is informational until you invoice it. On an invoice, move paid amounts into amount paid so balance due reflects reality. Multiple partial payments sum into amount paid.\n\nReceipts document each payment event without replacing running balance on the next invoice.\n\nWhen a client pays deposit by check and progress by card, amount paid should show both methods on the final invoice or attach two receipts—AP teams reject vague paid in full with no trail."
      },
      {
        "heading": "Worked example: remodel subtotal",
        "body": "Three lines: twenty-four hours labor at seventy-five dollars equals eighteen hundred dollars; materials lump sum forty-two hundred dollars; flooring two hundred twenty square feet at two dollars fifty equals five hundred fifty dollars. Subtotal six thousand five hundred fifty dollars. Tax at eight point three one percent equals about five hundred forty-four dollars thirty-one cents. Total about seven thousand ninety-four dollars thirty-one cents.\n\nThirty percent deposit is about two thousand one hundred twenty-eight dollars twenty-nine cents. Change any rate in the construction estimate generator and the live preview recalculates the same way."
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
        "body": "Field staff who understand quantity times rate catch typos before clients do. Post a one-page cheat sheet near the office printer with your standard tax rate and deposit percent.\n\nWhen clients ask why the total changed, walk them line by line rather than debating the bottom number. Export PDFs from the same generator for estimates and invoices so formatting stays familiar. If you import CSV from suppliers, round only at the line level you show the client to avoid penny drift."
      },
      {
        "heading": "Retainage and holdbacks",
        "body": "Commercial construction sometimes shows retainage withheld from each progress invoice. Amount due may be line total minus retainage percent until substantial completion. Your generator may show amount paid including retainage tracked off-document in your ledger.\n\nExplain retainage in cover email so clients do not think you forgot to bill the last ten percent."
      },
      {
        "heading": "Shipping and fees as lines",
        "body": "Freight and rush fees should be their own lines with quantity one and a lump rate so clients see them before tax. Bundling freight into material lines hides margin and complicates change orders when delivery fails.\n\nDiscount lines work best as negative amounts with a label like loyalty credit so subtotal math stays transparent."
      },
      {
        "heading": "Checking math before export",
        "body": "Sort lines by dollar amount and verify the top three manually each time you send a large PDF. Typos in quantity—twenty instead of two—hide until the client pays.\n\nWhen you import supplier CSVs, confirm unit of measure matches your template. Sheets sold by the box should not use per-sheet rates without converting units."
      }
    ],
    "faq": [
      {
        "question": "Should labor and materials be separate lines?",
        "answer": "Yes when tax treatment or client comparison benefits. Separation also makes change orders clearer when material cost swings. Combined lines are fine for small residential jobs when your accountant treats the package as one taxable total."
      },
      {
        "question": "Does the generator file my taxes?",
        "answer": "No. It multiplies and sums the numbers you enter. Confirm rates with your accountant or local rules."
      },
      {
        "question": "What if tax rates change mid-project?",
        "answer": "Use the rate effective on invoice date for billed work. Note the rate on each PDF."
      },
      {
        "question": "Can I discount after subtotal?",
        "answer": "Apply discounts as negative lines or adjust subtotal before tax per your accountant's preference. Be consistent across jobs."
      },
      {
        "question": "Why does my spreadsheet total differ by a penny?",
        "answer": "Rounding order matters. Round per line or per total consistently with your generator settings."
      },
      {
        "question": "How do I show multiple tax rates?",
        "answer": "Split lines by rate or show separate subtotals per jurisdiction if your generator supports one rate at a time. Manual PDFs may need two tax lines labeled city and state."
      },
      {
        "question": "What if quantity is fractional?",
        "answer": "Hours often use decimals such as two point five. Round extended amounts to cents on the client PDF even when internal timesheets use minute precision."
      },
      {
        "question": "How do I verify the generator total?",
        "answer": "Spot-check one line manually, then compare subtotal to your spreadsheet sum. Fix the line with the largest dollar amount first when totals disagree."
      },
      {
        "question": "Should I show unit prices on lump-sum lines?",
        "answer": "Use quantity one and the lump amount as rate so extended total equals the package price. Hiding math inside description-only lines makes change orders harder to audit."
      }
    ]
  },
  {
    "slug": "freelance-payment-schedule-milestones",
    "title": "Freelance Payment Schedules: Deposits and Milestones",
    "metaDescription": "How to structure deposits and milestone payments in freelance and web design contracts, plus a free contract template with editable clauses.",
    "answerFirst": "A clear payment schedule names the deposit to start, amounts tied to milestones such as design approval and launch, and when the final balance is due. Put those numbers in the contract before work begins so invoices are paperwork, not negotiation. When milestones align with deliverables, you spend less time chasing payment after emotionally draining revision rounds.",
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
        "body": "Freelancers get stuck when scope creeps but payment stays vague. Milestones tied to deliverables such as wireframes approved, staging site live, or brand guide delivered give both sides a shared definition of done.\n\nIRS materials for independent contractors stress documenting business terms. Your contract is where payment clarity lives alongside scope and ownership.\n\nNet-thirty after delivery favors the client cash-flow wise; milestone schedules keep your rent paid while long builds run. Agencies copying corporate AP habits onto solo freelancers is a negotiation point—propose milestones before you accept the SOW."
      },
      {
        "heading": "A simple three-part pattern",
        "body": "Common web projects use thirty to forty percent to start, thirty to forty percent at a mid milestone, and the balance before final files or go-live. Name each milestone in the statement of work with dates or review windows.\n\nLate-fee or pause-work language should be reviewed by counsel if you enforce it. State whether the deposit is refundable before work starts and non-refundable after a cancellation window.\n\nPut milestone percentages in the contract body and repeat them in an appendix table so clients see the math without hunting through legalese."
      },
      {
        "heading": "Invoices, receipts, and processor fees",
        "body": "When you invoice each milestone, match line items to the contract schedule. If clients pay by card, factor processor fees into pricing so net cash still covers the work.\n\nIssue a receipt after each cleared payment. The invoice requests; the receipt proves payment for both tax records and client peace of mind.\n\nName the milestone in the invoice subject line—wireframe approval—so accounting approvers do not confuse it with the launch invoice sitting in the same inbox."
      },
      {
        "heading": "NDAs and kickoff",
        "body": "If kickoff requires confidential brand assets, a simple NDA can sit beside the services agreement. Keep documents separate so payment terms stay readable and confidentiality obligations stay in one place.\n\nDo not hide payment triggers inside NDA text."
      },
      {
        "heading": "Worked example: five-page marketing site",
        "body": "Total fee six thousand dollars. Deposit forty percent twenty-four hundred dollars due at signing to reserve calendar. Milestone two thirty percent eighteen hundred dollars due when client approves wireframes in writing. Final thirty percent eighteen hundred dollars due before DNS cutover to production.\n\nEach milestone invoice references the contract section and lists no additional hours unless a change order is signed. Rush requests after approval bill at stated hourly overage rate."
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
        "body": "When clients request extra pages or features, pause and issue a written change order with new milestone amounts before coding continues. Track hours even on fixed bids so you learn which packages underprice discovery.\n\nAutomate reminder emails three days before milestone due dates tied to contract triggers, not vague when you feel like it. If a client disappears mid-project, your contract should say work pauses and dates shift; invoices already due remain owed. Pair milestone releases with tangible artifacts: PDF sign-off, ticket closure, or staging URL password handoff."
      },
      {
        "heading": "Joint ventures and shared credit",
        "body": "When two freelancers collaborate, split milestones in a simple collaboration memo before client signatures. One lead invoices the client; internal splits stay off the client PDF.\n\nCredit card autopay on milestone dates reduces awkward collection calls but requires written authorization stored with the contract."
      },
      {
        "heading": "Fixed bids vs hourly discovery",
        "body": "Discovery-heavy projects may bill the first milestone hourly with a cap, then switch to fixed phases after requirements are stable. State the switch trigger in the statement of work.\n\nUncapped hourly discovery without client checkpoints invites bill shock—schedule readout meetings before each milestone invoice."
      },
      {
        "heading": "Late pay and pause-work language",
        "body": "Contracts often say work pauses when an invoice is overdue by a stated number of days. Have counsel review pause and resume wording so you do not breach deliverable dates on your side.\n\nSend milestone invoices the same day you deliver the artifact clients must approve—waiting two weeks trains clients to pay late.\n\nInclude your ACH or wire details on every milestone invoice so finance teams do not email you twice for routing numbers."
      }
    ],
    "faq": [
      {
        "question": "Should the deposit be refundable?",
        "answer": "Say so explicitly. Many freelancers make the deposit non-refundable after a short cancellation window because calendar time was reserved. Refundable deposits should name the exact calendar date when they become non-refundable."
      },
      {
        "question": "What if the client stalls approvals?",
        "answer": "Contracts can include review periods after which work is deemed approved if feedback is silent. Have an attorney tailor auto-approval language."
      },
      {
        "question": "Can I withhold files until paid?",
        "answer": "License and delivery clauses often tie file release to final payment. Counsel should align wording with copyright ownership terms."
      },
      {
        "question": "How do change orders affect milestones?",
        "answer": "Bill material scope changes on separate invoices or amended milestone amounts signed before extra work begins."
      },
      {
        "question": "Is this legal advice?",
        "answer": "No. These are operational patterns. An attorney should review enforceability in your state."
      },
      {
        "question": "What about hourly maintenance after launch?",
        "answer": "Bill retainers or prepaid hour buckets on separate invoices from the build milestones. State rollover and expiration in the contract."
      },
      {
        "question": "How do I invoice rush work?",
        "answer": "Add a rush fee line or higher milestone percent in a signed change order before nights-and-weekends work starts. Reference the rush clause in the invoice memo."
      },
      {
        "question": "Should milestones match calendar dates?",
        "answer": "Tie triggers to deliverables, not arbitrary dates, unless you run a retainer. Calendar dates slip; approved wireframes do not."
      },
      {
        "question": "How do I handle client-owned accounts?",
        "answer": "When clients pay for hosting or stock accounts directly, milestones should cover your labor only. Note in the contract that delays waiting for client credentials pause the schedule without waiving due invoices for completed milestones."
      },
      {
        "question": "What currency should milestones use?",
        "answer": "State currency on the contract and invoices. International clients may pay in USD while you book in local currency—document exchange expectations before the deposit clears."
      },
      {
        "question": "Should I invoice sales tax on each milestone?",
        "answer": "Follow your accountant's guidance—some businesses accrue tax on each progress payment, others on final delivery. Use the same approach on every milestone invoice in a project."
      }
    ]
  },
  {
    "slug": "what-to-include-on-a-receipt",
    "title": "What to Include on a Payment Receipt (Small Business)",
    "metaDescription": "Payment receipt essentials: seller info, date, amount, method, and invoice reference. Free receipt generator for service businesses.",
    "answerFirst": "A clear payment receipt shows who paid whom, when, how much, payment method, and what the payment was for, often with an invoice or estimate number. It confirms money received; it does not replace an invoice that requested payment. Many small businesses only issue receipts when asked—proactive receipts after deposits reduce reimbursement delays for corporate clients and keep your books aligned with bank deposits.",
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
        "body": "An estimate proposes work and price. An invoice requests payment. A receipt proves payment happened. Clients sometimes ask for a receipt after paying an invoice; contractors may issue a receipt for a walk-in deposit before a formal invoice exists.\n\nKeep titles accurate. A PDF labeled invoice that only confirms payment will confuse bookkeeping."
      },
      {
        "heading": "Seller and buyer identification",
        "body": "Include your business legal or trade name, address, and contact phone or email. Show client or payer name. For consumer jobs, the job site address may appear in the description field.\n\nIf you are a sole proprietor, your name and EIN or SSN handling follow IRS recordkeeping practices you discuss with your tax preparer; the receipt should still show a professional business identity.\n\nProperty managers paying on behalf of tenants should show both payer name and unit address so ledgers reconcile to the correct lease file."
      },
      {
        "heading": "Amount, method, and reference numbers",
        "body": "State the amount received in dollars and cents, payment method such as check, card, cash, or transfer, and the date paid. Reference the invoice number, estimate number, or contract section the payment applies to.\n\nIf the payment is a partial deposit, say remaining balance per the invoice. If it is final payment, say paid in full."
      },
      {
        "heading": "Description of goods or services",
        "body": "One or two lines are enough: deposit for kitchen remodel per invoice 1042, or annual maintenance plan renewal. Detailed line items usually stay on the invoice; the receipt summarizes.\n\nFor donations or retail, SKU detail may matter; for services, link to the invoice line items instead of duplicating entire tables.\n\nInclude the service date on the receipt when clients expense multiple visits in one month—finance teams match receipts to calendar months."
      },
      {
        "heading": "Worked example: contractor deposit receipt",
        "body": "Smith Renovations LLC receives twenty-five hundred thirty dollars from Jane Doe on March 4 by card for thirty percent deposit on bathroom remodel per invoice 2026-014. Receipt notes balance due per invoice before final inspection. Client email and phone appear in header for delivery.\n\nYou generate the PDF from the receipt generator, store a copy with the job file, and attach to the thank-you email. The invoice 2026-014 still shows amount paid updating on the next progress bill."
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
        "body": "Store receipts with the same job number as invoices in your folder structure. The IRS expects income records; receipts support cash sales when no invoice preceded payment.\n\nFor chargebacks, the receipt plus signed authorization helps your processor. Voided payments need a new receipt or credit memo note, not a silent delete. When clients pay in foreign currency, show the amount received in the currency you book unless your policy states otherwise.\n\nEmail PDF receipts to clients automatically when your payment tool supports it so both parties have matching copies the same day."
      },
      {
        "heading": "Retail and service hybrids",
        "body": "Shops that sell products and services on one visit can show product SKUs on the invoice and summarize on the receipt, or issue itemized receipts when returns are common. Warranty start dates on receipts help both parties for tool and equipment sales."
      },
      {
        "heading": "Cash payments and internal controls",
        "body": "Cash receipts should name the employee who accepted payment when your policy requires dual control. Serial receipt numbers prevent gaps that auditors flag.\n\nFor mobile card readers, include last four digits of the card on the receipt when the processor provides them—it speeds up client expense reports."
      },
      {
        "heading": "Chargebacks and partial refunds",
        "body": "When a card payment is reversed, issue a receipt or credit note showing the reversal amount and date. Link it to the original receipt number.\n\nPartial refunds for unused retainers should say which invoice line was credited so the client's books stay balanced.\n\nFor check payments, note check number on the receipt so duplicate deposit errors are easy to trace in bank feeds."
      }
    ],
    "faq": [
      {
        "question": "Do I need a receipt if I sent an invoice?",
        "answer": "Yes when clients want proof of payment for reimbursement or taxes. Mark the invoice paid in your books and still issue a receipt if they ask. Corporate card programs often reject reimbursements without a receipt even when the invoice was already approved."
      },
      {
        "question": "Should receipts show tax?",
        "answer": "If tax was on the invoice, the receipt can repeat total tax paid or say see invoice for tax detail. Follow your accountant's preference."
      },
      {
        "question": "Are digital receipts valid?",
        "answer": "Email PDF receipts are widely accepted. Keep copies as long as your record retention policy requires."
      },
      {
        "question": "What about tips?",
        "answer": "Show tip as a separate line when it is not part of the invoiced service fee so restaurant and event clients can reconcile payroll."
      },
      {
        "question": "Can one receipt cover multiple invoices?",
        "answer": "Yes if you list each invoice number and amount allocated. Avoid vague lump sums when clients use cost centers."
      },
      {
        "question": "Do charities need special receipt wording?",
        "answer": "Tax-exempt organizations follow IRS acknowledgment rules for donations, which differ from service receipts. This guide focuses on business payments for goods and services."
      },
      {
        "question": "Should I email or print receipts?",
        "answer": "Match client preference but keep your copy in the cloud. Email delivery timestamps help when a client claims they never received proof of payment."
      },
      {
        "question": "What if the client overpays?",
        "answer": "Issue a receipt for the amount received and note credit balance or refund method. Do not apply overpayment to a different job without written client approval."
      },
      {
        "question": "Do receipts need line-item detail?",
        "answer": "Service businesses usually summarize on the receipt and keep detail on the invoice. Retail may itemize every SKU on the receipt when returns are common."
      },
      {
        "question": "How long should I keep receipt copies?",
        "answer": "Follow IRS and state record retention guidance your preparer recommends. Digital PDFs in cloud storage beat shoeboxes when auditors ask for a three-year-old job."
      },
      {
        "question": "Should receipts match invoice numbers?",
        "answer": "Yes—carry the invoice number on every receipt so partial payments stack cleanly. Mismatched numbers confuse clients running three cards on one remodel. Use the same date format as your invoices—ISO yyyy-mm-dd—to avoid timezone confusion on international jobs."
      }
    ]
  },
  {
    "slug": "cleaning-invoice-rates-line-items",
    "title": "Cleaning Service Invoices: Rates and Line Items",
    "metaDescription": "Price house and commercial cleaning with hourly, flat, and per-room line items. Tax, supplies, and travel on your cleaning service invoice template.",
    "answerFirst": "Cleaning invoices work best when you separate recurring service, deep-clean extras, supplies, and travel into labeled lines with clear units. Match the quote you gave so clients see the same math on billing day. Consistent line names across quotes and invoices cut billing calls after the first month of service.",
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
        "body": "Residential cleaners often bill flat per visit based on bedrooms, bathrooms, and square footage, or hourly with a minimum. Commercial accounts may use contracted monthly square footage or nightly janitorial hours.\n\nPick one primary model per client and document it on the first quote. Switching models mid-relationship without notice creates disputes.\n\nMove-in and move-out cleans often use a higher flat tier than weekly maintenance because ovens, cabinets, and baseboards take extra time. Publish the tier names on your website so quotes and invoices use identical labels."
      },
      {
        "heading": "Line items clients understand",
        "body": "Standard visit might be one line: recurring clean three bed two bath flat rate one hundred forty dollars. Add-ons get their own lines: inside oven, inside fridge, interior windows, laundry fold.\n\nSupplies can be included in the flat rate or itemized when clients provide products versus when you bring eco-certified supplies at a markup.\n\nName rooms on deep-clean invoices when clients dispute scope—master bath deep scrub versus hall bath quick clean clarifies why the total rose versus maintenance visits."
      },
      {
        "heading": "Travel, keys, and access fees",
        "body": "Long drive times or parking fees belong on the invoice if they were disclosed in the quote. After-hours or holiday service often carries a multiplier stated upfront.\n\nIf a lockout or missed access wastes a trip, your policy should appear in terms; the invoice references the trip fee line when charged."
      },
      {
        "heading": "Tax and tips",
        "body": "Sales tax on cleaning varies by state and whether labor is taxable. Show tax on a labeled subtotal. Gratuity is voluntary unless your jurisdiction treats mandatory service charges differently; label accordingly.\n\nCommercial clients may require PO numbers on the invoice header.\n\nIf you exempt certain nonprofit clients from tax, note the exemption certificate number on the invoice memo line your accountant prefers."
      },
      {
        "heading": "Worked example: move-out deep clean",
        "body": "Move-out clean empty three bed two bath home: base deep clean flat three hundred twenty dollars. Add-ons: oven forty dollars, fridge thirty-five dollars, interior windows twelve panes at four dollars forty-eight dollars. Travel zone fee fifteen dollars. Subtotal four hundred twenty-three dollars plus tax.\n\nInvoice notes service date and that supplies were provided by company. Client pays by card; receipt issued after capture. Same lines could have appeared on a quote estimate generator PDF before booking."
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
        "body": "After three visits you know true time on site; adjust flat rates at renewal rather than surprising mid-contract. Document pet hair, clutter, or excessive soap scum policies in the quote so trip fees are expected.\n\nTeam leads should note add-ons completed on a job sheet that office staff translate to invoice lines the same day. Commercial clients may require monthly statements summarizing visits; line items should match work orders when you use them."
      },
      {
        "heading": "Green products and occupancy rules",
        "body": "Eco-friendly product lines may cost more; disclose surcharges in quotes tied to specific brands. Occupied homes need rules about moving fragile items—invoice notes when clients declined declutter add-on and extra time resulted.\n\nPets at home may require extra vacuum time; note pet surcharge on the quote so the invoice does not surprise dog owners."
      },
      {
        "heading": "Commercial accounts and inspections",
        "body": "Office clients may require invoices split by cost center or floor. Match work-order numbers from their facilities portal on your PDF header.\n\nPost-construction cleans for builders often use punch-list walkthroughs before final invoice. Photo document each room on completion day in case the GC disputes a line."
      },
      {
        "heading": "Team pay and internal rates",
        "body": "Your invoice rates to clients may differ from wages you pay crews—keep internal rate sheets separate from client PDFs. When two cleaners work a job, one client-facing line for crew hours is usually enough unless the contract demands names.\n\nHoliday surcharges should appear on both quote and invoice the same week so recurring clients are not surprised on Christmas Eve visits.\n\nNote parking or toll reimbursements on commercial invoices when the building does not validate vendor parking."
      }
    ],
    "faq": [
      {
        "question": "Should I invoice before or after the visit?",
        "answer": "Residential recurring clients often auto-charge after service. Commercial accounts may invoice monthly in arrears. State terms on the first quote. Failed card charges should trigger a written retry policy before you skip the next visit."
      },
      {
        "question": "How do I price first-time cleans?",
        "answer": "Many companies charge a higher initial deep clean then drop to maintenance rate. Show both lines on the first invoice for transparency."
      },
      {
        "question": "What if the home is dirtier than expected?",
        "answer": "Photograph conditions and get written approval before adding hours or a heavy-soil surcharge line."
      },
      {
        "question": "Do I list each cleaner's hours?",
        "answer": "Usually no for flat rates. Hourly jobs may show crew hours as one line unless contract requires detail."
      },
      {
        "question": "Can I bundle supplies into the flat rate?",
        "answer": "Yes if margin covers consumables. Itemize when commercial clients require cost separation."
      },
      {
        "question": "How do I quote post-construction cleans?",
        "answer": "Use hourly or per-square-foot lines with a site visit. Construction dust loads differ from maintenance cleans; photos justify higher rates on the invoice."
      },
      {
        "question": "How do I handle cancellations?",
        "answer": "State notice hours on the quote—twenty-four or forty-eight hours is common for residential. Invoice the cancellation fee line only when your terms were accepted in writing at booking."
      },
      {
        "question": "Should tips appear on the invoice?",
        "answer": "Tips are usually separate from the invoice total unless you run a mandatory service charge allowed in your area. Leave a tip line off PDFs if your processor handles gratuity at payment."
      },
      {
        "question": "How do I bill recurring cleans?",
        "answer": "Use the same line label every visit so clients recognize the charge on autopay. Annual rate increases should reference the original quote date and notice period in your terms."
      },
      {
        "question": "What about key pickup fees?",
        "answer": "Disclose lockbox or concierge access fees on the first quote. Invoice them as a flat access line when your team must make an extra trip for keys."
      },
      {
        "question": "How do I show discounts on cleaning invoices?",
        "answer": "Use a negative line or reduced flat rate labeled referral or first-visit promo. Note the promo code in the memo so the client remembers why this visit cost less."
      }
    ]
  },
  {
    "slug": "nda-basics-for-freelancers",
    "title": "NDA Basics for Freelancers and Contractors",
    "metaDescription": "When freelancers need NDAs, mutual vs one-way terms, and what to define before sharing client work. Free simple NDA template—not legal advice.",
    "answerFirst": "A non-disclosure agreement limits how parties may use confidential information shared during a project. Freelancers often sign one-way NDAs before receiving brand assets or one-way NDAs from clients, or mutual NDAs when both sides share sensitive data. Read the definition and term sections before you paste a client NDA into your signature tool—those two clauses drive most disputes.",
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
        "body": "Sign or offer an NDA before exchanging unreleased product designs, customer lists, financial projections, or unpublished marketing campaigns. Public websites and press releases are usually not confidential.\n\nSmall engagements may use a short mutual NDA at kickoff while the larger services contract is being finalized.\n\nIf the client sends login credentials or production database access, pair the NDA with a separate security expectations email covering password handling and two-factor devices you control."
      },
      {
        "heading": "One-way vs mutual",
        "body": "One-way NDAs bind the receiving party, often the freelancer, not to disclose the client's secrets. Mutual NDAs bind both sides when each shares sensitive roadmaps, as in agency partnerships.\n\nRead who is disclosing and who is receiving. Copy-paste mutual templates into one-way deals by mistake happens often.\n\nIf only you receive data, ask whether a mutual NDA is overkill—or whether you will share your own tooling insights that also deserve protection."
      },
      {
        "heading": "Definition of confidential information",
        "body": "Good NDAs define what counts as confidential: marked confidential, orally identified and confirmed in writing, or reasonably understood as secret. They list exclusions such as public domain, independently developed, or rightfully received from a third party.\n\nOverbroad definitions may be unenforceable; counsel should tune scope.\n\nPublic pricing on a website is usually not confidential—do not let clients sweep already-published marketing into NDA coverage without pushback."
      },
      {
        "heading": "Term, return of materials, and remedies",
        "body": "State how long confidentiality lasts after the project ends. Require return or destruction of files on termination. Remedies may include injunctive relief language reviewed by an attorney.\n\nNDAs do not replace work-for-hire or license terms in your services contract.\n\nSurvival clauses often keep confidentiality obligations for two to five years; trade secrets may need longer terms when counsel agrees. Email the client when you finish destruction so there is a paper trail."
      },
      {
        "heading": "Worked example: brand asset handoff",
        "body": "A SaaS startup hires a freelance designer. Mutual NDA signed day one. Client shares Figma files and unreleased pricing PDF. Designer shares draft UI not yet public. Term two years from last disclosure. Exclusions apply to information already on the marketing site.\n\nServices contract follows with payment milestones. Portfolio rights for designer are negotiated in the services agreement, not silently assumed in the NDA."
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
        "body": "Watch for perpetual confidentiality on information that is not secret, non-competes disguised as NDAs, or one-sided indemnity. Ask to narrow definition to documents marked confidential and project-specific oral disclosures confirmed in email.\n\nIf a client refuses to sign your mutual NDA but demands yours, consider whether the engagement risk is worth it. Store executed NDAs with the project folder and note expiration dates on your calendar for destruction reminders.\n\nCompare each client NDA to your last signed version so you notice new non-solicit sentences slipped into revision three."
      },
      {
        "heading": "Investor decks and beta programs",
        "body": "Startup NDAs often cover pitch decks and beta metrics. Freelancers building landing pages before public launch should confirm what screenshots may appear in portfolio after embargo lifts.\n\nWhistleblower and legal complaint carve-outs are standard in mature NDAs; do not accept language that blocks reporting unlawful conduct."
      },
      {
        "heading": "Ending confidentiality cleanly",
        "body": "When a project ends, email confirmation that you deleted client files from local drives and cloud sync folders. Keep a destruction log if the NDA requires it.\n\nIf the client asks you to retain files for a future phase, amend the NDA term or services contract so retention has a written end date."
      },
      {
        "heading": "NDAs with agencies and primes",
        "body": "Prime contractors may flow NDAs down to freelancers even when you never meet the end client. Read whether the prime can share your work product with their customer without another approval.\n\nIf you subcontract, your NDA with the prime should allow flow-down to your assistant who touches files.\n\nCalendar NDA expiration dates when confidentiality survives five years—you may still be bound long after the project folder is archived."
      }
    ],
    "faq": [
      {
        "question": "Can I use one NDA for all clients?",
        "answer": "A baseline mutual NDA helps, but clients may require their paper. Compare term and non-solicit clauses before signing. Your simple NDA template is a starting point—not a substitute for client legal review when they send fifty-page vendor packets."
      },
      {
        "question": "Does an NDA stop me from showing portfolio work?",
        "answer": "Only if confidential information appears or the services contract restricts portfolio use. Negotiate portfolio carve-outs separately. Blur unreleased UI and remove customer names when counsel allows a case study after launch."
      },
      {
        "question": "Are NDAs the same as non-competes?",
        "answer": "No. Non-competes restrict work; NDAs restrict disclosure. Some client NDAs sneak broad non-solicit language—read carefully. Ask to strike language that prevents you from serving non-competing clients in your specialty."
      },
      {
        "question": "Should subcontractors sign too?",
        "answer": "Yes if they touch confidential files. Flow-down obligations should appear in your subcontractor agreement. You remain responsible to the client if a subcontractor leaks data."
      },
      {
        "question": "Is email without an NDA safe?",
        "answer": "Risky for true trade secrets. Use an NDA or at least mark attachments confidential and confirm in writing. Avoid forwarding client decks to personal email accounts that sync to unsecured devices."
      },
      {
        "question": "Can an NDA cover public launch dates?",
        "answer": "Only if dates are confidential and not already marketed. Define embargo periods clearly and end them on the launch day in writing. After embargo, confirm in email that portfolio use is allowed."
      },
      {
        "question": "Do NDAs cover verbal conversations?",
        "answer": "Many NDAs cover oral disclosures only when confirmed in writing within a few days. Send a recap email after sensitive calls so both sides agree what was confidential."
      },
      {
        "question": "Can I refuse a client's NDA?",
        "answer": "Yes when terms are overbroad or block your other work. Propose your mutual template or walk away from engagements that demand perpetual silence on general skills."
      },
      {
        "question": "Does an NDA protect my ideas too?",
        "answer": "Only in a mutual NDA where your disclosures are listed or marked confidential. One-way client paper often forgets freelancer pre-existing IP—add a carve-out for your toolkit and methods."
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
        "body": "Estimates and quotes explain what you will do and for how much before work starts. They include validity dates, deposits, and assumptions. Clients compare estimates to choose a vendor.\n\nEstimates are not usually payment demands unless labeled as a pro forma invoice, which confuses everyone.\n\nUse the estimate to document exclusions—weekend work, hazardous material handling, or owner-supplied fixtures—so the work order later does not sprawl. Version estimates when scope changes instead of scribbling margins on a printed copy. Sales teams should log estimate send dates in CRM so follow-up happens before validity expires."
      },
      {
        "heading": "Work order: authorizing the work",
        "body": "A work order is an operational document: who requested service, location, priority, tasks, parts needed, and technician assignment. Property managers and facilities teams issue work orders; contractors may issue them to crews after a contract is signed.\n\nWork orders may reference estimate line IDs so field labor knows what is in scope without renegotiating price on site.\n\nInclude safety notes, lockout-tagout requirements, and tenant access windows on the work order even when they are absent from the client-facing estimate. Photos of nameplates and serial numbers belong on the work order packet for HVAC and appliance jobs. Status fields—open, in progress, complete—help dispatchers avoid double-booking technicians."
      },
      {
        "heading": "Invoice: collecting money",
        "body": "Invoices bill for labor and materials delivered, often per work order completion or milestone. They include due dates, tax, and payment instructions.\n\nClose the loop with receipts when payments arrive.\n\nInvoice line descriptions should mirror work order task names so accounts payable can match packing slips and time sheets. Bill materials at quoted rates unless a change order authorized substitutes. Partial completion may warrant progress invoices tied to percent complete on the work order checklist."
      },
      {
        "heading": "Keeping numbering and scope aligned",
        "body": "Use cross-references: work order 5501 ties to estimate E-104 and invoices INV-2201 through INV-2203. When tasks change, issue a change order on the estimate before adding lines to the work order and invoice.\n\nField teams should not promise extras not on the work order without office approval.\n\nTrain technicians to note actual hours and parts used on the work order even when the client pays a flat rate, so you learn true job cost. Property managers often require work order numbers on vendor invoices before they release payment. A single shared job folder with estimate PDF, signed change orders, work order export, and invoices prevents email archaeology during disputes."
      },
      {
        "heading": "Worked example: HVAC service call",
        "body": "Building manager requests annual service. Estimate lists twelve rooftop units at ninety-five dollars each plus filters lump sum. Manager signs contract. Work order WO-882 assigns tech for Tuesday with unit list and safety notes. Tech completes eleven units; one shut down by owner.\n\nInvoice bills eleven units and filters per estimate rates, notes unit twelve skipped per client instruction. Receipt issued after ACH payment. Work order marked complete in CMMS."
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
        "body": "Small shops may use estimate PDF plus texted work authorization; enterprises need CMMS integration. Pick a workflow your office will actually maintain.\n\nPhotos and notes on the work order support invoice disputes when clients forget they approved extra valve replacements. Close work orders when invoiced so technicians do not duplicate effort. Train clients that only signed change orders on the estimate authorize billable extras.\n\nIf you use spreadsheets, protect estimate tabs from accidental edits after client signature. Export work orders to PDF before technicians leave the shop so markup on phones does not replace the official task list."
      },
      {
        "heading": "Emergency and after-hours calls",
        "body": "Emergency work orders should state after-hours rates that flow to the invoice without re-approval when the contract authorizes emergency response. Photos of failed equipment attached to the work order support invoice line descriptions for parts replaced.\n\nNote arrival time and resolution time on the work order for time-and-materials emergency clauses. When the client declines a recommended repair, document declined work on the work order so future failures are not blamed on your crew."
      },
      {
        "heading": "Residential vs commercial document habits",
        "body": "Homeowners may sign one estimate and receive a single completion invoice. Commercial facilities expect work order numbers on every truck roll and monthly statement billing. Match your document set to what the client's AP department will accept the first time.\n\nWarranty callbacks should reference the original work order and invoice so you know whether labor is covered. Free warranty trips still deserve a work order for scheduling even when the invoice shows zero dollars."
      }
    ],
    "faq": [
      {
        "question": "Can a work order include prices?",
        "answer": "Some do for internal cost tracking; client-facing price usually stays on estimate and invoice. Avoid giving field staff client pricing they should not negotiate. If prices appear on internal work orders, watermark them as internal so they are not mistaken for client quotes."
      },
      {
        "question": "Do I need a work order for every visit?",
        "answer": "Recurring maintenance contracts often generate automatic work orders. One-off residential jobs may skip formal work orders if the signed estimate is enough for a small crew. Document the exception in your operations manual so new hires do not skip authorization on large jobs."
      },
      {
        "question": "What if actual hours exceed the estimate?",
        "answer": "Stop and get a change order before invoicing overages unless the contract allows time-and-materials caps. Attach time-stamped photos to the work order when extra hours stem from concealed damage the client could not have known about."
      },
      {
        "question": "Is a work order a contract?",
        "answer": "Usually not by itself. It executes against a contract or approved estimate. The signature on the estimate or master services agreement is what creates legal obligation; the work order is the task list."
      },
      {
        "question": "How does this relate to tickets?",
        "answer": "Help desk tickets resemble work orders for IT. Same idea: authorize work, then bill separately. Ticket closure should trigger invoice creation in your billing checklist so billable hours are not lost at month end."
      },
      {
        "question": "Should tenants see work orders?",
        "answer": "Property managers often share simplified work orders without internal cost codes. Tenants still receive invoices or ledger charges through the landlord portal separately. Never put one tenant's unit access codes on a work order left visible in a shared hallway."
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
        "body": "List event dates, hours, locations, number of operators, cameras, audio package, lighting, and drone use if applicable with permit responsibility. Note meal breaks for long wedding days.\n\nSecond shooters and backup gear should be promised only if written in scope.\n\nSpecify who captures audio for vows and toasts—on-camera mic, wireless lav, or separate recorder—and who is responsible if a venue bans tripod placement in the aisle. Travel days, per diem, and mileage for destination jobs belong in scope when they affect crew cost."
      },
      {
        "heading": "Deliverables and post-production",
        "body": "Specify film length, highlight versus documentary cuts, color grade level, and number of revision rounds. State delivery format such as digital download, resolution, and whether raw footage is included.\n\nRush delivery fees belong here. Archival storage duration should be explicit before files are deleted.\n\nDefine what a revision round includes: one consolidated email of notes, not endless one-line texts. Caption files, vertical social cuts, and chapter markers for long ceremonies can be separate deliverables with their own deadlines so post-production scope stays bounded."
      },
      {
        "heading": "Music, logos, and third-party rights",
        "body": "Licensed music for public YouTube or broadcast requires proper clearance. Contracts often state client must license music for commercial use or accept royalty-free tracks you provide.\n\nCorporate logos and trademarks in video may need client warranties that they have rights to depict branded assets.\n\nStock footage, map animations, and font licenses should list who pays renewal fees if the client keeps using the video for years. Wedding highlight songs licensed for personal sharing may need a different track if the couple monetizes a YouTube channel."
      },
      {
        "heading": "Payment, cancellation, and liability",
        "body": "Mirror photography patterns: retainer, balance due dates, reschedule windows, and force majeure. Cap liability to fees paid where counsel approves.\n\nOvertime hours beyond package should have hourly rates stated before the event.\n\nState whether retainer is transferable to a new date and how many postponements are included. Equipment loss and backup camera policies matter when you promise a second shooter; if only one operator is booked, say so plainly."
      },
      {
        "heading": "Worked example: wedding highlight package",
        "body": "Ten-hour coverage one lead and one second shooter. Deliverable five-to-seven minute highlight film within ninety days and ceremony audio on USB optional add-on. Two revision rounds on highlight length and song choice. Licensed song included for private sharing; client licenses separately for commercial use.\n\nRetainer forty percent, balance thirty days before wedding. Cancellation inside sixty days forfeits retainer. Raw footage not included unless purchased. Map these bullets into the videography contract template."
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
        "body": "State how long project files remain on your NAS before deletion. Restoration fees motivate clients to download deliverables promptly.\n\nColor space and codec choices should match client use: broadcast, web, or internal training. If you subcontract color or sound, confidentiality should flow to those vendors via your agreements.\n\nDeliver via password-protected download links with checksum or file-size confirmation in email. Hard drives shipped to clients should list whether return postage is required and who owns the drive after delivery."
      },
      {
        "heading": "Corporate approval chains",
        "body": "Corporate clients may need brand legal to approve contract and shot list. Build review days into delivery timeline. Social cuts for LinkedIn versus broadcast spots may be separate deliverables with separate revision limits.\n\nName the approver on the client side and what happens if feedback is late—timeline shifts or rush fees. Interview releases for employees on camera should be collected before shoot day when HR requires them."
      },
      {
        "heading": "Insurance, permits, and venue rules",
        "body": "List general liability limits and whether you name the venue as additional insured when required. Drone, generator, and grip truck parking may need permits the client orders.\n\nSome venues ban flash during ceremonies or restrict where cables may run. Attach venue rider requirements to the contract exhibit so couples know you reviewed load-in rules before signing."
      },
      {
        "heading": "Social and broadcast deliverables",
        "body": "Corporate clients may need vertical cuts, captioned files, and clean logo versions. Wedding couples may only need a highlight—do not assume broadcast rights are included.\n\nList frame rates and codecs in deliverables so editors on the client side can ingest files without re-encoding fees."
      },
      {
        "heading": "Assistant and subcontractor agreements",
        "body": "Second shooters and editors should sign confidentiality terms matching your client contract. You remain the signatory to the couple or brand—verify insurance and gear lists for anyone you add late.\n\nPay assistants on a W-2 or contractor basis per your accountant; payment terms with crew are separate from client milestone invoices."
      }
    ],
    "faq": [
      {
        "question": "Should raw footage be sold?",
        "answer": "Price it as an add-on if offered. Raw files are large and not color-graded; set expectations in writing. Specify codec, folder structure, and whether project files are included or only camera originals."
      },
      {
        "question": "Who owns the final video?",
        "answer": "Copyright often stays with the creator unless a work-for-hire clause applies. License terms should match client distribution plans. The U.S. Copyright Office registers works for creators; clients need a license, not assumptions, for ads and trade shows."
      },
      {
        "question": "What about drone shots?",
        "answer": "State FAA compliance, insurance, and no-fly restrictions. Backup ground shots if drone is grounded. Indoor venues and national parks often prohibit drones entirely—do not promise aerials without scouting."
      },
      {
        "question": "Can clients edit my work?",
        "answer": "Prohibit re-edits that misrepresent quality unless you grant source files and a license allowing modification. Color shifts and cropped logos can damage your reel; address re-edit rights in the deliverables section."
      },
      {
        "question": "How many revision rounds are fair?",
        "answer": "Two to three rounds for highlights is common. Additional rounds bill hourly when stated upfront. Require consolidated feedback per round so editors are not chasing scattered texts from wedding party members."
      },
      {
        "question": "What about live streaming the wedding?",
        "answer": "Add streaming platform, bandwidth responsibility, and recording rights. Streaming may require separate permissions from venue and musicians. Backup recording on a local device protects you when venue Wi-Fi fails mid-ceremony."
      },
      {
        "question": "Should speeches be separate deliverables?",
        "answer": "Long-form ceremony and speech files are often add-ons. State whether USB delivery, upload links, or cloud folders are included in the base package."
      }
    ]
  },
  {
    "slug": "wedding-vendor-contract-checklist",
    "title": "Wedding Vendor Contract Checklist for Couples and Planners",
    "metaDescription": "Dates, deposits, cancellation, insurance, and deliverables to verify in wedding vendor contracts—from catering to photo and video.",
    "answerFirst": "Before you sign wedding vendor contracts, verify event date and timeline, deposit and refund rules, final guest counts or deliverables, insurance and venue requirements, cancellation and force majeure, and who owns creative work after the wedding. Compare each signed PDF to the quote you used to choose the vendor so totals and deliverables still match.",
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
        "body": "Confirm legal business name, event date, start and end times, venue address, and on-site contact. Payment schedule should list deposit, interim payments, and balance due dates tied to calendar triggers, not vague upon receipt language.\n\nRead cancellation and postponement: who keeps the deposit, whether dates can transfer, and pandemic or venue closure language if still relevant to your market.\n\nCheck that the vendor's contact email and phone match the quote you approved. Typos in wedding year or venue name invalidate insurance certificates and cause day-of chaos."
      },
      {
        "heading": "Catering and rental specifics",
        "body": "Final guest count deadline, per-guest price, service style, bar rules, and who provides linens and dinnerware. Overage charges and children's meals should be explicit.\n\nRental contracts need delivery windows, damage fees, and who strikes equipment. Tie catering service fees to the quote you compared.\n\nCake cutting fees, champagne toasts, and late-night snack stations are often add-ons—confirm whether caterer or bakery supplies cake service. Linen color upgrades should match swatches initialed on the rental contract."
      },
      {
        "heading": "Photo, video, and entertainment",
        "body": "Hours of coverage, number of shooters, deliverable counts or film length, turnaround time, and copyright or usage rights. DJ and band contracts need overtime rates, setup power needs, and song request policies.\n\nAsk whether assistants travel included or billed separately.\n\nCompare highlight film length across videographers before signing—five minutes versus twenty minutes is not interchangeable. Band contracts should list break times and whether emcee duties are included."
      },
      {
        "heading": "Insurance, permits, and venue compliance",
        "body": "Many venues require certificates of insurance naming the venue as additional insured. Vendors should list COI deadlines. Noise curfews and sparkler bans affect photographers and planners alike.\n\nDo not assume vendors know venue rules; attach venue rider when required."
      },
      {
        "heading": "Worked example: three-vendor review night",
        "body": "Couple compares photographer, caterer, and DJ contracts two months before wedding. Photographer: eight hours, second shooter included, gallery in sixty days, retainer non-refundable inside ninety days—matches quote. Caterer: guaranteed one hundred twenty guests, final count seven days out, service fee labeled, deposit fifty percent—matches catering quote PDF. DJ: four hours, overtime one hundred fifty dollars per hour after midnight, COI due fourteen days before—venue requirement satisfied.\n\nPlanner logs each deposit due date in master calendar and stores signed PDFs with event-wedding-vendor-contract template fields as reference for missing clauses."
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
        "body": "Load deposit due dates, insurance deadlines, and final head counts into a master calendar shared with the couple. Forty-five days out, reconfirm arrival windows with photographer, caterer, and venue.\n\nCompare force majeure language across vendors so postponement fees are not contradictory. Keep a single folder of executed contracts accessible offline on wedding day."
      },
      {
        "heading": "Destination and multi-day events",
        "body": "Destination weddings add travel windows, per diem, and backup dates for weather. Verify each vendor's passport and equipment customs rules before signing. Currency and tip customs abroad should appear in catering and photography contracts.\n\nBuild a travel day into photographer and videographer contracts when flights are required. Local marriage license rules do not replace vendor payment terms—deposits may still be due in your home currency."
      },
      {
        "heading": "Florist, planner, and rental coordination",
        "body": "Florist contracts should list delivery window, setup labor, vase ownership, and who breaks down arches after photos. Planner agreements clarify day-of authority—can they approve overtime with the DJ on your behalf?\n\nRental contracts need rain plans for tents and who pays re-delivery if the timeline slips. Cross-check pickup times with venue curfew so fines are not a surprise on the final invoice."
      },
      {
        "heading": "Gratuity and staff meals across vendors",
        "body": "Catering gratuity lines differ from DJ tips. Read whether service charge is distributed to staff or retained by the company.\n\nVendor meals during long receptions should appear in catering head counts so your team is fed without surprise per-plate charges.\n\nConfirm whether setup fees are separate from per-guest food on the caterer contract before you compare three catering quotes."
      }
    ],
    "faq": [
      {
        "question": "Should all vendors use the same contract template?",
        "answer": "No. Each service has different deliverables. Use a master checklist instead of one generic PDF for everyone. The event-wedding-vendor-contract generator helps compare clauses side by side without forcing identical terms."
      },
      {
        "question": "When should deposits be paid?",
        "answer": "Popular vendors book years out; pay retainer when you accept terms. Stagger deposits so cash flow is manageable. Calendar every due date the day you sign—missing a caterer deposit can cost your date even when photography is secured."
      },
      {
        "question": "What if we postpone the wedding?",
        "answer": "Read postponement clauses in each contract. Some allow date moves with fee; others treat as cancellation. Compare force majeure language so one vendor cannot hold your deposit while another offers a free reschedule."
      },
      {
        "question": "Do we need contracts for friends helping?",
        "answer": "Informal help may skip contracts, but paid professionals should always sign. Insurance and liability still matter. Even a friend DJing for gas money should confirm equipment liability if the venue requires insurance."
      },
      {
        "question": "Can planners sign on our behalf?",
        "answer": "Only if contract grants agency authority. Couples should sign or explicitly authorize planner signatures. Without authority, a planner cannot bind you to overtime charges you never approved."
      },
      {
        "question": "Should we hire a lawyer to review every vendor?",
        "answer": "Couples often spot-check high-dollar vendors and those with strict cancellation terms. Attorneys can review a bundle of contracts when spend is large. Bring signed PDFs and your checklist so review time focuses on deposit and cancellation risk."
      },
      {
        "question": "What if a vendor will not sign changes?",
        "answer": "Walk away or accept the risk consciously. Handwritten promises not in the contract are hard to enforce when the original photographer cancels."
      },
      {
        "question": "How do we track vendor meal counts?",
        "answer": "Align caterer final head count deadline with venue capacity and rental chair count. Mismatched numbers between contracts cause billing fights the week before the wedding."
      },
      {
        "question": "Should we keep vendor quotes with contracts?",
        "answer": "Store the quote PDF beside each signed contract in one folder. When an invoice arrives, compare line totals to the quote before you authorize payment."
      }
    ]
  },
  {
    "slug": "podcast-script-structure",
    "title": "Podcast Script Structure: Interview, Solo, and Co-Host",
    "metaDescription": "Outline hooks, segments, questions, and outros for podcast episodes. Free podcast script template for your consistent shows.",
    "answerFirst": "A solid podcast script defines the episode goal, cold open hook, intro, segment blocks with timing, guest questions or talking points, transitions, calls to action, and outro with disclaimer if needed. Scripts keep episodes consistent without sounding over-rehearsed. Producers can spot missing ad reads and weak outros before record day when the template is filled every time.",
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
        "body": "Write one sentence: after listening, the audience will know or feel X. Pick a primary keyword topic for show notes SEO separately from the script, but let intent guide segment choice.\n\nChoose format: solo teaching, co-host banter, or interview. Length target in minutes keeps rambling in check.\n\nList three listener questions the episode must answer. If you cannot name them, the script will wander. Note whether the episode is evergreen or tied to a news cycle so you know how much date-specific language to include."
      },
      {
        "heading": "Cold open and intro",
        "body": "Cold open is thirty to ninety seconds of strongest clip or statement before theme music. Intro names show, episode number, host, guest credentials, and episode promise.\n\nSponsor read may sit pre-roll or mid-roll; mark ad slots in the script so editors find them.\n\nWrite the intro in second person when teaching—listeners should hear what they will gain, not only who the host is. Co-host intros should alternate names each episode so both voices feel equal."
      },
      {
        "heading": "Segment blocks and pacing",
        "body": "Break content into three to five segments with working titles and minute budgets. Solo shows use bullet talking points; interviews use question blocks with follow-up prompts.\n\nTransitions bridge segments with recap and teaser for what is next. Silence markers help editors place music stings.\n\nIf a segment runs long in rehearsal, cut a bullet rather than speeding up speech—listeners notice rushed audio. Mark optional cuts with brackets so producers can trim without losing the narrative spine."
      },
      {
        "heading": "CTA, outro, and compliance",
        "body": "Calls to action might be newsletter signup, product link, or next episode tease. Outro thanks guest, repeats show name, and gives social handles.\n\nFinancial or health topics may need disclaimers; legal advice shows should state they are not attorneys. Mark disclaimer text verbatim in the script.\n\nRepeat the primary URL twice—once mid-episode and once in the outro—so listeners driving cannot miss the spelling."
      },
      {
        "heading": "Worked example: twenty-eight minute interview",
        "body": "Goal: explain how small contractors use digital estimates. Cold open guest quote about losing bids. Intro thirty seconds. Segment one problem setup five minutes with host bullets. Segment two guest story twelve minutes with eight numbered questions and two follow-ups each. Segment three tool demo six minutes scripted screen share beats. CTA download checklist. Outro fifteen seconds plus music fade.\n\nTotal target twenty-eight minutes. Enter headings and bullets in the podcast script template so producers see timing column."
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
        "body": "Segment bullets become show notes, blog posts, and newsletter blurbs with light editing. Mark timestamps in the script after recording for audiogram clips.\n\nGuest question lists help PR teams approve quotes before release. Keep a library of standard intros updated each season so episodes sound fresh without rewriting from scratch."
      },
      {
        "heading": "Accessibility and transcripts",
        "body": "Scripts make transcript generation faster for ADA-friendly show notes. Mark speaker names consistently in interview scripts so automated tools attribute quotes correctly. Sound effect descriptions in brackets help deaf and hard-of-hearing readers when transcripts publish.\n\nSpell proper nouns and URLs phonetically in the script margin when guests have unusual names or long product links. That reduces retakes and transcript typos."
      },
      {
        "heading": "Guest prep and question discipline",
        "body": "Send guests the outline—not the full script—so they know segment themes without sounding rehearsed. Mark must-ask questions versus nice-to-have follow-ups.\n\nRecord a short pre-interview note in the script about topics to avoid if the guest requested off-the-record areas. Time-box tangents with a visible clock column in the template."
      },
      {
        "heading": "Solo episode outlines",
        "body": "Solo scripts benefit from a hook sentence, three teaching points, and a recap that repeats the call to action. Read the full script once standing up to catch breathless paragraphs.\n\nBatch-record solo episodes from one template day by swapping only segment bullets—keep intros identical for brand consistency.\n\nMark breath breaks with a slash in the script where you need a pause before dense definitions."
      }
    ],
    "faq": [
      {
        "question": "Should I script word-for-word?",
        "answer": "Solo shows often need full script for clarity. Interviews work better with question outlines so conversation stays natural. Read solo scripts aloud once to catch tongue-twisters before you hit record."
      },
      {
        "question": "How do I mark ad reads?",
        "answer": "Use a clear AD READ header with sponsor name, offer, URL, and code. Editors need exact wording for compliance. Host-read and pre-recorded ads should use different labels so post-production does not splice the wrong take."
      },
      {
        "question": "Do I include music cues?",
        "answer": "Yes. Note intro bed, transition stings, and outro fade so levels stay consistent episode to episode. Mark whether music ducks under voice or hard-cuts for the editor."
      },
      {
        "question": "How long should episodes be?",
        "answer": "Match audience habit. Business how-to often lands twenty to thirty-five minutes; news may be shorter. Script to target length. Sum segment minute budgets in the template footer and trim the weakest segment if you are over."
      },
      {
        "question": "Can I reuse segments?",
        "answer": "Evergreen explainer blocks can become library inserts; mark them in the script template for batch recording days. Tag reusable blocks with episode IDs so you remember what already published."
      },
      {
        "question": "Do I need a script for short news episodes?",
        "answer": "Even five-minute updates benefit from bullet scripts for dates, names, and sponsor URLs read correctly on first take. Lead with the newest fact in the cold open so commuters get value in the first thirty seconds."
      },
      {
        "question": "How do co-hosts share scripts?",
        "answer": "Use color-coded bullets per host in the template so each person knows their lines. Shared Google docs work if everyone labels edits with timestamps before recording."
      },
      {
        "question": "Should guests see the full script?",
        "answer": "Share themes and must-hit questions, not word-for-word answers, so interviews stay conversational. Send sensitive question areas in advance when PR teams require approval."
      },
      {
        "question": "How do I script listener mail segments?",
        "answer": "Read questions verbatim from the script to avoid misquoting email. Paraphrase answers prepared in bullets so you sound natural while staying accurate."
      }
    ]
  },
  {
    "slug": "real-estate-flyer-what-to-include",
    "title": "What to Include on a Real Estate Flyer",
    "metaDescription": "Property flyer essentials: hero photo, price, specs, agent branding, and compliance lines. Free real estate flyer template.",
    "answerFirst": "A real estate flyer should lead with a strong listing photo, address or neighborhood, price or call for offers, bed-bath-sqft facts, three to five bullet benefits, open house or tour info, and agent contact with brokerage disclaimer required in your market. Buyers glance for seconds at a handout—accurate specs and one clear headline beat dense paragraphs every time, especially on busy open-house tables.",
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
        "body": "Use the best horizontal exterior or living room image with even lighting. Headline states benefit: walkable to schools, renovated kitchen, or income potential. Price should be prominent unless your brokerage policy uses call for offers.\n\nAvoid cluttering the hero with every logo; agent branding can sit in a footer band.\n\nFor condos, lead with the view or amenity deck when the exterior is generic. Investment flyers may headline cap rate or tenant status when your market expects it on print pieces."
      },
      {
        "heading": "Property facts buyers scan first",
        "body": "Beds, baths, square footage, lot size, year built, garage, and key upgrades in a scannable row. MLS number helps buyers reference online listings.\n\nBe accurate; misstated square footage creates liability. Source facts from MLS or appraisal docs. Round square footage only the way your MLS displays it so flyers match portal search filters."
      },
      {
        "heading": "Body copy and bullets",
        "body": "Three to five bullets beat long paragraphs on a flyer. Focus on lifestyle and differentiation: new roof 2024, primary suite on main, fenced yard.\n\nFair housing law requires neutral language. Describe property features, not ideal tenant or buyer demographics.\n\nAvoid coded phrases that steer families or groups toward or away from a neighborhood. When mentioning schools, cite factual district boundaries rather than subjective character claims about who belongs in the area."
      },
      {
        "heading": "Open house, QR codes, and contact",
        "body": "Open house date, time, and address if different from listing. QR code to virtual tour or MLS page should be tested before print.\n\nAgent photo, phone, email, team name, and brokerage logo with equal housing opportunity and state license lines as your board requires.\n\nUse a trackable short link on the flyer when your brokerage provides analytics so you know which open houses drove online traffic."
      },
      {
        "heading": "Worked example: suburban listing flyer",
        "body": "Hero photo of front elevation. Headline: Bright four-bed family home on quiet cul-de-sac. Price four hundred ninety-five thousand dollars. Facts: four bed, two and a half bath, two thousand four hundred ten square feet, two-car garage, lot zero point three acres. Bullets: new HVAC 2025, finished basement office, patio and fenced yard, top-rated schools nearby per district site.\n\nOpen house Sunday one to four. QR to tour. Agent cell and brokerage disclaimer footer. Layout from real estate flyer template exported PDF for print and email."
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
        "body": "Print flyers for sign riders and open houses; export a lighter PDF for email so mobile inboxes load quickly. Neighborhood farmers markets and local shops may allow flyer stacks when listings are nearby.\n\nTrack which listing URL the QR code points to and update immediately after price changes. Brokerage brand guidelines may dictate color and logo placement—check before creative layouts.\n\nHand flyers to visitors at sign-in so you capture who attended even when they do not leave an email on the portal."
      },
      {
        "heading": "Luxury and privacy listings",
        "body": "High-end listings sometimes omit street address on public flyers, showing area name only until qualified buyers register. Match privacy strategy to MLS display rules. Luxury flyers may emphasize architect, designer, and smart-home specs with fewer price-per-square-foot comparisons.\n\nGate community listings may forbid flyers on public boards at the entrance—confirm with HOA rules before printing stacks."
      },
      {
        "heading": "Print specs and brand compliance",
        "body": "Ask your print vendor for bleed, safe zone, and CMYK profile before exporting from the flyer template. Dark hero photos need light text overlay or a gradient band so phone numbers stay readable.\n\nBrokerage marketing departments often supply approved color palettes and logo lockups. Save a compliant master template so each listing only swaps photos and facts."
      },
      {
        "heading": "New construction and model homes",
        "body": "Flyers for builders may show base price plus upgrade disclaimers. Include builder name, warranty summary line, and estimated completion when marketing pre-delivery units.\n\nModel home flyers should note that photos show optional finishes so buyers are not surprised at the design center.\n\nList community amenities from the actual HOA or developer sheet rather than memory—pool hours and fee structures change between phases."
      }
    ],
    "faq": [
      {
        "question": "Do flyers still matter with online listings?",
        "answer": "Yes for open houses, door hangers, and email attachments. Flyers summarize what buyers remember offline. A QR code bridges print to the live MLS listing when inventory changes fast."
      },
      {
        "question": "Should I show sold comparables?",
        "answer": "Only if accurate and allowed by your MLS rules. Some agents use market snapshot on back panel. Update comps when a nearby sale closes or your flyer looks stale at showings."
      },
      {
        "question": "Can I use listing photos from MLS?",
        "answer": "Follow MLS copyright and broker policies. Usually you may market your own listing per board rules. Do not pull another agent's photos for a comparative flyer without permission."
      },
      {
        "question": "What font size for print?",
        "answer": "Body at least ten to eleven point for yard handouts; phone numbers larger. Test legibility at arm's length. High-contrast text on busy photos beats fancy thin fonts every time."
      },
      {
        "question": "Digital vs print layout?",
        "answer": "Export PDF from template for both. Digital may use RGB; print may need bleed settings from your print shop. Email flyers should stay under a few megabytes so mobile clients open them."
      },
      {
        "question": "Should flyers mention HOA fees?",
        "answer": "When material to buyers, include monthly HOA or special assessments if accurate. Verify figures with HOA docs or seller disclosure. Fair housing rules still apply—describe community amenities, not who should live there."
      },
      {
        "question": "How often should I reprint flyers?",
        "answer": "Reprint after price changes, status changes, or new photos from staging. Outdated open house dates on a sign rider waste buyer time and hurt your brand."
      },
      {
        "question": "Can I use AI-written flyer copy?",
        "answer": "Verify every fact against MLS and seller disclosures. Automated copy can invent square footage or school claims that create liability for you and your brokerage."
      },
      {
        "question": "Should I add a map thumbnail?",
        "answer": "A simple map or neighborhood inset helps buyers orient when the listing is in an unfamiliar subdivision. Use licensed map tiles or brokerage-approved graphics only. Keep the map small so property bullets remain the visual focus."
      }
    ]
  }
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
