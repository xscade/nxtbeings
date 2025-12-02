"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trophy,
  Calendar,
  Users,
  Zap,
  Code,
  Brain,
  Rocket,
  Clock,
  MapPin,
  Gift,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe,
  Laptop,
  Sparkles,
  Target,
  Award,
  Play,
  Building2,
  Coffee,
  Mic,
  PartyPopper,
} from "lucide-react";

// Hackathon Tracks
const tracks = [
  {
    id: "ai-agents",
    name: "AI Agents",
    description: "Build autonomous agents that can reason, plan, and execute complex tasks",
    icon: Brain,
    color: "bg-blue-500",
    prizes: "$10,000",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Create tools that enhance developer productivity with AI",
    icon: Code,
    color: "bg-green-500",
    prizes: "$10,000",
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    description: "Push the boundaries of content creation with AI",
    icon: Sparkles,
    color: "bg-purple-500",
    prizes: "$10,000",
  },
  {
    id: "open-innovation",
    name: "Open Innovation",
    description: "Surprise us with your wildest AI-powered ideas",
    icon: Rocket,
    color: "bg-orange-500",
    prizes: "$10,000",
  },
];

// Timeline
const timeline = [
  {
    date: "Jan 15, 2025",
    time: "6:00 PM IST",
    title: "Registration Opens",
    description: "Sign up and form your team",
    icon: Calendar,
  },
  {
    date: "Jan 25, 2025",
    time: "10:00 AM IST",
    title: "Kickoff & Opening Ceremony",
    description: "Meet the sponsors, hear the keynote, start hacking!",
    icon: Rocket,
  },
  {
    date: "Jan 25-26",
    time: "48 Hours",
    title: "Hacking Period",
    description: "Build, iterate, and create something amazing",
    icon: Code,
  },
  {
    date: "Jan 26, 2025",
    time: "6:00 PM IST",
    title: "Submissions Due",
    description: "Submit your project and demo video",
    icon: Target,
  },
  {
    date: "Jan 27, 2025",
    time: "3:00 PM IST",
    title: "Demo Day & Awards",
    description: "Present to judges and win prizes!",
    icon: Trophy,
  },
];

// Prizes
const prizes = [
  { place: "1st", amount: "$15,000", perks: ["Featured on Nxtbeings", "1-year Pro membership", "Direct intro to VCs"] },
  { place: "2nd", amount: "$8,000", perks: ["Featured on Nxtbeings", "6-month Pro membership", "Mentorship session"] },
  { place: "3rd", amount: "$5,000", perks: ["Featured on Nxtbeings", "3-month Pro membership", "Swag kit"] },
];

