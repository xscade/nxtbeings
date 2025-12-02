"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  LogOut, 
  User,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface DashboardHeaderProps {
  user: UserData;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5 text-slate-600" />
        </button>

        {/* Logo for mobile */}
        <div className="lg:hidden text-lg font-semibold text-slate-900">
          Nxtbeings
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {user.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              {user.name || "User"}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
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
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-slate-200 py-1 z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-none"
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
  );
}

