"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Briefcase, 
  Code2, 
  Save,
  Loader2,
  CheckCircle,
  MapPin,
  Clock,
  GraduationCap,
  Award,
  Globe,
  Plus,
  X,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";

// Skill level options
const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

// Language level options
const languageLevels = ["Basic", "Conversational", "Fluent", "Native"];

// Common skill names
const commonSkills = [
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "LLMs",
  "Prompt Engineering", "MLOps", "Data Science", "Python", "PyTorch",
  "TensorFlow", "Langchain", "RAG", "Fine-tuning", "AI Agents",
  "Generative AI", "React", "Node.js", "TypeScript", "AWS", "Kubernetes",
  "Docker", "Git", "SQL", "MongoDB", "PostgreSQL", "Redis"
];

// Timezone options (common ones)
const timezones = [
  "PST (UTC-8)", "MST (UTC-7)", "CST (UTC-6)", "EST (UTC-5)",
  "GMT (UTC+0)", "CET (UTC+1)", "IST (UTC+5:30)", "JST (UTC+9)",
  "AEST (UTC+10)", "Other"
];

// Availability options
const availabilityOptions = [
  { value: "Immediately", label: "Immediately" },
  { value: "2 weeks notice", label: "2 weeks notice" },
  { value: "1 month notice", label: "1 month notice" },
  { value: "Not available", label: "Not available" },
];

// Weekly availability options
const weeklyAvailabilityOptions = [
  "10-20 hrs/week",
  "20-30 hrs/week",
  "30+ hrs/week",
  "Full-time (40+ hrs/week)",
  "Part-time (< 20 hrs/week)"
];

// Response time options
const responseTimeOptions = [
  "< 1 hour",
  "< 2 hours",
  "< 4 hours",
  "< 24 hours",
  "1-2 days"
];

interface ISkill {
  name: string;
  level: string;
  years?: number;
}

interface ILanguage {
  name: string;
  level: string;
}

interface IWorkExperience {
  title: string;
  company: string;
  location?: string;
  period: string;
  description?: string;
  current?: boolean;
}

interface IEducation {
  degree: string;
  school: string;
  year?: string;
  fieldOfStudy?: string;
}

interface ICertification {
  name: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Basic Info
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  // Location & Availability
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [available, setAvailable] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [weeklyAvailability, setWeeklyAvailability] = useState("");
  const [responseTime, setResponseTime] = useState("");

  // Skills & Languages
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Expert");
  const [newSkillYears, setNewSkillYears] = useState("");
  const [newLanguageName, setNewLanguageName] = useState("");
  const [newLanguageLevel, setNewLanguageLevel] = useState("Fluent");

  // Experience
  const [experience, setExperience] = useState<IWorkExperience[]>([]);
  const [newExperience, setNewExperience] = useState<IWorkExperience>({
    title: "",
    company: "",
    location: "",
    period: "",
    description: "",
    current: false,
  });

  // Education
  const [education, setEducation] = useState<IEducation[]>([]);
  const [newEducation, setNewEducation] = useState<IEducation>({
    degree: "",
    school: "",
    year: "",
    fieldOfStudy: "",
  });

  // Certifications
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [newCertification, setNewCertification] = useState<ICertification>({
    name: "",
    issuer: "",
    year: "",
    credentialId: "",
    credentialUrl: "",
  });

