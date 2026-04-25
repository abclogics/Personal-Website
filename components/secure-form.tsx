"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const token = crypto.randomUUID();
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `csrf-token=${token}; path=/; SameSite=Strict${secure}`;
    setCsrfToken(token);
  }, []);

  return csrfToken;
}

export function turnstileToken() {
  return document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value || "";
}

export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={siteKey} />
    </>
  );
}
