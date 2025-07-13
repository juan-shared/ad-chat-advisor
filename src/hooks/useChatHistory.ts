import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  chatApi,
  ChatMessageRequest,
  ChatMessageResponse,
  ChatHistoryResponse,
} from "@/lib/api";

export const useChatHistory = (userId: string) => {
  return useQuery({
    queryKey: ["chatHistory", userId],
    queryFn: () => chatApi.getChatHistory(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      request: ChatMessageRequest
    ): Promise<ChatMessageResponse> => {
      return chatApi.sendMessage(request);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch chat history for the user
      queryClient.invalidateQueries({
        queryKey: ["chatHistory", variables.user_id],
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });
};

// Helper function to create a properly formatted message request
export const createMessageRequest = (
  sessionId: string,
  content: string,
  userId: string,
  role: "user" | "assistant" = "user"
): ChatMessageRequest => {
  return {
    session_id: sessionId,
    message: {
      role,
      content,
      metadata: {
        source: "web",
        platform: "desktop",
      },
    },
    user_id: userId,
  };
};

export type { ChatHistoryResponse };
