import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, TrendingUp, Repeat, Users } from "lucide-react";

interface LeadsVsInvoiceSectionProps {
  onJoinBeta: () => void;
}

export default function LeadsVsInvoiceSection({ onJoinBeta }: LeadsVsInvoiceSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 mb-6">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-orange-300">
              The math that doesn&apos;t add up
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-5">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Don&apos;t pay Luma $40,000 to email
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              leads you already have.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Attract 40,000 new ones.
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Event platforms charge by send volume — so the bigger your list gets, the
            more you pay to reach the people <span className="text-white">already on it</span>.
            That&apos;s not growth. It&apos;s rent on your own audience.
          </p>
        </div>

        {/* Proof stat from real data */}
        <div className="glass rounded-2xl p-8 mb-10 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                82%
              </div>
              <div className="mt-2 text-sm text-slate-400 max-w-[16rem]">
                of a 218,000-contact event base were the{" "}
                <span className="text-white">same people</span> showing up event after event
              </div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-slate-700/50" />
            <div className="flex items-center gap-3 text-left max-w-xs">
              <Repeat className="w-8 h-8 text-orange-300 flex-shrink-0" />
              <p className="text-sm text-slate-300">
                Blasting that list again isn&apos;t reach. It&apos;s an echo you keep paying for.
              </p>
            </div>
          </div>
        </div>

        {/* The contrast */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Luma send-volume pricing
              </span>
            </div>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-slate-600 mt-1">—</span>
                You pay more as your list grows
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-600 mt-1">—</span>
                Spend lands on contacts you already own
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-600 mt-1">—</span>
                No idea who&apos;s a real, new, verified lead
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-7">
            <div className="flex items-center gap-2 text-emerald-300 mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Eventsea
              </span>
            </div>
            <ul className="space-y-3 text-slate-200 text-sm">
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Finds new verified builders beyond your list
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Every lead screened — Verified, Partial, or Unscreenable
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Scored against your ICP, not your send count
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={onJoinBeta}
            size="lg"
            className="group h-12 bg-gradient-to-r from-blue-500 to-emerald-500 px-8 text-base font-semibold text-white hover:opacity-90"
          >
            Grow your list, don&apos;t rent it
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
