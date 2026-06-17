"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/axios";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const FALLBACK_IMG = "/uploads/1781592961818-nprywd.jpg";

const categories = [
  "All",
  "Back Pain",
  "Neck Pain",
  "Sciatica",
  "Sports",
  "Chiropractic",
  "Headache",
];

const PAGE_SIZE = 6; // grid cards per page (the featured article shows on page 1 only)

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCat, setActiveCat] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get("/blogs?limit=200")
      .then((res) => {
        const d = res.data;
        const mapped: Post[] = (d.posts || []).map(
          (p: {
            slug: string;
            title: string;
            excerpt: string;
            category: string;
            publishedAt?: string;
            createdAt: string;
            readTime?: string;
            coverImage?: string;
          }) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category || "General",
            date: p.publishedAt || p.createdAt,
            readTime: p.readTime || "5 min read",
            imageUrl: p.coverImage || FALLBACK_IMG,
          })
        );
        setPosts(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // reset to first page whenever the category changes
  useEffect(() => {
    setPage(1);
  }, [activeCat]);

  const filtered =
    activeCat === "All"
      ? posts
      : posts.filter((p) => p.category === activeCat);

  const featured = filtered[0];
  const gridPosts = filtered.slice(1); // everything except the featured article
  const pageCount = Math.max(1, Math.ceil(gridPosts.length / PAGE_SIZE));
  const pagedGrid = gridPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p: number) => {
    const next = Math.min(Math.max(1, p), pageCount);
    setPage(next);
    if (typeof window !== "undefined") {
      document
        .getElementById("blog-list")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // compact page-number window: 1 … (p-1) p (p+1) … last
  const nums: (number | "…")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - 1 && i <= page + 1)) {
      nums.push(i);
    } else if (nums[nums.length - 1] !== "…") {
      nums.push("…");
    }
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service-banner.jpg"
            alt="Health Resources & Expert Advice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/80" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Expert Health
              <span className="text-sky-500"> Blog</span>
            </h1>

            <p className="text-white text-lg">
              Evidence-based articles on chiropractic care, physiotherapy,
              rehabilitation, pain management and healthy living.
            </p>
          </div>
        </div>
      </section>


      {/* ================= BLOGS ================= */}
      <section id="blog-list" className="relative bg-white py-14 lg:py-20 scroll-mt-28">
        <div className="container mx-auto px-4">
          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  cat === activeCat
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-slate-400 py-16">Loading articles...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-16">
              No articles found in this category.
            </p>
          ) : (
            <>
              {/* FEATURED BLOG — page 1 only */}
              {page === 1 && featured && (
                <div className="grid lg:grid-cols-2 gap-8 items-center rounded-[34px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 md:p-8 shadow-sm mb-12">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-[28px] h-[280px] md:h-[360px]">
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-sky-600">
                        Featured Article
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                        <Tag size={11} />
                        {featured.category}
                      </span>
                      <span className="text-sm text-slate-400">
                        {featured.readTime}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                      {featured.title}
                    </h2>

                    <p className="text-slate-600 leading-8 mb-6">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <span className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar size={16} />
                        {new Date(featured.date).toLocaleDateString("en-IN", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <Link
                        href={`/${featured.slug}`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600"
                      >
                        Read Full Article
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* BLOG GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pagedGrid.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden h-[220px]">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-sky-600">
                          <Tag size={10} />
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar size={12} />
                          {new Date(post.date).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-sky-600 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-500 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600">
                        Read Article
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ================= PAGINATION ================= */}
              {pageCount > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2">
                  <button
                    onClick={() => goTo(page - 1)}
                    disabled={page <= 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {nums.map((n, i) =>
                    n === "…" ? (
                      <span key={`e${i}`} className="px-1.5 text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        onClick={() => goTo(n)}
                        className={`h-10 min-w-[40px] rounded-full px-3 text-sm font-semibold transition ${
                          n === page
                            ? "bg-sky-500 text-white shadow-md"
                            : "border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600"
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goTo(page + 1)}
                    disabled={page >= pageCount}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}