# Eventsea release plan — v0.1 to v2.0

> Master index for the release-by-release roadmap. Each release has its own spec in this directory. Council decisions and PM proposals live in `../council/`. Hand-off doc for the next agent is at `../HANDOFF.md`.

## Release ladder

| Release | Status | Theme | Branch | Doc |
|---|---|---|---|---|
| **v0.1** | Shipped | Landing page + 4-sided marketplace narrative | `claude/builderbase-prd-analysis-0BjXl` | (this branch) |
| **v0.1.1** | Shipped | Honest landing page: 5-business-day SLO, webhook-forwarded audit submissions, Calendly-ready Book Demo CTAs | [`release/v0.1.1-honest-page`](../../../../tree/release/v0.1.1-honest-page) | (no spec — see `../council/decision.md` "Immediate fix") |
| **v0.2** | Planned | Make the wedge real: working calendar audit pipeline | `release/v0.2-audit-pipeline` | [v0.2-audit-pipeline.md](./v0.2-audit-pipeline.md) |
| **v0.3** | Planned | Admin + outbound + first 5 design partners | `release/v0.3-admin-and-outbound` | [v0.3-admin-and-outbound.md](./v0.3-admin-and-outbound.md) |
| **v1.0** | Planned | First paying customer + multi-tenant prod app | `release/v1.0-multitenant` | [v1.0-multitenant.md](./v1.0-multitenant.md) |
| **v1.5** | Planned | Team workspaces + saved views + weekly digest | `release/v1.5-teams-and-digest` | [v1.5-teams-and-digest.md](./v1.5-teams-and-digest.md) |
| **v2.0** | Planned | Marketplace transactions: sponsor matching + venue booking | `release/v2.0-marketplace-tx` | [v2.0-marketplace-tx.md](./v2.0-marketplace-tx.md) |

## Council decision

The single highest-leverage next step was decided by the founding council (4 PMs: GTM, Product, Marketing, Founder/Ops). The council's individual proposals are in `../council/` and the synthesis is in `../council/decision.md`.

Short version: **v0.2 ships first**, because nothing else compounds until the wedge promise (paste calendar → audit) is real. The other releases get planned in parallel but executed serially.

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

When the work is done, merge back to the integration branch (currently `claude/builderbase-prd-analysis-0BjXl`).
