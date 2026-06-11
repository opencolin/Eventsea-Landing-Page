---
name: event-leads
description: >
  Full lead-analysis pipeline for event/hackathon registration CSVs: verify every attendee
  against live web sources, score them per sponsor product, rank by social influence
  (X/GitHub followers), flag competitors/investors/sponsor-staff, and ship a sortable
  spreadsheet and/or password-gated web dashboard — plus curated Top-N builder and judge
  lists. Use this whenever the user has an attendee/registration/guest CSV (Luma, Eventbrite,
  etc.) and wants leads reviewed, screened, enriched, categorized, ranked, or turned into a
  dashboard; whenever they ask "who are the top leads/builders/judges at this event"; for
  follow-up requests on an existing event analysis (new CSV export to diff in, re-ranking,
  picking hackers or judges); and when they want to productize this — pull attendees from the
  Luma API, scrape/process event calendars automatically, or run the pipeline autonomously
  toward a goal. Trigger even if they just say "review the attached attendee list for our
  sponsors" without naming this skill.
---

# Event Lead Analysis

Turn a raw registration CSV into verified, per-sponsor-scored, influence-ranked leads with
curated builder/judge lists. The user supplies a CSV; everything else below is the method.

## Step 0 — Collect inputs (ask only for what's missing)

1. **CSV path** (usually given). If macOS blocks `~/Downloads` (TCC "operation not permitted"),
   ask the user to drag the file into the project folder.
2. **Sponsors/products with one-line ICPs** — scoring is per sponsor, so you need what each
   sells and to whom. **Default trio when unspecified** (the products this pipeline was built
   around — rank every attendee on likelihood to buy each):
   - **Tavily** — web search/extract/crawl API for AI agents (live-web retrieval, research agents)
   - **Nebius Token Factory** — LLM inference API + open-model serving + fine-tuning-as-a-service
   - **Nebius AI Cloud** — GPU clusters for training/fine-tuning/RL (world models, robotics, heavy compute)
3. **Deliverable**: spreadsheet, dashboard, or both. **If deploying**: domain + password.
4. Optional: event URL for track/prize context.

## Step 1 — Ingest & triage

- Parse with `encoding='utf-8-sig'` (Luma exports carry a BOM). Dedupe by email; keep all rows.
- Map whatever columns exist to: name, email, company/project, build description, LinkedIn,
  Twitter/X, GitHub, website, demo video, phone.
- Heuristic signal score per row (company email domain > freemail/.edu/Apple-relay; substantive
  company + build text; website; LinkedIn present). This only decides *verification depth*,
  never final ranking.
- Immediate flags: sponsor-domain emails = **sponsor employee, do-not-pitch, all scores 0**;
  same human registered twice (same name/phone, different email) = mark the duplicate.

## Step 2 — Verify everyone (two tiers)

**Deep enrichment — top ~10% by signal.** Research subagents verify identity, company, role,
funding/stage, size. Output per lead: verified company+role, one-sentence what-they-do,
ranked best-fit products, score 1–9, lead type, a concrete "why" talking point, flags.

**Light screening — everyone else.** Parallel subagent batches of ~12 leads, 1–2 web searches
each, returning ONE line per lead, exactly:

```
email|VERDICT|Company|Role|S1|S2|S3|TYPE|why(<=14 words)|flags(<=8 words)
```

- VERDICT: `V` identity+company verified · `P` identity found, claims unconfirmed ·
  `U` unscreenable (no anchor). Light scores cap at 8; `U` caps at 3.
- TYPE: `Buyer|Investor|Champion|Competitor|Student|Bigco|Low`.
- No pipes inside text fields. Every input lead must produce exactly one line.
- After each wave: parse, dedupe by email, **diff parsed emails against batch inputs** — agents
  occasionally drop a lead or typo an email; repair gaps before continuing.

**Verification rules (these failure modes WILL occur — they did every time):**
- The LinkedIn URL/slug is the identity anchor. Email domain and verbatim bio are
  self-verifying; every web-sourced claim is not.
- Never assert what you can't confirm. Name collisions are the #1 hallucination source; a
  wrong company attribution is worse than "unverified."
- People inflate. Expect false founder claims, inflated titles, someone else's company, fake
  big-co employment. Catch it, score honestly, put the correction in flags — visible, never
  silently fixed.
- Funding numbers come from sources or read "not found." Adversarially re-verify anything
  high-stakes (top-10 lists, "competitor" labels, dollar figures) before publishing.

## Step 3 — Score per sponsor (never one global score)

- One column per sponsor. Verified-fit decomposition: 1st-ranked product = full score,
  2nd = −1, 3rd = −2, absent = −3 (floor 1). Investors score equally across sponsors
  (partnership leverage, not consumption).
- Conflict overrides: employee/fund of a sponsor's competitor → that sponsor's score = 1 with
  an explicit flag (e.g. Microsoft-fund investor → never pitch the rival GPU cloud).
  Competitors of any sponsor: TYPE=Competitor, pink flag, excluded from that sponsor's pitch.

## Step 4 — Social influence

- Clean handles: strip URLs/@/queries; reject placeholders ("na", "idontuseit"), the sponsors'
  own tag-handles pasted into the field, and short handles that resolve to celebrities
  (verify name matches before crediting followers).
- X followers via `https://api.fxtwitter.com/<handle>` (thread pool, one retry). GitHub via
  `gh api users/<handle>`. **LinkedIn follower counts are not obtainable at scale — say so;
  do not fake them.**
- Columns: X followers, GitHub followers, Social Reach (sum), Influence Rank. Point-in-time.

## Step 5 — Deliverables

