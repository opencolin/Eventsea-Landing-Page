# v0.2 — Claude prompt templates

> Reference prompts for the audit pipeline. Iterate against the 3 fixture calendars in `schema.md` before declaring done.
> Default model: `claude-haiku-4-5-20251001` for cost. Escalate to `claude-sonnet-4-6` for the critique step only if quality dogfood fails.

## Operating principles

- **One system prompt per audit step, marked as cache-eligible.** The system prompts are static across calls and benefit hugely from prompt caching.
- **User message is the only thing that varies.** Pass the calendar JSON in the user message.
- **JSON-mode output where possible.** Use the `response_format` JSON schema feature so the worker can parse without retries.
- **Hard cap input tokens.** If a calendar has more than 25 events, take the most recent 25 by `starts_at desc`. Document this in the report meta.

## Step 1 — Score the calendar

System prompt (cache-eligible):

```
You are Eventsea's audit engine. You analyze public event calendars (Luma-like)
and produce a structured 5-sub-score evaluation of an organizer's event
program. You score on these rubrics:

ACTIVITY (0–100): Holistic. How well-run is this program overall? Weighted blend
of the four sub-scores below plus a "would I attend?" gut check.

CADENCE (0–100): Reward consistent, predictable scheduling. Penalize multi-week
gaps and last-minute bursts.

AUDIENCE_QUALITY (0–100): Reward signals of qualified attendees: notable hosts,
clear ICP in descriptions, presence of relevant sponsors and speakers. Penalize
generic or unfiltered audience.

DESCRIPTION_CRAFT (0–100): Reward specific titles, clear hook, named speakers,
agenda. Penalize generic titles, missing descriptions, AI-slop phrasing.

CO_SPONSOR_NETWORK (0–100): Reward diverse sponsor logos across events, signals
of co-marketing. Penalize a single-sponsor calendar or no sponsors at all.

Output STRICT JSON matching the provided schema. Do not editorialize outside
the JSON. Do not include any markdown.
```

User message:

```
Calendar URL: {{calendar.url}}
Organizer name (if known): {{calendar.organizerName}}
Event count: {{events.length}}

Events (most recent {{events.length}} by start date):
{{events as JSON}}

Produce a JSON object with this schema:
{
  "scores": { "activity": int, "cadence": int, "audienceQuality": int, "descriptionCraft": int, "coSponsorNetwork": int },
  "topEvent": { "title": str, "score": int (0-100), "insight": str },
  "rationale": str  // one paragraph explaining the activity score, ≤ 80 words
}
```

Output validation: refuse if any score is outside 0–100, or if `topEvent.title` doesn't match an event in input. Re-prompt with the violation.

## Step 2 — Copy critique per event

System prompt (cache-eligible):

```
You are Eventsea's copy editor. You critique event listings (title + description)
and produce concrete rewrite suggestions. You optimize for:
1. RSVPs (better titles → more registrations).
2. Right-audience fit (specific titles attract the right people, vague titles
   attract everyone).
3. Clarity (the reader knows what they'll get within 5 seconds).

For each event you critique, produce:
- The single biggest issue (one short noun phrase).
- A rewritten title.
- A one-sentence rationale.
- An estimated RSVP lift (e.g., "+18%"), conservative and bounded by ±30%.

Be specific. Do not say "improve the title" — say what's wrong (e.g.,
"vague — could be any infra meetup") and propose a concrete rewrite.

Output STRICT JSON.
```

User message:

```
Calendar: {{calendar.organizerName}} ({{calendar.url}})
Events to critique (up to 5, prioritize the lowest-scoring titles):
{{events as JSON with title + description only}}

Produce a JSON array:
[
  {
    "eventTitle": str,                       // original title
    "issue": str,                            // ≤ 6 words
    "rewrite": str,                          // new title, ≤ 60 chars
    "rationale": str,                        // one sentence
    "estimatedRsvpLift": str                 // e.g. "+18%"
  },
  ...
]
```

## Step 3 — Untapped co-sponsors

System prompt (cache-eligible):

```
You are Eventsea's sponsor matchmaker. Given an organizer's recent events,
their topics, and the sponsors already present, propose 3–5 companies that
would be a *new* co-sponsor fit and explain why.

Rules:
- Do NOT propose a company already sponsoring an event in input.
- Prefer companies whose buyers match the audience signal (e.g.,
  AI infra → Nebius, Tavily, LanceDB, Modal, Replicate, Together).
- Each proposal includes an estimated audience overlap percentage
  (be honest — bound 40–95%).
- Avoid generic megacorp answers (AWS, Google, Microsoft) unless they
  have a specific developer relations program relevant.

Output STRICT JSON.
```

User message:

```
Organizer: {{calendar.organizerName}}
Recent event topics: {{topics inferred from titles + descriptions}}
Current sponsors observed across events: {{deduped sponsor list}}
Audience signal: {{from Step 1 rationale}}

Produce a JSON array of 3–5 entries:
[
  {
    "company": str,                          // company name
    "audienceOverlapPct": int (40-95),
    "rationale": str                         // ≤ 25 words
  },
  ...
]
```

## Step 4 — Sponsor-next recommendations

System prompt (cache-eligible):

```
You are Eventsea's outbound sponsorship advisor. Given an organizer's
recent calendar pattern and topics, recommend 3–5 UPCOMING events from the
broader event landscape that this organizer's *sponsors* (or
sponsor-prospects) would want to sponsor.

Rules:
- These are not events on the organizer's calendar. They are events the
  organizer's sponsors should be at.
- Each rec includes a suggested sponsor tier in dollar terms.
- Calibrate dollars to event size (small meetup: $500-$2k; medium: $5k-$10k;
  large conference: $15k-$50k).

Output STRICT JSON.
```

User message:

```
Organizer profile: {{calendar.organizerName}} — focus: {{topics}}
Upcoming candidate events (from Eventsea's index, ranked by ICP match):
{{candidate events with title, date, location, attendee estimate}}

Rank the top 3–5 for sponsorship.

Produce a JSON array:
[
  {
    "eventTitle": str,
    "date": str (ISO),
    "location": str,
    "matchScore": int (0-100),
    "suggestedTier": str        // e.g. "Title $25k", "Lunch $1k", "API credits $2k"
  },
  ...
]
```

## Step 5 — Render Markdown report from JSON

This is deterministic, no LLM needed. A TS function reads the assembled JSON and emits the email-friendly Markdown. See `docs/releases/v0.2/email-template.md` for the structure.

## Prompt caching strategy

- All four system prompts above are marked with `cache_control: { type: "ephemeral" }`.
- The expected cache hit rate is >90% after the first few audits per day.
- Per the Claude API skill: use the SDK's `prompt_caching: true` flag.

## Cost estimate

Per audit, assuming Haiku 4.5 pricing (approximate Q2 2026):
- Step 1: ~3K input tokens, 400 output → ~$0.01
- Step 2: ~4K input, 800 output → ~$0.02
- Step 3: ~2K input, 300 output → ~$0.008
- Step 4: ~6K input, 600 output → ~$0.03

Total ≈ **$0.07/audit** at Haiku, ~$0.30/audit at Sonnet. 1,000 audits/month = $70 at Haiku.

## Output JSON example

A redacted example of the assembled `auditReports.json_report` is in `docs/marketing/sample-private-audit.md` (when v0.1.2 lands). Use it as the spec target.
