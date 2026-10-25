import React from 'react';
import { sound } from '../utils/sound';

export const DecisionScene: React.FC = () => {
  return (
    <section 
      id="scene-06" 
      className="relative min-h-[130vh] bg-butter text-charcoal flex flex-col justify-center py-28 px-6 sm:px-12 md:px-20 overflow-hidden border-b border-black/15"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-black/60 mb-4">
          EPICTURE CORE COMMITTEE // DELIBERATIONS ARCHIVE
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-4xl mb-12">
          WE HAD A DISCUSSION. A SLIGHTLY TOO LONG DISCUSSION.
        </h2>

        {/* Scattered Chaos Cards */}
        <div className="relative min-h-[520px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {/* Card 1 */}
          <div 
            onClick={() => sound.stamp()}
            className="bg-[#FCFAF6] border-2 border-charcoal p-6 rounded-sm shadow-[8px_8px_0_#1C1B19] transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="rubber-stamp text-[10px] text-vividred border-vividred bg-vividred/10">
                OPINION #01
              </span>
              <span className="text-[10px] font-mono text-black/40">many.</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-bold leading-snug text-charcoal">
              "Their framing is completely unhinged. That's either pure genius or reckless disregard for rule of thirds."
            </p>
            <div className="font-hand text-lg text-vividred mt-4">
              — Head of Visual Direction
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => sound.stamp()}
            className="bg-lavender border-2 border-charcoal p-6 rounded-sm shadow-[8px_8px_0_#1C1B19] transform rotate-3 hover:rotate-0 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="rubber-stamp text-[10px] text-cobalt border-cobalt bg-cobalt/10">
                COUNTER-OPINION
              </span>
              <span className="text-[10px] font-mono text-black/40">also many.</span>
            </div>
            <p className="font-sans text-sm sm:text-base font-semibold text-charcoal leading-relaxed">
              "Someone suggested holding a democratic vote on this candidate."
            </p>
            <div className="mt-4">
              <span className="rubber-stamp text-xs text-vividred border-vividred bg-white font-black" style={{ transform: 'rotate(-5deg)' }}>
                BAD IDEA.
              </span>
            </div>
            <div className="font-hand text-lg text-black/80 mt-3">
              Democracy has no place in color grading.
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => sound.tick()}
            className="bg-white border-2 border-charcoal p-6 rounded-sm shadow-[8px_8px_0_#1C1B19] transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 mb-2">
              CRITICAL INTERVENTION
            </div>
            <div className="font-serif text-xl sm:text-2xl font-black text-charcoal mb-2">
              Someone brought cold coffee and Parle-G from the GTBIT canteen.
            </div>
            <div className="inline-block mt-2">
              <span className="text-xs font-mono font-bold bg-butter px-2.5 py-1 rounded-sm border border-black/20">
                IMPORTANT CONTRIBUTION.
              </span>
            </div>
            <div className="text-xs font-mono text-black/50 mt-4">
              Energy reserves replenished. Arguments continued for another 45 minutes.
            </div>
          </div>
        </div>

        {/* Absurd Spring Roll Banner */}
        <div className="my-8 flex justify-center">
          <div 
            onClick={() => sound.tick()}
            className="inline-flex items-center gap-3 bg-vividred text-white font-sans font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(230,51,35,0.35)] transform hover:scale-105 transition-transform cursor-pointer select-none"
          >
            <span className="text-2xl">🥟</span>
            <span>Someone mentioned spring rolls. Consensus immediately achieved.</span>
          </div>
        </div>

        {/* The Abrupt Halting */}
        <div className="text-center mt-16 pt-8 border-t-2 border-black/10">
          <h3 className="font-serif italic text-6xl sm:text-8xl md:text-9xl font-black text-charcoal tracking-tight">
            ANYWAY.
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-black/60 mt-3">
            [EVERYTHING STOPS. SILENCE.]
          </p>
        </div>
      </div>
    </section>
  );
};
