import type { Metadata } from "next";
import LogisticsHero from "@/features/logistics/LogisticsHero";
import LogisticsIntro from "@/features/logistics/LogisticsIntro";
import LogisticsServices from "@/features/logistics/LogisticsServices";
import KoraAdvantage from "@/features/logistics/KoraAdvantage";
import LogisticsCTA from "@/features/logistics/LogisticsCTA";

export const metadata: Metadata = {
  title: "Logistics | Kora Traders",
  description:
    "From sourcing to delivery, Kora Traders coordinates international shipping through trusted logistics partners, connecting businesses across borders.",
};

export default function LogisticsPage() {
  return (
    <>
      <LogisticsHero />
      <LogisticsIntro />
      <LogisticsServices />
      <KoraAdvantage />
      <LogisticsCTA />
    </>
  );
}
