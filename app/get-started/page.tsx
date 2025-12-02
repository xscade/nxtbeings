"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export default function GetStartedPage() {
  const router = useRouter();

  const handleSelect = (role: "company" | "talent") => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Background Effects - Subtle and Elegant */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/15 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Back Link - Circular Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted border border-border flex items-center justify-center transition-all group-hover:scale-105">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back to home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Get Started with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Nxtbeings</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Choose how you&apos;d like to join the AI talent network
          </p>
        </motion.div>

        {/* Options - iOS Glassmorphic Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Company Option */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect("company")}
            className="group text-left relative"
          >
            {/* iOS Glassmorphic Card */}
            <div className="relative h-full p-8 md:p-10 rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              {/* Blue Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-3xl" />
              
              {/* Glass overlay with iOS-style blur */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-600/30" />
              
              {/* Inner highlight for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl" />
              
              {/* Top border highlight - iOS style */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl" />
              
              {/* Subtle inner shadow */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with glass effect */}
                <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center mb-6 group-hover:bg-white/35 group-hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-600/40">
                  <Building2 className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                  I&apos;m hiring
                </h2>
                
                {/* Description */}
                <p className="text-white/90 text-base leading-relaxed mb-8">
                  Find pre-vetted AI engineers, researchers, and creative technologists for your team.
                </p>
                
                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 rounded-3xl transition-all duration-500 pointer-events-none" />
            </div>
          </motion.button>

          {/* Talent Option */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect("talent")}
            className="group text-left relative"
          >
            {/* iOS Glassmorphic Card */}
            <div className="relative h-full p-8 md:p-10 rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              {/* Blue Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-3xl" />
              
              {/* Glass overlay with iOS-style blur */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-600/30" />
              
              {/* Inner highlight for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl" />
              
              {/* Top border highlight - iOS style */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl" />
              
              {/* Subtle inner shadow */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with glass effect */}
                <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center mb-6 group-hover:bg-white/35 group-hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-600/40">
                  <Sparkles className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                  I&apos;m a professional
                </h2>
                
                {/* Description */}
                <p className="text-white/90 text-base leading-relaxed mb-8">
                  Join the network, showcase your AI expertise, and get discovered by top companies.
                </p>
                
                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 rounded-3xl transition-all duration-500 pointer-events-none" />
            </div>
          </motion.button>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </motion.p>
      </div>
    </div>
  );
}

