# v2 — Autonomous Event Intelligence (deep spec)

> **Companion to:** `docs/PRD.md` § 4 + FR10, and `docs/releases/v2.0-autonomous-event-intel.md`.
> The release-ladder doc is the executive summary; **this doc is the implementation-ready spec** the Sprint 3 council will use to scope, sequence, and staff the build.
> Status: **Spec ready** (no code). Branch: `release/prd-v2-autonomous`.
> Estimated effort: 8–12 weeks for 3 engineers (see § 10).
> Depends on: v1.1 (Luma API) shipped and stable; ≥1 sponsor paying ≥$5K/qtr; FR9 server-side password gate in production with a verified post-deploy assertion.
>
> **What's new vs. the v2.0-autonomous-event-intel.md release-ladder doc:** that doc is a 200-word executive sketch. This doc adds: Tavily query patterns + discovery output schema + cost caps; Token Factory cost target derivation + model-tier selection criteria + quality-regression harness; Inngest orchestrator topology + circuit-breaker logic; dashboard cache-invalidation rules; per-claim confidence gating; risk-by-risk mitigation playbooks; sponsor-acceptance test wired to runtime telemetry; explicit reconciliation guidance for the two competing v2.0 tracks; and a day-by-day sequencing plan for weeks 1–2 plus weekly milestones for weeks 3–12.

## 0. Reading guide

§ 1–4 are the architecture (Tavily + Token Factory + Inngest orchestrator + self-rebuilding dashboard).
§ 5–7 are the trust / quality / risk machinery that makes "autonomous" responsible.
§ 8 is the acceptance test the Sprint 3 council should make the go/no-go gate.
§ 9 is the two-track v2 reconciliation guidance.
§ 10 is the day-by-day sequencing.

---

## 1. Tavily integration

### 1.1 Query patterns

Tavily's `search` API supplies discovery candidates; `extract` pulls structured metadata from a candidate URL; `crawl` follows internal links on a calendar host (e.g., the organizer index on lu.ma). Per-ICP query templates, expanded at runtime from the sponsor's configured `{topic}` + `{region}` fields:

| Template | Purpose | Tavily endpoint |
|---|---|---|
| `"{topic} hackathons 2026"` | Find primary hackathon events by topic vertical | `search` (`include_domains: ["lu.ma","partiful.com","eventbrite.com","cerebralvalley.ai"]`) |
| `"{topic} demo days {region}"` | Cohort/demo-day events with high-quality builder density | `search` |
| `"{topic} meetups in {region}"` | Recurring meetups (lower per-event ROI, used for cadence signals) | `search` |
| `"{topic} AI builder events {city}"` | Generic discovery widening, deduped against the more-targeted runs | `search` |
| `https://lu.ma/{organizer-slug}` | Once a calendar is found, crawl for sibling events | `crawl` (depth=1) |
| `<event_url>` | Pull structured metadata from a single event page | `extract` |

