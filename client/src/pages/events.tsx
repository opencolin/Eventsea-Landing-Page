import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { MapPin, Calendar, Users } from "lucide-react";

type EventKind = "Hackathon" | "Meetup" | "Demo Day";

interface EventCard {
  title: string;
  kind: EventKind;
  location: string;
  date: string;
  attendees: string;
  organizer: string;
  gradient: string;
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
  },
  {
    title: "Open Source LLM Meetup",
    kind: "Meetup",
    location: "New York, NY",
    date: "May 22",
    attendees: "120 builders",
    organizer: "Hugging Face Community",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "YC Spring Demo Day",
    kind: "Demo Day",
    location: "Remote",
    date: "Jun 5",
    attendees: "3,000 viewers",
    organizer: "Y Combinator",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Crypto x Agents Hackathon",
    kind: "Hackathon",
    location: "Denver, CO",
    date: "May 30–Jun 1",
    attendees: "1,200 builders",
    organizer: "ETHDenver",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Bay Area Devtools Night",
    kind: "Meetup",
    location: "San Francisco, CA",
    date: "May 15",
    attendees: "80 builders",
    organizer: "Eventsy Community",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "University Build Showcase",
    kind: "Demo Day",
    location: "Cambridge, MA",
    date: "Jun 8",
    attendees: "400 attendees",
    organizer: "MIT Sandbox",
    gradient: "from-yellow-500 to-orange-500",
  },
];

const kindChipColor: Record<EventKind, string> = {
  Hackathon: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  Meetup: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  "Demo Day": "bg-orange-500/10 border-orange-500/30 text-orange-300",
};

export default function Events() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    window.location.href = "mailto:hello@eventsy.ai?subject=Demo%20request";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-emerald-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-300 font-medium">Upcoming Events</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              Every event,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              one place.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Hackathons, meetups, and demo days powered by Eventsy. Apply in one click. Show up with a verified profile.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsSeed.map((event, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group">
                <div className={`h-32 bg-gradient-to-br ${event.gradient}`}></div>
                <div className="p-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium mb-3 ${kindChipColor[event.kind]}`}>
                    {event.kind}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-400">
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
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
                    Organized by {event.organizer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16 glass rounded-2xl p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Running an event?</h2>
            <p className="text-slate-300 mb-6">
              List your hackathon, meetup, or demo day on Eventsy. Reach thousands of verified builders and matching sponsors.
            </p>
            <WouterLink href="/organizers" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              See how it works →
            </WouterLink>
          </div>
        </div>
      </section>

      <Footer />
      <BetaSignupModal isOpen={isBetaModalOpen} onClose={() => setIsBetaModalOpen(false)} />
    </div>
  );
}
