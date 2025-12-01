"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Users, 
  Building2, 
  GraduationCap, 
  Briefcase,
  Code2,
  Palette,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Sparkles,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

const talentCategories = [
  { name: "Developers", icon: Code2, href: "#", description: "AI Engineers, ML Ops, Full Stack" },
  { name: "Designers", icon: Palette, href: "#", description: "UX/UI, Product, Generative Art" },
  { name: "Data Scientists", icon: TrendingUp, href: "#", description: "Analytics, Research, NLP" },
  { name: "Consultants", icon: Briefcase, href: "#", description: "Strategy, Implementation, Ethics" },
];

const companyServices = [
  { name: "Hire Talent", icon: Users, href: "/for-companies", description: "Access pre-vetted AI professionals" },
  { name: "Upskill Teams", icon: GraduationCap, href: "/upskill", description: "Train your workforce on AI tools" },
  { name: "Enterprise", icon: Building2, href: "#", description: "Custom solutions for large teams" },
];

const talentServices = [
  { name: "Join as Talent", icon: Sparkles, href: "/for-talent", description: "Get verified and access premium projects" },
  { name: "Create Portfolio", icon: Palette, href: "#", description: "Showcase your AI expertise" },
  { name: "Upskill Yourself", icon: GraduationCap, href: "/upskill", description: "Learn cutting-edge AI skills" },
];

const whyNxtbeings = [
  { name: "Verified Professionals", icon: ShieldCheck, href: "#" },
  { name: "Global Talent Pool", icon: Globe2, href: "#" },
  { name: "AI-Native Platform", icon: Sparkles, href: "#" },
];

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
              Nxtbeings
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Hire Talent Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("talent")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/80">
                  Hire Talent
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "talent" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === "talent" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 w-72">
                        {talentCategories.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                              <item.icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <Link
                            href="#"
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-blue-600"
                          >
                            Browse All Talent
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* For Companies Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("companies")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/80">
                  For Companies
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "companies" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === "companies" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 w-80">
                        {companyServices.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                              <item.icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Why Nxtbeings Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("why")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/80">
                  Why Nxtbeings
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "why" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === "why" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 w-64">
                        {whyNxtbeings.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                              <item.icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* For Talent Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("talent-services")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/80">
                  For Talent
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "talent-services" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === "talent-services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 w-80">
                        {talentServices.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                              <item.icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple Links */}
              <Link href="#" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/80">
                Blog
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <Link 
                href="#" 
                className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-full hover:bg-slate-100/80"
              >
                Sign In
              </Link>
              <Button className="rounded-full font-medium px-5 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-none">
                Get Started
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Hire Talent</div>
                    <div className="space-y-1">
                      {talentCategories.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">For Companies</div>
                    <div className="space-y-1">
                      {companyServices.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">For Talent</div>
                    <div className="space-y-1">
                      {talentServices.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href="#"
                      className="block w-full text-center py-3 text-sm font-medium text-slate-600 hover:text-slate-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button className="w-full rounded-full mt-2 bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
