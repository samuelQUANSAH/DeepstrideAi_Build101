import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export const SplineHero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Set initial state based on window size immediately to prevent mounting Spline on mobile
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Capture phase focus blocker to prevent Spline from stealing focus and scroll-jumping the page
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blockFocus = (e: FocusEvent) => {
      if (e.target instanceof HTMLElement) {
        e.target.blur();
      }
    };

    container.addEventListener('focus', blockFocus, true); // Capture phase
    return () => container.removeEventListener('focus', blockFocus, true);
  }, []);

  const renderFallback = (message: string, submessage: string) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#070707] text-center p-6 transition-all duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Static glowing SVG placeholder matching BlindLabs Logo */}
      <div className="w-40 h-40 relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full bg-orange-500/5 blur-2xl animate-pulse" />
        <svg className="w-24 h-24 text-orange-500 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 35C41.72 35 35 41.72 35 50C35 58.28 41.72 65 50 65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 35H68M50 50H62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      <h4 className="text-sm font-semibold tracking-widest text-white uppercase mb-2">{message}</h4>
      <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
        {submessage}
      </p>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] lg:h-[650px] bg-[#050505] flex items-center justify-center overflow-hidden rounded-xl border border-white/5 shadow-2xl"
    >
      {/* Background soft orange radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Mobile state: Skip WebGL, load fallback immediately for speed and scroll stability */}
      {isMobile ? (
        renderFallback(
          "Core Visualizations Active",
          "Bypassing interactive WebGL elements to prioritize performance and touch scrolling on mobile."
        )
      ) : (
        <>
          {/* Loading state spinner */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#050505]/95 transition-opacity duration-500">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-orange-500/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-xs font-mono tracking-widest text-orange-500 animate-pulse">
                LOADING 3D PIPELINE LAYER...
              </p>
            </div>
          )}

          {/* Error fallback state */}
          {hasError && renderFallback(
            "3D Render Bypassed",
            "Interactive WebGL canvas could not initialize. Reverting to local vector alignment graphics."
          )}

          {/* Spline interactive frame (loaded only on desktop viewports) */}
          {!hasError && (
            <div className="w-full h-full" tabIndex={-1}>
              <Spline
                scene="https://prod.spline.design/kZmsrO5Z1MkiNsCq/scene.splinecode"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default SplineHero;
