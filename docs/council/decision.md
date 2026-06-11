# Council Decision — Sprint 1 (2026-06-11)

> Synthesis of 4 PM proposals. Decided by the chair (the founding council orchestrator).
> Proposals: [`gtm-pm-proposal.md`](./gtm-pm-proposal.md), [`marketing-pm-proposal.md`](./marketing-pm-proposal.md), [`product-pm-proposal.md`](./product-pm-proposal.md), [`founder-pm-proposal.md`](./founder-pm-proposal.md).

## Vote summary

| PM | Recommendation | Headline metric |
|---|---|---|
| GTM | Concierge "Sponsorship Radar" pilot, $49/seat to the 4 named accounts | 2 of 4 paid pilots, ≥1 multi-month |
| Marketing | Show HN with "I audited 200 AI conferences" | 2 of 4 named targets booked, HN top-10 |
| Product | Build the audit pipeline so the wedge promise is real | 50 fulfilled audits at ≥4.0/5 quality |
| Founder/Ops | $7.5K Sponsor ROI Pilot to 25 sponsors (4 named + 21 analogs) | 1 paid pilot signed, wire received ≥$5K |

## The disagreements

**Price point.** GTM PM says $49/seat/mo (PLG-like floor). Founder/Ops PM says $7.5K quarterly (enterprise pilot). These are different bets, not different tactics. Founder/Ops is more strategically correct for *first* revenue: sponsor budgets are 15-30x larger, exist today, and signed pilots unlock fundraising leverage. $49/seat is the right floor for *self-serve* later.

**Build vs sell.** Product PM is the only voice saying "fix the wedge first — the form is a lie." Strategically correct, but a 40 eng-day spend before any customer signal is misallocation. The lie can be neutralized cheaply (copy fix + concierge fulfillment) while we learn what to build.

**Marketing vs outbound.** Marketing PM (Show HN) and GTM PM (direct outbound) appear to compete; in fact they compound. Show HN produces a credibility receipt that warms outbound to the same 4 targets. Run both in parallel; sequence Show HN for Week 3 so outbound Week 1–2 lands cold and Week 3 lands warm.

## Decision

**Sprint 1 (weeks 1–4): Run the Founder/Ops PM plan as primary, with Marketing PM's Show HN as concurrent amplifier and one GTM PM fix landing immediately. Defer the Product PM's pipeline build to Sprint 2, conditional on revenue.**

### Primary track — Sponsor ROI Pilot validation (founder, ~18 founder-days)
Per [`founder-pm-proposal.md`](./founder-pm-proposal.md):
- Outreach list of 25 sponsors (4 named + 21 analogs)
- 5-touch cold sequence per account
- 8–12 discovery calls in Week 2
- Proposals + close in Weeks 3–4
- Single Stripe Atlas "batched ops" day on Day 18
- **Primary metric: 1 paid pilot signed, wire received, ≥$5K**

### Concurrent track A — Show HN proof drop (content lead, ~17 content-days)
Per [`marketing-pm-proposal.md`](./marketing-pm-proposal.md):
- Audit-200 corpus + leaderboard
- Public audits of YC + AI Engineer Summit calendars
- Private audits of 4 named targets as outbound payload
- **Show HN, Tue 9am PT, Week 3**
- Twitter + LinkedIn amplification T+2h / T+24h
- **Concurrent metric: 2 of 4 named targets booked discovery calls (this is also Marketing PM's primary)**

### Immediate fix (engineer, < 1 day)
Per [`gtm-pm-proposal.md`](./gtm-pm-proposal.md):
- Change "within 24 hours" → "within 5 business days" in `client/src/components/calendar-audit-form.tsx`
- Wire `POST /api/calendar-audit` to forward submissions to a real inbox (Resend webhook or Slack webhook) so the founder sees them
- Replace `home.tsx:20` `alert()` with Calendly link (the founder will provide it; in the meantime, a `mailto:` is already in place)

### Deferred to Sprint 2 (conditional)
Per [`product-pm-proposal.md`](./product-pm-proposal.md):
- The full 40-eng-day audit pipeline build
- **Trigger to start:** ≥$5K revenue from a sponsor pilot AND ≥4 paying-customer feature requests pointing at the pipeline being the bottleneck.
- **If trigger not hit by end of Sprint 1:** re-evaluate. Either the price/wedge is wrong (rip cord) or the pipeline is premature.

### Hard non-goals for Sprint 1
- No Builderbase clone work
- No Event Radar productization
- No self-serve auth
- No multi-tenant orgs
- No incorporation before Day 18
- No fundraising calls
- No hiring
- No broadening to medical/biotech vertical
- No organizer-side pricing test ($499/event)
- No paid ads
- No ProductHunt

### Rip cord
Per Founder/Ops PM: if ≥10 sponsor calls completed by end of Week 3 with **zero verbal yeses**, the wedge is wrong. Pivot Week 4 to organizer-side validation: 10 hackathon organizer calls testing $499/event WTP. Do NOT continue down sponsor path on hope.

## Why this synthesis

Three of four PMs converged on a customer-led motion. They disagreed on price and tactic but agreed: don't productize before learning. The Product PM's concern (the form lies) is real, but addressable at 0.25 eng-days via copy + concierge fulfillment — not 40 eng-days via a real pipeline.

The Founder/Ops price point ($7.5K) is the right primary because:
1. **It unlocks fundraising.** $49/seat customers don't move investor pattern-match. A $7.5K AI-infra sponsor pilot does.
2. **It tests the moat.** The audit + matchmaking is genuinely worth $7.5K to a sponsor with a real devrel budget. We need to learn whether that's true.
3. **The $49 floor isn't going anywhere.** We can validate it in Sprint 2 once we have revenue underwriting the bet.

The Marketing track runs in parallel because Show HN is a *one-shot* moment — slip it and it slips a quarter. Outbound + Show HN compound on the same week 3 inflection.

## What gets built where

| Work item | Branch | Worktree | Owner |
|---|---|---|---|
| Honest-page copy fix + Calendly wire-up + form-to-inbox | `release/v0.1.1-honest-page` | `../eventsea-v0.1.1` | Engineer (this session) |
| Show HN proof asset: audit corpus draft, sample report, blog post stubs | `release/v0.1.2-show-hn-proof` | `../eventsea-v0.1.2` | Content (background agent) |
| Sponsor outbound docs: account briefs template, 5-touch sequence template, pilot proposal template | `release/v0.1.3-sponsor-outbound` | `../eventsea-v0.1.3` | GTM (background agent) |
| Audit pipeline spec — full v0.2 release doc | `release/v0.2-audit-pipeline` (placeholder) | (no work this sprint) | Product (Sprint 2) |
| v0.3 / v1.0 / v1.5 / v2.0 spec docs | placeholder branches | (no work this sprint) | (future sprints) |

## End-of-sprint readout

A second council convenes at end of Week 4 to review:
1. Did the primary metric hit? (1 paid pilot ≥$5K?)
2. Did the concurrent metric hit? (2 of 4 booked discovery calls?)
3. What did sponsor calls teach us about pricing, ICP, deliverables?
4. Sprint 2 priority — pipeline build (Product PM plan) OR org pricing pivot (rip cord) OR sponsor expansion (more pilots, same playbook)?
