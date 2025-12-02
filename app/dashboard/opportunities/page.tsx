"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Briefcase, 
  Loader2, 
  Building2,
  Globe,
  Users,
  ExternalLink
} from "lucide-react";

interface Opportunity {
  id: string;
  status: string;
  createdAt: string;
  company: {
    id: string;
    name: string;
    email: string;
    image?: string;
    website?: string;
    size?: string;
    industry?: string;
  } | null;
}

interface Stats {
  total: number;
  shortlisted: number;
  contacted: number;
  interviewing: number;
}

const statusColors: Record<string, string> = {
  shortlisted: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  contacted: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  interviewing: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  hired: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  shortlisted: "Shortlisted",
  contacted: "Contacted You",
  interviewing: "Interviewing",
  hired: "Hired",
  rejected: "Not Selected",
};

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  const fetchOpportunities = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/talent/interested");
      const data = await res.json();

      if (res.ok) {
        setOpportunities(data.opportunities);
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const filteredOpportunities = filterStatus
    ? opportunities.filter((o) => o.status === filterStatus)
    : opportunities;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          Companies that are interested in your profile
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Interest</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
            <p className="text-2xl font-bold text-amber-600">{stats.shortlisted}</p>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
            <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
            <p className="text-2xl font-bold text-violet-600">{stats.interviewing}</p>
            <p className="text-sm text-muted-foreground">Interviewing</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterStatus === ""
              ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
              : "bg-white/60 text-muted-foreground border border-white/30 hover:bg-white/80"
          }`}
        >
          All
        </button>
        {["shortlisted", "contacted", "interviewing"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filterStatus === status
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
                : "bg-white/60 text-muted-foreground border border-white/30 hover:bg-white/80"
            }`}
          >
            {statusLabels[status] || status}
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-indigo-500" />
          </div>
          <p className="text-muted-foreground mt-4">
            {filterStatus
              ? `No opportunities with "${statusLabels[filterStatus]}" status.`
              : "No companies have shown interest yet."}
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            Make sure your profile is complete to attract more companies.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/80 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Company Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center text-white text-xl font-semibold shadow-lg shadow-primary/20">
                  {opportunity.company?.name?.charAt(0) || "?"}
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {opportunity.company?.name || "Unknown Company"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                        {opportunity.company?.industry && (
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {opportunity.company.industry}
                          </span>
                        )}
                        {opportunity.company?.size && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {opportunity.company.size} employees
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                        statusColors[opportunity.status]
                      }`}
                    >
                      {statusLabels[opportunity.status] || opportunity.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    {opportunity.company?.website && (
                      <a
                        href={opportunity.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Added {new Date(opportunity.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
