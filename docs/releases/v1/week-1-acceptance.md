# Week 1 acceptance — PRD v1 (CSV upload) — Foundations + FR9 gate

> Per `docs/council/decision-2.md` Track 2 Week 1: "Foundations + FR9 gate first."
> Per `docs/council/tech-architect-proposal.md` §5 (canonical gate design).

## What landed

- **Drizzle schema** for `events`, `attendees`, `screenings`, `sponsor_scores`, `influence`, `curation_tags`, `export_logs`, `pipeline_runs` — plus 5 pgEnums and matching `drizzle-zod` insert schemas + exported types (`shared/schema.ts`).
- **FR9 password-gate middleware** (`server/middleware/eventGate.ts`):
  - Per-event cookie `es_event_<eventId>` with HMAC-SHA256 signed payload `{ eventId, issuedAt, subject }`.
  - `HttpOnly`, `Secure` in prod, `SameSite=Lax`, `Path=/`, `Max-Age=604800` (7d).
  - 302 to `/d/:slug/login` on missing/invalid cookie.
  - Attaches `req.eventContext = { eventId, slug, subject, event }` on success.
  - Constant-time MAC comparison; fail-closed if `EVENT_GATE_SECRET` is unset/short.
- **Login + logout routes** (`server/routes.ts`):
  - `GET /d/:slug/login` — server-rendered HTML form, no JS, no lead data.
  - `POST /d/:slug/login` — `bcrypt.compare`, sets cookie, 302 to `/d/:slug`.
  - `POST /d/:slug/logout` — clears cookie, 302 to `/d/:slug/login`.
- **Dashboard stub** at `GET /d/:slug` behind `eventGate()` so the gate is testable end-to-end without waiting for the real FR5 dashboard (Week 4).
- **Env var docs**: `EVENT_GATE_SECRET` added to `.env.example` with `openssl rand -hex 32` instructions and a rotation note.
- **Smoke test**: `scripts/verify-gate.sh` covers all 5 acceptance states the PRD requires.

## Run the gate verification locally

```bash
# 1. one-time: generate a secret and seed the bootstrap test event
export EVENT_GATE_SECRET="$(openssl rand -hex 32)"
export EVENTSEA_BOOTSTRAP_TEST_EVENT=1
export PORT=5099

# 2. start the dev server in one terminal
npm install
npm run dev

# 3. in another terminal, run the verifier
BASE_URL=http://127.0.0.1:5099 bash scripts/verify-gate.sh
```

Expected output (Week 1 acceptance bar):

```
[1/5] GET /d/test-slug with no cookie                  PASS
[2/5] GET /d/test-slug/login                            PASS
[3/5] POST /d/test-slug/login with wrong password       PASS
[4/5] POST /d/test-slug/login with correct password     PASS
[5/5] GET /d/test-slug with cookie                      PASS
verify-gate: ALL 5 STEPS PASSED
```

The 5 checks correspond 1:1 to the PRD FR9 DoD:

| # | Test | PRD FR9 line |
|---|---|---|
| 1 | No cookie → 302 + zero lead data in body | "no-cookie → redirect with zero lead data in body" |
| 2 | `/login` returns 200, zero attendee emails in HTML | "login page renders zero lead data" |
| 3 | Wrong password → 401 | "wrong password → 401" |
| 4 | Correct password → 302 + `Set-Cookie: es_event_<id>` | "correct → content" (issue gate cookie) |
| 5 | With cookie → 200 dashboard | "correct → content" |

## Drizzle migration

`npm run db:push` was NOT run in this worktree because `DATABASE_URL` is not provisioned on the build agent. The migration is encoded in `shared/schema.ts`; whoever lands this on staging should run:

```bash
DATABASE_URL=postgres://... npm run db:push
```

Tables created on push: `events`, `attendees`, `screenings`, `sponsor_scores`, `influence`, `curation_tags`, `export_logs`, `pipeline_runs`, plus the 5 enum types.

## What's deferred to Week 2

- **`DbStorage`** — `MemStorage` still serves `getEventBySlug` / `createEvent`. Week 2 (FR1 ingest) swaps in the Drizzle-backed implementation alongside the CSV parser.
- **Provisioning UX** — events are created by code-call in v1 (the founder provisions one event per sponsor). Multi-tenant signup is explicitly a non-goal of this 6-week sprint (`decision-2.md` § Hard non-goals).
- **Cookie-parser middleware** — `eventGate` parses `Cookie:` headers itself so we don't need to gate the rest of the app on a middleware ordering question. Wiring `cookie-parser` globally is a Week 2 cleanup if other routes start needing cookies.

## References

- PRD: `docs/PRD.md` §FR9
- Council decision: `docs/council/decision-2.md` (Track 2 Week 1)
- Build PM plan: `docs/council/build-pm-proposal.md` (Wk 1 row)
- Tech Architect gate design: `docs/council/tech-architect-proposal.md` §5
