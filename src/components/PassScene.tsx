import React, { useState } from 'react';
import { CandidateData } from '../types';
import { sound } from '../utils/sound';

interface PassSceneProps {
  candidate: CandidateData;
}

export const PassScene: React.FC<PassSceneProps> = ({ candidate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    sound.shutter();
    const targetUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/candidate/${candidate.slug}`
      : `/candidate/${candidate.slug}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(targetUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section 
      id="scene-11" 
      className="relative min-h-[110vh] bg-[#ECE7DA] flex flex-col items-center justify-center py-28 px-6 sm:px-12 border-b border-black/15"
    >
      <div className="text-xs font-mono uppercase tracking-[0.25em] text-black/60 mb-8">
        OFFICIAL DIGITAL ARTIFACT // SCREENSHOT & PRESERVE
      </div>

      {/* Collectible Physical Ticket */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F0] border-3 border-charcoal rounded-xl shadow-[16px_22px_0_#1C1B19] overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Perforation Circular Notches */}
        <div className="hidden md:block absolute -top-3.5 right-[248px] w-7 h-7 bg-[#ECE7DA] border-3 border-charcoal rounded-full z-20" />
        <div className="hidden md:block absolute -bottom-3.5 right-[248px] w-7 h-7 bg-[#ECE7DA] border-3 border-charcoal rounded-full z-20" />

        {/* Main Ticket Body */}
        <div className="md:col-span-8 p-6 sm:p-10 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-black/25 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-black text-charcoal tracking-tight">
                  EPICTURE.
                </span>
                <span className="block text-[11px] font-mono tracking-widest text-black/50 uppercase mt-0.5">
                  PHOTOGRAPHY & CINEMATOGRAPHY SOCIETY
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-black/70 uppercase tracking-widest">
                  SESSION 2026–27
                </span>
              </div>
            </div>

            <div className="inline-block mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-vividred bg-vividred/10 px-2.5 py-1 rounded-sm border border-vividred/30">
                ACCESS GRANTED // INNER CIRCLE
              </span>
            </div>

            <h3 className="font-serif text-4xl sm:text-6xl font-black text-charcoal tracking-tight leading-none mb-2">
              {candidate.name}
            </h3>

            <div className="font-mono text-sm sm:text-base font-bold text-cobalt uppercase tracking-wider mb-8">
              {candidate.vertical} DIVISION
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-black/10 pt-5">
            <div>
              <div className="text-[10px] font-mono uppercase text-black/50">MEMBER ID</div>
              <div className="font-mono text-sm font-bold text-charcoal">EP-IC-{candidate.number}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-black/50">CLEARANCE</div>
              <div className="font-mono text-sm font-bold text-vividred">CORE TIER</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-black/50">CHAPTER</div>
              <div className="font-mono text-sm font-bold text-charcoal">GTBIT, ND</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-black/50">VALIDITY</div>
              <div className="font-mono text-sm font-bold text-charcoal">IRREVOCABLE</div>
            </div>
          </div>
        </div>

        {/* Ticket Tear-off Stub */}
        <div className="md:col-span-4 bg-butter p-6 sm:p-8 flex flex-col justify-between items-center text-center relative">
          <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-charcoal">
            VALID FOR ALL SETS & PRODUCTIONS
          </div>

          {/* Barcode Graphic */}
          <div className="w-full my-6 flex flex-col items-center">
            <svg className="w-full h-14" viewBox="0 0 160 50" preserveAspectRatio="none">
              <rect x="0" y="0" width="3" height="50" fill="#1C1B19" />
              <rect x="6" y="0" width="1" height="50" fill="#1C1B19" />
              <rect x="9" y="0" width="4" height="50" fill="#1C1B19" />
              <rect x="16" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="22" y="0" width="5" height="50" fill="#1C1B19" />
              <rect x="30" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="35" y="0" width="1" height="50" fill="#1C1B19" />
              <rect x="39" y="0" width="4" height="50" fill="#1C1B19" />
              <rect x="46" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="52" y="0" width="6" height="50" fill="#1C1B19" />
              <rect x="62" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="68" y="0" width="3" height="50" fill="#1C1B19" />
              <rect x="74" y="0" width="1" height="50" fill="#1C1B19" />
              <rect x="78" y="0" width="4" height="50" fill="#1C1B19" />
              <rect x="85" y="0" width="5" height="50" fill="#1C1B19" />
              <rect x="94" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="100" y="0" width="1" height="50" fill="#1C1B19" />
              <rect x="104" y="0" width="4" height="50" fill="#1C1B19" />
              <rect x="112" y="0" width="3" height="50" fill="#1C1B19" />
              <rect x="118" y="0" width="5" height="50" fill="#1C1B19" />
              <rect x="126" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="132" y="0" width="1" height="50" fill="#1C1B19" />
              <rect x="136" y="0" width="4" height="50" fill="#1C1B19" />
              <rect x="144" y="0" width="2" height="50" fill="#1C1B19" />
              <rect x="150" y="0" width="5" height="50" fill="#1C1B19" />
            </svg>
            <span className="font-mono text-[10px] tracking-widest text-black/60 mt-1">
              *EP-IC-{candidate.number}*
            </span>
          </div>

          <div>
            <div 
              onClick={() => sound.stamp()}
              className="rubber-stamp text-[10px] text-vividred border-vividred bg-white cursor-pointer select-none"
              style={{ transform: 'rotate(4deg)' }}
            >
              NON-TRANSFERABLE
            </div>
            <div className="font-hand text-lg text-charcoal font-bold mt-1">
              OBVIOUSLY.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons for Screenshot / Link */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleCopyLink}
          className="px-6 py-2.5 bg-charcoal hover:bg-black text-white rounded-full font-mono text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
        >
          {copied ? '✓ Personal URL Copied' : '🔗 Copy Personal Invite Link'}
        </button>
      </div>
    </section>
  );
};
