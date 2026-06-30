import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Sparkles } from "lucide-react";

const GlobeCanvas = lazy(() => import("./globe-canvas"));

interface CosmicHeroProps {
  onJoinBeta: () => void;
  onBookDemo: () => void;
}

const LIVE_STATS = [
  { label: "events tracked", value: "250,000+" },
  { label: "verified attendees", value: "1.2M" },
  { label: "cities live tonight", value: "47" },
];

export default function CosmicHero({ onJoinBeta, onBookDemo }: CosmicHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer to next paint so the static gradient renders before the 3D scene boots
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#02030a] text-white">
      {/* Cosmic gradient backdrop — visible before WebGL loads */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 70% 35%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(900px 700px at 20% 70%, rgba(16,185,129,0.18), transparent 65%), radial-gradient(700px 500px at 50% 110%, rgba(167,139,250,0.22), transparent 70%), #02030a",
        }}
      />

      {/* Star/grain noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        {mounted ? (
          <Suspense fallback={null}>
            <GlobeCanvas />
          </Suspense>
        ) : null}
      </div>

      {/* Vignette top + bottom for typography contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(2,3,10,0.85), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-60 z-10"
        style={{ background: "linear-gradient(to top, rgba(2,3,10,0.95), transparent)" }}
      />

      {/* Content overlay */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-32 pb-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                The events operating system
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1.02] tracking-tight">
              <span className="block bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent">
                Every event,
              </span>
              <span className="block bg-gradient-to-r from-sky-400 via-emerald-300 to-violet-400 bg-clip-text text-transparent">
                in orbit.
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-300/90 sm:text-xl">
              Eventsea is the first events platform that runs on{" "}
              <span className="text-white">verified attendee intelligence</span> — pulling Luma,
              HubSpot, Slack, calendar and Resend into one cinematic dashboard. See who&apos;s in
              the room before the room opens.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={onJoinBeta}
                size="lg"
                className="group relative h-12 overflow-hidden bg-white px-7 text-base font-semibold text-slate-950 hover:bg-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start the free audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-sky-400/40 via-violet-400/40 to-emerald-400/40 transition-transform duration-700 group-hover:translate-x-0"
                />
              </Button>

              <Button
                onClick={onBookDemo}
                variant="outline"
                size="lg"
                className="h-12 border-white/15 bg-white/[0.04] px-7 text-base text-white backdrop-blur-md hover:bg-white/[0.08] hover:text-white"
              >
                <Sparkles className="mr-2 h-4 w-4 text-sky-300" />
                Book a live demo
              </Button>
            </div>

            <dl className="grid max-w-md grid-cols-3 gap-6 border-t border-white/5 pt-6">
              {LIVE_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums text-white">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right-side meta panel — sits over the globe but doesn't fight it */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="relative w-full max-w-sm space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/40">
                <Globe2 className="h-3.5 w-3.5 text-sky-300" />
                Live signal
              </div>
              <div className="space-y-3">
                {[
                  {
                    city: "San Francisco",
                    event: "AI Infra Night",
                    verified: 184,
                    accent: "from-sky-400 to-cyan-300",
                  },
                  {
                    city: "Berlin",
                    event: "OSS Summit Pre-party",
                    verified: 92,
                    accent: "from-violet-400 to-fuchsia-300",
                  },
                  {
                    city: "Singapore",
                    event: "Token2049 Side Event",
                    verified: 311,
                    accent: "from-emerald-400 to-lime-300",
                  },
                ].map((row) => (
                  <div
                    key={row.event}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2.5"
                  >
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                        {row.city}
                      </div>
                      <div className="text-sm font-medium text-white">{row.event}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`bg-gradient-to-r ${row.accent} bg-clip-text text-lg font-bold tabular-nums text-transparent`}
                      >
                        {row.verified}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                        verified
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs text-white/50">
                <span>Updated 2s ago</span>
                <span className="text-emerald-300">● live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll affordance */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">scroll</div>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
