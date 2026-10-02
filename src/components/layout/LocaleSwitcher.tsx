"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UKFlagIcon, DEFlagIcon } from "@/components/icons/FlagIcons";
import styles from "./LocaleSwitcher.module.css";

type LocaleCode = "en" | "de";

const LOCALES: Record<LocaleCode, { label: string; code: string; flag: ReactNode }> = {
  en: { label: "English", code: "EN", flag: <UKFlagIcon /> },
  de: { label: "Deutsch", code: "DE", flag: <DEFlagIcon /> },
};

export default function LocaleSwitcher({ block = false }: { block?: boolean }) {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [open, setOpen] = useState(false);

  const items: MenuProps["items"] = (Object.keys(LOCALES) as LocaleCode[]).map((code) => ({
    key: code,
    label: (
      <span className={styles.item}>
        <span className={styles.flag}>{LOCALES[code].flag}</span>
        {LOCALES[code].label}
      </span>
    ),
  }));

  return (
    <Dropdown
      menu={{
        items,
        selectedKeys: [locale],
        onClick: ({ key }) => setLocale(key as LocaleCode),
      }}
      trigger={["click"]}
      onOpenChange={setOpen}
      placement="bottomRight"
    >
      <button
        type="button"
        className={`${styles.trigger} ${block ? styles.block : ""}`}
        aria-label="Change language"
      >
        <span className={styles.flag}>{LOCALES[locale].flag}</span>
        <span className={styles.code}>{LOCALES[locale].code}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={styles.chevron}
        >
          <DownOutlined />
        </motion.span>
      </button>
    </Dropdown>
  );
}
