import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceStages from "@/components/services/ServiceStages";
import EngagementModels from "@/components/services/EngagementModels";
import OldWayNewWay from "@/components/services/OldWayNewWay";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import { FAQS } from "@/components/services/servicesData";

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
    <main>
      <Navbar />
      <ServicesHero />
      <ServiceStages />
      <EngagementModels />
      <OldWayNewWay />
      <ServicesFAQ />
      <ServicesCTA />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
