import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';

export const QuantumHorizon: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#030303] relative border-t border-white/5 overflow-hidden">
      
      {/* Background violet radial light */}
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-brand-violet/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Title */}
        <span className="text-xs uppercase tracking-widest text-brand-violet font-bold">Research Frontier</span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2 mb-4">
          {siteContent.quantumHorizon.title}
        </h2>
        <p className="text-lg text-gradient-blue-violet font-medium mb-8">
          {siteContent.quantumHorizon.tagline}
        </p>

        {/* Description Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-12 rounded bg-gradient-to-tr from-[#0a0a0a] to-[#121212] border border-white/5 shadow-inner"
        >
          <p className="text-lg text-brand-lightgray font-light leading-relaxed">
            {siteContent.quantumHorizon.body}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
