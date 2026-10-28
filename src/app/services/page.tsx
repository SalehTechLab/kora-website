import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/layout/RelatedLinks";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import ServicesHero from "@/features/services/ServicesHero";
import ServiceStages from "@/features/services/ServiceStages";
import EngagementModels from "@/features/services/EngagementModels";
import OldWayNewWay from "@/features/services/OldWayNewWay";
import ServicesFAQ from "@/features/services/ServicesFAQ";
import ServicesCTA from "@/features/services/ServicesCTA";
import { FAQS } from "@/features/services/servicesData";

const TITLE = "Sourcing & Procurement Services";
const DESCRIPTION =
  "Sourcing, procurement, quality control, private label, logistics and customs, delivered as one accountable service by Kora Traders in Munich and Lahore.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/services"),
          breadcrumbJsonLd("Services", "/services"),
          faqJsonLd,
        ]}
      />
      <ServicesHero />
      <ServiceStages />
      <EngagementModels />
      <OldWayNewWay />
      <ServicesFAQ />
      <ServicesCTA />
      <RelatedLinks items={["products", "logistics", "about"]} />
    </>
  );
}
