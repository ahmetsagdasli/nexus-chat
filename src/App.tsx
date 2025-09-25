import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ThemeToggle } from './components/ThemeToggle';
import { ModelSelector } from './components/ModelSelector';
import { useChat } from './hooks/useChat';
import { AIModel } from './types';
import './App.css';

function App() {
  const { messages, isLoading, sendMessage, clearChat, getAIStatus, changeModel } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiStatus, setAiStatus] = useState(() => getAIStatus());

  const handleModelChange = (model: AIModel) => {
    changeModel(model);
    // Update the status to reflect the change immediately
    setTimeout(() => {
      setAiStatus(getAIStatus());
    }, 0);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>Agent Tool - AI Chat</h1>
          <div className="ai-status">
            <span className={`status-indicator ${aiStatus.isUsingRealAI ? 'real' : 'simulated'}`}>
              {aiStatus.isUsingRealAI ? '🤖 OpenAI' : '🎭 Simulated'}
            </span>
            <span className="model-name">{aiStatus.model}</span>
          </div>
        </div>
        <div className="header-right">
          <ModelSelector
            currentModel={aiStatus.model}
            onModelChange={handleModelChange}
            isUsingRealAI={aiStatus.isUsingRealAI}
          />
          <ThemeToggle />
          <button onClick={clearChat} className="clear-button">
            Clear Chat
          </button>
        </div>
      </header>

      <main className="chat-container">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to Agent Tool</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-indicator-content">
                <span className="typing-text">AI Assistant is thinking</span>
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer>
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
}

export default App;