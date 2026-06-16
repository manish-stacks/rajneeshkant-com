import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drrajneeshkant.com";

/**
 * Build Next.js robots metadata from an entity's `robotsIndex` flag.
 * When indexable, emits: index, follow, max-image-preview:large,
 * max-snippet:-1, max-video-preview:-1 (matches the old WP Rank Math output).
 */
export function buildRobots(robotsIndex: boolean): Metadata["robots"] {
  if (!robotsIndex) {
    return { index: false, follow: false, nocache: true };
  }
  return {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

/** Canonical absolute URL for a slug; entity canonical wins if present. */
export function canonicalFor(slug: string, entityCanonical?: string) {
  return entityCanonical && entityCanonical.trim()
    ? entityCanonical
    : `${SITE_URL}/${slug}/`;
}