  // Rates & Stats
  const [hourlyRate, setHourlyRate] = useState("");
  const [rating, setRating] = useState("");
  const [totalReviews, setTotalReviews] = useState("");
  const [jobsCompleted, setJobsCompleted] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [onTimeDelivery, setOnTimeDelivery] = useState("");
  const [onBudget, setOnBudget] = useState("");
  const [repeatClients, setRepeatClients] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        
        if (res.ok && data.user) {
          const profile = data.user.talentProfile || {};
          
          setName(data.user.name || "");
          setTitle(profile.title || "");
          setTagline(profile.tagline || "");
          setBio(profile.bio || "");
          setImage(profile.image || data.user.image || "");
          
          setLocation(profile.location || "");
          setTimezone(profile.timezone || "");
          setAvailable(profile.available || false);
          setAvailableFrom(profile.availableFrom || "");
          setWeeklyAvailability(profile.weeklyAvailability || "");
          setResponseTime(profile.responseTime || "");
          
          // Handle skills - migrate from old string array format if needed
          if (Array.isArray(profile.skills)) {
            if (profile.skills.length > 0 && typeof profile.skills[0] === 'string') {
              // Old format: string array, convert to new format
              setSkills(profile.skills.map((skill: string) => ({
                name: skill,
                level: "Expert",
                years: undefined,
              })));
            } else {
              // New format: array of objects
              setSkills(profile.skills);
            }
          } else {
            setSkills([]);
          }
          
          // Ensure arrays are always arrays
          setLanguages(Array.isArray(profile.languages) ? profile.languages : []);
          setExperience(Array.isArray(profile.experience) ? profile.experience : []);
          setEducation(Array.isArray(profile.education) ? profile.education : []);
          setCertifications(Array.isArray(profile.certifications) ? profile.certifications : []);
          
          setHourlyRate(profile.hourlyRate?.toString() || "");
          setRating(profile.rating?.toString() || "");
          setTotalReviews(profile.totalReviews?.toString() || "");
          setJobsCompleted(profile.jobsCompleted?.toString() || "");
          setSuccessRate(profile.successRate?.toString() || "");
          setOnTimeDelivery(profile.stats?.onTimeDelivery?.toString() || "");
          setOnBudget(profile.stats?.onBudget?.toString() || "");
          setRepeatClients(profile.stats?.repeatClients?.toString() || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const addSkill = () => {
    if (newSkillName.trim()) {
      setSkills([...skills, {
        name: newSkillName,
        level: newSkillLevel,
        years: newSkillYears ? parseInt(newSkillYears) : undefined,
      }]);
      setNewSkillName("");
      setNewSkillYears("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (newLanguageName.trim()) {
      setLanguages([...languages, {
        name: newLanguageName,
        level: newLanguageLevel,
      }]);
      setNewLanguageName("");
    }
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.period) {
      setExperience([...experience, { ...newExperience }]);
      setNewExperience({
        title: "",
        company: "",
        location: "",
        period: "",
        description: "",
        current: false,
      });
    }
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.school) {
      setEducation([...education, { ...newEducation }]);
      setNewEducation({
        degree: "",
        school: "",
        year: "",
        fieldOfStudy: "",
      });
    }
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setCertifications([...certifications, { ...newCertification }]);
      setNewCertification({
        name: "",
        issuer: "",
        year: "",
        credentialId: "",
        credentialUrl: "",
      });
    }
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const talentProfile: any = {
        title,
        tagline,
        bio,
        image,
        location,
        timezone,
        available,
        availableFrom,
        weeklyAvailability,
        responseTime,
        skills,
        languages,
        experience,
        education,
        certifications,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        rating: rating ? parseFloat(rating) : undefined,
        totalReviews: totalReviews ? parseInt(totalReviews) : undefined,
        jobsCompleted: jobsCompleted ? parseInt(jobsCompleted) : undefined,
        successRate: successRate ? parseFloat(successRate) : undefined,
        stats: {
          onTimeDelivery: onTimeDelivery ? parseFloat(onTimeDelivery) : undefined,
          onBudget: onBudget ? parseFloat(onBudget) : undefined,
          repeatClients: repeatClients ? parseFloat(repeatClients) : undefined,
        },
      };

      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          image,
          talentProfile,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (session?.user?.role !== "talent") {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Profile editing is only available for talent users.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Complete your profile to attract more companies
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success/Error Messages */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary"
          >
            <CheckCircle className="w-5 h-5" />
            Profile saved successfully!
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive"
          >
            {error}
          </motion.div>
        )}

