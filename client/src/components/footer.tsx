import { Twitter, Linkedin, Github } from "lucide-react";
import { Link as WouterLink } from "wouter";

const audienceLinks = [
  { href: "/organizers", label: "Organizers" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/venues", label: "Venues" },
  { href: "/field-marketing", label: "Field Marketing" },
  { href: "/builders", label: "Builders" },
];

const productLinks = [
  { href: "/events", label: "Browse events" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#features", label: "The engine" },
];

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "mailto:hello@eventsea.ai", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Eventsea
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6">
              The AI-native event engine for organizers, sponsors, venues, and field marketing teams. Stop guessing which conferences are worth it.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" data-testid="footer-twitter" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" data-testid="footer-linkedin" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors" data-testid="footer-github" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-4 font-semibold">For</div>
            <ul className="space-y-2">
              {audienceLinks.map((l) => (
                <li key={l.href}>
                  <WouterLink href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors" data-testid={`footer-${l.label.toLowerCase().replace(" ", "-")}`}>
                    {l.label}
                  </WouterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-4 font-semibold">Product</div>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") && !l.href.includes("#") ? (
                    <WouterLink href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </WouterLink>
                  ) : (
                    <a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-4 font-semibold">Company</div>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors" data-testid={`footer-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Eventsea. All rights reserved.</p>
          <p>Built for the whole event industry.</p>
        </div>
      </div>
    </footer>
  );
}
