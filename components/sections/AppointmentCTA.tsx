"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Calendar,
  ArrowRight,
} from "lucide-react";

export function AppointmentCTA() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1f3a] via-[#102f57] to-[#11bfd0] px-5 md:px-10 py-12 md:py-14"
        >

          {/* BACKGROUND CIRCLES */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full -translate-y-32 translate-x-24" />

          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white/5 rounded-full translate-y-20 -translate-x-16" />

          {/* DOTS */}
          <div className="absolute top-8 left-8 grid grid-cols-5 gap-2 opacity-20">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            ))}
          </div>

          {/* CONTENT */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">

            {/* SUBTITLE */}
            <p className="uppercase tracking-[3px] text-cyan-200 text-xs sm:text-sm font-bold mb-3">
              Book Consultation
            </p>

            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Ready To Live
              <span className="text-cyan-300">
                {" "}Pain-Free?
              </span>
            </h2>

            {/* LINE */}
            <div className="w-20 h-[3px] bg-cyan-300 rounded-full mx-auto mb-6" />

            {/* DESC */}
            <p className="text-white/80 text-[15px] md:text-[16px] leading-7 max-w-2xl mx-auto mb-8">
              Don&apos;t let pain stop you from enjoying life.
              Book your consultation with Dr. Rajneesh Kant
              today and begin your journey toward a healthier,
              pain-free lifestyle with advanced chiropractic care.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              {/* BOOK */}
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0b1f3a] hover:bg-cyan-300 hover:text-[#0b1f3a] px-6 py-3 rounded-xl font-bold text-[15px] transition-all duration-300 shadow-2xl"
              >
                <Calendar size={18} />
                Book Appointment
                <ArrowRight size={16} />
              </Link>

              {/* CALL */}
              <a
                href="tel:9308511357"
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-[15px] transition-all duration-300"
              >
                <Phone size={18} />
                +91-9308511357
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}