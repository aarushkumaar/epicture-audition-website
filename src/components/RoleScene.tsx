import React from 'react';
import { CandidateData } from '../types';
import { ROLE_DETAILS } from '../data/roles';

interface RoleSceneProps {
  candidate: CandidateData;
}

export const RoleScene: React.FC<RoleSceneProps> = ({ candidate }) => {
  const role = ROLE_DETAILS[candidate.vertical] || ROLE_DETAILS.PHOTOGRAPHY;

  return (
    <section 
      id="scene-10" 
      className="relative min-h-[90vh] bg-[#F7F4EB] text-charcoal flex items-center justify-center py-28 px-6 sm:px-12 md:px-20 border-b border-black/15"
    >
      <div className="max-w-4xl w-full border-l-6 sm:border-l-8 border-cobalt pl-8 sm:pl-14 py-4">
        {/* Role Archetype Kicker */}
        <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-cobalt font-bold mb-4">
          {candidate.name} // INNER CIRCLE // {role.archetype}
        </div>

        {/* Big Editorial Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-charcoal mb-6">
          {role.headline}
        </h2>

        {/* Dynamic Quote & Subquote */}
        <div className="space-y-4 max-w-3xl">
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#3A3835] leading-snug">
            "{role.quote}"
          </p>

          <p className="font-sans text-base sm:text-xl text-black/70 font-light leading-relaxed">
            {role.subquote}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-black/10 flex items-center gap-4">
          <span className="font-hand text-2xl sm:text-3xl text-vividred">
            Welcome to the front lines.
          </span>
        </div>
      </div>
    </section>
  );
};
