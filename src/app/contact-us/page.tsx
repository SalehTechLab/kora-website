import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import ContactHero from "@/features/contact/ContactHero";
import ContactSection from "@/features/contact/ContactSection";

const TITLE = "Contact Us & Request a Quote";
const DESCRIPTION =
  "Request a quote or reach Kora Traders' offices in Munich, Germany and Lahore, Pakistan for sourcing, procurement and logistics support.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("ContactPage", TITLE, DESCRIPTION, "/contact-us"),
          breadcrumbJsonLd("Contact Us", "/contact-us"),
        ]}
      />
      <ContactHero />
      <ContactSection />
    </>
  );
}
