import React from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconSubmissionPortal = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* Document */}
    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h5" />

    {/* Upload Arrow */}
    <path d="M12 17V10" />
    <path d="M9.5 12.5 12 10l2.5 2.5" />
  </svg>
);

export const IconMyRegistry = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    {/* File */}
    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h5" />

    {/* User */}
    <circle cx="12" cy="12" r="2.5" />
    <path d="M8.5 18c.8-2 2.2-3 3.5-3s2.7 1 3.5 3" />
  </svg>
);

export const IconGrid = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
export const IconSeal = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 14 7 21l5-2.5L17 21l-1.5-7" />
  </svg>
);
export const IconBuilding = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
  </svg>
);
export const IconSwap = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 8h14M14 4l4 4-4 4" />
    <path d="M20 16H6M10 12l-4 4 4 4" />
  </svg>
);
export const IconShield = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const IconSettings = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-1.8-1L14.8 3h-4l-.4 2.6a7.6 7.6 0 0 0-1.8 1l-2.4-1-2 3.4L6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 1.8 1l.4 2.6h4l.4-2.6a7.6 7.6 0 0 0 1.8-1l2.4 1 2-3.4-2-1.6z" />
  </svg>
);
export const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
export const IconBell = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
export const IconArrowUp = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
export const IconArrowDown = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);
export const IconMenu = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
export const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const IconFile = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 2h9l5 5v15H6z" />
    <path d="M15 2v5h5" />
  </svg>
);
export const IconDots = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="5" cy="12" r="1.3" />
    <circle cx="12" cy="12" r="1.3" />
    <circle cx="19" cy="12" r="1.3" />
  </svg>
);
export const IconUser = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
  </svg>
);
export const IconServer = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <path d="M7 7h.01M7 17h.01" />
  </svg>
);
export const IconDownload = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 19h16" />
  </svg>
);
