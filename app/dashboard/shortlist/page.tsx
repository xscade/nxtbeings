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
  shortlisted: "bg-amber-50 text-amber-700 border-amber-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  interviewing: "bg-violet-50 text-violet-700 border-violet-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-slate-100 text-slate-600 border-slate-200",
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
        <h1 className="text-2xl font-bold text-slate-900">Shortlist</h1>
        <p className="text-slate-500 mt-1">
          Manage your shortlisted candidates
        </p>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterStatus === ""
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All ({shortlists.length})
        </button>
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilterStatus(filterStatus === opt.value ? "" : opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterStatus === opt.value
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {opt.label} ({statusCounts[opt.value] || 0})
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : shortlists.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Star className="w-12 h-12 text-slate-200 mx-auto" />
          <p className="text-slate-500 mt-4">
            {filterStatus
              ? `No candidates with "${filterStatus}" status.`
              : "No candidates in your shortlist yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Candidate
                </th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                  Skills
                </th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shortlists.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white font-medium">
                        {item.talent?.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.talent?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-slate-500">
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
                          className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {(item.talent?.skills?.length || 0) > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs">
                          +{(item.talent?.skills?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${
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
                        className="rounded-lg h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
                        title="Contact via Email"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-8 w-8 p-0 text-slate-400 hover:text-violet-600"
                        title="Schedule Interview"
                      >
                        <Video className="w-4 h-4" />
                      </Button>

                      {/* More Menu */}
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg h-8 w-8 p-0 text-slate-400"
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
                                className="absolute right-0 mt-1 w-48 rounded-xl bg-white shadow-lg border border-slate-200 py-1 z-50"
                              >
                                <p className="px-3 py-2 text-xs font-medium text-slate-400 uppercase">
                                  Update Status
                                </p>
                                {statusOptions.map((opt) => (
                                  <button
                                    key={opt.value}
                                    onClick={() => updateStatus(item.id, opt.value)}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${
                                      item.status === opt.value
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {item.status === opt.value && (
                                      <CheckCircle className="w-4 h-4" />
                                    )}
                                    {opt.label}
                                  </button>
                                ))}
                                <div className="border-t border-slate-100 mt-1 pt-1">
                                  <button
                                    onClick={() => removeFromShortlist(item.id)}
                                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <ShortlistContent />
    </Suspense>
  );
}

