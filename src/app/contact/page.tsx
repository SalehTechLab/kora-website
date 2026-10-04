import type { Metadata } from "next";
import { App } from "antd";
import Navbar from "@/components/layout/Navbar";
import ContactHero from "@/components/contact/ContactHero";
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
        <ContactHero />
        <ContactSection />
      </App>
      <Footer />
    </main>
  );
}
