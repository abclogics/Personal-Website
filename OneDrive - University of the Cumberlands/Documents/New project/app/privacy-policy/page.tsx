import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Dr. Oluseye Fadiran and CompTech Consulting LLC.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        description="How CompTech Consulting LLC handles inquiry and booking information submitted through the public website."
      />
      <section className="py-16">
        <Container className="max-w-4xl">
          <div className="prose-content">
          <p>
            {siteConfig.company} collects only the information needed to respond to inquiries, evaluate booking requests, and
            provide consulting services. This may include your name, email, company, role, phone number, preferred meeting
            details, and the message you submit.
          </p>
          <h2>How information is used</h2>
          <p>
            Information submitted through the site is used to respond to your request, send booking confirmations, route
            calendar invitations, and protect the site from abuse. Sensitive message content is not intentionally retained in
            application logs.
          </p>
          <h2>Service providers</h2>
          <p>
            The site is designed to use secure providers such as Resend, Google Calendar, Calendly, Cal.com, or equivalent
            services when configured. Provider use is limited to contact, booking, email, and calendar workflows.
          </p>
          <h2>Your choices</h2>
          <p>
            You may request correction or deletion of inquiry information by contacting {siteConfig.email}. Do not submit
            confidential, regulated, or highly sensitive information through public forms.
          </p>
          </div>
        </Container>
      </section>
    </>
  );
}
