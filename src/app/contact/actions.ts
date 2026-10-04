"use server";

export type QuoteRequest = {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  interest?: string;
  message: string;
};

export type QuoteRequestResult = { ok: true } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitQuoteRequest(
  request: QuoteRequest,
): Promise<QuoteRequestResult> {
  const fullName = request.fullName?.trim();
  const email = request.email?.trim();
  const message = request.message?.trim();

  if (!fullName || !email || !message) {
    return { ok: false, error: "Please fill in your name, email and message." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // TODO: deliver the request (email provider / CRM). Until then it only reaches the server logs.
  console.info("New quote request", { ...request, fullName, email, message });

  return { ok: true };
}
