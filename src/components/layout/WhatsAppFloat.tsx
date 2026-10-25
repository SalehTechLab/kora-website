"use client";

import { ConfigProvider, FloatButton } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

export const WHATSAPP_URL =
  "https://wa.me/4917668257323?text=Hi%2C%20I%20have%20a%20query%20regarding%20your%20import%2Fexport%20services.%20Could%20you%20please%20assist%20me%3F";

export default function WhatsAppFloat() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#25d366" } }}>
      <FloatButton
        type="primary"
        shape="circle"
        icon={<WhatsAppOutlined style={{ fontSize: 28 }} />}
        href={WHATSAPP_URL}
        target="_blank"
        aria-label="Chat on WhatsApp"
        style={{
          insetInlineEnd: 24,
          insetBlockEnd: 88,
          width: 56,
          height: 56,
        }}
      />
    </ConfigProvider>
  );
}
