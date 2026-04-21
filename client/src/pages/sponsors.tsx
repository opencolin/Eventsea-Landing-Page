import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { Button } from "@/components/ui/button";
import { Target, BarChart3, KeyRound, Users, TrendingUp, Eye } from "lucide-react";

export default function Sponsors() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    window.location.href = "mailto:hello@eventsy.ai?subject=Demo%20request%20—%20Sponsors";
  };

  const features = [
    {
      icon: Target,
      title: "Reach the right builders",
      description: "Eventsy matches your sponsor budget to events that fit your audience — tech stack, location, size. Skip the cold outreach.",
    },
    {
      icon: KeyRound,
      title: "Credit distribution, verified",
      description: "Drop API keys, promo codes, and credits once. Eventsy delivers them to accepted participants and tracks every allocation.",
    },
    {
      icon: BarChart3,
      title: "Live ROI dashboard",
      description: "Participants reached, submissions built on your API, credits consumed, prizes awarded — attributed to your track, in real time.",
    },
    {
      icon: Eye,
      title: "Sponsor track visibility",
      description: "Role-based judging and submissions views so you see your challenge's output without drowning in everyone else's.",
    },
    {
      icon: Users,
      title: "Post-event audience access",
      description: "Exportable builder lists (with opt-in) so your DevRel team can follow up with the people who shipped on your stack.",
    },
    {
      icon: TrendingUp,
      title: "Renewal-ready reports",
      description: "One-click exports that answer your CFO's only question: what did we get for the spend?",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-blue-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-300 font-medium">For Sponsors</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent">
              Measurable ROI for
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              every sponsored event.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Skip the guesswork. Eventsy matches your dollars to the right hackathons, meetups, and demo days — then shows you exactly what got built on your stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBookDemo}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-emerald-500/25 transition-all transform hover:scale-105"
            >
              Talk to sales
            </Button>
            <WouterLink href="/events">
              <Button
                variant="outline"
                className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800/50 transition-all"
              >
                See upcoming events
              </Button>
            </WouterLink>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Put your budget
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                where builders show up
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-8 hover:border-emerald-500/30 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <WouterLink href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">
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
