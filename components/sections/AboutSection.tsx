"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "15+ Years\nClinical\nExperience",
  },
  {
    icon: HeartHandshake,
    title: "Holistic\nPatient-First\nApproach",
  },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8f8] py-20 lg:py-28">
      {/* Background Shape */}
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-cyan-50 rounded-full opacity-70 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[580px] h-[650px]">

              {/* BACK IMAGE */}
              <div className="absolute left-0 top-0 w-[250px] md:w-[290px] h-[470px] rounded-[30px] overflow-hidden shadow-xl">
                <Image
                  src="/images/about-2.webp"
                  alt="Clinic"
                  fill
                  className="object-cover"
                />
              </div>

              {/* FRONT IMAGE */}
              <div className="absolute bottom-0 left-[120px] md:left-[180px] w-[290px] md:w-[360px] h-[560px] rounded-[30px] overflow-hidden shadow-2xl border-[8px] border-white">
                <Image
                  src="/images/dr-rajneesh-kant.jpg"
                  alt="Dr Rajneesh Kant"
                  fill
                  className="object-cover"
                />
              </div>

              {/* EXPERIENCE CARD */}
              <div className="absolute left-6 bottom-10 bg-[#11bfd0] text-white rounded-2xl px-7 py-6 shadow-2xl">
                <h3 className="text-5xl font-black leading-none">
                  15+
                </h3>

                <p className="text-sm mt-2 leading-6 font-medium uppercase tracking-wide">
                  Years Of
                  <br />
                  Experience
                </p>
              </div>

              {/* DECOR */}
              <div className="absolute top-8 right-8 grid grid-cols-4 gap-2">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 bg-cyan-200 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[3px] text-[#11bfd0] text-xs sm:text-sm font-bold mb-3">
              About Dr. Rajneesh Kant
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#0b1f3a] mb-5">
              Chiropractor & Physiotherapist{" "}
              <span className="text-[#11bfd0]">
                in India
              </span>
            </h2>

            <div className="w-20 h-[3px] bg-[#11bfd0] rounded-full mb-6" />

            <div className="space-y-4 text-gray-600 text-[15px] leading-[1.8]">
              <p>
                Dr. Rajneesh Kant in Mumbai is a leading figure in the
                field of Osteopathy and is also recognized as one of the
                Chiropractors in India. His clinic serves as a one-stop
                destination for patients from across the country.
              </p>

              <p>
                He is the trusted choice of hundreds of people who have
                chosen him for the best physiotherapy in Mumbai. He uses
                the latest technology along with manual therapy and
                exercises to offer patients the best possible care.
              </p>

              <p>
                He&apos;s especially known for his success in treating
                postoperative cases and chronic pain. What sets him apart
                is his empathetic approach and patient-first care.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-3 mt-8 mb-6">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-100 hover:bg-cyan-50 transition-all duration-300 p-3 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#11bfd0]/10 flex items-center justify-center shrink-0">
                      <Icon
                        size={22}
                        className="text-[#11bfd0]"
                      />
                    </div>

                    <p className="text-gray-700 text-[13px] font-semibold leading-snug whitespace-pre-line">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-[#11bfd0] hover:bg-[#0ea5b7] text-white px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg"
              >
                View Full Profile
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/appointment"
                className="inline-flex items-center justify-center border-2 border-[#11bfd0] text-[#11bfd0] hover:bg-[#11bfd0] hover:text-white px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}