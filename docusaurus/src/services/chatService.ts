import { Message } from '../components/ChatbotWidget/ChatbotWidget'; // Assuming your Message interface
import { Citation } from '../../backend/main'; // Import Citation interface from backend (or redefine)

interface ChatAPIRequest {
  query: string;
  chat_history?: Array<{ user: string; ai: string }>;
}

interface ChatAPIResponse {
  response: string;
  citations?: Citation[];
}

export const sendMessageToRAG = async (query: string, chatHistory: Array<{ user: string; ai: string }> = [], backendUrl: string): Promise<ChatAPIResponse> => {
  try {
    const response = await fetch(`${backendUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, chat_history: chatHistory }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch response from backend');
    }

    const data: ChatAPIResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error in chatService:', error);
    throw error;
  }
};
