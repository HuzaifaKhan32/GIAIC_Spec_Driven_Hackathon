import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ChatbotWidget.module.css';

interface InputFieldProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.chatbotInputArea}>
      <div className={styles.chatbotInputWrapper}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Ask about AI & Robotics..."
          className={styles.chatbotInputField}
          disabled={isLoading}
        />
        <button type="submit" className={styles.chatbotSendButton} disabled={isLoading}>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
};

export default InputField;
