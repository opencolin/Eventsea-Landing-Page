# Eventsea release plan — v0.1 to v2.0

> Master index for the release-by-release roadmap. Each release has its own spec in this directory. Council decisions and PM proposals live in `../council/`. Hand-off doc for the next agent is at `../HANDOFF.md`.

## Release ladder

| Release | Status | Theme | Branch | Doc |
|---|---|---|---|---|
| **v0.1** | Shipped | Landing page + 4-sided marketplace narrative | `claude/builderbase-prd-analysis-0BjXl` | (this branch) |
| **v0.1.1** | Shipped | Honest landing page (turnaround copy fix, Calendly env var, audit webhook) | `release/v0.1.1-honest-page` (merged) | (see commits) |
| **v0.1.2** | Shipped | Show HN proof drop (audit-200 corpus + blog post drafts + private-audit sample) | `release/v0.1.2-show-hn-proof` (merged) | (see `docs/marketing/`) |
| **v0.1.3** | Shipped | Sponsor outbound kit (25-target list, 5-touch sequence, pilot offer, objection handling, discovery script) | `release/v0.1.3-sponsor-outbound` (merged) | (see `docs/gtm/`) |
| **v0.2** (marketplace track) | Planned (Sprint 2, conditional) | Make the calendar-audit wedge real: working calendar audit pipeline | `release/v0.2-audit-pipeline` | [v0.2-audit-pipeline.md](./v0.2-audit-pipeline.md) |
| **v0.2** (skill track) | Planned (Sprint 2, conditional) | Productize the event-leads skill: CSV upload → ranked sponsor leads dashboard | (new branch) | [v0.2-lead-analysis-csv.md](./v0.2-lead-analysis-csv.md) |
| **v1-csv-upload** (skill track) | Week 1 in flight | PRD v1 — productize the event-leads skill: CSV upload → FR9 gated dashboard. 6-week build sequence per `../council/decision-2.md`. | `release/prd-v1-csv-upload` | [v1/week-1-acceptance.md](./v1/week-1-acceptance.md) |
| **v0.3** | Planned | Admin + outbound + first 5 design partners | `release/v0.3-admin-and-outbound` | [v0.3-admin-and-outbound.md](./v0.3-admin-and-outbound.md) |
| **v1.0** (marketplace track) | Planned | First paying customer + multi-tenant prod app | `release/v1.0-multitenant` | [v1.0-multitenant.md](./v1.0-multitenant.md) |
| **v1.0** (skill track) | Planned | Luma API ingestion: auto-pull, auto-diff registrations | (new branch) | [v1.0-luma-api-ingestion.md](./v1.0-luma-api-ingestion.md) |
| **v1.1-luma-api** | Spec ready | Deepened Luma API ingestion spec (auth/encryption/diff/cost/sequencing) — implementation-ready | `release/prd-v1.1-luma-api` | [v1.1/luma-api-spec.md](./v1.1/luma-api-spec.md) |
| **v1.5** | Planned | Team workspaces + saved views + weekly digest | `release/v1.5-teams-and-digest` | [v1.5-teams-and-digest.md](./v1.5-teams-and-digest.md) |
| **v2.0** (marketplace track) | Planned | Marketplace transactions: sponsor matching + venue booking | `release/v2.0-marketplace-tx` | [v2.0-marketplace-tx.md](./v2.0-marketplace-tx.md) |
| **v2.0** (skill track) | Planned | Autonomous event intelligence: Tavily discovery + Token Factory inference | (new branch) | [v2.0-autonomous-event-intel.md](./v2.0-autonomous-event-intel.md) |
| **v2-autonomous** (deep spec) | Spec ready | Implementation-ready spec for the autonomous track — Tavily, Token Factory, Inngest orchestrator, self-rebuilding dashboard, trust gating, quality regression, 12-week sequencing | `release/prd-v2-autonomous` | [v2/autonomous-spec.md](./v2/autonomous-spec.md) |

## Council decision

The single highest-leverage next step was decided by the founding council (4 PMs: GTM, Product, Marketing, Founder/Ops). The council's individual proposals are in `../council/` and the synthesis is in `../council/decision.md`.

Short version: **Sprint 1 runs the Founder/Ops PM's sponsor pilot validation as primary, with Marketing PM's Show HN as concurrent amplifier and GTM PM's honest-page fix as a one-day prerequisite.** Product PM's audit pipeline build (v0.2) is deferred to Sprint 2, conditional on ≥$5K revenue from Sprint 1.

## Two product tracks — and the event-leads skill

There are now **two parallel v0.2/v1.0/v2.0 ladders**:

1. **Marketplace track** — `release/v0.2-audit-pipeline` → `release/v1.0-multitenant` → `release/v2.0-marketplace-tx`. This is the original 4-sided marketplace vision (organizers/sponsors/venues/field marketing).
2. **Skill track** — `v0.2-lead-analysis-csv.md` → `v1.0-luma-api-ingestion.md` → `v2.0-autonomous-event-intel.md`. This is the productization of `.claude/skills/event-leads/SKILL.md` — the same SOP the founder uses to deliver Sprint 1 concierge pilots.

The Sprint 2 council picks which track is primary based on what Sprint 1 reveals about willingness-to-pay. See `../council/sprint-2-brief.md` for the decision frame.

**Skill-track pilots are how Sprint 1 gets fulfilled.** The skill at `.claude/skills/event-leads/SKILL.md` IS the operational SOP — see `../operations/sponsor-pilot-delivery.md` for the workflow.

## Sprint 1 workstreams (all merged)

Three concurrent v0.1.x sub-releases were built in parallel git worktrees and merged into `claude/builderbase-prd-analysis-0BjXl` together.

- **v0.1.1 engineer** — code fixes only. Shipped.
- **v0.1.2 content** — 6 markdown drafts under `docs/marketing/`. Shipped (~9,970 words). Requires founder review of audit-of-ai-engineer-summit (hold for Swyx permission), audit-200 leaderboard score calibration, and YC tone before publish.
- **v0.1.3 GTM** — 7 outbound templates under `docs/gtm/`. Shipped. Requires founder to fill in real buyer names + LinkedIn URLs + warm-intro candidates per target before sending touch 1.

## How to use this directory

- **Designing a new release?** Copy one of the existing release docs and edit. Use the section headers verbatim so other agents can parse the doc.
- **Picking up where I left off?** Read `../HANDOFF.md` first, then the open releases in order.
- **Need context on positioning?** `../builderbase-prd-analysis.md` and `../builderbase-clone-plan.md`.

## Worktree convention

Each release is built in its own git worktree to isolate the work from other releases. Convention:

```
git worktree add ../eventsea-v0.2 release/v0.2-audit-pipeline
cd ../eventsea-v0.2
# do the work
```

When the work is done, push the branch and report. **Do NOT open a PR** unless the user explicitly asks. The integration agent merges branches into `claude/builderbase-prd-analysis-0BjXl` after review.

## Branches on origin

Every release has a placeholder branch on origin ready to be picked up:
- `release/v0.1.1-honest-page` (Sprint 1)
- `release/v0.1.2-show-hn-proof` (Sprint 1)
- `release/v0.1.3-sponsor-outbound` (Sprint 1)
- `release/v0.2-audit-pipeline` (Sprint 2, conditional)
- `release/v0.3-admin-and-outbound`
- `release/v1.0-multitenant`
- `release/v1.5-teams-and-digest`
- `release/v2.0-marketplace-tx`
