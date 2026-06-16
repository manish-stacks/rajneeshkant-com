"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Activity,
  ShieldCheck,
  HeartPulse,
  Sparkles,
} from "lucide-react";

const features = [
  "Advanced Chiropractic Techniques",
  "Non-Surgical Pain Relief",
  "Customized Treatment Plans",
  "Posture & Spine Correction",
  "Modern Physiotherapy Equipment",
  "Patient-Centered Holistic Care",
];

const cards = [
  {
    icon: Activity,
    title: "Spinal Manipulation",
    desc: "Realign vertebrae to reduce pain and improve body function naturally.",
  },
  {
    icon: HeartPulse,
    title: "Cervical Traction",
    desc: "Relieve pressure on spinal nerves and improve neck mobility.",
  },
  {
    icon: ShieldCheck,
    title: "Myofascial Release",
    desc: "Release muscle tension and restore flexibility for better movement.",
  },
  {
    icon: Sparkles,
    title: "Posture Correction",
    desc: "Advanced posture programs to prevent chronic pain and imbalance.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8fcfc] py-14 lg:py-20">

      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[3px] text-[#11bfd0] text-xs sm:text-sm font-bold mb-3">
              Why Choose Us
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f3a] leading-tight mb-5">
              The Best Care You
              <span className="text-[#11bfd0]">
                {" "}Can Find Here
              </span>
            </h2>

            <div className="w-20 h-[3px] bg-[#11bfd0] rounded-full mb-6" />

            <p className="text-gray-600 text-[15px] leading-[1.9] mb-7">
              At Dr. Rajneesh Kant&apos;s clinic, patients receive
              holistic and personalized chiropractic care focused on
              identifying the root cause of pain. Through advanced
              techniques, modern technology, and years of clinical
              expertise, we ensure long-term recovery and improved
              quality of life.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-cyan-50 hover:shadow-lg transition-all duration-300"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#11bfd0] shrink-0 mt-0.5"
                  />

                  <p className="text-gray-700 leading-snug font-medium text-[13px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    index % 2 === 0
                      ? "bg-[#11bfd0] text-white"
                      : "bg-white border border-cyan-100"
                  }`}
                >

                  {/* ICON */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      index % 2 === 0
                        ? "bg-white/15"
                        : "bg-cyan-50"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={`${
                        index % 2 === 0
                          ? "text-white"
                          : "text-[#11bfd0]"
                      }`}
                    />
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`text-lg font-bold mb-2 leading-snug ${
                      index % 2 === 0
                        ? "text-white"
                        : "text-[#0b1f3a]"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className={`leading-6 text-[14px] ${
                      index % 2 === 0
                        ? "text-white/90"
                        : "text-gray-600"
                    }`}
                  >
                    {card.desc}
                  </p>

                  {/* HOVER EFFECT */}
                  <div
                    className={`absolute -bottom-16 -right-16 w-32 h-32 rounded-full ${
                      index % 2 === 0
                        ? "bg-white/10"
                        : "bg-cyan-50"
                    }`}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}