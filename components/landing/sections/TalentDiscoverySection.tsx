"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Megaphone, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Cpu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: "dev", label: "Developers", icon: Code2 },
  { id: "design", label: "Designers", icon: Palette },
  { id: "marketing", label: "Marketing Experts", icon: Megaphone },
  { id: "consult", label: "AI Consultants", icon: Briefcase },
];

const profiles = {
  dev: [
    {
      id: 1,
      name: "Adam Ivansky",
      role: "AI Engineer",
      verified: true,
      specialty: "Python Developer",
      expertise: ["SQL", "Python", "Spark", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "ML Ops Engineer",
      verified: true,
      specialty: "Cloud Infrastructure",
      expertise: ["AWS", "Docker", "Kubernetes", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Nimrod Talmon",
      role: "AI Researcher",
      verified: true,
      specialty: "NLP Specialist",
      expertise: ["Data Science", "Python", "Algorithms", "LLMs"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    }
  ],
  design: [
    {
      id: 4,
      name: "Manuela Kajkara",
      role: "Product Designer",
      verified: true,
      specialty: "AR/VR Developer",
      expertise: ["Software Architecture", "C#", "Unity", "UI/UX"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "David Kim",
      role: "Generative Artist",
      verified: true,
      specialty: "Midjourney Expert",
      expertise: ["Prompt Eng.", "Adobe Suite", "Stable Diffusion"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Elena R.",
      role: "UX Researcher",
      verified: true,
      specialty: "AI Interfaces",
      expertise: ["Figma", "User Testing", "Human-AI Interaction"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    }
  ],
  marketing: [
    {
      id: 7,
      name: "Tom H.",
      role: "Growth Lead",
      verified: true,
      specialty: "AI Marketing",
      expertise: ["SEO", "Content AI", "Analytics", "Automation"],
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      name: "Lisa P.",
      role: "Content Strategist",
      verified: true,
      specialty: "Copywriting",
      expertise: ["Jasper", "Copy.ai", "Strategy", "Social Media"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    },
    {
      id: 9,
      name: "Gary O.",
      role: "Ad Specialist",
      verified: true,
      specialty: "Programmatic Ads",
      expertise: ["Google Ads", "Meta Ads", "Data Analysis"],
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    }
  ],
  consult: [
    {
      id: 10,
      name: "Dr. Ken",
      role: "Strategy Consultant",
      verified: true,
      specialty: "AI Transformation",
      expertise: ["Enterprise AI", "Change Mgmt", "Risk Analysis"],
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    },
    {
      id: 11,
      name: "Maria G.",
      role: "Ethics Advisor",
      verified: true,
      specialty: "Responsible AI",
      expertise: ["Compliance", "Bias Audit", "Policy"],
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    },
    {
      id: 12,
      name: "James D.",
      role: "Security Consultant",
      verified: true,
      specialty: "AI Security",
      expertise: ["Cybersec", "Pen Testing", "Network Sec"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    }
  ]
};

export function TalentDiscoverySection() {
  const [activeCategory, setActiveCategory] = useState("dev");

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Meet Talent in Our <span className="text-blue-600">Network</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse verified professionals across specialized AI disciplines.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === cat.id 
                  ? "text-white" 
                  : "text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50"
                }
              `}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {profiles[activeCategory as keyof typeof profiles].map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group bg-card">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img 
                      src={profile.image} 
                      alt={profile.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-foreground">{profile.name}</h3>
                      {profile.verified && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Expert
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Terminal className="w-3.5 h-3.5" />
                        {profile.specialty}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="rounded-md px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* CTA Card - Always visible as 4th item in grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="h-full"
          >
            <Card className="h-full bg-blue-600 text-white border-none relative overflow-hidden flex flex-col justify-center items-center text-center p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Discover 20,000+ <br /> More Talent
                </h3>
                <p className="text-blue-100 mb-8">
                  in the Nxtbeings Network
                </p>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full">
                  Discover Talent
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

