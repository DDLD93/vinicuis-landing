export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Vinicius Group Secures Major Defense Contract with Nigeria Navy",
    excerpt: "We are proud to announce a significant partnership with the Nigeria Navy, strengthening our commitment to national security and defense capabilities.",
    date: "2024-12-15",
    category: "Defense & Security",
    image: "/bg.png",
  },
  {
    id: "2",
    title: "New Aviation Division Launches Executive Transport Services",
    excerpt: "Our Aviation & Aerospace division has expanded operations, now offering premium executive transport and VIP logistics services across West Africa.",
    date: "2024-11-28",
    category: "Aviation",
    image: "/bg2.jpeg",
  },
  {
    id: "3",
    title: "Infrastructure Milestone: 500+ Unit Housing Estate Completed in Abuja",
    excerpt: "Vinicius Group celebrates the successful completion of a major urban development project, delivering quality housing solutions to hundreds of families.",
    date: "2024-10-12",
    category: "Infrastructure",
    image: "/bg3.jpeg",
  },
  {
    id: "4",
    title: "IT Division Partners with Government for E-Governance Platform",
    excerpt: "Our Information Technology division is leading digital transformation initiatives, developing secure platforms for enhanced public service delivery.",
    date: "2024-09-20",
    category: "Technology",
    image: "/bg4.jpg",
  },
  {
    id: "5",
    title: "Agro-Industrial Division Expands Export Operations",
    excerpt: "Richfood Essentials continues to drive agricultural value chain optimization, facilitating large-scale commodity exports and supporting rural development.",
    date: "2024-08-05",
    category: "Agro-Industrial",
    image: "/bg.png",
  },
  {
    id: "6",
    title: "Vinicius Group Opens New Regional Office in Dubai",
    excerpt: "Expanding our global presence, we've established a strategic hub in Dubai to strengthen international partnerships and supply chain operations.",
    date: "2024-07-18",
    category: "Corporate",
    image: "/bg2.jpeg",
  },
];
