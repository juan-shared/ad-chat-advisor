# Chat API Integration

This document explains how the chat functionality integrates with the backend API.

## Overview

The chat component now integrates with a real backend API instead of using mock streaming responses. The integration handles both regular responses and recommendations.

## API Endpoint

- **URL**: `http://localhost:3000/api/chat/messages`
- **Method**: POST
- **Content-Type**: application/json

## Request Payload

```typescript
interface ChatApiPayload {
  message: string;           // The user's message
  session_id?: string;       // Optional session ID for context
  user_id?: string;          // Optional user ID for tracking
  history: Array<{           // Previous conversation history
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

## Response Format

```typescript
interface ChatApiResponse {
  response?: string;            // Main AI response content
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
```

The API primarily uses the `response` field for the AI's answer, but the frontend also supports `message` and `content` fields for backward compatibility.

## Features

- **Non-streaming responses**: The API returns complete responses at once
- **Error handling**: Comprehensive error handling with user-friendly messages
- **Recommendations**: Support for product/service/creator recommendations
- **Session management**: Tracks conversation history and session context
- **Timeout handling**: Configurable timeouts for API requests

## Error Handling

The integration handles various error scenarios:
- Connection errors
- HTTP status errors (404, 500, 429, etc.)
- Timeout errors
- Invalid response formats

## Configuration

API configuration is managed in `/src/config/api.ts`:
- Base URL can be set via `VITE_API_BASE_URL` environment variable
- Timeout values are configurable
- Development mode settings available

## Usage

The chat functionality automatically:
1. Sends user messages to the API
2. Displays AI responses
3. Shows recommendations in carousel format
4. Handles errors gracefully

## Debugging

Console logs are available for debugging:
- Request payload logging
- Response status and data logging
- Error details

To enable/disable debugging, check the console.log statements in `ChatWindow.tsx`.
