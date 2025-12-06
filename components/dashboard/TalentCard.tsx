"use client";

import Link from "next/link";
import { Star, Briefcase } from "lucide-react";
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
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/80 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-primary flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-primary/20">
            {talent.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{talent.name}</h3>
            <p className="text-sm text-muted-foreground">{talent.title || "AI Professional"}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onShortlist}
          disabled={isShortlisted}
          className={`rounded-full w-9 h-9 p-0 ${
            isShortlisted
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10"
              : "text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10"
          }`}
        >
          <Star className={`w-5 h-5 ${isShortlisted ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Experience */}
      {talent.experience && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="w-4 h-4" />
          <span>{experienceLabels[talent.experience] || talent.experience} experience</span>
        </div>
      )}

      {/* Bio */}
      {talent.bio && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {talent.bio}
        </p>
      )}

      {/* Skills */}
      {talent.skills && talent.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {talent.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {talent.skills.length > 4 && (
            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              +{talent.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 pt-4 border-t border-border/50 flex gap-2">
        <Link href={`/talent/${talent.id}`} className="flex-1">
          <Button size="sm" className="w-full rounded-xl text-sm bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90">
            View Profile
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="flex-1 rounded-xl text-sm border-2 border-primary text-primary bg-transparent hover:bg-primary/10">
          Contact
        </Button>
      </div>
    </div>
  );
}
