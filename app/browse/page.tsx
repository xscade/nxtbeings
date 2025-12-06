"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  MapPin,
  Star,
  Briefcase,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  Shield,
  Zap,
  Users,
  Code,
  Palette,
  Brain,
  TrendingUp,
  PenTool,
  Headphones,
  Calculator,
  Scale,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Loader2
} from "lucide-react";

// Categories with subcategories
const categories = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: Brain,
    subcategories: ["AI Engineers", "ML Engineers", "Data Scientists", "Prompt Engineers", "Computer Vision", "NLP Specialists"]
  },
  {
    id: "development",
    name: "Development & IT",
    icon: Code,
    subcategories: ["Full Stack Developers", "Frontend Developers", "Backend Developers", "Mobile Developers", "DevOps Engineers", "Cloud Architects"]
  },
  {
    id: "design",
    name: "Design & Creative",
    icon: Palette,
    subcategories: ["UI/UX Designers", "Product Designers", "Graphic Designers", "Brand Designers", "Motion Designers", "3D Artists"]
  },
  {
    id: "marketing",
    name: "Sales & Marketing",
    icon: TrendingUp,
    subcategories: ["Digital Marketers", "SEO Specialists", "Content Strategists", "Growth Hackers", "Social Media Managers", "Email Marketers"]
  },
  {
    id: "writing",
    name: "Writing & Translation",
    icon: PenTool,
    subcategories: ["Content Writers", "Copywriters", "Technical Writers", "Translators", "Editors", "Ghostwriters"]
  },
  {
    id: "support",
    name: "Admin & Customer Support",
    icon: Headphones,
    subcategories: ["Virtual Assistants", "Customer Support", "Data Entry", "Project Coordinators", "Executive Assistants"]
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    icon: Calculator,
    subcategories: ["Accountants", "Financial Analysts", "Bookkeepers", "Tax Consultants", "CFO Services"]
  },
  {
    id: "legal",
    name: "Legal",
    icon: Scale,
    subcategories: ["Contract Lawyers", "IP Attorneys", "Legal Consultants", "Compliance Specialists"]
  },
  {
    id: "hr",
    name: "HR & Training",
    icon: GraduationCap,
    subcategories: ["HR Consultants", "Recruiters", "Training Specialists", "People Operations"]
  },
];

// Talent interface for type safety
interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  hourlyRate: number;
  rating: number;
  completedJobs: number;
  skills: string[];
  bio: string;
  verified: boolean;
  image: string | null;
  availability: string;
}

// Trust badges
const trustBadges = [
  { icon: Star, title: "Verified Reviews", desc: "Authentic ratings from real clients" },
  { icon: Shield, title: "Secure Payments", desc: "Protected transactions, every time" },
  { icon: Zap, title: "Quick Hiring", desc: "Find and hire talent in hours" },
];

// Floating profiles for hero
const floatingProfiles = [
  { name: "Anna M.", role: "AI Engineer", position: "top-44 left-[10%]" },
  { name: "John D.", role: "Data Scientist", position: "top-56 left-[25%]" },
  { name: "Mike R.", role: "Full Stack Dev", position: "top-40 right-[25%]" },
  { name: "Sara K.", role: "UX Designer", position: "top-52 right-[10%]" },
  { name: "Chris L.", role: "ML Engineer", position: "bottom-36 left-[8%]" },
  { name: "Emma W.", role: "Product Manager", position: "bottom-32 right-[8%]" },
];

