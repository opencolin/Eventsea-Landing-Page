# Founder/Ops PM Proposal — Eventsea 4-Week Sprint

**Author:** Founder / Ops PM, Founding Council
**Date:** 2026-06-11
**Decision required:** Council sign-off on single 4-week priority before sprint kickoff Monday.

## TL;DR

**Priority:** Validate **paid pilot pricing with 8 named enterprise sponsor leads** (Nebius, vCluster, Tavily, LanceDB + 4 analogs) by selling a $7.5K–$15K "Sponsor ROI Pilot" — using the existing landing page + Event Radar prototype as the demo surface.

**Goal:** 2 signed LOIs + 1 paid pilot by week 4.

Everything else — incorporation, hiring, fundraising — is **deferred or batched into a single 1-day Stripe Atlas sprint on Day 18**. Without paying customers, those activities optimize for a business that doesn't exist yet.

## 1. The decision space

Five candidate priorities, scored on (a) what dies in 4 weeks if skipped, (b) what we learn:

| Option | What dies in 4 weeks if we skip? | What do we learn? | Verdict |
|---|---|---|---|
| **A. Paid pilot validation** | Business — still don't know if anyone pays | Real WTP, ICP, objections | **PICK** |
| B. Delaware C-corp + cap table | Nothing in 4 weeks; LLC works for invoicing | Nothing about market | Defer (batch 1 day) |
| C. Pre-seed fundraise | Nothing — funds not survival input at $0 burn | Investor pattern-match without revenue = noise | Defer to Q4 |
| D. First eng hire | Velocity slows, but founder shipped this far solo | Adds burn before revenue = wrong sequence | Defer until pilot signed |
| E. Builderbase clone | Page stays weak, but already shipped | Cosmetic; doesn't change buying | Defer to week 5+ |

Current state — landing page live, radar working, **zero revenue, 4 named targets, draft $499/event** — has exactly one missing signal: **does anyone with budget pay, and at what number?** Every other activity is downstream.

## 2. The chosen priority

### Action: 4-week paid Sponsor ROI Pilot validation sprint

**Thesis:** $499/event ("Luma price") is wrong wedge for sponsors. Sponsors buy **attributable developer reach** at $5K–$25K per quarter from devrel/partner-marketing/ecosystem budgets that already exist.

1. Sponsor budgets are larger, faster, don't require finished product — just attribution.
2. Radar already produces sponsor-relevant data.
3. Named targets are AI infra companies with active devrel spend and known pain around event ROI.
4. A signed sponsor pilot becomes the named testimonial Builderbase has and Eventsea doesn't.

### Concrete offer

> **"Eventsea Sponsor Pilot — Q3 2026"**
> — $7.5K for one quarter of curated event placements (3–6 events) from radar
> — Attribution report: registrations, check-ins, prototypes shipped attributed to sponsor track
> — Logo + named testimonial in exchange for case-study rights
> — Founder-delivered (white-glove) for first 5 customers

Three price points to test (anchored, do not commit before calls):
- **$5K** — single-event sponsor placement, no attribution
- **$7.5K** — 3-event package + attribution PDF
- **$15K** — quarterly package + live dashboard + intros to 2 organizers

### Why not $499/event organizer test
- 18–24 months of compounding events to clear $200K ARR
- Tests a price founder already self-selected = foregone conclusion
- Doesn't unlock fundraising/hiring
- Sponsor pilots test the actual moat (audience graph, attribution) at the actual budget line

## 3. Sprint plan — ~18 founder-days

### Week 1 — Setup + warm intros (4 days)
- **Day 1:** Finalize 3-tier pilot offer doc. Wire `home.tsx:20` Book-a-Demo `alert()` → Calendly. 15-min fix.
- **Day 2:** Build outreach list of 25 sponsor targets: 4 named + 8 AI-infra (Replicate, Modal, Baseten, Together, Fireworks, Groq, Crusoe, Anyscale) + 8 dev/AI tooling (Pinecone, Weaviate, Chroma, Supabase, Vercel, LangChain, LlamaIndex, Unstructured) + 5 stretch (Anthropic devrel, OpenAI devrel, AWS startups, GCP startups, Azure for Startups).
- **Day 3:** Send 25 personalized cold emails. CC warm-intro paths. Target: 8 first calls booked.
- **Day 4:** Record 4-min Loom walkthrough of radar framed as "sponsor lens." Attach to outreach. Add "For sponsors: book 15-min ROI walkthrough" CTA — one CTA, no rebuild.

