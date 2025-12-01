import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { TalentGrid } from "@/components/landing/TalentGrid";
import { PortfolioPreview } from "@/components/landing/PortfolioPreview";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <PortfolioPreview />
      <TalentGrid />
      <Footer />
    </main>
  );
}
