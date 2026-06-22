# Eventsea Feature Inventory — PRD v1 / v1.1 / v2 + Four-Sided Marketplace

> Companion to `cvent-comparison.md`. Exhaustive listing of every feature, capability, or product surface across all release docs as of 2026-06-12.
>
> Sources: `docs/PRD.md`, `docs/releases/README.md`, `docs/releases/v0.2-audit-pipeline.md`, `docs/releases/v0.3-admin-and-outbound.md`, `docs/releases/v1.0-multitenant.md`, `docs/releases/v1.0-luma-api-ingestion.md`, `docs/releases/v1.1/luma-api-spec.md`, `docs/releases/v1.5-teams-and-digest.md`, `docs/releases/v2.0-marketplace-tx.md`, `docs/releases/v2.0-autonomous-event-intel.md`, `docs/releases/v2/autonomous-spec.md`, `docs/council/decision-2.md`, all four PM proposals.

Total surface area: **~115 distinct features/capabilities across 16 categories**, spanning PRD v1 (CSV upload, verification, scoring, dashboard, gate, export), v1.1 (Luma API, scheduled sync, encryption), v2 (autonomous discovery, Token Factory inference, self-rebuilding dashboards), and the four-sided marketplace track (sponsor matching + venue booking + organizer payouts + public event browsing).

## 1. Event Registration

| Feature | Description | Doc | Version |
|---|---|---|---|
| CSV ingestion (Luma/Eventbrite) | Accept UTF-8-BOM tolerant CSV exports; map flexible column names to canonical schema | PRD FR1 | v1 |
| Email deduplication | Dedupe by email; detect same-human duplicates by name/phone | PRD FR1 | v1 |
| Sponsor-domain auto-flag | Immediately zero scores + mark `do-not-pitch` for sponsor-domain emails | PRD FR1 | v1 |
| Registration-signal score | Pre-screen signal (domain type, build text, links) used only for tier assignment | PRD FR1 | v1 |
| Luma API pull | Connect via API key; scheduled hourly pulls replace manual CSV exports | v1.1/luma-api-spec.md | v1.1 |
| Webhook ingestion | Luma `guest.registered`/`guest.approved` webhooks as low-latency alternative to polling | v1.1/luma-api-spec.md | v1.1 |
| Calendar scraper | Server-side Luma calendar URL scraper returning structured event + attendee metadata | v0.2-audit-pipeline.md | v0.2 (marketplace) |
| Tavily autonomous discovery | Scheduled multi-query event discovery across Luma, Eventbrite, Partiful, conference sites | v2/autonomous-spec.md | v2 |

## 2. Attendee / Lead Management

| Feature | Description | Doc | Version |
|---|---|---|---|
| Canonical attendee schema | Unified record: name, email, phone, company, build description, LinkedIn, X, GitHub, website, demo URL | PRD FR1 | v1 |
| Per-event attendee store | Drizzle schema with per-event unique email index; all FKs cascade for delete-on-request | council/tech-architect-proposal.md | v1 |
| Soft-delete on removal | Luma RSVP cancellations soft-delete (`removedAt`); data retained for audit; Removed chip in UI | v1.1/luma-api-spec.md | v1.1 |
| Re-registration linking | New guest_id after cancellation linked to prior soft-deleted row via `previousAttendeeId` | v1.1/luma-api-spec.md | v1.1 |
| Discovered-event attendee extraction | Tavily extract pulls attendee handles from public guest lists where available | v2.0-autonomous-event-intel.md | v2 |

## 3. Screening + Verification

