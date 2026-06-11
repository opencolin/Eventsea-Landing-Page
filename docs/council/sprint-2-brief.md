# Sprint 2 Council Brief — to be reviewed at end of Sprint 1

> This is the brief for the *second* council convening, scheduled for end of Sprint 1 (≈ 4 weeks after Sprint 1 kickoff). Do not run this council until Sprint 1 reports back with primary-metric data.

## When to convene

Trigger: end of Sprint 1 (Week 4 of the validation sprint per `decision.md`). If Sprint 1's primary metric (1 paid pilot ≥$5K) hits before Week 4, convene early — momentum is the asset. If it slips, convene on schedule and discuss the rip cord.

## What the council reviews

Five inputs, four decisions, one output.

### Inputs

1. **Sprint 1 primary metric.** Did we sign a paid pilot ≥$5K? Yes/no with the contract attached. Owner: Founder/Ops.
2. **Sprint 1 secondary metrics.** From `decision.md`:
   - 8 sponsor discovery calls held (yes/no)
   - 2 signed LOIs (count)
   - 12 documented sponsor objections (link to doc)
   - 1 named testimonial agreed in principle (yes/no)
   - Show HN result: top-10 hours, points, comments
   - 250 calendar audit submissions (count)
   - 40 qualified inbound leads (count)
3. **Sponsor call notes.** Synthesis of the 8–12 discovery calls. What did sponsors say about budget, ROI, ICP, objections?
4. **Honest-page production data.** From v0.1.1: how many audit submissions came in? What's the inbox showing about quality of inbound?
5. **Founder runway / health check.** Days of personal runway left, founder burnout status, any health flags from a 4-week sales-only sprint.

### Decisions

#### Decision 1 — Did Sprint 1 succeed, fail, or stall?

| Outcome | Definition | Sprint 2 implication |
|---|---|---|
| **Success** | ≥1 paid pilot, ≥$5K, signed contract | Proceed to "Decision 2 — Build or scale?" |
| **Stall** | 0 paid but ≥2 LOIs + ≥6 calls held with real engagement | Extend Sprint 1 by 2 weeks; re-pitch the LOIs |
| **Failure** | 0 LOIs OR <6 calls held with engagement | Execute the rip cord (Decision 3) |

#### Decision 2 (if Sprint 1 succeeded) — Build the audit pipeline (v0.2) OR run more sponsor pilots?

Two competing paths:

**Path A: Run more sponsor pilots (Sprint 2 = Sprint 1 ×2).**
- Pros: revenue compounds, the founder-as-operator playbook is repeatable, we don't take on engineering risk.
- Cons: operator-bottlenecked; no product moat being built; eventually founder can't keep up.
- Trigger to pick: Sprint 1 hit primary AND the founder has clear capacity for 5–10 more concierge pilots without engineering help.

**Path B: Build the audit pipeline (Product PM's v0.2 plan).**
- Pros: removes the operator bottleneck; unlocks self-serve; opens the door to Sprint 3+ product features (digest, teams, marketplace).
- Cons: 40 eng-days of investment before the next revenue increment; requires hiring or contracting at least 1 engineer.
- Trigger to pick: Sprint 1 hit primary AND ≥4 paying customers point at "I want this in a dashboard, not a PDF" as the gating ask.

The council picks ONE of these. Mixed strategy ("a little of both") is the failure mode.

#### Decision 3 (if Sprint 1 failed) — Rip cord pivot

Per `decision.md`, the rip cord is: pivot to organizer-side validation. 10 hackathon organizer calls testing $499/event WTP in Week 5–6.

If rip cord is pulled, freeze v0.2 indefinitely. The Founder/Ops PM convenes a new council with revised target customers and metric.

#### Decision 4 — Founder ops batched-day outcomes

Day 18 of Sprint 1 was supposed to handle incorporation, Mercury, SAFE template, 83(b), Stripe live mode. Confirm done OR slip into Sprint 2 Day 1. If slipped, root-cause why and add buffer.

### Output

A new `docs/council/decision-2.md` documenting:
- Sprint 1 retrospective
- Sprint 2 priority (Path A, Path B, or rip cord)
- Updated release ladder if any branches change status
- Next council convening date

## Pre-council reading for council members

In addition to this brief, each council member should re-read:
- Their own Sprint-1 proposal in `docs/council/*-proposal.md`
- `docs/council/decision.md`
- The Sprint 1 retrospective notes (location: `docs/council/sprint-1-retro.md`, to be created by the founder before the council convening)

## A note on counter-factuals

Before voting, the council should ask: "If we'd picked the opposite of what we did in Sprint 1, what's the case we'd be in better shape now?" If anyone can construct a plausible better world, the original decision should be re-litigated, not just rationalized.

## Heuristic on declaring victory

A paid pilot is not victory. **A paid pilot from the named target list, with the named target willing to renew at full price OR with month-2 expansion conversations active**, is victory. If the pilot was discounted, friendly, or expansion-blocked, treat it as a yellow-flag stall, not a green-flag success.
