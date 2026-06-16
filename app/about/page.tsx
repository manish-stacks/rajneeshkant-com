import type { Metadata } from "next";
import { Award, BookOpen, Users, CheckCircle } from "lucide-react";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import ExcellenceSection from "@/components/sections/ExcellenceSection";
import VideosSection from "@/components/sections/VideosSection";

export const metadata: Metadata = {
  title: "About Dr. Rajneesh Kant | Leading Chiropractor in India",
  description:
    "Learn about Dr. Rajneesh Kant — India's leading chiropractor and physiotherapist with 15+ years of experience treating back pain, sciatica, sports injuries and more in Mumbai.",
};

const qualifications = [
  "MBBS, Certified Chiropractor",
  "Diploma in Physiotherapy",
  "Advanced Manual Therapy Certified",
  "Sports Injury Specialist",
  "15+ years clinical experience",
  "Trained in USA Chiropractic techniques",
];

const specializations = [
  "Spinal Manipulation & Chiropractic Adjustments",
  "Manual Physiotherapy & Soft Tissue Mobilization",
  "Sports Rehabilitation & Injury Prevention",
  "Post-Surgical Rehabilitation",
  "Chronic Pain Management",
  "Posture Correction & Ergonomics",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#7cc5cc] to-[#aae6e6]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-3">About the Doctor</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Dr. Rajneesh Kant
            </h1>
            <p className="text-gray-600 text-lg">
              India&apos;s Leading Chiropractor & Physiotherapist — dedicated to
              delivering lasting relief through evidence-based, non-surgical care.
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <AboutSection />

      <WhyChooseSection />
      <VideosSection />
      <ExcellenceSection />
      <AppointmentCTA />
    </>
  );
}
