"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  FileText,
  Plus,
  Loader2,
  Video,
  CheckCircle,
  Clock,
  Briefcase,
  MapPin,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobDescription {
  id: string;
  title: string;
  status: string;
  department?: string;
  location?: string;
  employmentType?: string;
  thumbnail?: string;
  updatedAt: string;
}

interface AIInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  talentId: string;
  talentName: string;
}

export function AIInterviewModal({
  isOpen,
  onClose,
  talentId,
  talentName,
}: AIInterviewModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJD, setSelectedJD] = useState<JobDescription | null>(null);
  const [scheduledAt, setScheduledAt] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      fetchJobDescriptions();
      setStep("select");
      setSelectedJD(null);
      setScheduledAt("");
    }
  }, [isOpen]);

  const fetchJobDescriptions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/job-descriptions?status=published");
      const data = await response.json();
      
      if (response.ok) {
        setJobDescriptions(data.jobDescriptions);
      }
    } catch (error) {
      console.error("Error fetching job descriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectJD = (jd: JobDescription) => {
    setSelectedJD(jd);
    setStep("confirm");
  };

  const handleSendRequest = async () => {
    if (!selectedJD) return;
    
    setSending(true);
    try {
      const response = await fetch("/api/interviews/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          talentId,
          jobDescriptionId: selectedJD.id,
          scheduledAt: scheduledAt || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep("success");
      } else {
        alert(data.error || "Failed to send interview request");
      }
    } catch (error) {
      console.error("Error sending interview request:", error);
      alert("Failed to send interview request");
    } finally {
      setSending(false);
    }
  };

  const filteredJDs = jobDescriptions.filter((jd) =>
    jd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    jd.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Video className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {step === "success" ? "Interview Request Sent!" : "AI Interview"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {step === "select" && "Select a job description"}
                  {step === "confirm" && `For ${talentName}`}
                  {step === "success" && "The candidate will be notified"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === "select" && (
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search job descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                {/* JD List */}
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {loading ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  ) : filteredJDs.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {searchQuery ? "No matching jobs" : "No published jobs"}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {searchQuery
                          ? "Try a different search"
                          : "Create and publish a job description first"}
                      </p>
                      {!searchQuery && (
                        <Button
                          onClick={() => router.push("/dashboard/job-descriptions")}
                          size="sm"
                          className="rounded-xl"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Create Job
                        </Button>
                      )}
                    </div>
                  ) : (
                    filteredJDs.map((jd) => (
                      <motion.button
                        key={jd.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectJD(jd)}
                        className="w-full flex items-start gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: jd.thumbnail || "#E3F2FD" }}
                        >
                          <FileText className="w-5 h-5 text-primary/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {jd.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            {jd.department && (
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" />
                                {jd.department}
                              </span>
                            )}
                            {jd.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {jd.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>
            )}

            {step === "confirm" && selectedJD && (
              <div className="space-y-6">
                {/* Selected JD Preview */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: selectedJD.thumbnail || "#E3F2FD" }}
                    >
                      <FileText className="w-6 h-6 text-primary/50" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{selectedJD.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        {selectedJD.department && (
                          <span>{selectedJD.department}</span>
                        )}
                        {selectedJD.location && (
                          <span>{selectedJD.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Option */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Schedule Interview (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to send immediately
                  </p>
                </div>

                {/* Info */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">What happens next?</p>
                    <p className="mt-1 text-blue-700">
                      The candidate will receive an interview request in their dashboard.
                      They can complete the AI interview at their convenience within 7 days.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("select")}
                    className="flex-1 rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSendRequest}
                    disabled={sending}
                    className="flex-1 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Send Request
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Interview Request Sent!
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {talentName} will receive a notification and can start the AI interview
                  from their dashboard.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 rounded-xl"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard/shortlist")}
                    className="flex-1 rounded-xl bg-primary text-primary-foreground"
                  >
                    View Shortlist
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
