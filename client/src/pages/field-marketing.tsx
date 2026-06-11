import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { Button } from "@/components/ui/button";
import { Search, Sliders, TrendingUp, Bookmark, Mail, FileDown } from "lucide-react";

export default function FieldMarketing() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
    if (calendlyUrl) {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = "mailto:hello@eventsea.ai?subject=Demo%20request%20—%20Field%20Marketing";
  };

  const features = [
    {
      icon: Search,
      title: "Every event, one feed",
      description: "Aggregates Luma, Eventbrite, conference sites, and partner calendars into a single searchable feed. Hybrid semantic search powered by LanceDB.",
    },
    {
      icon: Sliders,
      title: "Score events against your ICP",
      description: "Build custom semantic filters — AI Infra Relevance, Cloud-Native, Enterprise Buyer Density, your own — and stack-rank every event in seconds.",
    },
    {
      icon: TrendingUp,
      title: "\"Why it ranked here\" explainability",
      description: "Every score is auditable. See raw signal, confidence, and adjustment per filter so you can defend the call to your CMO.",
    },
    {
      icon: Bookmark,
      title: "P1 / P2 / P3 with notes",
      description: "Mark events as act, watch, or track. Add free-text rationale. Save filter sets as shared team views (vcluster GTM, Platform Leads, AI Infra Builders).",
    },
    {
      icon: Mail,
      title: "Weekly digest, per persona",
      description: "Each teammate gets a tailored digest of recommended events for their target customer. No more inbox archaeology.",
    },
    {
      icon: FileDown,
      title: "CSV export + CRM sync",
      description: "Push a stack-ranked event list to your team in one click. Export to CSV today, native HubSpot and Salesforce sync coming.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-emerald-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-300 font-medium">For Field Marketing</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              Which events
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              should we care about?
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            The event radar for field marketing teams targeting AI infra, enterprise, and SaaS buyers. AI-ranked, ICP-scored, team-shared — every event your customers attend, in one stack-ranked feed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleJoinBeta}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-blue-500/25 transition-all transform hover:scale-105"
            >
              Get a private radar
            </Button>
            <Button
              variant="outline"
              onClick={handleBookDemo}
              className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800/50 transition-all"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                From 1,000 events to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                the 10 that matter
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mt-4">
              Stop scrolling Luma. Stop reading conference pages. Tell us your ICP — we score every event globally and surface the ones worth your booth budget.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-8 hover:border-blue-500/30 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">How a field marketing radar works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Connect sources", desc: "Luma calendars, Eventbrite, partner conference feeds — all in one place." },
                { step: "2", title: "Define your ICP", desc: "AI infra buyers, platform engineering leads, enterprise SREs. Your taxonomy, your scoring." },
                { step: "3", title: "Score & sort", desc: "Every event ranked against your filter weights with confidence-adjusted scores." },
                { step: "4", title: "Act", desc: "P1/P2/P3 every event. Add a note. Share with your team. Export. Ship." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-lg">
                    {s.step}
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <WouterLink href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to overview
        </WouterLink>
      </section>

      <Footer />
      <BetaSignupModal isOpen={isBetaModalOpen} onClose={() => setIsBetaModalOpen(false)} />
    </div>
  );
}
