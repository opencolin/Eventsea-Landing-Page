# Builderbase PRD + Eventsy Gap Analysis

> Working doc for the Eventsy (Eventsea) team. Reverse-engineers Builderbase.com into a PRD, then maps the delta against Eventsy's current landing page and product story.
>
> Sources: builderbase.com homepage (Apr 2026), builderbase.dev/introduction (redirects to builderbase.com/introduction), the current Eventsy codebase at `/client/src/components/*`, and the original copy doc in `attached_assets/`.

---

## 1. Executive summary

**Builderbase** positions itself as **"the AI-native infrastructure layer and global marketplace for all builder events."** It is a vertical operating system for hackathons, hacker houses, innovation sprints, and builder nights — spanning the full lifecycle (design → run → measure) and integrating three sides of the marketplace: **organizers, sponsors, builders**.

**Eventsy** today positions itself as **"AI Copilot for Event Organizers"** — a single-sided automation tool for tech-community event organizers. It covers venue sourcing, sponsorship ops, speaker ops, run-of-show, email, and waitlists. It is a *copilot*, not an *infrastructure + marketplace*.

The gap is structural, not cosmetic:

1. **Market shape.** Builderbase is a three-sided marketplace (organizers + sponsors + builders). Eventsy is a one-sided tool (organizers only).
2. **Event type focus.** Builderbase is specialized for **builder events** (hackathons, hacker houses). Eventsy spreads across conferences, meetups, demo days, DAO events.
3. **Lifecycle coverage.** Builderbase owns pre-event (applications, screening, team formation), during-event (check-in, judging, mentor helpdesk, sponsor credit distribution), and post-event (analytics, ROI reports). Eventsy's feature set is mostly pre-event logistics.
4. **Data + defensibility.** Builderbase builds a **verified builder graph** (GitHub + LinkedIn enrichment, cross-event history) that compounds over time. Eventsy has no persistent user/data layer.
5. **Proof.** Builderbase has named testimonials from Replit, Techarena, EWOR. Eventsy has one anonymous "Community Organizer, Frontier Tower SF" quote and unsourced stats.

The rest of this doc is the PRD for Builderbase plus a feature-by-feature diff.

---

## 2. Builderbase PRD (reverse-engineered)

### 2.1 Product vision

> "One platform where sponsors find you, builders come back, and every hackathon builds on the last."

AI-native infrastructure + global marketplace for builder events. The product thesis is that hackathons and builder events are run on duct-taped stacks (Luma + Typeform + Discord + spreadsheets) and that a specialized OS unlocks (a) less ops for organizers, (b) measurable ROI for sponsors, and (c) persistent career value for builders.

### 2.2 Target users

| Persona | Primary jobs-to-be-done |
|---|---|
| **Organizers** — corporations, VCs, universities, student groups, communities | Launch events in minutes, screen applicants, form teams, run the day, judge, report outcomes |
| **Sponsors** — dev tool companies, clouds, VCs | Reach the right builders, distribute API credits, track participation + prototype output, see ROI |
| **Builders** — technical participants | Discover events, get matched to teams, build a verified portfolio, receive credits/prizes |

Scale range claimed: **20-person builder nights → 10,000+ participant global hackathons.**

### 2.3 Feature set

#### Pre-event
- **Event Design Studio** — create event page, application flow, tracks, sponsor briefs. Claims 3-minute setup.
- **AI Applicant Screening** — ranks candidates against an "ideal profile" using GitHub + LinkedIn signals.
- **Team Formation** — automated skill-based matching, with manual override.
- **Mission Control Dashboard** — real-time funnel (registrations → acceptances → check-ins → drop-off) across all event locations.
- **Sponsor Briefs + Tracks** — structured way for sponsors to publish challenges and prizes.

#### During-event
- **Unified Ops Dashboard** — team formation, check-ins, judging, sponsor challenges in one pane.
- **Mentor Helpdesk Queue** — ticketing system for mentor requests; prevents "lost in Discord" chaos.
- **Judging System** — weighted criteria, custom rubrics, multi-round support, role-based visibility (so sponsors only see their track, etc.).
- **Milestone Check-ins** — structured checkpoints that detect early drop-off and gate submissions.
- **Sponsor Credit Distribution** — validated delivery of API keys / credits with per-participant allocation tracking.

