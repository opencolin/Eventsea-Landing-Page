import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link as WouterLink, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onJoinBeta: () => void;
  onBookDemo: () => void;
}

const audienceLinks = [
  { href: "/organizers", label: "Organizers", description: "List & run events" },
  { href: "/sponsors", label: "Sponsors", description: "Find ICP-fit events" },
  { href: "/venues", label: "Venues", description: "Fill your calendar" },
  { href: "/field-marketing", label: "Field Marketing", description: "Score every event" },
  { href: "/builders", label: "Builders", description: "Discover & attend" },
];

const topLinks = [
  { href: "/events", label: "Events" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navigation({ onJoinBeta, onBookDemo }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isForDropdownOpen, setIsForDropdownOpen] = useState(false);
  const [location] = useLocation();

  const closeMobile = () => setIsMobileMenuOpen(false);
  const isAudienceActive = audienceLinks.some((l) => l.href === location);
  // Surface the Calendly URL on the Book Demo button when it's
  // configured so users get a real <a href> (right-click, copy link,
  // open-in-new-tab all work). When unset, fall back to the page-level
  // handler which uses a mailto:.
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <WouterLink href="/" className="flex items-center space-x-2" data-testid="nav-logo">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Eventsea
            </span>
          </WouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div
              className="relative"
              onMouseEnter={() => setIsForDropdownOpen(true)}
              onMouseLeave={() => setIsForDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 transition-colors text-sm ${
                  isAudienceActive ? "text-white font-medium" : "text-slate-300 hover:text-white"
                }`}
                data-testid="nav-for"
              >
                <span>For</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isForDropdownOpen && (
                <div className="absolute top-full left-0 pt-3 w-72">
                  <div className="glass rounded-xl p-2 border border-slate-700/50 shadow-2xl">
                    {audienceLinks.map((link) => {
                      const isActive = location === link.href;
                      return (
                        <WouterLink
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-3 rounded-lg transition-colors ${
                            isActive ? "bg-blue-500/10" : "hover:bg-slate-800/50"
                          }`}
                          data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
                        >
                          <div className={`font-medium text-sm ${isActive ? "text-blue-300" : "text-white"}`}>
                            {link.label}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{link.description}</div>
                        </WouterLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {topLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <WouterLink
                  key={link.href}
                  href={link.href}
                  className={`transition-colors text-sm ${
                    isActive ? "text-white font-medium" : "text-slate-300 hover:text-white"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </WouterLink>
              );
            })}

            {calendlyUrl ? (
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                data-testid="nav-book-demo"
              >
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book Demo
                </a>
              </Button>
            ) : (
              <Button
                onClick={onBookDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                data-testid="nav-book-demo"
              >
                Book Demo
              </Button>
            )}
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
              <div className="px-3 pt-2 pb-1 text-xs uppercase tracking-wider text-slate-500">For</div>
              {audienceLinks.map((link) => (
                <WouterLink
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                  <span className="text-xs text-slate-500 ml-2">{link.description}</span>
                </WouterLink>
              ))}
              <div className="px-3 pt-3 pb-1 text-xs uppercase tracking-wider text-slate-500">Explore</div>
              {topLinks.map((link) => (
                <WouterLink
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </WouterLink>
              ))}
              {calendlyUrl ? (
                <Button
                  asChild
                  onClick={closeMobile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors w-full mt-2"
                  data-testid="mobile-nav-book-demo"
                >
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Book Demo
                  </a>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    closeMobile();
                    onBookDemo();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors w-full mt-2"
                  data-testid="mobile-nav-book-demo"
                >
                  Book Demo
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
