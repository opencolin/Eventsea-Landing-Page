import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onJoinBeta: () => void;
  onBookDemo: () => void;
}

export default function Navigation({ onJoinBeta, onBookDemo }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              EventPilot
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-white transition-colors"
              data-testid="nav-features"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('integrations')}
              className="text-slate-300 hover:text-white transition-colors"
              data-testid="nav-integrations"
            >
              Integrations
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-slate-300 hover:text-white transition-colors"
              data-testid="nav-testimonials"
            >
              Testimonials
            </button>
            <Button 
              onClick={onBookDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              data-testid="nav-book-demo"
            >
              Book Demo
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-md rounded-b-lg">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                data-testid="mobile-nav-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('integrations')}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                data-testid="mobile-nav-integrations"
              >
                Integrations
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                data-testid="mobile-nav-testimonials"
              >
                Testimonials
              </button>
              <Button 
                onClick={onBookDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors w-full"
                data-testid="mobile-nav-book-demo"
              >
                Book Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
