import HeroSection from "@/components/sections/hero-section";
import VideoContainer from "@/components/ui/video-container";
import HowItWorks from "@/components/sections/how-it-works";
import FeaturesSection from "@/components/sections/features-section";

export default function OverviewPage() {
  return (
    <main>
      <HeroSection />
      <VideoContainer />
      <HowItWorks />
      <FeaturesSection />
    </main>
  );
}