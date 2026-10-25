export type VerticalType = 
  | 'PHOTOGRAPHY'
  | 'CINEMATOGRAPHY'
  | 'DESIGN'
  | 'EDITING'
  | 'CONTENT'
  | 'MODELLING'
  | 'MANAGEMENT';

export interface CandidateData {
  id: string;
  name: string;
  slug: string;
  role: VerticalType;
  vertical: VerticalType; // Kept in sync with role for existing component compatibility
  year: string;
  years: string;          // Kept in sync with year for existing component compatibility
  number: string;
  memberNumber: string;   // Kept in sync with number for candidate model completeness
  weapon: string;
  whatsappLink: string;
  selectedWork?: string;
  selectedWork2?: string;
  status: 'active' | 'inactive';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleInfo {
  headline: string;
  quote: string;
  subquote: string;
  archetype: string;
}

