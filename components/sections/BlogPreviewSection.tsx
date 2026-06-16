"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Tag,
} from "lucide-react";
import api from "@/lib/axios";

interface PreviewPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop";

const fallbackPosts: PreviewPost[] = [
  {
    slug: "lower-back-pain-causes-treatment",
    title: "Understanding Lower Back Pain & Chiropractic Treatment",
    excerpt:
      "Discover the root causes of lower back pain and how non-surgical chiropractic care helps in long-term recovery.",
    category: "Back Pain",
    date: "2024-06-15",
    image: FALLBACK_IMG,
  },
  {
    slug: "sciatica-exercises-relief",
    title: "5 Effective Exercises To Relieve Sciatica Pain Naturally",
    excerpt:
      "These expert-approved physiotherapy exercises can reduce sciatic pain and improve spinal mobility.",
    category: "Sciatica",
    date: "2024-07-02",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "chiropractic-care-benefits",
    title: "Top Benefits Of Chiropractic Care For Everyday Wellness",
    excerpt:
      "Modern chiropractic techniques improve posture, mobility, pain relief, and overall body function.",
    category: "Chiropractic",
    date: "2024-07-20",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
  },
];

export function BlogPreviewSection() {
  const [posts, setPosts] = useState<PreviewPost[]>(fallbackPosts);

  useEffect(() => {
    api
      .get("/blogs?limit=3")
      .then((res) => {
        const d = res.data;
        if (d.posts && d.posts.length > 0) {
          setPosts(
            d.posts.map(
              (p: {
                slug: string;
                title: string;
                excerpt: string;
                category: string;
                publishedAt?: string;
                createdAt: string;
                coverImage?: string;
              }) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt,
                category: p.category || "General",
                date: p.publishedAt || p.createdAt,
                image: p.coverImage || FALLBACK_IMG,
              })
            )
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8fcfc] py-14 lg:py-20">

      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-cyan-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10 lg:mb-12">

          <div>
            <p className="uppercase tracking-[3px] text-[#11bfd0] text-xs sm:text-sm font-bold mb-3">
              Health Blog
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f3a] leading-tight">
              Expert Health
              <span className="text-[#11bfd0]">
                {" "}Articles
              </span>
            </h2>

            <div className="w-20 h-[3px] bg-[#11bfd0] rounded-full mt-4" />
          </div>

          {/* BUTTON */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#11bfd0] font-semibold text-[15px] hover:gap-3 transition-all duration-300"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* BLOG GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {posts.map((post, index) => (
            <Link
              key={index}
              href={`/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-cyan-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden h-[200px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />

                {/* CATEGORY */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#11bfd0] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    <Tag size={11} />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* DATE */}
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={13} />

                  {new Date(post.date).toLocaleDateString(
                    "en-IN",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-bold text-[#0b1f3a] leading-snug mb-3 group-hover:text-[#11bfd0] transition-all duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-600 leading-6 text-[14px] line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {/* READ MORE */}
                <div className="inline-flex items-center gap-2 text-[#11bfd0] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Read More
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}