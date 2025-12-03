"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Quote, 
  Building2, 
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Company Testimonials - From companies who hired through Nxtbeings
const companyTestimonials = [
  {
    id: 1,
    quote: "Nxtbeings completely transformed our hiring process. We found a senior AI engineer in just 3 days who's now leading our entire ML infrastructure. The quality of pre-vetted talent is unmatched.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechCorp AI",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "3 days to hire",
    industry: "AI/ML",
  },
  {
    id: 2,
    quote: "We've hired 12 AI professionals through Nxtbeings this year. Every single one has exceeded expectations. The platform's verification process really shows - these are true experts.",
    author: "Michael Roberts",
    role: "VP of Engineering",
    company: "DataFlow Systems",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "12 hires this year",
    industry: "Enterprise",
  },
  {
    id: 3,
    quote: "As a startup, we couldn't afford bad hires. Nxtbeings gave us access to talent we thought was out of reach. Our computer vision specialist from here helped us secure Series A.",
    author: "Priya Sharma",
    role: "Founder & CEO",
    company: "VisionAI Labs",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "Series A secured",
    industry: "Computer Vision",
  },
  {
    id: 4,
    quote: "The upskill program trained our entire product team on AI tools in 2 weeks. Productivity increased by 40%. Best investment we made this quarter.",
    author: "James Wilson",
    role: "Head of Product",
    company: "FinanceHub",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "40% productivity boost",
    industry: "FinTech",
  },
];

// Talent Testimonials - From professionals who joined Nxtbeings
const talentTestimonials = [
  {
    id: 1,
    quote: "After joining Nxtbeings, I landed my dream role at a leading AI company within 2 weeks. The platform connected me directly with decision-makers, not recruiters. Game changer.",
    author: "Alex Thompson",
    role: "Senior ML Engineer",
    specialization: "NLP & LLMs",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "2 weeks to dream job",
    previousCompany: "Now at OpenAI",
  },
  {
    id: 2,
    quote: "I went from freelancing inconsistently to having a steady pipeline of premium projects. The verification badge actually means something - clients trust you immediately.",
    author: "Maria Garcia",
    role: "AI Consultant",
    specialization: "MLOps",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "3x income increase",
    previousCompany: "Ex-Google",
  },
  {
    id: 3,
    quote: "The community here is incredible. Hackathons, mentorship, tech talks - it's not just a job board, it's a network of brilliant people pushing each other to grow.",
    author: "David Kim",
    role: "Full Stack AI Developer",
    specialization: "Generative AI",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "Won 2 hackathons",
    previousCompany: "Ex-Meta",
  },
  {
    id: 4,
    quote: "Coming from a non-traditional background, I was skeptical. But Nxtbeings' portfolio showcase and skill verification helped me compete with Ivy League candidates. Now I'm at a FAANG.",
    author: "Fatima Ahmed",
    role: "Data Scientist",
    specialization: "Computer Vision",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    metric: "Self-taught to FAANG",
    previousCompany: "Now at Microsoft",
  },
];

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<"company" | "talent">("company");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = activeTab === "company" ? companyTestimonials : talentTestimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4"
          >
            <Star className="w-4 h-4 fill-primary" />
            Trusted by 500+ Companies & 5,000+ Professionals
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            See how companies and talent are achieving their goals with Nxtbeings
          </motion.p>
        </div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="p-1.5 bg-muted rounded-full inline-flex relative">
            <button
              onClick={() => { setActiveTab("company"); setCurrentIndex(0); }}
              className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "company" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="w-4 h-4" />
              For Companies
            </button>
            <button
              onClick={() => { setActiveTab("talent"); setCurrentIndex(0); }}
              className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "talent" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              For Talent
            </button>
            
            {/* Animated Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-primary rounded-full shadow-lg shadow-primary/20"
              style={{ width: "calc(50% - 6px)" }}
              initial={false}
              animate={{
                left: activeTab === "company" ? 6 : "calc(50% + 3px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Featured Testimonial with Background Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl text-white relative overflow-hidden min-h-[420px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Semi-parabolic Gradient: Blue at bottom → Transparent at 45% */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, hsl(221.2, 83.2%, 53.3%) 0%, hsl(221.2, 83.2%, 53.3%) 10%, rgba(37, 99, 235, 0.95) 14%, rgba(37, 99, 235, 0.85) 19%, rgba(37, 99, 235, 0.7) 24%, rgba(37, 99, 235, 0.5) 30%, rgba(37, 99, 235, 0.3) 36%, rgba(37, 99, 235, 0.15) 39%, rgba(37, 99, 235, 0.05) 43%, transparent 45%)'
                  }}
                />
              </div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <Quote className="w-12 h-12 text-white/30 mb-4" />
                
                <p className="text-lg md:text-xl font-medium leading-relaxed mb-6">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                      <p className="text-white/70 text-sm">
                        {testimonials[currentIndex].role}
                        {activeTab === "company" 
                          ? `, ${(testimonials[currentIndex] as typeof companyTestimonials[0]).company}`
                          : ` • ${(testimonials[currentIndex] as typeof talentTestimonials[0]).specialization}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <p className="text-sm font-medium">{testimonials[currentIndex].metric}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Cards List */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${
                  currentIndex === index
                    ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/5"
                    : "bg-card border-border hover:border-primary/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 ${
                    currentIndex === index 
                      ? "border-primary" 
                      : "border-transparent"
                  }`}>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {activeTab === "company" 
                        ? `, ${(testimonial as typeof companyTestimonials[0]).company}`
                        : ` • ${(testimonial as typeof talentTestimonials[0]).previousCompany}`
                      }
                    </p>
                    <p className="text-sm text-foreground mt-2 line-clamp-2">
                      &ldquo;{testimonial.quote.substring(0, 80)}...&rdquo;
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-6 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href={activeTab === "company" ? "/for-companies" : "/get-started"}>
            <Button className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-8 h-12">
              {activeTab === "company" ? "Start Hiring" : "Join as Talent"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
