import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export const ContactCTA: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Agentic AI system',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    'Agentic AI system',
    'RAG platform',
    'Multi-agent workflow',
    'Physical deployment concept',
    'AI strategy consultation',
    'Quantum AI research collaboration'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    
    // Simulate API request
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      
      <div className="max-w-xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold">Get in touch</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2">
            Build with DeepStride
          </h2>
          <p className="text-brand-lightgray mt-3 font-light text-sm">
            Inquire about system deployment, scheduling, or collaboration.
          </p>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-6 p-8 rounded bg-gradient-to-b from-[#0b0b0b] to-black border border-white/5"
              >
                
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-lightgray mb-2 font-mono" htmlFor="name">Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Jane Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-lightgray mb-2 font-mono" htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="jane@company.com" 
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue transition"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-lightgray mb-2 font-mono" htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company"
                    value={formState.company}
                    onChange={(e) => setFormState({...formState, company: e.target.value})}
                    placeholder="Acme Corp" 
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue transition"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-lightgray mb-2 font-mono" htmlFor="projectType">Project Type</label>
                  <select 
                    id="projectType"
                    value={formState.projectType}
                    onChange={(e) => setFormState({...formState, projectType: e.target.value})}
                    className="w-full bg-[#0b0b0b] border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue transition"
                  >
                    {projectTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-lightgray mb-2 font-mono" htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="Tell us about your systems deployment needs..." 
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue transition resize-none"
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-green/20 hover:bg-brand-green/30 border border-brand-green/45 hover:border-brand-green text-brand-green font-semibold rounded transition flex items-center justify-center space-x-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>

              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-12 rounded bg-gradient-to-b from-[#0b0b0b] to-black border border-white/5 flex flex-col items-center justify-center text-center absolute inset-0"
              >
                <CheckCircle className="w-16 h-16 text-brand-green mb-6" />
                <h3 className="font-heading font-extrabold text-2xl text-white mb-2">Inquiry Received</h3>
                <p className="text-brand-lightgray text-sm max-w-sm">
                  Thank you, **{formState.name}**. The DeepStride AI engineering team will contact you shortly at **{formState.email}** to discuss your **{formState.projectType}** implementation.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2 border border-white/10 hover:border-white/30 text-white/60 hover:text-white rounded text-xs transition"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
