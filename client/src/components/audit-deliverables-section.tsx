import { Award, PenLine, Users2, Handshake, BarChart2, MapPinned, Eye } from "lucide-react";

const deliverables = [
  {
    icon: Award,
    title: "Score every event you've run",
    description: "Each event gets a 0–100 rating across cadence, audience quality, description craft, and co-sponsor network. Plus a holistic activity score for your whole calendar.",
    accent: "from-blue-500 to-emerald-500",
  },
  {
    icon: PenLine,
    title: "Copy critique on every listing",
    description: "Rewritten titles. Description gaps flagged. Hook recommendations. Estimated RSVP lift for every change — backed by what's working on similar events.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users2,
    title: "Who you should be inviting",
    description: "Audience recommendations based on past attendees. \"You hit 80% of platform engineering leads in SF — here's the other 20%.\"",
    accent: "from-purple-500 to-blue-500",
  },
  {
    icon: Handshake,
    title: "Co-sponsor matches",
    description: "Companies whose ICP overlaps with yours and would be a fit to co-host. Warm intros teed up — these aren't cold lists.",
    accent: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart2,
    title: "Attendance breakdown",
    description: "Who actually came to each event. Roles, companies, repeat attendance. The honest read on whether your audience matches your pitch.",
    accent: "from-blue-500 to-purple-500",
  },
  {
    icon: MapPinned,
    title: "Events to sponsor next",
    description: "Ranked recommendations of upcoming events where your buyers will be. Sized to your budget — $100 lunch sponsorships through booth packages.",
    accent: "from-emerald-500 to-blue-500",
  },
];

export default function AuditDeliverablesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-blue-300 font-medium">What's in your audit</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Everything Luma doesn't tell you
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              about your own calendar.
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Six concrete deliverables, every one based on what your events actually did. No fluff, no AI hand-waving. Defensible to your CMO.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="glass rounded-2xl p-7 hover:border-blue-500/30 transition-all group">
              <div className={`w-11 h-11 bg-gradient-to-br ${d.accent} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <d.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{d.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>

        {/* Competitor monitoring callout */}
        <div className="mt-10 glass rounded-2xl p-8 border-emerald-500/30 hover:border-emerald-500/50 transition-all">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-emerald-300 mb-2">Bonus · competitor mode</div>
              <h3 className="text-2xl font-bold text-white mb-2">Paste a competitor's calendar instead.</h3>
              <p className="text-slate-300 leading-relaxed">
                Same audit, pointed at someone else. See every event they're running, where, with whom, and what's upcoming on their calendar. Spot the gaps before they do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
