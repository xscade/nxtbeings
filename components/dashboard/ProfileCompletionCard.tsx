"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface ProfileCompletionCardProps {
  completion: number;
}

export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (completion / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        {/* Circular Progress */}
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary/10"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-primary"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{completion}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Complete Your Profile</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Complete your profile for better company matches. Our AI matching model performs better with more context, helping you get discovered by the right opportunities.
          </p>

          {/* Progress Indicators */}
          <div className="space-y-2 mb-4">
            {completion < 50 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Add basic information to get started</span>
              </div>
            )}
            {completion >= 50 && completion < 80 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Add skills and experience to improve visibility</span>
              </div>
            )}
            {completion >= 80 && completion < 100 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Add performance stats and certifications to complete</span>
              </div>
            )}
            {completion === 100 && (
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile complete! You&apos;re all set.</span>
              </div>
            )}
          </div>

          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {completion === 100 ? "View Profile" : "Complete Profile"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

