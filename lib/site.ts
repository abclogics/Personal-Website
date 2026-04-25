export const siteConfig = {
  name: "Dr. Oluseye Fadiran",
  brand: "Techfluence Signals",
  company: "CompTech Consulting LLC",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://comptconsulting.com",
  email: "oluseye.fadiran@gmail.com",
  bookingForwardEmail: "seyetest@gmail.com",
  portraitImage: "",
  description:
    "Executive technology leadership for growth, security, and scale through AI strategy, cybersecurity governance, cloud modernization, and IT transformation.",
  social: {
    youtube: "https://www.youtube.com/@TechfluenceSignals",
    linkedin: "https://www.linkedin.com/in/olu-fadiran/"
  }
};

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Media", href: "/youtube-media" },
  { label: "Speaking", href: "/speaking-workshops" },
  { label: "Contact", href: "/contact" }
];
