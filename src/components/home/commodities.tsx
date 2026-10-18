import type { ReactNode } from "react";

export type Commodity = {
  id: string;
  /** Short label used on the selector tab */
  tab: string;
  /** Full category name shown under the stage */
  name: string;
  items: string;
  /**
   * Optional cut-out product photo (transparent PNG/WebP, ~800px square).
   * When set it replaces the built-in illustration.
   */
  image?: string;
  art: ReactNode;
};

const SERIF = "var(--font-serif), Georgia, serif";

/* ---------- Himalayan salt: stacked salt bricks ---------- */

function Cube({ x, y, s }: { x: number; y: number; s: number }) {
  const w = s * 0.87;
  const pt = (dx: number, dy: number) => `${x + dx},${y + dy}`;
  return (
    <g strokeLinejoin="round" stroke="#B85C49" strokeWidth="1">
      <polygon
        fill="#F8D3C6"
        points={[pt(0, -s), pt(w, -s / 2), pt(0, 0), pt(-w, -s / 2)].join(" ")}
      />
      <polygon
        fill="#E59A88"
        points={[pt(-w, -s / 2), pt(0, 0), pt(0, s), pt(-w, s / 2)].join(" ")}
      />
      <polygon
        fill="#CD7560"
        points={[pt(0, 0), pt(w, -s / 2), pt(w, s / 2), pt(0, s)].join(" ")}
      />
    </g>
  );
}

const SaltArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <ellipse cx="200" cy="334" rx="120" ry="14" fill="#10294E" opacity="0.12" />
    <g transform="translate(200 200) scale(1.22) translate(-200 -178)">
      <Cube x={200} y={150} s={56} />
      <Cube x={152} y={178} s={56} />
      <Cube x={248} y={178} s={56} />
      <Cube x={200} y={206} s={56} />
      <Cube x={200} y={150} s={56} />
      <Cube x={306} y={226} s={30} />
      <Cube x={96} y={236} s={26} />
    </g>
    <polygon points="60,320 78,300 92,322" fill="#E59A88" />
    <polygon points="318,324 334,308 350,326" fill="#F8D3C6" />
  </svg>
);

/* ---------- Surgical instruments: scissors ---------- */

function ScissorHalf({ angle }: { angle: number }) {
  return (
    <g transform={`rotate(${angle} 200 200)`}>
      <polygon
        points="193,206 207,206 205,56 200,36 196,60"
        fill="url(#steel)"
        stroke="#7F8CA3"
        strokeWidth="1"
      />
      <rect x="193" y="204" width="14" height="62" rx="3" fill="url(#steel)" />
      <ellipse
        cx="200"
        cy="306"
        rx="27"
        ry="35"
        fill="none"
        stroke="url(#steel)"
        strokeWidth="11"
      />
      <ellipse
        cx="200"
        cy="306"
        rx="27"
        ry="35"
        fill="none"
        stroke="#7F8CA3"
        strokeWidth="1"
        opacity="0.6"
      />
    </g>
  );
}

const SurgicalArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FAFBFD" />
        <stop offset="0.5" stopColor="#B9C3D3" />
        <stop offset="1" stopColor="#7F8CA3" />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="350" rx="110" ry="12" fill="#10294E" opacity="0.1" />
    <g transform="rotate(-32 200 200)">
      <ScissorHalf angle={20} />
      <ScissorHalf angle={-20} />
      <circle cx="200" cy="200" r="10" fill="#B51E32" />
      <circle cx="197" cy="197" r="3.5" fill="#F08A98" />
    </g>
  </svg>
);

/* ---------- Tyres & automotive: alloy wheel ---------- */

const SPOKES = [0, 72, 144, 216, 288];

const TyreArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <radialGradient id="rim" cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.6" stopColor="#C4CDDB" />
        <stop offset="1" stopColor="#8995AA" />
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="352" rx="120" ry="12" fill="#10294E" opacity="0.12" />
    <circle cx="200" cy="200" r="150" fill="#161C28" />
    <circle
      cx="200"
      cy="200"
      r="141"
      fill="none"
      stroke="#2D364A"
      strokeWidth="16"
      strokeDasharray="13 8.4"
    />
    <circle cx="200" cy="200" r="122" fill="#1F2736" />
    <circle
      cx="200"
      cy="200"
      r="108"
      fill="none"
      stroke="#B51E32"
      strokeWidth="3"
      strokeDasharray="2 7"
      strokeLinecap="round"
    />
    <circle cx="200" cy="200" r="92" fill="url(#rim)" />
    {SPOKES.map((a) => (
      <g key={a} transform={`rotate(${a} 200 200)`}>
        <circle cx="200" cy="146" r="17" fill="#232B3B" />
        <circle cx="200" cy="146" r="17" fill="none" stroke="#7F8CA3" />
      </g>
    ))}
    <circle cx="200" cy="200" r="28" fill="#10294E" />
    <circle cx="200" cy="200" r="28" fill="none" stroke="#C4CDDB" strokeWidth="3" />
    <circle cx="200" cy="200" r="9" fill="#B51E32" />
  </svg>
);

/* ---------- Industrial commodities: meshing gears ---------- */

const r2 = (n: number) => Math.round(n * 100) / 100;

function gearPath(cx: number, cy: number, ro: number, ri: number, n: number) {
  const step = (Math.PI * 2) / n;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = i * step;
    (
      [
        [0, ri],
        [0.16, ro],
        [0.4, ro],
        [0.56, ri],
      ] as const
    ).forEach(([f, r]) => {
      const t = a + f * step;
      pts.push(`${r2(cx + r * Math.cos(t))},${r2(cy + r * Math.sin(t))}`);
    });
  }
  return `M${pts.join("L")}Z`;
}

const hole = (cx: number, cy: number, r: number) =>
  `M${cx + r} ${cy}a${r} ${r} 0 1 0 ${-2 * r} 0a${r} ${r} 0 1 0 ${2 * r} 0Z`;

const BIG = { cx: 170, cy: 224, ro: 130, ri: 108, n: 14 };
const SMALL = { cx: 294, cy: 100, ro: 62, ri: 50, n: 8 };

const IndustrialArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <linearGradient id="navyGear" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2A5191" />
        <stop offset="1" stopColor="#10294E" />
      </linearGradient>
      <linearGradient id="redGear" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#D9384C" />
        <stop offset="1" stopColor="#8E1424" />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="360" rx="120" ry="10" fill="#10294E" opacity="0.1" />
    <path
      fillRule="evenodd"
      fill="url(#navyGear)"
      d={
        gearPath(BIG.cx, BIG.cy, BIG.ro, BIG.ri, BIG.n) +
        hole(BIG.cx, BIG.cy, 38)
      }
    />
    <circle
      cx={BIG.cx}
      cy={BIG.cy}
      r="78"
      fill="none"
      stroke="#fff"
      strokeOpacity="0.18"
      strokeWidth="2"
    />
    <circle
      cx={BIG.cx}
      cy={BIG.cy}
      r="96"
      fill="none"
      stroke="#fff"
      strokeOpacity="0.1"
      strokeWidth="2"
    />
    <path
      fillRule="evenodd"
      fill="url(#redGear)"
      d={
        gearPath(SMALL.cx, SMALL.cy, SMALL.ro, SMALL.ri, SMALL.n) +
        hole(SMALL.cx, SMALL.cy, 16)
      }
    />
  </svg>
);

/* ---------- Rice & food commodities: sack with spilled grains ---------- */

const GRAINS: [number, number, number][] = [
  [92, 346, -20],
  [118, 358, 12],
  [146, 352, -8],
  [252, 356, 18],
  [282, 348, -14],
  [308, 358, 6],
  [332, 346, 24],
  [70, 360, 8],
  [200, 362, -4],
  [176, 366, 16],
  [226, 366, -18],
];

const RiceArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <linearGradient id="burlap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#D7BC87" />
        <stop offset="0.45" stopColor="#EBD7AB" />
        <stop offset="1" stopColor="#C4A66D" />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="364" rx="140" ry="12" fill="#10294E" opacity="0.1" />
    <path
      d="M122 132C98 196 96 284 126 338Q200 354 274 338C304 284 302 196 278 132Z"
      fill="url(#burlap)"
      stroke="#B89A5E"
    />
    <path
      d="M122 132Q200 112 278 132Q266 98 200 94Q134 98 122 132Z"
      fill="#E2CB98"
      stroke="#B89A5E"
    />
    <path
      d="M138 128Q200 142 262 128"
      fill="none"
      stroke="#B51E32"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <rect x="148" y="196" width="104" height="82" rx="6" fill="#10294E" />
    <rect x="148" y="196" width="104" height="6" rx="3" fill="#B51E32" />
    <text
      x="200"
      y="244"
      textAnchor="middle"
      fontFamily={SERIF}
      fontWeight="700"
      fontSize="30"
      fill="#fff"
      letterSpacing="2"
    >
      RICE
    </text>
    <text
      x="200"
      y="264"
      textAnchor="middle"
      fontSize="9"
      fontWeight="600"
      fill="#D0D7E2"
      letterSpacing="3"
    >
      PREMIUM GRAIN
    </text>
    {GRAINS.map(([x, y, a]) => (
      <ellipse
        key={`${x}-${y}`}
        cx={x}
        cy={y}
        rx="10"
        ry="3.6"
        fill="#FBF6E8"
        stroke="#D9CBA6"
        transform={`rotate(${a} ${x} ${y})`}
      />
    ))}
  </svg>
);

/* ---------- Textiles & apparel: fabric rolls ---------- */

const ROLLS = [
  { x: 96, y: 96, color: "#10294E", cap: "#27487C" },
  { x: 56, y: 170, color: "#B51E32", cap: "#D9566A" },
  { x: 110, y: 244, color: "#EAD9BC", cap: "#F6EBD5" },
];

const TextileArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <linearGradient id="roll" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
        <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.28" />
      </linearGradient>
      <pattern
        id="weave"
        width="7"
        height="7"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="7" height="1.4" fill="#fff" opacity="0.12" />
      </pattern>
    </defs>
    <ellipse cx="200" cy="342" rx="140" ry="12" fill="#10294E" opacity="0.1" />
    {ROLLS.map(({ x, y, color, cap }) => (
      <g key={color}>
        <rect x={x} y={y} width="230" height="66" fill={color} />
        <rect x={x} y={y} width="230" height="66" fill="url(#weave)" />
        <rect x={x} y={y} width="230" height="66" fill="url(#roll)" />
        <ellipse cx={x + 230} cy={y + 33} rx="15" ry="33" fill={color} />
        <ellipse cx={x} cy={y + 33} rx="15" ry="33" fill={cap} />
        <ellipse
          cx={x}
          cy={y + 33}
          rx="9"
          ry="20"
          fill="none"
          stroke="#000"
          strokeOpacity="0.2"
        />
        <ellipse cx={x} cy={y + 33} rx="3.5" ry="8" fill="#000" opacity="0.25" />
      </g>
    ))}
  </svg>
);

export const COMMODITIES: Commodity[] = [
  {
    id: "salt",
    tab: "Himalayan Salt",
    name: "Himalayan Salt Products",
    items: "Salt bricks · Edible & bath salt · Decor",
    art: SaltArt,
  },
  {
    id: "surgical",
    tab: "Surgical Instruments",
    name: "Surgical Instruments",
    items: "Scissors · Forceps · Clinical stainless steel",
    art: SurgicalArt,
  },
  {
    id: "tyres",
    tab: "Tyres & Automotive",
    name: "Tyres & Automotive Products",
    items: "Passenger & truck tyres · Wheels · Parts",
    art: TyreArt,
  },
  {
    id: "industrial",
    tab: "Industrial",
    name: "Industrial Commodities",
    items: "Machinery parts · Components · Raw materials",
    art: IndustrialArt,
  },
  {
    id: "rice",
    tab: "Rice & Food",
    name: "Rice & Food Commodities",
    items: "Basmati & long-grain rice · Staples",
    art: RiceArt,
  },
  {
    id: "textiles",
    tab: "Textiles & Apparel",
    name: "Textiles & Apparel",
    items: "Fabric · Home textiles · Garments",
    art: TextileArt,
  },
];
