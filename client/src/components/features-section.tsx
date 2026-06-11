import { Search, Sliders, BarChart3, BookmarkCheck, Repeat, FileDown } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Hybrid semantic search",
      description: "248 events from 17 sources, indexed in LanceDB. Search by intent (\"platform engineering AI workloads\") or keyword and get the right events in milliseconds.",
      gradient: "from-blue-500 to-blue-600",
      hoverColor: "hover:border-blue-500/30",
    },
    {
      icon: Sliders,
      title: "Score events against your ICP",
      description: "Tunable filters — AI Infra Relevance, Cloud-Native, Enterprise Buyer Density, your own. Sliders recompute the ranking instantly. Even negate filters (\"closed source only\").",
      gradient: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:border-emerald-500/30",
    },
    {
      icon: BarChart3,
      title: "\"Why it ranked here\" explainability",
      description: "Every score breaks down per filter into raw signal, confidence, and adjustment. Defensible to your CMO, debuggable for your analyst.",
      gradient: "from-purple-500 to-purple-600",
      hoverColor: "hover:border-purple-500/30",
    },
    {
      icon: BookmarkCheck,
      title: "P1 / P2 / P3 with notes",
      description: "Mark every event act / watch / track. Drop a rationale. Save filter sets as named team views — vcluster GTM, Platform Leads, AI Infra Builders.",
      gradient: "from-blue-500 to-indigo-600",
      hoverColor: "hover:border-blue-500/30",
    },
    {
      icon: Repeat,
      title: "Sponsor + venue matchmaking",
      description: "Sponsors get surfaced events that match their stack and audience. Venues get inbound from vetted organizers. Two-sided liquidity, AI-routed.",
      gradient: "from-emerald-500 to-teal-600",
      hoverColor: "hover:border-emerald-500/30",
    },
    {
      icon: FileDown,
      title: "CSV export & weekly digest",
      description: "Export your ranked event list in one click. Each teammate gets a personalized weekly digest of events that match their target accounts.",
      gradient: "from-orange-500 to-red-600",
      hoverColor: "hover:border-orange-500/30",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span className="text-sm text-emerald-300 font-medium">The Eventsea engine</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              AI-ranked, ICP-scored,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              team-shared.
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            One engine ingests every event from every source, scores it against your ICP, and routes it to the right side of the table — organizer, sponsor, venue, or field marketer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`glass rounded-2xl p-8 ${feature.hoverColor} transition-all group`} data-testid={`feature-${index}`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
