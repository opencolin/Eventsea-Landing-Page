# Luma Feature Inventory — Refreshed June 2026

> Refresh of the May 2026 `luma-deep-dive.md` with current help-center index, Enterprise + SSO surface, Salesforce managed-package spec, webhook + signing details, and the external check-in API. Source: every page under `help.luma.com/p/*` plus `docs.luma.com/reference`. Note: lu.ma now 301-redirects to luma.com — the brand consolidated.

## 1. Plan tier matrix (verified)

| | Free | Luma Plus | Enterprise |
|---|---|---|---|
| Price | $0 | $59/mo annual (~$69 monthly) | Custom |
| Platform fee on paid tickets | 5% | 0% | 0% |
| Invites/newsletters per week | 500 | 5,000 (add-ons up to 100K/wk at $800/mo) | Custom |
| Calendar admins | 3 | 5 (+$9/mo annual or $12/mo monthly per seat) | Custom |
| Tax collection (sales/VAT) | No | Yes | Yes |
| Custom event URLs | No | Yes | Yes |
| API + Zapier | No | Yes | Yes |
| Check-in Manager role | No | Yes | Yes |
| Separate first/last name collection | No | Yes | Yes |
| SSO (Okta / Microsoft Entra / Auth0 / Google Workspace / any OIDC) | No | No | Yes |
| Custom email sending domain | No | No | Yes |
| Native Salesforce integration (managed package) | No | No | Yes |
| Native HubSpot integration | No | No | Yes |
| Hardware scanners for high-volume events | No | No | Yes |
| Audit logs (advanced) | Basic | Basic | Comprehensive |
| Custom security assessments / DPAs / SLAs | No | No | Yes |
| Priority support | No | Yes | Dedicated |

## 2. The 9 product surface areas

### 2.1 Events
40+ help articles covering: creation, multi-session/recurring, hybrid, cloning, themes, cover images, guest list, registration questions, ticket types, unlock codes, waitlist, check-in, blasts, feedback, hiding location, terms, blocklists, external check-in integration, mobile wallet passes, multi-host management.

### 2.2 Calendars (the social graph)
17 help articles covering: calendar overview, permissions, collaborating calendars, event tags for calendar filtering, sending newsletters, importing contacts, managing subscriptions, calendar memberships (paid tiers), submitting events, taking over an account/calendar, import limits, downloading calendar people as CSV.

### 2.3 Making Money (payments + ticketing)
13 help articles covering: paid event creation, Stripe setup, coupons, refunds, group registration, taxes/VAT, crypto (SOL + USDC) payments, payment methods, disputed payments, selling in-person tickets, payment + require approval, customizing invoices/receipts, payouts.

### 2.4 Integrations
7 articles: **SSO** (Okta/Entra/Auth0/Google Workspace via OIDC), **embed Luma on your website**, **Zapier**, **webhooks** (HMAC-SHA256 signed), **Salesforce managed package**, **Luma API** (calendar-scoped key, 200 req/min), **iCal syncing**.

### 2.5 Security
9 articles: 2FA, active devices, blocking users, passkeys, **audit logs and activity tracking**, account review/appeal, confirming sensitive actions, security & bug bounty, **Enterprise Security**.

### 2.6 Luma Plus
6 articles: overview, send limits, canceling, Facebook/Meta pixel, Google Analytics measurement ID, managing.

### 2.7 Enterprise
4 articles: overview, **custom email sending domain**, **transferring tickets**, **hardware scanners for high-volume events**.

### 2.8 Helpful Tips
14 articles including: case studies, rich text, merging accounts, email consent + cold emailing, **printing event badges**, nonprofits, Android app, iOS app, **chat on Luma**, discovering events, scheduling a demo, **SMS/WhatsApp messages**, **event chat**.

### 2.9 Troubleshooting + FAQ
~20 articles covering: languages, Zoom attendance, payment countries, GDPR/security, Live Activities, integrations FAQ, timezones, profiles, accessibility, notification types, email delivery, social images, location accuracy, card declines, troubleshooting Google Calendar invites.

## 3. SSO architecture (Enterprise-only, verified)

- **Providers**: Okta, Auth0, Google Workspace, Microsoft Entra. Plus "any OIDC provider on request."
- **Flow**: OAuth Authorization Code on a Web application type.
- **Inputs from customer** (3 fields): Issuer URL, Client ID, Client Secret.
- **Callback URI** (all providers): `https://luma.com/sso/callback`
- **Provisioning**: Just-in-time (JIT) — account is created on first sign-in using verified email from the IdP. **No SCIM**, no directory sync.
- **Deprovisioning**: Deactivate in IdP → user can no longer sign in.

## 4. Salesforce integration (Enterprise managed package)

- **Direction**: One-way, Luma → Salesforce.
- **Delivery**: Managed package installed by SF admin.
- **Auth**: OAuth via External Client App.
- **Mapping**:

| Luma | Salesforce | Notes |
|---|---|---|
| Event | Campaign | Custom field `Luma Event ID` |
| Guest | Contact | Email, Phone |
| Registration | Campaign Member | Status |

