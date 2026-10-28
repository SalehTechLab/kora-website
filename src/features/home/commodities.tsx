import type { ReactNode } from "react";
import { colors } from "@/theme/colors";

export type Commodity = {
  id: string;
  /** Short label used on the selector tab */
  tab: string;
  /** Full category name shown under the stage */
  name: string;
  items: string;
  /** Trade route shown on the stage */
  from: string;
  to: string;
  /**
   * Optional real product photo (any background, roughly square).
   * When set it fills the stage circle and replaces the built-in illustration.
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
    <g strokeLinejoin="round" stroke={colors.crimson} strokeWidth="1">
      <polygon
        fill={colors.snow}
        points={[pt(0, -s), pt(w, -s / 2), pt(0, 0), pt(-w, -s / 2)].join(" ")}
      />
      <polygon
        fill={colors.crimson}
        points={[pt(-w, -s / 2), pt(0, 0), pt(0, s), pt(-w, s / 2)].join(" ")}
      />
      <polygon
        fill={colors.crimson}
        points={[pt(0, 0), pt(w, -s / 2), pt(w, s / 2), pt(0, s)].join(" ")}
      />
    </g>
  );
}

const SaltArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <ellipse cx="200" cy="334" rx="120" ry="14" fill={colors.navy} opacity="0.12" />
    <g transform="translate(200 200) scale(1.22) translate(-200 -178)">
      <Cube x={200} y={150} s={56} />
      <Cube x={152} y={178} s={56} />
      <Cube x={248} y={178} s={56} />
      <Cube x={200} y={206} s={56} />
      <Cube x={200} y={150} s={56} />
      <Cube x={306} y={226} s={30} />
      <Cube x={96} y={236} s={26} />
    </g>
    <polygon points="60,320 78,300 92,322" fill={colors.crimson} />
    <polygon points="318,324 334,308 350,326" fill={colors.snow} />
  </svg>
);

/* ---------- Surgical instruments: scissors ---------- */

function ScissorHalf({ angle }: { angle: number }) {
  return (
    <g transform={`rotate(${angle} 200 200)`}>
      <polygon
        points="193,206 207,206 205,56 200,36 196,60"
        fill="url(#steel)"
        stroke={colors.steel}
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
        stroke={colors.steel}
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
        <stop offset="0" stopColor={colors.snow} />
        <stop offset="0.5" stopColor={colors.steel} />
        <stop offset="1" stopColor={colors.steel} />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="350" rx="110" ry="12" fill={colors.navy} opacity="0.1" />
    <g transform="rotate(-32 200 200)">
      <ScissorHalf angle={20} />
      <ScissorHalf angle={-20} />
      <circle cx="200" cy="200" r="10" fill={colors.crimson} />
      <circle cx="197" cy="197" r="3.5" fill={colors.crimson} />
    </g>
  </svg>
);

/* ---------- Tyres & automotive: alloy wheel ---------- */

const SPOKES = [0, 72, 144, 216, 288];

const TyreArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <radialGradient id="rim" cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stopColor={colors.snow} />
        <stop offset="0.6" stopColor={colors.steel} />
        <stop offset="1" stopColor={colors.steel} />
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="352" rx="120" ry="12" fill={colors.navy} opacity="0.12" />
    <circle cx="200" cy="200" r="150" fill={colors.ink} />
    <circle
      cx="200"
      cy="200"
      r="141"
      fill="none"
      stroke={colors.ink}
      strokeWidth="16"
      strokeDasharray="13 8.4"
    />
    <circle cx="200" cy="200" r="122" fill={colors.navy} />
    <circle
      cx="200"
      cy="200"
      r="108"
      fill="none"
      stroke={colors.crimson}
      strokeWidth="3"
      strokeDasharray="2 7"
      strokeLinecap="round"
    />
    <circle cx="200" cy="200" r="92" fill="url(#rim)" />
    {SPOKES.map((a) => (
      <g key={a} transform={`rotate(${a} 200 200)`}>
        <circle cx="200" cy="146" r="17" fill={colors.navy} />
        <circle cx="200" cy="146" r="17" fill="none" stroke={colors.steel} />
      </g>
    ))}
    <circle cx="200" cy="200" r="28" fill={colors.navy} />
    <circle cx="200" cy="200" r="28" fill="none" stroke={colors.steel} strokeWidth="3" />
    <circle cx="200" cy="200" r="9" fill={colors.crimson} />
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
        <stop offset="0" stopColor={colors.navy} />
        <stop offset="1" stopColor={colors.navy} />
      </linearGradient>
      <linearGradient id="redGear" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={colors.crimson} />
        <stop offset="1" stopColor={colors.crimson} />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="360" rx="120" ry="10" fill={colors.navy} opacity="0.1" />
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
      stroke={colors.snow}
      strokeOpacity="0.18"
      strokeWidth="2"
    />
    <circle
      cx={BIG.cx}
      cy={BIG.cy}
      r="96"
      fill="none"
      stroke={colors.snow}
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
        <stop offset="0" stopColor={colors.steel} />
        <stop offset="0.45" stopColor={colors.steel} />
        <stop offset="1" stopColor={colors.steel} />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="364" rx="140" ry="12" fill={colors.navy} opacity="0.1" />
    <path
      d="M122 132C98 196 96 284 126 338Q200 354 274 338C304 284 302 196 278 132Z"
      fill="url(#burlap)"
      stroke={colors.steel}
    />
    <path
      d="M122 132Q200 112 278 132Q266 98 200 94Q134 98 122 132Z"
      fill={colors.steel}
      stroke={colors.steel}
    />
    <path
      d="M138 128Q200 142 262 128"
      fill="none"
      stroke={colors.crimson}
      strokeWidth="8"
      strokeLinecap="round"
    />
    <rect x="148" y="196" width="104" height="82" rx="6" fill={colors.navy} />
    <rect x="148" y="196" width="104" height="6" rx="3" fill={colors.crimson} />
    <text
      x="200"
      y="244"
      textAnchor="middle"
      fontFamily={SERIF}
      fontWeight="700"
      fontSize="30"
      fill={colors.snow}
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
      fill={colors.steel}
      fillOpacity="0.5"
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
        fill={colors.snow}
        stroke={colors.steel}
        transform={`rotate(${a} ${x} ${y})`}
      />
    ))}
  </svg>
);

