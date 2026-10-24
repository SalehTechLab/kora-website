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

  // TODO: deliver the request (email provider / CRM). Until then it only reaches the server logs.
  console.info("New quote request", {
    ...request,
    fullName,
    email,
    phone,
    country,
    interest,
    message,
  });

  return { ok: true };
}
