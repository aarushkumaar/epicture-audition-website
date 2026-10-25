import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CandidateData, VerticalType } from '../types';
import { sound } from '../utils/sound';

// Pre-generated high-fidelity photographic evidence assets
import contactImg1 from '../assets/images/audition_evidence_contact_1_1792843315108.jpg';
import contactImg2 from '../assets/images/audition_evidence_contact_2_1792843315526.jpg';
import contactImg3 from '../assets/images/audition_evidence_contact_3_1792843315689.jpg';

interface HorizontalWorldProps {
  candidate: CandidateData;
}

gsap.registerPlugin(ScrollTrigger);

const ALL_SPECIES: { key: VerticalType; label: string; num: string }[] = [
  { key: 'PHOTOGRAPHY', label: 'PHOTOGRAPHER', num: '01 / LENS' },
  { key: 'CINEMATOGRAPHY', label: 'CINEMATOGRAPHER', num: '02 / MOTION' },
  { key: 'DESIGN', label: 'DESIGNER', num: '03 / VECTOR' },
  { key: 'EDITING', label: 'EDITOR', num: '04 / TIMELINE' },
  { key: 'MODELLING', label: 'MODEL', num: '05 / FRAME' },
  { key: 'MANAGEMENT', label: 'PROFESSIONAL YAPPER', num: '06 / CHAOS' },
];

