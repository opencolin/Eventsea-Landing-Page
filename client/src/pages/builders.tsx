import { useState } from "react";
import { Link as WouterLink } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";
import { Button } from "@/components/ui/button";
import { Compass, UserCheck, Users, Gift, Github, Award } from "lucide-react";

export default function Builders() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const handleJoinBeta = () => setIsBetaModalOpen(true);
  const handleBookDemo = () => {
    window.location.href = "mailto:hello@eventsy.ai?subject=Demo%20request%20—%20Builders";
  };

  const features = [
    {
      icon: Compass,
      title: "One feed for every event",
      description: "Hackathons, meetups, demo days — all discoverable in one place. Filter by stack, track, prize, location, or sponsor.",
    },
    {
      icon: UserCheck,
      title: "A profile that compounds",
      description: "Every event you join adds to a verified builder profile — attendance, rankings, submissions, GitHub commits. It follows you.",
    },
    {
      icon: Users,
      title: "Skill-based team matching",
      description: "Tell us what you can build and what you want to learn. We'll match you with teammates who round out the roster.",
    },
    {
      icon: Gift,
      title: "Sponsor credits, delivered",
      description: "API keys, cloud credits, and promo codes from sponsors land automatically after you're accepted. No form-fills, no Slack DMs.",
    },
    {
      icon: Github,
      title: "Submissions wired to GitHub",
      description: "Ship via the tools you already use. Eventsy verifies your repo, pulls the README, and makes judging easy for the panel.",
    },
    {
      icon: Award,
      title: "Ranking that means something",
      description: "Rubric-based scores from verified judges. Your results on Eventsy travel with you — to recruiters, communities, and your next event.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-slate-950 to-blue-950/20"></div>
        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-300 font-medium">For Builders</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
              Find the events.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Build the career.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover hackathons, meetups, and demo days that match your stack. Get matched to teammates. Build a verified profile that travels with you to the next one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WouterLink href="/events">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-purple-500/25 transition-all transform hover:scale-105">
                Explore events
              </Button>
            </WouterLink>
            <Button
              variant="outline"
              onClick={handleJoinBeta}
              className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800/50 transition-all"
            >
              Create your profile
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Every event you join
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                makes the next one easier
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-8 hover:border-purple-500/30 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <WouterLink href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
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
