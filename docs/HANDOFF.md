# HANDOFF — read this first

> Last updated: 2026-06-11 by Claude (council session).
> Branch: `claude/builderbase-prd-analysis-0BjXl`.

## What's already in the repo

A shipped landing page for Eventsea, a four-sided event marketplace (organizers, sponsors, venues, field marketing). Backend uses MemStorage. The real product (Event Radar MVP) lives separately at `event-radar-mvp.phantastic.ai` — not in this repo.

Read in this order:
1. `docs/builderbase-prd-analysis.md` — positioning + gap analysis
2. `docs/builderbase-clone-plan.md` — original phased clone plan (predates the four-sided goal)
3. `docs/releases/README.md` — release ladder v0.1 → v2.0
4. `docs/council/decision.md` — what the founding council decided was next
5. `docs/releases/v0.2-audit-pipeline.md` — the next release to build

## What the council decided

The 4-PM founding council (GTM, Product, Marketing, Founder/Ops) deliberated and produced individual proposals in `docs/council/*-proposal.md`. The synthesized decision lives in `docs/council/decision.md`. **TL;DR**: ship v0.2 (the working audit pipeline) before everything else, because nothing in v0.3+ compounds until the wedge promise is real.

## How to pick up

If you are a fresh agent inheriting this work, start here:

### If you're picking up v0.2
1. Read `docs/releases/v0.2-audit-pipeline.md` end-to-end.
2. Check out the v0.2 worktree if it exists: `git worktree list`. If not, create it: `git worktree add ../eventsea-v0.2 release/v0.2-audit-pipeline`.
3. Walk the "Implementation checklist" in the v0.2 doc. Commit per day.
4. Use the Claude API skill for the audit generation (see `~/.claude/skills/claude-api` or invoke via the Skill tool).

### If you're picking up v0.3+
v0.3 cannot start until v0.2 is in a working state. Do not start v0.3 in parallel unless explicitly told to.

### If you're picking up a non-release task
Anything not in the release ladder (e.g., real testimonials wiring, Calendly link, content marketing) is "background work" and can land on whatever branch is current. Don't open a worktree for these.

## Operating rules

- **Worktrees per release**: each `release/v0.X` lives in its own worktree to avoid stomping on others.
- **Commits per ~30-min chunk**: small commits, descriptive messages, conventional-ish style.
- **Builds pass before push**: `npx vite build` for client, `npm run check` for tsc (tsc has pre-existing errors in `beta-signup-modal.tsx` and `server/storage.ts` — those are not yours to fix unless you're working on those files explicitly).
- **No destructive git**: no `--force` push, no `reset --hard` without user permission.
- **Document as you go**: if you change the spec, update the release doc in the same commit.

## Open questions waiting on the user (don't block on these)

1. Calendly / SavvyCal link to wire to Book-a-Demo (currently `mailto:` placeholder)
2. Real customer testimonials + logos for the testimonial section
3. Final pricing numbers (current page says "draft pricing")
4. Eventsea legal entity / billing address for Stripe Connect (needed for v2.0)
5. Whether to integrate the existing `event-radar-mvp.phantastic.ai` prototype into this repo OR keep them as separate services (the council's Product PM has a recommendation in their proposal)

## Background processes / state

A 30-second heartbeat ticker was started in the original session for self-pacing. It writes to `/tmp/eventsea-heartbeat.log`. You can ignore it; it's purely for the agent's cadence.
