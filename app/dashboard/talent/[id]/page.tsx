"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Shield,
  Zap,
  TrendingUp,
  Users,
  BadgeCheck,
  Video,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Mail,
  Phone
} from "lucide-react";

interface TalentProfile {
  id: string;
  name: string;
  email?: string;
  image?: string;
  title: string;
  tagline?: string;
  location?: string;
  timezone?: string;
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  jobsCompleted?: number;
  successRate?: number;
  responseTime?: string;
  memberSince: string;
  verified?: boolean;
  available?: boolean;
  availableFrom?: string;
  weeklyAvailability?: string;
  bio?: string;
  skills?: Array<{ name: string; level?: string; years?: number }>;
  languages?: Array<{ name: string; level?: string }>;
  experience?: Array<{
    title: string;
    company: string;
    location?: string;
    period: string;
    description?: string;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    year?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year?: string;
  }>;
  portfolio?: {
    headline?: string;
    summary?: string;
    links?: Array<{ type: string; url: string; title?: string }>;
    projects?: Array<{
      title: string;
      description?: string;
      techStack?: string[];
      imageUrl?: string;
      repoUrl?: string;
      liveUrl?: string;
    }>;
    files?: Array<{ fileType?: string; fileName: string; fileUrl: string }>;
  };
  stats?: {
    onTimeDelivery?: number;
    onBudget?: number;
    repeatClients?: number;
  };
}

