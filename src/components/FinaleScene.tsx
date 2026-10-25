import React from 'react';
import { CandidateData } from '../types';
import { sound } from '../utils/sound';

interface FinaleSceneProps {
  candidate: CandidateData;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ candidate }) => {
  return (
    <div id="scene-finale-wrap">
      {/* SCENE 12 & 13 — THE ACTUAL MESSAGE & WHATSAPP CTA */}
      <section 
        id="scene-12" 
        className="relative min-h-[110vh] bg-charcoal text-white flex flex-col justify-center items-center py-28 px-6 sm:px-12 md:px-20 text-center border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-tomato mb-6">
            // ONE LAST THING
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight max-w-3xl mb-8">
            YOU DIDN'T GET INTO EPICTURE BECAUSE YOU KNOW EVERYTHING.
          </h2>

          <p className="font-sans text-lg sm:text-2xl text-white/70 max-w-2xl font-light leading-relaxed mb-12">
            You got in because you made us want to see what you'd do next.
          </p>

          <div className="space-y-3 mb-14">
            <div className="font-serif italic text-3xl sm:text-4xl text-butter">
              So...
            </div>
            <div className="font-serif text-5xl sm:text-7xl font-black text-white tracking-tight">
              COME INSIDE.
            </div>
          </div>

          {/* WhatsApp Primary Call To Action */}
          <a
            href={candidate.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.shutter()}
            className="group inline-flex items-center gap-4 bg-vividred hover:bg-tomato text-white text-lg sm:text-2xl font-bold font-sans px-10 sm:px-14 py-5 sm:py-6 rounded-full shadow-[0_12px_45px_rgba(230,51,35,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
          >
            <span>ENTER THE INNER CIRCLE</span>
            <span className="transform group-hover:translate-x-2 transition-transform">→</span>
          </a>

          {/* First Mission Brief */}
          <div className="mt-16 w-full max-w-xl bg-white/5 border border-dashed border-white/20 p-6 sm:p-8 rounded-md text-left">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-butter font-bold mb-4">
              YOUR FIRST MISSION:
            </div>
            <div className="space-y-3 font-mono text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-3">
                <span className="text-tomato font-bold">01 —</span>
                <span>Join the group using the button above.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-tomato font-bold">02 —</span>
                <span>Drop a greeting and your favorite frame. Say hello.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-tomato font-bold">03 —</span>
                <span>Don't disappear. We have serious work to do.</span>
              </div>
            </div>

            <div className="font-serif text-xl sm:text-2xl font-bold text-white mt-6 pt-4 border-t border-white/10 text-center">
              WE HAVE WORK TO DO.
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SCREEN: THE CURTAIN */}
      <footer 
        id="scene-curtain" 
        className="relative bg-midnight text-white py-24 sm:py-32 px-6 sm:px-12 text-center flex flex-col items-center justify-center border-t border-white/10"
      >
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 mb-6">
          EPICTURE / GTBIT / 2026–27
        </div>

        <h2 className="font-serif text-5xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none text-white mb-6">
          WELCOME IN.
        </h2>

        <div className="font-sans font-bold text-sm sm:text-base tracking-[0.25em] text-butter uppercase mb-8">
          SEE DIFFERENTLY. CREATE RELENTLESSLY.
        </div>

        <div className="font-hand text-2xl sm:text-3xl text-neutral-400 max-w-md mx-auto mb-10">
          Now go make something we're going to argue about.
        </div>

        <div className="font-mono text-sm tracking-[0.4em] font-black text-vividred uppercase">
          CUT.
        </div>
      </footer>
    </div>
  );
};
