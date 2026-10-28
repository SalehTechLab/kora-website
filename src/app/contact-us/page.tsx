import type { Metadata } from "next";
import ContactHero from "@/features/contact/ContactHero";
import ContactSection from "@/features/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Kora Traders",
  description:
    "Request a quote or reach our offices in Germany and Pakistan for sourcing, procurement and logistics.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
