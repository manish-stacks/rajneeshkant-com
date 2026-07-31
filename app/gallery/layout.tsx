import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Clinic Gallery | Dr. Rajneesh Kant Chiropractic Clinic",
  description:
    "Take a look inside Dr. Rajneesh Kant's chiropractic and physiotherapy clinic in Mumbai — treatment rooms, equipment and patient care in action.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Clinic Gallery | Dr. Rajneesh Kant",
    description:
      "Take a look inside Dr. Rajneesh Kant's chiropractic and physiotherapy clinic in Mumbai.",
    url: "/gallery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinic Gallery | Dr. Rajneesh Kant",
    description: "A look inside our chiropractic clinic in Mumbai.",
  },
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
