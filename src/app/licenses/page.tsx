import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import LicensesContent from "@/features/legal/LicensesContent";

const TITLE = "Licences & Credits";
const DESCRIPTION =
  "Open font licences, software credits and image rights for the Kora Traders website.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/licenses",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/licenses"),
          breadcrumbJsonLd("Licences & Credits", "/licenses"),
        ]}
      />
      <PageHero
        id="licenses-heading"
        eyebrow="Legal"
        title="Licences & Credits"
        description="Fonts, software and image rights."
      />
      <LicensesContent />
    </>
  );
}
