import OpenAI from 'openai';
import { AIModel } from '../types';

export interface AIServiceConfig {
  apiKey?: string;
  model?: AIModel;
  temperature?: number;
}

export class AIService {
  private config: AIServiceConfig;
  private openai: OpenAI | null = null;
  private useRealAPI: boolean = false;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      ...config,
    };

    // Initialize OpenAI client if API key is available
    const apiKey = config.apiKey || import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey && apiKey.startsWith('sk-')) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
      });
      this.useRealAPI = true;
    }
  }

  async generateResponse(message: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    if (this.useRealAPI && this.openai) {
      return await this.generateOpenAIResponse(message, conversationHistory);
    } else {
      // Fallback to simulated responses
      await this.simulateDelay();
      const responses = this.getContextualResponse(message, conversationHistory);
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  private async generateOpenAIResponse(message: string, conversationHistory: Array<{role: string, content: string}>): Promise<string> {
    try {
      // Prepare messages for OpenAI API
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses to user questions.'
        }
      ];

      // Add conversation history (limit to last 10 messages to avoid token limits)
      const recentHistory = conversationHistory.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          });
        }
      }

      // Add current message
      messages.push({
        role: 'user',
        content: message
      });

      const completion = await this.openai!.chat.completions.create({
        model: this.config.model || 'gpt-3.5-turbo',
        messages: messages,
        temperature: this.config.temperature || 0.7,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Fallback to simulated response on error
      await this.simulateDelay();
      return 'I encountered an issue connecting to the AI service. Please try again.';
    }
  }

  private async simulateDelay(): Promise<void> {
    const delay = Math.random() * 1500 + 500; // 500-2000ms delay
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  private getContextualResponse(message: string, _history: Array<{role: string, content: string}>): string[] {
    const lowerMessage = message.toLowerCase();

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return [
        "Hello! How can I help you today?",
        "Hi there! What can I assist you with?",
        "Hey! I'm here to help. What's on your mind?",
      ];
    }

    // Question responses
    if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why')) {
      return [
        "That's a great question! Let me think about this...",
        "I'd be happy to help you understand that better.",
        "Here's what I know about that topic...",
        "Let me break this down for you step by step.",
      ];
    }

    // Help requests
    if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
      return [
        "I'm here to help! What specific area would you like assistance with?",
        "Of course! I'd be glad to assist you. Can you provide more details?",
        "I'm ready to help. What do you need support with?",
      ];
    }

    // Technical topics
    if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('develop')) {
      return [
        "Programming is fascinating! What language or technology are you working with?",
        "I love discussing code! What development challenge are you facing?",
        "Development can be tricky. What specific coding issue can I help you with?",
      ];
    }

    // AI/ML topics
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial') || lowerMessage.includes('machine learning')) {
      return [
        "AI is an exciting field! What aspect of artificial intelligence interests you most?",
        "Machine learning has so many applications. What specific area would you like to explore?",
        "I'd be happy to discuss AI concepts with you. What would you like to know?",
      ];
    }

    // Default responses
    return [
      "That's interesting! Can you tell me more about what you're thinking?",
      "I understand. How can I help you with this?",
      "Thanks for sharing that. What would you like to explore further?",
      "I see what you mean. Let me provide some thoughts on this.",
      "That's a good point. Here's my perspective on the matter.",
    ];
  }

  // Method to check if real AI is being used
  isUsingRealAI(): boolean {
    return this.useRealAPI;
  }

  // Get current AI model name
  getCurrentModel(): AIModel {
    return this.config.model || 'gpt-3.5-turbo';
  }

  // Set AI model
  setModel(model: AIModel): void {
    this.config.model = model;
  }

  // Method to configure real AI service
  async configureRealAI(apiKey: string, model: AIModel = 'gpt-3.5-turbo'): Promise<boolean> {
    this.config.apiKey = apiKey;
    this.config.model = model;

    if (apiKey && apiKey.startsWith('sk-')) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      this.useRealAPI = true;
      return true;
    }

    return false;
  }
}