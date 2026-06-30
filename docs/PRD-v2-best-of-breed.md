# PRD v2 — The Best Events App Ever

| | |
|---|---|
| **Feature** | Eventsea — the events platform built from the best parts of every existing tool |
| **Status** | Draft v2 — synthesis. Supersedes `docs/PRD.md` (which scopes to v1 Event Lead Intelligence specifically). |
| **Author** | Colin Lowenberg (with Claude) |
| **Date** | 2026-06-12 |
| **Companion research** | `docs/competitive/cvent-comparison.md`, `docs/competitive/eventsea-feature-inventory.md`, `docs/competitive/research/luma-deep-dive.md`, `docs/competitive/research/socialloop-and-moltpod.md`, `docs/competitive/research/long-tail-competitors.md`, `docs/builderbase-prd-analysis.md` |

## 1. Why this PRD exists

The events-software landscape in 2026 looks like this:

- **Cvent** owns enterprise — 30+ integrations, venue sourcing moat (340K hotels), $79K median contract.
- **Luma** owns the dev/AI scene with calendar-as-social-graph + instant payouts + design-led mobile experience.
- **Eventbrite** owns consumer discovery with a 90M-buyer marketplace and editorial curation.
- **Bizzabo** owns onsite tech with Klik smart-badge fusion.
- **Brella** owns intent-based B2B networking.
- **Whova** owns attendee-app NPS.
- **Builderbase** owns vertical builder-event infrastructure (organizers + sponsors + builders).
- **SocialLoop** owns the creator-host segment with affiliate networks + AI-generated marketing.
- **Goldcast** owns post-event content repurposing (acquired by Cvent late 2025).
- **MoltPod** owns the AI-agent layer above the event stack — not a platform competitor, an automation peer.

Each is best at one thing. **No platform combines the top differentiator from each.** This PRD defines the events app that does — the one that, in any feature comparison against any single competitor, wins on every axis the competitor isn't best at, and ties or wins on the one axis the competitor is best at.

The Eventsea PRD v1 (`docs/PRD.md`) scoped to **Event Lead Intelligence** — attendee screening + per-sponsor scoring + influence + CRM export. That is the wedge that's validated by the BuilderShip + SIA pilots. This document is the **horizon vision**: what Eventsea becomes when the wedge expands to the full event-platform surface.

## 2. Personas (full surface)

| Persona | Today | Tomorrow with Eventsea |
|---|---|---|
| **Sponsor seller** | Stares at a 700-row Luma CSV at 7am with 3 hours until doors open | Walks in with a pre-screened, scored, influence-ranked lead list and a per-attendee talking point |
| **Sponsor marketing/ops** | Imports leads into HubSpot manually, attributes outcomes by gut | One-click CSV → 180 AI-clipped social posts → attribution by company account to Salesforce pipeline |
| **Event organizer (creator-tier)** | Stitches Luma + Mailchimp + Canva + spreadsheets + Stripe | Single platform: AI-generated branded page, affiliate network, application-gated tickets, instant Stripe payouts |
| **Event organizer (community)** | Loses members between events; restarts the audience every time | Persistent community group with members + recurring cadence + chapter hierarchy |
| **Event organizer (hackathon)** | Devpost for submissions + Discord for ops + a spreadsheet for sponsor leads | Submissions + judging rubrics + sponsor lead screening + verified builder profiles in one place |
| **Event organizer (enterprise)** | Cvent for everything; $79K/yr contract | Same surface area, 1/10 the price, native AI agents, modular pricing |
| **Sponsor (devrel / field marketing)** | Decides which 6 events to fund each quarter by gut + word of mouth | AI-scored event radar with per-ICP ranking + "why it ranked here" explainability |
| **Venue** | Lists on CSN; takes 24-48h to respond to RFPs | Auto-quote against organizer requirements; co-op offers paired to sponsor budgets |
| **Builder/attendee** | RSVP and forget; show up; leave with no follow-up | Persistent verified profile that compounds across every event they attend |
| **Field marketing leader** | Manages a target-account list in HubSpot, sponsors events to hit them | Cross-event behavioral data linked to accounts, fed back into Salesforce as engagement signals |

10 personas across 6 audience archetypes (organizer × 4 types, sponsor × 3 roles, venue, builder, field marketing).

## 3. The 30 best-of-breed features (with attribution)

Each feature is sourced from the platform that does it best today. The PRD pulls all of them.

### Discovery + acquisition

