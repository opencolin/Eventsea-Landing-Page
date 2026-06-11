# Product PM Proposal — 4-week Calendar Audit Fulfillment Sprint

**Author:** Product PM, Eventsea founding council
**Date:** 2026-06-11
**Decision requested:** Approve 4-week sprint to fulfill the Calendar Audit promise by wiring the existing radar prototype's data layer into this repo via an async, email-delivered audit pipeline — keeping the prototype as a separate service and consuming it via HTTP.

## 1. The gap, stated plainly

Landing page makes a contractual promise: paste Luma URL → 6-deliverable audit by email within 24 hours. Today:

- `client/src/components/calendar-audit-form.tsx` shows an "Audit queued" success state that is a lie.
- `server/routes.ts` persists the row to `MemStorage`. No scraper, no scoring, no email. On restart, row is gone.
- Meanwhile, `event-radar-mvp.phantastic.ai` already scrapes 17 Luma sources, LanceDB hybrid search, custom semantic filter scoring, P1/P2/P3 + notes, CSV export. **Covers deliverables 1, 4, and 6 outright.**

Promise is closer to fulfillment than it looks. Don't need to rebuild radar. Need ingestion + scoring for the *organizer's own* calendar, email delivery, and a thin HTTP contract between repos.

## 2. The call: keep them separate, link via HTTP

**Decision: keep the radar prototype standalone. Add internal HTTP client in this repo that calls it. Do not import its code, do not move its LanceDB index, do not co-deploy.**

Reasons:
1. **Different runtimes, different storage.** Radar = LanceDB + scraper schedule. This repo = Express + Vite + Drizzle/Neon. Forcing them into one process couples two release cadences.
2. **The prototype is already a working asset.** Pulling code into a marketing repo freezes iteration speed.
3. **HTTP contract is small.** ~3 endpoints: `POST /score-calendar`, `POST /matches`, `GET /upcoming-recommendations`. Everything else (copy critique, attendance) is net-new and belongs in this repo.
4. **Single source of truth for 17 Luma sources.** Duplicating the scraper = two fleets hitting Luma = rate-limit footgun.

Alternatives rejected:
- **Integrate prototype into this repo.** Cost: 3+ weeks before single audit delivered. Eats the sprint.
- **Rebuild from scratch.** Rebuild scraper, scoring, similarity index. Existing 17-source scraper exists. Use it.

## 3. What we ship in 4 weeks

Pipeline:
```
Form submit → /api/calendar-audit (gutted + rewritten)
  → Drizzle persist (replaces MemStorage)
  → Enqueue audit job (Inngest)
  → Worker:
      1. Fetch organizer's Luma calendar
      2. POST radar/score-calendar → per-event scores
      3. POST radar/matches → co-sponsor matches
      4. GET radar/upcoming-recommendations → events-to-sponsor-next
      5. Call Anthropic (claude-haiku-4-5) for copy critique
      6. Render audit PDF + HTML email
      7. Resend send
  → Status update; /audit/:id view page
```

Of 6 promised deliverables, sprint ships **5**:

| Deliverable | Source | Sprint |
|---|---|---|
| 1. Score every event | Radar scoring | Yes |
| 2. Copy critique | Claude (new) | Yes |
| 3. Audience recommendations | — | **Cut** |
| 4. Co-sponsor matches | Radar matchmaking | Yes |
| 5. Attendance breakdown | — | **Cut** |
| 6. Events to sponsor next | Radar P1/P2/P3 | Yes |

Honest tradeoff. 5 of 6 shippable; cut 2 need attendee-level data neither system has.

## 4. Week-by-week (2 engineers + radar-side support)

### Week 1 — Foundations (5 eng-days each)
- Switch `server/storage.ts` MemStorage → Drizzle/Neon. Schema exists; drizzle.config.ts configured. **1.5d**
- Extend `shared/schema.ts`: `audit_jobs`, `audit_results` (jsonb), `audit_deliveries`. **0.5d**
- Stand up Inngest. **1d**
- Define radar HTTP contract. PM + radar eng pair. zod schemas in both repos. **1d**
- Radar `POST /score-calendar`. **1.5d (radar repo)**
- Resend setup. Transactional template scaffold. **0.5d**

