"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Users, 
  Zap, 
  ShieldCheck, 
  Globe2, 
  ArrowRight, 
  Building2,
  Clock,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

// Benefits
const benefits = [
  {
    icon: ShieldCheck,
    title: "Pre-Vetted.",
    subtitle: "Quality assured.",
    description: "Every professional passes our rigorous 4-stage screening. Only the top 1% make it to our platform.",
  },
  {
    icon: Zap,
    title: "10x Faster.",
    subtitle: "Productivity.",
    description: "Our AI-enabled professionals deliver faster results without compromising on quality.",
  },
  {
    icon: Globe2,
    title: "Global.",
    subtitle: "Talent pool.",
    description: "Access specialists from San Francisco to Singapore. Hire the best, regardless of location.",
  },
];

// Use Cases
const useCases = [
  { id: 1, title: "Scale Your AI Team", description: "Quickly onboard ML engineers, data scientists, and AI researchers", icon: Users },
  { id: 2, title: "Augment Existing Teams", description: "Add specialized AI skills without long-term commitments", icon: TrendingUp },
  { id: 3, title: "Build from Scratch", description: "Assemble a complete AI division with end-to-end support", icon: Building2 },
];

// Screening Steps
const screeningSteps = [
  { step: "01", title: "Identity Verification", desc: "Background checks and credential validation" },
  { step: "02", title: "Technical Assessment", desc: "Domain-specific skill evaluation" },
  { step: "03", title: "AI Proficiency Test", desc: "Hands-on AI tool competency check" },
  { step: "04", title: "Expert Interview", desc: "Live evaluation by industry professionals" },
];

export default function ForCompaniesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section - White Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden bg-background">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
          <motion.div 
            animate={{ y: [0, -50, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[80px]"
          />
          <motion.div 
            animate={{ y: [0, 50, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium"
          >
            <Building2 className="w-4 h-4" />
            For Companies
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Hire AI Talent That<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Actually Delivers
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Stop wasting time on unqualified candidates. Access pre-vetted AI professionals who combine deep domain expertise with cutting-edge AI skills.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
              Browse Talent
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base hover:bg-muted">
              Book a Demo
            </Button>
          </motion.div>

          {/* Footer Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>2,400+ Verified Pros</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>98% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>50+ Countries</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Blue Gradient */}
      <section className="py-32 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1]"
            >
              Why companies
              <br />
              <span className="text-blue-100">choose Nxtbeings.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed"
            >
              We've reimagined hiring for the AI era. Here's what sets us apart.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="h-full bg-white/10 backdrop-blur-sm rounded-3xl p-10 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-900/20 border border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-blue-600 transition-all duration-500 border border-white/20">
                    <benefit.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-semibold text-white tracking-tight leading-tight">
                    {benefit.title}
                    <br />
                    <span className="text-blue-200">{benefit.subtitle}</span>
                  </h3>
                  <p className="mt-4 text-blue-100 leading-relaxed text-[15px]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - White Background */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              How companies <span className="text-slate-400">use Nxtbeings.</span>
            </motion.h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From startups to Fortune 500, we power AI hiring at every scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {useCase.id}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <useCase.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{useCase.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screening Process - Blue Gradient */}
      <section className="py-32 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-8">
                Our rigorous
                <br />
                <span className="text-blue-100">screening process.</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 font-light leading-relaxed">
                Every professional on Nxtbeings has passed a comprehensive evaluation. We verify skills so you don't have to.
              </p>

              <div className="space-y-4">
                {screeningSteps.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-blue-200">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                    <BadgeCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-2xl font-semibold text-white">Verified Pro Badge</span>
                </div>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Only professionals who pass all 4 stages earn the Verified Pro badge. This badge is your guarantee of quality.
                </p>
                <div className="space-y-3">
                  {[
                    "Proven domain expertise",
                    "AI tool proficiency",
                    "Communication skills",
                    "Professional work history"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-200" />
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Quality Assured
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - White Background */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              The numbers <span className="text-slate-400">speak.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,400+", label: "Verified Professionals" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "3x", label: "Faster Hiring" },
              { value: "50+", label: "Countries" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6 group-hover:bg-blue-100 transition-colors">
                  <Clock className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Blue Gradient */}
      <section className="py-32 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 text-sm font-medium">
              <Zap className="w-4 h-4 text-blue-200" />
              Start hiring today
            </div>

            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              Ready to build your
              <br />
              <span className="text-blue-100">AI dream team?</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto font-light">
              Join hundreds of companies already hiring top AI talent through Nxtbeings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-blue-900/20"
              >
                Start Hiring Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <button 
                className="h-14 px-10 rounded-full text-base font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
