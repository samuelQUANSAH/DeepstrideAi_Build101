import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';

export const TechnicalEdge: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black relative border-t border-white/5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">Technology</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2">
            The Technical Edge
          </h2>
          <p className="text-brand-lightgray max-w-xl mx-auto mt-4 font-light">
            Our framework features highly optimized runtime logic designed for high security and low-cost orchestration.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.technicalEdge.map((highlight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded bg-[#070707] border border-white/5"
            >
              <h3 className="font-heading font-bold text-lg text-white mb-2">{highlight.title}</h3>
              <p className="text-sm text-brand-lightgray font-light leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
