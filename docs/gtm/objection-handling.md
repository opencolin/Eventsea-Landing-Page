# Sponsor Objection Handling

> The 8 objections most likely to come up in Sprint 1 sponsor discovery calls + the responses the founder rehearses before Week 2. Every response has two versions: a **short** one (use on calls in the moment) and a **long** one (use in written follow-up). Both are calibrated to a buyer who is skeptical but not hostile.
>
> **2026-06-11 update:** New objection §7 ("Will mine look like BuilderShip's on Day 1?") added post-PRD per `docs/council/gtm-pivot-pm-proposal.md` to mitigate artifact-anchor inflation when leading outbound with the BuilderShip dashboard. Old §7 (white-label / agency reseller) renumbered to §8.
>
> **General rule:** Acknowledge first. Reframe second. Concede when the objection is real (we have no customer ROI data; we are not SOC 2). Don't lie. The honest answer is *also* the highest-converting answer at this stage.

---

## 1. "We already sponsor Luma / Devpost / {{X}} — why do we need another?"

**What they actually mean:** "Justify net-new spend on top of existing event tooling, or I'll deprioritize this."

### Short response (on call)

> "Fair question. Luma's a venue listing and Devpost is a hackathon platform — neither tells you which events are worth sponsoring or measures ROI after. We sit upstream of both: which events to buy + did it pay off. Most of our pilot users keep their Luma / Devpost spend and add us as the *selection* layer."

### Long response (in follow-up)

> Luma and Devpost are great at what they do (event hosting and hackathon ops respectively). Neither is built for the sponsor's perspective — specifically:
>
> - Luma surfaces *events*, not *sponsorship fit*. You can browse Luma all day and not know which 5 events out of 200 are worth $5K of your devrel budget.
> - Devpost surfaces *hackathons you can sponsor*, but doesn't tell you which audience overlap matters or which prior sponsors saw the ROI you want.
>
> Eventsea is the selection + attribution layer. You keep Luma and Devpost; we tell you where to spend on top.
>
> Concretely: in the pilot you'd see audience-overlap %, co-sponsor diligence, and (post-event) attribution data that neither Luma nor Devpost produces.

### Tell signal
If they say "interesting, but Luma is *free* and you're $7.5K" — they're comparing the wrong things. Reframe: "Luma is free for *posting*; the cost is the time + budget you spent picking the wrong event. We're selling that selection."

---

## 2. "We don't have budget for new tools this year"

**What they actually mean:** Could be true, could be a brush-off. Diagnose before you respond.

### Diagnostic question (ask before responding)

> "Got it — is that the events line specifically, or new vendors generally?"

### Short response — IF events line is intact

> "Then I'd reframe: this isn't a new tool, it's a way to spend your existing events line better. The $7.5K is sponsorship intelligence, not net-new SaaS — if it shifts even one of your existing sponsorships from a wasted event to a high-ROI one, it pays for itself in the same line item."

### Short response — IF the events line itself was cut

> "Got it. Is the work just moved to another budget, or is event ROI itself in question?"
>
> *(If "ROI in question":)* "That's actually our pitch — we exist because event ROI is hard to defend. Worth showing the attribution PDF so you can make the case internally to reopen the line?"

### Long response

> Two ways pilots usually get funded when "no new tool budget" is the surface objection:
>
> 1. **The existing-spend reframe.** The pilot redirects sponsorship budget you've already approved; it doesn't add a new line. Same dollars, picked better.
> 2. **The defense reframe.** If event ROI is being questioned internally, the attribution PDF gives you the artifact to defend the line. Many of our pilot candidates use the report as much for internal CFO conversations as for picking events.
>
> Which is the bigger blocker for you — finding a new SKU, or defending the existing line?

---

## 3. "Our procurement requires SOC 2 / vendor security review"

**What they actually mean:** Either a legitimate blocker (large company, real procurement) or a polite "no." Diagnose by company size.

### Diagnostic context (don't ask — infer)
- **<200 employees:** Almost certainly a brush-off. Push back gently.
- **200–1,000:** Mixed; some have real procurement.
- **>1,000:** Real procurement. Don't pretend otherwise.

### Short response — small company

> "Totally fair if your procurement requires it — but for a $7.5K pilot most companies under {{their_size_estimate}} sign off on a direct PO. Is there a path to a credit-card or AP-invoiced pilot under your discretionary threshold, and we revisit SOC 2 when you renew at scale?"

### Short response — large company (honest)

