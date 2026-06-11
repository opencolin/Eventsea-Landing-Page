# GTM Pivot PM Proposal — Sprint 1 amendments post-PRD

> Filed: 2026-06-11, after `docs/PRD.md` and `docs/council/addendum-prd-validation.md`.
> Status: PROPOSAL to the 3-person post-PRD council. Ratifies the addendum and extends it with operational changes that must land BEFORE touch 1 goes out.

## Position

I **ratify** the addendum and **extend** it on four operational decisions the addendum left soft. The wedge is validated; the sprint plan should now optimize for *conversion velocity on a concentrated cohort*, not breadth of cold outbound. We have an artifact (726-registrant gated dashboard, HubSpot+Salesforce export validated 726×22, 5 update cycles) that is the equivalent of a paid case study. Spraying it across 25 cold targets dilutes its compounding effect (each send is one of N; the right send is one-of-one).

## The four decisions

### 1. Focus on 6, not 25.

**Decision:** Cut active Week-1 outbound from 25 to **6** — the 4 Tier-1 named (Nebius, vCluster, Tavily, LanceDB) **plus 2 BuilderShip-adjacent sponsors** (the ones whose logos appeared on `list.ship.builders`, who already know the artifact's quality). Park the other 19 as a Week-3 wave conditional on the 6 producing ≥3 discovery calls.

**Why:**
- The BuilderShip dashboard is a 1-shot credibility instrument. Sending it to 25 cold inboxes treats it as a brochure; sending it to 6 with a per-account "here's what your version would look like" treats it as a proposal.
- 21 analog Tier-2/3 accounts in `target-list.md` are *category bets*, not *account bets*. The pilots prove the wedge converts on category-fit; we don't need to test that breadth in Week 1. We need first revenue.
- Compute math: 6 accounts × (deep Loom on their event + 1-page case-study attached) = ~3h founder time per account = 18h. 25 accounts × shallower outbound = same hours, lower hit rate per touch. The artifact rewards depth.

**Amend:** `docs/gtm/target-list.md` § Sequencing — replace Week 1 Day 3 "send touch 1 to all 25" with "send touch 1 to the 6 high-conviction accounts; queue the other 19 for Week 3 contingent on discovery-call yield." Add a column "BuilderShip artifact fit (high/med/low)."

### 2. Re-price: $7.5K floor; $25K ceiling.

| Tier | Old | New | Rationale |
|---|---|---|---|
| A | $5,000 (single event) | **$7,500** (single event) | Deliverable is no longer "we'll try" — it's "we shipped this for 726 attendees; same playbook on yours." A $5K anchor invites haggling on validated work. |
| B | $7,500 (quarterly) | **$12,500** (quarterly + dashboard) | Move gated dashboard (the BuilderShip mechanic) into B as **standard**, not as the C upgrade. Live dashboard is the demonstrated artifact; making it default in B captures the value of what we've already proven we can ship. |
| C | $15,000 (quarterly + dashboard + 5 intros) | **$25,000** (multi-event + dashboard + 5 intros + 1-click HubSpot/SF export) | The 726×22 CRM export is a discrete, proven, sales-ops feature. Sponsors with active sales pipelines pay five figures for it alone. $25K is a clean PO threshold above the $15K manager-approval line. |

**Why up, not down or same:**
- Pricing tracks demonstrated risk-removal. Pre-PRD, $7.5K was "buyer takes delivery risk." Post-PRD, $7.5K is a discount to a sponsor looking at a working dashboard their peer (BuilderShip) already used. The discount is unearned.
- $5K was a "no-budget-approval-needed" fallback. With the artifact, that fallback compresses our anchor. Better to lose 30% of price-sensitive prospects than to compress 100% of buyers down 30%.

**Amend:** `docs/gtm/sponsor-pilot-offer.md` — rewrite three packages with new prices, move dashboard into B, add CRM export as C headline. **Amend** `docs/gtm/discovery-call-script.md` Q5 — replace "$7.5K pilot" with "$12.5K Package B."

### 3. Re-shape the success metric.

**Decision:** Change from *"1 paid pilot signed ≥$5K"* to **"1 paid pilot ≥$12.5K (Package B at new pricing) AND ≥3 discovery calls completed AND ≥1 converted from a BuilderShip-adjacent account."**

**Why this shape:**
- Raising just the dollar tests price, not motion. Three calls + one close tells us the funnel converts at a usable rate.
- Requiring 1 BuilderShip-adjacent close tests whether the *artifact* converts versus the founder's pitch. If artifact-adjacent closes and cold-Tier-1 stalls → only prospect into artifact-adjacent networks in Sprint 2. Inverse → the artifact is hype and the pitch is the real product.
- $12.5K (Package B anchor) is the cleanest signal; $15K is Package-B-with-upsell, harder to read.

**Amend:** `docs/council/decision.md` § Primary track metric. **Amend** `docs/council/sprint-1-retro-template.md` to log all three sub-metrics separately.

### 4. The biggest risk introduced by leading with BuilderShip.

**Headline risk: artifact-anchor inflation.** Sponsors see `list.ship.builders` and assume Day 1 of *their* pilot delivers an equivalently polished gated dashboard with their logos, attendees, and CRM export already live. We then face a Week-2 delivery cliff where the founder is manually re-running a pipeline that, for BuilderShip, took multiple cycles to converge.

This is more dangerous than the obvious "sponsors expect 726 attendees" risk because *scope* expectation is what kills first deliveries, not *scale*. The BuilderShip dashboard exists because of 5 update cycles, sponsor-side feedback, and access to the registration data. A new sponsor pilot doesn't have those preconditions on Day 1.

**Mitigations BEFORE touch 1 ships:**
1. **Reframe BuilderShip as a *finished* artifact, not a *Day-1* artifact.** Touch 1 says *"this is what week 3 of your pilot looks like"* — not "this is what you get."
2. **Add a Day-1/Day-7/Day-14 milestones table to `sponsor-pilot-offer.md`** showing staged delivery: Day 1 kickoff + ICP capture, Day 7 preliminary screening (light tier), Day 14 gated dashboard live.
3. **Add a sponsor-data-readiness clause.** Pilot clock starts when sponsor delivers (a) registration CSV access, (b) ICP definition, (c) sponsor-product list. Built-in slippage protection.
4. **Update `docs/gtm/objection-handling.md`** with: *"Will mine look exactly like BuilderShip's on Day 1?"* → response: *"It will look like BuilderShip's by Day 14; here's the staged delivery."*

**Secondary risk:** BuilderShip-specific competitive flags (~15 competitors caught) are *retroactive*. If a target asks "can you identify competitor X attending event Y *before* it happens," answer "yes, with registration CSV in hand on Day 1." Don't oversell forward-looking competitive intel until v1.1+.

## 5-Day action sequence

**Day 1 (Monday) — Re-price and re-scope. ~3h.**
- Edit `docs/gtm/sponsor-pilot-offer.md`: new prices ($7.5K/$12.5K/$25K), dashboard moves into Package B, CRM export becomes Package C headline, add staged-delivery milestones table.
- Edit `docs/gtm/target-list.md`: add "BuilderShip artifact fit" column; identify 2 BuilderShip-adjacent sponsors; mark the 6 active; park 19 as Week 3 conditional.
- Edit `docs/council/decision.md` primary metric line per §3.
- Confirm `list.ship.builders` access works; export 2 screenshots for case-study one-pager.

**Day 2 (Tuesday) — Rebuild the touch 1 asset stack. ~4h.**
- Edit `docs/gtm/5-touch-sequence.md` touch 1 body: lead with BuilderShip evidence. Loom is no longer "radar filtered to ICP" — it's "BuilderShip dashboard walkthrough + your event's preview."
- Record ONE master 4-min Loom of `list.ship.builders` (founder narrating 726/90/636 mechanic, V/P/U tiers, CRM export).
- Record 6 short (≤90s) personalized intro Looms — one per account — framing the master against that sponsor's last sponsored event.
- Draft 1-page private case-study PDF of BuilderShip (screenshots + numbers, scrubbed of PII).

**Day 3 (Wednesday) — Send the 6, hard. ~3h.**
- Send 6 personalized touch-1 emails. Each: intro Loom (90s), master Loom (4min), case-study PDF attached, link to `list.ship.builders` + password (where permission allows).
- CC warm-intro paths. For BuilderShip-adjacent accounts, name-drop BuilderShip in subject line.
- Log all sends; set Day +3 calendar reminders for touch 2 ("CSV preview of your top-10 events + 'imagine this dashboard for them'").
- Edit `docs/gtm/discovery-call-script.md` Q4 — "show BuilderShip dashboard + show radar filtered to their ICP" (artifact first, forward-looking second).

**Day 4 (Thursday) — Build the objection + discovery muscle. ~2h.**
- Edit `docs/gtm/objection-handling.md` to add the BuilderShip-anchor objection.
- Edit `docs/gtm/discovery-call-script.md` Q5 — pitch $12.5K Package B anchor, $7.5K Package A fallback (drop the old $5K floor).
- Run dry-run of new discovery call against a friendly contact (~20 min).
- Prep inbound triage rubric: any of the 6 reply → respond within 4 business hours.

**Day 5 (Friday) — Reply triage, Show HN re-frame, Week-3 trigger. ~2h.**
- Triage replies; book discovery calls via 30-min sponsor-pilot-discovery Calendly type.
- Update `docs/marketing/show-hn-launch-plan.md` — re-frame title from "I audited 200 AI conferences" to "I built a screening pipeline for a 726-person hackathon — here's the dashboard." Requires BuilderShip permission.
- Define Week 3 trigger: if ≥3 of 6 have discovery calls booked by EOD Friday Week 1, the 19 parked accounts get touch 1 in Week 3. If <3, double down on the 6, do NOT broaden.
- File this proposal's outcome into `sprint-1-retro-template.md` as "Week 1 entry."

## What this proposal does NOT change

- Hard non-goals in `decision.md` § "Deferred to Sprint 2" still apply.
- Rip cord trigger still applies — but at 6-account focus, the threshold materially shifts. Recommend rip cord re-reads: *"if 0 verbal yeses across all Sprint 1 outbound (cold + warm + HN inbound), pivot."*
- Engineer's <1-day fix from `decision.md` still ships immediately.
- The event-leads skill remains the canonical pilot-delivery SOP once a pilot signs.

## Net

A validated wedge demands concentrated, higher-priced, artifact-led outbound — not the same volume cold campaign with the artifact added as a side dish. Six accounts at $12.5K anchor with the BuilderShip dashboard as the lead asset is the correct shape of the bet.

## Critical files to amend

- `docs/gtm/sponsor-pilot-offer.md`
- `docs/gtm/target-list.md`
- `docs/gtm/5-touch-sequence.md`
- `docs/gtm/discovery-call-script.md`
- `docs/gtm/objection-handling.md`
- `docs/council/decision.md`
