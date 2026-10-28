import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";

/** Every page a RelatedLinks block may point to; descriptive anchor text lives here once. */
const LINKS = {
  services: {
    href: "/services",
    title: "Sourcing & procurement services",
    text: "Six services, one accountable file: sourcing, price, quality control, private label, freight and customs.",
  },
  products: {
    href: "/products",
    title: "Products & commodities we supply",
    text: "Himalayan salt, surgical instruments, tyres, rice, textiles, BOPP rolls and anything else you need sourced.",
  },
  logistics: {
    href: "/logistics",
    title: "International freight & logistics",
    text: "Road, rail, sea and air freight coordinated through trusted partners, from pickup to delivery.",
  },
  about: {
    href: "/about-us",
    title: "About Kora Traders",
    text: "Our story, mission and the partnerships behind a Munich-based trading company.",
  },
} as const;

export type RelatedKey = keyof typeof LINKS;

/** "Keep exploring" band of descriptive internal links, placed at the end of a page. */
export default function RelatedLinks({ items }: { items: readonly RelatedKey[] }) {
  return (
    <Section tone="snow" space="md" aria-labelledby="related-heading">
      <Container>
        <Eyebrow>Keep exploring</Eyebrow>
        <Heading id="related-heading" size="title" className="mb-10 font-semibold">
          More from Kora Traders
        </Heading>
        <ul className="grid gap-x-8 gap-y-8 md:grid-cols-3">
          {items.map((key) => {
            const link = LINKS[key];
            return (
              <li key={key} className="border-t border-steel/50 pt-5">
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2.5 text-lg font-semibold text-navy transition-colors duration-300 hover:text-crimson"
                >
                  {link.title}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <p className="mt-2 text-ui leading-body text-steel-text">{link.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
