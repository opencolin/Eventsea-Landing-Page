# Eventsea Enterprise Suite — PRD v3

> Synthesis PRD: the best of Luma (event ops + community calendars + mobile-first design + payments), the best of Vendelux (ICP intelligence + pre-event meeting booking + CRM attribution), and Eventsea's defensible wedges (per-attendee V/P/U verification, per-sponsor multi-product scoring, calendar audit). Wraps with a tight enterprise integration spine: Luma API, HubSpot, Slack, Google/Microsoft Calendar, and Resend for email.
>
> **Replaces** `PRD-v2-best-of-breed.md` for v3 planning. v2 framed the field-marketing-intelligence wedge as "category-defining" — the Vendelux research corrected that. This PRD is the late-mover, integration-first re-plan.
>
> **Author**: Sprint 3 Council. **Date**: 2026-06-28. **Status**: Draft for council review.

## 0. Executive summary

**Problem**: Today's events stack is fragmented in two directions. (a) Organizers run Luma for community + ticketing but lose all of it the moment they need sponsor intelligence, ICP routing, CRM attribution, or enterprise security. (b) Sponsors run Vendelux for event selection + pre-event meetings but it doesn't host the event, can't check anyone in, has no community surface, and starts at $20K/year. Nobody has both sides on one operating model.

**Wedge**: Eventsea is the **first events operating system** that unifies organizer ops (à la Luma) with sponsor intelligence (à la Vendelux), gated by **per-attendee V/P/U verification** and **per-sponsor scoring** — wrapped in an enterprise integration spine (Luma API for hosting, HubSpot/Salesforce for CRM, Slack for activation, Resend for email, Google/MS Calendar for meetings).

**Positioning sentence**: *"Run your events on Luma. Run your sponsorships on Eventsea. One verified guest list, one pipeline."*

**v3 product cut**: 28 features across 6 surfaces. Sub-$10K entry tier, mid-market $25K, enterprise from $60K. Three-phase build: MVP in 6 weeks, Beta in 12 weeks, GA in 24 weeks.

## 1. Strategic context (carry-over from research)

- **Vendelux** owns the sponsor-side event-intelligence category since 2020. $16.4M raised, $2.1M ARR, 66 employees, 250K event DB, Fortune 500 customers. Pricing floor $20K. Their "Predicted" attendee tier is explicitly unguaranteed — the gap we exploit with V/P/U.
- **Luma** owns the community calendar + indie/tech events scene. Free tier + $59/mo Plus + Enterprise with SSO/Salesforce/custom-domain. Beautiful pages, instant Stripe payout, calendar-as-social-graph. No sponsor intelligence layer at all.
- **Cvent** spent $700M in Dec 2025 (Goldcast + ON24 + Splash earlier) consolidating execution + video. Not consolidating pre-event intelligence. **Vendelux's lane and Luma's lane both remain unguarded by the megacaps.**
- **Lensmor** is the price disruptor at $499–$899/mo on the Vendelux side. Validates mid-market demand below the $20K floor.
- **TAM**: AI-Powered Event Sponsorship Analytics = $1.47B today, 18% CAGR ($3.39B by 2030). We are entering this category as a late-mover with a verification + integration angle.
- **Buyer pain (Forrester/IDC 2025)**: 86% can't attribute ROI to events; 70% lack pre-event attendee visibility; only 13% rate event selection as fully data-driven; 28% of large orgs deploy 6+ event tools (sprawl is real).

Full research: `docs/competitive/vendelux-comparison.md`, `docs/competitive/research/event-intelligence-landscape-2026.md`, `docs/competitive/research/vendelux-ui-and-feature-inventory.md`, `docs/competitive/research/luma-feature-inventory-2026.md`.

## 2. Product vision — the 3-pillar suite

### Pillar A — Run Events (Luma-grade host experience)
The organizer side. Eventsea does NOT compete with Luma on community calendars or RSVP UX — we **integrate** with Luma as the primary hosting backend. Eventsea adds the host-grade layer on top: ICP routing of registrants to sales, sponsor-revenue per registration, verified guest list, intelligent badges + scanner.

### Pillar B — Sell Sponsorships (Vendelux-grade sponsor intelligence)
The sponsor side. Eventsea ships ICP filtering, target-account overlays, predicted-vs-verified attendees, pre-event meeting orchestration via Resend + calendar, per-sponsor scoring, pipeline attribution into HubSpot/Salesforce.

