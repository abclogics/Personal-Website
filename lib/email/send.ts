type Attachment = {
  filename: string;
  content: string;
};

export type OutboundEmail = {
  to: string | string[];
  cc?: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Attachment[];
};

export async function sendEmail(message: OutboundEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "CompTech Consulting <noreply@comptconsulting.com>";

  if (!apiKey) {
    console.info("Email provider not configured; skipped outbound email", {
      to: message.to,
      cc: message.cc,
      subject: message.subject,
      hasAttachments: Boolean(message.attachments?.length)
    });
    return { skipped: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  return resend.emails.send({
    from,
    to: message.to,
    cc: message.cc,
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
    attachments: message.attachments
  });
}
