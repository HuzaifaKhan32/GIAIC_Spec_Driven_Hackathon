import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
//  // Removed
import styles from './ChatbotWidget.module.css';
import ChatUI from './ChatUI';
import { sendMessageToRAG } from '../../services/chatService';
import useLocalStorage from '../../hooks/useLocalStorage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  citations?: any[];
}

// Removed ChatbotWidgetProps interface as colorMode is now internal

interface ChatbotWidgetProps {
  backendUrl: string; // New prop for backend URL
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ backendUrl }) => { // Modified signature
  // const { colorMode } = useColorMode(); // Removed
  const [internalColorMode, setInternalColorMode] = useState<'light' | 'dark'>('light'); // Internal colorMode state
  const [isClient, setIsClient] = useState(false); // Custom state for client-side check
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('chatbot_messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined'); // Set to true if window object exists
  }, []);

  // Effect to listen for changes in html[data-theme] attribute
  useEffect(() => {
    if (!isClient) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setInternalColorMode(document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light');
        }
      });
    });

    // Observe the html element for attribute changes
    observer.observe(document.documentElement, { attributes: true });

    // Set initial color mode
    setInternalColorMode(document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light');

    return () => observer.disconnect();
  }, [isClient]); // Only run once on client mount

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isClient && messages.length === 0) { // Only set welcome message in browser
      setMessages([{ 
        id: 'ai-welcome', 
        text: "Welcome! I can help you with topics from the Physical AI & Humanoid Robotics book. Feel free to ask me anything about machine learning, neural networks, or specific chapters.", 
        sender: 'ai' 
      }]);
    }
  }, [isClient, messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(1).map(msg => ({ user: msg.sender === 'user' ? msg.text : '', ai: msg.sender === 'ai' ? msg.text : '' }));
      const response = await sendMessageToRAG(text, chatHistory, backendUrl);
      
      const newAiMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        text: response.response, 
        sender: 'ai', 
        citations: response.citations 
      };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error sending message to RAG backend:', error);
      setMessages((prev) => [...prev, { 
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

  if (!isClient) { // Do not render on server side
    return null;
  }

  return (
    <div className={clsx(styles.chatbotContainer, { [styles.open]: isOpen })}>
      <div className={styles.chatbotFab} onClick={toggleChatbot}>
        <span className={clsx('material-symbols-outlined', styles.fabIcon)}>
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </div>

      <div className={clsx(styles.chatPanel, { [styles.dark]: internalColorMode === 'dark' })}>
        <div className={styles.chatPanelHeader}>
          <div className={styles.chatPanelHeaderInfo}>
            <div className={styles.chatbotAvatar}></div>
            <div className={styles.chatbotStatusIndicator}></div>
            <div className={styles.chatbotHeaderText}>
              <p className={styles.chatbotAssistantName}>AI Book Assistant</p>
              <p className={styles.chatbotAssistantStatus}>Powered by Gemini</p>
            </div>
          </div>
          <div className={styles.chatPanelHeaderActions}>
            <button onClick={toggleChatbot} className={styles.headerActionButton}>
              <span className="material-symbols-outlined"> {isOpen ? 'remove' : 'smart_toy'} </span>
            </button>
          </div>
        </div>

        <ChatUI messages={messages} isLoading={isLoading} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatbotWidget;