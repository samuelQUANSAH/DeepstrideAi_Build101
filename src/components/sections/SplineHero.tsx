import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

export const SplineHero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] bg-[#050505] flex items-center justify-center overflow-hidden rounded-xl border border-white/5 shadow-2xl">
      {/* Background soft orange radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Loading state spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#050505]/90 transition-opacity duration-500">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-orange-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-xs font-mono tracking-widest text-orange-500 animate-pulse">
            LOADING CALIFSIQUES 3D STACK...
          </p>
        </div>
      )}

      {/* Error fallback state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#0c0c0c] text-center p-6">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 text-xl font-bold mb-4">
            !
          </div>
          <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-2">3D Render Bypassed</h4>
          <p className="text-xs text-neutral-400 max-w-sm">
            Interactive canvas could not connect. Reverting to static logo alignment layer.
          </p>
          {/* Static glowing SVG placeholder matching Califsiques Logo */}
          <div className="mt-6 w-32 h-32 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-orange-500/5 blur-xl animate-pulse" />
            <svg className="w-20 h-20 text-orange-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M50 35C41.72 35 35 41.72 35 50C35 58.28 41.72 65 50 65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M50 35H65M50 50H60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Spline interactive frame */}
      {!hasError && (
        <div className="w-full h-full">
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
    </div>
  );
};
