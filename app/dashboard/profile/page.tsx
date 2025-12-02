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
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

const skillOptions = [
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "LLMs",
  "Prompt Engineering",
  "MLOps",
  "Data Science",
  "Python",
  "PyTorch",
  "TensorFlow",
  "Langchain",
  "RAG",
  "Fine-tuning",
  "AI Agents",
  "Generative AI",
];

const experienceLevels = [
  { value: "0-2", label: "0-2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

const availabilityOptions = [
  { value: "immediate", label: "Immediate" },
  { value: "2-weeks", label: "2 weeks notice" },
  { value: "1-month", label: "1 month notice" },
  { value: "not-available", label: "Not available" },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        
        if (res.ok && data.user) {
          setName(data.user.name || "");
          setTitle(data.user.talentProfile?.title || "");
          setBio(data.user.talentProfile?.bio || "");
          setExperience(data.user.talentProfile?.experience || "");
          setSelectedSkills(data.user.talentProfile?.skills || []);
          setPortfolio(data.user.talentProfile?.portfolio || "");
          setHourlyRate(data.user.talentProfile?.hourlyRate?.toString() || "");
          setAvailability(data.user.talentProfile?.availability || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          talentProfile: {
            title,
            bio,
            experience,
            skills: selectedSkills,
            portfolio,
            hourlyRate: hourlyRate ? parseInt(hourlyRate) : undefined,
            availability,
          },
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
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  // Only show for talent users
  if (session?.user?.role !== "talent") {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Profile editing is only available for talent users.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">
          Update your profile to attract more companies
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700"
          >
            <CheckCircle className="w-5 h-5" />
            Profile saved successfully!
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-slate-400" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Professional Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Senior ML Engineer"
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell companies about your background, expertise, and what makes you unique..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
            />
          </div>
        </div>

        {/* Experience & Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-400" />
            Experience & Skills
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Years of Experience
            </label>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setExperience(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    experience === opt.value
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Skills & Expertise
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedSkills.includes(skill)
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-slate-400" />
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Portfolio / Website
              </label>
              <Input
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://yourportfolio.com"
                type="url"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
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
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Availability
            </label>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAvailability(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    availability === opt.value
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-violet-600 hover:bg-violet-700 px-6"
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

