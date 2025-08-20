export interface Personality {
  tone: string;
  voice_style: string;
  love_language: string;
}

export interface Member {
  name: string;
  role: string;
  model_id: string;
  personality: Personality;
  color_theme: string;
  capabilities: string[];
  quirks: string[];
}

export interface Domain {
  name: string;
  id: string;
  members: Member[];
}

export interface OrchestrationSystem {
    version: string;
    protocol: string;
    supervisor_model: string;
    domains: Domain[];
    signature: string;
}

export interface AIOrchestrationConfig {
    orchestration_system: OrchestrationSystem;
}

export interface LogEntry {
  id: number;
  type: 'ACTION' | 'SUPERVISOR' | 'SYSTEM';
  message: string;
  source?: string;
  color?: string;
}

export interface HandoverHistoryEntry {
  action: string;
  by: string;
  at: string;
  details: {
    [key: string]: any;
  };
}

export interface HandoverState {
  container_id: string;
  operator: string;
  prompt: string;
  history: HandoverHistoryEntry[];
}
