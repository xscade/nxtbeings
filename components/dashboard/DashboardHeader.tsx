"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  LogOut, 
  User,
  ChevronDown,
  X,
  LayoutDashboard,
  Users,
  Star,
  Settings,
  FileText,
  Briefcase,
  FolderOpen,
  Building2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: "company" | "talent";
}

interface DashboardHeaderProps {
  user: UserData;
}

const companyNavigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Browse Talent", href: "/dashboard/browse", icon: Users },
  { name: "Job Descriptions", href: "/dashboard/job-descriptions", icon: FileText },
  { name: "Shortlist", href: "/dashboard/shortlist", icon: Star },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const talentNavigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: FolderOpen },
  { name: "Interviews", href: "/dashboard/interviews", icon: FileText },
  { name: "Opportunities", href: "/dashboard/opportunities", icon: Briefcase },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = user.role === "talent" ? talentNavigation : companyNavigation;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          {/* Logo for mobile */}
          <div className="lg:hidden text-lg font-semibold text-foreground">
            Nxtbeings
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center text-white text-sm font-medium shadow-md shadow-primary/20">
                {user.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {user.name || "User"}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl shadow-primary/10 border border-white/20 py-1 z-50"
                  >
                    <div className="px-4 py-3 border-b border-border/50">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start px-4 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive rounded-none"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl shadow-primary/10 lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
                  <Link href="/" className="text-xl font-semibold text-foreground">
                    Nxtbeings
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* User Badge */}
                <div className="px-4 py-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                      {user.role === "talent" ? (
                        <Sparkles className="w-6 h-6" />
                      ) : (
                        <Building2 className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {user.role === "talent" ? "Talent Account" : "Hiring Account"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 overflow-y-auto">
                  <ul className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href || 
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                      
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`
                              flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                              ${isActive 
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                              }
                            `}
                          >
                            <item.icon className={`h-5 w-5 ${isActive ? "" : "text-muted-foreground"}`} />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
