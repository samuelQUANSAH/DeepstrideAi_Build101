import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';

export const WhatWeBuild: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black relative border-t border-white/5">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-violet font-bold">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2">
            What We Build
          </h2>
          <p className="text-brand-lightgray max-w-xl mx-auto mt-4 font-light">
            Custom engineered system blocks designed for high performance, reliability, and security.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.offerings.map((offering, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-8 rounded bg-gradient-to-b from-[#111] to-[#080808] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <span className="font-mono text-xs text-brand-violet">0{idx + 1}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  {offering.title}
                </h3>
                <p className="text-sm text-brand-lightgray font-light leading-relaxed mb-6">
                  {offering.description}
                </p>
              </div>
              <span className="text-xs uppercase tracking-wider text-white/40 font-semibold font-mono">
                {offering.category}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