- **Constraints**: Sandboxes and My Domain-only orgs not supported. Dedicated Salesforce user account required with Marketing User checkbox enabled (without it, Luma can't create Campaigns). Needs Standard User profile, not Salesforce Integration license.
- **Permission set**: "Luma Object Access" — API Enabled, View Setup, View Roles, plus Read/Create/Edit on Contacts + Campaigns + Campaign Members. Plus "Luma Field Access" from the package.
- **Unlink**: stops sync, reconnectable anytime.

## 5. HubSpot integration (Enterprise native, Plus via Zapier)

Native HubSpot integration is Enterprise-only per the pricing page. On Plus, achievable via Zapier or the API. Common workflow: Luma registration → HubSpot Contact → trigger HubSpot Workflow.

## 6. Webhooks (HMAC-SHA256 signed)

**8 event types**:

| Category | Events |
|---|---|
| Calendar & Audience | `calendar.event_added`, `calendar.person_subscribed` |
| Events | `event.created`, `event.updated`, `event.canceled` |
| Guests | `guest.registered`, `guest.updated` |
| Tickets | `ticket.registered` |

**Signing**:
- Secret format: `whsec_...`
- Signed payload: `{timestamp}.{request_body}`
- Headers: `Webhook-Signature`, `Webhook-Id`, `Webhook-Timestamp`
- Signature header format: `t=<timestamp>,v1=<signature>`

## 7. Public API (Luma Plus or higher)

- **Base**: `https://public-api.luma.com/v1`
- **Auth**: API key per calendar (Settings → Developer), 200 req/min/calendar
- **AI-friendly index**: `https://docs.luma.com/llms.txt` — Markdown digest of every doc page + OpenAPI for agentic tools
- **Object coverage**: Calendars, Events, Guests, Ticket Types, Coupons, Contacts, Hosts (manager vs check-in roles), Tags, Membership Tiers, Organizations, Webhooks

## 8. External Check-In API (the new build target)

**QR code format on Luma tickets**:
```
https://luma.com/check-in/{event_id}?pk={key}
```

The `pk` is one of two key types — Luma's endpoint accepts either:
- `g-...` — **guest key** (one per registered person; surfaces all of that guest's tickets)
- ticket key (one per ticket; maps to exactly one ticket)

**Lookup endpoint (verified)**:
```
GET https://public-api.luma.com/v1/events/guests/get
    ?event_id={event_id}
    &id={pk_value}
```

Returns: guest details, registration status, ticket(s), current check-in state.

**Practical scanner flow**:
1. Camera scans QR → URL string
2. Parse `event_id` from path + `pk` from query string
3. GET the lookup endpoint with both values
4. Drive UI from response: "already checked in" | "valid — confirm check-in" | "wrong event" | "unknown guest" | "ticket void"
5. Issue check-in write (endpoint TBD — confirm during build; if no public write endpoint, model the check-in state internally and reconcile via CSV import)

**Two important nuances**:
- CSV exports contain **ticket keys**, while email tickets often surface **guest keys**. Both work on the lookup endpoint.
- A multi-ticket guest behaves differently per key type: guest key returns all their tickets in one response; ticket key returns one ticket only.

## 9. iOS/Android mobile feature parity

| Feature | iOS | Android |
|---|---|---|
| Native QR scanner | Yes | Yes |
| Push notifications | Yes | Yes |
| In-app event chat | Yes | Yes |
| Apple Wallet passes | Yes | N/A |
| Live Activities (Lock Screen / Dynamic Island) starting 1h before event | Yes (iOS 16+) | N/A |
| SMS contact sync + invite blast | Yes | Yes |

## 10. The Luma gap-list (vs an enterprise events suite)

Confirmed gaps Eventsea can fill in the synthesis:

1. **No native event-series UI** — clone is the workaround
2. **No automated post-event drip / nurture sequences** beyond a single feedback survey
3. **No structured attendee-to-attendee profile/networking** (LinkedIn-style)
4. **No badge printing natively** (Enterprise has hardware scanner support, badge printing is a help-tip article, not first-class)
5. **No SCIM provisioning** — JIT only
6. **No bi-directional Salesforce/HubSpot sync** — Luma→SF only; no SF→Luma updates
7. **No sponsor analytics / ICP intelligence / pre-event meeting booking** (Vendelux's lane entirely)
8. **No event ROI calculator or pipeline attribution dashboard**
9. **No multi-event portfolio analytics** for an organizing org's full season
10. **No AI assistant for hosts** (creating events, writing blasts, drafting follow-ups)
11. **No Slack integration** (must build via Zapier)
12. **No Resend / custom transactional email layer** (Luma sends from its own infrastructure)

## Sources

- [Luma Help Center](https://help.luma.com/)
- [Pricing](https://luma.com/pricing) · [Luma Plus Overview](https://help.luma.com/p/luma-plus)
- [Enterprise Overview](https://help.luma.com/p/enterprise-overview) · [Enterprise Security](https://help.luma.com/p/enterprise-security)
- [SSO](https://help.luma.com/p/sso) · [Webhooks](https://help.luma.com/p/webhooks) · [Salesforce Integration](https://help.luma.com/p/set-up-a-salesforce-integration)
- [API Reference](https://docs.luma.com/reference) · [LLMs Index](https://docs.luma.com/llms.txt)
- [External Check-In Integration](https://help.luma.com/p/external-check-in-integration) · [Hardware Scanners](https://help.luma.com/p/hardware-scanners)
- [Custom Sending Domain](https://help.luma.com/p/custom-sending-domain)
