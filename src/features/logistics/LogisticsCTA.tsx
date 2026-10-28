import { Button, Heading, Section, Text } from "@/components/ui";

export default function LogisticsCTA() {
  return (
    <Section
      tone="white"
      space="none"
      aria-labelledby="logistics-cta-heading"
      className="px-5 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-190 text-center">
        <span className="mb-3 block text-eyebrow font-semibold tracking-eyebrow text-crimson uppercase">
          Let&rsquo;s get moving
        </span>
        <Heading as="h2" size="headline" id="logistics-cta-heading" className="mb-4">
          Your Trade. Our Commitment.
        </Heading>
        <Text className="mx-auto mb-8 max-w-150 text-lead-sm leading-body">
          Looking to source products and arrange international delivery?
          Let&rsquo;s discuss your requirements and find the right solution
          for your business.
        </Text>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" href="/contact-us">
            Get in Touch
          </Button>
          <Button variant="outline" size="lg" href="/contact-us">
            Partner With Us
          </Button>
        </div>
      </div>
    </Section>
  );
}
