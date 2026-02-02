export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Defense Equipment Showcase",
    category: "Defense & Security",
    image: "/bg.png",
    description: "Tactical armored vehicles and security hardware on display",
  },
  {
    id: "2",
    title: "Construction Site Progress",
    category: "Infrastructure",
    image: "/bg2.jpeg",
    description: "500+ unit housing estate development in Abuja",
  },
  {
    id: "3",
    title: "Aviation Fleet",
    category: "Aviation",
    image: "/bg3.jpeg",
    description: "Executive transport aircraft and VIP logistics",
  },
  {
    id: "4",
    title: "IT Infrastructure Setup",
    category: "Technology",
    image: "/bg4.jpg",
    description: "Data center and cloud infrastructure deployment",
  },
  {
    id: "5",
    title: "Automobile Solutions",
    category: "Automobile",
    image: "/bg.png",
    description: "Luxury executive sedans and armored vehicles",
  },
  {
    id: "6",
    title: "Agro-Industrial Operations",
    category: "Agro-Industrial",
    image: "/bg2.jpeg",
    description: "Commodity processing and export facilities",
  },
  {
    id: "7",
    title: "Pharmaceutical Distribution",
    category: "Pharmaceuticals",
    image: "/bg3.jpeg",
    description: "Medical equipment and healthcare solutions",
  },
  {
    id: "8",
    title: "Sports Development Academy",
    category: "Sports",
    image: "/bg4.jpg",
    description: "Football academy and youth training facilities",
  },
  {
    id: "9",
    title: "Corporate Headquarters",
    category: "Corporate",
    image: "/bg.png",
    description: "Vinicius Group main office building",
  },
  {
    id: "10",
    title: "Partnership Signing Ceremony",
    category: "Corporate",
    image: "/bg2.jpeg",
    description: "Strategic partnership agreement with government agency",
  },
  {
    id: "11",
    title: "Project Inauguration",
    category: "Infrastructure",
    image: "/bg3.jpeg",
    description: "Official opening of new construction project",
  },
  {
    id: "12",
    title: "Technology Innovation Lab",
    category: "Technology",
    image: "/bg4.jpg",
    description: "IT division research and development center",
  },
];
