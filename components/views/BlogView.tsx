import Link from "next/link";
import { Calendar, Tag, ArrowLeft, ArrowRight, User, Clock, Phone } from "lucide-react";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";

const FALLBACK_IMG = "/uploads/1781592961818-nprywd.jpg";

export function BlogView({ post, others }: { post: any; others: any[] }) {
  const date = post.publishedAt || post.createdAt;
  const coverImage = post.coverImage || FALLBACK_IMG;
  const fmtDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: coverImage,
    author: { "@type": "Person", name: post.author },
    datePublished: date,
    publisher: {
      "@type": "Organization",
      name: "Dr. Rajneesh Kant Clinic",
      url: "https://drrajneeshkant.com",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Scoped article typography (prose plugin isn't installed, so we style the
          rendered HTML here — keeps the post looking professional & readable). */}
      <style>{`
        .blog-prose { color:#374151; font-size:1.0625rem; line-height:1.8; }
        .blog-prose > :first-child { margin-top:0; }
        .blog-prose h1,.blog-prose h2,.blog-prose h3,.blog-prose h4,.blog-prose h5,.blog-prose h6{
          color:#0f172a; font-weight:700; line-height:1.3; margin:1.8em 0 .6em; scroll-margin-top:7rem;
        }
        .blog-prose h2{ font-size:1.7rem; } .blog-prose h3{ font-size:1.35rem; }
        .blog-prose h4{ font-size:1.15rem; }
        .blog-prose p{ margin:0 0 1.15em; }
        .blog-prose a{ color:#0369a1; text-decoration:underline; text-underline-offset:2px; }
        .blog-prose strong{ color:#111827; font-weight:700; }
        .blog-prose ul{ list-style:disc; padding-left:1.5em; margin:0 0 1.15em; }
        .blog-prose ol{ list-style:decimal; padding-left:1.5em; margin:0 0 1.15em; }
        .blog-prose li{ margin:.4em 0; padding-left:.25em; }
        .blog-prose blockquote{
          border-left:4px solid #38bdf8; background:#f0f9ff; margin:1.5em 0; padding:.8em 1.2em;
          color:#475569; font-style:italic; border-radius:0 .6rem .6rem 0;
        }
        .blog-prose img{ border-radius:.9rem; max-width:100%; height:auto; margin:1.5em 0; }
        .blog-prose pre{ background:#0f172a; color:#e2e8f0; border-radius:.7rem; padding:1em 1.2em; overflow-x:auto; margin:1.5em 0; }
        .blog-prose table{ width:100%; border-collapse:collapse; margin:1.5em 0; display:block; overflow-x:auto; }
        .blog-prose th,.blog-prose td{ border:1px solid #e5e7eb; padding:.55em .8em; text-align:left; }
        .blog-prose th{ background:#f8fafc; font-weight:600; }
        .blog-prose hr{ border:0; border-top:1px solid #e5e7eb; margin:2em 0; }
      `}</style>

      {/* ───────────── HERO ───────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/service-banner.jpg" alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#0F172A]/85 to-[#0F172A]/70" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <Link
              href="/blogs"
              className="mb-6 inline-flex items-center gap-2 text-sm text-blue-200/90 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3.5 py-1.5 text-xs font-semibold text-sky-200 ring-1 ring-inset ring-sky-400/30">
                <Tag size={12} /> {post.category}
              </span>
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl break-words">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-100/90">
              <span className="flex items-center gap-1.5"><User size={15} /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={15} /> {fmtDate}</span>
              {post.readTime && (
                <span className="flex items-center gap-1.5"><Clock size={15} /> {post.readTime}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── BODY ───────────── */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-12">
            {/* MAIN */}
            <div className="min-w-0">
              {/* Cover, pulled up over the hero for a polished overlap */}
              <div className="-mt-20 mb-10 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt={post.title} className="h-[250px] w-full object-cover md:h-[440px]" />
              </div>

              {post.excerpt && (
                <p className="mb-8 border-l-4 border-sky-400 pl-4 text-lg italic leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
              )}

              <div className="min-w-0 overflow-hidden">
                <article
                  className="blog-prose break-words [&_*]:max-w-full [&_iframe]:max-w-full [&_video]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {post.tags?.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
                  <span className="text-sm font-semibold text-gray-500">Tags:</span>
                  {post.tags.map((t: string) => (
                    <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* STICKY SIDEBAR */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {/* CTA */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0F172A]/90 to-[#0F172A] p-8 text-white shadow-2xl">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
                  <div className="relative">
                    <h3 className="font-heading text-2xl font-bold">Need Expert Care?</h3>
                    <p className="mt-3 mb-6 text-sm leading-relaxed text-blue-100">
                      Book a consultation with Dr. Rajneesh Kant for personalised, non-surgical treatment.
                    </p>
                    <Link
                      href="/appointment"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 font-bold text-[#0F172A] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      Book Appointment <ArrowRight size={18} />
                    </Link>
                    <a
                      href="tel:9308511357"
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 py-4 transition-all duration-300 hover:bg-white/10"
                    >
                      <Phone size={18} /> +91 9308511357
                    </a>
                  </div>
                </div>

                {/* Author */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#0F172A] to-[#0F172A]/60 text-xl font-bold text-white">
                      DR
                    </div>
                    <h4 className="font-heading text-lg font-bold text-gray-900">{post.author}</h4>
                    <p className="mt-1 text-sm text-gray-500">Chiropractor &amp; Physiotherapist</p>
                    <p className="mt-4 border-t pt-4 text-sm text-gray-500">
                      Helping patients recover from pain through evidence-based physiotherapy and chiropractic care.
                    </p>
                  </div>
                </div>

                {/* Related */}
                {others?.length > 0 && (
                  <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
                    <h3 className="font-heading mb-4 text-lg font-bold text-gray-900">More Articles</h3>
                    <ul className="space-y-4">
                      {others.slice(0, 4).map((p: any) => (
                        <li key={p.slug}>
                          <Link href={`/${p.slug}`} className="group flex gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.coverImage || FALLBACK_IMG}
                              alt={p.title}
                              className="h-14 w-16 shrink-0 rounded-lg object-cover"
                            />
                            <span className="line-clamp-2 text-sm font-medium text-gray-700 transition-colors group-hover:text-brand-blue">
                              {p.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/blogs"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition-all hover:gap-3"
                    >
                      View all articles <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ───────────── RELATED (mobile / bottom) ───────────── */}
      {others?.length > 0 && (
        <section className="bg-slate-50 py-16 lg:hidden">
          <div className="container mx-auto px-4">
            <h2 className="font-heading mb-6 text-2xl font-bold text-gray-900">More Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.slice(0, 4).map((p: any) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverImage || FALLBACK_IMG} alt={p.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-brand-blue">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <AppointmentCTA /> */}
    </>
  );
}