Each query carries: `topic`, `region` (optional), `search_depth: "advanced"`, `max_results: 20`, `include_answer: false` (we never use Tavily's summary verbatim — the LLM does extraction from raw results).

**Query expansion per ICP.** Each sponsor's ICP yields a `topic` set (e.g., Tavily ICP = `["AI agents", "agentic workflows", "RAG", "search APIs"]`) and a `region` set (`["SF", "NYC", "global online"]`). The Cartesian product is the per-ICP discovery queue (deduped — see § 1.3).

### 1.2 Discovery output schema

Each discovered event becomes a row in `discovered_events` after `extract` succeeds:

```ts
type DiscoveredEvent = {
  id: string;                       // UUID
  source_query: string;             // verbatim Tavily query that surfaced it
  source_url: string;               // canonical event URL (post-redirect)
  source_domain: "lu.ma" | "partiful.com" | "eventbrite.com" | "meetup.com" | string;
  title: string;
  starts_at: string | null;         // ISO; null = "couldn't parse"
  ends_at: string | null;
  location: { city: string | null; country: string | null; venue: string | null; online: boolean };
  hosts: Array<{ name: string; luma_slug?: string; linkedin_url?: string; confidence: number }>;
  sponsors: Array<{ name: string; tier?: string; confidence: number }>;
  speakers: Array<{ name: string; linkedin_url?: string; confidence: number }>;
  guest_count: number | null;       // null when not exposed
  rsvp_url: string | null;
  raw_extract_json: string;         // verbatim Tavily extract response
  discovered_at: string;            // ISO
  icp_id: string;                   // which sponsor ICP queue produced it
  discovery_confidence: number;     // 0..1, see § 1.4
};
```

`confidence` per nested claim is required — autonomous publish gates on it (§ 5).

### 1.3 Crawl frequency, dedup, cost cap

- **Cadence.** Inngest cron fans out discovery every 6 hours per ICP (§ 3). A typical Tavily ICP run = ~20 queries × 20 results = ~400 candidate URLs; after dedup ≈ 30–60 fresh extractions per cycle.
- **Dedup.** Primary key for dedup is `(source_url, starts_at::date)`. Secondary dedup: title-similarity ≥0.9 (Levenshtein on normalized title) + same date + same city → merge, keep highest-confidence row.
- **Cost cap.** Tavily pricing tier targeted: Production ($0.008/search, $0.005/extract, $0.002/crawl-page as of Q2 2026 — TODO confirm at sign). Per-ICP budget: **$2/day** (≈ 250 searches + 50 extracts/day). System-wide circuit breaker: **$200/week**, hard abort and page on-call (§ 3.4).
- **Caching.** Each `(source_url)` extraction is cached for 7 days. Re-extraction only triggers on (a) attendee-count delta detected by a cheaper search-only probe, or (b) `starts_at` within 14 days (sponsor lists firm up close to the event).

### 1.4 Discovery confidence scoring

`discovery_confidence` = weighted blend:

- 0.4 × `source_domain` weight (lu.ma=1.0, partiful=0.9, eventbrite=0.8, unknown=0.4)
- 0.3 × structured-metadata completeness (title + date + location + ≥1 host)
- 0.2 × Tavily's `score` for the result that surfaced it
- 0.1 × whether `crawl` corroborated the event from a second path

Below 0.5 → quarantine queue (`discovered_events.status = "needs_review"`) — never published.

### 1.5 Env var

```
TAVILY_API_KEY        # required at boot; absence = autonomous mode disabled, CSV-upload path still works
TAVILY_COST_CAP_USD   # optional, defaults to 200 (weekly)
```

Docs reference: https://docs.tavily.com/ — confirm v2 search/extract/crawl response shape before code freeze.

---

## 2. Token Factory integration (Nebius)

### 2.1 Why Token Factory, not Claude, for light tier

Per PRD § 5 FR2, screening is two-tier: ~10% of attendees get **deep enrichment** (premium model, multi-hop agent); the remaining ~90% get **light screening** (one structured line per lead). At 50 events/week × ~400 attendees = ~18,000 light-tier inferences/week. Claude Haiku at that volume runs ~$0.05–0.15/lead all-in; that breaks the v1 unit-economics goal (<$0.10/attendee) when amortized across the pipeline.

Nebius Token Factory serves open models (Llama-3.x-70B-Instruct, Qwen-2.5-72B-Instruct, Mixtral) at single-digit cents per million tokens. The target light-tier prompt + response is ~600 input + ~150 output tokens. That gives:

- 70B-class open model ≈ $0.0003–$0.0008 per screened lead, all-in
- **Target: ≤$0.005 per screened lead** (10× margin over the floor for retries, evidence searches, reconciliation passes).

### 2.2 Model-tier allocation

| Workload | Volume | Model | Why |
|---|---|---|---|
| Light screening (one-line verdict) | ~90% of attendees | Token Factory: Llama-3.x-70B-Instruct (primary), Qwen-2.5-72B (fallback) | Cost; classification accuracy good enough; A/B tested vs. Haiku weekly (§ 6) |
| Deep enrichment (per-lead research) | ~10% of attendees | Claude Sonnet 4 / Opus 4 via Anthropic API | Multi-hop reasoning, evidence triangulation, nuance |
| Adjudication (P→V upgrade decisions) | Edge cases | Claude Sonnet 4 | Trust-critical; the "competitor" / "investor" labels we publish must not be hallucinated |
| Tavily extraction → schema | Per discovered event | Token Factory Llama-3.x-70B | Pure structured-output task; cheap; eval the JSON-mode reliability |
| Confidence calibration | Per published claim | Rule-based, no LLM | Avoid recursive LLM judgment of LLM output |

### 2.3 Quality bar

Light-tier V/P/U classification accuracy must stay **within 5%** of Claude Haiku baseline, sampled weekly on N=50 leads (§ 6). Falling below threshold for 2 consecutive weeks triggers an automatic failover: revert light tier to Haiku, page the on-call engineer, freeze autonomous publishes pending review.

### 2.4 Env var

```
NEBIUS_TOKEN_FACTORY_KEY        # required for autonomous mode
NEBIUS_TOKEN_FACTORY_BASE_URL   # defaults to https://api.studio.nebius.ai/v1 — confirm at integration
NEBIUS_TOKEN_FACTORY_MODEL      # defaults to meta-llama/Meta-Llama-3.1-70B-Instruct (TODO: confirm canonical id at integration)
```

Docs reference: https://docs.nebius.com/ai-studio (TODO confirm Token-Factory-specific URL at integration — Nebius rebrands periodically). Treat as OpenAI-compatible REST and abstract behind `server/inference/token-factory.ts`.

---

## 3. Autonomous orchestrator

### 3.1 Topology

Inngest functions (or any equivalent durable workflow runtime — Trigger.dev / Temporal acceptable but Inngest is the default given existing v0.2 jobs). Each step is a separate function so retries are granular and partial-progress is observable.

```
inngest:autonomous.discover.cron   (every 6h, fans out per-ICP)
  └─ inngest:autonomous.discover.icp    (per-ICP queue; runs Tavily queries; writes discovered_events)
       └─ inngest:autonomous.extract.event   (per-URL; Tavily extract → DiscoveredEvent)
            └─ inngest:autonomous.score.event   (Token Factory; per-sponsor score; per-claim confidence)
                 └─ inngest:autonomous.publish.gate   (confidence threshold; quarantine vs. publish)
                      └─ inngest:autonomous.render    (rebuild dashboard JSON if data changed)
                           └─ inngest:autonomous.deploy    (FR9 gate-aware deploy; verify live)
```

### 3.2 Per-ICP queue

Each sponsor's configured ICP fans out as its own queue. Concurrency: 1 per ICP (avoids Tavily 429s), unlimited across ICPs (subject to global rate cap). Per-ICP state in `discovery_runs`:

```ts
type DiscoveryRun = {
  id: string;
  icp_id: string;
  started_at: string;
  completed_at: string | null;
  tavily_queries_run: number;
  tavily_cost_usd: number;          // running total per run
  events_discovered: number;        // novel
  events_deduped: number;
  status: "running" | "completed" | "aborted_cost" | "aborted_error";
};
```

### 3.3 Per-claim confidence scoring

The orchestrator never publishes a `competitor` / `investor` / `funding figure` / `sponsor of X` claim without a confidence floor. Threshold table:

| Claim type | Min confidence to publish | Sub-threshold action |
|---|---|---|
| Verdict V (identity + company) | 0.80 | Downgrade to P |
| Verdict P (identity only) | 0.60 | Downgrade to U |
| Type = Competitor | 0.85 | Type = Buyer + flag for human review |
| Type = Investor | 0.75 | Type = Champion + flag |
| Funding figure | 0.90 OR cite source URL | Strip figure, render "not found" |
| Sponsor of event X | 0.80 | Surface as "unconfirmed" in UI |
| Host LinkedIn match | 0.75 | Omit LinkedIn URL; show name only |

**Per skill rule:** "a wrong attribution is a worse failure than 'unverified.'" The orchestrator defaults to omission when in doubt.

### 3.4 Circuit breaker

- **Weekly cost cap.** Tavily $200 + Token Factory $100 + Anthropic premium $250 = **$550/week hard cap**. At 80% of any line item, paging warning; at 100%, the cron is paused via Inngest `inngest:autonomous.killswitch.set` (writes a row to `system_killswitches`; every job checks before running).
- **Error rate cap.** >10% extraction failures in a 1-hour window → pause discovery for 1 hour, retry once, escalate if it re-fires.
- **Quality killswitch.** Weekly A/B regression failure (§ 6) flips `system_killswitches.autonomous_publish = false` — discovery + scoring continue, publish is blocked, dashboard freezes at last-good snapshot.
- **Manual override.** A single SQL `UPDATE system_killswitches SET autonomous = false` halts everything mid-run; in-flight Inngest jobs check the flag at each step boundary.

### 3.5 New tables (additive to v1 schema)

`discovered_events`, `discovery_runs`, `inference_runs` (per-call audit log with model id + tokens + cost), `system_killswitches`, `published_snapshots` (§ 4). Full DDL deferred to implementation week 1 (§ 10).

---

## 4. Self-rebuilding dashboard

### 4.1 Versioned snapshots

Every successful publish writes a row to `published_snapshots`:

```ts
type PublishedSnapshot = {
  id: string;                       // UUID
  event_id: string;                 // FK to Event
  generated_at: string;             // ISO
  dashboard_json: string;           // the embedded JSON the static page hydrates
  dashboard_html_url: string;       // deployed URL of this snapshot
  data_fingerprint: string;         // sha256 of normalized analytical-data slice; cache-invalidation key
  underlying_screening_ids: string[];
  underlying_discovery_run_ids: string[];
};
```

Routes (FR9 gate applies to all):

- `/e/:event_slug` → latest snapshot (302 to versioned URL — sponsors always see "fresh" at the canonical URL).
- `/e/:event_slug/v/:snapshot_id` → immutable snapshot at a specific timestamp.
- `/e/:event_slug/history` → list of snapshots with timestamps + diff summaries.

### 4.2 Cache invalidation

The dashboard regenerates ONLY when `data_fingerprint` changes. The fingerprint is computed from:

- All `screenings` for the event (verdict, scores, type, flags)
- All `influence` rows for the event
- All `curation_tags` for the event
- Discovery metadata that's exposed in the UI (host names, sponsor list)

Excluded from fingerprint: timestamps, internal run IDs, Tavily query strings. **Why:** pointless redeploys waste Vercel minutes and pollute snapshot history. A discovery run that returns the same metadata as last cycle → no redeploy.

### 4.3 Deploy

Reuses the v1 FR9 deploy path verbatim — no auth or middleware changes. Post-deploy verification (per FR9 definition-of-done) is part of `inngest:autonomous.deploy`:

1. Fetch live URL with no cookie → must 302 to `/login` and body must NOT contain any lead PII (regex assert).
2. Fetch live URL with valid cookie → must 200 and contain the new `data_fingerprint`.
3. On failure, roll back to previous snapshot URL atomically; page on-call.

### 4.4 Sponsor "as-of" UX

The dashboard chrome shows the snapshot timestamp, the previous-snapshot diff link, and a "subscribe to changes" capture (email-to-Inngest webhook — out of scope for the v2 build but the schema accommodates it).

---

## 5. Trust + safety

### 5.1 Same rules, applied to Tavily-sourced data

Tavily-discovered claims (sponsor lists, speaker bios, attendee handles) are NOT trusted by source — they go through the same verification layer as user-uploaded CSV rows:

- **Identity anchor.** LinkedIn URL/slug is the anchor even when source is Tavily. If Tavily surfaces a host's name but not their LinkedIn, the host is rendered with name only, no profile link, and `host.confidence` is capped at 0.6 (sub-publish threshold for any high-stakes claim).
- **Email-domain + verbatim bio** are still self-verifying (cheap).
- **Every other web-sourced claim requires a source.** The scoring agent must emit `evidence_url[]` per claim, or the claim is dropped.

### 5.2 Adversarial re-verification before publish

Per skill rule, "adversarially re-verify anything high-stakes (top-10 lists, 'competitor' labels, dollar figures) before publishing." In autonomous mode this is enforced by a second-pass adjudicator (Claude Sonnet) run only on:

- Any claim flagged Competitor (because it costs a sponsor a pitch if wrong)
- Any claim with funding figure
- Any judge-eligible row (because the panel publishes their names)
- Any Top-N builder cutoff row (the marginal include/exclude)

This is the line-item that justifies premium-model cost in autonomous mode — the rest is open-model.

### 5.3 Sponsor-domain handling

If a Tavily-discovered host's name matches a sponsor employee (by LinkedIn slug or verified company), they are auto-tagged `sponsor-staff` and excluded from that sponsor's pitch list — same as a CSV row.

### 5.4 Privacy

FR9 gate applies. Discovered guest handles count as PII even though the source is public — never logged in plaintext outside `discovered_events.raw_extract_json` (which is encrypted at rest per existing DB policy). Delete-on-request handlers must cascade to `discovered_events` (find by handle/email match) in addition to v1's `attendees` table.

---

## 6. Quality regression harness

### 6.1 The A/B sample

Weekly Inngest cron `inngest:autonomous.quality.weekly`:

1. Sample 50 random leads from the past week's light-tier output (stratified: 40 V/P, 10 U).
2. Re-run the same lead through **Claude Haiku** with the identical prompt.
3. Compare V/P/U verdict, type, top-3 sponsor-fit ranking.
4. Compute disagreement rate. Threshold: ≤5% verdict-disagreement, ≤10% type-disagreement, ≤15% sponsor-rank-Kendall-tau disagreement.

### 6.2 Where the data lives

`inference_regressions` table:

```ts
type InferenceRegression = {
  id: string;
  week_start: string;               // ISO date
  sample_size: number;
  lead_ids: string[];
  open_model_outputs: string;       // JSON
  claude_haiku_outputs: string;     // JSON
  verdict_disagreement_pct: number;
  type_disagreement_pct: number;
  ranking_tau: number;
  status: "pass" | "warn" | "fail";
  reviewed_by: string | null;       // human reviewer once acknowledged
  notes: string | null;
};
```

### 6.3 Review cadence

- **Pass** → no action; weekly summary auto-posts to `#autonomous-quality` Slack channel.
- **Warn** (1 threshold breached, others clean) → weekly review by founder/lead engineer; no auto-action.
- **Fail** → killswitch flips (§ 3.4); light tier reverts to Haiku via `NEBIUS_TOKEN_FACTORY_MODEL` env hot-swap; PagerDuty.

### 6.4 What gets reviewed

Disagreements are categorized: open-model false-positive Competitor labels (highest cost), missed Investor flags (medium), V↔P borderlines (low). Categorization informs prompt-tuning rounds, not just go/no-go.

---

## 7. Risk model

### 7.1 Hallucinations cascade in autonomous mode

**Why it's worse here than in v1.** In CSV mode, the operator (founder) eyeballs the dashboard before sharing the URL with the sponsor. In autonomous mode, there's no operator — a hallucinated Competitor flag goes live by default.

**Mitigations.**
- Per-claim confidence gating (§ 3.3) — sub-threshold claims never publish.
- Adversarial re-verification on every high-stakes label (§ 5.2).
- "Omit when in doubt" UI defaults — the dashboard shows "unconfirmed" or "not found" rather than fabricated values.
- Quality regression harness (§ 6) catches drift before it accumulates.
- Snapshot history (§ 4.1) means any published-then-corrected error is auditable and reversible — important for sponsor trust recovery.

### 7.2 Tavily rate limits + cost

- Per-ICP queue concurrency = 1 (§ 3.2); back-pressure at the queue.
- Per-URL 7-day cache (§ 1.3).
- Weekly $200 hard cap; soft-warn at $160.
- Discovery prioritization: if the cap is approached, drop the lowest-priority ICP (sponsor with smallest contract value) first; never throttle the highest-paying sponsor.

### 7.3 Token Factory quality drift

- Weekly A/B vs. Haiku (§ 6).
- Two-week-fail = auto-failover to Haiku, paging.
- Model-id pin in env — Token Factory rotating defaults under the hood won't silently change behavior.
- Prompt versioning in `inference_runs.prompt_version` — regressions can be attributed to model OR prompt, not conflated.

### 7.4 Tavily API contract changes

Mitigation: thin abstraction at `server/discovery/tavily.ts`; an integration-test suite hits Tavily nightly with a fixed query set and asserts response shape; failure pages the on-call engineer with the diff.

### 7.5 Sponsor blowback from a wrong competitor flag

The most expensive failure mode: a sponsor sees their actual partner labeled "competitor" and loses trust. Mitigation: pre-publish, every Competitor label for the sponsor's *own* dashboard is reviewed by Claude Sonnet adjudicator (§ 5.2) AND surfaces a "we flagged this — confirm before pitch" CTA in the UI rather than rendering as a final verdict in v2.0 ship.

### 7.6 Cost regression after launch

The $550/week cap (§ 3.4) is the floor; week-1 actuals may exceed projections. Mitigation: first 4 weeks post-launch, daily cost report (not weekly); if any line item burns >30% over projection, the engineering lead investigates same-day.

---

## 8. Acceptance test (Sprint 3 council's go/no-go gate)

**Setup.** A sponsor (real or fixture) configures their ICP via the v1 admin UI:
- Sponsor: "Tavily" (the API company, used as the canonical fixture)
- ICP topics: `["AI agents", "agentic workflows", "RAG", "search APIs"]`
- ICP regions: `["SF", "NYC", "global online"]`
- Competitor list: `["Exa", "Perplexity Search API", "SerpAPI"]`
- Budget: 1 event sponsored per quarter at $25K title tier

**Test.** Operator does nothing else. Wait 24 hours. Assert:

1. ≥5 relevant events surfaced in `discovered_events` with `discovery_confidence ≥ 0.7`, none manually added by the operator.
2. Events span ≥2 source domains (not just lu.ma) — proves Tavily is doing discovery work.
3. Each surfaced event has `extracted` metadata (title, date, location, ≥1 host) and a per-sponsor score.
4. The dashboard for the sponsor's "events to consider this quarter" view renders, gated by FR9, listing the top 3 ranked events.
5. Zero `system_killswitches.autonomous_publish = false` rows triggered during the 24h.
6. Zero published claims of Type=Competitor below confidence 0.85.
7. Total cost for the 24h run ≤ 1/7 of the weekly cap ($550/7 ≈ $79).

**Pass = ship.** Anything below → root-cause, fix, re-run. The council does not accept "ship and tune" — autonomous mode that needs hand-holding is worse than v1.1's scheduled-Luma-pull which is well understood.

---

## 9. Two-track v2 reconciliation

The release ladder has **two competing v2.0 docs**:

| Track | Doc | Bet |
|---|---|---|
| Marketplace-tx | `docs/releases/v2.0-marketplace-tx.md` | The wedge is **transaction**: sponsors fund events through Eventsea, money moves, 5% take rate |
| Autonomous intel (this doc) | `docs/releases/v2.0-autonomous-event-intel.md` + `docs/releases/v2/autonomous-spec.md` | The wedge is **intelligence**: sponsors pay for verified lead/event ranking; autonomous mode removes the operator bottleneck |

**These are not mutually exclusive long-term, but they are different bets and one must come first.** The Sprint 3 council picks based on Sprint 1+2 revenue patterns:

### 9.1 Decision frame for the Sprint 3 council

**Pick autonomous-intel (this doc) first if:**
- Sprint 1+2 revenue came from sponsors paying for **lead lists / dashboards / audits** (the "intelligence" wedge proves WTP).
- ≥3 paying sponsors asked, unprompted, for "can you find events we don't already know about" or "can you re-run this every week."
- The operator (founder) reports the bottleneck is *running the pipeline*, not *closing the deal*.
- The Token Factory cost model is plausibly verified at small scale (one batch run, comparing Haiku vs. open-model on real leads).

**Pick marketplace-tx first if:**
- Sprint 1+2 revenue came from sponsors paying to **be matched to events / sponsorship deals** (the "transaction" wedge proves WTP).
- ≥3 paying organizers asked, unprompted, for "can sponsors pay through your platform."
- Stripe Connect, KYC, escrow are not blockers (no founder personal-time being burned).
- Pilot data shows sponsors actually moved money to organizers (even off-platform) as a result of an audit.

**Pick neither / re-evaluate if:**
- Sprint 2 revenue stalled or rip-corded. Both v2 tracks assume a confirmed wedge; neither is the right Sprint 3 bet against a wedge-search problem.

### 9.2 Sequencing the loser

The track NOT chosen as v2.0 becomes v2.5 (6+ months later). The dependency graph:

- Autonomous-intel → marketplace-tx: autonomous discovery feeds the marketplace's sponsor-matching engine (better data → better matches).
- Marketplace-tx → autonomous-intel: marketplace transaction volume justifies the inference cost ceiling (more revenue → higher autonomous budget).

Either order is coherent. The choice is purely about which wedge Sprint 1+2 validated.

### 9.3 What this doc does NOT decide

The Sprint 3 council decides. This spec is the *autonomous-intel* deep dive — it exists so the council has implementation-ready detail when they vote, not pitch-deck handwaves. If marketplace-tx wins, this spec sits on the shelf at v2.5 staffing.

---

## 10. Sequencing — 8–12 weeks, 3 engineers

Assumed team: **Eng-A** (orchestrator + Inngest + schema), **Eng-B** (Tavily integration + discovery quality), **Eng-C** (Token Factory + dashboard rebuild + quality harness). Founder/PM does ICP configuration, sponsor liaison, and the acceptance-test sign-off.

### Weeks 1–2 — day-by-day

#### Week 1

**Day 1 (Mon).** Kickoff. Walk the council decision (Sprint 3) into a charter. Confirm staffing. Pull the v1.1 Luma cron code (the existing reference for "cron → fetch → diff → screen → deploy") into a tab — most of the orchestrator topology copies its patterns.

**Day 2 (Tue).** Schema PR. `discovered_events`, `discovery_runs`, `inference_runs`, `system_killswitches`, `published_snapshots`, `inference_regressions`. Drizzle migration via `npm run db:push`. (Eng-A.) Spike: Tavily account, API key, $200 prepaid balance, first manual `search` call from a notebook for a single ICP query — confirm response shape matches § 1.2 expectations. (Eng-B.) Token Factory account, model id confirmation, first `chat/completions` call with the v1 light-screening prompt — verify OpenAI-compatible. (Eng-C.)

**Day 3 (Wed).** `server/discovery/tavily.ts` — thin SDK with `search()`, `extract()`, `crawl()`, retry, cost-accumulator. Mock-server for tests. (Eng-B.) `server/inference/token-factory.ts` — same shape; cost-accumulator; prompt-version tag. (Eng-C.) Inngest function skeletons (no logic, just the topology in § 3.1, all returning stub). (Eng-A.)

**Day 4 (Thu).** Eng-B: wire `inngest:autonomous.discover.icp` to actually run a query, write rows. Eng-C: wire `inngest:autonomous.score.event` to call Token Factory on a single lead, parse the pipe-format. Eng-A: cron registration + `system_killswitches` gate; integration test that the kill-switch halts a running fan-out.

**Day 5 (Fri).** Per-ICP queue concurrency + dedup logic (Eng-B). First A/B harness pass: 20 leads run through Token Factory + Haiku in parallel, manual disagreement count. (Eng-C.) Cost-cap circuit breaker at 80%/100% with paging stubs. (Eng-A.) End-of-week demo: a manual `inngest run` of `discover.icp` for the Tavily ICP, see ~20 discovered events in DB.

#### Week 2

**Day 6 (Mon).** `inngest:autonomous.extract.event` (Tavily extract → DiscoveredEvent schema, Eng-B). Per-claim confidence scoring rules (§ 3.3) — start as a plain rule file, no LLM calls. (Eng-C.) Test fixtures for known-good and known-bad events (lu.ma fixtures + 1 hallucinated case to confirm gating works). (Eng-A.)

**Day 7 (Tue).** End-to-end happy path: cron tick → discover → extract → score → write snapshot row. No publish yet. (Whole team.) Cost telemetry working end-to-end and feeding a `/admin/cost` page (read-only, founder-visible).

**Day 8 (Wed).** Adjudication pass on Competitor / Investor / funding-figure claims (Claude Sonnet, gated). (Eng-C.) Quality A/B harness as a real Inngest cron, populating `inference_regressions`. (Eng-C.) Discovery confidence model tuning — first calibration against fixture data. (Eng-B.)

**Day 9 (Thu).** Dashboard regenerator: fingerprint → diff → render → deploy. Reuse FR9 gate verbatim. (Eng-A.) Snapshot history page + versioned URL routing. (Eng-A.)

**Day 10 (Fri).** First full autonomous tick into staging. Sponsor=Tavily fixture, 6h cron set to "manual trigger" mode. Verify acceptance-test items 1–4 (relevance, multi-domain, scoring, dashboard render). Bug log + triage. End-of-week-2 demo to founder.

### Weeks 3–12 — weekly milestones

**Week 3.** Hardening the discovery layer. Dedup robustness against title-variation, date-format inconsistency, RSVP-vs-event-page URL drift. Real Tavily cost telemetry vs. projection — if >30% over, narrow query expansion.

**Week 4.** Hardening the inference layer. Quality regression cron in production; first 4-week trailing average compared to Haiku. Prompt-tuning rounds on Competitor/Investor false-positives. Token Factory cost vs. projection check.

**Week 5.** Trust gating end-to-end. Adversarial re-verification on every high-stakes claim. Manual red-team: founder seeds 5 known-wrong rows into a discovery batch and confirms none publish.

**Week 6.** Self-rebuilding dashboard at scale. Fingerprint stability under low-noise data churn (cache invalidation works as intended; no pointless redeploys). Versioned URL + history UI shipped.

**Week 7.** Killswitch + on-call runbook. Weekly cost cap exercised by simulating $550 burn in 24h; verify halt. PagerDuty + Slack `#autonomous-quality`. Founder writes the runbook for "the autonomous mode is doing something weird at 2am."

**Week 8.** First real sponsor wired in (NOT the Tavily fixture — a paying sponsor from Sprint 1+2). Founder-mediated onboarding: walk the sponsor through ICP config, watch the first 6h cron, get their gut-check on the surfaced events. **This is the gate to declare beta-shipped.**

**Week 9.** Sponsor #2 + #3 onboarded. Compare Tavily cost per sponsor — see whether the ICP design exposes huge variance. Start drafting public marketing (Show HN v2: "we built an autonomous event scout").

**Week 10.** Stress-test: 10 ICPs running concurrently, 50 events/week discovery target validated. Quality regression has 4+ weeks of data — first publishable confidence interval on V/P/U accuracy.

**Week 11.** Polish + edge cases. Delete-on-request cascading to `discovered_events`. International events / non-English titles / timezone correctness on `starts_at`. Sponsor-staff cross-org detection (a sponsor employee for sponsor A who's also flagged as competitor for sponsor B).

**Week 12.** Acceptance test (§ 8) run end-to-end with founder absent. If it passes, ship to GA. If not, root-cause and slip a week.

### Buffer

The plan reads as 12 weeks; reasonable to budget **12 weeks + 2 buffer = 14 weeks calendar** given Tavily and Token Factory both have unknowns that surface only at integration. Anything past week 14 means rethinking the architecture, not just the schedule.

### Risks to the schedule (not the system)

- **Token Factory model id rebrand mid-build.** Pin via env, ship a hot-swap path week 4.
- **Tavily extract reliability lower than expected.** Allocate week-3 buffer to harden; consider Firecrawl as alt.
- **Quality A/B disagreement >5% from week 1.** Stop, prompt-tune, re-baseline. Do not ship a tier whose quality is worse than what we're replacing.

---

## Appendix A — env vars summary

```
TAVILY_API_KEY                  # required for autonomous mode (§ 1.5)
TAVILY_COST_CAP_USD             # defaults 200, weekly hard cap
NEBIUS_TOKEN_FACTORY_KEY        # required for autonomous mode (§ 2.4)
NEBIUS_TOKEN_FACTORY_BASE_URL   # defaults https://api.studio.nebius.ai/v1 (TODO confirm)
NEBIUS_TOKEN_FACTORY_MODEL      # defaults meta-llama/Meta-Llama-3.1-70B-Instruct (TODO confirm canonical id)
ANTHROPIC_API_KEY               # already present; reused for deep-tier + adjudication
INNGEST_SIGNING_KEY             # already present from v1.1 cron
AUTONOMOUS_KILLSWITCH           # boolean env override; if "true", all autonomous jobs no-op at boot
```

## Appendix B — open TODOs at spec-freeze

1. Confirm Tavily v2 search/extract/crawl response shapes against live API (current shapes inferred from public docs as of Q1 2026).
2. Confirm Nebius Token Factory's canonical model id and base URL — Nebius is mid-rebrand (Token Factory / AI Studio).
3. Confirm the v1.1 Luma cron is shipped and stable as the orchestrator template (this spec assumes yes).
4. Confirm `system_killswitches` placement: shared table vs. per-feature flags. v1 has no precedent yet.
5. Confirm sponsor-side admin UI for ICP configuration (this spec assumes the v1 admin already supports it; if not, +3 days week-1).
