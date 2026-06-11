# HANDOFF — read this first

> Last updated: 2026-06-11 by Claude (council session + Sprint 1 fan-out).
> Integration branch: `claude/builderbase-prd-analysis-0BjXl`.

## What's already in the repo

A shipped landing page for Eventsea, a four-sided event marketplace (organizers, sponsors, venues, field marketing). Backend uses MemStorage. The real product (Event Radar MVP) lives separately at `event-radar-mvp.phantastic.ai` — not in this repo.

Read in this order:
1. `docs/builderbase-prd-analysis.md` — positioning + gap analysis
2. `docs/builderbase-clone-plan.md` — original phased clone plan (predates the four-sided goal)
3. `docs/council/decision.md` — **the canonical "what we're doing right now"**
4. `docs/releases/README.md` — release ladder v0.1 → v2.0 with current statuses (now with two parallel tracks)
5. `.claude/skills/event-leads/SKILL.md` — the project-scoped skill that IS the operational SOP for Sprint 1 pilot delivery AND the canonical product roadmap (v1 CSV → v1.1 Luma API → v2 autonomous)
6. `docs/operations/sponsor-pilot-delivery.md` — how to invoke the skill when a Sprint 1 pilot signs
7. The release doc you're working on

## What the council decided (Sprint 1)

The 4-PM founding council (GTM, Product, Marketing, Founder/Ops) deliberated. Their individual proposals are in `docs/council/*-proposal.md`. The synthesized decision lives in `docs/council/decision.md`.

**TL;DR:** Sprint 1 = sponsor pilot validation (Founder/Ops PM plan) with Show HN amplifier (Marketing PM plan) and honest-page fix (GTM PM plan). Product PM's audit pipeline build is **deferred to Sprint 2, conditional on ≥$5K revenue from Sprint 1.**

Hard non-goals for Sprint 1 are codified in the decision doc — read them before suggesting any work that isn't on the list.

## Sprint 1 status — three workstreams shipped + merged

All three are merged into `claude/builderbase-prd-analysis-0BjXl`. The founder can start Sprint 1 outbound as soon as they (a) set the two env vars below and (b) review the founder-action items below.

| Workstream | Branch | What it produced | Status |
|---|---|---|---|
| Honest-page engineer | `release/v0.1.1-honest-page` | 4 commits: 5-business-day turnaround copy, `AUDIT_WEBHOOK_URL` forwarding, `VITE_CALENDLY_URL` across 8 Book Demo CTAs, `.env.example` | Shipped + merged |
| Show HN proof content | `release/v0.1.2-show-hn-proof` | 6 markdown docs under `docs/marketing/` (~9,970 words): launch playbook, audit-200 long-form, YC + AI Engineer Summit audits, sample private audit (Acme AI Infra Co.), Twitter handle list | Shipped + merged |
| Sponsor outbound kit | `release/v0.1.3-sponsor-outbound` | 7 docs under `docs/gtm/`: 25-target list, 3-tier pilot offer ($5K/$7.5K/$15K), 5-touch sequence, discovery script, 7-objection playbook, Calendly setup, account brief template | Shipped + merged |

### Two env vars the founder must set
- `VITE_CALENDLY_URL` — Calendly link for Book Demo. Until set, all 8 page CTAs and the nav button fall back to `mailto:hello@eventsea.ai`.
- `AUDIT_WEBHOOK_URL` — Slack-incoming-webhook (or any HTTPS endpoint returning 2xx) for real-time notifications of calendar audit submissions. Until set, submissions still succeed and persist in the in-memory store but the founder gets no notification.

See `.env.example` at the repo root for full docs.

