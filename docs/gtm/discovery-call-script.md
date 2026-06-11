# 20-Min Sponsor Discovery Call Script

> Founder/Ops PM proposal §3 Week 2. Founder takes every call. Strict script — these 6 questions in this order. Listen more than you talk.
>
> **Pre-call:** Send the 4-min Loom of radar 24 hours ahead, framed as "sponsor lens." This gives them context so the call can be diagnostic, not demo.
>
> **Call shape:** 20 minutes. ~2 min intro, ~14 min on questions 1–3 (diagnostic), ~4 min on questions 4–6 (pitch + close).
>
> **Goal of this call:** Yes / No / Maybe + decision-maker + timeline. Not "convince them." If they're not in ICP, end early — protect your time.

## Pre-call checklist

- [ ] Loom sent 24h ahead
- [ ] Account brief (`account-brief-template.md`) open
- [ ] Pilot offer (`sponsor-pilot-offer.md`) open in a tab — ready to share screen on Q5
- [ ] Notepad open for capturing budget numbers + decision-maker names verbatim
- [ ] Calendly link for the 30-min follow-up ready to paste

## Intro (2 min)

> "Hey {{first_name}}, thanks for the time. I'll keep this to 20 minutes. Before I show you anything, I want to ask 3 questions about how {{Account}} thinks about event sponsorship today, then I'll show you what we've built and you can tell me if it's interesting. Sound good?"

**What you're listening for:** energy. If they sound rushed / distracted, compress questions 1–3 into one. If they sound curious, you have room.

---

## Q1 — Budget by line item

> "What's {{Account}}'s 2026 devrel / ecosystem budget look like by line item? Roughly — what's events vs. content vs. tooling vs. partnerships?"

### What we're listening for
- A **number** (even rough) for the events line item. We want to know if $5K, $7.5K, $15K is a rounding error or a real ask.
- Who **owns** the line item. (Their title vs. a finance counterpart.)
- Whether the line item is **annual** or **quarterly**. Quarterly = faster procurement.

### Follow-up probes
- "Is that allocated quarterly or annually?"
- "Who signs off on a $10K event sponsorship — you, your VP, finance?"
- "Is it a fixed pot or can it expand mid-year if you find something new?"

### Common objections + response

| They say | You say |
|---|---|
| "I can't share specific numbers." | "Totally fair — order of magnitude? <$50K, $50K–$250K, $250K+?" |
| "Events budget got cut for 2026." | "Got it — is the work just moved to another line, or is event ROI itself in question?" |
| "We don't have a dedicated events line." | "What bucket does sponsorship come out of when you do say yes?" |

---

## Q2 — How they measure event ROI today

> "How do you measure whether a sponsorship worked?"

### What we're listening for
- **"We don't"** — this is the gold answer. It means the buyer feels the pain and we're selling them a measurement tool.
- **"Leads scanned at the booth"** — okay, but they know it's bad. Probe on whether those leads ever convert.
- **"Brand awareness / impressions"** — they're marketing-led, not data-led. Adjust pitch to be brand-attribution heavy.

### Follow-up probes
- "When was the last sponsorship you'd call a clear win? Why?"
- "When was the last one that didn't pay off? How did you find out?"
- "Does anyone outside your team see those numbers — finance, leadership?"

### Common objections + responses

| They say | You say |
|---|---|
| "We don't really measure — it's brand." | "Got it. Does your CFO ever ask why?" (Probe: is there pressure to start measuring?) |
| "We track booth leads through Salesforce." | "What's the conversion rate from those leads vs. inbound?" (Probe to expose the gap.) |
| "Marketing handles attribution, not me." | "Are *you* under pressure to defend the events line, or is that downstream?" |

**Listen-only rule:** If they're describing a measurement system that actually works, **don't argue**. Take notes. They might still buy the matching/ranking side of the offer — but pivot the pitch.

---

## Q3 — The "what would finance approve" question

> "If a tool gave you attributable reach to 500 AI builders per quarter — meaning we could tell you exactly which builders saw {{Account}}'s sponsorship and what they did next — what's the number your finance team would approve without a procurement cycle?"

### What we're listening for
- **The PO threshold.** This is the discretionary spend they can sign off on solo. Usually $5K, $10K, $25K, or $50K. Anchors your package recommendation.
- The phrasing "without procurement" surfaces whether they need SOC 2 / vendor security review. If they pause on the word "procurement," follow up.
- Whether **500 builders/quarter** is impressive, underwhelming, or about right. Calibrates the pitch on Q5.

### Follow-up probes
- "Is that ceiling per project or per vendor annually?"
- "How long does procurement add when you cross that threshold — weeks, months?"
- "Have you ever bought a tool under that threshold and then expanded it later?"

### Common objections + responses

| They say | You say |
|---|---|
| "Procurement starts at any dollar amount." | (Bad sign for Sprint 1 close. Flag it.) "Got it. Is there a way to start with a paid POC under a different mechanism?" |
| "500 builders/quarter isn't enough." | "What's the floor that *is* interesting? 1K? 5K?" (Calibrate package C.) |
| "We'd need to see the actual builders / list." | "Fair. That's what the attribution PDF in our pilot is for. Can I show you?" |

