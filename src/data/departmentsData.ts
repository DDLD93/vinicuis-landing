import { Shield, FileText, Server, Scale, DollarSign, FolderKanban, TrendingUp, Users } from "lucide-react";

export interface Department {
  id: string;
  title: string;
  director: string;
  description: string;
  icon: any;
}

export const departments: Department[] = [
  {
    id: "security-logistics",
    title: "Security & Logistics",
    director: "Director of Security Logistics",
    description: "Overseeing provision of security operations, logistics, defense procurement, armored vehicles, and more.",
    icon: Shield,
  },
  {
    id: "corporate-services",
    title: "Corporate Services & Information Management",
    director: "Director, Corporate Services",
    description: "Responsible for governance processes, information systems, and administrative excellence.",
    icon: FileText,
  },
  {
    id: "it-department",
    title: "IT Department",
    director: "Director, Information Technology",
    description: "Managing technology infrastructure, software development, cybersecurity, and digital transformation initiatives.",
    icon: Server,
  },
  {
    id: "legal",
    title: "Legal Department",
    director: "General Counsel / Legal Officer",
    description: "Providing legal oversight, contract management, and regulatory compliance.",
    icon: Scale,
  },
  {
    id: "finance",
    title: "Finance, Budget and Accounting",
    director: "Director, Finance, Budget & Accounting",
    description: "Financial reporting, treasury operations, budgeting, and audit controls.",
    icon: DollarSign,
  },
  {
    id: "project-management",
    title: "Project Management Office",
    director: "Director of Project Management",
    description: "Overseeing planning, execution, and delivery across all organizational projects.",
    icon: FolderKanban,
  },
  {
    id: "business-development",
    title: "Business Development",
    director: "Business Development Officer",
    description: "Responsible for new market entries, partnerships, and investment strategy.",
    icon: TrendingUp,
  },
  {
    id: "human-resources",
    title: "Human Resources",
    director: "Director, Human Resources",
    description: "Managing talent acquisition, staff development, payroll, and organizational culture.",
    icon: Users,
  },
];
