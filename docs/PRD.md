# PRD — Event Lead Intelligence

| | |
|---|---|
| **Feature** | Event Lead Intelligence (attendee screening, scoring, ranking & CRM export) |
| **Status** | Draft v1 — validated by two manual pilots (SIA Hackathon, BuilderShip Yacht Hackathon) |
| **Author** | Colin Lowenberg (with Claude) |
| **Date** | 2026-06-11 |
| **Prototype** | https://list.ship.builders (password-gated) — built by hand-running the pipeline this PRD productizes |

## 1. Problem

Event sponsors pay for access to attendees but get back a raw registration CSV: self-reported names, companies, and bios — unverified, unranked, and unusable by a sales team. Manually researching hundreds of registrants is days of work, so it doesn't happen, and sponsor ROI is anecdotal. Organizers face the mirror problem: they can't tell which registrants are high-value builders, which are investors, and which are noise when curating who to admit, feature, or seat on a judging panel.

**Evidence this is worth building (manual pilots):** For BuilderShip (726 registrants) the pipeline run by hand verified 100% of attendees (90 deep, 636 light-screened), produced per-sponsor scores, caught ~15 competitors, ~10 inflated/false claims (fake founder titles, fake big-co employment), 2 throwaway identities, surfaced 97 strong leads invisible in the raw CSV, and shipped a gated dashboard the sponsor teams used at the event. The marginal cost was ~hours of agent time vs. days of human research.

## 2. Goals & success metrics

| Goal | Metric (v1 target) |
|---|---|
| Sponsors act on verified leads, not raw CSVs | 100% of uploaded attendees screened; ≤2% later found misattributed |
| Time-to-value | CSV upload → ranked dashboard in <1 hour for 1,000 attendees |
| Sales-ready output | 1-click CRM export used by ≥1 sponsor team per event |
| Organizer curation | Top-N builders + judge panel generated per event |
| Unit cost | <$0.10 per attendee screened (open-model inference via Token Factory) |

**Non-goals (v1):** LinkedIn follower counts (not obtainable at scale — do not fake); automated outreach/sequencing; multi-tenant self-serve signup; deep per-CRM API integrations (CSV import-wizard compatibility only); GDPR tooling beyond delete-on-request.

## 3. Personas

- **Sponsor seller** (primary): works a booth/yacht with 3 hours and 700 attendees; needs "who do I talk to, why, and what do I open with."
- **Event organizer**: curates admissions, feature lists ("Top 100 builders"), and judge panels; needs influence + legitimacy signals.
- **Sponsor marketing/ops**: post-event, imports leads into HubSpot/Salesforce with the analysis attached.

## 4. Release plan

| Release | Scope | Trigger |
|---|---|---|
| **v1 — CSV upload** | Upload registration CSV → full pipeline → dashboard + exports | User-initiated |
| **v1.1 — Luma API** | Connect event via Luma API key; scheduled pulls; auto-diff new approvals; re-screen additions only | Scheduled (cron) |
| **v2 — Autonomous** | App discovers/scrapes event calendars itself (Tavily), processes attendees (Token Factory), redeploys its own pages on schedule — no human in loop | Fully autonomous |

## 5. Functional requirements

### FR1 — Ingestion (v1)
- Accept CSV uploads (Luma/Eventbrite exports; `utf-8-sig`/BOM tolerated). Map flexible column names onto the canonical schema: name, email, phone, company/project, build description, LinkedIn, X/Twitter, GitHub, website, demo-video URL.
- Dedupe by email; detect same-human duplicates (same name/phone, different email) and link them.
- Immediately flag sponsor-domain emails (`do-not-pitch`, scores zeroed).
- Compute a registration-signal score (company domain vs freemail/.edu/relay; substantive build text; links present) used ONLY to assign verification depth — never final rank.

### FR2 — Verification (two-tier)
- **Deep tier (top ~10% signal):** agentic web research per attendee — identity, company, role, funding/stage, size; output: verified company+role, 1-sentence description, ranked product fits, score 1–9, lead type, "why" talking point, flags.
- **Light tier (everyone else):** batched agent screening (~12/batch, 1–2 searches each) returning one structured record per lead:
  `email | verdict(V/P/U) | company | role | score_per_sponsor… | type | why | flags`
  with verdicts: V = identity+company verified · P = identity found, claims unconfirmed · U = unscreenable. Light scores cap at 8; U caps at 3.
