import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
    </main>
  );
}
