import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import BASE_URL from "../config";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    eyebrow: "Get In Touch",
    heading: "Contact Us",
    tagline: "Sustainable Agricultural Solutions",
    companyName: "Kaali Industries",
    companyTagline: "🌱 Growing Better Future Together",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    addressLabel: "Office Address",
    address: "C1-303, Sun Empire",
    addressLine2: "Sun City Road",
    addressLine3: "Sinhgad Road",
    addressLine4: "Pune - 411051",
    sendMessage: "Send Message",
    formSub: "We usually reply within a day.",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    messagePlaceholder: "Your Message",
    submit: "Submit",
    failMessage: "Failed to send message",
  },
  mr: {
    eyebrow: "आमच्याशी संपर्क साधा",
    heading: "संपर्क करा",
    tagline: "शाश्वत कृषी उपाय",
    companyName: "काली इंडस्ट्रीज",
    companyTagline: "🌱 एकत्र उत्तम भविष्य घडवूया",
    phoneLabel: "फोन नंबर",
    emailLabel: "ईमेल पत्ता",
    addressLabel: "कार्यालयाचा पत्ता",
    address: "सी1-303, सन एम्पायर",
    addressLine2: "सन सिटी रोड",
    addressLine3: "सिंहगड रोड",
    addressLine4: "पुणे - 411051",
    sendMessage: "संदेश पाठवा",
    formSub: "आम्ही सामान्यतः एका दिवसात उत्तर देतो.",
    namePlaceholder: "तुमचे नाव",
    emailPlaceholder: "तुमचा ईमेल",
    messagePlaceholder: "तुमचा संदेश",
    submit: "सबमिट करा",
    failMessage: "संदेश पाठवण्यात अयशस्वी",
  },
  hi: {
    eyebrow: "हमसे संपर्क करें",
    heading: "संपर्क करें",
    tagline: "टिकाऊ कृषि समाधान",
    companyName: "काली इंडस्ट्रीज",
    companyTagline: "🌱 साथ मिलकर बेहतर भविष्य बनाना",
    phoneLabel: "फ़ोन नंबर",
    emailLabel: "ईमेल पता",
    addressLabel: "कार्यालय का पता",
    address: "सी1-303, सन एम्पायर",
    addressLine2: "सन सिटी रोड",
    addressLine3: "सिंहगड रोड",
    addressLine4: "पुणे - 411051",
    sendMessage: "संदेश भेजें",
    formSub: "हम आमतौर पर एक दिन में जवाब देते हैं।",
    namePlaceholder: "आपका नाम",
    emailPlaceholder: "आपका ईमेल",
    messagePlaceholder: "आपका संदेश",
    submit: "सबमिट करें",
    failMessage: "संदेश भेजने में विफल",
  },
};

// Same palette as Services.jsx / ProductCard.jsx / ProductList.jsx
const COLORS = {
  forest: "#173F2E",
  forestDeep: "#0E2B20",
  sage: "#4C7A5D",
  gold: "#C9A24B",
  cream: "#F6F3EA",
  cardWhite: "#FFFFFF",
  textMuted: "#5B6B60",
};

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { lang } = useLanguage();
  const t = texts[lang];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/contact`, formData);
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      alert(t.failMessage);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, padding: "70px 8%" }}>
      <style>{`
        .contact-input {
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-input:focus {
          border-color: ${COLORS.gold} !important;
          box-shadow: 0 0 0 3px rgba(201,162,75,0.18);
        }
        .contact-submit:hover {
          background: ${COLORS.gold} !important;
          color: ${COLORS.forestDeep} !important;
          transform: translateY(-2px);
        }
        .contact-panel {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-panel:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(23,63,46,0.14);
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <span
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
            marginBottom: "18px",
          }}
        >
          {t.eyebrow}
        </span>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 800,
            color: COLORS.forestDeep,
            margin: "0 0 10px",
            letterSpacing: "-0.5px",
          }}
        >
          {t.heading}
        </h1>
        <p style={{ fontSize: "17px", color: COLORS.textMuted }}>{t.tagline}</p>
      </div>

      <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
        {/* INFO PANEL */}
        <div
          className="contact-panel"
          style={{
            background: COLORS.forestDeep,
            color: "#fff",
            width: "440px",
            padding: "40px 36px",
            borderRadius: "18px",
            boxShadow: "0 12px 32px rgba(23,63,46,0.18)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${COLORS.sage}, ${COLORS.gold})`,
            }}
          />

          <h2 style={{ color: "#fff", fontSize: "26px", fontWeight: 800, margin: "0 0 6px" }}>
            {t.companyName}
          </h2>
          <p style={{ color: "#C9D6CD", marginBottom: "30px" }}>{t.companyTagline}</p>

          <div style={itemStyle}>
            <span style={iconWrapStyle}><FaPhone style={iconStyle} /></span>
            <div>
              <h4 style={labelStyle}>{t.phoneLabel}</h4>
              <p style={valueStyle}>7030056556</p>
            </div>
          </div>

          <div style={itemStyle}>
            <span style={iconWrapStyle}><FaEnvelope style={iconStyle} /></span>
            <div>
              <h4 style={labelStyle}>{t.emailLabel}</h4>
              <p style={valueStyle}>nutrient0009@gmail.com</p>
            </div>
          </div>

          <div style={itemStyle}>
            <span style={iconWrapStyle}><FaMapMarkerAlt style={iconStyle} /></span>
            <div>
              <h4 style={labelStyle}>{t.addressLabel}</h4>
              <p style={valueStyle}>
                {t.address}<br />{t.addressLine2}<br />{t.addressLine3}<br />{t.addressLine4}
              </p>
            </div>
          </div>
        </div>

        {/* FORM PANEL */}
        <div
          className="contact-panel"
          style={{
            background: COLORS.cardWhite,
            width: "440px",
            padding: "40px 36px",
            borderRadius: "18px",
            border: "1px solid #E7E2D3",
            boxShadow: "0 8px 24px rgba(23,63,46,0.08)",
          }}
        >
          <h2 style={{ color: COLORS.forestDeep, fontSize: "24px", fontWeight: 800, margin: "0 0 4px" }}>
            {t.sendMessage}
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: "14px", marginBottom: "22px" }}>{t.formSub}</p>

          <input
            className="contact-input"
            type="text"
            name="name"
            placeholder={t.namePlaceholder}
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            className="contact-input"
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            className="contact-input"
            name="message"
            placeholder={t.messagePlaceholder}
            value={formData.message}
            onChange={handleChange}
            style={{ ...inputStyle, height: "120px", resize: "none" }}
          />

          <button
            className="contact-submit"
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "15px",
              background: COLORS.forest,
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: "0.5px",
              marginTop: "6px",
              transition: "all 0.3s ease",
            }}
          >
            {t.submit}
          </button>
        </div>
      </div>
    </div>
  );
}

const itemStyle = { display: "flex", gap: "16px", alignItems: "flex-start", margin: "22px 0" };
const iconWrapStyle = {
  width: "42px",
  height: "42px",
  minWidth: "42px",
  borderRadius: "50%",
  border: `2px solid #4C7A5D`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.05)",
};
const iconStyle = { fontSize: "16px", color: "#C9A24B" };
const labelStyle = { margin: "0 0 4px", fontSize: "13px", color: "#A9BBAF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" };
const valueStyle = { margin: 0, color: "#EFEAD9", lineHeight: 1.5 };
const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #E0DBC9",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

export default Contact;