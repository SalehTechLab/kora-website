import type { MetadataRoute } from "next";
import { LEGAL_LAST_UPDATED } from "@/lib/company";
import { PAGES, SITE_URL } from "@/lib/seo";

// lastModified only where a real date exists (the legal documents). A build-time "now"
// would claim every page changed on every deploy, and Google then learns to ignore the field.
const legalModified = new Date(`${LEGAL_LAST_UPDATED} UTC`);

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority, legal }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    priority,
    ...(legal && { lastModified: legalModified }),
  }));
}
