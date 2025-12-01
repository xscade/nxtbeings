"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const talents = [
  {
    name: "Sarah Chen",
    role: "AI Research Scientist",
    company: "Ex-DeepMind",
    skills: ["PyTorch", "LLMs", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    initials: "SC"
  },
  {
    name: "David Miller",
    role: "Machine Learning Engineer",
    company: "Freelance",
    skills: ["TensorFlow", "NLP", "MLOps"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    initials: "DM"
  },
  {
    name: "Elena Rodriguez",
    role: "AI Product Manager",
    company: "TechCorp",
    skills: ["Product Strategy", "AI Ethics", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    initials: "ER"
  },
  {
    name: "James Wilson",
    role: "Computer Vision Engineer",
    company: "Visionary AI",
    skills: ["OpenCV", "YOLO", "Robotics"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    initials: "JW"
  }
];

export function TalentGrid() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Top AI Talent
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover world-class AI engineers, researchers, and builders ready to take your project to the next level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {talents.map((talent) => (
            <Card key={talent.name} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                  <AvatarImage src={talent.image} alt={talent.name} />
                  <AvatarFallback>{talent.initials}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{talent.name}</h3>
                  <p className="text-sm text-primary font-medium">{talent.role}</p>
                  <p className="text-xs text-muted-foreground">{talent.company}</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {talent.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-[10px] px-2 py-0.5">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 w-full">
                  <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-full px-8">
            View All Talent
          </Button>
        </div>
      </div>
    </section>
  );
}
