"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter,
  Star,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { TalentCard } from "@/components/dashboard/TalentCard";

interface Talent {
  id: string;
  name: string;
  email: string;
  image?: string;
  title?: string;
  skills?: string[];
  experience?: string;
  bio?: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

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
];

const experienceOptions = [
  { value: "0-2", label: "0-2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

export default function BrowseTalentPage() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const fetchTalents = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedSkills.length > 0) params.set("skills", selectedSkills.join(","));
      if (experience) params.set("experience", experience);
      params.set("page", page.toString());
      params.set("limit", "12");

      const res = await fetch(`/api/talent?${params}`);
      const data = await res.json();

      if (res.ok) {
        setTalents(data.talents);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching talents:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedSkills, experience, page]);

  const fetchShortlisted = useCallback(async () => {
    try {
      const res = await fetch("/api/shortlist?limit=100");
      const data = await res.json();
      if (res.ok) {
        const ids = new Set(data.shortlists.map((s: { talent: { id: string } }) => s.talent?.id));
        setShortlistedIds(ids as Set<string>);
      }
    } catch (error) {
      console.error("Error fetching shortlist:", error);
    }
  }, []);

  useEffect(() => {
    fetchTalents();
  }, [fetchTalents]);

  useEffect(() => {
    fetchShortlisted();
  }, [fetchShortlisted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTalents();
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedSkills([]);
    setExperience("");
    setPage(1);
  };

  const handleShortlist = async (talentId: string) => {
    try {
      const res = await fetch("/api/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ talentId }),
      });

      if (res.ok) {
        setShortlistedIds((prev) => new Set([...prev, talentId]));
      }
    } catch (error) {
      console.error("Error shortlisting:", error);
    }
  };

  const hasFilters = search || selectedSkills.length > 0 || experience;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Browse Talent</h1>
          <p className="text-slate-500 mt-1">
            Discover AI professionals for your team
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, title, or skills..."
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`rounded-xl h-11 ${showFilters ? "bg-slate-100" : ""}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {(selectedSkills.length > 0 || experience) && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-xs">
                {selectedSkills.length + (experience ? 1 : 0)}
              </span>
            )}
          </Button>
          <Button type="submit" className="rounded-xl h-11">
            Search
          </Button>
        </form>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Experience
              </label>
              <div className="flex flex-wrap gap-2">
                {experienceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setExperience(experience === opt.value ? "" : opt.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      experience === opt.value
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : talents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Search className="w-12 h-12 text-slate-200 mx-auto" />
          <p className="text-slate-500 mt-4">No talent found matching your criteria.</p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Results count */}
          <p className="text-sm text-slate-500">
            Showing {talents.length} of {pagination?.total || 0} professionals
          </p>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {talents.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                isShortlisted={shortlistedIds.has(talent.id)}
                onShortlist={() => handleShortlist(talent.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-600 px-4">
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

