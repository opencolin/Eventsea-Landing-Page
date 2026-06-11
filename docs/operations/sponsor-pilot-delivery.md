# Sponsor pilot delivery SOP

> When a Sprint 1 sponsor pilot signs ($5K–$15K per `docs/gtm/sponsor-pilot-offer.md`), the founder (or operator) follows this SOP to deliver. The actual analysis is run by invoking the project-scoped **event-leads** skill at `.claude/skills/event-leads/SKILL.md`.

## What gets delivered to a paid pilot

Per `docs/gtm/sponsor-pilot-offer.md`:
- **$5K (single event):** per-event sponsor placement audit, no attribution.
- **$7.5K (3-event package):** 3 ranked sponsor-fit reports + attribution PDF.
- **$15K (quarterly):** 3-event package + live dashboard + 2 organizer intros.

Each deliverable is produced by the **event-leads** skill, configured per the sponsor's ICP. The skill turns a sponsor's target event(s) into a verified, per-sponsor-scored, influence-ranked lead list and ships a sortable spreadsheet + password-gated web dashboard.

## When to invoke the skill

The skill description triggers on:
- A registration/attendee/guest CSV from Luma, Eventbrite, or similar.
- "Who are the top leads/builders/judges at this event?"
- A follow-up on an existing event analysis (new CSV export to diff in, re-ranking, picking hackers or judges).
- A request to productize the pipeline (Luma API ingestion, autonomous scraping).

For Sprint 1 pilot delivery, **every pilot triggers the skill**.

## Step-by-step operator workflow

1. **Sponsor signs** — pilot offer countersigned per `docs/gtm/sponsor-pilot-offer.md`. Stripe payment received.
2. **Sponsor sends target event(s)** — Luma URL, Eventbrite URL, or direct CSV export.
3. **Operator extracts CSV** — if Luma, request the host export the guest list and forward it. If CSV provided directly, save into a private folder.
4. **Operator invokes the skill** — start a Claude Code session, attach the CSV, paste this prompt:

   ```
   /event-leads

   CSV: <attached>
   Event: <event name + URL>
   Sponsor: <sponsor name> — <one-line ICP>
   Deliverable: dashboard
   Domain: leads-<sponsor-slug>.eventsea.ai
   Password: <generate 16-char>
   ```

   Or, when running multi-sponsor:

   ```
   Sponsors:
     1. <Sponsor A> — <ICP>
     2. <Sponsor B> — <ICP>
     3. <Sponsor C> — <ICP>
   ```

5. **Skill runs steps 0–5** — ingest, two-tier verify, score per sponsor, fetch follower counts, ship the spreadsheet + password-gated dashboard.
6. **Operator reviews flags** — every correction the skill caught (inflated titles, wrong-company claims, competitor employees), every conflict it overrode. Spot-check the top 10 leads adversarially.
7. **Operator sends deliverables to sponsor** — dashboard URL + password by separate channels (URL in email, password via Slack DM or Signal). Spreadsheet attached or via shared drive.
8. **Operator schedules 45-min readout call** — per `docs/gtm/calendly-setup.md` "Eventsea — 45-min audit readout."
9. **Operator captures pilot feedback** — what filters the sponsor wished existed, what the top leads converted into, what the spreadsheet was missing. Feed into the Sprint 1 retro doc per `docs/council/sprint-1-retro-template.md`.

## SLA

Per `docs/gtm/sponsor-pilot-offer.md` 30-day promise:
- **Week 1** of pilot: ingest, screen, deliver v1 dashboard.
- **Week 2**: refine based on sponsor feedback.
- **Week 3**: deliver attribution PDF (3-event package and up).
- **Week 4**: deliver readout call + post-event diff (if applicable per Step 7 of skill).

## PII discipline

The skill is explicit (Step 5): **non-negotiable PII rule.** Sponsor pilot leads contain emails, phones, and sales judgments. Local by default. If deployed:
- **Private** repo only.
- **Server-side** password gate (HttpOnly cookie + 302 middleware). Never a client-side JS prompt.
- Verify end-to-end after deploy: no-cookie → redirect with zero data in body; wrong password → 401; correct → content.
- Disable the host's default deployment protection so the operator's gate is the only gate.

## Update loop (Step 7 of skill)

When the sponsor exports a fresh CSV (new approvals, removals):
1. Diff by guest_id (fall back to email).
2. Screen only additions.
3. Fetch followers for new handles only.
4. Drop removals (and backfill any curated slot they held).
5. Rebuild, redeploy, verify the live site actually changed.

## When the pilot ends

- Deliver the CRM export (HubSpot + Salesforce CSV options, per skill Step 5).
- Capture the named-testimonial agreement promised in `docs/gtm/sponsor-pilot-offer.md`.
- Update `docs/council/sprint-1-retro-template.md` with the LOI/conversion fact for the post-Sprint-1 council.
- Take down the password-gated deploy after 30 days (or on sponsor request).

## Notes for future agents

- The skill is also the **product roadmap** for Eventsea's lead-analysis track — see `docs/releases/v0.2-lead-analysis-csv.md`, `v1.0-luma-api-ingestion.md`, and `v2.0-autonomous-event-intel.md`. Concierge pilot delivery via the skill IS Sprint 1's revenue mechanism; productizing those steps into self-serve software IS the roadmap to v2.
- The skill's "Autonomous goal mode" section is the same playbook this session used (council, worktrees, ticks, handoff). When a fresh agent is invoked with "decide the next step and do it" on this repo, that section is the canonical operating mode.
