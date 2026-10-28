import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/layout/RelatedLinks";
import { organizationJsonLd, pageMetadata, SITE_DESCRIPTION, websiteJsonLd } from "@/lib/seo";
import Hero from "@/features/home/Hero";
import Ticker from "@/features/home/Ticker";
import Manifesto from "@/features/home/Manifesto";
import CommodityShowcase from "@/features/home/CommodityShowcase";
import NotListed from "@/features/home/NotListed";
import LogisticsNetwork from "@/features/home/LogisticsNetwork";
import HowWeWork from "@/features/home/HowWeWork";
import FinalCTA from "@/features/home/FinalCTA";

const TITLE = "Kora Traders | International Sourcing, Trading & Logistics";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <Hero />
      <Ticker />
      <Manifesto />
      <CommodityShowcase />
      <NotListed />
      <LogisticsNetwork />
      <HowWeWork />
      <FinalCTA />
      <RelatedLinks items={["services", "logistics", "about"]} />
    </>
  );
}