### Pillar C — Verify Everyone (the Eventsea wedge)
Every attendee gets a **V/P/U verdict** (Verified / Partial / Unscreenable) using two-tier screening: deep enrichment for the top 10%, light batched verification for everyone. Every sponsor gets a per-product score against the verified roster. This is the layer Vendelux's "Predicted" can't credibly offer and Luma never tried to build.

## 3. The 28 features (v3 cut, ranked by must/should/could)

### 3.1 MUST — MVP (Weeks 1–6, ship to first 5 design partners)

| # | Feature | Source pattern | Eventsea twist |
|---|---|---|---|
| M1 | **Luma event ingest** via API + webhook | Luma `event.created/updated`, `guest.registered`, `ticket.registered` | Mirror to our Postgres; bi-dir sync where API allows |
| M2 | **Verified guest list (V/P/U)** | Eventsea original (BuilderShip pilot, 726 reg) | Two-tier screening: top 10% deep enrich (Tavily + Nebius + Claude), rest batched |
| M3 | **Per-sponsor scoring** | Eventsea original | Per-product, with conflict overrides; ranked roster per sponsor |
| M4 | **Calendar audit** (paste Luma calendar URL → audit report) | Eventsea wedge | The low-CAC entry product; demos in 5 min |
| M5 | **Password-gated event dashboards** (FR9) | Eventsea original | bcrypt + HMAC HttpOnly cookie `es_event_<id>`, already shipped server-side |
| M6 | **HubSpot CRM push** | Vendelux pattern | Push registrants as Contacts; create Deal record per scored opportunity |
| M7 | **External check-in scanner** | **Luma external check-in API** | iOS PWA + camera; QR → `public-api.luma.com/v1/events/guests/get`; offline-tolerant queue |
| M8 | **Resend transactional email** | Resend best practice | All outbound (verification confirmations, scoring reports, gate emails) via Resend's domain auth + idempotency |

### 3.2 SHOULD — Beta (Weeks 7–12, 25 paying customers)