| Feature | Description | Doc | Version |
|---|---|---|---|
| Two-tier screening (deep + light) | Deep enrichment (~10%): multi-hop agent research; light screening (~90%): batched agent, structured one-line record | PRD FR2 | v1 |
| Verdict system (V/P/U) | Verified / Partially confirmed / Unscreenable with explicit display of what's unconfirmed | PRD FR2 | v1 |
| Identity anchoring rules | LinkedIn slug is identity anchor; email domain + verbatim bio self-verifying; all other claims require a source | PRD FR2 | v1 |
| Gap repair / reconciliation | Auto-detect and repair agent drops/typos (~0.5%) via input-output diff | PRD FR2 | v1 |
| Inflation detection | Flags false founder titles, others' companies, fake big-co employment — corrects scores, surfaces in flags | PRD FR2 | v1 |
| Tavily evidence layer | Web search/extract supplies evidence for every non-self-verifying claim | PRD FR2 | v1 |
| Token Factory light-tier inference | Nebius open-model inference (Llama-3.x-70B) replaces premium models for the ~90% light workload | PRD FR2 / v2/autonomous-spec.md | v2 |
| Adversarial re-verification | Second-pass Claude Sonnet adjudication on Competitor labels, funding figures, Top-N edge rows | v2/autonomous-spec.md | v2 |
| Per-claim confidence gating | Confidence thresholds per claim type; sub-threshold claims never publish (Competitor ≥0.85, V-verdict ≥0.80, etc.) | v2/autonomous-spec.md | v2 |
| Luma diff re-screen (additions only) | Re-screen only new additions; removals and cosmetic updates are free; 80% cost reduction vs. naive re-upload | v1.1/luma-api-spec.md | v1.1 |

## 4. Scoring + Ranking

| Feature | Description | Doc | Version |
|---|---|---|---|
| Per-sponsor score columns | One score column per sponsor product; default set: Tavily, Nebius Token Factory, Nebius AI Cloud | PRD FR3 | v1 |
| Verified-fit decomposition | 1st-ranked fit = full score, 2nd −1, 3rd −2, absent −3, floor 1 | PRD FR3 | v1 |
| Conflict score overrides | Competitor of a sponsor → that sponsor's score = 1 + explicit flag | PRD FR3 | v1 |
| Investor equal-weight rule | Investors score equally across all sponsors (partnership leverage) | PRD FR3 | v1 |
| Calendar-level audit scoring | Activity score (0–100) with sub-scores: Cadence, Audience Quality, Description Craft, Co-Sponsor Network | v0.2-audit-pipeline.md | v0.2 (marketplace) |
| Event-sponsor fit score | Per-sponsor score on discovered events (not just attendees) for "events to sponsor next" ranking | v2.0-autonomous-event-intel.md | v2 |

## 5. Influence / Social Data

| Feature | Description | Doc | Version |
|---|---|---|---|
| X (Twitter) follower count | Public fxtwitter-style API; handle validation (no placeholders, no celebrity collision) | PRD FR4 | v1 |
| GitHub follower count | Authenticated GitHub API | PRD FR4 | v1 |
| Social Reach aggregate | Sum of X + GitHub followers | PRD FR4 | v1 |
| Influence Rank | Per-event rank by Social Reach | PRD FR4 | v1 |
| Point-in-time caveat | All follower data displayed with fetch timestamp; LinkedIn explicitly N/A | PRD FR4 | v1 |

## 6. Curation (Top-N Builders, Judge Panels)

| Feature | Description | Doc | Version |
|---|---|---|---|
| Top-N builders formula | `4·has_demo + log10(reach+1) + 0.35·best_score + tier_bonus + 1.5·hackathon_winner − bigco_penalty` | PRD FR6 | v1 |
| Builder eligibility rules | Ineligible: judges, investors, competitors, sponsor staff, duplicates | PRD FR6 | v1 |
| Human-review approval pass | Formula surfaces candidates; UI for approve/swap before publish; `humanApproved` bit in schema | PRD FR6 / tech-architect-proposal.md | v1 |
| Published cutoff score | Cutoff score published alongside the Top-N list | PRD FR6 | v1 |
| Judge panel (≤10 + pool) | Senior VCs/influencers/operators not demoing; panel starred with category label; full eligible pool beneath | PRD FR6 | v1 |
| Builder/judge mutual exclusion | Enforced: no individual appears in both sets | PRD FR6 | v1 |
| Curation backfill alert | If a curated slot holder is removed (RSVP cancelled), surface a UI prompt to backfill | v1.1/luma-api-spec.md | v1.1 |

## 7. Exports + CRM

