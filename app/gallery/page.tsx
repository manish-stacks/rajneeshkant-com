"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import LightGallery from "lightgallery/react";

// styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import api from "@/lib/axios";

// export const metadata: Metadata = {
//   title: "Gallery | Clinic Photos & Patient Stories",
//   description:
//     "View photos of Dr. Rajneesh Kant's clinic, treatment facilities and patient recovery stories.",
// };

interface GalleryItem {
  id: string;
  imageUrl: string;
}

// Fallback used if the database has no images yet.
const fallbackItems: GalleryItem[] = [
  { id: "1", imageUrl: "/images/gallery/1.jpg" },
  { id: "2", imageUrl: "/images/gallery/2.jpg" },
  { id: "3", imageUrl: "/images/gallery/3.jpg" },
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackItems);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => {
        const d = res.data;
        if (d.images && d.images.length > 0) {
          setGalleryItems(
            d.images.map((g: { _id: string; imageUrl: string }) => ({
              id: g._id,
              imageUrl: g.imageUrl,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-100 pt-28 pb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 mb-5">
            Clinic Gallery
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Modern Care,
            <span className="text-blue-600"> Comfortable Environment</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
            Explore our advanced clinic facilities, patient-friendly treatment
            spaces, and moments that reflect compassionate healthcare.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Photo Gallery
              </h2>
              <p className="mt-2 text-gray-600">
                Click any image to view in fullscreen gallery mode.
              </p>
            </div>

            <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm text-gray-600 shadow-sm">
              {galleryItems.length} Photos
            </div>
          </div>

          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {galleryItems.map((item) => (
              <a
                key={item.id}
                href={item.imageUrl}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/4] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={`Clinic Gallery ${item.id}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-gray-900 backdrop-blur">
                      View Image
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </LightGallery>

          {/* Bottom Info */}
          <div className="mt-16 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Patient-Centered Healthcare
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Our clinic is designed to provide a calm, hygienic, and
              technology-enabled treatment experience for every patient.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}