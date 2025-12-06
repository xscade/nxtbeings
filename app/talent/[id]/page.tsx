"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { AIInterviewModal } from "@/components/interviews/AIInterviewModal";
import { 
  MapPin,
  Star,
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  Globe,
  Mail,
  MessageSquare,
  Heart,
  Share2,
  Award,
  GraduationCap,
  Building2,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Play,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  Shield,
  Zap,
  TrendingUp,
  Users,
  BadgeCheck,
  ArrowRight,
  Video
} from "lucide-react";

// Sample talent data (in production, this would come from API based on ID)
const talentData = {
  id: "1",
  name: "Sarah Chenn",
  title: "Senior AI Engineer & Machine Learning Specialist",
  tagline: "Building intelligent systems that solve real-world problems",
  location: "San Francisco, USA",
  timezone: "PST (UTC-8)",
  hourlyRate: 150,
  rating: 4.9,
  totalReviews: 47,
  jobsCompleted: 52,
  successRate: 98,
  responseTime: "< 2 hours",
  memberSince: "Jan 2022",
  verified: true,
  available: true,
  availableFrom: "Immediately",
  weeklyAvailability: "30+ hrs/week",
  bio: `I'm a Senior AI Engineer with 8+ years of experience building production-grade machine learning systems. Previously at Google AI and OpenAI, I've led teams that shipped products used by millions.

My expertise spans:
• Large Language Models (LLMs) - Fine-tuning, RAG systems, prompt engineering
• Computer Vision - Object detection, image classification, OCR
• MLOps - Model deployment, monitoring, and scaling
• Data Engineering - Building robust data pipelines

I'm passionate about translating complex AI capabilities into practical business solutions. Whether you need to build an AI-powered product from scratch or optimize existing ML systems, I can help you achieve measurable results.`,
  skills: [
    { name: "Python", level: "Expert", years: 8 },
    { name: "TensorFlow", level: "Expert", years: 6 },
    { name: "PyTorch", level: "Expert", years: 5 },
    { name: "LLMs/GPT", level: "Expert", years: 3 },
    { name: "Computer Vision", level: "Expert", years: 5 },
    { name: "AWS/GCP", level: "Advanced", years: 6 },
    { name: "Kubernetes", level: "Advanced", years: 4 },
    { name: "MLOps", level: "Expert", years: 5 },
    { name: "RAG Systems", level: "Expert", years: 2 },
    { name: "Data Engineering", level: "Advanced", years: 6 },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Native" },
    { name: "Spanish", level: "Conversational" },
  ],
  experience: [
    {
      title: "Senior AI Engineer",
      company: "Google AI",
      location: "Mountain View, CA",
      period: "2020 - 2023",
      description: "Led a team of 5 engineers building NLP models for Google Search. Improved query understanding by 23%.",
    },
    {
      title: "Machine Learning Engineer",
      company: "OpenAI",
      location: "San Francisco, CA",
      period: "2018 - 2020",
      description: "Worked on GPT model optimization and deployment infrastructure. Reduced inference latency by 40%.",
    },
    {
      title: "Data Scientist",
      company: "Airbnb",
      location: "San Francisco, CA",
      period: "2016 - 2018",
      description: "Built recommendation systems and fraud detection models. Increased booking conversion by 15%.",
    },
  ],
  education: [
    {
      degree: "M.S. Computer Science (AI Specialization)",
      school: "Stanford University",
      year: "2016",
    },
    {
      degree: "B.S. Computer Science",
      school: "UC Berkeley",
      year: "2014",
    },
  ],
  certifications: [
    { name: "Google Cloud Professional ML Engineer", issuer: "Google", year: "2023" },
    { name: "AWS Certified Machine Learning", issuer: "Amazon", year: "2022" },
    { name: "Deep Learning Specialization", issuer: "Coursera/DeepLearning.AI", year: "2021" },
  ],
  portfolio: {
    links: [
      { type: "github", url: "https://github.com/sarahchen", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/sarahchen", title: "LinkedIn" },
      { type: "website", url: "https://sarahchen.dev", title: "Personal Website" },
      { type: "twitter", url: "https://twitter.com/sarahchen_ai", title: "Twitter" },
    ],
    projects: [
      {
        title: "AI-Powered Document Assistant",
        description: "Built a RAG-based document Q&A system processing 10M+ documents for a Fortune 500 company. Achieved 95% accuracy on complex queries.",
        techStack: ["Python", "LangChain", "GPT-4", "Pinecone", "FastAPI"],
        imageUrl: null,
        repoUrl: "https://github.com/sarahchen/doc-assistant",
        liveUrl: null,
      },
      {
        title: "Real-time Fraud Detection System",
        description: "Designed and deployed an ML pipeline processing 1M+ transactions/day with 99.7% accuracy and <50ms latency.",
        techStack: ["PyTorch", "Kafka", "Kubernetes", "Redis"],
        imageUrl: null,
        repoUrl: null,
        liveUrl: null,
      },
      {
        title: "Computer Vision Quality Control",
        description: "Developed an automated visual inspection system for manufacturing, reducing defect rates by 60%.",
        techStack: ["TensorFlow", "OpenCV", "Edge Deployment", "NVIDIA Jetson"],
        imageUrl: null,
        repoUrl: null,
        liveUrl: null,
      },
    ],
    files: [
      { type: "pdf", name: "AI Strategy Whitepaper.pdf", url: "#" },
      { type: "video", name: "Conference Talk - MLOps Best Practices", url: "#" },
    ],
  },
  reviews: [
    {
      clientName: "John M.",
      clientCompany: "TechCorp Inc.",
      rating: 5,
      date: "Nov 2024",
      comment: "Sarah is exceptional. She delivered a complex ML pipeline ahead of schedule and provided thorough documentation. Her communication was clear throughout the project. Highly recommend!",
      projectType: "AI/ML Development",
    },
    {
      clientName: "Emily R.",
      clientCompany: "FinanceAI",
      rating: 5,
      date: "Oct 2024",
      comment: "Outstanding work on our fraud detection system. Sarah's expertise in ML and her ability to translate business requirements into technical solutions is remarkable.",
      projectType: "Data Science",
    },
    {
      clientName: "Michael K.",
      clientCompany: "HealthTech Solutions",
      rating: 5,
      date: "Sep 2024",
      comment: "Sarah helped us implement an AI-powered diagnostic tool. Her knowledge of both ML and healthcare regulations was invaluable. Will definitely work with her again.",
      projectType: "AI Consulting",
    },
  ],
  stats: {
    onTimeDelivery: 100,
    onBudget: 98,
    repeatClients: 85,
  },
};

export default function TalentProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "reviews">("overview");
  const [showAIInterviewModal, setShowAIInterviewModal] = useState(false);
  const talent = talentData;

  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github": return Github;
      case "linkedin": return Linkedin;
      case "twitter": return Twitter;
      default: return Globe;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-0 bg-primary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end pb-8">
            {/* Profile Image & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-4xl font-bold">
                  {talent.name.split(" ").map(n => n[0]).join("")}
                </div>
                {talent.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
              <div className="text-white">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold">{talent.name}</h1>
                  {talent.available && (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-medium border border-green-500/30">
                      Available Now
                    </span>
                  )}
                </div>
                <p className="text-lg text-white/80 mb-2">{talent.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {talent.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {talent.timezone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Member since {talent.memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 flex flex-wrap gap-6 lg:justify-end">
              <div className="text-center">
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{talent.rating}</span>
                </div>
                <p className="text-xs text-white/60">{talent.totalReviews} reviews</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{talent.jobsCompleted}</div>
                <p className="text-xs text-white/60">Jobs done</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{talent.successRate}%</div>
                <p className="text-xs text-white/60">Success rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${talent.hourlyRate}</div>
                <p className="text-xs text-white/60">per hour</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-white/20">
            {[
              { id: "overview", label: "Overview" },
              { id: "portfolio", label: "Portfolio" },
              { id: "reviews", label: `Reviews (${talent.totalReviews})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === "overview" && (
                <>
                  {/* About */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {talent.bio}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="group relative px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors cursor-default"
                        >
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">• {skill.level}</span>
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {skill.years} years experience
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Work Experience</h2>
                    <div className="space-y-6">
                      {talent.experience.map((exp, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{exp.title}</h3>
                            <p className="text-sm text-primary font-medium">{exp.company}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {exp.location} • {exp.period}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Education
                      </h2>
                      <div className="space-y-4">
                        {talent.education.map((edu, i) => (
                          <div key={i}>
                            <p className="font-medium text-foreground">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Certifications
                      </h2>
                      <div className="space-y-4">
                        {talent.certifications.map((cert, i) => (
                          <div key={i}>
                            <p className="font-medium text-foreground">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Languages
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {talent.languages.map((lang, i) => (
                        <div key={i} className="px-4 py-2 rounded-xl bg-muted">
                          <span className="font-medium text-foreground">{lang.name}</span>
                          <span className="ml-2 text-sm text-muted-foreground">({lang.level})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "portfolio" && (
                <>
                  {/* Projects */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-foreground">Projects</h2>
                    {talent.portfolio.projects.map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
                      >
                        <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech, j) => (
                            <span key={j} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                            >
                              <Github className="w-4 h-4" />
                              View Code
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Files & Media */}
                  {talent.portfolio.files.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Files & Media</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {talent.portfolio.files.map((file, i) => (
                          <a
                            key={i}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              {file.type === "pdf" ? (
                                <FileText className="w-5 h-5 text-primary" />
                              ) : file.type === "video" ? (
                                <Play className="w-5 h-5 text-primary" />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{file.type}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">Links & Profiles</h2>
                    <div className="flex flex-wrap gap-3">
                      {talent.portfolio.links.map((link, i) => {
                        const Icon = getLinkIcon(link.type);
                        return (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">{link.title}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Review Stats */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex flex-wrap items-center gap-8">
                      <div className="text-center">
                        <div className="flex items-center gap-2 justify-center mb-1">
                          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                          <span className="text-3xl font-bold text-foreground">{talent.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{talent.totalReviews} reviews</p>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-xl bg-muted">
                          <div className="text-xl font-bold text-foreground">{talent.stats.onTimeDelivery}%</div>
                          <p className="text-xs text-muted-foreground">On-time delivery</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-muted">
                          <div className="text-xl font-bold text-foreground">{talent.stats.onBudget}%</div>
                          <p className="text-xs text-muted-foreground">On budget</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-muted">
                          <div className="text-xl font-bold text-foreground">{talent.stats.repeatClients}%</div>
                          <p className="text-xs text-muted-foreground">Repeat clients</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  {talent.reviews.map((review, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-card rounded-2xl border border-border p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {review.clientName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{review.clientName}</p>
                            <p className="text-xs text-muted-foreground">{review.clientCompany}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`w-4 h-4 ${j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                        {review.projectType}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hire Card */}
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground">${talent.hourlyRate}<span className="text-lg font-normal text-muted-foreground">/hr</span></div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 h-12">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact {talent.name.split(" ")[0]}
                  </Button>
                  <Button 
                    onClick={() => setShowAIInterviewModal(true)}
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 h-12 hover:from-violet-700 hover:to-indigo-700"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    AI Interview
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl h-12">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Shortlist
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium text-foreground">{talent.availableFrom}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Weekly hours</span>
                    <span className="font-medium text-foreground">{talent.weeklyAvailability}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response time</span>
                    <span className="font-medium text-foreground">{talent.responseTime}</span>
                  </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share Profile
                </button>
              </div>

              {/* Verification Badge */}
              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Verified Professional</p>
                    <p className="text-xs text-muted-foreground">Identity & skills verified</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    "Identity verified",
                    "Skills assessed",
                    "Background checked",
                    "Payment protected",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Hire Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Why hire {talent.name.split(" ")[0]}?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">100% on-time track record</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Proven Results</p>
                      <p className="text-xs text-muted-foreground">{talent.successRate}% job success</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Client Favorite</p>
                      <p className="text-xs text-muted-foreground">{talent.stats.repeatClients}% repeat clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to work with {talent.name.split(" ")[0]}?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Start a conversation to discuss your project requirements and get a custom proposal.
          </p>
          <Button size="lg" className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-8">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />

      {/* AI Interview Modal */}
      <AIInterviewModal
        isOpen={showAIInterviewModal}
        onClose={() => setShowAIInterviewModal(false)}
        talentId={talent.id}
        talentName={talent.name}
      />
    </main>
  );
}

