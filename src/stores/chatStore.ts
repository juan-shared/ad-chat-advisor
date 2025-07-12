import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Recommendation {
  id: string;
  title: string;
  summary: string;
  mediaUrl?: string;
  cta: string;
  relevanceScore?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatStore {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  recommendations: Recommendation[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  
  // Actions
  createSession: (title?: string) => void;
  switchSession: (sessionId: string) => void;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  updateLastMessage: (content: string) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  deleteSession: (sessionId: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useChatStore = create<ChatStore>((set, get) => ({
  currentSession: null,
  sessions: [],
  recommendations: [],
  isLoading: false,
  isStreaming: false,
  error: null,

  createSession: (title = 'Nova Conversa') => {
    const session: ChatSession = {
      id: generateId(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set(state => ({
      currentSession: session,
      sessions: [session, ...state.sessions]
    }));
  },

  switchSession: (sessionId) => {
    const session = get().sessions.find(s => s.id === sessionId);
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

    set(state => {
      if (!state.currentSession) return state;

      const updatedSession = {
        ...state.currentSession,
        messages: [...state.currentSession.messages, message],
        updatedAt: new Date(),
      };

      return {
        currentSession: updatedSession,
        sessions: state.sessions.map(s => 
          s.id === updatedSession.id ? updatedSession : s
        ),
      };
    });
  },

  updateLastMessage: (content) => {
    set(state => {
      if (!state.currentSession || state.currentSession.messages.length === 0) {
        return state;
      }

      const messages = [...state.currentSession.messages];
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.role === 'assistant') {
        lastMessage.content = content;
      }

      const updatedSession = {
        ...state.currentSession,
        messages,
        updatedAt: new Date(),
      };

      return {
        currentSession: updatedSession,
        sessions: state.sessions.map(s => 
          s.id === updatedSession.id ? updatedSession : s
        ),
      };
    });
  },

  setRecommendations: (recommendations) => set({ recommendations }),

  setLoading: (loading) => set({ isLoading: loading }),

  setStreaming: (streaming) => set({ isStreaming: streaming }),

  setError: (error) => set({ error }),

  clearChat: () => {
    set(state => {
      if (!state.currentSession) return state;

      const clearedSession = {
        ...state.currentSession,
        messages: [],
        updatedAt: new Date(),
      };

      return {
        currentSession: clearedSession,
        sessions: state.sessions.map(s => 
          s.id === clearedSession.id ? clearedSession : s
        ),
      };
    });
  },

  deleteSession: (sessionId) => {
    set(state => ({
      sessions: state.sessions.filter(s => s.id !== sessionId),
      currentSession: state.currentSession?.id === sessionId ? null : state.currentSession,
    }));
  },
}));