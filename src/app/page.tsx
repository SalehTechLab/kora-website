import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import WhoWeAre from "@/components/home/WhoWeAre";
import LogisticsNetwork from "@/components/home/LogisticsNetwork";
import HowWeWork from "@/components/home/HowWeWork";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <WhoWeAre />
      <LogisticsNetwork />
      <HowWeWork />
      <Footer />
    </main>
  );
}
