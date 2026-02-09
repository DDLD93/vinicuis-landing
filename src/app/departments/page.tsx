"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DepartmentsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const departments: { id: string; title: string; director: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/bg3.jpeg"
              alt="Departments"
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
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  Department Leadership
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Meet the dedicated professionals leading our specialized departments.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Departments Grid */}
        <section className="section-padding" ref={ref}>
          <div className="container">
            {departments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-center py-16 px-4 rounded-xl bg-card border border-border/50"
              >
                <p className="text-muted-foreground">
                  Department information will appear here once added.
                </p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all group"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {dept.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary mb-3">
                        {dept.director}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {dept.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