| Feature | Description | Doc | Version |
|---|---|---|---|
| HubSpot CSV export | Filter-aware export with First/Last Name, Email, Phone, Company, Job Title, LinkedIn, X Handle + all analysis columns as custom properties; email = dedupe key | PRD FR7 | v1 |
| Salesforce CSV export | Lead-import columns; Rating Hot/Warm/Cold from best score; analysis packed into Description field | PRD FR7 | v1 |
| UTF-8 BOM encoding | Excel-compatible BOM prefix; filename encodes format + active filter + row count | PRD FR7 | v1 |
| Filter-aware export | Exports the currently filtered view, not the full dataset | PRD FR7 | v1 |
| Export log | `exportLogs` table records format, filter descriptor, row count, subject, timestamp | tech-architect-proposal.md | v1 |
| Direct HubSpot/Salesforce API push | Replace CSV wizard with direct API integration using exact property/field mappings | PRD FR7 / v1.1 | v1.1+ |
| Audit PDF export | PDF rendering of calendar audit report via Playwright | council/product-pm-proposal.md | v0.2 (marketplace) |
| Radar CSV export | Event-list export from the radar UI | v1.0-multitenant.md | v1.0 (marketplace) |
| Sponsor credit distribution | Sponsor uploads credit packs (API keys/promo codes); Eventsea distributes per accepted attendee + tracks redemption | v2.0-marketplace-tx.md | v2.0 (marketplace) |

## 8. Update Loop / Scheduling

| Feature | Description | Doc | Version |
|---|---|---|---|
| Manual CSV re-upload diff | New CSV upload diffs by guest_id (fallback email); screens additions only | PRD FR8 | v1 |
| Luma API hourly cron | Inngest-scheduled hourly pull per active connection with jitter; backoff on 429/5xx | v1.1/luma-api-spec.md | v1.1 |
| Idempotent sync runs | Per-event sync idempotency keyed on `(eventId, contentHash)`; no-op if hash unchanged | v1.1/luma-api-spec.md | v1.1 |
| Dashboard auto-rebuild + redeploy | After each diff cycle, recompute Top-N/judges, regenerate dashboard HTML, redeploy; verify live page changed | PRD FR8 | v1.1 |
| Autonomous 6-hour discovery cron | Inngest fan-out every 6h per ICP; Tavily search → extract → score → publish gate → render → deploy | v2/autonomous-spec.md | v2 |
| Versioned snapshot history | Each publish writes a `published_snapshots` row; `/e/:slug/v/:id` immutable URL; `/e/:slug/history` diff list | v2/autonomous-spec.md | v2 |
| Weekly calendar audit digest | Inngest cron re-runs each user's event-recommendation query weekly | council/product-pm-proposal.md | v0.2 (marketplace) |
| Weekly digest email | Monday 7am per-user digest of top 10 ranked events from their saved view; Resend + Inngest | v1.5-teams-and-digest.md | v1.5 |
| Daily event scrape scheduler | Daily Luma calendar poll for self-serve users who paste a calendar URL | v1.0-multitenant.md | v1.0 |

## 9. Access Control / PII

| Feature | Description | Doc | Version |
|---|---|---|---|
| Per-event password gate | bcrypt-hashed password per event; server-side middleware; login page renders zero lead data | PRD FR9 / tech-architect-proposal.md | v1 |
| HMAC HttpOnly cookie | Signed `es_event_<eventId>` cookie; HttpOnly, Secure, SameSite=Lax, 7-day Max-Age; per-event revocation | tech-architect-proposal.md | v1 |
| Post-deploy verification | Automated assertion that cookie-less request returns 0 attendee email hits; part of definition-of-done | PRD FR9 | v1 |
| Delete-on-request | `DELETE /api/events/:slug/attendees/:id` cascades all FKs; per-attendee delete including discovered_events | PRD FR9 | v1 |
| Luma API key envelope encryption | AES-256-GCM per-org data key wrapped by root KMS key; per-decrypt audit log; never plaintext in logs | v1.1/luma-api-spec.md | v1.1 |
| GDPR opt-out blocklist | `optOutEmails` blocklist respected by continuous sync; prevents re-ingestion of opted-out attendees | v1.1/luma-api-spec.md | v1.1 |
| Private repos + private data | Code and data repos private by default; delete-on-request policy | PRD FR9 | v1 |
| Multi-tenant auth + roles | Clerk/Auth.js; `organizations` table; `owner/admin/member` roles; Google + email sign-in | v1.0-multitenant.md | v1.0 |
| Public/private event distinction | `discovered_events.raw_extract_json` encrypted at rest; PII never logged in plaintext outside DB | v2/autonomous-spec.md | v2 |

## 10. Dashboard / Reporting

