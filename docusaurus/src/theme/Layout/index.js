/**
 * src/theme/Layout/index.js
 *
 * A safe, global Layout wrapper for Docusaurus to inject the ChatbotWidget.
 *
 * This component wraps the original Docusaurus Layout and adds a globally-visible
 * chatbot, complete with error boundaries and hydration safety.
 */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import OriginalLayout from '@theme-original/Layout';
import styles from './layout.module.css';

// Lazy load the ChatbotWidget for better initial page performance
const ChatbotWidget = lazy(() => import('@site/src/components/ChatbotWidget/ChatbotWidget'));

/**
 * A simple React Error Boundary component.
 * Catches JavaScript errors in its child component tree, logs those errors,
 * and displays a fallback UI instead of crashing the whole page.
 */
class ChatbotErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ChatbotWidget failed to render:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // Returning null will render nothing, effectively hiding the chatbot on error.
      return null;
    }

    return this.props.children;
  }
}

/**
 * A wrapper for the Chatbot that handles SSR hydration issues.
 * The Chatbot is only rendered on the client-side after the component has mounted.
 */
const SafeChatbot = () => {
  const [isClient, setIsClient] = useState(false);

  // useEffect runs only on the client, so we can safely set isClient to true.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing on the server
    return null;
  }

  return (
    <div 
      className={styles.chatbotContainer} 
      role="complementary" 
      aria-label="Chatbot"
    >
      <ChatbotErrorBoundary>
        <Suspense fallback={<div className={styles.chatbotLoading}>Loading...</div>}>
          <ChatbotWidget />
        </Suspense>
      </ChatbotErrorBoundary>
    </div>
  );
};


/**
 * The main Layout wrapper.
 * It renders the original Docusaurus layout and injects the SafeChatbot component
 * globally on all pages.
 */
export default function Layout(props) {
  return (
    <>
      {/* The original layout is rendered with all its props */}
      <OriginalLayout {...props} />
      
      {/* 
        A try-catch block is used here as a final layer of safety. If an error
        occurs during the initial synchronous render of SafeChatbot (unlikely, but possible),
        it prevents a full app crash. The component will simply not be rendered.
      */}
      {(() => {
        try {
          return <SafeChatbot />;
        } catch (error) {
          console.error("A critical error occurred while trying to render the SafeChatbot wrapper:", error);
          return null;
        }
      })()}
    </>
  );
}
