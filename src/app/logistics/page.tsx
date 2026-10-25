import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import LogisticsHero from "@/components/logistics/LogisticsHero";
import Footer from "@/components/layout/Footer";
import LogisticsIntro from "@/components/logistics/LogisticsIntro";
import LogisticsServices from "@/components/logistics/LogisticsServices";
import KoraAdvantage from "@/components/logistics/KoraAdvantage";
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
      <LogisticsHero />
      <LogisticsIntro />
      <LogisticsServices />
      <KoraAdvantage />
      <LogisticsCTA />
      <Footer />
    </main>
  );
}
