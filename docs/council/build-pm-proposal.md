# Build PM Proposal — Minimum-Shippable v1 Inside This Repo

> Filed 2026-06-11, post-PRD. Companion to `addendum-prd-validation.md`.
> Position: Sprint 1 deferral is overtaken by events. BuilderShip already shipped; v1 = "remove the founder from the loop on the next BuilderShip-shaped event."

## TL;DR

Ship a single-event productized pipeline at `/app/events/:slug` inside this repo, gated by FR9 from day one, fed by FR1 CSV upload, fulfilled by a two-tier worker that calls Tavily + Nebius Token Factory, and rendered as the same self-contained dashboard `list.ship.builders` already proves. **Cut FR8 (update loop) and FR6 (judges) to "manual rerun + CLI" in week 5.** The v1 demo is the **gated dashboard URL itself**, handed to sponsor #3 on a discovery call.

## Sequence (FR1–FR9 across 6 sprints)

| Wk | Sprint goal | FRs landed | Concrete files/endpoints |
|---|---|---|---|
| **1** | **Foundations + gate first.** Stand up Neon, replace MemStorage, ship the password gate before any lead data exists, so PII risk is structurally impossible to ship un-gated. | **FR9** (gate, post-deploy verified), **FR1 partial** (schema only) | `shared/schema.ts` adds `events`, `attendees`, `screenings`, `sponsor_scores`, `influence`, `exports`, `event_auth`; `server/storage.ts` switches to Drizzle/Neon; new `server/middleware/eventAuth.ts` (HttpOnly cookie, 302 redirect, never client-side); new routes `POST /api/events/:slug/login`, `GET /app/events/:slug` SSR-gated in `server/routes.ts`; new `client/src/pages/event-login.tsx`. **DoD:** curl with no cookie returns 302 + zero lead bytes in body. |
| **2** | **Ingest + canonical model.** Make a real CSV land into rows correctly, including the messy parts (BOM, dedupe, same-human linking, sponsor-domain auto-flag, signal score). | **FR1** complete | New `server/ingest/csvParse.ts` (utf-8-sig, flexible column map); `POST /api/events/:slug/upload` (multer, multipart); new `client/src/pages/app-upload.tsx` with sponsor-config form (3 product ICPs); ingest writes `attendees` + signal_score column used only to route depth. **DoD:** BuilderShip's actual 726-row CSV parses to 726 rows with sponsor-domain emails flagged. |
| **3** | **Light tier first, deep tier next.** Light covers everyone — it's the load-bearing surface. Deep is the prestige tier but only ~10% of volume. Build light first to de-risk the whole product. | **FR2 light + reconciliation**, **FR3 scorer + conflict overrides** | New `server/pipeline/lightScreen.ts` (batches of 12 → Tavily evidence + Token Factory call → `email\|V/P/U\|Co\|Role\|S1\|S2\|S3\|TYPE\|why\|flags`); `server/pipeline/reconcile.ts` (input/output email diff, gap repair); `server/pipeline/scorer.ts` (1st full / 2nd −1 / 3rd −2 / absent −3 floor 1; investor flat; competitor → 1 + flag); `GET /api/events/:slug/jobs/:id/status`; new `client/src/pages/app-job.tsx` (polling). **DoD:** rerun BuilderShip light tier against a fixed seed, ≥95% verdict agreement with the original manual run, U-cap at 3, V-cap at 8. |
| **4** | **Deep tier + influence + dashboard.** Wire the prestige 10% and the social fetcher; render the dashboard the prototype already proves. | **FR2 deep**, **FR4**, **FR5** | `server/pipeline/deepEnrich.ts` (premium model, per-lead agentic research, score 1–9 cap); `server/pipeline/influence.ts` (fxtwitter + `gh api users/<handle>`, handle sanitizer rejecting placeholders/celeb collisions, "LinkedIn n/a"); `server/render/dashboard.tsx` SSR emits the same self-contained HTML+embedded-JSON shape the prototype uses (search, per-sponsor sort, filter chips, tier badges, score pills, ~120 cards + show more); served by `GET /app/events/:slug` behind `eventAuth`. **DoD:** dashboard for BuilderShip rerun is visually equivalent to `list.ship.builders`. |
| **5** | **Exports + curation Top-N. CUTS GO HERE.** | **FR7**, **FR6 builders only**, FR6 judges deferred, **FR8 deferred** | `client/src/lib/exports.ts` client-side CSV (HubSpot variant, Salesforce variant, UTF-8 BOM, current-filter only, filename encodes format+filter+count); `server/curation/topN.ts` implements `4·has_demo + log10(reach+1) + 0.35·best_score + tier_bonus + 1.5·hackathon_winner − bigco_penalty`; UI approve/swap on `client/src/pages/app-curation.tsx` with published cutoff. **CUTS:** judges panel → CLI-only via `scripts/curate-judges.ts` (sponsor #3 doesn't pay for judge curation; organizers do, and they're not the v1 ICP); FR8 update loop → manual "re-upload CSV, new job, replace dashboard" — the founder did this 5 times for BuilderShip and it's fine for 1–2 events. |
| **6** | **Harden the demo path.** End-to-end against a fresh BuilderShip-shaped CSV with sponsor #3's actual products configured. Cost reporting (FR2 risk row). Post-deploy verification check. Privacy delete endpoint. | **FR9** delete-on-request, ops polish | `DELETE /api/events/:slug/attendees/:id`; `server/pipeline/costReport.ts` emits per-event $ / attendee; `scripts/verify-deploy.ts` curls the gate + diffs the rendered JSON shape; load test 1k attendees. **DoD:** the are-we-shippable test below. |

## Hardest FR + de-risking

**FR2 light tier is the hardest** — not technically, but **load-bearingly**. It covers ~90% of volume, drives the entire trust contract (V/P/U), and its failure mode (silent misattribution) is exactly what the PRD says destroys trust. Drop rate is ~0.5% even in the working pilot.

**De-risking, concrete:**
1. **Golden-set regression.** Freeze 50 BuilderShip rows where the manual run's verdict + company is known-correct. CI runs the light pipeline against this set every PR. Fail the build at <90% agreement. File: `server/pipeline/__fixtures__/builderShip-golden.json`.
2. **Reconciliation BEFORE scoring.** `reconcile.ts` runs the input/output email diff and gap repair as a hard gate — no scoring writes to DB until reconciliation passes. This catches the drop/typo failure mode at the layer where it's cheap.
3. **Verdict caps enforced in the type, not the prompt.** `Verdict.U.maxScore = 3` and `Verdict.light.maxScore = 8` are TypeScript constants applied post-model. The model can hallucinate a 9; the code clamps it. No prompt discipline required.
4. **Anchor check as a separate pass.** Before light-tier output is accepted, the pipeline asserts the LinkedIn slug matches the registered name (or sets verdict `U`). This is the cheapest fix for the #1 documented failure mode (name collisions).
5. **Cost ceiling as a circuit breaker.** Per-event $ budget passed at job start; pipeline aborts at 1.5× projected. Avoids the FR2-risk row blowing up at 1k+ attendees.

## v1 demo (the artifact for sponsor #3)

**One screen, one moment: a gated dashboard URL handed to sponsor #3 on a discovery call.** Sponsor enters the password, lands on `https://app.eventsea.com/app/events/<their-event>`, sees their company's score column lit up, sorts it, downloads the HubSpot CSV. That is the entire sales motion. It is what BuilderShip already proves; v1 just removes the founder from the rebuild.

Not "an upload wizard demo." Not "look at our pipeline status page." The wizard exists; it is plumbing. **The dashboard is the product.** Reuse the prototype's HTML shell verbatim — the prestige is already built into it.

## Are-we-shippable test (end of Week 6)

A reviewer who has never touched this repo can, in one sitting, with only a Luma CSV and three sponsor-ICP one-liners:

1. Hit `/app/upload`, paste 3 sponsor ICPs, upload a fresh 700–800 row Luma CSV.
2. Watch `/app/job/:id` poll to completion in **≤60 minutes**, with per-event cost printed **≤$0.10/attendee**.
3. Receive a gated URL. Open it from a fresh incognito (no cookie) — see a **302 with no lead data in body**. Log in — see the dashboard with **≥3 sponsor score columns populated**, ≥1 competitor flag, ≥1 P/U verdict with "claims unconfirmed" visible.
4. Sort by any sponsor, filter to "Verified", click "Download leads (HubSpot)" → CSV with UTF-8 BOM opens cleanly in Excel, row count matches active filter, filename encodes filter + count.
5. Light-tier golden-set regression in CI is green at ≥90% verdict agreement on the BuilderShip 50-row fixture.

If all 5 are true, v1 is shippable to sponsor #3. If any is false, we are not.

## What we do NOT build in v1

- Luma API ingestion (v1.1 trigger: 2nd paying sponsor asks for it)
- Multi-tenant signup (v1 is one-org; the founder provisions events)
- Judge panel UI (FR6 partial — CLI fine for one paying sponsor)
- Update-loop automation (FR8 — manual re-upload is fine at this volume)
- HubSpot/Salesforce direct API push (CSV import-wizard is the contract)
- Autonomous mode (FR10 is v2; do not let it leak into v1 architecture)

## Critical files for implementation

- `/home/user/Eventsea-Landing-Page/shared/schema.ts`
- `/home/user/Eventsea-Landing-Page/server/routes.ts`
- `/home/user/Eventsea-Landing-Page/server/storage.ts`
- `/home/user/Eventsea-Landing-Page/server/middleware/eventAuth.ts` (new)
- `/home/user/Eventsea-Landing-Page/server/pipeline/lightScreen.ts` (new)
