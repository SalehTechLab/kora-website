"use client";

import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button, Container, Section } from "@/components/ui";
import { useReveal } from "@/lib/motion";
import CatalogueCover from "./CatalogueCover";
import { SHOP_URL, type Product } from "./productData";

type ProductSpreadProps = { product: Product; index: number };

export default function ProductSpread({ product, index }: ProductSpreadProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [36, -36]);

  return (
    <Section
      ref={ref}
      id={product.id}
      tone={index % 2 === 1 ? "snow" : "white"}
      space="none"
      className="scroll-mt-32 py-18 md:py-30"
      aria-labelledby={`${product.id}-heading`}
    >
      <Container>
        <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-2">
          <div className="order-2 min-w-0 lg:order-1">
            <motion.div {...reveal(0)}>
              <h2 id={`${product.id}-heading`} className="font-serif text-headline">
                {product.name}
              </h2>
              <span className="mt-3.5 block font-serif text-[clamp(1.05rem,1rem_+_0.4vw,1.3rem)] text-crimson italic">
                {product.tagline}
              </span>
            </motion.div>

            <motion.div {...reveal(0.1)}>
              <p className="max-w-135 text-[clamp(0.95rem,0.9rem_+_0.3vw,1.0625rem)] leading-body">
                {product.description}
              </p>

              <ul
                aria-label={`${product.name} we supply`}
                className="mt-7 mb-6 grid grid-cols-1 gap-x-6 gap-y-3 xs:grid-cols-2"
              >
                {product.supplies.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-ui leading-[1.4] text-ink">
                    <Check className="mt-[3px] size-[11px] flex-none text-crimson" strokeWidth={3} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs tracking-caps text-steel-text uppercase">
                  Buy it as
                </span>
                {product.models.map((model) => (
                  <span
                    key={model}
                    className="rounded-pill border border-steel/60 px-2.5 py-0.5 text-xs"
                  >
                    {model}
                  </span>
                ))}
              </div>

              <hr className="mt-8 mb-7 border-t border-steel/35" />

              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                  View products from our shop
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href={product.catalogue}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View catalogue
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <motion.div
              className="relative mx-auto w-full max-w-105 max-md:pr-[4%]"
              style={{ y: coverY }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <CatalogueCover product={product} index={index} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
