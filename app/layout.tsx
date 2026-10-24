import type { Metadata } from "next";
import Script from "next/script";
// stub
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LayoutSection from "@/components/LayoutSection";
import CodeInjector from "@/components/CodeInjector";
import { getSiteSettings } from "@/lib/content";

const inter = { variable: "--font-inter" };

const poppins = { variable: "--font-poppins" };

const GTM_ID = "GTM-NKBMGHW4";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://drrajneeshkant.com",
  ),
  title: {
    default: "Dr. Rajneesh Kant | Top Chiropractor & Physiotherapist in India",
    template: "%s | Dr. Rajneesh Kant",
  },
  description:
    "Dr. Rajneesh Kant is India's leading chiropractor & physiotherapist in Mumbai. Expert treatment for back pain, neck pain, sciatica, sports injuries & more. Book appointment today.",
  // No global `keywords` here on purpose: Next.js metadata falls back to the
  // parent layout's value for any page that doesn't set its own, which was
  // causing every page (about, treatments, blogs, etc.) to output this same
  // Home-page keyword list. Each page/entity should set `keywords` itself
  // (see app/page.tsx, app/[slug]/page.tsx) or omit it.
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
    description: "Expert chiropractic & physiotherapy care in Mumbai.",
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
    google: "Q89W1qS3lZPLE4W7j0p3HhpNPFAb4Xt7ZpIiMeFnwvE",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <CodeInjector code={settings.headerCode} position="header" />
        <LayoutSection>{children}</LayoutSection>
        <Toaster />
        <CodeInjector code={settings.footerCode} position="footer" />
      </body>
    </html>
  );
}