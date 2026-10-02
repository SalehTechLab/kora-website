import type { ThemeConfig } from "antd";

export const colors = {
  navy: "#10294E",
  burgundy: "#B51E32",
  offWhite: "#F7F9FC",
  blueGray: "#D0D7E2",
  charcoal: "#242C38",
  white: "#FFFFFF",
} as const;

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors.burgundy,
    colorLink: colors.navy,
    colorLinkHover: colors.burgundy,
    colorText: colors.charcoal,
    colorTextBase: colors.charcoal,
    colorTextHeading: colors.navy,
    colorBgBase: colors.white,
    colorBgLayout: colors.offWhite,
    colorBorder: colors.blueGray,
    borderRadius: 8,
    fontFamily: "var(--font-inter), Arial, Helvetica, sans-serif",
  },
  components: {
    Button: {
      borderRadius: 999,
      controlHeight: 44,
      fontWeight: 600,
    },
    Dropdown: {
      borderRadiusLG: 12,
    },
  },
};

export default themeConfig;
