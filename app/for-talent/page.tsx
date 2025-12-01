"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Globe2,
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  Shield,
  DollarSign,
  CheckCircle2,
  Users,
  Briefcase,
  Clock,
} from "lucide-react";

// Journey steps
const journeySteps = [
  { id: 1, title: "Apply", description: "Submit your portfolio and credentials", icon: Briefcase },
  { id: 2, title: "Get Verified", description: "Pass our 4-stage screening process", icon: Shield },
  { id: 3, title: "Get Matched", description: "Connect with premium clients globally", icon: Users },
  { id: 4, title: "Get Paid", description: "Earn 40% more than traditional platforms", icon: DollarSign },
];

// Benefits
const benefits = [
  {
    icon: Globe2,
    title: "Global.",
    subtitle: "Borderless.",
    description: "Access projects from Fortune 500 companies and innovative startups worldwide.",
  },
  {
    icon: DollarSign,
    title: "Premium.",
    subtitle: "Rates.",
    description: "Verified professionals command 40% higher rates than traditional platforms.",
  },
  {
    icon: Clock,
    title: "Flexible.",
    subtitle: "Freedom.",
    description: "Choose your hours, projects, and clients. Work from anywhere in the world.",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Chen",
    role: "ML Engineer",
    company: "Ex-Google",
    quote: "Tripled my income in 6 months. The verification badge opens doors.",
    earnings: "$180K+",
  },
  {
    name: "Marcus Johnson",
    role: "AI Designer",
    company: "Ex-Apple",
    quote: "Finally, clients who understand the value of AI expertise.",
    earnings: "$145K+",
  },
  {
    name: "Priya Sharma",
    role: "NLP Specialist",
    company: "Ex-Microsoft",
    quote: "Best decision I made. Premium projects, premium pay.",
    earnings: "$210K+",
  },
];

export default function ForTalentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section - White Background (matches homepage Hero) */}
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
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Join 50,000+ Verified Professionals
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Your AI Skills Deserve<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Premium Clients
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Get verified. Get discovered. Access exclusive projects from the world's most innovative companies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base hover:bg-muted">
              See How It Works
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
              <span>40% Higher Rates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Global Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Verified Badge</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Blue Gradient (matches AIAdvantageSection) */}
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
              Why top talent
              <br />
              <span className="text-blue-100">chooses Nxtbeings.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Premium opportunities, fair compensation, and a community that values expertise.
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

      {/* How It Works - White Background */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Four steps to <span className="text-slate-400">premium projects.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {step.id}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <step.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
              Start Your Application
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Earnings Section - Blue Gradient */}
      <section className="py-32 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-8">
                Earn what you're
                <br />
                <span className="text-blue-100">actually worth.</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 font-light leading-relaxed">
                Our verified professionals earn 40% more than on traditional platforms. No race to the bottom.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Average hourly rate", value: "$150-300/hr" },
                  { label: "Median annual earnings", value: "$145,000" },
                  { label: "Top earner (2024)", value: "$420,000" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-blue-100">{item.label}</span>
                    <span className="font-semibold text-xl text-white">{item.value}</span>
                  </div>
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
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border-2 border-white/20">
                      <AvatarFallback className="bg-blue-500 text-white font-semibold">S</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        Sarah Chen
                        <BadgeCheck className="w-4 h-4 text-blue-200" />
                      </div>
                      <div className="text-sm text-blue-200">ML Engineer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-200 uppercase tracking-wider">This Year</div>
                    <div className="text-2xl font-bold text-white">$184,500</div>
                  </div>
                </div>

                <div className="h-32 flex items-end gap-2 mb-6">
                  {[40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 100, 88].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-white/30 rounded-t-lg"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "24", label: "Projects" },
                    { value: "4.9", label: "Rating" },
                    { value: "12", label: "Clients" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-blue-200">{stat.label}</div>
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
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  +40% vs platforms
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - White Background */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Success <span className="text-slate-400">stories.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-blue-500 text-blue-500" />
                    ))}
                  </div>

                  <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-slate-200">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5 text-sm">
                          {testimonial.name}
                          <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <div className="text-xs text-slate-500">{testimonial.role} · {testimonial.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{testimonial.earnings}</div>
                      <div className="text-xs text-slate-400">Earned</div>
                    </div>
                  </div>
                </div>
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
              Limited spots available
            </div>

            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              Ready to
              <br />
              <span className="text-blue-100">level up?</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto font-light">
              Join 50,000+ verified AI professionals and start working with the world's best companies.
            </p>

            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-blue-900/20"
            >
              Apply Now — It's Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <p className="mt-8 text-sm text-blue-200">
              Average review time: 48 hours
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
