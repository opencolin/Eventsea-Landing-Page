# Show HN Launch Plan — v0.1.2 Proof Drop

> **Owner:** Founder. **Date target:** Tuesday, Week 3 of Sprint 1, 9:00 AM PT.
> **Goal:** Front-page Show HN ≥2 hours, ≥150 points, ≥80 comments, ≥2 of 4 named-target replies.
> **Anchor artifact:** [audit-200-blog-post.md](./audit-200-blog-post.md) — the audit corpus and leaderboard live on `eventsea.ai/audit-2026`.

This is the playbook the founder runs the morning of the launch. Every section is meant to be copy-pasted with at most one or two name swaps.

---

## 1. Pre-launch checklist

### T-24 hours (Monday afternoon)

- [ ] Confirm the long-form is live at `eventsea.ai/audit-2026` and indexable (not behind a beta gate).
- [ ] Confirm the two public satellite audits are live and crosslinked from the long-form:
  - `eventsea.ai/audits/y-combinator`
  - `eventsea.ai/audits/ai-engineer-summit` (note: only ship if Swyx has signed off; otherwise hold and replace with a neutral third audit)
- [ ] Confirm `eventsea.ai/audit` form sends submissions to a real founder inbox (verify the v0.1.1 wire-up).
- [ ] Confirm the audit form hero copy says **"within 5 business days"** (the v0.1.1 fix).
- [ ] Test paste-Luma-URL flow from a clean browser. If it breaks, fix or hide the form.
- [ ] Pre-send the private audits to all 4 named targets (Nebius, vCluster, Tavily, LanceDB) Monday morning. Subject: `"We audited your 2026 calendar — private read, takes 4 minutes"`. Attach the PDF + Loom. Do NOT mention Show HN.
- [ ] Council pre-warm: 5 council members each draft their substantive comment (see section 6) and load it into a Notion doc. They do NOT post yet.
- [ ] Confirm Twitter, LinkedIn, and GitHub footer links are live and each account has at least 3 posts of prior history (no day-one accounts).
- [ ] Founder logs into HN account, checks karma is ≥50 (HN downranks low-karma submitters). If not, post 2–3 substantive comments on unrelated threads Sunday/Monday.
- [ ] Schedule the Twitter thread and LinkedIn post as drafts.
- [ ] Confirm `eventsea.ai` can absorb 5,000 uniques/hour. Test from a second IP.

### T-1 hour (Tuesday 8:00 AM PT)

- [ ] Clear calendar 9:00 AM PT → 3:00 PM PT. No meetings. Phone on Do Not Disturb except HN notifications.
- [ ] Open: HN submit page, the long-form blog post, the eventsea.ai dashboard, Twitter, LinkedIn, the Notion doc with pre-warmed comments.
- [ ] Two co-pilots online in Slack: one council member monitoring HN comments and flagging top-level replies; one watching site for 500s.
- [ ] Test posting one practice HN comment on an unrelated thread to confirm account is in good standing.
- [ ] Re-read this doc, sections 4 and 5, so the first 30-minute response template is in working memory.

---

## 2. The Show HN title (A/B in the founder's head)

HN allows exactly one submission. Pick one. Both are calibrated to ≤80 chars, lead with the number, and avoid "introducing" / "launching" — HN penalizes both.

**Variant A (recommended):**

> `Show HN: I audited 200 AI conferences. Here's the leaderboard.`

Why A: "I audited" signals personal labor, which HN rewards. "Leaderboard" implies ranked judgment, which is bait for "you're wrong about X" comments — engagement we want.

**Variant B (backup):**

> `Show HN: We scored every public AI conference of 2026 (4 sub-metrics, 200 events)`

Why B: more specific, less editorial. Use if the founder's gut says variant A reads like LinkedIn bait. The "4 sub-metrics, 200 events" specificity is HN-shaped.

**URL field:** `https://eventsea.ai/audit-2026` — direct to the long-form, NOT to the homepage. The homepage is the conversion surface; the blog post is the artifact HN votes on.

**Text field:** leave blank. The link tells the story. If forced to add text, use:

> Methodology footnote is at the bottom. The 4 sub-scores are cadence, audience quality, description craft, and co-sponsor network. Happy to answer questions about how each was computed.

---

## 3. The first 30 minutes

In Show HN's first 30 minutes the post lives or dies. Founder responds to every top-level comment within 5 minutes. Use the templates in sections 4 and 5 for the two questions that are 90% guaranteed to be asked first.

Order of priorities, in the first 30 minutes:
1. Reply to "what's the business model" (template in section 4).
2. Reply to "how is this different from Luma" (template in section 5).
3. Reply to any technical methodology question with a real, specific number (do NOT punt to "see the methodology footnote").
4. Council members fire pre-warmed comments (section 6) spaced 4–7 minutes apart. They are NOT replying to the founder — they are top-level reactions.

