import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CandidateData } from '../types';
import { TopHud } from './TopHud';
import { LetterScene } from './LetterScene';
import { HorizontalWorld } from './HorizontalWorld';
import { InterrogationScene } from './InterrogationScene';
import { MomentScene } from './MomentScene';
import { DecisionScene } from './DecisionScene';
import { DossierScene } from './DossierScene';
import { CircleMorphScene } from './CircleMorphScene';
import { RoleScene } from './RoleScene';
import { PassScene } from './PassScene';
import { FinaleScene } from './FinaleScene';

interface InnerCircleExperienceProps {
  candidate: CandidateData;
  previewMode?: boolean;
}

export const InnerCircleExperience: React.FC<InnerCircleExperienceProps> = ({
  candidate,
  previewMode = false,
}) => {
  useEffect(() => {
    // Refresh ScrollTrigger to recalculate layout dimensions whenever candidate changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(timer);
  }, [candidate]);

  return (
    <div className="relative min-h-screen bg-[#F7F4EB] text-charcoal font-sans selection:bg-vividred selection:text-white">
      {/* Paper grain overlay for tactile analog feel */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Persistent top HUD */}
      <TopHud
        candidate={candidate}
        previewMode={previewMode}
      />

      {/* Main Experience Journey */}
      <main className="relative">
        {/* Scene 01: The Letter */}
        <LetterScene candidate={candidate} />

        {/* Scene 02 & 03: Pinned Horizontal World (Application + Evidence Wall) */}
        <HorizontalWorld candidate={candidate} />

        {/* Scene 04: The Interrogation */}
        <InterrogationScene />

        {/* Scene 05: The Moment ("OH. DID I MAKE THIS?") */}
        <MomentScene />

        {/* Scene 06: The Decision Room (Controlled Chaos & Spring Rolls) */}
        <DecisionScene />

        {/* Scene 07: The Dossier File */}
        <DossierScene candidate={candidate} />

        {/* Scene 08 & 09: The Extended Circle to Inner Circle Hero Transition */}
        <CircleMorphScene candidate={candidate} />

        {/* Scene 10: Personal Role Statement */}
        <RoleScene candidate={candidate} />

        {/* Scene 11: Inner Circle Collectible Pass */}
        <PassScene candidate={candidate} />

        {/* Scene 12 & 13: Final Message, WhatsApp CTA & Curtain */}
        <FinaleScene candidate={candidate} />
      </main>
    </div>
  );
};
