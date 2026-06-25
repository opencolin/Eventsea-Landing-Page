# Research: Luma (lu.ma)

> Raw research for the best-of-breed events app PRD. Produced 2026-06-12 by background research agent.

**Primary sources:** [lu.ma/pricing](https://luma.com/pricing) · [Luma Help Center](https://help.luma.com/) · [Luma API Docs](https://docs.luma.com/reference/getting-started-with-your-api) · [Webhooks](https://help.luma.com/p/webhooks) · [Luma Plus Overview](https://help.luma.com/p/luma-plus-overview) · [Luma vs Eventbrite](https://help.luma.com/p/luma-vs-eventbrite) · [Luma vs Meetup](https://help.luma.com/p/luma-vs-meetup) · [iOS App](https://help.luma.com/p/luma-ios-app)

## 1. Discovery + Calendars

**Calendar pages** are Luma's core growth flywheel. Every host gets a subscribable calendar URL (e.g. `lu.ma/myorg`). Followers get push/email notifications the moment a new event is published — a compounding audience that grows across events, not just per-event. There is no equivalent in Eventbrite.

**Discovery feed** (launched late 2024 as "Luma Discovery") transformed the product from a registration utility into a growth engine. Users browse events by city and category; the feed surfaces events from calendars they follow plus algorithmic recommendations. There is no confirmed weekly digest email feature documented in primary sources — this appears to be a gap or unpublicized feature.

**Follow mechanics:** Users follow calendars (not just individual events), creating a persistent social graph. Hosts own the subscriber list — full access to emails and phone numbers — unlike Meetup which withholds member contact data.

**Sub-communities:** Not explicitly offered as a named feature. Membership tiers on calendars (API-accessible) can approximate this, but there is no dedicated sub-group structure.

## 2. Event Creation

Creating an event takes under 2 minutes: choose cover image from a gallery of curated "poster" designs or upload your own, set location, add details, configure registration. Fields include title, description (rich text), cover image, location (in-person/virtual/hybrid), capacity, ticket types, registration questions, visibility (public/private/unlisted), and event tags.

**Recurring / series events:** Luma supports multi-session and recurring events with a cloning flow. However, primary sources note this is a workaround (clone event) rather than a true series-scheduling UI — a documented limitation. No native templates exist; cloning is the template substitute.

**Zoom/Google Meet:** Auto-generates a meeting link and embeds it in the event page, removing a manual step that trips up other platforms.

## 3. RSVP + Approval

Three distinct flows: open registration, **require approval** (registrants go to "Pending" status; host approves/declines), and **waitlist** (triggered when capacity is reached).

**Waitlist differentiation:** For paid events, Luma *authorizes* (but does not charge) the card at waitlist signup. If a host approves the guest, payment captures. If declined or canceled, the authorization releases. This is a technically sophisticated deferred-capture flow that competitors rarely implement cleanly. Approval can be done individually or in bulk.

**Ticket types:** Free, paid (fixed or flexible/suggested price), hidden (accessible only via unlock code), and crypto-priced (SOL/USDC). A single event can mix free and paid tiers. Sales start/end dates simulate early-bird pricing. Capacity is enforced per ticket type.

**Token-gating:** Events can restrict registration to holders of a specific wallet/token — niche but a genuine differentiator for Web3 communities.

## 4. Communications

- **Confirmation emails** auto-send on registration; include QR ticket, Zoom link if virtual, calendar add links.
- **Reminders:** Hosts can send manually timed email blasts to registered guests with custom subject and body. Scheduled sending available.
- **Event blasts:** Mid-event and pre-event announcements to all registered attendees via email, push, SMS, or WhatsApp — all from one send.
- **Post-event:** Feedback/survey collection built in (link sent to guests after event). No documented automated post-event drip sequence.
- **SMS invites:** Hosts can sync contacts and send bulk SMS invitations from the platform — unusual for an event tool at this price point.
- **Invite limits:** Free tier: 500 outbound invites/newsletters per week. Plus tier: 5,000/week (unlimited messaging to *already-registered* attendees on both tiers).

No documented automation rules engine (if-this-then-that style workflows are handled via Zapier/API, not natively).

## 5. Payments + Ticketing

| | Free Plan | Luma Plus |
|---|---|---|
| Platform fee | 5% | 0% |
| Stripe processing | ~2.9% + $0.30 | ~2.9% + $0.30 |
| Total on $20 ticket | ~$1.88 | ~$0.88 |
| Tax collection | No | Yes (automated) |

**Cash flow advantage:** Funds hit your Stripe account on Stripe's rolling schedule (typically 2 days), not held until post-event like Eventbrite.

**Coupons:** Three types — free (100% off), percent discount, fixed amount discount. Scoped to all tickets or one specific ticket type (no multi-type targeting). Usage limits configurable. Codes are immutable after creation.

**Refunds:** Supported; dispute handling also documented.

**Group registration:** Multiple tickets purchasable in one transaction.

**No VAT invoicing** — confirmed limitation vs. Eventbrite for European enterprise use.

## 6. Check-in

- Built-in QR code scanner in the iOS and Android apps — no third-party hardware required.
- Guests show QR from ticket email, Apple Wallet pass, or in-app. Backup: name/email search.
- **Check-in Manager role** (Plus only): grant event staff check-in access without full calendar admin rights — a meaningful operational feature for larger events.
- Walk-in guests can be added by hosts directly from the guest list UI.
- **Apple Wallet:** Tickets save to Wallet for offline access (iOS).
- **No badge printing** natively — documented gap vs. Eventbrite's on-site hardware stack.

## 7. Host Tools

- **Co-hosts / Hosts:** Multiple hosts per event. Two permission levels via API: *manager* (full event management) and *check-in* (scan only). Configurable per host.
- **Guest list management:** Approve/decline/waitlist/remove guests; export guest list as CSV from the Calendars section ("Download People as CSV").
- **Blocklist:** Account-level user blocking documented; event-level blocklist not confirmed as a distinct feature.
- **Contact CRM:** Importable contacts, taggable with custom tags (contact tags + event tags both exposed in API), usable for segmented outreach.
- **Audit logs:** Security section includes audit logs — unusual for a product at this price point.
- **Admin seats:** Up to 3 (free) or 5 (Plus) calendar admins; additional seats at $9–12/month each.
- **Membership tiers:** Calendars can have paid membership tiers (API-accessible), enabling subscription-based community access.

## 8. Networking

- **"Who's Coming":** Hosts can enable public guest list display — a social-proof lever that visibly shows who has RSVP'd (photos, names). Must be manually enabled per event.
- **In-event chat:** Event-level chat thread accessible to all registered guests. Available on both web and mobile, but described as most natural on mobile.
- **Post-event attendee messaging:** Attendees of the same event can look each other up and message within Luma after the event. No dedicated "match" or "connect" flow documented — this is ambient/opt-in.
- **Referral mechanic:** Guests can invite friends directly from their registration confirmation, creating peer referral loops.
- **No dedicated attendee directory / profile pages** beyond what users share publicly — networking is event-scoped, not platform-scoped.

## 9. API + Integrations

**Requires Luma Plus.** Authentication via API key (per calendar). Rate limit: 200 req/min per calendar.

**Exposed objects and operations:**

| Object | Operations |
|---|---|
| Calendars | List, Get, Update, List Admins, Create (v2) |
| Events | Create, Update, Get, List, Approve/Reject/Cancel |
| Guests | Add, List, Get, Update Status, Send Invites |
| Ticket Types | Create, Update, Delete, List |
| Coupons | Create, Update, List (event & calendar level) |
| Contacts | List, Import, Tag management |
| Hosts | Add, Remove, Update (manager vs. check-in roles) |
| Tags | Create/List/Apply/Delete (contact + event tags) |
| Membership Tiers | List, Add Member, Update Status |
| Organizations | List Calendars, Admins, Events; Transfer Event |
| Webhooks | Create, List, Get, Update, Delete |

**Webhook events:** `event.created`, `event.updated`, `event.canceled`, `guest.registered`, `guest.updated`, `ticket.registered`, `calendar.event_added`, `calendar.person_subscribed`. HMAC-SHA256 signed payloads.

**AI-friendly:** `https://docs.luma.com/llms.txt` provides a Markdown index of all API pages for LLM agents — a forward-looking developer affordance.

**Native integrations:** Zapier (Plus only), Zoom (auto link generation), Google Meet. Third-party: 1,000+ via Albato/Zapier connectors.

## 10. Mobile App (iOS/Android)

The mobile apps are **not just a responsive web wrapper** — they add:

- **Live Activities (iOS 16+):** Event info on Lock Screen and Dynamic Island, starting 1 hour before the event — countdown timer, directions, one-tap ticket access.
- **Apple Wallet ticketing:** Offline ticket storage.
- **Native QR scanner:** Primary check-in tool, camera-based, no additional hardware.
- **Contact sync + SMS blast:** Send invitations via SMS to synced phone contacts.
- **Push notifications:** Event reminders, new RSVPs, attendee messages, event updates.
- **In-app chat:** Described as most natural/seamless on mobile.

Android app mirrors most features; Live Activities / Dynamic Island and Apple Wallet are iOS-specific.

## 11. Pricing Model

| Tier | Price | Platform Fee | Invites/wk | API |
|---|---|---|---|---|
| Free | $0 | 5% on paid tickets | 500 | No |
| Luma Plus | $59/mo (annual) / $69/mo | 0% | 5,000 | Yes |
| Enterprise | Custom | Custom | Custom | Yes |

**Send volume add-ons** (Plus): 10K sends/wk +$50/mo; 25K +$200/mo; up to 100K +$800/mo.

**Additional admin seats:** $9/mo (annual) or $12/mo.

**Nonprofit discount:** Available (documented but amount not published).

**Key insight:** The Plus plan's ROI breakeven is ~$1,180/month in paid ticket revenue (where the 5% fee saving = $59 plan cost). Any serious event business with paid tickets should be on Plus.

## 12. The Luma "Magic" — Why They Won the Dev/AI Events Scene

Three structural advantages that compound into a moat:

**1. Calendar-as-social-graph.** Every event hosted on Luma grows a subscribable calendar. Followers are notified of future events automatically. This turns one-off events into compounding audience assets — the host's list grows organically across events. Eventbrite has no equivalent; you start from zero for every event. This is why AI/dev communities use Luma: one calendar page becomes a newsletter + event feed hybrid.

**2. Instant payouts + zero friction ticketing.** Funds are in Stripe immediately (not held post-event). Zero platform fee on Plus. Deferred-capture waitlist payments. The economics and cash flow are simply better for small operators and startups — companies like Stripe and the NBA migrated *from* Eventbrite for this reason. Luma also owns the attendee data (emails, phone numbers) which Meetup withholds.

**3. Design + speed as a product value, not a feature.** Luma treats beautiful event pages and sub-2-minute event creation as core product commitments. The iOS Live Activities integration, Apple Wallet tickets, and seamless in-event chat are not bolted-on features — they reflect a mobile-first, design-forward philosophy that Eventbrite (built for enterprise) and Meetup (built for groups) never prioritized. In the dev/AI scene where social proof and aesthetic credibility matter, this compounds: a Luma event page *looks* credible, which drives more RSVPs, which builds the calendar following faster.

## Gaps Worth Beating in a Best-of-Breed PRD

- No native event series/templates UI (clone only)
- No automated post-event drip communications
- No attendee-to-attendee profile pages or structured networking (LinkedIn-style)
- No VAT invoicing
- No seating charts
- Weekly digest to calendar followers — not confirmed as a feature
- Sub-community structure beneath a calendar
- API + webhooks gated behind Plus (~$59/mo) — a friction point for developers building on the platform

## Sources

- [Luma Pricing](https://luma.com/pricing)
- [Luma Plus Overview](https://help.luma.com/p/luma-plus-overview)
- [Luma vs Eventbrite](https://help.luma.com/p/luma-vs-eventbrite)
- [Luma vs Meetup](https://help.luma.com/p/luma-vs-meetup)
- [Webhooks Docs](https://help.luma.com/p/webhooks)
- [Luma API Reference](https://docs.luma.com/reference/getting-started-with-your-api)
- [Luma API LLMs Index](https://docs.luma.com/llms.txt)
- [Waitlist Help](https://help.luma.com/p/waitlist)
- [Ticket Types Help](https://help.luma.com/p/setting-up-ticket-types)
- [Coupons Help](https://help.luma.com/p/create-coupons-for-paid-events)
- [iOS App Help](https://help.luma.com/p/luma-ios-app)
- [Luma Help Center](https://help.luma.com/)
- [party.pro Luma Guide](https://party.pro/luma/)
- [Luma vs Eventbrite (createtherules)](https://createtherules.com/luma-vs-eventbrite-which-one-is-better-for-small-business-events/)
- [Luma Growth Article](https://www.socialdiscoveryinsights.com/2024/05/16/luma-event-planning-app-sees-impressive-user-growth/)
