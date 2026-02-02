import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDivisionBySlug } from "@/lib/actions/division";
import DivisionDetailClient from "./DivisionDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) return { title: "Division | Vinicius International" };
  return {
    title: `${division.title} | Vinicius International`,
    description: division.description ?? undefined,
  };
}

export default async function DivisionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) notFound();
  return <DivisionDetailClient division={division} />;
}
