"use client";

import { Collapse, ConfigProvider, type ThemeConfig } from "antd";
import { motion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { FAQS } from "./servicesData";
import styles from "./ServicesFAQ.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const faqTheme: ThemeConfig = {
  token: { fontFamily: "var(--font-inter), Arial, sans-serif" },
  components: {
    Collapse: {
      headerBg: "transparent",
      contentBg: "transparent",
      headerPadding: "26px 0",
      contentPadding: "0 48px 28px 0",
      colorBorder: "rgba(140, 155, 176, 0.5)",
      colorText: colors.darkSlate,
      colorTextHeading: colors.deepNavy,
      fontSizeLG: 20,
      borderRadiusLG: 0,
    },
  },
};

const items = FAQS.map((f, i) => ({
  key: String(i),
  label: <span className={styles.q}>{f.q}</span>,
  children: <p className={styles.a}>{f.a}</p>,
}));

export default function ServicesFAQ() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className={styles.eyebrow}>Straight answers</p>
          <h2 id="faq-heading" className={styles.heading}>
            Questions we hear <em>before</em> the first order.
          </h2>
        </motion.div>

        <ConfigProvider theme={faqTheme}>
          <Collapse
            className={styles.collapse}
            ghost
            accordion
            defaultActiveKey={["0"]}
            expandIconPlacement="end"
            expandIcon={() => <span className={styles.icon} aria-hidden="true" />}
            items={items}
          />
        </ConfigProvider>
      </div>
    </section>
  );
}
