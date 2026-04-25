import type { BookingInput } from "@/lib/validation/forms";
import { siteConfig } from "@/lib/site";

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function datePart(date: Date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

function formatFloating(date: Date, time: string) {
  return `${datePart(date)}T${time.replace(":", "")}00`;
}

function addMinutes(time: string, minutes: number) {
  const [hours, mins] = time.split(":").map(Number);
  const date = new Date(Date.UTC(2020, 0, 1, hours, mins + minutes));
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
}

export function bookingTimeSummary(input: BookingInput) {
  return `${input.preferredDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} at ${input.preferredTime} (${input.timezone})`;
}

export function buildBookingIcs(input: BookingInput) {
  const uid = `${Date.now()}-${input.email.replace(/[^a-z0-9]/gi, "")}@comptconsulting.com`;
  const endTime = addMinutes(input.preferredTime, 30);
  const dtStart = formatFloating(input.preferredDate, input.preferredTime);
  const dtEnd = formatFloating(input.preferredDate, endTime);
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CompTech Consulting LLC//Booking Request//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${escapeIcs(input.timezone)}:${dtStart}`,
    `DTEND;TZID=${escapeIcs(input.timezone)}:${dtEnd}`,
    `SUMMARY:${escapeIcs(`${input.service} with Dr. Oluseye Fadiran`)}`,
    `DESCRIPTION:${escapeIcs(`${input.meetingType}\n${input.notes}`)}`,
    `ORGANIZER;CN=CompTech Consulting LLC:mailto:${siteConfig.email}`,
    `ATTENDEE;CN=${escapeIcs(input.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${input.email}`,
    `ATTENDEE;CN=Dr. Oluseye Fadiran;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${siteConfig.email}`,
    `ATTENDEE;CN=Booking Copy;ROLE=OPT-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=FALSE:mailto:${siteConfig.bookingForwardEmail}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  return lines.join("\r\n");
}
