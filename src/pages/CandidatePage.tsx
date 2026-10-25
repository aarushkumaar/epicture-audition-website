import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CandidateData } from '../types';
import { candidateService, CANDIDATES_UPDATED_EVENT } from '../services/candidateService';
import { InnerCircleExperience } from '../components/InnerCircleExperience';
import { CandidateNotFound } from '../components/CandidateNotFound';

export const CandidatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCandidate = async () => {
      if (!slug) {
        if (isMounted) {
          setCandidate(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const found = await candidateService.getBySlug(slug);
      if (isMounted) {
        setCandidate(found);
        setLoading(false);
      }
    };

    fetchCandidate();

    // Subscribe to live storage updates (e.g. when modified in /admin)
    const handleUpdate = () => {
      fetchCandidate();
    };
    window.addEventListener(CANDIDATES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener(CANDIDATES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#F7F4EB] text-charcoal flex flex-col items-center justify-center p-6 font-sans">
        <div className="paper-grain" aria-hidden="true" />
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-charcoal border-t-vividred animate-spin" />
          <div className="font-mono text-xs uppercase tracking-widest text-black/60">
            RETRIEVING AUDITION DOSSIER // {slug?.toUpperCase() || ''}
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return <CandidateNotFound slug={slug} />;
  }

  return <InnerCircleExperience candidate={candidate} />;
};
