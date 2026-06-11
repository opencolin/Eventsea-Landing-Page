import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                Stop guessing which conferences
              </span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                are worth it.
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-4 leading-relaxed max-w-xl">
              AI-ranked, ICP-scored, team-shared. Every event your customers attend, in one stack-ranked feed.
            </p>

            <p className="text-base text-slate-400 mb-8 max-w-xl">
              Built for the whole event industry: <span className="text-blue-300">organizers</span> list, <span className="text-emerald-300">sponsors</span> find, <span className="text-orange-300">venues</span> fill, and <span className="text-purple-300">field marketing teams</span> target.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={onJoinBeta}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:scale-105"
                data-testid="hero-join-beta"
              >
                Start free
              </Button>
              <Button
                variant="outline"
                onClick={onBookDemo}
                className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800/50 transition-all"
                data-testid="hero-book-demo"
              >
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Free for small teams</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            {/* Product mock that hints at the radar UI from the actual product */}
            <div className="glass rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Event radar</div>
                  <div className="text-lg font-semibold">Which events should we care about?</div>
                </div>
                <div className="text-xs text-slate-400">248 events · 17 sources</div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {["AI Infra Relevance", "Cloud-Native / SRE", "Enterprise Buyer Density", "OSS / Community"].map((f) => (
                  <span key={f} className="text-[11px] px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">{f}</span>
                ))}
              </div>

              {[
                {
                  rank: 1,
                  title: "AWS Summit NYC w/ Rootly, Cloudsmith, Mend.io, ClickHouse",
                  meta: "2026-06-17 · New York, NY · 60 builders",
                  score: 34,
                  bars: [90, 82, 71, 88, 60, 84, 75],
                  badge: "P1 act",
                  badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
                },
                {
                  rank: 2,
                  title: "DASH After-Hours — Rootly, Google Cloud, Chronosphere, Palo Alto",
                  meta: "2026-06-10 · New York, NY",
                  score: 32,
                  bars: [78, 70, 65, 80, 55, 76, 70],
                  badge: "P2 watch",
                  badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/30",
                },
                {
                  rank: 3,
                  title: "LLM Paper Club @ Latent.Space",
                  meta: "2026-06-10 · Hosted by swyx",
                  score: 28,
                  bars: [60, 88, 50, 55, 90, 45, 95],
                  badge: "P3 track",
                  badgeClass: "bg-slate-500/15 text-slate-300 border-slate-500/30",
                },
              ].map((row) => (
                <div key={row.rank} className="bg-slate-900/40 rounded-xl p-4 mb-3 border border-slate-800/50">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="text-slate-500 font-mono text-sm pt-0.5">{row.rank}</div>
                      <div>
                        <div className="text-sm font-medium text-white leading-snug">{row.title}</div>
                        <div className="text-[11px] text-slate-500 mt-1">{row.meta}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${row.badgeClass}`}>{row.badge}</span>
                      <span className="text-sm font-semibold text-white">{row.score}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {row.bars.map((v, i) => (
                      <div key={i} className="h-1 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${v}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>LanceDB hybrid · ICP-weighted</span>
                <span className="text-blue-300">Export CSV →</span>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 glass rounded-xl p-4 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Ranked #1 for AI Infra ICP</div>
                  <div className="text-xs text-slate-400">Score 34 · confidence 78%</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 animate-float" style={{animationDelay: "-2s"}}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">3 sponsors interested</div>
                  <div className="text-xs text-slate-400">Synced from sponsor matchmaking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
