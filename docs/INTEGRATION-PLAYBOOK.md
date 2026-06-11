# Sprint 1 integration playbook

> For the agent (or human) who merges the three v0.1.x worktree branches into the integration branch `claude/builderbase-prd-analysis-0BjXl`.
> Last updated: 2026-06-11.

## Prerequisites

All three worktree agents have pushed their branches to origin:
- `release/v0.1.1-honest-page` (engineer — code fixes)
- `release/v0.1.2-show-hn-proof` (content — markdown under `docs/marketing/`)
- `release/v0.1.3-sponsor-outbound` (GTM — markdown under `docs/gtm/`)

Verify with:
```bash
git fetch origin
git log origin/release/v0.1.1-honest-page --oneline | head
git log origin/release/v0.1.2-show-hn-proof --oneline | head
git log origin/release/v0.1.3-sponsor-outbound --oneline | head
```

Each should show ≥1 commit beyond `5ff21a1` (the council base commit).

## Merge order

Merge in this order to minimize conflicts:

1. **v0.1.1 (engineer / code)** — touches `client/` and `server/`. Disjoint from the docs-only branches.
2. **v0.1.3 (GTM / `docs/gtm/`)** — touches a new directory. Adds row to `docs/releases/README.md` (already pre-populated; expect a no-op or a clean fast-forward).
3. **v0.1.2 (content / `docs/marketing/`)** — touches another new directory. Same `README.md` row pre-populated.

## Commands

```bash
# Make sure you're on the integration branch with a clean tree
git checkout claude/builderbase-prd-analysis-0BjXl
git pull --ff-only origin claude/builderbase-prd-analysis-0BjXl
git status --short  # should be empty

# Merge v0.1.1 (code fixes)
git merge --no-ff origin/release/v0.1.1-honest-page -m "Merge v0.1.1: honest landing page (turnaround copy, Calendly env var, audit webhook)"

# Merge v0.1.3 (GTM docs)
git merge --no-ff origin/release/v0.1.3-sponsor-outbound -m "Merge v0.1.3: sponsor outbound kit"

# Merge v0.1.2 (marketing docs)
git merge --no-ff origin/release/v0.1.2-show-hn-proof -m "Merge v0.1.2: Show HN proof drop"
```

## Expected conflicts

- `docs/releases/README.md` — pre-populated with v0.1.1/v0.1.2/v0.1.3 rows. If the worktree agents touched it differently from what's pre-populated, prefer the integration-branch version and merge their meaningful additions manually.
- `docs/HANDOFF.md` — similar; pre-populated. If the v0.1.1 agent edited it, integrate any new env-var or fix-note carefully.

**If you hit any conflict outside those two files, STOP.** Inspect carefully — the worktrees were briefed to touch disjoint paths.

## Post-merge verification

```bash
# Build (client)
npx vite build

# Type-check (note: pre-existing tsc errors in beta-signup-modal.tsx and server/storage.ts are NOT yours to fix unless v0.1.1 modified them)
npm run check 2>&1 | grep -v "beta-signup-modal\|server/storage.ts" | tail -20
```

## Push

```bash
git push origin claude/builderbase-prd-analysis-0BjXl
```

**Do NOT open a PR.** The user explicitly preferred direct push to the integration branch.

## Optional: clean up worktrees

If you don't need them for further work:

```bash
# List active worktrees
git worktree list

# Remove worktrees that have been integrated
# (replace path with what `git worktree list` shows)
git worktree remove .claude/worktrees/agent-XXXX
```

The release branches themselves stay on origin in case we need to reference them later.

## What to do AFTER integration

1. Update `docs/releases/README.md` to set v0.1.1/v0.1.2/v0.1.3 status to **Shipped**.
2. Update `docs/HANDOFF.md`:
   - Move the three workstream rows from "In-flight" to "Shipped"
   - Resolve the "Open questions waiting on the user" items now answered by code (Calendly env var wired, audit webhook wired)
3. Notify the user. Provide:
   - Summary of what shipped
   - The two env vars they need to set (`VITE_CALENDLY_URL`, `AUDIT_WEBHOOK_URL`)
   - Where the Sprint 1 GTM and marketing materials live (`docs/gtm/`, `docs/marketing/`)
   - Reminder that Sprint 1 starts when the founder is ready to send outbound

## Failure modes

- **A worktree branch didn't ship.** Wait. Don't half-integrate. The Sprint 1 launch depends on all three landing together.
- **A merge conflict outside the pre-populated files.** Stop, read both sides carefully, escalate to the user with a description of the conflict before resolving.
- **`npx vite build` fails after merge.** Bisect: check which merge introduced the failure and fix in a new commit on the integration branch.
- **`npm run check` shows new tsc errors beyond the pre-existing ones.** Same: bisect and fix on integration branch.
