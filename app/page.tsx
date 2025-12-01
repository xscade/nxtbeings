import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Features } from "@/components/landing/Features";
import { TalentGrid } from "@/components/landing/TalentGrid";
import { Footer } from "@/components/landing/Footer";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
// import { ValuePropSection } from "@/components/landing/sections/ValuePropSection";
import { IndustryNetworkSection } from "@/components/landing/sections/IndustryNetworkSection";
import { TalentDiscoverySection } from "@/components/landing/sections/TalentDiscoverySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <Hero />
      {/* <HowItWorksSection /> */}
      {/* <ValuePropSection /> */}
      <IndustryNetworkSection />
      <TalentDiscoverySection />
      <Features />
      <Footer />
    </main>
  );
}
