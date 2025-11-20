import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { portfolioProjects } from "@/lib/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Featured Projects
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated selection of my most impactful work, showcasing diverse techniques and creative approaches
          </p>
        </div>

        <div className="space-y-12">
          {portfolioProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="md:flex">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full min-h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden" />
                </div>
                
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-4 font-medium">
                      {project.category}
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {project.excerpt}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Client</p>
                      <p className="font-semibold">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Duration</p>
                      <p className="font-semibold">{project.duration}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link to={`/projects/${project.id}`}>
                    <Button className="gap-2 group-hover:gap-3 transition-all shadow-md hover:shadow-lg">
                      View Portfolio
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