| # | Feature | Source pattern | Eventsea twist |
|---|---|---|---|
| S1 | **ICP filter builder** ("Segments") | Vendelux Segments | People + Org modes, Include/Exclude, bulk-paste, default-segment star — *match Vendelux UI shape* |
| S2 | **Pre-event meeting orchestration** | Vendelux Meetings | Send via Resend, book on Google/MS Calendar; offer self-serve + managed tiers |
| S3 | **Slack activation** | Eventsea integration | New verified VIP registers → ping #sales channel with profile + suggested rep; new sponsor signup → #revenue |
| S4 | **Bi-directional Salesforce sync** | Vendelux CRM Integration | Native package (Luma's is one-way; we ship bi-dir as differentiator) |
| S5 | **Event ROI calculator** + per-event scorecard | Vendelux pattern | Embed in dashboard; export PDF for sponsor recap |
| S6 | **Multi-tenant orgs** (Clerk) | Standard SaaS | Workspace = Org → Calendars → Events; role-scoped permissions |
| S7 | **Multi-channel blasts** | Luma Blasts | Email (Resend) + SMS (Twilio) + Slack to verified attendees only |
| S8 | **Sponsor recap PDF** | Eventsea original | Auto-generated post-event: scored leads, meetings booked, pipeline attribution |
| S9 | **Light AI assistant for hosts** | ChatVDX inspiration | Resend draft generator + scoring-rule helper; not a full chat surface in MVP |

### 3.3 COULD — GA (Weeks 13–24, scale phase)

| # | Feature | Source pattern | Eventsea twist |
|---|---|---|---|
| C1 | **Calendar-as-social-graph** | Luma pattern | Subscribable Eventsea org pages; follow + notify on new events |
| C2 | **Hosted event pages** (built on Eventsea, not Luma) | Luma pattern | For orgs that want to skip Luma entirely; render same beautiful pages, native Stripe |
| C3 | **Badge printing** + on-site hardware | Luma Enterprise gap | Brother QL-1110NWB integration; print on check-in |
| C4 | **Mobile companion app** (PWA → native) | Luma iOS app | Live Activities-style countdown + offline check-in queue |
| C5 | **Pre-event drip sequences** | Luma gap | 28/11/24 cadence à la Vendelux; configurable |
| C6 | **Attendee-to-attendee profiles + matchmaking** | Luma gap | Opt-in directory per event |
| C7 | **Predictive attendance modeling** | Vendelux Predicted | Historical-pattern model; explicit V/P/U handling so we don't repeat Vendelux's accuracy debt |
| C8 | **Multi-event portfolio analytics** | Vendelux portfolio view | Per-org dashboard: spend, pipeline, ROI by event, owner, region |
| C9 | **Sponsor marketplace** | Original | Match orgs hosting events ↔ sponsors looking for relevant audiences |
| C10 | **Public API + webhooks** | Luma webhooks | HMAC-SHA256, mirror Luma's signing format so customers can reuse middleware |
| C11 | **SSO + SCIM** (Okta/Entra/Auth0/Google) | Luma SSO + Eventsea improvement | Add **SCIM** (Luma is JIT-only — our enterprise differentiator) |

## 4. Integration architecture

### 4.1 The integration spine

```
                              ┌──────────────────────────────┐
                              │      EVENTSEA CORE           │
                              │  (Express + Vite + Drizzle)  │
                              │     Postgres (Neon)          │
                              └─────────────┬────────────────┘
                                            │
        ┌───────────────────┬──────────────┼──────────────┬────────────────┬──────────────┐
        │                   │              │              │                │              │
        ▼                   ▼              ▼              ▼                ▼              ▼
   ┌─────────┐         ┌──────────┐  ┌──────────┐   ┌──────────┐    ┌──────────┐   ┌──────────┐
   │  LUMA   │         │ HUBSPOT  │  │  SLACK   │   │  RESEND  │    │ GOOGLE/  │   │  STRIPE  │
   │   API   │         │ +SF API  │  │  Bot +   │   │  Domain  │    │MICROSOFT │   │ (payout) │
   │         │         │          │  │  Webhook │   │  + Send  │    │ CALENDAR │   │          │
   └─────────┘         └──────────┘  └──────────┘   └──────────┘    └──────────┘   └──────────┘
   host events         CRM ICP +     activation     transactional   meeting        ticketing
   guest data          attribution   notifications  email           booking        revenue
```

### 4.2 Luma adapter (`/server/adapters/luma/`)

**Auth**: API key per calendar (Luma Plus floor). Stored encrypted in `org_credentials` table.
**Read paths**:
- Initial sync: `GET /v1/calendar/list-events` → backfill our `events` table
- Per-event sync: `GET /v1/event/get?event_id=...` → upsert
- Guests: `GET /v1/event/get-guests?event_id=...` → upsert into `attendees`
- **External check-in**: `GET /v1/events/guests/get?event_id=...&id={pk}` — called from our scanner PWA

**Webhook ingestion** (`POST /api/webhooks/luma`):
- HMAC-SHA256 verify using `whsec_*` secret; reject if `t=<ts>` outside ±5min window
- Handle the 8 event types:

| Luma event | Eventsea action |
|---|---|
| `calendar.event_added` | Insert into `events`, queue full-sync job |
| `calendar.person_subscribed` | Insert into `org_followers` |
| `event.created` | Mirror + schedule pre-event screening pipeline |
| `event.updated` | Diff + upsert |
| `event.canceled` | Mark canceled; pause campaigns |
| `guest.registered` | Insert into `attendees` (status=Pending) → enqueue V/P/U screening |
| `guest.updated` | Upsert |
| `ticket.registered` | Upsert ticket; trigger Slack ping if attendee is `Verified` AND in any sponsor's ICP segment |

**Write paths** (where Luma API allows):
- Bulk invite/approve via guest endpoints
- Tag application
- Cancel/reject — pass through

### 4.3 Scanner / Check-in (Luma's external check-in API + Eventsea state)

**Client**: iOS PWA built into the Eventsea dashboard, camera-first.

```
1. User opens /scan?event=<event_id> on phone
2. PWA requests camera permission, opens BarcodeDetector or @zxing/library
3. On scan → parse URL:
   format = https://luma.com/check-in/{event_id}?pk={key}
4. Validate event_id matches selected event (defensive: prevent wrong-event scans)
5. GET https://public-api.luma.com/v1/events/guests/get?event_id={...}&id={pk}
   → response: guest + tickets + check-in state
6. Render decision UI:
   - "✅ Verified + checked in" (green)
   - "🟡 Verified — confirm check-in" (yellow, big "Check In" button)
   - "⚠ Unverified guest (P or U) — sponsor view recommended" (caution)
   - "❌ Wrong event" / "❌ Unknown ticket" (red)
7. On confirm: POST to Eventsea internal /api/events/{id}/check-in
   - Body: { pk, scanner_user, timestamp, decision }
   - Eventsea writes our own check-in row (Luma may or may not expose write
     endpoint; if not, we reconcile via post-event CSV import)
8. Offline mode: queue local IndexedDB → flush on reconnect; show pending count
```

**Why this matters**: Luma's check-in is iOS-app-only and gated to scopes inside Luma. Eventsea's scanner unlocks: per-sponsor check-in flags (sponsor staff see "did our top 50 ICP accounts show up?" live), VIP fast-track lanes, real-time Slack pings on big-fish arrivals, and badge printing on first check-in.

**TBD during build**: Confirm whether Luma exposes a public write endpoint for marking attendance. If not, we own the canonical check-in state in our DB and post-event reconcile against Luma's CSV. Either path works — the read endpoint is already published.

### 4.4 HubSpot adapter (`/server/adapters/hubspot/`)

**Auth**: HubSpot OAuth, per workspace.
**Initial mapping**:

| Eventsea | HubSpot | Direction |
|---|---|---|
| Attendee (Verified) | Contact | Bi-dir (HubSpot is system of record for ICP attributes) |
| Event | Custom Object `Event` (or Campaign if no custom obj license) | Eventsea → HubSpot |
| Sponsor | Company + Deal | Bi-dir |
| Scored Lead | Contact + custom property `eventsea_score`, `eventsea_verdict`, `event_id` | Eventsea → HubSpot |
| Meeting booked | Meeting object (HubSpot Meetings) | Eventsea → HubSpot |

**Triggers**:
- New `Verified` attendee in any active campaign ICP → push Contact + assign to deal owner
- Meeting booked → write Meeting object + email rep
- Post-event sponsor recap → write Note on each sponsor's Company record

**Salesforce parity** (S4): same shape via the Salesforce REST API + a managed package that mirrors Luma's design but **bi-directional** (Luma's package is one-way — that's our enterprise sales angle).

### 4.5 Slack adapter (`/server/adapters/slack/`)

**Auth**: Slack OAuth bot install per workspace.
**Configuration**: per-org admin sets channel routing rules:

```
On verified VIP registers (score > 80 AND in sponsor ICP):
  → ping #sales-{sponsor_slug}
On 24h before event:
  → post pre-event briefing to #revenue (top 20 expected accounts)
On new sponsor signup:
  → ping #revenue
On post-event:
  → post scorecard PDF link to #revenue and #marketing-leadership
```

**Bot capabilities**:
- Block Kit cards for attendee profiles (avatar, title, company, score, verdict, "view in Eventsea" button)
- Slash command `/eventsea event <name>` → quick lookup of any active event status
- Reactji workflow: react :thumbsup: on attendee card → auto-assigns ownership to that rep

### 4.6 Resend (email) adapter (`/server/adapters/resend/`)

**Why Resend**: Best-in-class DX, domain auth via DKIM/SPF/DMARC, idempotency keys, React Email templates, batch endpoints, dedicated IPs available.

**Templates** (React Email under `/emails/`):
- `VerificationStarted.tsx` — sent on guest register, "we're verifying your registration"
- `OrganizerScreeningReport.tsx` — sent to host post-screening with V/P/U breakdown
- `SponsorPreEventBriefing.tsx` — sent to sponsor reps 7/3/1 days before with verified target accounts
- `MeetingRequest.tsx` — sent to verified VIPs offering pre-event meetings (à la Vendelux)
- `MeetingConfirmation.tsx` — calendar invite + briefing notes
- `EventGateAccess.tsx` — magic-link to gated dashboard
- `SponsorRecap.tsx` — post-event PDF + dashboard link

**Sending domains**: per-org configurable (e.g., `notify@<org>.eventsea.app` default; enterprise can use `notify@<their-domain>.com` with their own DKIM keys — matching Luma's Enterprise custom-sending-domain feature).

**Idempotency**: every send tagged with `Idempotency-Key: evt-{event_id}-attendee-{pk}-template-{slug}` to survive retries on webhook replays.

### 4.7 Calendar adapter (Google Calendar + Microsoft 365)

**Why both**: enterprise events split ~60/40 G-Suite vs M365 in B2B SaaS.
**Auth**: OAuth per sales rep (not per org) — booking happens on rep's calendar.
**Capabilities**:
- List rep availability (15-min slots, working hours)
- Create event on accept (with conferencing link auto-attached: Meet for Google, Teams for M365)
- Update on reschedule, cancel on no-show
- Mirror Vendelux Meeting Scheduler shape — white-labeled booking page at `eventsea.app/book/{rep}/{event}`

**The book-meeting flow** (S2):
```
1. Sponsor enables "pre-event meetings" on event setup
2. Eventsea identifies Verified attendees in sponsor ICP
3. Generates outreach via Resend with rep-specific booking links
4. On click → /book/{rep}/{event} → calendar availability shown
5. On book → create Google/MS Calendar event on rep's calendar
6. Push Meeting object to HubSpot/Salesforce
7. Slack DM the rep with briefing notes 30 min before
```

### 4.8 Stripe (carry-over from existing)

Already wired. Two flows kept from existing Eventsea:
- Sponsor checkout for sponsorship purchase
- Optional: pass-through ticketing for orgs that want Eventsea-hosted events (C2)

## 5. Data model additions

Extending `shared/schema.ts` (Drizzle). Existing tables stay.

```ts
// New tables for v3 — Drizzle pseudocode
orgs: { id, name, slug, plan: 'starter'|'growth'|'enterprise', clerk_org_id }
org_credentials: { org_id, provider: 'luma'|'hubspot'|'salesforce'|'slack'|'resend',
                   encrypted_token, scope, expires_at }
events: { id, org_id, luma_event_id (unique), name, start_at, end_at, location,
          status, calendar_audit_id (nullable) }
attendees: { id, event_id, luma_guest_key (g-...), luma_ticket_key,
             email, name, company, title, linkedin_url,
             verdict: 'V'|'P'|'U', verdict_reasons jsonb, score int,
             status: 'pending'|'verified'|'checked_in'|'no_show' }
sponsors: { id, event_id, org_id (the sponsor's), name, products jsonb,
            icp_segment_id, allocated_credits int }
sponsor_scores: { sponsor_id, attendee_id, product_slug, score int,
                  conflict_override_reason text, computed_at }
segments: { id, org_id, type: 'people'|'org', conditions jsonb,
            is_default boolean }
lists: { id, org_id, name, type: 'csv'|'crm_pipeline'|'crm_customers'|
         'crm_competitors'|'crm_prospects' }
list_members: { list_id, contact_id, source }
campaigns: { id, event_id, sponsor_id, status, cadence: 'early'|'late'|'predicted',
             started_at, completed_at }
campaign_sends: { campaign_id, attendee_id, template, sent_at,
                  opened_at, replied_at, booked_meeting_id, resend_message_id }
meetings: { id, campaign_id, attendee_id, rep_user_id,
            calendar_provider, calendar_event_id, status, scheduled_at }
check_ins: { event_id, attendee_id, scanner_user_id, checked_in_at,
             location_lat, location_lng, was_offline boolean,
             synced_to_luma boolean }
slack_routes: { org_id, trigger, channel_id, conditions jsonb }
webhook_log: { provider, event_type, payload, received_at, processed_at,
               idempotency_key (unique), error text }
```

## 6. Tech stack additions

Building on existing Express + Vite + Drizzle + Neon:

| Concern | Stack | Why |
|---|---|---|
| Background jobs (screening, sends) | **Inngest** (or BullMQ on Upstash Redis) | Webhook fanout, retries, scheduled cadences (28/11/24 hour) |
| Auth multi-tenant | **Clerk** | Orgs + roles + SSO upgrade path to Okta/Entra on Enterprise |
| Email | **Resend** + **react-email** | Already chosen |
| AI screening | **Tavily** (web) + **Nebius Token Factory** (LLM) + **Anthropic Claude** (judge) | Already PoC'd in BuilderShip pilot |
| Slack | `@slack/bolt` | Standard |
| Calendar | `googleapis` + `@microsoft/microsoft-graph-client` | Standard |
| HubSpot | `@hubspot/api-client` | Official |
| Salesforce | `jsforce` + custom managed package | Enterprise tier only |
| Mobile scanner | PWA + `@zxing/library` (camera) + IndexedDB queue | Avoid native app v1 |
| Observability | Sentry + Vercel Analytics | Existing |
| File storage (sponsor recap PDFs, badge templates) | Cloudflare R2 | S3-compatible, no egress |

## 7. Phased build plan

### Phase 1 — MVP (Weeks 1–6, 5 design partners)

**Goal**: Run BuilderShip 2.0 + 4 more pilots end-to-end on Eventsea.

**Build**:
- M1 Luma ingest + webhook handler with HMAC verify (Week 1–2)
- M5 password gate (already done; integrate with new dashboard) (Week 1)
- M2 V/P/U screening pipeline (port the BuilderShip skill) (Week 2–3)
- M3 per-sponsor scoring with overrides (Week 3–4)
- M7 scanner PWA + Luma external check-in lookup (Week 4–5)
- M6 HubSpot push (Week 5)
- M8 Resend templates + idempotency (Week 5–6)
- M4 calendar-audit wedge product (Week 6 — the marketing entry product)

**Demo partners**: BuilderShip, SIA, plus 3 others from inbound. Each gets a free pilot in exchange for case-study rights + a discounted year on Growth tier.

**Done = success criteria**:
- 1,000+ attendees screened with V/P/U verdicts at >95% accuracy
- Sub-3-second scan→decision latency on PWA
- Zero HubSpot duplicate Contacts created
- 95th percentile webhook ack <500ms

### Phase 2 — Beta (Weeks 7–12, 25 paying customers, $25K MRR)

**Build**:
- S1 Segments builder (match Vendelux UI shape exactly — Include/Exclude, bulk-paste, default-segment star)
- S2 Meeting orchestration (Resend + Google/MS Calendar + booking page)
- S3 Slack adapter + routing rules UI
- S4 bi-directional Salesforce package (the enterprise sales angle)
- S5 ROI calculator + per-event scorecard
- S6 Clerk multi-tenant orgs
- S7 multi-channel blasts
- S8 sponsor recap PDF auto-generation
- S9 light AI assistant (Resend draft + scoring helper)

**Done = success criteria**:
- 25 paying organizations
- $25K MRR
- NPS > 50 from pilot cohort
- 3 enterprise pilots signed (Salesforce package validated)

### Phase 3 — GA (Weeks 13–24, 100 customers, $100K MRR)

**Build**: C1–C11. Priority order:
1. C11 SSO + SCIM (unblocks enterprise)
2. C2 hosted event pages (frees orgs from Luma where they want)
3. C3 badge printing (on-site differentiator)
4. C5 pre-event drip (28/11/24 cadence)
5. C8 portfolio analytics
6. C10 public API + webhooks
7. C4 PWA → native (only if usage data justifies)
8. C7 predictive attendance (only with V/P/U safety net — never repeat Vendelux's accuracy debt)
9. C1, C6, C9 — community + matchmaking + marketplace

## 8. Pricing strategy

Three tiers, mirror Luma's plan-name pattern (familiar to buyers) but priced for the sponsor-intelligence value.

| | **Starter** | **Growth** | **Enterprise** |
|---|---|---|---|
| Price | **$99/mo** | **$2,500/mo** (annual: $25K/yr) | **From $5K/mo** ($60K+/yr) |
| Target | 1 event/mo, indie hosts | 3–15 events/yr, mid-market sponsors | 20+ events/yr, Fortune 500 |
| Calendar audit | Yes (paid wedge: $499 one-off too) | Unlimited | Unlimited |
| Verified attendees (V/P/U) | 250/mo | 5,000/mo | Unlimited |
| Per-sponsor scoring | 1 sponsor | 10 sponsors | Unlimited |
| Luma integration | Yes | Yes | Yes |
| HubSpot push | One-way | Bi-directional | Bi-directional |
| Salesforce package | — | One-way | **Bi-directional** (our enterprise wedge) |
| Slack | Yes (1 channel) | Yes (unlimited routes) | Yes |
| Resend custom domain | Eventsea-branded | Custom subdomain | Customer-owned domain |
| Pre-event meetings | — | Self-serve (Meeting Scheduler) | Self-serve + managed |
| SSO (Okta/Entra/Auth0/Google) | — | — | Yes |
| **SCIM** | — | — | **Yes** (Luma doesn't offer this) |
| Hardware scanner / badge printer | — | Add-on | Yes |
| Public API | — | Yes | Yes |
| Audit logs | Basic | Full | Full + SIEM export |
| Support | Email | Slack channel | Dedicated CSM + SLA |

**Price-positioning rationale**:
- $99/mo Starter undercuts Vendelux entirely; competitive with Lensmor's $499/event
- $25K Growth is the Vendelux floor — but with Luma integration + V/P/U + Slack + recap PDFs that Vendelux doesn't offer
- $60K Enterprise is below Vendelux's $125K ceiling but with the bi-dir Salesforce package + SCIM that they don't have

## 9. Open questions for council review

1. **Hosted events (C2) — replace Luma or stay strictly complementary?** Recommendation: stay complementary in v3, revisit in v4. Luma's calendar-as-social-graph is a 5-year head start; competing on event hosting is a distraction from the sponsor-intelligence wedge that pays.
2. **Luma write endpoint for check-in** — confirm during Week 4 spike whether Luma exposes a public write endpoint or we own canonical state. Either path works; we should know before Phase 1 ends.
3. **AI assistant ambition (S9 vs ChatVDX)** — do we ship a full conversational surface in beta, or stay with templated helpers? Recommendation: templated helpers in v3 (Resend draft, scoring rule explainer); revisit a chat surface only after S6+S2 are real.
4. **Predictive attendance modeling (C7)** — risky given Vendelux's accuracy debt. Only ship if the V/P/U layer can credibly flag a predicted-attendee as `P` with reasons. Without that, skip entirely.
5. **Resend vs Postmark vs SendGrid** — Resend is the proposed pick for DX. Open to challenge from anyone with strong deliverability data favoring Postmark.
6. **Native apps** (C4) — wait for usage data. PWA + Apple Wallet pass should cover 80% of scanner needs.
7. **Pricing — undercut more aggressively?** Starter at $99 may be too high for the long-tail community hosts who are happy on Luma Free. Consider a $0 "verify-only" tier that pulls in users and upsells when their event gets a sponsor.

## 10. Success metrics (90-day post-GA)

- **100 paying organizations**, $100K MRR
- **5,000 verified attendees / week** with <2% false-positive rate
- **$10M in pipeline attributed** to events through Eventsea HubSpot/SF integration
- **NPS > 50** across the customer base
- **3 reference customers** willing to be named (one Fortune 500, one mid-market SaaS, one creator/community-first org)
- **<$5K CAC** on Starter, **<$15K CAC** on Growth (sales-assisted), **<$50K CAC** on Enterprise (full sales cycle)

## 11. What we are explicitly NOT building

To match the scope: be the integration spine, not a re-platform.

1. **NOT a Luma replacement** for community calendars (we integrate)
2. **NOT a Vendelux 250K event-database clone** (we route into the events that orgs already run + scrape long-tail on demand)
3. **NOT a Cvent-class virtual events platform** (no built-in video; integrate Goldcast/ON24/Sequel via API if customer needs)
4. **NOT a CRM** (we push to HubSpot/Salesforce; we don't replace either)
5. **NOT a marketing automation suite** (we send transactional + lightweight blasts via Resend; full nurture lives in HubSpot/Marketo)
6. **NOT a managed services agency** in v3 (the Vendelux managed-Meetings team is a different business; we may add later for Enterprise but not as core)

## 12. Next steps

1. Sprint 3 council reviews this PRD this week. Vote: ship as-is / amend / kill.
2. If shipped: draft work tickets for M1–M8 by end of week.
3. Confirm Luma write-endpoint question with Luma support email by Friday.
4. Re-run the lead-list ICP through Resend + Slack stub to validate the integration pattern works end-to-end.
5. Update `docs/marketing/show-hn-launch-plan.md` to swap "event radar" framing for "the events operating system" framing.
6. Take down `PRD-v2-best-of-breed.md` references in the README; mark it `superseded-by: PRD-v3-eventsea-enterprise-suite.md`.

---

**Research basis**: `docs/competitive/vendelux-comparison.md` · `docs/competitive/research/event-intelligence-landscape-2026.md` · `docs/competitive/research/vendelux-ui-and-feature-inventory.md` · `docs/competitive/research/luma-feature-inventory-2026.md` · `docs/competitive/cvent-comparison.md` · `docs/competitive/eventsea-feature-inventory.md`
