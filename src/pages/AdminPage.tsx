import React, { useState, useEffect, useMemo } from 'react';
import { CandidateData, VerticalType } from '../types';
import { candidateService, slugify, CANDIDATES_UPDATED_EVENT } from '../services/candidateService';
import { InnerCircleExperience } from '../components/InnerCircleExperience';
import { sound } from '../utils/sound';

const VERTICAL_OPTIONS: VerticalType[] = [
  'PHOTOGRAPHY',
  'CINEMATOGRAPHY',
  'DESIGN',
  'EDITING',
  'CONTENT',
  'MODELLING',
  'MANAGEMENT',
];

export const AdminPage: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [verticalFilter, setVerticalFilter] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form mode: 'edit' | 'create'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CandidateData>>({
    name: '',
    slug: '',
    role: 'PHOTOGRAPHY',
    year: '2',
    number: '027',
    weapon: 'Behind the camera',
    whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    status: 'active',
    notes: '',
  });

  // Modal for Live Preview
  const [previewCandidate, setPreviewCandidate] = useState<CandidateData | null>(null);
  // Delete confirmation
  const [candidateToDelete, setCandidateToDelete] = useState<CandidateData | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadCandidates = async () => {
    setLoading(true);
    const list = await candidateService.getAll();
    setCandidates(list);
    if (list.length > 0 && !selectedCandidateId) {
      setSelectedCandidateId(list[0].id);
      populateForm(list[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCandidates();

    // Listen to cross-component or cross-tab updates
    const handleStorageUpdate = () => {
      loadCandidates();
    };
    window.addEventListener(CANDIDATES_UPDATED_EVENT, handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener(CANDIDATES_UPDATED_EVENT, handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const populateForm = (c: CandidateData) => {
    setFormData({
      id: c.id,
      name: c.name,
      slug: c.slug,
      role: c.role || c.vertical,
      year: c.year || c.years,
      number: c.number || c.memberNumber,
      weapon: c.weapon,
      whatsappLink: c.whatsappLink,
      status: c.status || 'active',
      notes: c.notes || '',
    });
    setIsEditing(false);
  };

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId) || candidates[0] || null;
  }, [candidates, selectedCandidateId]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.number.includes(searchQuery);
      const matchesVertical =
        verticalFilter === 'ALL' || (c.role || c.vertical) === verticalFilter;
      return matchesSearch && matchesVertical;
    });
  }, [candidates, searchQuery, verticalFilter]);

  const handleSelectCandidate = (c: CandidateData) => {
    sound.tick();
    setSelectedCandidateId(c.id);
    populateForm(c);
  };

  const handleStartCreate = () => {
    sound.tick();
    setSelectedCandidateId(null);
    setFormData({
      name: '',
      slug: '',
      role: 'PHOTOGRAPHY',
      year: '2',
      number: String(candidates.length + 1).padStart(3, '0'),
      weapon: 'Behind the camera',
      whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
      status: 'active',
      notes: '',
    });
    setIsEditing(true);
  };

  const handleNameChange = (newName: string) => {
    const autoSlug = slugify(newName);
    setFormData((prev) => ({
      ...prev,
      name: newName,
      // Auto-update slug only if user hasn't explicitly customized it differently
      slug: prev.slug === '' || prev.slug === slugify(prev.name || '') ? autoSlug : prev.slug,
    }));
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Please provide a candidate name.');
      return;
    }

    sound.stamp();
    try {
      if (selectedCandidateId && !isEditing) {
        // Updating existing
        const updated = await candidateService.update(selectedCandidateId, formData);
        showToast(`Candidate "${updated.name}" updated successfully.`);
        await loadCandidates();
      } else if (isEditing && selectedCandidateId) {
        // Saving edit on current
        const updated = await candidateService.update(selectedCandidateId, formData);
        setIsEditing(false);
        showToast(`Changes saved for "${updated.name}".`);
        await loadCandidates();
      } else {
        // Creating new
        const created = await candidateService.create({
          name: formData.name,
          slug: formData.slug || slugify(formData.name),
          role: (formData.role as VerticalType) || 'PHOTOGRAPHY',
          year: formData.year || '2',
          number: formData.number || '027',
          weapon: formData.weapon || 'Behind the camera',
          whatsappLink: formData.whatsappLink || 'https://chat.whatsapp.com/sampleEpictureInvite2026',
          status: formData.status || 'active',
          notes: formData.notes || '',
        });
        setSelectedCandidateId(created.id);
        populateForm(created);
        setIsEditing(false);
        showToast(`Candidate "${created.name}" created! Link ready.`);
        await loadCandidates();
      }
    } catch (err: any) {
      showToast(`Error saving candidate: ${err.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (candidate: CandidateData) => {
    sound.stamp();
    await candidateService.delete(candidate.id);
    setCandidateToDelete(null);
    showToast(`Candidate "${candidate.name}" deleted.`);
    const remaining = await candidateService.getAll();
    setCandidates(remaining);
    if (remaining.length > 0) {
      setSelectedCandidateId(remaining[0].id);
      populateForm(remaining[0]);
    } else {
      setSelectedCandidateId(null);
      handleStartCreate();
    }
  };

  const handleCopyLink = (candidate: CandidateData) => {
    sound.shutter();
    const fullUrl = `${window.location.origin}/candidate/${candidate.slug}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullUrl);
    }
    showToast(`Personalized URL copied: ${fullUrl}`);
  };

  const handleOpenExperience = (candidate: CandidateData) => {
    sound.tick();
    window.open(`/candidate/${candidate.slug}`, '_blank');
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset candidate directory to default audition roster?')) {
      sound.stamp();
      const list = await candidateService.resetToDefaults();
      setCandidates(list);
      if (list.length > 0) {
        setSelectedCandidateId(list[0].id);
        populateForm(list[0]);
      }
      showToast('Default candidates restored.');
    }
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-[#FAF7F0] font-sans selection:bg-vividred selection:text-white pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-[#FAF7F0] text-charcoal border-2 border-charcoal rounded-md shadow-[6px_6px_0_#D92323] animate-fadeIn font-mono text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-vividred animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Editorial Administration Bar */}
      <header className="sticky top-0 z-40 bg-[#191816]/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-sm bg-vividred text-white flex items-center justify-center font-serif font-black text-xl shadow-xs">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-black tracking-tight text-white">
                  EPICTURE CANDIDATE REGISTRY
                </h1>
                <span className="px-2 py-0.5 rounded-xs bg-white/10 text-white/70 font-mono text-[10px] uppercase tracking-widest border border-white/10">
                  ADMIN / CLASSIFIED
                </span>
              </div>
              <p className="font-mono text-xs text-white/50 tracking-wider">
                CENTRAL AUDITION DISPATCH & DOSSIER GENERATOR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleResetDefaults}
              className="px-3 py-1.5 rounded-sm border border-white/15 text-white/60 hover:text-white hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              title="Reset default auditionees"
            >
              Reset Defaults
            </button>
            <button
              onClick={handleStartCreate}
              className="px-4 py-2 bg-vividred hover:bg-tomato text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>+</span>
              <span>Add Candidate</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Statistics and Quick Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-4 bg-[#1A1917] border border-white/10 rounded-sm">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              Total Candidates
            </div>
            <div className="font-serif text-3xl font-black text-white mt-1">
              {candidates.length}
            </div>
          </div>
          <div className="p-4 bg-[#1A1917] border border-white/10 rounded-sm">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              Active Portals
            </div>
            <div className="font-serif text-3xl font-black text-cobalt mt-1">
              {candidates.filter((c) => c.status === 'active').length}
            </div>
          </div>
          <div className="p-4 bg-[#1A1917] border border-white/10 rounded-sm">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              Verticals Represented
            </div>
            <div className="font-serif text-3xl font-black text-butter mt-1">
              {new Set(candidates.map((c) => c.role || c.vertical)).size}
            </div>
          </div>
          <div className="p-4 bg-[#1A1917] border border-white/10 rounded-sm">
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              Database Mode
            </div>
            <div className="font-mono text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ISOLATED SERVICE</span>
            </div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Candidates List (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Audition Roster</span>
                <span className="font-mono text-xs text-white/40 font-normal">
                  ({filteredCandidates.length})
                </span>
              </h2>
            </div>

            {/* Filter Bar */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search candidate name, slug, number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1B19] border border-white/15 rounded-sm font-mono text-xs text-white placeholder-white/40 focus:outline-none focus:border-cobalt"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Vertical Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setVerticalFilter('ALL')}
                  className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider border cursor-pointer transition-all ${
                    verticalFilter === 'ALL'
                      ? 'bg-white text-charcoal border-white font-bold'
                      : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                  }`}
                >
                  ALL ({candidates.length})
                </button>
                {VERTICAL_OPTIONS.map((v) => {
                  const count = candidates.filter((c) => (c.role || c.vertical) === v).length;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVerticalFilter(v)}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider border cursor-pointer transition-all ${
                        verticalFilter === v
                          ? 'bg-cobalt text-white border-cobalt font-bold shadow-xs'
                          : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {v.slice(0, 5)} {count > 0 && `(${count})`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidate Cards List */}
            <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
              {loading ? (
                <div className="p-8 text-center font-mono text-xs text-white/40">
                  Querying candidate archives...
                </div>
              ) : filteredCandidates.length === 0 ? (
                <div className="p-8 text-center bg-[#181715] border border-white/10 rounded-sm">
                  <p className="font-serif text-lg text-white/70">No candidates found.</p>
                  <p className="font-mono text-xs text-white/40 mt-1">
                    Try another search or click "+ Add Candidate".
                  </p>
                </div>
              ) : (
                filteredCandidates.map((c) => {
                  const isSelected = c.id === selectedCandidateId && !isEditing;
                  const candidateRole = c.role || c.vertical;
                  const candidateYear = c.year || c.years;
                  const candidateNum = c.number || c.memberNumber;

                  return (
                    <div
                      key={c.id}
                      onClick={() => handleSelectCandidate(c)}
                      className={`group relative p-4 rounded-sm border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#23221F] border-vividred shadow-[4px_4px_0_#D92323]'
                          : 'bg-[#181715] border-white/10 hover:bg-[#1E1D1B] hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                              {c.name}
                            </h3>
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-xs bg-white/10 text-white/80 uppercase font-semibold">
                              EP-{candidateNum}
                            </span>
                          </div>
                          <div className="font-mono text-xs text-cobalt font-semibold tracking-wider mt-0.5 uppercase">
                            {candidateRole} — YEAR {candidateYear}
                          </div>
                          <div className="font-mono text-[11px] text-white/40 mt-1 flex items-center gap-1.5">
                            <span className="text-white/30">URL:</span>
                            <span className="text-white/70 underline decoration-white/20">
                              /candidate/{c.slug}
                            </span>
                          </div>
                        </div>

                        {/* Status Stamp */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span
                            className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-xs font-bold tracking-widest border ${
                              c.status === 'active'
                                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                            }`}
                          >
                            {c.status || 'ACTIVE'}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Shortcuts */}
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyLink(c);
                            }}
                            className="text-white/60 hover:text-white transition-colors cursor-pointer"
                            title="Copy candidate URL"
                          >
                            Copy Link
                          </button>
                          <span className="text-white/20">·</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenExperience(c);
                            }}
                            className="text-cobalt hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                            title="Open candidate experience in new tab"
                          >
                            Open ↗
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCandidateToDelete(c);
                          }}
                          className="text-white/30 hover:text-vividred transition-colors cursor-pointer"
                          title="Delete candidate"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: Candidate Detail & Editor & Preview Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Candidate Showcase Banner */}
            {selectedCandidate && !isEditing && (
              <div className="bg-[#FAF7F0] text-charcoal border-2 border-charcoal p-6 rounded-md shadow-[8px_8px_0_#1C1B19]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/15 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs uppercase tracking-widest font-bold text-vividred bg-vividred/10 px-2 py-0.5 rounded-xs border border-vividred/30">
                        CANDIDATE DOSSIER
                      </span>
                      <span className="font-mono text-xs text-black/50">
                        EP-IC-{selectedCandidate.number || selectedCandidate.memberNumber}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl font-black text-charcoal leading-none">
                      {selectedCandidate.name}
                    </h2>
                    <div className="font-mono text-xs uppercase tracking-wider text-cobalt font-bold mt-1">
                      {selectedCandidate.role || selectedCandidate.vertical} DIVISION · YEAR{' '}
                      {selectedCandidate.year || selectedCandidate.years}
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleCopyLink(selectedCandidate)}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-black/5 text-charcoal border border-black/20 font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer text-center"
                    >
                      Copy Personalized Link
                    </button>
                    <button
                      onClick={() => handleOpenExperience(selectedCandidate)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-charcoal hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer text-center"
                    >
                      Open Full Experience →
                    </button>
                    <button
                      onClick={() => {
                        sound.tick();
                        setPreviewCandidate(selectedCandidate);
                      }}
                      className="px-3.5 py-2 bg-cobalt hover:bg-blue-700 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
                      title="Inspect interactive preview"
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {/* Candidate Overview Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-2.5 bg-white border border-black/10 rounded-xs">
                    <div className="text-[10px] text-black/40 uppercase">URL SLUG</div>
                    <div className="font-bold text-charcoal truncate mt-0.5">
                      /candidate/{selectedCandidate.slug}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border border-black/10 rounded-xs">
                    <div className="text-[10px] text-black/40 uppercase">CHOSEN WEAPON</div>
                    <div className="font-bold text-charcoal truncate mt-0.5">
                      {selectedCandidate.weapon}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border border-black/10 rounded-xs">
                    <div className="text-[10px] text-black/40 uppercase">STATUS</div>
                    <div className="font-bold text-emerald-700 uppercase mt-0.5">
                      {selectedCandidate.status || 'ACTIVE'}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border border-black/10 rounded-xs">
                    <div className="text-[10px] text-black/40 uppercase">UPDATED</div>
                    <div className="font-bold text-black/60 truncate mt-0.5">
                      {new Date(selectedCandidate.updatedAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Candidate Edit / Add Form */}
            <div className="bg-[#181715] border border-white/10 rounded-md p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                    {isEditing && !selectedCandidateId
                      ? 'Add New Candidate'
                      : `Edit Dossier: ${selectedCandidate?.name || 'Candidate'}`}
                  </h3>
                  <p className="font-mono text-xs text-white/50 tracking-wider mt-0.5">
                    Modifying candidate properties instantly updates their public experience.
                  </p>
                </div>

                {isEditing && selectedCandidateId && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="font-mono text-xs text-white/60 hover:text-white uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveForm} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Aarush"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-serif text-lg font-bold text-white placeholder-white/30 focus:outline-none focus:border-cobalt"
                    />
                  </div>

                  {/* URL Slug */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      URL Slug (/candidate/...) *
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 bg-[#141312] border border-r-0 border-white/15 rounded-l-sm font-mono text-xs text-white/40">
                        /candidate/
                      </span>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                        }
                        placeholder="aarush"
                        required
                        className="w-full px-3 py-2.5 bg-[#201F1C] border border-white/15 rounded-r-sm font-mono text-sm text-white placeholder-white/30 focus:outline-none focus:border-cobalt"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Role / Vertical */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Vertical / Role *
                    </label>
                    <select
                      value={formData.role || 'PHOTOGRAPHY'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          role: e.target.value as VerticalType,
                          vertical: e.target.value as VerticalType,
                        }))
                      }
                      className="w-full px-3 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-mono text-xs font-bold text-white focus:outline-none focus:border-cobalt"
                    >
                      {VERTICAL_OPTIONS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* College Year */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      College Year *
                    </label>
                    <select
                      value={formData.year || '2'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          year: e.target.value,
                          years: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-mono text-xs font-bold text-white focus:outline-none focus:border-cobalt"
                    >
                      <option value="1">Year 1 (Freshman)</option>
                      <option value="2">Year 2 (Sophomore)</option>
                      <option value="3">Year 3 (Pre-final)</option>
                      <option value="4">Year 4 (Senior)</option>
                    </select>
                  </div>

                  {/* Member Number */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Member Number # *
                    </label>
                    <input
                      type="text"
                      value={formData.number || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          number: e.target.value,
                          memberNumber: e.target.value,
                        }))
                      }
                      placeholder="027"
                      required
                      className="w-full px-3 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-mono text-xs text-white placeholder-white/30 focus:outline-none focus:border-cobalt"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Chosen Weapon */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Chosen Weapon
                    </label>
                    <input
                      type="text"
                      value={formData.weapon || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, weapon: e.target.value }))
                      }
                      placeholder="e.g. Behind the camera, Director's Viewfinder"
                      className="w-full px-3.5 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-cobalt"
                    />
                  </div>

                  {/* WhatsApp Group Link */}
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      WhatsApp Induction Invite Link
                    </label>
                    <input
                      type="url"
                      value={formData.whatsappLink || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, whatsappLink: e.target.value }))
                      }
                      placeholder="https://chat.whatsapp.com/..."
                      className="w-full px-3.5 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-mono text-xs text-white placeholder-white/30 focus:outline-none focus:border-cobalt"
                    />
                  </div>
                </div>

                {/* Status Toggle & Internal Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Portal Status
                    </label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as 'active' | 'inactive',
                        }))
                      }
                      className="w-full px-3 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-mono text-xs font-bold text-white focus:outline-none focus:border-cobalt"
                    >
                      <option value="active">Active (Access Granted)</option>
                      <option value="inactive">Inactive (Pending Review)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Reviewer Notes / Observations
                    </label>
                    <input
                      type="text"
                      value={formData.notes || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder="e.g. Exceptional composition, auditioned in Room 3"
                      className="w-full px-3.5 py-2.5 bg-[#201F1C] border border-white/15 rounded-sm font-sans text-xs text-white placeholder-white/30 focus:outline-none focus:border-cobalt"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="font-mono text-xs text-white/40">
                    {formData.slug ? (
                      <span>
                        Target: <code className="text-white/80">/candidate/{formData.slug}</code>
                      </span>
                    ) : (
                      <span>Enter candidate name to generate route</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {selectedCandidate && !isEditing && (
                      <button
                        type="button"
                        onClick={() => setCandidateToDelete(selectedCandidate)}
                        className="px-4 py-2.5 text-white/50 hover:text-vividred font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Delete Candidate
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-vividred hover:bg-tomato text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {isEditing && !selectedCandidateId
                        ? 'CREATE CANDIDATE'
                        : 'SAVE CANDIDATE CHANGES'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {candidateToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FAF7F0] text-charcoal border-3 border-charcoal p-6 rounded-md shadow-[12px_12px_0_#1C1B19]">
            <h4 className="font-serif text-2xl font-black text-charcoal mb-2">
              EXPUNGE CANDIDATE?
            </h4>
            <p className="font-sans text-sm text-black/70 mb-6">
              Are you sure you want to delete candidate <strong>{candidateToDelete.name}</strong> (
              <code>/candidate/{candidateToDelete.slug}</code>)? Their personalized induction route
              will no longer be accessible.
            </p>
            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setCandidateToDelete(null)}
                className="px-4 py-2 border border-black/20 rounded-sm text-black/60 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(candidateToDelete)}
                className="px-5 py-2 bg-vividred hover:bg-tomato text-white font-bold rounded-sm shadow-sm cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Live Preview Modal */}
      {previewCandidate && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md animate-fadeIn">
          {/* Top modal bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#1C1B19] border-b border-white/15 text-white">
            <div className="flex items-center gap-3">
              <span className="font-serif font-black text-lg text-white">
                LIVE EXPERIENCE PREVIEW:
              </span>
              <span className="font-mono text-xs text-cobalt font-bold uppercase">
                {previewCandidate.name} ({previewCandidate.role || previewCandidate.vertical})
              </span>
              <span className="font-mono text-[11px] text-white/40 hidden sm:inline">
                (/candidate/{previewCandidate.slug})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCopyLink(previewCandidate)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-sm cursor-pointer"
              >
                Copy Link
              </button>
              <button
                onClick={() => handleOpenExperience(previewCandidate)}
                className="px-3.5 py-1.5 bg-vividred hover:bg-tomato text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm cursor-pointer"
              >
                Open New Tab ↗
              </button>
              <button
                onClick={() => setPreviewCandidate(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Iframe or Render of InnerCircleExperience */}
          <div className="flex-1 w-full overflow-y-auto bg-[#F7F4EB]">
            <InnerCircleExperience candidate={previewCandidate} previewMode={true} />
          </div>
        </div>
      )}
    </div>
  );
};
