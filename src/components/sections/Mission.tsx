import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';

export const Mission: React.FC = () => {
  return (
    <section className="py-24 px-6 relative border-t border-white/5 bg-[#070707] overflow-hidden">
      
      {/* Background radial soft light */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 relative z-10">
        
        {/* Left Column: Section Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3"
        >
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">The Mission</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 leading-tight">
            {siteContent.mission.title}
          </h2>
        </motion.div>

        {/* Right Column: Mission statement body */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3"
        >
          <p className="text-lg md:text-xl text-brand-lightgray font-light leading-relaxed">
            {siteContent.mission.body}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
