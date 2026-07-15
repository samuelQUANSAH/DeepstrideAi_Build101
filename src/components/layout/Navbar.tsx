import React, { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { ShieldCheck, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setCurrentTab('home'); setIsOpen(false); }}>
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center font-bold text-lg text-white">
            C
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white hidden sm:block">
            {siteContent.brand}
          </span>
        </div>

        {/* Navigation Tabs (Desktop only) */}
        <nav className="hidden md:flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 cursor-pointer ${
                currentTab === tab.id
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Telemetry Status Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <ShieldCheck className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="text-xs text-neutral-400">System Verified</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-neutral-400 hover:text-white p-2 cursor-pointer focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#050505]/95 border-b border-white/10 flex flex-col p-6 space-y-3 z-40 glass animate-in slide-in-from-top duration-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded text-base font-medium transition-all cursor-pointer ${
                currentTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="flex items-center space-x-2 px-4 py-3 border-t border-white/10 mt-3 pt-3">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-neutral-400">System Telemetry Active</span>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
