"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Star, 
  Settings,
  Building2,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface User {
  name?: string | null;
  email?: string | null;
  role: "company" | "talent";
}

interface DashboardSidebarProps {
  user: User;
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Browse Talent", href: "/dashboard/browse", icon: Users },
  { name: "Job Descriptions", href: "/dashboard/job-descriptions", icon: FileText },
  { name: "Shortlist", href: "/dashboard/shortlist", icon: Star },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-y-0 left-0 z-50 hidden lg:flex lg:flex-col"
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden bg-white/70 backdrop-blur-xl border-r border-white/20 px-3 pb-4 shadow-xl shadow-primary/5">
        {/* Logo & Collapse Toggle */}
        <div className="flex h-16 shrink-0 items-center justify-between px-3">
          {!isCollapsed && (
            <Link href="/" className="text-xl font-semibold text-foreground">
              Nxtbeings
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors ${isCollapsed ? "mx-auto" : ""}`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Company Badge */}
        <div className={`flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm ${isCollapsed ? "justify-center" : ""}`}>
          <div className={`${isCollapsed ? "w-10 h-10" : "w-12 h-12"} rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0`}>
            <Building2 className={isCollapsed ? "w-5 h-5" : "w-6 h-6"} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name || "Company"}
              </p>
              <p className="text-xs text-primary font-medium">
                Hiring Account
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col mt-2">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    title={isCollapsed ? item.name : undefined}
                    className={`
                      group flex gap-x-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200
                      ${isCollapsed ? "justify-center" : ""}
                      ${isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }
                    `}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                      }`}
                    />
                    {!isCollapsed && item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Card - Only show when expanded */}
        {!isCollapsed && (
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <p className="text-sm font-semibold text-foreground">Find AI Talent</p>
            <p className="text-xs text-muted-foreground mt-1">
              Browse pre-vetted professionals ready to join your team.
            </p>
            <Link
              href="/dashboard/browse"
              className="mt-3 inline-flex items-center text-xs font-medium text-primary hover:underline"
            >
              Browse talent →
            </Link>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