| Feature | Description | Doc | Version |
|---|---|---|---|
| Self-contained gated dashboard | Server-rendered HTML + embedded JSON per event; no client-server chatter; FR9 gate | PRD FR5 | v1 |
| Full-text search | Search across all lead fields within the dashboard | PRD FR5 | v1 |
| Per-sponsor sort | Sort the lead list by any sponsor's score column | PRD FR5 | v1 |
| Filter chips | All / Verified / Investors / 10k+ reach / Has demo / Conflicts / curated lists | PRD FR5 | v1 |
| Lead cards with tier badges | VERIFIED/SCREENED badges; per-sponsor score pills; follower metrics; flags; action links | PRD FR5 | v1 |
| Pagination (~120 cards + "show more") | Client-side rendering with progressive load | PRD FR5 | v1 |
| Public audit report page | `/r/:reportId` public page rendering markdown audit for a calendar | v0.2-audit-pipeline.md | v0.2 (marketplace) |
| Admin dashboard | `/admin` password-gated; lists audits, listings, signups, demo requests; per-audit detail + re-run | v0.3-admin-and-outbound.md | v0.3 |
| Cost report per event | Per-event dollar report on inference + API costs | PRD FR9 / council/decision-2.md | v1 |
| Radar UI (event-level) | Ranked event list with score, P1/P2/P3 chip, sponsors/hosts strip; semantic filter sliders; saved views | v1.0-multitenant.md | v1.0 |
| Sponsor ROI dashboard | Post-event: people reached, submissions on sponsor stack, credits consumed, audience list | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Quality regression dashboard | Weekly A/B sample (Token Factory vs. Haiku); `inference_regressions` table; Slack `#autonomous-quality` | v2/autonomous-spec.md | v2 |
| Cost telemetry page | `/admin/cost` showing running Tavily + Token Factory + Anthropic spend vs. cap | v2/autonomous-spec.md | v2 |
| Snapshot "as-of" UX | Dashboard chrome shows snapshot timestamp, previous-snapshot diff link | v2/autonomous-spec.md | v2 |

## 11. Discovery (Autonomous)

| Feature | Description | Doc | Version |
|---|---|---|---|
| ICP-driven query expansion | Per-sponsor ICP `{topic}` × `{region}` Cartesian product feeds Tavily discovery queue | v2/autonomous-spec.md | v2 |
| Multi-domain discovery | Searches lu.ma, Partiful, Eventbrite, Meetup, conference websites via Tavily `search` + `crawl` | v2/autonomous-spec.md | v2 |
| URL-level dedup (7-day cache) | Primary key `(source_url, starts_at::date)`; title-similarity secondary dedup | v2/autonomous-spec.md | v2 |
| Discovery confidence scoring | Weighted blend of domain trust, metadata completeness, Tavily score, crawl corroboration | v2/autonomous-spec.md | v2 |
| Quarantine queue | Events below confidence 0.5 go to `needs_review` status; never auto-published | v2/autonomous-spec.md | v2 |
| Weekly cost cap circuit breaker | $550/week hard cap (Tavily $200 + Token Factory $100 + Anthropic $250); kills autonomous cron | v2/autonomous-spec.md | v2 |
| Public marketplace browsing | `/marketplace/events`: filterable, paginated, RSS feed; each card shows sponsor tiers, venue, RSVP link | v2.0-marketplace-tx.md | v2.0 (marketplace) |

## 12. Sponsor Tools

| Feature | Description | Doc | Version |
|---|---|---|---|
| Sponsor program creation | Sponsor configures ICP, target geos, budget per event, tier preferences | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Audience-fit matchmaking | Vector similarity + rule filters matches sponsors to listed events whose audience fits their ICP | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| "Sponsor this" one-click interest | Opens a structured intro thread between sponsor and organizer | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Stripe Connect payment | Sponsor pays organizer through Eventsea at a 5% take rate | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Sponsor credit pack distribution | Upload API keys/promo codes; per-attendee distribution; redemption tracking | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Outreach cold-email generation | Admin tool: run audit on a target's calendar → generate personalized outbound email hook | v0.3-admin-and-outbound.md | v0.3 |
| Per-account concierge pilot delivery | Staged Day-1/Day-7/Day-14 delivery SOP for manually-fulfilled sponsor pilots | council/decision-2.md | v1 (concierge) |
| Connect Luma integration UI | `/app/integrations` page: paste API key, verify, pick calendars, view sync status | v1.1/luma-api-spec.md | v1.1 |

## 13. Venue Tools

