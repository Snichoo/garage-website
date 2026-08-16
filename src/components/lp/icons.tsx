import type { SVGProps } from "react";

/* Line icons share the same 24px grid and paint with currentColor, so a parent
   text-* class sets the colour. */

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.58 3.6a1 1 0 0 1-.25 1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2c-3.9 0-7 3.1-7 7 0 5.1 6.2 12.3 6.5 12.6a.7.7 0 0 0 1 0C12.8 21.3 19 14.1 19 9c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 12.5 9.5 18 20 6"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn tick used in the CTA tick rows. */
export function TickMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.53 14.46a.5.5 0 0 1-.49.08L1.76 10.5a.72.72 0 0 0-.33-.08c-.19 0-.36.1-.46.22-.17.19-.28.52-.04.84l8.34 11.28c.22.3.55.46.91.44.36-.02.68-.22.86-.54L23.1 1.8c.22-.38.04-.7-.18-.87-.22-.16-.55-.22-.84.08L9.53 14.46z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 15l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2l2.95 6.16 6.8.86-5 4.66 1.3 6.72L12 17.9l-6.05 3.16 1.3-6.72-5-4.66 6.8-.86z" />
    </svg>
  );
}

/** The hand-drawn arrow that points at the primary buttons. */
export function ArrowDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 75 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.7904 64.2769C18.7225 63.268 19.4493 62.2183 23.8447 57.2137C26.0747 54.6468 28.9542 51.2843 30.245 49.7276C31.5357 48.171 32.8057 46.7738 33.0471 46.6193C33.5099 46.3232 34.336 46.4378 34.2542 46.7824C34.2297 46.8858 34.4372 47.1624 34.7169 47.4218C35.2048 47.8113 35.2041 47.9579 34.6722 49.409C34.3836 50.266 34.1233 51.0757 34.1629 51.1965C34.1824 51.3302 34.0491 51.5324 33.8479 51.6612C33.6669 51.777 33.465 52.0523 33.416 52.2591C33.179 53.2585 31.8536 55.3927 29.9492 57.8097C29.1181 58.8677 28.4359 59.8011 28.4114 59.9045C28.346 60.1802 32.0805 58.6093 34.8392 57.195C43.1556 52.9264 52.1512 43.7799 55.6476 36.0179C57.2521 32.4188 57.9275 27.4848 57.2757 24.1893C56.1719 18.6982 50.2724 13.3522 43.2746 11.486C41.2785 10.98 40.4562 10.9214 37.7666 11.1806C36.0245 11.3306 34.1215 11.5835 33.523 11.7326C32.8 11.9028 32.2624 11.8667 31.8664 11.5939C30.9862 10.9878 31.1403 10.6261 32.6001 9.86748C34.1807 9.03161 37.3292 8.42033 39.6641 8.50495C47.2385 8.80366 57.1207 15.4895 60.3525 22.513C63.04 28.3064 62.1985 36.3868 58.2212 43.0826C56.4589 46.0518 52.8199 50.6018 50.8062 52.3287C50.4597 52.638 49.8191 53.2526 49.3878 53.7039C48.9446 54.1337 46.851 55.7655 44.6977 57.2894C41.4938 59.5731 40.347 60.3069 38.2604 61.2619C34.0789 63.2065 28.7337 65.1648 27.9277 65.0373C27.7153 64.9979 27.5103 65.0706 27.4977 65.1955C27.4204 65.4496 28.3144 65.6377 34.6213 66.7474C36.9267 67.1725 38.8958 67.4327 38.9964 67.3684C39.097 67.304 39.6735 67.6075 40.3015 68.0534C41.2936 68.7634 41.3973 68.9017 41.3149 69.3929C41.2615 69.6901 41.2803 69.9704 41.3765 69.9966C41.4727 70.0227 41.3036 70.1602 40.9779 70.3101C39.7192 70.94 31.6783 69.9458 26.2515 68.5069C21.0171 67.1202 18.8997 65.9025 18.7904 64.2769Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Trust-badge and service-card marks. Drawn on the same 48px grid with a
   2.4 stroke so the row reads as one set.
--------------------------------------------------------------------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** $0 call-out: a price tag with a zero. */
export function NoCallOutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g {...stroke}>
        <path d="M25.5 6H38a4 4 0 0 1 4 4v12.5a4 4 0 0 1-1.2 2.8L26 40.1a4 4 0 0 1-5.7 0L7.9 27.7a4 4 0 0 1 0-5.7L22.7 7.2A4 4 0 0 1 25.5 6z" />
        <circle cx="33.5" cy="14.5" r="2.6" />
        <ellipse cx="22" cy="26" rx="5" ry="6.4" />
        <path d="M18.6 30.8 25.4 21" />
      </g>
    </svg>
  );
}

/** 20+ years: a spanner. */
export function SpannerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g {...stroke}>
        <path d="M32.4 6.6a11 11 0 0 0-13.2 14l-11 11a4.2 4.2 0 0 0 5.9 5.9l11-11a11 11 0 0 0 14-13.2l-6 6-5.6-1.1-1.1-5.6z" />
        <path d="M12.6 35.4h.02" />
      </g>
    </svg>
  );
}

/** Free on-site measure: a tape measure / ruler. */
export function MeasureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g {...stroke}>
        <rect x="4" y="17" width="40" height="14" rx="3" />
        <path d="M12 17v6M20 17v9M28 17v6M36 17v9" />
      </g>
    </svg>
  );
}

/** Gate + motor in one: a sliding gate leaf with a motor box. */
export function GateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g {...stroke}>
        <path d="M6 40V12M6 12h26v22" />
        <path d="M6 19h26M6 26h26M6 33h26" />
        <rect x="36" y="30" width="8" height="10" rx="1.6" />
        <path d="M40 30v-4" />
        <path d="M4 40h42" />
      </g>
    </svg>
  );
}

/** Google rating: a star inside a rounded badge. */
export function RatedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g {...stroke}>
        <path d="M24 5.5 29.7 17l12.8 1.9-9.2 9 2.2 12.7L24 34.6l-11.5 6 2.2-12.7-9.2-9L18.3 17z" />
      </g>
    </svg>
  );
}

