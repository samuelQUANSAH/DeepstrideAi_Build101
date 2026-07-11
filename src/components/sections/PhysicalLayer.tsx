import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/siteContent';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const PhysicalLayer: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black relative border-t border-white/5">
      
      {/* Background soft green gradient */}
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title / Badging */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold flex items-center gap-2 justify-center md:justify-start">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            Embodied Execution
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-4 text-center md:text-left">
            {siteContent.physicalLayer.title}
          </h2>
          <p className="text-lg text-brand-blue font-light mt-2 text-center md:text-left">
            {siteContent.physicalLayer.tagline}
          </p>
        </div>

        {/* Safety Warning Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 rounded border border-brand-green/30 bg-brand-green/5 flex items-start gap-4 mb-12"
        >
          <AlertTriangle className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Safety Policy Guardrails</h4>
            <p className="text-sm text-brand-lightgray mt-1 leading-relaxed">
              {siteContent.physicalLayer.safetyWarning}
            </p>
          </div>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.physicalLayer.cases.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded bg-[#0b0b0b] border border-white/5"
            >
              <h3 className="font-heading font-bold text-lg text-white mb-2">{useCase.title}</h3>
              <p className="text-sm text-brand-lightgray font-light leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
