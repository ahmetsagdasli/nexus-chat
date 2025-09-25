import React from 'react';
import { Message } from '../types';
import { FormattedText } from './FormattedText';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-content">
        <div className="message-header">
          <span className="message-role">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="message-time">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="message-text">
          <FormattedText text={message.content} />
        </div>
      </div>
    </div>
  );
};