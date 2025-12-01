import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Features } from "@/components/landing/Features";
import { TalentGrid } from "@/components/landing/TalentGrid";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Features />
      <TalentGrid />
      <Footer />
    </main>
  );
}
