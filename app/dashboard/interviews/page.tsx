"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2,
  FileText,
  Play,
  Eye,
  Loader2,
  ChevronRight,
  Timer,
  XCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Interview {
  id: string;
  status: "pending" | "scheduled" | "in_progress" | "completed" | "cancelled" | "expired";
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  expiresAt?: string;
  questionsCount: number;
  analysis?: {
    overallScore: number;
    cheatingRiskLevel: string;
  };
  createdAt: string;
  jobDescription: {
    id: string;
    title: string;
    department?: string;
  } | null;
  company: {
    id: string;
    name: string;
  } | null;
}

export default function InterviewsPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await fetch("/api/interviews/ai");
      const data = await response.json();
      
      if (response.ok) {
        setInterviews(data.interviews);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
          description: "Waiting to be started",
        };
      case "scheduled":
        return {
          label: "Scheduled",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Calendar,
          description: "Interview is scheduled",
        };
      case "in_progress":
        return {
          label: "In Progress",
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: Play,
          description: "Currently in progress",
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle2,
          description: "Interview completed",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          color: "bg-gray-100 text-gray-600 border-gray-200",
          icon: XCircle,
          description: "Interview was cancelled",
        };
      case "expired":
        return {
          label: "Expired",
          color: "bg-red-100 text-red-600 border-red-200",
          icon: AlertCircle,
          description: "Interview expired",
        };
      default:
        return {
          label: status,
          color: "bg-muted text-muted-foreground",
          icon: Clock,
          description: "",
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  const filteredInterviews = interviews.filter((interview) => {
    if (filter === "all") return true;
    if (filter === "active") return ["pending", "scheduled", "in_progress"].includes(interview.status);
    return interview.status === filter;
  });

  const pendingCount = interviews.filter((i) => ["pending", "scheduled"].includes(i.status)).length;
  const inProgressCount = interviews.filter((i) => i.status === "in_progress").length;
  const completedCount = interviews.filter((i) => i.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Interviews</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Complete AI-powered interviews requested by companies
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Play className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "pending", label: "Pending" },
          { id: "in_progress", label: "In Progress" },
          { id: "completed", label: "Completed" },
        ].map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              filter === filterOption.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:bg-primary/5 hover:text-primary"
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredInterviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-border"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {filter === "all" ? "No interviews yet" : `No ${filter} interviews`}
          </h3>
          <p className="text-muted-foreground text-sm text-center max-w-sm">
            {filter === "all"
              ? "When companies request AI interviews, they will appear here."
              : "Try a different filter to see more interviews."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map((interview, index) => {
            const statusConfig = getStatusConfig(interview.status);
            const StatusIcon = statusConfig.icon;
            const canStart = ["pending", "scheduled"].includes(interview.status);
            const canContinue = interview.status === "in_progress";

            return (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Left: Job & Company Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">
                          {interview.jobDescription?.title || "Job Position"}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {interview.company?.name || "Company"}
                          </span>
                          {interview.jobDescription?.department && (
                            <span>• {interview.jobDescription.department}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${statusConfig.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusConfig.label}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Sparkles className="w-3.5 h-3.5" />
                            {interview.questionsCount} questions
                          </span>
                          {interview.expiresAt && canStart && (
                            <span className="flex items-center gap-1 text-xs text-orange-600">
                              <Timer className="w-3.5 h-3.5" />
                              {getTimeRemaining(interview.expiresAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Score */}
                  <div className="flex items-center gap-4">
                    {/* Score (for completed) */}
                    {interview.status === "completed" && interview.analysis && (
                      <div className="text-center px-4">
                        <div className={`text-2xl font-bold ${
                          interview.analysis.overallScore >= 80 
                            ? "text-green-600" 
                            : interview.analysis.overallScore >= 60 
                            ? "text-yellow-600" 
                            : "text-red-600"
                        }`}>
                          {interview.analysis.overallScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {canStart && (
                        <Link href={`/dashboard/interviews/${interview.id}`}>
                          <Button className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Play className="w-4 h-4 mr-2" />
                            Start Interview
                          </Button>
                        </Link>
                      )}
                      {canContinue && (
                        <Link href={`/dashboard/interviews/${interview.id}`}>
                          <Button className="rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </Link>
                      )}
                      {interview.status === "completed" && (
                        <Link href={`/dashboard/interviews/${interview.id}`}>
                          <Button variant="outline" className="rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            View Results
                          </Button>
                        </Link>
                      )}
                      {["cancelled", "expired"].includes(interview.status) && (
                        <Button variant="outline" className="rounded-xl" disabled>
                          {interview.status === "expired" ? "Expired" : "Cancelled"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline Info */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Requested: {formatDate(interview.createdAt)}
                  </span>
                  {interview.scheduledAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Scheduled: {formatDate(interview.scheduledAt)}
                    </span>
                  )}
                  {interview.completedAt && (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed: {formatDate(interview.completedAt)}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
