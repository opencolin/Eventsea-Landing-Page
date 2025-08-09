import { MapPin, DollarSign, Mic, Clipboard, Mail, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: MapPin,
      title: "AI Venue Finder",
      description: "Finds venues that fit your vibe, budget, and capacity. No more endless venue hunting.",
      gradient: "from-blue-500 to-blue-600",
      hoverColor: "hover:border-blue-500/30"
    },
    {
      icon: DollarSign,
      title: "Sponsorship CRM",
      description: "Auto-generates proposals, sends DocuSign agreements, tracks payments. Revenue on autopilot.",
      gradient: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:border-emerald-500/30"
    },
    {
      icon: Mic,
      title: "Speaker Ops",
      description: "Schedule talks, collect bios, auto-send logistics. Keep speakers happy and organized.",
      gradient: "from-purple-500 to-purple-600",
      hoverColor: "hover:border-purple-500/30"
    },
    {
      icon: Clipboard,
      title: "Run of Show Builder",
      description: "Drag-and-drop agenda with calendar sync. Perfect timing, every time.",
      gradient: "from-blue-500 to-indigo-600",
      hoverColor: "hover:border-blue-500/30"
    },
    {
      icon: Mail,
      title: "Email Engine",
      description: "Sends AI-written emails based on guest preferences and past attendance.",
      gradient: "from-emerald-500 to-teal-600",
      hoverColor: "hover:border-emerald-500/30"
    },
    {
      icon: Users,
      title: "Smart Waitlists",
      description: "Auto-promote high-priority guests and notify instantly. Never miss a VIP.",
      gradient: "from-orange-500 to-red-600",
      hoverColor: "hover:border-orange-500/30"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-sm text-emerald-300 font-medium">What You Get</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              run amazing events
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Eventsy's AI handles the tedious stuff so you can focus on creating memorable experiences for your community.
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
