import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';

export const FounderVision: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black relative border-t border-white/5">
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Column: Visual avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-48 h-48 rounded bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-green flex items-center justify-center shrink-0 border border-white/10 shadow-2xl relative"
          >
            <div className="absolute inset-2 bg-black rounded flex items-center justify-center">
              <span className="font-heading font-extrabold text-white text-3xl">SQ</span>
            </div>
          </motion.div>

          {/* Right Column: Founder biography info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">The Vision</span>
            <h2 className="text-3xl font-heading font-extrabold text-white mt-2 mb-1">
              {siteContent.founder.name}
            </h2>
            <p className="text-sm text-gradient-blue-violet uppercase tracking-wider font-semibold mb-6">
              {siteContent.founder.title}
            </p>
            <blockquote className="text-lg text-brand-lightgray font-light leading-relaxed italic border-l-2 border-brand-blue/30 pl-6">
              "{siteContent.founder.bio}"
            </blockquote>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
