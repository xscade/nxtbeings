"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Loader2, 
  Trash2,
  MoreHorizontal,
  Phone,
  Video,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShortlistItem {
  id: string;
  status: string;
  notes?: string;
  createdAt: string;
  talent: {
    id: string;
    name: string;
    email: string;
    image?: string;
    title?: string;
    skills?: string[];
    experience?: string;
  } | null;
}

const statusOptions = [
  { value: "shortlisted", label: "Shortlisted", color: "amber" },
  { value: "contacted", label: "Contacted", color: "blue" },
  { value: "interviewing", label: "Interviewing", color: "violet" },
  { value: "hired", label: "Hired", color: "emerald" },
  { value: "rejected", label: "Rejected", color: "slate" },
];

const statusColors: Record<string, string> = {
  shortlisted: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  contacted: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  interviewing: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  hired: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-muted text-muted-foreground border-border",
};

function ShortlistContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "";
  
  const [shortlists, setShortlists] = useState<ShortlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchShortlists = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);
      params.set("limit", "50");

      const res = await fetch(`/api/shortlist?${params}`);
      const data = await res.json();

      if (res.ok) {
        setShortlists(data.shortlists);
      }
    } catch (error) {
      console.error("Error fetching shortlists:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchShortlists();
  }, [fetchShortlists]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/shortlist/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setShortlists((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status } : s))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setActiveMenu(null);
  };

  const removeFromShortlist = async (id: string) => {
    try {
      const res = await fetch(`/api/shortlist/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShortlists((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Error removing from shortlist:", error);
    }
  };

  const statusCounts = shortlists.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Shortlist</h1>
        <p className="text-muted-foreground mt-1">
          Manage your shortlisted candidates
        </p>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterStatus === ""
              ? "bg-gradient-to-r from-blue-500 to-primary text-white shadow-md"
              : "bg-white/60 text-muted-foreground border border-white/30 hover:bg-white/80"
          }`}
        >
          All ({shortlists.length})
        </button>
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilterStatus(filterStatus === opt.value ? "" : opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterStatus === opt.value
                ? "bg-gradient-to-r from-blue-500 to-primary text-white shadow-md"
                : "bg-white/60 text-muted-foreground border border-white/30 hover:bg-white/80"
            }`}
          >
            {opt.label} ({statusCounts[opt.value] || 0})
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : shortlists.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mx-auto">
            <Star className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-muted-foreground mt-4">
            {filterStatus
              ? `No candidates with "${filterStatus}" status.`
              : "No candidates in your shortlist yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-white/40">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Candidate
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                  Skills
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {shortlists.map((item) => (
                <tr key={item.id} className="hover:bg-white/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-primary flex items-center justify-center text-white font-medium shadow-md">
                        {item.talent?.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {item.talent?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.talent?.title || "No title"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {item.talent?.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {(item.talent?.skills?.length || 0) > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                          +{(item.talent?.skills?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize border backdrop-blur-sm ${
                        statusColors[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* Quick Actions */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        title="Contact via Email"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl h-8 w-8 p-0 text-muted-foreground hover:text-violet-600 hover:bg-violet-500/10"
                        title="Schedule Interview"
                      >
                        <Video className="w-4 h-4" />
                      </Button>

                      {/* More Menu */}
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-xl h-8 w-8 p-0 text-muted-foreground"
                          onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>

                        <AnimatePresence>
                          {activeMenu === item.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setActiveMenu(null)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 mt-1 w-48 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl shadow-primary/10 border border-white/20 py-1 z-50"
                              >
                                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
                                  Update Status
                                </p>
                                {statusOptions.map((opt) => (
                                  <button
                                    key={opt.value}
                                    onClick={() => updateStatus(item.id, opt.value)}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-2 ${
                                      item.status === opt.value
                                        ? "text-primary bg-primary/10"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {item.status === opt.value && (
                                      <CheckCircle className="w-4 h-4" />
                                    )}
                                    {opt.label}
                                  </button>
                                ))}
                                <div className="border-t border-border/50 mt-1 pt-1">
                                  <button
                                    onClick={() => removeFromShortlist(item.id)}
                                    className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ShortlistPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ShortlistContent />
    </Suspense>
  );
}
