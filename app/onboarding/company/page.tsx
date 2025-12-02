"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Globe, 
  Users, 
  Briefcase,
  Loader2,
  ArrowRight
} from "lucide-react";

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const hiringNeeds = [
  "AI Engineers",
  "ML Ops",
  "Data Scientists",
  "NLP Specialists",
  "Computer Vision",
  "AI Researchers",
  "Prompt Engineers",
  "AI Product Managers",
];

export default function CompanyOnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [size, setSize] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need)
        ? prev.filter((n) => n !== need)
        : [...prev, need]
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
          companyProfile: {
            companyName,
            website,
            size,
            hiringNeeds: selectedNeeds,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Set up your company profile
            </h1>
            <p className="text-slate-500 mt-2">
              Welcome{session?.user?.name ? `, ${session.user.name}` : ""}! Tell us about your company so we can match you with the right talent.
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
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Company name
                </label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Inc."
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  Website (optional)
                </label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  Company size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {companySizes.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSize(option.value)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        size === option.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
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
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  What roles are you looking to fill?
                </label>
                <div className="flex flex-wrap gap-2">
                  {hiringNeeds.map((need) => (
                    <button
                      key={need}
                      type="button"
                      onClick={() => toggleNeed(need)}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                        selectedNeeds.includes(need)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      {need}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !companyName || !size}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Complete setup
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

