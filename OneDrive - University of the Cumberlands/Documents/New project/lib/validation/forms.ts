import { z } from "zod";
import { services } from "@/lib/data";
import { sanitizeText } from "@/lib/security/sanitize";

const serviceNames = services.map((service) => service.title) as [string, ...string[]];

const phoneRegex = /^[0-9+().\-\s]{0,30}$/;
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const contactSchema = z.object({
  name: z.string().min(2).max(100).transform((value) => sanitizeText(value, 100)),
  email: z.string().email().max(160).transform((value) => value.toLowerCase().trim()),
  company: z.string().max(140).optional().default("").transform((value) => sanitizeText(value, 140)),
  subject: z.string().min(3).max(160).transform((value) => sanitizeText(value, 160)),
  message: z.string().min(10).max(4000).transform((value) => sanitizeText(value, 4000)),
  website: z.string().max(500).optional().default(""),
  csrfToken: z.string().min(16),
  turnstileToken: z.string().optional().default("")
});

export const bookingSchema = z.object({
  service: z.enum(serviceNames),
  name: z.string().min(2).max(100).transform((value) => sanitizeText(value, 100)),
  email: z.string().email().max(160).transform((value) => value.toLowerCase().trim()),
  company: z.string().min(2).max(140).transform((value) => sanitizeText(value, 140)),
  role: z.string().min(2).max(140).transform((value) => sanitizeText(value, 140)),
  phone: z.string().regex(phoneRegex).optional().default("").transform((value) => sanitizeText(value, 30)),
  meetingType: z.enum(["Virtual consultation", "Discovery call", "Workshop planning", "Speaking request"]),
  preferredDate: z.coerce.date(),
  preferredTime: z.string().regex(timeRegex),
  timezone: z.string().min(2).max(80).transform((value) => sanitizeText(value, 80)),
  notes: z.string().min(10).max(4000).transform((value) => sanitizeText(value, 4000)),
  website: z.string().max(500).optional().default(""),
  csrfToken: z.string().min(16),
  turnstileToken: z.string().optional().default("")
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
