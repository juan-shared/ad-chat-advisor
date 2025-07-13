import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useChatStore } from "@/stores/chatStore";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { RecommendationsBar } from "@/components/RecommendationsBar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Chat = () => {
  const { currentSession, createSession, switchSession, sessions } =
    useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = Math.random().toString(36).substring(2, 15);

  // Get sessionId from URL
  const urlSessionId = searchParams.get("session_id");

  useEffect(() => {
    if (urlSessionId) {
      // Try to find and switch to the session from URL
      const existingSession = sessions.find(
        (s) => s.sessionId === urlSessionId
      );
      if (existingSession && currentSession?.sessionId !== urlSessionId) {
        switchSession(existingSession.id);
      }
    } else if (!currentSession) {
      // Create a default session if none exists and no URL sessionId
      createSession("Primeira Conversa");
    }
  }, [urlSessionId, currentSession, createSession, switchSession, sessions]);

  // Update URL when current session changes
  useEffect(() => {
    if (currentSession?.sessionId) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("session_id", currentSession.sessionId);
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [currentSession?.sessionId, searchParams, setSearchParams]);

  return (
    <div className="h-screen flex bg-background overflow-hidden pt-16">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background/80 backdrop-blur-sm shadow-lg rounded-xl"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 w-80 h-full transition-transform duration-300 ease-in-out z-40`}
      >
        <ChatSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
