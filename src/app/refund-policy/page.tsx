import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import RefundContent from "@/features/legal/RefundContent";

const TITLE = "Refund & Cancellation Policy";
const DESCRIPTION =
  "How cancellations, returns and refunds work for Kora Traders orders, including defective goods and delivery delays.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/refund-policy",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/refund-policy"),
          breadcrumbJsonLd("Refund & Cancellation Policy", "/refund-policy"),
        ]}
      />
      <PageHero
        id="refund-policy-heading"
        eyebrow="Legal"
        title="Refund & Cancellation Policy"
        description="How cancellations, returns and refunds work."
      />
      <RefundContent />
    </>
  );
}
