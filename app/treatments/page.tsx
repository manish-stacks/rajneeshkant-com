"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { treatments as fallbackTreatments } from "@/lib/data";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import api from "@/lib/axios";

interface TreatmentItem {
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
  conditions: string[];
}

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<TreatmentItem[]>(
    fallbackTreatments as TreatmentItem[]
  );

  useEffect(() => {
    api
      .get("/treatments")
      .then((res) => {
        if (res.data.treatments && res.data.treatments.length > 0) {
          setTreatments(res.data.treatments);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <>
 
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service-banner.jpg"
            alt="What We Treat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/80" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Treatments & Services
            </h1>

            <p className="text-white text-lg">
               Comprehensive chiropractic and physiotherapy treatments for all
            musculoskeletal conditions — tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-cyan-100/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-blue-100/40 blur-3xl rounded-full" />

        <div className="container relative z-10 mx-auto px-4">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-[#11bfd0] text-xs font-semibold border border-cyan-100 mb-3">
              Expert Treatments
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1f3a] leading-tight">
              Specialized Care For
              <span className="text-[#11bfd0]"> Every Condition</span>
            </h2>

            <p className="text-gray-600 mt-4 text-sm md:text-base leading-7">
              Personalized chiropractic and physiotherapy solutions for pain relief,
              recovery, and long-term wellness.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {treatments.map((t, index) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/${t.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-200"
                >
                  {/* Top Line */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#11bfd0] to-cyan-400 transition-all duration-500 group-hover:w-full" />

                  {/* Number */}
                  <span className="absolute top-4 right-4 text-4xl font-black text-slate-100 group-hover:text-cyan-100 transition-all duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 transition-all duration-500 group-hover:bg-[#11bfd0]">
                    <span className="text-2xl transition-all duration-500 group-hover:scale-110">
                      {t.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-[#0b1f3a] transition-all duration-500 group-hover:text-[#11bfd0]">
                    {t.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {t.shortDesc}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.conditions.slice(0, 2).map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-[#11bfd0]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#11bfd0]">
                      Learn More
                      <ArrowRight
                        size={14}
                        className="transition-all duration-500 group-hover:translate-x-1"
                      />
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#11bfd0] transition-all duration-500 group-hover:bg-[#11bfd0] group-hover:text-white group-hover:border-[#11bfd0]">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}
