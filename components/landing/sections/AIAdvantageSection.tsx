"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe2, CheckCircle2, Cpu, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Superpower.",
    subtitle: "Not a crutch.",
    description: "Our professionals master their craft first. AI amplifies their expertise — it doesn't replace it.",
    visual: (
      <div className="flex items-center justify-center gap-4 text-sm mt-8">
        <span className="text-blue-100 font-medium">Expert</span>
        <span className="text-blue-200">+</span>
        <span className="text-white font-medium flex items-center gap-1">
          <Cpu className="w-4 h-4" />
          AI
        </span>
        <span className="text-blue-200">=</span>
        <span className="text-white font-semibold">10× Output</span>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    title: "Vetted.",
    subtitle: "Rigorously.",
    description: "Four-stage screening. Background verified. Skills tested. Only the top 1% earn the badge.",
    visual: (
      <div className="space-y-3 mt-8">
        {["Identity verified", "Skills assessed", "AI proficiency tested", "Expert approved"].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${i === 3 ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}>
              {i === 3 ? <BadgeCheck className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
            <span className={`text-sm ${i === 3 ? 'text-white font-medium' : 'text-blue-100'}`}>{step}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    icon: Globe2,
    title: "Global.",
    subtitle: "Borderless.",
    description: "San Francisco. Berlin. Bangalore. Singapore. The best talent, wherever they are.",
    visual: (
      <div className="relative h-32 mt-8 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-white/30"
              style={{
                width: `${80 + ring * 50}px`,
                height: `${80 + ring * 50}px`,
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: ring * 0.5 }}
            />
          ))}
        </div>
        <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <Globe2 className="w-6 h-6 text-blue-600" />
        </div>
        {/* Floating dots */}
        {[
          { x: -60, y: -20 },
          { x: 70, y: -10 },
          { x: -40, y: 30 },
          { x: 50, y: 25 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    )
  }
];

export function AIAdvantageSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header - Apple style: Large, centered, minimal */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1]"
          >
            Human expertise.
            <br />
            <span className="text-blue-100">
              AI amplified.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed"
          >
            We don't hire AI replacements. We verify domain experts who leverage AI to deliver 10× productivity.
          </motion.p>
        </div>

        {/* Features - Glassmorphic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="h-full bg-white/10 backdrop-blur-sm rounded-3xl p-10 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-900/20 border border-white/10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-blue-600 transition-all duration-500 border border-white/20">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-semibold text-white tracking-tight leading-tight">
                  {feature.title}
                  <br />
                  <span className="text-blue-200">{feature.subtitle}</span>
                </h3>

                {/* Description */}
                <p className="mt-4 text-blue-100 leading-relaxed text-[15px]">
                  {feature.description}
                </p>

                {/* Visual */}
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
