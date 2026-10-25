import { CandidateData, VerticalType } from '../types';

export const STORAGE_KEY = 'epicture_inner_circle_candidates_v1';
export const CANDIDATES_UPDATED_EVENT = 'epicture_candidates_updated';

/**
 * Utility to generate URL-safe slugs
 * e.g. "Aarush Kumar" -> "aarush-kumar"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Initial seed candidates representing auditionees
 */
export const INITIAL_CANDIDATES: CandidateData[] = [
  {
    id: 'candidate-aarush',
    name: 'Aarush',
    slug: 'aarush',
    role: 'PHOTOGRAPHY',
    vertical: 'PHOTOGRAPHY',
    year: '2',
    years: '2',
    number: '027',
    memberNumber: '027',
    weapon: 'Behind the camera',
    whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    selectedWork: '',
    status: 'active',
    notes: 'Exceptional instinct for shadows and natural framing.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-24T10:00:00.000Z',
  },
  {
    id: 'candidate-roohani',
    name: 'Roohani',
    slug: 'roohani',
    role: 'MANAGEMENT',
    vertical: 'MANAGEMENT',
    year: '3',
    years: '3',
    number: '008',
    memberNumber: '008',
    weapon: 'Spreadsheets & Aggression',
    whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    selectedWork: '',
    status: 'active',
    notes: 'Can coordinate 40 sleep-deprived artists under pressure.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-24T10:00:00.000Z',
  },
  {
    id: 'candidate-meher',
    name: 'Meher',
    slug: 'meher',
    role: 'CINEMATOGRAPHY',
    vertical: 'CINEMATOGRAPHY',
    year: '3',
    years: '3',
    number: '014',
    memberNumber: '014',
    weapon: "Director's Viewfinder",
    whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    selectedWork: '',
    status: 'active',
    notes: 'Thinks in continuous 4K anamorphic motion frames.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-24T10:00:00.000Z',
  },
  {
    id: 'candidate-kabir',
    name: 'Kabir',
    slug: 'kabir',
    role: 'DESIGN',
    vertical: 'DESIGN',
    year: '1',
    years: '1',
    number: '042',
    memberNumber: '042',
    weapon: 'Pen Tool & Overthinking',
    whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    selectedWork: '',
    status: 'active',
    notes: 'Extreme attention to kerning and editorial hierarchy.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-24T10:00:00.000Z',
  },
  {
    id: 'candidate-rhea',
    name: 'Rhea',
    slug: 'rhea',
    role: 'EDITING',
    vertical: 'EDITING',
    year: '2',
    years: '2',
    number: '019',
    memberNumber: '019',
    weapon: 'Spacebar & Caffeine',
    whatsappLink: 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    selectedWork: '',
    status: 'active',
    notes: 'Forged in 3:00 AM render timeline fires.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-24T10:00:00.000Z',
  },
];

/**
 * Normalizes candidate data ensuring synchronization between legacy and new fields
 */
