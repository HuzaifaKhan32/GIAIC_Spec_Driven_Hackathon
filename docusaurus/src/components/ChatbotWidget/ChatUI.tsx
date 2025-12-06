import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import MessageBubble from './MessageBubble'; // Assuming MessageBubble.tsx
import InputField from './InputField'; // Assuming InputField.tsx
import styles from './ChatbotWidget.module.css';

interface ChatUIProps {
  messages: Array<{ id: string; text: string; sender: 'user' | 'ai'; citations?: any[] }>;
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatUI: React.FC<ChatUIProps> = ({ messages, isLoading, onSendMessage, messagesEndRef }) => {
  return (
    <div className={styles.chatbotMessages}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className={clsx(styles.chatbotMessageAi, "typing-indicator")}>
          <div className={styles.chatbotAvatar}></div>
          <div className={styles.typingIndicator}>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} /> {/* Scroll to bottom */}
      <InputField onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatUI;