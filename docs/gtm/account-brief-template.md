# Account Brief — Template

> The 1-pager the founder fills out per named account *before* sending touch 1. Per GTM PM proposal §"Week 1 — account briefs." Filling this out is what makes touch 1 personalized and touch 4 (warm intro) actionable.
>
> **Time per brief:** ~30 min for Tier 1 (4 named), ~15 min for Tier 2 (16 analogs), ~45 min for Tier 3 (5 stretch — research-heavy because we lead with warm intros only).
>
> **When:** Day 2 of Sprint 1 (before the 25 emails go out on Day 3).
>
> **Storage:** Save each brief as `docs/gtm/briefs/{{account-slug}}.md` (folder doesn't exist yet — create on first use; one file per account).

---

## Brief — `{{Account name}}`

### Account snapshot

- **Account:** `{{Account name}}`
- **Website:** `{{URL}}`
- **HQ + team size:** `{{e.g., NYC, ~80 employees}}`
- **Tier (1 / 2 / 3):** `{{from target-list.md}}`
- **Funding stage:** `{{e.g., Series B, $XXM raised}}`
- **Brief author:** `{{founder name}}`
- **Brief date:** `{{YYYY-MM-DD}}`
- **Touch 1 send date (planned):** `{{YYYY-MM-DD}}`

---

### Last 6-month event sponsorship history

> Research via the Eventsea radar (filter to sponsor = `{{Account}}`, date range last 6 months) plus public Twitter / LinkedIn / "as seen at" callouts. Don't over-engineer — 30 min cap.

| Event | Date | Tier (visible spend signal) | What they activated (booth / talk / track / hackathon prize) | Visible outcome (tweets / case studies / "X built with") |
|---|---|---|---|---|
| `{{Event}}` | `{{YYYY-MM-DD}}` | `{{e.g., title-sponsor / mid / community}}` | `{{}}` | `{{}}` |
| `{{Event}}` | `{{YYYY-MM-DD}}` |  |  |  |
| `{{Event}}` | `{{YYYY-MM-DD}}` |  |  |  |

**Quick pattern read:**
- Are they *concentrating* on 1–2 mega events or *scattering* across many small ones?
- Are they sponsoring events *where their ICP shows up* or events where their *peer companies* show up (signal of follow-the-herd vs. ICP-led)?
- One sentence describing the pattern: `{{...}}`

---

### Buying committee — names + LinkedIn URLs

> Research order: DevRel lead → Field Marketing → Ecosystem / Partnerships → Head of Growth. Identify at least 1 name in row A. Rows B and C are bonus (for warm-intro fallback).

| Role | Name | LinkedIn URL | Why they're the buyer |
|---|---|---|---|
| **A. Primary buyer** | `{{}}` | `{{}}` | `{{}}` |
| B. Likely influencer | `{{}}` | `{{}}` | `{{}}` |
| C. Likely approver (VP+) | `{{}}` | `{{}}` | `{{}}` |

**Title-fallback note:** If `{{Account}}` doesn't have a dedicated DevRel lead (small teams often don't), the primary buyer is whoever signs the sponsorship checks. Look at recent "thanks to our sponsors" tweets — the person tagged is usually the buyer.

---

### Semantic slider — their ICP

> The radar takes a semantic slider value to rank events. Set the value here so the touch 1 Loom and touch 2 CSV match what they actually care about.

- **Slider value:** `{{e.g., "vector DB / RAG infra", "agentic AI tooling", "K8s platform engineers"}}`
- **Why this slider:** `{{1 sentence — point to a public artifact}}`
- **Tier of confidence (high / medium / low):** `{{}}`

If confidence is low, run the brief past one Twitter follow loop ("if I were `{{Account}}`, which builders do I want to reach?") before sending touch 1.

---

### The ONE P1 insight to lead with

> Pulled from radar's audit of `{{Account}}`'s last 6 months. Pick the single most surprising / actionable insight. *Not* "you sponsored X" — that's news to no one. The insight is "X paid off / didn't" or "Y in this category fits your ICP better than what you bought."

- **P1 insight (one sentence, opinionated):** `{{...}}`
- **Supporting data point (one line, sourced):** `{{...}}`
- **Why it lands with this buyer:** `{{1 sentence — what they'll feel reading it}}`

**Lead-line litmus test:** If you can imagine the buyer's reaction being "obviously" or "I knew that," the insight isn't sharp enough. Re-rank.

---

### Touch 1 — subject + opening line

> Drafted before send. Pick a variant from `5-touch-sequence.md` Touch 1 subject options A/B/C, then customize.

- **Subject line:** `{{filled-in variant}}`
- **Opening line (first sentence of body, customized):** `{{...}}`

**Loom plan:**
- **Will the Loom be account-specific or category-shared?** `{{account-specific (Tier 1) | category-shared (Tier 2) | n/a (Tier 3 — no cold touch 1)}}`
- **Loom URL (if recorded):** `{{}}`
- **Loom length target:** ≤ 4 minutes

---

### Warm-intro paths

> Per `5-touch-sequence.md` Touch 4: by Day +9, if the prospect hasn't replied, the founder reaches out via a warm-intro candidate. Identify the candidate **before** sending touch 1 so it's not a last-minute scramble.

| Path tried (or "cold") | Candidate name | Relationship to founder | Relationship to prospect | Status (planned / asked / passed / intro-made) | Notes |
|---|---|---|---|---|---|
| `{{e.g., "OSS contributor at Luma" / "ex-Anthropic devrel"}}` | `{{}}` | `{{}}` | `{{}}` | `planned` | `{{}}` |
| `{{}}` | `{{}}` | `{{}}` | `{{}}` |  |  |

If status across all rows reaches `passed` or `intro-made declined`, mark account as **cold-only** and skip touch 4 entirely.

---

### Tracking + handoff

- **Date touch 1 sent:** `{{}}`
- **Calendar slot opened:** `{{Calendly link sent — yes / no}}`
- **Reply status:** `{{pending / replied / no-reply / dead}}`
- **Discovery call booked:** `{{date / no}}`
- **Notes after first call (link to call notes):** `{{}}`

---

## Checklist before sending touch 1

- [ ] Buyer name + LinkedIn found (row A required)
- [ ] At least 1 warm-intro candidate identified OR account marked "cold-only" intentionally
- [ ] Semantic slider value picked + confidence rated
- [ ] P1 insight written + passes the "obviously" litmus test
- [ ] Subject line + opening line drafted
- [ ] Loom recorded (or category Loom reused for Tier 2)
- [ ] Brief saved to `docs/gtm/briefs/{{account-slug}}.md`

Once all six are checked, send touch 1.
