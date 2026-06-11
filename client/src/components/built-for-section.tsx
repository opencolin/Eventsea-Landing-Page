import { Link as WouterLink } from "wouter";
import { Sparkles, Target, MapPin, Radar, UserCheck, ArrowRight } from "lucide-react";

const audiences = [
  {
    href: "/organizers",
    icon: Sparkles,
    title: "Organizers",
    headline: "List your event. Run it on autopilot.",
    bullets: ["Applications & screening", "Judging, mentors, check-in", "Sponsor briefs & ROI"],
    gradient: "from-blue-500 to-blue-700",
    border: "hover:border-blue-500/40",
    accent: "text-blue-300",
  },
  {
    href: "/sponsors",
    icon: Target,
    title: "Sponsors",
    headline: "Find events that fit your ICP.",
    bullets: ["Audience-matched discovery", "Credit distribution + tracking", "Live ROI dashboard"],
    gradient: "from-emerald-500 to-emerald-700",
    border: "hover:border-emerald-500/40",
    accent: "text-emerald-300",
  },
  {
    href: "/venues",
    icon: MapPin,
    title: "Venues",
    headline: "Fill your calendar with vetted events.",
    bullets: ["Inbound from qualified organizers", "Reviews from real events", "Sponsorship co-op offers"],
    gradient: "from-orange-500 to-orange-700",
    border: "hover:border-orange-500/40",
    accent: "text-orange-300",
  },
  {
    href: "/field-marketing",
    icon: Radar,
    title: "Field Marketing",
    headline: "Stack-rank every conference globally.",
    bullets: ["Hybrid semantic search", "ICP scoring + explainability", "P1/P2/P3 with notes"],
    gradient: "from-purple-500 to-purple-700",
    border: "hover:border-purple-500/40",
    accent: "text-purple-300",
  },
];

export default function BuiltForSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span className="text-sm text-purple-300 font-medium">Built for every side of the table</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              One platform.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Every angle of every event.
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Organizers, sponsors, venues, and field marketing teams all run on the same network. Each side sees value the moment the others show up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((a) => (
            <WouterLink key={a.href} href={a.href} className="block">
              <div className={`glass rounded-2xl p-8 ${a.border} transition-all group cursor-pointer h-full`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${a.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <a.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className={`w-5 h-5 ${a.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className={`text-xs uppercase tracking-wider ${a.accent} mb-2`}>For {a.title}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{a.headline}</h3>
                <ul className="space-y-2">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex items-start space-x-2 text-slate-300">
                      <span className={`${a.accent} mt-1`}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </WouterLink>
          ))}
        </div>

        <WouterLink href="/builders" className="block mt-6">
          <div className="glass rounded-2xl p-6 hover:border-cyan-500/40 transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-cyan-300 mb-0.5">For Builders</div>
                  <div className="text-white font-medium">Discover events. Build a verified profile that travels with you.</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </WouterLink>
      </div>
    </section>
  );
}
