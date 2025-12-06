import React from 'react';
import clsx from 'clsx';
import styles from './ChatbotWidget.module.css';
import SourceCitation from './SourceCitation'; // Assuming SourceCitation.tsx

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  citations?: any[]; // Adjust as per your citation structure
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={clsx(isUser ? styles.chatbotMessageUser : styles.chatbotMessageAi)}>
      {!isUser && (
        <div className={styles.chatbotAvatar}></div>
      )}
      <div className={clsx(isUser ? styles.chatbotMessageUserBubble : styles.chatbotMessageAiBubble)}>
        <p className={styles.messageText}>{message.text}</p>
        {message.citations && message.citations.length > 0 && (
          <div className={styles.citationsContainer}>
            {message.citations.map((citation, index) => (
              <SourceCitation key={index} citation={citation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
