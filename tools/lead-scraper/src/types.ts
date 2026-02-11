export interface BusinessLead {
  name: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  rating: number;
  reviews: number;
  hours: string;
  score: number;
  category: string;
  city: string;
  scrapedDate: string;
  scoreReasons: string[];
}

export interface ScrapingOptions {
  query: string;
  city?: string;
  cities?: string[];
  limit: number;
  outputDir?: string;
}

export interface ScoreCalculation {
  score: number;
  reasons: string[];
}

export interface ReviewAnalysis {
  hasCommunicationIssues: boolean;
  keywords: string[];
}

export interface EmailExtractionResult {
  emails: string[];
  source: 'google_maps' | 'website_homepage' | 'website_contact' | 'website_other';
}