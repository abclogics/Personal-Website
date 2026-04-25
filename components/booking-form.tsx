"use client";

import { CalendarCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Turnstile, turnstileToken, useCsrfToken } from "@/components/secure-form";
import { serviceOptions } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

const meetingTypes = ["Virtual consultation", "Discovery call", "Workshop planning", "Speaking request"];

export function BookingForm() {
  const csrfToken = useCsrfToken();
  const [timezone, setTimezone] = useState("America/New_York");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York");
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/booking", {
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
      setMessage(data.error || "The booking request could not be submitted. Please try again.");
      return;
    }

    setStatus("success");
    setMessage("Your booking request was sent. A calendar invitation has been generated and forwarded for review.");
    form.reset();
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <label className="block">
        <span className="text-sm font-semibold text-[#071527]">Service</span>
        <select className="focus-ring mt-2 w-full rounded-md border border-[#d9e2ec] bg-white px-4 py-3" name="service" required>
          {serviceOptions.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" required />
        <Field label="Role" name="role" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" />
        <label className="block">
          <span className="text-sm font-semibold text-[#071527]">Meeting type</span>
          <select className="focus-ring mt-2 w-full rounded-md border border-[#d9e2ec] bg-white px-4 py-3" name="meetingType" required>
            {meetingTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Preferred date" name="preferredDate" type="date" required />
        <Field label="Preferred time" name="preferredTime" type="time" required />
        <label className="block">
          <span className="text-sm font-semibold text-[#071527]">Timezone</span>
          <input
            className="focus-ring mt-2 w-full rounded-md border border-[#d9e2ec] bg-white px-4 py-3"
            name="timezone"
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
            required
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-[#071527]">Notes or current challenges</span>
        <textarea
          className="focus-ring mt-2 min-h-40 w-full rounded-md border border-[#d9e2ec] bg-white px-4 py-3 text-[#101828]"
          name="notes"
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
        <CalendarCheck aria-hidden className="h-4 w-4" />
        {status === "submitting" ? "Submitting" : "Submit Booking Request"}
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
