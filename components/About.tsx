"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check, Award, Globe, Building2 } from "lucide-react";

export default function AboutPreview() {
  const features = [
    { icon: Award, text: "15+ Years of Excellence" },
    { icon: Globe, text: "Global Collaborations" },
    { icon: Building2, text: "$80M+ Assets" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Image (40%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl transform rotate-3"></div>
                
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src="/About.png"
                    alt="Vinicius International"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-1">600+</div>
                    <div className="text-sm text-gray-600">Trained Guards</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Trusted Nigerian Conglomerate
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                About <span className="text-red-600">Vinicius International</span>
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                A proudly Nigerian conglomerate driving national progress across security, construction, procurement, aviation, agro-trade, and emerging sectors such as pharmaceuticals and sports development.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Key Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Trusted government partner across multiple agencies</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Global collaborations spanning Dubai, China, and Europe</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <Link href="/about" className="inline-flex items-center gap-2">
                  Discover Our Story
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
