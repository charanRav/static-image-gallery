import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            About This Gallery
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>
              Welcome to Cloud Portfolio Gallery - a modern platform for creative professionals 
              to showcase their best work in a beautiful, minimalist environment.
            </p>
            
            <p>
              Built with cutting-edge web technologies, this gallery combines the power of 
              cloud storage with an intuitive interface that puts your artwork front and center.
            </p>
            
            <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-soft)] mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✦</span>
                  <span>Real-time gallery updates powered by cloud technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✦</span>
                  <span>Secure authentication to protect your creative work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✦</span>
                  <span>Image zoom and download capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✦</span>
                  <span>Dark and light theme support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✦</span>
                  <span>Responsive design that works beautifully on all devices</span>
                </li>
              </ul>
            </div>
            
            <p className="pt-4">
              Whether you're a photographer, designer, or digital artist, this platform 
              provides the perfect canvas to display your portfolio to the world.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
