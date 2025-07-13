import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Megaphone, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105"
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-200">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Conversity.<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <Link to="/chat" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chatbot</span>
              </Link>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Link to="/ads" className="flex items-center space-x-2">
                <Megaphone className="h-4 w-4" />
                <span>Anunciante</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
