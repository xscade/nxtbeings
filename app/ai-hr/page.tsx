"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Bot,
  ShieldCheck,
  Zap,
  FileText,
  Clock,
  BarChart3,
  Video,
  Users,
  CheckCircle2,
  AlertTriangle,
  Brain,
  TrendingUp,
  ArrowRight,
  Upload,
  CreditCard,
  FileCheck,
  Activity,
  Eye,
  Lock,
  PlayCircle,
} from "lucide-react";

// Features
const features = [
  {
    icon: ShieldCheck,
    title: "Advanced Cheating Detection",
    description: "Detects human cheating behaviors and software-based cheating tools like Parakeet AI Detection with industry-leading accuracy.",
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Trained on 10,000+ real interview sessions to identify patterns, inconsistencies, and suspicious behaviors.",
  },
  {
    icon: Zap,
    title: "48-Hour Turnaround",
    description: "Get comprehensive interview results, shortlisted candidates, and detailed reports within 48 hours of candidate interviews.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Visual graphs and reports highlight high-suspicion points, allowing you to review and verify flagged moments.",
  },
  {
    icon: Video,
    title: "Full Session Recordings",
    description: "Access complete interview recordings with timestamps for every interaction and response.",
  },
  {
    icon: FileCheck,
    title: "Automated Shortlisting",
    description: "Receive a curated list of qualified candidates ranked by AI analysis and fit score.",
  },
];

// How It Works Steps
const workflowSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Job Description",
    description: "Simply upload your job description. Our AI understands requirements and prepares tailored interview questions.",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Fund Your AI Agent",
    description: "Fund your AI interview agent to begin the automated screening process.",
  },
  {
    step: "03",
    icon: Bot,
    title: "AI Conducts Interviews",
    description: "Your AI agent automatically interviews candidates, detecting cheating behaviors and software in real-time.",
  },
  {
    step: "04",
    icon: FileCheck,
    title: "Get Results in 48 Hours",
    description: "Receive interview results, shortlisted candidates, session recordings, and detailed reports with suspicion graphs.",
  },
];

// Capabilities
const capabilities = [
  {
    icon: Eye,
    title: "Human Cheating Detection",
    description: "Identifies suspicious behaviors like looking off-screen, using notes, or receiving assistance during interviews.",
  },
  {
    icon: Lock,
    title: "Software Detection",
    description: "Detects cheating software and tools including Parakeet AI Detection and similar applications.",
  },
  {
    icon: Activity,
    title: "Behavioral Analysis",
    description: "Analyzes response patterns, timing, and consistency to flag potential dishonesty.",
  },
  {
    icon: BarChart3,
    title: "Suspicion Scoring",
    description: "Provides visual graphs showing high-suspicion points with timestamps for easy review.",
  },
];

// Benefits
const benefits = [
  {
    icon: ShieldCheck,
    title: "Zero False Positives",
    subtitle: "Accurate detection.",
    description: "Our AI is trained on 10,000+ interviews to minimize false positives and ensure reliable results.",
  },
  {
    icon: Zap,
    title: "Save Time",
    subtitle: "Automated screening.",
    description: "Eliminate hours of manual interview review. Get comprehensive results in 48 hours.",
  },
  {
    icon: TrendingUp,
    title: "Better Hires",
    subtitle: "Quality candidates.",
    description: "Identify the most qualified and honest candidates through AI-powered analysis.",
  },
];

export default function AIHRPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
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
            <Bot className="w-4 h-4" />
            AI-Powered HR Solution
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            IntelliScreen AI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Interview with Confidence
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            AI-powered interview screening that detects cheating, analyzes candidates, and delivers comprehensive results in 48 hours. Trained on 10,000+ interview sessions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base hover:bg-muted">
              Watch Demo
              <PlayCircle className="ml-2 w-4 h-4" />
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
              <span>10,000+ Training Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>48-Hour Results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Advanced Cheating Detection</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Powerful Features for <span className="text-slate-400">Modern Hiring</span>
            </motion.h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Everything you need to conduct fair, efficient, and accurate candidate screening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Blue Gradient */}
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
              How It Works
              <br />
              <span className="text-blue-100">Simple & Fast</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Get started in minutes. Get results in 48 hours.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="h-full bg-white/10 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-900/20 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center text-sm font-bold shrink-0">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                      <step.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-blue-100 leading-relaxed text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Capabilities Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Advanced Cheating <span className="text-slate-400">Detection</span>
            </motion.h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our AI detects both human cheating behaviors and software-based cheating tools with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <capability.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Special Highlight Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-primary/5 rounded-2xl border border-primary/20 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Software Detection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI is specifically trained to detect cheating software including <strong>Parakeet AI Detection</strong> and similar tools. 
                  We continuously update our detection models to stay ahead of new cheating technologies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results & Reports Section - Blue Gradient */}
      <section className="py-32 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1]"
            >
              Comprehensive Results
              <br />
              <span className="text-blue-100">In 48 Hours</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Everything you need to make informed hiring decisions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck,
                title: "Interview Results",
                description: "Detailed analysis of each candidate's performance, responses, and overall fit.",
              },
              {
                icon: Users,
                title: "Shortlisted Candidates",
                description: "Curated list of qualified candidates ranked by AI analysis and fit score.",
              },
              {
                icon: Video,
                title: "Session Recordings",
                description: "Complete interview recordings with timestamps for every interaction.",
              },
              {
                icon: BarChart3,
                title: "Suspicion Reports",
                description: "Visual graphs highlighting high-suspicion points with timestamps for review.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="h-full bg-white/10 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-900/20 border border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-blue-600 transition-all duration-500 border border-white/20">
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Why Choose <span className="text-slate-400">IntelliScreen AI</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {benefit.title}
                    <br />
                    <span className="text-muted-foreground text-lg">{benefit.subtitle}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mt-4">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Training Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-primary/5 rounded-2xl border border-primary/20 p-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Brain className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Trained on 10,000+ Interview Sessions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI has been trained on a vast dataset of real interview sessions, enabling it to identify patterns, 
                  detect cheating behaviors, and provide accurate assessments with high confidence.
                </p>
              </div>
            </div>
          </motion.div>
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
              <Bot className="w-4 h-4 text-blue-200" />
              Ready to transform your hiring?
            </div>

            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              Start Screening with
              <br />
              <span className="text-blue-100">AI Confidence</span>
            </h2>

            <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto font-light">
              Upload your job description, fund your AI agent, and get comprehensive results in 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-blue-900/20"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <button
                className="h-14 px-10 rounded-full text-base font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

