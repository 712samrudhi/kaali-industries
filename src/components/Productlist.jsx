// src/Pages/ProductList.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { C, FONT_DISPLAY, FONT_BODY, Icon, Reveal, useKaaliFonts, kaaliGlobalCss, Furrow } from "../theme/KaaliUI";

const texts = {
  en: {
    badge: "Trusted Agricultural Partner",
    welcome: "Welcome to Organic Farming",
    tagline: "Fresh, quality agri-inputs delivered direct from farmers to your field.",
    button: "Get Started",
  },
  mr: {
    badge: "विश्वासार्ह कृषी भागीदार",
    welcome: "सेंद्रिय शेतीमध्ये आपले स्वागत आहे",
    tagline: "शेतकऱ्यांकडून थेट तुमच्या शेतापर्यंत ताजी, दर्जेदार कृषी उत्पादने.",
    button: "सुरु करा",
  },
  hi: {
    badge: "विश्वसनीय कृषि साझेदार",
    welcome: "जैविक खेती में आपका स्वागत है",
    tagline: "किसानों से सीधे आपके खेत तक ताज़ा, गुणवत्तापूर्ण कृषि उत्पाद।",
    button: "शुरू करें",
  },
};

function ProductList() {
  const { lang } = useLanguage();
  const t = texts[lang];
  useKaaliFonts();

  return (
    <>
      <style>{kaaliGlobalCss}</style>
      <div style={{ margin: 0, padding: 0, background: C.parchment }}>
        <section style={styles.heroOuter}>
          <Reveal>
            <div style={styles.heroFrame}>
              <video autoPlay loop muted playsInline style={styles.video}>
                <source src="/videos/homevideo.mp4" type="video/mp4" />
              </video>

              <div style={styles.overlay}>
                <div style={styles.eyebrow}>
                  <Icon.Sprout style={{ width: 14, height: 14 }} />
                  <span>{t.badge}</span>
                </div>
                <h1 style={styles.heading}>{t.welcome}</h1>
                <p style={styles.tagline}>{t.tagline}</p>
                <button className="ki-btn" style={styles.cta}>
                  {t.button}
                </button>
              </div>

              <div style={styles.vignetteBottom} aria-hidden="true" />
            </div>
          </Reveal>
        </section>
        <Furrow tone={C.line} />
      </div>
    </>
  );
}

const styles = {
  heroOuter: {
    padding: "24px 4% 0",
    maxWidth: 1400,
    margin: "0 auto",
  },
  heroFrame: {
    position: "relative",
    height: "72vh",
    minHeight: 420,
    width: "100%",
    overflow: "hidden",
    borderRadius: 20,
    border: `1px solid ${C.line}`,
    boxShadow: "0 20px 50px rgba(27,67,50,0.18)",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(180deg, rgba(15,44,33,0.55) 0%, rgba(15,44,33,0.35) 45%, rgba(15,44,33,0.72) 100%)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textAlign: "center",
    padding: "0 24px",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: FONT_BODY,
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: C.gold,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.25)",
    padding: "7px 16px",
    borderRadius: 999,
    marginBottom: 22,
  },
  heading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: "clamp(30px, 5vw, 52px)",
    lineHeight: 1.12,
    marginBottom: 14,
    maxWidth: 720,
  },
  tagline: {
    fontFamily: FONT_BODY,
    fontSize: "clamp(15px, 1.6vw, 18px)",
    color: "rgba(255,255,255,0.88)",
    maxWidth: 520,
    lineHeight: 1.6,
    marginBottom: 30,
  },
  cta: {
    padding: "14px 32px",
    background: C.gold,
    border: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    fontFamily: FONT_BODY,
    borderRadius: 999,
    boxShadow: "0 10px 26px rgba(223,164,59,0.4)",
  },
  vignetteBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "35%",
    background: "linear-gradient(180deg, rgba(15,44,33,0) 0%, rgba(15,44,33,0.5) 100%)",
    pointerEvents: "none",
  },
};

export default ProductList;