export default function BrowseTalentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("ai");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("relevant");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const fetchTalents = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const params = new URLSearchParams();
      params.set("page", pageNum.toString());
      params.set("limit", "12");
      params.set("sort", sortBy);
      
      if (searchQuery) params.set("search", searchQuery);
      if (selectedSubcategory) params.set("category", selectedSubcategory);
      if (minRate) params.set("minRate", minRate);
      if (maxRate) params.set("maxRate", maxRate);
      if (locationFilter) params.set("location", locationFilter);

      const response = await fetch(`/api/talent/browse?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        if (append) {
          setTalents(prev => [...prev, ...data.talents]);
        } else {
          setTalents(data.talents);
        }
        setTotalPages(data.pagination.totalPages);
        setTotalCount(data.pagination.total);
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching talents:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchQuery, selectedSubcategory, sortBy, minRate, maxRate, locationFilter]);

  // Initial fetch
  useEffect(() => {
    fetchTalents(1, false);
  }, [fetchTalents]);

  // Handle search
  const handleSearch = () => {
    setPage(1);
    fetchTalents(1, false);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (sub: string | null) => {
    setSelectedSubcategory(sub);
    setPage(1);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchTalents(page + 1, true);
    }
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    setPage(1);
    fetchTalents(1, false);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedSubcategory(null);
    setExpandedCategory("ai");
    setMinRate("");
    setMaxRate("");
    setLocationFilter("");
    setSortBy("relevant");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-64 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
          <motion.div 
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/15 rounded-full blur-[80px]"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
        </div>

        {/* Floating Profile Cards */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          {floatingProfiles.map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`absolute ${profile.position}`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-card rounded-2xl border border-border p-4 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">{profile.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            2,400+ Verified Professionals
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight"
          >
            Find the perfect
            <br />
            <span className="text-primary">AI-powered talent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Browse pre-vetted professionals who combine deep expertise with cutting-edge AI skills. 
            Hire the best, regardless of location.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 p-2 bg-card rounded-2xl border border-border shadow-lg shadow-primary/5">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for skills, roles, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="border-0 shadow-none focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="rounded-xl px-6 h-12 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["AI Engineer", "React Developer", "UI Designer", "Data Scientist"].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-sm text-primary hover:underline"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges - Blue Glassmorphic */}
      <section className="py-16 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBadges.map((badge, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{badge.title}</p>
                  <p className="text-sm text-white/70">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </h3>
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          expandedCategory === category.id 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          expandedCategory === category.id ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-7 mt-1 space-y-1"
                        >
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => handleSubcategorySelect(selectedSubcategory === sub ? null : sub)}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                selectedSubcategory === sub
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            >
                              {sub}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Hourly Rate</label>
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="$0" 
                          className="rounded-xl h-9"
                          value={minRate}
                          onChange={(e) => setMinRate(e.target.value)}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input 
                          placeholder="$500" 
                          className="rounded-xl h-9"
                          value={maxRate}
                          onChange={(e) => setMaxRate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                      <Input 
                        placeholder="Any location" 
                        className="rounded-xl h-9"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl"
                      onClick={handleApplyFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Talent Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{talents.length}</span> 
                  {totalCount > talents.length && <span> of {totalCount}</span>} professionals
                  {selectedSubcategory && (
                    <span> in <span className="text-primary">{selectedSubcategory}</span></span>
                  )}
                </p>
                <select 
                  className="text-sm border border-border rounded-xl px-3 py-2 bg-background"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="most-jobs">Most Jobs</option>
                  <option value="lowest-rate">Lowest Rate</option>
                  <option value="highest-rate">Highest Rate</option>
                </select>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Finding the best talent...</p>
                </div>
              ) : talents.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No professionals found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find more talent.
                  </p>
                  <Button onClick={clearAllFilters} variant="outline" className="rounded-xl">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talents.map((talent, i) => (
                    <motion.div
                      key={talent.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          {talent.image ? (
                            <img 
                              src={talent.image} 
                              alt={talent.name}
                              className="w-14 h-14 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                              {talent.name.split(" ").map(n => n[0]).join("")}
                            </div>
                          )}
                          {talent.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {talent.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{talent.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {talent.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 py-3 border-y border-border">
                        {talent.hourlyRate > 0 && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg font-bold text-foreground">${talent.hourlyRate}</span>
                            <span className="text-xs text-muted-foreground">/hr</span>
                          </div>
                        )}
                        {talent.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-foreground">{talent.rating}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm">{talent.completedJobs} jobs</span>
                        </div>
                      </div>

                      {/* Bio */}
                      {talent.bio && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {talent.bio}
                        </p>
                      )}

                      {/* Skills */}
                      {talent.skills && talent.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {talent.skills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                          {talent.skills.length > 4 && (
                            <span className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-primary">
                              +{talent.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <Link href={`/talent/${talent.id}`}>
                        <Button className="w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all">
                          View Profile
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {!loading && talents.length > 0 && page < totalPages && (
                <div className="mt-12 text-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Talent
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container relative z-10 mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Can't find what you need?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Tell us your requirements and we'll match you with the perfect talent within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-14 text-base font-semibold shadow-xl">
                Post a Job
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <button className="h-14 px-8 rounded-full text-base font-medium border border-white/30 text-white hover:bg-white/10 transition-colors">
                Talk to Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

