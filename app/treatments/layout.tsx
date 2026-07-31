import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Treatments | Chiropractic & Physiotherapy Care",
  description:
    "Explore chiropractic and physiotherapy treatments offered by Dr. Rajneesh Kant for back pain, neck pain, sciatica, sports injuries and more in Mumbai.",
  alternates: { canonical: "/treatments" },
  openGraph: {
    title: "Our Treatments | Dr. Rajneesh Kant",
    description:
      "Chiropractic and physiotherapy treatments for back pain, neck pain, sciatica, sports injuries and more.",
    url: "/treatments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Treatments | Dr. Rajneesh Kant",
    description: "Chiropractic and physiotherapy treatments in Mumbai.",
  },
};

export default function TreatmentsLayout({ children }: { children: ReactNode }) {
  return children;
}
