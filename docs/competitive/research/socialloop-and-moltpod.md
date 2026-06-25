# Research: SocialLoop.ai + MoltPod

> Raw research for the best-of-breed events app PRD. Produced 2026-06-12 by background research agent.

## Part 1: SocialLoop (socialloop.ai)

**Canonical URL:** https://socialloop.ai (not .io — socialloop.io appears to redirect or not serve content; the live product is at `.ai`)

### Problem They Solve

SocialLoop targets the fragmentation tax faced by independent event producers: today they string together Eventbrite (ticketing), Mailchimp (email), Canva (design), and spreadsheets (guest ops). SocialLoop collapses all of that into a single AI-native studio — from page creation and ticket configuration to post-event email follow-up and affiliate payouts.

### Target Customer

Emphatically *not* enterprise. Their homepage copy name-checks: nightlife promoters, underground speakeasy curators, supper club hosts, yoga retreat leaders, run club founders, gallery directors, pop-up restaurant operators, wine club founders, tech conference organizers, concert promoters. Events range 10–5,000 guests. This is the creator/community-host segment — the same cohort Luma targets, but with a richer operator toolset.

### Full Feature Surface

**Event creation & pages**
- Natural-language → full event listing (AI writes the name, description, schedule, tier structure)
- "Immersive" branded pages — not templates; described as design that auto-assembles around your event's identity (explicit contrast with Eventbrite's commodity grid)

**Ticketing**
- Free RSVPs, tiered paid tickets, secret/hidden allotments, donations — all mixable in one event
- Application-based curation: guests apply first, host approves, then payment is captured
- Checkout via Apple Pay, Google Pay, cards; instant Stripe payout (not net-30 like Eventbrite)
- Zero fees on free RSVPs

**Community management**
- Public or private communities; member-exclusive access
- Reserved RSVP windows for members before public release
- Per-event revenue can route to community Stripe or personal Stripe separately

**Marketing & promotion**
- AI-generated captions tailored per platform (Instagram, X, TikTok, LinkedIn) in the event's own voice
- Email campaign generation (subject line + body + follow-up sequence)
- Scheduled reminders and day-of notifications
- Trackable QR codes and links with attribution per source

**Affiliate & promoter program**
- Per-tier commission rates
- AI writes promoter-specific social copy
- Promo codes auto-apply on arrival via affiliate link
- Automated Stripe payouts to affiliates post-event (no manual reconciliation)

**Guest list & check-in**
- Full journey tracking: which link, which affiliate, which campaign brought each guest
- Mobile check-in via SocialLoop app (staff scans)
- Bulk import + AI-powered audience merging across lists
- VIP/speaker/sponsor tagging with follow capability

**Forms**
- AI generates registration questions from a plain-English description
- Pre-fill: guest answers carry forward to every future SocialLoop event they attend
- Timing control: question appears before RSVP, before purchase, or before application submission

**Team & permissions**
- Scoped roles: manager, guest-list-only, check-in-only, promoter
- Action audit logs; revocable access
- Promoters can self-update promo codes from their phone

**Developer / API access**
- API, MCP Server, and GitHub integration advertised for AI agents — unusual for an SMB event tool

### Pricing

| Tier | Monthly | Annual | Events/mo | Ticket fee | Marketing |
|------|---------|--------|-----------|-----------|-----------|
| Free | $0 | — | 1 | 5% | 25 invites/wk, 10 SMS |
| Premium | $19.99 | $199.99 | 5 | 4% | 200 invites/wk, 2 verified domains |
| Pro | $49.99 | $499.99 | 10 | 3% | 10K emails + 500 SMS/mo |
| Max | $129.99 | $1,299.99 | Unlimited | 1.5% | 30K emails + 3K SMS/mo |

All tiers include AI event creation, mobile check-in, ticketing, and affiliate programs.

### Unique Differentiators vs. Luma / Eventbrite / Cvent

| Dimension | SocialLoop | Luma | Eventbrite | Cvent |
|-----------|-----------|------|-----------|-------|
| Branded pages | AI-assembled, immersive | Clean but templated | Commodity grid | Corporate template |
| Built-in affiliate program | Yes, with AI copy + auto-Stripe | No | Basic | No |
| Application-gated ticketing | Yes (approve before charge) | Approval RSVPs only | No | No |
| AI marketing copy | Per-platform social + email | No | No | No |
| Secret ticket tiers | Yes | No | No | No |
| Form pre-fill across events | Yes | No | No | No |
| Instant Stripe payouts | Yes | Delayed | Net-30 | Enterprise billing |
| API/MCP for AI agents | Yes | Limited | Limited | Enterprise only |
| Target scale | 10–5,000 | 10–1,000 | 100–100K | 1,000–100K+ |

