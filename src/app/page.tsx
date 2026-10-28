import Hero from "@/features/home/Hero";
import Ticker from "@/features/home/Ticker";
import Manifesto from "@/features/home/Manifesto";
import CommodityShowcase from "@/features/home/CommodityShowcase";
import NotListed from "@/features/home/NotListed";
import LogisticsNetwork from "@/features/home/LogisticsNetwork";
import HowWeWork from "@/features/home/HowWeWork";
import FinalCTA from "@/features/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Manifesto />
      <CommodityShowcase />
      <NotListed />
      <LogisticsNetwork />
      <HowWeWork />
      <FinalCTA />
    </>
  );
}
