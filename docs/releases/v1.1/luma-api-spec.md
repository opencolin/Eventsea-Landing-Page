# v1.1 — Luma API ingestion: implementation-ready spec

> **Parent docs:**
> - Canonical product spec: `docs/PRD.md` § 4 "v1.1 — Luma API" + FR8 (update loop)
> - Council synthesis (forward ref): `docs/council/decision-2.md` — v1.1 is Sprint 3+ work; this worktree only deepens the spec, does not start the build
> - Tech architecture (forward ref): `docs/council/tech-architect-proposal.md` § 3 — Inngest upgrade when v1.1 lands and ≥3 concurrent events run
> - Operational SOP being automated: `.claude/skills/event-leads/SKILL.md` Step 7 ("Update loop")
> - Predecessor release brief: `docs/releases/v1.0-luma-api-ingestion.md` (conceptually v1.1; superseded by this doc)
>
> **Status:** Spec ready. No code yet. Build trigger = Sprint 3 council confirms ≥3 paying customers on v1.0 (CSV upload) AND ≥2 of them explicitly ask for scheduled re-ingestion as their gating ask. Until trigger, this doc deepens — but does not execute — the v1.1 plan.
>
> **Branch:** `release/prd-v1.1-luma-api`
> **Estimated effort:** 2–3 weeks for 1 engineer (per `v1.0-luma-api-ingestion.md`; refined day-by-day in § 8 below)
> **Depends on:** v1 (CSV upload, self-serve) shipped. Multi-tenant orgs (`v1.0-multitenant.md` marketplace track) shipped OR a minimum org+API-key model carved out (see § 2.6 below).

## 0. Why v1.1 matters

The v1 product (CSV upload) requires a sponsor to download a fresh Luma guest-list CSV every few days during a multi-week registration window and re-upload it. That's the lived friction the SIA + BuilderShip pilots hit: 5 update cycles per BuilderShip event, each ~hours of human action between the founder, the sponsor, and the export-then-screen cycle.

v1.1 replaces that loop with a connected-API model: the sponsor pastes their Luma API key once, picks the calendars to sync, and Eventsea polls (or webhooks, if available) on a schedule. New approvals get screened; removals get flagged; the dashboard auto-rebuilds.

**The wedge stays the same** (verified, scored, ranked leads). The change is operational: from "concierge update cycle" to "set-and-forget pipeline."

## 1. Luma API research summary

### 1.1 What we know (low-confidence — needs verification)

The PRD § 8 Q1 explicitly carries this as an open question: **"Luma API: auth model, guest-list endpoint quotas, webhook availability (would beat polling)."** This spec inherits that uncertainty. Every claim in this section is marked **CONFIRMED**, **LIKELY**, or **TODO/VERIFY**.

