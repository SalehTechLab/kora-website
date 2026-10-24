"use server";

export type QuoteRequest = {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  message: string;
  consent: boolean;
};

export type QuoteRequestResult = { ok: true } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function submitQuoteRequest(
  request: QuoteRequest,
): Promise<QuoteRequestResult> {
  const fullName = request.fullName?.trim();
  const email = request.email?.trim();
  const phone = request.phone?.trim();
  const country = request.country?.trim();
  const interest = request.interest?.trim();
  const message = request.message?.trim();

  if (!fullName || !email || !phone || !country || !interest || !message) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  if (request.consent !== true) {
    return {
      ok: false,
      error: "Please accept the Privacy Policy to continue.",
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
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

  const company = request.company?.trim() || "-";
  const rows: [string, string][] = [
    ["Full Name", fullName],
    ["Company Name", company],
    ["Business Email", email],
    ["Phone / WhatsApp", phone],
    ["Country", country],
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
    });
    if (!response.ok) {
      console.error(
        "Contact form: Resend error",
        response.status,
        await response.text(),
      );
      return {
        ok: false,
        error: "We could not send your request. Please try again or email us.",
      };
    }
  } catch (error) {
    console.error("Contact form: send failed", error);
    return {
      ok: false,
      error: "We could not send your request. Please try again or email us.",
    };
  }

  return { ok: true };
}
