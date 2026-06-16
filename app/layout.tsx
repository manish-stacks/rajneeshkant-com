import type { Metadata } from "next";
// stub
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LayoutSection from "@/components/LayoutSection";
import CodeInjector from "@/components/CodeInjector";
import { getSiteSettings } from "@/lib/content";

const inter={variable:"--font-inter"};

const poppins={variable:"--font-poppins"};



export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://drrajneeshkant.com"),
  title: {
    default: "Dr. Rajneesh Kant | Top Chiropractor & Physiotherapist in India",
    template: "%s | Dr. Rajneesh Kant",
  },
  description:
    "Dr. Rajneesh Kant is India's leading chiropractor & physiotherapist in Mumbai. Expert treatment for back pain, neck pain, sciatica, sports injuries & more. Book appointment today.",
  keywords: [
    "chiropractor India",
    "physiotherapist Mumbai",
    "back pain treatment Mumbai",
    "neck pain treatment",
    "sciatica treatment",
    "Dr Rajneesh Kant",
    "spine specialist Mumbai",
    "chiropractic care India",
  ],
  authors: [{ name: "Dr. Rajneesh Kant" }],
  creator: "Dr. Rajneesh Kant",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://drrajneeshkant.com",
    siteName: "Dr. Rajneesh Kant - Chiropractor & Physiotherapist",
    title: "Dr. Rajneesh Kant | Top Chiropractor in India",
    description:
      "Expert chiropractic & physiotherapy care in Mumbai. Treating back pain, neck pain, sciatica, sports injuries and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Rajneesh Kant - Leading Chiropractor in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Rajneesh Kant | Top Chiropractor in India",
    description:
      "Expert chiropractic & physiotherapy care in Mumbai.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const sameAs = [settings.facebook, settings.instagram, settings.youtube]
    .filter(Boolean);

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: settings.clinicName,
              description:
                "Leading chiropractic and physiotherapy clinic in Mumbai, India.",
              url: "https://drrajneeshkant.com",
              telephone: settings.phone,
              email: settings.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 19.076,
                longitude: 72.8777,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                  ],
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              sameAs:
                sameAs.length > 0
                  ? sameAs
                  : [
                      "https://www.facebook.com/drrajneeshkant",
                      "https://www.instagram.com/drrajneeshkant",
                    ],
              hasMap: "https://maps.google.com/?q=Mumbai",
              medicalSpecialty: "Chiropractic",
              founder: {
                "@type": "Physician",
                name: "Dr. Rajneesh Kant",
                jobTitle: "Chiropractor & Physiotherapist",
                knowsAbout: [
                  "Chiropractic Care",
                  "Physiotherapy",
                  "Back Pain Treatment",
                  "Neck Pain Treatment",
                  "Sciatica Treatment",
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <CodeInjector code={settings.headerCode} position="header" />
        <LayoutSection>
          {children}
        </LayoutSection>
        <Toaster />
        <CodeInjector code={settings.footerCode} position="footer" />
      </body>
    </html>
  );
}
