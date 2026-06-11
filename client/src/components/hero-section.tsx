import { Button } from "@/components/ui/button";
import CalendarAuditForm from "@/components/calendar-audit-form";
import { Star, Sparkles, Users, Building2 } from "lucide-react";

interface HeroSectionProps {
  onJoinBeta: () => void;
  onBookDemo: () => void;
}

export default function HeroSection({ onJoinBeta, onBookDemo }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-emerald-950/20"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: "-3s"}}></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-300 font-medium">The AI-native event engine</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                Paste your Luma calendar.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Get a full AI audit in 3 minutes.
              </span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              Event-by-event scoring. Copy critique. Co-sponsor matches. Attendee breakdown. Sponsor strategy for what to do next. Or paste a <span className="text-emerald-300">competitor's calendar</span> and see what they're up to.
            </p>

            <CalendarAuditForm variant="hero" />

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span>Already know what you want?</span>
              <button
                onClick={onJoinBeta}
                className="text-blue-300 hover:text-blue-200 underline-offset-4 hover:underline transition-colors"
                data-testid="hero-start-free"
              >
                Start free for teams
              </button>
              <span className="text-slate-700">·</span>
              <button
                onClick={onBookDemo}
                className="text-blue-300 hover:text-blue-200 underline-offset-4 hover:underline transition-colors"
                data-testid="hero-book-demo"
              >
                Book a demo
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            {/* Sample audit output */}
            <div className="glass rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Audit · sample</div>
                  <div className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    Frontier Tower SF
                  </div>
                  <div className="text-xs text-slate-500">12 events analyzed · last 90 days</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">78</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Activity score</div>
                </div>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Cadence", v: 82 },
                  { label: "Audience Quality", v: 88 },
                  { label: "Description Craft", v: 64 },
                  { label: "Co-Sponsor Network", v: 71 },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-900/40 rounded-lg p-3 border border-slate-800/50">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">{s.label}</span>
                      <span className="text-white font-semibold">{s.v}</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${s.v}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div className="space-y-2">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-emerald-300 uppercase tracking-wider">Top event</div>
                      <div className="text-sm text-white">AI Infra Night — 94/100 · capacity 180% filled</div>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-orange-300 uppercase tracking-wider">Copy critique</div>
                      <div className="text-sm text-white">Crypto x AI Demo Day — rename to "AI Agents x Crypto Showcase" (+18% est. RSVPs)</div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-blue-300 uppercase tracking-wider">Untapped co-sponsors</div>
                      <div className="text-sm text-white">Nebius, Tavily, LanceDB — 87% audience overlap</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating tooltip */}
            <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 animate-float" style={{animationDelay: "-2s"}}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">5 events to sponsor next</div>
                  <div className="text-xs text-slate-400">Based on your last 12 events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
