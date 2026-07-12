import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SplineHero } from './SplineHero';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentTab }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background telemetry/grid and dark overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy and Actions */}
        <div className="lg:col-span-6 flex flex-col text-left">
          
          {/* Top Badging */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="self-start inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-neutral-400 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>Interactive 3D Workspace Active</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 leading-tight"
          >
            Welcome to <span className="text-orange-500">{siteContent.brand}</span> <br />
            <span className="text-gradient-orange">
              {siteContent.tagline}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base sm:text-lg text-neutral-400 max-w-xl mb-8 font-light leading-relaxed"
          >
            {siteContent.subtagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={() => setCurrentTab('systems')}
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 cursor-pointer"
            >
              <span>Explore Systems</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setCurrentTab('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 text-white font-medium rounded transition-all duration-300 cursor-pointer"
            >
              Contact Developer
            </button>
          </motion.div>
        </div>

        {/* Right Side: Spline interactive canvas widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="lg:col-span-6 w-full"
        >
          <SplineHero />
        </motion.div>

      </div>
    </section>
  );
};
