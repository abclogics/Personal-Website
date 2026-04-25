import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Security",
  description: "Security and anti-spam posture for the CompTech Consulting LLC website.",
  path: "/security"
});

const controls = [
  "Server-side Zod validation on all form submissions.",
  "CSRF token verification and same-origin checks.",
  "Rate limiting and repeated-submission detection.",
  "Cloudflare Turnstile support for bot protection.",
  "Honeypot fields and input sanitization.",
  "Secure HTTP headers, including CSP, HSTS, Referrer-Policy, and Permissions-Policy.",
  "Environment-variable based secrets with no exposed API keys.",
  "Provider abstraction for email and calendar integrations."
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Security and Anti-Spam Posture"
        description="The production site protects contact and booking workflows with validation, abuse controls, secure headers, and privacy-conscious handling."
      />
      <section className="py-16">
        <Container className="max-w-4xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#e7f3f3] text-[#1b8a8f]">
          <ShieldCheck aria-hidden className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-[#071527]">Security and Anti-Spam Posture</h1>
        <p className="mt-5 text-lg leading-8 text-[#475467]">
          The public site assumes HTTPS deployment, protects contact and booking workflows, and avoids unnecessary storage of
          sensitive message content.
        </p>
        <div className="mt-10 grid gap-4">
          {controls.map((control) => (
            <div key={control} className="rounded-lg border border-[#d9e2ec] bg-white p-5 text-sm leading-7 text-[#344054] shadow-sm">
              {control}
            </div>
          ))}
        </div>
        </Container>
      </section>
    </>
  );
}