#### Post-event
- **Outcomes Analytics** — complete funnel + engagement data, exportable.
- **Sponsor ROI Dashboard** — live participation, prototypes shipped, credit usage, attribution back to sponsor tracks.
- **Verified Builder Profiles** — persistent profile populated from event behavior (attendance, submissions, rankings, GitHub).

#### Marketplace / network layer
- **Global Events Directory** — discovery feed ("View all upcoming events", "Explore Events").
- **Sponsor Matchmaking** — active matching of events to sponsors based on audience fit.
- **Builder Graph** — cross-event identity that compounds with each event the platform runs.

### 2.4 Integrations

- **Luma** — registration + event data sync
- **Discord** — community engagement, team coordination
- **GitHub** — submission tracking, code verification, profile enrichment
- (Implied by screening claims) **LinkedIn** — applicant enrichment

### 2.5 Differentiators (how they pitch it)

- *"Less ops. Better data. Global reach."*
- AI-native and purpose-built for builder events (not a generic event tool).
- Infrastructure layer, not just landing pages and forms.
- Three-sided marketplace with active sponsor ↔ event matchmaking.
- Persistent verified builder identity.
- Real-time analytics across the full lifecycle.

### 2.6 Proof / social proof

- **Megan, Head of Developer Community, Replit** — "Scalable, high-quality distribution into technical communities with measurable ROI data… core to our developer growth strategy."
- **Omid Ekhlasi, CEO, Techarena** — "Added value and enabled high quality management and execution."
- **Petter Made, Partner, EWOR** — "Seamless… at speed, at scale, and at the highest level."

All three are named, titled, and affiliated with real orgs.

### 2.7 Pricing

Not disclosed. CTAs are **"Sign up for free"** and **"Book a demo"** — consistent with a usage- or seat-based model with sales-assisted enterprise tier. Free entry point suggests a product-led self-serve path for small events.

### 2.8 CTAs

- "View all upcoming events" / "Explore Events" (builder-side discovery)
- "Sign up for free" (organizer self-serve)
- "Book a demo" (enterprise / large-event)

### 2.9 Information architecture (inferred)

Top-level sections on the homepage:
1. Hero — tagline, dual CTA
2. The three audiences (Organizers / Sponsors / Builders) — each with its own value prop
3. Lifecycle walkthrough (Pre / During / Post)
4. Integrations (Luma, Discord, GitHub)
5. Testimonials (named, with logos)
6. Event directory / upcoming events
7. Final CTA

---

## 3. Eventsy today (what's actually on the page)

Positioning: **"AI Copilot for Event Organizers"** — "Planning events is hard. Eventsy makes it easy."

Feature surface (from `client/src/components/features-section.tsx`):

1. AI Venue Finder
2. Sponsorship CRM
3. Speaker Ops
4. Run of Show Builder
5. Email Engine
6. Smart Waitlists

Target audiences shown (`built-for-section.tsx`):
- Developer conferences, university hackathons, DAO global events, bio/AI/crypto demo days, open source showcases, tech meetups.

Integrations (`integrations-section.tsx`):
- Luma, DocuSign, Stripe, Resend, Slack, Notion.

Social proof:
- One anonymous quote ("Community Organizer, Frontier Tower SF"), stock headshot.
- Three unsourced stats: 95% time saved / 5x faster setup / 100% satisfaction.

CTAs:
- "Join the Beta" (email + event-type form)
- "Book a Demo" (currently fires a `window.alert()` placeholder — not wired)

Missing on the page:
- No pricing, no FAQ, no real screenshots, no video, no named testimonials with logos, no dedicated sponsor or builder audience sections, no event directory, no lifecycle (pre/during/post) framing, no analytics story.

---

## 4. Gap analysis — what Eventsy is missing

### 4.1 Missing features (product surface)

Grouped by category. "Priority" is a suggested P0/P1/P2 ranking for the landing page + roadmap.

