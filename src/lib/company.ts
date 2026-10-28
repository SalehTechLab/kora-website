/**
 * Single source of truth for the legal entity details shown in the footer,
 * imprint and the legal documents. Keep in sync with the commercial register.
 */
export const COMPANY = {
  name: "Kora Traders",
  representative: "Amna Sehar",
  street: "Franz-Wolter-Straße",
  postalCity: "81925 Munich",
  country: "Germany",
  register: "HRA 207145",
  registerCourt: "Local Court of Munich (Amtsgericht München)",
  vatId: "DE282283433",
  email: "info@koratraders.com",
  phone: "+49 1521 4181175",
  phoneHref: "tel:+4915214181175",
  domain: "koratraders.com",
} as const;

/** Shown at the top of every legal document. Bump when a document changes. */
export const LEGAL_LAST_UPDATED = "28 October 2026";

export const SHOP_PRIVACY_NOTE =
  "Our separate online shop at shop.koratraders.com has its own terms and privacy notice.";
