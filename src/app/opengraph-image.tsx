import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Kora Traders: We Source. We Procure. We Deliver.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse can't read CSS variables, so these mirror the @theme palette in
// src/app/globals.css (navy, crimson, snow, steel). Keep them in sync.
const NAVY = "#10294e";
const CRIMSON = "#b51e32";
const SNOW = "#f4f6f9";
const STEEL = "#8c9bb0";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logo/kora-logo-1.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: SNOW,
          padding: "72px 80px",
          borderLeft: `18px solid ${CRIMSON}`,
        }}
      >
        <img src={logoSrc} alt="" width={246} height={110} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-0.02em",
            }}
          >
            We Source. We Procure.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              color: CRIMSON,
              letterSpacing: "-0.02em",
            }}
          >
            We Deliver.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: STEEL }}>
            International sourcing, trading and logistics from Munich
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
