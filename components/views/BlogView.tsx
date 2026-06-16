import Link from "next/link";
import { Calendar, Tag, ArrowLeft, User } from "lucide-react";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";

const FALLBACK_IMG = "/uploads/1781592961818-nprywd.jpg";

export function BlogView({ post, others }: { post: any; others: any[] }) {
  const date = post.publishedAt || post.createdAt;
  const coverImage = post.coverImage || FALLBACK_IMG;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: coverImage,
    author: { "@type": "Person", name: post.author },
    datePublished: date,
    publisher: { "@type": "Organization", name: "Dr. Rajneesh Kant Clinic", url: "https://drrajneeshkant.com" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="overflow-x-hidden pt-28 pb-10 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full">
              <Tag size={11} /> {post.category}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-words">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />
              {new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding overflow-x-hidden bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10 overflow-hidden rounded-3xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={post.title} className="w-full h-[250px] md:h-[420px] object-cover" />
          </div>

          {/* min-w-0 + overflow constraints stop wide WP content (images, tables,
              iframes, long URLs) from breaking the layout horizontally. */}
          <div className="min-w-0 overflow-hidden">
            <article
              className="prose prose-blue prose-lg max-w-none break-words
                         prose-headings:break-words
                         prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl
                         prose-pre:overflow-x-auto prose-pre:max-w-full
                         [&_*]:max-w-full
                         [&_img]:h-auto
                         [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto
                         [&_iframe]:max-w-full [&_video]:max-w-full
                         [&_figure]:mx-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}