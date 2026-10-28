import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/lib/seo";

// No lastModified on purpose: a build-time "now" would claim every page changed on
// every deploy, and Google then learns to ignore the field. Add real dates per page
// if content starts changing on a schedule.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    priority,
  }));
}
