"use client";

import React from "react";
import { Aperture, BarChart3, LayoutGrid, Activity, Layers } from "lucide-react";

export function Features() {
  return (
    <div className="relative w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white transition-colors duration-500">
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/20 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.35em] text-blue-100/80">
              Core Features
            </span>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl text-white">
              Built for the Intelligence Age
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-sm text-blue-100 md:text-base">
              A platform designed to showcase the skills that matter most in the new era of technology.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(120px,auto)] md:grid-cols-6">
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
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md backdrop-blur-sm ${span}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <Icon
            className="h-6 w-6 text-white"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1">
          <header className="flex items-start gap-3">
            <h3 className="text-base font-semibold uppercase tracking-wide text-white">
              {title}
            </h3>
            {meta && (
              <span className="ml-auto rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-blue-100/80">
                {meta}
              </span>
            )}
          </header>
          <p className="mt-2 text-sm leading-relaxed text-blue-100">
            {blurb}
          </p>
        </div>
      </div>
    </article>
  );
}

