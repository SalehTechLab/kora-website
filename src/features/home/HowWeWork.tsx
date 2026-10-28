import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import ProcessJourney from "./ProcessJourney";

export default function HowWeWork() {
  return (
    <Section
      tone="snow"
      space="none"
      className="py-18 md:py-28"
      aria-labelledby="how-we-work-heading"
    >
      <Container className="max-w-wide md:px-5 lg:px-12">
        <Eyebrow>How we work</Eyebrow>
        <Heading id="how-we-work-heading" size="headline" className="mb-[0.5em] font-semibold">
          From First Contact to Final Delivery
        </Heading>
        <p className="mb-14 max-w-160 text-lg leading-body text-steel-text">
          From understanding your requirements to sourcing, procurement, and
          international shipping, we simplify global trade through a
          structured process built on transparency, reliability, and clear
          communication.
        </p>

        <ProcessJourney />
      </Container>
    </Section>
  );
}
