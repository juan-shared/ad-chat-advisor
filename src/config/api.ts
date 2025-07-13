// API configuration
export const API_CONFIG = {
  // Base URL for the chat API
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Chat endpoints
  endpoints: {
    chat: '/api/chat/messages',
  },
  
  // Request timeouts (in milliseconds)
  timeouts: {
    default: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    streaming: parseInt(import.meta.env.VITE_STREAMING_TIMEOUT || '60000'),
  },
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000, // 1 second
  },
  
  // Headers
  headers: {
    'Content-Type': 'application/json',
  },
  
  // Development settings
  development: {
    useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
  }
} as const;

export default API_CONFIG;
