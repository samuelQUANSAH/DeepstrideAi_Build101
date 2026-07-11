import React from 'react';
import { siteContent } from '../../data/siteContent';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand/Credits */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="font-heading font-bold text-white tracking-wide">
              {siteContent.brand}
            </span>
          </div>
          <p className="text-xs text-brand-lightgray mt-2">
            {siteContent.tagline}
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-lightgray">
          <button onClick={() => setCurrentTab('home')} className="hover:text-white transition">Home</button>
          <button onClick={() => setCurrentTab('systems')} className="hover:text-white transition">Systems</button>
          <button onClick={() => setCurrentTab('research')} className="hover:text-white transition">Research</button>
          <button onClick={() => setCurrentTab('about')} className="hover:text-white transition">About</button>
          <button onClick={() => setCurrentTab('contact')} className="hover:text-white transition">Contact</button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-brand-lightgray">
          &copy; {new Date().getFullYear()} {siteContent.brand}. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
