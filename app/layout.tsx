import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { personSchema, organizationSchema, professionalServiceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Dr. Oluseye Fadiran | Executive Technology Leadership",
    template: "%s | Dr. Oluseye Fadiran"
  },
  description:
    "Executive technology leadership, cybersecurity governance, AI strategy, cloud modernization, and fractional CTO/CIO/CISO advisory for growth-focused organizations.",
  applicationName: "Techfluence Signals",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Dr. Oluseye Fadiran | Technology Leadership for Growth, Security, and Scale",
    description:
      "Strategic advisory across IT transformation, cybersecurity governance, AI adoption, cloud modernization, and M&A technology integration.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: ["/images/executive-technology-hero.png"],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Oluseye Fadiran | Executive Technology Leadership",
    description:
      "Helping executives and technology teams turn IT, cybersecurity, cloud, and AI into measurable business advantage.",
    images: ["/images/executive-technology-hero.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071527"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[personSchema, organizationSchema, professionalServiceSchema]} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
