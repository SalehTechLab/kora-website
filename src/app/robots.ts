import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Don't disallow /_next/: Google needs those CSS and JS files to render the pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
