import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-[var(--gradient-hero)] bg-clip-text text-transparent text-center">
            Get In Touch
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
          
          <div className="bg-card p-8 rounded-2xl shadow-[var(--shadow-soft)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="pl-10 min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full bg-[var(--gradient-lavender)]">
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Or reach us directly at:</p>
            <a href="mailto:hello@cloudgallery.com" className="text-primary font-medium hover:underline">
              hello@cloudgallery.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
