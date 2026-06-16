import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  dbResolveSlug,
  dbGetTreatments,
  dbGetPublishedBlogs,
} from "@/lib/queries";
import { TreatmentView } from "@/components/views/TreatmentView";
import { BlogView } from "@/components/views/BlogView";
import { PageView } from "@/components/views/PageView";
import { buildRobots, canonicalFor } from "@/lib/seo";

// ISR: pages are cached and rebuilt at most once per `revalidate` window,
// so repeat visits are served from a fast static cache instead of hitting the
// DB on every request. Edits in admin appear within this window.
export const revalidate = 300;
export const dynamicParams = true;

// Pre-render all known treatment / blog / page slugs at build time.
export async function generateStaticParams() {
  try {
    const { dbGetTreatments, dbGetPublishedBlogs, dbGetPages } = await import("@/lib/queries");
    const [treatments, blogs, pages] = await Promise.all([
      dbGetTreatments(false).catch(() => []),
      dbGetPublishedBlogs(500).catch(() => []),
      dbGetPages(false).catch(() => []),
    ]);
    return [
      ...treatments.map((t: any) => ({ slug: t.slug })),
      ...blogs.map((b: any) => ({ slug: b.slug })),
      ...pages.map((p: any) => ({ slug: p.slug })),
    ];
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

/* ── SEO: dynamic canonical + per-entity index/noindex robots ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await dbResolveSlug(slug).catch(() => null);
  if (!resolved) return {};
  const e = resolved.data as any;

  const title =
    e.metaTitle ||
    (resolved.type === "treatment" ? `${e.name} | Dr. Rajneesh Kant` : e.title);
  const description = e.metaDescription || e.excerpt || e.shortDesc || "";

  return {
    title,
    description,
    robots: buildRobots(e.robotsIndex !== false),
    alternates: { canonical: canonicalFor(slug, e.canonical) },
    openGraph: {
      title,
      description,
      type: resolved.type === "blog" ? "article" : "website",
      url: canonicalFor(slug, e.canonical),
    },
  };
}

export default async function RootSlugPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await dbResolveSlug(slug).catch(() => null);
  if (!resolved) notFound();

  if (resolved.type === "treatment") {
    const all = await dbGetTreatments(false).catch(() => []);
    const related = all.filter((t: any) => t.slug !== resolved.data.slug).slice(0, 3);
    return <TreatmentView treatment={resolved.data} related={related} />;
  }
  if (resolved.type === "blog") {
    const all = await dbGetPublishedBlogs(20).catch(() => []);
    const others = all.filter((p: any) => p.slug !== resolved.data.slug);
    return <BlogView post={resolved.data} others={others} />;
  }
  return <PageView page={resolved.data} />;
}
