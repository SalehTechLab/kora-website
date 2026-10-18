import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import Footer from "@/components/layout/Footer";
import LogisticsIntro from "@/components/logistics/LogisticsIntro";
import LogisticsServices from "@/components/logistics/LogisticsServices";
import LogisticsCTA from "@/components/logistics/LogisticsCTA";

export const metadata: Metadata = {
  title: "Logistics | Kora Traders",
  description:
    "From sourcing to delivery, Kora Traders coordinates international shipping through trusted logistics partners, connecting businesses across borders.",
};

export default function LogisticsPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        id="logistics-heading"
        eyebrow="Logistics"
        title="Connecting Trade. Delivering Worldwide."
        description="From sourcing to delivery, Kora Traders coordinates international shipping through trusted logistics partners, connecting businesses across borders."
      />
      <LogisticsIntro />
      <LogisticsServices />
      <LogisticsCTA />
      <Footer />
    </main>
  );
}
