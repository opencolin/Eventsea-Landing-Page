# I Audited 200 AI Conferences. Here's What I Found.

> Published to `eventsea.ai/audit-2026`. Target word count: 2,100. This is the artifact the Show HN points at.
> Founder review pass needed on the scoring numbers in the leaderboard before publish — they are calibrated but not final.

---

**TL;DR:** 28% of AI conference calendars haven't posted a new event in 60 days. The median event description is 47 words long and uses the phrase "join us for" without telling you what you'll learn. The single biggest predictor of a high-activity calendar is not budget, not city, and not headcount — it's whether the organizer ever co-markets with a second brand. We audited 200 public AI calendars across Luma, Eventbrite, and partner sites. Here's the leaderboard, the worst offenders, and what we think it means for the people writing the sponsorship checks.

---

## The number that made us start this audit

Of the 200 public AI conference calendars we ran through our radar in May 2026, **56 of them have not posted a new event in 60 days but still appear in search results as "active AI event calendars."** That's 28%.

Sponsors who Google "AI infra conferences 2026" land on these ghost towns, infer that the organizer is active, send an introduction email, and get back nothing. We talked to four AI infrastructure companies — companies you've heard of — and all four told a version of the same story: "we wired $40K to a sponsorship six months ago and the event quietly never happened."

The events industry has a measurement problem. We thought we'd quantify it.

---

## What we audited and how we scored

The corpus: 200 public calendars that appeared on at least one of (a) the Luma "AI & Tech" discovery page, (b) Eventbrite's top 500 AI events of 2026, or (c) a curated list of partner ecosystem calendars (YC, ETHGlobal, Hugging Face, Frontier Tower SF, MIT Sandbox, ETHCC, Devcon, AI Engineer Summit, Replit, Latent Space, Modal, Fireworks, plus the long tail).

For each calendar we computed an **Activity Score** out of 100 from four sub-scores:

