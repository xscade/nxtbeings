"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Landmark, 
  Stethoscope, 
  ShoppingBag, 
  Megaphone, 
  GraduationCap, 
  Factory, 
  Building2, 
  Truck, 
  Clapperboard,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// --- Data ---

const industries = [
  { id: "tech", name: "Technology", icon: Code2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "fin", name: "Finance", icon: Landmark, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "health", name: "Healthcare", icon: Stethoscope, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
  { id: "retail", name: "Retail", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  { id: "marketing", name: "Marketing", icon: Megaphone, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { id: "edu", name: "Education", icon: GraduationCap, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  { id: "mfg", name: "Manufacturing", icon: Factory, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
  { id: "realestate", name: "Real Estate", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
  { id: "logistics", name: "Logistics", icon: Truck, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
  { id: "media", name: "Media", icon: Clapperboard, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200" },
];

// Initial positions are percentage based (0-100)
const initialProfessionals = [
  { id: 1, name: "Elena K.", role: "AI Architect", industry: "tech", skills: ["LLM Tuning", "PyTorch"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", x: 50, y: 50 }, 
  { id: 2, name: "Marcus R.", role: "Quant Analyst", industry: "fin", skills: ["Predictive Models"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", x: 25, y: 30 },
  { id: 3, name: "Dr. Sarah L.", role: "MedTech AI", industry: "health", skills: ["Computer Vision"], image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop", x: 75, y: 30 },
  { id: 4, name: "Priya M.", role: "CX Lead", industry: "retail", skills: ["Personalization"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop", x: 20, y: 65 },
  { id: 5, name: "Tom H.", role: "GenAI Creative", industry: "marketing", skills: ["Midjourney", "DALL-E"], image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop", x: 80, y: 70 },
  { id: 6, name: "Prof. Ali", role: "EdTech Dev", industry: "edu", skills: ["Learning Analytics"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", x: 50, y: 15 },
  { id: 7, name: "Wei Z.", role: "Robotics Eng", industry: "mfg", skills: ["Automation", "IoT"], image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop", x: 50, y: 85 },
  { id: 8, name: "Jessica T.", role: "PropTech Analyst", industry: "realestate", skills: ["Market Prediction"], image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", x: 15, y: 50 },
  { id: 9, name: "David B.", role: "Supply Chain AI", industry: "logistics", skills: ["Route Opt."], image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", x: 85, y: 50 },
  { id: 10, name: "Sophie W.", role: "Content AI", industry: "media", skills: ["Synthesia", "Runway"], image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop", x: 35, y: 20 },
  // Existing + New Additions for increased density
  { id: 11, name: "James D.", role: "Cybersec Analyst", industry: "tech", skills: ["Anomaly Detection"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", x: 65, y: 20 },
  { id: 12, name: "Maria G.", role: "FinTech Dev", industry: "fin", skills: ["Fraud Detection"], image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop", x: 35, y: 80 },
  { id: 13, name: "Dr. Ken", role: "Bioinformatics", industry: "health", skills: ["Drug Discovery"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop", x: 90, y: 40 },
  { id: 14, name: "Lisa P.", role: "E-comm AI", industry: "retail", skills: ["RecSys"], image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", x: 10, y: 40 },
  { id: 15, name: "Gary O.", "role": "AdTech Lead", industry: "marketing", skills: ["Programmatic"], image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop", x: 70, y: 80 },
  { id: 16, name: "Nina I.", role: "VR Educator", industry: "edu", skills: ["Immersive Learning"], image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", x: 40, y: 40 },
  { id: 17, name: "Raj K.", role: "Smart Factory", industry: "mfg", skills: ["Predictive Maint."], image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150&h=150&fit=crop", x: 60, y: 60 },
  { id: 18, name: "Ana S.", role: "Smart City Arch", industry: "realestate", skills: ["Urban Planning"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop", x: 30, y: 60 },
  // More additions to increase count
  { id: 19, name: "Alex M.", role: "Cloud Arch", industry: "tech", skills: ["AWS", "Azure"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", x: 55, y: 35 },
  { id: 20, name: "Sarah J.", role: "Data Sci", industry: "fin", skills: ["R", "Python"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", x: 45, y: 75 },
  { id: 21, name: "Mike T.", role: "AI Researcher", industry: "health", skills: ["Genomics"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", x: 85, y: 15 },
  { id: 22, name: "Emily W.", role: "UX Designer", industry: "retail", skills: ["Figma"], image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", x: 25, y: 85 },
  { id: 23, name: "Chris L.", role: "SEO Expert", industry: "marketing", skills: ["Analytics"], image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", x: 95, y: 60 },
  { id: 24, name: "Patty R.", role: "EdTech PM", industry: "edu", skills: ["Agile"], image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop", x: 5, y: 30 },
  { id: 25, name: "Kevin N.", role: "Robotics", industry: "mfg", skills: ["C++"], image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop", x: 65, y: 90 },
];

// --- Components ---

export function IndustryNetworkSection() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [nodes, setNodes] = useState(initialProfessionals.map(p => ({
    ...p,
    currentX: p.x,
    currentY: p.y,
    // Random phase and speed for floating
    phase: Math.random() * Math.PI * 2,
    speed: 0.0005 + Math.random() * 0.001,
    range: 2 + Math.random() * 3
  })));

  // Animation Loop for Floating Effect
  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      setNodes(prevNodes => prevNodes.map(node => {
        // Float in a gentle ellipse/figure-8
        const xOffset = Math.sin(elapsed * node.speed + node.phase) * (node.range * 0.5);
        const yOffset = Math.cos(elapsed * node.speed * 0.8 + node.phase) * node.range;
        
        return {
          ...node,
          currentX: node.x + xOffset,
          currentY: node.y + yOffset
        };
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[900px] w-full bg-white overflow-hidden py-24">
      {/* Background Grid - Light Mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#ffffff,transparent)]" />

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col items-center">
        <div className="text-center max-w-3xl mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Connecting Companies with AI Talent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Across Every Industry
            </span>
          </motion.h2>
          <p className="text-slate-500 text-lg">
            We are the The world's first AI-native talent network bridging the gap of AI Enabled Professionals in various industries and sectors.
          </p>
        </div>

        {/* Interactive Network Viz */}
        <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[2/1]">
          {/* Connecting Lines (SVG) */}
          {/* We render lines in SVG layer based on current node positions */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.1)" />
                <stop offset="50%" stopColor="rgba(168,85,247,0.3)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
              </linearGradient>
            </defs>
            {nodes.map((p1, i) => 
              nodes.slice(i + 1).map((p2) => {
                const distance = Math.sqrt(Math.pow(p1.currentX - p2.currentX, 2) + Math.pow(p1.currentY - p2.currentY, 2));
                // Adjust distance threshold for density
                if (distance < 30) { 
                  return (
                    <line
                      key={`${p1.id}-${p2.id}`}
                      x1={`${p1.currentX}%`}
                      y1={`${p1.currentY}%`}
                      x2={`${p2.currentX}%`}
                      y2={`${p2.currentY}%`}
                      stroke="url(#line-gradient)"
                      strokeWidth="1"
                      opacity={1 - (distance / 30)} // Fade out as they get further
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((prof) => {
            const ind = industries.find(i => i.id === prof.industry);
            if (!ind) return null;
            const Icon = ind.icon;
            const isHovered = hoveredNode === prof.id;

            return (
              <div
                key={prof.id}
                className="absolute will-change-transform"
                style={{ 
                  left: `${prof.currentX}%`, 
                  top: `${prof.currentY}%`, 
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 50 : 20
                }}
                onMouseEnter={() => setHoveredNode(prof.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  {/* Ping Effect (Only occasional or on hover to reduce noise?) - Kept always on for liveliness */}
                  <div className={`absolute inset-0 -z-10 animate-ping rounded-full ${ind.bg} opacity-50`} />
                  
                  {/* Node Circle */}
                  <motion.div
                    className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border ${ind.border} ${ind.bg} backdrop-blur-md cursor-pointer shadow-sm`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="w-8 h-8 md:w-10 md:h-10 border-2 border-white">
                      <AvatarImage src={prof.image} />
                      <AvatarFallback>{prof.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 bg-white rounded-full p-1 border ${ind.border} shadow-sm`}>
                      <Icon size={10} className={ind.color} />
                    </div>
                  </motion.div>

                  {/* Tooltip Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-64 z-50"
                      >
                        <Card className="bg-white border-slate-200 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className={`${ind.color} ${ind.border} bg-transparent text-[10px]`}>
                                {ind.name}
                              </Badge>
                              <Icon size={14} className="text-slate-400" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-900">{prof.name}</h4>
                            <p className="text-sm text-slate-500 mb-3">{prof.role}</p>
                            <div className="flex flex-wrap gap-1">
                              {prof.skills.map(skill => (
                                <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry Legend */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 max-w-4xl">
          {industries.map((ind) => (
            <div 
              key={ind.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${ind.border} ${ind.bg} backdrop-blur-sm`}
            >
              <ind.icon size={14} className={ind.color} />
              <span className="text-xs font-medium text-slate-600">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
