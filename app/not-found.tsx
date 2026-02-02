import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="container text-center">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02]"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
