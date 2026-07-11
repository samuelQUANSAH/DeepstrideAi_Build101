import React from 'react';
import { siteContent } from '../../data/siteContent';
import { ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'systems', label: 'Systems' },
    { id: 'research', label: 'Research' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-brand-blue to-brand-violet flex items-center justify-center font-bold text-lg text-white">
            D
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white hidden sm:block">
            {siteContent.brand}
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                currentTab === tab.id
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-brand-lightgray hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Telemetry Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span className="text-xs text-brand-lightgray">System Verified</span>
        </div>

      </div>
    </header>
  );
};
