import type { BookingInput, ContactInput } from "@/lib/validation/forms";
import { escapeHtml } from "@/lib/security/sanitize";
import { siteConfig } from "@/lib/site";

export function contactNotification(input: ContactInput) {
  const subject = `New website inquiry: ${input.subject}`;
  const html = `
    <h1>New website inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(input.company || "Not provided")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
  `;
  const text = `New website inquiry\nName: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company}\nSubject: ${input.subject}`;

  return { subject, html, text };
}

export function bookingOwnerNotification(input: BookingInput, inviteSummary: string) {
  const subject = `Booking request: ${input.service}`;
  const html = `
    <h1>New booking request</h1>
    <p><strong>Service:</strong> ${escapeHtml(input.service)}</p>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(input.company)}</p>
    <p><strong>Role:</strong> ${escapeHtml(input.role)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone || "Not provided")}</p>
    <p><strong>Meeting type:</strong> ${escapeHtml(input.meetingType)}</p>
    <p><strong>Preferred time:</strong> ${escapeHtml(inviteSummary)}</p>
    <p><strong>Notes:</strong></p>
    <p>${escapeHtml(input.notes).replace(/\n/g, "<br />")}</p>
  `;
  const text = `New booking request\nService: ${input.service}\nName: ${input.name}\nEmail: ${input.email}\nPreferred: ${inviteSummary}`;

  return { subject, html, text };
}

export function bookingVisitorConfirmation(input: BookingInput, inviteSummary: string) {
  const subject = `Consultation request received: ${input.service}`;
  const html = `
    <h1>Your consultation request was received</h1>
    <p>Thank you, ${escapeHtml(input.name)}. Your request for <strong>${escapeHtml(input.service)}</strong> has been received.</p>
    <p><strong>Preferred time:</strong> ${escapeHtml(inviteSummary)}</p>
    <p>Dr. Fadiran or CompTech Consulting LLC will confirm availability and next steps.</p>
    <p>Regards,<br />${escapeHtml(siteConfig.company)}</p>
  `;
  const text = `Your consultation request was received.\nService: ${input.service}\nPreferred: ${inviteSummary}`;

  return { subject, html, text };
}
