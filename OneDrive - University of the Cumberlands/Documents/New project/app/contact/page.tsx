import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Dr. Oluseye Fadiran and CompTech Consulting LLC for executive technology advisory inquiries.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation with CompTech Consulting LLC."
        description="Use the secure form for general inquiries, partnerships, recruiting conversations, and media requests."
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="General inquiry"
              title="Tell us what you are working through"
              description={`Messages route to ${siteConfig.email}. The form includes validation, CSRF checks, rate limiting, honeypot protection, and optional Turnstile verification.`}
            />
          </div>
          <div className="rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
