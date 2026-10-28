import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";

const BOOKING_MEETING_URL = "https://calendly.com/kora-traders-sales";

export default function FinalCTA() {
  return (
    <Section
      tone="white"
      space="none"
      className="py-16 md:py-24"
      aria-labelledby="home-cta-heading"
    >
      <Container className="max-w-190 text-center">
        <Eyebrow className="mb-3">Let&rsquo;s trade</Eyebrow>
        <Heading id="home-cta-heading" size="headline" className="mb-4 font-semibold">
          Ready to move your business?
        </Heading>
        <p className="mx-auto mb-8 max-w-150 text-lead-sm leading-body">
          Tell us what you need to source, procure or ship. We&rsquo;ll come
          back with a clear plan and a competitive quote.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact-us" size="lg">
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
    </Section>
  );
}
