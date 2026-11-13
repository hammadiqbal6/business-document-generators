export interface GuideSection {
  heading: string;
  body: string;
  table?: { caption?: string; headers: string[]; rows: string[][] };
}

export interface GuideSource {
  label: string;
  url: string;
  usedFor?: string;
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
  /** Optional HowTo steps when the guide is procedural (must match on-page content). */
  howTo?: string[];
  /** Visible Sources list (IRS, SBA, Cornell LII, Copyright Office, etc.). */
  sources?: GuideSource[];
  sections: GuideSection[];
  faq: { question: string; answer: string }[];
}

export const guides: Guide[] = 
[
  {
    "slug": "construction-estimate-that-wins-jobs",
    "title": "How to Write a Construction Estimate That Wins Jobs",
    "metaDescription": "Write a clear construction quote or estimate with scope, line items, tax, deposit, and validity. Bathroom example plus free construction estimate template.",
    "answerFirst": "A winning construction estimate names the job, spells out measurable scope, prices labor and materials on separate lines, lists tax and deposit, and ends with a validity date plus exclusions. Clients compare construction quotes on clarity first. Use the same line structure later when you bill with a contractor invoice.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-11-13",
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
    "howTo": [
      "Describe measurable scope before you price the job.",
      "Structure line items with units, quantities, and rates clients can compare.",
      "State a validity date, deposit terms, exclusions, and change-order rules.",
      "Send a clear PDF and convert accepted lines into invoices when you bill."
    ],
    "sources": [
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Small-business compliance habits that support clear written pricing and records"
      },
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping support for income, expenses, and job documentation"
      }
    ],
    "sections": [
      {
        "heading": "How do you write a construction quote or construction estimate?",
        "body": "Start with a dated header that labels the PDF as a construction quote or construction estimate, then list the client, job address, and a scope a second contractor could price. Add line items with quantity, unit, and rate, then tax, deposit, validity date, and exclusions. That package is what most homeowners and GCs compare when they choose a bid. Vague scopes push clients toward the lowest number that may leave out haul-off, protection, or finish work. Tie every major dollar line to a sentence in the scope. If you install luxury vinyl plank, name rooms, square footage source, subfloor prep limits, and whether baseboards come off and go back. When site conditions are unknown, say so and point to a written change-order path. Build the PDF in the free construction estimate template so the numbers match the narrative you walk through on site. After the client accepts, reuse the same lines in a work order for the crew and a contractor invoice for deposits and progress draws."
      },
      {
        "heading": "What should you write before you price the job?",
        "body": "Describe what you will demolish, install, haul away, protect, and leave behind before you type a single rate on the construction estimate. List rooms, surfaces, fixtures, and finishes with enough detail that another contractor could price the same work and the client can compare bids fairly.\n\nClients who see that level of care trust the total more than a one-line lump sum. Photograph existing conditions before you price. Note moisture, rot, out-of-level floors, and panel schedules. Those photos support change orders later and help you defend the original construction quote when selections shift. The IRS expects small businesses to keep records that support income and expenses, so job photos and supplier quotes belong in the same file as the estimate you send."
      },
      {
        "heading": "How should construction estimate line items be structured?",
        "body": "Group demolition, materials, labor, equipment, permits, and allowances so the client sees where money goes on the construction quote. Show units on every line, such as square feet, linear feet, hours, or lump sum when the package is fixed, so homeowners and GCs can compare bids line by line.\n\nSeparate labor and materials when tax treatment or client comparison benefits from the split. Call out owner-supplied items, excluded work such as electrical by others, and warranty length in plain language. A short assumptions block covering working hours, access, parking, and the debris path prevents disputes after demo starts. The SBA stresses staying legally compliant as you run the business; clear written pricing and retained job records are part of that habit, not a substitute for licenses or insurance your state requires.\n\nWhen subs quote you, keep their numbers in your internal file even if the client-facing PDF collapses them into one HVAC or plumbing line. You can defend markup and schedule only if you still have the backup."
      },
      {
        "heading": "How do validity, deposits, and change orders work on estimates?",
        "body": "Put a calendar validity date on every construction estimate so the client knows when the price stops holding as material markets move. State deposit terms as your working pattern, not a fixed industry rule, and note that concealed conditions or new selections may need written change orders with revised totals.\n\nMany remodelers use a deposit percentage tied to material orders or schedule lock-in. One schedule we use in the bathroom example below is a thirty percent deposit to order the surround and vanity. Put the percent or amount, due date, and what the deposit buys on the estimate so it matches your contract language.\n\nPair large jobs with a signed work order or contract that references the estimate line items. When selections change, revise the estimate or add a change-order PDF instead of editing history silently."
      },
      {
        "heading": "How should you present and follow up on a construction quote?",
        "body": "Send a PDF with your business name, license number if your state expects it on consumer jobs, insurance summary, and payment methods, and keep the title Estimate or Construction Quote rather than Invoice. Follow up once before the validity date with a short note offering to walk through line items on a call.\n\nWhen you win the job, convert agreed lines into the contractor invoice template for deposits and progress billing without retyping math. Clients who understood the estimate rarely dispute invoices that mirror the same structure. Keep the accepted PDF with your job records so you can answer tax or payment questions later."
      },
      {
        "heading": "Worked example: bathroom refresh estimate",
        "body": "A client wants a hall bath gut refresh. Scope: remove vanity, toilet, and tub surround; repair subfloor as needed up to one sheet of plywood; install new vanity, toilet, tub-shower surround, exhaust fan; paint walls and ceiling. You price demolition as one lump sum, labor by phase, and materials from supplier quotes.\n\nSample lines: Demo and haul-off lump sum eight hundred fifty dollars. Subfloor repair allowance four hundred dollars. Plumbing rough adjustments four hours at ninety-five dollars. Electrical fan replace two hours at ninety-five dollars. Surround install lump sum twelve hundred dollars. Vanity set and trim three hours at ninety-five dollars. Materials package lump sum twenty-one hundred dollars. Paint one room lump sum six hundred fifty dollars. Subtotal five thousand eight hundred fifty-five dollars plus tax. One schedule we use in this example is a thirty percent deposit to order the surround and vanity. Validity ends on a stated calendar date. Unknown rot may add change orders. Enter the same structure in the construction estimate generator so the PDF matches your walkthrough."
      },
      {
        "heading": "What belongs on the estimate checklist before you send?",
        "body": "Use this table as a quality check before you email any construction estimate or construction quote PDF to a client. Missing rows, especially scope, validity, and deposit, are where disputes start, so run the checklist the day before the walkthrough so you do not promise crown molding in every room when only the living room was discussed.",
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
              "Estimate or construction quote label, date, job address, client name",
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
              "Protects you when material costs move"
            ]
          ]
        }
      },
      {
        "heading": "How do you communicate allowances and exclusions?",
        "body": "Allowances for fixtures, tile, or appliances should name the allowance amount and what happens when the client selects above or below that number. Credit unused allowance on the final invoice or bill overages through a change order signed before purchase. Exclusions belong in bold plain language: asbestos abatement, structural engineering, permit fees paid by owner, and weekend overtime if the job is weekdays-only. If the client supplies materials, state that you are not warranting owner-supplied product and that delays waiting for delivery extend the timeline. Review each estimate against your checklist before the walkthrough. Clear construction quotes win more jobs than the cheapest incomplete bid, and they make billing with a contractor invoice far less painful."
      }
    ],
    "faq": [
      {
        "question": "Should estimates include sales tax?",
        "answer": "Follow your state and local rules. Many contractors show one tax rate applied to a taxable subtotal and label exempt items such as certain labor or materials. If you are unsure, ask your accountant how to split taxable and non-taxable lines before you send the PDF."
      },
      {
        "question": "What deposit is normal on a remodel?",
        "answer": "Deposit size is a working pattern, not a fixed rule. Many residential remodels use a percentage tied to material orders or schedule lock-in. Commercial jobs may use smaller deposits with progress billing. Put the percentage and due date on the estimate so it matches your contract."
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
        "answer": "When both parties sign a written agreement or you accept a deposit with clear terms referencing the estimate. Until then, treat the estimate as an offer that can expire on the validity date you printed."
      },
      {
        "question": "Should I itemize subcontractor quotes?",
        "answer": "Show client-facing lines that match your scope story. You may collapse sub quotes into one line with backup in your internal file. Transparency reduces change-order fights when the client sees HVAC as its own line instead of hidden in general conditions."
      }
    ]
  },
  {
    "slug": "photography-contract-clauses",
    "title": "Photography Contract Clauses Explained",
    "metaDescription": "Learn retainer, cancellation, copyright, and usage clauses for photography contracts. Free editable template. Not legal advice.",
    "answerFirst": "Most photography contracts need six core clauses: scope with date, hours, and locations; payment and retainer; deliverables and timeline; image usage or license; cancellation; and liability limits. Add model releases when recognizable people appear outside the paying client. Draft yours in the free photography contract template, then have counsel review.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-11-13",
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
    "howTo": [
      "Name the parties, session date, locations, and countable deliverables.",
      "Spell out retainer, balance due dates, and cancellation terms.",
      "Define image usage or license rights for the client and photographer.",
      "Add liability limits and model-release notes when recognizable people appear."
    ],
    "sources": [
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Basic definition of a contract as offer, acceptance, and consideration"
      },
      {
        "label": "U.S. Copyright Office — Photographers",
        "url": "https://www.copyright.gov/engage/photographers/",
        "usedFor": "Photographer copyright ownership and licensing basics"
      }
    ],
    "sections": [
      {
        "heading": "How do you write a photography contract?",
        "body": "Write a photography contract by naming both parties, describing the session or event in countable terms, setting payment and retainer rules, stating who owns the images and what uses the client gets, and covering cancellation and liability. Cornell Law School’s Legal Information Institute defines a contract as a promise the law will enforce, usually built on offer, acceptance, and consideration. Your signed PDF plus retainer is how that offer and acceptance show up for a shoot. Open with who is hiring whom, the event or session date, start time, primary location, and a backup weather plan for outdoor work. Define deliverables as numbers: edited images, album pages, or hours of coverage. List exclusions such as raw files, rush editing, or travel beyond a stated radius. Build the first draft in the free photography contract template at /tools/photography-contract-template/ so every clause has a field. Then walk the client through the PDF on a kickoff call before they pay the retainer. A verbal yes is not enough when dates fill and deposits move."
      },
      {
        "heading": "Who owns the photos from a paid shoot?",
        "body": "Under US copyright practice for most freelance photography, the photographer owns the copyright in the images and grants the client a license for stated uses. The US Copyright Office publishes guidance for photographers that you can share when a client asks why they cannot resell images without a separate license. The US Copyright Office publishes guidance for photographers that you can share when a client asks why they cannot resell images to a magazine without a separate license. Separate personal print and social use from commercial use in the contract. Commercial licenses should name media, territory, duration, and credit requirements. A print release is not the same as a commercial license. Label each clearly so the gallery download terms match what you sold. If you want the client to own copyright outright, say so in writing and price that transfer. Silent contracts create the fights. Put ownership and usage in their own headings, then load the same language into the photography contract template fields before you send the booking link."
      },
      {
        "heading": "What parties, scope, and deliverables belong in the agreement?",
        "body": "Second shooters, assistants, and studio rental should appear in scope if clients expect them included in the photography contract package. If the client receives a gallery link, note how long the gallery stays live, whether downloads are permitted, and what countable deliverables the fee covers.\n\nCorporate headshot days need a shot list and turnaround for retouching batches. Wedding contracts should name getting-ready coverage end time and reception end time so open-bar overtime is priced before the event.\n\nVenue rules on flash, drones, or ceremony positions belong in an exhibit or planner timeline reference. Parking passes and load-in badges are small details that prevent day-of friction when security turns away your assistant. Long wedding days should address hot meals for second shooters in scope or courtesy language so nobody is surprised at dinner."
      },
      {
        "heading": "How should retainer and balance payments be written?",
        "body": "The retainer reserves the date and compensates scheduling risk, so state the amount, when it is due, and whether it applies to the total fee. Spell out when the balance is due, often one to two weeks before a wedding or before the session for portraits, so bookkeeping stays predictable.\n\nLate payment language can pause editing or withhold gallery access. Have an attorney tune enforcement wording for your state. Acceptable payment methods and who pays processor fees belong in the same section so bookkeeping stays simple. Mirror retainer and balance fields in the photography contract template so the PDF matches your invoice later."
      },
      {
        "heading": "How do cancellation, rescheduling, and force majeure work?",
        "body": "Spell out what happens if the client postpones, cancels, or if weather affects an outdoor shoot, including whether the retainer is kept inside a stated window. Offer one courtesy reschedule when availability allows, and say in writing if you may substitute a second shooter of equal skill.\n\nLiability caps and insurance requirements are common in event photography. Do not copy generic waivers from the internet without review. Force majeure language should cover illness, venue closure, and government restrictions without promising outcomes you cannot control. Keep cancellation terms next to payment terms so clients see both before they sign."
      },
      {
        "heading": "Worked example: portrait session clause set",
        "body": "A family portrait package might read: Session on Saturday at the riverside park, ninety minutes, up to twenty-five fully edited digital files delivered via online gallery within twenty-one days. Retainer one hundred fifty dollars due at booking, balance two hundred fifty dollars due before session start. Copyright remains with the photographer. Client receives personal print and social sharing rights without commercial resale.\n\nCancellation more than fourteen days before the session: retainer transferable to a new date within six months. Cancellation within fourteen days: retainer forfeited. Rain plan: move to a covered location or reschedule once without fee. That pattern maps cleanly into the photography contract template fields. Open /tools/photography-contract-template/, fill the same clauses, and send the PDF the same day the client says yes."
      },
      {
        "heading": "What clauses should you put in a quick-reference table?",
        "body": "Match each row to a heading in your photography contract so nothing important is buried in fine print before the client signs. Use the table as a pre-send checklist before you email the booking packet from the photography contract template.",
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
        "heading": "How should timeline, backup gear, and file delivery be stated?",
        "body": "Delivery timelines should account for peak season backlog, so state calendar days or business days and what happens if illness delays editing. Backup camera bodies, cards, and batteries belong in scope when weddings cannot be reshot, and gallery download rules should match the usage license you sold. Backup camera bodies, cards, and batteries are operational details that belong in scope when weddings cannot be reshot. File delivery method matters: gallery host, download expiration, and whether social-sized crops are included. If clients need DNG or TIFF for print shops, price that as an add-on. State reactivation fees and how long you keep backups after delivery so clients who delay downloads know the archive limit. Ready to lock your clauses? Start with the editable photography contract template, then ask a licensed attorney to review your final agreement for your state and session types."
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
        "question": "Is a verbal booking enough?",
        "answer": "A signed contract or written confirmation with retainer terms is safer than verbal promises. Dates fill quickly; written terms protect both sides. Follow up a verbal yes with a contract link the same day using the photography contract template."
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
    "answerFirst": "A clear catering quote lists the event basics, menu, per-guest or package pricing, staff hours, service fee versus gratuity, tax, guest-count rules, and deposit terms. Deposit size and balance timing are working patterns, not fixed rules. Many caterers use a deposit to hold the date and collect the balance once the final count locks. Build the PDF in the catering quote tool.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "catering-quote",
      "quote-estimate-generator"
    ],
    "relatedGuideSlugs": [
      "catering-quotation-example",
      "wedding-vendor-contract-checklist",
      "invoice-vs-estimate",
      "line-item-totals-explained"
    ],
    "howTo": [
      "Anchor event date, venue, service style, and logistics on the quote.",
      "Price guest counts with a guarantee, final-count deadline, and overage rule.",
      "Separate service fee from gratuity and show tax on the right subtotal.",
      "State deposit and balance timing as your working pattern, then convert accepted lines to invoices."
    ],
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping support for catering income, expenses, and event documentation"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Small-business compliance habits around written terms and records"
      }
    ],
    "sections": [
      {
        "heading": "What belongs at the top of a catering quote?",
        "body": "Put the event name, date, service window, venue address, and on-site contact at the top of every catering quote before you price food. Note whether service is plated, buffet, or stations because labor differs, and include load-in constraints, kitchen access, and whether you provide linens, bar service, or rentals. Include load-in constraints, kitchen access, and whether you provide linens, bar service, or rentals.\n\nIf the venue requires named insured certificates, say who orders them and any rush fees. A quote that ignores logistics looks cheap until the day of the event. List setup and breakdown times separately from the meal service window so clients know when your team arrives and when the kitchen must be clear.\n\nNote whether you need a staging area for chafers, a dedicated hand-wash sink, or electrical outlets for warming equipment. Corporate events often need badge check-in buffers. Weddings need a clear photo-line schedule before dinner service. Enter those fields in the catering quote generator so the PDF matches the site walkthrough."
      },
      {
        "heading": "How should guest counts and final counts work on the quote?",
        "body": "Price against a guaranteed minimum guest count and state when final counts are due so your kitchen can buy correctly. Many caterers lock final counts about a week before the event as a working pattern you choose with prep timelines, not as a universal rule, and overage policies prevent margin loss when more guests arrive. That timing is a working pattern you choose with your kitchen, not a universal rule.\n\nOverage policies prevent margin loss when one hundred twenty guests arrive though the client guaranteed one hundred. Some caterers bill overages at the same per-guest rate. Others add a premium for last-minute meals.\n\nWrite the rule plainly on the quote so the client initials it. Split counts when the event mixes seated dinner guests with cocktail-only arrivals. Vendor meals, photographer plates, and security details are easy to forget unless you add a line for staff meals at a stated rate.\n\nIf the client wants a cushion baked into purchasing, say whether unused meals are credited or donated rather than refunded. Keep the signed quote and final count email with your event file. The IRS expects small businesses to keep records that support income and expenses, and guest-count changes often explain why the invoice differs from the first quote."
      },
      {
        "heading": "How do you show service fee versus gratuity?",
        "body": "Label administrative or service fees separately from voluntary gratuity so clients understand the total on the catering quote. Service fees often cover staffing overhead, disposables, or coordinator time, while gratuity goes to service staff when allowed by law and venue policy, and tax treatment of each line varies by state. Gratuity goes to service staff when allowed by law and venue policy.\n\nTax treatment of fees varies by state. Show tax on the appropriate subtotal and note if gratuity is not taxed in your jurisdiction. On the quote PDF, place service fee and suggested gratuity on separate lines with short definitions in plain English.\n\nClients comparing three caterers should see the same fee structure, not a hidden markup buried in per-guest food. When venues mandate a specific gratuity distribution, reference that policy in writing so your invoice matches what the banquet captain expects on event night."
      },
      {
        "heading": "How should deposits, tastings, and contract timing appear?",
        "body": "A deposit holds the date and may credit toward the final invoice, with twenty-five to fifty percent deposits a common working pattern for caterers who need to buy food and lock staff. Balance timing that lands several days before service is another working pattern you choose, not a legal requirement, so write your numbers plainly on the quote. Balance timing that lands several days before service is another working pattern, not a legal requirement.\n\nChoose numbers that match your food-cost exposure and write them on the quote. Until deposit and signed event agreement land, treat the quote as an offer subject to availability. After signing, convert line items into invoices using the same per-guest math.\n\nTasting fees belong on the quote as their own line with a note if the fee credits toward the event total when the client books. State what happens to the deposit if the client cancels inside a stated window, matching your event contract language. The SBA’s stay-compliant guidance is a useful reminder to keep licenses, written terms, and records organized as you grow. Pair deposit language with a clear validity date on proteins and seasonal items so you can revise the quote before prep begins."
      },
      {
        "heading": "What does a worked catering lunch quote look like?",
        "body": "Here is a worked corporate lunch example you can recreate in the catering quote tool with the same per-guest math. The sample uses eighty guaranteed guests, coffee service, staff hours, a service fee on food, and one deposit schedule we use in the example rather than presenting it as an official industry rule. Coffee station flat fee one hundred fifty dollars.\n\nDelivery and setup two hours for two staff at forty-five dollars per hour equals one hundred eighty dollars. Service fee ten percent on food subtotal. Tax at local rate on taxable items.\n\nFood eighty times twenty-eight equals two thousand two hundred forty dollars. Add coffee one hundred fifty and labor one hundred eighty for subtotal before fees. Service fee applies to food subtotal unless your policy differs.\n\nOne schedule we use in this example is a fifty percent deposit at contract signing, final count due seven days out, and overages billed at the quoted per-guest rate. Enter the same lines in the catering quote tool for a clean PDF. For a full walkthrough of quotation wording, see the companion guide at /guides/catering-quotation-example/."
      },
      {
        "heading": "Which quote line items should clients see?",
        "body": "Clients compare caterers on more than price per plate, so show food, beverage, labor, rentals, service fee, and deposit as separate lines. Use the table to keep your own math consistent when you later bill from the same lines and to make three-caterer comparisons fair.",
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
              "Working-pattern percent at signing",
              "Date hold and purchasing"
            ]
          ]
        }
      },
      {
        "heading": "How do kitchen reality and vendor coordination change the quote?",
        "body": "Confirm whether the venue kitchen has convection ovens, loading docks, and ware-washing before you promise plated service on the catering quote. Quotes should list who provides tables, chairs, and bussing staff when the venue is blank-slate, and you should coordinate bar pour policies and last call times in writing. Coordinate with bar vendors on pour policies and last call times.\n\nShare a one-page event timeline with the venue captain showing drop-off, buffet reset, and dessert service. Note who cuts the cake if that is not your team. Allergen prep stations and separate serving utensils should appear on the quote when you promise nut-free or gluten-free options so kitchen labor is priced honestly. After the event, reconcile actual meals served against the guarantee and invoice overages within the window your contract allows."
      },
      {
        "heading": "How should bar packages and liability appear on the quote?",
        "body": "Bar service quotes should state whether you provide liquor liability coverage, who holds the pour license, and whether consumption is open bar, capped tab, or cash bar. List bartender headcount, bar setup hours, and mixers you supply versus what the venue stocks. Ice, glassware, and garnish lines prevent pass-through surprises.\n\nLast-call time and responsible-service policies belong in the quote memo so clients know when service ends even if the dance floor continues. Keep bar math on its own lines so food per-guest rates stay comparable across caterers. When you need a generic estimate layout outside catering-specific fields, the quote estimate generator can hold early numbers before you move finals into the catering quote PDF."
      }
    ],
    "faq": [
      {
        "question": "Is a catering quotation the same as a catering quote?",
        "answer": "Yes in everyday catering language. Quotation and quote usually mean the same pricing PDF. Use one word on your templates and keep it consistent with your invoices. For a longer sample quotation layout, see /guides/catering-quotation-example/."
      },
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
        "answer": "Confirm exclusivity before quoting. Note in writing that the client verified caterer access and power and water hookups."
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
        "question": "How do I handle sales tax on catering quotes?",
        "answer": "Apply tax only to taxable items per your state rules. Food, rentals, and service fees often differ. Label the tax rate and taxable subtotal on the PDF. Ask your accountant before you copy another caterer's tax block."
      }
    ]
  },
  {
    "slug": "tattoo-consent-documentation",
    "title": "Tattoo Consent Forms: What Studios Should Document",
    "metaDescription": "Health acknowledgements, ID verification, design approval, and aftercare on tattoo consent forms. Free template. Not legal or medical advice.",
    "answerFirst": "A complete tattoo consent record usually needs six elements: client identity and age verification, design and placement, risk acknowledgements, aftercare receipt, health disclosures, and signatures, with retention per your state or local health rules. This is documentation, not legal or medical advice. Start with the free tattoo consent form template, then match your board’s requirements.",
    "publishedAt": "2026-10-19",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "tattoo-consent-form-template",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "what-to-include-on-a-receipt",
      "nda-basics-for-freelancers"
    ],
    "legalNote": "This article is not legal or medical advice. Tattoo studios must follow state and local body-art regulations and infection-control standards. Have qualified counsel and your health department requirements guide your actual forms and policies.",
    "howTo": [
      "Verify government photo ID and record age eligibility per local rules.",
      "Collect health disclosures such as allergies, medications, and contraindications.",
      "Document approved design, placement, size, and any portfolio photo consent.",
      "Explain risks and provide written aftercare; have the client acknowledge receipt.",
      "Collect signatures and store the form per your retention policy."
    ],
    "sources": [
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Reminder that small businesses must follow applicable licenses and local rules"
      },
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping business records that support how you operate and document transactions"
      }
    ],
    "sections": [
      {
        "heading": "How should studios verify ID and age on a tattoo consent form?",
        "body": "Document that government photo ID was checked and record the ID type and number where regulations allow before any stencil goes on. Minors require guardian consent rules per your jurisdiction, and many areas prohibit certain placements or require notarized guardian forms, so store copies according to local retention rules. Many areas prohibit certain placements or require notarized guardian forms.\n\nKeep copies according to local retention rules. Digital storage should be access-controlled because forms contain personal health information. Expired ID policies should be written.\n\nSome boards accept only current government ID while others allow grace periods. Photocopy only what regulations permit. Full ID images may be restricted in your state. Build the identity block into the tattoo consent form template at /tools/tattoo-consent-form-template/ so front desk staff never invent fields on the fly."
      },
      {
        "heading": "What health disclosures belong on a tattoo consent form?",
        "body": "Ask about allergies to inks or metals, skin conditions, bleeding disorders, pregnancy or nursing, immunosuppression, and recent sunburn on the site before you start. The form should state that the client answered truthfully and understands risks including infection, scarring, and allergic reaction, and artists should refuse service when medical risk is unclear. Artists should refuse service when medical risk is unclear and refer clients to a physician when appropriate.\n\nRecent antibiotics, accutane history, and diabetes may affect healing. Use yes-no questions with space for medication names rather than open-ended boxes clients skip. Follow your local health department rules and OSHA bloodborne pathogen requirements for your studio.\n\nDo not treat national education pages as a substitute for the body-art regulations that license your shop. Open /tools/tattoo-consent-form-template/ and map each health question to a field your artists actually ask at intake. Incomplete screening is when walk-in pressure creates the worst documentation gaps."
      },
      {
        "heading": "How do you document design, placement, and photo consent?",
        "body": "Attach or reference the approved design, note placement on the body, and record size and color plan on the tattoo consent form. Initials on a printed stencil photo reduce disputes about what was approved, and portfolio marketing releases should stay separate from medical consent even when clients sign both. If you photograph healed work for portfolio use, separate marketing release language from medical consent.\n\nClients may sign both, but the purposes differ. Cover-up sessions should note prior tattoo location, age of existing work, and client acknowledgment that cover-ups may need multiple sessions. Laser removal history affects ink absorption, so capture it in health questions when relevant. Use a new consent for each session rather than assuming an old file covers a different design and placement."
      },
      {
        "heading": "What aftercare acknowledgements should the consent form include?",
        "body": "Check a box that written aftercare instructions were provided in person or digitally, and note the recommended healing window plus any touch-up policy your shop offers. Payment receipts for deposits or sessions can be generated separately so the consent file stays clinical and the receipt stays financial. Keep a laminated copy of aftercare instructions at each station so clients can photograph them even if they lose the paper handout.\n\nAftercare is education, not a guarantee of outcome. Still document that you provided it to show you met professional standards. Pair session payments with the receipt generator when you want a clean financial paper trail beside the consent PDF."
      },
      {
        "heading": "Worked example: walk-in session documentation",
        "body": "Client presents ID. Age verified over eighteen. Form records no known ink allergies, no blood thinners, skin clear at inner forearm placement.\n\nDesign three-inch floral approved on stencil photo initialed by client and artist. Risks explained. Client declines when advised to wait on sunburned skin.\n\nAlternatively, when cleared: session fee paid, consent signed and dated, aftercare sheet provided, artist documents needle configuration and ink lot if your board requires batch tracking. Store the scan in shop records per local retention period. Recreate that flow with the tattoo consent form template so walk-ins and appointments use the same checklist every time."
      },
      {
        "heading": "Which consent form sections do regulators often expect?",
        "body": "Regulators often expect identity, health, design, risks, aftercare, and signatures to appear somewhere in your tattoo consent packet. Use the table as an audit list against your current PDF before you print a new batch or load fields into the tattoo consent form template.",
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
        "heading": "How should studios store and retain signed consent forms?",
        "body": "Build consent into the appointment flow so there is no stencil until the form is complete, and train front desk staff to spot incomplete health questions rather than rushing walk-ins. Batch-scan forms nightly if your board allows digital storage, and separate financial receipts from clinical consent files for cleaner audits. Train front desk staff to spot incomplete health questions rather than rushing walk-ins.\n\nBatch-scan forms nightly if your board allows digital storage. Separate financial receipts from clinical consent files for cleaner audits. When a client returns for cover-up work, open a new consent rather than assuming the old file covers a different design and placement.\n\nAsk your licensing agency how long to keep forms instead of guessing. The SBA’s stay-compliant guidance is a useful reminder that local licenses and record habits matter as much as the form text itself."
      },
      {
        "heading": "How do bloodborne pathogen and sanitation cues fit beside consent?",
        "body": "Consent forms complement your exposure control plan; they do not replace it, so note that clients could ask questions about sterilization and single-use items. Follow local health department rules and OSHA bloodborne pathogen requirements for sharps, PPE, and cleanup in your studio rather than treating national education pages as tattoo regulations. Note that clients were offered the opportunity to ask questions about sterilization and single-use items.\n\nWhen state inspectors visit, they often ask whether artists documented client education, not just signatures. Follow local health department rules and OSHA bloodborne pathogen requirements for sharps, PPE, and cleanup in your studio. If a client faints or has a reaction, incident notes may belong in a separate log linked to the appointment date.\n\nNever alter a signed consent retroactively. Add a supplemental note initialed by staff if regulations allow."
      },
      {
        "heading": "How should guest observers, guardians, and language access be handled?",
        "body": "When friends watch the session, note whether minors are present in the procedure room per shop policy, and require guardian signatures with full legal names matching ID. Photography for portfolio during healing should be a separate checkbox so clients understand marketing use is optional and language-access options are documented when needed. Photography for portfolio during healing should be a separate checkbox so clients understand marketing use is optional.\n\nOffer forms in languages your clients commonly read when your board allows translations. Plain-language summaries of risks help clients who are nervous or unfamiliar with medical terms. If a client needs an interpreter, document that they declined or accepted interpreter assistance.\n\nNever rush signatures when someone asks for time to read. Pause the appointment rather than skipping initials on the design approval block. Ready to tighten your packet? Use the free tattoo consent form template at /tools/tattoo-consent-form-template/, then confirm every field against your health department sample forms before you go live."
      }
    ],
    "faq": [
      {
        "question": "Can clients sign digitally?",
        "answer": "Many studios use tablets. Ensure your e-sign process meets local recordkeeping rules and that clients can read the full form before signing. Save a timestamped PDF export if your board requires immutable records."
      },
      {
        "question": "How long should we keep forms?",
        "answer": "Follow your health department or state board retention schedule. When in doubt, ask the agency that licenses your shop rather than guessing."
      },
      {
        "question": "Do walk-ins need the same form as appointments?",
        "answer": "Yes. Rush pressure is when documentation gets skipped. Use the same tattoo consent form template every time."
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
        "question": "Should artists initial the form too?",
        "answer": "Many shops require artist signature alongside the client to prove who performed the service and that risks were explained. Match your board's sample forms when available."
      }
    ]
  },
  {
    "slug": "rental-application-fair-housing",
    "title": "Rental Applications: Fair Housing and What to Ask",
    "metaDescription": "What belongs on a residential rental application, authorization to verify, and fair housing basics. Free application form generator.",
    "answerFirst": "Use one consistent rental application for every prospect: the same questions on contact details, housing history, job and income, occupants, and screening authorization. Apply the same written criteria to every applicant for a given unit. Start with HUD’s fair housing resources, then confirm state and local rules with counsel before you finalize questions.",
    "publishedAt": "2026-10-20",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "rental-lease-application",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "what-to-include-on-a-receipt",
      "nda-basics-for-freelancers"
    ],
    "legalNote": "This article is not legal advice. Fair housing and tenant screening rules vary by federal, state, and local law. Consult an attorney or HUD-certified housing counselor before finalizing application questions and screening policies.",
    "howTo": [
      "Publish one application PDF and the same written screening criteria for the unit.",
      "Collect authorization to verify income, rental history, and credit where lawful.",
      "Screen every complete application with the same checklist and scripts.",
      "Issue receipts for fees or holding deposits and move approvals into a written lease."
    ],
    "sources": [
      {
        "label": "HUD — Fair Housing",
        "url": "https://www.hud.gov/fairhousing",
        "usedFor": "Starting point for fair housing resources (confirm current rules with counsel)"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "General reminder to follow applicable business and licensing rules"
      }
    ],
    "sections": [
      {
        "heading": "What belongs on a residential rental application?",
        "body": "Standard applications include legal name, contact information, desired move-in date, current and prior addresses, employer and income source, and landlord references. Ask for written authorization to run credit and background checks and to contact prior landlords where your policy allows those checks. State clearly that the application is not a lease and that approval is subject to verification.\n\nApplication fees, if allowed where you operate, should be disclosed up front with whether they are refundable. Do not invent fee caps in your forms. Check state and local law for any limits or bans before you collect money.\n\nVehicle and pet counts belong in neutral policy sections. Describe pet rules and fees. Emergency contact fields help maintenance access but should not substitute for screening data.\n\nBuild the packet in the rental lease application tool so every prospect sees the same fields. Consistency on the form is the first step toward consistent screening."
      },
      {
        "heading": "How do fair housing basics affect what you ask?",
        "body": "Use the same questions and the same income and credit thresholds for every applicant for a given unit so screening stays consistent. Document your criteria in a written policy that leasing staff can follow without improvising, and start with HUD’s fair housing page before counsel confirms how federal, state, and local rules apply to your properties. Train anyone who shows units to avoid steering or informal rules that differ by applicant.\n\nFor fair housing requirements, start with the US Department of Housing and Urban Development fair housing page at https://www.hud.gov/fairhousing and confirm how federal, state, and local rules apply to your properties with qualified counsel. This guide does not list protected classes or add new fair housing claims beyond that high-level pointer. Update applications when local law changes rather than relying on outdated PDFs downloaded years ago.\n\nSource-of-income and other local rules may add duties beyond the federal baseline. Put those checks on your annual form review calendar."
      },
      {
        "heading": "How should authorization and privacy be handled?",
        "body": "Include signatures permitting verification of employment, income, rental history, and credit where your screening policy uses those checks. Note how long you retain applications, who may access them, and which third-party screening provider you use, and never collect bank passwords or other unnecessary sensitive data. If you use a third-party screening service, name the provider on the form or in an attached disclosure.\n\nDo not collect bank passwords or unnecessary sensitive data. Store paper and digital files securely and shred outdated applications on schedule. Keep screening reports with the application file for the retention period your counsel recommends. Privacy mistakes create as much risk as poorly worded questions."
      },
      {
        "heading": "What happens after approval for deposits and receipts?",
        "body": "When an applicant pays a holding deposit, issue a receipt that states whether the deposit is refundable, under what conditions, and how it applies to move-in costs. Separate application payments from security deposits in your ledger, then move approved terms into a written lease rather than relying on the application alone. Upon approval, move terms into a written lease rather than relying on the application alone.\n\nFor the fields and wording that belong on those receipts, follow the companion guide at /guides/what-to-include-on-a-receipt/ and generate the PDF with the receipt generator. Applicants who see clear receipt language trust the process more, and your books stay cleaner when fees and deposits are labeled differently."
      },
      {
        "heading": "Worked example: uniform screening flow",
        "body": "You list a two-bedroom at twelve hundred dollars per month. Applicant A and Applicant B both submit the same PDF application from the rental lease application tool. You verify income at three times rent for each, run credit for each with signed authorization, and call prior landlords using the same script.\n\nApplicant A meets policy. Applicant B does not due to recent eviction documented in court records as allowed in your written policy. You send adverse action notice if required by credit reporting rules.\n\nApplicant A receives lease and security deposit instructions with a receipt for funds received. No additional questions were asked of either applicant outside the published form. That uniform flow is the point of one application and one checklist."
      },
      {
        "heading": "How can you audit application content before publishing?",
        "body": "Use this table to review your rental application against common best practices before you publish a new PDF. Pair the audit with counsel review for your city and state so fee disclosures and screening authorizations match local rules instead of another landlord’s form.",
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
              "Questions that target protected characteristics"
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
        "heading": "How do you process applications consistently?",
        "body": "Use a scoring sheet that mirrors your written policy so every applicant is measured the same way from the same rental application. Document the reason for denial in neutral business terms tied to criteria such as income shortfall or insufficient rental history, and respond to complete files within the timeframe your policy promises. Respond to complete applications within the timeframe your policy promises.\n\nPartial applications should get a written list of missing items rather than silent rejection. Keep an application log with dates received and decisions sent to prove timely responses. Train leasing agents not to invent side rules for favorite prospects.\n\nWhen applicants need reasonable accommodations, route requests to decision-makers who understand your fair housing obligations. Consistency is easier to defend than improvisation."
      },
      {
        "heading": "How should holding deposits and adverse action notices work?",
        "body": "When you accept a holding deposit, state whether it applies to first month's rent or security deposit and what happens if the applicant fails screening after acceptance. Issue receipts for every fee collected, and if credit reports influence denial, follow the fair credit reporting notice requirements that apply to you. If credit reports influence denial, follow fair credit reporting notice requirements that apply to you.\n\nSend applicants a clear list of missing documents instead of denying without explanation when the file is incomplete. Timestamps on every outbound email help prove you did not favor one applicant with faster responses. For receipt wording on holding deposits and application fees, use /guides/what-to-include-on-a-receipt/ as the detailed companion to this screening guide."
      }
    ],
    "faq": [
      {
        "question": "Can I charge an application fee?",
        "answer": "Depends on state and local law. Disclose the amount, purpose, and refund rules before collecting. Some jurisdictions limit or ban application fees. Never charge different fees to different applicants for the same unit. Confirm any caps with counsel rather than copying another landlord’s number."
      },
      {
        "question": "May I ask about pets?",
        "answer": "Pet policies and fees are common, but service and assistance animals are treated differently under fair housing rules. Train staff on the difference and consult counsel on accommodation requests."
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
        "answer": "Many landlords set objective thresholds applied uniformly. Document the score source and provide required notices when credit reports influence denial. Local law may restrict screening. Verify before you publish criteria."
      },
      {
        "question": "May I ask about eviction history?",
        "answer": "Landlords commonly verify court records where lawful. Apply the same look-back period to every applicant and document how a prior eviction affects eligibility under your written policy."
      },
      {
        "question": "Should co-signers use the same application?",
        "answer": "Yes. Collect the same information and authorization from guarantors. Screen co-signers with the same income and credit standards you publish for primary applicants."
      },
      {
        "question": "Can I screen roommates separately?",
        "answer": "Each adult occupant should complete an application when your policy requires it. Apply the same criteria to every roommate for the unit and document who is on the lease versus occupant only."
      },
      {
        "question": "What if the unit is rent-controlled?",
        "answer": "Local rent-control programs may limit fees, deposits, or screening steps. Layer city rules on top of federal fair housing basics before you publish a standard application PDF. Start with https://www.hud.gov/fairhousing and confirm local overlays with counsel."
      }
    ]
  },
  {
    "slug": "invoice-vs-estimate",
    "title": "Invoice vs Estimate: When to Use Each Document",
    "metaDescription": "Learn the difference between an estimate and an invoice, when to send each, and how deposits and change orders fit. Free templates for both.",
    "answerFirst": "An estimate or quote proposes price before work. An invoice requests payment for work done or due. Keep both documents with matching line items when you convert an accepted estimate into billing. Use separate templates so clients and your books never confuse an offer with a demand for payment.",
    "publishedAt": "2026-10-20",
    "updatedAt": "2026-11-13",
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
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping estimates, invoices, and payment records that support income and expenses"
      },
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Offer and acceptance basics that explain when an estimate may become binding"
      }
    ],
    "sections": [
      {
        "heading": "What does an estimate do?",
        "body": "An estimate sets expectations before or early in a job by naming parties, job address, scope narrative, line items, tax, deposit, and how long the price holds. It is usually an offer, not a demand for payment, and clients compare estimates to decide whom to hire before any invoice is due. Clients compare estimates to decide whom to hire.\n\nKeep validity dates realistic on material-heavy jobs so lumber, steel, or chip prices do not strand you. Note exclusions and assumptions so the lowest bid is not missing scope. Estimates for insurance restoration may need separate line labels for code upgrades.\n\nStill keep the document titled estimate until you invoice approved work. Draft early numbers in the quote estimate generator or a trade-specific tool such as the construction estimate template. The IRS expects small businesses to keep records that support income and expenses, so save the estimate PDF with the job file even after you convert it to billing."
      },
      {
        "heading": "What does an invoice do?",
        "body": "An invoice requests payment for work completed or contractually due, with an invoice number, issue date, due date, bill-to, line items, tax, amount paid, and balance due plus payment instructions. Pair invoices with receipts once money clears so the invoice asks for payment and the receipt confirms it was received. Pair invoices with receipts once money clears.\n\nThe invoice asks. The receipt confirms. Use the contractor invoice template when the job came from a construction estimate so line labels match.\n\nNumber invoices sequentially and never reuse numbers even if a client rejects a PDF. Accounting exports rely on document dates and numbers. Estimates can be versioned when scope changes. Invoices should stay in a clean sequence."
      },
      {
        "heading": "Is a quote the same as an estimate?",
        "body": "In practice many businesses use quote and estimate interchangeably for the same pre-work pricing PDF. Some industries treat a quote as firmer for a fixed catalog SKU, so label the document clearly and state whether prices can change with material markets or change orders after acceptance. Label the document clearly and state whether prices can change with material markets or change orders.\n\nRetail installers often call fixed-SKU jobs quotes while remodelers say estimate. Pick one word per trade and stay consistent. Cornell Law School’s Legal Information Institute explains that a contract is a promise the law will enforce, typically through offer, acceptance, and consideration.\n\nAn estimate or quote is often the written offer. Acceptance may arrive as a signature, a deposit with clear terms, or another written yes that references the document. Until acceptance is clear, treat the PDF as an offer that can expire.\n\nA signed proposal may incorporate terms that make specific lines binding. Still use the word invoice when you bill so accounts payable knows the document type."
      },
      {
        "heading": "How long is an estimate good for?",
        "body": "An estimate is good until the validity date you print on it, or until you withdraw the offer in writing, whichever comes first. Put a calendar expiration on every estimate so clients know when the price stops holding as material markets and labor availability change. Material markets and labor availability change.\n\nAn open-ended number invites disputes. When scope changes before acceptance, issue a revised estimate with a new version label rather than editing the old PDF silently. After acceptance, use change orders or a new invoice line with client approval instead of pretending the original estimate still covers new work. Follow up once before the validity date if you still want the job."
      },
      {
        "heading": "How do bookkeeping habits prevent client confusion?",
        "body": "Mixing estimate and invoice language on one PDF without a clear document type confuses clients and your own books, so use separate templates for selling and billing. Use the quote estimate generator for offers and the contractor invoice for payment requests, and never email a screenshot of an estimate labeled as an invoice. Train staff never to email a screenshot of an estimate as an invoice.\n\nMobile photos lose line detail and look unprofessional when finance teams file vendor records. Teach clients that signed estimates authorize deposits while invoices trigger due dates in their accounting system. When a job spans months, send progress invoices that show contract total, billed to date, and retainage if applicable. Match memo lines to estimate sections so commercial AP clerks approve faster."
      },
      {
        "heading": "Worked example: kitchen remodel flow",
        "body": "A kitchen remodel starts as a construction estimate totaling eight thousand four hundred twenty dollars. One schedule we use in this example is a thirty percent deposit shown on the estimate. After cabinet install, you send a contractor invoice for the deposit or first progress draw using the same line labels.\n\nA final invoice bills the balance minus payments received. Each document reuses quantity times rate math, then tax. If the client adds a pendant light package, issue a change order on the estimate or a new line on the next invoice with client approval noted.\n\nKeep every PDF in the job folder so tax questions and payment disputes have a paper trail. When payment posts, issue a receipt with the receipt generator rather than marking the invoice as paid only in email."
      },
      {
        "heading": "How do estimate and invoice fields compare side by side?",
        "body": "Share this comparison table with office staff so they pick the right generator when a client asks for paperwork. The purpose row is the decision rule: estimates propose scope and price, while invoices request payment after a milestone or completion.",
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
        "heading": "How should sales hand off to billing?",
        "body": "When a salesperson emails an estimate PDF, billing should receive the signed copy before the first invoice goes out so line labels match. Mismatched labels between estimate and invoice are a top reason small businesses lose disputes, so CRM notes should link estimate ID, contract sign date, and first invoice number. CRM notes should link estimate ID, contract sign date, and first invoice number.\n\nWeekly review of open estimates past validity catches jobs that never converted to invoices. When you refund a deposit or correct a billing error, issue a credit memo or voided invoice with a new number rather than editing the original PDF. Accounting systems need an audit trail.\n\nNote on the credit memo which estimate or invoice it reverses so the client's AP team can reconcile. Export clients may need estimates in one currency and invoices in another. State the exchange rate date on both documents. Retainer invoices for agencies should reference the statement of work period so retainers are not confused with deposits on goods."
      }
    ],
    "faq": [
      {
        "question": "Is a quote the same as an estimate?",
        "answer": "In practice many businesses use the words interchangeably. Some treat quotes as firmer for fixed SKUs. Label the PDF and state whether prices can change. Retail installers often call fixed-SKU jobs quotes while remodelers say estimate. Pick one word per trade and stay consistent."
      },
      {
        "question": "When should I send a receipt?",
        "answer": "After payment posts. A receipt confirms amount received and method. It does not replace the invoice that requested the money."
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
        "answer": "Yes when time-and-materials is possible. Fixed bids can hide hours internally, but client-facing clarity on T&M jobs prevents invoice shock."
      },
      {
        "question": "What goes in the invoice memo field?",
        "answer": "Reference the approved estimate number, job site gate code if relevant, and PO number for commercial clients. Memos are searchable in many accounting tools when clients ask about old jobs."
      },
      {
        "question": "Should estimates show payment terms?",
        "answer": "Yes. Deposit percent and due timing set expectations before the first invoice. Payment terms on the estimate should match the contract and every invoice that follows. Treat deposit percents as your working pattern, not a universal rule."
      },
      {
        "question": "Who keeps the signed estimate?",
        "answer": "Both parties should have a PDF copy. Your job file is the source of truth when the client misplaces email attachments years later during a warranty call."
      }
    ]
  },
  {
    "slug": "line-item-totals-explained",
    "title": "What Is a Line Total? Line Item Totals Explained",
    "metaDescription": "A line total is quantity × rate for one row. See subtotal, tax, deposit, and amount due with a remodel example you can rebuild in free generators.",
    "answerFirst": "A line total (also called a line item total) is quantity times the unit rate for that row. Add line totals for the subtotal. Tax, if you charge it, is the taxable subtotal times the rate divided by 100. Amount due is the total minus deposits already paid. Example: 8 hours at $65 is $520; add a $180 materials line and the subtotal is $700.",
    "publishedAt": "2026-10-20",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "quote-estimate-generator",
      "contractor-invoice",
      "construction-estimate-template",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "cleaning-invoice-rates-line-items",
      "construction-estimate-that-wins-jobs"
    ],
    "howTo": [
      "Calculate each line as quantity × rate.",
      "Sum lines into a subtotal.",
      "Apply tax as taxable subtotal × (tax rate ÷ 100).",
      "Subtract deposits paid to get amount due.",
      "Recreate the same math in a free estimate or invoice generator before you send the PDF."
    ],
    "sources": [
      {
        "label": "IRS: What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Invoices and similar documents as support for gross receipts"
      }
    ],
    "sections": [
      {
        "heading": "What is a line total?",
        "body": "A line total is quantity times the unit rate for that one row on an estimate or invoice. Add those line totals to get the subtotal. Tax, if you charge it, is the taxable subtotal times the rate divided by 100. Amount due is the grand total minus deposits already paid.\n\nPeople also call this a line item total. Same math either way. Example: 8 hours at $65 is $520. Add a $180 materials line and the subtotal is $700. Keep the finished invoice with your job file. The IRS lists invoices among the documents that support gross receipts.\n\nUse a free estimate or invoice generator so every PDF follows the same chain: line total, subtotal, tax, deposit, amount due."
      },
      {
        "heading": "What is the core line-item total formula?",
        "body": "Line amount equals quantity multiplied by rate. Subtotal equals the sum of line amounts. Tax equals taxable subtotal times tax rate divided by one hundred when all taxed lines share one rate. Total equals subtotal plus tax. Deposit equals total times deposit percent divided by one hundred when you collect an upfront percentage.\n\nThat deposit percent is a working pattern you choose for the job, not a federal rule. Amount due on an invoice equals total minus amount already paid. When a line is a lump sum, set quantity to one and put the full price in the rate column so spreadsheets and generators stay consistent."
      },
      {
        "heading": "How do mixed units and lump sums work?",
        "body": "Labor may be hourly while materials are lump sum and flooring is per square foot. The math is the same per line. Only the unit label changes. Do not put a full package price in the rate column and also set quantity above one unless you mean multiple packages.\n\nLabel tax-exempt lines when your state exempts certain labor or products. Many generators apply one rate to the subtotal you enter. Adjust lines before export if you need split tax. Confirm exempt lines with your accountant. Rounding to cents is a software choice for the PDF your client sees, not a tax statute."
      },
      {
        "heading": "How should you round money on client PDFs?",
        "body": "Round money to cents on the PDF your client sees. Tiny floating-point differences in spreadsheets should not change the printed total. If your tool shows extended amounts per line, verify each line equals quantity times rate before trusting the subtotal.\n\nWhen a deposit percent produces fractional cents, round the deposit to cents and note that the final invoice reconciles any penny difference. Spot-check the largest dollar lines first when totals disagree."
      },
      {
        "heading": "What is the difference between a deposit and a partial payment?",
        "body": "A deposit line on an estimate is informational until you invoice it. On an invoice, move paid amounts into amount paid so balance due reflects reality. Multiple partial payments sum into amount paid. Receipts document each payment event without replacing the running balance on the next invoice.\n\nWhen a client pays deposit by check and progress by card, amount paid should show both methods on the final invoice, or attach two receipts. AP teams reject vague \"paid in full\" with no trail. Deposit percentages are working patterns for your trade and cash flow. Put the percent you actually use on the estimate and contract so invoices match."
      },
      {
        "heading": "Worked example: remodel subtotal",
        "body": "Start with the short pattern from the answer above: 8 hours of labor at $65 equals $520. Materials lump sum $180. Subtotal $700. That is enough to teach the line-total idea.\n\nScale the same math for a fuller remodel bid. Labor: 24 hours at $75 equals $1,800. Materials lump sum $4,200. Flooring: 220 square feet at $2.50 equals $550. Subtotal $6,550. Tax at 8.31 percent equals about $544.31. Total about $7,094.31.\n\nA 30 percent deposit on that total is about $2,128.29. That 30 percent is the schedule for this job, not a required industry rate. Change any rate in the construction estimate generator and the live preview recalculates the same way. Export the PDF, then mirror the lines on the contractor invoice when work starts."
      },
      {
        "heading": "Formula reference",
        "body": "Keep this table near your desk when training new office staff. Walk clients through the same steps when they ask why a total changed.",
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
              "Taxable subtotal × rate%",
              "Confirm exempt lines"
            ],
            [
              "Grand total",
              "Subtotal + tax",
              "Owed if nothing paid"
            ],
            [
              "Deposit",
              "Total × deposit%",
              "Working pattern on estimates"
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
        "heading": "How do retainage and holdbacks affect amount due?",
        "body": "Commercial construction sometimes shows retainage withheld from each progress invoice. Amount due may be line total minus retainage percent until substantial completion. Your generator may show amount paid while retainage is tracked off-document in your ledger. Explain retainage in the cover email so clients do not think you forgot to bill the last portion.\n\nFreight and rush fees should be their own lines with quantity one and a lump rate so clients see them before tax. Discount lines work best as negative amounts with a clear label so subtotal math stays transparent."
      },
      {
        "heading": "How do you check math before you export?",
        "body": "Sort lines by dollar amount and verify the top three manually each time you send a large PDF. Typos in quantity (twenty instead of two) hide until the client pays. When you import supplier CSVs, confirm unit of measure matches your template. Sheets sold by the box should not use per-sheet rates without converting units.\n\nField staff who understand quantity times rate catch typos before clients do. When clients ask why the total changed, walk them line by line rather than debating the bottom number. Export PDFs from the same generator for estimates and invoices so formatting stays familiar. Store those PDFs with the job. Invoices help support income records once work is billed."
      }
    ],
    "faq": [
      {
        "question": "What is a line item total?",
        "answer": "It is the same as a line total: quantity times unit rate for that row. Add line totals for the subtotal, then tax and payments as needed."
      },
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
        "answer": "Use the rate effective on the invoice date for billed work. Note the rate on each PDF."
      },
      {
        "question": "Can I discount after subtotal?",
        "answer": "Apply discounts as negative lines or adjust subtotal before tax per your accountant's preference. Be consistent across jobs."
      },
      {
        "question": "Why does my spreadsheet total differ by a penny?",
        "answer": "Rounding order matters. Round per line or per total consistently with your generator settings. That is software behavior, not a tax rule."
      },
      {
        "question": "How do I show multiple tax rates?",
        "answer": "Split lines by rate or show separate subtotals per jurisdiction if your generator supports one rate at a time. Manual PDFs may need two tax lines labeled city and state."
      },
      {
        "question": "What if quantity is fractional?",
        "answer": "Hours often use decimals such as 2.5. Round extended amounts to cents on the client PDF even when internal timesheets use minute precision."
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
    "metaDescription": "Build a freelance payment schedule with deposits and milestones. See a $6,000 site example and put the same splits in a free web design contract.",
    "answerFirst": "Write the deposit and each milestone percent in the contract before work starts, with a clear trigger for when each payment is due. One working schedule for a fixed web project is 30% to start, 40% on design approval, and 30% on launch. Those percents are a pattern for that job, not an official rule. Match every invoice to the signed schedule.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-11-13",
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
    "legalNote": "This article is not legal advice. Payment, refund, and intellectual property clauses depend on your jurisdiction and project type. Have a licensed attorney review your contract before you rely on it.",
    "howTo": [
      "Agree on the total fee and list milestone percents that add to 100%.",
      "Name a deliverable trigger for each payment (signed contract, written design approval, launch).",
      "Put the schedule in the contract body and repeat it in a simple table.",
      "Invoice each milestone the day you deliver the trigger artifact.",
      "Issue a receipt when payment clears and store both with the project file."
    ],
    "sources": [
      {
        "label": "IRS: What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Invoices and receipts as support for gross receipts"
      },
      {
        "label": "SBA: Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "High-level recordkeeping and compliance reminders for small businesses"
      }
    ],
    "sections": [
      {
        "heading": "What is a reasonable freelance payment schedule?",
        "body": "A reasonable schedule is one both sides can fund and that ties each payment to a clear deliverable. Write the deposit and milestone percents in the contract before kickoff so each invoice is paperwork, not a new negotiation. One working schedule for a fixed web build is 30% to start, 40% on written design approval, and 30% before launch.\n\nThat 30/40/30 split is a pattern for the example below, not a typical or official rate from the IRS or SBA. Longer retainers may use monthly billing instead. Put the schedule you actually use in the freelance web design contract so the PDF and later invoices match."
      },
      {
        "heading": "Why tie payments to milestones instead of vague net terms?",
        "body": "Freelancers get stuck when scope creeps but payment stays vague. Milestones tied to deliverables such as wireframes approved, staging site live, or brand guide delivered give both sides a shared definition of done. IRS materials for small businesses stress documenting income with invoices and similar records.\n\nYour contract is where payment clarity lives alongside scope and ownership. The SBA also points businesses to stay compliant with recordkeeping and related rules at a high level. Net thirty after delivery can favor the client's cash flow on long builds. Milestone schedules keep your rent paid while the project runs. Propose the schedule before you accept the statement of work."
      },
      {
        "heading": "Should the deposit be refundable?",
        "body": "Say so explicitly in the contract. Many freelancers make the deposit non-refundable after a short cancellation window because calendar time was reserved. Refundable deposits should name the exact calendar date when they become non-refundable. State whether the deposit reserves the start date, covers discovery only, or applies to the first phase of build.\n\nHave counsel review refund and pause-work language if you plan to enforce it. Do not treat any refund rule as industry law. It is a term you negotiate for that engagement."
      },
      {
        "heading": "When do you invoice each milestone?",
        "body": "Invoice each milestone the same day you deliver the artifact the client must approve. Waiting two weeks trains clients to pay late. Match invoice line items to the contract schedule. Name the milestone in the subject line so accounting does not confuse wireframe approval with the launch invoice.\n\nIf clients pay by card, factor processor fees into pricing so net cash still covers the work. Issue a receipt after each cleared payment. The invoice requests money. The receipt proves payment for tax records and client books. Keep both with the project file."
      },
      {
        "heading": "What happens if the client pays late?",
        "body": "Contracts can say work pauses when an invoice is overdue by a stated number of days. Have counsel review pause and resume wording so you do not breach deliverable dates on your side. Send reminders tied to contract triggers, not vague follow-ups.\n\nInclude ACH or wire details on every milestone invoice so finance teams do not email twice for routing numbers. Late-fee language should be reviewed by an attorney before you enforce it. This guide is operational, not legal advice."
      },
      {
        "heading": "Worked example: five-page marketing site",
        "body": "Total fee $6,000 for a five-page marketing site. Working schedule for this job: 30% deposit ($1,800) due at signing to reserve the calendar. Milestone two: 40% ($2,400) due when the client approves wireframes in writing. Final 30% ($1,800) due before DNS cutover to production.\n\nEach milestone invoice references the contract section and lists no additional hours unless a change order is signed. Rush requests after approval bill at the stated hourly overage rate. Build the same 30/40/30 table inside the freelance web design contract so the client sees the math before kickoff. When each payment clears, send a receipt and file it with the invoice."
      },
      {
        "heading": "Milestone planning table",
        "body": "Adapt percents to project length. The ranges below are planning aids for your own schedule, not official norms. Long retainers may use monthly billing instead of a four-phase split.",
        "table": {
          "caption": "Freelance payment milestone planning aid",
          "headers": [
            "Phase",
            "Example % band",
            "Trigger"
          ],
          "rows": [
            [
              "Kickoff deposit",
              "Working pattern (e.g. 30%)",
              "Signed contract"
            ],
            [
              "Design approval",
              "Working pattern (e.g. 40%)",
              "Wireframes or comps approved"
            ],
            [
              "Build complete",
              "Optional mid phase",
              "Staging review accepted"
            ],
            [
              "Launch / handoff",
              "Balance to 100%",
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
        "heading": "How do scope changes affect cash flow?",
        "body": "When clients request extra pages or features, pause and issue a written change order with new milestone amounts before coding continues. Track hours even on fixed bids so you learn which packages underprice discovery. If a client disappears mid-project, your contract should say work pauses and dates shift.\n\nInvoices already due remain owed. Pair milestone releases with tangible artifacts: PDF sign-off, ticket closure, or staging URL password handoff. Discovery-heavy projects may bill the first milestone hourly with a cap, then switch to fixed phases after requirements are stable. State the switch trigger in the statement of work. Uncapped hourly discovery without checkpoints invites bill shock."
      },
      {
        "heading": "Where do NDAs fit at kickoff?",
        "body": "If kickoff requires confidential brand assets, a simple NDA can sit beside the services agreement. Keep documents separate so payment terms stay readable and confidentiality obligations stay in one place. Do not hide payment triggers inside NDA text. When two freelancers collaborate, split milestones in a simple collaboration memo before client signatures.\n\nOne lead invoices the client. Internal splits stay off the client PDF. Put the client-facing schedule in the freelance web design contract and reuse it on every milestone invoice."
      }
    ],
    "faq": [
      {
        "question": "Is 30/40/30 the official freelance payment split?",
        "answer": "No. It is one working schedule used in the $6,000 site example. Write the percents you and the client agree on, and make sure they add to 100%."
      },
      {
        "question": "Should the deposit be refundable?",
        "answer": "Say so explicitly. Many freelancers make the deposit non-refundable after a short cancellation window because calendar time was reserved. Have counsel review refund wording."
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
        "question": "Should milestones match calendar dates?",
        "answer": "Tie triggers to deliverables, not arbitrary dates, unless you run a retainer. Calendar dates slip. Approved wireframes do not."
      },
      {
        "question": "Should I invoice sales tax on each milestone?",
        "answer": "Follow your accountant's guidance. Some businesses accrue tax on each progress payment, others on final delivery. Use the same approach on every milestone invoice in a project."
      }
    ]
  },
  {
    "slug": "what-to-include-on-a-receipt",
    "title": "How to Write a Payment Receipt",
    "metaDescription": "How to write a receipt of payment: who paid whom, date, amount, method, invoice reference, and balance. Free PDF receipt generator for services.",
    "answerFirst": "Show who paid whom, the date, a unique receipt number, the amount, the payment method, and what it covers. If it pays an invoice, add that invoice number. Example: $1,200 by card toward invoice 1047, tax shown separately. Keep a copy. This guide covers a payment receipt for goods or services, not a monthly rent receipt.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "receipt-generator",
      "contractor-invoice"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "line-item-totals-explained",
      "cleaning-invoice-rates-line-items"
    ],
    "howTo": [
      "Enter your business name and the payer's name on the receipt.",
      "Add a unique receipt number, payment date, and invoice or job reference.",
      "Describe what was paid for and record amount paid plus payment method.",
      "Note tax if applicable and any remaining balance for partial payments.",
      "Export the PDF from the receipt generator and file it with the related invoice."
    ],
    "sources": [
      {
        "label": "IRS: What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Receipts and receipt books as support for gross receipts"
      },
      {
        "label": "IRS: How long should I keep records",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
        "usedFor": "3-year general period, 4-year employment tax, 6-year substantial omission"
      },
      {
        "label": "IRS: Recordkeeping",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
        "usedFor": "Recordkeeping overview including employment-tax retention"
      }
    ],
    "sections": [
      {
        "heading": "How do you write a receipt of payment?",
        "body": "Show who paid whom, the date, a unique receipt number, the amount, the payment method, and what it covers. If it pays an invoice, add that invoice number. Example: $1,200 by card toward invoice 1047, with tax shown separately. Keep a copy with the job file.\n\nThe IRS lists receipts and receipt books among documents that support gross receipts. Fill the same fields every time so client accounting can match the receipt to their invoice. Build the PDF in the free receipt generator so numbering and layout stay consistent across jobs.\n\nThis page is about a payment receipt for goods or services. It is not a monthly rent receipt template for landlords."
      },
      {
        "heading": "What is a payment receipt?",
        "body": "A payment receipt is the document that proves a payment already happened. An invoice asks for money. A receipt confirms it arrived, with the date, amount, and method. Example: a client pays a $500 deposit on a $2,000 job, and you issue receipt R-18 that points back to invoice 1047. Keep that PDF with your income records.\n\nClients sometimes ask for a receipt after paying an invoice. Contractors may also issue a receipt for a walk-in deposit before a formal invoice exists. Keep titles accurate. A PDF labeled invoice that only confirms payment will confuse bookkeeping."
      },
      {
        "heading": "What is the difference between a payment receipt and an invoice?",
        "body": "An invoice requests payment. A receipt proves payment was made. You can have both on the same job: send the invoice, then issue a receipt when the money clears. Example: invoice 1047 asks for $2,000; receipt R-18 later shows $2,000 received by bank transfer on 12 March.\n\nAn estimate proposes work and price. It is neither an invoice nor a receipt. The IRS lists both invoices and receipt books as supporting documents for gross receipts. Use the receipt generator after the contractor invoice is marked paid so both parties have matching copies the same day."
      },
      {
        "heading": "How long should I keep receipt and invoice copies?",
        "body": "Keep records that support income, deductions, or credits until the IRS limitation period for that return runs out. For most income tax returns that is 3 years after filing. Keep employment tax records at least 4 years after the tax is due or paid, whichever is later. If more than 25% of gross income was unreported, keep them 6 years.\n\nThose figures come from IRS recordkeeping guidance. Insurers or lenders may ask you to keep copies longer. Store receipts with the same job number as invoices. Digital PDFs in cloud storage beat shoeboxes when someone asks for a three-year-old job."
      },
      {
        "heading": "Can I make a PDF receipt?",
        "body": "Yes. Email PDF receipts are widely used for service businesses. Create the receipt in the receipt generator, export the PDF, and send it the same day payment clears. Keep your copy in the same folder as the invoice. Serial receipt numbers prevent gaps that auditors flag.\n\nFor mobile card readers, include last four digits of the card when the processor provides them. That speeds up client expense reports. Match client preference for email or print, but always keep your own cloud copy."
      },
      {
        "heading": "What seller and buyer details belong on a receipt?",
        "body": "Include your business legal or trade name, address, and contact phone or email. Show client or payer name. For consumer jobs, the job site address may appear in the description field. If you are a sole proprietor, your name and tax ID handling follow practices you discuss with your tax preparer.\n\nThe receipt should still show a professional business identity. Property managers paying on behalf of tenants should show both payer name and unit address so ledgers reconcile to the correct file. That is still a payment receipt for a service invoice, not a rent-roll form."
      },
      {
        "heading": "How do you fill out amount, method, and invoice references?",
        "body": "State the amount received in dollars and cents, payment method such as check, card, cash, or transfer, and the date paid. Reference the invoice number, estimate number, or contract section the payment applies to. If the payment is a partial deposit, say remaining balance per the invoice. If it is final payment, say paid in full.\n\nOne or two description lines are enough: deposit for kitchen remodel per invoice 1042, or annual maintenance plan renewal. Detailed line items usually stay on the invoice. The receipt summarizes."
      },
      {
        "heading": "Worked example: contractor deposit receipt",
        "body": "Smith Renovations LLC receives $2,530 from Jane Doe on March 4 by card for a 30 percent deposit on a bathroom remodel per invoice 2026-014. The 30 percent is the deposit pattern on that job, not a required rate. Receipt notes balance due per invoice before final inspection. Client email and phone appear in the header for delivery.\n\nYou generate the PDF from the receipt generator, store a copy with the job file, and attach it to the thank-you email. Invoice 2026-014 still shows amount paid updating on the next progress bill. Both the invoice and the receipt support your income records."
      },
      {
        "heading": "Receipt field checklist",
        "body": "Missing fields cause client accounting departments to reject your paperwork. Use the table when you train staff or set defaults in the receipt generator.",
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
        "heading": "What about chargebacks, refunds, and cash controls?",
        "body": "When a card payment is reversed, issue a receipt or credit note showing the reversal amount and date. Link it to the original receipt number. Partial refunds for unused retainers should say which invoice line was credited so the client's books stay balanced.\n\nCash receipts should name the employee who accepted payment when your policy requires dual control. For check payments, note check number so duplicate deposit errors are easy to trace in bank feeds. Voided payments need a new receipt or credit memo note, not a silent delete."
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
        "answer": "Email PDF receipts are widely accepted for business payments. Keep copies for the IRS retention periods that apply to your records."
      },
      {
        "question": "What about tips?",
        "answer": "Show tip as a separate line when it is not part of the invoiced service fee so clients can reconcile payroll or expense reports."
      },
      {
        "question": "Can one receipt cover multiple invoices?",
        "answer": "Yes if you list each invoice number and amount allocated. Avoid vague lump sums when clients use cost centers."
      },
      {
        "question": "Is this a rent receipt guide?",
        "answer": "No. This guide covers payment receipts for goods and services. Monthly landlord rent receipts are a different document."
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
        "question": "Should receipts match invoice numbers?",
        "answer": "Yes. Carry the invoice number on every receipt so partial payments stack cleanly. Use the same date format as your invoices."
      }
    ]
  },
  {
    "slug": "cleaning-invoice-rates-line-items",
    "title": "Cleaning Service Invoices: Rates and Line Items",
    "metaDescription": "Build a cleaning invoice with clear rates and line items. See a move-out deep-clean example and export PDFs with the free cleaning invoice tool.",
    "answerFirst": "Price cleaning as separate lines so the visit rate, add-ons, supplies, and travel stay visible. Match invoice labels to the quote, and list frequency (weekly or biweekly) so clients see the same math on billing day. Your rates are your own. There is no federal standard price list for house cleaning.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-11-13",
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
    "howTo": [
      "Pick one pricing model per client (flat visit, hourly, or commercial contract) and write it on the quote.",
      "List the base clean as one line, then add-ons as separate lines.",
      "Add disclosed travel, access, or supply lines when they apply.",
      "Apply tax only if your state requires it on cleaning, then show amount due.",
      "Build the PDF in the cleaning service invoice tool and send it after the visit (or per your stated terms)."
    ],
    "sources": [
      {
        "label": "IRS: What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Invoices as supporting documents for gross receipts"
      }
    ],
    "sections": [
      {
        "heading": "What line items belong on a cleaning invoice?",
        "body": "Put the base visit as one line, then give add-ons their own lines: inside oven, inside fridge, interior windows, laundry fold. Supplies can be included in the flat rate or itemized when clients provide products versus when you bring supplies at a markup.\n\nName rooms on deep-clean invoices when clients dispute scope. Master bath deep scrub versus hall bath quick clean clarifies why the total rose versus maintenance visits. Build those lines in the cleaning service invoice tool so quotes and invoices use identical labels.\n\nKeep finished invoices with your job file. The IRS lists invoices among documents that support gross receipts."
      },
      {
        "heading": "How should I choose a cleaning pricing model?",
        "body": "Residential cleaners often bill flat per visit based on bedrooms, bathrooms, and square footage, or hourly with a minimum. Commercial accounts may use contracted monthly square footage or nightly janitorial hours. Pick one primary model per client and document it on the first quote.\n\nSwitching models mid-relationship without notice creates disputes. Move-in and move-out cleans often use a higher flat tier than weekly maintenance because ovens, cabinets, and baseboards take extra time. Publish the tier names on your website so quotes and invoices match. Do not treat any dollar figure in this guide as a standard rate. Set prices from your labor, travel, and margin."
      },
      {
        "heading": "How do I price a first-time or move-out clean?",
        "body": "Many companies charge a higher initial deep clean, then drop to a maintenance rate. Show both lines on the first invoice for transparency. Move-out cleans for empty homes usually need more time than weekly visits. Photograph conditions when a home is dirtier than expected, and get written approval before adding hours or a heavy-soil surcharge line.\n\nPut that surcharge on the quote when you can predict it. Recreate the same lines in the cleaning service invoice generator so the client sees no surprise labels on billing day."
      },
      {
        "heading": "Should I invoice before or after the visit?",
        "body": "Residential recurring clients often auto-charge after service. Commercial accounts may invoice monthly in arrears. State terms on the first quote. Failed card charges should trigger a written retry policy before you skip the next visit. Send the invoice the same day when possible so the visit is fresh in the client's mind.\n\nAfter payment clears, issue a receipt. Pair the cleaning service invoice with your usual payment instructions so AP teams know how to pay."
      },
      {
        "heading": "How do travel, keys, and access fees appear?",
        "body": "Long drive times or parking fees belong on the invoice if they were disclosed in the quote. After-hours or holiday service often carries a multiplier stated upfront. If a lockout or missed access wastes a trip, your policy should appear in terms. The invoice references the trip fee line when charged.\n\nDisclose lockbox or concierge access fees on the first quote. Invoice them as a flat access line when your team must make an extra trip for keys. Holiday surcharges should appear on both quote and invoice the same week so recurring clients are not surprised."
      },
      {
        "heading": "How do tax and tips work on cleaning invoices?",
        "body": "Sales tax on cleaning varies by state and whether labor is taxable. Show tax on a labeled subtotal only when you collect it. Ask your accountant or state department of revenue. Do not copy another city's rate. Gratuity is voluntary unless your jurisdiction treats mandatory service charges differently.\n\nLabel tips and service charges clearly. Commercial clients may require PO numbers on the invoice header. If you exempt certain nonprofit clients from tax, note the exemption certificate number on the memo line your accountant prefers."
      },
      {
        "heading": "Worked example: move-out deep clean",
        "body": "Move-out clean for an empty three-bed, two-bath home. Base deep clean flat $320. Add-ons: oven $40, fridge $35, interior windows twelve panes at $4 each ($48). Travel zone fee $15. Subtotal $458 before tax. These dollar amounts are one company's working prices for this example, not industry standards.\n\nInvoice notes the service date and that supplies were provided by the company. Client pays by card. Receipt issued after capture. The same lines could have appeared on a quote from the estimate generator before booking. Build the final PDF in the cleaning service invoice tool so the client recognizes every label."
      },
      {
        "heading": "Common cleaning invoice lines",
        "body": "Use the table to standardize names across your team. Swap in your own rates. The units are patterns, not required prices.",
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
        "heading": "How do recurring and commercial accounts stay consistent?",
        "body": "After three visits you know true time on site. Adjust flat rates at renewal rather than surprising mid-contract. Document pet hair, clutter, or heavy soap-scum policies in the quote so trip fees are expected. Team leads should note add-ons completed on a job sheet that office staff translate to invoice lines the same day.\n\nCommercial clients may require monthly statements summarizing visits. Line items should match work orders when you use them. Office clients may need invoices split by cost center or floor. Match work-order numbers from their facilities portal on your PDF header. Post-construction cleans for builders often use punch-list walkthroughs before final invoice. Photo document each room on completion day in case the GC disputes a line. Keep using the cleaning service invoice tool so every account sees the same field layout."
      }
    ],
    "faq": [
      {
        "question": "Should I invoice before or after the visit?",
        "answer": "Residential recurring clients often auto-charge after service. Commercial accounts may invoice monthly in arrears. State terms on the first quote."
      },
      {
        "question": "How do I price first-time cleans?",
        "answer": "Many companies charge a higher initial deep clean then drop to maintenance rate. Show both lines on the first invoice for transparency. Use your own rates."
      },
      {
        "question": "What if the home is dirtier than expected?",
        "answer": "Photograph conditions and get written approval before adding hours or a heavy-soil surcharge line."
      },
      {
        "question": "Do I list each cleaner's hours?",
        "answer": "Usually no for flat rates. Hourly jobs may show crew hours as one line unless the contract requires detail."
      },
      {
        "question": "Can I bundle supplies into the flat rate?",
        "answer": "Yes if margin covers consumables. Itemize when commercial clients require cost separation."
      },
      {
        "question": "How do I quote post-construction cleans?",
        "answer": "Use hourly or per-square-foot lines with a site visit. Construction dust loads differ from maintenance cleans. Photos justify higher rates on the invoice."
      },
      {
        "question": "How do I handle cancellations?",
        "answer": "State notice hours on the quote. Invoice the cancellation fee line only when your terms were accepted in writing at booking."
      },
      {
        "question": "Should tips appear on the invoice?",
        "answer": "Tips are usually separate from the invoice total unless you run a mandatory service charge allowed in your area. Confirm tax treatment with your accountant."
      },
      {
        "question": "Is there a standard cleaning hourly rate?",
        "answer": "No federal standard rate list applies here. Set rates from your costs and market. Do not copy sample dollars from blogs as rules."
      }
    ]
  },
  {
    "slug": "nda-basics-for-freelancers",
    "title": "NDA Basics for Freelancers and Contractors",
    "metaDescription": "When freelancers need an NDA, one-way vs mutual, and what to read before signing. Free simple NDA template. This is not legal advice.",
    "answerFirst": "Use an NDA when you will share or receive unreleased product plans, customer lists, financials, or unpublished campaigns. Read the confidential-information definition, permitted purpose, exclusions, and term before you sign. This guide explains common sections in plain English. It is not legal advice, and it does not claim any clause is enforceable in your state.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "simple-nda",
      "freelance-web-design-contract"
    ],
    "relatedGuideSlugs": [
      "freelance-payment-schedule-milestones",
      "photography-contract-clauses",
      "videography-contract-clauses"
    ],
    "legalNote": "This article is not legal advice. Whether an NDA or any clause in it is enforceable depends on your jurisdiction and the facts. Have a licensed attorney review your NDA before you rely on it for trade secrets, investor data, or client disputes.",
    "sources": [
      {
        "label": "Cornell LII Wex: Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Definition of a contract (offer, acceptance, consideration). Not advice on NDA clauses."
      }
    ],
    "sections": [
      {
        "heading": "When does a freelancer need an NDA?",
        "body": "Sign or offer an NDA before exchanging unreleased product designs, customer lists, financial projections, or unpublished marketing campaigns. Public websites and press releases are usually not confidential. Small engagements may use a short mutual NDA at kickoff while the larger services contract is being finalized.\n\nIf the client sends login credentials or production database access, pair the NDA with a separate security expectations email covering password handling and devices you control. An NDA is a type of agreement. Under ordinary contract basics, a contract involves offer, acceptance, and consideration. Whether your signed PDF meets that test depends on the wording and your jurisdiction. Ask counsel. Do not assume a template is automatic protection."
      },
      {
        "heading": "What is the difference between a one-way and a mutual NDA?",
        "body": "One-way NDAs bind the receiving party, often the freelancer, not to disclose the client's secrets. Mutual NDAs bind both sides when each shares sensitive roadmaps, as in agency partnerships. Read who is disclosing and who is receiving. Copy-paste mutual templates into one-way deals by mistake happens often.\n\nIf only you receive data, ask whether a mutual NDA is needed, or whether you will share your own tooling insights that also deserve marking as confidential. Start from a simple NDA draft, then have counsel tune it. This page does not claim either form is enforceable as written."
      },
      {
        "heading": "What should the confidential information definition cover?",
        "body": "Many NDAs define what counts as confidential: marked confidential, orally identified and confirmed in writing, or reasonably understood as secret. They often list exclusions such as public domain, independently developed, or rightfully received from a third party. Overbroad definitions can create disputes.\n\nCounsel should tune scope for your work. Public pricing on a website is usually not confidential. Do not let clients sweep already-published marketing into NDA coverage without pushback. Cornell LII's contract overview is useful for the idea of a binding agreement. It does not validate any specific NDA clause set."
      },
      {
        "heading": "Does an NDA stop me from showing portfolio work?",
        "body": "Only if confidential information appears or the services contract restricts portfolio use. Negotiate portfolio carve-outs separately from the NDA. Blur unreleased UI and remove customer names when counsel allows a case study after launch. NDAs do not replace work-for-hire or license terms in your services agreement.\n\nPut payment milestones and IP handoff in the freelance web design contract. Keep confidentiality in the NDA so each document stays readable."
      },
      {
        "heading": "Are NDAs the same as non-competes?",
        "body": "No. Non-competes restrict where or for whom you may work. NDAs restrict disclosure of confidential information. Some client NDAs sneak broad non-solicit language. Read carefully. Ask counsel whether to strike language that prevents you from serving non-competing clients in your specialty.\n\nThis guide does not say any non-solicit or non-compete clause is enforceable or unenforceable. State law varies. Get local advice before you sign or enforce."
      },
      {
        "heading": "What about term, return of materials, and remedies?",
        "body": "State how long confidentiality lasts after the project ends. Many drafts use multi-year survival language. Trade secrets may need different treatment. Those lengths are drafting choices for counsel, not rules published here. Require return or destruction of files on termination when that fits the deal.\n\nRemedies language (including injunctive relief) should be reviewed by an attorney. Email the client when you finish destruction so there is a paper trail. If the client asks you to retain files for a future phase, amend the NDA term or services contract so retention has a written end date."
      },
      {
        "heading": "Worked example: brand asset handoff",
        "body": "A SaaS startup hires a freelance designer. Mutual NDA signed day one. Client shares Figma files and an unreleased pricing PDF. Designer shares draft UI not yet public. The draft uses a two-year term from last disclosure. Exclusions apply to information already on the marketing site. That term is the parties' working choice for this example, not a required length.\n\nServices contract follows with payment milestones. Portfolio rights for the designer are negotiated in the services agreement, not silently assumed in the NDA. Build the NDA draft in the simple NDA tool, then have counsel review before signing."
      },
      {
        "heading": "NDA clause map",
        "body": "Scan your template for these headings before signing a client paper. Use the map as a reading checklist, not as a claim that any section will hold up in court.",
        "table": {
          "caption": "Common NDA sections to review",
          "headers": [
            "Section",
            "Purpose",
            "Freelancer watch-out"
          ],
          "rows": [
            [
              "Parties",
              "Who is bound",
              "Are subsidiaries included?"
            ],
            [
              "Definition",
              "What is secret",
              "Is the scope too broad?"
            ],
            [
              "Exclusions",
              "Public / independent development",
              "Are exclusions present?"
            ],
            [
              "Term",
              "Duration",
              "How long after the job?"
            ],
            [
              "Permitted use",
              "Project only",
              "Does it block other clients?"
            ],
            [
              "Return / destroy",
              "End of engagement",
              "What about backup copies?"
            ]
          ]
        }
      },
      {
        "heading": "What should you watch for in client NDAs?",
        "body": "Watch for perpetual confidentiality on information that is not secret, non-competes disguised as NDAs, or one-sided indemnity. Ask to narrow the definition to documents marked confidential and project-specific oral disclosures confirmed in email. If a client refuses to sign your mutual NDA but demands yours, weigh whether the engagement risk is worth it with counsel.\n\nStore executed NDAs with the project folder and note review dates for destruction reminders. Prime contractors may flow NDAs down to freelancers even when you never meet the end client. Read whether the prime can share your work product with their customer without another approval. If you subcontract, your agreement with the prime should allow flow-down to anyone who touches the files. Whistleblower and legal-complaint carve-outs appear in many mature NDAs. Do not accept language that blocks reporting unlawful conduct without talking to a lawyer."
      }
    ],
    "faq": [
      {
        "question": "Can I use one NDA for all clients?",
        "answer": "A baseline mutual NDA helps, but clients may require their paper. Compare term and non-solicit clauses before signing. Your simple NDA template is a starting point. It is not a substitute for counsel when clients send long vendor packets."
      },
      {
        "question": "Does an NDA stop me from showing portfolio work?",
        "answer": "Only if confidential information appears or the services contract restricts portfolio use. Negotiate portfolio carve-outs separately."
      },
      {
        "question": "Are NDAs the same as non-competes?",
        "answer": "No. Non-competes restrict work. NDAs restrict disclosure. Some client NDAs sneak broad non-solicit language. Read carefully with counsel."
      },
      {
        "question": "Should subcontractors sign too?",
        "answer": "Yes if they touch confidential files. Flow-down obligations should appear in your subcontractor agreement. You may still be responsible to the client if a subcontractor leaks data. Ask counsel."
      },
      {
        "question": "Is email without an NDA safe?",
        "answer": "Risky for true trade secrets. Use an NDA or at least mark attachments confidential and confirm in writing. Avoid forwarding client decks to personal accounts that sync to unsecured devices."
      },
      {
        "question": "Do NDAs cover verbal conversations?",
        "answer": "Many NDAs cover oral disclosures only when confirmed in writing within a few days. Send a recap email after sensitive calls. Counsel should confirm what your paper requires."
      },
      {
        "question": "Can I refuse a client's NDA?",
        "answer": "Yes when terms are overbroad or block your other work. Propose your mutual template or walk away. That is a business choice, not a legal guarantee."
      },
      {
        "question": "Does an NDA protect my ideas too?",
        "answer": "Only in a mutual NDA where your disclosures are listed or marked confidential. One-way client paper often forgets freelancer pre-existing IP. Add a carve-out for your toolkit and methods with counsel."
      },
      {
        "question": "Is this legal advice?",
        "answer": "No. Cornell LII can define a contract at a high level. It does not make your NDA enforceable. Have a licensed attorney review documents before you rely on them."
      }
    ]
  },
  {
    "slug": "work-order-vs-invoice-vs-estimate",
    "title": "Work Order vs Invoice vs Estimate: Which to Use",
    "metaDescription": "Compare work orders, estimates, and invoices for service jobs. Learn the handoff sequence, when each document applies, and how to keep job files tidy.",
    "answerFirst": "Use three documents in sequence: an estimate to propose price and scope, a work order to assign the job to the crew, and an invoice to collect payment. Mixing them on one PDF is how clients dispute what was promised versus what was billed. For step-by-step field fields, see the forthcoming guide at /guides/how-to-create-a-work-order/.",
    "publishedAt": "2026-10-21",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "work-order",
      "quote-estimate-generator",
      "contractor-invoice",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "line-item-totals-explained",
      "construction-estimate-that-wins-jobs"
    ],
    "howTo": [
      "Send an estimate that proposes scope, price, validity, and deposit terms.",
      "After acceptance, open a work order that assigns tasks, parts, and access notes to the crew.",
      "When work is done or a milestone hits, invoice with line labels that match the estimate and work order.",
      "Issue a receipt after payment posts and file all four PDFs in the same job folder."
    ],
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping job records that support income and expenses, including invoices and related paperwork"
      },
      {
        "label": "IRS — How long should I keep records",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
        "usedFor": "Retention timing for business records tied to returns and supporting documents"
      },
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Offer, acceptance, and consideration basics when asking whether a work order is a contract"
      }
    ],
    "sections": [
      {
        "heading": "What is a work order?",
        "body": "A work order is an operational job ticket that tells your crew what to do, where to do it, which parts are needed, and who is assigned. It is not a stop-work order. A stop-work order is a safety or regulatory halt that pauses activity on a site. Your service work order authorizes and schedules the visit instead.\n\nProperty managers and facilities teams often issue work orders. Contractors may issue them to crews after a client accepts an estimate or signs a service agreement. Include the requester name, site address, priority, task list, parts needed, technician assignment, access windows, and safety notes. Reference estimate line IDs when you have them so field labor stays inside the sold scope.\n\nPhotos of nameplates, serial numbers, and failed equipment belong on the work order packet for HVAC and appliance jobs. Status fields such as open, in progress, and complete help dispatchers avoid double-booking. For a field-by-field build walkthrough, use the forthcoming how-to at /guides/how-to-create-a-work-order/ and draft the PDF in the work order tool."
      },
      {
        "heading": "How does an estimate differ from a work order?",
        "body": "An estimate proposes price and scope to the buyer before work starts. A work order assigns the accepted job to people and parts. Clients compare estimates to choose a vendor. Crews use work orders to execute the visit. Keep those audiences separate so sales language does not bury safety notes.\n\nEstimates usually show validity dates, deposits, exclusions, and assumptions. Work orders usually show task checklists, lockout notes, tenant access windows, and parts pulls. When scope changes before the visit, revise the estimate first, then update the work order. Field teams should not invent extras on site without office approval that ties back to a change order.\n\nDraft selling numbers in the quote estimate generator. After the client accepts, open the work order so dispatch has a clean task list. The IRS expects small businesses to keep records that support income and expenses, so save both PDFs in the job file even after the job closes."
      },
      {
        "heading": "How does an invoice differ from a work order?",
        "body": "An invoice requests payment for work completed or contractually due. A work order records what the crew was told to do and what they finished. Accounts payable needs invoice numbers, due dates, tax, and payment instructions. Dispatch needs task status and parts used. Billing from a work order without a clean invoice title confuses finance teams and slows payment.\n\nInvoice line descriptions should mirror work order task names so AP can match time sheets and packing slips. Bill materials at quoted rates unless a change order authorized substitutes. Partial completion may warrant progress invoices tied to percent complete on the work order checklist. Close the work order when you invoice so technicians do not duplicate effort.\n\nUse the contractor invoice template when the job came from a construction or service estimate so labels match. After payment posts, issue a receipt with the receipt generator rather than marking paid only in email. Keep invoice and receipt copies with the work order export for disputes and tax questions."
      },
      {
        "heading": "Is a work order a contract?",
        "body": "It depends on the wording and how the parties treat the document. Cornell Law School’s Legal Information Institute explains that a contract is a promise the law will enforce, typically through offer, acceptance, and consideration. A bare internal task list often lacks that full stack.\n\nIn many shops the signature on the estimate or master services agreement creates the obligation, and the work order executes against that approval. Do not assume a CMMS ticket alone binds the client, and do not assume a signed priced work order is harmless. When money, dates, and scope appear together with a clear yes from both sides, treat the risk as real and get counsel if the stakes are high.\n\nHedge your process: put price and acceptance on the estimate or contract, put crew instructions on the work order, and put payment demands on the invoice. Cross-reference document IDs so a dispute can reconstruct the trail without arguing about labels."
      },
      {
        "heading": "What handoff sequence should offices follow?",
        "body": "A clean handoff runs estimate to work order to invoice to receipt. Sell with the estimate, authorize the crew with the work order, bill with the invoice, and confirm payment with the receipt. Cross-reference document IDs so every PDF points to the same job.\n\nWhen tasks change, issue a change order on the estimate before adding lines to the work order and invoice. Train technicians to note actual hours and parts used even on flat-rate jobs so you learn true cost. Property managers often require work order numbers on vendor invoices before they release payment.\n\nA single shared job folder with estimate PDF, signed change orders, work order export, invoices, and receipts prevents email archaeology during disputes. The IRS also discusses how long to keep records that support your returns, so set a retention habit that matches your accountant’s advice rather than deleting job folders after the final payment clears."
      },
      {
        "heading": "Worked example: HVAC service call",
        "body": "A building manager requests annual rooftop service. The estimate lists twelve units at ninety-five dollars each plus a filters lump sum. The manager accepts and signs. Work order WO-882 assigns a technician for Tuesday with the unit list, roof access notes, and lockout reminders. The tech completes eleven units. The owner shut down unit twelve for a remodel.\n\nThe invoice bills eleven units and filters at estimate rates and notes that unit twelve was skipped per client instruction. After ACH posts, the office issues a receipt and marks WO-882 complete in the CMMS. Every PDF stays in the job folder with matching line labels. That sequence is the working pattern: sell, assign, bill, confirm."
      },
      {
        "heading": "How do document roles compare side by side?",
        "body": "Train office staff with this summary so they pick the right generator when a client asks for paperwork. The audience row is the decision rule: estimates talk to buyers, work orders talk to crews, invoices talk to accounts payable, and receipts talk to payer records.",
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
        "heading": "How should emergency and after-hours calls use these documents?",
        "body": "Emergency work orders should state after-hours rates that already appear in the contract or rate card so the invoice does not invent a surcharge on the spot. Photos of failed equipment attached to the work order support invoice line descriptions for parts replaced. Note arrival time and resolution time when time-and-materials clauses apply.\n\nWhen the client declines a recommended repair, document declined work on the work order so future failures are not blamed on your crew. Residential jobs may use a signed estimate plus one completion invoice. Commercial facilities often expect a work order number on every truck roll and monthly statement billing. Match the document set to what the client’s AP team will accept the first time.\n\nWarranty callbacks should reference the original work order and invoice so you know whether labor is covered. Free warranty trips still deserve a work order for scheduling even when the invoice shows zero dollars. Ready to assign the next visit? Open the work order tool, link the accepted estimate ID, and keep billing on a separate invoice PDF."
      }
    ],
    "faq": [
      {
        "question": "Can a work order include prices?",
        "answer": "Some shops put internal cost tracking on work orders. Client-facing price usually stays on the estimate and invoice. If prices appear on internal work orders, watermark them as internal so they are not mistaken for client quotes."
      },
      {
        "question": "Do I need a work order for every visit?",
        "answer": "Recurring maintenance contracts often generate automatic work orders. One-off residential jobs may skip a formal work order if the signed estimate is enough for a small crew. Document the exception in your operations manual so new hires do not skip authorization on large jobs."
      },
      {
        "question": "What if actual hours exceed the estimate?",
        "answer": "Stop and get a change order before invoicing overages unless the contract allows time-and-materials caps. Attach time-stamped photos to the work order when extra hours stem from concealed damage."
      },
      {
        "question": "Is a work order the same as a stop-work order?",
        "answer": "No. A service work order assigns and authorizes work. A stop-work order pauses work for safety or regulatory reasons. Keep the labels distinct in training so crews do not confuse them."
      },
      {
        "question": "How does this relate to help desk tickets?",
        "answer": "IT tickets resemble work orders: authorize the task, then bill separately. Ticket closure should trigger invoice creation in your billing checklist so billable hours are not lost at month end."
      },
      {
        "question": "Should tenants see work orders?",
        "answer": "Property managers often share simplified work orders without internal cost codes. Tenants still receive invoices or ledger charges through the landlord portal separately. Never put one tenant’s unit access codes on a work order left visible in a shared hallway."
      },
      {
        "question": "Where can I learn the fields to fill?",
        "answer": "Use the forthcoming guide at /guides/how-to-create-a-work-order/ for a field checklist, and generate the PDF with the work order tool so estimate and invoice IDs stay linked."
      }
    ]
  },
  {
    "slug": "videography-contract-clauses",
    "title": "Videography Contract Clauses Explained",
    "metaDescription": "Delivery format, music rights, revision rounds, payment, and cancellation clauses for videography contracts. Free editable template. Not legal advice.",
    "answerFirst": "Cover seven videography clauses before you book: shoot days and crew, deliverables and formats, revision rounds, music and third-party rights, raw footage policy, payment schedule, and cancellation. Price raw files and rush edits as add-ons when clients ask. Draft in the free videography contract template, then have counsel review.",
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "videography-contract",
      "event-wedding-vendor-contract",
      "photography-contract-template"
    ],
    "relatedGuideSlugs": [
      "wedding-videography-contract",
      "photography-contract-clauses",
      "wedding-vendor-contract-checklist",
      "freelance-payment-schedule-milestones"
    ],
    "legalNote": "This article is not legal advice. Music licensing, union rules, drone rules, and copyright ownership vary by project and state. Use our template as a starting point and have a licensed attorney review your final agreement.",
    "howTo": [
      "Name parties, shoot dates, locations, crew count, and equipment promises before you take a retainer.",
      "List deliverable length, formats, revision rounds, and whether raw footage is included or sold separately.",
      "State music licensing responsibility, logo warranties, payment schedule, and cancellation windows.",
      "Add liability limits, overtime rates, and archive rules, then send the PDF from the videography contract template."
    ],
    "sources": [
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Basic definition of a contract as offer, acceptance, and consideration"
      },
      {
        "label": "U.S. Copyright Office — Photographers",
        "url": "https://www.copyright.gov/engage/photographers/",
        "usedFor": "Copyright ownership and licensing basics for creators of fixed visual works; get counsel for video-specific deals"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "General reminder to follow applicable business and licensing rules"
      }
    ],
    "sections": [
      {
        "heading": "What clauses should you walk through before booking?",
        "body": "Walk through scope, deliverables, revisions, rights, payment, cancellation, and liability before you take a retainer. Cornell Law School’s Legal Information Institute describes a contract as a promise the law will enforce, usually built on offer, acceptance, and consideration. Your signed PDF plus retainer is how booking starts.\n\nOpen the free videography contract template at /tools/videography-contract/ so every clause has a field, then walk the client through the PDF on a kickoff call. Wedding couples and corporate producers ask different follow-ups, but the same seven topics prevent most booking fights. For wedding-day timelines, overtime, and ceremony logistics that are unique to nuptials, use the companion guide at /guides/wedding-videography-contract/ instead of duplicating that page here. This article stays on the clause set that applies across wedding and commercial video work."
      },
      {
        "heading": "What belongs in scope, crew, and equipment?",
        "body": "List event dates, hours, locations, number of operators, cameras, audio package, lighting, and drone use if applicable with permit responsibility. Note meal breaks for long wedding days. Second shooters and backup gear should be promised only if written in scope.\n\nTravel days, per diem, and mileage for destination jobs belong in scope when they affect crew cost. If only one operator is booked, say so plainly. Equipment loss and backup camera policies matter when you promise a second shooter. Venue rider requirements on flash, drones, or cable runs belong in an exhibit so clients know you reviewed load-in rules before signing."
      },
      {
        "heading": "How should deliverables, formats, and revisions be written?",
        "body": "Specify film length, highlight versus documentary cuts, color grade level, and number of revision rounds. State delivery format such as digital download, resolution, and whether raw footage is included. Rush delivery fees belong here. Archival storage duration should be explicit before files are deleted. Define what a revision round includes: one consolidated email of notes, not endless one-line texts.\n\nCaption files, vertical social cuts, and chapter markers for long ceremonies can be separate deliverables with their own deadlines so post-production scope stays bounded. Color space and codec choices should match client use: web, broadcast, or internal training. Deliver via password-protected download links with file-size confirmation in email. Hard drives shipped to clients should list whether return postage is required and who owns the drive after delivery."
      },
      {
        "heading": "Who owns the finished video and related rights?",
        "body": "Under common US freelance practice, the creator often owns copyright in a fixed work and grants the client a license for stated uses, unless the contract says otherwise. The U.S. Copyright Office publishes creator guidance that is a useful starting point. Get counsel for video-specific deals.\n\nSeparate personal sharing from commercial use in the contract. Commercial licenses should name media, territory, duration, and credit requirements. If you want the client to own copyright outright, say so in writing and price that transfer. Silent contracts create the fights. Put ownership and usage in their own headings, then load the same language into the videography contract template at /tools/videography-contract/ before you send the booking link."
      },
      {
        "heading": "How should music, logos, payment, and cancellation read?",
        "body": "Licensed music for public YouTube or broadcast requires proper clearance. Contracts often state the client must license music for commercial use or accept royalty-free tracks you provide. Corporate logos may need client warranties. State retainer, balance due dates, and cancellation windows in writing.\n\nMirror photography payment patterns: retainer, balance due dates, reschedule windows, and force majeure. Cap liability to fees paid where counsel approves. Overtime hours beyond package should have hourly rates stated before the event. State whether retainer is transferable to a new date and how many postponements are included. One working pattern many studios use is a forty percent retainer with balance due thirty days before the event. Treat that percent as a studio habit, not a universal rule."
      },
      {
        "heading": "Worked example: wedding highlight package",
        "body": "Ten-hour coverage with one lead and one second shooter. Deliverable is a five-to-seven minute highlight film within ninety days, plus ceremony audio on USB as an optional add-on. Two revision rounds cover highlight length and song choice. A licensed song is included for private sharing. The client licenses separately for commercial use.\n\nRetainer is forty percent of the package, with balance due thirty days before the wedding. Cancellation inside sixty days forfeits the retainer in this example package. Raw footage is not included unless purchased. Map these bullets into the videography contract template at /tools/videography-contract/, fill the same fields, and send the PDF the same day the couple says yes. For deeper wedding-day logistics, open /guides/wedding-videography-contract/ after you lock the clause set."
      },
      {
        "heading": "How do wedding and corporate clause needs compare?",
        "body": "Use this table when you adapt one template for two markets. Wedding rows stress multi-location days and personal sharing. Corporate rows stress brand compliance and milestone billing. Keep both packages inside the same videography contract template so your PDF fields stay consistent.",
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
              "License or transfer spelled out"
            ],
            [
              "Music",
              "Licensed track for private share",
              "Client-provided cleared music"
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
        "heading": "What insurance, permits, and approval chains matter?",
        "body": "List general liability limits and whether you name the venue as additional insured when required. Drone and grip parking may need permits the client orders. Corporate clients may need brand legal to approve the contract and shot list. Build review days into the delivery timeline.\n\nInterview releases for employees on camera should be collected before shoot day when HR requires them. Second shooters and editors should sign confidentiality terms matching your client contract. You remain the signatory to the couple or brand. Verify insurance and gear lists for anyone you add late. Ready to book? Start with the editable videography contract at /tools/videography-contract/, then ask a licensed attorney to review your final agreement for your state and project types."
      }
    ],
    "faq": [
      {
        "question": "Should raw footage be sold?",
        "answer": "Price it as an add-on if offered. Raw files are large and not color-graded. Set expectations in writing. Specify codec, folder structure, and whether project files are included or only camera originals."
      },
      {
        "question": "Who owns the final video?",
        "answer": "Copyright often stays with the creator unless the contract transfers it. License terms should match client distribution plans. Use Copyright Office creator guidance as a starting point, then get counsel for video-specific deals."
      },
      {
        "question": "What about drone shots?",
        "answer": "State compliance, insurance, and no-fly restrictions. Backup ground shots if the drone is grounded. Indoor venues and many parks prohibit drones. Do not promise aerials without scouting."
      },
      {
        "question": "Can clients edit my work?",
        "answer": "Prohibit re-edits that misrepresent quality unless you grant source files and a license allowing modification. Color shifts and cropped logos can damage your reel. Address re-edit rights in the deliverables section."
      },
      {
        "question": "How many revision rounds are fair?",
        "answer": "Two to three rounds for highlights is a common working pattern. Additional rounds bill hourly when stated up front. Require consolidated feedback per round so editors are not chasing scattered texts."
      },
      {
        "question": "What about live streaming the wedding?",
        "answer": "Add streaming platform, bandwidth responsibility, and recording rights. Streaming may require separate permissions from venue and musicians. Backup recording on a local device protects you when venue Wi-Fi fails."
      },
      {
        "question": "Where do wedding-day details live?",
        "answer": "Keep clause vocabulary here, and use /guides/wedding-videography-contract/ for wedding-specific timelines, overtime, and ceremony logistics so the two pages do not duplicate each other."
      }
    ]
  },
  {
    "slug": "wedding-vendor-contract-checklist",
    "title": "Wedding Vendor Contract Checklist",
    "metaDescription": "Dates, deposits, cancellation, insurance, and deliverables to verify in wedding vendor contracts for catering, photo, video, and entertainment.",
    "answerFirst": "Before signing, run a seven-point wedding vendor checklist: event date and timeline, deposit and balance dates, overtime and travel fees, force majeure, backup vendor language, insurance or COI, and cancellation terms. Put numbers in writing, not only in texts. Compare clauses in the free event wedding vendor contract template.",
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "event-wedding-vendor-contract",
      "catering-quote",
      "photography-contract-template",
      "videography-contract"
    ],
    "relatedGuideSlugs": [
      "catering-quote-deposits",
      "videography-contract-clauses",
      "photography-contract-clauses"
    ],
    "legalNote": "This article is not legal advice. Wedding contracts are governed by state consumer and contract law. Consult an attorney for high-value disputes or non-refundable deposit questions in your state.",
    "howTo": [
      "Confirm legal business name, wedding date, start and end times, venue address, and on-site contact on every PDF.",
      "Check deposit amount, refund rules, balance due dates, overtime rates, and deliverable counts against the quote.",
      "Verify COI deadlines, venue rider rules, and cancellation or postponement language before you pay.",
      "Log each due date in a master calendar and store signed PDFs beside the event wedding vendor contract fields you used for comparison."
    ],
    "sources": [
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Offer, acceptance, and consideration basics that explain why written vendor terms matter"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "General reminder to follow applicable business and licensing rules"
      }
    ],
    "sections": [
      {
        "heading": "How do you run a three-vendor review night?",
        "body": "Set aside one evening two months before the wedding and compare photographer, caterer, and DJ contracts side by side with their quotes. Cornell Law School’s Legal Information Institute explains that a contract is a promise the law will enforce through offer, acceptance, and consideration. Put numbers in writing before you pay.\n\nOpen the event wedding vendor contract tool at /tools/event-wedding-vendor-contract/ so you can check missing clauses against a consistent field list. In a working example, the photographer PDF shows eight hours, a second shooter included, gallery delivery in sixty days, and a retainer that is non-refundable inside ninety days, matching the quote. The caterer PDF shows a guaranteed one hundred twenty guests, final count seven days out, a labeled service fee, and a fifty percent deposit as that vendor’s working pattern, matching the catering quote PDF. The DJ PDF shows four hours, overtime at one hundred fifty dollars per hour after midnight, and a COI due fourteen days before, which satisfies the venue requirement. The planner logs each deposit due date in a master calendar and stores the signed PDFs with the checklist."
      },
      {
        "heading": "What universal items belong on every vendor contract?",
        "body": "Confirm legal business name, event date, start and end times, venue address, and on-site contact. Payment schedules should list deposit, interim payments, and balance due dates tied to calendar triggers, not vague upon-receipt language. Read cancellation and postponement: who keeps the deposit, whether dates can transfer, and venue closure language if it still matters in your market.\n\nCheck that the vendor’s contact email and phone match the quote you approved. Typos in wedding year or venue name create insurance and day-of chaos. Deposit percents vary by trade. Treat fifty percent catering deposits or photography retainers as that vendor’s working pattern, not a universal rule. Put the actual dollars and dates in the signed PDF so texts cannot rewrite the deal later."
      },
      {
        "heading": "What catering and rental clauses need a closer look?",
        "body": "Confirm final guest count deadline, per-guest price, service style, bar rules, and who provides linens and dinnerware. Overage charges and children’s meals should be explicit. Rental contracts need delivery windows, damage fees, and who strikes equipment. Tie catering service fees to the quote you compared so the invoice cannot invent a new percentage later.\n\nCake cutting fees, champagne toasts, and late-night snack stations are often add-ons. Confirm whether caterer or bakery supplies cake service. Linen color upgrades should match swatches initialed on the rental contract. Cross-check pickup times with venue curfew so fines are not a surprise on the final invoice. For deposit timing detail on catering quotes, see /guides/catering-quote-deposits/ after you finish this checklist."
      },
      {
        "heading": "What should photo, video, and entertainment contracts list?",
        "body": "Hours of coverage, number of shooters, deliverable counts or film length, turnaround time, and copyright or usage rights should be written, not implied. DJ and band contracts need overtime rates, setup power needs, and song request policies. Ask whether assistant travel is included.\n\nBand contracts should list break times and whether emcee duties are included. Cross-check photo and video clauses against /guides/photography-contract-clauses/ and /guides/videography-contract-clauses/ when you need deeper clause language. Keep this page focused on the review checklist so you can finish all vendors in one sitting."
      },
      {
        "heading": "How do insurance, permits, and venue rules fit the checklist?",
        "body": "Many venues require certificates of insurance naming the venue as additional insured. Vendors should list COI deadlines that meet the venue’s calendar. Noise curfews and sparkler bans affect photographers and planners alike. Do not assume vendors know venue rules. Attach the venue rider when required so load-in limits are part of the signed packet.\n\nDestination weddings add travel windows, per diem, and backup dates for weather. Verify each vendor’s travel terms before signing. Currency and tip customs abroad should appear in catering and photography contracts when they apply. Build a travel day into photographer and videographer contracts when flights are required. Local marriage license rules do not replace vendor payment terms. Deposits may still be due in your home currency."
      },
      {
        "heading": "Worked example: checklist marks from review night",
        "body": "After the three-vendor review, the couple marks six boxes on a printed checklist. Date and time match the save-the-date. Deposit amounts and refund windows match each quote. Deliverable counts and deadlines are filled. Overtime rates are stated for DJ and photo hours beyond package. Insurance COI deadlines meet the venue. Rights language names who owns photos and video for personal sharing.\n\nThey export a comparison draft from /tools/event-wedding-vendor-contract/, note two missing overtime lines on the florist PDF, and wait to pay that deposit until the florist adds the rates in writing. That is the point of the night: catch gaps before money moves."
      },
      {
        "heading": "What does a printable review table look like?",
        "body": "Print this review table and mark each box before you sign any vendor PDF. Use the event wedding vendor contract template fields as a second pass when a quote packet is missing a row, overtime rate, or insurance deadline your venue already requires.",
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
              "Delivery date blank"
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
              "Who owns photos, video, music?",
              "No usage defined"
            ]
          ]
        }
      },
      {
        "heading": "How should planners track deposits and timelines?",
        "body": "Load deposit due dates, insurance deadlines, and final head counts into a master calendar shared with the couple. Forty-five days out, reconfirm arrival windows with photographer, caterer, and venue. Compare force majeure language across vendors so postponement fees are not contradictory. Keep a single folder of executed contracts accessible offline on wedding day.\n\nFlorist contracts should list delivery window, setup labor, vase ownership, and who breaks down arches after photos. Planner agreements clarify day-of authority: can they approve overtime with the DJ on your behalf? Catering gratuity lines differ from DJ tips. Read whether a service charge is distributed to staff or retained by the company. Vendor meals during long receptions should appear in catering head counts so your team is fed without surprise per-plate charges.\n\nReady to compare the next PDF? Open /tools/event-wedding-vendor-contract/, run the seven-point checklist, and only then send the deposit."
      }
    ],
    "faq": [
      {
        "question": "Should all vendors use the same contract template?",
        "answer": "No. Each service has different deliverables. Use a master checklist instead of one generic PDF for everyone. The event wedding vendor contract generator helps compare clauses side by side without forcing identical terms."
      },
      {
        "question": "When should deposits be paid?",
        "answer": "Popular vendors book years out. Pay retainer when you accept terms. Stagger deposits so cash flow is manageable. Calendar every due date the day you sign. Treat deposit percents as each vendor’s working pattern, not a universal rule."
      },
      {
        "question": "What if we postpone the wedding?",
        "answer": "Read postponement clauses in each contract. Some allow date moves with a fee. Others treat a move as cancellation. Compare force majeure language so one vendor cannot hold your deposit while another offers a free reschedule."
      },
      {
        "question": "Do we need contracts for friends helping?",
        "answer": "Informal help may skip contracts, but paid professionals should always sign. Insurance and liability still matter. Even a friend DJing for gas money should confirm equipment liability if the venue requires insurance."
      },
      {
        "question": "Can planners sign on our behalf?",
        "answer": "Only if the contract grants agency authority. Couples should sign or explicitly authorize planner signatures. Without authority, a planner cannot bind you to overtime charges you never approved."
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
        "question": "Should we keep vendor quotes with contracts?",
        "answer": "Store the quote PDF beside each signed contract in one folder. When an invoice arrives, compare line totals to the quote before you authorize payment."
      }
    ]
  },
  {
    "slug": "podcast-script-structure",
    "title": "Podcast Script Structure (Episode Outline)",
    "metaDescription": "Outline hooks, segments, questions, CTAs, and outros for podcast episodes. Free podcast script template for consistent shows.",
    "answerFirst": "Structure every episode in about eight blocks: goal, cold open hook, intro, timed segment blocks, guest questions or talking points, transitions, CTA or sponsor read, and outro. Assign minutes to each block so producers catch missing ad reads before record day. Build the outline in the free podcast script template.",
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "podcast-script-template",
      "real-estate-flyer-template"
    ],
    "relatedGuideSlugs": [
      "real-estate-flyer-what-to-include",
      "invoice-vs-estimate"
    ],
    "howTo": [
      "Write one sentence of episode intent and choose solo, co-host, or interview format.",
      "Draft a cold open hook and an intro that names the show, episode, and promise.",
      "Break the episode into timed segment blocks with talking points or questions.",
      "Add CTA, outro, sponsor-read wording, and any required disclaimer language before recording."
    ],
    "sources": [
      {
        "label": "16 CFR Part 255 - Guides Concerning Use of Endorsements and Testimonials",
        "url": "https://www.ecfr.gov/current/title-16/part-255",
        "usedFor": "Endorsement and testimonial disclosure principles when scripts include sponsor reads or endorsements"
      }
    ],
    "sections": [
      {
        "heading": "How should a podcast episode start?",
        "body": "Write one sentence: after listening, the audience will know or feel X. Pick a primary keyword topic for show notes SEO separately from the script, but let intent guide segment choice. Choose format: solo teaching, co-host banter, or interview. A length target in minutes keeps rambling in check.\n\nNote whether the episode is evergreen or tied to a news cycle so you know how much date-specific language to include. Open the podcast script template at /tools/podcast-script-template/ and enter the goal sentence in the first field before you write hooks. That habit keeps every episode tied to a clear promise."
      },
      {
        "heading": "What belongs in the cold open and intro?",
        "body": "Cold open is thirty to ninety seconds of strongest clip or statement before theme music. Intro names show, episode number, host, guest credentials, and episode promise. Sponsor read may sit pre-roll or mid-roll. Mark ad slots in the script so editors find them every time.\n\nCo-host intros should alternate names each episode so both voices feel equal. If the cold open uses a guest quote, write the exact line in the script so you do not paraphrase incorrectly on air. Keep music cue notes next to the intro so levels stay consistent episode to episode."
      },
      {
        "heading": "How do you structure segment blocks and pacing?",
        "body": "Break content into three to five segments with working titles and minute budgets. Solo shows use bullet talking points. Interviews use question blocks with follow-up prompts. Transitions bridge segments with a recap and a teaser for what is next. Silence markers help editors place music stings.\n\nMark optional cuts with brackets so producers can trim without losing the narrative spine. Time-box tangents with a visible clock column in the template. Send guests the outline, not the full script, so they know segment themes without sounding rehearsed. Mark must-ask questions versus nice-to-have follow-ups. Record a short pre-interview note in the script about topics to avoid if the guest requested off-the-record areas."
      },
      {
        "heading": "What belongs in the CTA, outro, and sponsor compliance notes?",
        "body": "Calls to action might be a newsletter signup, product link, or next episode tease. Outro thanks the guest, repeats the show name, and gives social handles. Mark disclaimer text verbatim. When sponsor reads endorse a product, follow 16 CFR Part 255 disclosure principles.\n\nWhen the script includes a sponsor read, endorsement, or testimonial, follow the Federal Trade Commission’s Guides Concerning the Use of Endorsements and Testimonials in Advertising at 16 CFR Part 255. Put clear disclosure language in the AD READ block so hosts do not improvise material connections. Host-read and pre-recorded ads should use different labels so post-production does not splice the wrong take. Editors need exact wording for compliance reviews."
      },
      {
        "heading": "Worked example: twenty-eight minute interview outline",
        "body": "This twenty-eight minute interview outline is a working pattern for a business how-to show, not a rule every podcast must follow. Goal: explain how small contractors use digital estimates. Cold open is a guest quote about losing bids. Intro is thirty seconds. Segment one is problem setup for five minutes with host bullets. Segment two is the guest story for twelve minutes with eight numbered questions and two follow-ups each. Segment three is a tool demo for six minutes with scripted screen-share beats. CTA is download checklist. Outro is fifteen seconds plus music fade.\n\nEnter headings and bullets in the podcast script template at /tools/podcast-script-template/ so producers see the timing column. Sum the minute budgets in the footer and trim the weakest segment if you run long in rehearsal. After recording, mark timestamps in the same script for audiogram clips and show notes."
      },
      {
        "heading": "What does a script section map look like?",
        "body": "Use consistent labels across episodes for faster editing. The lengths below match the twenty-eight minute working outline and can scale up or down for your show. Keep the same block names in the podcast script template so producers find ad slots quickly.",
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
              "0:30-1:30"
            ],
            [
              "Intro",
              "Context and guest bio",
              "1:00-2:00"
            ],
            [
              "Segment A",
              "Setup / thesis",
              "5-8 min"
            ],
            [
              "Segment B",
              "Deep dive / interview",
              "10-15 min"
            ],
            [
              "Segment C",
              "Actionable takeaway",
              "5-7 min"
            ],
            [
              "CTA + outro",
              "Next step and sign-off",
              "1-2 min"
            ]
          ]
        }
      },
      {
        "heading": "How do solo scripts, transcripts, and reuse fit together?",
        "body": "Solo scripts benefit from a hook sentence, three teaching points, and a recap that repeats the call to action. Read the full script once standing up to catch breathless paragraphs. Batch-record solo episodes from one template day by swapping only segment bullets for brand consistency.\n\nScripts make transcript generation faster for accessible show notes. Mark speaker names consistently in interview scripts so automated tools attribute quotes correctly. Sound effect descriptions in brackets help readers when transcripts publish. Spell proper nouns and URLs phonetically in the script margin when guests have unusual names or long product links. That reduces retakes and transcript typos.\n\nSegment bullets become show notes, blog posts, and newsletter blurbs with light editing. Evergreen explainer blocks can become library inserts. Tag reusable blocks with episode IDs so you remember what already published. Ready to outline the next episode? Open /tools/podcast-script-template/, drop in your eight blocks, and mark every sponsor disclosure before you hit record."
      }
    ],
    "faq": [
      {
        "question": "Should I script word-for-word?",
        "answer": "Solo shows often need a full script for clarity. Interviews work better with question outlines so conversation stays natural. Read solo scripts aloud once to catch tongue-twisters before you hit record."
      },
      {
        "question": "How do I mark ad reads?",
        "answer": "Use a clear AD READ header with sponsor name, offer, URL, and code. Editors need exact wording for compliance. Align host-read disclosures with 16 CFR Part 255 when the read is an endorsement or testimonial."
      },
      {
        "question": "Do I include music cues?",
        "answer": "Yes. Note intro bed, transition stings, and outro fade so levels stay consistent episode to episode. Mark whether music ducks under voice or hard-cuts for the editor."
      },
      {
        "question": "How long should episodes be?",
        "answer": "Match audience habit. Business how-to often lands twenty to thirty-five minutes. News may be shorter. Script to a target length. The twenty-eight minute interview above is a working outline, not a rule."
      },
      {
        "question": "Can I reuse segments?",
        "answer": "Evergreen explainer blocks can become library inserts. Mark them in the script template for batch recording days. Tag reusable blocks with episode IDs so you remember what already published."
      },
      {
        "question": "Do I need a script for short news episodes?",
        "answer": "Even five-minute updates benefit from bullet scripts for dates, names, and sponsor URLs read correctly on first take. Lead with the newest fact in the cold open so listeners get value in the first thirty seconds."
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
    "metaDescription": "Property flyer essentials: hero photo, price, specs, agent branding, and compliance lines. Free real estate flyer template for print and PDF.",
    "answerFirst": "Put eight must-include items on a real estate flyer: strong photo cue, address or area, price, beds baths and square footage, three to five highlights, open-house time if any, agent contact, and the equal housing notice your brokerage requires. This is marketing, not an MLS sheet. Build the layout in the free real estate flyer template.",
    "publishedAt": "2026-10-22",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "real-estate-flyer-template",
      "podcast-script-template"
    ],
    "relatedGuideSlugs": [
      "podcast-script-structure",
      "what-to-include-on-a-receipt"
    ],
    "legalNote": "This article is not legal advice. Marketing and fair housing rules vary by federal, state, local, MLS, and brokerage policy. Confirm copy and disclosures with your broker and counsel before you print.",
    "howTo": [
      "Choose a strong hero photo and a headline that states a clear property benefit.",
      "Add MLS-accurate price, beds, baths, square footage, and three to five feature bullets.",
      "Place open-house details if any, plus agent contact and brokerage branding.",
      "Add required equal housing and license lines, then export PDF from the real estate flyer template."
    ],
    "sources": [
      {
        "label": "HUD — Fair Housing",
        "url": "https://www.hud.gov/fairhousing",
        "usedFor": "Starting point for fair housing resources (confirm current rules with counsel; no new claims in this guide)"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "General reminder to follow applicable business and licensing rules"
      }
    ],
    "sections": [
      {
        "heading": "What should sit above the fold on a property flyer?",
        "body": "Use the best horizontal exterior or living room image with even lighting. Headline states a benefit such as walkable to schools, renovated kitchen, or income potential. Price should be prominent unless your brokerage policy uses call for offers. Avoid cluttering the hero with every logo. Agent branding can sit in a footer band.\n\nFor condos, lead with the view or amenity deck when the exterior is generic. Investment flyers may headline tenant status when your market expects it on print pieces. Open the real estate flyer template at /tools/real-estate-flyer-template/ so photo, headline, and price fields stay in a print-ready layout before you write body copy."
      },
      {
        "heading": "Which property facts should buyers scan first?",
        "body": "Beds, baths, square footage, lot size, year built, garage, and key upgrades belong in a scannable row. MLS number helps buyers reference online listings. Be accurate. Misstated square footage creates liability. Source facts from MLS or appraisal docs. Round square footage only the way your MLS displays it so flyers match portal search filters.\n\nWhen material to buyers, include monthly HOA or special assessments if accurate. Verify figures with HOA docs or seller disclosure. Do not invent amenities from memory. List community features from the actual HOA or developer sheet so pool hours and fee structures stay correct between phases."
      },
      {
        "heading": "How should body copy and bullets read?",
        "body": "Three to five bullets beat long paragraphs on a flyer. Focus on lifestyle and differentiation such as new roof 2024, primary suite on main, or fenced yard. Describe property features, not ideal buyer demographics. Start with HUD’s fair housing page, then confirm rules with your broker and counsel.\n\nWhen mentioning schools, cite factual district boundaries rather than subjective claims about who belongs in the area. Update applications of flyer language when local marketing guidance changes rather than relying on outdated PDFs downloaded years ago."
      },
      {
        "heading": "What open house, contact, and compliance lines belong on the page?",
        "body": "Open house date, time, and address if different from the listing should be easy to find. Agent photo, phone, email, team name, and brokerage logo belong in a footer band with equal housing opportunity and state license lines as your board requires. Follow your brokerage brand guidelines for logo placement and color before creative layouts.\n\nIf you add a link or code that points to a tour or MLS page, test it before print and update it immediately after price changes. Do not invent universal QR or font rules here. Ask your print vendor and brokerage marketing team for bleed, safe zone, and type guidance that match your brand kit. Hand flyers to visitors at sign-in so you capture who attended even when they do not leave an email on the portal."
      },
      {
        "heading": "Can I use listing photos from the MLS?",
        "body": "Follow your listing agreement and MLS rules for photo use and marketing. Usually you may market your own listing per board rules. Do not pull another agent’s photos for a comparative flyer without permission. Copyright and broker policies decide whether a photo can appear on print, email, or door hangers.\n\nHigh-end listings sometimes omit street address on public flyers, showing area name only until qualified buyers register. Match privacy strategy to MLS display rules. Gate community listings may forbid flyers on public boards at the entrance. Confirm with HOA rules before printing stacks. Luxury flyers may emphasize architect, designer, and smart-home specs with fewer price-per-square-foot comparisons."
      },
      {
        "heading": "Worked example: suburban listing flyer",
        "body": "Hero photo of the front elevation. Headline: Bright four-bed family home on quiet cul-de-sac. Price four hundred ninety-five thousand dollars. Facts: four bed, two and a half bath, two thousand four hundred ten square feet, two-car garage, lot zero point three acres. Bullets: new HVAC 2025, finished basement office, patio and fenced yard, schools named by district boundary per the district site.\n\nOpen house Sunday one to four. Link or code to the tour. Agent cell and brokerage disclaimer footer. Layout from the real estate flyer template at /tools/real-estate-flyer-template/ exported as PDF for print and email. After a price change, reprint the PDF and update the online link the same day so yard handouts and email attachments stay in sync."
      },
      {
        "heading": "What does a flyer content checklist look like?",
        "body": "Review each element before sending to print. Use every row as a pre-print pass inside the real estate flyer template so photo, price, specs, bullets, open house details, and required compliance lines are complete before the PDF leaves your desk.",
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
              "Landscape, well lit; follow listing agreement and MLS rules",
              "Dark phone snapshot or unauthorized photo"
            ],
            [
              "Price",
              "Clear or brokerage call-for-offers policy",
              "Stale old price"
            ],
            [
              "Specs",
              "MLS-accurate",
              "Wrong bed count"
            ],
            [
              "Bullets",
              "Feature-based property language",
              "Buyer-demographic wording"
            ],
            [
              "Event",
              "Open house date, time, place",
              "Missing directions"
            ],
            [
              "Compliance",
              "Equal housing and license lines your board requires",
              "Footer omitted"
            ]
          ]
        }
      },
      {
        "heading": "How should you distribute and refresh flyers?",
        "body": "Print flyers for sign riders and open houses. Export a lighter PDF for email so mobile inboxes load quickly. Neighborhood shops may allow flyer stacks when listings are nearby. Update any listing link after price changes and reprint when status or photos change.\n\nNew construction flyers may show base price plus upgrade disclaimers. Include builder name, warranty summary line, and estimated completion when marketing pre-delivery units. Model home flyers should note that photos show optional finishes so buyers are not surprised at the design center. Reprint after price changes, status changes, or new photos from staging. Outdated open house dates on a sign rider waste buyer time.\n\nReady to build the next handout? Open /tools/real-estate-flyer-template/, fill the eight must-include items, and confirm MLS facts before you hit print."
      }
    ],
    "faq": [
      {
        "question": "Do flyers still matter with online listings?",
        "answer": "Yes for open houses, door hangers, and email attachments. Flyers summarize what buyers remember offline. A tested link bridges print to the live listing when inventory changes fast."
      },
      {
        "question": "Should I show sold comparables?",
        "answer": "Only if accurate and allowed by your MLS rules. Some agents use a market snapshot on a back panel. Update comps when a nearby sale closes or your flyer looks stale at showings."
      },
      {
        "question": "Can I use listing photos from MLS?",
        "answer": "Follow your listing agreement and MLS rules. Usually you may market your own listing per board rules. Do not pull another agent’s photos for a comparative flyer without permission."
      },
      {
        "question": "Digital vs print layout?",
        "answer": "Export PDF from the template for both. Ask your print shop for bleed and color profile. Ask brokerage marketing for brand type guidance rather than inventing font rules."
      },
      {
        "question": "Should flyers mention HOA fees?",
        "answer": "When material to buyers, include monthly HOA or special assessments if accurate. Verify figures with HOA docs or seller disclosure. Keep language focused on the property and documented fees."
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
  },
  {
    "slug": "how-to-write-a-business-estimate",
    "title": "How to Write a Business Estimate",
    "metaDescription": "Write a clear business estimate for services: scope, line items, tax, deposit, and validity. Landscaping and consulting examples plus a free quote tool.",
    "answerFirst": "A business estimate names the client, describes measurable scope, prices labor and materials on clear lines, shows tax and any deposit, and ends with a validity date. Clients compare service quotes on clarity first. Use the same structure later when you invoice accepted work.",
    "publishedAt": "2026-11-13",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "quote-estimate-generator",
      "contractor-invoice",
      "receipt-generator"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "line-item-totals-explained",
      "construction-estimate-that-wins-jobs"
    ],
    "howTo": [
      "Label the PDF as an estimate or quote and list client, date, and a short scope narrative.",
      "Add line items with quantity, unit, and rate so the client can compare bids.",
      "Show tax, deposit terms as your working pattern, and a calendar validity date.",
      "List exclusions and assumptions, then send a PDF and keep a copy with the job file.",
      "When accepted, convert matching lines into an invoice and issue a receipt when paid."
    ],
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping estimates and related records that support income and expenses"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Small-business habits around clear written terms and records"
      },
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Offer and acceptance basics when an estimate may become binding"
      }
    ],
    "sections": [
      {
        "heading": "How do you write a business estimate for services?",
        "body": "Start with a dated header that labels the document as an estimate or quote, then list the client, service address if any, and a scope another vendor could price. Add line items with quantity, unit, and rate, then tax, deposit, validity date, and exclusions. That package is what landscaping, consulting, cleaning, and design clients compare when they choose a vendor.\n\nThis guide covers general business services, not construction bids. For trade-specific construction pricing, see the construction estimate guide. Draft the PDF in the free quote estimate generator at /tools/quote-estimate-generator/ so numbers match the narrative you walk through on a call or site visit. After acceptance, reuse the same lines on a contractor invoice for deposits and progress billing, then send a receipt when payment clears."
      },
      {
        "heading": "What is the difference between a quote and an estimate?",
        "body": "Many small businesses use quote and estimate for the same pre-work pricing PDF. Some treat a quote as firmer when the offer is a fixed package, and an estimate as more open when hours or materials may shift. Label the document clearly and state whether prices can change after acceptance when scope changes.\n\nCornell Law School’s Legal Information Institute explains that a contract is a promise the law will enforce, typically through offer, acceptance, and consideration. Your estimate or quote is often the written offer. Acceptance may arrive as a signature, a deposit with clear terms, or another written yes that references the document. Until acceptance is clear, treat the PDF as an offer that can expire on the validity date you printed. Keep the title Estimate or Quote until you bill; then use Invoice so accounts payable knows the document type. For a deeper compare of when to send each document, see /guides/invoice-vs-estimate/."
      },
      {
        "heading": "What scope and line items belong on a service estimate?",
        "body": "Describe what you will deliver, exclude, and need from the client before you type rates on the estimate. Name visits, deliverables, materials, travel, and who buys supplies so another vendor could price the same work and the client can compare bids fairly on clear lines.\n\nClients who see that level of care trust the total more than a one-line lump sum. Photograph or note site conditions for outdoor work. For consulting, list meeting hours, report length, and revision rounds. Separate labor and materials when tax treatment or client comparison benefits from the split. Call out owner-supplied items and warranty length in plain language. A short assumptions block covering access, parking, weather windows, and client response times prevents disputes after kickoff.\n\nWhen you buy from suppliers, keep their quotes in your internal file even if the client-facing PDF collapses them into one materials line. The IRS expects small businesses to keep records that support income and expenses, so supplier quotes and the estimate PDF belong in the same job file. For how quantity times rate rolls into tax and deposits, see /guides/line-item-totals-explained/."
      },
      {
        "heading": "How long is a business estimate valid?",
        "body": "An estimate is good until the validity date you print on it, or until you withdraw the offer in writing, whichever comes first. Put a calendar expiration on every estimate so clients know when the price stops holding as labor availability and material costs change.\n\nAn open-ended number invites disputes. When scope changes before acceptance, issue a revised estimate with a new version label rather than editing the old PDF silently. After acceptance, use change orders or a new invoice line with client approval instead of pretending the original estimate still covers new work. Follow up once before the validity date if you still want the job. The SBA points businesses toward staying legally compliant as they run day to day; clear written pricing and retained records support that habit without replacing licenses or insurance your state requires."
      },
      {
        "heading": "How should deposits and tax appear on the estimate?",
        "body": "State deposit terms as your working pattern, not a fixed industry rule, and show how sales tax applies to taxable lines under your state and local rules. Put the deposit amount or percent, due date, and what the deposit buys on the estimate so it matches the language you use when you collect payment.\n\nOne schedule we use in the landscaping example below is a thirty percent deposit to reserve the calendar and order plants. That percent is a pattern for that sample job, not an official rate from the IRS or SBA. Many service businesses collect a deposit to hold a start date; commercial clients may prefer smaller deposits with progress billing. Follow your accountant on which lines are taxable. Show one tax rate on a taxable subtotal and label exempt items when needed. When the deposit clears, issue a receipt so the estimate stays an offer and the receipt proves payment."
      },
      {
        "heading": "Worked example: spring landscaping estimate",
        "body": "A homeowner wants a front-yard refresh. Scope: remove tired shrubs along the walk, amend soil in two beds, plant eight shrubs and twenty perennials from your nursery list, install black mulch, and haul debris. You price demolition and haul-off as one lump sum, labor by hours, and plants from supplier quotes.\n\nSample lines: Bed prep and haul-off lump sum four hundred fifty dollars. Labor twelve hours at sixty-five dollars. Plant package lump sum nine hundred eighty dollars. Mulch six cubic yards at forty-five dollars. Subtotal two thousand four hundred eighty dollars plus tax at the local rate on taxable items. One schedule we use in this example is a thirty percent deposit due at acceptance to reserve the install week and order plants. Validity ends on a stated calendar date. Unknown irrigation repairs may add a change order. Enter the same structure in the quote estimate generator so the PDF matches your site walkthrough. After acceptance, bill the deposit on a contractor invoice that references the estimate number, then send a receipt when paid."
      },
      {
        "heading": "What belongs on the estimate checklist before you send?",
        "body": "Use this table as a quality check before you email any business estimate or quote PDF. Missing rows, especially scope, validity, and deposit, are where disputes start. Run the checklist the day before the walkthrough so you do not promise seasonal plantings when only bed cleanup was discussed.",
        "table": {
          "caption": "Business estimate sections to include",
          "headers": [
            "Section",
            "What to state",
            "Why it matters"
          ],
          "rows": [
            [
              "Header",
              "Estimate or quote label, date, client, service address",
              "Sets document type and audit trail"
            ],
            [
              "Scope",
              "Deliverables, visits, exclusions, who buys materials",
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
              "Working-pattern percent or amount, due date, what it buys",
              "Protects cash flow and calendar space"
            ],
            [
              "Validity",
              "Expiration date and price-change note",
              "Protects you when costs or availability move"
            ]
          ]
        }
      },
      {
        "heading": "How should you present and follow up on a service quote?",
        "body": "Send a PDF with your business name, contact details, payment methods, and a title of Estimate or Quote rather than Invoice. Follow up once before the validity date with a short note offering to walk through line items on a call.\n\nWhen you win the job, convert agreed lines into billing without retyping math. Clients who understood the estimate rarely dispute invoices that mirror the same structure. Keep the accepted PDF with your job records so you can answer tax or payment questions later. If the work is construction-heavy remodel pricing instead of general services, use the construction estimate guide and template rather than this service-focused flow."
      }
    ],
    "faq": [
      {
        "question": "Should a business estimate include sales tax?",
        "answer": "Follow your state and local rules. Many service businesses show one tax rate on a taxable subtotal and label exempt items. If you are unsure, ask your accountant how to split taxable and non-taxable lines before you send the PDF."
      },
      {
        "question": "What deposit is normal on a service job?",
        "answer": "Deposit size is a working pattern, not a fixed rule. Many service businesses collect a deposit to reserve the calendar or buy materials. Put the percent or amount and due date on the estimate so it matches how you invoice."
      },
      {
        "question": "Is a quote the same as an estimate?",
        "answer": "In everyday use, many businesses treat them the same. Some use quote for firmer fixed packages. Pick one word per trade, stay consistent, and state whether prices can change with scope."
      },
      {
        "question": "When does an estimate become a contract?",
        "answer": "When both parties clearly accept the offer under terms that create a binding agreement, such as a signed writing or a deposit with clear terms that reference the estimate. Until then, treat the estimate as an offer that can expire. Ask counsel if you need advice for your state."
      },
      {
        "question": "Can I reuse estimate lines on the invoice?",
        "answer": "Yes. Matching labels between the accepted estimate and later invoices reduce disputes. Reference the estimate number on each invoice and show deposits already paid so the balance due is obvious."
      },
      {
        "question": "How is this different from a construction estimate?",
        "answer": "This guide focuses on general business services such as landscaping, consulting, and similar jobs. Construction estimates often need rooms, allowances, and change-order language for building trades. Use the construction estimate guide when that is your niche."
      }
    ]
  },
  {
    "slug": "catering-quotation-example",
    "title": "Catering Quotation Example With Line Items",
    "metaDescription": "Sample catering quotation with guest count, per-guest food, service charge, tax, and deposit. Recreate it in the free catering quote tool.",
    "answerFirst": "A clear catering quotation lists event basics, menu, per-guest food, staff or service charges, tax, guest-count rules, and deposit terms labeled as a working pattern. The sample below uses eighty guests and a deposit schedule for that job only. Build the same PDF in the catering quote tool.",
    "publishedAt": "2026-11-13",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "catering-quote",
      "quote-estimate-generator",
      "event-wedding-vendor-contract"
    ],
    "relatedGuideSlugs": [
      "catering-quote-deposits",
      "wedding-vendor-contract-checklist",
      "invoice-vs-estimate",
      "line-item-totals-explained"
    ],
    "howTo": [
      "Anchor event date, venue, service style, and guest guarantee on the quotation header.",
      "Price food as per-guest lines and add coffee, rentals, or staff as separate lines.",
      "Show service charge and tax on the correct subtotals with short plain-language labels.",
      "State deposit and balance timing as your working pattern, not as an official industry rule.",
      "Export the PDF from the catering quote tool and keep it with the event file."
    ],
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping catering quotes, invoices, and payment records that support income"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Written terms and recordkeeping habits for small food businesses"
      }
    ],
    "sections": [
      {
        "heading": "What does a complete catering quotation include?",
        "body": "A complete catering quotation names the event, date, service window, venue, guest guarantee, menu, per-guest or package pricing, staff or delivery charges, service fee versus gratuity, tax, overage rules, and deposit terms. Clients compare caterers on that package, not on a single per-guest number alone.\n\nThis page is a sample quotation you can copy into the catering quote generator at /tools/catering-quote/. For deeper deposit timing and guest-count rules, see /guides/catering-quote-deposits/. Pair accepted quotes with a vendor agreement when the event needs cancellation and insurance language, using /tools/event-wedding-vendor-contract/ as a starting draft."
      },
      {
        "heading": "How should guest count and per-guest food appear?",
        "body": "Price food against a guaranteed minimum guest count and state when the final count is due so the kitchen can buy correctly. Show the per-guest food rate as its own line so clients can multiply guests times rate and match your extended amount.\n\nMany caterers lock final counts about a week before the event as a working pattern tied to prep timelines, not as a universal rule. Write the overage rule plainly: same per-guest rate, or a premium for last-minute meals. Split counts when the event mixes seated dinner guests with cocktail-only arrivals. Add a line for vendor meals when photographers or planners eat from your kitchen. Keep the signed quotation and final-count email with the event file. The IRS expects small businesses to keep records that support income and expenses, and guest-count changes often explain why the invoice differs from the first quotation."
      },
      {
        "heading": "How do service charges, tax, and deposits show on the sample?",
        "body": "Label administrative or service fees separately from voluntary gratuity, apply tax to the taxable subtotal under local rules, and state deposit terms as a working pattern for that job. Clients should see service charge, tax, and deposit on separate lines with short definitions in plain English.\n\nService fees often cover staffing overhead or coordinator time. Gratuity goes to service staff when allowed by law and venue policy. Tax treatment of each line varies by state, so ask your accountant which subtotals are taxable. Deposit size is not an official industry percentage. One schedule we use in the sample below is a fifty percent deposit at contract signing, with the balance due after the final count locks. That schedule is a pattern for the example, not a rule from the IRS or SBA. See /guides/catering-quote-deposits/ for more deposit language patterns."
      },
      {
        "heading": "Worked example: corporate lunch quotation",
        "body": "Here is a sample corporate lunch quotation you can recreate line by line in the catering quote tool. It uses eighty guaranteed guests, per-guest buffet food, coffee, setup labor, a service charge on food, local tax notes, and a deposit schedule labeled as a working pattern for this job only.\n\nSample lines: Food eighty guests times twenty-eight dollars equals two thousand two hundred forty dollars. Coffee station flat fee one hundred fifty dollars. Delivery and setup two hours for two staff at forty-five dollars per hour equals one hundred eighty dollars. Food and coffee subtotal two thousand three hundred ninety dollars. Service charge ten percent on food subtotal equals two hundred twenty-four dollars. Labor one hundred eighty dollars. Taxable items taxed at the local rate you confirm with your accountant. One schedule we use in this example is a fifty percent deposit at signing to hold the date, balance due five days before the event after the final count. Overages bill at the quoted per-guest food rate. Enter the same lines in /tools/catering-quote/ so the PDF matches the walkthrough."
      },
      {
        "heading": "How do the sample line items add up?",
        "body": "Walk the client through quantity times rate before you talk about any deposit percent on the catering quotation. When food, coffee, labor, and service charge sit on separate lines, accounts payable can approve faster and change orders stay honest if the guest count rises later.",
        "table": {
          "caption": "Sample catering quotation line items (eighty guests)",
          "headers": [
            "Line",
            "Qty / unit",
            "Amount (example)"
          ],
          "rows": [
            [
              "Buffet food",
              "80 guests × $28",
              "$2,240"
            ],
            [
              "Coffee station",
              "1 lump sum",
              "$150"
            ],
            [
              "Delivery and setup labor",
              "4 staff-hours × $45",
              "$180"
            ],
            [
              "Service charge (on food)",
              "10% of $2,240",
              "$224"
            ],
            [
              "Tax",
              "Local rate on taxable lines",
              "Per your jurisdiction"
            ],
            [
              "Deposit (working pattern)",
              "50% at signing for this sample",
              "Half of agreed total"
            ]
          ]
        }
      },
      {
        "heading": "How should you convert the quotation into billing?",
        "body": "When the client accepts, keep the quotation titled Quote or Quotation and send invoices that reference the quote number, guest guarantee, and payments already received. Matching labels reduce disputes when the final count changes the food total on later billing documents.\n\nBill the deposit first, then a balance invoice after the final count. Issue a receipt when each payment clears. If you also send general service estimates for non-catering work, use /tools/quote-estimate-generator/ for those jobs and keep catering PDFs in the catering tool so menus and guest fields stay filled. Store every PDF with purchase orders and final-count emails. The SBA’s compliance guidance for small businesses points to staying organized with required records; your quotation file is part of that habit."
      },
      {
        "heading": "What should wedding and corporate clients see differently?",
        "body": "Wedding quotations often need a photo-line schedule, vendor meal counts, and late-night snack windows written next to food pricing. Corporate quotations often need badge timing, dietary labels on buffet cards, and a single accounts payable contact for deposit invoices and balance bills.\n\nBoth still need the same math spine: guests, per-guest food, service charge, tax, and deposit. Attach venue rules on load-in and insurance certificates when the site requires them. Use the wedding vendor contract checklist when multiple vendors share a date, and keep the catering quotation focused on food and service pricing so the client is not reading two documents at once."
      },
      {
        "heading": "What mistakes break a catering quotation?",
        "body": "Burying service fee inside the per-guest rate, skipping the final-count deadline, and presenting a deposit percent as if it were a law are the fastest ways to lose trust. Separate fee lines, write the count rule, and label deposit timing as your working pattern for that event.\n\nOther gaps include forgetting vendor meals, omitting tax notes, and emailing a spreadsheet screenshot instead of a numbered PDF. Number quotations so revisions are obvious. When the menu changes after tasting, issue a revised quotation rather than editing history silently. Recreate clean versions in the catering quote tool so line math stays consistent from first send to final invoice."
      }
    ],
    "faq": [
      {
        "question": "Is a catering quotation the same as a catering quote?",
        "answer": "Yes in everyday catering language. Quotation and quote usually mean the same pricing PDF. Use one word on your templates and keep it consistent with your invoices."
      },
      {
        "question": "What deposit percent should I put on the sample?",
        "answer": "There is no official deposit percent. Use a working pattern that fits your kitchen and cash flow. The fifty percent deposit in the example is for that sample job only, not an industry rule."
      },
      {
        "question": "Should service charge and gratuity be separate lines?",
        "answer": "Yes when both apply. Label service charge and gratuity so clients see what is administrative and what may go to staff, and confirm tax treatment with your accountant."
      },
      {
        "question": "When is the final guest count due?",
        "answer": "Many caterers use about seven days before the event as a working pattern based on purchasing lead time. Put your own deadline on the quotation and stick to it."
      },
      {
        "question": "How do I recreate this example in the tool?",
        "answer": "Open /tools/catering-quote/, enter the event header, eighty guests, per-guest food, coffee, labor, service charge, tax rate, and deposit notes, then export the PDF."
      },
      {
        "question": "Where do I learn more about deposits?",
        "answer": "Read /guides/catering-quote-deposits/ for deposit timing, tastings, and balance invoices. This page focuses on a full sample quotation layout with line items."
      }
    ]
  },
  {
    "slug": "freelance-web-design-contract-clauses",
    "title": "Freelance Web Design Contract Clauses",
    "metaDescription": "Scope, IP ownership, revision rounds, and handover clauses for freelance web design contracts. Free template. Not legal advice.",
    "answerFirst": "A useful freelance web design contract spells out scope, intellectual property and license terms, revision rounds, and handover deliverables before kickoff. Payment timing belongs in a separate schedule. Draft clauses in the free web design contract tool, then have counsel review.",
    "publishedAt": "2026-11-13",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "freelance-web-design-contract",
      "simple-nda"
    ],
    "relatedGuideSlugs": [
      "freelance-payment-schedule-milestones",
      "nda-basics-for-freelancers"
    ],
    "legalNote": "This article is not legal advice. Contract, copyright, and intellectual property rules vary by jurisdiction and project type. Use our template as a starting point and have a licensed attorney review your final agreement.",
    "howTo": [
      "Name parties, project pages or features, and out-of-scope items in writing.",
      "State who owns copyright or what license the client receives after final payment.",
      "Set a revision-round count and what counts as a round versus a change order.",
      "List handover files, access credentials, and support window after launch.",
      "Pair a simple NDA when you will share unreleased product or customer data."
    ],
    "sources": [
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Basic definition of a contract as offer, acceptance, and consideration"
      },
      {
        "label": "U.S. Copyright Office — Photographers",
        "url": "https://www.copyright.gov/engage/photographers/",
        "usedFor": "Creator copyright ownership and licensing basics that parallel design and visual work"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "High-level reminder to keep written agreements and required business records"
      }
    ],
    "sections": [
      {
        "heading": "Which clauses belong in a freelance web design contract?",
        "body": "Cover parties, scope, revision rounds, intellectual property and license terms, handover deliverables, payment references, and cancellation or pause rules in plain headings. Cornell Law School’s Legal Information Institute describes a contract as a promise the law will enforce, usually built on offer, acceptance, and consideration.\n\nThis guide focuses on clause language for scope, IP, revisions, and handover. Payment deposit and milestone timing live in /guides/freelance-payment-schedule-milestones/. Draft fields in /tools/freelance-web-design-contract/, then walk the client through the PDF before kickoff. A verbal yes is not enough when calendars fill and deposits move."
      },
      {
        "heading": "How should scope be written for a web project?",
        "body": "List countable pages or features, device targets, content sources, third-party tools included, and clear exclusions such as copywriting, photography, or ongoing SEO. Scope that another freelancer could price reduces change-order fights later and keeps the signed PDF honest when new requests arrive mid-build.\n\nName the CMS or stack only if you are committing to it. If the client supplies brand assets late, say how that shifts the timeline. Note meeting cadence and who on the client side may approve designs. Out-of-scope items belong in a short exclusions list, not buried in footnotes. When the client later asks for a membership portal that was never listed, point to the scope section and open a written change order instead of absorbing unpaid hours."
      },
      {
        "heading": "Who owns the website intellectual property?",
        "body": "Say in writing whether copyright in custom design and code transfers to the client after final payment, or whether you keep copyright and grant a license for stated uses. Silent contracts create the fights when portfolio rights and commercial reuse were never named on the PDF.\n\nWeb design is not photography, but the same ownership-versus-license conversation applies to original graphics, custom code, and layout. If you reuse a private component library across clients, reserve those tools and license only the project-specific work. If the client needs full copyright assignment, price that transfer and say when it happens, often after final payment clears. Stock photos, fonts, and plugins keep their own licenses; list who pays renewals. Portfolio display rights for your reel should appear next to IP language so marketing use is not left to email memory."
      },
      {
        "heading": "How many revision rounds should the contract allow?",
        "body": "State a number of revision rounds per major phase and define what a round includes, such as one consolidated feedback email, not endless one-line chats. Extra rounds or new pages become change orders with a stated hourly or fixed fee.\n\nDesign approval and development polish often need separate round counts. Rush feedback windows protect your launch date when the client goes quiet. If stakeholders disagree internally, name a single approver so you are not stuck between two directors. Put the round count in the same section as timeline so clients see that unlimited tweaks delay launch. When feedback arrives after approval, treat it as a new change order rather than a free revision."
      },
      {
        "heading": "What belongs in the handover and launch clause?",
        "body": "List the files, credentials, and environments you will deliver, plus how long you keep staging backups and whether a short bug-fix window is included after launch. Handover turns a finished build into a client-owned operating site with a clear definition of done.\n\nTypical handover items include production access, DNS notes, theme or repo access you promised, exported design files if sold, and a punch-list process for launch bugs. Say whether content entry is included. State that passwords should be changed by the client after transfer. If you offer a thirty-day bug-fix window as a working pattern for that job, define what counts as a bug versus a new feature. Ongoing care plans belong in a separate retainer, not hidden inside the build contract."
      },
      {
        "heading": "Worked example: five-page marketing site clauses",
        "body": "Here is a compact clause set for a five-page marketing site you can paste into the freelance web design contract tool. It names scope, intellectual property after final payment, revision rounds, handover access, and a pointer to the payment schedule without turning this page into a milestones guide.\n\nIP: copyright in custom page design and theme customizations transfers to the client after final payment; freelancer keeps pre-existing component library and may show the site in a portfolio. Revisions: two rounds on design mockups and two rounds on staging content placement; additional rounds billed at the hourly rate in the change-order section. Handover: production admin access, DNS cutover checklist, and a fourteen-day bug-fix window for defects that break listed scope. Payment schedule lives in a table that points to the milestones guide. Confidential product roadmap shared in discovery sits under a simple NDA at /tools/simple-nda/. Map these bullets into /tools/freelance-web-design-contract/ before the kickoff invoice."
      },
      {
        "heading": "What clause checklist should you run before sending?",
        "body": "Match each row to a heading in your freelance web design contract so nothing important is buried before the client signs. Use the table as a pre-send checklist the same day you email the booking packet from your template fields.",
        "table": {
          "caption": "Web design contract clause checklist",
          "headers": [
            "Clause",
            "What to state",
            "Client question it answers"
          ],
          "rows": [
            [
              "Scope",
              "Pages, features, exclusions, tech if promised",
              "What am I buying?"
            ],
            [
              "IP / license",
              "Owner after payment and portfolio rights",
              "Who owns the design and code?"
            ],
            [
              "Revisions",
              "Round count and change-order path",
              "How many tweaks are included?"
            ],
            [
              "Handover",
              "Files, access, bug-fix window",
              "What do I get at launch?"
            ],
            [
              "Payment reference",
              "Pointer to deposit and milestone schedule",
              "When do I pay?"
            ],
            [
              "Confidentiality",
              "NDA when secrets are shared",
              "How is our roadmap protected?"
            ]
          ]
        }
      },
      {
        "heading": "How do NDAs relate to the services contract?",
        "body": "Keep confidentiality in a short NDA when you will receive unreleased product plans or customer lists, and keep build terms in the services contract so each document stays readable. Mixing both into one dense PDF often hides the IP and revision rules clients most need to see.\n\nRead /guides/nda-basics-for-freelancers/ before you sign a client paper. The SBA’s guidance on staying legally compliant reminds small businesses to keep required records and written terms organized; signed contracts and NDAs belong in the project file next to invoices. This page does not claim any clause set is enforceable as written. Ask counsel for your state and project type."
      }
    ],
    "faq": [
      {
        "question": "Is this the same as a payment schedule guide?",
        "answer": "No. This page covers scope, IP, revisions, and handover clauses. Deposit and milestone timing are covered in /guides/freelance-payment-schedule-milestones/."
      },
      {
        "question": "Who usually owns website copyright?",
        "answer": "Many freelancers keep copyright and grant a license, or transfer custom work after final payment when the contract says so. Put the rule in writing. This is not legal advice."
      },
      {
        "question": "How many revision rounds are enough?",
        "answer": "Enough that you can finish the listed scope without unlimited tweaks. Two rounds per major phase is a common working pattern for small marketing sites, not a required rule."
      },
      {
        "question": "What should handover include?",
        "answer": "Access credentials you promised, DNS or launch notes, any design files sold, and a defined bug-fix window. Say what is excluded, such as new features after launch."
      },
      {
        "question": "Do I need an NDA and a web contract?",
        "answer": "Use both when secrets will be shared. The NDA covers confidential information; the web contract covers scope, IP, revisions, and handover. Start drafts at /tools/simple-nda/ and /tools/freelance-web-design-contract/."
      },
      {
        "question": "When does the contract become binding?",
        "answer": "When offer and acceptance are clear under applicable law, often shown by signatures and consideration such as a deposit. Ask a licensed attorney for advice on your facts."
      }
    ]
  },
  {
    "slug": "how-to-create-a-work-order",
    "title": "How to Create a Work Order",
    "metaDescription": "Write a service work order with job address, scope, materials, and signature. Gutter example plus free work order template.",
    "answerFirst": "A work order authorizes and tracks a job: customer, job address, problem statement, task list, assigned crew, materials, and customer signature when required. It is not an invoice and not a stop-work order. Build yours in the free work order tool, then bill completed lines later.",
    "publishedAt": "2026-11-13",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "work-order",
      "quote-estimate-generator",
      "contractor-invoice"
    ],
    "relatedGuideSlugs": [
      "work-order-vs-invoice-vs-estimate",
      "invoice-vs-estimate",
      "line-item-totals-explained"
    ],
    "howTo": [
      "Create a unique work order number and date, and list the customer and job address.",
      "Write the problem or request and a numbered task list the crew can follow.",
      "Add parts and labor lines, assigned tech, and schedule window.",
      "Collect customer authorization when required and note the related estimate number.",
      "After completion, convert finished lines into an invoice and keep the signed PDF."
    ],
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping job tickets and related records that support income and expenses"
      },
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Reminder that whether paperwork binds parties depends on wording and acceptance"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Small-business habits around written job records and compliance"
      }
    ],
    "sections": [
      {
        "heading": "How do you write a service work order?",
        "body": "Write a work order by numbering the job, naming the customer and site address, stating the problem, listing tasks, assigning a tech, noting parts, and capturing authorization when the customer must approve the work. Crews use that ticket on site; billing uses it later to build an invoice.\n\nThis page is about creating a job work order for service and repair work, not a stop-work order used on construction sites to halt unsafe work. Open /tools/work-order/ to draft the PDF. For how work orders sit beside estimates and invoices, see /guides/work-order-vs-invoice-vs-estimate/."
      },
      {
        "heading": "What job address and scope details belong on the form?",
        "body": "Put the full job site address, on-site contact phone, access notes, and a problem statement specific enough that a second tech could start without calling the office. Vague scopes cause callbacks and unpaid overtime when the crew arrives without enough detail to finish.\n\nInclude unit numbers, gate codes, and parking notes when they matter. Priority and scheduled date help dispatch. Reference the accepted estimate number so the crew installs what was sold. If the customer adds work on site, write a change on the ticket or open a new work order rather than relying on memory. Photograph existing conditions before you start when damage disputes are likely. The IRS expects small businesses to keep records that support income and expenses; signed work orders and photos belong with the estimate and invoice in the job file."
      },
      {
        "heading": "How should materials, labor, and signatures appear?",
        "body": "List each part with quantity and planned rate, add labor lines the crew expects to use, and include a customer authorization name or signature line before overtime or extras start. Tech sign-off at completion creates a clear record of who did the work.\n\nSerial numbers and warranty swaps should appear when relevant so the later invoice matches what was installed. Planned cost on a work order is not a tax invoice. When the job is done, copy completed lines into /tools/contractor-invoice/, drop unused estimates, add tax and payment terms, and reference the work order number so accounts payable can match the ticket. Keep payment receipts separate once money clears."
      },
      {
        "heading": "Is a work order a contract?",
        "body": "A work order may help document authorization for a job, but whether it creates a binding contract depends on the wording, the parties’ conduct, and your jurisdiction. Cornell Law School’s Legal Information Institute explains that a contract is a promise the law will enforce, typically through offer, acceptance, and consideration.\n\nMany shops treat a signed estimate plus a signed work order as the field authorization trail, then invoice against those documents. Do not assume a short task list alone is a full services agreement. Ask a licensed attorney if you need advice for your state. This guide is operational, not legal advice. The SBA’s compliance guidance reminds small businesses to keep required records organized; work orders are part of that paper trail when you store them with estimates and invoices."
      },
      {
        "heading": "Worked example: work order 77 at 14 Oak Street",
        "body": "This worked example creates work order 77 for a gutter replace at 14 Oak Street that follows accepted estimate E-19. It shows how job address, task list, materials, crew assignment, and customer signature appear on one ticket before the install week begins.\n\nProblem / request: Replace damaged front gutter run per estimate E-19; haul old sections. Tasks: (1) Protect landscaping and walkway, (2) Remove existing front gutter and fasteners, (3) Install new gutter and end caps matching estimate length, (4) Test downspout flow, (5) Photo completion for file. Parts / labor lines: Gutter section quantity and rate from E-19, hangers, sealant, and labor hours matching the estimate. Customer authorization: Rivera signs before ladder work begins. Notes field stays blank until the tech records any hidden fascia rot for a possible change order. Enter the same fields in /tools/work-order/. After completion, invoice from the finished lines and keep WO-77 with estimate E-19."
      },
      {
        "heading": "What fields should every work order checklist include?",
        "body": "Run this checklist before the crew leaves the shop so the ticket answers who, where, what, and who approved the work. Missing contact phones and estimate references are the usual gaps that slow both the field visit and later invoicing.",
        "table": {
          "caption": "Work order fields checklist",
          "headers": [
            "Field",
            "What to write",
            "Why it matters"
          ],
          "rows": [
            [
              "Work order # / date",
              "Unique number and issue date",
              "Links to estimate and invoice"
            ],
            [
              "Customer / job address",
              "Full site address and on-site phone",
              "Gets the crew to the right door"
            ],
            [
              "Problem / tasks",
              "Request plus numbered steps",
              "Defines done for the visit"
            ],
            [
              "Assignment",
              "Tech or crew and schedule window",
              "Sets accountability"
            ],
            [
              "Parts / labor",
              "Quantity and planned rates",
              "Feeds the later invoice"
            ],
            [
              "Authorization",
              "Customer name or signature",
              "Shows approval before extras"
            ]
          ]
        }
      },
      {
        "heading": "How do you move from work order to invoice?",
        "body": "After the tech marks tasks complete, copy only finished labor and parts into the invoice, reference WO and estimate numbers, and show any deposit already paid. Clients who signed the work order rarely dispute invoices that mirror the same lines.\n\nDo not email a work order labeled as an invoice. Document type matters for accounts payable and for your books. See /guides/work-order-vs-invoice-vs-estimate/ for the three-document sequence: estimate to propose price, work order to assign the job, invoice to collect payment. If scope grew on site, attach the signed change note before you bill the new lines."
      },
      {
        "heading": "What mistakes slow crews and billing?",
        "body": "Vague problem statements, missing on-site phones, and no link to the estimate number slow both the field visit and the invoice. Fix those three before you print the PDF so crews and accounts payable share the same clear job story.\n\nOther gaps include skipping tech sign-off, forgetting serial numbers on replaced parts, and editing the original work order after the fact instead of adding a dated note. Number work orders sequentially and never reuse numbers. When a callback is needed, open a new work order that references the first so warranty labor stays visible. Recreate clean tickets in the work order generator so crews always get a readable task list."
      }
    ],
    "faq": [
      {
        "question": "Is a work order the same as an invoice?",
        "answer": "No. A work order directs and authorizes the job. An invoice requests payment afterward. Convert completed work order lines into an invoice when you bill."
      },
      {
        "question": "Is this a stop-work order?",
        "answer": "No. This guide covers service job tickets. A stop-work order is a different document used to halt work, often for safety. Do not mix the two labels."
      },
      {
        "question": "Should the customer sign the work order?",
        "answer": "When you need clear authorization before extras or overtime, yes. Tech sign-off at completion also helps prove who finished the tasks."
      },
      {
        "question": "How do I link a work order to an estimate?",
        "answer": "Put the estimate number in the problem or notes field and match parts and labor descriptions to the accepted estimate lines, as in work order 77 referencing E-19."
      },
      {
        "question": "Does a signed work order always create a contract?",
        "answer": "Not automatically. Binding effect depends on wording and acceptance under applicable law. Ask a licensed attorney for advice on your documents."
      },
      {
        "question": "Where do I create the PDF?",
        "answer": "Use /tools/work-order/ to fill job fields, preview the ticket, and export PDF or DOCX without uploading customer data to our servers."
      }
    ]
  },
  {
    "slug": "wedding-videography-contract",
    "title": "Wedding Videography Contract Guide",
    "metaDescription": "Wedding videography contracts: day timeline, ceremony audio, raw footage, highlight film, and rain plan. Free templates. Not legal advice.",
    "answerFirst": "A wedding videography contract should lock the day timeline, ceremony audio plan, deliverables such as highlight film and raw footage policy, payment timing, and a rain or venue-change plan before the date is held. Cross-read general videography clauses, then draft wedding fields in the videography contract tool.",
    "publishedAt": "2026-11-13",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "videography-contract",
      "event-wedding-vendor-contract",
      "photography-contract-template"
    ],
    "relatedGuideSlugs": [
      "videography-contract-clauses",
      "wedding-vendor-contract-checklist",
      "photography-contract-clauses"
    ],
    "legalNote": "This article is not legal advice. Copyright, music licensing, and contract rules vary by jurisdiction and event type. Use our templates as a starting point and have a licensed attorney review your final agreement.",
    "howTo": [
      "Confirm wedding date, coverage hours, locations, and crew size in writing.",
      "Attach or reference a day timeline with ceremony audio and reception end time.",
      "List deliverables: highlight film length, optional raw footage, and revision rounds.",
      "State ownership or license terms, rain plan, and cancellation windows.",
      "Collect retainer per your working payment pattern and store the signed PDF with the event file."
    ],
    "sources": [
      {
        "label": "U.S. Copyright Office — Photographers",
        "url": "https://www.copyright.gov/engage/photographers/",
        "usedFor": "Creator copyright ownership and licensing basics for visual works"
      },
      {
        "label": "Cornell LII — Contract",
        "url": "https://www.law.cornell.edu/wex/contract",
        "usedFor": "Offer, acceptance, and consideration basics for signed vendor agreements"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Small-business habits around written agreements and records"
      }
    ],
    "sections": [
      {
        "heading": "What should a wedding videography contract cover?",
        "body": "Cover the wedding date, coverage hours, locations, crew, day timeline, ceremony audio method, deliverables such as highlight film and raw footage rules, revision rounds, payment, cancellation, and a rain or venue-change plan. Couples compare vendors on those specifics, not on a single package name.\n\nThis page focuses on wedding-day details. For general videography topics such as music licensing, corporate approval chains, and archive policy, see /guides/videography-contract-clauses/ and cross-link from there rather than duplicating every clause here. Draft wedding fields in /tools/videography-contract/. When you need a broader vendor agreement alongside catering or DJ terms, use /tools/event-wedding-vendor-contract/ and the checklist at /guides/wedding-vendor-contract-checklist/."
      },
      {
        "heading": "How do you write the wedding day timeline into the contract?",
        "body": "Attach or reference a timeline that names getting-ready start, ceremony start, cocktail hour, reception end, and travel buffers between locations. Without end times, overtime becomes an argument at midnight when the dance floor runs past the coverage hours you sold.\n\nList multi-location moves with load-out windows. Note meal breaks for long coverage days so crew stamina is not a surprise. If the planner owns the master timeline, say the contract incorporates the version dated on a stated day and that major shifts need written notice. Overtime hourly rates belong next to the coverage hours so couples see the cost before the party runs long. Cornell’s contract overview is a reminder that clear offer and acceptance matter; a signed PDF plus retainer is how many couples lock the date."
      },
      {
        "heading": "How should ceremony audio and coverage be specified?",
        "body": "State who captures vows and readings: on-camera mic, wireless lav, or a separate recorder, and who is responsible if the venue limits aisle placement. Ceremony audio failures are a common wedding dispute when the recording method is left vague in the contract.\n\nNote whether you record processional music for personal films and whether the venue bans certain mounts. Second-shooter positions for wide ceremony shots should appear only if included in the fee. If the couple wants a full ceremony edit as well as a highlight film, list it as its own deliverable with a separate deadline. Indoor venues sometimes restrict where cables may run; attach venue rider notes so expectations match the day."
      },
      {
        "heading": "What deliverables belong on a wedding video agreement?",
        "body": "Name the highlight film length range, optional documentary cut, social verticals if sold, revision rounds, delivery format, and whether raw footage is included or priced as an add-on. Clear deliverables keep post-production bounded and prevent surprise edit requests after the wedding.\n\nDefine what a revision round includes: one consolidated note list, not endless one-line texts. State gallery or download link duration and when files may be deleted from your archive. Rush delivery fees belong here. Raw footage is large and ungraded; if you sell it, specify codec and folder structure. For photography-side usage language that couples often confuse with video rights, see /guides/photography-contract-clauses/."
      },
      {
        "heading": "Who owns the wedding film copyright?",
        "body": "Under common U.S. practice for freelance creators, the videographer often owns copyright in the film and grants the couple a license for personal sharing unless the contract transfers ownership. Put the rule in writing before the retainer so ownership is not left to day-of assumptions.\n\nSeparate personal sharing from commercial use such as paid ads or stock submission. If the couple later monetizes a YouTube channel, they may need different music and a broader license. Silent contracts create the fights. This is not legal advice; have counsel tune ownership language for your state and package."
      },
      {
        "heading": "How should the rain plan and cancellation terms read?",
        "body": "Spell out outdoor ceremony backups, indoor alternate locations, and what happens if weather or venue closure forces a date change, including whether the retainer transfers. Couples need the rain plan in the same packet as payment terms before they sign.\n\nOffer one courtesy reschedule when your calendar allows, and say if a second shooter of equal skill may cover if you cannot attend. Force majeure language should cover illness and venue closure without promising outcomes you cannot control. Retainer forfeiture windows are working patterns you choose for that booking, not official industry law. State them as your terms for the engagement and have counsel review enforcement wording."
      },
      {
        "heading": "Worked example: Saturday wedding highlight package",
        "body": "Coverage: ten hours, one lead and one second shooter, two locations with a thirty-minute travel buffer. Timeline exhibit: getting-ready nine a.m., ceremony four p.m., reception end eleven p.m. Ceremony audio: wireless lav on officiant plus backup recorder at the altar per venue approval.\n\nDeliverables: five-to-seven minute highlight film within ninety days; full ceremony edit not included; raw footage available as a paid add-on with stated codec. Two revision rounds on highlight length and song choice from your licensed personal-use library. Copyright remains with the videographer; couple receives personal sharing rights. Rain plan: move ceremony to the covered patio listed by the venue, or reschedule once within twelve months if the venue closes. One payment pattern we use in this example is a forty percent retainer to hold the date and balance due thirty days before the wedding. Those percents are a working pattern for the sample, not an official rule. Map the same fields in /tools/videography-contract/ and store the signed PDF with the planner timeline."
      },
      {
        "heading": "What wedding-specific checklist should you run before signing?",
        "body": "Use this table the week you send the booking packet so timeline, audio, deliverables, and rain plan are not left to day-of texts. Pair it with the broader vendor checklist when other vendors share the same wedding date and load-in windows.",
        "table": {
          "caption": "Wedding videography contract checklist",
          "headers": [
            "Topic",
            "What to lock in writing",
            "Why couples ask"
          ],
          "rows": [
            [
              "Day timeline",
              "Start, ceremony, reception end, travel buffers",
              "When does coverage stop?"
            ],
            [
              "Ceremony audio",
              "Mic method and venue limits",
              "Will vows be clear?"
            ],
            [
              "Highlight film",
              "Length range, deadline, revisions",
              "What do we receive?"
            ],
            [
              "Raw footage",
              "Included or add-on, format notes",
              "Do we get camera originals?"
            ],
            [
              "Ownership / license",
              "Copyright owner and personal vs commercial use",
              "Can we post or monetize?"
            ],
            [
              "Rain / change plan",
              "Backup location or reschedule rule",
              "What if weather shifts?"
            ]
          ]
        }
      },
      {
        "heading": "How should payment and records sit beside the creative clauses?",
        "body": "Put retainer and balance due dates next to the timeline so couples see money and schedule together, and keep signed PDFs with the event file. Payment percents are working patterns for your studio, not official rates from any government source.\n\nIssue invoices that match the contract schedule and receipts when payments clear. The SBA’s stay-legally-compliant guidance points small businesses toward organized records; wedding contracts, timelines, and payment proofs belong together. For general music, archive, and corporate clause sets that are not wedding-specific, return to /guides/videography-contract-clauses/ instead of expanding this page into a second general guide."
      }
    ],
    "faq": [
      {
        "question": "How is this different from the videography clauses guide?",
        "answer": "This page focuses on wedding timeline, ceremony audio, highlight and raw deliverables, and rain plans. /guides/videography-contract-clauses/ covers general videography topics for weddings and other shoots."
      },
      {
        "question": "Should raw wedding footage be included?",
        "answer": "Only if you price and define it. Raw files are large and not color-graded. Many studios sell raw as an add-on with codec and folder rules in writing."
      },
      {
        "question": "Who owns the wedding video?",
        "answer": "Often the creator keeps copyright and licenses personal use to the couple, unless the contract says otherwise. Put ownership in writing. This is not legal advice."
      },
      {
        "question": "What belongs in a rain plan?",
        "answer": "Name the indoor or covered backup, who decides, and whether a date change transfers the retainer. Do not leave outdoor ceremonies without a written alternate."
      },
      {
        "question": "Which tools should I use?",
        "answer": "Draft the film agreement in /tools/videography-contract/. Use /tools/event-wedding-vendor-contract/ when you need a broader wedding vendor services agreement."
      },
      {
        "question": "Do I need music licensing language?",
        "answer": "Yes when films are shared beyond private use or when tracks are not cleared. See the music section in /guides/videography-contract-clauses/ for general guidance, then have counsel review."
      }
    ]
  },
  {
    "slug": "contractor-invoice-example",
    "title": "Contractor Invoice Example: Progress Billing",
    "metaDescription": "Progress billing contractor invoice example: accepted estimate lines, $1,000 deposit subtracted, $4,250 due in 15 days. Free invoice tool.",
    "answerFirst": "A progress contractor invoice repeats accepted estimate lines for work due now, subtracts deposits already paid, and shows balance due with a clear due date. In the sample below, invoice 220 subtracts a $1,000 deposit and leaves $4,250 due in 15 days. Build the same PDF in the contractor invoice tool.",
    "publishedAt": "2026-11-13",
    "updatedAt": "2026-11-13",
    "relatedToolSlugs": [
      "contractor-invoice",
      "construction-estimate-template",
      "receipt-generator",
      "work-order"
    ],
    "relatedGuideSlugs": [
      "invoice-vs-estimate",
      "construction-estimate-that-wins-jobs",
      "line-item-totals-explained",
      "work-order-vs-invoice-vs-estimate"
    ],
    "howTo": [
      "Open a new invoice number and reference the accepted estimate or PO.",
      "Copy only the estimate lines you are billing for this progress draw.",
      "Add tax per your rules, enter deposits already paid, and set the due date.",
      "Add payment instructions and export a PDF from the contractor invoice tool.",
      "When payment clears, issue a receipt and store both with the job file."
    ],
    "sources": [
      {
        "label": "IRS — What kind of records should I keep",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        "usedFor": "Keeping invoices, deposits, and payment records that support gross receipts"
      },
      {
        "label": "IRS — How long should I keep records",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
        "usedFor": "Retention timing for business records tied to returns"
      },
      {
        "label": "IRS — Recordkeeping",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
        "usedFor": "Overview of why small businesses keep organized books and supporting documents"
      },
      {
        "label": "SBA — Stay legally compliant",
        "url": "https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant",
        "usedFor": "Compliance habits that include clear billing records"
      }
    ],
    "sections": [
      {
        "heading": "How do you build a contractor progress invoice?",
        "body": "Build a progress invoice by numbering it, dating it, naming the client, referencing the estimate or job number, listing the lines you are billing now, applying tax, subtracting deposits already paid, and stating the balance due date. Clients and accounts payable need that chain to approve payment without a phone call.\n\nUse /tools/contractor-invoice/ so quantity times rate, tax, and amount paid stay consistent. Keep the document titled Invoice, not Estimate. For how estimates and invoices differ, see /guides/invoice-vs-estimate/. The IRS page on what kind of records to keep points small businesses to documents that support income; progress invoices and deposit proofs belong in that file."
      },
      {
        "heading": "Why copy accepted estimate lines onto the invoice?",
        "body": "Matching labels between the accepted estimate and the invoice reduce disputes and speed approval because the client already agreed to those descriptions and rates. Progress billing should look like a slice of the same job, not a new mystery total.\n\nIf the estimate said cabinet install and flooring materials, the invoice should use the same words when those phases are due. Drop lines you are not billing yet. When scope changes, add a signed change order or a clearly labeled new line rather than silently editing old PDFs. Construction estimate habits that make this easier are covered in /guides/construction-estimate-that-wins-jobs/."
      },
      {
        "heading": "How should deposits and balance due appear?",
        "body": "Show the invoice subtotal and tax, then subtract the deposit or prior payments as amount already paid so the balance due is obvious on the PDF. Hiding the deposit in an email thread is how clients overpay or underpay progress draws.\n\nDeposit size on the original estimate is a working pattern you set for that job, not an official industry percentage. On the invoice, use the actual dollars received. State payment instructions and a calendar due date such as net fifteen days when that is your term for the draw. When the payment clears, send a receipt from /tools/receipt-generator/ so the invoice asks for money and the receipt proves it was received. IRS recordkeeping materials stress keeping support for income; deposit and balance invoices together tell that story."
      },
      {
        "heading": "Worked example: invoice 220 after a $1,000 deposit",
        "body": "This worked example follows invoice 220 from accepted estimate lines through a one thousand dollar deposit credit. After tax as required locally, the sample leaves four thousand two hundred fifty dollars due in fifteen days, which you can recreate in the contractor invoice tool.\n\nHeader fields: Invoice 220, invoice date, due date fifteen days out, bill-to name, and a PO or estimate reference. Line items mirror the accepted estimate for the progress draw. Amount already paid: one thousand dollars. Balance due: four thousand two hundred fifty dollars. Payment instructions: ACH or check, net fifteen. Enter the same structure in /tools/contractor-invoice/. Keep invoice 220 with the estimate PDF and the deposit receipt. IRS guidance on how long to keep records helps you plan retention; follow the periods that apply to your returns rather than inventing a homemade rule."
      },
      {
        "heading": "How do the sample invoice fields line up?",
        "body": "Share this table with office staff so every progress invoice shows the same clear spine: estimate reference, billable lines, tax, deposit already paid, and calendar due date. The dollar figures below match the invoice 220 example used throughout this guide.",
        "table": {
          "caption": "Invoice 220 progress billing snapshot",
          "headers": [
            "Field",
            "Example value",
            "Notes"
          ],
          "rows": [
            [
              "Invoice #",
              "220",
              "Unique; do not reuse"
            ],
            [
              "Source",
              "Accepted estimate lines",
              "Bill only the current draw"
            ],
            [
              "Deposit applied",
              "$1,000",
              "Actual amount already paid"
            ],
            [
              "Balance due",
              "$4,250",
              "After deposit subtraction"
            ],
            [
              "Payment terms",
              "Due in 15 days",
              "Calendar due date on PDF"
            ],
            [
              "Follow-up",
              "Receipt when paid",
              "Store with job file"
            ]
          ]
        }
      },
      {
        "heading": "What payment terms and retainage notes help AP?",
        "body": "Put the due date, accepted payment methods, and any retainage withheld this period in plain language so commercial accounts payable can match the signed contract. Ambiguous due-upon-receipt wording without a calendar date slows checks and creates avoidable follow-up email threads.\n\nIf the contract holds retainage until punch list, show earned amount, retainage withheld, and net due. Late-fee language should appear only if your signed agreement allows it. Number invoices sequentially even when a client rejects a PDF. Weekly review of open invoices past due catches cash-flow gaps early. Link work order numbers when the field ticket authorized the draw; see /guides/work-order-vs-invoice-vs-estimate/ for the document sequence."
      },
      {
        "heading": "Which IRS recordkeeping habits apply to contractor invoices?",
        "body": "Keep invoices, deposit proofs, and related job documents that support the income you report, and retain them for the periods described in IRS how-long and recordkeeping materials. Progress billing creates multiple PDFs for one job; file them together by job number.\n\nThe IRS what-records page is the primary reminder that small businesses need documents supporting gross receipts and expenses. Do not invent statistics about audit rates. Simply store invoice 220, the estimate it references, and the receipt for the one thousand dollar deposit in the same folder. The SBA’s stay-legally-compliant guidance likewise points owners toward organized compliance habits, which includes being able to find billing records when needed."
      },
      {
        "heading": "What mistakes break progress billing?",
        "body": "Reusing invoice numbers, omitting the estimate reference, and forgetting to subtract the deposit already paid are the usual breaks on contractor progress invoices. Fix those three before you hit send so the balance due matches what the client already paid you.\n\nOther gaps include mixing estimate language on an invoice PDF, billing lines the client never accepted, and editing paid invoices instead of issuing a credit memo. When you refund or correct, use a new document number so the audit trail stays clear. Recreate clean progress invoices in the contractor invoice generator so tax and amount-paid math stay consistent from deposit through final billing."
      }
    ],
    "faq": [
      {
        "question": "How does progress billing work on a contractor invoice?",
        "answer": "Bill the percentage or completed-phase amount that matches your contract draws. Reference the estimate, show prior payments, and state the balance due with a due date."
      },
      {
        "question": "Why does invoice 220 show $4,250 due?",
        "answer": "In the example, the progress lines and tax produce a total that, after subtracting the $1,000 deposit already paid, leaves $4,250 due in 15 days. Recreate the math in the contractor invoice tool."
      },
      {
        "question": "Should the deposit percent appear on the invoice?",
        "answer": "Show the dollars already paid. Percent language belongs on the estimate as your working pattern. The invoice needs the actual amount applied."
      },
      {
        "question": "What IRS pages apply to keeping invoices?",
        "answer": "Start with the IRS pages on what records to keep, how long to keep records, and recordkeeping. They explain support for income without requiring you to invent statistics."
      },
      {
        "question": "When should I send a receipt?",
        "answer": "After payment clears. The invoice requests payment; the receipt confirms it. Keep both with the job file."
      },
      {
        "question": "Can I bill from a work order?",
        "answer": "Yes. Copy completed work order lines into the invoice and reference the work order and estimate numbers so AP can match the ticket."
      }
    ]
  }
]

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
