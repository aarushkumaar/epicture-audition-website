import React from 'react';
import { CandidateData } from '../types';
import { sound } from '../utils/sound';

interface LetterSceneProps {
  candidate: CandidateData;
}

export const LetterScene: React.FC<LetterSceneProps> = ({ candidate }) => {
  return (
    <section 
      id="scene-01" 
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F4EB] text-charcoal border-b border-black/10 overflow-hidden"
    >
      {/* Top Editorial Indexing Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 pb-4 text-xs font-mono uppercase tracking-widest text-black/60">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black tracking-normal font-sans">EPICTURE</span>
          <span>·</span>
          <span>SOCIETY AUDITIONS 2026–27</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ENTRY PASS: AUDITIONS '26</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">FORM NO. EP-{candidate.number}</span>
        </div>
      </div>

      {/* Main Letter Body */}
      <div className="my-auto py-12 max-w-5xl">
        <div className="inline-block mb-4">
          <span 
            onClick={() => sound.stamp()}
            className="rubber-stamp text-xs text-vividred border-vividred bg-vividred/5 cursor-pointer hover:rotate-0 transition-transform"
            style={{ transform: 'rotate(-3deg)' }}
          >
            CONFIDENTIAL // FOR YOUR EYES ONLY
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] text-charcoal mb-8">
          DEAR{' '}
          <span className="italic text-cobalt underline decoration-4 underline-offset-8 sm:underline-offset-12 decoration-cobalt/60">
            {candidate.name}
          </span>
          ,
        </h1>

        <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-snug text-[#2A2825] max-w-4xl">
          You applied to enter the Extended Circle.
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-4 sm:gap-6 text-base sm:text-xl font-sans text-[#666056]">
          <span>We have absolutely no idea why.</span>

          <span 
            onClick={() => sound.stamp()}
            className="rubber-stamp text-xs text-cobalt border-cobalt bg-cobalt/5 cursor-pointer"
            style={{ transform: 'rotate(2deg)' }}
          >
            VERIFIED
          </span>

          <span className="text-charcoal font-medium">Actually, we do.</span>

          <span className="font-hand text-2xl sm:text-3xl text-vividred transform -rotate-2 ml-2 select-none">
            (probably the carrier pigeons.)
          </span>
        </div>
      </div>

      {/* Letter Footer with Scroll Prompt & Stamp */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-black/15 pt-6">
        <div className="flex items-center gap-3">
          <span 
            onClick={() => sound.stamp()}
            className="rubber-stamp text-xs text-vividred border-vividred bg-vividred/10 cursor-pointer"
            style={{ transform: 'rotate(-4deg)' }}
          >
            DO NOT FORWARD
          </span>
          <span className="text-xs font-mono text-black/50 hidden md:inline">
            GTBIT / Epicture Archives
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/70 animate-bounce">
          <span>SCROLL TO PROCEED INTO DOSSIER</span>
          <span className="text-sm font-bold">↓</span>
        </div>
      </div>
    </section>
  );
};