export const HorizontalWorld: React.FC<HorizontalWorldProps> = ({ candidate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pigeonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      const track = trackRef.current;
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      // Pinned Horizontal Track
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Pigeon flight motion along the scroll
      if (pigeonRef.current) {
        gsap.to(pigeonRef.current, {
          x: 240,
          y: -40,
          rotation: -12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${getScrollDistance() * 0.4}`,
            scrub: 1.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="scene-horizontal-viewport" 
      className="relative w-full h-screen overflow-hidden bg-[#EDE8DA] border-b border-black/15"
    >
      <div 
        ref={trackRef} 
        id="scene-horizontal-track" 
        className="flex h-full will-change-transform"
        style={{ width: '560vw' }}
      >
        {/* PANEL 1: Oversized Physical Application Sheet */}
        <section className="w-screen h-full flex items-center justify-center p-6 sm:p-12 shrink-0">
          <div className="relative w-full max-w-5xl h-[82vh] bg-[#FCFAF6] border-2 border-charcoal rounded-sm shadow-[12px_18px_45px_rgba(0,0,0,0.1)] p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
            {/* Masking tape top */}
            <div className="tape-strip absolute -top-3 left-1/3 w-32 h-7 transform -rotate-3 z-10" />

            <div className="flex flex-wrap items-center justify-between border-b-2 border-dashed border-black/20 pb-4 text-xs font-mono uppercase tracking-widest text-black/60">
              <span className="font-bold text-black font-sans">OFFICIAL EPICTURE APPLICANT DOSSIER</span>
              <span>GTBIT // NEW DELHI</span>
              <span>SERIAL # {candidate.number}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto py-4">
              <div className="md:col-span-2 space-y-4 sm:space-y-6">
                <div className="border-b border-black/10 pb-3">
                  <div className="text-xs font-mono tracking-widest uppercase text-black/50 mb-1">
                    Subject Identity
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-charcoal">
                    {candidate.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-b border-black/10 pb-3">
                    <div className="text-xs font-mono tracking-widest uppercase text-black/50 mb-1">
                      Classified Species
                    </div>
                    <div className="font-sans text-xl sm:text-2xl font-black text-vividred tracking-tight">
                      {candidate.vertical}
                    </div>
                  </div>

                  <div className="border-b border-black/10 pb-3">
                    <div className="text-xs font-mono tracking-widest uppercase text-black/50 mb-1">
                      College Years Survived
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-charcoal">
                      {candidate.years} {parseInt(candidate.years) === 1 ? 'Year' : 'Years'}
                    </div>
                  </div>
                </div>

                <div className="border-b border-black/10 pb-3">
                  <div className="text-xs font-mono tracking-widest uppercase text-black/50 mb-1">
                    Chosen Weapon
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-semibold text-cobalt">
                    {candidate.weapon}
                  </div>
                </div>
              </div>

              {/* Aside / Status Note */}
              <div className="bg-[#F7F4EB] border border-black/15 p-5 rounded-sm flex flex-col justify-between relative">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-black/50 mb-2">
                    Current Condition
                  </div>
                  <div className="font-sans text-lg font-bold text-vividred">
                    Questionable at best.
                  </div>
                </div>

                <div className="my-4">
                  <span 
                    onClick={() => sound.stamp()}
                    className="rubber-stamp text-xs text-vividred border-vividred bg-vividred/10 cursor-pointer"
                    style={{ transform: 'rotate(-4deg)' }}
                  >
                    INSPECTION LOGGED
                  </span>
                </div>

                <div className="font-hand text-xl text-[#3A3835] leading-snug">
                  "Claimed they don't sleep anyway. Ideal candidate."
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/10 pt-3 text-xs font-mono text-black/40">
              <span>FORM ARCHIVE EP-904</span>
              <span>HORIZONTAL EXPEDITION CONTINUES →</span>
            </div>
          </div>
        </section>

        {/* PANEL 2: The Pigeon Question */}
        <section className="w-screen h-full flex items-center justify-center p-6 sm:p-12 shrink-0">
          <div className="relative w-full max-w-4xl bg-butter text-charcoal border-3 border-charcoal p-8 sm:p-14 rounded-lg shadow-[14px_14px_0_#1C1B19]">
            <div className="tape-strip absolute -top-3.5 right-12 w-32 h-7 transform rotate-3 z-10" />

            <div className="text-xs font-mono uppercase tracking-widest text-black/60 mb-4">
              AUDITION QUESTION #04 // VERIFICATION CHALLENGE
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              "PROVE TO US THAT PIGEONS AREN'T YOUR PRIMARY MODE OF COMMUNICATION."
            </h2>

            <p className="font-sans text-base sm:text-xl font-medium text-black/80 max-w-2xl leading-relaxed">
              A phone number for when our carrier pigeons decide to go on strike. You answered without flinching. That was our very first warning sign.
            </p>

            {/* Stylized Carrier Pigeon Graphic */}
            <svg
              ref={pigeonRef}
              className="absolute -bottom-8 right-6 w-36 sm:w-44 h-auto drop-shadow-md pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 70 C30 50, 60 40, 85 45 C75 65, 50 80, 20 70 Z" fill="#4B5563" />
              <circle cx="85" cy="40" r="12" fill="#6B7280" />
              <circle cx="88" cy="38" r="2.5" fill="#FFE57F" />
              <polygon points="95,40 103,42 95,45" fill="#F97316" />
              <path d="M40 60 C55 45, 75 55, 60 75 Z" fill="#9CA3AF" />
              <line x1="45" y1="75" x2="40" y2="92" stroke="#F97316" strokeWidth="3" />
              <line x1="55" y1="75" x2="52" y2="92" stroke="#F97316" strokeWidth="3" />
            </svg>
          </div>
        </section>

        {/* PANEL 3: Which Epicture Species Are You? */}
        <section className="w-screen h-full flex items-center justify-center p-6 sm:p-12 shrink-0">
          <div className="w-full max-w-5xl">
            <div className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold mb-3">
              // TAXONOMY OF CANDIDATES
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-charcoal tracking-tight mb-8">
              WHICH EPICTURE SPECIES ARE YOU?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {ALL_SPECIES.map((spec) => {
                const isActive = spec.key === candidate.vertical;
                return (
                  <div
                    key={spec.key}
                    className={`relative p-5 sm:p-6 rounded-sm border-2 transition-all ${
                      isActive
                        ? 'bg-cobalt text-white border-charcoal shadow-[8px_8px_0_#1C1B19] -translate-y-2 rotate-[-1deg]'
                        : 'bg-[#FCFAF6] text-charcoal border-charcoal/20 hover:border-charcoal'
                    }`}
                  >
                    <div className={`text-xs font-mono font-bold mb-2 ${isActive ? 'text-butter' : 'text-black/50'}`}>
                      {spec.num}
                    </div>
                    <div className="font-serif text-lg sm:text-2xl font-bold tracking-tight">
                      {spec.label}
                    </div>
                    {isActive && (
                      <div className="mt-3 inline-block">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-white text-cobalt px-2 py-0.5 rounded-full">
                          MATCH IDENTIFIED
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PANEL 4: The Damage Question */}
        <section className="w-screen h-full flex items-center justify-center p-6 sm:p-12 shrink-0">
          <div className="relative w-full max-w-4xl bg-vividred text-white border-3 border-charcoal p-8 sm:p-16 rounded-lg shadow-[16px_16px_0_#1C1B19]">
            <div className="text-xs font-mono uppercase tracking-widest text-white/80 mb-4">
              Audition Field Observation // GTBIT Lawns
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              IF WE THREW YOU INTO EPICTURE TOMORROW...<br />
              <span className="text-butter block mt-2">
                WHERE WOULD YOU CAUSE THE MOST DAMAGE?
              </span>
            </h2>

            <div className="font-hand text-2xl sm:text-3xl text-white/95 mt-6 border-t border-white/20 pt-4">
              Answer logged in ink: "Every single production department simultaneously."
            </div>
          </div>
        </section>

        {/* PANEL 5: Scene 03 — The Evidence Wall */}
        <section className="w-screen h-full flex items-center justify-center p-6 sm:p-12 shrink-0">
          <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full">
            {/* Analog Kodak Contact Sheet */}
            <div className="relative bg-[#111] p-5 sm:p-7 rounded-sm text-white shadow-2xl border border-white/10 transform -rotate-1 shrink-0">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 mb-4">
                <span>GTBIT // EPICTURE AUDITION CONTACT SHEET</span>
                <span>KODAK TRI-X 400</span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 w-[280px] sm:w-[460px]">
                <div className="relative aspect-3/4 bg-neutral-900 border border-neutral-700 overflow-hidden group">
                  <img
                    src={contactImg1}
                    alt="Audition specimen 1"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="absolute bottom-1 right-1.5 font-mono text-[9px] text-white/70 bg-black/50 px-1">
                    01A
                  </span>
                </div>

                <div className="relative aspect-3/4 bg-neutral-900 border border-neutral-700 overflow-hidden group">
                  <img
                    src={contactImg2}
                    alt="Audition specimen 2"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="absolute bottom-1 right-1.5 font-mono text-[9px] text-white/70 bg-black/50 px-1">
                    02A
                  </span>
                </div>

                <div className="relative aspect-3/4 bg-neutral-900 border border-neutral-700 overflow-hidden group">
                  <img
                    src={contactImg3}
                    alt="Audition specimen 3"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="absolute bottom-1 right-1.5 font-mono text-[9px] text-white/70 bg-black/50 px-1">
                    03A
                  </span>
                </div>
              </div>

              {/* Curator sticky note */}
              <div 
                onClick={() => sound.tick()}
                className="absolute -top-4 -right-4 bg-[#FFF9C4] text-[#1a1a1a] p-3 rounded-xs font-hand text-lg shadow-lg border-l-4 border-[#E4C025] transform rotate-3 z-20 cursor-pointer"
              >
                "Look at Frame 03A. Raw instinct."
              </div>
            </div>

            {/* Evidence Text Narrative */}
            <div className="max-w-lg">
              <div className="mb-4">
                <span 
                  onClick={() => sound.stamp()}
                  className="rubber-stamp text-xs text-cobalt border-cobalt bg-cobalt/5 cursor-pointer"
                >
                  EXHIBIT A // ARCHIVE REVIEW
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-black text-charcoal leading-tight tracking-tight mb-4">
                YOU DIDN'T JUST SAY YOU COULD CREATE.
              </h3>

              <p className="font-serif text-2xl sm:text-3xl font-normal italic text-vividred mb-6">
                You showed us.
              </p>

              <p className="font-sans text-base text-black/70 leading-relaxed">
                Hundreds filled the Google Form. Dozens talked about their passion. You placed evidence on the table and let the frames do the interrogation for you.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
