import type { Metadata } from "next";
import AboutHero from "@/features/about/AboutHero";
import AboutStory from "@/features/about/AboutStory";
import MissionVision from "@/features/about/MissionVision";
import WhoWeHelp from "@/features/about/WhoWeHelp";
import Summit from "@/features/about/Summit";
import TaglineTicker from "@/features/about/TaglineTicker";
import Partnerships from "@/features/about/Partnerships";

export const metadata: Metadata = {
  title: "About Us | Kora Traders",
  description:
    "Global markets, one trusted partner. Kora Traders started in Munich, Germany to make trade smarter, fairer and more reliable. Our story, mission, vision and partnerships.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <TaglineTicker />
      <MissionVision />
      <WhoWeHelp />
      <Summit />
      <Partnerships />
    </>
  );
}
