import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { CandidateData } from '../types';
import { sound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

interface CircleMorphSceneProps {
  candidate: CandidateData;
}

export const CircleMorphScene: React.FC<CircleMorphSceneProps> = ({ candidate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringExtendedRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const wordExtendedRef = useRef<HTMLDivElement>(null);
  const wordCircleRef = useRef<HTMLDivElement>(null);
  const extendedGroupRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);
  const innerRevealRef = useRef<HTMLDivElement>(null);
  const circleGlowRef = useRef<HTMLDivElement>(null);
  const confettiFiredRef = useRef<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            // Confetti and sound explosion when transition crystallizes
            if (self.progress > 0.65 && !confettiFiredRef.current) {
              confettiFiredRef.current = true;
              sound.shutter();
              confetti({
                particleCount: 80,
                spread: 90,
                origin: { y: 0.55 },
                colors: ['#E63323', '#F7D248', '#1642E2', '#FFFFFF', '#DDD6FE'],
              });
            } else if (self.progress < 0.55) {
              confettiFiredRef.current = false;
            }
          },
        },
      });

      // 1. Initial State: EXTENDED CIRCLE with candidate outside
      // 2. Circle expands, letters stretch apart
      tl.to(ringExtendedRef.current, {
        scale: 1.45,
        rotation: 45,
        borderColor: 'rgba(230, 51, 35, 0.5)',
        duration: 2,
      }, 0)
      .to(wordExtendedRef.current, {
        letterSpacing: '0.24em',
        scale: 1.15,
        opacity: 0.6,
        duration: 2,
      }, 0)
      .to(wordCircleRef.current, {
        letterSpacing: '0.28em',
        opacity: 0.25,
        duration: 2,
      }, 0)
      .to(tokenRef.current, {
        top: '50%',
        right: '50%',
        xPercent: 50,
        yPercent: -50,
        scale: 1.15,
        duration: 2.2,
        ease: 'power2.inOut',
      }, 0.2)

      // 3. Extended circle collapses and blurs out
      .to(extendedGroupRef.current, {
        scale: 0.45,
        opacity: 0,
        filter: 'blur(14px)',
        duration: 1.2,
      }, 2)
      .to(ringExtendedRef.current, {
        scale: 0.05,
        opacity: 0,
        duration: 1.2,
      }, 2)

      // 4. Luminous Inner Ring appears & crystallizes
      .to(ringInnerRef.current, {
        scale: 1,
        opacity: 1,
        boxShadow: '0 0 100px rgba(230, 51, 35, 0.75)',
        duration: 1.5,
        ease: 'back.out(1.4)',
      }, 2.4)
      .to(circleGlowRef.current, {
        scale: 1.4,
        opacity: 1,
        duration: 1.5,
      }, 2.4)
      .to(tokenRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.7,
      }, 2.7)
      .to(innerRevealRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
      }, 2.7);

    }, containerRef);

    return () => ctx.revert();
  }, [candidate.name]);

  return (
    <div 
      ref={containerRef} 
      id="scene-circle-viewport" 
      className="relative w-full h-screen overflow-hidden bg-midnight text-cream border-b border-white/10"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Atmospheric Glow */}
        <div 
          ref={circleGlowRef}
          className="absolute w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full pointer-events-none opacity-40 transition-all"
          style={{
            background: 'radial-gradient(circle, rgba(22, 66, 226, 0.45) 0%, rgba(230, 51, 35, 0.25) 50%, transparent 75%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Outer Extended Ring (Dashed) */}
        <div
          ref={ringExtendedRef}
          className="absolute w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] rounded-full border-3 border-dashed border-white/30 flex items-center justify-center pointer-events-none origin-center"
        />

        {/* Inner Luminous Ring (Solid Red & Cobalt Glow) */}
        <div
          ref={ringInnerRef}
          className="absolute w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full border-4 border-vividred pointer-events-none opacity-0 scale-30 origin-center"
          style={{
            background: 'radial-gradient(circle, rgba(22, 66, 226, 0.45) 0%, rgba(9, 16, 29, 0.85) 100%)',
          }}
        />

        {/* Candidate Floating Badge (Travels into the core) */}
        <div
          ref={tokenRef}
          className="absolute top-[12%] right-[10%] sm:top-[16%] sm:right-[16%] bg-butter text-charcoal px-5 py-2.5 rounded-full font-mono font-bold text-xs sm:text-sm border-2 border-charcoal shadow-[6px_6px_0_#1C1B19] z-40 flex items-center gap-2 select-none"
        >
          <span className="text-vividred">★</span>
          <span>{candidate.name}</span>
          <span className="text-[10px] text-black/50 hidden sm:inline">[{candidate.vertical}]</span>
        </div>

        {/* Extended Circle Initial Typography (Breaks apart) */}
        <div 
          ref={extendedGroupRef}
          className="relative z-20 text-center flex flex-col items-center justify-center select-none"
        >
          <div 
            ref={wordExtendedRef}
            className="font-serif text-5xl sm:text-7xl md:text-9xl font-black tracking-tight leading-none text-white uppercase"
          >
            EXTENDED
          </div>
          <div 
            ref={wordCircleRef}
            className="font-serif text-5xl sm:text-7xl md:text-9xl font-black tracking-widest leading-none text-white/35 uppercase"
          >
            CIRCLE
          </div>
          <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 mt-6">
            YOU STARTED HERE.
          </div>
        </div>

        {/* Inner Circle Morph Reveal Typography */}
        <div 
          ref={innerRevealRef}
          className="absolute z-50 text-center flex flex-col items-center justify-center opacity-0 scale-90 pointer-events-none select-none max-w-4xl px-4"
        >
          <div className="font-serif text-5xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl">
            INNER CIRCLE
          </div>
          
          <div className="font-serif italic text-3xl sm:text-6xl md:text-7xl text-butter my-2 drop-shadow-md">
            {candidate.name}
          </div>

          <div className="my-3">
            <span className="inline-block font-mono text-sm sm:text-lg uppercase tracking-[0.2em] font-black bg-vividred text-white px-6 py-2.5 rounded-sm shadow-[0_8px_30px_rgba(230,51,35,0.6)]">
              YOU'RE IN.
            </span>
          </div>

          <div className="font-hand text-2xl sm:text-4xl text-neutral-300 mt-3 drop-shadow">
            Apparently, you're our problem now.
          </div>
        </div>
      </div>
    </div>
  );
};
