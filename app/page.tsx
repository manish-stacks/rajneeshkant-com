import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import VideosSection from "@/components/sections/VideosSection";
import BranchesSection from "@/components/sections/BranchesSection";
import ExcellenceSection from "@/components/sections/ExcellenceSection";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title:
      settings.seoTitle ||
      "Top Chiropractor & Physiotherapist in India | Dr. Rajneesh Kant",
    description:
      settings.seoDescription ||
      "Dr. Rajneesh Kant is India's top chiropractor and physiotherapist in Mumbai.",
    keywords: settings.seoKeywords
      ? settings.seoKeywords.split(",").map((k: string) => k.trim())
      : undefined,
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <TreatmentsSection />
      <VideosSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <BranchesSection />
      <AppointmentCTA />
      <ExcellenceSection />
    </>
  );
}
