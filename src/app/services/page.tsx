import type { Metadata } from "next";
import ServicesHero from "@/features/services/ServicesHero";
import ServiceStages from "@/features/services/ServiceStages";
import EngagementModels from "@/features/services/EngagementModels";
import OldWayNewWay from "@/features/services/OldWayNewWay";
import ServicesFAQ from "@/features/services/ServicesFAQ";
import ServicesCTA from "@/features/services/ServicesCTA";
import { FAQS } from "@/features/services/servicesData";

export const metadata: Metadata = {
  title: "Services | Kora Traders",
  description:
    "Sourcing, procurement, quality control, private label, logistics and customs, delivered as one accountable service by Kora Traders in Munich and Lahore.",
};

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
      <ServicesHero />
      <ServiceStages />
      <EngagementModels />
      <OldWayNewWay />
      <ServicesFAQ />
      <ServicesCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
