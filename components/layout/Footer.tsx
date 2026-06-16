"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";

const treatments = [
  "Back Pain Treatment",
  "Neck Pain Therapy",
  "Sciatica Treatment",
  "Physiotherapy",
  "Spine Adjustment",
  "Post Surgery Rehab",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071524] text-white">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* TOP */}
        <div className="py-12 lg:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* BRAND */}
          <div>
            {/* LOGO */}
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo.jpg"
                alt="Dr Rajneesh Kant"
                width={140}
                height={70}
                className="object-contain bg-white rounded-lg p-2"
              />
            </Link>

            <p className="text-white/70 leading-7 text-[14px] mb-5">
              India&apos;s leading chiropractor and physiotherapist
              delivering advanced non-surgical treatment for
              pain relief, posture correction, and spinal care.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3">

              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.href}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#11bfd0] flex items-center justify-center transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* TREATMENTS */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-5">
              Treatments
            </h3>

            <ul className="space-y-3">
              {treatments.map((item, index) => (
                <li key={index}>
                  <Link
                    href="/treatments"
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-[#11bfd0] text-[14px] transition-all duration-300"
                  >
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-all duration-300"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Treatments", href: "/treatments" },
                { label: "Blogs", href: "/blog" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-[#11bfd0] text-[14px] transition-all duration-300"
                  >
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-all duration-300"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-5">
              Contact Info
            </h3>

            <div className="space-y-4">

              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin
                    size={16}
                    className="text-[#11bfd0]"
                  />
                </div>

                <p className="text-white/70 leading-6 text-[14px]">
                  Spine Clinic, Mumbai,
                  Maharashtra, India
                </p>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone
                    size={16}
                    className="text-[#11bfd0]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <a
                    href="tel:9308511357"
                    className="text-white/70 hover:text-[#11bfd0] text-[14px] transition-all duration-300"
                  >
                    +91-9308511357
                  </a>

                  <a
                    href="tel:9137352377"
                    className="text-white/70 hover:text-[#11bfd0] text-[14px] transition-all duration-300"
                  >
                    +91-9137352377
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail
                    size={16}
                    className="text-[#11bfd0]"
                  />
                </div>

                <a
                  href="mailto:rajnish8989@gmail.com"
                  className="text-white/70 hover:text-[#11bfd0] text-[14px] transition-all duration-300 break-all"
                >
                  rajnish8989@gmail.com
                </a>
              </div>

              {/* TIME */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Clock
                    size={16}
                    className="text-[#11bfd0]"
                  />
                </div>

                <div className="text-white/70 leading-6 text-[14px]">
                  <p>Mon - Sat : 9:00 AM - 7:00 PM</p>
                  <p>Sunday : By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-white/50 text-xs sm:text-[13px] text-center md:text-left">
            © {new Date().getFullYear()} Dr. Rajneesh Kant.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-[13px] flex-wrap justify-center">

            <Link
              href="/privacy"
              className="text-white/50 hover:text-[#11bfd0] transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-white/50 hover:text-[#11bfd0] transition-all duration-300"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/sitemap.xml"
              className="text-white/50 hover:text-[#11bfd0] transition-all duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}