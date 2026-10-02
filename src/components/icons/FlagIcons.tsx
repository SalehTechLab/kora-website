export function UKFlagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 14) / 20}
      viewBox="0 0 20 14"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="United Kingdom flag"
    >
      <clipPath id="uk-round">
        <rect width="20" height="14" rx="2" />
      </clipPath>
      <g clipPath="url(#uk-round)">
        <rect width="20" height="14" fill="#10294E" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#FFFFFF" strokeWidth="2.4" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#B51E32" strokeWidth="0.9" />
        <path d="M10 0V14M0 7H20" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M10 0V14M0 7H20" stroke="#B51E32" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

export function DEFlagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 14) / 20}
      viewBox="0 0 20 14"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Germany flag"
    >
      <clipPath id="de-round">
        <rect width="20" height="14" rx="2" />
      </clipPath>
      <g clipPath="url(#de-round)">
        <rect width="20" height="4.67" y="0" fill="#000000" />
        <rect width="20" height="4.67" y="4.67" fill="#B51E32" />
        <rect width="20" height="4.66" y="9.34" fill="#FFCC00" />
      </g>
    </svg>
  );
}
