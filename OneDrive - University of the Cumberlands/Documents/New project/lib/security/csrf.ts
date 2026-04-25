import type { NextRequest } from "next/server";

export function verifyCsrf(request: NextRequest, token?: string) {
  const cookieToken = request.cookies.get("csrf-token")?.value;
  const headerToken = request.headers.get("x-csrf-token");

  if (!token || !cookieToken || !headerToken) {
    return false;
  }

  return token === cookieToken && token === headerToken;
}

export function verifyOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
