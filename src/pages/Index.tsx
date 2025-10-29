import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioProjects } from "@/lib/portfolioData";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 text-center z-10 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            Creative<br />Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Visual storyteller crafting digital experiences through{" "}
            <span className="text-primary font-semibold">photography & design</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/gallery">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Explore Gallery
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="group">
                <div className="relative overflow-hidden rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
