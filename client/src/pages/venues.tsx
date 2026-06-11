import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { Button } from "@/components/ui/button";
import { CalendarRange, Compass, ShieldCheck, BadgeDollarSign, Star, Camera } from "lucide-react";
import ListingForm from "@/components/listing-form";

export default function Venues() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    window.location.href = "mailto:hello@eventsea.ai?subject=Demo%20request%20—%20Venues";
  };

  const features = [
    {
      icon: Compass,
      title: "Get discovered by real organizers",
      description: "Eventsea matches organizers planning hackathons, meetups, demo days, and dev conferences to venues that fit their capacity, vibe, and budget. No more cold outreach.",
    },
    {
      icon: CalendarRange,
      title: "Open calendar, instant inquiries",
      description: "Show your availability in real time. Organizers send qualified inquiries with attendee count, AV needs, and date — not vague 'what are your rates?' emails.",
    },
    {
      icon: Camera,
      title: "A profile built for tech events",
      description: "Layout photos, capacity by configuration, AV inventory, power load, Wi-Fi specs, catering partners. Everything technical organizers ask for, answered upfront.",
    },
    {
      icon: Star,
      title: "Reviews from real events",
      description: "Every event that happens at your space generates a verified review from the organizer. Reputation that compounds with every booking.",
    },
    {
      icon: BadgeDollarSign,
      title: "Sponsorship co-op",
      description: "Eventsea can pair your venue with sponsor credit packages — free space in exchange for sponsor exposure. Fill empty weeknights with high-quality builder events.",
    },
    {
      icon: ShieldCheck,
      title: "Vetted organizers only",
      description: "Every organizer reaching out is verified by Eventsea. No tire-kickers, no scams. Inquiries are pre-qualified against your size, format, and price range.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-slate-950 to-emerald-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-orange-300 font-medium">For Venues</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-orange-100 to-emerald-100 bg-clip-text text-transparent">
              Fill your calendar.
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
              Skip the cold inbound.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            List your space on Eventsea. Get matched with vetted organizers planning hackathons, demo days, meetups, and dev conferences — pre-qualified by capacity, AV, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleJoinBeta}
              className="bg-gradient-to-r from-orange-600 to-emerald-600 hover:from-orange-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-orange-500/25 transition-all transform hover:scale-105"
            >
              List your venue
            </Button>
            <Button
              variant="outline"
              onClick={handleBookDemo}
              className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800/50 transition-all"
            >
              Talk to us
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Built for venues that
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
                host technical events
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mt-4">
              Coworking floors, lofts, conference centers, restaurants, hacker houses — if you host tech events, Eventsea puts you in front of the right organizers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-8 hover:border-orange-500/30 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">List your space.</span>{" "}
              <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">Get matched to organizers.</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Give us the basics and we'll surface your venue to organizers actively planning events that fit your capacity, vibe, and budget.
            </p>
          </div>
          <ListingForm
            listingType="venue"
            heading="Tell us about your venue"
            subheading="Name + email so we can reach you, plus a short description of the space."
            titlePlaceholder="Venue name (e.g., Frontier Tower SF — 7th floor)"
            detailsPlaceholder="Capacity by layout, location, AV setup, Wi-Fi, catering, typical rate range, dates available."
            submitLabel="List my venue"
            accent="orange"
          />
          <div className="text-center mt-10">
            <WouterLink href="/" className="text-orange-400 hover:text-orange-300 transition-colors">
              ← Back to overview
            </WouterLink>
          </div>
        </div>
      </section>

      <Footer />
      <BetaSignupModal isOpen={isBetaModalOpen} onClose={() => setIsBetaModalOpen(false)} />
    </div>
  );
}
