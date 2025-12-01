'use client';

import { motion } from 'framer-motion';

export function PortfolioPreview() {
  return (
    <div className="py-24 overflow-hidden bg-gradient-to-b from-[#020617] to-[#172554] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Career, Intelligent & Verified</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Forget PDF resumes. Build a living, breathing portfolio that showcases your code, models, and impact.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Glow effect behind the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 blur-[100px] -z-10" />
            
            {/* The Main Card Interface Mockup */}
            <motion.div 
              initial={{ rotateX: 20, y: 100, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-zinc-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
            >
               <div className="h-8 bg-zinc-800 border-b border-white/10 flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
               </div>
               
               <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                  {/* Sidebar Profile */}
                  <div className="md:col-span-1 space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px]">
                           <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                              <span className="text-2xl">👨‍💻</span>
                           </div>
                        </div>
                        <div>
                           <h3 className="font-bold text-white">Alex Rivera</h3>
                           <p className="text-sm text-cyan-400">AI Architect</p>
                        </div>
                     </div>
                     
                     <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                           <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Stack</div>
                           <div className="flex flex-wrap gap-2">
                              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">Python</span>
                              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">PyTorch</span>
                              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">FastAPI</span>
                           </div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                           <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Availability</div>
                           <div className="flex items-center gap-2 text-sm text-white">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              Open to contracts
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Main Content */}
                  <div className="md:col-span-2 space-y-6">
                     <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center justify-between">
                           <span>Featured Project: LLM RAG System</span>
                           <span className="text-xs bg-white/10 px-2 py-1 rounded text-white">Live Demo</span>
                        </h4>
                        <div className="h-32 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center mb-3 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] duration-[1500ms]" />
                           <span className="text-zinc-600">Project Preview</span>
                        </div>
                        <p className="text-sm text-gray-500">
                           Enterprise-grade retrieval augmented generation system using LangChain and Pinecone.
                        </p>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                           <div className="text-2xl font-bold text-white mb-1">98%</div>
                           <div className="text-xs text-gray-400">Model Accuracy</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                           <div className="text-2xl font-bold text-white mb-1">50ms</div>
                           <div className="text-xs text-gray-400">Inference Time</div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
