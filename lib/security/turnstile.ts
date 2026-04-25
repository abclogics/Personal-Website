export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const required = process.env.REQUIRE_TURNSTILE === "true" || process.env.NODE_ENV === "production";

  if (!secret) {
    return {
      ok: !required,
      reason: required ? "Bot protection is not configured." : "Bot protection skipped in local development."
    };
  }

  if (!token) {
    return { ok: false, reason: "Bot verification is required." };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData
  });
  const data = (await response.json()) as { success?: boolean };

  return data.success ? { ok: true } : { ok: false, reason: "Bot verification failed." };
}
