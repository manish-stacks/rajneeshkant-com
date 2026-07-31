import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Health Blog | Tips on Back Pain, Sciatica & Chiropractic Care",
  description:
    "Read expert articles by Dr. Rajneesh Kant on back pain, neck pain, sciatica, posture correction and physiotherapy tips for a healthier spine.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Health Blog | Dr. Rajneesh Kant",
    description:
      "Expert articles on back pain, sciatica, posture correction and physiotherapy tips.",
    url: "/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Blog | Dr. Rajneesh Kant",
    description: "Expert articles on back pain, sciatica and physiotherapy tips.",
  },
};

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return children;
}
