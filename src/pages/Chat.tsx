import { useEffect, useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatWindow } from '@/components/ChatWindow';
import { RecommendationsBar } from '@/components/RecommendationsBar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Chat = () => {
  const { currentSession, createSession } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Create a default session if none exists
    if (!currentSession) {
      createSession('Primeira Conversa');
    }
  }, [currentSession, createSession]);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Window */}
        <div className="flex-1 relative">
          <ChatWindow />
        </div>

        {/* Recommendations Bar */}
        <div className="border-t bg-background/95 backdrop-blur-sm">
          <RecommendationsBar />
        </div>
      </div>
    </div>
  );
};

export default Chat;