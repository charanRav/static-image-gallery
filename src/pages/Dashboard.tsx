import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      const { error: dbError } = await (supabase as any).from('images').insert({
        title,
        category,
        description,
        image_url: publicUrl,
        user_id: user.id
      });

      if (dbError) throw dbError;

      toast({ title: "Image uploaded successfully!" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 bg-[var(--gradient-hero)] bg-clip-text text-transparent">Upload Image</h1>
        <form onSubmit={handleUpload} className="space-y-6 bg-card p-8 rounded-2xl shadow-[var(--shadow-soft)]">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
          <Button type="submit" className="w-full bg-[var(--gradient-lavender)]" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </form>
      </main>
    </div>
  );
}
