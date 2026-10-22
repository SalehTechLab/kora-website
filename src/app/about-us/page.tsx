import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutPromise from "@/components/about/AboutPromise";
import MissionVision from "@/components/about/MissionVision";
import ValuesMarquee from "@/components/about/ValuesMarquee";
import Partnerships from "@/components/about/Partnerships";

export const metadata: Metadata = {
  title: "About Us | Kora Traders",
  description:
    "Kora Traders started in Munich, Germany with a simple belief: opportunities are everywhere, but trustworthy connections are rare. Our story, mission, vision and partnerships.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutPromise />
      <MissionVision />
      <ValuesMarquee />
      <Partnerships />
      <Footer />
    </main>
  );
}
