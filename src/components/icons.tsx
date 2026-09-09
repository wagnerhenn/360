import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const S = ({ children, ...p }: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...stroke} {...p}>
    {children}
  </svg>
);

export const IconArrowRight = (p: P) => (
  <S {...p}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </S>
);

export const IconArrowUpRight = (p: P) => (
  <S {...p}>
    <path d="M7 17L17 7" />
    <path d="M9 7h8v8" />
  </S>
);

export const IconArrowEnter = (p: P) => (
  <S {...p}>
    <path d="M12 3v13" />
    <path d="M6 10l6 6 6-6" />
  </S>
);

export const IconPlus = (p: P) => (
  <S {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </S>
);

export const IconMinus = (p: P) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
);

export const IconClose = (p: P) => (
  <S {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </S>
);

export const IconRotate = (p: P) => (
  <S {...p}>
    <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
    <path d="M20.5 3v4.5H16" />
  </S>
);

export const IconReset = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="5.5" />
    <path d="M12 2.5v3.5" />
    <path d="M12 18v3.5" />
    <path d="M2.5 12H6" />
    <path d="M18 12h3.5" />
  </S>
);

export const IconExpand = (p: P) => (
  <S {...p}>
    <path d="M9 4H4v5" />
    <path d="M15 4h5v5" />
    <path d="M9 20H4v-5" />
    <path d="M15 20h5v-5" />
  </S>
);

export const IconCompress = (p: P) => (
  <S {...p}>
    <path d="M4 9h5V4" />
    <path d="M20 9h-5V4" />
    <path d="M4 15h5v5" />
    <path d="M20 15h-5v5" />
  </S>
);

export const IconDrag = (p: P) => (
  <S {...p}>
    <path d="M9 11V6.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M12 10.5V5a1.5 1.5 0 0 1 3 0v6" />
    <path d="M15 11.5a1.5 1.5 0 0 1 3 1.5l-1.2 4.2A5 5 0 0 1 12 20.5a5 5 0 0 1-4-2l-2.6-3.7a1.6 1.6 0 0 1 2.4-2.1L9 14" />
  </S>
);

export const IconPin = (p: P) => (
  <S {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </S>
);

export const IconClock = (p: P) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </S>
);

export const IconPhone = (p: P) => (
  <S {...p}>
    <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.7 1.5A16.5 16.5 0 0 1 3.5 5.7 1.5 1.5 0 0 1 5 4Z" />
  </S>
);

export const IconMail = (p: P) => (
  <S {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 7l8 6 8-6" />
  </S>
);

export const IconWhatsApp = (p: P) => (
  <S {...p}>
    <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" />
    <path d="M9.2 8.4c.3 3 3.4 6.1 6.4 6.4l.7-1.5-1.9-1.1-.9.7c-.9-.5-1.8-1.4-2.3-2.3l.7-.9-1.1-1.9Z" />
  </S>
);

export const IconCheck = (p: P) => (
  <S {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </S>
);

export const IconChevronDown = (p: P) => (
  <S {...p}>
    <path d="M5 9l7 7 7-7" />
  </S>
);

export const IconCube = (p: P) => (
  <S {...p}>
    <path d="M12 3l7.5 4.3v8.6L12 20.2l-7.5-4.3V7.3L12 3Z" />
    <path d="M12 11.5L4.5 7.3" />
    <path d="M12 11.5l7.5-4.2" />
    <path d="M12 11.5v8.7" />
  </S>
);

export const IconEye = (p: P) => (
  <S {...p}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </S>
);

export const IconRuler = (p: P) => (
  <S {...p}>
    <rect x="2.8" y="9" width="18.4" height="6" rx="1" />
    <path d="M7 9v3" />
    <path d="M11 9v2.2" />
    <path d="M15 9v3" />
    <path d="M19 9v2.2" />
  </S>
);

export const IconLogo = (p: P) => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" aria-hidden="true" fill="none" {...p}>
    <rect x="4.5" y="4.5" width="23" height="23" stroke="currentColor" strokeWidth="2.4" />
    <path d="M4.5 21.5L21.5 4.5" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="21.5" cy="21.5" r="2.2" fill="currentColor" stroke="none" />
  </svg>
);
