"use client";

import { motion } from "framer-motion";
import { CheckCircle, Handshake, Building2, TrendingUp, Users, Briefcase, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PartnershipPage() {
  const benefits = [
    {
      title: "Trusted by multiple Nigerian state and federal agencies",
      icon: Building2,
    },
    {
      title: "Strong global supply chain (Dubai, China, Europe & beyond)",
      icon: TrendingUp,
    },
    {
      title: "Proven excellence across security, construction, procurement, aviation, IT, and emerging sectors",
      icon: CheckCircle,
    },
    {
      title: "Commitment to innovation, quality, and long-term success",
      icon: Handshake,
    },
  ];

  const waysToPartner = [
    {
      title: "Government collaborations",
      icon: Building2,
      description: "Strategic partnerships with federal and state agencies",
    },
    {
      title: "Technical partnerships",
      icon: Briefcase,
      description: "Joint technical expertise and innovation",
    },
    {
      title: "Joint ventures",
      icon: Handshake,
      description: "Collaborative business development initiatives",
    },
    {
      title: "Investment opportunities",
      icon: TrendingUp,
      description: "Capital partnerships for growth projects",
    },
    {
      title: "Project development alliances",
      icon: Users,
      description: "Co-development of major infrastructure projects",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] h-[50vh] sm:h-[60vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/bg.png"
              alt="Partnership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
          </div>
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="divider-accent mx-auto" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Partner With Us
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Join Our Network of Growth and Innovation. At Vinicius International, we believe in strategic partnerships that drive national development, empower industries, and create sustainable value across Africa.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="section-padding bg-secondary/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="divider-accent mx-auto" />
              <h2 className="section-title">Why Partner With Us?</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-xl p-4 sm:p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-foreground font-medium leading-relaxed">
                        {benefit.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ways to Partner */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="divider-accent mx-auto" />
              <h2 className="section-title">Ways to Partner</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {waysToPartner.map((way, index) => {
                const Icon = way.icon;
                return (
                  <motion.div
                    key={way.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-xl p-4 sm:p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all text-center"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2 sm:mb-3">
                      {way.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {way.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 via-red-900/10 to-primary/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                Let&apos;s Build the Future Together
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Partner with Vinicius International and bring impactful, world-class solutions to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02]"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