### Founder review items before publishing externally
- `docs/marketing/audit-of-ai-engineer-summit.md` — held for Swyx permission per the agent's note at top
- `docs/marketing/audit-200-blog-post.md` — leaderboard scores are placeholder-calibrated; verify before Show HN
- `docs/marketing/audit-of-yc-calendar.md` — tone check (publishing fair-use without YC's pre-blessing)
- `docs/marketing/twitter-handles.md` — TODO handles need T-1 verification before Show HN thread
- `docs/marketing/sample-private-audit.md` — Calendly link placeholder in Section 8
- Per `docs/council/marketing-pm-proposal.md` — founder sign-off needed to run radar over the 4 named targets without permission
- `docs/gtm/*` — real buyer names, LinkedIn URLs, warm-intro candidates need to be filled in per target before touch 1 ships

## Sprint 2 onward — TWO parallel tracks

The Sprint 2 council picks which track is primary. Branches exist on origin as placeholders for the marketplace track; the skill track has spec docs only (open new branches when the council decides).

**Marketplace track (4-sided event marketplace, original vision):**
- `release/v0.2-audit-pipeline` — calendar-audit pipeline (40 eng-days). CONDITIONAL on Sprint 1 revenue.
- `release/v0.3-admin-and-outbound` — admin dashboard + Calendly + 20 public audit pages
- `release/v1.0-multitenant` — auth + orgs + radar UI port + Stripe
- `release/v1.5-teams-and-digest` — team workspaces, shared views, weekly digest, Slack app
- `release/v2.0-marketplace-tx` — Stripe Connect, sponsor matching, venue booking, ROI dashboards

**Skill track (productize the event-leads skill, lead-analysis-first):**
- `docs/releases/v0.2-lead-analysis-csv.md` — self-serve CSV → ranked sponsor leads dashboard
- `docs/releases/v1.0-luma-api-ingestion.md` — Luma OAuth + scheduled polling + auto-diff re-screening
- `docs/releases/v2.0-autonomous-event-intel.md` — Tavily-discovered events + Token Factory inference + self-rebuilding dashboard

If the founder doesn't tell you which track, default to the skill track once Sprint 1 reports back with paid pilots — those pilots will have been DELIVERED via the skill, and productizing the operator workflow into self-serve is the obvious next move.

## How to pick up (fresh agent)

### If you're a fresh agent inheriting Sprint 1
1. `git fetch origin` to see all release branches.
2. Run `git worktree list` to see what's already checked out.
3. Read the council decision and the release doc for the workstream you're picking up.
4. If a worktree exists, `cd` into it. If not, create with `git worktree add ../eventsea-<branch-tail> <branch>`.
5. Walk the spec doc's implementation checklist.

### If you're the integration agent after Sprint 1 worktrees ship
1. `git fetch origin` for the three v0.1.x branches.
2. Merge each into `claude/builderbase-prd-analysis-0BjXl` in order: v0.1.1 → v0.1.3 → v0.1.2.
3. Resolve merge conflicts conservatively (each branch should touch disjoint files except `docs/releases/README.md`, which is already pre-populated).
4. Build + commit.
5. Push. Notify the user.

### If you're picking up Sprint 2 (v0.2 audit pipeline)
Do NOT start v0.2 until Sprint 1 reports back with revenue numbers. Read the rip cord clause in `docs/council/decision.md` first.

## Operating rules

- **Worktrees per release**: each `release/v0.X` lives in its own worktree to avoid stomping.
- **Small commits**: per-day or per-feature, descriptive messages.
- **Builds pass before push**: `npx vite build` for client. `npm run check` for tsc (note: pre-existing tsc errors in `beta-signup-modal.tsx` and `server/storage.ts` — not yours to fix unless you're working on those files explicitly).
- **No destructive git**: no `--force` push, no `reset --hard` without user permission.
- **Document as you go**: if you change the spec, update the release doc in the same commit.
- **Do NOT open PRs** unless explicitly asked. The integration agent merges.

## Open questions waiting on the user

1. Calendly URL for `VITE_CALENDLY_URL` (will be wired by v0.1.1 worktree)
2. Slack/Resend webhook URL for `AUDIT_WEBHOOK_URL` (will be wired by v0.1.1 worktree)
3. Real customer testimonials + logos for the testimonial section (still anonymous on the live page)
4. Final pricing numbers (current page says "draft pricing")
5. Real Twitter handles for the named targets — v0.1.2 worktree will mark unknowns as TODO
6. Eventsea legal entity / billing address for Stripe Connect (needed for v2.0; Founder/Ops PM plans to handle this on Day 18 of Sprint 1)
7. Approval to run private audits of Nebius/vCluster/Tavily/LanceDB without permission — Marketing PM proposal flags this as a blocker; check with founder before publishing or sending audit content externally

## Background processes / state

A 30-second heartbeat ticker was started for self-pacing. It writes to `/tmp/eventsea-heartbeat.log`. You can ignore it; it's purely for the agent's cadence.
