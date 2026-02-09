"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Division } from "@/lib/models/Division";
import { Shield, Building2, Plane, Server, Car, Wheat, Pill, Trophy } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Building2, Plane, Server, Car, Wheat, Pill, Trophy,
};

export default function DivisionDetailClient({ division }: { division: Division }) {
  const Icon = ICON_MAP[division.icon] ?? Shield;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <section className="relative min-h-[50vh] sm:min-h-[60vh] h-[50vh] sm:h-[60vh] overflow-hidden">
          <img
            src={division.image}
            alt={division.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <Link
                  href="/#divisions"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Divisions
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2 block">
                      {division.subtitle}
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
                      {division.title}
                    </h1>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                  {division.detailedContent.headline}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                  {division.detailedContent.introduction}
                </p>

                {division.detailedContent.keyServices && division.detailedContent.keyServices.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                      Key Services
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {division.detailedContent.keyServices.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="bg-card rounded-xl p-4 sm:p-6 border border-border/50"
                        >
                          <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                            {service.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {service.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {division.detailedContent.overview && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                      Overview
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {division.detailedContent.overview}
                    </p>
                  </div>
                )}

                {division.detailedContent.clientele && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                      Our Clientele
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {division.detailedContent.clientele}
                    </p>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-12 p-8 bg-gradient-to-r from-primary/10 via-red-900/10 to-primary/10 rounded-xl border border-primary/20"
                >
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                    Interested in Our Services?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get in touch with us to learn more about how we can help your organization.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02]"
                  >
                    <Mail className="w-5 h-5" />
                    Send Inquiry
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
