"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button, Drawer, Space } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Kora Traders home">
          <Image
            src="/images/kora_logo.png"
            alt="Kora Traders"
            width={2800}
            height={1650}
            sizes="(max-width: 767px) 120px, 150px"
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.desktopOnly}>
            <LocaleSwitcher />
          </span>
          <span className={styles.desktopOnly}>
            <Button type="primary" size="large" className={styles.ctaButton} href="/contact">
              Get a Quote
            </Button>
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
              className={styles.drawerLink}
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher block />
          <Button type="primary" size="large" block href="/contact">
            Get a Quote
          </Button>
        </Space>
      </Drawer>
    </motion.header>
  );
}
