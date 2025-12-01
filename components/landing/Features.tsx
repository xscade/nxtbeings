'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Cpu, Globe, Sparkles, Users } from 'lucide-react';

const features = [
  {
    name: 'AI-Native Portfolios',
    description: 'Showcase your LLM projects, RAG implementations, and model fine-tuning with specialized portfolio widgets.',
    icon: Brain,
  },
  {
    name: 'Verified Skills',
    description: 'Algorithmic skill verification ensures the talent you see is the talent you get. No fluff.',
    icon: Code2,
  },
  {
    name: 'Global Talent Pool',
    description: 'Access a borderless network of researchers and engineers from top institutions and tech hubs.',
    icon: Globe,
  },
];

export function Features() {
  return (
    <div className="py-24 bg-white relative">
       <div className="absolute inset-0 bg-grid-slate-200/[0.5] bg-[length:50px_50px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why NxtBeing?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Traditional platforms aren't built for the nuances of AI engineering. We are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.name}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
