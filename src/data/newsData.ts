export const newsArticles = [
  {
    id: "seed-1",
    title: "Welcome to Vinicuis",
    excerpt: "We are excited to announce the launch of our new corporate website and expanded service offerings.",
    date: new Date().toISOString().slice(0, 10),
    category: "Company",
    image: "https://placehold.co/800x400/1e293b/94a3b8?text=News",
  },
  {
    id: "seed-2",
    title: "Expanding Our Divisions",
    excerpt: "Our divisions continue to grow across defense, infrastructure, technology, and more.",
    date: new Date(Date.now() - 86400000 * 7).toISOString().slice(0, 10),
    category: "Updates",
    image: "https://placehold.co/800x400/1e293b/94a3b8?text=Divisions",
  },
  {
    id: "seed-3",
    title: "Partnership Announcement",
    excerpt: "Strategic partnerships enable us to deliver greater value to our clients.",
    date: new Date(Date.now() - 86400000 * 14).toISOString().slice(0, 10),
    category: "Partnerships",
    image: "https://placehold.co/800x400/1e293b/94a3b8?text=Partnership",
  },
];
