import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';
import { ArrowRight, Cpu } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentTab }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* SpaceX-inspired dark background telemetry/grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Animated orbiting blur circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-blue/15 glow-bg pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-violet/10 glow-bg pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        
        {/* Top Badging */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-brand-lightgray mb-8"
        >
          <Cpu className="w-3.5 h-3.5 text-brand-blue" />
          <span>V1.0.0-Beta Physical Orchestration Stack</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 leading-tight"
        >
          DeepStride AI <br />
          <span className="text-gradient">
            {siteContent.tagline}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-brand-lightgray max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          {siteContent.subtagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => setCurrentTab('systems')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Explore Systems</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setCurrentTab('contact')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/25 hover:border-white text-white font-medium rounded transition-all duration-300"
          >
            Contact Us
          </button>
        </motion.div>

      </div>
    </section>
  );
};
