import React, { useState, useEffect } from 'react';
import { CandidateData } from '../types';
import { sound } from '../utils/sound';

interface TopHudProps {
  candidate: CandidateData;
  previewMode?: boolean;
}

export const TopHud: React.FC<TopHudProps> = ({ candidate, previewMode = false }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const p = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
        setScrollProgress(p);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    sound.shutter();
    const targetUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/candidate/${candidate.slug}`
      : `/candidate/${candidate.slug}`;
    
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(targetUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Editorial HUD */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-xs text-xs font-mono tracking-wider uppercase text-charcoal">
            <span className="w-2 h-2 rounded-full bg-vividred animate-pulse" />
            <span className="font-bold">Epicture</span>
            <span className="text-black/30">/</span>
            <span className="hidden sm:inline text-black/60">Dossier 2026–27</span>
          </div>

          <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-black/10 rounded-full text-xs font-mono tracking-wider uppercase text-black/70">
            <span>Recipient:</span>
            <span className="font-bold text-cobalt">{candidate.name}</span>
            <span className="text-black/30">·</span>
            <span>{candidate.role || candidate.vertical}</span>
          </div>

          {previewMode && (
            <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-900 rounded-full text-[11px] font-mono uppercase font-bold">
              <span>●</span>
              <span>ADMIN PREVIEW</span>
            </div>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-charcoal hover:bg-black text-white text-xs font-mono tracking-wide uppercase rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Copy candidate personalized link"
          >
            <span>{copied ? 'Link Copied!' : 'Share Pass'}</span>
          </button>
        </div>
      </header>

      {/* Floating Scroll Meter */}
      <div 
        className="fixed bottom-4 right-4 z-40 bg-charcoal text-cream font-mono text-xs px-3 py-1.5 rounded-sm shadow-md tracking-widest pointer-events-none select-none"
        aria-hidden="true"
      >
        {String(scrollProgress).padStart(3, '0')}%
      </div>
    </>
  );
};
