import { useState, useCallback, useMemo } from 'react';
import { Message, ChatState, AIModel } from '../types';
import { AIService } from '../services/aiService';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const [currentModel, setCurrentModel] = useState<AIModel>('gpt-3.5-turbo');
  const aiService = useMemo(() => new AIService(), []);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    addMessage('user', content);
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Get conversation history for context
      const conversationHistory = state.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Generate AI response using the service
      const response = await aiService.generateResponse(content, conversationHistory);
      addMessage('assistant', response);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [addMessage, aiService, state.messages]);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
    });
  }, []);

  const getAIStatus = useCallback(() => {
    return {
      isUsingRealAI: aiService.isUsingRealAI(),
      model: currentModel,
    };
  }, [aiService, currentModel]);

  const changeModel = useCallback((model: AIModel) => {
    aiService.setModel(model);
    setCurrentModel(model);
  }, [aiService]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    sendMessage,
    clearChat,
    getAIStatus,
    changeModel,
  };
};