"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Building2, User, ArrowRight, Sparkles, Users, Briefcase, Laptop } from "lucide-react";

const domains = [
  { id: "marketing", label: "Marketing & Content", icon: Sparkles },
  { id: "engineering", label: "Engineering & Data", icon: Laptop },
  { id: "sales", label: "Sales & CRM", icon: Users },
  { id: "hr", label: "HR & Recruitment", icon: User },
  { id: "operations", label: "Operations & Workflow", icon: Briefcase },
  { id: "leadership", label: "Executive Leadership", icon: Building2 },
];

export default function UpskillPage() {
  const [activeTab, setActiveTab] = useState<"company" | "individual">("company");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const toggleDomain = (id: string) => {
    setSelectedDomains(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 rounded-b-[100%] blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Nxtbeings Upskill
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Future-Proof Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Workforce with AI
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            We don't just train; we help you implement. Equip your teams with the specific AI tools they need to 10x their productivity.
          </motion.p>

          {/* Tab Toggle */}
          <div className="flex justify-center mb-16">
            <div className="p-1 bg-slate-100 rounded-full inline-flex relative">
              <button
                onClick={() => setActiveTab("company")}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${
                  activeTab === "company" ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                For Companies
              </button>
              <button
                onClick={() => setActiveTab("individual")}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${
                  activeTab === "individual" ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4" />
                For Individuals
              </button>
              
              {/* Animated Background */}
              <motion.div
                className="absolute top-1 bottom-1 bg-blue-600 rounded-full"
                initial={false}
                animate={{
                  x: activeTab === "company" ? 4 : "100%",
                  left: activeTab === "company" ? 0 : -4,
                  width: activeTab === "company" ? "calc(50% - 4px)" : "calc(50% - 4px)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeTab === "company" ? (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto"
              >
                {/* Left: Content */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Upskill with Nxtbeings?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Most training programs stop at theory. We focus on implementation. 
                      Our experts work with your team to integrate AI tools directly into their workflows, 
                      ensuring immediate productivity gains.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Customized curriculum based on your industry",
                      "Hands-on workshops with real company data",
                      "Post-training implementation support",
                      "Access to proprietary AI tool library"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-blue-900 mb-2">Corporate Success Story</h4>
                        <p className="text-sm text-blue-800/80 italic">
                          "Nxtbeings helped our marketing team reduce content production time by 60% within just 2 weeks of training."
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-900 uppercase tracking-wider">
                          <span className="w-6 h-[1px] bg-blue-400"></span>
                          TechCorp Inc.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right: Registration Form */}
                <Card className="border-slate-200 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-violet-600" />
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Register Your Team</h3>
                    <p className="text-slate-500 mb-8 text-sm">Tell us about your needs and we'll build a custom plan.</p>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Company Name</label>
                          <Input placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Team Size</label>
                          <Input placeholder="e.g. 10-50" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Work Email</label>
                        <Input type="email" placeholder="you@company.com" />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">Select Areas to Upskill</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {domains.map((domain) => (
                            <button
                              key={domain.id}
                              type="button"
                              onClick={() => toggleDomain(domain.id)}
                              className={`
                                flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200
                                ${selectedDomains.includes(domain.id)
                                  ? "border-blue-600 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:border-blue-300 text-slate-600"
                                }
                              `}
                            >
                              <domain.icon className={`w-4 h-4 ${selectedDomains.includes(domain.id) ? "text-blue-600" : "text-slate-400"}`} />
                              <span className="text-sm font-medium">{domain.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Request Consultation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="individual"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center max-w-3xl mx-auto"
              >
                <Card className="border-slate-200 shadow-lg bg-slate-50/50">
                  <CardContent className="p-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                      <User className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Individual Certification Coming Soon</h3>
                    <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                      We are currently prioritizing enterprise cohorts. Join the waitlist to be notified when individual enrollments open for our AI mastery tracks.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <Input placeholder="Enter your email" className="bg-white" />
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Join Waitlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
