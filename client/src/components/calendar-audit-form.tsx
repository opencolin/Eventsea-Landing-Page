import { useState } from "react";
import { Calendar, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarAuditFormProps {
  variant?: "hero" | "section";
}

type Status = "idle" | "submitting" | "needs-email" | "success" | "error";

export default function CalendarAuditForm({ variant = "hero" }: CalendarAuditFormProps) {
  const [calendarUrl, setCalendarUrl] = useState("");
  const [auditType, setAuditType] = useState<"own" | "competitor">("own");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (withEmail: boolean) => {
    setErrorMessage(null);
    setStatus("submitting");
    try {
      const response = await fetch("/api/calendar-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calendarUrl,
          auditType,
          email: withEmail ? email : undefined,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Could not submit. Try again.");
      }
      if (withEmail) {
        setStatus("success");
      } else {
        setStatus("needs-email");
      }
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  const isUrlValid = /^https?:\/\/.+/i.test(calendarUrl.trim());
  const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  if (status === "success") {
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
    return (
      <div className={`glass rounded-2xl p-6 ${variant === "hero" ? "" : "max-w-2xl mx-auto"}`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white mb-1">Audit queued.</div>
            <div className="text-sm text-slate-300">
              Our team will hand-craft your audit and email it to{" "}
              <span className="text-emerald-300">{email}</span> within 5 business days. Each report
              is white-glove: event-by-event scoring, copy feedback, co-sponsor matches, and a
              sponsor-strategy report — written by a human operator with the radar tool, not a
              generic AI summary.
            </div>
            <div className="text-sm text-slate-300 mt-3">
              Want to skip the queue?{" "}
              <a
                href={calendlyUrl ?? "mailto:hello@eventsea.ai?subject=15-min%20audit%20call"}
                target={calendlyUrl ? "_blank" : undefined}
                rel={calendlyUrl ? "noopener noreferrer" : undefined}
                className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
                data-testid="audit-success-book-call"
              >
                Book a 15-min call
              </a>{" "}
              and we'll walk you through it live.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "needs-email") {
    return (
      <div className={`glass rounded-2xl p-6 ${variant === "hero" ? "" : "max-w-2xl mx-auto"}`}>
        <div className="text-sm text-slate-300 mb-3">
          Calendar received. Drop your email and we'll send the full audit.
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            data-testid="audit-email-input"
          />
          <Button
            onClick={() => submit(true)}
            disabled={!isEmailValid || status === ("submitting" as Status)}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 rounded-lg font-semibold"
            data-testid="audit-email-submit"
          >
            Send my audit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass rounded-2xl p-6 ${variant === "hero" ? "" : "max-w-2xl mx-auto"}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="inline-flex bg-slate-900/60 border border-slate-700 rounded-lg p-1 text-xs">
          <button
            onClick={() => setAuditType("own")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              auditType === "own" ? "bg-blue-500/20 text-blue-200" : "text-slate-400 hover:text-slate-200"
            }`}
            data-testid="audit-type-own"
          >
            My calendar
          </button>
          <button
            onClick={() => setAuditType("competitor")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              auditType === "competitor" ? "bg-emerald-500/20 text-emerald-200" : "text-slate-400 hover:text-slate-200"
            }`}
            data-testid="audit-type-competitor"
          >
            A competitor's
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Calendar className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="url"
            value={calendarUrl}
            onChange={(e) => setCalendarUrl(e.target.value)}
            placeholder="lu.ma/your-calendar or lu.ma/your-event"
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            data-testid="audit-url-input"
          />
        </div>
        <Button
          onClick={() => submit(false)}
          disabled={!isUrlValid || status === "submitting"}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-4 rounded-lg font-semibold whitespace-nowrap shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none"
          data-testid="audit-submit"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Auditing…
            </>
          ) : (
            <>Audit my calendar →</>
          )}
        </Button>
      </div>

      {status === "error" && errorMessage && (
        <div className="flex items-start gap-2 mt-3 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="text-xs text-slate-500 mt-3">
        Free · No signup to start · Paste a Luma calendar or any Luma event URL — we'll find the calendar from the event page
      </div>
    </div>
  );
}
