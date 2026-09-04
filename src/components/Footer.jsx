// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { C, FONT_DISPLAY, FONT_BODY, Icon, useKaaliFonts, kaaliGlobalCss } from "../theme/KaaliUI";

const texts = {
  en: {
    title: "Kaali Industries",
    tagline: "Agricultural solutions for better crop productivity and sustainable farming.",
    linksHeading: "Quick Links",
    home: "Home",
    about: "About",
    products: "Products",
    services: "Services",
    contactHeading: "Get In Touch",
    phone: "7030056556",
    email: "nutrient0009@gmail.com",
    address: "C1-303, Sun Empire, Sun City Road, Sinhgad Road, Pune - 411051",
    copyright: "© 2026 Kaali Industries. All Rights Reserved.",
  },
  mr: {
    title: "काली इंडस्ट्रीज",
    tagline: "उत्तम पीक उत्पादनासाठी आणि शाश्वत शेतीसाठी कृषी उपाय.",
    linksHeading: "जलद दुवे",
    home: "मुख्यपृष्ठ",
    about: "आमच्याबद्दल",
    products: "उत्पादने",
    services: "सेवा",
    contactHeading: "संपर्क साधा",
    phone: "7030056556",
    email: "nutrient0009@gmail.com",
    address: "सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
    copyright: "© 2026 काली इंडस्ट्रीज. सर्व हक्क राखीव.",
  },
  hi: {
    title: "काली इंडस्ट्रीज",
    tagline: "बेहतर फसल उत्पादकता और टिकाऊ खेती के लिए कृषि समाधान।",
    linksHeading: "त्वरित लिंक",
    home: "होम",
    about: "हमारे बारे में",
    products: "उत्पाद",
    services: "सेवाएं",
    contactHeading: "संपर्क करें",
    phone: "7030056556",
    email: "nutrient0009@gmail.com",
    address: "सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
    copyright: "© 2026 काली इंडस्ट्रीज. सर्वाधिकार सुरक्षित।",
  },
};

function Footer() {
  const { lang } = useLanguage();
  const t = texts[lang];
  useKaaliFonts();

  return (
    <>
      <style>{kaaliGlobalCss}</style>
      <style>{footerCss}</style>
      <footer className="ki-footer">
        <div className="ki-footer-blob" aria-hidden="true" />

        <div className="ki-footer-top">
          <div className="ki-footer-brand">
            <div className="ki-footer-mark">
              <Icon.Sprout style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <div>
              <h2 className="ki-footer-title">{t.title}</h2>
              <p className="ki-footer-tagline">{t.tagline}</p>
            </div>
          </div>

          <div className="ki-footer-col">
            <h3 className="ki-footer-heading">{t.linksHeading}</h3>
            <Link to="/" className="ki-footer-link ki-link">{t.home}</Link>
            <Link to="/about" className="ki-footer-link ki-link">{t.about}</Link>
            <Link to="/products" className="ki-footer-link ki-link">{t.products}</Link>
            <Link to="/services" className="ki-footer-link ki-link">{t.services}</Link>
          </div>

          <div className="ki-footer-col">
            <h3 className="ki-footer-heading">{t.contactHeading}</h3>
            <div className="ki-footer-row">
              <Icon.Phone style={{ width: 15, height: 15, color: C.gold, flexShrink: 0 }} />
              <span>{t.phone}</span>
            </div>
            <div className="ki-footer-row">
              <Icon.Mail style={{ width: 15, height: 15, color: C.gold, flexShrink: 0 }} />
              <span>{t.email}</span>
            </div>
            <div className="ki-footer-row">
              <Icon.Pin style={{ width: 15, height: 15, color: C.gold, flexShrink: 0, marginTop: 2 }} />
              <span>{t.address}</span>
            </div>
          </div>
        </div>

        <div className="ki-footer-bottom">
          <p className="ki-footer-copy">{t.copyright}</p>
        </div>
      </footer>
    </>
  );
}

const footerCss = `
  .ki-footer {
    position: relative;
    overflow: hidden;
    background: linear-gradient(160deg, ${C.forestDark}, #0a1f17);
    color: rgba(255,255,255,0.82);
    font-family: ${FONT_BODY};
    padding: 56px 8% 0;
  }
  .ki-footer-blob {
    position: absolute; top: -80px; right: 4%; width: 300px; height: 300px;
    background: ${C.gold}; opacity: 0.14; border-radius: 50%; filter: blur(90px); pointer-events: none;
  }
  .ki-footer-top {
    position: relative; z-index: 1;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1.2fr;
    gap: 40px;
    max-width: 1160px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
  .ki-footer-brand { display: flex; gap: 14px; }
  .ki-footer-mark {
    width: 42px; height: 42px; border-radius: 11px; background: rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ki-footer-title { font-family: ${FONT_DISPLAY}; font-weight: 600; font-size: 21px; color: #fff; margin: 0 0 8px; }
  .ki-footer-tagline { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.62); max-width: 320px; margin: 0; }

  .ki-footer-heading {
    font-family: ${FONT_BODY}; font-size: 12.5px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${C.gold}; margin: 0 0 16px;
  }
  .ki-footer-col { display: flex; flex-direction: column; gap: 11px; }
  .ki-footer-link { color: rgba(255,255,255,0.78); font-size: 14.5px; width: fit-content; }
  .ki-footer-link:hover { color: #fff; }

  .ki-footer-row { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.55; color: rgba(255,255,255,0.78); }

  .ki-footer-bottom {
    position: relative; z-index: 1;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding: 20px 0;
    text-align: center;
  }
  .ki-footer-copy { font-size: 12.5px; color: rgba(255,255,255,0.5); margin: 0; }

  @media (max-width: 760px) {
    .ki-footer-top { grid-template-columns: 1fr; gap: 30px; }
  }
`;

export default Footer;