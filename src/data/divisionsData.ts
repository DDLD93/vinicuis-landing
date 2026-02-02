// All images are now in the public folder
const defenseImg = "/division-defense.jpg";
const constructionImg = "/division-construction.jpg";
const aviationImg = "/division-aviation.jpg";
const techImg = "/division-tech.jpg";
const autoImg = "/division-auto.jpg";
const agroImg = "/division-agro.jpg";
const pharmaceuticalsImg = "/drug.png";

import { Shield, Building2, Plane, Server, Car, Wheat, Pill, Trophy } from "lucide-react";

export interface Division {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: any;
  detailedContent: {
    headline: string;
    introduction: string;
    keyServices: Array<{
      title: string;
      description: string;
    }>;
    overview: string;
    clientele?: string;
  };
}

export const divisions: Division[] = [
  {
    slug: "defense-security",
    title: "Defense & Security",
    subtitle: "The Shield of the Nation",
    description: "Tactical manufacturing, integrated surveillance systems, and capacity building for national security forces.",
    image: defenseImg,
    icon: Shield,
    detailedContent: {
      headline: "The Shield of the Nation",
      introduction: "The Vinicius group stands at the forefront of national security. We don't just supply; we manufacture and integrate.",
      keyServices: [
        {
          title: "Tactical Manufacturing",
          description: "Local assembly of tactical armored vehicles and security hardware under DICON license."
        },
        {
          title: "Integrated Systems",
          description: "Deployment of surveillance grids, access-control solutions, and UAV/Drone logistics support."
        },
        {
          title: "Capacity Building",
          description: "Specialized training for security personnel via our Advanced Security Command & Control (ASCC) unit."
        }
      ],
      overview: "Vinicius group delivers end‑to‑end security solutions tailored for public and private sector clients. Services include risk assessment, security system design, supply of defense and security equipment, surveillance systems, and technical training. The company is also involved in defense procurement support and local capacity development initiatives aligned with national security objectives.",
      clientele: "Trusted partner to the Nigeria Navy, Air Force, Police, DSS, and NIA."
    }
  },
  {
    slug: "infrastructure-construction",
    title: "Infrastructure & Construction",
    subtitle: "Engineering the Skyline",
    description: "Urban development, civil engineering, and comprehensive project management from concept to delivery.",
    image: constructionImg,
    icon: Building2,
    detailedContent: {
      headline: "Engineering the Skyline",
      introduction: "Our Construction Division is dedicated to building the nation's physical backbone. We execute high-impact projects ranging from urban road networks to massive housing estates.",
      keyServices: [
        {
          title: "Urban Development",
          description: "Design and build of housing units (e.g., 500+ unit housing estates in Abuja and other states)."
        },
        {
          title: "Civil Engineering",
          description: "Commercial plaza developments, road networks, and government administrative complexes."
        },
        {
          title: "Project Management",
          description: "Comprehensive oversight from conceptualisation to delivery."
        }
      ],
      overview: "The company undertakes residential, commercial, and institutional construction projects. Its infrastructure portfolio includes building construction, civil works, project management, and government‑focused developments. Vinicius group emphasizes quality execution, regulatory compliance, and timely delivery across all construction engagements."
    }
  },
  {
    slug: "aviation-aerospace",
    title: "Aviation & Aerospace",
    subtitle: "Commanding the Skies",
    description: "Executive transport, mission logistics, and comprehensive fleet management for VIP clients.",
    image: aviationImg,
    icon: Plane,
    detailedContent: {
      headline: "Commanding the Skies",
      introduction: "Catering to high-end business and government clients who demand efficiency, safety, and comfort.",
      keyServices: [
        {
          title: "Executive Transport",
          description: "Charter operations, corporate jet management, and VIP transport solutions."
        },
        {
          title: "Mission Logistics",
          description: "Aerial mobility support for remote, critical, or security-sensitive missions."
        },
        {
          title: "Fleet Management",
          description: "Aviation fleet acquisition, maintenance coordination, and ground service logistics."
        }
      ],
      overview: "The aviation arm provides private charter services, VIP logistics, aircraft procurement support, and aviation advisory services. These offerings are designed for government, corporate, and high‑net‑worth clients requiring secure, efficient, and discreet air mobility solutions."
    }
  },
  {
    slug: "information-technology",
    title: "Information Technology",
    subtitle: "The Digital Backbone",
    description: "Cybersecurity, e-governance platforms, smart city solutions, and secure data infrastructure.",
    image: techImg,
    icon: Server,
    detailedContent: {
      headline: "The Digital Backbone of the Nation",
      introduction: "Vinicius group drives the digital sovereignty of Nigeria. We treat Technology not just as a support service, but as a critical infrastructure. We partner with government agencies and enterprises to build secure, scalable, and intelligent digital ecosystems.",
      keyServices: [
        {
          title: "Cybersecurity & Cyber-Defense",
          description: "Deployment of military-grade encryption, threat intelligence, and digital perimeter security for national assets."
        },
        {
          title: "E-Governance & GovTech",
          description: "Developing large-scale digital platforms that enhance public service delivery, revenue generation, and administrative efficiency."
        },
        {
          title: "Smart City Solutions",
          description: "Integrating IoT (Internet of Things) and AI into our construction projects to create intelligent urban environments."
        },
        {
          title: "Data Infrastructure",
          description: "Development of secure data centers and cloud infrastructure to ensure data residency and sovereignty."
        }
      ],
      overview: "Through its IT division, Vinicius Group provides software development, enterprise systems, cybersecurity solutions, cloud infrastructure support, data analytics, and digital transformation services. The company also delivers IT training and capacity‑building programs for organizations seeking to strengthen internal technical capabilities."
    }
  },
  {
    slug: "automobile-solutions",
    title: "Automobile Solutions",
    subtitle: "Performance & Protection",
    description: "Vehicle procurement, armoring services, and comprehensive fleet support for high-security transport.",
    image: autoImg,
    icon: Car,
    detailedContent: {
      headline: "Performance & Protection",
      introduction: "We offer a complete suite of services for vehicle procurement, customization, and fleet management.",
      keyServices: [
        {
          title: "Procurement",
          description: "Supply of luxury executive sedans, SUVs, and commercial trucks."
        },
        {
          title: "Armoring Services",
          description: "Customization and armoring for high-security transport."
        },
        {
          title: "Fleet Support",
          description: "Comprehensive maintenance and logistics support."
        }
      ],
      overview: "Vinicius group is active in vehicle supply, fleet management, armored vehicle solutions, and automotive customization. This division supports security agencies, corporate fleets, and specialized mobility requirements with a focus on reliability, safety, and lifecycle management."
    }
  },
  {
    slug: "agro-industrial",
    title: "Agro-Industrial",
    subtitle: "Feeding the Economy",
    description: "Large-scale commodity trading, export aggregation, and agricultural value chain optimization.",
    image: agroImg,
    icon: Wheat,
    detailedContent: {
      headline: "Feeding the Economy",
      introduction: "Our Agro-Trade division facilitates the production, processing, and export of commodities, treating agriculture as a heavy industry.",
      keyServices: [
        {
          title: "Export Aggregation",
          description: "Large-scale procurement and export of grains, legumes, oil seeds, and staple commodities."
        },
        {
          title: "Value Chain Optimization",
          description: "Supporting rural development and supply-chain efficiency."
        }
      ],
      overview: "The company participates in agricultural value chains through commodity trading, agro‑exports, and partnerships that support sustainable farming and food security initiatives. This division aligns with national goals for agricultural productivity and export growth."
    }
  },
  {
    slug: "pharmaceuticals",
    title: "Pharmaceuticals",
    subtitle: "Health & Wellness",
    description: "Supply and distribution of medical equipment, pharmaceuticals, and healthcare solutions.",
    image: pharmaceuticalsImg,
    icon: Pill,
    detailedContent: {
      headline: "Health & Wellness Solutions",
      introduction: "Vinicius Group is involved in the supply and distribution of medical equipment, pharmaceuticals, and healthcare solutions.",
      keyServices: [
        {
          title: "Medical Equipment Supply",
          description: "Provision of high-quality medical equipment for healthcare facilities."
        },
        {
          title: "Pharmaceutical Distribution",
          description: "Safe and compliant distribution of essential medications."
        },
        {
          title: "Healthcare Solutions",
          description: "Comprehensive healthcare product and service offerings."
        }
      ],
      overview: "The company works with manufacturers and regulators to ensure quality, compliance, and access to essential healthcare products."
    }
  },
  {
    slug: "sports-development",
    title: "Sports Development",
    subtitle: "Building Champions",
    description: "Football academies and youth training programs aimed at talent development and community engagement.",
    image: aviationImg, // Using aviation image temporarily - consider adding a specific sports image
    icon: Trophy,
    detailedContent: {
      headline: "Building Champions",
      introduction: "As part of its social and developmental focus, Vinicius group supports sports development initiatives.",
      keyServices: [
        {
          title: "Football Academies",
          description: "Professional training facilities and programs for aspiring football talents."
        },
        {
          title: "Youth Training Programs",
          description: "Comprehensive development programs for young athletes."
        },
        {
          title: "Community Engagement",
          description: "Sports initiatives that promote community development and social cohesion."
        }
      ],
      overview: "Including football academies and youth training programs aimed at talent development and community engagement."
    }
  }
];
