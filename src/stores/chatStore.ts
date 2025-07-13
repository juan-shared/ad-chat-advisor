import { create } from "zustand";
import { ChatHistoryResponse } from "@/lib/api";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  recommendations?: Recommendation[];
}

export interface Recommendation {
  id: string;
  title: string;
  summary: string;
  mediaUrl?: string;
  cta: string;
  relevanceScore?: number;
  // New product recommendation fields
  image?: string;
  url?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
  description?: string;
  companyName?: string;
  price?: string;
  rating?: number;
  type?: 'product' | 'service' | 'creator';
}

export interface ChatSession {
  id: string;
  sessionId: string; // Unique session identifier for API requests
  title: string;
  messages: ChatMessage[];
  recommendations: Recommendation[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatStore {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  userId: string | null;

  // Actions
  createSession: (title?: string) => void;
  switchSession: (sessionId: string) => void;
  addMessage: (content: string, role: "user" | "assistant") => void;
  updateLastMessage: (content: string) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setMessageRecommendations: (
    messageId: string,
    recommendations: Recommendation[]
  ) => void;
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  deleteSession: (sessionId: string) => void;
  setUserId: (userId: string) => void;
  loadChatHistory: (chatHistory: ChatHistoryResponse[]) => void;
}

const generateId = () => crypto.randomUUID();

export const useChatStore = create<ChatStore>((set, get) => ({
  currentSession: null,
  sessions: [],
  isLoading: false,
  isStreaming: false,
  error: null,
  userId: null,

  createSession: (title = "Nova Conversa") => {
    const session: ChatSession = {
      id: generateId(),
      sessionId: generateId(), // Generate a unique sessionId for API requests
      title,
      messages: [],
      recommendations: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      currentSession: session,
      sessions: [session, ...state.sessions],
    }));
  },

  switchSession: (sessionId) => {
    const session = get().sessions.find((s) => s.id === sessionId);
    if (session) {
      set({ currentSession: session });
    }
  },

  addMessage: (content, role) => {
    const message: ChatMessage = {
      id: generateId(),
      content,
      role,
      timestamp: new Date(),
    };

    set((state) => {
      if (!state.currentSession) return state;

      const updatedSession = {
        ...state.currentSession,
        messages: [...state.currentSession.messages, message],
        updatedAt: new Date(),
      };

      return {
        currentSession: updatedSession,
        sessions: state.sessions.map((s) =>
          s.id === updatedSession.id ? updatedSession : s
        ),
      };
    });
  },

  updateLastMessage: (content) => {
    set((state) => {
      if (!state.currentSession || state.currentSession.messages.length === 0) {
        return state;
      }

      const messages = [...state.currentSession.messages];
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.role === "assistant") {
        lastMessage.content = content;
      }

      const updatedSession = {
        ...state.currentSession,
        messages,
        updatedAt: new Date(),
      };

      return {
        currentSession: updatedSession,
        sessions: state.sessions.map((s) =>
          s.id === updatedSession.id ? updatedSession : s
        ),
      };
    });
  },

  setRecommendations: (recommendations) => {
    set((state) => {
      if (!state.currentSession) return state;

      const updatedSession = {
        ...state.currentSession,
        recommendations,
        updatedAt: new Date(),
      };

      return {
        currentSession: updatedSession,
        sessions: state.sessions.map((s) =>
          s.id === updatedSession.id ? updatedSession : s
        ),
      };
    });
  },

  setMessageRecommendations: (messageId, recommendations) => {
    set((state) => {
      if (!state.currentSession) return state;

      const messages = state.currentSession.messages.map((msg) =>
        msg.id === messageId ? { ...msg, recommendations } : msg
      );

      const updatedSession = {
        ...state.currentSession,
        messages,
        updatedAt: new Date(),
      };

      return {
        currentSession: updatedSession,
        sessions: state.sessions.map((s) =>
          s.id === updatedSession.id ? updatedSession : s
        ),
      };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setStreaming: (streaming) => set({ isStreaming: streaming }),

  setError: (error) => set({ error }),

  clearChat: () => {
    set((state) => {
      if (!state.currentSession) return state;

      const clearedSession = {
        ...state.currentSession,
        messages: [],
        recommendations: [],
        updatedAt: new Date(),
      };

      return {
        currentSession: clearedSession,
        sessions: state.sessions.map((s) =>
          s.id === clearedSession.id ? clearedSession : s
        ),
      };
    });
  },

  deleteSession: (sessionId) => {
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      currentSession:
        state.currentSession?.id === sessionId ? null : state.currentSession,
    }));
  },

  setUserId: (userId) => {
    set({ userId });
  },

  loadChatHistory: (chatHistory) => {
    // Validate that chatHistory is an array
    if (!Array.isArray(chatHistory)) {
      console.warn(
        "loadChatHistory: chatHistory is not an array:",
        chatHistory
      );
      return;
    }

    const sessions: ChatSession[] = chatHistory.map((thread) => ({
      id: thread.id,
      sessionId: thread.sessionId, // Use sessionId from API response
      title: thread.title,
      messages:
        thread.messages?.map((msg) => ({
          id: msg.id,
          content: msg.content,
          role: msg.role,
          timestamp: new Date(msg.timestamp),
        })) || [],
      recommendations: [],
      createdAt: new Date(thread.createdAt),
      updatedAt: new Date(thread.updatedAt),
    }));

    set({ sessions });
  },
}));
