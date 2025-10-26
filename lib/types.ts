// Type definitions for the Mission Control portfolio
export interface Metrics {
  cgpa: number;
  projects_count: number;
  tools_count: number;
  years_exp: number;
  last_updated: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  status: string;
  duration: string;
  key_results: Record<string, string>;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  data_file: string;
}

export interface ProjectData {
  [key: string]: any;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  excerpt: string;
}

export interface SearchResult {
  snippet: string;
  source: string;
  score: number;
  context: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  tech_stack: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'Programming' | 'ML/AI' | 'Tools' | 'Cloud' | 'Other';
}
