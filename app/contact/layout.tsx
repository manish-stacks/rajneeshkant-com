import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us | Dr. Rajneesh Kant Chiropractic Clinic",
  description:
    "Get in touch with Dr. Rajneesh Kant's chiropractic and physiotherapy clinic in Mumbai. Find address, phone number, email and clinic timings.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Dr. Rajneesh Kant",
    description:
      "Get in touch with Dr. Rajneesh Kant's chiropractic and physiotherapy clinic in Mumbai.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Dr. Rajneesh Kant",
    description: "Get in touch with our chiropractic clinic in Mumbai.",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