The most genuinely novel capabilities: (1) built-in promoter network with AI-generated content per promoter + automatic commission disbursement, (2) application-before-payment curation flow, (3) cross-event guest data continuity via pre-fill, and (4) MCP/API surface for agent-driven event ops.

**Sources:** [SocialLoop.ai](https://socialloop.ai) · [SocialLoop Pricing](https://socialloop.ai/pricing) · [Guideflow: 18 Best Event Marketing Software 2026](https://www.guideflow.com/blog/best-event-marketing-software-tools)

---

## Part 2: MoltPod (moltpod.com)

**Spelling verdict:** "MoltPod" is correct — one word, capital M and P. It is a distinct product from anything called "Multipod." The name derives from their agent runtime (formerly called Moltbot, now OpenClaw), not from "multi-pod" architecture.

### What It Actually Is

MoltPod is an **AI event operations agent**, not an event platform. It does not sell tickets, host pages, or manage RSVPs. It automates the human coordinator work that sits *around* an event: sponsor prospecting, outreach, follow-up drafting, CRM updates, and speaker/attendee research. Their framing is "AI employees for messy GTM work" — the kind of custom, context-heavy operational work that SaaS can't template.

Founded by **Aditya P. Advani** (CEO); MoltPod is a **Y Combinator S24 company**.

### Feature Surface

**Company Brain (persistent memory)**
- Stores attendee, speaker, and sponsor dossiers
- Tracks pre- and post-event workflow state across conversations
- Auto-generates follow-up tasks after each touchpoint
- Retains brand voice and operating knowledge

**Event Ops Chat (Mattermost-embedded)**
- The agent lives inside a Mattermost instance as a shared team interface
- Accept natural-language briefs ("Find 10 fintech sponsors and draft intro emails")
- Agent reviews work with the user before executing
- Runs asynchronously 24/7 — not a chatbot that requires synchronous babysitting

**Sponsor Outreach Module**
- Researches potential sponsors by portfolio fit
- Drafts personalized pitches; claims 3x reply rates vs. generic decks
- Runs automated follow-up sequences
- Tracks reply status in Company Brain

**Infrastructure (OpenClaw × Hermes)**
- OpenClaw: formerly called Moltbot; now an open-source AI agent framework that became the fastest-growing OSS project in GitHub history (353K stars by April 2026, 3.2M MAU). MoltPod is built on it and ships features to it first before open-sourcing.
- Hermes Agent: Nous Research's agent framework (MIT license, released Feb 2026), used alongside OpenClaw for multi-model orchestration
- Encrypted credential storage; bring-your-own-keys model
- Integrations: Gmail, Google Calendar, Slack, CRM systems, event management tools

**Security posture**
- Published audit reports (7+) — unusual for an early-stage startup, likely driven by the "give the agent your credentials" threat model

### Pricing

- **Starter:** $99/month — one pod (one AI employee instance), unlimited events
- **Enterprise:** $600/month — multiple pods, SLAs, custom integrations, SSO, white-glove onboarding for first event

### Does It Belong in an Events-App Feature PRD?

**Partially yes, but as a separate capability layer.** MoltPod is not a competitor to SocialLoop, Luma, or Eventbrite — it has no front-end, no ticketing, no pages. It is an AI back-office layer. The relevant PRD question is: *should a best-of-breed events app expose an agent/automation surface that can do what MoltPod does natively?*

Specific capabilities worth pulling into a PRD:
- Persistent event memory / "Company Brain" concept (cross-event context on sponsors, speakers, attendees)
- Sponsor research + personalized outreach automation
- Post-event follow-up task generation
- Team-shared agent interface (rather than per-user chatbot)
- Bring-your-own-keys AI model architecture

**What to ignore for an events app:** Their Mattermost embedding, OpenClaw runtime, and agent security audit work are infrastructure decisions specific to MoltPod's standalone product — not features to replicate in a ticketing/community platform.

### Note on "Multipod"

No standalone product called "Multipod" or "multipod.ai" was found with the cloud desktop / Slack-like chat / browser control profile mentioned. The user likely conflated MoltPod (the events AI agent company) with OpenClaw (the underlying agent runtime MoltPod is built on, formerly called Moltbot), which does have browser-control and multi-channel capabilities. There is a European academic project at multipod-project.eu focused on multilingual democratic deliberation — entirely unrelated to events. **Speculation:** if the user built something called "Multipod," it may be a separate internal tool not yet publicly indexed.

**Sources:** [MoltPod.com](https://moltpod.com/) · [MoltPod LinkedIn](https://www.linkedin.com/company/moltpod) · [Aditya Advani / X](https://x.com/aditya_advani) · [OpenClaw vs Hermes comparison](https://innfactory.ai/en/blog/openclaw-vs-hermes-agent-comparison/) · [OpenClaw Security — MoltPod Blog](https://moltpod.com/blog/openclaw-security) · [YC MoltPod search](https://www.ycombinator.com/founders)
