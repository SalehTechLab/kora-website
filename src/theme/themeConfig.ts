import type { ThemeConfig } from "antd";

export const colors = {
  deepNavy: "#10294E",
  darkSlate: "#242C38",
  crimson: "#B51E32",
  steelGray: "#8C9BB0",
  softWhite: "#F4F6F9",
  white: "#FFFFFF",
  // Steel-gray tint over soft white: the alternate light band between sections
  mist: "color-mix(in srgb, #8C9BB0 26%, #F4F6F9)",
} as const;

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors.crimson,
    colorLink: colors.deepNavy,
    colorLinkHover: colors.crimson,
    colorText: colors.darkSlate,
    colorTextBase: colors.darkSlate,
    colorTextHeading: colors.deepNavy,
    colorBgBase: colors.softWhite,
    colorBgLayout: colors.softWhite,
    colorBorder: colors.steelGray,
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
