import {
  dbGetTreatments,
  dbGetTreatmentBySlug,
  dbGetMenuTreatments,
  dbGetTestimonials,
  dbGetGallery,
  dbGetPublishedBlogs,
  dbGetBlogBySlug,
  dbGetSettings,
  dbGetPageBySlug,
  dbGetPages,
} from "@/lib/queries";
import {
  treatments as fallbackTreatments,
  testimonials as fallbackTestimonials,
} from "@/lib/data";

/**
 * Server-side content helpers used by Server Components and generateMetadata.
 * Each helper falls back to static defaults if the database is unreachable so
 * the public website never hard-fails.
 */

const DEFAULT_SETTINGS = {
  clinicName: "Dr. Rajneesh Kant Chiropractic & Physiotherapy Clinic",
  phone: "+91-9308511357",
  email: "rajnish8989@gmail.com",
  whatsapp: "+91-9308511357",
  address: "Mumbai, Maharashtra, India",
  facebook: "https://www.facebook.com/drrajneeshkant",
  instagram: "https://www.instagram.com/drrajneeshkant",
  youtube: "",
  openingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
  seoTitle: "Dr. Rajneesh Kant | Top Chiropractor & Physiotherapist in India",
  seoDescription:
    "Dr. Rajneesh Kant is India's leading chiropractor & physiotherapist in Mumbai.",
  seoKeywords: "chiropractor India, physiotherapist Mumbai, back pain treatment",
  headerCode: "",
  footerCode: "",
  robotsTxt: "",
};

export async function getTreatments() {
  try {
    const docs = await dbGetTreatments(false);
    return docs.length ? docs : fallbackTreatments;
  } catch {
    return fallbackTreatments;
  }
}

export async function getMenuTreatments() {
  try {
    return await dbGetMenuTreatments();
  } catch {
    return [];
  }
}

export async function getTreatmentBySlug(slug: string) {
  try {
    const doc = await dbGetTreatmentBySlug(slug);
    if (doc) return doc;
    return fallbackTreatments.find((t) => t.slug === slug) || null;
  } catch {
    return fallbackTreatments.find((t) => t.slug === slug) || null;
  }
}

export async function getTestimonials() {
  try {
    const docs = await dbGetTestimonials(false);
    return docs.length ? docs : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getGalleryImages() {
  try {
    return await dbGetGallery(false);
  } catch {
    return [];
  }
}

export async function getPublishedBlogs(limit = 50) {
  try {
    return await dbGetPublishedBlogs(limit);
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    return await dbGetBlogBySlug(slug, false);
  } catch {
    return null;
  }
}

export async function getSiteSettings() {
  try {
    const s = await dbGetSettings();
    return s || DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getPage(slug: string) {
  try {
    return await dbGetPageBySlug(slug);
  } catch {
    return null;
  }
}

export async function getPages() {
  try {
    return await dbGetPages(false);
  } catch {
    return [];
  }
}
