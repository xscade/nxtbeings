"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Timer,
  Cpu,
  BadgeCheck,
  TrendingUp,
  Terminal,
  Layers,
} from "lucide-react";

// Countdown Timer Hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return timeLeft;
}

// Hackathon Tracks with visual elements
const tracks = [
  {
    id: "ai-agents",
    name: "AI Agents",
    tagline: "Autonomous & Intelligent",
    description: "Build agents that reason, plan, and execute complex tasks autonomously",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    prizes: "$10,000",
    participants: "1,200+",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    tagline: "Build for Builders",
    description: "Create tools that supercharge developer productivity with AI",
    icon: Terminal,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    prizes: "$10,000",
    participants: "980+",
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    tagline: "Create the Impossible",
    description: "Push boundaries in content, art, music, and creative expression",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&h=600&fit=crop",
    prizes: "$10,000",
    participants: "1,500+",
  },
  {
    id: "open-innovation",
    name: "Open Innovation",
    tagline: "Surprise Us",
    description: "Your wildest ideas welcome. No constraints, maximum creativity",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    prizes: "$10,000",
    participants: "800+",
  },
];

// Timeline with visual elements
const timeline = [
  { date: "Jan 15", title: "Registration Opens", icon: Calendar, status: "upcoming" },
  { date: "Jan 25", title: "Kickoff Ceremony", icon: Rocket, status: "upcoming" },
  { date: "48 Hours", title: "Build Phase", icon: Code, status: "main" },
  { date: "Jan 26", title: "Submissions Close", icon: Target, status: "upcoming" },
  { date: "Jan 27", title: "Demo Day & Awards", icon: Trophy, status: "upcoming" },
];

