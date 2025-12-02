import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Features } from "@/components/landing/Features";
import { TalentGrid } from "@/components/landing/TalentGrid";
import { Footer } from "@/components/landing/Footer";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
import { AIAdvantageSection } from "@/components/landing/sections/AIAdvantageSection";
// import { ValuePropSection } from "@/components/landing/sections/ValuePropSection";
import { IndustryNetworkSection } from "@/components/landing/sections/IndustryNetworkSection";
import { TalentDiscoverySection } from "@/components/landing/sections/TalentDiscoverySection";
import { TestimonialsSection } from "@/components/landing/sections/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <Hero />
      <AIAdvantageSection />
      {/* <HowItWorksSection /> */}
      {/* <ValuePropSection /> */}
      <IndustryNetworkSection />
      <TalentDiscoverySection />
      <Features />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
