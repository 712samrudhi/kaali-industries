// src/Pages/Services.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  C, FONT_DISPLAY, FONT_BODY, Icon, Reveal, Eyebrow, Swash,
  ACCENT_CYCLE, useKaaliFonts, kaaliGlobalCss,
} from "../theme/KaaliUI";

const serviceIcons = [Icon.Sprout, Icon.Basket, Icon.Box, Icon.Rupee, Icon.Truck, Icon.Globe];

const texts = {
  en: {
    eyebrow: "How We Help",
    heading: "Our Services",
    sub: "From the field to the buyer, everything a farmer needs is handled in one place.",
    services: [
      { title: "Farmer Support", desc: "Helping farmers connect directly with buyers, cutting out unnecessary middlemen." },
      { title: "Buyer Marketplace", desc: "Find quality agricultural products easily, sourced from trusted producers." },
      { title: "Order Management", desc: "Manage and track every order efficiently, from booking to delivery." },
      { title: "Price Transparency", desc: "Get fair, updated market prices with no hidden costs at any stage." },
      { title: "Delivery Support", desc: "Fast and reliable delivery, so products reach the field on time." },
      { title: "Export Assistance", desc: "Support for national and international markets, papers to shipping." },
    ],
  },
  mr: {
    eyebrow: "आम्ही कशी मदत करतो",
    heading: "आमच्या सेवा",
    sub: "शेतापासून खरेदीदारापर्यंत, शेतकऱ्याला लागणारी प्रत्येक गोष्ट एकाच ठिकाणी.",
    services: [
      { title: "शेतकरी सहाय्य", desc: "शेतकऱ्यांना अनावश्यक मध्यस्थांशिवाय खरेदीदारांशी थेट जोडण्यास मदत करणे." },
      { title: "खरेदीदार बाजारपेठ", desc: "विश्वासार्ह उत्पादकांकडून मिळणारी दर्जेदार कृषी उत्पादने सहज शोधा." },
      { title: "ऑर्डर व्यवस्थापन", desc: "बुकिंगपासून डिलिव्हरीपर्यंत प्रत्येक ऑर्डर कार्यक्षमतेने व्यवस्थापित करा." },
      { title: "किंमत पारदर्शकता", desc: "कोणत्याही टप्प्यावर लपलेले शुल्क न घेता योग्य आणि अद्ययावत बाजारभाव." },
      { title: "डिलिव्हरी सहाय्य", desc: "जलद आणि विश्वासार्ह वितरण, जेणेकरून उत्पादने वेळेवर शेतापर्यंत पोहोचतील." },
      { title: "निर्यात सहाय्य", desc: "कागदपत्रांपासून शिपिंगपर्यंत राष्ट्रीय आणि आंतरराष्ट्रीय बाजारपेठांसाठी सहाय्य." },
    ],
  },
  hi: {
    eyebrow: "हम कैसे मदद करते हैं",
    heading: "हमारी सेवाएं",
    sub: "खेत से खरीदार तक, किसान को चाहिए हर चीज़ एक ही जगह पर।",
    services: [
      { title: "किसान सहायता", desc: "किसानों को अनावश्यक बिचौलियों के बिना खरीदारों से सीधे जोड़ने में मदद।" },
      { title: "खरीदार बाज़ार", desc: "भरोसेमंद उत्पादकों से मिलने वाले गुणवत्तापूर्ण कृषि उत्पाद आसानी से खोजें।" },
      { title: "ऑर्डर प्रबंधन", desc: "बुकिंग से डिलीवरी तक हर ऑर्डर को कुशलतापूर्वक प्रबंधित और ट्रैक करें।" },
      { title: "मूल्य पारदर्शिता", desc: "किसी भी चरण में छिपे शुल्क के बिना उचित और अद्यतन बाज़ार मूल्य।" },
      { title: "डिलीवरी सहायता", desc: "तेज़ और भरोसेमंद डिलीवरी, ताकि उत्पाद समय पर खेत तक पहुंचें।" },
      { title: "निर्यात सहायता", desc: "कागज़ात से शिपिंग तक राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों के लिए सहायता।" },
    ],
  },
};

function Services() {
  const { lang } = useLanguage();
  const t = texts[lang];
  useKaaliFonts();

  return (
    <>
      <style>{kaaliGlobalCss}</style>
      <section style={styles.section}>
        <div className="ki-blob ki-blob--soft" aria-hidden="true" />
        <Reveal style={{ textAlign: "center", marginBottom: 14, position: "relative", zIndex: 1 }}>
          <Eyebrow center>{t.eyebrow}</Eyebrow>
          <h2 style={styles.heading}>{t.heading}</h2>
          <Swash color={C.gold} />
          <p style={styles.sub}>{t.sub}</p>
        </Reveal>

        <div style={styles.grid}>
          {t.services.map((service, index) => {
            const SIcon = serviceIcons[index % serviceIcons.length];
            const accent = ACCENT_CYCLE[index % ACCENT_CYCLE.length];
            return (
              <Reveal key={index} delay={index * 60}>
                <div className="ki-card" style={styles.card}>
                  <div style={{ ...styles.accentBar, background: accent }} />
                  <div className="ki-icon-circle" style={{ ...styles.iconWrap, boxShadow: `inset 0 0 0 1px ${accent}33` }}>
                    <SIcon style={{ width: 24, height: 24, color: C.forest }} />
                  </div>
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardDesc}>{service.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

const styles = {
  section: {
    position: "relative",
    overflow: "hidden",
    padding: "68px 8%",
    background: C.parchment,
    fontFamily: FONT_BODY,
  },
  heading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: "clamp(28px, 3.6vw, 40px)",
    color: C.forest,
    margin: "4px 0 0",
  },
  sub: {
    maxWidth: 520,
    margin: "16px auto 0",
    color: C.inkSoft,
    fontSize: 15.5,
    lineHeight: 1.7,
  },
  grid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
    marginTop: 40,
    maxWidth: 1160,
    marginLeft: "auto",
    marginRight: "auto",
  },
  card: {
    position: "relative",
    background: "#FFFFFF",
    border: `1px solid ${C.line}`,
    borderRadius: 14,
    padding: "30px 24px 26px",
    overflow: "hidden",
    textAlign: "left",
  },
  accentBar: { position: "absolute", top: 0, left: 0, right: 0, height: 4 },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    background: C.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 19,
    color: C.ink,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14.5,
    lineHeight: 1.65,
    color: C.inkSoft,
  },
};

export default Services;