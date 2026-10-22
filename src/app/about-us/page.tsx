import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import Philosophy from "@/components/about/Philosophy";
import MissionVision from "@/components/about/MissionVision";
import TaglineTicker from "@/components/about/TaglineTicker";
import Partnerships from "@/components/about/Partnerships";

export const metadata: Metadata = {
  title: "About Us | Kora Traders",
  description:
    "Global markets, one trusted partner. Kora Traders started in Munich, Germany to make trade smarter, fairer and more reliable. Our story, philosophy, mission, vision and partnerships.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <Philosophy />
      <MissionVision />
      <TaglineTicker />
      <Partnerships />
      <Footer />
    </main>
  );
}
