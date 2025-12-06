"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  FileText,
  MoreVertical,
  Clock,
  Eye,
  Trash2,
  Edit3,
  Copy,
  Archive,
  Loader2,
  FolderOpen,
  Grid3X3,
  List,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobDescription {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  department?: string;
  location?: string;
  employmentType?: string;
  thumbnail?: string;
  viewCount: number;
  lastOpenedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function JobDescriptionsPage() {
  const router = useRouter();
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchJobDescriptions();
  }, [statusFilter]);

  const fetchJobDescriptions = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      
      const response = await fetch(`/api/job-descriptions?${params}`);
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

  const createNewJD = async () => {
    setCreating(true);
    try {
      const response = await fetch("/api/job-descriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled Job Description",
          status: "draft",
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push(`/dashboard/job-descriptions/${data.jobDescription.id}`);
      }
    } catch (error) {
      console.error("Error creating job description:", error);
    } finally {
      setCreating(false);
    }
  };

  const deleteJD = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job description?")) return;
    
    try {
      const response = await fetch(`/api/job-descriptions/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setJobDescriptions((prev) => prev.filter((jd) => jd.id !== id));
      }
    } catch (error) {
      console.error("Error deleting job description:", error);
    }
    setActiveMenu(null);
  };

  const duplicateJD = async (jd: JobDescription) => {
    try {
      const response = await fetch("/api/job-descriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${jd.title} (Copy)`,
          status: "draft",
          department: jd.department,
          location: jd.location,
          employmentType: jd.employmentType,
        }),
      });
      
      if (response.ok) {
        fetchJobDescriptions();
      }
    } catch (error) {
      console.error("Error duplicating job description:", error);
    }
    setActiveMenu(null);
  };

  const filteredJDs = jobDescriptions.filter((jd) =>
    jd.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins} min ago`;
      }
      return `${diffHours} hours ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Descriptions</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and manage job descriptions for AI interviews
          </p>
        </div>
        <Button
          onClick={createNewJD}
          disabled={creating}
          className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        >
          {creating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          Create New
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search job descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-primary/5 transition-colors"
            >
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
            
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-40 bg-card rounded-xl border border-border shadow-lg shadow-primary/5 py-1 z-20"
                >
                  {["all", "draft", "published", "archived"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-primary/5 transition-colors ${
                        statusFilter === status ? "text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-primary/5"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-primary/5"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredJDs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-border"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchQuery ? "No matching job descriptions" : "No job descriptions yet"}
          </h3>
          <p className="text-muted-foreground text-sm text-center max-w-sm mb-6">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Create your first job description to start conducting AI interviews"}
          </p>
          {!searchQuery && (
            <Button
              onClick={createNewJD}
              disabled={creating}
              className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            >
              {creating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Create Job Description
            </Button>
          )}
        </motion.div>
      ) : viewMode === "grid" ? (
        /* Grid View - Google Docs Style */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Create New Card */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={createNewJD}
            disabled={creating}
            className="group h-64 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-card/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-3 transition-all"
          >
            {creating ? (
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Create New
                </span>
              </>
            )}
          </motion.button>

          {/* JD Cards */}
          {filteredJDs.map((jd, index) => (
            <motion.div
              key={jd.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative h-64 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden"
            >
              {/* Thumbnail Preview */}
              <Link href={`/dashboard/job-descriptions/${jd.id}`}>
                <div
                  className="h-32 flex items-center justify-center"
                  style={{ backgroundColor: jd.thumbnail || "#E3F2FD" }}
                >
                  <FileText className="w-12 h-12 text-primary/30" />
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link href={`/dashboard/job-descriptions/${jd.id}`}>
                  <h3 className="font-medium text-foreground truncate hover:text-primary transition-colors">
                    {jd.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(jd.status)}`}>
                    {jd.status}
                  </span>
                  {jd.department && (
                    <span className="text-xs text-muted-foreground truncate">
                      {jd.department}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(jd.updatedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {jd.viewCount}
                  </span>
                </div>
              </div>

              {/* Menu Button */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(activeMenu === jd.id ? null : jd.id);
                  }}
                  className="p-1.5 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {activeMenu === jd.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-40 bg-card rounded-xl border border-border shadow-lg py-1 z-20"
                    >
                      <Link
                        href={`/dashboard/job-descriptions/${jd.id}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-primary/5 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => duplicateJD(jd)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-primary/5 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                      <button
                        onClick={() => deleteJD(jd.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Department
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Last Modified
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredJDs.map((jd, index) => (
                <motion.tr
                  key={jd.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-primary/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/job-descriptions/${jd.id}`}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: jd.thumbnail || "#E3F2FD" }}
                      >
                        <FileText className="w-4 h-4 text-primary/50" />
                      </div>
                      <span className="font-medium text-foreground hover:text-primary transition-colors">
                        {jd.title}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(jd.status)}`}>
                      {jd.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {jd.department || "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                    {formatDate(jd.updatedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/dashboard/job-descriptions/${jd.id}`}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => duplicateJD(jd)}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteJD(jd.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Click outside to close menus */}
      {(activeMenu || showFilterMenu) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setActiveMenu(null);
            setShowFilterMenu(false);
          }}
        />
      )}
    </div>
  );
}
