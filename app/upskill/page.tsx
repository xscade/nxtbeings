"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, 
  Building2, 
  User, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Briefcase, 
  Laptop,
  Zap,
  Target,
  Trophy,
  Clock,
  BookOpen,
  Rocket,
  Star,
  TrendingUp
} from "lucide-react";

const domains = [
  { id: "marketing", label: "Marketing & Content", icon: Sparkles, description: "AI for copywriting, SEO, campaigns" },
  { id: "engineering", label: "Engineering & Data", icon: Laptop, description: "Copilot, code review, data analysis" },
  { id: "sales", label: "Sales & CRM", icon: TrendingUp, description: "Lead scoring, outreach automation" },
  { id: "hr", label: "HR & Recruitment", icon: Users, description: "Resume screening, onboarding" },
  { id: "operations", label: "Operations & Workflow", icon: Briefcase, description: "Process automation, documentation" },
  { id: "leadership", label: "Executive Leadership", icon: Target, description: "Strategic AI adoption, governance" },
];

const stats = [
  { value: "60%", label: "Average productivity increase", icon: Zap },
  { value: "2 weeks", label: "Time to implementation", icon: Clock },
  { value: "500+", label: "Professionals trained", icon: Users },
  { value: "4.9/5", label: "Average satisfaction", icon: Star },
];

const benefits = [
  {
    title: "Customized Curriculum",
    description: "Training tailored to your industry, tools, and specific use cases",
    icon: BookOpen,
  },
  {
    title: "Hands-on Workshops",
    description: "Practice with real company data and scenarios, not generic examples",
    icon: Laptop,
  },
  {
    title: "Implementation Support",
    description: "Post-training guidance to ensure tools are adopted and used effectively",
    icon: Rocket,
  },
  {
    title: "Measurable Results",
    description: "Track productivity gains and ROI with our assessment framework",
    icon: Trophy,
  },
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
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Effects - Matching Homepage */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
          <motion.div 
            animate={{ 
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[80px]"
          />
          <motion.div 
            animate={{ 
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nxtbeings Upskill Program
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight"
          >
            Future-Proof Your <br/>
            <span className="text-primary">Workforce with AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            We don't just train; we help you implement. Equip your teams with the specific AI tools they need to 10x their productivity.
          </motion.p>

          {/* Tab Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="p-1.5 bg-muted rounded-full inline-flex relative">
              <button
                onClick={() => setActiveTab("company")}
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "company" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="w-4 h-4" />
                For Companies
              </button>
              <button
                onClick={() => setActiveTab("individual")}
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "individual" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                For Individuals
              </button>
              
              {/* Animated Background */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 bg-primary rounded-full shadow-lg shadow-primary/20"
                initial={false}
                animate={{
                  x: activeTab === "company" ? 6 : "100%",
                  left: activeTab === "company" ? 0 : -6,
                  width: activeTab === "company" ? "calc(50% - 6px)" : "calc(50% - 6px)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeTab === "company" ? (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-24"
              >
                {/* Benefits Grid */}
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Why Upskill with Nxtbeings?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Most training programs stop at theory. We focus on implementation and measurable outcomes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground mb-4">
                          <benefit.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                  {/* Left: Testimonial & Info */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Team?</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Join leading companies that have already transformed their workflows with AI. 
                        Our expert trainers will guide your team from basics to advanced implementation.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        "Customized curriculum based on your industry",
                        "Hands-on workshops with real company data",
                        "Post-training implementation support",
                        "Access to proprietary AI tool library"
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Card */}
                    <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-foreground italic mb-4">
                        "Nxtbeings helped our marketing team reduce content production time by 60% within just 2 weeks of training. The ROI was immediate and substantial."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Sarah Chen</div>
                          <div className="text-sm text-muted-foreground">CTO, TechCorp Inc.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Registration Form */}
                  <div className="bg-card rounded-2xl border border-border shadow-xl shadow-primary/5 p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Register Your Team</h3>
                    <p className="text-muted-foreground mb-8 text-sm">Tell us about your needs and we'll build a custom plan.</p>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Company Name</label>
                          <Input placeholder="Acme Inc." className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Team Size</label>
                          <Input placeholder="e.g. 10-50" className="rounded-xl" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Work Email</label>
                        <Input type="email" placeholder="you@company.com" className="rounded-xl" />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Select Areas to Upskill</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {domains.map((domain) => (
                            <button
                              key={domain.id}
                              type="button"
                              onClick={() => toggleDomain(domain.id)}
                              className={`
                                flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200
                                ${selectedDomains.includes(domain.id)
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/30"
                                }
                              `}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                selectedDomains.includes(domain.id) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}>
                                <domain.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className={`text-sm font-medium block ${
                                  selectedDomains.includes(domain.id) ? "text-primary" : "text-foreground"
                                }`}>
                                  {domain.label}
                                </span>
                                <span className="text-xs text-muted-foreground">{domain.description}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        Request Consultation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </div>
                </div>
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
                <div className="bg-card rounded-2xl border border-border shadow-xl shadow-primary/5 p-12">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Individual Certification Coming Soon</h3>
                  <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
                    We are currently prioritizing enterprise cohorts. Join the waitlist to be notified when individual enrollments open for our AI mastery tracks.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input placeholder="Enter your email" className="rounded-xl bg-background" />
                    <Button className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-8">
                      Join Waitlist
                    </Button>
                  </div>

                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">What you'll get access to:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {["AI Fundamentals", "Prompt Engineering", "Tool Mastery", "Certification"].map((item, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