| Topic | Status | What we believe today | What needs verification |
|---|---|---|---|
| **Auth model** | LIKELY | Luma's public docs (`docs.lu.ma`) reference an `x-luma-api-key` header for host-side API access. Calendars are scoped per host account; one API key surfaces all calendars the host owns or co-hosts. | Confirm header name, key lifetime/rotation policy, whether OAuth-on-behalf-of-user is supported for multi-org use cases. URL to verify: `https://docs.lu.ma/reference/getting-started-with-your-api` (TODO: open and excerpt). |
| **Guest list endpoint** | LIKELY | `GET /public/v1/event/get-guests?event_api_id={id}` returns guests with at minimum `api_id`, `email`, `name`, `approval_status`, `registered_at`, `event_ticket`, and custom-question answers. Pagination via `pagination_cursor`. | Confirm exact response schema (especially whether company/build text from custom questions comes back inline or requires a second call). Confirm page size + cursor semantics. Confirm what `approval_status` values exist (`approved` / `pending_approval` / `declined` / `waitlist` — exact strings unknown). |
| **List events under a calendar** | LIKELY | `GET /public/v1/calendar/list-events` to enumerate calendars + events the API key has scope over. | Confirm endpoint name + whether calendar enumeration is separate from event enumeration. |
| **Rate limits** | TODO/VERIFY | No documented public number. Anecdotally Luma has been described as "generous for read endpoints, strict on writes." | **Critical.** Open a sandbox key, hammer `get-guests` at 1 req/sec, 5 req/sec, 20 req/sec; record the 429 boundary + the `Retry-After` semantics. This bounds the polling cadence in § 3. |
| **Webhook support** | TODO/VERIFY | Luma has shipped event-level webhooks for at least `guest.registered` / `guest.approved` (LinkedIn posts from Luma team reference this; not in our archive). Signature scheme unknown. | Confirm webhook types, payload schema, signature header + verification algorithm (HMAC-SHA256 with a shared secret is the most likely scheme). If webhooks exist and are reliable, § 3.3 becomes the primary path and the cron polling in § 3.1 becomes a safety net. |
| **Custom question answers** | LIKELY | Custom registration questions (LinkedIn, GitHub, company, build description — the fields our pipeline most cares about) are returned per-guest as a structured array of `{question, answer}`. | Confirm question identifier stability — i.e., if a host edits a question, does the existing answer get re-keyed or stranded? This affects diff semantics (§ 4). |
| **`guest_id` stability** | LIKELY | Luma's internal `api_id` for a guest is stable for the life of the registration. Re-registration after cancellation creates a new `api_id`. | Confirm. This is the diff key in § 4. If unstable, fall back to email. |
| **Removals (decline / cancel)** | TODO/VERIFY | Cancellations appear to either drop the guest from the list OR change `approval_status` to `declined`. The two cases require different diff treatment (true removal vs status flip). | Empirically check by registering, then cancelling, in a sandbox. |
| **Multi-calendar under one key** | LIKELY | One API key, scoped to a host's calendars, can query multiple calendars + events without a key rotation. | Confirm. Material to data model in § 2.4. |

### 1.2 What we explicitly do not know

- **OAuth.** No evidence Luma supports an OAuth grant for third-party apps to act on behalf of a host. If true, every sponsor pastes their own API key (or uses a delegated key the org admin generates). No "Connect with Luma" button.
- **Webhook signature scheme.** Critical for security; documented in § 6 as an open question.
- **Rate-limit budget per sponsor.** Whether 1 org with 50 events under 1 key gets the same budget as 50 orgs with 1 event each. Documented in § 6.

### 1.3 Verification checklist (before any code lands)

1. Open a Luma host account on a throwaway email. Generate an API key.
2. Pull `/public/v1/calendar/list-events` and `/public/v1/event/get-guests` against a real event. Capture the JSON shapes; commit them as fixtures under `server/integrations/luma/fixtures/`.
3. Hammer-test `get-guests` to find the 429 ceiling. Document.
4. Subscribe to whatever webhook surface exists; ship a test event from Luma's dashboard; capture the payload + signature header.
5. Cancel a registration; refresh the guest list; observe the removal semantics.
6. Re-key a custom question (rename it in the Luma dashboard); refetch; observe whether existing answers stay attached.

The verification checklist is itself the first half-day of the implementation timeline (§ 8 Day 1).

## 2. Connect-Luma UX

### 2.1 New page

**Path:** `client/src/pages/app-integrations.tsx`
**Route:** `/app/integrations` (sponsor admin only)
**Existing analog:** none yet — this is the first "connect an external service" UI in the product.

### 2.2 Page sections

1. **Header.** "Integrations". Sub-line: "Connect external sources so your dashboard auto-updates."
2. **Luma card.** Logo + state badge: `Not connected` / `Connected` / `Sync error`.
3. **Connect flow (drawer or modal):**
   - Step 1: Paste API key. Inline link to "How to get your Luma API key" (KB doc — out of scope here).
   - Step 2: "Verify" button → server calls `/public/v1/calendar/list-events` once with the pasted key. Server returns the list of calendars the key has access to.
   - Step 3: Sponsor picks 1+ calendars to sync. Optional `label` field (e.g. "BuilderShip 2026") per connection — the sponsor's own name for it.
   - Step 4: Click "Save & start syncing". Server stores the encrypted key + the chosen calendar set. First sync runs immediately (out-of-band).
