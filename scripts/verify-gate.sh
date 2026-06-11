#!/usr/bin/env bash
# FR9 password-gate acceptance smoke test.
#
# Drives the running dev server through the 5 gate states the PRD requires:
#   1. /d/:slug with no cookie         -> 302 redirect to login (no lead data)
#   2. /d/:slug/login                  -> 200, zero attendee emails in body
#   3. POST login with wrong password  -> 401 + login form again
#   4. POST login with correct pwd     -> 302 + Set-Cookie: es_event_<id>
#   5. /d/:slug with that cookie       -> 200, dashboard stub renders
#
# Prereqs (one-time):
#   - EVENT_GATE_SECRET set to a 64-hex value
#   - EVENTSEA_BOOTSTRAP_TEST_EVENT=1 (seeds slug=test-slug pw=test-password)
#   - `npm run dev` running on PORT (default 5000)
#
# Usage:
#   bash scripts/verify-gate.sh              # default base URL http://127.0.0.1:5000
#   BASE_URL=https://staging.eventsea.com bash scripts/verify-gate.sh

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:5000}"
SLUG="${TEST_SLUG:-test-slug}"
PASSWORD="${TEST_PASSWORD:-test-password}"
# A sentinel email that we expect to NEVER appear in any gate-served HTML.
# In the bootstrap test event there are zero attendees, so any plausible
# attendee-shaped email is a fine canary.
CANARY_EMAIL="${CANARY_EMAIL:-attendee@example.com}"

COOKIE_JAR="$(mktemp)"
trap 'rm -f "$COOKIE_JAR"' EXIT

pass() { printf "  PASS  %s\n" "$1"; }
fail() { printf "  FAIL  %s\n" "$1"; exit 1; }

echo "verify-gate: base=$BASE_URL slug=$SLUG"

# 1. No cookie -> 302 + zero lead data.
echo "[1/5] GET /d/$SLUG with no cookie"
RESP="$(curl -sS -o /tmp/gate-1.body -w "%{http_code}" -D /tmp/gate-1.hdr \
  "$BASE_URL/d/$SLUG")"
[ "$RESP" = "302" ] || fail "expected 302, got $RESP"
LOC="$(awk 'tolower($1) == "location:" {print $2}' /tmp/gate-1.hdr | tr -d '\r')"
[ "$LOC" = "/d/$SLUG/login" ] || fail "expected Location: /d/$SLUG/login, got '$LOC'"
LEADS="$(grep -c "$CANARY_EMAIL" /tmp/gate-1.body || true)"
[ "$LEADS" = "0" ] || fail "302 body contained attendee data ($LEADS matches)"
pass "302 redirect to login with no attendee data in body"

# 2. Login page renders, zero lead data.
echo "[2/5] GET /d/$SLUG/login"
RESP="$(curl -sS -o /tmp/gate-2.body -w "%{http_code}" "$BASE_URL/d/$SLUG/login")"
[ "$RESP" = "200" ] || fail "expected 200, got $RESP"
grep -q "<form" /tmp/gate-2.body || fail "login page did not contain a form"
LEADS="$(grep -c "$CANARY_EMAIL" /tmp/gate-2.body || true)"
[ "$LEADS" = "0" ] || fail "login page contained attendee data ($LEADS matches)"
pass "login page 200 + form + zero attendee data"

# 3. Wrong password -> 401.
echo "[3/5] POST /d/$SLUG/login with wrong password"
RESP="$(curl -sS -o /tmp/gate-3.body -w "%{http_code}" \
  -X POST \
  -d "password=this-is-wrong&subject=test-runner" \
  "$BASE_URL/d/$SLUG/login")"
[ "$RESP" = "401" ] || fail "expected 401, got $RESP"
grep -qi "incorrect" /tmp/gate-3.body || fail "401 body missing error indicator"
pass "401 + login form re-rendered"

# 4. Correct password -> 302 + Set-Cookie.
echo "[4/5] POST /d/$SLUG/login with correct password"
RESP="$(curl -sS -o /tmp/gate-4.body -w "%{http_code}" -D /tmp/gate-4.hdr \
  -c "$COOKIE_JAR" \
  -X POST \
  -d "password=$PASSWORD&subject=test-runner" \
  "$BASE_URL/d/$SLUG/login")"
[ "$RESP" = "302" ] || fail "expected 302, got $RESP"
LOC="$(awk 'tolower($1) == "location:" {print $2}' /tmp/gate-4.hdr | tr -d '\r')"
[ "$LOC" = "/d/$SLUG" ] || fail "expected Location: /d/$SLUG, got '$LOC'"
grep -qi "^set-cookie: es_event_" /tmp/gate-4.hdr || fail "missing es_event_<id> Set-Cookie"
pass "302 to dashboard + Set-Cookie issued"

# 5. With cookie -> 200 dashboard stub.
echo "[5/5] GET /d/$SLUG with cookie"
RESP="$(curl -sS -o /tmp/gate-5.body -w "%{http_code}" \
  -b "$COOKIE_JAR" \
  "$BASE_URL/d/$SLUG")"
[ "$RESP" = "200" ] || fail "expected 200, got $RESP"
grep -q "Event dashboard" /tmp/gate-5.body || fail "dashboard stub body missing expected heading"
pass "authenticated dashboard renders"

echo
echo "verify-gate: ALL 5 STEPS PASSED"
