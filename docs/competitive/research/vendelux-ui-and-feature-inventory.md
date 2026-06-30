# Vendelux UI + Feature Inventory (June 2026)

> Screen-level product surface for Vendelux, reconstructed from their public help center, product pages, and marketing site. Triangulated across 15 page fetches. Backs the strategic doc at `docs/competitive/vendelux-comparison.md` and the landscape research at `event-intelligence-landscape-2026.md`.
>
> **Screenshot availability note**: Vendelux's marketing pages embed product UI hero-shots (Event Discovery dashboard, ChatVDX chat screen at 1024×754, Segments builder, EDP attendee grid). The G2 and SoftwareWorld reviewer pages return HTTP 403 to scrapers; Capterra shows 0 screenshots in their listing. The richest visual source is vendelux.com itself + the help articles below (each embeds Loom-style walkthroughs by Gina Bochis demonstrating live UI). To capture actual screenshot files, log in via the free trial or open the demo on-demand page at `/demo`.

## 1. Top-level navigation map

Primary nav (from every page header):

```
Home  |  ChatVDX  |  Explore  |  Lists  |  [user menu]
```

Marketing-site nav (logged-out):

```
Product ▼              Solutions ▼               Resources ▼      Pricing  Log In  Free Trial  Request Demo
├ Product Overview     ├ Solutions Overview      ├ E-books
├ AI Overview          ├ Marketing Ops / RevOps  ├ Event Reports
├ Meetings             ├ Demand Gen              ├ Case Studies
├ Event Discovery      ├ CMOs                    ├ Blog
├ Segments             ├ Sales Leaders & CROs    ├ News
└ CRM Integration      ├ Event Marketers         ├ Event Guides
                       └ Field Marketers         └ Best Practice Report
```

Logged-in app paths visible from help articles:

| Path | Purpose |
|---|---|
| `/app/event/{slug}/{uuid}` | Event Details Page (EDP) — attendees, organizations, sponsors, speakers tabs |
| `/app/rsvp/hosted/{meeting-type}` | White-labeled booking page (Meeting Scheduler) |
| Explore → Event Reports | Saved-report dashboard |
| Lists → Segments | Segment builder |
| Lists → Lists | CSV/manual list builder |
| ChatVDX (top nav) | Conversational campaign builder |

## 2. The three-tier attendee status taxonomy

This is Vendelux's central data primitive. Surfaces everywhere — segments, reports, campaigns, exports.

| Status | Definition | Confidence | Used for |
|---|---|---|---|
| **Historic** | Attended in past years | <50% | Strategy, persona development |
| **Predicted** | AI-forecasted from historical patterns, attendee personas, similar events | ~60% average | Early outreach (5-email cadence, no cold calls) |
| **Confirmed** | Verified by organizer, registration list, or LinkedIn post | 90%+ | Day-of execution, pre-event meeting booking, cold-call permitted |

Sub-tier inside Confirmed: **Late Confirmed** = confirmed within 11 days of event. Triggers compressed 3-email cadence with urgency framing.

## 3. Product module deep dive

### 3.1 Event Discovery

**URL**: `/event-discovery/`

**What it is**: Searchable database of 250,000+ B2B events (conferences, summits, trade shows, hosted events, field events, executive gatherings).

**Filters available**:
- Job titles + roles
- Seniority levels
- Industry / market segment
- Company type
- Geographic location
- Buying committees
- Existing customer base
- Open opportunities
- Competitor identification
- Audience-fit "compare-similar-events" matching

**CRM-overlay filters** (when Salesforce/HubSpot connected):
- Deal stage
- Deal value
- Territory
- Owner
- Account segment

**UI elements**:
- "Explore Events" button (primary CTA)
- Filter sidebar
- Event result cards with audience-fit score
- Save-to-planner action

**Marketing claim**: "Cut research time by 90%."

### 3.2 List Builder

**URL**: `/list-builder`

**What it is**: Static and dynamic audience containers that you overlay on the event database. Five list types:

1. **Prospects** — top-of-funnel target accounts
2. **Pipeline** — open deals
3. **Customers** — existing accounts (for renewal/expansion tracking)
4. **Competitors** — for show-tracking
5. **Custom / ABM target lists**

**Creation methods**:
- CSV upload (accounts or contacts)
- One-click Salesforce import
- One-click HubSpot import
- Build by persona (title + seniority + department)
- Build by company set (industry + size + region)
- Mix and match

**Behavior**: Lists update automatically — "without manual maintenance." Every new list auto-generates a matching Segment with the list applied as an inclusion condition.

### 3.3 Segments

