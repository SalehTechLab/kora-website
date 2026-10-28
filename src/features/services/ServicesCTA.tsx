import { Button, Container, Eyebrow, Heading, Text } from "@/components/ui";
import { BOOKING_MEETING_URL } from "./servicesData";

export default function ServicesCTA() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="services-cta-heading">
      <Container className="max-w-190 text-center">
        <Eyebrow>Let&rsquo;s trade</Eyebrow>
        <Heading
          id="services-cta-heading"
          size="headline"
          className="mb-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold"
        >
          Tell us what you need. We&rsquo;ll handle the rest.
        </Heading>
        <Text className="mx-auto mb-8 max-w-150 text-lead-sm leading-body">
          Share the product, quantity and destination. You get a clear plan
          and a competitive quote back.
        </Text>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" href="/contact-us">
            Get a Quote
          </Button>
          <Button
            variant="outline"
            size="lg"
            href={BOOKING_MEETING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
