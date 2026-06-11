import { ArrowRight, Sparkles, Target, MapPin, Radar } from "lucide-react";

export default function MarketplaceLoopSection() {
  const sides = [
    {
      icon: Sparkles,
      title: "Organizers list",
      detail: "Hackathons, meetups, demo days, dev conferences — published with capacity, tracks, sponsor briefs, and venue needs.",
      accent: "from-blue-500 to-blue-700",
      label: "text-blue-300",
    },
    {
      icon: Target,
      title: "Sponsors find",
      detail: "Eventsea matches sponsor budgets to events that fit their ICP. Credits distributed, ROI tracked, attribution closed-loop.",
      accent: "from-emerald-500 to-emerald-700",
      label: "text-emerald-300",
    },
    {
      icon: MapPin,
      title: "Venues fill",
      detail: "Spaces show capacity, AV, and availability. Qualified organizers send pre-vetted inquiries. No cold inbox archaeology.",
      accent: "from-orange-500 to-orange-700",
      label: "text-orange-300",
    },
    {
      icon: Radar,
      title: "Field marketing targets",
      detail: "Every event scored against your ICP. Stack-ranked. \"Why it ranked here\" auditable. Weekly digest per persona.",
      accent: "from-purple-500 to-purple-700",
      label: "text-purple-300",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-purple-300 font-medium">The marketplace loop</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Four sides.
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              One compounding network.
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Each event listed gives sponsors a new target, venues a new booking, and field marketing a new data point. Every loop makes the next one easier.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 lg:gap-2 mb-12">
          {sides.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="glass rounded-2xl p-6 h-full hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${s.accent} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`text-xs uppercase tracking-wider ${s.label}`}>Step {i + 1}</div>
                    <div className="font-bold text-white text-lg leading-tight">{s.title}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{s.detail}</p>
              </div>
              {i < sides.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loop-back callout */}
        <div className="glass rounded-2xl p-6 text-center max-w-3xl mx-auto border border-slate-700/50">
          <div className="text-sm text-slate-400 mb-2">↑ &nbsp; Then it loops back.</div>
          <p className="text-base text-slate-300">
            Field-marketing signal flows back to organizers as audience demand. Venues that host the best events get more sponsor co-op offers. The network compounds with every event.
          </p>
        </div>
      </div>
    </section>
  );
}