        {/* Basic Information */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Professional Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Senior AI Engineer"
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Tagline
            </label>
            <Input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., Building intelligent systems that solve real-world problems"
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Profile Image URL
            </label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Bio *
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell companies about your background, expertise, and what makes you unique..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Location & Availability */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            Location & Availability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Location
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, USA"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select timezone</option>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-4 h-4 rounded border-input"
            />
            <label htmlFor="available" className="text-sm font-medium text-foreground">
              Currently Available
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Available From
              </label>
              <select
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select availability</option>
                {availabilityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Weekly Availability
              </label>
              <select
                value={weeklyAvailability}
                onChange={(e) => setWeeklyAvailability(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select hours</option>
                {weeklyAvailabilityOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Response Time
            </label>
            <select
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select response time</option>
              {responseTimeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            Skills & Expertise
          </h2>

          {/* Existing Skills */}
          {Array.isArray(skills) && skills.length > 0 && (
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-muted">
                  <div className="flex-1">
                    <span className="font-medium text-foreground">{skill?.name || 'Unknown'}</span>
                    <span className="ml-2 text-sm text-muted-foreground">• {skill?.level || 'Expert'}</span>
                    {skill?.years && (
                      <span className="ml-2 text-sm text-muted-foreground">• {skill.years} years</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Skill */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Skill name"
              className="rounded-xl md:col-span-2"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {skillLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <Input
                value={newSkillYears}
                onChange={(e) => setNewSkillYears(e.target.value)}
                placeholder="Years"
                type="number"
                className="rounded-xl"
              />
              <Button type="button" onClick={addSkill} className="rounded-xl">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Add Common Skills */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(skills) && commonSkills.filter(s => !skills.some(sk => sk?.name === s)).slice(0, 10).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    setNewSkillName(skill);
                    addSkill();
                  }}
                  className="px-3 py-1 rounded-lg bg-muted text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            Languages
          </h2>

          {/* Existing Languages */}
          {Array.isArray(languages) && languages.length > 0 && (
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-muted">
                  <div className="flex-1">
                    <span className="font-medium text-foreground">{lang?.name || 'Unknown'}</span>
                    <span className="ml-2 text-sm text-muted-foreground">• {lang?.level || 'Fluent'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Language */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              value={newLanguageName}
              onChange={(e) => setNewLanguageName(e.target.value)}
              placeholder="Language name"
              className="rounded-xl"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
            />
            <select
              value={newLanguageLevel}
              onChange={(e) => setNewLanguageLevel(e.target.value)}
              className="px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {languageLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <Button type="button" onClick={addLanguage} className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary" />
            </div>
            Work Experience
          </h2>

          {/* Existing Experience */}
          {Array.isArray(experience) && experience.length > 0 && (
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-sm text-primary">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {exp.location && `${exp.location} • `}{exp.period}
                        {exp.current && " • Current"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add New Experience */}
          <div className="p-4 rounded-xl border border-border space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                placeholder="Job Title *"
                className="rounded-xl"
              />
              <Input
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="Company *"
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="Location"
                className="rounded-xl"
              />
              <Input
                value={newExperience.period}
                onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                placeholder="Period (e.g., 2020 - 2023) *"
                className="rounded-xl"
              />
            </div>
            <textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              placeholder="Description"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="current-job"
                checked={newExperience.current}
                onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked })}
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="current-job" className="text-sm text-muted-foreground">
                This is my current position
              </label>
            </div>
            <Button type="button" onClick={addExperience} className="rounded-xl w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </div>

        {/* Education */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            Education
          </h2>

          {/* Existing Education */}
          {Array.isArray(education) && education.length > 0 && (
            <div className="space-y-2">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-xl bg-muted">
                  <div>
                    <p className="font-medium text-foreground">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.school} {edu.year && `• ${edu.year}`}
                    </p>
                    {edu.fieldOfStudy && (
                      <p className="text-xs text-muted-foreground">{edu.fieldOfStudy}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              placeholder="Degree *"
              className="rounded-xl"
            />
            <Input
              value={newEducation.school}
              onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
              placeholder="School/University *"
              className="rounded-xl"
            />
            <Input
              value={newEducation.year}
              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
              placeholder="Year"
              className="rounded-xl"
            />
            <Input
              value={newEducation.fieldOfStudy}
              onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
              placeholder="Field of Study"
              className="rounded-xl"
            />
          </div>
          <Button type="button" onClick={addEducation} className="rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        {/* Certifications */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="w-4 h-4 text-primary" />
            </div>
            Certifications
          </h2>

          {/* Existing Certifications */}
          {Array.isArray(certifications) && certifications.length > 0 && (
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-xl bg-muted">
                  <div>
                    <p className="font-medium text-foreground">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} {cert.year && `• ${cert.year}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="p-1 rounded-lg hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Certification */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                value={newCertification.name}
                onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                placeholder="Certification Name *"
                className="rounded-xl"
              />
              <Input
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                placeholder="Issuing Organization *"
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                value={newCertification.year}
                onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                placeholder="Year"
                className="rounded-xl"
              />
              <Input
                value={newCertification.credentialId}
                onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
                placeholder="Credential ID"
                className="rounded-xl"
              />
              <Input
                value={newCertification.credentialUrl}
                onChange={(e) => setNewCertification({ ...newCertification, credentialUrl: e.target.value })}
                placeholder="Credential URL"
                type="url"
                className="rounded-xl"
              />
            </div>
            <Button type="button" onClick={addCertification} className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </div>

        {/* Rates & Performance Stats */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            Rates & Performance Stats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Hourly Rate (USD)
              </label>
              <Input
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="e.g., 150"
                type="number"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Rating (0-5)
              </label>
              <Input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g., 4.9"
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Total Reviews
              </label>
              <Input
                value={totalReviews}
                onChange={(e) => setTotalReviews(e.target.value)}
                placeholder="e.g., 47"
                type="number"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Jobs Completed
              </label>
              <Input
                value={jobsCompleted}
                onChange={(e) => setJobsCompleted(e.target.value)}
                placeholder="e.g., 52"
                type="number"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Success Rate (%)
              </label>
              <Input
                value={successRate}
                onChange={(e) => setSuccessRate(e.target.value)}
                placeholder="e.g., 98"
                type="number"
                min="0"
                max="100"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                On-Time Delivery (%)
              </label>
              <Input
                value={onTimeDelivery}
                onChange={(e) => setOnTimeDelivery(e.target.value)}
                placeholder="e.g., 100"
                type="number"
                min="0"
                max="100"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                On Budget (%)
              </label>
              <Input
                value={onBudget}
                onChange={(e) => setOnBudget(e.target.value)}
                placeholder="e.g., 98"
                type="number"
                min="0"
                max="100"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Repeat Clients (%)
              </label>
              <Input
                value={repeatClients}
                onChange={(e) => setRepeatClients(e.target.value)}
                placeholder="e.g., 85"
                type="number"
                min="0"
                max="100"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 px-8"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
