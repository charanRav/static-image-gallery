import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageModal } from "@/components/ImageModal";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { galleryImages } from "@/lib/galleryData";

type Image = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string;
  created_at: string;
};

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  const categories = ["All", "Nature", "Architecture", "Portrait", "Travel", "Art"];

  useEffect(() => {
    fetchImages();

    const channel = supabase
      .channel('images-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'images' }, () => {
        fetchImages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchImages = async () => {
    const { data, error } = await (supabase as any)
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setImages(data);
    }
    setLoading(false);
  };

  const handleAddDemoData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to load new images",
          variant: "destructive",
        });
        return;
      }

      for (const demo of galleryImages) {
        await (supabase as any).from('images').insert({
          title: demo.title,
          category: demo.category,
          description: demo.description,
          image_url: demo.image_url,
          user_id: user.id,
        });
      }

      toast({ title: "New images loaded successfully!" });
      fetchImages();
    } catch (error) {
      toast({
        title: "Failed to load images",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-[var(--gradient-hero)] bg-clip-text text-transparent">
            Visual Gallery
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Explore our curated collection of {images.length} premium visual stories
          </p>
          <Button
            onClick={handleAddDemoData}
            variant="outline"
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Load New Images
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {images.length === 0 
                ? "No images yet. Click 'Load New Images' to add the gallery!" 
                : "No images in this category"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => handleImageClick(image)}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                      {image.category && (
                        <p className="text-sm text-white/80">{image.category}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ImageModal
              image={selectedImage}
              open={modalOpen}
              onOpenChange={setModalOpen}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
