'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-2xl tracking-tighter text-white">
              NxtBeing
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/companies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                For Companies
              </Link>
              <Link href="/verified" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Verified Pro
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Button size="sm">Get Started &rarr;</Button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
              Explore
            </Link>
            <Link href="/companies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
              For Companies
            </Link>
            <Link href="/verified" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
              Verified Pro
            </Link>
            <div className="pt-4 pb-2 border-t border-white/10 mt-4">
               <Button className="w-full justify-center mb-2" variant="secondary">Sign In</Button>
               <Button className="w-full justify-center">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

