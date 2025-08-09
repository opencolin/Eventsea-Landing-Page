import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onJoinBeta: () => void;
  onBookDemo: () => void;
}

export default function HeroSection({ onJoinBeta, onBookDemo }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-emerald-950/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: "-3s"}}></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-300 font-medium">AI Copilot for Event Organizers</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                Planning events
              </span>
              <br />
              <span className="text-slate-400">is hard.</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Eventsy
              </span>{" "}
              <span className="text-white">makes it easy.</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              From venues to sponsors, invites to run-of-show — Eventsy automates the mess so you can focus on building a great experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={onJoinBeta}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:scale-105"
                data-testid="hero-join-beta"
              >
                Join the Beta
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
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern tech conference with speakers presenting" 
              className="rounded-2xl shadow-2xl w-full"
            />
            
            {/* Floating UI elements */}
            <div className="absolute -top-4 -left-4 glass rounded-xl p-4 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Venue Found</div>
                  <div className="text-xs text-slate-400">Perfect match for 200 attendees</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 animate-float" style={{animationDelay: "-2s"}}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Schedule Synced</div>
                  <div className="text-xs text-slate-400">12 speakers confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
