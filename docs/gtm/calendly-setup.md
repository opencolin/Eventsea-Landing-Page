# Calendly Setup Guide — Sprint 1

> Quick guide for the founder to provision 3 Calendly event types before Week 1 of Sprint 1. These URLs feed the `VITE_CALENDLY_URL` env var that release v0.1.1 ("honest-page" — Calendly wire-up) will consume.
>
> **Time to set up:** ~20 minutes.

## Why 3 event types, not 1

Different funnel stages have different time, prep, and outcome needs. One link routes everything to a 30-min slot, which over-allocates time on cold inbound and under-allocates on real prospects. Three event types let the founder match meeting length to expected value.

| Event type | Funnel stage | Length | Calendly slug suggestion |
|---|---|---|---|
| ROI walkthrough | Cold inbound (audit form, Show HN, organic) | 15 min | `roi-walkthrough` |
| Sponsor pilot discovery | Warm replies to outbound sequence | 30 min | `sponsor-pilot-discovery` |
| Audit readout | Post-pilot delivery (customers only) | 45 min | `audit-readout` |

## Event types to create

### 1. Eventsea — 15-min ROI walkthrough

**Use:** Anyone landing from the audit form, Show HN, Twitter, or the homepage CTA. Low-context, low-commitment.

**Settings**
- **Length:** 15 minutes
- **Buffer:** 5 min before, 10 min after
- **Daily cap:** 4 per day (protects sales bandwidth for warm calls)
- **Availability:** Tue–Thu, 10am–4pm PT (windowed to founder's deep-work mornings)
- **Booking page name:** `Eventsea — 15-min ROI walkthrough`
- **Description:** *"A quick walk-through of how Eventsea scores sponsor-fit on 200+ AI-builder events. We'll filter the radar to your ICP, walk through the top 3 events for your team next quarter, and answer questions. Bring: 1 sentence on your ICP."*
- **Required form fields:** Name, work email, company, ICP one-liner, "How did you hear about us?"
- **Confirmation message:** Includes a link to the 4-min Loom + a calendar `.ics` reminder.
- **Reschedule policy:** Allowed up to 1 hour before.

**Placeholder URL:** `https://calendly.com/{{founder_handle}}/roi-walkthrough`

---

### 2. Eventsea — 30-min sponsor pilot discovery

**Use:** Warm replies to the 5-touch outbound sequence. Buyers who've replied or been warm-introed. This is the call the discovery script (`discovery-call-script.md`) is written for.

**Settings**
- **Length:** 30 minutes
- **Buffer:** 10 min before, 15 min after (so you have time to log to the spreadsheet)
- **Daily cap:** 3 per day
- **Availability:** Mon–Fri, 9am–5pm PT (more open than the cold inbound link)
- **Booking page name:** `Eventsea — 30-min sponsor pilot discovery`
- **Description:** *"A 20-min diagnostic call (with 10 min for Q&A) for AI-infra and dev-tool sponsors evaluating event ROI for 2026. We'll cover your 2026 events budget, how you measure ROI today, and walk through which 3–6 events fit your ICP next quarter. Pre-call: I'll send a 4-min Loom 24h ahead — please watch."*
- **Required form fields:** Name, work email, company, title, "Are you the decision-maker for event sponsorships?", "What's your rough 2026 event budget (order of magnitude is fine)?"
- **Confirmation message:** Auto-sends the 4-min Loom + sample sponsor-fit report PDF.
- **Reschedule policy:** Allowed up to 24 hours before.

**Placeholder URL:** `https://calendly.com/{{founder_handle}}/sponsor-pilot-discovery`

---

### 3. Eventsea — 45-min audit readout

**Use:** Post-pilot delivery calls. Customers only. Confirmation manually after pilot signed; don't make this public.

**Settings**
- **Length:** 45 minutes
- **Buffer:** 15 min before, 30 min after
- **Daily cap:** 2 per day
- **Availability:** Mon–Fri, 9am–5pm PT
- **Booking page name:** `Eventsea — 45-min audit readout`
- **Description:** *"Pilot readout call. We'll walk through the recommended events for the quarter, the audience-overlap analysis, and the organizer-intro plan. Bring your team's events lead + anyone who'd review the attribution PDF."*
- **Required form fields:** Name, work email, pilot package (A/B/C), event-team attendees.
- **Confirmation message:** Sends the pilot deliverable PDF as an attachment + the live dashboard link (Package C only).
- **Visibility:** **Secret link.** Founder sends manually after the pilot is signed. Do NOT add to the homepage or 5-touch sequence.

**Placeholder URL:** `https://calendly.com/{{founder_handle}}/audit-readout`

---

## Wiring into the codebase

Once URLs are live, set the env var so release v0.1.1 picks them up:

```bash
# .env.local (and Replit secrets when deployed)
VITE_CALENDLY_URL=https://calendly.com/{{founder_handle}}/roi-walkthrough
```

- The **homepage Book-a-Demo CTA** (`client/src/pages/home.tsx:20`) routes to the **15-min ROI walkthrough** — this is cold inbound, lowest commitment.
- The **5-touch sequence** (`5-touch-sequence.md` merge field `{{calendly_15min_url}}`) routes to the **30-min sponsor pilot discovery** for warm replies — touch 2 onward. **Note:** the merge field name says `15min` but in practice the founder pastes the 30-min URL into outbound. Rename the merge field if confusing.
- The **45-min audit readout** is NOT linked anywhere on the site or in cold outbound. Sent manually post-pilot.

## Founder checklist

- [ ] Create the 3 event types above
- [ ] Connect Google Calendar / Outlook so availability syncs
- [ ] Pick a Calendly handle that matches your existing identity (e.g., `colin-eventsea`)
- [ ] Add the 15-min URL to `VITE_CALENDLY_URL`
- [ ] Replace the 30-min and 45-min URL placeholders in `5-touch-sequence.md` and `sponsor-pilot-offer.md` once known
- [ ] Test booking flow end-to-end (book your own call from an incognito window)
- [ ] (Optional) Wire Calendly webhook → Slack so you get notified of new bookings without checking email

## Open questions to surface

- **Pricing tier of Calendly account:** Free tier allows only 1 event type. The founder will need the **Standard plan ($12/mo)** for 3 event types. Confirm before provisioning.
- **SavvyCal vs Calendly:** SavvyCal has nicer team availability + overlay-with-prospect features. If the founder is already paying for SavvyCal, swap in those URLs; the env-var wiring is identical.
- **Recording / transcript:** Discovery calls should be recorded (Zoom / Riverside / Loom) for the objection-pattern post-mortem in Week 4. Make sure the Calendly confirmation mentions recording so consent is established before the call.
