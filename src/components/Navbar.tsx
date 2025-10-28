import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { LogOut, Upload, Image } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Portfolio
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link to="/gallery" className="hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          
          <ThemeToggle />
          
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="bg-[var(--gradient-lavender)]">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
