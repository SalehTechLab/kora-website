import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import ImprintSection from "@/features/legal/ImprintSection";

const TITLE = "Imprint";
const DESCRIPTION =
  "Provider identification for Kora Traders in accordance with § 5 DDG, including company, register and contact details.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/imprint"),
          breadcrumbJsonLd("Imprint", "/imprint"),
        ]}
      />
      <PageHero
        id="imprint-heading"
        eyebrow="Legal"
        title="Imprint"
        description="Provider identification in accordance with § 5 DDG."
      />
      <ImprintSection />
    </>
  );
}
