import React from 'react';
import { CandidateData } from '../types';
import { sound } from '../utils/sound';

interface DossierSceneProps {
  candidate: CandidateData;
}

export const DossierScene: React.FC<DossierSceneProps> = ({ candidate }) => {
  return (
    <section 
      id="scene-07" 
      className="relative min-h-[110vh] bg-[#E8E2D2] flex items-center justify-center py-24 px-6 sm:px-12 md:px-20 border-b border-black/15"
    >
      <div className="w-full max-w-4xl relative">
        {/* Physical Manilla Dossier Folder */}
        <div className="relative bg-[#D9CEB4] border-2 border-[#8D7B5E] rounded-md shadow-[18px_24px_60px_rgba(0,0,0,0.18)] p-6 sm:p-12">
          {/* Folder Tab */}
          <div className="absolute -top-10 left-8 sm:left-14 bg-[#D9CEB4] border-2 border-[#8D7B5E] border-b-0 px-6 sm:px-8 py-2 rounded-t-md font-mono text-xs font-bold uppercase tracking-widest text-[#4A3E2D]">
            FILE NO. EP-{candidate.number}
          </div>

          {/* Paper Document Inside */}
          <div className="bg-[#FFFDF9] border border-[#C8BEA7] p-6 sm:p-10 rounded-xs shadow-inner">
            <div className="flex flex-wrap items-center justify-between border-b-2 border-charcoal pb-4 mb-8 text-xs font-mono uppercase tracking-widest text-black/60">
              <span>EPICTURE INTERNAL // GTBIT CHAPTER</span>
              <span>CLASSIFIED TIER-1</span>
              <span>SESSION 2026–27</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono uppercase tracking-widest text-black/50">
                SUBJECT IDENTIFIER
              </div>
              <h3 className="font-serif text-4xl sm:text-6xl font-black text-charcoal tracking-tight">
                {candidate.name}
              </h3>
              <p className="font-sans text-base sm:text-lg text-black/70">
                Candidate cleared primary scrutiny and audition trials. Status shift requested immediately.
              </p>
            </div>

            {/* Status Progression Sequence */}
            <div className="my-8 py-6 border-y border-dashed border-black/20">
              <div className="text-xs font-mono uppercase tracking-widest text-black/50 mb-4">
                PROGRESSION LOG:
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm">
                <span className="line-through text-black/40 bg-black/5 px-3 py-1.5 rounded-sm">
                  PENDING
                </span>
                <span className="text-black/30">→</span>
                <span className="line-through text-black/40 bg-black/5 px-3 py-1.5 rounded-sm">
                  UNDER REVIEW
                </span>
                <span className="text-black/30">→</span>
                <span className="line-through text-black/40 bg-black/5 px-3 py-1.5 rounded-sm">
                  CONSIDERED
                </span>
                <span className="text-black/30">→</span>
                <span 
                  onClick={() => sound.stamp()}
                  className="font-bold text-white bg-vividred px-4 py-2 rounded-sm shadow-[4px_4px_0_#1C1B19] transform -rotate-1 cursor-pointer select-none"
                >
                  MOVE TO INNER CIRCLE
                </span>
              </div>
            </div>

            {/* Authorization Strip */}
            <div className="flex flex-wrap items-end justify-between gap-6 pt-4">
              <div className="font-hand text-2xl sm:text-3xl text-charcoal">
                Authorized by Epicture Core Selection Committee.
              </div>

              <div 
                onClick={() => sound.stamp()}
                className="rubber-stamp text-xs text-vividred border-vividred bg-vividred/10 cursor-pointer"
                style={{ transform: 'rotate(-4deg)' }}
              >
                CLEARANCE VERIFIED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
