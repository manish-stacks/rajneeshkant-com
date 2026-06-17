import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function PageView({ page }: { page: any }) {
  const hasContent = page.content && page.content.trim();
  const updated =
    page.updatedAt &&
    new Date(page.updatedAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="bg-white">
      {/* Scoped article typography (prose plugin isn't installed, so we style the
          rendered HTML here for a clean, professional look). */}
      <style>{`
        .page-prose { color:#374151; font-size:1.0625rem; line-height:1.8; }
        .page-prose > :first-child { margin-top:0; }
        .page-prose h1,.page-prose h2,.page-prose h3,.page-prose h4,.page-prose h5,.page-prose h6{
          color:#0f172a; font-weight:700; line-height:1.3; margin:1.8em 0 .6em; scroll-margin-top:7rem;
        }
        .page-prose h2{ font-size:1.7rem; } .page-prose h3{ font-size:1.35rem; }
        .page-prose h4{ font-size:1.15rem; }
        .page-prose p{ margin:0 0 1.15em; }
        .page-prose a{ color:#0369a1; text-decoration:underline; text-underline-offset:2px; }
        .page-prose strong{ color:#111827; font-weight:700; }
        .page-prose ul{ list-style:disc; padding-left:1.5em; margin:0 0 1.15em; }
        .page-prose ol{ list-style:decimal; padding-left:1.5em; margin:0 0 1.15em; }
        .page-prose li{ margin:.4em 0; padding-left:.25em; }
        .page-prose blockquote{
          border-left:4px solid #38bdf8; background:#f0f9ff; margin:1.5em 0; padding:.8em 1.2em;
          color:#475569; font-style:italic; border-radius:0 .6rem .6rem 0;
        }
        .page-prose img{ border-radius:.9rem; max-width:100%; height:auto; margin:1.5em 0; }
        .page-prose pre{ background:#0f172a; color:#e2e8f0; border-radius:.7rem; padding:1em 1.2em; overflow-x:auto; margin:1.5em 0; }
        .page-prose table{ width:100%; border-collapse:collapse; margin:1.5em 0; display:block; overflow-x:auto; }
        .page-prose th,.page-prose td{ border:1px solid #e5e7eb; padding:.55em .8em; text-align:left; }
        .page-prose th{ background:#f8fafc; font-weight:600; }
        .page-prose hr{ border:0; border-top:1px solid #e5e7eb; margin:2em 0; }
      `}</style>

      {/* ───────────── HERO ───────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/service-banner.jpg" alt={page.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#0F172A]/85 to-[#0F172A]/70" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl break-words">
              {page.title}
            </h1>
            {updated && (
              <p className="mt-4 text-sm text-blue-100/80">Last updated: {updated}</p>
            )}
          </div>
        </div>
      </section>

      {/* ───────────── CONTENT ───────────── */}
      <section className="py-14 md:py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Card-style content sheet, pulled up over the hero */}
            <div className="-mt-20 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-10">
              {hasContent ? (
                <article
                  className="page-prose min-w-0 overflow-hidden break-words [&_*]:max-w-full [&_iframe]:max-w-full [&_video]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              ) : (
                <p className="text-gray-500">This page has no content yet.</p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0F172A]/90 to-[#0F172A] p-8 text-center text-white shadow-xl md:p-10">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Have a question?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-blue-100">
                Our team is happy to help. Reach out and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0F172A] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  Contact Us <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:9308511357"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  <Phone size={16} /> +91 9308511357
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}