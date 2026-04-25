import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/executive-technology-hero.png"
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [image],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
