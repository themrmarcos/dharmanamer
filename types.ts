export enum SourceText {
  ALL = 'All Scriptures',
  GITA = 'Bhagavad Gita',
  RAMAYANA = 'Ramayana',
  MAHABHARATA = 'Mahabharata',
  VEDAS = 'Vedas & Upanishads'
}

export interface NameSuggestion {
  englishName: string;
  sanskritName: string;
  meaning: string;
  origin: string; // e.g., "Gita Chapter 2, Verse 47"
  rationale: string; // Why this fits the user's description
  tags: string[];
}

export interface GenerateNamesParams {
  description: string;
  source: SourceText;
}