| Feature | Description | Doc | Version |
|---|---|---|---|
| Venue listing | Capacity by layout, AV, Wi-Fi, catering, rate range, available dates | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Venue-to-event matching | Eventsea matches venues to listed events by requirements | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Structured inquiry + quote flow | Organizer sends inquiry; venue responds with availability and quote | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Booking confirmation + invoice | Booking confirmed → calendar block + Stripe Connect invoice | v2.0-marketplace-tx.md | v2.0 (marketplace) |

## 14. Organizer Tools

| Feature | Description | Doc | Version |
|---|---|---|---|
| Admission curation (Top-N lists) | Identify high-value builders and publish a featured "Top 100 builders" list with cutoff score | PRD FR6 | v1 |
| Judge panel generation | Curate ≤10 judges + eligible pool; category-labeled (VC/INFLUENCER/OPERATOR) | PRD FR6 | v1 |
| Calendar audit report | 6-deliverable structured audit: activity score, cadence, copy critique, co-sponsors, upcoming events to sponsor | v0.2-audit-pipeline.md | v0.2 (marketplace) |
| Public audit SEO pages | `/audits/:slug` pages for 20+ well-known calendars; SEO landing pages for organizer audiences | v0.3-admin-and-outbound.md | v0.3 |
| Self-serve calendar import | Paste Luma calendar URL; daily polling surfaces new events automatically | v1.0-multitenant.md | v1.0 |
| Organizer payouts + escrow | Stripe Connect payout; optional escrow (sponsor pays at signing, releases at completion); 1099 reporting | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Event listing on public marketplace | Organizer lists event with sponsorship tiers, venue assignment, RSVP link | v2.0-marketplace-tx.md | v2.0 (marketplace) |
| Onboarding wizard | Step 1: paste calendar / upload CSV; Step 2: configure ICP filter set; Step 3: see first ranked feed | v1.0-multitenant.md | v1.0 |

## 15. Field Marketing Intelligence

| Feature | Description | Doc | Version |
|---|---|---|---|
| Per-sponsor talking-point generation | "Why" column: one opening talking point per lead per sponsor, surfaced on lead card | PRD FR2/FR5 | v1 |
| Competitor attendee detection + exclusion | Competitor-of-sponsor leads excluded from that sponsor's pitch list and Top-N curation | PRD FR3 | v1 |
| Investor cross-sponsor scoring | Investors scored equally across all sponsors to surface partnership leverage | PRD FR3 | v1 |
| Action links per lead | Per-card deep links to website, LinkedIn, X, GitHub, demo video, mailto | PRD FR5 | v1 |
| Saved views with custom filter weights | Per-user (later per-team-shared) named filter sets (e.g., `vcluster GTM`, `AI Infra Builders`) | v1.0-multitenant.md / v1.5-teams-and-digest.md | v1.0 / v1.5 |
| Slack app for event radar | `/eventsea radar` slash command; new high-fit event posts to configured channel | v1.5-teams-and-digest.md | v1.5 |
| P1/P2/P3 lead tagging | Per-user priority flags on leads/events; clickable from digest email | v1.5-teams-and-digest.md | v1.5 |
| Team collaboration audit log | Teammate P1/P2/P3 + notes visible in shared view; "3 teammates marked P1" badge | v1.5-teams-and-digest.md | v1.5 |
| Outbound sequence templates | Cold + 2 follow-ups + audit-hook variant for DevRel, field marketing, conference organizer targets | v0.3-admin-and-outbound.md | v0.3 |

## 16. Pricing Tiers

| Tier | Price | Inclusions | Doc |
|---|---|---|---|
| Community / Free | $0 | Landing page / radar access (baseline) | v1.0-multitenant.md |
| Pro | $X/mo per seat (validate with design partners) | Self-serve radar, saved views, CSV export | v1.0-multitenant.md |
| Package A (pilot) | $7,500 | Single event, verified lead list, attribution PDF | council/gtm-pivot-pm-proposal.md |
| Package B (pilot) | $12,500 | Quarterly (3-event) + gated dashboard standard | council/gtm-pivot-pm-proposal.md |
| Package C (pilot) | $25,000 | Multi-event + dashboard + 5 intros + 1-click HubSpot/Salesforce export | council/gtm-pivot-pm-proposal.md |
| Scale | Usage- or contract-based | Enterprise; TBD based on design-partner feedback | v1.0-multitenant.md |
| Marketplace take rate | ~5% of GMV | Sponsor-to-organizer transactions through Stripe Connect | v2.0-marketplace-tx.md |
