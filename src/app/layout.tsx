import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import Preloader from "@/components/layout/Preloader";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Variable font: full weight range plus a true italic for display accents
const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kora Traders",
  description: "Connect. Trade. Grow. — International sourcing and trading, delivered.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ConfigProvider theme={themeConfig}>
              <Preloader />
              {children}
              <WhatsAppFloat />
            </ConfigProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
