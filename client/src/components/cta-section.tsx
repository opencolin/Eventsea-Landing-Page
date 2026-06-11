import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onJoinBeta: () => void;
  onBookDemo: () => void;
}

export default function CTASection({ onJoinBeta, onBookDemo }: CTASectionProps) {
  const benefits = [
    "Organizers: launch and run any event",
    "Sponsors: target the events your ICP attends",
    "Venues: fill the calendar with vetted inbound",
    "Field marketing: stack-rank every conference globally",
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span className="text-sm text-emerald-300 font-medium">Every side, one platform</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              The event engine
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              for every side of the table.
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-left" data-testid={`benefit-${index}`}>
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onJoinBeta}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-10 py-5 rounded-lg font-bold text-xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:scale-105 hover:-translate-y-1"
              data-testid="cta-join-beta"
            >
              Start free →
            </Button>
            <Button 
              variant="outline"
              onClick={onBookDemo}
              className="border-2 border-slate-600 hover:border-slate-500 text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-slate-800/50 transition-all"
              data-testid="cta-book-demo"
            >
              Book a Demo
            </Button>
          </div>
          
          <p className="text-slate-400 mt-6">Free for small teams • Self-serve in minutes • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}
