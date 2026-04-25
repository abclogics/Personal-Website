import { siteConfig } from "@/lib/site";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Oluseye Fadiran",
  jobTitle: "Owner and CTO",
  email: siteConfig.email,
  affiliation: {
    "@type": "Organization",
    name: siteConfig.company,
    url: siteConfig.url
  },
  description:
    "Senior IT executive, technology strategist, cybersecurity leader, AI adoption advisor, doctoral researcher, U.S. Army veteran, and Owner/CTO of CompTech Consulting LLC.",
  knowsAbout: [
    "Executive Technology Leadership",
    "Cybersecurity Governance",
    "Responsible AI Adoption",
    "Cloud Modernization",
    "Digital Transformation",
    "M&A Technology Integration"
  ],
  url: siteConfig.url,
  sameAs: [siteConfig.social.youtube, siteConfig.social.linkedin]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.company,
  url: siteConfig.url,
  email: siteConfig.email,
  founder: {
    "@type": "Person",
    name: "Dr. Oluseye Fadiran"
  }
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CompTech Consulting LLC",
  url: siteConfig.url,
  email: siteConfig.email,
  areaServed: "United States",
  serviceType: [
    "Fractional CTO Advisory",
    "Fractional CIO Advisory",
    "Fractional CISO Advisory",
    "AI Strategy",
    "Cybersecurity Governance",
    "Cloud Modernization",
    "M&A Technology Due Diligence"
  ]
};

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: "Dr. Oluseye Fadiran"
    },
    url: `${siteConfig.url}/insights/${post.slug}`
  };
}

export function videoSchema(video: { title: string; description: string; videoId: string }) {
  const hasRealVideo = !video.videoId.startsWith("placeholder");

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    ...(hasRealVideo
      ? {
          thumbnailUrl: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.videoId}`
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "Techfluence Signals"
    }
  };
}
