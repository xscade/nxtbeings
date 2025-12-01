"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, TrendingUp, CheckCircle2, BadgeCheck, Sparkles } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Post Requirements",
    description: "Define your ideal candidate profile, including specific AI skills, experience levels, and project needs.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Boost Productivity",
    description: "Companies hiring our AI-native professionals report 3x faster project delivery and higher code quality.",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Review Candidates",
    description: "Receive a shortlist of top 1% AI talent, pre-vetted for technical expertise and soft skills.",
    icon: CheckCircle2,
  },
  {
    id: 4,
    title: "Hire & Onboard",
    description: "Seamlessly interview, hire, and onboard your new team members with our integrated tools.",
    icon: BadgeCheck,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-blue-600 text-white">
      {/* Background Wave Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q25 20 50 10 T100 10" fill="none" stroke="white" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full mix-blend-overlay blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-overlay blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-50 text-xs font-medium uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3 h-3" />
              For Employers
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Build Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
                AI Dream Team
              </span>
            </motion.h2>
            <p className="text-blue-100 text-lg max-w-xl leading-relaxed opacity-90">
              Access a curated network of world-class AI professionals ready to accelerate your innovation.
            </p>
          </div>

          <div className="hidden md:block pb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-100">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              2,400+ Verified Experts Active Now
            </div>
          </div>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full relative p-1 rounded-3xl bg-gradient-to-b from-white/20 to-white/5 hover:from-white/40 hover:to-white/10 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-blue-600/50 backdrop-blur-xl" />
                
                <div className="relative h-full bg-blue-950/20 rounded-[22px] p-8 border border-white/10 hover:border-white/30 transition-colors duration-300 flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/20">
                    <step.icon size={26} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors font-mono">
                        0{step.id}
                      </span>
                      <div className="h-px flex-1 bg-white/10 group-hover:bg-white/30 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-blue-100/70 text-sm leading-relaxed group-hover:text-blue-100 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