export default function DashboardTalentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const talentId = params.id as string;
  
  const [talent, setTalent] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "reviews">("overview");
  const [showAIInterviewModal, setShowAIInterviewModal] = useState(false);
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    async function fetchTalent() {
      try {
        const response = await fetch(`/api/talent/public/${talentId}`);
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.error || "Failed to load profile");
          return;
        }
        
        const profile = data.profile;
        setTalent({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          title: profile.title || "AI Professional",
          tagline: profile.talentProfile?.tagline,
          location: profile.talentProfile?.location,
          timezone: profile.talentProfile?.timezone,
          hourlyRate: profile.hourlyRate,
          rating: profile.talentProfile?.rating,
          totalReviews: profile.talentProfile?.totalReviews || 0,
          jobsCompleted: profile.talentProfile?.jobsCompleted || 0,
          successRate: profile.talentProfile?.successRate,
          responseTime: profile.talentProfile?.responseTime,
          memberSince: new Date(profile.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          verified: profile.verified,
          available: profile.talentProfile?.available,
          availableFrom: profile.talentProfile?.availableFrom,
          weeklyAvailability: profile.talentProfile?.weeklyAvailability,
          bio: profile.bio,
          skills: profile.skills || [],
          languages: profile.talentProfile?.languages || [],
          experience: profile.talentProfile?.experience || [],
          education: profile.talentProfile?.education || [],
          certifications: profile.talentProfile?.certifications || [],
          portfolio: profile.portfolio || null,
          stats: profile.talentProfile?.stats,
        });
      } catch (err) {
        console.error("Error fetching talent:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    if (talentId) {
      fetchTalent();
    }
  }, [talentId]);

  const handleShortlist = async () => {
    if (isShortlisted || isShortlisting) return;
    
    setIsShortlisting(true);
    try {
      const response = await fetch("/api/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ talentId: talent?.id }),
      });
      
      if (response.ok) {
        setIsShortlisted(true);
      }
    } catch (err) {
      console.error("Error shortlisting:", err);
    } finally {
      setIsShortlisting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>
        <p className="text-muted-foreground mb-6">{error || "This talent profile doesn't exist or has been removed."}</p>
        <Button onClick={() => router.back()} variant="outline" className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github": return Github;
      case "linkedin": return Linkedin;
      case "twitter": return Twitter;
      default: return Globe;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="rounded-xl text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>
      </div>

      {/* Hero Header */}
      <div className="bg-primary rounded-2xl overflow-hidden">
        <div className="relative p-6 md:p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Profile Image & Basic Info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                {talent.image ? (
                  <img 
                    src={talent.image} 
                    alt={talent.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-2xl font-bold">
                    {talent.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                {talent.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
              <div className="text-white">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl md:text-2xl font-bold">{talent.name}</h1>
                  {talent.available && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-medium border border-green-500/30">
                      Available
                    </span>
                  )}
                </div>
                <p className="text-white/80 mb-2">{talent.title}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  {talent.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {talent.location}
                    </span>
                  )}
                  {talent.timezone && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {talent.timezone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Since {talent.memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 flex flex-wrap gap-6 lg:justify-end">
              {talent.rating !== undefined && talent.rating > 0 && (
                <div className="text-center">
                  <div className="flex items-center gap-1 text-white">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{talent.rating}</span>
                  </div>
                  <p className="text-xs text-white/60">{talent.totalReviews} reviews</p>
                </div>
              )}
              {talent.jobsCompleted !== undefined && talent.jobsCompleted > 0 && (
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{talent.jobsCompleted}</div>
                  <p className="text-xs text-white/60">Jobs done</p>
                </div>
              )}
              {talent.successRate !== undefined && (
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{talent.successRate}%</div>
                  <p className="text-xs text-white/60">Success</p>
                </div>
              )}
              {talent.hourlyRate !== undefined && talent.hourlyRate > 0 && (
                <div className="text-center">
                  <div className="text-xl font-bold text-white">${talent.hourlyRate}</div>
                  <p className="text-xs text-white/60">per hour</p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-6 border-t border-white/20 pt-4 w-full">
              {[
                { id: "overview", label: "Overview" },
                { id: "portfolio", label: "Portfolio" },
                { id: "reviews", label: `Reviews (${talent.totalReviews || 0})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* About */}
              {talent.bio && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {talent.bio}
                  </p>
                </div>
              )}

              {/* Skills */}
              {talent.skills && talent.skills.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Skills & Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {talent.skills.map((skill, i) => (
                      <div
                        key={i}
                        className="group relative px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        {skill.level && <span className="ml-2 text-xs text-muted-foreground">• {skill.level}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {talent.experience && talent.experience.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Work Experience</h2>
                  <div className="space-y-5">
                    {talent.experience.map((exp, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.title}</h3>
                          <p className="text-sm text-primary font-medium">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {exp.location && `${exp.location} • `}{exp.period}
                          </p>
                          {exp.description && <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Certifications */}
              {((talent.education && talent.education.length > 0) || (talent.certifications && talent.certifications.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {talent.education && talent.education.length > 0 && (
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Education
                      </h2>
                      <div className="space-y-3">
                        {talent.education.map((edu, i) => (
                          <div key={i}>
                            <p className="font-medium text-foreground">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.school}{edu.year && ` • ${edu.year}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {talent.certifications && talent.certifications.length > 0 && (
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Certifications
                      </h2>
                      <div className="space-y-3">
                        {talent.certifications.map((cert, i) => (
                          <div key={i}>
                            <p className="font-medium text-foreground">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.issuer}{cert.year && ` • ${cert.year}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Languages */}
              {talent.languages && talent.languages.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {talent.languages.map((lang, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-xl bg-muted">
                        <span className="font-medium text-foreground">{lang.name}</span>
                        {lang.level && <span className="ml-2 text-sm text-muted-foreground">({lang.level})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "portfolio" && (
            <>
              {/* Projects */}
              {talent.portfolio?.projects && talent.portfolio.projects.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Projects</h2>
                  {talent.portfolio.projects.map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                      {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech, j) => (
                            <span key={j} className="px-2 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
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
              )}

              {/* Files & Media */}
              {talent.portfolio?.files && talent.portfolio.files.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Files & Media</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {talent.portfolio.files.map((file, i) => (
                      <a
                        key={i}
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {file.fileType === "pdf" ? (
                            <FileText className="w-5 h-5 text-primary" />
                          ) : file.fileType === "video" ? (
                            <Play className="w-5 h-5 text-primary" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{file.fileName}</p>
                          <p className="text-xs text-muted-foreground capitalize">{file.fileType}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {talent.portfolio?.links && talent.portfolio.links.length > 0 && (
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
                          <span className="text-sm font-medium text-foreground">{link.title || link.type}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty Portfolio State */}
              {(!talent.portfolio?.projects?.length && !talent.portfolio?.files?.length && !talent.portfolio?.links?.length) && (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <p className="text-muted-foreground">No portfolio items yet.</p>
                </div>
              )}
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
                      <span className="text-3xl font-bold text-foreground">{talent.rating || "N/A"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{talent.totalReviews || 0} reviews</p>
                  </div>
                  {talent.stats && (
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-xl bg-muted">
                        <div className="text-xl font-bold text-foreground">{talent.stats.onTimeDelivery || 0}%</div>
                        <p className="text-xs text-muted-foreground">On-time</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-muted">
                        <div className="text-xl font-bold text-foreground">{talent.stats.onBudget || 0}%</div>
                        <p className="text-xs text-muted-foreground">On budget</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-muted">
                        <div className="text-xl font-bold text-foreground">{talent.stats.repeatClients || 0}%</div>
                        <p className="text-xs text-muted-foreground">Repeat</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <p className="text-muted-foreground">No reviews yet.</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions Card */}
          <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
            {talent.hourlyRate !== undefined && talent.hourlyRate > 0 && (
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-foreground">${talent.hourlyRate}<span className="text-lg font-normal text-muted-foreground">/hr</span></div>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <Button className="w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 h-11">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact {talent.name.split(" ")[0]}
              </Button>
              <Button 
                onClick={() => setShowAIInterviewModal(true)}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 h-11 hover:from-violet-700 hover:to-indigo-700"
              >
                <Video className="w-4 h-4 mr-2" />
                AI Interview
              </Button>
              <Button 
                variant="outline" 
                className={`w-full rounded-xl h-11 ${isShortlisted ? "bg-amber-50 border-amber-200 text-amber-600" : ""}`}
                onClick={handleShortlist}
                disabled={isShortlisting || isShortlisted}
              >
                <Heart className={`w-4 h-4 mr-2 ${isShortlisted ? "fill-amber-500" : ""}`} />
                {isShortlisted ? "Shortlisted" : "Add to Shortlist"}
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              {talent.availableFrom && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium text-foreground">{talent.availableFrom}</span>
                </div>
              )}
              {talent.weeklyAvailability && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weekly hours</span>
                  <span className="font-medium text-foreground">{talent.weeklyAvailability}</span>
                </div>
              )}
              {talent.responseTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-medium text-foreground">{talent.responseTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Verification Badge */}
          {talent.verified && (
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5">
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
          )}

          {/* Why Hire Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Why hire {talent.name.split(" ")[0]}?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">On-time track record</p>
                </div>
              </div>
              {talent.successRate !== undefined && (
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Proven Results</p>
                    <p className="text-xs text-muted-foreground">{talent.successRate}% job success</p>
                  </div>
                </div>
              )}
              {talent.stats?.repeatClients && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Client Favorite</p>
                    <p className="text-xs text-muted-foreground">{talent.stats.repeatClients}% repeat clients</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Interview Modal */}
      <AIInterviewModal
        isOpen={showAIInterviewModal}
        onClose={() => setShowAIInterviewModal(false)}
        talentId={talent.id}
        talentName={talent.name}
      />
    </div>
  );
}

