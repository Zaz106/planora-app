import Navigation from "@/components/layout/navigation";
import HeroSection from "@/components/sections/hero-section";
import VideoContainer from "@/components/ui/video-container";
import ProblemAgitation from "@/components/sections/problem-agitation";
import TiltedCardSection from "@/components/sections/tilted-card-section";
import FeaturesSection from "@/components/sections/features-section";
import SocialProofSection from "@/components/sections/social-proof-section";
import PricingSection from "@/components/sections/pricing-section";
import FaqSection from "@/components/sections/faq-section";
import CtaSection from "@/components/sections/cta-section";
import Footer from "@/components/layout/footer";

export default function OverviewPage() {
  return (
    <main>
  {/* Heading structure: Hero has the only h1; sections use h2 internally */}
      <Navigation />
      <HeroSection />
      <VideoContainer />
      <ProblemAgitation />
      <TiltedCardSection />
  <SocialProofSection />
  <FeaturesSection />
  <PricingSection />
  <FaqSection />
  <CtaSection />
  <Footer />
    </main>
  );
}
