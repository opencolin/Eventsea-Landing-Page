# Builderbase Clone Plan

> Maps every Builderbase feature to a concrete build plan for this repo. Sequenced in phases so the landing-page work ships fast while the product work gets honest effort estimates.
>
> Prereq reading: `docs/builderbase-prd-analysis.md` (positioning + gap analysis).
>
> **Status: DRAFT — not yet approved to execute.** Review, redirect, then I'll start Phase 1.

---

## 0. Scope call

Two scopes, both valid, very different effort:

| Scope | What it means | Effort | When to pick |
|---|---|---|---|
| **A. Landing-page clone** | Clone Builderbase's positioning, page IA, and marketing surface onto our site. Pretend product exists. | 1–2 weeks, 1 eng | Validate pitch before building |
| **B. Product clone** | Actually build applications, AI screening, team formation, judging, mentor helpdesk, sponsor ROI, builder profiles | 4–9 months, 2–4 eng | Only after A validates and we have design partners |

**Recommendation:** ship A in 1–2 weeks → use it to talk to 10 prospects → prioritize B based on which features actually block deals. This plan assumes that sequence.

---

## 1. Complete Builderbase feature inventory

Every feature Builderbase ships, numbered for reference below.

### Pre-event
1. **Event Design Studio** — event page, application flow, tracks, sponsor briefs (claimed 3-minute setup)
2. **Custom Application Forms** — configurable per event
3. **AI Applicant Screening** — GitHub + LinkedIn enrichment, ranks vs. ideal profile
4. **Acceptance / Waitlist / Rejection Workflows** — selective admission
5. **Team Formation** — skill-based auto-match, with manual override
6. **Sponsor Briefs + Tracks** — structured challenge/prize publishing
7. **Mission Control Dashboard (pre-event)** — registration → acceptance → check-in funnel across locations

### During-event
8. **Unified Ops Dashboard** — one pane for team, check-in, judging, sponsors
9. **QR / On-site Check-in**
10. **Mentor Helpdesk Queue** — ticketing for mentor requests
11. **Milestone Check-ins** — structured checkpoints that gate submissions
12. **Judging System** — weighted criteria, custom rubrics, multi-round, role-based visibility
13. **Sponsor Credit Distribution** — validated API key / credit delivery, per-participant tracking
14. **Submissions** — project submissions tied to GitHub / Devpost-style artifacts

### Post-event
15. **Outcomes Analytics Dashboard** — funnel + engagement, exportable
16. **Sponsor ROI Dashboard (live)** — participation, prototypes, credit usage attributed to sponsor tracks
17. **Verified Builder Profiles** — persistent identity enriched from event behavior

### Marketplace / network
18. **Global Events Directory** — public discovery
19. **Sponsor ↔ Event Matchmaking** — active matching of sponsor budgets to events
20. **Cross-event Builder Graph** — compounding identity + rankings

### Integrations
21. **Luma** — registration sync
22. **Discord** — community + team coordination
23. **GitHub** — submission tracking + profile enrichment
24. **LinkedIn** (implied) — applicant enrichment

### Audience-side pages (not features per se, but page surface)
25. **`/organizers`** — organizer value prop + features
26. **`/sponsors`** — sponsor value prop + ROI story
27. **`/builders`** — builder value prop + profile story
28. **`/events`** — public event directory

---

## 2. Phase 1 — Landing-page clone (Scope A)

**Goal:** repositioned, multi-page marketing site that tells the Builderbase story with Eventsy's name. Ship in 1–2 weeks. No real product changes.

### 1.1 Repositioning (copy + IA)
- Rewrite hero tagline from "AI Copilot for Event Organizers" → new tagline that signals 3-sided marketplace (see options in PRD doc §5). Decide this before writing.
- Reframe feature grid under **Pre / During / Post** lifecycle headings (features 1–17 above).
- Add network-effects tagline section: the "every hackathon builds on the last" equivalent.

### 1.2 New pages to scaffold
Map each to Wouter routes in `client/src/App.tsx`:

| Route | Purpose | Effort |
|---|---|---|
| `/organizers` | Feature 25 — full organizer value prop | ~1 day |
| `/sponsors` | Feature 26 — sponsor ROI story | ~1 day |
| `/builders` | Feature 27 — builder profile story | ~1 day |
| `/events` | Feature 28 — public directory (static/seeded for now) | ~1.5 days |
| `/pricing` | Tiered pricing page | ~0.5 day |

### 1.3 Landing-page components to add
New components under `client/src/components/`:
- `lifecycle-section.tsx` — Pre / During / Post tabs or columns listing features 1–17
- `audience-switcher.tsx` — top of `/` lets visitors toggle Organizer / Sponsor / Builder view
- `event-directory-preview.tsx` — carousel of 6 upcoming events on `/`
- `named-testimonial-wall.tsx` — logos + named quotes (replaces current single anonymous quote)
- `faq-section.tsx` — 8–12 Q&A
- `integration-grid.tsx` — add GitHub, Discord, LinkedIn tiles (currently missing)

