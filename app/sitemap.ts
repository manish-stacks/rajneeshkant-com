import { MetadataRoute } from "next";
import { getTreatments, getPublishedBlogs, getPages } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/treatments`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/blogs`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/appointment`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery`, changeFrequency: "monthly" as const, priority: 0.6 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  let treatmentPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];
  let contentPages: MetadataRoute.Sitemap = [];

  // Only include entities that are indexable (robotsIndex !== false). Root-level slugs.
  try {
    const treatments = await getTreatments();
    treatmentPages = treatments
      .filter((t: any) => t.robotsIndex !== false)
      .map((t: any) => ({
        url: `${BASE_URL}/${t.slug}/`,
        lastModified: t.updatedAt ? new Date(t.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {}

  try {
    const blogs = await getPublishedBlogs(200);
    // console.log("blog",blogs)
    blogPages = blogs
      .filter((b: any) => b.robotsIndex !== false)
      .map((b: any) => ({
        url: `${BASE_URL}/${b.slug}/`,
        lastModified: new Date(b.updatedAt || b.publishedAt || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {}

  try {
    const pages = await getPages();
    contentPages = pages
      .filter((p: any) => p.robotsIndex !== false)
      .map((p: any) => ({
        url: `${BASE_URL}/${p.slug}/`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {}

  return [...staticPages, ...treatmentPages, ...blogPages, ...contentPages];
}
