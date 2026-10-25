import React, { useState } from 'react';
import { CandidateData, VerticalType } from '../types';
import { PRESET_PERSONAS } from '../data/roles';
import { sound } from '../utils/sound';

interface PersonaSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateData;
  onUpdateCandidate: (updated: CandidateData) => void;
}

const VERTICAL_OPTIONS: VerticalType[] = [
  'PHOTOGRAPHY',
  'CINEMATOGRAPHY',
  'DESIGN',
  'EDITING',
  'CONTENT',
  'MODELLING',
  'MANAGEMENT',
];

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  isOpen,
  onClose,
  candidate,
  onUpdateCandidate,
}) => {
  const [name, setName] = useState(candidate.name);
  const [vertical, setVertical] = useState<VerticalType>(candidate.vertical);
  const [number, setNumber] = useState(candidate.number);
  const [years, setYears] = useState(candidate.years);
  const [weapon, setWeapon] = useState(candidate.weapon);

  if (!isOpen) return null;

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    sound.stamp();
    onUpdateCandidate({
      name: name.trim() || 'Aarush',
      vertical,
      number: number.trim() || '027',
      years: years.trim() || '2',
      weapon: weapon.trim() || 'Behind the camera',
      whatsappLink: candidate.whatsappLink,
    });
    onClose();
  };

  const handleSelectPreset = (preset: typeof PRESET_PERSONAS[0]) => {
    sound.tick();
    setName(preset.name);
    setVertical(preset.vertical);
    setNumber(preset.number);
    setYears(preset.years);
    setWeapon(preset.weapon);

    onUpdateCandidate({
      ...preset,
      whatsappLink: candidate.whatsappLink,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F0] border-2 border-charcoal rounded-md shadow-[12px_16px_0_#1C1B19] p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/15 pb-3 mb-6">
          <div>
            <h3 className="font-serif text-2xl font-black text-charcoal">
              PERSONA TESTER
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-wider text-black/60">
              Personalize Dossier & Induction Card
            </span>
          </div>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 font-mono text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <div className="font-mono text-xs uppercase tracking-wider text-black/50 mb-2">
            SELECT PRESET AUDITIONEE:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_PERSONAS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                  candidate.name === preset.name
                    ? 'bg-cobalt text-white border-cobalt shadow-xs'
                    : 'bg-white text-black/70 border-black/15 hover:border-black/40'
                }`}
              >
                {preset.name} ({preset.vertical.slice(0, 5)})
              </button>
            ))}
          </div>
        </div>

        {/* Custom Form */}
        <form onSubmit={handleApplyCustom} className="space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-black/20 rounded-sm font-serif text-lg font-bold text-charcoal focus:outline-none focus:border-cobalt"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
              Classified Vertical
            </label>
            <select
              value={vertical}
              onChange={(e) => setVertical(e.target.value as VerticalType)}
              className="w-full px-3.5 py-2 bg-white border border-black/20 rounded-sm font-sans text-sm font-bold text-charcoal focus:outline-none focus:border-cobalt"
            >
              {VERTICAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
                Member #
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-black/20 rounded-sm font-mono text-sm text-charcoal focus:outline-none focus:border-cobalt"
                placeholder="027"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
                College Years
              </label>
              <input
                type="text"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-black/20 rounded-sm font-mono text-sm text-charcoal focus:outline-none focus:border-cobalt"
                placeholder="2"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-black/60 mb-1">
              Chosen Weapon
            </label>
            <input
              type="text"
              value={weapon}
              onChange={(e) => setWeapon(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-black/20 rounded-sm font-serif text-sm font-semibold text-charcoal focus:outline-none focus:border-cobalt"
              placeholder="Behind the camera"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-black/60 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-vividred hover:bg-tomato text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Update Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
