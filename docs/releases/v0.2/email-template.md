# v0.2 — Audit email template

> Resend transactional template for the audit delivery email.
> Built around the `audit_reports.json_report` JSON.
> Sent from `audits@eventsea.ai` (requires DKIM/SPF setup on the domain — see deployment doc).

## Subject

`Your Eventsea audit for {{organizerName}} — score {{activityScore}}/100`

Reasoning: the score in the subject line is the highest-clicking element. People click to find out if 78 is good or bad.

## Preview text (≤140 chars)

`{{topEventTitle}} was your strongest event. We found {{untappedCoSponsorCount}} untapped co-sponsors and {{copyCritiqueCount}} title rewrites worth {{estimatedRsvpLiftRange}} RSVPs.`

## HTML body skeleton

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Your Eventsea Audit</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; background: #020617; color: #f1f5f9; margin: 0; padding: 32px 16px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px;">

        <!-- Brand bar -->
        <tr><td style="padding: 0 0 24px 0;">
          <span style="font-size: 18px; font-weight: 700; background: linear-gradient(90deg, #60a5fa, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Eventsea</span>
        </td></tr>

        <!-- Hero -->
        <tr><td style="padding: 24px; background: #0f172a; border-radius: 16px;">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 8px;">Audit for</div>
          <div style="font-size: 22px; font-weight: 600; color: #f8fafc; margin-bottom: 16px;">{{organizerName}}</div>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="vertical-align: top;">
                <div style="font-size: 56px; font-weight: 700; line-height: 1; background: linear-gradient(90deg, #60a5fa, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{{activityScore}}</div>
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-top: 4px;">Activity score</div>
              </td>
              <td style="vertical-align: top; padding-left: 24px;">
                <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 4px;">Cadence: <strong>{{cadenceScore}}</strong></div>
                <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 4px;">Audience quality: <strong>{{audienceQualityScore}}</strong></div>
                <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 4px;">Description craft: <strong>{{descriptionCraftScore}}</strong></div>
                <div style="font-size: 13px; color: #cbd5e1;">Co-sponsor network: <strong>{{coSponsorNetworkScore}}</strong></div>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="height: 24px;"></td></tr>

        <!-- Top event -->
        <tr><td style="padding: 20px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #34d399; margin-bottom: 8px;">Top event</div>
          <div style="font-size: 16px; color: #f8fafc; margin-bottom: 6px;"><strong>{{topEventTitle}}</strong> — {{topEventScore}}/100</div>
          <div style="font-size: 14px; color: #cbd5e1; line-height: 1.5;">{{topEventInsight}}</div>
        </td></tr>

        <tr><td style="height: 16px;"></td></tr>

        <!-- Copy critique (loop over top 3) -->
        <tr><td style="padding: 20px; background: rgba(249, 115, 22, 0.08); border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #fb923c; margin-bottom: 12px;">Copy critique — top {{copyCritiqueCount}} listings</div>
          {{#each copyCritique}}
          <div style="margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid rgba(249, 115, 22, 0.15);">
            <div style="font-size: 14px; color: #cbd5e1;"><strong>{{eventTitle}}</strong></div>
            <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">{{issue}}</div>
            <div style="font-size: 14px; color: #f8fafc; margin-top: 4px;">→ <em>{{rewrite}}</em></div>
            <div style="font-size: 12px; color: #fb923c; margin-top: 4px;">Est. lift: {{estimatedRsvpLift}}</div>
          </div>
          {{/each}}
        </td></tr>

        <tr><td style="height: 16px;"></td></tr>

        <!-- Untapped co-sponsors -->
        <tr><td style="padding: 20px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #60a5fa; margin-bottom: 12px;">Untapped co-sponsors</div>
          {{#each untappedCoSponsors}}
          <div style="font-size: 14px; color: #f8fafc; margin-bottom: 6px;">
            <strong>{{company}}</strong> — {{audienceOverlapPct}}% audience overlap.
            <span style="color: #94a3b8;">{{rationale}}</span>
          </div>
          {{/each}}
        </td></tr>

        <tr><td style="height: 16px;"></td></tr>

        <!-- Sponsor-next -->
        <tr><td style="padding: 20px; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #a78bfa; margin-bottom: 12px;">Events to sponsor next</div>
          {{#each sponsorNext}}
          <div style="margin-bottom: 14px;">
            <div style="font-size: 14px; color: #f8fafc;"><strong>{{eventTitle}}</strong></div>
            <div style="font-size: 12px; color: #94a3b8;">{{date}} · {{location}} · match {{matchScore}}/100 · suggested tier: {{suggestedTier}}</div>
          </div>
          {{/each}}
        </td></tr>

        <tr><td style="height: 24px;"></td></tr>

        <!-- CTA -->
        <tr><td align="center" style="padding: 0;">
          <a href="https://eventsea.ai/r/{{publicSlug}}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(90deg, #2563eb, #059669); color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">View the full report →</a>
        </td></tr>

        <tr><td style="height: 32px;"></td></tr>

        <!-- Footer -->
        <tr><td align="center" style="font-size: 12px; color: #475569; line-height: 1.7;">
          Eventsea · The AI-native event engine<br />
          You requested this audit at <a href="https://eventsea.ai" style="color: #60a5fa; text-decoration: none;">eventsea.ai</a>.<br />
          Have feedback? Reply to this email — we read every one.
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
```

## Plain-text body

Always include the plaintext alternative for deliverability + accessibility:

```
EVENTSEA AUDIT — {{organizerName}}

ACTIVITY SCORE: {{activityScore}}/100

Sub-scores:
- Cadence: {{cadenceScore}}
- Audience quality: {{audienceQualityScore}}
- Description craft: {{descriptionCraftScore}}
- Co-sponsor network: {{coSponsorNetworkScore}}

TOP EVENT
{{topEventTitle}} — {{topEventScore}}/100
{{topEventInsight}}

COPY CRITIQUE
{{#each copyCritique}}
- {{eventTitle}}: {{issue}}
  Suggested rewrite: {{rewrite}}
  Estimated RSVP lift: {{estimatedRsvpLift}}
{{/each}}

UNTAPPED CO-SPONSORS
{{#each untappedCoSponsors}}
- {{company}} ({{audienceOverlapPct}}% overlap) — {{rationale}}
{{/each}}

EVENTS TO SPONSOR NEXT
{{#each sponsorNext}}
- {{eventTitle}} — {{date}}, {{location}}, match {{matchScore}}/100, suggested tier {{suggestedTier}}
{{/each}}

VIEW FULL REPORT
https://eventsea.ai/r/{{publicSlug}}

—
Eventsea · The AI-native event engine
Reply to this email with feedback. We read every one.
```

## Sending

- Resend API: `POST /emails` with `from: "audits@eventsea.ai"`, `reply_to: "hello@eventsea.ai"`.
- Persist `resend.id` to `audit_deliveries.resend_message_id`.
- On `resend.error`, write to `audit_deliveries.status = 'failed'` and enqueue a retry (up to 3 attempts).
- On bounce webhook from Resend, write to `audit_deliveries.status = 'bounced'`.

## Test checklist

Before declaring done:
- [ ] Render in Gmail, Apple Mail, Outlook web — gradient colors should not break the layout
- [ ] Plain-text fallback fires when HTML disabled
- [ ] Link to `/r/:slug` resolves to the public report page
- [ ] Spam-score under 4 (use mail-tester.com)
- [ ] DKIM + SPF + DMARC pass on `eventsea.ai`
- [ ] Unsubscribe link present (legal requirement); send-list is opt-in only via the audit form