export function normalizeCandidate(raw: Partial<CandidateData> & { name: string }): CandidateData {
  const role = ((raw.role || raw.vertical || 'PHOTOGRAPHY').toUpperCase() as VerticalType);
  const year = String(raw.year || raw.years || '2');
  const number = String(raw.number || raw.memberNumber || '027').padStart(3, '0');
  const name = raw.name.trim();
  const slug = raw.slug ? slugify(raw.slug) : slugify(name);

  return {
    id: raw.id || `candidate-${slug || Date.now()}`,
    name,
    slug: slug || 'candidate',
    role,
    vertical: role,
    year,
    years: year,
    number,
    memberNumber: number,
    weapon: raw.weapon?.trim() || 'Behind the camera',
    whatsappLink: raw.whatsappLink?.trim() || 'https://chat.whatsapp.com/sampleEpictureInvite2026',
    selectedWork: raw.selectedWork || '',
    selectedWork2: raw.selectedWork2 || '',
    status: raw.status || 'active',
    notes: raw.notes || '',
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Isolated Candidate Service Layer Interface
 * Allows seamless drop-in replacement with Supabase, Firebase, or REST API
 */
export interface ICandidateService {
  getAll(): Promise<CandidateData[]>;
  getBySlug(slug: string): Promise<CandidateData | null>;
  getById(id: string): Promise<CandidateData | null>;
  create(data: Partial<CandidateData> & { name: string }): Promise<CandidateData>;
  update(idOrSlug: string, updates: Partial<CandidateData>): Promise<CandidateData>;
  delete(idOrSlug: string): Promise<boolean>;
  resetToDefaults(): Promise<CandidateData[]>;
}

/**
 * LocalStorage implementation of Candidate Service
 * Provides robust client-side persistence and multi-tab synchronization
 */
class LocalStorageCandidateService implements ICandidateService {
  private readStorage(): CandidateData[] {
    if (typeof window === 'undefined') return INITIAL_CANDIDATES;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.writeStorage(INITIAL_CANDIDATES);
        return INITIAL_CANDIDATES;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((c) => normalizeCandidate(c));
      }
      this.writeStorage(INITIAL_CANDIDATES);
      return INITIAL_CANDIDATES;
    } catch (err) {
      console.error('Failed to read candidates from storage:', err);
      return INITIAL_CANDIDATES;
    }
  }

  private writeStorage(candidates: CandidateData[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
      window.dispatchEvent(
        new CustomEvent(CANDIDATES_UPDATED_EVENT, { detail: candidates })
      );
    } catch (err) {
      console.error('Failed to write candidates to storage:', err);
    }
  }

  async getAll(): Promise<CandidateData[]> {
    return this.readStorage();
  }

  async getBySlug(slug: string): Promise<CandidateData | null> {
    const target = slugify(slug);
    const candidates = this.readStorage();
    const found = candidates.find((c) => c.slug.toLowerCase() === target.toLowerCase());
    return found || null;
  }

  async getById(id: string): Promise<CandidateData | null> {
    const candidates = this.readStorage();
    const found = candidates.find((c) => c.id === id);
    return found || null;
  }

  async create(data: Partial<CandidateData> & { name: string }): Promise<CandidateData> {
    const candidates = this.readStorage();
    const normalized = normalizeCandidate(data);

    // Ensure unique slug
    let uniqueSlug = normalized.slug;
    let counter = 1;
    while (candidates.some((c) => c.slug === uniqueSlug)) {
      counter++;
      uniqueSlug = `${normalized.slug}-${counter}`;
    }
    normalized.slug = uniqueSlug;
    normalized.id = `candidate-${uniqueSlug}`;

    const updatedList = [normalized, ...candidates];
    this.writeStorage(updatedList);
    return normalized;
  }

  async update(idOrSlug: string, updates: Partial<CandidateData>): Promise<CandidateData> {
    const candidates = this.readStorage();
    const index = candidates.findIndex(
      (c) => c.id === idOrSlug || c.slug.toLowerCase() === idOrSlug.toLowerCase()
    );

    if (index === -1) {
      throw new Error(`Candidate with identifier "${idOrSlug}" not found.`);
    }

    const current = candidates[index];
    const merged = { ...current, ...updates };

    // If name or slug was explicitly modified, make sure slug is properly formatted
    if (updates.slug && updates.slug !== current.slug) {
      merged.slug = slugify(updates.slug);
    } else if (updates.name && updates.name !== current.name && !updates.slug) {
      // Keep existing slug unless explicitly altered
    }

    const normalized = normalizeCandidate(merged);
    candidates[index] = normalized;
    this.writeStorage(candidates);
    return normalized;
  }

  async delete(idOrSlug: string): Promise<boolean> {
    const candidates = this.readStorage();
    const filtered = candidates.filter(
      (c) => c.id !== idOrSlug && c.slug.toLowerCase() !== idOrSlug.toLowerCase()
    );

    if (filtered.length === candidates.length) {
      return false;
    }

    this.writeStorage(filtered);
    return true;
  }

  async resetToDefaults(): Promise<CandidateData[]> {
    this.writeStorage(INITIAL_CANDIDATES);
    return INITIAL_CANDIDATES;
  }
}

/**
 * =====================================================================
 * SUPABASE MIGRATION ADAPTER (Production Ready)
 * =====================================================================
 * To connect to Supabase:
 * 1. npm install @supabase/supabase-js
 * 2. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file
 * 3. Create a 'candidates' table in Supabase:
 *      create table candidates (
 *        id text primary key,
 *        name text not null,
 *        slug text unique not null,
 *        role text not null,
 *        vertical text not null,
 *        year text not null,
 *        years text not null,
 *        number text not null,
 *        member_number text,
 *        weapon text,
 *        whatsapp_link text,
 *        selected_work text,
 *        status text default 'active',
 *        created_at timestamp with time zone default timezone('utc'::text, now())
 *      );
 * 4. Replace candidateService export below with SupabaseCandidateService.
 * =====================================================================
 */

export const candidateService: ICandidateService = new LocalStorageCandidateService();
