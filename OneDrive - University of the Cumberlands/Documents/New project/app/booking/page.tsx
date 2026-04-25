import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Consultation",
  description:
    "Request a consultation, workshop planning session, speaking engagement, or executive technology advisory conversation with Dr. Oluseye Fadiran.",
  path: "/booking"
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Request an advisory conversation."
        description="Select a service, share your context, and choose a preferred time. The system generates an .ics invite and sends notifications for review."
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Calendar request"
              title="Secure booking flow with provider-ready calendar abstraction"
              description="The default provider generates .ics invitations. Calendly, Google Calendar, or Cal.com can be connected by extending the provider layer without changing the public form."
            />
          </div>
          <div className="rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm">
            <BookingForm />
          </div>
        </Container>
      </section>
    </>
  );
}
