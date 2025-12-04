"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Sparkles,
  Users,
  Target,
  Eye,
  Rocket,
  Brain,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Trophy,
  Code,
  Briefcase,
  GraduationCap,
  Zap,
  Shield,
  Globe,
  Lightbulb,
  TrendingUp,
  Award,
  Camera,
  Video,
  Mic,
  Coffee,
  Gamepad2,
  BookOpen,
  MessageSquare,
  ExternalLink,
  FileText,
} from "lucide-react";

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    title: "Hackathon Event",
    category: "Events",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    title: "Tech Talk Session",
    category: "Events",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    title: "Workshop",
    category: "Events",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    title: "Team Collaboration",
    category: "Community",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=600&fit=crop",
    title: "Awards Ceremony",
    category: "Events",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
    title: "Networking",
    category: "Community",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    title: "Mentorship Session",
    category: "Community",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    title: "Coding Challenge",
    category: "Events",
  },
];

// Community activities
const communityActivities = [
  {
    icon: Code,
    title: "Hackathons",
    description: "48-hour coding marathons with $50K+ in prizes",
    href: "/hackathons",
    color: "from-blue-500 to-primary",
  },
  {
    icon: Mic,
    title: "Tech Talks",
    description: "Learn from industry leaders and AI experts",
    href: "#",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: GraduationCap,
    title: "Workshops",
    description: "Hands-on learning sessions on AI and development",
    href: "#",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Trophy,
    title: "Coding Challenges",
    description: "Test your skills and compete with peers",
    href: "#",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Get guidance from experienced professionals",
    href: "#",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Briefcase,
    title: "Mock Interviews",
    description: "Practice interviews with AI-powered feedback",
    href: "#",
    color: "from-rose-500 to-red-500",
  },
];

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-8"
          >
            <Building2 className="w-4 h-4" />
            A Subsidiary of Xscade Technologies Private Limited
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Building the Future of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
              AI Talent
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We&apos;re revolutionizing how companies find AI-literate talent and how professionals thrive in the age of artificial intelligence.
          </motion.p>

          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 bg-card rounded-2xl border border-border p-6 shadow-lg shadow-primary/10"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Founder & CEO</p>
              <p className="text-lg font-semibold text-foreground">Namballa Ravi Kiran</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              The Problem We Found
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Hiring Challenge
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-xl shadow-primary/5"
          >
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At <strong className="text-foreground">Xscade Technologies</strong>, we experienced a critical problem firsthand: finding the right talent quickly for our own project needs was nearly impossible. Traditional hiring platforms weren&apos;t solving the real challenge.
              </p>
              <p>
                In today&apos;s world, having talent is not sufficient. This is the <strong className="text-foreground">age of intelligence</strong>. Companies are evolving rapidly, and finding talent with <strong className="text-foreground">AI literacy</strong> is extremely low.
              </p>
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 mt-8">
                <p className="text-foreground font-semibold mb-2">The Reality:</p>
                <p>
                  A person who can do more in the same time with ease, with the help of AI, will be significantly more productive to the company. Yet, most platforms don&apos;t focus on AI-literate professionals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution for Companies */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-6">
              <Building2 className="w-4 h-4" />
              For Companies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Intelligent AI HR System
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automatically find the right candidate and save time with our AI-powered screening and interviewing system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Smart Screening",
                description: "AI automatically finds the right candidates based on your requirements",
              },
              {
                icon: Video,
                title: "AI Interviews",
                description: "Automated interviews with intelligent analysis and candidate evaluation",
              },
              {
                icon: FileText,
                title: "Detailed Reports",
                description: "Get recorded interviews with comprehensive reports on a timeline",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution for Talent */}
      <section className="relative py-24 px-4 overflow-hidden bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-6">
              <Users className="w-4 h-4" />
              For Talent
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Path to Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In the age of AI, skilled professionals losing jobs can rebuild their careers with us
            </p>
          </motion.div>

          {/* Journey Steps */}
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Register on Platform",
                description: "Create your profile and join the Nxtbeings community",
                icon: Users,
              },
              {
                step: "02",
                title: "Complete KYC",
                description: "Verify your identity by paying the basic KYC fee to ensure platform security",
                icon: Shield,
              },
              {
                step: "03",
                title: "Complete Profile Projects",
                description: "Work on a few projects in your domain assigned by Nxtbeings, enhanced with AI tools",
                icon: Code,
              },
              {
                step: "04",
                title: "Freelance Projects",
                description: "Start working on freelance projects and build your portfolio",
                icon: Briefcase,
              },
              {
                step: "05",
                title: "Get Hired Full-Time",
                description: "Companies discover you and offer full-time positions based on your proven skills",
                icon: Trophy,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-primary font-bold">{item.step}</span>
                      <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border p-8 md:p-12"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To bridge the gap between AI-literate talent and forward-thinking companies, creating a future where professionals thrive with AI tools and companies find the perfect match efficiently. We empower skilled individuals to adapt and excel in the age of artificial intelligence while helping businesses build high-performing teams.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-8 md:p-12"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become the world&apos;s leading AI-native talent network, where every professional is AI-literate and every company finds their ideal team members effortlessly. We envision a future where AI enhances human potential rather than replacing it, creating a thriving ecosystem of innovation and growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-6">
              <Camera className="w-4 h-4" />
              Gallery
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Community in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Moments from our events, workshops, hackathons, and community gatherings
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm">{image.title}</p>
                    <p className="text-white/80 text-xs">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Events */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Community & Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Building Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We run vibrant communities and conduct events that bring together talent, companies, and innovators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={activity.href}>
                  <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{activity.description}</p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Link href="/hackathons">
                Explore All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join the Future of Work
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether you&apos;re a company looking for AI-literate talent or a professional ready to thrive in the age of AI, we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Link href="/get-started">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border hover:bg-primary/10 hover:text-primary">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