| # | Feature | Source | Why |
|---|---|---|---|
| 1 | **Calendar-as-social-graph**: subscribable calendars, follower notifications on new events, push + email | [Luma](https://help.luma.com/p/luma-vs-eventbrite) | Compounding audience asset per organizer |
| 2 | **Discovery feed with editorial curation**: AI-curated "It List" per market, 2x conversion vs raw browse | [Eventbrite](https://www.fastcompany.com/91289655/eventbrite-app-redesign-event-discovery) | Owned discovery surface beyond paid acquisition |
| 3 | **Local + interest filtering** (city + category + radius) | [Meetup](https://www.meetup.com/blog/2026-meetup-roadmap/) | Intent + geography matching that predates algorithmic feeds |
| 4 | **Social RSVP visibility ("who's coming")** with friend graph | [Partiful](https://www.cnbc.com/2025/04/19/meet-partiful-the-gen-z-party-planning-staple-thats-taking-on-apple.html) + [Luma](https://help.luma.com/p/luma-vs-eventbrite) | FOMO loop — the single highest-leverage RSVP conversion mechanism |
| 5 | **Marketplace ads (self-serve)** — surface events in competitors' feeds | [Eventbrite](https://www.eventbrite.com/product-updates/roadmap-2026/) | Google-Ads-inside-events monetization |
| 6 | **Animated/branded invite design (Gen Z aesthetic)** — invite itself shareable in group chats | [Partiful](https://partiful.com/) | The invite IS the marketing artifact |

### Event creation

| # | Feature | Source | Why |
|---|---|---|---|
| 7 | **Sub-2-minute event creation** with cover-image gallery + smart defaults | [Luma](https://help.luma.com/p/luma-ios-app) | Speed is a feature — friction kills events |
| 8 | **AI-generated event listing from a plain-English brief** (name, schedule, tier structure, copy) | [SocialLoop](https://socialloop.ai/) | Removes the blank-page paralysis for first-time hosts |
| 9 | **One-click full brand-kit asset generation** — upload colors/fonts once, generate page + emails + social + post-event survey | [Splash](https://splashthat.com/platform/design) | Brand consistency across 8+ touchpoints from one input |
| 10 | **AI marketing copy per platform** (Instagram, X, TikTok, LinkedIn in event's own voice) | [SocialLoop](https://socialloop.ai/) | Reduces social-promo work from hours to seconds |
| 11 | **Recurring event series + native templates** (not just clone) | Gap across the field — beats Luma | Series-management is a documented Luma weakness; we win by shipping it native |

### Ticketing + monetization

| # | Feature | Source | Why |
|---|---|---|---|
| 12 | **Mixed ticket types in one event**: free + tiered paid + secret + donation + crypto-priced | [Luma](https://help.luma.com/p/setting-up-ticket-types) + [SocialLoop](https://socialloop.ai/) | Maximum flexibility for hybrid pricing models |
| 13 | **Application-gated ticketing**: apply first → host approves → payment captures | [SocialLoop](https://socialloop.ai/) | Curation at the door without losing the conversion |
| 14 | **Deferred-capture waitlist**: authorize at signup, capture only on approval, auto-release on decline | [Luma](https://help.luma.com/p/waitlist) | Sophisticated payment flow few competitors implement cleanly |
| 15 | **Instant Stripe payouts** (not net-30) | [Luma](https://help.luma.com/p/luma-vs-eventbrite) + [SocialLoop](https://socialloop.ai/) | Cash-flow advantage for small operators |
| 16 | **0% platform fee at the paid tier** (just Stripe processing) | [Luma](https://luma.com/pricing) | Economics that won Luma over Eventbrite |
| 17 | **Built-in affiliate program**: per-tier commissions, AI-written promoter copy, auto-Stripe payouts | [SocialLoop](https://socialloop.ai/) | Genuinely novel; nobody else has this end-to-end |
| 18 | **Bundled monetization**: gate courses + content + events behind one membership | [Mighty Networks](https://www.mightynetworks.com/pricing) | Compounding revenue per member ($48/mo avg) |

### RSVP + check-in

| # | Feature | Source | Why |
|---|---|---|---|
| 19 | **Mobile check-in app** with native QR scanner — no third-party hardware | [Luma](https://help.luma.com/p/luma-ios-app) | Hardware-free check-in is table stakes done well |
| 20 | **Apple Wallet ticketing** (offline access via iOS) | [Luma](https://help.luma.com/p/luma-ios-app) | Offline-first attendance reduces "I can't find the email" frustration |
| 21 | **Klik-style smart-badge fusion** (tap-to-connect) — physical wearable that exchanges contacts + triggers lead capture | [Bizzabo / Klik](https://www.bizzabo.com/event-management-software/klik-smart-event-badges) | The single biggest in-person UX advance in 5 years |
| 22 | **Live venue heatmap** — real-time foot-traffic density on floor plans | [Bizzabo](https://www.bizzabo.com/event-management-software/klik-smart-event-badges) | Onsite operational data the sponsor justifies booth spend with |
| 23 | **Live Activities + Dynamic Island** for iOS — countdown, directions, one-tap ticket from lock screen | [Luma](https://help.luma.com/p/luma-ios-app) | Best-in-class native iOS integration |

### Attendee experience + networking

| # | Feature | Source | Why |
|---|---|---|---|
| 24 | **Intent-based AI matchmaking** — attendees declare goals (find a co-founder, close a deal, hire engineers); matches on intent + behavior, not interest tags | [Brella](https://www.brella.io/event-matchmaking) | The networking quality leap |
| 25 | **Mutual-availability scheduling**: surfaces only times when both parties are free | [Brella](https://www.brella.io/event-matchmaking) | Removes email-tennis from meeting setup |
| 26 | **In-app community board**: discussion threads, ad hoc meetup proposals, ride coordination | [Whova](https://whova.com/whova-event-app/) | Community behavior that starts before the event and extends after |
| 27 | **Gamified leaderboard tied to sponsors**: points for booth visits + sessions + profile completion + connections; real prizes | [Whova](https://whova.com/whova-event-app/) | Drives app adoption + sponsor ROI evidence simultaneously |
| 28 | **Timed speed-networking roulette**: 1:1 video rotation, 15-20 new contacts per 30-min session | [Airmeet](https://www.airmeet.com/hub/product-blog/speed-networking/) | Structured networking that works at any event size |
| 29 | **"Boop" / emoji micro-interactions**: lightweight social warmth between guests before the event | [Partiful](https://partiful.com/) | Increases pre-event engagement without DM friction |
| 30 | **User-generated topic tables**: attendees spin up their own discussion tables; others drop in | [Airmeet](https://www.airmeet.com/hub/networking/) + [Whova](https://whova.com/whova-event-app/) | Unconference energy without unconference logistics |

### Lead intelligence (the Eventsea wedge — keep and extend)

| # | Feature | Source | Why |
|---|---|---|---|
| 31 | **Pre-event two-tier screening (V/P/U verdicts)** — deep enrichment for top decile + light tier batched for everyone | [Eventsea PRD v1 FR2](../PRD.md) | Validated by BuilderShip (726 attendees, 327 V / 237 P / 41 U) |
| 32 | **Per-sponsor score columns** with conflict overrides, investor cross-sponsor flat-scoring | [Eventsea PRD v1 FR3](../PRD.md) | Differentiator vs Cvent LeadCapture (which has only generic qualification) |
| 33 | **Influence rank (X + GitHub followers, social reach)** as a first-class column | [Eventsea PRD v1 FR4](../PRD.md) | Cvent has no follower data |
| 34 | **"Why it ranked here" explainability** — auditable per-claim reasoning | [Eventsea PRD v1 FR2 + v2 autonomous spec](../PRD.md) | Defensible to CMO; no competitor exposes this |
| 35 | **P1 / P2 / P3 tagging with team-shared notes** | [Eventsea field marketing page + Event Radar prototype](../releases/v1.5-teams-and-digest.md) | Workflow that converts the dashboard into ongoing GTM tool |

### Speakers, content, agenda

| # | Feature | Source | Why |
|---|---|---|---|
| 36 | **Speaker self-service portal**: upload bios, headshots, slide decks, descriptions directly | [Sched](https://sched.com/) | Removes organizer as bottleneck on speaker management |
| 37 | **Call for Papers automation**: submission + scoring rubrics + accept/reject + auto-schedule | [Sched](https://sched.com/) | Replaces the "Google Form + spreadsheet" workflow |
| 38 | **Personalized schedule builder**: attendees build their own agenda; syncs to personal calendar | [Sched](https://sched.com/) | Improves session attendance + attendee NPS |
| 39 | **Pre-built CRO-tested invite + agenda templates** (industry-researched conversion patterns) | [Splash](https://splashthat.com/platform/design) | Not just pretty templates — conversion-optimized |

### Hackathon-specific

| # | Feature | Source | Why |
|---|---|---|---|
| 40 | **Structured submission gallery with persistent discovery** (searchable by stack, category, prize) | [Devpost](https://info.devpost.com/blog/key-hackathon-platform-features) | Builds organizer + sponsor SEO long after the hackathon ends |
| 41 | **Multi-criteria judging dashboard**: custom rubrics, pause/resume, score aggregation | [Devpost](https://info.devpost.com/blog/key-hackathon-platform-features) | Beats the spreadsheet workflow |
| 42 | **Verified builder profiles**: GitHub + LinkedIn-anchored, cross-event history, badge for hackathon wins | [Builderbase](../builderbase-prd-analysis.md) | The cross-event builder graph that compounds |
| 43 | **Team formation**: skill-based auto-match with manual override | [Builderbase](../builderbase-prd-analysis.md) | Solves the "I don't know anyone here" problem |
| 44 | **Sponsor credit distribution**: API keys + promo codes routed to accepted attendees with usage tracking | [Builderbase](../builderbase-prd-analysis.md) | Unique to builder events; defensible mechanic |
| 45 | **Mentor helpdesk queue**: SLA-timed ticket system inside the event | [Builderbase](../builderbase-prd-analysis.md) | Mentor ops are chaos without it |

### Community + recurring cadence

| # | Feature | Source | Why |
|---|---|---|---|
| 46 | **Persistent community groups between events** — members join once, get all future event invites | [Meetup](https://www.meetup.com/blog/2026-meetup-roadmap/) + [Bevy](https://bevy.com/b/events-and-groups) | Events become touchpoints in a relationship, not transactions |
| 47 | **Chapter hierarchy with delegated control** — HQ + local chapter model | [Bevy](https://bevy.com/b/events-and-groups) | Enterprise community programs need this |
| 48 | **Membership tiers gating event access** + reserved RSVP windows | [SocialLoop](https://socialloop.ai/) + [Luma](https://help.luma.com/p/luma-plus-overview) | Monetize community access and event access together |
| 49 | **Cross-event guest profile pre-fill** — answers carry to every future event the guest registers for | [SocialLoop](https://socialloop.ai/) | Removes friction for repeat attendees |

### Communications

| # | Feature | Source | Why |
|---|---|---|---|
| 50 | **Multi-channel event blasts** (email + push + SMS + WhatsApp from one send) | [Luma](https://help.luma.com/p/luma-vs-eventbrite) | Reach attendees where they are without 4 tools |
| 51 | **Text Blast (one-click bulk SMS, no carrier fees)** | [Partiful](https://partiful.com/) + [Luma](https://help.luma.com/p/luma-ios-app) | Open rates outperform email by 4-6x |
| 52 | **Automated post-event drip sequences** (organizer-defined or AI-generated) | Gap vs Luma — closes documented weakness | Luma weakness called out by primary research |
| 53 | **AI-written promoter copy + email body** in event's own brand voice | [SocialLoop](https://socialloop.ai/) | Replaces marketing-agency work |

### Post-event content + attribution

| # | Feature | Source | Why |
|---|---|---|---|
| 54 | **AI content repurposing engine**: one recording → 100+ clips, blog posts, social, email drafts | [Goldcast](https://www.goldcast.io/use-case/content-repurposing) | Sustainable subscription justification |
| 55 | **Account-level engagement attribution to Salesforce** — who watched, who attended, mapped to company accounts in pipeline | [Goldcast](https://www.goldcast.io/use-case/content-repurposing) | Closes the event→revenue loop CFOs demand |
| 56 | **Brand voice profiles** — customizable AI writing rules applied across all generated content | [Goldcast](https://www.goldcast.io/blog-post/agentic-video-updates-2025) | Brand consistency at scale |
| 57 | **Post-event survey + feedback** with attendee-to-attendee reconnect | [Luma](https://help.luma.com/p/luma-vs-eventbrite) + [Whova](https://whova.com/whova-event-app/) | Standard but well-executed |

### Virtual + hybrid (when applicable)

| # | Feature | Source | Why |
|---|---|---|---|
| 58 | **Patented green room** for speakers + control room for run-of-show | [Welcome](https://venturebeat.com/business/welcome-launches-to-help-companies-stage-apple-keynote-style-virtual-events) | Apple-keynote production values without an A/V team |
| 59 | **Multi-area venue model** (stage / sessions / networking / expo) | [Hopin / RingCentral Events](https://www.ringcentral.com/rc-events/solutions/virtual-event-platform.html) | Mimics physical conference wayfinding for virtual |
| 60 | **Livestream studio with overlays** (lower thirds, scene transitions) — no OBS required | [Hopin / RingCentral Events](https://www.ringcentral.com/rc-events/solutions/virtual-event-platform.html) | Production polish without third-party broadcast software |
| 61 | **3D virtual expo hall** for trade shows that need spatial presence | [vFairs](https://www.vfairs.com/) | Replaces the "Zoom + spreadsheet" virtual trade show |
| 62 | **100% white-label** virtual surfaces (no platform branding anywhere) | [Welcome](https://venturebeat.com/business/welcome-launches-to-help-companies-stage-apple-keynote-style-virtual-events) | Premium event organizers will not accept "Powered by" branding |

### Sponsor + venue marketplace

| # | Feature | Source | Why |
|---|---|---|---|
| 63 | **AI-powered venue sourcing** (340K+ venues) with RFP automation + 3D floor plans | [Cvent Supplier Network](https://www.cvent.com/en/event-marketing-management/cvent-supplier-network) — defer until late roadmap, see §5 | Cvent's deepest moat; only target if we hit scale |
| 64 | **24-48h venue RFP response SLA** with managed-service team | [Stova](https://stova.io/platform/capabilities/enterprise-platform/) | Service layer on top of marketplace |
| 65 | **Sponsor matchmaking by ICP**: vector similarity matches sponsor budgets to listed events | [Eventsea v2.0 marketplace-tx](../releases/v2.0-marketplace-tx.md) + adjacent to [Builderbase](../builderbase-prd-analysis.md) | Cvent has no equivalent; this is greenfield |
| 66 | **Chapter-level sponsorship management** — local chapters own sponsors with HQ oversight | [Bevy](https://bevy.com/b/events-and-groups) | Enterprise community programs need this |
| 67 | **Group room block management** (Passkey-equivalent) | [Cvent Passkey](https://www.cvent.com/en/event-marketing-management/cvent-supplier-network) — defer | Hotel-block logistics for large in-person events |

### Field marketing intelligence (Eventsea's category-creating wedge)

| # | Feature | Source | Why |
|---|---|---|---|
| 68 | **Sponsor-side event radar** — "which events should we sponsor next quarter?" with hybrid semantic search across all event sources | [Eventsea Event Radar prototype + field-marketing page](../PRD.md) | No competitor offers a sponsor-side radar; category-defining |
| 69 | **Autonomous event discovery** (Tavily + Token Factory) — pipeline finds events you didn't know about | [Eventsea v2 autonomous spec](../releases/v2/autonomous-spec.md) | Cvent only knows about events on Cvent |
| 70 | **Persistent sponsor "Company Brain"** — cross-event context on past sponsorships, contacts, ROI | [MoltPod](https://moltpod.com/) | Memory that survives sales-team turnover |
| 71 | **Outbound automation for sponsors** — AI drafts sponsor-pitch emails to event organizers based on portfolio fit | [MoltPod](https://moltpod.com/) + [Eventsea v0.3 admin](../releases/v0.3-admin-and-outbound.md) | Productizes the concierge work |
| 72 | **Per-persona weekly digest** — each teammate gets recommended events for their target accounts | [Eventsea v1.5 teams-and-digest](../releases/v1.5-teams-and-digest.md) | Inbox-natively delivered intelligence |

### Integrations + API

| # | Feature | Source | Why |
|---|---|---|---|
| 73 | **30+ verified CRM + marketing-automation integrations** (HubSpot, Salesforce, Marketo, MS Dynamics, Eloqua, NetSuite, Veeva, Pardot, etc.) | [Cvent integrations](https://www.cvent.com/en/event-management-software) | Enterprise procurement won't sign without these |
| 74 | **Public API with full webhook surface** (events, guests, hosts, tickets, registrations, calendars, membership, audit logs) | [Luma API](https://docs.luma.com/reference/getting-started-with-your-api) | Developer ecosystem; agent-buildable |
| 75 | **MCP server + LLM-friendly llms.txt index** for AI agents | [Luma](https://docs.luma.com/llms.txt) + [SocialLoop](https://socialloop.ai/) | AI-native by design, not retrofit |
| 76 | **Native Slack app** with `/eventsea` slash commands + channel posts on new matches | [Eventsea v1.5 spec](../releases/v1.5-teams-and-digest.md) | Where teams already live |
| 77 | **Calendar sync** (Google + Outlook + Apple) with personal-calendar agenda push | [Sched](https://sched.com/) | Universal expectation; do it well |

### Mobile app

| # | Feature | Source | Why |
|---|---|---|---|
| 78 | **Native iOS + Android apps under organizer brand** (white-label) — not under our brand | [Mighty Networks](https://www.mightynetworks.com/pricing) + [Pheedloop](https://pheedloop.com/) | 60% more activity than web; organizer owns the relationship |
| 79 | **Auto-generated event app from event data** — zero configuration | [Pheedloop](https://pheedloop.com/) | Removes the "app builder" workflow entirely |
| 80 | **Push, SMS, email blast all from the mobile organizer view** | [Luma](https://help.luma.com/p/luma-ios-app) | Send-from-the-phone is the day-of organizer reality |

### Access control + privacy

| # | Feature | Source | Why |
|---|---|---|---|
| 81 | **Per-event password gate** with HMAC HttpOnly cookie | [Eventsea PRD v1 FR9](../PRD.md) | The Eventsea per-event privacy posture is unique |
| 82 | **Audit logs** (account-level + event-level) | [Luma](https://help.luma.com/p/luma-plus-overview) | Trust posture; demanded by enterprise |
| 83 | **AES-256-GCM envelope encryption** for upstream API keys (Luma, Stripe, etc.) | [Eventsea v1.1 Luma API spec](../releases/v1.1/luma-api-spec.md) | Procurement-grade key handling |
| 84 | **SOC 2 + ISO 27001 + PCI DSS** + 99.999% uptime SLA — eventual | [RainFocus](https://eventtechlive.com/rainfocus-nexus-the-event-industrys-first-serious-play-for-ai-agents/) | The compliance ladder for enterprise wins |
| 85 | **GDPR opt-out blocklist** + delete-on-request per attendee | [Eventsea PRD v1 FR9 + v1.1 spec](../releases/v1.1/luma-api-spec.md) | Legal table-stakes done right |

### Pricing model

| # | Feature | Source | Why |
|---|---|---|---|
| 86 | **Free tier with platform fee on paid tickets** (matches Luma free) | [Luma](https://luma.com/pricing) | Removes adoption friction; Eventsea takes 5% of paid only |
| 87 | **Plus / Pro tier $49-$99/mo** with 0% platform fee, API access, unlimited team seats | [Luma Plus](https://luma.com/pricing) + [SocialLoop Pro](https://socialloop.ai/pricing) | The PLG floor |
| 88 | **Sponsor pilot tier $7.5K-$25K per quarter** for concierge lead-intelligence delivery | [Eventsea sponsor-pilot-offer.md](../gtm/sponsor-pilot-offer.md) | Validated by BuilderShip |
| 89 | **Enterprise tier** (sales-led) with SSO, custom integrations, dedicated success manager | [Cvent](https://www.cvent.com/en/event-management-software) | Eventually — but at 1/5 Cvent's price |
| 90 | **Modular pricing**: pay only for the modules you use (mobile app, virtual portal, lead intel) | [Pheedloop](https://pheedloop.com/) | Avoids "you must buy the whole stack" friction Cvent imposes |

## 4. The 30 features I'd actually build first (the v1.5 cut)

90 features is a 4-year build. The minimum-viable "demonstrably better than any single competitor" set:

**Already validated by BuilderShip (PRD v1) — ship as planned:**
- Two-tier verification + V/P/U verdicts (#31)
- Per-sponsor scoring with conflict overrides (#32)
- Influence rank (#33)
- "Why it ranked here" explainability (#34)
- P1/P2/P3 tagging + team notes (#35)
- HubSpot + Salesforce CSV export (#73 partial)
- Per-event password gate (#81)
- GDPR opt-out + delete-on-request (#85)

**Add for "demonstrably better than Luma" — the next 8 weeks after PRD v1 ships:**
- Calendar-as-social-graph subscribable pages (#1)
- Application-gated ticketing (#13)
- Deferred-capture waitlist (#14)
- Instant Stripe payouts + 0% platform fee at paid tier (#15, #16)
- Mixed ticket types in one event (#12)
- Social RSVP visibility (#4)
- Multi-channel event blasts (#50)
- AI-generated event listing from a brief (#8)

**Add for "demonstrably better than Cvent LeadCapture" — same window:**
- Klik-style smart badge integration *or* native QR + Apple Wallet (#19, #20, #21)
- Speaker self-service portal + CFP (#36, #37)
- Mobile check-in app (#19, #80)
- Native Slack app + push (#76)

**Add for "demonstrably better than Builderbase":**
- Verified builder profiles with cross-event history (#42)
- Team formation (#43)
- Sponsor credit distribution (#44)
- Structured submission gallery + multi-criteria judging (#40, #41)

**Add for "the moat nobody else has":**
- Intent-based AI matchmaking (#24)
- Persistent community groups between events (#46)
- AI content repurposing engine (#54)
- Account-level engagement attribution to Salesforce (#55)
- Per-persona weekly digest (#72)
- One-click full brand-kit asset generation (#9)
- Built-in affiliate program (#17)

That's **31 features** that make the app demonstrably best-in-class against any single competitor on at least 3 axes. It's the v2 ship target.

## 5. What we deliberately do NOT build (explicit non-goals)

- **Cvent Supplier Network parity (340K hotel venues)** — venue sourcing at hotel scale is a generational moat. We do indie/hacker-house/coworking venues only.
- **Native Group Room Blocks (Passkey-equivalent)** — too narrow a slice; refer customers to Cvent or partner integration.
- **On-site badge-printing hardware fleet** — capital-intensive logistics; partner with Klik / Boomset.
- **Full virtual-event production studio (Welcome / Hopin parity)** — only the multi-area venue model + livestream overlays for hybrid; not standalone virtual platform.
- **Generic webinar platform (Zoom / WebEx)** — commoditized; integrate, don't replace.
- **Surveys as a standalone product (Typeform)** — embed lightweight feedback, integrate Typeform/Tally for the rest.
- **Vertical hackathon-only positioning** — Builderbase owns that wedge. We span all event types.

## 6. Release plan (revised)

This PRD spans 4 releases beyond what PRD v1 already plans. They layer onto the existing v1 → v1.1 → v2 ladder.

| Release | Window | Theme | New features from this PRD |
|---|---|---|---|
| **v1** (PRD.md) | 6 weeks (in progress) | Lead intelligence (CSV → screened/scored/ranked dashboard) | #31, #32, #33, #34, #35, #81 |
| **v1.1** (luma-api-spec.md) | 2-3 weeks after v1 | Auto-pull from Luma | (no new from this PRD; v1 deepens) |
| **v2-A** (lite events platform) | 8-10 weeks after v1.1 | Compete with Luma on registration + ticketing | #1, #7, #8, #9, #12, #13, #14, #15, #16, #19, #20, #50 |
| **v2-B** (community + content) | 6-8 weeks after v2-A | Persistent communities + AI content repurposing | #2, #4, #46, #47, #48, #54, #55, #56, #72 |
| **v2-C** (hackathon + onsite) | 8-10 weeks after v2-B | Match or beat Builderbase on hackathon + ship Klik-style badge integration | #21, #22, #40, #41, #42, #43, #44, #45 |
| **v2-D** (networking + speakers + virtual) | 6-8 weeks after v2-C | Brella + Sched + Hopin parity for hybrid events | #24, #25, #26, #28, #36, #37, #38, #58, #59, #60 |
| **v3** (enterprise) | 12+ weeks after v2-D | Enterprise tier, full CRM integrations, SOC 2 | #73, #84, #89, #90, white-label mobile app (#78, #79) |
| **deferred** | not committed | Things we may never build | #5, #11, #61, #63, #64, #67 |

Total: ~52 weeks of focused engineering to ship the 31-feature v2 cut. The remaining 60 features are v3 or later.

## 7. The single-sentence vision

> Eventsea is the events platform where the sponsor walks in knowing exactly who to talk to, the organizer ships a branded event page in 90 seconds, the attendee gets a Brella-grade match and a Whova-grade community before they arrive, and the post-event content runs itself on autopilot — at one-fifth Cvent's price, with a Luma-quality mobile experience.

## 8. Success metrics for v2 (the 31-feature cut)

- **vs Luma** — Eventsea wins on: ticketing flexibility, AI marketing copy, lead screening, community persistence, content repurposing.
- **vs Cvent** — Eventsea wins on: pre-event lead verification, sponsor-side event radar, autonomous discovery, 1/5 the price, modular pricing.
- **vs Builderbase** — Eventsea wins on: lead screening depth (V/P/U + influence), broader event types (meetups + demo days + conferences, not just hackathons), CRM export depth.
- **vs Bizzabo** — Eventsea wins on: AI-native screening + autonomous discovery; ties on smart-badge integration (partner with Klik vs build).
- **vs Whova** — Eventsea wins on: lead intelligence + sponsor side; ties on attendee app NPS.
- **vs Brella** — Eventsea wins on: lead screening + sponsor-side radar; ties on intent-based matchmaking by adopting the same model.
- **vs SocialLoop** — Eventsea wins on: enterprise lead intel; ties on affiliate program + AI marketing copy by adopting both.
- **vs MoltPod** — not a competitor; we adopt their "Company Brain" model for sponsor memory.

The headline KPI: **for every single named competitor, an Eventsea customer can point to ≥3 features Eventsea does better, and ≤1 feature the competitor does better.**

## 9. Open questions

1. Build or partner for hardware badges? (Klik OEM partnership vs. build our own = $$$)
2. White-label mobile app: build native (Pheedloop / Mighty Networks model) or PWA?
3. Pricing tier overlap: do the sponsor pilot tiers ($7.5K-$25K) collapse into the Pro/Enterprise tier or stay separate?
4. Compliance roadmap: when do we commit to SOC 2 audit ($150K-$300K, 6-9 months)?
5. Does the field-marketing radar stay a separate product or get folded into the main org experience?
6. Vertical-specific UIs: do hackathons / community groups / corporate events / consumer events all get distinct UIs or one configurable shell?
7. Multi-tenancy at v2-A: org-level or per-event? Per-event is simpler but limits enterprise sale.
8. Open the API + MCP from day one of v2-A, or gate behind paid tier like Luma does?

## 10. References

**Eventsea internal docs**:
- `docs/PRD.md` (v1 Event Lead Intelligence)
- `docs/competitive/cvent-comparison.md`
- `docs/competitive/eventsea-feature-inventory.md`
- `docs/competitive/research/luma-deep-dive.md`
- `docs/competitive/research/socialloop-and-moltpod.md`
- `docs/competitive/research/long-tail-competitors.md`
- `docs/builderbase-prd-analysis.md`
- `docs/council/decision-2.md` (Sprint 1 + 2 plan)
- `docs/gtm/sponsor-pilot-offer.md` (current pilot pricing)
- All `docs/releases/*` specs

**External sources** (one per platform; full citation list in research/ files):
- Luma: [help.luma.com](https://help.luma.com/) · [docs.luma.com](https://docs.luma.com/reference/getting-started-with-your-api)
- Eventbrite: [eventbrite.com/product-updates/roadmap-2026](https://www.eventbrite.com/product-updates/roadmap-2026/)
- Cvent: [cvent.com/en/event-management-software](https://www.cvent.com/en/event-management-software) · [Cvent Pricing 2026](https://inevent.com/blog/tech-and-trends/cvent-pricing-guide.html)
- Builderbase: [builderbase.com](https://builderbase.com/)
- SocialLoop: [socialloop.ai](https://socialloop.ai/)
- MoltPod: [moltpod.com](https://moltpod.com/)
- Bizzabo Klik: [bizzabo.com/event-management-software/klik-smart-event-badges](https://www.bizzabo.com/event-management-software/klik-smart-event-badges)
- Brella: [brella.io/event-matchmaking](https://www.brella.io/event-matchmaking)
- Whova: [whova.com/whova-event-app](https://whova.com/whova-event-app/)
- Splash: [splashthat.com/platform/design](https://splashthat.com/platform/design)
- Devpost: [info.devpost.com/blog/key-hackathon-platform-features](https://info.devpost.com/blog/key-hackathon-platform-features)
- Sched: [sched.com](https://sched.com/)
- Pheedloop: [pheedloop.com](https://pheedloop.com/)
- Airmeet: [airmeet.com/hub/networking](https://www.airmeet.com/hub/networking/)
- Welcome: [TechCrunch coverage](https://techcrunch.com/2020/11/18/welcome-raises-12-million-to-be-the-ritz-carlton-for-event-platforms/)
- Meetup: [meetup.com/blog/2026-meetup-roadmap](https://www.meetup.com/blog/2026-meetup-roadmap/)
- Mighty Networks: [mightynetworks.com/pricing](https://www.mightynetworks.com/pricing)
- Partiful: [CNBC profile](https://www.cnbc.com/2025/04/19/meet-partiful-the-gen-z-party-planning-staple-thats-taking-on-apple.html)
- Goldcast: [goldcast.io/use-case/content-repurposing](https://www.goldcast.io/use-case/content-repurposing)
- RainFocus: [Event Tech Live RainFocus Nexus](https://eventtechlive.com/rainfocus-nexus-the-event-industrys-first-serious-play-for-ai-agents/)
- vFairs: [vfairs.com](https://www.vfairs.com/)
- Stova: [stova.io](https://stova.io/platform/capabilities/enterprise-platform/)
- Hopin / RingCentral Events: [ringcentral.com/rc-events](https://www.ringcentral.com/rc-events/solutions/virtual-event-platform.html)
- Bevy: [bevy.com/b/events-and-groups](https://bevy.com/b/events-and-groups)
