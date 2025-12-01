import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
            NxtBeing
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              For Companies
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Verified Pro
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Button className="rounded-full font-medium px-6">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

