"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { COMPANY } from "@/lib/company";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";

const COMMODITIES = [
  { label: "Himalayan Salt Products", href: "/products#salt" },
  { label: "Surgical Instruments", href: "/products#surgical" },
  { label: "Tyres & Automotive Products", href: "/products#tyres" },
  { label: "Industrial Commodities", href: "/products#industrial" },
  { label: "Rice & Food Commodities", href: "/products#rice" },
  { label: "Textiles & Apparel", href: "/products#textiles" },
  { label: "BOPP Rolls", href: "/products#bopp" },
  { label: "Anything else", href: "/products#anything" },
];

const LEGAL_LINKS = [
  { label: "About us", href: "/about-us" },
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Licences & Credits", href: "/licenses" },
];

// TODO: replace with the real Kora social profile URLs
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kora_traders",
    icon: <LinkedinIcon className="size-4" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/kora.traders",
    icon: <FacebookIcon className="size-4" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kora_traders",
    icon: <InstagramIcon className="size-4" />,
  },
];

const OFFICES = [
  {
    name: "Germany (Headquarters)",
    address: ["Franz-Wolter-Straße", "81925 Munich", "Germany"],
    email: "info@koratraders.com",
    phone: "+49 176 68257323",
  },
  {
    name: "Pakistan (Regional Office)",
    address: ["Lahore, Pakistan"],
    email: "info@koratraders.com",
    phone: "+92 321 6491547",
  },
];

const toTelHref = (phone: string) =>
  `tel:${phone.replace(/\(0\)/, "").replace(/[^\d+]/g, "")}`;

const linkClass = "transition-colors hover:text-snow";

function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-5 text-caption font-semibold tracking-caps text-snow uppercase">
      {children}
    </h2>
  );
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="on-dark border-t-4 border-crimson bg-ink pt-18 pb-8 text-snow/80">
      <Container>
        {/* 24 tracks need a gap that scales: a fixed 48px gap is 1,104px wide across 23 gaps, which overflowed every screen below xl */}
        <div className="grid grid-cols-24 gap-x-[2%] gap-y-10 xl:gap-x-12">
          <div className="col-span-24 lg:col-span-6">
            <Link href="/" aria-label="Kora Traders home">
              <Image
                src="/images/logo/kora-logo2.webp"
                alt="Kora Traders"
                width={547}
                height={244}
                sizes="110px"
                className="h-auto w-27.5"
              />
            </Link>
            <p className="my-2.5 font-serif text-body-lg font-semibold text-snow italic">
              Connect. Trade. Grow.
            </p>
            <p className="mb-4 max-w-85 text-snow/60">
              Kora Traders is a Germany-based international trading company sourcing, purchasing and
              delivering across global markets.
            </p>
            <p className="text-xs text-snow/60">
              Registered: {COMPANY.registerCourt}, {COMPANY.register}
              <br />
              USt-IdNr / VAT: {COMPANY.vatId}
            </p>
          </div>

          <div className="col-span-24 sm:col-span-12 lg:col-span-5">
            <ColumnTitle>Key Commodities</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {COMMODITIES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ColumnTitle>Legal</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="[&_button]:transition-colors [&_button]:hover:text-snow">
                <CookieSettingsButton>Cookie settings</CookieSettingsButton>
              </li>
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <ColumnTitle>Reach out</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} flex items-center gap-2.5`}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-24 lg:col-span-6">
            <ColumnTitle>Global Offices</ColumnTitle>
            <div className="flex flex-col gap-5">
              {OFFICES.map((office) => (
                <div key={office.name} className="flex flex-col gap-1">
                  <span className="font-semibold text-snow">{office.name}</span>
                  <div className="flex flex-col text-snow/60">
                    {office.address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                  <span className="text-snow/60">
                    Email:{" "}
                    <a href={`mailto:${office.email}`} className={`${linkClass} text-snow/80`}>
                      {office.email}
                    </a>
                  </span>
                  <span className="text-snow/60">
                    Tel:{" "}
                    <a href={toTelHref(office.phone)} className={`${linkClass} text-snow/80`}>
                      {office.phone}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="mt-14 mb-6 border-snow/12" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-snow/60">
            Copyright © {new Date().getFullYear()} Kora Traders. All rights reserved.
          </p>
          <Button
            variant="outline-light"
            size="sm"
            onClick={scrollToTop}
            className="border-snow/15 bg-snow/8 hover:border-crimson hover:bg-crimson hover:text-white"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </footer>
  );
}
