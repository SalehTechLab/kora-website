"use server";

import { headers } from "next/headers";
import { INTERESTS } from "@/features/contact/interests";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export type QuoteRequest = {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  interest: string;
  message: string;
  consent: boolean;
  /** Honeypot: hidden from people, so any value means a bot filled it in. */
  website?: string;
  /** Epoch ms when the form was shown; instant submits are bots. */
  startedAt?: number;
};

export type QuoteRequestResult = { ok: true } | { ok: false; error: string };

// No whitespace, quotes, commas, angle brackets or extra "@"; needs a dotted domain
const EMAIL_PATTERN = /^[^\s@<>(),;:"'\\]+@[^\s@<>(),;:"'\\]+\.[^\s@<>(),;:"'\\]+$/;
const MIN_FILL_MS = 3_000;
const PER_IP = { limit: 3, windowMs: 10 * 60_000 };
const GLOBAL = { limit: 60, windowMs: 60 * 60_000 };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const CONTROL_CHARS = /[\u0000-\u0009\u000B-\u001F\u007F\u2028\u2029]/g; // keeps \n
const SINGLE_LINE_BREAKS = /[\u000A\u2028\u2029]/g;

/** Normalises text and strips control characters; single-line fields lose line breaks too. */
const clean = (value: unknown, { multiline = false } = {}): string => {
  if (typeof value !== "string") return "";
  const text = value.normalize("NFKC").replace(/\r\n?/g, "\n");
  return (multiline ? text : text.replace(SINGLE_LINE_BREAKS, " "))
    .replace(CONTROL_CHARS, "")
    .trim();
};

const GENERIC_ERROR = "We could not send your request. Please try again or email us.";

export async function submitQuoteRequest(
  request: QuoteRequest,
): Promise<QuoteRequestResult> {
  if (!request || typeof request !== "object") {
    return { ok: false, error: "Please fill in all required fields." };
  }

  // Bots: filled honeypot or submitted faster than a human can type.
  // Report success so they get no signal to adapt to.
  const startedAt = typeof request.startedAt === "number" ? request.startedAt : 0;
  if (clean(request.website) || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: true };
  }

  const ip = clientIp(await headers());
  if (!rateLimit(`ip:${ip}`, PER_IP) || !rateLimit("global", GLOBAL)) {
    return {
      ok: false,
      error: "Too many requests. Please wait a few minutes or email us directly.",
    };
  }

  const fullName = clean(request.fullName);
  const company = clean(request.company);
  const email = clean(request.email);
  const phone = clean(request.phone);
  const country = clean(request.country);
  const interest = clean(request.interest);
  const message = clean(request.message, { multiline: true });

  if (!fullName || !email || !interest || !message) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  if (request.consent !== true) {
    return {
      ok: false,
      error: "Please confirm you have read the Privacy Policy to continue.",
    };
  }
  if (
    fullName.length > 200 ||
    email.length > 254 ||
    phone.length > 50 ||
    country.length > 100 ||
    company.length > 200 ||
    message.length > 5000
  ) {
    return { ok: false, error: "One of the fields is too long." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!(INTERESTS as readonly string[]).includes(interest)) {
    return { ok: false, error: "Please select what you are interested in." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@koratraders.com";
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return {
      ok: false,
      error: "We could not send your request. Please email us directly.",
    };
  }

  const rows: [string, string][] = [
    ["Full Name", fullName],
    ["Company Name", company || "-"],
    ["Business Email", email],
    ["Phone / WhatsApp", phone || "-"],
    ["Country", country || "-"],
    ["Interested In", interest],
  ];

  const html = `
    <h2>New quote request</h2>
    <table cellpadding="6">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;
  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "Kora Website <onboarding@resend.dev>",
        to: to.split(",").map((address) => address.trim()),
        reply_to: email,
        subject: `Business inquiry from website: ${interest} (${fullName})`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(
        "Contact form: Resend error",
        response.status,
        await response.text(),
      );
      return { ok: false, error: GENERIC_ERROR };
    }
  } catch (error) {
    console.error("Contact form: send failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  return { ok: true };
}
