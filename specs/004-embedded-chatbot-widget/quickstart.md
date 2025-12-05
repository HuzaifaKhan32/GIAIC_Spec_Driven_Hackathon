# Quickstart: Embedded Chatbot Widget - React Component

This document outlines how to quickly integrate and use the Embedded Chatbot Widget (React Component) within the Docusaurus site.

## 1. Prerequisites

-   **Backend API**: The RAG Chatbot Backend (`003-rag-chatbot-backend`) must be deployed and accessible.
-   **Theme System**: The Custom CSS Theme System (`005-custom-css-theme-system`) must be implemented to provide styling for the widget.

## 2. Integration into Docusaurus

The chatbot widget is a React component designed to be embedded directly into Docusaurus Markdown (`.mdx`) files.

### Step 1: Place the Component

Create the React component file(s) within your Docusaurus project. A recommended path is `docusaurus/src/components/ChatbotWidget/index.tsx`.

```tsx
// docusaurus/src/components/ChatbotWidget/index.tsx
import React, { useState, useEffect } from 'react';
import { useChatSession } from '../../hooks/useChatSession'; // Custom hook for session management
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import styles from './ChatbotWidget.module.css'; // Using CSS Modules for component-scoped styles

const ChatbotWidget: React.FC = () => {
  const { messages, sendMessage, isLoading, error, clearHistory } = useChatSession();
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <ChatWindow messages={messages} />
      {isLoading && <TypingIndicator />}
      {error && <div className={styles.error}>{error}</div>}
      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSend={handleSendMessage}
        isDisabled={isLoading}
      />
      <button onClick={clearHistory} className={styles.clearButton}>
        Clear Chat
      </button>
    </div>
  );
};

export default ChatbotWidget;
```

### Step 2: Embed in MDX

You can now embed this component into any `.mdx` file.

```mdx
---
title: My Chapter with Chatbot
---

import ChatbotWidget from '@site/src/components/ChatbotWidget';

# Welcome to My Chapter

This is some content for my chapter.

## Ask the Chatbot!

<ChatbotWidget />

More content here...
```

### Step 3: Custom Hooks

Implement the `useChatSession` hook to manage client-side state, API calls, and session persistence.

```typescript
// docusaurus/src/hooks/useChatSession.ts
import { useState, useEffect, useCallback } from 'react';
// Import types for Message, Source from shared types or backend contracts

const CHAT_API_URL = '/api/chat/query'; // Replace with actual backend URL
const CHAT_HISTORY_URL = '/api/chat/history';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  sources?: Source[];
  timestamp: string;
}

interface Source {
  chapter: string;
  section: string;
}

interface ChatSessionState {
  session_id: string;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export const useChatSession = () => {
  const [state, setState] = useState<ChatSessionState>({
    session_id: localStorage.getItem('chatbot_session_id') || `session-${Date.now()}`,
    messages: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    localStorage.setItem('chatbot_session_id', state.session_id);
    // Load history on mount
    const loadHistory = async () => {
      // ... API call to GET /chat/history ...
      // Update state.messages
    };
    loadHistory();
  }, [state.session_id]); // Dependency array to run once on mount or session_id change

  const sendMessage = useCallback(async (query: string, selectedText?: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const userMessage: ChatMessage = {
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, messages: [...prev.messages, userMessage] }));

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if available (e.g., from Better-Auth cookies)
        },
        body: JSON.stringify({
          query,
          session_id: state.session_id,
          selected_text: selectedText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get response from chatbot');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        sender: 'assistant',
        text: data.response,
        sources: data.sources,
        timestamp: new Date().toISOString(),
      };
      setState((prev) => ({ ...prev, messages: [...prev.messages, assistantMessage] }));
    } catch (err: any) {
      console.error('Chat API error:', err);
      setState((prev) => ({ ...prev, error: err.message || 'An unexpected error occurred.' }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [state.session_id]);

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, messages: [], session_id: `session-${Date.now()}` }));
    localStorage.setItem('chatbot_session_id', `session-${Date.now()}`); // Generate new session ID
  }, []);

  return {
    messages: state.messages,
    sendMessage,
    isLoading: state.isLoading,
    error: state.error,
    clearHistory,
    session_id: state.session_id,
  };
};
```

### Step 4: Styling Integration

The chatbot widget will pick up its styling from `docusaurus/src/css/chatbot.css`, which is part of the custom CSS theme system. Ensure this file is correctly linked in your Docusaurus configuration.

### Step 5: Backend API Contracts

The widget interacts with the following backend API endpoints (defined in `003-rag-chatbot-backend`):

-   `POST /chat/query`: To send user messages and receive chatbot responses.
-   `GET /chat/history`: To retrieve past conversation history.
-   `GET /health`: For optional health checks (e.g., to indicate chatbot availability).

Refer to the OpenAPI specifications generated for `003-rag-chatbot-backend` for detailed contract definitions.
