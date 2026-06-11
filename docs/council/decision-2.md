# Council Decision 2 — Sprint 1 amendments + v1 implementation kickoff (2026-06-11)

> Synthesis of 3 PM proposals filed after the PRD landed. Decided by the chair.
> Proposals: [`build-pm-proposal.md`](./build-pm-proposal.md), [`gtm-pivot-pm-proposal.md`](./gtm-pivot-pm-proposal.md), [`tech-architect-proposal.md`](./tech-architect-proposal.md).
> Supersedes nothing; **extends** `decision.md` and `addendum-prd-validation.md`.

## Vote summary

| PM | Recommendation |
|---|---|
| Build PM | Ship single-event productized v1 inside this repo. 6-week sequence: gate first, ingest, light tier (load-bearing), deep+influence+dashboard, exports+Top-N (cuts: judges→CLI, FR8→manual), harden. Demo = the gated dashboard URL itself. |
| GTM Pivot | Focus 6 not 25 accounts. Re-price $7.5K/$12.5K/$25K. New metric: ≥$12.5K + ≥3 calls + ≥1 BuilderShip-adjacent close. Mitigate artifact-anchor inflation with Day-1/7/14 staged delivery. |
| Tech Architect | 3 hardest-to-reverse calls: per-event-unique attendee identity, in-process pipeline (defer Inngest to v1.1+), server-rendered `/d/:slug` HTML+embedded JSON (NOT SPA route). Full Drizzle schema sketched. FR9 gate: bcrypt password + HMAC HttpOnly cookie `es_event_<eventId>`. |

## Convergence

All three converge on the same operational picture:
- **Stop pretending v1 is gated on validation.** It's gated on engineering. The wedge is proven; ship the productized version.
- **The dashboard is the product.** GTM PM frames it as the lead asset for the 6 accounts. Build PM frames it as the v1 demo. Tech Architect frames it as the gate-anchored deliverable. Same artifact, three lenses.
- **PII gate is non-negotiable and lands first.** Build PM ships FR9 in week 1. Tech Architect makes the gate the architectural contract. GTM PM frames the staged delivery so sponsors trust the gate by default.

## Disagreements (resolved)

**The build vs sell sequencing.** Build PM implies 6-week build, then sell. GTM PM implies sell now (Week 1) with BuilderShip artifact. These are not in conflict — they run in parallel. GTM PM lands new revenue against the *prototype* (`list.ship.builders`) for the 6 accounts while the v1 build replaces the prototype for the 4-6 weeks ahead. The pilot delivery in weeks 1–4 uses the skill manually; by week 6 the productized v1 fulfills the next sale.

**Architecture timing.** Tech Architect's "defer Inngest to v1.1+" + "in-process orchestrator" line up cleanly with Build PM's 6-week sequence. No conflict.

**Pricing.** GTM PM moves the metric to $12.5K. Build PM's FR sequence is independent of price — same code, higher anchor. Build PM's "shippable to sponsor #3" matches GTM PM's Package B (gated dashboard included as standard).

## Decision

**Run both tracks in parallel for 6 weeks. Land first commercial revenue against the prototype while v1 builds.**

### Track 1 — GTM (5 founder-days/week, weeks 1–6)
Per `gtm-pivot-pm-proposal.md`. The 5-day action sequence is binding:
- **Day 1 (Mon)**: Re-price + re-scope (6 accounts, $7.5K/$12.5K/$25K, primary metric updated).
- **Day 2 (Tue)**: Rebuild touch-1 asset stack (master Loom + 6 intro Looms + case-study PDF).
- **Day 3 (Wed)**: Send 6 personalized touch-1 emails.
- **Day 4 (Thu)**: Update objection + discovery script for BuilderShip lead.
- **Day 5 (Fri)**: Triage replies + Week-3 broadening trigger decision.

**Files to amend immediately:**
- `docs/gtm/sponsor-pilot-offer.md`
- `docs/gtm/target-list.md`
- `docs/gtm/5-touch-sequence.md`
- `docs/gtm/discovery-call-script.md`
- `docs/gtm/objection-handling.md`
- `docs/council/decision.md` § primary metric

### Track 2 — Build (1–2 engineers, weeks 1–6)
Per `build-pm-proposal.md` and `tech-architect-proposal.md`. The 6-week FR sequence is binding:

