import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ListingType = "event" | "venue" | "sponsor-interest";
type Status = "idle" | "submitting" | "success" | "error";

interface ListingFormProps {
  listingType: ListingType;
  heading: string;
  subheading: string;
  titlePlaceholder: string;
  detailsPlaceholder: string;
  submitLabel: string;
  accent: "blue" | "emerald" | "orange";
}

const accents = {
  blue: {
    button: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25",
    badge: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    border: "focus:border-blue-500",
  },
  emerald: {
    button: "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/25",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    border: "focus:border-emerald-500",
  },
  orange: {
    button: "from-orange-600 to-emerald-600 hover:from-orange-700 hover:to-emerald-700 shadow-orange-500/25",
    badge: "bg-orange-500/10 border-orange-500/20 text-orange-300",
    border: "focus:border-orange-500",
  },
};

export default function ListingForm({
  listingType,
  heading,
  subheading,
  titlePlaceholder,
  detailsPlaceholder,
  submitLabel,
  accent,
}: ListingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const a = accents[accent];

  const isValid =
    name.trim().length > 0 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()) &&
    title.trim().length > 0;

  const submit = async () => {
    setErrorMessage(null);
    setStatus("submitting");
    try {
      const response = await fetch("/api/marketplace-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingType, name, email, title, details }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Could not submit. Try again.");
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white mb-1 text-lg">You're in the marketplace.</div>
            <div className="text-sm text-slate-300">
              We've received your listing for <span className="text-white font-medium">{title}</span>. You'll hear from us at <span className="text-emerald-300">{email}</span> within 1 business day with next steps.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
      <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium mb-4 ${a.badge}`}>
        Marketplace listing
      </div>
      <h3 className="text-2xl font-bold mb-2">{heading}</h3>
      <p className="text-slate-400 text-sm mb-6">{subheading}</p>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={`bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none ${a.border} transition-colors`}
            data-testid="listing-name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={`bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none ${a.border} transition-colors`}
            data-testid="listing-email"
          />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={titlePlaceholder}
          className={`w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none ${a.border} transition-colors`}
          data-testid="listing-title"
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={detailsPlaceholder}
          rows={4}
          className={`w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none ${a.border} transition-colors resize-none`}
          data-testid="listing-details"
        />

        <Button
          onClick={submit}
          disabled={!isValid || status === "submitting"}
          className={`w-full bg-gradient-to-r ${a.button} text-white py-4 rounded-lg font-semibold text-lg shadow-xl transition-all disabled:opacity-50 disabled:shadow-none`}
          data-testid="listing-submit"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Submitting…
            </>
          ) : (
            submitLabel
          )}
        </Button>

        {status === "error" && errorMessage && (
          <div className="flex items-start gap-2 text-sm text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
