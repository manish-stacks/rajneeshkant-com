"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import api from "@/lib/axios";

interface TreatmentItem {
  _id: string;
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
}

// Shown until the live data loads (and as a safety fallback).
const fallback: TreatmentItem[] = [
  {
    _id: "f1",
    slug: "back-pain",
    name: "Back Pain Physiotherapy",
    shortDesc:
      "Advanced chiropractic care for chronic and acute back pain recovery.",
    icon: "🦴",
  },
  {
    _id: "f2",
    slug: "neck-pain",
    name: "Cervical Pain Treatment",
    shortDesc:
      "Effective neck pain and posture correction treatments for lasting relief.",
    icon: "🔄",
  },
  {
    _id: "f3",
    slug: "sciatica-pain-treatment",
    name: "Sciatica Pain Treatment",
    shortDesc: "Non-surgical sciatica and nerve pain management therapy.",
    icon: "⚡",
  },
  {
    _id: "f4",
    slug: "shoulder-pain",
    name: "Shoulder Pain Treatment",
    shortDesc: "Specialised care for frozen shoulder and rotator cuff problems.",
    icon: "💪",
  },
  {
    _id: "f5",
    slug: "disc-injury",
    name: "Disc Injury Treatment",
    shortDesc: "Non-surgical treatment for herniated and bulging spinal discs.",
    icon: "🦷",
  },
  {
    _id: "f6",
    slug: "spine-alignment-therapy",
    name: "Spine Alignment Therapy",
    shortDesc: "Precise spinal manipulation to correct alignment and relieve pain.",
    icon: "🧬",
  },
];

export function TreatmentsSection() {
  const [treatments, setTreatments] = useState<TreatmentItem[]>(fallback);

  useEffect(() => {
    api
      .get("/treatments")
      .then((res) => {
        const list = res.data.treatments;
        if (list && list.length > 0) setTreatments(list.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-14 lg:py-20">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-14"
        >
          <p className="uppercase tracking-[3px] text-[#11bfd0] text-xs sm:text-sm font-bold mb-3">
            Our Treatments
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f3a] leading-tight mb-4">
            Expert Treatments
            <span className="text-[#11bfd0]"> We Offer</span>
          </h2>

          <div className="w-20 h-[3px] bg-[#11bfd0] mx-auto rounded-full mb-5" />

          <p className="max-w-2xl mx-auto text-gray-600 text-[15px] leading-7">
            Comprehensive chiropractic and physiotherapy treatments designed to
            provide long-lasting relief, recovery, and holistic wellness through
            advanced non-surgical care.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/${treatment.slug}`}
                className="group relative bg-[#f9fcfc] hover:bg-[#11bfd0] border border-cyan-100 rounded-2xl p-5 md:p-6 block overflow-hidden transition-all duration-500 hover:shadow-2xl h-full"
              >
                {/* Number */}
                <span className="absolute top-4 right-4 text-3xl font-black text-gray-100 group-hover:text-white/10 transition-all duration-500">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mb-4 text-2xl group-hover:bg-[#0b1f3a] transition-all duration-500">
                  {treatment.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0b1f3a] group-hover:text-white transition-all duration-500 mb-2">
                  {treatment.name}
                </h3>

                {/* Desc */}

                <p className="text-gray-600 group-hover:text-white/90 leading-6 text-[14px] transition-all duration-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: treatment.shortDesc }} />
                  

                {/* Button */}
                <div className="mt-4 inline-flex items-center gap-2 text-[#11bfd0] group-hover:text-white font-semibold text-sm transition-all duration-500">
                  Learn More
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-all duration-500"
                  />
                </div>

                {/* Hover Circle */}
                <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-10 lg:mt-12"
        >
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 bg-[#11bfd0] hover:bg-[#0ea5b7] text-white px-7 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 shadow-xl"
          >
            View All Treatments
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