> "Honest answer: we're not SOC 2 today. We're a 1-person company with a pilot product. For larger procurement we'd typically scope a pilot under your discretionary threshold or under a 'data not provided' SOW where nothing sensitive flows through us. Would either of those work?"

### Long response

> Where Eventsea is today on security:
>
> - We don't ingest customer data — the work is sponsor-side research the founder runs against public + curated event data.
> - We don't store sponsor PII in the pilot scope. Attribution data is delivered as PDF, not via dashboard for Package B.
> - SOC 2 is on the roadmap once we have 5+ paying customers; until then we sell to teams who can buy under discretionary thresholds.
>
> For Q3 specifically, here are 3 paths:
> 1. **Discretionary buy:** Package A or B fits most discretionary thresholds we've seen ($5K–$10K).
> 2. **No-PII SOW:** We can scope a contract where no data flows from your team to us — we deliver, you act.
> 3. **Punt to Q4:** If neither works, we revisit after we add SOC 2.

---

## 4. "Show me ROI data from existing customers"

**What they actually mean:** "Prove this works." We have no paying customers yet. Don't pretend otherwise.

### Short response — honest

> "Fair ask. Honest answer: you'd be in our first pilot cohort. We don't have paying-customer ROI data because no one's paid us yet — this pilot *is* how we generate it. What I can show you is the audit corpus and a sample sponsor-fit report so you can judge the work product."

### Long response

> Two things I won't do:
>
> 1. Make up ROI numbers from a customer that doesn't exist.
> 2. Quote a competitor's data as ours.
>
> What I can show you instead:
>
> - **The audit corpus:** ~200 AI-builder events scored on audience composition, sponsor history, organizer reputation. You can pick 5 you've sponsored and check whether our scores match your private outcomes.
> - **A sample sponsor-fit report:** anonymized, full work product. Lets you judge the quality of the analysis you'd get for $7.5K.
> - **A money-back guarantee on delivery, not outcome:** If we miss the 30-day recommendation deadline, the next quarter is free. We won't promise sponsorship ROI for you (we don't run the events), but we'll guarantee what we control.
>
> What we'd ask in exchange: if the pilot works, we want to use you as a named case study (your approval on copy). That's how the next customer gets to see ROI data, and we'll give you 10% off the next quarter for it.

### Tell signal
If they say "come back when you have customers" — that's a no. Don't argue. Ask: "Got it. Can I follow up in 6 weeks when we've completed the first pilot cohort?" Move on.

---

## 5. "We work with {{conference}} directly — why a middleman?"

**What they actually mean:** "I have direct relationships; you're trying to disintermediate me."

### Short response

> "We're not a middleman to the conferences you already sponsor — we don't take a cut of those sponsorships. We're the *intelligence layer* on top: which other 5 events you don't know about are also worth your money, and whether the ones you already sponsor are paying off. Your direct relationships stay direct."

### Long response

> Eventsea is not an agency and not a sponsorship broker. We don't:
>
> - Take a cut of sponsorships you sign with organizers (we charge you the pilot fee, full stop).
> - Replace your direct relationship with any conference.
> - Negotiate sponsorship contracts on your behalf.
>
> We do:
>
> - Find the events you *don't* know about that fit your ICP better than the ones on your current list.
> - Tell you whether the events you already sponsor are worth renewing (post-event attribution).
> - Introduce you to organizers you don't yet know.
>
> If your direct relationships with {{conference}} are working, keep them. We're the layer that finds the next {{conference}} before your competitors do.

---

## 6. "Is this just an aggregator? What's defensible?"

**What they actually mean:** Either a sophisticated buyer doing real diligence, or an investor-adjacent person pattern-matching. Either way, answer honestly.

### Short response

> "Today: curation + delivery. The defensibility hypothesis is two-sided — the more sponsors who pay us for attribution, the better our ranking model gets at predicting which events convert. The more organizers we introduce sponsors to, the more organizers prioritize listing on us first. Neither moat is real on day one — we're testing whether they show up by Q4. Fair concern; I'd rather not handwave it."

### Long response

> The honest framing:
>
> 1. **Day-1 moat:** Curation + work product quality. We do the analysis no one else is bothering to do. That's a service, not a moat.
> 2. **6-month moat (hypothesis):** Two-sided data flywheel. Attribution data from sponsors → better ranking model → better recommendations → more sponsors → more attribution. We're 0/4 on this; the pilot is partly how we test it.
> 3. **12-month moat (aspiration):** Audience graph. We know which builders show up at which events because organizers + sponsors send us check-in / scan data. That graph becomes a real moat — but only if we ship the v2 product.
>
> If you're investing in our defensibility today, you're investing in (1). The pilot price reflects that — it's priced as a service, not as access to a moat that doesn't exist yet.
>
> What I'd push back on: aggregation is sometimes the *right* product at this stage. The buyers we've been talking to don't want a defensible AI model — they want to stop wasting their event sponsorship budget. That's a service problem.