### Week 2 — End-to-end happy path (10 eng-days)
- Rewrite `POST /api/calendar-audit`: validate, persist queued, enqueue Inngest, return `{auditId}`. **1d**
- Worker: fetch organizer's Luma calendar. **1.5d**
- Worker: call radar `/score-calendar` + `/matches`. **1d**
- Worker: Claude haiku copy critique. Prompt caching on rubric. **2d**
- `/audit/:id` viewer page. **2d**
- Email template + Resend send. **1d**
- Update form success state to "processing — email within 1 hour" + status page link. **0.5d**
- E2E smoke test with 3 real calendars. **1d**

### Week 3 — Quality + 6th deliverable (10 eng-days)
- Radar `GET /upcoming-recommendations`. **2d (radar repo)**
- Wire into worker; render as 6th deliverable card. **1d**
- Audit PDF export via Playwright. **2d**
- Internal `/admin/audits` review tool. **1.5d**
- P95 latency under 10 min. Inngest stage timing. Cache scrape per URL 6h. **1d**
- Backfill broken-form users with apology + real audit. **0.5d**
- 10 dogfood audits — founding council each submits 2. **2d PM/design polish**

### Week 4 — Distribution + measurement (10 eng-days)
- Replace "Beta" with "Get your audit." Audit is activation, not waitlist. **1d**
- Wire competitor-audit toggle (skip Claude critique). **1.5d**
- Weekly digest cron — Inngest cron re-runs each user's recommendation query weekly. **2d**
- PostHog events: audit_submitted, audit_delivered, audit_viewed, cta_after_audit_clicked. **1d**
- 48-hour NPS email. **0.5d**
- Buffer + security review of public `/audit/:id` (token-gated). **2d**
- Soft launch to 50 prospects. **2d PM ops**

**Total: ~40 eng-days across 2 engineers + ~6 eng-days from radar team.**

## 5. What I'd NOT do

- **Do not** rebuild the radar scraper inside this repo.
- **Do not** ship audience recommendations (3) and attendance breakdown (5) — replace with "(coming Q3)" badges and ship honest.
- **Do not** open Phase-2 customer-list ingestion yet. Sequence after audit→activation data.
- **Do not** build weekly newsletter editorial layer.
- **Do not** migrate radar's LanceDB into Neon.
- **Do not** open self-serve auth this sprint.
- **Do not** wire Tavily enrichment yet.
- **Do not** broaden beyond Luma.

## 6. Risks

| Risk | Mitigation |
|---|---|
| Radar = research prototype, not production HTTP | Wrap in thin Express adapter; treat as sprint feature |
| Luma blocks scraper | Cache per-URL 6h; Luma official API as fallback |
| Claude cost at scale | claude-haiku-4-5-20251001; prompt caching; hard cap 25 listings per audit |
| Dogfood quality fails | Week 3 includes 10 internal audits to catch |
| 24-hour promise itself wrong | Sprint pulls to "within 1 hour" — under-promise, over-deliver |

## 7. Success metric

**Headline: ≥50 fulfilled audits with ≥40% view rate, ≥4.0/5 quality, zero unfulfilled audit_submitted events.**

Supporting: P95 latency <30min; ≥3 audits forwarded externally; ≥5 recipients book follow-ups.

**Honest failure mode:** if dogfood quality <4.0, hold public launch, spend Week 4 fixing scoring.

## 8. Why this is highest-leverage

1. **Closes credibility gap.** Every other council priority is bottlenecked on the page being trustworthy.
2. **Compounds existing investment.** Radar already does 80% of 3 of 6 deliverables. Burning it in rebuild = malpractice.
3. **First real product surface in this repo.** `/audit/:id` is the first data-bearing page Eventsea owns. Every Phase-2 feature sits downstream of having a real audit record.

Cheapest path to most credibility with least throwaway work.

## Critical files

- `server/routes.ts`
- `server/storage.ts`
- `shared/schema.ts`
- `client/src/components/calendar-audit-form.tsx`
- `client/src/components/audit-deliverables-section.tsx`
