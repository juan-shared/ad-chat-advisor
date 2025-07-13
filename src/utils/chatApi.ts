// Utility functions for chat API integration
import type { Recommendation } from '@/stores/chatStore';
import API_CONFIG from '@/config/api';

export interface ChatApiPayload {
  message: string;
  session_id?: string;
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  user_id?: string; // Optional user ID for tracking
}

export interface ChatApiResponse {
  response?: string;            // Main AI response field
  message?: string;             // Alternative field for response content  
  content?: string;             // Alternative field for response content
  recommendations?: Recommendation[];   // Optional product/service recommendations
  error?: string;               // Error message if any
  // Additional fields from the actual API response
  context_summary?: string;     // Context summary
  messageId?: number;           // Message ID
  recommendations_used?: number; // Number of recommendations used
  threadEmbedding?: number[];   // Thread embedding vector
  threadSummary?: string;       // Thread summary
  userContextUpdated?: boolean; // Whether user context was updated
}

export interface StreamingChunk {
  content?: string;
  done?: boolean;
  error?: string;
}

/**
 * Makes a chat API request with proper error handling and timeout
 */
export async function sendChatMessage(payload: ChatApiPayload): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeouts.streaming);

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.chat}`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - the server took too long to respond');
    }
    
    throw error;
  }
}

/**
 * Checks if a response should be handled as streaming
 */
export function isStreamingResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type');
  return !!(
    contentType?.includes('text/stream') || 
    contentType?.includes('application/stream') ||
    contentType?.includes('text/event-stream') ||
    response.headers.get('transfer-encoding') === 'chunked'
  );
}

/**
 * Processes a streaming chunk and extracts content
 */
export function processStreamingChunk(chunk: string): string {
  // Handle Server-Sent Events format
  const lines = chunk.split('\n');
  let content = '';
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      
      try {
        const parsed = JSON.parse(data);
        if (parsed.content) {
          content += parsed.content;
        } else if (parsed.choices?.[0]?.delta?.content) {
          // OpenAI format
          content += parsed.choices[0].delta.content;
        }
      } catch (e) {
        // If not JSON, treat as plain text
        if (data && data !== '[DONE]') {
          content += data;
        }
      }
    } else if (line.trim() && !line.startsWith(':')) {
      // Plain text streaming (ignore comments starting with :)
      content += line.trim() + ' ';
    }
  }
  
  return content;
}

/**
 * Handles streaming response reading
 */
export async function* readStreamingResponse(response: Response): AsyncGenerator<string, void, unknown> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('Response body is not readable');
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const content = processStreamingChunk(chunk);
      
      if (content) {
        yield content;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Gets error message based on HTTP status or error type
 */
export function getErrorMessage(error: Error | unknown): { title: string; message: string } {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      title: 'Erro de conexão',
      message: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
    };
  }
  
  if (error instanceof Error) {
    if (error.message.includes('timeout') || error.name === 'AbortError') {
      return {
        title: 'Timeout',
        message: 'O servidor está demorando para responder. Tente novamente.'
      };
    } else if (error.message.includes('404')) {
      return {
        title: 'Serviço não encontrado',
        message: 'O serviço de chat não está disponível no momento.'
      };
    } else if (error.message.includes('500')) {
      return {
        title: 'Erro interno',
        message: 'Erro interno do servidor. Tente novamente em alguns instantes.'
      };
    } else if (error.message.includes('429')) {
      return {
        title: 'Muitas solicitações',
        message: 'Muitas mensagens enviadas. Aguarde um momento antes de tentar novamente.'
      };
    } else if (error.message.includes('401') || error.message.includes('403')) {
      return {
        title: 'Acesso negado',
        message: 'Você não tem permissão para acessar este serviço.'
      };
    }
  }
  
  return {
    title: 'Erro na conversa',
    message: 'Houve um problema ao processar sua mensagem. Tente novamente.'
  };
}
