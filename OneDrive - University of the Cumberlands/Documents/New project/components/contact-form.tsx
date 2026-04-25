"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Turnstile, turnstileToken, useCsrfToken } from "@/components/secure-form";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const csrfToken = useCsrfToken();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken
      },
      body: JSON.stringify({
        ...payload,
        csrfToken,
        turnstileToken: turnstileToken()
      })
    });

    const data = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "The message could not be sent. Please try again.");
      return;
    }

    setStatus("success");
    setMessage("Thank you. Your message was sent successfully.");
    form.reset();
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Company" name="company" />
      <Field label="Subject" name="subject" required />
      <label className="block">
        <span className="text-sm font-semibold text-[#071527]">Message</span>
        <textarea
          className="focus-ring mt-2 min-h-40 w-full rounded-md border border-[#d9e2ec] bg-white px-4 py-3 text-[#101828]"
          name="message"
          required
        />
      </label>
      <label className="sr-only">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <Turnstile />
      <button
        className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#1b8a8f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15767a] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={status === "submitting" || !csrfToken}
      >
        <Send aria-hidden className="h-4 w-4" />
        {status === "submitting" ? "Sending" : "Send Message"}
      </button>
      {message ? (
        <p className={status === "error" ? "text-sm text-red-700" : "text-sm text-[#166534]"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#071527]">{label}</span>
      <input
        className="focus-ring mt-2 w-full rounded-md border border-[#d9e2ec] bg-white px-4 py-3 text-[#101828]"
        name={name}
        type={type}
        required={required}
      />
    </label>
  );
}
