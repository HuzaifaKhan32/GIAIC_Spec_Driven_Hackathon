// ChatbotWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
// Import icons
import { FaTimes, FaTrash } from 'react-icons/fa' 
import styles from './ChatbotWidget.module.css';
// Import the split components from ChatUI
import { PureChatMessages, ChatInput } from './ChatUI';
// Assuming these are defined in your project
import { sendMessageToRAG } from '../../services/chatService';
import useLocalStorage from '../../hooks/useLocalStorage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  citations?: any[];
}

interface ChatbotWidgetProps {
  backendUrl: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ backendUrl }) => {
  const [internalColorMode, setInternalColorMode] = useState<'light' | 'dark'>('light');
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // useLocalStorage handles reading from localStorage on mount and writing on update
  const [messages, setMessages] = useLocalStorage<Message[]>('chatbot_messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  // Docusaurus Dark Mode Listener
  useEffect(() => {
    if (!isClient) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setInternalColorMode(document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    setInternalColorMode(document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light');

    return () => observer.disconnect();
  }, [isClient]);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial Welcome Message
  useEffect(() => {
    if (isClient && messages.length === 0) {
      setMessages([{
        id: 'ai-welcome',
        text: "Welcome! I can help you with topics from the Physical AI & Humanoid Robotics book. Feel free to ask me anything about machine learning, neural networks, or specific chapters.",
        sender: 'ai'
      }]);
    }
  }, [isClient, messages]);

  const handleClearMessages = () => {
    // 1. Clear the item from the browser's localStorage
    localStorage.removeItem('chatbot_messages');

    // 2. Clear the current state in React and add the welcome message back.
    setMessages([{
      id: 'ai-welcome',
      text: "Welcome! I can help you with topics from the Physical AI & Humanoid Robotics book. Feel free to ask me anything about machine learning, neural networks, or specific chapters.",
      sender: 'ai'
    }]);

    console.log('Chat history cleared.');
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    
    // 1. Immediately update state with user message AND save the history payload.
    // We use the functional form for the first update.
    setMessages((prev) => {
      // The user message is now guaranteed to be in the state.
      return [...prev, newUserMessage];
    });
    
    setIsLoading(true);

    try {
      // CRITICAL: We pass the text itself and use the "stale" `messages` array for history.
      // This is often fine because RAG systems typically only need the past N turns,
      // and the current user query is passed separately as `text`.
      const chatHistory = messages.slice(1).map(msg => ({ user: msg.sender === 'user' ? msg.text : '', ai: msg.sender === 'ai' ? msg.text : '' }));
      
      // In a real-world app, you might construct the history like this for guaranteed freshness:
      // const currentHistory = [...messages, newUserMessage].slice(1).map(...)
      
      const response = await sendMessageToRAG(text, chatHistory, backendUrl);

      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'ai',
        citations: response.citations
      };
      
      // 2. GUARANTEED FIX: Use the functional update form *again* for the AI response.
      // This ensures that the AI message is appended to the *latest* state array, 
      // which React has already updated with the user message, regardless of how 
      // long the API call took or how slow useLocalStorage is.
      setMessages((prev) => [...prev, newAiMessage]);
      
    } catch (error) {
      console.error('Full error object:', error);
      setMessages((prev) => [...prev, { // Use functional form here too!
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong. Please try again later.",
        sender: 'ai'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className={clsx(styles.chatbotContainer, { [styles.open]: isOpen })}>

      {/* Chat Panel - Uses flex-direction: column in CSS */}
      <div className={styles.chatPanel}>

        {/* Header (Fixed height) */}
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.avatarWrapper}>
              <div
                className={styles.aiAvatar}
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuALPj6PzlxLmIO_-_1UapXXP6CquTzECxOqKfJXVakHc5qKWP7d-YU79vYkEIQMJ5VKLyDJeV6jdxzNrvsxIIUUe8x3yacfCBd_xvmCTw_c3qXEZn0v5SJWGCWICPWI2bXe02TKJ4DMiGYIH1HF-GhLmwxf1l0RSTeqbvOVPg84qULdeEsjkdvPlPsNHTk7DoMolqQDnvNnFYSQFcNG9rK4cQCR61K35O6BWlb7ENfC3-nrkx8xMpsV4ZX7glKCwtWIda8FYKui1Lpa")` }}
                data-alt="AI assistant avatar"
              />
              <div className={styles.onlineIndicator} />
            </div>
            <div className={styles.headerText}>
              <p className={styles.headerTitle}>AI Book Assistant</p>
              <p className={styles.headerSubtitle}>Powered by Gemini</p> {/* Added back for design */}
            </div>
          </div>
          <div className={styles.headerActions}>
            
            {/* Clear History Button (Fixed JSX) */}
            <button className={styles.headerActionButton} onClick={handleClearMessages} title="Clear History">
              <FaTrash />
            </button>
            
            {/* Close Chat Button */}
            <button className={styles.headerActionButton} onClick={toggleChatbot} title="Close Chat">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Messages Area (Scrollable - uses flex-grow: 1 in CSS) */}
        <PureChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        {/* Input Area (Fixed height footer) */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>

      {/* Floating Action Button (FAB) */}
      <div className={styles.chatbotFab} onClick={toggleChatbot}>
        <button className={styles.fabButton} title="Open Chatbot">
          {/* Using the desired 🤖 emoji */}
          🤖
        </button>
      </div>

    </div>
  );
};

export default ChatbotWidget;