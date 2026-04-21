import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  featured?: boolean;
  ctaLabel: string;
  ctaAction: "beta" | "demo";
  features: string[];
}

const tiers: PricingTier[] = [
  {
    name: "Community",
    tagline: "For small meetups and first-time organizers.",
    price: "Free",
    priceSuffix: "",
    ctaLabel: "Start free",
    ctaAction: "beta",
    features: [
      "Up to 50 attendees per event",
      "1 active event at a time",
      "Application + RSVP forms",
      "Basic check-in dashboard",
      "Community support",
    ],
  },
  {
    name: "Pro",
    tagline: "For hackathons and demo days running at scale.",
    price: "$499",
    priceSuffix: "/ event",
    featured: true,
    ctaLabel: "Start 14-day trial",
    ctaAction: "beta",
    features: [
      "Up to 500 attendees per event",
      "Unlimited events",
      "AI applicant screening",
      "Team formation + matching",
      "Judging system with rubrics",
      "Outcomes analytics + exports",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    tagline: "For VCs, enterprises, and global hackathons.",
    price: "Custom",
    priceSuffix: "",
    ctaLabel: "Talk to sales",
    ctaAction: "demo",
    features: [
      "Unlimited attendees + events",
      "Multi-location mission control",
      "Sponsor ROI dashboards",
      "Sponsor credit distribution",
      "White-label branding",
      "SSO + custom contracts",
      "Dedicated success manager",
    ],
  },
];

export default function Pricing() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    window.location.href = "mailto:hello@eventsy.ai?subject=Scale%20plan%20inquiry";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-emerald-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-300 font-medium">Pricing</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              Free for small events.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Priced by what you ship.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Pick a plan that fits how you run events. Upgrade only when you need scale.
          </p>
          <p className="text-sm text-slate-500">
            Prices shown are draft pricing — final numbers confirmed at beta launch.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`glass rounded-2xl p-8 flex flex-col ${
                  tier.featured
                    ? "border-blue-500/40 shadow-xl shadow-blue-500/10 relative"
                    : ""
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-slate-400 text-sm">{tier.tagline}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-slate-400 ml-2">{tier.priceSuffix}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={tier.ctaAction === "beta" ? handleJoinBeta : handleBookDemo}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                    tier.featured
                      ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-xl shadow-blue-500/25"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  }`}
                >
                  {tier.ctaLabel}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-slate-400 mb-4">
              Questions? Email us at <a href="mailto:hello@eventsy.ai" className="text-blue-400 hover:text-blue-300">hello@eventsy.ai</a>
            </p>
            <WouterLink href="/" className="text-slate-500 hover:text-slate-300 transition-colors">
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
