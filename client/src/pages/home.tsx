import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import BuiltForSection from "@/components/built-for-section";
import IntegrationsSection from "@/components/integrations-section";
import TestimonialSection from "@/components/testimonial-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import BetaSignupModal from "@/components/beta-signup-modal";

export default function Home() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

  const handleJoinBeta = () => {
    setIsBetaModalOpen(true);
  };

  const handleBookDemo = () => {
    // In a real application, this would open a calendar booking widget
    // For now, we'll show an alert
    alert('Demo booking would open here (integrate with Calendly, etc.)');
  };

  const handleCloseBetaModal = () => {
    setIsBetaModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />
      <HeroSection onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />
      <FeaturesSection />
      <BuiltForSection />
      <IntegrationsSection />
      <TestimonialSection />
      <CTASection onJoinBeta={handleJoinBeta} onBookDemo={handleBookDemo} />
      <Footer />
      <BetaSignupModal isOpen={isBetaModalOpen} onClose={handleCloseBetaModal} />
    </div>
  );
}
