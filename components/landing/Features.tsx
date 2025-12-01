"use client";

import React from "react";
import { motion } from "framer-motion";
import { Aperture, BarChart3, LayoutGrid, Activity, Layers, Sparkles, Zap, Shield, Globe2, Users } from "lucide-react";

const chips = [
  { label: "LLM Fine-Tuning", icon: Sparkles },
  { label: "Computer Vision", icon: Aperture },
  { label: "MLOps", icon: Activity },
  { label: "RAG Systems", icon: Layers },
  { label: "Prompt Engineering", icon: Zap },
  { label: "AI Ethics", icon: Shield },
  { label: "NLP", icon: BarChart3 },
  { label: "Global Teams", icon: Globe2 },
  { label: "Enterprise AI", icon: Users },
];

export function Features() {
  return (
    <div className="relative w-full bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 flex flex-col gap-6 border-b border-white/20 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.35em] text-white/70">
              Core Features
            </span>
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl text-white leading-tight">
              Built for the <br/>Intelligence Age
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end md:max-w-sm">
            <p className="text-base text-white/80 leading-relaxed">
              A platform designed to showcase the skills that matter most in the new era of technology.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[minmax(140px,auto)] md:grid-cols-6">
          <FeatureItem
            title="Verified Skills"
            blurb="AI-verified credentials ensure that every profile you see represents real, tested expertise."
            meta="Trust"
            icon={Aperture}
            span="md:col-span-4 md:row-span-2"
          />
          <FeatureItem
            title="Global Talent"
            blurb="Access a worldwide network of engineers and researchers."
            meta="Reach"
            icon={LayoutGrid}
            span="md:col-span-2 md:row-span-1"
          />
          <FeatureItem
            title="Instant Hire"
            blurb="Direct messaging and contract tools built-in."
            meta="Speed"
            icon={Activity}
            span="md:col-span-2 md:row-span-1"
          />
          <FeatureItem
            title="Project Showcase"
            blurb="Rich media portfolios to demonstrate complex AI implementations."
            meta="Depth"
            icon={Layers}
            span="md:col-span-3 md:row-span-1"
          />
          <FeatureItem
            title="Smart Matching"
            blurb="Our algorithms match your needs with the perfect candidate."
            meta="Match"
            icon={BarChart3}
            span="md:col-span-3 md:row-span-1"
          />
        </div>

        {/* Glassmorphic Chips */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-center text-sm text-white/60 uppercase tracking-wider mb-8">
            Popular Skills on Our Platform
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {chips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
              >
                <chip.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                  {chip.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ 
  title, 
  blurb, 
  meta, 
  icon: Icon, 
  span = "" 
}: { 
  title: string, 
  blurb: string, 
  meta: string, 
  icon: any, 
  span?: string 
}) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/15 hover:border-white/25 hover:shadow-xl hover:shadow-blue-900/20 ${span}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 group-hover:bg-white/20 transition-colors">
          <Icon
            className="h-6 w-6 text-white"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1">
          <header className="flex items-start gap-3">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
              {title}
            </h3>
            {meta && (
              <span className="ml-auto rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 border border-white/10">
                {meta}
              </span>
            )}
          </header>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {blurb}
          </p>
        </div>
      </div>
    </article>
  );
}
