"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Sparkles
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Pre-Vetted Talent",
    description: "Every professional passes our rigorous 4-stage screening. Only the top 1% make it to our platform.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Zap,
    title: "10x Productivity",
    description: "Our AI-enabled professionals deliver faster results without compromising on quality.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    icon: Globe2,
    title: "Global Talent Pool",
    description: "Access specialists from San Francisco to Singapore. Hire the best, regardless of location.",
    color: "text-violet-600",
    bg: "bg-violet-50"
  },
  {
    icon: Clock,
    title: "Faster Time-to-Hire",
    description: "Skip weeks of screening. Our pre-verified profiles mean you can hire in days, not months.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];

const stats = [
  { value: "2,400+", label: "Verified Professionals" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3x", label: "Faster Hiring" },
  { value: "50+", label: "Countries" }
];

const useCases = [
  {
    title: "Scale Your AI Team",
    description: "Quickly onboard ML engineers, data scientists, and AI researchers for your next big project.",
    icon: Users
  },
  {
    title: "Augment Existing Teams",
    description: "Add specialized AI skills to your current workforce without long-term commitments.",
    icon: TrendingUp
  },
  {
    title: "Build from Scratch",
    description: "Assemble a complete AI division with our end-to-end hiring support.",
    icon: Building2
  }
];

export default function ForCompaniesPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 rounded-b-[100%] blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium uppercase tracking-wider mb-6"
          >
            <Building2 className="w-3 h-3" />
            For Companies
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Hire AI Talent That <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Actually Delivers
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Stop wasting time on unqualified candidates. Access pre-vetted AI professionals who combine deep domain expertise with cutting-edge AI skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700">
              Browse Talent
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base">
              Book a Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-slate-100">
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
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Why Companies Choose Nxtbeings
            </motion.h2>
            <p className="text-lg text-slate-500">
              We've reimagined hiring for the AI era. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-slate-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 ${benefit.bg} rounded-2xl flex items-center justify-center mb-6 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              How Companies Use Nxtbeings
            </motion.h2>
            <p className="text-lg text-slate-500">
              From startups to Fortune 500, we power AI hiring at every scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <useCase.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                <p className="text-slate-500">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screening Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium uppercase tracking-wider mb-6"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Quality Assured
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
                >
                  Our Rigorous Screening Process
                </motion.h2>
                <p className="text-lg text-slate-500 mb-8">
                  Every professional on Nxtbeings has passed a comprehensive evaluation. We verify skills so you don't have to.
                </p>

                <div className="space-y-4">
                  {[
                    { step: "01", title: "Identity Verification", desc: "Background checks and credential validation" },
                    { step: "02", title: "Technical Assessment", desc: "Domain-specific skill evaluation" },
                    { step: "03", title: "AI Proficiency Test", desc: "Hands-on AI tool competency check" },
                    { step: "04", title: "Expert Interview", desc: "Live evaluation by industry professionals" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-2xl">
                  <CardContent className="p-10">
                    <div className="flex items-center gap-3 mb-8">
                      <BadgeCheck className="w-8 h-8" />
                      <span className="text-xl font-bold">Verified Pro Badge</span>
                    </div>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                      Only professionals who pass all 4 stages earn the Verified Pro badge. This badge is your guarantee of quality.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Proven domain expertise</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>AI tool proficiency</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Communication skills</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Professional work history</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full mix-blend-overlay blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" 
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Sparkles className="w-12 h-12 text-blue-200 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your AI Dream Team?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
              Join hundreds of companies already hiring top AI talent through Nxtbeings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 h-12 text-base bg-white text-blue-600 hover:bg-blue-50">
                Start Hiring Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-white/30 text-white hover:bg-white/10">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

