"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  Briefcase,
  Code2,
  Loader2,
  ArrowRight
} from "lucide-react";

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

export default function TalentOnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          talentProfile: {
            title,
            experience,
            skills: selectedSkills,
            bio,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      // Update session to reflect onboarding completion
      await update({ onboardingCompleted: true });
      
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Create your talent profile
            </h1>
            <p className="text-slate-500 mt-2">
              Welcome{session?.user?.name ? `, ${session.user.name}` : ""}! Tell us about your expertise to get discovered by top companies.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  Professional title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Senior ML Engineer, AI Researcher"
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  Years of experience
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {experienceLevels.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setExperience(option.value)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        experience === option.value
                          ? "border-violet-500 bg-violet-50 text-violet-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Code2 className="w-4 h-4 text-slate-400" />
                  Skills & expertise
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                        selectedSkills.includes(skill)
                          ? "border-violet-500 bg-violet-50 text-violet-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Select at least 3 skills that best describe your expertise
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Sparkles className="w-4 h-4 text-slate-400" />
                  Short bio (optional)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell companies about your background, interests, and what makes you unique..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !title || !experience || selectedSkills.length < 3}
                className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium mt-4"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Complete profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