// Judges/Mentors
const judges = [
  { name: "Sarah Chen", role: "AI Research Lead", company: "OpenAI", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "VP Engineering", company: "Anthropic", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya Sharma", role: "Founder & CEO", company: "TechAI", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { name: "Alex Kim", role: "ML Engineer", company: "Google DeepMind", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
];

// Past Winners
const pastWinners = [
  {
    project: "CodePilot AI",
    team: "Team Nexus",
    description: "AI pair programmer that understands your entire codebase context",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    prize: "Grand Prize",
  },
  {
    project: "VoiceFlow",
    team: "Audio Wizards",
    description: "Real-time voice cloning for accessibility and content creation",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
    prize: "Best GenAI",
  },
  {
    project: "DataMesh",
    team: "Query Masters",
    description: "Natural language interface for complex database queries",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    prize: "Best DevTool",
  },
];

// FAQs
const faqs = [
  { q: "Who can participate?", a: "Anyone 18+ with a passion for AI! Students, professionals, self-taught developers - all welcome. Teams of 1-4 members." },
  { q: "Is it free?", a: "Yes! Free to participate. We provide API credits, cloud resources, and mentorship at no cost." },
  { q: "Do I need a team?", a: "You can go solo or form a team of up to 4. We have a Discord channel for team formation." },
  { q: "What resources are provided?", a: "Free API credits from OpenAI, Google, AWS. Cloud compute. 24/7 mentor access. All the tools you need." },
];

export default function HackathonsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [activeTrack, setActiveTrack] = useState(0);
  const targetDate = new Date("2025-01-25T10:00:00");
  const countdown = useCountdown(targetDate);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
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
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-foreground">Registration Open</span>
                <span className="w-px h-4 bg-border" />
                <span className="text-sm text-primary font-semibold">Jan 25-26, 2025</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4">
                Build the Future
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  in 48 Hours
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join 5,000+ developers, designers, and AI enthusiasts for the biggest AI hackathon. 
                $50K+ in prizes. World-class mentors. Your breakthrough moment.
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4 mb-10"
            >
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg shadow-primary/5">
                    <span className="text-2xl md:text-3xl font-bold text-foreground">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-8 h-14 text-lg">
                Register Now — Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch 2024 Highlights
              </Button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16"
            >
              {[
                { value: "5,000+", label: "Participants", icon: Users },
                { value: "$50K+", label: "In Prizes", icon: Trophy },
                { value: "48", label: "Hours", icon: Timer },
                { value: "100+", label: "Projects", icon: Layers },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] hidden lg:block"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center">
            <Code className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[10%] hidden lg:block"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 flex items-center justify-center">
            <Brain className="w-7 h-7 text-indigo-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-[15%] hidden lg:block"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 backdrop-blur-sm border border-violet-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-violet-500" />
          </div>
        </motion.div>
      </section>

      {/* Tracks Section - Interactive Cards */}
      <section className="py-32 bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Animated Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 border border-white/5 rounded-full"
        />

        <div className="container relative z-10 mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6"
            >
              Choose Your Path
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            >
              Four Tracks.
              <br />
              <span className="text-blue-200">Infinite Possibilities.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-100 text-lg max-w-2xl mx-auto"
            >
              Each track has dedicated prizes, mentors, and resources. Pick one or go cross-track!
            </motion.p>
          </div>

          {/* Interactive Track Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Track Tabs */}
            <div className="space-y-4">
              {tracks.map((track, i) => (
                <motion.button
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveTrack(i)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeTrack === i
                      ? "bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-2xl"
                      : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      activeTrack === i ? "bg-white text-blue-600" : "bg-white/10 text-white"
                    }`}>
                      <track.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-semibold">{track.name}</h3>
                        <span className="text-sm text-blue-200">{track.participants}</span>
                      </div>
                      <p className="text-sm text-blue-200 mb-2">{track.tagline}</p>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">{track.prizes}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Track Preview */}
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden h-[500px] hidden lg:block"
            >
              <Image
                src={tracks[activeTrack].image}
                alt={tracks[activeTrack].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {React.createElement(tracks[activeTrack].icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{tracks[activeTrack].name}</h3>
                    <p className="text-blue-200 text-sm">{tracks[activeTrack].tagline}</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6">{tracks[activeTrack].description}</p>
                <Button className="rounded-full bg-white text-blue-600 hover:bg-white/90">
                  Explore {tracks[activeTrack].name} Track
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">48-Hour</span> Journey
            </motion.h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From kickoff to demo day, every moment counts
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {timeline.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center group"
                >
                  {/* Connector Dot */}
                  <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                    event.status === "main" 
                      ? "bg-primary border-primary scale-150" 
                      : "bg-background border-primary/50 group-hover:border-primary group-hover:bg-primary/10"
                  } transition-all z-10`} />
                  
                  {/* Card */}
                  <div className={`p-6 rounded-2xl border transition-all ${
                    event.status === "main"
                      ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                      : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                  }`}>
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                      event.status === "main" ? "bg-white/20" : "bg-primary/10"
                    }`}>
                      <event.icon className={`w-6 h-6 ${event.status === "main" ? "text-white" : "text-primary"}`} />
                    </div>
                    <div className={`text-sm font-semibold mb-1 ${event.status === "main" ? "text-white/80" : "text-primary"}`}>
                      {event.date}
                    </div>
                    <h3 className={`font-semibold ${event.status === "main" ? "text-white" : "text-foreground"}`}>
                      {event.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-yellow-500/30"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              $50,000+ in Prizes
            </motion.h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Plus exclusive perks, mentorship, and opportunities
            </p>
          </div>

          {/* Prize Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { place: "1st", amount: "$15,000", color: "from-yellow-400 to-orange-500", shadow: "shadow-yellow-500/20" },
              { place: "2nd", amount: "$8,000", color: "from-slate-300 to-slate-400", shadow: "shadow-slate-400/20" },
              { place: "3rd", amount: "$5,000", color: "from-amber-600 to-amber-700", shadow: "shadow-amber-600/20" },
            ].map((prize, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-card rounded-3xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-xl transition-all ${
                  i === 0 ? "md:-translate-y-4" : ""
                }`}
              >
                {i === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold shadow-lg">
                    GRAND PRIZE
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prize.color} mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg ${prize.shadow}`}>
                  {prize.place}
                </div>
                <div className="text-4xl font-bold text-foreground mb-4">{prize.amount}</div>
                <ul className="space-y-3 text-sm text-left">
                  {["Featured on Nxtbeings", "Pro membership", "VC introductions"].slice(0, i === 0 ? 3 : i === 1 ? 2 : 1).map((perk, j) => (
                    <li key={j} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {perk}
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
            <p className="text-muted-foreground mb-4">Plus $10,000 per track for category winners</p>
            <div className="flex flex-wrap justify-center gap-3">
              {tracks.map((track) => (
                <div key={track.id} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm">
                  <track.icon className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{track.name}</span>
                  <span className="text-primary font-semibold">{track.prizes}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Judges Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Learn from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Best</span>
            </motion.h2>
            <p className="text-muted-foreground">Judges and mentors from leading AI companies</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {judges.map((judge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary/50 transition-colors">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{judge.name}</h3>
                <p className="text-sm text-muted-foreground">{judge.role}</p>
                <p className="text-xs text-primary font-medium">{judge.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="py-24 bg-gradient-to-b from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Hall of Fame
            </motion.h2>
            <p className="text-blue-200">Previous hackathon champions who shipped greatness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pastWinners.map((winner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={winner.image}
                    alt={winner.project}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-500 text-yellow-900 text-xs font-bold flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {winner.prize}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{winner.project}</h3>
                  <p className="text-blue-200 text-sm mb-3">{winner.team}</p>
                  <p className="text-white/70 text-sm">{winner.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Got Questions?
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
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px]" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <Code className="w-10 h-10 text-white/50" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-[10%] w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <Rocket className="w-8 h-8 text-white/50" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm mx-auto mb-8 flex items-center justify-center border border-white/30"
          >
            <PartyPopper className="w-12 h-12" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Ready to Build
            <br />
            Something Amazing?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto mb-10"
          >
            Join 5,000+ innovators. $50K+ in prizes. 48 hours. One opportunity.
            Registration is free and takes less than 2 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
            />
            <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-blue-600 hover:bg-white/90 font-semibold shadow-lg shadow-black/20">
              Register Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-sm mt-6"
          >
            By registering, you agree to our Terms of Service and Code of Conduct
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
