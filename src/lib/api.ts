// API service for chat functionality
import { mockChatHistory } from "./mockData";
import { Recommendation } from "@/stores/chatStore";

const API_BASE_URL = "http://localhost:3000/api";

export interface ChatHistoryResponse {
  id: string;
  sessionId: string; // Unique session identifier for API requests
  title: string;
  messages: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageRequest {
  session_id: string;
  message: {
    role: "user" | "assistant";
    content: string;
    metadata: {
      source: string;
      platform: string;
    };
  };
  user_id: string;
}

export interface ChatMessageResponse {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  recommendations?: Recommendation[];
}

export const chatApi = {
  // Get all chat threads for a user
  getChatHistory: async (userId: string): Promise<ChatHistoryResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("response", data);

      // Ensure we always return an array
      if (!Array.isArray(data)) {
        console.warn("API response is not an array:", data);
        return [];
      }

      return data;
    } catch (error) {
      console.error(
        "Error fetching chat history from API, using mock data:",
        error
      );

      // Fallback to mock data for development/testing
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockChatHistory);
        }, 1000); // Simulate network delay
      });
    }
  },

  // Send a message to the chat API
  sendMessage: async (
    request: ChatMessageRequest
  ): Promise<ChatMessageResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};
