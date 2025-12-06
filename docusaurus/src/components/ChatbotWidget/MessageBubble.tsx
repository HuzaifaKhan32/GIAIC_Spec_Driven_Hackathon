// MessageBubble.tsx (Corrected)
import React from 'react';
import clsx from 'clsx';
import styles from './ChatbotWidget.module.css';
import SourceCitation, { Citation } from './SourceCitation'; // Import Citation type

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

  // Determine the primary container class for alignment (flex-start or flex-end)
  const containerClass = isUser ? styles.userMessageContainer : styles.aiMessageContainer;
  
  // Determine the bubble style class
  const bubbleClass = isUser ? styles.userMessageBubble : styles.aiMessageBubble;

  return (
    <div className={containerClass}>
      
      {/* --- AI Avatar (Visible only for AI messages) ---
        The new design places the AI avatar inside the container.
      */}
      {!isUser && (
        <div 
          className={styles.aiAvatarSmall} 
          // Placeholder image URL
          style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1x22Wm0HzaMDHm0ziR2M1qKD83kMtdWxMGgE0r8AHAvEJkwiPcicT8LDvxgGNdEvTT8oojV2NOYyVb4YnHI2zyjhnI8b9qOqJVtzQ3EZFBcxyVFSGiX8UdQ7BSrUeiiP7Qw9RkGwIY-wlOW5OMnlNpA1HVNbu8pjYcOaiumaQiV7CK2pwxG2lJeiN6tLTDcdngGjT-oAMZK6zVzGvoyh0FG5dbFG2Rv49EMXf6vUB_05m8JoOrZ-SsX3bfp6hyUEPyrYzr1SMQ_Sh")`}} 
          data-alt="AI assistant avatar"
        />
      )}

      {/* --- Message Content --- */}
      <div className={clsx(styles.messageBubble, bubbleClass)}>
        <p className={styles.messageText}>{message.text}</p>
        
        {/* --- Citations --- */}
        {message.citations && message.citations.length > 0 && (
          <div className={styles.citationsContainer}>
            {/* The new Tailwind design uses a small, inline button for citations.
              We'll wrap the SourceCitation component with the button style class 
              from the CSS module to apply the correct gradient/look.
            */}
            {message.citations.map((citation, index) => (
              <button key={index} className={styles.aiCitationButton}>
                {/* Assuming SourceCitation renders the text (e.g., Ch. 4, Pg. 98) */}
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