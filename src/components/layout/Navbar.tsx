"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Drawer, Space } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import LocaleSwitcher from "./LocaleSwitcher";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Logistics", href: "/logistics" },
  { label: "Contact Us", href: "/contact" },
];

const WHATSAPP_URL =
  "https://wa.me/4917668257323?text=Hi%2C%20I%20have%20a%20query%20regarding%20your%20import%2Fexport%20services.%20Could%20you%20please%20assist%20me%3F";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles.header}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Kora Traders home"
        >
          <Image
            src="/images/logo/kora-logo-1.svg"
            alt="Kora Traders"
            width={547}
            height={244}
            sizes="(max-width: 767px) 81px, 90px"
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.desktopOnly}>
            <LocaleSwitcher />
          </span>
          <span className={styles.desktopOnly}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <WhatsAppOutlined className={styles.ctaIcon} />
              Chat on WhatsApp
            </a>
          </span>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        closeIcon={<CloseOutlined />}
        size={300}
        styles={{ body: { padding: 24 } }}
      >
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${isActive(link.href) ? styles.drawerLinkActive : ""}`}
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher block />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaButton} ${styles.ctaBlock}`}
          >
            <WhatsAppOutlined className={styles.ctaIcon} />
            Chat on WhatsApp
          </a>
        </Space>
      </Drawer>
    </motion.header>
  );
}
