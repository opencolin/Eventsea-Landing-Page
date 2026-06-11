# Eventsea release plan — v0.1 to v2.0

> Master index for the release-by-release roadmap. Each release has its own spec in this directory. Council decisions and PM proposals live in `../council/`. Hand-off doc for the next agent is at `../HANDOFF.md`.

## Release ladder

| Release | Status | Theme | Branch | Doc |
|---|---|---|---|---|
| **v0.1** | Shipped | Landing page + 4-sided marketplace narrative | `claude/builderbase-prd-analysis-0BjXl` | (this branch) |
| **v0.1.1** | In-flight | Honest landing page (turnaround copy fix, Calendly env var, audit webhook) | `release/v0.1.1-honest-page` | (see commits) |
| **v0.1.2** | In-flight | Show HN proof drop (audit-200 corpus + blog post drafts + private-audit sample) | `release/v0.1.2-show-hn-proof` | (see `docs/marketing/`) |
| **v0.1.3** | In-flight | Sponsor outbound kit (25-target list, 5-touch sequence, pilot offer, objection handling, discovery script) | `release/v0.1.3-sponsor-outbound` | (see `docs/gtm/`) |
| **v0.2** | Planned (Sprint 2, conditional) | Make the wedge real: working calendar audit pipeline | `release/v0.2-audit-pipeline` | [v0.2-audit-pipeline.md](./v0.2-audit-pipeline.md) |
| **v0.3** | Planned | Admin + outbound + first 5 design partners | `release/v0.3-admin-and-outbound` | [v0.3-admin-and-outbound.md](./v0.3-admin-and-outbound.md) |
| **v1.0** | Planned | First paying customer + multi-tenant prod app | `release/v1.0-multitenant` | [v1.0-multitenant.md](./v1.0-multitenant.md) |
| **v1.5** | Planned | Team workspaces + saved views + weekly digest | `release/v1.5-teams-and-digest` | [v1.5-teams-and-digest.md](./v1.5-teams-and-digest.md) |
| **v2.0** | Planned | Marketplace transactions: sponsor matching + venue booking | `release/v2.0-marketplace-tx` | [v2.0-marketplace-tx.md](./v2.0-marketplace-tx.md) |

## Council decision

The single highest-leverage next step was decided by the founding council (4 PMs: GTM, Product, Marketing, Founder/Ops). The council's individual proposals are in `../council/` and the synthesis is in `../council/decision.md`.

Short version: **Sprint 1 runs the Founder/Ops PM's sponsor pilot validation as primary, with Marketing PM's Show HN as concurrent amplifier and GTM PM's honest-page fix as a one-day prerequisite.** Product PM's audit pipeline build (v0.2) is deferred to Sprint 2, conditional on ≥$5K revenue from Sprint 1.

## Sprint 1 workstreams (in-flight)

Three concurrent v0.1.x sub-releases are being built in parallel git worktrees. Each is owned by a different agent and lands on its own branch. When all three are ready, they get merged into `claude/builderbase-prd-analysis-0BjXl` together.

- **v0.1.1 engineer** — code fixes only. ~1 eng-day.
- **v0.1.2 content** — markdown drafts under `docs/marketing/`. ~17 content-days (will continue past Sprint 1 start to deliver per-week).
- **v0.1.3 GTM** — outbound templates under `docs/gtm/`. ~3 PM-days.

When you read this and the rows above say "In-flight" but the branches don't have commits, run `git fetch origin` and check the agent task status.

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
