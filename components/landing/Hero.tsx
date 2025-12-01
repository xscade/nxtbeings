'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 bg-gradient-to-b from-[#020617] to-[#172554]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="absolute inset-0 -z-10">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
         <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-white/5 border border-white/10 text-cyan-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            The World's First AI-Native Talent Network
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hire the Builders of the <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligence Age</span>
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl mx-auto text-xl text-gray-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          NxtBeing is the premium directory for AI engineers, researchers, and creative technologists. Verified skills, enterprise-grade portfolios.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="min-w-[160px]">Find Talent</Button>
          <Button variant="outline" size="lg" className="min-w-[160px]">Create Portfolio</Button>
        </motion.div>

        <motion.div 
           className="mt-16 flex justify-center gap-8 text-sm text-gray-500"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
        >
           <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Verified Credentials
           </div>
           <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Top 1% AI Talent
           </div>
           <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Enterprise Ready
           </div>
        </motion.div>
      </div>
    </div>
  );
}

