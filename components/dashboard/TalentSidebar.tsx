"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Settings,
  Sparkles
} from "lucide-react";

interface UserData {
  name?: string | null;
  email?: string | null;
  role: "company" | "talent";
}

interface TalentSidebarProps {
  user: UserData;
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Opportunities", href: "/dashboard/opportunities", icon: Briefcase },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function TalentSidebar({ user }: TalentSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-slate-200 px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className="text-xl font-semibold text-slate-900">
            Nxtbeings
          </Link>
        </div>

        {/* Talent Badge */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {user.name || "Professional"}
            </p>
            <p className="text-xs text-violet-600 font-medium">
              AI Talent
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      group flex gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                      ${isActive 
                        ? "bg-violet-50 text-violet-600" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Completion Prompt */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
          <p className="text-sm font-medium">Complete your profile</p>
          <p className="text-xs text-white/80 mt-1">
            Stand out to companies by adding more details.
          </p>
          <Link
            href="/dashboard/profile"
            className="mt-3 inline-flex items-center text-xs font-medium text-white hover:underline"
          >
            Update profile →
          </Link>
        </div>
      </div>
    </aside>
  );
}