### 1.4 Fixes to existing components
- `home.tsx:20` — replace `alert()` with Calendly embed / link
- `testimonial-section.tsx` — remove or replace unsourced stats (95% / 5x / 100%)
- `footer.tsx` — wire real links for Privacy / Terms / socials; update copyright to 2026
- `hero-section.tsx` — replace stock Unsplash with Figma mock of product UI (even a still)
- `integrations-section.tsx` — add GitHub + Discord tiles; keep Luma (already correct)
- `beta-signup-modal.tsx` — either kill the gate and open self-serve, or add "jump the line" capture

### 1.5 Content assets needed
These block the engineering work and should happen in parallel:
- 3 named testimonials + logos (even beta customers)
- 6–12 seed events for the `/events` directory
- Product mockups (Figma) for hero + at least one per audience page
- Pricing tiers + prices
- FAQ content (8–12 questions)

### 1.6 Phase 1 deliverables checklist
- [ ] New tagline approved
- [ ] 4 new routes (`/organizers`, `/sponsors`, `/builders`, `/events`, `/pricing`)
- [ ] 6 new components listed in 1.3
- [ ] 6 fixes listed in 1.4
- [ ] Real testimonials, mockups, pricing, FAQ content
- [ ] Deploy + share link with 10 prospects

**Stop gate:** do 5–10 prospect calls with the new site. Don't start Phase 2 until we know which product features are actually blocking deals.

---

## 3. Phase 2 — Product MVP foundation (Scope B, tier 1)

**Goal:** turn this repo from a landing page into a real multi-tenant app. 4–6 weeks. 2 eng.

This phase builds the *substrate* every product feature depends on. No flagship features land here — but without it, none of them can.

### 3.1 Infrastructure
- **Real database**: switch off `MemStorage`, commit to Neon Postgres via Drizzle (already installed but unused)
- **Auth**: pick Clerk or Auth.js (passport is installed but unused); support organizer + builder + sponsor roles
- **Multi-tenancy model**: `organizations` table, `events` table scoped to orgs, role-based ACL
- **File storage**: S3 or equivalent for event images, sponsor assets, submission uploads
- **Email**: Resend (already in integrations copy) for transactional
- **Background jobs**: BullMQ or Inngest for async work (screening, matching, exports)

### 3.2 Core data model (Drizzle schema extensions)
Add to `shared/schema.ts`:
- `organizations` (owner/member orgs)
- `events` (belongs to organization; has status, dates, capacity, tracks)
- `tracks` (sub-competitions within an event)
- `applications` (belongs to event + user)
- `teams` (belongs to event; has members)
- `submissions` (belongs to team; has GitHub/demo links)
- `judges`, `scores`, `rubrics` (judging system tables)
- `sponsors`, `sponsor_credits`, `sponsor_allocations`
- `mentor_tickets`
- `check_ins`
- `profiles` (builder-facing, extends `users`; GitHub/LinkedIn handles)

### 3.3 Base app shell
- Authenticated dashboard layout (sidebar + topbar)
- Organizer home: list of events, create event CTA
- Builder home: list of events applied to + discover feed
- Sponsor home: list of sponsored events + ROI snapshot

---

## 4. Phase 3 — Flagship features (Scope B, tier 2)

Ordered by blast radius — which features, if missing, lose the most deals. Pick a subset per release based on prospect conversations.

### 4.1 Event Design Studio *(feature 1)*
Event creation wizard: name, dates, capacity, tracks, branding, application form. ~2 weeks.
Dependencies: §3.1, §3.2.

### 4.2 Applications + Acceptance workflow *(features 2, 4)*
Public application page (`/events/:slug/apply`), organizer review UI, accept/reject/waitlist actions, automated emails. ~2 weeks.
Dependencies: §4.1.

### 4.3 Public event directory *(feature 18)*
Replace the static directory from Phase 1 with a DB-backed list. ~3 days.
Dependencies: §3.2, §4.1.

### 4.4 QR check-in *(feature 9)*
Per-attendee QR in email; organizer scanner page (PWA-friendly). ~1 week.
Dependencies: §4.2.

### 4.5 Judging system *(feature 12)*
Rubrics, weights, multi-round, role-based views for judges/sponsors. ~3 weeks — this is the deepest feature.
Dependencies: §3.2, submissions (§4.8).

### 4.6 Outcomes analytics *(feature 15)*
Funnel dashboard (registrations → acceptances → check-ins → submissions), CSV export. ~1 week.
Dependencies: everything emitting events.

### 4.7 Mission Control dashboard *(feature 7)*
Real-time funnel across locations — a specialized version of analytics, live. ~1 week.
Dependencies: §4.6.

### 4.8 Submissions *(feature 14)*
Teams submit GitHub repo + demo link + video; validation + GitHub API verification. ~1 week.
Dependencies: §3.2, GitHub integration (§6).

---

## 5. Phase 4 — Differentiator features (Scope B, tier 3)

Higher complexity, higher moat. Ship after Phase 3 validates the core loop.

