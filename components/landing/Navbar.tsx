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
  X,
  Megaphone
} from "lucide-react";

const talentCategories = [
  { name: "Developers", icon: Code2, href: "/browse?category=development", description: "AI Engineers, ML Ops, Full Stack" },
  { name: "Designers", icon: Palette, href: "/browse?category=design", description: "UX/UI, Product, Generative Art" },
  { name: "Data Scientists", icon: TrendingUp, href: "/browse?category=ai", description: "Analytics, Research, NLP" },
  { name: "Consultants", icon: Briefcase, href: "/browse?category=support", description: "Strategy, Implementation, Ethics" },
];

const companyServices = [
  { name: "Hire Talent", icon: Users, href: "/for-companies", description: "Access pre-vetted AI professionals" },
  { name: "Upskill Teams", icon: GraduationCap, href: "/upskill", description: "Train your workforce on AI tools" },
  { name: "Enterprise", icon: Building2, href: "#", description: "Custom solutions for large teams" },
];

const talentServices = [
  { name: "Join as Talent", icon: Sparkles, href: "/get-started", description: "Get verified and access premium projects" },
  { name: "Create Portfolio", icon: Palette, href: "/get-started", description: "Showcase your AI expertise" },
  { name: "Upskill Yourself", icon: GraduationCap, href: "/upskill", description: "Learn cutting-edge AI skills" },
];

