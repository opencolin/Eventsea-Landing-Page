import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, ClipboardCheck, Trophy, LifeBuoy, QrCode, BarChart3 } from "lucide-react";

export default function Organizers() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    window.location.href = "mailto:hello@eventsy.ai?subject=Demo%20request%20—%20Organizers";
  };

  const features = [
    {
      icon: Sparkles,
      title: "Event Design Studio",
      description: "Spin up an event page, application flow, tracks, and sponsor briefs in minutes. No spreadsheets, no duct tape.",
    },
    {
      icon: ClipboardCheck,
      title: "AI Applicant Screening",
      description: "Rank applicants against your ideal profile using GitHub and LinkedIn signals. Scale selective events without manual review.",
    },
    {
      icon: LayoutDashboard,
      title: "Mission Control",
      description: "Real-time funnel from registration to check-in, across every location. See drop-off before it hurts you.",
    },
    {
      icon: LifeBuoy,
      title: "Mentor Helpdesk",
      description: "Ticket queue for mentor requests so nothing gets lost in Discord. SLA timers, round-robin assignment, Slack bridge.",
    },
    {
      icon: QrCode,
      title: "On-site Check-in",
      description: "QR check-in, milestone gates, submission deadlines. One dashboard for the whole day.",
    },
    {
      icon: Trophy,
      title: "Judging System",
      description: "Weighted rubrics, multi-round support, role-based visibility for sponsors and judges.",
    },
    {
      icon: BarChart3,
      title: "Outcomes Analytics",
      description: "Export every metric — registrations, submissions, check-in rates, judge scores — after every event.",
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
            <span className="text-sm text-blue-300 font-medium">For Organizers</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              Launch an event in minutes.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Run it on autopilot.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Eventsy is the AI infrastructure for hackathons, meetups, and demo days. Applications, screening, team formation, judging, analytics — one dashboard for every stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleJoinBeta}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-blue-500/25 transition-all transform hover:scale-105"
            >
              Start free
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
                Everything you need,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                from application to afterparty
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-8 hover:border-blue-500/30 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <WouterLink href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
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
