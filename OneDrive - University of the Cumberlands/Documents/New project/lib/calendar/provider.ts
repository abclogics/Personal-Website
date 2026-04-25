import type { BookingInput } from "@/lib/validation/forms";
import { buildBookingIcs, bookingTimeSummary } from "@/lib/calendar/ics";

export async function createCalendarInvite(input: BookingInput) {
  const provider = process.env.CALENDAR_PROVIDER || "ics";
  const ics = buildBookingIcs(input);

  if (provider === "google") {
    console.info("Google Calendar provider selected; using ICS fallback until Google credentials are wired.");
  }

  return {
    provider,
    status: "requested",
    summary: bookingTimeSummary(input),
    ics
  };
}