4. **Connected state.** Shows label, calendar count, last sync timestamp, last sync result (success / N new guests / error), "Sync now" button, "Disconnect" button.
5. **Disconnect flow.** Confirmation modal: "This will stop auto-syncing. Existing leads stay in the dashboard. Re-connect any time."

### 2.3 Error states the UI must handle

| State | UI |
|---|---|
| Pasted key is malformed (wrong length / bad chars) | Inline validation error; no server call |
| `/list-events` returns 401/403 | "That key didn't work — Luma rejected it. Double-check you copied the full key." |
| `/list-events` returns 429 | "Luma rate-limited the verify call. Try again in a minute." (rare path) |
| Sponsor has zero accessible calendars | "This key has no calendars attached. Create or co-host a Luma calendar first." |
| Sync repeatedly errors over 24h | Card flips to red badge `Sync error`; tooltip shows last error class (auth / rate-limit / 5xx / unknown). Email notification to org admins. |

### 2.4 Data model

Two new tables in `shared/schema.ts`:

```ts
// luma_connections
{
  id: uuid (pk),
  organizationId: uuid (fk -> organizations.id),
  label: text,                           // sponsor-chosen, e.g. "BuilderShip 2026"
  apiKeyEncrypted: bytea,                // AES-256-GCM ciphertext (see § 2.5)
  apiKeyIv: bytea,                       // GCM IV
  apiKeyTag: bytea,                      // GCM auth tag
  apiKeyKid: text,                       // KMS key version ID for rotation
  status: enum('active','disconnected','error'),
  lastSyncedAt: timestamptz nullable,
  lastSyncResult: jsonb nullable,        // {added, removed, updated, errorClass?}
  createdAt: timestamptz default now(),
  disconnectedAt: timestamptz nullable,
}

// luma_calendars
{
  id: uuid (pk),
  connectionId: uuid (fk -> luma_connections.id) on delete cascade,
  lumaCalendarId: text not null,         // Luma's api_id for the calendar
  slug: text,                            // e.g. "buildership"
  name: text,                            // display name from Luma
  lastEventCount: int default 0,         // # events seen on last enumeration
  lastSyncedAt: timestamptz nullable,
  createdAt: timestamptz default now(),
  unique(connectionId, lumaCalendarId),
}

// luma_events  (events surfaced through a connected calendar)
{
  id: uuid (pk),
  calendarId: uuid (fk -> luma_calendars.id) on delete cascade,
  lumaEventId: text not null,            // Luma's api_id for the event
  name: text,
  startAt: timestamptz nullable,
  endAt: timestamptz nullable,
  internalEventId: uuid (fk -> events.id) nullable,  // maps to v1's Event row
  lastGuestCount: int default 0,
  lastSyncedAt: timestamptz nullable,
  createdAt: timestamptz default now(),
  unique(calendarId, lumaEventId),
}

// luma_sync_runs  (audit log)
{
  id: uuid (pk),
  connectionId: uuid (fk -> luma_connections.id),
  eventId: uuid (fk -> luma_events.id) nullable,  // null if calendar-level enumeration only
  trigger: enum('cron','webhook','manual'),
  startedAt: timestamptz,
  finishedAt: timestamptz nullable,
  result: enum('success','partial','error'),
  added: int default 0,
  removed: int default 0,
  updated: int default 0,
  errorClass: text nullable,             // 'auth' | 'rate_limit' | '5xx' | 'unknown'
  errorMessage: text nullable,
  requestCount: int default 0,           // how many Luma API calls this run made
}
```

### 2.5 Encryption: per-org data key + envelope

