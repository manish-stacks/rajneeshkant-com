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

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service-banner.jpg"
            alt="About the Doctor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/80" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              About the Doctor
            </h1>

             <p className="text-white text-lg">
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
