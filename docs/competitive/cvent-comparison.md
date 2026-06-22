# Cvent vs Eventsea — Competitive Feature Map

> Filed 2026-06-12. Maps Cvent's full product surface against Eventsea's PRD + release ladder + four-sided marketplace plan. Calls out direct competition, adjacent overlap, deliberate non-coverage, and the categories where Eventsea is uniquely positioned.
>
> Primary sources: [Cvent Event Management product page](https://www.cvent.com/en/event-management-software), [Cvent Attendee Hub](https://www.cvent.com/en/event-marketing-management/attendee-hub), [Cvent LeadCapture press release](https://www.cvent.com/en/press-release/cvent-unveils-leadcapture-drive-event-exhibitor-roi), [Cvent Supplier Network](https://www.cvent.com/en/event-marketing-management/cvent-supplier-network), [Cvent Pricing in 2026 (third-party benchmark)](https://inevent.com/blog/tech-and-trends/cvent-pricing-guide.html).
> Eventsea references: `docs/PRD.md`, `docs/releases/v0.2-lead-analysis-csv.md`, `docs/releases/v1.1/luma-api-spec.md`, `docs/releases/v2/autonomous-spec.md`, `docs/council/decision-2.md`, `docs/gtm/sponsor-pilot-offer.md`.

## 1. The big-picture positioning

Cvent is a **horizontal enterprise event-management platform** that handles every stage of running an event — registration, mobile app, on-site check-in, lead retrieval, venue sourcing, surveys, reporting — sold to corporate event teams and SaaS vendors who exhibit at conferences. It is the incumbent across most of the categories adjacent to what Eventsea wants to do.

Eventsea is a **vertical AI lead-intelligence layer** that sits *above* event registration tools (Luma, Eventbrite, eventually Cvent itself) and turns raw attendee lists into verified, scored, ranked sales leads. The PRD is explicitly narrower than Cvent's surface and explicitly deeper on the lead-screening + per-sponsor-scoring + verified-flagging mechanics.

These are not the same product. They overlap in one specific place — **lead retrieval / lead intelligence** — and Eventsea's wedge (manual pilots on BuilderShip, SIA) was validated against the same buyer Cvent's LeadCapture serves.

## 2. Cvent's product surface (categorized)

### A. Core Event Management
- Event registration with customizable forms
- Online registration / attendee profile management
- Event marketing
- Workflow approvals, budgeting, speaker / content management
- Event diagramming + run-of-show planning

### B. Attendee Hub (Mobile + Web)
- AI-powered networking via **CventIQ™** — recommends people to meet from attendee attributes + behavior
- Chat, Q&A, polls, surveys, discussions
- Gamification: activity feeds, reactions, leaderboards
- Personal agendas + 1:1 appointment scheduling with attendees / sponsors / exhibitors
- Session check-in integrated with OnArrival
- AI-powered attendee assistant — learns from event behavior
- iOS + Android mobile apps
- **Pricing: $7 per registrant per event**, annual increases starting July 2026

### C. LeadCapture (the direct competitor)
- Badge + business card scanning
- Real-time lead qualification + rating
- Custom qualification questions
- On-demand lead export
- CRM syncing
- **Exhibitor Portal** — lead counts, quality assessment, pipeline / revenue attribution over time
- Data privacy controls
- iOS + Android apps
- Rentable laser scanner hardware

### D. OnArrival
- On-site check-in
- Badge printing
- Arrival processing automation

### E. Trade Show Meetings (Jifflenow integration)
- Meeting scheduling between attendees
- Appointment management

### F. Virtual + Webinar
- Virtual event platform (hybrid in-person + virtual)
- Standalone webinar platform

### G. Reporting & Analytics
- Event + attendee insights
- Performance metrics + custom dashboards

### H. Surveys
- Online surveys
- Post-event feedback collection

### I. Cvent Supplier Network (Venue Sourcing — 340K+ venues)
- AI-powered venue search across hotels and special-event venues
- RFP templates
- One RFP → multiple venues
- Floor plans + interactive 3D venue views
- Automated RFP scoring + prioritization (for venues responding to planners)
- Group room block coordination
- Targeted digital advertising for venues to reach planners

### J. Passkey
- Hotel room block management
- Group rate distribution

### K. Cvent Essentials
- Repeatable in-person events at high volume

### L. Integrations (30+ verified)
- **CRM:** Salesforce, HubSpot, Marketo, MS Dynamics, Eloqua, SugarCRM, Veeva, NetSuite, Raisers Edge NXT
- **Travel:** Amadeus, Deem, GetThere, Sabre, Apollo, Concur, Uber
- **Webinar:** Zoom, WebEx, MS Teams, GoToWebinar, GlobalMeet
- **Analytics:** Google Analytics
- **Expense:** Amex GTR, Citi Virtual Card

### M. Pricing
- Editions: Professional, Enterprise (no public per-seat list price; sales-led)
- Median 12-month contract: **~$79K/yr** (third-party benchmark)
- Mean: ~$19.5K/yr
- Implementation: $5K–$50K in Year 1

## 3. Category-by-category gap analysis

| Category | Cvent | Eventsea (per PRD + release ladder) | Verdict |
|---|---|---|---|
| **Event registration** | Full registration platform with custom forms, payment, etc. | None — sits above Luma / Eventbrite / Cvent | Deliberate non-coverage |
| **Mobile event app** | Attendee Hub with AI networking, gamification, agendas | None — `/builders` is a marketing page, not an app | Deliberate non-coverage |
| **On-site check-in** | OnArrival with badge printing, hardware | None | Deliberate non-coverage |
| **Lead retrieval — capture mechanic** | Badge / business card scan, mobile + rented scanners | CSV upload (PRD v1) → Luma API auto-pull (v1.1) → autonomous discovery (v2) | **Different mechanic, same outcome.** Cvent captures at the booth; Eventsea screens the full registration list before the event. |
| **Lead retrieval — verification** | Self-reported via badge scan + custom qualification Qs | **Two-tier agentic web verification** with V/P/U verdicts, LinkedIn anchor, name-collision discipline, "Claims unconfirmed" surfaced (PRD FR2) | **Eventsea wins**. Cvent trusts what's on the badge; Eventsea verifies against live web sources. |
| **Lead retrieval — per-sponsor scoring** | Custom qualification questions + manual rating | **Per-sponsor score column with conflict overrides** (PRD FR3). Investors flat-scored. Competitor → score=1 + flag. | **Eventsea wins on a sponsor-specific axis**. Cvent's qualification is generic. |
| **Lead retrieval — influence / social** | Not in product | X followers, GitHub followers, Social Reach, Influence Rank (PRD FR4). LinkedIn explicitly "not available." | **Eventsea wins**. Cvent doesn't surface social signal. |
| **Lead retrieval — curation** | Exhibitor portal shows leads, lets exhibitor rate them | **Top-N builders formula** + judge panel (≤10) selection with mutual-exclusion enforcement (PRD FR6) | **Eventsea wins on the organizer-curation angle**. Cvent's portal is sponsor-side only. |
| **CRM export** | "CRM syncing" — implementation details thin | **HubSpot + Salesforce CSV exporters** with import-wizard column mapping, current-filter aware, UTF-8 BOM (PRD FR7). Direct API push deferred to v1.1+. | **Tied at v1; Cvent ahead on direct sync until our v1.1**. |
| **Dashboard** | Attendee Hub web dashboard + Exhibitor Portal | Self-contained HTML per event, embedded JSON, password-gated FR9 (PRD FR5 + decision-2.md tech-architect §4) | **Different shape**. Cvent ships SaaS multi-tenant; Eventsea ships per-event static page behind a password. The Eventsea shape is privacy-first by default; Cvent's needs config. |
| **Access control / PII** | Standard SaaS auth, tier-dependent | **HMAC-signed HttpOnly cookie**, per-event scoping, login renders zero lead data, post-deploy `curl \| grep` verification as DoD (PRD FR9, tech-architect §5) | **Eventsea wins on per-event auth specificity**. Cvent's gate is org-wide. |
| **Venue sourcing** | **Cvent Supplier Network** — 340K+ venues, AI search, RFP templates, 3D floor plans, group room blocks | `/venues` marketing page + listing form. No active venue database. | **Cvent wins decisively**. This is their moat; we don't compete. |
| **Sponsor-side discovery** | Sponsors can see Cvent Supplier Network venue list. **No "which events should we sponsor next" radar.** | Field Marketing radar with hybrid semantic search + ICP scoring + P1/P2/P3 priority workflow (PRD FR2 + skill-track v1.1 / v2 + the existing event-radar prototype) | **Eventsea wins**. This category does not exist in Cvent. |
| **Autonomous event discovery** | Not in product | PRD v2: Tavily search + extract + crawl, Token Factory open-model inference, scheduled rebuild | **Eventsea wins; category-defining**. Cvent serves events you already know about; Eventsea finds events you don't. |
| **Mobile / hardware** | iOS + Android apps, rental laser scanners | Web-only. Hardware = none. | **Cvent wins**. We don't have a hardware play. |
| **Networking / matchmaking** | CventIQ — AI-powered attendee matching | Not in PRD. Could be added — the verification + scoring layer enables it. | **Cvent ahead**; potential Eventsea adjacent product. |
| **Surveys** | First-class product | Not in PRD | Cvent-only, low strategic priority for us. |
| **Webinar / virtual** | Full virtual + webinar platform | Not in PRD | Cvent-only, deliberate non-coverage. |
| **Integrations (verified)** | 30+ verified CRMs, travel, webinar, analytics, expense | 0 in production. PRD names HubSpot + Salesforce (CSV-import-wizard contract for v1; direct API for v1.1+). Stripe + Calendly + Resend wired for landing-page CTAs. | **Cvent way ahead**. The integration depth is a multi-year build. |
| **Pricing model** | Sales-led enterprise. Median ~$79K/yr. Attendee Hub at $7/registrant/event. | Concierge sponsor pilots: $7.5K / $12.5K / $25K (post-PRD repricing per `docs/gtm/sponsor-pilot-offer.md`). Plus the landing-page Community / Pro / Scale tiers. | **Different price point + buying motion**. We are *much* cheaper than Cvent, deliberately. |
| **Verticals** | Cross-industry (pharma, finance, tech, associations) | AI infra / dev tools / enterprise SaaS (Sprint 1 focus per `docs/gtm/target-list.md`); medical/biotech later (PRD §3 persona list) | Eventsea is intentionally vertical at the wedge. |
| **Hosting model** | Multi-tenant SaaS | Per-event static HTML + password gate. v1 is single-org. Multi-tenant signup deferred (PRD non-goals). | **Different by design**. Eventsea's per-event model is the privacy story. |

## 4. The one direct collision: LeadCapture vs PRD v1

This is the only category where we are head-on with Cvent. The product comparison:

| | **Cvent LeadCapture** | **Eventsea PRD v1** |
|---|---|---|
| Primary mechanic | Badge / business-card scan at booth | CSV upload pre-event |
| Verification | Self-reported on badge | Two-tier agentic web verification (V/P/U) |
| Lead source coverage | Whoever walked up to your booth | **Every registrant**, including the 90% who never visit your booth |
| Per-sponsor scoring | Custom qualification questions, manual rating | Verified-fit decomposition (1st / 2nd / 3rd ranked product), conflict overrides |
| Competitor flagging | Manual | Automatic, with explicit flag + score → 1 |
| Social signal | None | X + GitHub follower counts |
| Influence rank | None | Computed per event |
| Curation (Top-N) | Sponsor-side rating only | Cross-event Top-N + judge panel with formula + human review |
| Hardware | Phone + optional laser scanner | None — purely software |
| CRM sync | Yes (implementation details unclear) | HubSpot + Salesforce CSV import-wizard at v1; direct API at v1.1+ |
| Coverage | Trade shows + conferences where they sell badge access | Any event the organizer exports a CSV from (Luma at v1, scheduled Luma at v1.1, autonomous at v2) |
| Buyer | Booth lead at the sponsor company | DevRel / Field Marketing lead at the sponsor company |
| Price | Bundled in Cvent enterprise contract (~$79K/yr median) | $7.5K – $25K per quarterly pilot |

**The differentiated value proposition for Eventsea against LeadCapture:**

1. **Pre-event verification at the full registration list, not post-walkup at the booth.** Cvent only screens leads who show up to the booth. Eventsea screens every registrant. For a 700-person event, that's ~600 leads Cvent will never see and we surface.
2. **Verified vs self-reported.** A LeadCapture-scanned badge says what the registrant typed at signup. An Eventsea screening verifies against LinkedIn / GitHub / web sources with explicit V/P/U verdicts and named flags ("inflated title," "wrong company," "competitor employee"). Cvent doesn't catch the 10–15 inflated claims our BuilderShip pilot caught.
3. **Per-product scoring for multi-sponsor events.** Cvent's "qualification questions" don't generate per-sponsor score columns. We do.
4. **Influence as a first-class field.** Cvent has no follower data.
5. **Competitor exclusion is structural.** Our `conflictOverride: true` flag + score = 1 is in the data model. Cvent leaves this to the booth rep's eyeballs.
6. **Hostable independent of the event-management stack.** Cvent LeadCapture only works if the event runs on Cvent. Eventsea works against any CSV (Luma export, Eventbrite, custom, Cvent export down the road).

**Where Cvent LeadCapture wins:**

1. **Real-time at-the-booth scanning.** We are pre-event + post-event. We don't compete on the live capture mechanic.
2. **Hardware + scanner rental.** Logistical advantage at large in-person trade shows.
3. **Integrated with the same vendor that runs the registration.** No extra contract for the sponsor.
4. **Established enterprise procurement path** — exhibitors at Cvent-managed events already have it in their stack.
5. **Surveys, gamification, mobile, networking, virtual, venue sourcing** — none of which we play in, but the *whole-platform* sale wins enterprise budget conversations.

## 5. Categories where Eventsea is uniquely positioned (no Cvent equivalent)

These are not in Cvent's product. Each is a defensible wedge:

1. **Sponsor-side event radar** — "Which events should we sponsor next quarter?" Cvent helps you run events you already booked; Eventsea helps you decide which to fund. This is the closest thing to a new category.
2. **Autonomous event discovery** — PRD v2's Tavily + Token Factory pipeline. Cvent does not discover events that aren't already on its platform.
3. **Cross-event builder graph** — Top-N builders curated across multiple events with persistent IDs. Cvent's data model is single-event.
4. **Verified attendee tier system (V/P/U)** as a visible product surface. Trust posture as a product feature.
5. **Per-event static HTML + password gate** delivery model. Cvent ships a multi-tenant SaaS; we ship a per-event artifact. Different security and audit posture, easier sponsor handoff (PDF + link).

## 6. Categories where Cvent decisively wins (and we should not chase)

We should not build any of these:

1. **Mobile event apps** with networking + gamification (Attendee Hub is mature, $7/registrant captures the market)
2. **On-site check-in + hardware** (OnArrival has 15+ years of operational hardening)
3. **Venue sourcing marketplace** (CSN's 340K venues + RFP automation is a generational moat)
4. **Webinar / virtual event platforms** (commoditized; Zoom owns it from below, Cvent from above)
5. **Group room block management** (Passkey is the standard)

Our `/venues` audience page is a *positioning* surface, not a product. If venues become a real product, it lives downstream of attendee data we already have, not as a venue-sourcing marketplace.

## 7. Strategic implications for the release ladder

The comparison sharpens the v0.2 / v1 / v1.1 / v2 sequence:

| Release | Cvent overlap | Strategic posture |
|---|---|---|
| **v1 (PRD CSV upload)** | Direct overlap with LeadCapture, on pre-event-vs-at-booth axis | **Lean into verified-pre-event-screening as the differentiator.** Every sponsor-facing message should make explicit: "Cvent LeadCapture sees the 100 booth visitors. We see all 700 registrants with V/P/U verification." |
| **v1.1 (Luma API ingestion)** | No Cvent overlap (Cvent doesn't ingest from external registration platforms; it IS the registration platform) | **Defensible.** Strengthens the position that we are the layer above any registration source. Add Eventbrite next, then Cvent's own export. |
| **v2 (Autonomous discovery + Token Factory)** | No Cvent overlap | **Category-creating.** Cvent has no autonomous discovery surface. This is where we stop competing on Cvent's terms and start defining a new category. |
| **Marketplace track v0.2 (audit pipeline)** | No Cvent overlap | Continue. |
| **Marketplace track v2.0 (sponsor matching + venue booking)** | **Direct competition with Cvent Supplier Network on the venue side.** | **Reconsider scope.** Building a venue marketplace from zero against CSN is a category we lose. Either skip the venue side of the marketplace, OR scope it to the niche (hacker houses + indie tech venues, not hotel ballrooms — a different long tail). |

The Sprint 3 council convening (per `docs/council/sprint-2-brief.md`) should weigh this: the original marketplace-track v2.0 has a venue-booking component that puts us into a head-on fight with Cvent Supplier Network. The skill-track v2 autonomous-intel build does not. Picking skill-track v2 over marketplace-track v2.0 is now even better-justified.

## 8. Where Cvent's pricing creates an opening

A median Cvent contract is $79K/year. Implementation $5K–$50K. Attendee Hub at $7/registrant/event. That's enterprise pricing for enterprise procurement.

Eventsea's repriced pilot tier ($7.5K / $12.5K / $25K — see `docs/gtm/sponsor-pilot-offer.md`) is **6-10x cheaper than a Cvent baseline**. Two implications:

1. **We can serve the customer Cvent cannot — the AI infra DevRel team with a $25K-ceiling discretionary budget.** Cvent's procurement gate keeps these buyers out. We meet them where they are.
2. **We can be the cheap-and-deep lead-intelligence layer that Cvent customers buy ALONGSIDE Cvent.** Sponsor pays Cvent $79K for the platform; pays Eventsea $12.5K to make their booth ROI defensible. We are not zero-sum with Cvent at this price point.

## 9. The one-sentence positioning vs Cvent (for outbound use)

For the GTM outbound team to weave into sponsor discovery calls per `docs/gtm/discovery-call-script.md`:

> "Cvent LeadCapture scans the badges at your booth. We screen, verify, and score every registrant before the event so your booth knows who to invite over. We layer on top of Cvent (or Luma, or Eventbrite) — we don't replace it."

## 10. Sources

- [Cvent Event Management product page](https://www.cvent.com/en/event-management-software)
- [Cvent Attendee Hub product page](https://www.cvent.com/en/event-marketing-management/attendee-hub)
- [Mobile Event Apps | Cvent](https://www.cvent.com/en/event-marketing-management/mobile-event-apps)
- [Cvent unveils LeadCapture (press release)](https://www.cvent.com/en/press-release/cvent-unveils-leadcapture-drive-event-exhibitor-roi)
- [Cvent LeadCapture (Software Advice)](https://www.softwareadvice.com/product/451364-cvent-leadcapture/)
- [Top 5 Lead Capture Tools (Cvent blog)](https://www.cvent.com/en/blog/events/top-lead-capture-tools)
- [Cvent Supplier Network](https://www.cvent.com/en/event-marketing-management/cvent-supplier-network)
- [Hotel RFP Management (Cvent)](https://www.cvent.com/en/supplier-venue/hotel-rfp-management)
- [Cvent Pricing in 2026 (third-party benchmark)](https://inevent.com/blog/tech-and-trends/cvent-pricing-guide.html)
- [Cvent Pricing (Research.com)](https://research.com/software/reviews/cvent)
- [Cvent reviews (G2)](https://www.g2.com/products/cvent-attendee-hub/reviews)
- [Cvent Developer Documentation (rendered via JS; product surface inferred from press + product pages)](https://developers.cvent.com/documentation)

Eventsea source docs cross-referenced: `docs/PRD.md` (FR1-FR10), `docs/releases/v0.2-lead-analysis-csv.md`, `docs/releases/v1.1/luma-api-spec.md`, `docs/releases/v2/autonomous-spec.md`, `docs/council/decision-2.md`, `docs/council/tech-architect-proposal.md`, `docs/gtm/sponsor-pilot-offer.md`, `docs/gtm/target-list.md`, `.claude/skills/event-leads/SKILL.md`.