The API key is the keys to the sponsor's Luma kingdom. Storage requirements:

- **Algorithm:** AES-256-GCM (authenticated, with IV + tag).
- **Key management:** envelope encryption.
  - A **root KMS key** lives in AWS KMS (or GCP KMS — pick at infra-decision time; tracked in `tech-architect-proposal.md`).
  - For each org, on first integration setup, generate a **per-org data encryption key (DEK)**: 256-bit random, encrypted by the root key, stored as `org_data_keys(organizationId, dekCiphertext, kmsKeyId, createdAt, rotatedAt)`.
  - To encrypt an API key: decrypt the org's DEK via KMS (1 KMS call, cached in-memory for the request), then AES-256-GCM the API key with the DEK.
  - Per row, persist: `apiKeyEncrypted` (ciphertext), `apiKeyIv` (12 bytes, fresh per encryption), `apiKeyTag` (16 bytes), `apiKeyKid` (KMS key version that wrapped the DEK).
- **Decryption path:** sync workers call `decryptApiKey(connectionId)` which (a) loads the row, (b) loads the org DEK from cache or KMS, (c) returns the plaintext only inside the worker process; never logs, never returns over the wire.
- **Rotation:**
  - Root key: KMS handles automatic annual rotation; `apiKeyKid` recorded so we know which version wrapped which DEK.
  - Per-org DEK: rotate on-demand (admin-triggered) or on suspected compromise. Rotation re-encrypts all `apiKeyEncrypted` rows for that org under the new DEK.
  - API key itself: the sponsor rotates in Luma's dashboard, then re-pastes; we have no "rotate API key" button because we can't generate Luma keys for them.
- **Audit:** every decrypt logs `(connectionId, workerId, timestamp)` to an append-only audit table (`secret_access_log`). No plaintext, no key material — just the access event. Retention: 1 year.
- **Local dev:** in non-prod, the KMS path is mocked with a local-only AES key in `process.env.LUMA_DEV_DATA_KEY`. The mock is gated by `NODE_ENV !== 'production'` and the worker refuses to start in prod without real KMS credentials.

### 2.6 Multi-tenant prerequisite

This release assumes the v1.0-multitenant work (orgs + memberships + roles) has shipped. If it hasn't, scope a minimum out: single-org-per-deploy mode where `organizationId` is implicit and the integrations page is reachable to whoever holds the deploy's admin password (the same gate that protects the dashboards today per FR9).

## 3. Sync scheduler

### 3.1 Cron path (primary in absence of webhooks)

**Job name:** `lumaSync`
**Framework:** Inngest (per `tech-architect-proposal.md` § 3 — upgrade to Inngest is gated on v1.1 landing + ≥3 concurrent events; this release crosses that line).
**Cadence:** every hour per active connection (`*/60 * * * *` per connection, jittered).
**Trigger:** Inngest scheduled function `lumaSync.cron.hourly` fans out:

```
1. Load all connections where status='active'
2. For each connection, send event `luma/sync.connection.requested` with {connectionId}
3. Inngest fan-out: one worker per connection (idempotency key = connectionId+hourBucket)
4. Per connection worker:
   a. Decrypt API key
   b. Enumerate calendars (use stored set; verify still accessible)
   c. For each (calendarId, eventId), send `luma/sync.event.requested` with {connectionId, eventId}
5. Per event worker (this is where the meat is):
   a. Fetch guest list (paginated)
   b. Diff vs persisted attendees (see § 4)
   c. For each addition, send `attendee.added` with {eventId, guestPayload}
   d. For each removal, send `attendee.removed` with {eventId, guestId}
   e. For each update, send `attendee.updated` with {eventId, guestId, diff}
   f. Write a `luma_sync_runs` row with counts + duration
6. The v1 light-screen pipeline subscribes to `attendee.added` and enqueues a screening job
```

Per-event worker concurrency is capped (per connection) so one sponsor's 50-event calendar doesn't drown the Luma API budget. Cap: `min(5, eventCount)` parallel events per connection.