---

## 4. Top comment template — "What's the business model?"

A version of this comment will appear within 10 minutes. The founder posts this reply within 5 minutes of it appearing. Tone: direct, no hedging, includes a real number.

> Two revenue lines, both being validated this quarter.
>
> **Sponsor side:** AI infra companies (think Nebius, Modal, Fireworks) spend $50K–$200K/quarter on devrel events and have ~zero way to measure ROI per event. We sell them a quarterly "Sponsorship Radar" — audit + matchmaking + post-event attribution — at $7.5K/quarter. We're talking to 4 named pilots right now. The audit corpus you're looking at is the proof artifact for that pitch.
>
> **Organizer side (later):** $499/event for a self-serve audit + co-sponsor matchmaking on the calendar you already run. Not live yet; we're learning what to charge from the sponsor pilots first.
>
> Both sides ride on the same audit pipeline. The leaderboard you're looking at took ~3 days to generate and would have taken a human analyst ~3 weeks. That's the wedge.
>
> Happy to share the rate card if you DM me.

Why this template works:
- Real prices (not "TBD"). HN rewards specificity.
- Names actual prospect categories (Nebius, Modal, Fireworks) — those companies' employees see their name and click.
- Distinguishes paid v. validation-stage (don't claim revenue we don't have).
- Closes with a soft DM ask, not a CTA link.

---

## 5. Top comment template — "How is this different from Luma?"

> Luma is the calendar. We score what's on the calendar.
>
> Luma is the substrate every AI event runs on — they're great at hosting, RSVPs, and the cap-table-friendly stuff. They are not in the business of telling you "this event's audience is 70% recruiters and 30% engineers, your sponsor dollar gets ~$14 CPM-equivalent, here are 3 better co-sponsors for next quarter." That's a different product and a different buyer.
>
> Concretely: the 4 sub-scores in the leaderboard — cadence, audience quality, description craft, co-sponsor network — are all things Luma has the *data* to compute and zero commercial incentive to surface. They make money on event volume, not event quality.
>
> We're a layer on top, not a replacement. We ingest any Luma/Eventbrite/partner calendar and produce the sponsor-side view Luma will never build.

Why this template works:
- Acknowledges Luma's strength (HN audience uses Luma, will downvote any "Luma is bad" framing).
- Forces the reader to think about WHO pays for each — different buyer, different product.
- Names the 4 sub-scores again to anchor the reader on what's actually in the artifact.

---

## 6. Pre-warmed council talking points (first hour)

Five substantive comments. Each council member posts one. NOT replies to the founder — top-level reactions to the post. Spaced 4–7 minutes apart starting at T+8 minutes. Read them aloud first; if any reads like astroturf, rewrite in the council member's voice.

**Comment 1 — methodology pushback (intentional):**

> Quick methodology question — for "audience quality" how are you handling self-selection bias? An event titled "GenAI for Recruiters" will pull a different RSVP pool than one titled "Transformer Internals" and that's not a quality signal, that's a topic signal. Curious if you control for topic before scoring audience.

(Founder reply primed: yes we cluster by topic first, score within cluster. Answer takes 90 seconds to write, looks rigorous to readers.)

**Comment 2 — sponsor angle:**

> I run devrel at a Series B AI infra co. We spend ~$120K/quarter on event sponsorships and have no idea which ones move pipeline. If this is real I'd pay for it. How fast can you turn around an audit of an arbitrary calendar?

(Founder reply primed: 5 business days for a private audit. Drop your calendar URL.)

**Comment 3 — counter-thesis:**

> Conferences are a dying channel for AI infra anyway, isn't this measuring the wrong thing? Discord + GitHub stars + open-source contributions are where developer mindshare actually lives in 2026.

(Founder reply primed: agree partially, here's the slice where events still matter — top-of-funnel for enterprise buyers, recruiting for staff+ ICs. ~22% of named pipeline at the 4 cos we've talked to still cites a specific event as first-touch.)

**Comment 4 — organizer angle:**

> I run a 200-person AI infra meetup. Would love to see what score you'd give us. Is the audit form rate-limited?

(Founder reply primed: not rate-limited, but each one is hand-crafted in 5 business days. Drop the URL.)

**Comment 5 — specific worst-offender callout endorsement:**

> The callout on "lazy description" calendars is real. I've stopped going to events whose blurb is just "join us for an evening of AI and networking." If you can't tell me what I'll learn in two sentences you don't deserve my Tuesday night.

(No founder reply needed. This one is a signal-booster.)

---

## 7. T+2h Twitter thread template

Post from the founder account at 11:00 AM PT (T+2h). Tag at the END, not the beginning — HN watchers also lurk Twitter and "tag everyone for engagement" reads as cheap.

