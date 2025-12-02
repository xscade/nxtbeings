"use client";

import { Star, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface TalentCardProps {
  talent: Talent;
  isShortlisted: boolean;
  onShortlist: () => void;
}

const experienceLabels: Record<string, string> = {
  "0-2": "0-2 yrs",
  "2-5": "2-5 yrs",
  "5-10": "5-10 yrs",
  "10+": "10+ yrs",
};

export function TalentCard({ talent, isShortlisted, onShortlist }: TalentCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white font-semibold text-lg">
            {talent.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{talent.name}</h3>
            <p className="text-sm text-slate-500">{talent.title || "AI Professional"}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onShortlist}
          disabled={isShortlisted}
          className={`rounded-full w-9 h-9 p-0 ${
            isShortlisted
              ? "bg-amber-50 text-amber-500 hover:bg-amber-50"
              : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
          }`}
        >
          <Star className={`w-5 h-5 ${isShortlisted ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Experience */}
      {talent.experience && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Briefcase className="w-4 h-4 text-slate-400" />
          <span>{experienceLabels[talent.experience] || talent.experience} experience</span>
        </div>
      )}

      {/* Bio */}
      {talent.bio && (
        <p className="mt-3 text-sm text-slate-600 line-clamp-2">
          {talent.bio}
        </p>
      )}

      {/* Skills */}
      {talent.skills && talent.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {talent.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {talent.skills.length > 4 && (
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              +{talent.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 rounded-lg text-sm">
          View Profile
        </Button>
        <Button size="sm" className="flex-1 rounded-lg text-sm">
          Contact
        </Button>
      </div>
    </div>
  );
}

