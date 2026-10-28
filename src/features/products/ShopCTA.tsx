"use client";

import { ArrowRight, Store } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Container, Eyebrow, Section } from "@/components/ui";
import { useReveal } from "@/lib/motion";
import { SHOP_URL } from "./productData";

export default function ShopCTA() {
  const reveal = useReveal();

  return (
    <Section tone="white" space="none" className="py-18 md:py-26" aria-labelledby="shop-cta-heading">
      <Container>
        <motion.div {...reveal(0)} className="mx-auto max-w-220 text-center">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 id="shop-cta-heading" className="mb-4 font-serif text-headline">
            Browse the shop. Book your order.
          </h2>
          <p className="mx-auto mb-8 max-w-140 text-[clamp(0.95rem,0.85rem_+_0.4vw,1.0625rem)] leading-body">
            Every catalogue above lives in the Kora shop, where you can view
            the range and place your booking. Prefer to talk it through
            first? Our team replies with a straight answer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Store className="size-4" aria-hidden="true" />
              Visit the Kora shop
            </Button>
            <Button variant="outline" size="lg" href="/contact-us">
              Talk to our team
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
