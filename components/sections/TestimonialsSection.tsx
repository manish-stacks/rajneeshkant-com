"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "@/lib/axios";

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const fallbackTestimonials: TestimonialItem[] = [
  {
    name: "Rahul Sharma",
    role: "Back Pain Patient",
    content:
      "After years of chronic back pain, Dr. Rajneesh Kant helped me recover completely without surgery. The treatment and care were outstanding.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    role: "Neck Pain Recovery",
    content:
      "Excellent chiropractor with a very professional and caring approach. My neck pain improved dramatically within a few sessions.",
    rating: 5,
  },
  {
    name: "Amit Singh",
    role: "Sports Injury Patient",
    content:
      "The best physiotherapy and chiropractic treatment I have experienced. Highly recommended for spine and posture-related issues.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] =
    useState<TestimonialItem[]>(fallbackTestimonials);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => {
        const d = res.data;
        if (d.testimonials && d.testimonials.length > 0) {
          setTestimonials(d.testimonials.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden py-14 lg:py-20 bg-[#0b1f3a]">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-12"
        >
          <p className="uppercase tracking-[3px] text-cyan-300 text-xs sm:text-sm font-bold mb-3">
            Testimonials
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            What Our
            <span className="text-[#11bfd0]">
              {" "}Patients Say
            </span>
          </h2>

          <div className="w-20 h-[3px] bg-[#11bfd0] rounded-full mx-auto mb-5" />

          <p className="max-w-2xl mx-auto text-blue-100 text-[15px] leading-7">
            Thousands of patients have experienced long-lasting
            recovery and pain relief through expert chiropractic
            and physiotherapy care.
          </p>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 hover:bg-[#11bfd0] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >

              {/* QUOTE ICON */}
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-500">
                <Quote
                  size={20}
                  className="text-[#11bfd0] group-hover:text-white transition-all duration-500"
                />
              </div>

              {/* CONTENT */}
              <p className="text-blue-100 leading-7 text-[14px] group-hover:text-white transition-all duration-500 mb-5">
                {item.content}
              </p>

              {/* STARS */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* USER */}
              <div className="flex items-center gap-3">

                {/* AVATAR */}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm border border-white/10">
                  {item.name.charAt(0)}
                </div>

                {/* INFO */}
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {item.name}
                  </h3>

                  <p className="text-blue-200 text-xs group-hover:text-white/80 transition-all duration-500">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* HOVER CIRCLE */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-center gap-4 mt-10">

          <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#11bfd0] text-white flex items-center justify-center transition-all duration-300">
            <ChevronLeft size={20} />
          </button>

          <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#11bfd0] text-white flex items-center justify-center transition-all duration-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}