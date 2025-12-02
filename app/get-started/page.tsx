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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-background">
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
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[100px]"
        />
        
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Get Started with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Nxtbeings
            </span>
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-md mx-auto">
            Choose how you&apos;d like to join the AI talent network
          </p>
        </motion.div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Company Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => handleSelect("company")}
            className="group text-left"
          >
            <div className="relative h-full p-8 rounded-2xl border border-border bg-card hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-6">
                <Building2 className="w-7 h-7" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-xl font-semibold text-foreground mb-2">
                I&apos;m hiring
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Find pre-vetted AI engineers, researchers, and creative technologists for your team.
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>

          {/* Talent Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => handleSelect("talent")}
            className="group text-left"
          >
            <div className="relative h-full p-8 rounded-2xl border border-border bg-card hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-6">
                <Sparkles className="w-7 h-7" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-xl font-semibold text-foreground mb-2">
                I&apos;m a professional
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Join the network, showcase your AI expertise, and get discovered by top companies.
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium text-violet-600 group-hover:gap-3 transition-all">
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </div>
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

