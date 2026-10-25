import React from 'react';
import { Link } from 'react-router-dom';
import { sound } from '../utils/sound';

interface CandidateNotFoundProps {
  slug?: string;
}

export const CandidateNotFound: React.FC<CandidateNotFoundProps> = ({ slug }) => {
  return (
    <div className="relative min-h-screen bg-[#F7F4EB] text-charcoal font-sans flex flex-col items-center justify-center p-6 selection:bg-vividred selection:text-white">
      {/* Paper grain overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Top mini header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-black/60 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-vividred animate-pulse" />
          <span className="font-bold text-charcoal">Epicture</span>
          <span className="text-black/30">/</span>
          <span>Central Archive</span>
        </div>
        <div className="font-mono text-[11px] text-black/40">
          ERR_DOSSIER_NOT_LOCATED
        </div>
      </div>

      {/* Main Dossier Folder Error Container */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F0] border-3 border-charcoal rounded-md shadow-[16px_20px_0_#1C1B19] p-8 sm:p-14 text-center my-12">
        {/* Rubber stamp */}
        <div className="mb-6 flex justify-center">
          <span 
            onClick={() => sound.stamp()}
            className="rubber-stamp text-xs sm:text-sm text-vividred border-vividred bg-vividred/10 cursor-pointer select-none"
            style={{ transform: 'rotate(-6deg)' }}
          >
            CLASSIFIED // DOSSIER EXPUNGED
          </span>
        </div>

        <div className="text-xs font-mono uppercase tracking-[0.25em] text-black/50 mb-3">
          QUERY: CANDIDATE / {slug?.toUpperCase() || 'UNKNOWN'}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-charcoal leading-tight tracking-tight mb-6">
          "WE COULDN'T FIND THIS AUDITION RECORD."
        </h1>

        <p className="font-sans text-base sm:text-lg text-black/75 max-w-xl mx-auto leading-relaxed mb-8">
          The Inner Circle vaults have been queried, but no candidate dossier matches the slug <code className="px-2 py-0.5 bg-black/5 border border-black/15 font-mono text-sm text-vividred font-bold rounded">/candidate/{slug || 'unknown'}</code>. 
          Either this applicant hasn't been logged yet, or carrier pigeons lost their paperwork between scenes.
        </p>

        <div className="p-4 bg-butter/60 border border-charcoal/20 rounded-xs mb-8 text-left font-mono text-xs text-charcoal/80 space-y-1">
          <div className="text-[10px] text-black/50 uppercase tracking-widest font-bold">POSSIBLE NEXT STEPS:</div>
          <div>1. Verify the candidate link spelling (e.g. /candidate/aarush).</div>
          <div>2. If you are an administrator, register this candidate in <Link to="/admin" className="underline font-bold text-cobalt hover:text-charcoal">/admin</Link>.</div>
          <div>3. Or return to the central Epicture landing experience below.</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            onClick={() => sound.tick()}
            className="w-full sm:w-auto px-6 py-3 bg-charcoal hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
          >
            ← Return to Main Archive
          </Link>
          <Link
            to="/admin"
            onClick={() => sound.tick()}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-cream border border-black/20 text-charcoal font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-xs transition-all hover:border-black/50 text-center"
          >
            Open Admin Directory →
          </Link>
        </div>
      </div>

      <div className="text-center text-xs font-mono text-black/40 tracking-wider">
        EPICTURE SOCIETY // GTBIT DELHI // SESSION 2026–27
      </div>
    </div>
  );
};
