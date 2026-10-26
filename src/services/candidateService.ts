import { CandidateData, VerticalType } from '../types';

export const STORAGE_KEY = 'epicture_inner_circle_candidates_v2';
export const CANDIDATES_UPDATED_EVENT = 'epicture_candidates_updated';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/LK9H9Xi2yBTEQq6KMeYdWe?mode=gi_t';

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
    id: 'candidate-anhadjot-kaur',
    name: 'Anhadjot kaur',
    slug: 'anhadjot-kaur',
    role: 'PHOTOGRAPHY',
    vertical: 'PHOTOGRAPHY',
    year: '2',
    years: '2',
    number: '001',
    memberNumber: '001',
    weapon: 'Behind the camera',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: Shutterbugs | Year: 2nd year',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-shrishti',
    name: 'shrishti',
    slug: 'shrishti',
    role: 'DESIGN',
    vertical: 'DESIGN',
    year: '2',
    years: '2',
    number: '002',
    memberNumber: '002',
    weapon: 'Pen Tool & Overthinking',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: ARTISTS | Year: 2nd',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-meharpreet-singh',
    name: 'Meharpreet Singh',
    slug: 'meharpreet-singh',
    role: 'CONTENT',
    vertical: 'CONTENT',
    year: '1',
    years: '1',
    number: '003',
    memberNumber: '003',
    weapon: 'Words & Storyboards',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: YAPPERS (COPYWRITER) + WIZARDS | Year: 1st year',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-kavya',
    name: 'kavya',
    slug: 'kavya',
    role: 'PHOTOGRAPHY',
    vertical: 'PHOTOGRAPHY',
    year: '1',
    years: '1',
    number: '004',
    memberNumber: '004',
    weapon: 'Behind the camera',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: YAPPER + WIZARDS | Year: 1st',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-archana-priyadarshni',
    name: 'Archana Priyadarshni',
    slug: 'archana-priyadarshni',
    role: 'MODELLING',
    vertical: 'MODELLING',
    year: '3',
    years: '3',
    number: '005',
    memberNumber: '005',
    weapon: 'Living Composition',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: MUSE | Year: 3rd',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-stasha-jain',
    name: 'Stasha Jain',
    slug: 'stasha-jain',
    role: 'CINEMATOGRAPHY',
    vertical: 'CINEMATOGRAPHY',
    year: '1',
    years: '1',
    number: '006',
    memberNumber: '006',
    weapon: "Director's Viewfinder",
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: ARTIST + CINEMATOGRAPHY | Year: 1st',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-aryan-panchal',
    name: 'aryan panchal',
    slug: 'aryan-panchal',
    role: 'CINEMATOGRAPHY',
    vertical: 'CINEMATOGRAPHY',
    year: '2',
    years: '2',
    number: '007',
    memberNumber: '007',
    weapon: "Director's Viewfinder",
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: CINEMATOGRAPHY (LEAD) | Year: 2nd year',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-saksham-sharma',
    name: 'saksham sharma',
    slug: 'saksham-sharma',
    role: 'MODELLING',
    vertical: 'MODELLING',
    year: '1',
    years: '1',
    number: '008',
    memberNumber: '008',
    weapon: 'Living Composition',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: MUSE | Year: 1st',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-parmeet',
    name: 'Parmeet',
    slug: 'parmeet',
    role: 'PHOTOGRAPHY',
    vertical: 'PHOTOGRAPHY',
    year: '1',
    years: '1',
    number: '009',
    memberNumber: '009',
    weapon: 'Behind the camera',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: Shutterbugs | Year: 1st',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
  {
    id: 'candidate-akshit-gutam',
    name: 'Akshit Gutam',
    slug: 'akshit-gutam',
    role: 'PHOTOGRAPHY',
    vertical: 'PHOTOGRAPHY',
    year: '3',
    years: '3',
    number: '010',
    memberNumber: '010',
    weapon: 'Behind the camera',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: WIZARDS | Year: 3rd',
    createdAt: '2026-10-25T14:45:00.000Z',
    updatedAt: '2026-10-25T14:45:00.000Z',
  },
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
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Exceptional instinct for shadows and natural framing.',
    createdAt: '2026-10-24T10:00:00.000Z',
    updatedAt: '2026-10-24T10:00:00.000Z',
  },
  {
    id: 'candidate-ash-the-alien',
    name: 'Ash The Alien',
    slug: 'ash-the-alien',
    role: 'MANAGEMENT',
    vertical: 'MANAGEMENT',
    year: '2',
    years: '2',
    number: '028',
    memberNumber: '028',
    weapon: 'Intergalactic Organization',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: MANAGEMENT | Year: 2nd year',
    createdAt: '2026-10-26T17:43:00.000Z',
    updatedAt: '2026-10-26T17:43:00.000Z',
  },
  {
    id: 'candidate-dhriti',
    name: 'Dhriti',
    slug: 'dhriti',
    role: 'DESIGN',
    vertical: 'DESIGN',
    year: '2',
    years: '2',
    number: '029',
    memberNumber: '029',
    weapon: 'Pen Tool Mastery',
    whatsappLink: WHATSAPP_GROUP_LINK,
    selectedWork: '',
    status: 'active',
    notes: 'Team: ARTISTS | Year: 2nd year',
    createdAt: '2026-10-26T17:43:00.000Z',
    updatedAt: '2026-10-26T17:43:00.000Z',
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
    whatsappLink: raw.whatsappLink?.trim() || WHATSAPP_GROUP_LINK,
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
