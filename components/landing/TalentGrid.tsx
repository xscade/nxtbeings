'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MOCK_TALENT = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "AI Research Scientist",
    skills: ["PyTorch", "LLMs", "Reinforcement Learning"],
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "David Miller",
    role: "ML Engineer",
    skills: ["TensorFlow", "Computer Vision", "Edge AI"],
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "AI Product Designer",
    skills: ["Generative UI", "Prompt Engineering", "Figma"],
    location: "Remote",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "James Kim",
    role: "NLP Specialist",
    skills: ["Hugging Face", "LangChain", "RAG"],
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=80"
  }
];

export function TalentGrid() {
  return (
    <div className="py-24 bg-sky-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Talent</h2>
            <p className="text-slate-600">Discover the minds shaping the future.</p>
          </div>
          <Button variant="secondary" className="shrink-0 bg-white text-sky-600 hover:bg-sky-50 border border-sky-100">View All Experts</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TALENT.map((talent, index) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 transition-all"
            >
              <div className="aspect-square relative bg-slate-100">
                 <Image 
                   src={talent.image} 
                   alt={talent.name}
                   fill
                   className="object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-4">
                   <h3 className="text-lg font-semibold text-white">{talent.name}</h3>
                   <p className="text-sm text-sky-300 font-medium mb-2">{talent.role}</p>
                   <div className="flex flex-wrap gap-1.5">
                     {talent.skills.slice(0, 2).map(skill => (
                       <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/20">
                         {skill}
                       </span>
                     ))}
                     {talent.skills.length > 2 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/20">+{talent.skills.length - 2}</span>
                     )}
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
