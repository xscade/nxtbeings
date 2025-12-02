"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube,
  Mail, 
  ArrowRight,
  Sparkles,
  Code,
  Users,
  Mic,
  Trophy,
  Rocket,
  Coffee,
  Gamepad2,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Community Activities - Grouped
const communityActivities = [
  {
    category: "Events",
    items: [
      { name: "Hackathons", href: "#" },
      { name: "Tech Talks", href: "#" },
      { name: "Workshops", href: "#" },
      { name: "Demo Days", href: "#" },
    ]
  },
  {
    category: "Challenges",
    items: [
      { name: "Coding Challenges", href: "#" },
      { name: "Build Sprints", href: "#" },
      { name: "AI Playground", href: "#" },
      { name: "Open Source", href: "#" },
    ]
  },
  {
    category: "Growth",
    items: [
      { name: "Bootcamps", href: "#" },
      { name: "Mentorship", href: "#" },
      { name: "Mock Interviews", href: "#" },
      { name: "Portfolio Reviews", href: "#" },
    ]
  },
];

// Quick Links
const quickLinks = {
  platform: [
    { name: "Find Talent", href: "/browse" },
    { name: "For Companies", href: "/for-companies" },
    { name: "For Talent", href: "/for-talent" },
    { name: "Upskill", href: "/upskill" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

// Social Links
const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
      <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
                <p className="text-white/70 max-w-md">
                  Get updates on events, new features, and community highlights. No spam, unsubscribe anytime.
            </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                  required
                />
                <Button 
                  type="submit"
                  className="h-12 px-6 rounded-xl bg-white text-primary hover:bg-white/90 font-medium"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                  {!subscribed && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
              <div>
                <Link href="/" className="text-2xl font-bold tracking-tight">
                  Nxtbeings
                </Link>
                <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-xs">
                  The world's first AI-native talent network. Connecting exceptional professionals with companies building the future.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 hover:border-white/20 transition-all"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Community Highlight */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">Join Our Community</span>
                </div>
                <p className="text-xs text-white/60 mb-3">
                  Hackathons, workshops, tech talks & more. Be part of something bigger.
                </p>
                <Link 
                  href="#"
                  className="text-xs font-medium text-white/90 hover:text-white inline-flex items-center gap-1"
                >
                  Explore Events <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">Platform</h4>
              <ul className="space-y-3">
                {quickLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>

            {/* Community Activities */}
          <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">Community</h4>
              <ul className="space-y-3">
                {communityActivities[0].items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

            {/* Company Links */}
          <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">Company</h4>
              <ul className="space-y-3">
                {quickLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

            {/* Legal Links */}
          <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">Legal</h4>
              <ul className="space-y-3">
                {quickLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
            </div>
          </div>

          {/* Community Activities Carousel */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50">Community Activities</h4>
              <Link href="#" className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Hackathons", icon: Code },
                { name: "Tech Talks", icon: Mic },
                { name: "Workshops", icon: GraduationCap },
                { name: "Coding Challenges", icon: Trophy },
                { name: "Build Sprints", icon: Rocket },
                { name: "AI Playground", icon: Sparkles },
                { name: "Mentorship", icon: Users },
                { name: "Mock Interviews", icon: Briefcase },
                { name: "Code & Coffee", icon: Coffee },
                { name: "Gaming Nights", icon: Gamepad2 },
              ].map((activity) => (
                <Link
                  key={activity.name}
                  href="#"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs"
                >
                  <activity.icon className="w-3 h-3 text-white/50 group-hover:text-white/70" />
                  <span className="text-white/70 group-hover:text-white">{activity.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Nxtbeings. All rights reserved.
          </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <span>Subsidiary of</span>
                  <a 
                    href="https://www.xscade.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Xscade
                  </a>
                </div>
                <div className="hidden md:flex items-center gap-4 text-xs text-white/50">
                  <Link href="#" className="hover:text-white/70 transition-colors">Sitemap</Link>
                  <Link href="#" className="hover:text-white/70 transition-colors">Accessibility</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
