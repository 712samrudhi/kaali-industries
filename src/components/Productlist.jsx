import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    eyebrow: "Borgave Industries",
    welcome: "Welcome to Organic Farming",
    tagline: "Fresh Products Direct from Farmers",
    button: "Get Started",
  },
  mr: {
    eyebrow: "बोरगावे इंडस्ट्रीज",
    welcome: "सेंद्रिय शेतीमध्ये आपले स्वागत आहे",
    tagline: "शेतकऱ्यांकडून थेट ताजी उत्पादने",
    button: "सुरु करा",
  },
  hi: {
    eyebrow: "बोरगावे इंडस्ट्रीज",
    welcome: "जैविक खेती में आपका स्वागत है",
    tagline: "किसानों से सीधे ताज़ा उत्पाद",
    button: "शुरू करें",
  },
};

// Matches the palette used in Services.jsx / ProductCard.jsx
const COLORS = {
  forest: "#173F2E",
  forestDeep: "#0E2B20",
  sage: "#4C7A5D",
  gold: "#C9A24B",
  cream: "#F6F3EA",
};

function ProductList() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div style={{ margin: 0, padding: 0, background: COLORS.cream }}>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: heroFadeUp 0.7s ease both; }
        .hero-title { animation: heroFadeUp 0.7s ease 0.15s both; }
        .hero-tagline { animation: heroFadeUp 0.7s ease 0.3s both; }
        .hero-btn { animation: heroFadeUp 0.7s ease 0.45s both; }
        .hero-btn:hover {
          background: ${COLORS.gold} !important;
          color: ${COLORS.forestDeep} !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(201,162,75,0.4);
        }
      `}</style>

      {/* VIDEO SECTION */}
      <div
        style={{
          position: "relative",
          height: "80vh",
          width: "95%",
          margin: "20px auto",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(23,63,46,0.25)",
        }}
      >
        {/* VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/homevideo.mp4" type="video/mp4" />
        </video>

        {/* LAYERED OVERLAY: forest gradient instead of flat black */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(14,43,32,0.55) 0%, rgba(14,43,32,0.35) 45%, rgba(14,43,32,0.75) 100%)`,
          }}
        />

        {/* subtle bottom fade so the border of the card feels intentional */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "3px",
            background: `linear-gradient(90deg, ${COLORS.forest}, ${COLORS.gold})`,
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <span
            className="hero-eyebrow"
            style={{
              display: "inline-block",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontSize: "13px",
              fontWeight: 700,
              color: COLORS.gold,
              border: `1px solid ${COLORS.gold}`,
              borderRadius: "999px",
              padding: "6px 18px",
              marginBottom: "22px",
            }}
          >
            {t.eyebrow}
          </span>

          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 800,
              marginBottom: "16px",
              letterSpacing: "-0.5px",
              maxWidth: "800px",
              lineHeight: 1.15,
            }}
          >
            {t.welcome} <span style={{ color: COLORS.gold }}>🌿</span>
          </h1>

          <p
            className="hero-tagline"
            style={{
              fontSize: "18px",
              color: "#EFEAD9",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            {t.tagline}
          </p>

          <button
            className="hero-btn"
            style={{
              marginTop: "32px",
              padding: "14px 34px",
              background: "transparent",
              border: `2px solid ${COLORS.gold}`,
              color: COLORS.gold,
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;