**URL**: `/segments` · Help: `/help/how-to-build-and-manage-audiences-with-segments-in-vendelux`

**What it is**: Saved live-updating filters that turn the profile database into actionable audiences. **The single most-used surface** because it loads by default on every event.

**Two segment types** (chosen at creation):
- **Attendee Segments (People)** — filter by job title, seniority, function, location
- **Organization Segments** — filter by industry, size, NAICS codes, competitor status

**Access points**:
1. On every Event Details Page — "Segment selector" dropdown above the Attendees or Organizations grid
2. Lists → Segments tab → "+ New Segment"

**Builder UI**:
- Sidebar with **Include** / **Exclude** toggles per filter
- Live count updates as "X of Y" (matches vs total pool)
- **Job Title matching modes**:
  - Keyword mode (press Enter to add; catches "VP Marketing" + "VP of Marketing")
  - Exact match (dropdown selection)
  - Bulk paste (comma- or line-separated → each becomes individual keyword condition)

**Save actions**:
- "Update segment" — replaces existing conditions
- "Save as new segment" — preserves original + creates variant
- Unsaved-changes prompt on navigation

**Management**:
- **Default Segment**: star icon pins one segment as the default-loaded view across all events
- Column customization: "Manage Columns" icon → show/hide, reorder, resize
- Search matches segment names + creator names
- "Every event loads with default Segment applied — never staring at an unfiltered firehose"
- Reset reverts to saved conditions (never full unfilter)
- Export disabled until a condition or row is selected (no global Clear All)

### 3.4 Meetings (managed-service layer)

**URL**: `/meetings` · Help: `/help/meetings-process-overview`

**What it is**: Vendelux's human + AI hybrid outreach service that books meetings before events. The most differentiated commercial piece — it's a SaaS + services bundle, not pure software.

**Required client inputs**:
- ICP description
- Buyer pain points
- Product capabilities overview
- Calendar availability
- Booth location
- Event offerings details

**Vendelux team expands ICP variations** (e.g., "VP Operations" → catches "Vice President of Operations").

**Cadence timeline**:

| Days before event | Action |
|---|---|
| **28 days** | Outreach begins. Confirmed attendees get 5-email sequence + cold calling. Predicted attendees get 5 emails (no calls). |
| **11 days** | Late-Confirmed sequences trigger — compressed 3-email cadence with urgency. |
| **24 hours** | Reminder emails to booked attendees. |
| **Within 8 hours of booking** | Confirmation email + calendar invite. |

**Outreach principles** (verbatim from product page):
- Humans write and review all messaging
- Relationship-first, not SDR automation
- Brand-true voice
- Calendar invites + briefing notes auto-delivered to sales rep on acceptance

**Unified dashboard tracks**: opens, replies, engagement, confirmed meetings, pending conversations, declined requests, pipeline + revenue impact (native Salesforce/HubSpot sync).

### 3.5 ChatVDX (conversational campaign builder)

**URL access**: Top nav between Home and Explore · Help: `/help/how-to-create-and-manage-meeting-campaigns-with-chatvdx`

**What it is**: Natural-language layer over the Meetings campaign builder. Replaces multi-screen configuration with a chat conversation. Launched 2024–2025.

**Welcome screen**: "What can I help you with?" + 4 quick-start prompts:
1. Help me create a Meetings outreach campaign
2. What campaigns does my team currently have?
3. Show me the details of my latest campaign
4. Create a new campaign using the same settings as my last campaign

**UI furniture**:
- History panel (clock icon, top-left): previous sessions with conversation preview + date
- "New" button (top-right): fresh session
- Message bar (bottom): chat input
- Embedded screenshot file `ChatVDX-Chat-1-1.png` at 1024×754 on the help article

**Campaign creation flow**:
1. **Event selection** — search 250K catalog; if multiple editions, show all upcoming with dates
2. **Configuration** — booth location, booking link, meeting duration, CTA, agent persona (with defaults from last campaign)
3. **Prospect lists** — include/exclude existing lists (cannot create new lists in ChatVDX; must use Segments)
4. **Confirmation summary** — full config display before commit
5. **Sub-campaign auto-generation** — three standard sub-campaigns created automatically:

| Sub-campaign | Audience | Sequence |
|---|---|---|
| Early Confirmed | Verified attendees | 5 emails, starting 28 days out |
| Late Confirmed | Confirmed within 11 days | 3-email compressed sequence |
| All Predicted | High-likelihood prospects | 5 emails |

Plus optional custom sub-campaigns (manual dates/lists).

