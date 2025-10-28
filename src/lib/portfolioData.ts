import nature1 from "@/assets/gallery/nature-1.jpg";
import architecture1 from "@/assets/gallery/architecture-1.jpg";
import art1 from "@/assets/gallery/art-1.jpg";

export const portfolioProjects = [
  {
    id: "nature-documentary",
    title: "Nature Documentary Series",
    category: "Photography",
    excerpt: "A comprehensive visual documentation of endangered ecosystems across three continents, featuring over 200 high-resolution photographs.",
    thumbnail: nature1,
    year: "2023 - 2024",
    client: "National Geographic Society",
    duration: "18 Months",
    locations: "Amazon Basin, Arctic Circle, African Savanna",
    equipment: "Canon EOS R5, Sony a7R IV, Various telephoto lenses",
    description: "This ambitious project took me across three continents over the span of 18 months, documenting some of the world's most endangered ecosystems. From the lush rainforests of the Amazon to the icy expanse of the Arctic Circle, each location presented unique challenges and opportunities.",
    challenge: "The series aims to raise awareness about climate change and habitat destruction while celebrating the incredible diversity of life on our planet. Using advanced photography techniques and spending weeks in remote locations, I captured intimate moments that showcase both the raw beauty and the fragility of our natural world.",
    tags: ["Photography", "Post-Processing", "Storytelling"],
    images: [nature1, nature1, nature1]
  },
  {
    id: "urban-architecture",
    title: "Urban Architecture Collection",
    category: "Architecture",
    excerpt: "Modern architectural photography showcasing the intersection of design, functionality, and urban planning in major metropolitan areas.",
    thumbnail: architecture1,
    year: "2024",
    client: "Architectural Digest",
    duration: "12 Months",
    locations: "New York, Tokyo, Dubai",
    equipment: "Phase One XF IQ4, Tilt-shift lenses",
    description: "A curated collection of contemporary architectural marvels from around the globe. This project focuses on the interplay between form and function in modern urban design.",
    challenge: "Capturing architecture requires precise timing, perfect lighting conditions, and an understanding of geometric composition. Each building tells a story of innovation, cultural identity, and human ambition.",
    tags: ["Architecture", "Composition", "Urban Design"],
    images: [architecture1, architecture1, architecture1]
  },
  {
    id: "tech-innovation",
    title: "Tech Innovation Visuals",
    category: "Product Photography",
    excerpt: "Artistic representation of technology concepts through macro photography and digital manipulation, bridging the gap between art and science.",
    thumbnail: art1,
    year: "2024",
    client: "Tech Innovation Magazine",
    duration: "6 Months",
    locations: "Studio",
    equipment: "Macro lenses, LED panels, High-speed cameras",
    description: "This series explores the hidden beauty in technology through extreme close-up photography. Circuit boards, microchips, and electronic components become abstract art.",
    challenge: "The goal was to make technology accessible and beautiful, showing the intricate craftsmanship that goes into modern electronics while creating visually stunning images.",
    tags: ["Macro Photography", "Digital Art", "Technology"],
    images: [art1, art1, art1]
  },
];