// Consulting Services - Toptal-style structure
const consultingCategories = [
  {
    id: "ai",
    name: "AI Consulting",
    icon: Sparkles,
    mainLink: "/consulting/ai",
    services: [
      "AI Workflow Automation",
      "N8N Implementation",
      "Langchain Development",
      "LLM Integration & Fine-tuning",
      "AI Agent Development",
      "RAG (Retrieval-Augmented Generation) Systems",
      "AI Model Deployment & MLOps",
    ],
    featuredServices: [
      "Custom AI Solution Architecture",
      "Vector Database Implementation",
      "Prompt Engineering Services",
      "AI Chatbot Development",
      "Document AI & Processing",
      "AI-Powered Analytics",
      "Computer Vision Solutions",
      "Natural Language Processing",
      "AI API Integration",
      "AI Model Training & Optimization",
      "AI Security & Governance",
      "AI Performance Monitoring",
    ],
  },
  {
    id: "management",
    name: "Management Consulting",
    icon: Briefcase,
    mainLink: "/consulting/management",
    services: [
      "Strategy Consulting",
      "People Consulting",
      "Finance Consulting",
      "Operations Consulting",
    ],
    featuredServices: [
      "Digital Strategy Consulting",
      "AI Strategy Consulting",
      "Growth Strategy Consulting",
      "Corporate Finance Consulting",
      "CFO Consulting",
      "M&A Due Diligence Consulting",
      "Sales Consulting",
      "Change Management Consulting",
      "Performance Improvement Consulting",
      "Supply Chain Consulting",
    ],
  },
  {
    id: "technology",
    name: "Technology Services",
    icon: Code2,
    mainLink: "/consulting/technology",
    services: [
      "Artificial Intelligence",
      "Data Analytics",
      "Cloud Services",
      "Information Security",
      "Apps and Integrations",
      "Custom Software Development",
    ],
    featuredServices: [
      "Data Engineering Services",
      "Data Management Services",
      "Machine Learning Services",
      "Generative AI Services",
      "Business Intelligence Services",
      "DevOps Services",
      "Cloud Strategy Consulting",
      "Cloud Migration Services",
      "Cloud Security Services",
      "Application Security Services",
      "Enterprise Applications Services",
      "Business Process Automation Services",
    ],
  },
  {
    id: "marketing",
    name: "Marketing Agency",
    icon: Megaphone,
    mainLink: "/consulting/marketing",
    services: [
      "Digital Marketing",
      "Growth Marketing",
      "Marketing Strategy and Operations",
      "Brand Marketing",
      "Product Marketing",
      "Creative and Content Marketing",
      "Sales and Revenue Operations",
    ],
    featuredServices: [
      "Brand Strategy Consulting",
      "Content Creation Services",
      "Content Marketing Services",
      "Conversion Rate Optimization Services",
      "Email Marketing Services",
      "Market Research Services",
      "Performance Marketing Services",
      "PPC Services",
      "Search Engine Optimization Services",
      "Social Media Management Services",
    ],
  },
];

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedConsultingCategory, setSelectedConsultingCategory] = useState("ai");

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
                            href="/browse"
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

              {/* Consulting Services Dropdown - Toptal Style */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("consulting")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/80">
                  Consulting Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "consulting" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === "consulting" && (
                    <>
                      {/* Invisible bridge to prevent gap collapse */}
                      <div className="absolute top-full left-0 right-0 h-1" onMouseEnter={() => setActiveMenu("consulting")} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-16 left-0 right-0 z-50"
                        onMouseEnter={() => setActiveMenu("consulting")}
                        onMouseLeave={() => setActiveMenu(null)}
                      >
                        <div className="max-w-7xl mx-auto px-6">
                          {/* Dropdown Card */}
                          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="flex">
                              {/* Left Column - Categories */}
                              <div className="w-64 bg-slate-50 border-r border-slate-200">
                            {consultingCategories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setSelectedConsultingCategory(category.id)}
                                className={`w-full text-left px-6 py-4 transition-colors ${
                                  selectedConsultingCategory === category.id
                                    ? "bg-white border-l-4 border-blue-600 text-blue-600"
                                    : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <category.icon className={`w-5 h-5 ${selectedConsultingCategory === category.id ? "text-blue-600" : "text-slate-500"}`} />
                                  <span className="font-medium text-sm">{category.name}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Right Columns - Services */}
                          <div className="flex-1 p-6">
                            {consultingCategories
                              .filter((cat) => cat.id === selectedConsultingCategory)
                              .map((category) => (
                                <div key={category.id} className="grid grid-cols-3 gap-8">
                                  {/* Main Services Column */}
                                  <div>
                                    <Link
                                      href={category.mainLink}
                                      className="text-blue-600 font-semibold text-sm mb-4 inline-flex items-center gap-1 hover:underline"
                                    >
                                      {category.name} <ArrowRight className="w-3 h-3" />
                                    </Link>
                                    <ul className="space-y-2">
                                      {category.services.map((service) => (
                                        <li key={service}>
                                          <Link
                                            href={`${category.mainLink}?service=${service.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="text-sm text-slate-700 hover:text-blue-600 transition-colors"
                                          >
                                            {service}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Featured Services Column 1 */}
                                  <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                      Featured Services
                                    </h4>
                                    <ul className="space-y-2">
                                      {category.featuredServices.slice(0, Math.ceil(category.featuredServices.length / 2)).map((service) => (
                                        <li key={service}>
                          <Link
                                            href={`${category.mainLink}?service=${service.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="text-sm text-slate-700 hover:text-blue-600 transition-colors"
                                          >
                                            {service}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                            </div>

                                  {/* Featured Services Column 2 */}
                                  <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                      &nbsp;
                                    </h4>
                                    <ul className="space-y-2">
                                      {category.featuredServices.slice(Math.ceil(category.featuredServices.length / 2)).map((service) => (
                                        <li key={service}>
                                          <Link
                                            href={`${category.mainLink}?service=${service.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="text-sm text-slate-700 hover:text-blue-600 transition-colors"
                                          >
                                            {service}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                    <Link
                                      href={category.mainLink}
                                      className="text-sm text-blue-600 font-medium mt-4 inline-flex items-center gap-1 hover:underline"
                                    >
                                      See more services <ArrowRight className="w-3 h-3" />
                          </Link>
                                  </div>
                                </div>
                        ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    </>
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
                href="/signin" 
                className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-full hover:bg-slate-100/80"
              >
                Sign In
              </Link>
              <Link href="/get-started">
              <Button className="rounded-full font-medium px-5 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-none">
                Get Started
              </Button>
              </Link>

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

                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Consulting Services</div>
                    <div className="space-y-1">
                      {consultingCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.mainLink}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <category.icon className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href="/signin"
                      className="block w-full text-center py-3 text-sm font-medium text-slate-600 hover:text-slate-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full mt-2 bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                    </Link>
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
