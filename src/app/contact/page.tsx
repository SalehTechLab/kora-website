import type { Metadata } from "next";
import { App } from "antd";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Kora Traders",
  description:
    "Request a quote or reach our offices in Germany and Pakistan for sourcing, procurement and logistics.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <App>
        <PageHero
          id="contact-heading"
          eyebrow="Contact Us"
          title="Tell us what you need to move."
          description="Sourcing a product, arranging freight, or exploring a partnership, we will reply with a straight answer."
        />
        <ContactSection />
      </App>
      <Footer />
    </main>
  );
}
