'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section id="contact" className="py-20 gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Partner with Nigeria&apos;s Most Trusted Conglomerate?
        </h2>
        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Let&apos;s discuss how Vinicius International can support your project needs with our 
          world-class solutions and extensive experience.
        </p>
        <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
          Start Your Project Today
        </Link>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
    </section>
  );
}

