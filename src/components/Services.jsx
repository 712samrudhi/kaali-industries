import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    heading: "Our Services",
    services: [
      { icon: "🌾", title: "Farmer Support", desc: "Helping farmers connect directly with buyers." },
      { icon: "🛒", title: "Buyer Marketplace", desc: "Find quality agricultural products easily." },
      { icon: "📦", title: "Order Management", desc: "Manage and track orders efficiently." },
      { icon: "💰", title: "Price Transparency", desc: "Get fair and updated market prices." },
      { icon: "🚚", title: "Delivery Support", desc: "Fast and reliable product delivery." },
      { icon: "🌍", title: "Export Assistance", desc: "Support for national and international markets." },
    ],
  },
  mr: {
    heading: "आमच्या सेवा",
    services: [
      { icon: "🌾", title: "शेतकरी सहाय्य", desc: "शेतकऱ्यांना खरेदीदारांशी थेट जोडण्यास मदत करणे." },
      { icon: "🛒", title: "खरेदीदार बाजारपेठ", desc: "दर्जेदार कृषी उत्पादने सहज शोधा." },
      { icon: "📦", title: "ऑर्डर व्यवस्थापन", desc: "ऑर्डर्स कार्यक्षमतेने व्यवस्थापित करा आणि ट्रॅक करा." },
      { icon: "💰", title: "किंमत पारदर्शकता", desc: "योग्य आणि अद्ययावत बाजारभाव मिळवा." },
      { icon: "🚚", title: "डिलिव्हरी सहाय्य", desc: "जलद आणि विश्वासार्ह उत्पादन वितरण." },
      { icon: "🌍", title: "निर्यात सहाय्य", desc: "राष्ट्रीय आणि आंतरराष्ट्रीय बाजारपेठांसाठी सहाय्य." },
    ],
  },
  hi: {
    heading: "हमारी सेवाएं",
    services: [
      { icon: "🌾", title: "किसान सहायता", desc: "किसानों को खरीदारों से सीधे जोड़ने में मदद करना।" },
      { icon: "🛒", title: "खरीदार बाज़ार", desc: "गुणवत्तापूर्ण कृषि उत्पाद आसानी से खोजें।" },
      { icon: "📦", title: "ऑर्डर प्रबंधन", desc: "ऑर्डर को कुशलतापूर्वक प्रबंधित और ट्रैक करें।" },
      { icon: "💰", title: "मूल्य पारदर्शिता", desc: "उचित और अद्यतन बाज़ार मूल्य प्राप्त करें।" },
      { icon: "🚚", title: "डिलीवरी सहायता", desc: "तेज़ और भरोसेमंद उत्पाद डिलीवरी।" },
      { icon: "🌍", title: "निर्यात सहायता", desc: "राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों के लिए सहायता।" },
    ],
  },
};

function Services() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div
      style={{
        padding: "60px 8%",
        background: "#f8f9fa",
        textAlign: "center"
      }}
    >
      <h2
        style={{
          fontSize: "36px",
          color: "#2e7d32",
          marginBottom: "40px"
        }}
      >
        {t.heading}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}
      >
        {t.services.map((service, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "30px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px"
              }}
            >
              {service.icon}
            </div>

            <h3
              style={{
                color: "#2e7d32",
                marginBottom: "10px"
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                color: "#666",
                lineHeight: "1.6"
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