import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CookieContent from "@/features/legal/CookieContent";

const TITLE = "Cookie Policy";
const DESCRIPTION =
  "Which cookies Kora Traders uses, why, and how to manage or withdraw your cookie consent at any time.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/cookie-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/cookie-policy"),
          breadcrumbJsonLd("Cookie Policy", "/cookie-policy"),
        ]}
      />
      <PageHero
        id="cookie-policy-heading"
        eyebrow="Legal"
        title="Cookie Policy"
        description="Which cookies we use and how to manage them."
      />
      <CookieContent />
    </>
  );
}
