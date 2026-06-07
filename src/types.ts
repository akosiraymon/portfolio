export type StepType = 'trigger' | 'action' | 'ai' | 'database' | 'notification' | 'api' | 'finance' | 'crm' | 'email' | 'file';

export interface WorkflowStep {
  label: string;
  type: StepType;
  details?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  workflow: WorkflowStep[];
  stack: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bullets: string[];
  tools: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