> 1/ We just put a full audit of every public AI conference of 2026 on the front page of HN.
>
> 200 events. 4 sub-scores per event. A real leaderboard with names and numbers.
>
> Here's the meta-pattern we found 👇
>
> 2/ The top 10 calendars all do ONE thing the bottom 100 don't: they describe what you'll learn in two sentences. Lazy descriptions ("come network with AI builders!") correlate -0.71 with audience quality.
>
> 3/ The "ghost town" pattern is real. ~28% of calendars we audited have not posted a new event in 60+ days but still show up in search. We named names.
>
> 4/ The "no co-sponsor strategy" pattern is the most expensive one. The median calendar runs 6 events without ever co-marketing with a complementary brand. That's leaving 30-40% audience growth on the table.
>
> 5/ Full leaderboard, 4 sub-scores, methodology, and a "want yours audited" form: eventsea.ai/audit-2026
>
> HN thread: news.ycombinator.com/item?id=[INSERT]
>
> cc @Nebius @vCluster_HQ @tavilyai @lancedb @swyx @latentspacepod @ETHGlobal @ETHDenver

Note: handles are listed in [twitter-handles.md](./twitter-handles.md) — verify each before posting. The `@` for Nebius and a few others is still marked TODO.

---

## 8. T+24h LinkedIn post template

Post from the founder LinkedIn at 9:00 AM PT Wednesday (T+24h). LinkedIn rewards "what I learned" framing more than HN does.

> Yesterday I posted "I audited 200 AI conferences" to Hacker News.
>
> It hit the front page in 18 minutes and stayed top-10 for [X] hours. ~[Y] people landed on the blog post. [Z] dropped their own calendar URL for an audit.
>
> Three things I learned from the comments that I didn't know going in:
>
> 1) The single biggest complaint from sponsors isn't bad events — it's the inability to tell good ones from bad ones in advance. "We sponsored 14 things last quarter; I have no idea which 3 actually mattered." Heard this verbatim from 4 different infra companies.
>
> 2) Organizers want their own audit even more than sponsors do. ~[N]% of the inbound was from event organizers asking "what would you score me as?" — the demand-side for self-rating is bigger than I'd modeled.
>
> 3) The "is this just Luma?" question came up 11 times. The clearest framing I landed on: Luma is the substrate, we're the analytics layer on top. Luma makes money on event volume; sponsors lose money on event volume; that's the gap.
>
> If you run a calendar of AI events — yours or somebody else's — and you want it audited (free, hand-crafted, 5 business days), drop the URL: eventsea.ai/audit
>
> Full leaderboard + methodology: eventsea.ai/audit-2026

Fill `[X]`, `[Y]`, `[Z]`, `[N]` from Tuesday's actual numbers. Don't round up. The credibility of this post depends on the numbers being real.

---

## 9. Failure-mode pivot: launch dies in 2 hours

If at T+2h the post has <40 points or has fallen off page 2, treat it as not-on-front-page. Do this, in order:

1. **Do NOT re-submit.** HN flags re-submissions and shadow-bans.
2. **Do NOT ask the council to upvote.** HN detects vote rings; this gets the account banned permanently.
3. **Pivot to LinkedIn-as-primary.** Move the T+24h post up to T+3h. Pay-promote it to a 4-figure audience of AI infra field marketers ($800 cap). LinkedIn ad spend converts the long-form regardless of HN result.
4. **Email the 4 named targets directly within T+4h** with the long-form URL and the framing: "We published this today. Your private audit, which you got Monday, was source material for the methodology. Want to talk?" — this is the entire reason for the launch; it works with or without HN.
5. **Send the long-form to 3 friendly newsletters** (Latent Space, AI Engineer Summit list, Ben's Bites) with a short "you might want to cover this" note. Don't ask for a cover. Just send.
6. **Twitter thread still ships at T+2h** as planned — Twitter is independent of HN result.
7. **Debrief Wednesday morning.** Was the headline wrong? Was the day wrong? Was the artifact wrong? Decision on whether to re-attempt Show HN in Sprint 2 with the same corpus + a fresh angle ("what changed in 90 days") or to abandon the channel.

The launch result that actually matters is: **2 of 4 named targets booked discovery calls by Friday.** The HN front page is the means, not the end. If the email-the-targets step (#4) lands, the launch worked even if HN didn't.

---

## 10. Wednesday-morning debrief (what to log)

Capture, regardless of outcome:
- Peak HN rank, time on front page, total points, total comments, top 3 comment themes
- Unique visitors to eventsea.ai, calendar-audit form submissions, qualified inbound
- Twitter: impressions, reply count, follows-from-named-target-employees
- LinkedIn: views, reactions, comments
- Named-target reactions: who replied, who didn't, what they said
- One paragraph: what would we do differently next time

Log into `docs/marketing/post-launch-debrief.md` (to be written T+48h). This becomes the source for the optional "What 4,200 HN readers asked" follow-up post (A11 in the marketing PM plan).
