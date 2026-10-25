import React, { useState, useEffect } from 'react';
import { CandidateData, VerticalType } from '../types';
import { candidateService, CANDIDATES_UPDATED_EVENT } from '../services/candidateService';
import { DEFAULT_CANDIDATE } from '../data/roles';
import { InnerCircleExperience } from '../components/InnerCircleExperience';

export const HomePage: React.FC = () => {
  const [candidate, setCandidate] = useState<CandidateData | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCandidate = async () => {
      // Check if URL has query parameters for backwards compatibility
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const nameParam = params.get('name');
        if (nameParam) {
          const vertical = (params.get('vertical')?.toUpperCase() as VerticalType) || DEFAULT_CANDIDATE.vertical;
          const number = params.get('number') || DEFAULT_CANDIDATE.number;
          const years = params.get('years') || DEFAULT_CANDIDATE.years;
          const weapon = params.get('weapon') || DEFAULT_CANDIDATE.weapon;
          const whatsappLink = params.get('whatsapp') || DEFAULT_CANDIDATE.whatsappLink;

          if (isMounted) {
            setCandidate({
              id: 'candidate-query',
              name: nameParam,
              slug: nameParam.toLowerCase(),
              role: vertical,
              vertical,
              year: years,
              years,
              number,
              memberNumber: number,
              weapon,
              whatsappLink,
              status: 'active',
            });
            return;
          }
        }
      }

      // Load primary default candidate from registry
      const all = await candidateService.getAll();
      const primary = all.find((c) => c.slug === 'aarush') || all[0];
      if (isMounted) {
        setCandidate(primary || {
          ...DEFAULT_CANDIDATE,
          id: 'candidate-default',
          slug: 'aarush',
          role: DEFAULT_CANDIDATE.vertical,
          year: DEFAULT_CANDIDATE.years,
          memberNumber: DEFAULT_CANDIDATE.number,
          status: 'active',
        });
      }
    };

    loadCandidate();

    const handleUpdate = () => {
      loadCandidate();
    };
    window.addEventListener(CANDIDATES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener(CANDIDATES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (!candidate) {
    return (
      <div className="relative min-h-screen bg-[#F7F4EB] text-charcoal flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        <div className="paper-grain" aria-hidden="true" />
        LOADING EPICTURE EXPERIENCE...
      </div>
    );
  }

  return <InnerCircleExperience candidate={candidate} />;
};
