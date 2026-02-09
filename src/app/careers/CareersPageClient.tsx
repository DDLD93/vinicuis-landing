"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink, Briefcase, GraduationCap, Shield, Building2, Plane, Server, Car, Wheat, Pill, Trophy, FileText, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { JobPosting } from "@/lib/models/JobPosting";

interface CareersPageClientProps {
  jobs: JobPosting[];
}

export default function CareersPageClient({ jobs }: CareersPageClientProps) {
  const benefits = [
    "Be part of a proudly Nigerian conglomerate with global reach",
    "Work on impactful projects across security, construction, procurement, aviation, IT, agro-trade, and more",
    "Professional growth, continuous learning, and leadership development",
    "Inclusive, dynamic, and collaborative work environment",
    "Opportunities to work with government agencies and international partners",
  ];

  const opportunities = [
    { name: "Security & Defense Solutions", icon: Shield },
    { name: "Construction & Infrastructure", icon: Building2 },
    { name: "Aviation Services", icon: Plane },
    { name: "Procurement & Logistics", icon: Briefcase },
    { name: "IT & Technologies", icon: Server },
    { name: "Agro-Trade", icon: Wheat },
    { name: "Pharmaceuticals", icon: Pill },
    { name: "Sports Development", icon: Trophy },
    { name: "Corporate Services", icon: FileText },
    { name: "Finance & Administration", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <section className="relative min-h-[50vh] sm:min-h-[60vh] h-[50vh] sm:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/bg2.jpeg" alt="Careers" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
          </div>
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
                <div className="divider-accent mx-auto" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Careers at Vinicius International
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Build Your Future With Us. At Vinicius International, we are shaping Africa&apos;s future through innovation, excellence, and national development. We&apos;re always looking for talented, driven, and passionate individuals to join our growing team across multiple sectors.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-secondary/30">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <div className="divider-accent mx-auto" />
              <h2 className="section-title">Why Work With Us?</h2>
            </motion.div>
            <div className="max-w-4xl mx-auto">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 bg-card rounded-lg p-5 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <p className="text-foreground leading-relaxed">{benefit}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {jobs.length > 0 && (
          <section className="section-padding">
            <div className="container">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
                <div className="divider-accent mx-auto" />
                <h2 className="section-title">Current Openings</h2>
                <p className="section-subtitle">Apply to one of our open positions</p>
              </motion.div>
              <div className="max-w-4xl mx-auto space-y-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-primary font-medium">{job.division}</p>
                          {job.location && <p className="text-sm text-muted-foreground mt-1">Location: {job.location}</p>}
                        </div>
                      </div>
                      <a
                        href={job.applicationEmail ? `mailto:${job.applicationEmail}` : "mailto:careers@viniciusint.com"}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0"
                      >
                        <Mail className="w-4 h-4" />
                        Apply
                      </a>
                    </div>
                    <p className="text-muted-foreground text-sm mt-4 leading-relaxed line-clamp-2">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <div className="divider-accent mx-auto" />
              <h2 className="section-title">Available Opportunities</h2>
              <p className="section-subtitle">Join us in any of our key divisions:</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {opportunities.map((opp, index) => {
                const Icon = opp.icon;
                return (
                  <motion.div
                    key={opp.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-card rounded-xl p-4 sm:p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all text-center"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{opp.name}</h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-secondary/30">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
              <div className="divider-accent mx-auto mb-8" />
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">How to Apply</h2>
              <p className="text-lg text-muted-foreground mb-8">Submit your CV and a brief cover letter to:</p>
              <a
                href="mailto:careers@viniciusint.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02] mb-6"
              >
                <Mail className="w-5 h-5" />
                careers@viniciusint.com
              </a>
              <p className="text-muted-foreground">
                Or visit our application portal:{" "}
                <a href="https://www.viniciusint.com/careers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  www.viniciusint.com/careers
                  <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 sm:p-8 border border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Internships & Graduate Trainee Programs</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We offer structured internship and trainee programs designed to groom young professionals and prepare them for long-term success.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-r from-primary/10 via-red-900/10 to-primary/10">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 sm:mb-6">Grow With Us</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                At Vinicius International, your talent, creativity, and ambition have a home. Join us and become part of a mission that transforms industries and communities across Africa.
              </p>
              <a
                href="mailto:careers@viniciusint.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02]"
              >
                <Mail className="w-5 h-5" />
                Apply Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