#### A. Applicant + participant management (Eventsy has none of this)
| Feature | Priority | Notes |
|---|---|---|
| Application flow builder | P0 | Core for hackathons; today Eventsy assumes RSVPs only |
| AI applicant screening (GitHub + LinkedIn) | P0 | Builderbase's flagship pre-event feature |
| Acceptance / waitlist / rejection workflows | P0 | Eventsy has "Smart Waitlists" but it's framed for VIP RSVPs, not selective admission |
| Team formation (auto-match on skills) | P0 | Non-existent in Eventsy; high-differentiation for hackathons |
| Milestone check-ins during event | P1 | Gates submissions, detects drop-off |

#### B. Live event operations
| Feature | Priority | Notes |
|---|---|---|
| Unified ops dashboard (day-of) | P0 | Eventsy has no "during-event" surface at all |
| Mentor helpdesk / ticket queue | P1 | High-leverage for hackathons >100 people |
| Judging system (rubrics, rounds, weights, role-based views) | P0 | Required to compete on hackathons |
| On-site / QR check-in | P0 | Table stakes; not mentioned |
| Sponsor credit distribution + tracking | P1 | Unique to builder events; defensible |

#### C. Post-event analytics + ROI
| Feature | Priority | Notes |
|---|---|---|
| Outcomes analytics dashboard | P0 | Eventsy has zero analytics story |
| Sponsor ROI report (live) | P0 | Core to the sponsor side of the marketplace |
| Exportable event data | P1 | Low effort, high enterprise signal |

#### D. Marketplace / network layer (the biggest gap)
| Feature | Priority | Notes |
|---|---|---|
| Public event directory / discovery | P0 | Builderbase has one; Eventsy has none. Without this there's no builder-side acquisition loop |
| Verified builder profiles | P1 | Creates persistent value that compounds across events |
| Sponsor matchmaking | P1 | Active matching of sponsor budgets to events |
| Global / multi-location funnel view | P2 | Only matters once there are large customers |

#### E. Integrations Eventsy is missing
| Integration | Why it matters |
|---|---|
| **GitHub** | Screening, submission verification, builder profile enrichment — Eventsy ships zero technical integrations despite targeting devs |
| **Discord** | Community is where builders live; Eventsy only has Slack |
| **LinkedIn** | Applicant enrichment for screening |
| **Telegram** | Was in the original copy doc, never shipped; relevant for crypto/DAO audiences |
| **Calendar (Google/Outlook)** | In original copy, never shipped; needed for run-of-show sync |

### 4.2 Missing selling points (positioning + messaging)

| Gap | What Builderbase does | What Eventsy does today | Recommendation |
|---|---|---|---|
| **Multi-sided value** | Addresses organizers + sponsors + builders with distinct value props | Only addresses organizers | Add sponsor + builder sections to landing page |
| **Lifecycle framing** | Pre / During / Post narrative makes the scope legible | Flat feature grid | Reframe features under a lifecycle arc |
| **Vertical specialization** | "Built for builder events" — crisp ICP | "Built for tech communities & events" — 6 overlapping categories | Pick a wedge (hackathons?) and own it; broaden later |
| **Measurable ROI** | "Less ops. Better data." Quantified sponsor ROI | Unsourced "95% time saved / 5x faster" stats | Replace with real customer metrics |
| **Named social proof** | Replit, Techarena, EWOR with names + titles | One anonymous Frontier Tower quote | Secure ≥3 named testimonials with logos before next update |
| **Network effects story** | "Every hackathon builds on the last" — builder graph compounds | None | Articulate why the 10th event on Eventsy is better than the 1st |
| **Scale claims** | "20 people to 10,000+" | None | State the scale envelope |
| **Setup speed** | "3-minute setup" | "Setup in minutes" (vague) | Commit to a number |
| **Free tier** | "Sign up for free" as a real self-serve path | "Join the Beta" gated waitlist | Open self-serve as soon as the product allows; waitlists kill PLG |
| **Event directory** | `/events` is a growth surface for SEO + builder acquisition | Nothing | Even a static "past events" reel would help |

### 4.3 Missing landing-page surface area

