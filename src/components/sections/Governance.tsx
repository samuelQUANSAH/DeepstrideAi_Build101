import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';

export const Governance: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#030303] relative border-t border-white/5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-violet font-bold">Policy & Control</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2">
            {siteContent.governance.title}
          </h2>
          <p className="text-brand-lightgray max-w-xl mx-auto mt-4 font-light">
            Immutable rules configured directly in our agent layers to prevent unauthorized execution.
          </p>
        </div>

        {/* Rule callout banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 rounded bg-brand-violet/5 border border-brand-violet/20 text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-wider text-brand-violet font-bold">Core Directives</span>
          <p className="text-lg text-white font-heading font-semibold mt-1">
            "{siteContent.governance.coreRule}"
          </p>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {siteContent.governance.rules.map((rule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded bg-[#0b0b0b] border border-white/5"
            >
              <h3 className="font-heading font-bold text-lg text-white mb-2">{rule.title}</h3>
              <p className="text-sm text-brand-lightgray font-light leading-relaxed">{rule.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
