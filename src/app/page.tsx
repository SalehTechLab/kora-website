import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Manifesto from "@/components/home/Manifesto";
import CommodityShowcase from "@/components/home/CommodityShowcase";
import NotListed from "@/components/home/NotListed";
import LogisticsNetwork from "@/components/home/LogisticsNetwork";
import HowWeWork from "@/components/home/HowWeWork";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Manifesto />
      <CommodityShowcase />
      <NotListed />
      <LogisticsNetwork />
      <HowWeWork />
      <FinalCTA />
      <Footer />
    </main>
  );
}