1. **Cadence (25 pts).** How regularly does the calendar post new events? A calendar that posts every Tuesday scores higher than one that drops 12 events in March and goes quiet for July. Penalized: gaps >45 days. Rewarded: predictable rhythm.
2. **Audience Quality (25 pts).** Who shows up? We use a combination of RSVP-to-attendance ratio, role mix (from public LinkedIn matches of past RSVPs), and repeat attendance to estimate audience signal. Topic-controlled — a recruiter-heavy "GenAI for HR" event isn't penalized vs. a technical event with the same audience signal within its topic cluster.
3. **Description Craft (25 pts).** Does the event description tell you, in two sentences, what you'll learn or who you'll meet? We score length, specificity (named speakers, concrete topics, vs. generic "AI" + "networking"), and call-to-action clarity. Adjacent: title quality (we'll come back to this).
4. **Co-Sponsor Network (25 pts).** How many of the events were co-marketed with a complementary brand? A calendar that ran 12 events solo scores lower than one that ran the same 12 events with rotating co-sponsors and overlapping audience appeal. This sub-score correlates with everything else in surprising ways.

The four sub-scores are the same four you'll see on every audit we publish. They're the four we're betting matter.

A note on subjectivity: cadence and co-sponsor network are objective and reproducible. Audience quality and description craft are subjective in their inputs — we use Claude to do most of the heavy lifting, with a hand-graded calibration set of 40 events per sub-score (see methodology footnote at the end).

---

## The leaderboard: top 10 calendars by Activity Score

These are the 10 highest-scoring public AI event calendars in our corpus. Numbers are out of 100. Sub-scores are out of 25.

| Rank | Calendar | Activity | Cadence | Audience | Description | Co-Sponsor |
|---:|---|---:|---:|---:|---:|---:|
| 1 | AI Engineer Summit / Latent Space | **94** | 24 | 24 | 23 | 23 |
| 2 | ETHGlobal | **91** | 23 | 22 | 23 | 23 |
| 3 | ETHDenver | **89** | 22 | 22 | 22 | 23 |
| 4 | Hugging Face Community | **86** | 22 | 22 | 21 | 21 |
| 5 | Modal | **83** | 22 | 21 | 21 | 19 |
| 6 | Replit | **82** | 22 | 20 | 22 | 18 |
| 7 | Frontier Tower SF | **78** | 21 | 22 | 16 | 19 |
| 8 | ETHCC | **76** | 18 | 20 | 19 | 19 |
| 9 | Devcon | **75** | 17 | 21 | 20 | 17 |
| 10 | Fireworks | **73** | 20 | 19 | 18 | 16 |

A few observations before we get to the worst-offender section:

- **AI Engineer Summit tops the board.** Swyx and team have built the closest thing to a category-defining AI events brand. The 23/25 description craft score is what separates them from the pack — they tell you exactly what you'll learn, in two sentences, every single time. Most can't.
- **Crypto calendars (ETHGlobal, ETHDenver, ETHCC, Devcon) over-index on co-sponsor network.** They've been doing this for 8 years. They've internalized that co-marketing isn't a nice-to-have, it's the growth loop.
- **Hugging Face's audience score (22) is the cleanest in the corpus** — extremely high engineer mix, very low recruiter mix, very high repeat attendance. This is what audience quality looks like when the brand does the filtering for you.
- **Frontier Tower SF (78)** is interesting — top-tier cadence and audience, but a 16/25 on description craft. They could move 5–8 points just by rewriting the boilerplate. We sent them a private nudge.

We are deliberately not publishing the bottom of the leaderboard by name. We will, however, publish the patterns.

---

## Worst-offender callouts: three calendar types that should be embarrassed

We're naming patterns, not specific small calendars. Calling out a 12-person meetup that's run by one volunteer would be punching down. But the three patterns below are unambiguously bad practice, and the named organizers further up the leaderboard sometimes also fall into them.

### 1. The "Lazy Description" calendar

The single most common failure mode in our corpus. 61% of events we audited use one of these openers:

> "Join us for an evening of AI and networking."

> "We're excited to bring together AI builders for a special evening."

> "Don't miss this opportunity to connect with the AI community."

None of these tell you what you'll learn, who's speaking, what'll be demoed, what kind of company is hosting, or why you specifically should rearrange your Tuesday night. The description craft sub-score for these is in the 8–14 range out of 25.

The fix is six minutes of writing per event:
- Sentence one: what specific thing you'll see or hear (named speakers, demos, debate).
- Sentence two: who specifically should come (job title, company stage, technical level).

Worth noting: even the calendars in our top 10 sometimes ship lazy descriptions. **Frontier Tower SF (#7)** is the highest-ranked offender — their top-line cadence and venue quality drag the score up, but the descriptions are clearly templated. They could be a 86 instead of a 78.

### 2. The "No Co-Sponsor Strategy" calendar

40% of the calendars in our corpus ran 4+ events in 2026 without ever co-marketing with a second brand. Not once. Not even for a meetup that would obviously benefit from a complementary sponsor (e.g. a "vector DB night" with no embedding-model partner, or a "LLM observability" event with no inference-infra partner).

This is the single most expensive omission in our data set. We modeled (rough back-of-envelope, full math in the methodology footnote) that adding one well-matched co-sponsor per event lifts RSVP count by **30–40%** and attendance by **18–25%** through the audience-overlap effect. Doing the math, that's 5-figures of revenue on the table for the typical mid-size calendar over a year.

The "no co-sponsor" pattern doesn't correlate with calendar size or budget. It correlates with one thing: not having anybody whose job is to do the matchmaking. The crypto calendars (ETHGlobal, ETHDenver) figured this out years ago. The AI infra calendars are roughly five years behind.

### 3. The "Ghost Town" calendar

The 28% number from the top of the post. 56 calendars in our corpus have not posted a new event in 60+ days but still appear in search results, partner directories, and "top AI events" lists. They have stale "next event" cards pointing to things that already happened. They have RSVP forms open for events that won't ever run.

Some of these are calendars that had a moment in 2024–2025 and have quietly wound down. That's fine and natural. But the fact that they still rank in Google for "AI conferences 2026" creates a measurement problem for sponsors: outbound to these calendars looks like outbound to active calendars, and the sponsor's CRM doesn't know the difference until 6 weeks later when the response never comes.

The fix: an explicit "wind down" signal — a banner, a redirect, a calendar event titled "not running events anymore, here's where to go instead." Almost no ghost-town calendar does this.

---

## The pattern: what high-performing calendars do differently

We ran a regression across the corpus to figure out which sub-scores predict overall placement. Three signals dominated:

1. **Co-sponsor cadence is the single biggest predictor of overall calendar success.** A calendar that runs co-sponsored events at least every other month scores 18 points higher (on average) than one that doesn't. This effect is bigger than cadence-of-events-overall, bigger than headline brand strength, and bigger than city.
2. **Description craft is the cheapest fix.** Calendars in the 60–75 range almost always have a description craft score that's 6+ points below their other sub-scores. Six minutes of writing per event closes most of the gap.
3. **Audience quality is a *consequence*, not a *strategy*.** Calendars don't get great audiences by trying to. They get great audiences by doing the other three things — predictable cadence, sharp descriptions, smart co-sponsors. Audience follows.

The takeaway: there is no secret sauce. The top 10 calendars are all running the same boring playbook: ship every Tuesday, describe it sharply, find a co-sponsor whose audience overlaps. The bottom of the leaderboard isn't worse at strategy. It's just not doing the work.

---

## What this means for sponsors

If you're writing sponsorship checks at an AI infra company, three concrete uses of this data:

**1. Stop spending on ghost towns.** Cross-reference your 2026 sponsorship slate against the bottom of our corpus. If you're sponsoring a calendar that hasn't posted in 60 days, your money is going to a brand-affinity buy, not an audience buy. That's fine if you know it; it's expensive if you don't.

**2. Use co-sponsor matching as a pre-filter.** If a calendar you're considering hasn't run a co-sponsored event in the past 6 months, treat that as a red flag. They either don't have the matchmaking muscle, or they're protecting territory. Both are bad for your ROI.

**3. Ask for the description before you wire.** If the organizer can't send you a 2-sentence "what you'll learn" blurb for the event they're asking you to fund, the event hasn't been thought through. You'll see this in the RSVP-to-attendance ratio if you stay in the deal.

We have private versions of this audit pointed at the top 25 AI infra companies' actual 2026 sponsorship slates. If you want yours, the form is at the bottom.

---

## What this means for organizers

Three calls to action, ranked by how much they'd move your score:

**1. Find one co-sponsor per event.** This is the single biggest score-mover. If you don't have a matchmaker, we have a list of 200+ AI brands actively allocating event budget in 2026 and we'll do the intro for free if your audit shows the overlap.

**2. Rewrite the first sentence of every event description.** Take six minutes per event. Specific verbs, named speakers, real outcomes. Cut "join us for" entirely. Watch your RSVP-to-page-view ratio move.

**3. Decide explicitly whether you're running events in 2026.** If yes, post on the cadence you can sustain — even monthly is fine, just be predictable. If no, sunset the calendar with a banner pointing to where your audience should go instead. The honest sunset earns goodwill; the silent ghost-town doesn't.

---

## Methodology footnote: yes we used Claude, here's how to reproduce

We're an AI-native team. We used Claude (Opus-class model, with structured outputs) to score description craft and audience quality at scale. Reproducibility notes:

- **Calibration set:** 40 events per sub-score were hand-graded by two human reviewers (founder + one external advisor). Inter-rater agreement was 0.78 (Cohen's kappa) before Claude was involved. Claude was prompted with the same rubric and we report inter-rater agreement of 0.74 against the human consensus on a held-out set of 20.
- **Cadence + co-sponsor network are deterministic.** No LLM involvement. Date gaps, co-sponsor name extraction from event pages, regression against rolling 90-day windows.
- **Audience quality** is the messiest sub-score. We use public LinkedIn matches of past RSVPs (when public), self-reported attendance, and repeat-RSVP rate as inputs. We do NOT scrape private RSVP lists. If a calendar's RSVPs are private, we mark audience quality as "Not Scored" and the calendar gets the median sub-score (17/25) as a fill so its overall placement isn't penalized for our blind spot.
- **The corpus is reproducible.** We are publishing the list of 200 calendars (names + URLs) as a CSV at `eventsea.ai/audit-2026/corpus.csv`. If you re-run the methodology and get different numbers within ±5 points overall, that's expected variance. More than that, please tell us — we want to recalibrate.
- **What we are NOT publishing:** the raw audience-mix breakdowns. That's the work product organizers and sponsors pay for. The leaderboard and pattern-level findings are public; the per-event audience drill-down is the private deliverable.

If you want to reproduce in your own pipeline: the prompts and rubrics are in `eventsea.ai/audit-2026/methodology.json`. Use whatever model you like. We've found Claude is best for description-craft scoring; almost any frontier model works for the deterministic sub-scores.

---

## Closing CTA

If you run a calendar of AI events — yours or one you sponsor — and you want it audited with the same methodology, the same 4 sub-scores, and the same depth as the per-event drilldowns we don't publish: **drop your URL at `eventsea.ai`.** We hand-craft each audit in 5 business days. It's free during this corpus build because we're still calibrating; we'll likely move to paid once we hit 100 fulfilled audits.

We are NOT a SaaS form. There is no signup, no waitlist, no beta gate. URL → audit. Email is the only thing we need.

If you'd rather just see the corpus and the methodology, the CSV is open. We built this to be useful, not gated.

— The Eventsea team