// Past Winners
const pastWinners = [
  {
    project: "CodePilot AI",
    team: "Team Nexus",
    description: "AI pair programmer that understands your entire codebase",
    hackathon: "AI Builders 2024",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    project: "VoiceFlow",
    team: "Audio Wizards",
    description: "Real-time voice cloning for accessibility",
    hackathon: "GenAI Sprint 2024",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
  },
  {
    project: "DataMesh",
    team: "Query Masters",
    description: "Natural language interface for complex databases",
    hackathon: "Dev Tools Hack 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

// Sponsors
const sponsors = [
  { name: "OpenAI", tier: "platinum" },
  { name: "Google Cloud", tier: "platinum" },
  { name: "AWS", tier: "gold" },
  { name: "Microsoft", tier: "gold" },
  { name: "Anthropic", tier: "silver" },
  { name: "Vercel", tier: "silver" },
];

// FAQs
const faqs = [
  {
    question: "Who can participate?",
    answer: "Anyone 18+ with a passion for AI and building! Whether you're a student, professional, or self-taught developer, you're welcome. Teams of 1-4 members.",
  },
  {
    question: "Is it free to participate?",
    answer: "Yes! Participation is completely free. We provide API credits, cloud resources, and mentorship at no cost.",
  },
  {
    question: "Do I need a team?",
    answer: "You can participate solo or form a team of up to 4 people. We also have a team formation channel in our Discord to help you find teammates.",
  },
  {
    question: "Is it online or in-person?",
    answer: "This is a hybrid hackathon. You can participate fully online from anywhere in the world, or join us at our hub locations for an in-person experience.",
  },
  {
    question: "What can I build?",
    answer: "Anything AI-powered! Choose from our tracks or surprise us with your own idea. Projects must be built during the hackathon period.",
  },
  {
    question: "What resources will be provided?",
    answer: "All participants get free API credits from our sponsors (OpenAI, Google, AWS), cloud compute credits, and access to mentors throughout the event.",
  },
];

// Stats
const stats = [
  { value: "5,000+", label: "Participants" },
  { value: "$50K+", label: "In Prizes" },
  { value: "48", label: "Hours" },
  { value: "100+", label: "Projects Built" },
];

export default function HackathonsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Registration Open • Jan 25-26, 2025
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight"
            >
              Build the Future of AI
              <br />
              <span className="text-primary">in 48 Hours</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Join 5,000+ developers, designers, and AI enthusiasts for the biggest AI hackathon of the year. 
              $50K+ in prizes. World-class mentors. Your breakthrough moment.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-8 h-14 text-lg">
                Register Now — It&apos;s Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Last Year&apos;s Highlights
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Choose Your Track
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four exciting tracks, each with dedicated prizes and mentors. Pick one or go cross-track!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${track.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <track.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{track.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{track.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-foreground">{track.prizes}</span>
                  <span className="text-muted-foreground">in prizes</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Event Timeline
            </motion.h2>
            <p className="text-muted-foreground">Mark your calendar for these key moments</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <event.icon className="w-6 h-6" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-primary">{event.date}</span>
                    <span className="text-xs text-muted-foreground">• {event.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              $50,000+ in Prizes
            </motion.h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Plus exclusive perks, mentorship, and opportunities you won&apos;t find anywhere else
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {prizes.map((prize, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 text-center ${
                  i === 0 
                    ? "bg-white/20 backdrop-blur-sm border-2 border-yellow-400/50 scale-105" 
                    : "bg-white/10 backdrop-blur-sm border border-white/20"
                }`}
              >
                {i === 0 && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold mb-4">
                    <Star className="w-3 h-3 fill-yellow-900" />
                    GRAND PRIZE
                  </div>
                )}
                <div className="text-lg font-medium text-white/70 mb-1">{prize.place} Place</div>
                <div className="text-4xl font-bold mb-4">{prize.amount}</div>
                <ul className="space-y-2 text-sm text-left">
                  {prize.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-white/80">{perk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Track Prizes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/70 mb-4">Plus $10,000 per track for category winners</p>
            <div className="flex flex-wrap justify-center gap-3">
              {tracks.map((track) => (
                <div key={track.id} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                  {track.name}: {track.prizes}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              More Than Just a Hackathon
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, learn, and connect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Laptop, title: "Free API Credits", desc: "OpenAI, Google, AWS credits worth $500+" },
              { icon: Users, title: "Expert Mentors", desc: "1-on-1 sessions with industry leaders" },
              { icon: Mic, title: "Tech Talks", desc: "Learn from engineers at top AI companies" },
              { icon: Coffee, title: "Networking", desc: "Connect with 5,000+ builders like you" },
              { icon: Gift, title: "Swag & Goodies", desc: "Exclusive merch for all participants" },
              { icon: Building2, title: "Hiring Partners", desc: "Get noticed by top companies" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Past Winners & Projects
            </motion.h2>
            <p className="text-muted-foreground">Get inspired by previous hackathon champions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pastWinners.map((winner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden group hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={winner.image}
                    alt={winner.project}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-md bg-yellow-500 text-yellow-900 text-xs font-bold">
                      🏆 Winner
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{winner.project}</h3>
                  <p className="text-sm text-primary mb-2">{winner.team}</p>
                  <p className="text-sm text-muted-foreground mb-3">{winner.description}</p>
                  <span className="text-xs text-muted-foreground">{winner.hackathon}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <PartyPopper className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
              Join 5,000+ innovators and compete for $50K+ in prizes. Registration is free and takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-primary hover:bg-white/90 font-semibold">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-4">
              By registering, you agree to our Terms of Service and Code of Conduct
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