**Email editing**:
- Generate full sequences on request
- Edit individual emails by position + field without regenerating
- Batch updates across matching sub-campaigns
- Rename sub-campaigns
- Status updates ("Ready to Launch")

**Campaign management via chat**:
- List existing parent campaigns
- Drill into sub-campaign config
- Detect existing campaigns + offer to add new sub-campaign under parent (avoids duplicates)
- Clone previous campaigns

### 3.6 CRM Integration

**URL**: `/crm-integration/` · Help: `/help/crm-integration-features-overview`, `/help/crm-push-guide-for-customers`, `/help/crm-for-all-customer-onboarding-information`

**Supported**: Salesforce, HubSpot (native bidirectional).

**Four primary capabilities**:
1. Targeted ICP list creation from CRM data
2. Pipeline visibility (which attendees work at companies with open deals)
3. Meeting-driven deal-value visualization
4. Bidirectional sync

**List filters tied to CRM**:
- **People lists**: Contact Owner, "Import contacts from CRM" toggle
- **Organization lists**: Deal Stage, Deal Owner, Company Owner, "Import organizations from CRM" toggle

**Event Details Page (EDP) — CRM-aware view**:
- Attendees flagged with deal context (stage, size, close date, deal owner, related contacts, account notes, historical activity)
- "Most recent deal in your CRM" shown per company
- Organization tab toggle (without individual attendee details)

**Two push modes**:

| Mode | Trigger | Where to find it |
|---|---|---|
| **One-time push** | "Export" → "Export to CRM" dropdown on EDP | Per-event, manual |
| **Continuous CRM Sync** | Configured on active Meetings campaigns | Filters by interest type (e.g., "Meeting Booked") + auto-syncs during campaign |

**Salesforce-specific**: pushes to Campaigns. **HubSpot-specific**: pushes to Segments.

**Attribution reporting**:
- Event-sourced opportunities
- Event-accelerated deals
- Event-touched pipeline
- Closed-won by event
- ROI by region, team, or event type

### 3.7 Meeting Scheduler (white-label booking)

**Help**: `/help/how-to-set-up-a-meeting-booking-link-with-the-vendelux-meeting-scheduler`

**What it is**: Calendly-equivalent built into Vendelux. Hosts don't need Vendelux accounts — they just connect a calendar.

**Section header**: "X connected of Y total hosts"
**Action**: "Add Host" button (top right) → fill name + email → system emails connection link

**Connection flow** (host-side):
1. Receives invite link via email/Slack/text
2. Clicks link → selects Google or Microsoft 365
3. OAuth authentication
4. Confirmation screen
5. Status flips to "Connected" with green checkmark + timestamp

**Event Type configuration form**:

| Field | Options |
|---|---|
| Title | Free text (shown to prospects) |
| Duration | 15 / 30 / 45 / 60 minutes |
| Location Type | In Person, Video Conference, Phone |
| Location | Venue details (free text) |
| Conferencing Provider | Google Meet, Microsoft Teams, Zoom |
| Timezone | Host availability zone |
| Available from/until | Daily time windows |

**Auto-generated booking URL format**: `vendelux.com/app/rsvp/hosted/{meeting-type}`

**Behavior**:
- No automatic invite delivery — manual sharing
- Calendar connections persist across all campaigns
- Multiple meeting types per host
- Automated confirmation + calendar invite + reminder cadence (72h / 24h / 4h / 1h)
- Attribution tracked back to campaign source

### 3.8 Event Reports

**Help**: `/help/how-to-create-and-schedule-event-reports-in-vendelux`

**Access path**: Explore → Event Reports tab

**Dashboard columns**: Name | Type | Owner | Frequency | Actions

**Top-of-page controls**:
- Search bar (find reports by name)
- "+ Create report" button (purple primary CTA)
- "Looking for past reports?" legacy link

**Creation flow**:

1. **Report Type**: Competitor / Customer / Prospect / Pipeline (matches list tags)
2. **Filters**:
   - Lists (multi-select)
   - Attendee Status dropdown: Confirmed + Predicted (both default selected)
   - Event Industry Labels (optional)
   - Regions: APAC / EMEA / LATAM / North America (blank = global)
   - Date range: This Month / This Year / Custom (max 1-month lookback)
3. **Schedule & Share**:
   - Frequency dropdown: Once / Weekly / Monthly / Quarterly
   - Recipients: search team members + "Select all" + external email addresses
4. **Review & Save** — sidebar summary, dropdown on Save offers "send immediately"

**Per-row actions (dashboard)**:
- "Download or Send Report" — overview only, no credit cost
- "Download or Send with Attendees" — 1 credit per attendee, Enterprise tier only
- Edit (pencil icon)
- Delete (trash icon)