### Week 2 — Discovery calls (5 days)
- **Days 5–9:** Run 8–12 sponsor discovery calls. Founder takes every call. Strict script:
  1. What's your 2026 devrel/ecosystem budget by line item?
  2. How do you measure event ROI today? (Listen for "we don't.")
  3. If a tool gave attributable reach to 500 AI builders/quarter, what would finance approve without procurement?
  4. Show radar. Watch reaction.
  5. Pitch $7.5K pilot. Watch reaction.
  6. Get yes/no/maybe + decision-maker + timeline.

### Week 3 — Convert + iterate (5 days)
- **Days 10–11:** Synthesize calls. Adjust pricing/packaging based on pattern. Likely outcome: real price is $10K not $7.5K; real ICP narrower than "AI infra."
- **Days 12–14:** Send written proposals to top 4 prospects. 2-page PDF: scope, deliverables, $, timeline, success metric. Stripe payment link.

### Week 4 — Close + batched ops (4 days)
- **Days 15–17:** Close 1 paid pilot. Negotiate. Get signature. Take wire/Stripe.
- **Day 18 — "Batched Ops Day":** Single day for all deferred founder ops:
  - Stripe Atlas (Delaware C-corp + EIN) — $500, 2 hrs
  - Mercury account — 1 hr
  - YC SAFE template (reserve) — 30 min
  - Founder IP assignment + 83(b) — 1 hr
  - 1-page cap table spreadsheet — 30 min
  - Stripe live mode — 30 min

## 4. What I'd NOT do

### Defer: Delaware C-corp (until Day 18)
Stripe Atlas is 2-hour task that doesn't get easier or harder by timing. Don't burn a founder-day in Week 1 that should be in calls. Exception: if Week-2 prospect says "we can't pay an LLC, need C-corp," promote to that day.

### Defer: Pre-seed fundraise
With $0 ARR and no co-founder, pre-seed closes at $1.5M post on $4–6M cap if it closes. Same conversation with 3 signed sponsor pilots closes at $8–12M post and 4x option value. Cost of waiting 4 weeks: zero. Benefit: 4–6x valuation.

### Defer: First eng hire
$140K eng adds $12K/mo burn, compresses runway "indefinite" → "8 months." Founder is not currently bottlenecked. Trigger to revisit: 3 pilots + founder >50% time on support not sales.

### Defer: Builderbase clone / landing rebuild
Landing page is NOT bottleneck for sponsor pilots — direct outreach + Loom + Calendly is. Rebuilding based on pre-call assumptions = risk building wrong thing. After 12 sponsor calls, rebuild brief writes itself. Exception: fix the `alert()` Day 1 — 15 min, currently embarrassing on demo calls.

### Defer: Organizer-side $499 validation
Founder mentally committed to "Luma price." Running a test designed to confirm a prior is theater. Set organizer pricing after sponsor revenue subsidizes org PLG.

### Defer: Legal review of pilot contracts
Use 1-page MSA template (Common Paper, Stripe Atlas, Bonterms). $7.5K pilots don't need $400/hr review. Trigger to revisit: first contract over $25K.

## 5. Success metric

**Primary (binary, single number): 1 paid pilot signed, wire received, ≥$5,000.**

If hit: company has first revenue, first named testimonial, right to start fundraising/hiring from evidence not narrative.

**Secondary:**
- 8 sponsor discovery calls completed
- 2 signed LOIs (paid pilot intent)
- 12 documented sponsor objections → input to Week 5 landing rebuild
- 1 named testimonial agreed in principle

**Rip cord:** If by end of Week 3 we have **zero verbal yeses across 10+ calls**, the wedge is wrong. Pivot Week 4 to organizer-side $499 validation with 10 hackathon organizer calls. Do NOT continue down sponsor path on hope.

## 6. Risks

1. **Founder burnout from sales-only sprint.** Budget 2 days of slack; pair call days with recovery activity.
2. **Sponsors say yes but can't sign before Q3 end.** Ask for verbal commitment + invoice date, not signature, as Week 4 metric.
3. **Conflict with existing landing commitments.** Explicit deferral above; council approves or rejects.
4. **Solo founder bandwidth on integrations.** Pilot deliverable is PDF report, founder-deliverable in <1 day per customer.

## 7. Decision asked

Approve priority, deferrals, success metric. Vote at Friday council meeting. If approved, sprint starts Monday with Day 1 outreach build.

## Critical files

- `client/src/pages/home.tsx` (Day 1: replace `alert()` line 20 with Calendly)
- `client/src/components/hero-section.tsx` (Week 1: minor copy for sponsor-facing CTA)
- `docs/builderbase-prd-analysis.md` (input)
- `docs/builderbase-clone-plan.md` (input — phasing deferred to week 5+)
