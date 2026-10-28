import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/layout/RelatedLinks";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import AboutHero from "@/features/about/AboutHero";
import AboutStory from "@/features/about/AboutStory";
import MissionVision from "@/features/about/MissionVision";
import WhoWeHelp from "@/features/about/WhoWeHelp";
import Summit from "@/features/about/Summit";
import TaglineTicker from "@/features/about/TaglineTicker";
import Partnerships from "@/features/about/Partnerships";

const TITLE = "About Us: Munich-Based Trading Partner";
const DESCRIPTION =
  "Kora Traders started in Munich to make international trade smarter, fairer and more reliable. Read our story, mission, vision and partnerships.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about-us",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("AboutPage", TITLE, DESCRIPTION, "/about-us"),
          breadcrumbJsonLd("About Us", "/about-us"),
        ]}
      />
      <AboutHero />
      <AboutStory />
      <TaglineTicker />
      <MissionVision />
      <WhoWeHelp />
      <Summit />
      <Partnerships />
      <RelatedLinks items={["services", "products", "logistics"]} />
    </>
  );
}
