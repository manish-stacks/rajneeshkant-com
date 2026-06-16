"use client";

import { ArrowRight } from "lucide-react";

const videos = [
  {
    title: "Back Pain Chiropractic Treatment",
    videoId: "qbjv-pX-fF8",
  },
  {
    title: "Advanced Spine Therapy Session",
    videoId: "79zkdpnfgSw",
  },
  {
    title: "Sciatica Pain Relief Exercises",
    videoId: "iGy0RvG3T38",
  },
  {
    title: "Posture Correction Therapy",
    videoId: "GqAxjIVcioA",
  },
];

export default function VideosSection() {
  return (
    <section className="py-14 lg:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-10 lg:mb-12">

          <p className="text-[#11bfd0] uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
            Our Videos
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f3a] mb-4">
            Watch Our Latest Videos
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-[15px] leading-7">
            Explore expert chiropractic treatments,
            physiotherapy sessions, spine correction
            techniques, and patient recovery stories
            from Dr. Rajneesh Kant Clinic.
          </p>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {videos.map((video, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >

              {/* VIDEO */}
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* CONTENT */}
              <div className="px-4 py-3">

                <h3 className="text-[15px] font-semibold text-[#0b1f3a] leading-6 mb-2 line-clamp-2 group-hover:text-[#11bfd0] transition-all duration-300">
                  {video.title}
                </h3>

                <a
                  href={`https://youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#11bfd0] font-semibold text-xs hover:gap-3 transition-all duration-300"
                >
                  Watch On YouTube
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}