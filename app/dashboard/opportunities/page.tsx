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
  shortlisted: "bg-amber-50 text-amber-700 border-amber-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  interviewing: "bg-violet-50 text-violet-700 border-violet-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-slate-100 text-slate-600 border-slate-200",
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
        <h1 className="text-2xl font-bold text-slate-900">Opportunities</h1>
        <p className="text-slate-500 mt-1">
          Companies that are interested in your profile
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-sm text-slate-500">Total Interest</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-amber-600">{stats.shortlisted}</p>
            <p className="text-sm text-slate-500">Shortlisted</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
            <p className="text-sm text-slate-500">Contacted</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-violet-600">{stats.interviewing}</p>
            <p className="text-sm text-slate-500">Interviewing</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterStatus === ""
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All
        </button>
        {["shortlisted", "contacted", "interviewing"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              filterStatus === status
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {statusLabels[status] || status}
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-200 mx-auto" />
          <p className="text-slate-500 mt-4">
            {filterStatus
              ? `No opportunities with "${statusLabels[filterStatus]}" status.`
              : "No companies have shown interest yet."}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Make sure your profile is complete to attract more companies.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Company Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                  {opportunity.company?.name?.charAt(0) || "?"}
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {opportunity.company?.name || "Unknown Company"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
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
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
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
                        className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <span className="text-sm text-slate-400">
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

