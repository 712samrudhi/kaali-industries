import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import BASE_URL from "../config";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
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
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    messagePlaceholder: "Your Message",
    submit: "Submit",
    failMessage: "Failed to send message",
  },
  mr: {
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
    namePlaceholder: "तुमचे नाव",
    emailPlaceholder: "तुमचा ईमेल",
    messagePlaceholder: "तुमचा संदेश",
    submit: "सबमिट करा",
    failMessage: "संदेश पाठवण्यात अयशस्वी",
  },
  hi: {
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
    namePlaceholder: "आपका नाम",
    emailPlaceholder: "आपका ईमेल",
    messagePlaceholder: "आपका संदेश",
    submit: "सबमिट करें",
    failMessage: "संदेश भेजने में विफल",
  },
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#e8f5e9,#ffffff)", padding: "50px 8%" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "65px", marginBottom: "10px" }}>🌿</div>
        <h1 style={{ fontSize: "45px", color: "#1b5e20", margin: "10px" }}>{t.heading}</h1>
        <p style={{ fontSize: "20px", color: "#555" }}>{t.tagline}</p>
      </div>
      <div style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ background: "#fff", width: "450px", padding: "35px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}>
          <h2 style={{ color: "#2e7d32", fontSize: "30px" }}>{t.companyName}</h2>
          <p style={{ color: "#777" }}>{t.companyTagline}</p>
          <div style={itemStyle}><FaPhone style={iconStyle} /><div><h4>{t.phoneLabel}</h4><p>7030056556</p></div></div>
          <div style={itemStyle}><FaEnvelope style={iconStyle} /><div><h4>{t.emailLabel}</h4><p>nutrient0009@gmail.com</p></div></div>
          <div style={itemStyle}><FaMapMarkerAlt style={iconStyle} /><div><h4>{t.addressLabel}</h4><p>{t.address}<br />{t.addressLine2}<br />{t.addressLine3}<br />{t.addressLine4}</p></div></div>
        </div>
        <div style={{ background: "#fff", width: "450px", padding: "35px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}>
          <h2 style={{ color: "#2e7d32" }}>{t.sendMessage}</h2>
          <input type="text" name="name" placeholder={t.namePlaceholder} value={formData.name} onChange={handleChange} style={inputStyle} />
          <input type="email" name="email" placeholder={t.emailPlaceholder} value={formData.email} onChange={handleChange} style={inputStyle} />
          <textarea name="message" placeholder={t.messagePlaceholder} value={formData.message} onChange={handleChange} style={{ ...inputStyle, height: "120px", resize: "none" }} />
          <button onClick={handleSubmit} style={{ width: "100%", padding: "14px", background: "#2e7d32", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}>{t.submit}</button>
        </div>
      </div>
    </div>
  );
}

const itemStyle = { display: "flex", gap: "20px", alignItems: "flex-start", margin: "25px 0" };
const iconStyle = { fontSize: "25px", color: "#43a047" };
const inputStyle = { width: "100%", padding: "14px", margin: "12px 0", borderRadius: "10px", border: "1px solid #ddd", fontSize: "15px", outline: "none", boxSizing: "border-box" };

export default Contact;