**XLSX export structure** (multi-tab):

| Tab | Columns |
|---|---|
| Report Parameters | Name, Kind, Generated date, Lists, Status, Date Range, Regions |
| Organizations Analyzed | List Name, List Owner, Organization, Domain |
| Attendee Report | Event, Year, Month, Start/End Date, Total Attendees, Total Matches, Match Rate, Predicted Matches, Confirmed, City/Country/Region, Vendelux Event URL |
| Speaker Report | Same shape as Attendee Report, scoped to speakers |
| Sponsor Report | Aggregate sponsor matches per event |
| Attendees Tab (Enhanced) | Event, dates, Organization, Name, Title, Status, City/Country/Region |
| Speakers Tab (Enhanced) | Mirrors Attendees for speaker details |

**Key metric**: **Match Rate** = (Total Matches ÷ Total Attendees) × 100 — "event saturation percentage" for your list.

Note: results capped at 500 events per category, ordered by match count.

### 3.9 Event ROI Calculator

**Help**: `/help/event-roi-calculator-guide`

**Three input steps**:

| Step | Inputs |
|---|---|
| 1. Lead Opportunity | Event Qualified Leads (default 5% large / 15% niche), Capture Rate (10–30% typical), Lead Close Rate, Customer LTV |
| 2. Event Investment | Sponsorship Spend, Production Spend, T&E, Ticket Spend |
| 3. Advanced (optional) | Brand Value/PR, Existing Customer Value (upsells/renewals), CRM Pipeline Influence (second-touch on active deals) |

**Output metrics**:
- Total Expected Leads
- Total Expected Sales
- Potential Return ($)
- ROI Multiple (revenue ÷ investment)

Framed as "industry placeholder estimates" that users override with their own benchmarks.

### 3.10 AI Overview — Strategy + Booking Agents

**URL**: `/ai-overview`

**Two named agent types**:
- **Strategy Agents** — identify optimal events + high-value prospects for the meeting roadmap
- **Booking Agents** — prospect matching, personalized outreach, reply handling, scheduling

**Workflow**: Find → Engage → Book ("Meetings land directly on your calendar — automatically").

**Data foundation pitched as the moat**: 7 years of historical event data, 250K+ tracked events, 25M+ predicted attendees, real-time event signals.

## 4. Pricing tiers (verified from `/pricing`)

| | **Starter** | **Plus** | **Enterprise** |
|---|---|---|---|
| Target | Startups / small teams | Demand gen / sales leaders / field marketers | Event marketers / MOps / RevOps / organizers |
| Event database access | 250K events | 250K events | 250K events |
| Event insights/month | 20 | Unlimited | Unlimited |
| Lead credits/month | — | 5,000 | Custom |
| Annual meeting credits | — | 50 | Custom |
| CRM integration | Yes | Yes (push to lists/campaigns) | Yes (advanced) |
| Enrichment | — | Free firmographic + contact | Ongoing custom |
| Outreach manager | — | Dedicated | Dedicated Enterprise |
| Client success | Email support | Dedicated CSM | Dedicated Enterprise CSM |
| Event strategy workshops | — | Up to 2 | Custom |
| Hosted-event RSVP pages | — | Unlimited | Unlimited |
| Reports | Event Insight Reports | Event Insight Reports | On-demand + data team support |
| SSO + advanced perms | — | — | Yes |

**Credit system**:
- **Meeting credit** — consumed each time you host a virtual meeting or connect with an attendee (rolls over to next month)
- **Lead credit** — unlocks one comprehensive attendee profile (contact + company + engagement)

**Pricing not posted publicly**. Floor is $15K–$20K/year (per Vendr + G2 + ExhibitorsData), median ~$30K, ceiling $121K–$125K.

## 5. Help center index (every public article)

### Data FAQs

**Acquisition**
- `/help/how-do-you-get-attendee-data`

**Privacy**
- `/help/does-vendelux-provide-documentation-on-privacy-compliance-dpias-policies-or-guidelines`
- `/help/how-is-my-data-used`
- `/help/what-are-the-guidelines-for-using-vendelux-data`
- `/help/what-legal-basis-does-vendelux-rely-on-for-collecting-data`
- `/help/where-can-i-find-detailed-information-about-vendeluxs-data-sources`

**Security**
- `/help/how-does-vendelux-keep-my-data-secure`

**Validity**
- `/help/how-do-you-enrich-and-validate-attendee-contact-details`
- `/help/what-can-i-expect-for-bounce-rates`

**Updating**
- `/help/how-often-is-your-data-updated`

### Navigating Vendelux

