export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export type AIModel = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo-preview';

export interface AIModels {
  [key: string]: {
    name: string;
    description: string;
  };
}

export const AVAILABLE_MODELS: AIModels = {
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most tasks'
  },
  'gpt-4': {
    name: 'GPT-4',
    description: 'More capable, slower and more expensive'
  },
  'gpt-4-turbo-preview': {
    name: 'GPT-4 Turbo',
    description: 'Latest GPT-4 with improved capabilities'
  }
};