/* ---------- Textiles & apparel: fabric rolls ---------- */

const ROLLS = [
  { x: 96, y: 96, color: colors.navy, cap: colors.navy },
  { x: 56, y: 170, color: colors.crimson, cap: colors.crimson },
  { x: 110, y: 244, color: colors.steel, cap: colors.snow },
];

const TextileArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <linearGradient id="roll" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.snow} stopOpacity="0.28" />
        <stop offset="0.45" stopColor={colors.snow} stopOpacity="0" />
        <stop offset="1" stopColor={colors.ink} stopOpacity="0.28" />
      </linearGradient>
      <pattern
        id="weave"
        width="7"
        height="7"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="7" height="1.4" fill={colors.snow} opacity="0.12" />
      </pattern>
    </defs>
    <ellipse cx="200" cy="342" rx="140" ry="12" fill={colors.navy} opacity="0.1" />
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
          stroke={colors.ink}
          strokeOpacity="0.2"
        />
        <ellipse cx={x} cy={y + 33} rx="3.5" ry="8" fill={colors.ink} opacity="0.25" />
      </g>
    ))}
  </svg>
);

/* ---------- BOPP rolls: wound film rolls ---------- */

const BoppArt = (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <defs>
      <linearGradient id="film" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={colors.steel} />
        <stop offset="0.35" stopColor={colors.snow} />
        <stop offset="0.7" stopColor={colors.steel} />
        <stop offset="1" stopColor={colors.steel} />
      </linearGradient>
      <linearGradient id="filmRed" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={colors.crimson} />
        <stop offset="0.35" stopColor={colors.crimson} />
        <stop offset="0.7" stopColor={colors.crimson} />
        <stop offset="1" stopColor={colors.crimson} />
      </linearGradient>
    </defs>
    <ellipse cx="200" cy="360" rx="140" ry="12" fill={colors.navy} opacity="0.1" />
    <rect x="86" y="120" width="228" height="220" fill="url(#film)" />
    <ellipse cx="200" cy="340" rx="114" ry="30" fill={colors.steel} />
    <rect x="86" y="196" width="228" height="34" fill="url(#filmRed)" opacity="0.9" />
    <ellipse cx="200" cy="120" rx="114" ry="30" fill={colors.snow} stroke={colors.steel} />
    <ellipse cx="200" cy="120" rx="84" ry="21" fill="none" stroke={colors.steel} opacity="0.8" />
    <ellipse cx="200" cy="120" rx="54" ry="13" fill="none" stroke={colors.steel} opacity="0.8" />
    <ellipse cx="200" cy="120" rx="30" ry="7.5" fill={colors.navy} />
    <ellipse cx="200" cy="120" rx="14" ry="3.5" fill={colors.crimson} />
    <text
      x="200"
      y="293"
      textAnchor="middle"
      fontFamily={SERIF}
      fontWeight="700"
      fontSize="34"
      fill={colors.navy}
      letterSpacing="3"
    >
      BOPP
    </text>
  </svg>
);

export const COMMODITIES: Commodity[] = [
  {
    id: "salt",
    image: "/images/commodities/salt-photo.jpg",
    from: "Pakistan",
    to: "Germany",
    tab: "Himalayan Pink Salt",
    name: "Himalayan Salt Products",
    items: "Salt bricks · Edible & bath salt · Decor",
    art: SaltArt,
  },
  {
    id: "surgical",
    image: "/images/commodities/surgical-photo.jpg",
    from: "Pakistan",
    to: "Germany",
    tab: "Surgical Instruments",
    name: "Surgical Instruments",
    items: "Scissors · Forceps · Clinical stainless steel",
    art: SurgicalArt,
  },
  {
    id: "tyres",
    image: "/images/commodities/tyres-photo.jpg",
    from: "Germany",
    to: "UAE",
    tab: "Tyres & Automotive",
    name: "Tyres & Automotive Products",
    items: "Passenger & truck tyres · Wheels · Parts",
    art: TyreArt,
  },
  {
    id: "industrial",
    image: "/images/commodities/industrial-photo.jpg",
    from: "Germany",
    to: "Indonesia",
    tab: "Industrial Commodities",
    name: "Industrial Commodities",
    items: "Machinery parts · Components · Raw materials",
    art: IndustrialArt,
  },
  {
    id: "rice",
    image: "/images/commodities/rice-photo.jpg",
    from: "India",
    to: "Germany",
    tab: "Rice & Food",
    name: "Rice & Food Commodities",
    items: "Basmati & long-grain rice · Staples",
    art: RiceArt,
  },
  {
    id: "textiles",
    image: "/images/commodities/textiles-photo.jpg",
    from: "Pakistan",
    to: "Germany",
    tab: "Textiles & Apparel",
    name: "Textiles & Apparel",
    items: "Fabric · Home textiles · Garments",
    art: TextileArt,
  },
  {
    id: "bopp",
    image: "/images/commodities/bopp-photo.jpg",
    from: "Germany",
    to: "Pakistan",
    tab: "BOPP Rolls",
    name: "BOPP Rolls",
    items: "Packaging film · Laminating & printing grades",
    art: BoppArt,
  },
];