Concrete pages/sections to add:

1. **`/organizers`, `/sponsors`, `/builders`** — separate value-prop pages. Builderbase implies these; Eventsy has zero audience segmentation.
2. **`/events`** — public directory of events powered by Eventsy. Huge for SEO and builder-side pull.
3. **Lifecycle section on `/`** — Pre-event / During-event / Post-event split with concrete features per phase.
4. **Real product screenshots** — the entire site is Unsplash stock. No product in a product landing page = credibility hit.
5. **Pricing page** — even "Contact for pricing" is better than no pricing page.
6. **FAQ** — de-risks the "Join the Beta" decision.
7. **Case studies / logo wall** — concrete customer outcomes.
8. **Demo booking wired to Calendly** — today it's a `window.alert()` placeholder (`home.tsx:20`).

---

## 5. Strategic options

Three plausible directions given the gap. Not a decided plan — pick one deliberately.

### Option A — Compete head-on: become Builderbase
Specialize on hackathons + hacker houses. Build applications, screening, team formation, judging, mentor queues, sponsor ROI. Accept a multi-year product build.
- **Pros:** Largest differentiation, clearest story, network effects.
- **Cons:** Expensive; Builderbase has a lead and named customers.

### Option B — Different wedge: stay broad, own a different vertical
Double down on **conferences, demo days, DAO/crypto events** — the categories Builderbase does *not* specialize in. Keep the copilot framing. Invest in whitelabel RSVPs, Stripe/DocuSign, speaker ops (all of which Builderbase de-emphasizes).
- **Pros:** Avoids a head-on fight; plays to current feature strengths.
- **Cons:** Smaller market, weaker network effects, harder to defend.

### Option C — Adjacent layer: the CRM/automation layer above Builderbase
Integrate with Builderbase + Luma + Eventbrite; be the AI copilot that lives above any event tool. Focus on sponsorship CRM, email, automations.
- **Pros:** Cheapest to build; partners with the marketplace instead of fighting it.
- **Cons:** Dependent on platforms that can eat you; hard to charge premium pricing.

Recommendation is Option A or B — Option C leaves Eventsy a thin wrapper. But this is a founder call.

---

## 6. Immediate landing-page changes (small, cheap, worth doing regardless)

These are no-regret fixes to ship this week, independent of which strategic option above is chosen:

1. **Wire "Book a Demo"** to a real Calendly / Savvycal link. Remove the `alert()` in `home.tsx:20`.
2. **Replace the anonymous testimonial** with a named one, even if it's a beta user. Add a real name, title, org.
3. **Remove or substantiate the stat claims** (95% / 5x / 100%). Unsourced stats erode trust.
4. **Fix dead links** in the footer (Privacy, Terms, Twitter, LinkedIn all `href="#"`).
5. **Update copyright year** (currently hardcoded 2024; it's 2026).
6. **Add a "How it works" section** with Pre / During / Post framing — cheap copy change, closes the biggest positioning gap.
7. **Add at least one real product screenshot** (even a Figma mock). Zero product imagery is a credibility drag.
8. **Resurface the Whitelabel RSVPs feature** that was in the original copy (`attached_assets/…1754470287865.txt` line 21) but dropped from the implementation — it's one of the few things Eventsy has that Builderbase does not emphasize.
9. **Add GitHub and Discord to the integrations tiles.** Even as "coming soon," their absence signals Eventsy doesn't understand the developer-event audience.
10. **Replace the "Join the Beta" email gate with a free self-serve path** as soon as the product can support it. Waitlists kill PLG momentum and Builderbase offers free sign-up.

---

## 7. Open questions for the team

1. Is the target ICP hackathon organizers, or broader tech-community events? The answer determines whether we compete with Builderbase head-on.
2. Do we want to build the sponsor side of the marketplace, or stay a one-sided tool?
3. Is there a plan for a persistent attendee/builder identity layer? Without it, every Eventsy customer is a cold-start.
4. What's the pricing model going to be? "Beta" can hide this for ~3 more months, not more.
5. Who are the 3 named customers we can quote on the landing page by end of quarter?
