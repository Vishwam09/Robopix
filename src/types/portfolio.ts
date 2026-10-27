export type ProjectCategory = 
  | 'ALL'
  | 'AI_AUTOMATION'
  | 'HARDWARE_ROBOTICS'
  | 'WEB_PLATFORMS'
  | 'MOBILE_APPS'
  | 'AI_ASSISTANTS'
  | 'PRODUCTIVITY_EXPERIMENTAL';

export type ProjectStatus = 'LIVE' | 'PROTOTYPE' | 'IN DEV';

export type ThemeVariant = 'light' | 'lime' | 'dark';

export type DemoType = 
  | 'lead_finder' 
  | 'outreach' 
  | 'agribot' 
  | 'gamepad' 
  | 'html_viewer' 
  | 'jarvis' 
  | 'alarm' 
  | 'kaam_mitra'
  | 'construction'
  | 'robopix_core';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  sysId: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  purpose: string;
  summary: string;
  description: string;
  techStack: string[];
  architectureHighlights: string[];
  metrics: ProjectMetric[];
  themeVariant: ThemeVariant;
  featured: boolean;
  demoType: DemoType;
  operationalNode: string;
  dateCreated: string;
  liveUrl?: string;
  repoIdentifier: string;
}

export interface ConsultationFormData {
  fullName: string;
  emailOrPhone: string;
  serviceCategory: string;
  budgetTier: string;
  timeline: string;
  projectOverview: string;
}

export type VisualMode = 'bento' | 'grid' | 'table';
export type DesignSystemTheme = 'lime' | 'flight';
