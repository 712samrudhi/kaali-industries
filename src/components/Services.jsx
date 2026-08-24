import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    eyebrow: "What We Do",
    heading: "Our Services",
    sub: "End-to-end support for farmers and buyers, built on research and trust.",
    services: [
      { icon: "🌾", code: "S-01", title: "Farmer Support", desc: "Helping farmers connect directly with buyers." },
      { icon: "🛒", code: "S-02", title: "Buyer Marketplace", desc: "Find quality agricultural products easily." },
      { icon: "📦", code: "S-03", title: "Order Management", desc: "Manage and track orders efficiently." },
      { icon: "💰", code: "S-04", title: "Price Transparency", desc: "Get fair and updated market prices." },
      { icon: "🚚", code: "S-05", title: "Delivery Support", desc: "Fast and reliable product delivery." },
      { icon: "🌍", code: "S-06", title: "Export Assistance", desc: "Support for national and international markets." },
    ],
  },
  mr: {
    eyebrow: "आम्ही काय करतो",
    heading: "आमच्या सेवा",
    sub: "संशोधन आणि विश्वासावर आधारित, शेतकरी व खरेदीदारांसाठी सर्वंकष सहाय्य.",
    services: [
      { icon: "🌾", code: "S-01", title: "शेतकरी सहाय्य", desc: "शेतकऱ्यांना खरेदीदारांशी थेट जोडण्यास मदत करणे." },
      { icon: "🛒", code: "S-02", title: "खरेदीदार बाजारपेठ", desc: "दर्जेदार कृषी उत्पादने सहज शोधा." },
      { icon: "📦", code: "S-03", title: "ऑर्डर व्यवस्थापन", desc: "ऑर्डर्स कार्यक्षमतेने व्यवस्थापित करा आणि ट्रॅक करा." },
      { icon: "💰", code: "S-04", title: "किंमत पारदर्शकता", desc: "योग्य आणि अद्ययावत बाजारभाव मिळवा." },
      { icon: "🚚", code: "S-05", title: "डिलिव्हरी सहाय्य", desc: "जलद आणि विश्वासार्ह उत्पादन वितरण." },
      { icon: "🌍", code: "S-06", title: "निर्यात सहाय्य", desc: "राष्ट्रीय आणि आंतरराष्ट्रीय बाजारपेठांसाठी सहाय्य." },
    ],
  },
  hi: {
    eyebrow: "हम क्या करते हैं",
    heading: "हमारी सेवाएं",
    sub: "अनुसंधान और भरोसे पर आधारित, किसानों और खरीदारों के लिए संपूर्ण सहायता।",
    services: [
      { icon: "🌾", code: "S-01", title: "किसान सहायता", desc: "किसानों को खरीदारों से सीधे जोड़ने में मदद करना।" },
      { icon: "🛒", code: "S-02", title: "खरीदार बाज़ार", desc: "गुणवत्तापूर्ण कृषि उत्पाद आसानी से खोजें।" },
      { icon: "📦", code: "S-03", title: "ऑर्डर प्रबंधन", desc: "ऑर्डर को कुशलतापूर्वक प्रबंधित और ट्रैक करें।" },
      { icon: "💰", code: "S-04", title: "मूल्य पारदर्शिता", desc: "उचित और अद्यतन बाज़ार मूल्य प्राप्त करें।" },
      { icon: "🚚", code: "S-05", title: "डिलीवरी सहायता", desc: "तेज़ और भरोसेमंद उत्पाद डिलीवरी।" },
      { icon: "🌍", code: "S-06", title: "निर्यात सहायता", desc: "राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों के लिए सहायता।" },
    ],
  },
};

// Borgave-Industries-inspired palette: deep research green, warm gold accent, cream base
const COLORS = {
  forest: "#173F2E",
  forestDeep: "#0E2B20",
  sage: "#4C7A5D",
  gold: "#C9A24B",
  cream: "#F6F3EA",
  cardWhite: "#FFFFFF",
  textMuted: "#5B6B60",
};

function Services() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div
      style={{
        padding: "80px 8%",
        background: COLORS.cream,
        textAlign: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <style>{`
        .biz-card {
          position: relative;
          overflow: hidden;
        }
        .biz-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${COLORS.forest}, ${COLORS.gold});
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .biz-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(23,63,46,0.16);
          border-color: ${COLORS.gold};
        }
        .biz-card:hover::before {
          transform: scaleX(1);
        }
        .biz-card:hover .icon-ring {
          border-color: ${COLORS.gold};
          background: ${COLORS.forest};
        }
      `}</style>

      <p
        style={{
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontSize: "13px",
          fontWeight: 700,
          color: COLORS.gold,
          marginBottom: "14px",
        }}
      >
        {t.eyebrow}
      </p>

      <h2
        style={{
          fontSize: "40px",
          fontWeight: 800,
          color: COLORS.forestDeep,
          marginBottom: "14px",
          letterSpacing: "-0.5px",
        }}
      >
        {t.heading}
      </h2>

      <p
        style={{
          color: COLORS.textMuted,
          fontSize: "16px",
          maxWidth: "560px",
          margin: "0 auto 50px",
          lineHeight: "1.6",
        }}
      >
        {t.sub}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "28px",
        }}
      >
        {t.services.map((service, index) => (
          <div
            key={index}
            className="biz-card"
            style={{
              background: COLORS.cardWhite,
              padding: "38px 24px 30px",
              borderRadius: "14px",
              border: "1px solid #E7E2D3",
              boxShadow: "0 4px 14px rgba(23,63,46,0.06)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              textAlign: "left",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                color: "#B9C3BC",
              }}
            >
              {service.code}
            </span>

            <div
              className="icon-ring"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: `2px solid ${COLORS.sage}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                marginBottom: "20px",
                background: COLORS.cream,
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
            >
              {service.icon}
            </div>

            <h3
              style={{
                color: COLORS.forestDeep,
                fontSize: "19px",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                color: COLORS.textMuted,
                lineHeight: "1.6",
                fontSize: "14.5px",
                margin: 0,
              }}
            >
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;