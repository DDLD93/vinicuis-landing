import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Divisions from "@/components/Divisions";
import WhyChooseUs from "@/components/WhyChooseUs";
import Partners from "@/components/Partners";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { getDivisions } from "@/lib/actions/division";
import { getNewsArticles } from "@/lib/actions/news";
import { getGalleryItems } from "@/lib/actions/gallery";
import type { NewsArticle } from "@/lib/models/News";
import type { GalleryItem } from "@/lib/models/Gallery";

export const revalidate = 60;

export default async function Home() {
  let newsArticles: NewsArticle[];
  let galleryItems: GalleryItem[];
  let divisions: Awaited<ReturnType<typeof getDivisions>>;
  try {
    [newsArticles, galleryItems, divisions] = await Promise.all([
      getNewsArticles({ limit: 3, sort: "desc" }),
      getGalleryItems({ limit: 6 }),
      getDivisions(),
    ]);
  } catch {
    newsArticles = [];
    galleryItems = [];
    divisions = [];
  }
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <Divisions divisions={divisions} />
      <WhyChooseUs />
      <News articles={newsArticles} />
      <Gallery items={galleryItems} />
      <Partners />
      <Footer />
    </div>
  );
}
