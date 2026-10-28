import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import TermsContent from "@/features/legal/TermsContent";

const TITLE = "Terms & Conditions";
const DESCRIPTION =
  "Terms and conditions for using the Kora Traders website and for our trade and sourcing services.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/terms"),
          breadcrumbJsonLd("Terms & Conditions", "/terms"),
        ]}
      />
      <PageHero
        id="terms-heading"
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms that apply to our website and services."
      />
      <TermsContent />
    </>
  );
}
