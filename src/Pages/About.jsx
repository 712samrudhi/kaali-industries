// src/theme/KaaliUI.jsx
// Shared design system for the Kaali Industries site — colors, type, icons,
// and the small motion/structure primitives (Reveal, Furrow, Eyebrow, Swash)
// that About.jsx introduced. Every page imports from here so the whole site
// reads as one brand instead of five different components.

import React, { useEffect, useRef, useState } from "react";

/* ---------- Color / type tokens ---------- */
export const C = {
  forest: "#1B4332",
  forestDark: "#0F2C21",
  crop: "#40916C",
  cropSoft: "#8FBFA0",
  soil: "#7A4A1F",
  soilSoft: "#A9713D",
  gold: "#DFA43B",
  goldDark: "#B5811F",
  parchment: "#FBF7EF",
  paper: "#F3EEE1",
  ink: "#26261F",
  inkSoft: "#5C594D",
  line: "#E4DCC8",
  danger: "#B3261E",
};

export const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
export const FONT_BODY = "'Inter', -apple-system, 'Segoe UI', sans-serif";
export const ACCENT_CYCLE = [C.crop, C.gold, C.soil];

/* Loads the two brand fonts once, no matter how many pages mount */
export function useKaaliFonts() {
  useEffect(() => {
    if (document.getElementById("ki-fonts")) return;
    const link = document.createElement("link");
    link.id = "ki-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------- Icon set ---------- */
export const Icon = {
  Sprout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6Z" />
      <path d="M12 13c0-3.2-2.4-5.2-6-5.2C6 11.6 8.4 13 12 13Z" />
    </svg>
  ),
  Target: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  ),
  Bug: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="8" y="9" width="8" height="10" rx="4" />
      <path d="M12 9V6M9 6l-2-2M15 6l2-2M6 12H3M21 12h-3M6 17l-2 2M18 17l2 2" />
    </svg>
  ),
  ShieldDrop: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M12 8c1.4 1.8 2 3 2 4a2 2 0 1 1-4 0c0-1 .6-2.2 2-4Z" />
    </svg>
  ),
  LeafSlash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20c8-1 12-6 13-15-9 1-13 6-13 15Z" />
      <path d="M6 18C10 13 13 9 17 5" />
    </svg>
  ),
  TrendUp: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 17l6-6 4 4 8-9" />
      <path d="M15 6h6v6" />
    </svg>
  ),
  Grain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3c2 2 2 4 0 6-2-2-2-4 0-6Z" />
      <path d="M12 9c2.5 2 2.5 4.5 0 7-2.5-2.5-2.5-5 0-7Z" />
      <path d="M12 16c2.5 2 2.5 3.5 0 5-2.5-1.5-2.5-3 0-5Z" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Cart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2.4l2.1 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 7H6" />
    </svg>
  ),
  Basket: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 10h16l-1.6 9.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4 10Z" />
      <path d="M8 10 12 3l4 7" />
    </svg>
  ),
  Box: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3.5 8 12 3.5 20.5 8 12 12.5 3.5 8Z" />
      <path d="M3.5 8v9L12 21.5 20.5 17V8" />
      <path d="M12 12.5V21.5" />
    </svg>
  ),
  Truck: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="1.5" y="7" width="12" height="9" rx="1" />
      <path d="M13.5 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.3 4 5.3 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.3-4-8.5s1.4-6.2 4-8.5Z" />
    </svg>
  ),
  Rupee: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 4h11M6 9h11M6 4c4 0 6.5 1.6 6.5 4.5S16 13 12 13H6l8 8" />
    </svg>
  ),
};

