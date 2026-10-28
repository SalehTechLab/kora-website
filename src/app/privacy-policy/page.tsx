import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import PrivacyContent from "@/features/legal/PrivacyContent";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Kora Traders collects, uses and protects personal data on this website, and the rights you have over your data.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/privacy-policy"),
          breadcrumbJsonLd("Privacy Policy", "/privacy-policy"),
        ]}
      />
      <PageHero
        id="privacy-policy-heading"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle your personal data."
      />
      <PrivacyContent />
    </>
  );
}