- **Reconciliation:** parse, dedupe by email, diff outputs against inputs; auto-repair gaps (agents drop/typo ~0.5% of leads).
- **Trust rules (product requirements, not suggestions):**
  - LinkedIn slug is the identity anchor; email domain + verbatim bio are self-verifying; all other web claims require a source.
  - Never assert unverified claims; name collisions are the dominant error mode. A wrong attribution is a worse failure than "unverified."
  - Expect inflation (false founder titles, others' companies, fake big-co employment): correct it, score honestly, surface the correction in flags — never silently fix.
  - Funding numbers carry a source or read "not found."
- Engine: **Tavily** (search/extract) supplies evidence; **Nebius Token Factory** open models run extraction/classification/scoring; premium models reserved for the deep tier and adjudication.

### FR3 — Per-sponsor scoring
- One score column per sponsor product. Default product set when unconfigured:
  **Tavily** (web search API for agents), **Nebius Token Factory** (inference/open models), **Nebius AI Cloud** (GPU training).
- Verified-fit decomposition: 1st-ranked fit = full score, 2nd −1, 3rd −2, absent −3 (floor 1). Investors score equally across sponsors (partnership leverage).
- Conflict overrides: attendee employed by / invested in a sponsor's competitor → that sponsor's score = 1 + explicit flag. Competitor of any sponsor → type=Competitor, excluded from that sponsor's pitch lists and from curation (FR6).

### FR4 — Influence
- Clean handles (strip URLs/@; reject placeholders, sponsor tag-handles pasted as answers, short handles resolving to mismatched celebrities — verify name match before crediting).
- X followers via fxtwitter-style public API; GitHub via authenticated GitHub API.
- Columns: X followers, GitHub followers, Social Reach (sum), Influence Rank. Display point-in-time caveat. LinkedIn explicitly shown as "not available."

### FR5 — Dashboard
- Self-contained page per event (embedded JSON; no client-server chatter): full-text search; per-sponsor sort; filter chips (All / Verified / Investors / 10k+ reach / Has demo / Conflicts / curated lists); cards with tier badges (VERIFIED/SCREENED), per-sponsor score pills, follower metrics + influence rank, flags, and action links (site, LinkedIn, X, GitHub, demo, mailto). Paginate rendering (~120 cards + "show more").
- Tier semantics are visible product surface: deep-verified vs screened vs unscreenable must be visually distinct, and "claims unconfirmed" rows must show what's unconfirmed.

### FR6 — Curation (Top-N builders, judges)
- **Top-N builders:** `4·has_demo + log10(reach+1) + 0.35·best_score + tier_bonus + 1.5·hackathon_winner − bigco_penalty`; ineligible: judges, investors, competitors, sponsor staff, duplicates. Always end with a human-review pass (UI: approve/swap) — the formula surfaces, a person confirms. Publish the cutoff score.
- **Judges (≤10 panel + pool):** senior VCs, influencers, operators who are NOT demoing; panel starred and category-labeled (VC / INFLUENCER / OPERATOR), full eligible pool listed beneath; builder/judge sets mutually exclusive (enforced).

### FR7 — CRM export ("Download leads")
- Dashboard control exporting the **currently filtered view** as CSV, client-side:
  - **HubSpot:** contact columns (First/Last Name, Email, Phone, Company Name, Job Title, Website/LinkedIn URLs, X Handle) + all analysis columns as custom properties; email = dedupe key.
  - **Salesforce:** Lead-import columns with required-field fallbacks (Last Name from single token; Company → "-"), Lead Source = event name, Rating Hot/Warm/Cold from best score (≥7/≥5/else), analysis packed into Description.
- UTF-8 BOM for Excel. Filename encodes format + active filter + row count.
- *Later (v1.1+):* research exact HubSpot property APIs / Salesforce field mappings for direct API push instead of CSV.

### FR8 — Update loop
- New export (v1) or scheduled Luma pull (v1.1): diff by guest_id (fallback email); screen additions only; fetch followers for new handles only; surface removals — if a removed person held a curated slot, flag and backfill. Rebuild + redeploy; verify the live page changed (authenticated content check).

### FR9 — Access control & privacy
- Event pages contain PII + internal sales judgments → **private by default**.
- Sharing = server-side password gate: login endpoint sets HttpOnly cookie; middleware redirects all other routes. Never client-side JS gates (view-source bypass); never platform SSO as the gate (blocks invited sponsor guests). Post-deploy verification is part of the definition of done: no-cookie → redirect with zero lead data in body; wrong password → 401; correct → content.
- Code/data repos private. Delete-on-request for any attendee.

### FR10 — Autonomous mode (v2)
- Standing goal execution: a **council of PM-perspective agents** (revenue-first / user-first / risk-first) selects the next milestone and records rationale; work fans out as parallel workflows in **isolated git worktrees** (one per feature/release); short **~30-second self-check ticks** keep each workstream aligned to the milestone; **PLAN.md + STATE.md** (done / in-flight / blocked, file paths, verify commands) are committed with the code so any agent resumes with zero conversation context.
- Pipeline becomes scheduled: Tavily discovers event calendars + attendee sources → Token Factory screens/scores → dashboard rebuilds and redeploys unattended.

## 6. System design (v1)

```
CSV upload ─→ Ingest/normalize ─→ Signal triage ─┬─→ Deep enrichment (agents, premium model)
                                                 └─→ Light screening (batched agents,
                                                       Token Factory open models, Tavily evidence)
            ─→ Reconcile (V/P/U, gap repair) ─→ Per-sponsor scorer (+conflict overrides)
            ─→ Influence fetcher (X / GitHub APIs)
            ─→ Store (attendees, screenings, scores, influence, curation)
            ─→ Dashboard generator (static HTML + embedded JSON)
            ─→ Deploy (gate: middleware + login function) ─→ CRM export (client-side)
```

Key components: ingestion service; screening orchestrator (batch fan-out, retries, gap repair); evidence layer (Tavily); inference layer (Token Factory; model tiering); influence fetcher; scorer with override table; static-site generator; gated deploy; diff/update job (v1.1 cron). Data model: Event, Attendee (canonical contact + registration), Screening (verdict, evidence, tier), SponsorScore (per product), Influence, CurationTag (builder/judge/pool), ExportLog.

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Misattribution (name collision) damages trust | Anchor rules (FR2), P/U verdicts surfaced in UI, corrections visible in flags |
| Screening agents drop/typo leads | Input/output diff + auto-repair (FR2 reconciliation) |
| Follower APIs (fxtwitter) are unofficial | Abstract the fetcher; degrade gracefully to "n/a"; GitHub API is stable |
| PII leak | FR9 gate + private repos + post-deploy verification as definition-of-done |
| Cost blowup at 1k+ attendees | Token Factory open models for light tier; premium only for deep tier/adjudication; per-event cost report |
| Luma API quotas/auth (v1.1) | Open question — validate limits before committing scheduling SLAs |

## 8. Open questions

1. Luma API: auth model, guest-list endpoint quotas, webhook availability (would beat polling).
2. Exact HubSpot/Salesforce field research for direct API push (v1.1+) — CSV wizard compatibility is the v1 contract.
3. Multi-event/multi-tenant: one deploy per event (current) vs. one app with event routing + auth scopes.
4. Attendee opt-out / data-retention policy per event jurisdiction.
5. Organizer-editable curation (approve/swap Top-N in the UI) vs. config-file (current).

## Appendix A — Pilot results (the manual runs this PRD productizes)

- **SIA Hackathon:** 197→213 registrants; enriched lead sheet; 19 project repos cloned and reviewed; public showcase site shipped.
- **BuilderShip:** 726 registrants, 100% screened (90 deep / 636 light; light-tier verdicts 327 V / 237 P / 41 U); ~15 competitor flags; judge panel of 10 + pool of 45; Top 100 builders (published cutoff 6.2); gated dashboard at list.ship.builders; HubSpot/Salesforce export validated at 726 rows × 22 columns; 5 CSV update cycles diffed and redeployed.