---

## Q4 — Show radar (4 min)

> "Let me show you the radar quickly. I'll filter to {{Account}}'s ICP — {{ICP_slider_value}}."

**Demo flow (rehearsed, 4 min hard cap):**
1. Open radar filtered to their ICP slider. (30 sec)
2. Show top-10 events for next quarter. Walk through the top 3 with rationale. (2 min)
3. Show one event in detail — audience composition, co-sponsors, prior sponsor outcomes. (1 min)
4. Show the P1 insight from their own account audit. (30 sec)

### What we're listening for
- **Lean-in vs. lean-out.** Are they asking questions or checking their phone?
- Which **filter / column** they ask about — tells you what they want in the dashboard.
- Whether they recognize the events. If they don't recognize *any*, ICP might be off.

### Don't
- Don't pitch during the demo. Show. Be quiet.
- Don't apologize for what's missing. The product is good enough for this conversation.

---

## Q5 — Pitch the $12.5K pilot (post-PRD pricing)

> "Based on what you just said about {{their stated budget / measurement gap}}, the pilot I'd recommend is the **$12.5K Package B**. It includes everything you saw in the BuilderShip dashboard — light + deep tier screening, V/P/U verdicts, per-sponsor scoring, the gated lead dashboard — for the events you sponsor next quarter. Here's the staged delivery:"

Walk through Package B from `sponsor-pilot-offer.md`. Anchor on the Day-1/7/14 staged delivery table. 90 seconds. Then stop talking.

> "Does this make sense as a next step?"

### What we're listening for
- The first sentence after you stop talking. If it's a budget question, you're in. If it's a "let me think about it," push for a date.
- Whether they reframe the price up ($25K Package C) or down ($7.5K Package A). Both are buying signals — they're shopping.
- Whether they ask about the staged delivery vs. expecting BuilderShip-finished Day 1 — see Objection #7 in `objection-handling.md`.

### Common objections + responses

See `objection-handling.md` for the long list. The three that come up most on the first pitch:

| They say | You say |
|---|---|
| "$12.5K is more than I can sign off on." | "Got it. Package A is $7.5K — single event, same screening + dashboard quality, just one event not three. Does that fit?" (Don't lower B; offer A.) |
| "Will mine look like BuilderShip's by Day 1?" | "By Day 14 — first cycle of the same mechanic. BuilderShip is what 5 cycles look like; yours starts as cycle 1, hits BuilderShip polish by cycle 3-4. The staged delivery is in the proposal." (Long version in objection #7.) |
| "What's the ROI guarantee?" | "Light tier complete by Day 7, deep tier + dashboard live by Day 14, 3 ranked event recommendations + 2 organizer intros by Day 30 — or your next quarter is free. I can't guarantee sponsorship outcomes from events you sponsor, since I don't run the events." |

**Don't discount Package B below $12.5K.** Offer Package A at $7.5K instead. The post-PRD anchor change is in `sponsor-pilot-offer.md` § "Sales note (internal, strip before send)" — the BuilderShip artifact justifies the higher anchor.

---

## Q6 — Yes / No / Maybe + decision-maker + timeline

> "Three quick questions to close out: (a) is this a yes / no / maybe; (b) is there anyone else who needs to be in the conversation; (c) what's the timeline you're thinking?"

### What we're listening for
- A clean **yes / no / maybe** is fine. "Let me think about it" is a no with extra steps — push to convert it: "What would move it from a maybe to a yes — pricing, scope, timing?"
- The **decision-maker name**. Write it down verbatim. If they say "I sign these," confirm: "So I send the proposal directly to you, no other approvers?"
- A **specific date**, not "soon." Push: "What does the next 30 days look like — when's the soonest you could give me a yes/no?"

### Common close objections + responses

| They say | You say |
|---|---|
| "Let me think about it." | "Of course. What's the specific thing you want to think about — pricing, scope, timing? So I know what to follow up on." |
| "I need to loop in {{name}}." | "Great — want me to send a 1-pager you can forward, or want to set up a 3-way?" |
| "Can you send something in writing?" | "Yes — I'll send the proposal today. What's the timeline you want me to assume — close this month, next month?" |
| "We're slammed until next quarter." | "Got it. Want me to follow up in {{specific_date}}, or is it dead?" |

---

## Post-call (within 1 hour)

- [ ] Send proposal PDF (Package B as primary, A as fallback) within 1 hour of the call.
- [ ] Log call outcome in tracking spreadsheet: yes / no / maybe, decision-maker, timeline, key quote.
- [ ] If they asked for anything specific (a sample report, a redacted case study, a contract), send it in the same email as the proposal.
- [ ] Schedule the follow-up touch per their stated timeline. Default: 5 business days if "maybe," 2 business days if "yes pending approval."

## Calls that should end at minute 5

If the answer to Q1 is "we have no events budget at all" AND the answer to Q2 is "we don't sponsor events," **end the call politely at minute 5**. They're not in ICP. Don't burn the remaining 15 minutes on hopeful demo. Send a thank-you note + offer to reconnect in 6 months. Move on.
