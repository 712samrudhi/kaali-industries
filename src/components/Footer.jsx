import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    title: "Kaali Industries",
    tagline: "Agricultural solutions for better crop productivity and sustainable farming.",
    phone: "📞 Phone: 7030056556",
    email: "✉ Email: nutrient0009@gmail.com",
    address: "📍 C1-303, Sun Empire, Sun City Road, Sinhgad Road, Pune - 411051",
    copyright: "© 2026 Kaali Industries. All Rights Reserved.",
  },
  mr: {
    title: "काली इंडस्ट्रीज",
    tagline: "उत्तम पीक उत्पादनासाठी आणि शाश्वत शेतीसाठी कृषी उपाय.",
    phone: "📞 फोन: 7030056556",
    email: "✉ ईमेल: nutrient0009@gmail.com",
    address: "📍 सी1-३०३, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - ४११०५१",
    copyright: "© 2026 काली इंडस्ट्रीज. सर्व हक्क राखीव.",
  },
  hi: {
    title: "काली इंडस्ट्रीज",
    tagline: "बेहतर फसल उत्पादकता और टिकाऊ खेती के लिए कृषि समाधान।",
    phone: "📞 फोन: 7030056556",
    email: "✉ ईमेल: nutrient0009@gmail.com",
    address: "📍 सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
    copyright: "© 2026 काली इंडस्ट्रीज. सर्वाधिकार सुरक्षित।",
  },
};

function Footer() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <footer style={styles.footer}>

      <h2 style={styles.title}>
        {t.title}
      </h2>

      <p>
        {t.tagline}
      </p>


      <div style={styles.details}>

        <p>
          {t.phone}
        </p>

        <p>
          {t.email}
        </p>

        <p>
          {t.address}
        </p>

      </div>


      <p style={styles.copyright}>
        {t.copyright}
      </p>

    </footer>
  );
}


const styles = {

footer:{
background:"#222",
color:"#fff",
textAlign:"center",
padding:"25px",
marginTop:"40px"
},


title:{
color:"#4ade80",
marginBottom:"10px"
},


details:{
marginTop:"15px",
fontSize:"14px",
lineHeight:"1.6"
},


copyright:{
marginTop:"15px",
fontSize:"13px",
color:"#ccc"
}

};


export default Footer;