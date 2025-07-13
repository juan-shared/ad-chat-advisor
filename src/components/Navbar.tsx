import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Target } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">Conversity.ai</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link to="/chat" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chatbot</span>
              </Link>
            </Button>
            
            <Button asChild className="gradient-primary text-primary-foreground font-medium">
              <Link to="/ads" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
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