| Week | Build PM goal | Tech Architect's hardest call |
|---|---|---|
| 1 | Foundations + FR9 gate first | Per-event bcrypt password + HMAC HttpOnly cookie `es_event_<eventId>`. Login renders zero lead data — `curl /d/:slug \| grep -c <anyAttendeeEmail>` = 0. |
| 2 | FR1 ingest complete | Drizzle schema + DbStorage; CSV parser with utf-8-sig BOM tolerance. |
| 3 | FR2 light tier + FR3 scorer | In-process pipeline orchestrator + idempotent step keyed on `(eventId, attendeeId, stepName)`. Light tier first (load-bearing) — golden-set CI ≥90%. |
| 4 | FR2 deep + FR4 influence + FR5 dashboard | Server-rendered `/d/:slug` HTML + embedded JSON. Dashboard client bundle separate from marketing SPA. |
| 5 | FR7 export + FR6 builders (CUTS: FR6 judges → CLI, FR8 → manual) | Client-side CRM CSV (HubSpot + Salesforce variants, UTF-8 BOM, filter-aware filename). |
| 6 | FR9 delete + cost report + verify deploy | `DELETE /api/events/:slug/attendees/:id` cascades. Per-event $ report. Post-deploy verification script. |

**Build worktrees** (3 in parallel, off main):
- `release/prd-v1-csv-upload` — primary, weeks 1–6 work
- `release/prd-v1.1-luma-api` — spec deepening only this sprint
- `release/prd-v2-autonomous` — spec deepening only this sprint

### Track 3 — Pilot delivery via skill (founder, on-demand)
When any of the 6 accounts signs:
- Use `.claude/skills/event-leads/SKILL.md` per `docs/operations/sponsor-pilot-delivery.md`.
- Stage delivery Day-1 (kickoff + ICP capture), Day-7 (light tier), Day-14 (gated dashboard live).
- Once v1 ships (end of week 6), all new pilots fulfill via v1 instead of manual skill invocation.

## Updated success metric

**Sprint 1 primary (binary):** by end of week 4, **1 paid pilot ≥$12.5K (Package B) signed AND ≥3 discovery calls completed AND ≥1 BuilderShip-adjacent account closed.**

**Sprint 1 secondary (signal):**
- 6 of 6 sent touch-1 by EOD Wednesday Week 1
- ≥3 of 6 booked discovery calls by EOD Friday Week 1 (Week-3 broadening trigger)
- BuilderShip permission obtained for Show HN re-frame
- Pilot delivery SOP (`docs/operations/sponsor-pilot-delivery.md`) used for any signed deal

**v1 build secondary:**
- End-of-Week-6 are-we-shippable test from `build-pm-proposal.md` passes
- Golden-set regression in CI at ≥90% verdict agreement

## Rip cord (updated)

Per `gtm-pivot-pm-proposal.md` § "What this proposal does NOT change": *"if 0 verbal yeses across all Sprint 1 outbound (cold + warm + HN inbound) by end of Week 3, pivot to organizer-side $499 validation."*

The build track does NOT halt on rip cord — v1 is useful regardless of whether sponsor #3 closes at $12.5K or organizer-side surfaces a different ICP. The architecture is identical; only the UI copy + pricing config change.

## Hard non-goals for this 6-week sprint

- No Luma API ingestion (v1.1).
- No autonomous mode (v2).
- No multi-tenant signup.
- No HubSpot/Salesforce direct API push.
- No judge panel UI (CLI fine for v1).
- No update-loop automation.
- No fundraising calls.
- No hiring beyond what's needed for the 1–2 engineer build track.

## What happens at end of week 6

A Sprint 3 council convenes with:
- Sprint 1 retro filled in (`docs/council/sprint-1-retro-template.md`)
- Are-we-shippable test results
- Sponsor #3 status (signed / negotiating / dead)
- Pilot delivery cycle count and cost per pilot

The council picks v1.1 (Luma API) or v2 (autonomous) as Sprint 3 primary based on whether revenue justifies engineering investment.

## Next agent pickup

Read in order:
1. `docs/PRD.md`
2. `docs/council/decision.md`
3. `docs/council/addendum-prd-validation.md`
4. `docs/council/decision-2.md` (this file)
5. `docs/council/build-pm-proposal.md` + `tech-architect-proposal.md` for the build track
6. `docs/council/gtm-pivot-pm-proposal.md` for the GTM track
7. `docs/gtm/day-1-checklist.md` (will need amendments per Track 1 above)
8. The release doc for the track you're picking up.
