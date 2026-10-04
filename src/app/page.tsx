import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Footer />
    </main>
  );
}
