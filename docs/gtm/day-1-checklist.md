# Sprint 1 Day-1 founder checklist

> Everything you need to do on Day 1 of Sprint 1 to get the validation sprint live.
> Estimated time: **2.5 hours.** Do these in order.
>
> All artifacts referenced below were prepared by the Sprint 0 council session and live in this repo.

---

## Pre-flight (~15 min)

- [ ] Read `docs/council/decision.md` end-to-end. Confirm you agree with the priority before committing 4 weeks to it.
- [ ] Read `docs/council/founder-pm-proposal.md` §3 "Sprint plan" so you know what Days 2–18 look like.
- [ ] Skim `docs/HANDOFF.md` to know what state the repo is in.

If the priority no longer matches your gut: **stop**. Convene a quick re-think before proceeding.

---

## Set the two env vars (~10 min)

The honest-page release (v0.1.1) shipped both env vars wired but you have to provide the values.

- [ ] Create a Calendly account if you don't have one. Set up the three event types per `docs/gtm/calendly-setup.md`:
  - "Eventsea — 15-min ROI walkthrough"
  - "Eventsea — 30-min sponsor pilot discovery"
  - "Eventsea — 45-min audit readout"
- [ ] Add `VITE_CALENDLY_URL=https://calendly.com/<your-handle>/15min` to your local `.env` and to the production environment variables on your host.
- [ ] Create a Slack channel `#eventsea-audits` (or similar). Add an Incoming Webhook to it. Copy the webhook URL.
- [ ] Add `AUDIT_WEBHOOK_URL=https://hooks.slack.com/services/...` to the production env vars.
- [ ] Submit a test calendar audit on eventsea.ai. Confirm the submission lands in the Slack channel. Confirm the Book Demo button opens Calendly.

---

## Fill in the per-target outbound briefs (~60 min)

You have a 25-target list in `docs/gtm/target-list.md`. Each needs a per-account brief filled in before touch 1.

- [ ] For each of the 4 named targets first (Nebius, vCluster, Tavily, LanceDB):
  - Copy `docs/gtm/account-brief-template.md` to `docs/gtm/briefs/<account>.md`
  - Fill in: real DevRel/Field Marketing/Ecosystem lead name + LinkedIn URL
  - Fill in: their last 6 months of event sponsorships (use the Event Radar prototype to find these)
  - Fill in: warm-intro candidate names (look at LinkedIn 2nd-degree)
  - Fill in: the ONE P1 insight to lead with in touch 1
- [ ] For the 21 analog targets: minimal brief is fine — buyer title + budget signal + warm-intro path.

You will likely discover during this exercise that some of the 25 don't fit. **Drop them.** Better to spend Week 1 on 18 strong than 25 weak.

---

## Record the radar Loom (~30 min)

Per the GTM PM proposal, every touch-1 email includes a ≤90-second Loom of the Event Radar prototype filtered to the recipient's ICP.

- [ ] Open Event Radar MVP. Pre-set 4 saved views, one per named target's ICP:
  - "Nebius ICP" — vector DB / RAG infra weighted
  - "vCluster ICP" — Kubernetes / platform engineering weighted
  - "Tavily ICP" — agent infra / web search / LLM tooling
  - "LanceDB ICP" — vector DB / RAG infra
- [ ] Record one Loom per saved view (4 Looms total). Each ≤90 sec, says: "Here's an upcoming event list scored for {target}, top 5 are…"
- [ ] Drop the Loom URLs into the corresponding `docs/gtm/briefs/<account>.md` files.

---

## Send touch 1 to the named targets (~30 min)

Use `docs/gtm/5-touch-sequence.md` Touch 1 as the template.

- [ ] Send 4 personalized cold emails. CC any warm-intro paths you have.
- [ ] Log each send in your CRM or in the per-account brief file.
- [ ] Set a calendar reminder for Day +3 (Touch 2 — ranked CSV).

---

## Final pre-launch checks (~5 min)

- [ ] Show HN is scheduled for Tuesday Week 3, 9am PT. Block that morning on your calendar.
- [ ] `docs/marketing/show-hn-launch-plan.md` is ready. Read it once now so the day-of isn't surprising.
- [ ] Council convenes at end of Sprint 1. The brief is `docs/council/sprint-2-brief.md`. The retro template is `docs/council/sprint-1-retro-template.md` — start filling it in as you go, not at the end.

---

## What NOT to do this week

- ❌ Don't build the audit pipeline (v0.2). It's the obvious "what should I do with the form submissions?" temptation. The council deferred it specifically because we don't know yet if it justifies 40 eng-days.
- ❌ Don't write more landing page copy. The page is honest now. Customer calls will tell you what to change.
- ❌ Don't broaden the ICP. AI infra only this sprint.
- ❌ Don't take a fundraising call. You'll close at 4–6x the valuation 4 weeks from now with revenue.
- ❌ Don't incorporate yet. Day 18 of Sprint 1 — Stripe Atlas is a 2-hour task.
- ❌ Don't hire. Burn before revenue inverts the math.

---

## End-of-Day-1 success state

- 2 env vars set, audit form submission confirmed end-to-end
- 4 named-target briefs filled in
- 4 Looms recorded
- 4 touch-1 emails sent
- Show HN day blocked on calendar
- Sprint 1 retro doc opened for ongoing entry

If that's true, you're on track for Week 4's primary metric (1 paid pilot signed ≥$5K).

## When a pilot signs — invoke the event-leads skill

Pilot delivery does NOT require you to write a custom analysis from scratch. The project-scoped `event-leads` skill (`.claude/skills/event-leads/SKILL.md`) is the canonical SOP. The wrapper doc is `docs/operations/sponsor-pilot-delivery.md`.

Steps when a pilot signs:
1. Receive registration CSV(s) from the sponsor (Luma host export).
2. Open a Claude Code session in this project, attach the CSV.
3. Invoke the skill with the sponsor's ICP and chosen deliverable (dashboard / xlsx / both).
4. Spot-check the skill's flagged corrections before sending to the sponsor.
5. Schedule the 45-min audit readout call.
6. Log the pilot result into `docs/council/sprint-1-retro-template.md`.

The skill is also Eventsea's canonical product roadmap (v1 CSV → v1.1 Luma API → v2 autonomous). When Sprint 1 hits its metric and the Sprint 2 council convenes, the obvious next build is to productize what you just did manually for the pilot.

---

## If you're stuck

Re-read `docs/council/founder-pm-proposal.md` §5 "What I'd NOT do" — the discipline of the sprint is the discipline of the deferrals.
