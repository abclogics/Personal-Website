import { NextResponse, type NextRequest } from "next/server";
import { createCalendarInvite } from "@/lib/calendar/provider";
import { sendEmail } from "@/lib/email/send";
import { bookingOwnerNotification, bookingVisitorConfirmation } from "@/lib/email/templates";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyCsrf, verifyOrigin } from "@/lib/security/csrf";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { bookingSchema } from "@/lib/validation/forms";

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success || !verifyCsrf(request, body?.csrfToken)) {
    return NextResponse.json({ error: "Please review the booking form and try again." }, { status: 400 });
  }

  const ip = clientIp(request);
  const limited = rateLimit({
    key: `booking:${ip}`,
    fingerprint: `${parsed.data.email}:${parsed.data.preferredDate.toISOString()}:${parsed.data.preferredTime}`,
    limit: 3
  });

  if (!limited.allowed) {
    return NextResponse.json({ error: limited.reason }, { status: 429 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const botCheck = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!botCheck.ok) {
    return NextResponse.json({ error: botCheck.reason }, { status: 400 });
  }

  const invite = await createCalendarInvite(parsed.data);
  const attachment = {
    filename: "consultation-request.ics",
    content: Buffer.from(invite.ics, "utf8").toString("base64")
  };
  const ownerNotification = bookingOwnerNotification(parsed.data, invite.summary);
  const visitorConfirmation = bookingVisitorConfirmation(parsed.data, invite.summary);

  await Promise.all([
    sendEmail({
      to: process.env.BOOKING_TO_EMAIL || "oluseye.fadiran@gmail.com",
      cc: process.env.BOOKING_FORWARD_EMAIL || "seyetest@gmail.com",
      replyTo: parsed.data.email,
      attachments: [attachment],
      ...ownerNotification
    }),
    sendEmail({
      to: parsed.data.email,
      attachments: [attachment],
      ...visitorConfirmation
    })
  ]);

  return NextResponse.json({ ok: true, status: invite.status });
}