### 3.2 Backoff + jitter

- Per-connection schedules are jittered by ±5 minutes so the top-of-hour traffic isn't a thundering herd.
- On 429, exponential backoff: respect `Retry-After` if present; otherwise 30s → 60s → 120s → … cap 30 min. After 3 consecutive 429s, mark the run `partial`, schedule a retry in 1 hour.
- On 5xx, same backoff, but after 3 fails mark run `error` and bubble up — the cron will retry next hour.
- On 401/403, flip the connection to `status='error'` with `errorClass='auth'` and email the org admin. Stop polling until reconnected.

### 3.3 Webhook path (preferred when available)

**If Luma webhooks exist:**

- Endpoint: `POST /api/webhooks/luma` (server route)
- Each connection registers its callback URL with Luma at connect time (TODO/VERIFY: is this a per-key console toggle, a per-event toggle, or a programmatic API?).
- Inbound flow:
  1. Verify HMAC signature against per-connection webhook secret (see § 6 open question on scheme).
  2. Look up the connection by the secret index.
  3. Parse the event type: `guest.registered`, `guest.approved`, `guest.declined`, `guest.cancelled`, etc.
  4. Send `luma/sync.event.requested` to Inngest with the affected `{eventId}` — re-fetch the single guest by `api_id` (don't trust the webhook payload as the source of truth; treat it as a hint).
  5. Diff + emit `attendee.added` / `attendee.removed` exactly as the cron path does.
- Webhooks reduce mean lag from ~30 min (cron + screening latency) to ~1 min.
- **Cron stays on as a safety net** at 4-hour cadence even with webhooks active — to catch missed webhooks and reconcile state.

### 3.4 Budget guard

Per § 6 open question on per-sponsor rate-limit budget: every sync run records `requestCount`. A daily aggregate per connection flags if a sponsor org is approaching a daily quota (TBD once empirics in § 1.3 are in). When close, throttle the cron cadence for that org to 4h or 12h depending on the squeeze.

## 4. Diff semantics

### 4.1 Identity keys

- **Primary:** Luma `guest_id` (their `api_id`). Stored on `attendees.lumaGuestId`. Unique within `(eventId, lumaGuestId)`.
- **Fallback:** lowercased + trimmed email, when `lumaGuestId` is missing (legacy CSV-imported rows from v1 won't have it).
- **Fallback fallback:** if the same person re-registers with a different email under a new `guest_id`, we treat them as a new attendee. Same-human dedup is a v1 concern (FR1: "detect same-human duplicates"), and the v1.1 diff inherits whatever same-human linker v1 ships.

### 4.2 Operations

| Diff outcome | Action |
|---|---|
| **Addition** — `guest_id` not in DB, or in DB with `removedAt` set | Insert (or revive) the attendee row. Compute the registration-signal score (FR1). Enqueue light-screen (FR2) — this is the cost-saving win. Fetch X/GitHub followers for new handles (FR4). Rebuild dashboard JSON for the event. |
| **Removal** — `guest_id` in DB but not in latest fetch | Soft-delete: set `removedAt = now()`, `removalReason = 'luma_dropped'`. Do NOT delete the attendee row; sponsors want to see who *was* registered. If the attendee was in a curated slot (Top-N builder or judge panel, per FR6), set `curationBackfillNeeded = true` on the event and surface a UI prompt next time an org admin loads the dashboard ("BuilderShip 2026: 3 curated slots lost; click to backfill"). |
| **Update** — same `guest_id`, different `email` / `company` / custom-question answer | Update the registration fields. If the change touches anything we screened against (company, role, build description, LinkedIn URL), set `screeningStale = true` and enqueue a re-screen. If the change is cosmetic (display name punctuation), no re-screen. |
| **Status flip** — `guest_id` flips to `approval_status='declined'` (vs disappearing) | Treat as removal. Track `removalReason = 'luma_declined'` so we can distinguish "host declined" from "guest cancelled." |
| **Re-registration after cancellation** — same email, new `guest_id` after a prior `guest_id` was removed | Insert as new attendee (new row), link to the prior soft-deleted row via `previousAttendeeId`. Re-screen only if the prior screening is older than the new registration timestamp. |

### 4.3 Why this scheme

The cost win in § 5 is **only addition gets screened**. Removals are free (just a soft-delete + UI flag). Updates are free unless they touch a screened field. This requires the diff to be precise — false positives on "this is an update that touches screening" silently 10× the bill.

### 4.4 Idempotency

Every sync run is idempotent: re-running on the same event guest list within the same hour produces zero events (no new additions, no removals). Idempotency key on the per-event worker = `(eventId, contentHash)` where `contentHash = sha256(sortedGuestIds)`. If the hash matches the last run's hash, exit early.

## 5. Cost model

### 5.1 Re-screening only additions

**Pilot baseline (BuilderShip):** 726 registrants. Full pipeline run cost (light + deep screening + influence + reconciliation): order $X (v1 will firm this — placeholder until v0.2 ships).

**Multi-week registration window (representative):**
- Day 0: 200 registrants registered ahead of opening
- Days 1–28: ~25 new registrants per day = 700 new
- Day 28 (event): 900 total
- Naive CSV-reupload approach: 5 update cycles × 900 avg rows re-screened = ~4,500 row-screenings billed, or ~5× the cost of a single full run.
- v1.1 (additions only): 200 + 700 = 900 row-screenings billed total. ~5.0× → 1.0× = **80% reduction** in light-screen cost vs naive re-uploads.
- vs a hypothetical "re-screen every row, every cron tick" worst case (hourly × 28 days × 900 avg): **95%+ reduction**.

The "95%" headline in `v1.0-luma-api-ingestion.md` is the worst-case framing. The realistic delta vs the manual CSV flow is 80% — still the dominant cost lever in the product.

### 5.2 Per-sponsor monthly cost estimate

Assume one active sponsor, one active event, rolling 500–1000 new RSVPs over a month:

| Cost line | Estimate (placeholder until v0.2 numbers firm) |
|---|---|
| Light screening (1000 × ~$0.03/lead at Token Factory open-model rates per PRD § 5 target <$0.10) | ~$30 |
| Deep screening (top 10% = 100 × ~$0.20/lead premium-model rate) | ~$20 |
| Tavily searches (1100 leads × 1.5 searches avg) | ~$10 |
| Influence fetches (1000 × ~free for X via fxtwitter + GitHub rate-limit-bounded) | ~$0 |
| Luma API calls (24 cron ticks × 30 days × 1 event × ~3 pages = 2,160 reqs; assume free tier holds) | ~$0 |
| Inngest function runs (~3,000 per month at current pricing tier) | ~$5 |
| KMS calls (~3,000 decrypts / mo) | ~$1 |
| **Total per sponsor / event / month** | **~$66** |

At a $7.5K quarterly pilot price (Founder/Ops proposal), gross margin per sponsor per quarter is ~$7,300 = 97%. The cost model holds the PRD's "<$0.10 per attendee" target comfortably.

The number to watch is the Tavily + premium-model line: if deep tier expands to >10% of leads, this doubles.

## 6. Open questions carried forward

These are the questions whose answers gate implementation. They are **not** issues to resolve mid-build — resolve before Day 1 of § 8.

1. **Webhook signature verification scheme.** If Luma supports webhooks, what header carries the signature? What algorithm? Is the secret per-webhook-subscription or per-API-key? Without this, the webhook path in § 3.3 cannot ship securely. Falling back to cron-only loses the 1-min latency win but the product still works.

2. **Multi-event single-connection vs per-event API key.** Does one host API key cover all calendars they own/co-host? Or do they need a separate key per calendar? If per-calendar, the connect-Luma UX (§ 2) needs a "Add another calendar" flow rather than a single paste. Affects also the data model: `luma_connections` may need to be 1-to-1 with a calendar instead of 1-to-many.

3. **Rate-limit budget per sponsor org.** Per-IP? Per-key? Per-host? Does Eventsea aggregate budget across all its customers (one IP, many keys) or is it per-key? This determines whether we have to share a budget across our customer base (risk: one sponsor's noisy syncs starve another's) or each customer brings their own budget. Material to § 3.4 budget guard.

Carry-forward from PRD § 8:
4. **Attendee opt-out / data-retention policy per jurisdiction.** v1.1 surfaces a webhook-style continuous data flow; GDPR right-to-be-forgotten becomes more complex than the v1 "delete on request" because Luma keeps re-syncing the guest. Need an `optOutEmails` blocklist that the sync respects.
5. **Custom question rekey behavior.** If a host renames a custom question in Luma's UI, do existing answers preserve their identity in the API response? Affects whether updates falsely trigger re-screens.

## 7. Acceptance test

> **Verbatim from PRD-derived release brief, expanded with verifiable preconditions.**

**Preconditions.**
- Sponsor has a Luma host account with at least one published calendar containing at least one open event.
- Sponsor is an admin in an Eventsea org on v1.0+.
- The v1 light-screen pipeline (FR2) is operational in production.

**Steps.**
1. Sponsor navigates to `/app/integrations`, pastes their Luma API key, clicks Verify.
2. Within 5 seconds, the UI shows the list of calendars accessible by that key.
3. Sponsor selects 1 calendar, names the connection "BuilderShip 2026", clicks Save & start syncing.
4. The first sync run completes within 5 minutes (initial full pull may be heavier than a delta).
5. Sponsor opens the dashboard for the event under that calendar. **Within 1 hour of connecting, the dashboard shows the calendar's current guest list** with V/P/U verdicts, per-sponsor score columns, and influence ranks populated.
6. While the sponsor watches, a colleague RSVPs to the underlying Luma event with a new email.
7. **Within 10 minutes**, the new lead appears on the dashboard with all v1 columns populated (verdict, sponsor scores, X/GitHub followers, influence rank).
8. The colleague cancels their RSVP. Within 10 minutes, the lead is soft-deleted from the dashboard (visible as a `Removed` chip; data retained for audit).

**Pass criteria.**
- Step 5 latency: connect → dashboard reflects current state ≤ 1 hour.
- Step 7 latency: new RSVP → screened lead on dashboard ≤ 10 min.
- Zero plaintext API key in any log, response body, or DB column.
- `luma_sync_runs` rows exist for every sync attempt with non-null `result`.

## 8. Sequencing — 2-to-3 week build, 1 engineer

Day-by-day. Assumes preconditions in § 6 are answered before Day 1 (kick off with the verification checklist in § 1.3 as Day 1 itself).

| Day | Work | Output |
|---|---|---|
| **D1** | Verification checklist (§ 1.3): generate sandbox Luma key; pull `/list-events`, `/get-guests`; hammer for 429; subscribe webhook if available; capture fixtures. | `server/integrations/luma/fixtures/*.json`; doc updates to § 1.1 confidence labels; webhook signature scheme answered or marked impossible. |
| **D2** | Data model: write `shared/schema.ts` migrations for `luma_connections`, `luma_calendars`, `luma_events`, `luma_sync_runs`, `org_data_keys`, `secret_access_log`. | Migration PR (no UI yet). Local dev DB migrated. |
| **D3** | Encryption helpers: `server/security/envelope.ts` with `encryptApiKey`, `decryptApiKey`, KMS adapter + local-dev mock. Unit tests for round-trip, IV uniqueness, tag tamper rejection. | `server/security/envelope.ts` + tests passing. |
| **D4** | Luma client: `server/integrations/luma/client.ts`. Typed wrappers for `listCalendars`, `listEvents`, `getGuests` (with cursor pagination). Backoff helpers. Replay against D1 fixtures. | Client + fixture-based tests passing. |
| **D5** | Diff engine: `server/integrations/luma/diff.ts`. Pure function: `(persistedAttendees, freshGuests) -> {added, removed, updated}`. Property tests for idempotency + commutativity. | Diff engine + tests passing. |
| **D6–D7** | Inngest scaffolding (if not already in prod from a prior release): install, wire env vars, ship the `lumaSync.cron.hourly` skeleton that no-ops. Verify cron actually fires in staging. Wire `attendee.added` / `attendee.removed` / `attendee.updated` event types into Inngest's type system. | Inngest cron running; events flowing; no real work yet. |
| **D8** | Per-event sync worker: glue D4 (client) + D5 (diff) + D7 (Inngest events). Idempotency key. `luma_sync_runs` rows written. Hand-tested against the staging Luma calendar. | One real connection successfully syncing on cron. |
| **D9** | Wire `attendee.added` → existing v1 light-screen enqueue. Wire `attendee.removed` → soft-delete + curation-backfill flag. Wire `attendee.updated` → conditional re-screen. | End-to-end: new RSVP triggers screening. |
| **D10–D11** | Connect-Luma UI: `client/src/pages/app-integrations.tsx`. Verify flow, calendar picker, connected state, disconnect. Error states from § 2.3. | UI works against staging API. |
| **D12** | Webhook endpoint (if § 6 Q1 answered): `POST /api/webhooks/luma`, signature verify, dispatch to per-event sync. | Webhook path live or explicitly deferred to v1.1.1. |
| **D13** | Acceptance test (§ 7) run end-to-end on staging with a fresh Luma calendar. Fix gaps. | Acceptance test green. |
| **D14** | Observability: dashboards for sync success rate, p50/p95 sync latency, 429 rate, KMS error rate. Alerts on `errorClass='auth'` (= sponsor needs to reconnect). | Grafana / Datadog (TBD) panels live. |
| **D15** | Docs: KB article "How to get your Luma API key"; in-app empty state; rollout email to existing v1.0 sponsors. | Docs landed. |
| **Buffer (D16–D21)** | Slop for: webhook signature scheme turns out non-trivial; rate-limit surprises; the `screeningStale` re-screen logic having edge cases; the multi-tenant prerequisite (§ 2.6) needing scope-down. | Used or not. |

Total: 10 working days of core build + 5 days of polish + 5 days buffer = 2-3 calendar weeks. Matches the predecessor brief's "2-3 weeks for 1 engineer."

## 9. Out of scope (deferred)

- Eventbrite, Meetup, partiful ingestion. Add when ≥3 customers ask. Same diff engine should generalize via an `IngestionAdapter` interface; punt the abstraction until the second adapter materializes.
- Direct HubSpot / Salesforce API push (PRD FR7 v1.1+ side-note). Keep CSV export as the bridge in v1.1; revisit in v1.2.
- Replacing Luma as the RSVP layer. Eventsea reads; doesn't host.
- Multi-language event support.
- Custom polling cadences per connection (UI). Hardcode 1h; expose in v1.2 if asked.

## 10. Notes for the build agent

- **Trust but verify Luma's docs.** Every claim labeled LIKELY in § 1.1 may turn out wrong. Day 1 verification is the first thing that happens; the rest of the plan flexes around what's found.
- **The Inngest assumption.** Per `tech-architect-proposal.md` § 3, this is the release that flips us to Inngest. If we land here without a working Inngest install, add ~3 days for that migration.
- **Don't skip the soft-delete.** Hard-deleting removed guests breaks the curation-backfill flow (§ 4.2) and erases an audit trail the sponsor will need post-event.
- **Plaintext is the enemy.** Every dev who joins this code will, at some point, want to `console.log(apiKey)` to debug. Make it impossible: the `decryptApiKey` return type should be a tagged opaque type with a `Symbol`-keyed accessor used only by the HTTP client.
