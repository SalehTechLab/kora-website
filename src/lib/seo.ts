import type { Metadata } from "next";
import { COMPANY } from "./company";

/** Canonical origin. Apex domain, https only (www already 301s to it at the host). */
export const SITE_URL = `https://${COMPANY.domain}`;
export const SITE_NAME = COMPANY.name;
export const SITE_DESCRIPTION =
  "Kora Traders sources, procures and delivers commodities worldwide, from Himalayan salt to surgical instruments, with logistics handled end to end.";

/** Every indexable route. Drives the sitemap, so add new pages here. */
export const PAGES = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/products", priority: 0.9 },
  { path: "/logistics", priority: 0.8 },
  { path: "/about-us", priority: 0.7 },
  { path: "/contact-us", priority: 0.7 },
  { path: "/imprint", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/refund-policy", priority: 0.3 },
  { path: "/cookie-policy", priority: 0.3 },
  { path: "/licenses", priority: 0.3 },
] as const;

// Per-page openGraph/twitter replace the root ones wholesale, so each carries the share image.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: We Source. We Procure. We Deliver.`,
};

type PageMetaInput = {
  /** Page title without the brand; the root layout template appends " | Kora Traders". */
  title: string;
  description: string;
  /** Route path, e.g. "/about-us". Becomes the canonical and og:url. */
  path: string;
  /** Title already contains the brand (home page): skip the template and OG suffix. */
  absoluteTitle?: boolean;
};

/** Title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: "/twitter-image", width: 1200, height: 630, alt: OG_IMAGE.alt }],
    },
  };
}

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** BreadcrumbList for an inner page: Home > Page. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: abs(path) },
    ],
  };
}

/** Typed WebPage node (AboutPage, ContactPage, CollectionPage...) linked to the site. */
export function webPageJsonLd(
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage",
  name: string,
  description: string,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: abs(path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/favicon/android-chrome-512x512.png`,
  description: SITE_DESCRIPTION,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  vatID: COMPANY.vatId,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: "81925",
    addressLocality: "Munich",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: COMPANY.email,
    telephone: COMPANY.phone,
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.linkedin.com/in/kora_traders",
    "https://www.facebook.com/kora.traders",
    "https://www.instagram.com/kora_traders",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};
