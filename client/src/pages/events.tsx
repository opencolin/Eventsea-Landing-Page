import { useMemo, useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { MapPin, Calendar, Users, DollarSign, Building2, Check } from "lucide-react";

type EventKind = "Hackathon" | "Meetup" | "Demo Day";
type MarketStatus = "sponsor-open" | "venue-needed" | "sold-out" | "newly-listed";

interface EventCard {
  title: string;
  kind: EventKind;
  location: string;
  date: string;
  attendees: string;
  organizer: string;
  gradient: string;
  marketStatuses: MarketStatus[];
  sponsorTiers?: string;
  venue?: string;
}

const eventsSeed: EventCard[] = [
  {
    title: "Frontier AI Hack Week",
    kind: "Hackathon",
    location: "San Francisco, CA",
    date: "Jun 14–16",
    attendees: "500 builders",
    organizer: "Frontier Tower",
    gradient: "from-blue-500 to-emerald-500",
    marketStatuses: ["sponsor-open"],
    sponsorTiers: "Title $25k · Tracks $5k · Lunch $1k",
    venue: "Frontier Tower SF",
  },
  {
    title: "Open Source LLM Meetup",
    kind: "Meetup",
    location: "New York, NY",
    date: "May 22",
    attendees: "120 builders",
    organizer: "Hugging Face Community",
    gradient: "from-emerald-500 to-teal-500",
    marketStatuses: ["sponsor-open", "venue-needed"],
    sponsorTiers: "Food sponsor $500",
  },
  {
    title: "YC Spring Demo Day",
    kind: "Demo Day",
    location: "Remote",
    date: "Jun 5",
    attendees: "3,000 viewers",
    organizer: "Y Combinator",
    gradient: "from-orange-500 to-red-500",
    marketStatuses: ["sold-out"],
  },
  {
    title: "Crypto x Agents Hackathon",
    kind: "Hackathon",
    location: "Denver, CO",
    date: "May 30–Jun 1",
    attendees: "1,200 builders",
    organizer: "ETHDenver",
    gradient: "from-purple-500 to-blue-500",
    marketStatuses: ["sponsor-open", "newly-listed"],
    sponsorTiers: "Booth $10k · API credits sponsor $2k",
    venue: "Mile High Stadium Hall A",
  },
  {
    title: "Bay Area Devtools Night",
    kind: "Meetup",
    location: "San Francisco, CA",
    date: "May 15",
    attendees: "80 builders",
    organizer: "Eventsea Community",
    gradient: "from-pink-500 to-purple-500",
    marketStatuses: ["venue-needed"],
  },
  {
    title: "University Build Showcase",
    kind: "Demo Day",
    location: "Cambridge, MA",
    date: "Jun 8",
    attendees: "400 attendees",
    organizer: "MIT Sandbox",
    gradient: "from-yellow-500 to-orange-500",
    marketStatuses: ["sponsor-open", "newly-listed"],
    sponsorTiers: "Career fair booth $3k",
    venue: "MIT Media Lab",
  },
];

const kindChipColor: Record<EventKind, string> = {
  Hackathon: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  Meetup: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  "Demo Day": "bg-orange-500/10 border-orange-500/30 text-orange-300",
};

const marketBadge: Record<MarketStatus, { label: string; className: string }> = {
  "sponsor-open": { label: "Sponsor open", className: "bg-emerald-500/15 border-emerald-500/30 text-emerald-200" },
  "venue-needed": { label: "Venue needed", className: "bg-orange-500/15 border-orange-500/30 text-orange-200" },
  "sold-out": { label: "Sold out", className: "bg-slate-500/15 border-slate-500/30 text-slate-300" },
  "newly-listed": { label: "New", className: "bg-blue-500/15 border-blue-500/30 text-blue-200" },
};

type Filter = "all" | EventKind | "sponsor-open" | "venue-needed";

const filterLabels: Record<Filter, string> = {
  all: "All events",
  Hackathon: "Hackathons",
  Meetup: "Meetups",
  "Demo Day": "Demo days",
  "sponsor-open": "Looking for sponsors",
  "venue-needed": "Looking for a venue",
};

export default function Events() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
    if (calendlyUrl) {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = "mailto:hello@eventsea.ai?subject=Demo%20request";
  };

  const filtered = useMemo(() => {
    if (filter === "all") return eventsSeed;
    if (filter === "Hackathon" || filter === "Meetup" || filter === "Demo Day") {
      return eventsSeed.filter((e) => e.kind === filter);
    }
    return eventsSeed.filter((e) => e.marketStatuses.includes(filter));
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-emerald-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-300 font-medium">The marketplace</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              Every event,
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              every side, one place.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-2 max-w-3xl mx-auto leading-relaxed">
            Discover events to attend. Find a sponsorship slot. Offer a venue. Score the ones that match your ICP.
          </p>
        </div>
      </section>

      <section className="pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {(Object.keys(filterLabels) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                filter === f
                  ? "bg-blue-500/20 border-blue-500/50 text-white"
                  : "bg-slate-900/40 border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-500"
              }`}
              data-testid={`events-filter-${f}`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group flex flex-col">
                <div className={`h-32 bg-gradient-to-br ${event.gradient} relative`}>
                  <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[60%]">
                    {event.marketStatuses.map((s) => (
                      <span
                        key={s}
                        className={`text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-sm ${marketBadge[s].className}`}
                      >
                        {marketBadge[s].label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium mb-3 w-fit ${kindChipColor[event.kind]}`}>
                    {event.kind}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                    {event.sponsorTiers && (
                      <div className="flex items-start space-x-2">
                        <DollarSign className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{event.sponsorTiers}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-800 text-xs text-slate-500">
                    Organized by {event.organizer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No events match this filter yet. Check back soon.
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <WouterLink href="/organizers" className="glass rounded-2xl p-6 hover:border-blue-500/30 transition-all group cursor-pointer">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-300 mb-2">
                <Check className="w-4 h-4" /> For organizers
              </div>
              <h3 className="text-lg font-bold text-white mb-1">List your event</h3>
              <p className="text-sm text-slate-400">Get matched to sponsors and venues automatically.</p>
            </WouterLink>
            <WouterLink href="/sponsors" className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all group cursor-pointer">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-300 mb-2">
                <Check className="w-4 h-4" /> For sponsors
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Find your ICP</h3>
              <p className="text-sm text-slate-400">Filter every event by audience match and sponsor tier.</p>
            </WouterLink>
            <WouterLink href="/venues" className="glass rounded-2xl p-6 hover:border-orange-500/30 transition-all group cursor-pointer">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-orange-300 mb-2">
                <Check className="w-4 h-4" /> For venues
              </div>
              <h3 className="text-lg font-bold text-white mb-1">List your space</h3>
              <p className="text-sm text-slate-400">Surface to organizers actively planning events near you.</p>
            </WouterLink>
          </div>
        </div>
      </section>

      <Footer />
      <BetaSignupModal isOpen={isBetaModalOpen} onClose={() => setIsBetaModalOpen(false)} />
    </div>
  );
}
