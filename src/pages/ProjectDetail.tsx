import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { portfolioProjects } from "@/lib/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Camera } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = portfolioProjects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/projects">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="animate-fade-in">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{project.category}</Badge>
              <span className="text-muted-foreground">{project.year}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              {project.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">Duration</p>
                <p className="text-sm text-muted-foreground">{project.duration}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">Locations</p>
                <p className="text-sm text-muted-foreground">{project.locations}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Camera className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold mb-1">Equipment</p>
                <p className="text-sm text-muted-foreground">{project.equipment}</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {project.description}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Client</h3>
                <p className="text-muted-foreground">{project.client}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Skills Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Featured Images</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl aspect-video">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