**Discover module**
- `/help/creating-your-event-report`

**Drive module**
- `/help/pre-event-outreach-confirmed-attendees`
- `/help/pre-event-outreach-predicted-attendees`
- `/help/meetings-process-overview`

**Platform**
- `/help/adding-a-team-member`
- `/help/crm-for-all-customer-onboarding-information`
- `/help/crm-integration-features-overview`
- `/help/crm-push-guide-for-customers`
- `/help/downloading-attendee-and-sponsorship-data`
- `/help/how-to-build-and-manage-audiences-with-segments-in-vendelux`
- `/help/how-to-create-and-manage-meeting-campaigns-with-chatvdx`
- `/help/how-to-create-and-schedule-event-reports-in-vendelux`
- `/help/how-to-set-up-a-meeting-booking-link-with-the-vendelux-meeting-scheduler`
- `/help/leverage-edp-status`
- `/help/receiving-updates-on-interested-events`
- `/help/reporting-event-data-discrepancies`
- `/help/requesting-an-event`
- `/help/saving-an-event-to-your-planner`
- `/help/segments-best-practices`
- `/help/event-roi-calculator-guide`

### Glossary
- `/help/what-are-vendelux-attendee-statuses-and-what-do-they-mean`
- `/help/what-is-a-credit`
- `/help/what-is-a-super-admin`

## 6. Where to actually see UI screenshots

| Source | What's there | Access |
|---|---|---|
| **vendelux.com homepage** | Hero dashboards: Event Discovery results, EDP attendee grid, ChatVDX chat, Segments builder | Public |
| **vendelux.com/event-discovery** | Filter sidebar + event card grid | Public |
| **vendelux.com/segments** | Segment builder sidebar + matched-count UI | Public |
| **vendelux.com/blog/introducing-chatvdx** | ChatVDX chat screenshot `ChatVDX-Chat-1-1.png` (1024×754) | Public |
| **vendelux.com/help/...** articles | Each Drive/Platform article embeds a Gina Bochis Loom walkthrough showing live UI | Public |
| **vendelux.com/demo** | Demo on-demand request form (gated lead form) | Form submit required |
| **G2 reviews** | Reviewer comments on screens; no embedded screenshots accessible | 403 to scrapers |
| **Capterra** | 0 screenshots in listing | Public, empty |
| **SoftwareWorld** | 0 screenshots | 403 |

**Recommendation for capturing actual screenshots**: open the free trial (`vendelux.com/free-trial`) or request the demo on-demand. The Bochis-narrated Loom walkthroughs on every Platform help article are the highest-fidelity public-facing UI captures — embedded directly in each help page; screen-record those for slides.

## 7. What the help-center index tells us about feature priorities

The article count per module is a tell:

| Module | Help articles | Inference |
|---|---|---|
| CRM Integration | 3 dedicated articles + EDP coverage | Their primary differentiation vs Lensmor — they're betting customers buy on CRM depth |
| Segments | 2 articles + best-practices | Core UX surface — they want users in here daily |
| ChatVDX | 1 long-form article | Newest feature, marketing-heavy push |
| Data FAQs (privacy, security, validity, bounce rates) | 10 articles | Sponsor-buyer objection handling — these are sales-enablement docs disguised as help |
| Meeting Scheduler | 1 article | Lower priority than Meetings managed-service |

The **Data FAQs cluster is the most defensive surface** — sourcing/privacy/bounce-rate questions get the most attention because that's where enterprise buyers push back hardest. Any competitor (including Eventsea) needs equivalent published answers to clear the same enterprise-eval bar.

## 8. Action items for Eventsea council

1. **Build a parity matrix**: the 9 product modules above × Eventsea's roadmap. Where we ship equivalent (e.g., Segments-style ICP filtering), say so on the marketing site. Where we don't (Meeting Scheduler, ChatVDX) — explicit decision: replicate, partner, or ignore?
2. **Match the Data FAQ depth before pitching enterprises**. The 10 published privacy/security/bounce articles set the eval-bar. Without those published, we fail any procurement review.
3. **The V/P/U verdict system is our wedge against H/P/C** — Vendelux's Predicted is explicitly unguaranteed; ours has a verification path. Market this comparison directly on `/vs/vendelux`.
4. **Capture screenshots for the comparison page**: run the demo-on-demand form, screen-record the Bochis walkthroughs, store under `marketing/assets/competitive/vendelux/`. Do this once, cite throughout.
5. **The XLSX-export-with-attendees model is the natural Eventsea analog** — credit-gated per-attendee deep enrichment maps cleanly to our two-tier screening (deep top-10% + light batched everyone).