/* ---------- Scroll-reveal wrapper ---------- */
export function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ki-reveal${visible ? " ki-inview" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ---------- Furrow divider — the site's signature motif ---------- */
export function Furrow({ tone = C.line, flip = false }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      style={{ width: "100%", height: 24, display: "block", transform: flip ? "scaleY(-1)" : "none" }}
      aria-hidden="true"
    >
      <path
        d="M0 20 Q 50 4 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
        fill="none" stroke={tone} strokeWidth="1.5"
      />
      <path
        d="M0 28 Q 50 12 100 28 T 200 28 T 300 28 T 400 28 T 500 28 T 600 28 T 700 28 T 800 28 T 900 28 T 1000 28 T 1100 28 T 1200 28"
        fill="none" stroke={tone} strokeWidth="1" opacity="0.55"
      />
    </svg>
  );
}

export function Swash({ color = C.gold }) {
  return (
    <svg viewBox="0 0 90 14" width="90" height="14" aria-hidden="true" style={{ display: "block", margin: "10px auto 0" }}>
      <path d="M2 8c10-10 20 6 30-2s20-6 28 2 20-6 28 2" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Eyebrow({ children, dark, center }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: FONT_BODY,
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: 14,
        color: dark ? C.gold : C.soil,
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      <span style={{ width: 18, height: 1.5, background: dark ? C.gold : C.soil, display: "inline-block" }} />
      <Icon.Sprout style={{ width: 14, height: 14 }} />
      <span>{children}</span>
    </div>
  );
}

/* ---------- Shared global CSS: hover states, blobs, reveal, focus rings ---------- */
export const kaaliGlobalCss = `
  .ki-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .ki-reveal.ki-inview { opacity: 1; transform: translateY(0); }

  .ki-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; z-index: 0; }
  .ki-blob--gold { top: -60px; right: 6%; width: 260px; height: 260px; background: ${C.gold}; opacity: 0.24; }
  .ki-blob--crop { bottom: -80px; left: 2%; width: 300px; height: 300px; background: ${C.crop}; opacity: 0.16; }
  .ki-blob--soft { top: 10%; left: 50%; width: 420px; height: 420px; background: ${C.gold}; opacity: 0.10; transform: translateX(-50%); }

  .ki-card { position: relative; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
  .ki-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(27,67,50,0.14); border-color: ${C.crop}; }
  .ki-card--dark:hover { box-shadow: 0 16px 34px rgba(0,0,0,0.3); border-color: ${C.gold}; }

  .ki-icon-circle { transition: background 0.25s ease, transform 0.25s ease; }
  .ki-card:hover .ki-icon-circle { background: ${C.forest}; transform: scale(1.07); }
  .ki-card:hover .ki-icon-circle svg { color: #fff !important; }

  .ki-image { transition: transform 0.5s ease; overflow: hidden; }
  .ki-image img { transition: transform 0.5s ease; }
  .ki-image:hover img { transform: scale(1.05); }

  .ki-btn { transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease; cursor: pointer; }
  .ki-btn:hover { transform: translateY(-2px); }
  .ki-btn:active { transform: translateY(0); }
  .ki-btn:focus-visible, .ki-link:focus-visible, .ki-input:focus-visible, .ki-chip-btn:focus-visible {
    outline: 2px solid ${C.gold}; outline-offset: 2px;
  }

  .ki-link { position: relative; text-decoration: none; }
  .ki-link::after {
    content: ""; position: absolute; left: 0; right: 100%; bottom: -4px; height: 2px;
    background: ${C.gold}; transition: right 0.25s ease;
  }
  .ki-link:hover::after, .ki-link.active::after { right: 0; }

  .ki-chip-btn { transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease; }
  .ki-chip-btn:hover { transform: translateX(3px); }

  .ki-why-row { transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
  .ki-why-row:hover { background: #FFFFFF; border-color: ${C.crop}; transform: translateX(4px); }

  .ki-chip { animation: kiFloat 3.6s ease-in-out infinite; }
  @keyframes kiFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

  ::selection { background: ${C.gold}; color: ${C.forestDark}; }

  @media (prefers-reduced-motion: reduce) {
    .ki-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .ki-card, .ki-image, .ki-image img, .ki-why-row, .ki-icon-circle, .ki-btn, .ki-chip-btn { transition: none; }
    .ki-chip { animation: none; }
  }
`;