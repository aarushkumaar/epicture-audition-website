import React from 'react';
import { sound } from '../utils/sound';
import heroArtwork from '../assets/images/moment_hero_artwork_1792843316205.jpg';

export const MomentScene: React.FC = () => {
  return (
    <section 
      id="scene-05" 
      className="relative min-h-[120vh] bg-[#0A0D14] text-white flex items-center justify-center py-28 px-6 sm:px-12 md:px-20 border-b border-white/10"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Large Curated Artwork Frame */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-sm overflow-hidden border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] group">
            {/* Technical Camera Data HUD */}
            <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xs font-mono text-[10px] text-white/90 border border-white/10 tracking-widest uppercase">
              FOCAL: 35MM · f/1.4 · ISO 100 · MASTER AUDITION PRINT
            </div>

            <img
              src={heroArtwork}
              alt="Strongest candidate artwork submission"
              className="w-full h-[440px] sm:h-[580px] object-cover filter contrast-110 group-hover:scale-102 transition-transform duration-700"
            />
          </div>

          {/* Sticky curator note */}
          <div 
            onClick={() => sound.stamp()}
            className="absolute -bottom-6 -right-2 sm:right-6 bg-[#FFF9C4] text-[#1C1B19] px-4 py-2.5 rounded-xs font-hand text-xl shadow-xl border-l-4 border-[#E4C025] transform -rotate-3 z-20 cursor-pointer select-none"
          >
            "Verified human craft. No AI prompt could catch this light."
          </div>
        </div>

        {/* Narrative Emotional Statement */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="font-serif italic text-2xl sm:text-3xl text-white/60">
            And then there was this.
          </div>

          <div className="font-sans text-base sm:text-lg text-white/80 font-light leading-relaxed">
            That fleeting second when you stepped back, looked at something you made, and thought...
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tight">
              "OH."
            </h2>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-butter leading-tight tracking-tight">
              "DID I MAKE THIS?"
            </h2>
          </div>

          <div className="pt-6 border-t border-white/15">
            <div className="font-hand text-3xl sm:text-4xl text-tomato transform -rotate-1">
              Yeah. We noticed.
            </div>
            <div className="text-xs font-mono text-white/40 tracking-widest uppercase mt-2">
              GTBIT Core Review Panel // Timestamp: 19:42 IST
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