---

## 7. "Will mine look exactly like BuilderShip's on Day 1?"

**What they actually mean:** They saw `list.ship.builders` in touch 1 and assume that's the Day-1 SLA, not the Day-21–28 finished state.

### Short response (on call)

> "It will look like BuilderShip's by Day 14 — the *first cycle* of the same mechanic. BuilderShip's dashboard is what 5 update cycles look like; yours starts as cycle 1. Day 14 you get light tier complete, deep tier complete for the top decile, V/P/U verdicts visible, score columns populated, flags surfaced. Day 21–28 it looks like BuilderShip's. We staged the delivery in the proposal — let me walk you through the Day-1/7/14 milestones."

### Long response (in follow-up)

> Great question — and one we want to set expectations on hard up front because nothing damages a pilot faster than Day-2 expectation drift.
>
> `list.ship.builders` is BuilderShip's *finished* dashboard. It exists because we ran 5 update cycles over the registration window, captured sponsor-side feedback after each, and had access to the host's registration backfill. That polish compounds.
>
> Your Day-14 dashboard is the **first cycle** of the same mechanic:
> - 100% of attendees screened (light tier for ~90%, deep tier for the top decile).
> - V/P/U verdicts (V = identity + company verified; P = identity found, claims unconfirmed; U = unscreenable).
> - Per-sponsor score columns populated (your 3 products with conflict overrides applied).
> - Competitor / investor / sponsor-staff flags surfaced.
> - Filter + sort + search.
> - HubSpot/Salesforce CSV export (Package C).
>
> What gets *better* between Day 14 and Day 21–28 (without us doing more work — it's automatic as RSVPs roll in):
> - Influence rankings stabilize as we re-fetch X/GitHub follower counts.
> - Duplicate-attendee linking improves as more people register.
> - "Claims unconfirmed" rows drop as more web sources catch up.
> - Top-N builders curation runs (Day 21).
>
> The BuilderShip dashboard is the proof point, not the SLA. We promise the Day-14 quality baseline. We deliver the BuilderShip-equivalent polish by Day 28.

### Tell signal

If they say "I need the BuilderShip-level polish by Day 1" — they're underestimating the screening work, but more importantly they're treating this as a brochure-to-product comparison instead of cycle 1 of a 4-cycle process. Push back gently: "BuilderShip took 5 cycles. The first 5 days of BuilderShip looked like what your Day 14 will look like. Same trajectory, same destination — we're not promising to skip the work, we're promising the work delivers."

### When to walk away

If they keep pushing for BuilderShip-level Day 1 even after the staged-delivery walk-through — they want the case study, not the service. They aren't a pilot fit. Politely close: "Sounds like you need a finished reference, not a pilot. Happy to revisit in Q4 when we have 5 closed pilots running." Don't discount, don't bend the SLA.

---

## 8. (Bonus) "Can you white-label this / can our agency resell it?"

**What they actually mean:** They want to skip the buy and become a channel partner.

### Short response

> "Not yet — we're founder-delivered for the first cohort to learn the work. Once we have 5 paying pilots, we'll open a partner program. Happy to keep you on the list for that. For now, the cleanest path is to buy a pilot for your team directly so we can stay focused on getting the core product right."

### Tell signal
If they push hard on the partner path before buying — they're not in ICP. Politely close. Move on.

---

## Cross-cutting principles

1. **Honest > clever.** Every objection here has a "we don't have that yet" answer. Lead with that. The buyers who reject the honest answer were never going to close in Sprint 1.
2. **Don't drop the price below $12.5K on Package B** *(post-PRD pricing, see `sponsor-pilot-offer.md`)*. If they balk at $12.5K, offer Package A at $7.5K — but don't discount B itself, ever. Discounting B teaches the market that the anchor is soft.
3. **Push for a date, not a feeling.** Every objection should end with "what's the next step + when." Otherwise the deal slips silently.
4. **Log every objection.** Per Founder/Ops PM proposal §5 secondary metric: 12 documented sponsor objections feed the Week 5 landing rebuild brief.
