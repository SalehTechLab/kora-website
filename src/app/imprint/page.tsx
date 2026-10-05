import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import ImprintSection from "@/components/imprint/ImprintSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Imprint | Kora Traders",
  description:
    "Provider identification for Kora Trader in accordance with § 5 DDG.",
};

export default function ImprintPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        id="imprint-heading"
        eyebrow="Legal"
        title="Imprint"
        description="Provider identification in accordance with § 5 DDG."
      />
      <ImprintSection />
      <Footer />
    </main>
  );
}
