# Council addendum — PRD reveals the wedge is already validated

> Filed: 2026-06-11, after `docs/PRD.md` was delivered.
> Status: ADVISORY. Does not override `decision.md` but materially changes the calculus for the Sprint 2 council convening.

## What the PRD changed

The Sprint 1 council (`decision.md`) chose the Founder/Ops PM's sponsor pilot validation plan as primary, with a 4-week target of "1 paid pilot signed, wire received, ≥$5K." That target was set on the assumption that *no pilots had run yet* — i.e., the wedge needed market validation.

The PRD reveals the wedge has already been validated by two manual pilots:

| Pilot | Registrants | Tier split | Concrete output |
|---|---|---|---|
| **SIA Hackathon** | 197→213 | not stated | Enriched lead sheet; 19 project repos cloned + reviewed; public showcase site shipped |
| **BuilderShip Yacht Hackathon** | 726 | 90 deep / 636 light (327 V / 237 P / 41 U) | ~15 competitors flagged; ~10 inflated/false claims caught; 2 throwaway identities; 97 strong leads surfaced; gated dashboard at `list.ship.builders`; HubSpot+Salesforce export validated 726×22; 5 update cycles diffed and redeployed |

The prototype is live at `https://list.ship.builders` (password-gated). The skill, the PRD, and the prototype are mutually consistent and battle-tested.

## What this means for Sprint 1

The Sprint 1 decision still stands — the founder still needs to convert the validated wedge into commercial revenue. But the metric and emphasis shift:

| Sprint 1 element | Original framing | Updated framing (post-PRD) |
|---|---|---|
| Primary metric | "1 paid pilot ≥$5K — does anyone pay?" | "Convert ≥1 of the existing pilot relationships (SIA, BuilderShip) into a paid commercial contract OR sign 1 net-new sponsor ≥$5K." |
| Outbound posture | Cold + ICP-fit hypothesis | Cold + reference to the two pilot dashboards. The named-target audits in `docs/marketing/` become MUCH stronger when accompanied by "we already did this for BuilderShip's 726-person event — here's the dashboard." |
| Pilot offer (`docs/gtm/sponsor-pilot-offer.md`) | Three tiers ($5K/$7.5K/$15K), positioned as "test our service" | Same tiers, but repositioned as "production service — see what we shipped for BuilderShip." Higher conversion rate at the same price. |
| Pricing leverage | Wide range — discounts likely | Anchored on demonstrated value. $7.5K is no longer aspirational; it's underwritten by the BuilderShip output. |
| Discovery call script | "What's your event ROI pain?" | "Show the BuilderShip dashboard, ask which of the four PRD personas they map to." |
| Show HN angle | "I built an event analyzer" | "I audited two real hackathons end-to-end — here's the BuilderShip dashboard." The proof IS the product, not a pitch deck. |
| Rip cord trigger | 0 verbal yeses across 10+ calls by end of Week 3 | Same trigger. But likelihood of needing it is materially lower with the BuilderShip artifact in hand. |

## Recommendations for the founder

Two concrete adjustments to the Day-1 work (`docs/gtm/day-1-checklist.md`):

1. **Surface the pilots immediately.** Update outbound touch 1 in `docs/gtm/5-touch-sequence.md` (and the briefs the founder writes) to lead with "we did this for BuilderShip — 726 registrants, 327 V / 237 P / 41 U, here's the gated dashboard" instead of a Loom of the radar prototype filtered to the recipient's ICP. The dashboard is stronger evidence than the radar.
2. **Ship the BuilderShip case study.** Either as a public blog post (with the sponsor's permission) or as a private one-pager attached to each cold email. This is the highest-leverage marketing artifact and it's already produced.

## What this means for Sprint 2

The Sprint 2 council (`sprint-2-brief.md`) was designed to decide between *Path A* (run more sponsor pilots) and *Path B* (build the audit pipeline). The PRD effectively says: **the path is Path B but the actual v0.2 is the lead-analysis CSV product, not the calendar audit pipeline.**

Concretely:
- The Product PM's audit pipeline plan (`product-pm-proposal.md`) targets the *paste-your-Luma-calendar* wedge from the landing page. It's not wrong, but it's not the wedge the manual pilots validated. The pilots validated the *upload-your-attendee-CSV* flow.
- The new skill-track v0.2 (`docs/releases/v0.2-lead-analysis-csv.md`) IS the product the PRD defines and the pilots proved.
- The Sprint 2 council should pick the skill track as primary v0.2, defer or repurpose the marketplace-track v0.2 (calendar audit pipeline) as a secondary marketing wedge.

## Net-net

The council's process was correct. The deliberation framework, the deferrals, and the rip cord are all valid. What changed is the *prior probability of Sprint 1 succeeding* — it went from "unknown, hence test it" to "high, given the two pilots already shipped." The founder should ride that prior into every sponsor conversation in Sprint 1.

## What does NOT change

- The two env vars the founder must set (`VITE_CALENDLY_URL`, `AUDIT_WEBHOOK_URL`) still need values.
- The founder review items in `docs/HANDOFF.md` still need clearing before publishing externally (Swyx permission, named-target audit consent, etc.).
- The Sprint 1 retro template (`sprint-1-retro-template.md`) is still due before the Sprint 2 council.
- Hard non-goals in `decision.md` § "Deferred to Sprint 2 (conditional)" still apply — don't broaden vertical, don't hire, don't fundraise until revenue.
