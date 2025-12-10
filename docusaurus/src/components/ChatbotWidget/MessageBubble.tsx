// MessageBubble.tsx
import React from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown'; // Ensure this is imported
import remarkGfm from 'remark-gfm'; // Ensure this is imported
import styles from './ChatbotWidget.module.css';
import SourceCitation, { Citation } from './SourceCitation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  citations?: Citation[];
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const containerClass = isUser ? styles.userMessageContainer : styles.aiMessageContainer;
  const bubbleClass = isUser ? styles.userMessageBubble : styles.aiMessageBubble;

  return (
    <div className={containerClass}>
      {!isUser && (
        <div 
          className={styles.aiAvatarSmall} 
          style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1x22Wm0HzaMDHm0ziR2M1qKD83kMtdWxMGgE0r8AHAvEJkwiPcicT8LDvxgGNdEvTT8oojV2NOYyVb4YnHI2zyjhnI8b9qOqJVtzQ3EZFBcxyVFSGiX8UdQ7BSrUeiiP7Qw9RkGwIY-wlOW5OMnlNpA1HVNbu8pjYcOaiumaQiV7CK2pwxG2lJeiN6tLTDcdngGjT-oAMZK6zVzGvoyh0FG5dbFG2Rv49EMXf6vUB_05m8JoOrZ-SsX3bfp6hyUEPyrYzr1SMQ_Sh")`}} 
          data-alt="AI assistant avatar"
        />
      )}
      <div className={clsx(styles.messageBubble, bubbleClass)}>
        <div className={styles.messageText}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
        </div>
        {message.citations && message.citations.length > 0 && (
          <div className={styles.citationsContainer}>
            {message.citations.map((citation, index) => (
              <button key={index} className={styles.aiCitationButton}>
                <SourceCitation citation={citation} /> 
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