### 5.1 AI Applicant Screening *(feature 3)*
- Pull GitHub stats (repos, stars, languages) via GitHub API
- Pull LinkedIn via manual URL + scraping or Proxycurl
- Ideal-profile prompt + score via Claude API (use `claude-opus-4-7` for quality, `claude-haiku-4-5-20251001` for volume; include prompt caching)
- Rank applicants, explain reasoning
- Effort: ~3 weeks. Claude API skill should be used when wiring this.

### 5.2 Team Formation *(feature 5)*
- Skill inventory during application
- Matching algorithm (greedy or optimization) balancing skills across teams
- Manual override UI
- Effort: ~2 weeks.

### 5.3 Sponsor Credit Distribution *(feature 13)*
- Sponsors upload credit packs (API keys, promo codes)
- Validated delivery to accepted participants
- Per-user tracking
- Effort: ~2 weeks.

### 5.4 Sponsor ROI Dashboard *(feature 16)*
- Track: participants reached, submissions using sponsor APIs, credits consumed, prizes awarded
- Live dashboard for sponsors
- Effort: ~2 weeks. Requires §5.3 + §4.8 to have data.

### 5.5 Mentor Helpdesk Queue *(feature 10)*
- In-app ticket queue, Discord slash-command to file tickets, SLA timers
- Effort: ~2 weeks.

### 5.6 Milestone Check-ins *(feature 11)*
- Organizer defines checkpoints; teams confirm; gates submission UI
- Effort: ~1 week.

### 5.7 Verified Builder Profiles *(feature 17)*
- Public `/builders/:handle` pages
- Auto-populated from event history, rankings, submissions, GitHub
- Effort: ~2 weeks. Network-effect feature — each event compounds value.

### 5.8 Sponsor ↔ Event Matchmaking *(feature 19)*
- Sponsors define audience filters (tech stack, location, size)
- Events get surfaced to matching sponsors
- Two-sided intro workflow
- Effort: ~3 weeks. Requires enough events + sponsors to be meaningful.

---

## 6. Integrations *(features 21–24)*

Staffed in parallel with Phases 3–4 as dependencies require.

| Integration | Blocks | Effort |
|---|---|---|
| **Luma** | Not blocking but lets us ingest existing events | ~1 week |
| **GitHub** | Blocks §4.8 submissions + §5.1 screening + §5.7 profiles | ~1 week |
| **Discord** | Blocks §5.5 mentor helpdesk nice-to-have | ~1.5 weeks |
| **LinkedIn / Proxycurl** | Blocks §5.1 screening | ~0.5 week |
| **Stripe** | Not in Builderbase but already in our copy — do it for pricing | ~1 week |
| **Calendly** | Fix `home.tsx:20` today | ~0.5 day |

---

## 7. Pricing model proposal

Builderbase doesn't publish pricing. For our landing page we should. Draft:

| Tier | Price | Includes |
|---|---|---|
| Community | Free | ≤50 attendees, 1 event/mo, basic ops |
| Pro | $X/event | Up to 500 attendees, judging, analytics |
| Scale | Annual contract | Unlimited, AI screening, sponsor ROI, white-label |

Numbers TBD. Needed for `/pricing` in Phase 1.

---

## 8. Timeline summary

| Phase | Scope | Duration | Staffing |
|---|---|---|---|
| Phase 1 — Landing clone | §2 | 1–2 weeks | 1 eng + 1 designer |
| **Prospect calls / stop gate** | — | 2 weeks | 1 PM |
| Phase 2 — Product foundation | §3 | 4–6 weeks | 2 eng |
| Phase 3 — Flagship features | §4 | 8–10 weeks | 2 eng |
| Phase 4 — Differentiators | §5 | 10–14 weeks | 3 eng + 1 ML |

**Total if we do everything: ~7–9 months.** The landing-page clone alone is 1–2 weeks.

---

## 9. Risks + open questions

1. **Do we still want to be a "copilot" or now position as "infrastructure + marketplace"?** These are different products. Picking head-on Builderbase competition means killing the copilot framing.
2. **Is there appetite to build a real app in this repo, or should the product live in a new repo and this stay marketing-only?** Affects Phase 2 architecture.
3. **Who are our 3 design partners for the product build?** Without them, Phase 2+ is premature.
4. **Do we have AI/ML expertise for feature §5.1 (screening)?** If not, Claude API skill with well-tuned prompts can cover most of it.
5. **Is the "builder graph" actually a moat for us?** Builderbase benefits from it; we'd need volume before it matters.

---

## 10. Next action — what I'll do if you approve

I will not start implementing until you confirm. Once approved, recommended first sprint (Phase 1, week 1):

1. **Decide the new tagline** — I'll propose 3 options in a reply.
2. **Scaffold `/organizers`, `/sponsors`, `/builders`, `/events`, `/pricing`** — empty routes first, content to follow.
3. **Replace the lifecycle framing on `/`** — Pre / During / Post section instead of flat grid.
4. **Fix `home.tsx:20`** — wire Book-a-Demo to Calendly (need a link).
5. **Add GitHub + Discord integration tiles**.
6. **Remove unsourced stats** until we have real ones.

Respond with:
- (a) approve scope A, (b) approve A+B, or (c) redirect, and
- any redlines on the phasing above.
