"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Brain,
  Code2,
  Database,
  Bot,
  FileText,
  BarChart3,
  Eye,
  MessageSquare,
  Settings,
  TrendingUp,
  Lock,
  Activity,
} from "lucide-react";

// Main Services
const mainServices = [
  {
    icon: Zap,
    title: "AI Workflow Automation",
    description: "Streamline business processes with intelligent automation solutions powered by AI.",
  },
  {
    icon: Code2,
    title: "N8N Implementation",
    description: "Build robust workflow automation systems using N8N with AI-enhanced capabilities.",
  },
  {
    icon: Brain,
    title: "Langchain Development",
    description: "Create sophisticated AI applications using Langchain for complex language processing tasks.",
  },
  {
    icon: Bot,
    title: "LLM Integration & Fine-tuning",
    description: "Seamlessly integrate large language models and fine-tune them for your specific use cases.",
  },
  {
    icon: Sparkles,
    title: "AI Agent Development",
    description: "Build autonomous AI agents that can handle complex tasks and decision-making processes.",
  },
  {
    icon: Database,
    title: "RAG Systems",
    description: "Implement Retrieval-Augmented Generation systems for enhanced AI knowledge access.",
  },
  {
    icon: Settings,
    title: "AI Model Deployment & MLOps",
    description: "Deploy and manage AI models at scale with enterprise-grade MLOps infrastructure.",
  },
];

// Featured Services
const featuredServices = [
  {
    icon: Brain,
    title: "Custom AI Solution Architecture",
    description: "Design end-to-end AI solutions tailored to your business needs.",
  },
  {
    icon: Database,
    title: "Vector Database Implementation",
    description: "Set up and optimize vector databases for semantic search and AI applications.",
  },
  {
    icon: MessageSquare,
    title: "Prompt Engineering Services",
    description: "Optimize prompts for maximum AI performance and accuracy.",
  },
  {
    icon: Bot,
    title: "AI Chatbot Development",
    description: "Create intelligent chatbots that understand context and deliver exceptional user experiences.",
  },
  {
    icon: FileText,
    title: "Document AI & Processing",
    description: "Automate document processing with AI-powered extraction and analysis.",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Analytics",
    description: "Transform data into actionable insights with advanced AI analytics.",
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    description: "Implement computer vision systems for image and video analysis.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Build NLP systems for text analysis, sentiment detection, and language understanding.",
  },
  {
    icon: Code2,
    title: "AI API Integration",
    description: "Integrate AI capabilities into your existing systems via robust APIs.",
  },
  {
    icon: TrendingUp,
    title: "AI Model Training & Optimization",
    description: "Train and optimize AI models for peak performance and efficiency.",
  },
  {
    icon: Lock,
    title: "AI Security & Governance",
    description: "Ensure AI systems are secure, compliant, and ethically deployed.",
  },
  {
    icon: Activity,
    title: "AI Performance Monitoring",
    description: "Monitor and maintain AI systems with comprehensive performance tracking.",
  },
];

// Benefits
const benefits = [
  {
    icon: ShieldCheck,
    title: "Expert Team",
    subtitle: "AI specialists.",
    description: "Work with certified AI engineers and researchers with proven track records in enterprise AI implementations.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    subtitle: "Rapid deployment.",
    description: "Accelerate your AI initiatives with our streamlined development and deployment processes.",
  },
  {
    icon: Brain,
    title: "Cutting-Edge",
    subtitle: "Latest technologies.",
    description: "Leverage the most advanced AI frameworks, models, and tools available in the market.",
  },
];

export default function AIConsultingPage() {
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
            <Sparkles className="w-4 h-4" />
            AI Consulting
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Transform Your Business
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              With AI Consulting
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Partner with our expert AI consultants to build, deploy, and scale intelligent solutions that drive real business value.
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
              Schedule a Consultation
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
              <span>Expert AI Consultants</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Proven Track Record</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Enterprise Solutions</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Our AI Consulting <span className="text-slate-400">Services</span>
            </motion.h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Comprehensive AI solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service, i) => (
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
                    <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Why choose our
              <br />
              <span className="text-blue-100">AI consulting.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed"
            >
              We combine deep AI expertise with business acumen to deliver solutions that matter.
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

      {/* Featured Services Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
            >
              Featured <span className="text-slate-400">Services</span>
            </motion.h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Specialized AI solutions for advanced use cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
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
              <Sparkles className="w-4 h-4 text-blue-200" />
              Ready to get started?
            </div>

            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              Let's build your
              <br />
              <span className="text-blue-100">AI future together.</span>
            </h2>

            <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto font-light">
              Schedule a consultation with our AI experts and discover how we can transform your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-blue-900/20"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <button
                className="h-14 px-10 rounded-full text-base font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

