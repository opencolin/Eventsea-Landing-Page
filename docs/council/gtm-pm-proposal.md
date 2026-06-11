# GTM/Sales PM Proposal — 4-Week Sprint to Paid Pilots

**Author:** GTM/Sales PM, Eventsea Founding Council
**Date:** 2026-06-11

## TL;DR

Run a manually-fulfilled "Sponsorship Radar" concierge pilot against Nebius, vCluster, Tavily, LanceDB. Use Event Radar MVP as the back-end tool (PM operates it), deliver a written sponsor-fit report inside 5 business days, charge $49/seat/month for continued access. The landing-page wedge is the top of funnel; the prototype is the fulfillment engine; outbound to four named accounts is the demand. Everything else waits.

**Success metric:** 2 of 4 named accounts on paid pilot ($49+/mo) by end of week 4, ≥1 signed multi-month commitment.

## Why this, not something else

Three assets and one liability:
1. Shipped landing page with a working audit form.
2. Real radar prototype (LanceDB hybrid search, P1/P2/P3 over 17 Luma sources).
3. Four named, warm, ICP-perfect accounts.
4. **Liability:** `/api/calendar-audit` never delivers an audit. The homepage promise ("we'll email your full audit within 24 hours") is a lie. Concierge fulfillment closes it with zero engineering.

Founder wants Luma-priced ($20–50/seat). That only works if buyers self-serve eventually AND we book pilots now. Not ready for self-serve; ready for concierge.

## Artifact list

### Week 1 — Targeted outbound + fulfillment SOP
1. **Account briefs** (~1 PM-day) — one-pager per target: events sponsored last 6 months, DevRel lead names, the semantic slider that maps to their ICP, the lead P1 insight.
2. **5-touch outbound sequence per account** (~1.5 PM-days). Touch 1: cold email + Loom of radar filtered to their ICP. Touch 2: ranked CSV of 10 events to sponsor. Touch 3: LinkedIn mirror. Touch 4: warm intro request. Touch 5: closing-loop email.
3. **Concierge SOP** (~0.5 PM-day) — inbound URL → operator runs radar → Notion doc with scoring + top-10 + co-sponsors + outreach drafts → PDF email within 5 business days.
4. **Homepage promise fix** (~0.25 eng-day) — change "within 24 hours" to "within 5 business days" in `calendar-audit-form.tsx`. Route submissions to Resend/Slack webhook.

### Week 2 — Discovery calls + pilot proposal template
5. **20-min discovery calls** (target: 6 booked, 4 held; ~2 PM-days). Confirm buyer + budget authority + the one event-sponsorship decision in next 30 days; offer concierge pilot.
6. **Pilot proposal template** (~0.5 PM-day). 30-day concierge pilot, 2 seats, $99/mo (priced as 2 × $49). Auto-converts month-to-month at day 30. Stripe payment link.
7. **Anonymized sample report** (~1 PM-day). Used as touch-2 attachment and demo prop.

### Week 3 — Run first 2 pilots, instrument feedback
8. **Operator pilot delivery** (~3 PM-days). Every report ends with three questions: "Which event will you actually sponsor?", "What filter did you wish existed?", "Who else should see this?" Feeds product roadmap.
9. **Light analytics** (~0.5 eng-day) — PostHog or Plausible events for audit submit, demo CTA, pricing view.

### Week 4 — Close, expand, learn
10. **Conversion push** (~2 PM-days). Week-1–2 cold → discovery; pilots → multi-month or multi-seat. Week-4 close ask: "Continue at $99/mo, or upgrade to $199/mo for 5 seats + weekly walkthrough?"
11. **Post-mortem + Council readout** (~0.5 PM-day).

**Total: ~12 PM-days + ~0.75 eng-days. One PM carries it.**

## What I would NOT do

- **No Builderbase clone (Scope A or B).** A 7-month roadmap doesn't help us hit $99 ARR next month.
- **No productizing Event Radar.** Login/billing/multi-tenant is wasted until ≥5 pilots paying.
- **No broadening to biotech.** Founder mandate puts them later.
- **No organizer-side outbound.** Supply side, no budget. Sponsors have budget today.
- **No pricing redesign.** $49/seat is enough for a pilot.
- **No fixing the in-memory backend.** Concierge means the operator is the database.

## Success metric

**By end of Week 4: 2 of 4 named accounts on paid pilot at ≥$49/mo, with ≥1 signed to a 3-month commitment.**

Secondary: ≥4 discovery calls held, ≥10 concierge reports delivered, ≥3 specific feature requests feeding next sprint.

## Critical files

- `client/src/components/calendar-audit-form.tsx` — homepage promise to update
- `server/routes.ts` — `/api/calendar-audit` to wire to real inbox
- `client/src/pages/home.tsx` — `handleBookDemo` currently mailto, should route to real booking link
- `server/storage.ts` — in-memory storage will leak submissions on restart
