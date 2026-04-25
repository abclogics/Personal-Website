import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { contactNotification } from "@/lib/email/templates";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyCsrf, verifyOrigin } from "@/lib/security/csrf";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { contactSchema } from "@/lib/validation/forms";

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  if (!verifyOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success || !verifyCsrf(request, body?.csrfToken)) {
    return NextResponse.json({ error: "Please review the form and try again." }, { status: 400 });
  }

  const ip = clientIp(request);
  const limited = rateLimit({
    key: `contact:${ip}`,
    fingerprint: `${parsed.data.email}:${parsed.data.subject}`,
    limit: 4
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

  const notification = contactNotification(parsed.data);
  await sendEmail({
    to: process.env.CONTACT_TO_EMAIL || "oluseye.fadiran@gmail.com",
    replyTo: parsed.data.email,
    ...notification
  });

  return NextResponse.json({ ok: true });
}
