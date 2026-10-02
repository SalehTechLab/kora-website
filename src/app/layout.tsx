import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kora Traders",
  description: "Connect. Trade. Grow. — International sourcing and trading, delivered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