**Spreadsheet** (one sheet, all attendees): per-sponsor score columns (color-scaled 1–9),
lead type, why, flags, verbatim registration fields, handles+followers, influence rank,
contacts. Pink fill = competitor/conflict/sponsor-staff; purple = investor; verified tier
visually distinct from screened.

**Dashboard**: single self-contained HTML (embedded JSON, no backend). Live search over all
fields; per-sponsor sort; filter chips (All / Verified / Investors / 10k+ reach / Has demo /
Conflicts); cards with tier badges, score pills, follower metrics, links (site, LinkedIn, X,
GitHub, demo, mailto). Render ~120 cards with "show more" for performance.

**CRM export ("download leads"):** after the event, leads flow into the sponsor's CRM. Give
the dashboard a "Download leads" control with **HubSpot** and **Salesforce** CSV options,
generated client-side from the embedded data and exporting the *currently filtered view*
(so Top-N / judges / a sponsor's sort exports as its own list). Use each CRM's import-wizard
defaults — email is the dedupe key; column mapping handles the rest: HubSpot = First/Last
Name, Email, Phone, Company Name, Job Title, Website/LinkedIn URLs + every analysis column
as custom properties; Salesforce = First/Last Name (Last Name required — fall back to the
single name token), Company (required — fall back to "-"), Title, Email, Phone, Website,
Lead Source = event name, Rating mapped Hot/Warm/Cold from best sponsor score (≥7/≥5/else),
and all analysis packed into Description. Prefix the file with a UTF-8 BOM so Excel renders
names correctly.

**PII rule (non-negotiable):** the data holds emails, phones, and internal sales judgments.
Local by default. If deployed: **private** repo + server-side gate — a login endpoint checks
the password and sets an HttpOnly cookie; middleware 302s every other route. Never a
client-side JS prompt (view-source bypass), never the team's platform SSO (blocks invited
guests). After deploy, verify end-to-end: no cookie → redirect with zero lead data in the
body; wrong password → 401; correct → content. Disable the host's default deployment
protection so your gate is the only gate.

## Step 6 — Curation layers (when asked)

**Top-N builders/hackers** = people who will actually build and amplify:
`score = 4·(has demo video) + log10(reach+1) + 0.35·best_sponsor_score + tier_bonus
(+1.2 deep / +0.5 screened) + 1.5·(hackathon-winner mention) − big-co penalty`.
Ineligible: judges, investors, competitors, sponsor staff, duplicate registrations.
Then a **manual pass**: pull formula picks that don't survive scrutiny (fakes, unverifiable
companies, off-topic projects) and backfill with the next credible builders. Report the
cutoff score for transparency.

**Judges (≤10)** = senior VCs, influencers, top operators who are NOT demoing. Balance
capital / reach / technical authority. Show the full judge-eligible pool (all credible
investors + judge-flagged seniors) with the chosen panel starred and sorted first. Builders
and judges must be mutually exclusive — assert it in code. No competitor employees on a
sponsor's panel.

## Step 7 — Update loop (new CSV exports)

Diff by guest_id (fallback: email). Screen only additions (same pipe format, merge into the
screened store); fetch followers for new handles only; drop removals — and if a removed
person held a curated slot, say so and backfill it. Rebuild, redeploy, verify the live site
actually changed (grep a count or a new name through the auth gate).

## Roadmap — from one-off analysis to self-running product

This pipeline is also a product vision. When the user asks to "build the app," to automate
this, or to keep going, build toward these releases (in order):

- **v1 — CSV upload (this skill today).** User uploads a registration CSV; Tavily screens
  attendees, influence is measured, everyone is ranked by likelihood to buy each sponsor
  product; output is the spreadsheet + gated dashboard.
- **v1.1 — Luma API ingestion.** Replace manual CSV export with the Luma API (guest list
  endpoints, api-key auth): the app pulls registrations on a schedule, diffs new approvals
  automatically (Step 7), and re-screens only the additions.
- **v2 — autonomous event intelligence.** The app finds and processes events on its own and
  updates its own page with no human in the loop: **Tavily** (search/extract/crawl) discovers
  event calendars and registration/attendee data; **Token Factory** (open-model inference)
  does the screening, classification, and scoring at API cost rather than premium-model cost;
  a scheduled job (cron / scheduled agent) rebuilds and redeploys the dashboard. The deployed
  page becomes self-updating — events in, ranked leads out.

## Autonomous goal mode

When invoked with a standing goal ("decide the next step and do it," "keep building toward
v2"), run as a self-directed loop rather than a single pass:

1. **Decide with a council.** Spin up a small council of PM-perspective subagents (e.g.
   revenue-first, user-first, risk-first). Each proposes the single next milestone with
   rationale; reconcile into one decision and record it — the decision log is part of the
   plan, so the "why" survives the session.
2. **Fan out in worktrees.** Parallelize independent workstreams (one per release/feature up
   to v2) as subagent workflows, each in its **own git worktree** so concurrent changes never
   collide; merge back only what passes verification.
3. **Pace with short ticks.** Work in short timeboxes (~30-second self-check ticks): at each
   tick, confirm the current step still serves the chosen milestone, log progress, and
   course-correct early instead of discovering drift late.
4. **Document for handoff — always.** Maintain PLAN.md (roadmap + council decisions),
   STATE.md (what is done / in flight / blocked, with file paths and verify commands), and
   per-workstream notes, committed alongside the code. The bar: **any other agent could pick
   up exactly where you left off** with zero conversation context.

## Reporting style

Narrate counts at each stage (total / deep-verified / screened / V-P-U split / competitors
found), top names per sponsor, and **every correction where a registration claim failed
verification**. Finish with: top leads per sponsor, investor/partnership list, competitor
warnings, junk/fraud registrations caught, and links to the deliverables.
