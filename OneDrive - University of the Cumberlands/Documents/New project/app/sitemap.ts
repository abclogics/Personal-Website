import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/booking",
  "/contact",
  "/insights",
  "/youtube-media",
  "/speaking-workshops",
  "/privacy-policy",
  "/terms-of-use",
  "/security"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticEntries, ...postEntries];
}
