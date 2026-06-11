# 5-Touch Sponsor Outbound Sequence

> Cold sequence for the 25-account target list. Per Founder/Ops PM proposal §3 Week 1: cold email + Loom → ranked CSV → LinkedIn DM → warm-intro request → closing-loop email.
>
> **Important:** This sequence is for the **cold** sponsor track. If an account submits the on-site audit form (i.e., they're inbound), drop them into the *audit-attached cadence* (separate doc, owned by v0.2). Sequences are *mutually exclusive*.
>
> **Merge fields** are wrapped in `{{double curly braces}}`. The founder fills these per-account from `account-brief-template.md` before sending touch 1.

## At a glance

| Touch | Day | Channel | Purpose | Skip if |
|---|---|---|---|---|
| 1 | Day 0 | Email | Cold email + 4-min Loom (radar filtered to their ICP) | — |
| 2 | Day +3 | Email (reply-to T1) | Send ranked CSV of 10 events to sponsor | Replied to T1 |
| 3 | Day +6 | LinkedIn DM | Mirror touch 1 in a shorter format | Replied to T1 or T2 |
| 4 | Day +9 | Email (to warm-intro candidate, CC prospect optional) | Warm-intro request through mutual connection | Replied via any prior touch |
| 5 | Day +14 | Email (reply-to T1) | Closing-loop "moving on" email | Replied via any prior touch |

**Global skip:** If the prospect replies at any touch, **stop the sequence** and move them into discovery-call cadence (book the 30-min "sponsor pilot discovery" call from `calendly-setup.md`).

---

## Touch 1 — Cold email + Loom

**Day:** 0
**Channel:** Email
**From:** Founder personal email (not noreply@)

### Subject line variants (A/B/C — pick one per account; rotate across tiers)

- A: `{{Account}} sponsorship ROI — 4-min walk-through`
- B: `Built an event-ROI tool for {{Account}}; want a look?`
- C: `{{P1 insight from their audit, phrased as question}}`
  - Example for LanceDB: `Why is RAGfest paying off but PyData isn't?`

### Body

> Hi {{first_name}},
>
> I'm {{founder_first_name}}, founder of Eventsea — we map the AI-builder event calendar (200+ events, scored on audience composition + sponsor history) so devrel teams can pick which to fund.
>
> I ran a quick audit on {{Account}}'s public event presence in the last 6 months. The headline: **{{P1 insight}}** — happy to walk through it.
>
> 4-min Loom here: **{{loom_url}}**
>
> If it's useful, I can send you a ranked list of the 10 events worth sponsoring next quarter for {{Account}}'s ICP (RAG-infra builders / agentic-AI devs / {{ICP_slider}}). No deck, no demo — just the list.
>
> Worth a 15-min call?
>
> {{founder_first_name}}
> eventsea.com · {{calendly_15min_url}}

### Notes for the founder
- Tier 1 (4 named): record a Loom against *their specific account's* audit. ~10 min each.
- Tier 2 (16 analogs): one Loom per category (AI-infra, RAG/vector, devtool platform) — reuse across accounts in that category.
- Tier 3 (5 stretch): no cold touch 1; warm-intro only.

---

## Touch 2 — Ranked CSV of 10 events

**Day:** +3
**Channel:** Email — **reply to your own touch 1** (keeps the thread together)
**Skip if:** Replied to T1.

### Subject line variants

- A: `Re: {{T1 subject}}` (just reply in-thread)
- B: `For {{Account}}: 10 events worth sponsoring Q3`
- C: `Ranked list (as promised)`

### Body

> {{first_name}} — promised list attached / pasted below.
>
> 10 events in Q3 2026 ranked for {{Account}}'s ICP. Columns: event name, date, projected developer reach, audience-overlap %, current sponsor co-investors, recommended activation.
>
> The top 3 are where I'd put real budget if I were running {{Account}}'s devrel line item. The bottom 3 are the "everyone sponsors these but they don't work for your ICP" trap — included so the comparison is honest.
>
> Want me to walk through any of them? 15 min: {{calendly_15min_url}}
>
> {{founder_first_name}}

### Attachment
- One CSV per account (Tier 1) or per category (Tier 2). Filename: `{{Account}}-Q3-2026-ranked.csv`.
- Generated from radar; founder edits the top-3 rationale by hand before sending.

---

## Touch 3 — LinkedIn DM

**Day:** +6
**Channel:** LinkedIn DM (direct message to the buyer; if no connection, send a connection request with the DM as the note — keep under 300 chars in that case)
**Skip if:** Replied to T1 or T2.

### Message variants (pick one; under 600 chars)

- A:
  > Hi {{first_name}} — sent over a 10-event ranked list for {{Account}}'s ICP earlier this week via email. Wanted to mirror here in case email isn't your channel. The headline I'd want a devrel lead to see: {{P1 insight}}. Worth a 15-min call? {{calendly_15min_url}}

- B:
  > Hey {{first_name}} — runs Eventsea; we score AI-builder events for sponsor-fit. Did a quick audit on {{Account}}: {{P1 insight}}. Happy to send the ranked list of 10 events for Q3 if useful — I have it ready. Easier to DM here or email?

- C (when there's a mutual connection visible on LinkedIn):
  > Hi {{first_name}} — saw {{mutual_connection_name}} in our shared network. Founder of Eventsea (event-sponsorship intelligence for AI-infra). Ran a quick audit on {{Account}}'s 2025 sponsor pattern and {{P1 insight}}. Open to 15 min? {{calendly_15min_url}}

---

## Touch 4 — Warm-intro request

**Day:** +9
**Channel:** Email **to the warm-intro candidate** (not the prospect). The prospect is *not* CC'd.
**Skip if:** Replied via any prior touch, OR no warm-intro candidate was identified in the account brief.

### Subject line variants

- A: `Quick intro ask — {{Prospect first name}} at {{Account}}`
- B: `Warm intro to {{Prospect first name}} ({{Account}})?`
- C: `Need 30 seconds of your network — {{Account}}`

### Body (template — adjust tone per relationship)

> Hi {{warm_intro_name}},
>
> Asking for a 30-second favor: I'm trying to reach {{prospect_first_name_last_name}}, {{prospect_title}} at {{Account}}, to talk about event sponsorship ROI. I sent a cold email + Loom + LinkedIn DM last week — no reply, which is fine, but I'd love a warm intro if you know them.
>
> Forwardable blurb is below. If it's not a fit, no worries — just say so and I'll stop bugging you.
>
> ---
> Forwardable:
>
> *Eventsea is a sponsorship intelligence layer for AI-infra and dev-tool companies — we map 200+ AI-builder events and tell devrel teams which ones to fund. Quick audit on {{Account}}'s 2025 event presence surfaced {{P1 insight}}. Worth a 15-min look — {{calendly_15min_url}}.*
>
> ---
>
> Thanks either way.
> {{founder_first_name}}

### Notes
- If there's no warm-intro candidate for the account, **skip touch 4 entirely** and proceed to touch 5 on day +14.
- Warm-intro candidate names live in the per-account brief. Founder fills these as part of pre-touch-1 prep.

---

## Touch 5 — Closing-loop "moving on" email

**Day:** +14
**Channel:** Email — **reply to your own touch 1 thread**
**Skip if:** Replied via any prior touch.

### Subject line variants

- A: `Re: {{T1 subject}}` (reply in-thread)
- B: `Closing the loop on {{Account}} sponsorship audit`
- C: `Last note from me — {{Account}}`

### Body

> {{first_name}} — closing the loop. Assuming this isn't a priority for {{Account}} right now, which is totally fair.
>
> I'll stop emailing. Two things if it's helpful:
>
> 1. The 10-event ranked list I sent on {{T2 date}} is still good for Q3 — feel free to use it, no strings.
> 2. If event-sponsorship ROI becomes a priority in Q4, my calendar is here: {{calendly_15min_url}}. Or just reply to this email and I'll pick it back up.
>
> Best,
> {{founder_first_name}}

### Notes
- Touch 5 surfaces "not now, maybe Q4" replies at a meaningful rate — it's the most replied-to touch in cold sequences.
- After touch 5, **stop**. Account moves to the Q4 re-engage list, not the active queue.

---

## Tracking

For each account, log in a spreadsheet:

| Field | Where it comes from |
|---|---|
| Account | Target list |
| Touch sent (1–5) | When you send |
| Date sent | When you send |
| Reply (yes/no) | Inbox |
| Reply sentiment (positive / neutral / objection / no) | Inbox |
| Moved to discovery | Calendly booking |
| Notes | Free text |

The founder reviews the spreadsheet end-of-day every business day in Week 1–2 of Sprint 1.

## Reply handling

Any reply, regardless of sentiment, **stops the sequence** for that account. Founder replies within 4 business hours during Week 1–2. Use the discovery-call script (`discovery-call-script.md`) once the call is booked.
