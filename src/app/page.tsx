import Navigation from "@/components/layout/navigation";
import HeroSection from "@/components/sections/hero-section";
import VideoContainer from "@/components/ui/video-container";
import ProblemAgitation from "@/components/sections/problem-agitation";
import TiltedCardSection from "@/components/sections/tilted-card-section";
import SocialProofSection from "@/components/sections/social-proof-section";
import FeaturesSection from "@/components/sections/features-section";

export default function OverviewPage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <VideoContainer />
      <ProblemAgitation />
      <TiltedCardSection />
      <SocialProofSection />
      <FeaturesSection />
    </main>
  );
}
