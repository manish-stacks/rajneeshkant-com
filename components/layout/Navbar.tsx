"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import api from "@/lib/axios";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "TREATMENTS", href: "/treatments", dropdown: true },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT US", href: "/contact" },
  { label: "BLOGS", href: "/blogs" },
];

interface MenuTreatment {
  _id: string;
  name: string;
  slug: string;
  showInMenu?: boolean;
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileTreatments, setMobileTreatments] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [treatments, setTreatments] = useState<MenuTreatment[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    api
      .get("/treatments")
      .then((res) => {
        const list: MenuTreatment[] = (res.data.treatments || []).filter(
          (t: MenuTreatment) => t.showInMenu !== false
        );
        setTreatments(list);
      })
      .catch(() => { });
  }, []);

  return (
    <>
      {/* TOP HEADER */}
      <div className="hidden lg:block bg-[#11bfd0] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="tel:+919137352377" className="flex items-center gap-2 hover:text-gray-100 transition">
              <Phone size={14} /> +91-9137352377,
            </a>
            <a href="tel:+918403131311" className="hover:text-gray-100 transition">8403131311,</a>
            <a href="tel:+919301554875" className="hover:text-gray-100 transition">9031554875,</a>
            <a href="tel:+919308511357" className="hover:text-gray-100 transition">9308511357</a>
            <a href="mailto:rajnish8989@gmail.com" className="flex items-center gap-2 hover:text-gray-100 transition">
              <Mail size={14} /> rajnish8989@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition"><Facebook size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition"><Instagram size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition"><Youtube size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white backdrop-blur-md shadow-md" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[92px]">
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/images/logo.jpg"
                alt="Dr Rajneesh Kant"
                width={170}
                height={90}
                priority
                className="object-contain w-auto max-w-[140px] md:max-w-[160px] h-full max-h-[60px]"
              />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const active = pathname === item.href;
                if (item.dropdown) {
                  return (
                    <div key={item.href} className="group relative">
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-1 text-[15px] font-semibold tracking-wide transition-all duration-300 hover:text-[#11bfd0] ${active ? "text-[#11bfd0]" : "text-[#111827]"}`}
                      >
                        {item.label}
                        <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
                      </Link>
                      {/* Dropdown */}
                      {treatments.length > 0 && (
                        <div className="invisible absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                          <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-gray-100 bg-white py-2 shadow-2xl">
                            {treatments.map((t) => (
                              <Link
                                key={t._id}
                                href={`/${t.slug}`}
                                className="block border-b border-gray-50 px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-gray-700 transition-colors last:border-0 hover:bg-[#11bfd0]/10 hover:text-[#11bfd0]"
                              >
                                {t.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link key={item.href} href={item.href} className={`relative text-[15px] font-semibold tracking-wide transition-all duration-300 hover:text-[#11bfd0] ${active ? "text-[#11bfd0]" : "text-[#111827]"}`}>
                    {item.label}
                    {active && <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-[#11bfd0]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link href="/appointment" className="bg-[#0b1f3a] hover:bg-[#11bfd0] text-white px-6 py-3 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300">BOOK YOUR APPOINTMENT</Link>
            </div>

            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden">
              {mobileMenu ? <X className="w-7 h-7 text-black" /> : <Menu className="w-7 h-7 text-black" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenu ? "max-h-screen border-t" : "max-h-0"}`}>
          <div className="bg-white px-4 py-5 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              if (item.dropdown) {
                return (
                  <div key={item.href}>
                    <div className="flex items-center justify-between">
                      <Link href={item.href} onClick={() => setMobileMenu(false)} className={`flex-1 px-4 py-3 rounded-md text-sm font-semibold ${active ? "bg-[#11bfd0]/10 text-[#11bfd0]" : "text-gray-700 hover:bg-gray-100"}`}>
                        {item.label}
                      </Link>
                      <button onClick={() => setMobileTreatments((v) => !v)} className="px-3 py-3 text-gray-500">
                        <ChevronDown size={18} className={`transition-transform ${mobileTreatments ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileTreatments && (
                      <div className="ml-3 border-l border-gray-100 pl-2">
                        {treatments.map((t) => (
                          <Link key={t._id} href={`/${t.slug}`} onClick={() => setMobileMenu(false)} className="block px-4 py-2 text-[13px] font-medium uppercase text-gray-600 hover:text-[#11bfd0]">
                            {t.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenu(false)} className={`px-4 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${active ? "bg-[#11bfd0]/10 text-[#11bfd0]" : "text-gray-700 hover:bg-gray-100"}`}>
                  {item.label}
                </Link>
              );
            })}
            <Link href="/appointment" onClick={() => setMobileMenu(false)} className="mt-4 bg-[#0b1f3a] text-center hover:bg-[#11bfd0] text-white px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300">BOOK YOUR APPOINTMENT</Link>
          </div>
        </div>
      </header>
    </>
  );
}
