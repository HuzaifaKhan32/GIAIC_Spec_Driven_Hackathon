// ChatUI.tsx
import React, { useState, FormEvent } from 'react';
import styles from './ChatbotWidget.module.css';
import MessageBubble from './MessageBubble'; // IMPORTANT: This component needs your class updates

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  citations?: any[];
}

interface ChatProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

// --- Component 1: The Fixed Input Footer ---
export const ChatInput: React.FC<Pick<ChatProps, 'onSendMessage' | 'isLoading'>> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className={styles.chatInputArea}>
      <form onSubmit={handleSubmit} className={styles.inputWrapper}>
        <input 
          className={styles.inputField} 
          placeholder="Ask about AI & Robotics..." 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <button 
          className={styles.sendButton} 
          title="Send Message" 
          type="submit" 
          disabled={!inputText.trim() || isLoading}
        >
          {/* Using the Material Symbols icon for Send */}
          <span className="material-symbols-outlined"> send </span>
        </button>
      </form>
    </div>
  );
};

// --- Component 2: The Scrollable Messages Area ---
export const PureChatMessages: React.FC<Pick<ChatProps, 'messages' | 'isLoading' | 'messagesEndRef'>> = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className={styles.chatbotMessages}>
      {messages.map((msg) => (
        // NOTE: MessageBubble is where the user/ai alignment bug exists. 
        // You MUST update the classes inside MessageBubble.tsx 
        // to use the new CSS classes (.userMessageContainer, .aiMessageContainer).
        <MessageBubble key={msg.id} message={msg} /> 
      ))}

      {isLoading && (
        // Typing Indicator using the new structure and classes
        <div className={styles.aiMessageContainer}>
          {/* Placeholder for AI Avatar - using a generic image for now */}
          <div 
            className={styles.aiAvatarSmall} 
            style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxw5QY5rtA0J3OY2RADQR3TyStdAJ6lb7jm0ADaBd0le7MA__azrXUeeDqv4C8yhzcmDEHG_MdSGqujIt9Wybd5-VQ7bW-dEUnu0yzPhO-p8wB7-ax94py9BmAcO8WzBjPA_JCTxUXyULXJ3T0JCLZZHMBIhtNwLWLPxIIWsjt56-FcF0rkc9WkEzEHKALiA2-DQ4TYZrN9NvZVjBTyS8iZH4YWlSr7nveVE2yCumoqMDJBQnxcJKlRTLd4ut1YLhAFLu7GXV_DC16")`}} 
            data-alt="AI assistant avatar"
          />
          <div className={styles.typingIndicator}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} /> {/* Scroll to bottom anchor */}
    </div>
  );
};