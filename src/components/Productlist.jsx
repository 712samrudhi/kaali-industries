import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    welcome: "Welcome to Organic Farming 🌿",
    tagline: "Fresh Products Direct from Farmers",
    button: "Get Started",
  },
  mr: {
    welcome: "सेंद्रिय शेतीमध्ये आपले स्वागत आहे 🌿",
    tagline: "शेतकऱ्यांकडून थेट ताजी उत्पादने",
    button: "सुरु करा",
  },
  hi: {
    welcome: "जैविक खेती में आपका स्वागत है 🌿",
    tagline: "किसानों से सीधे ताज़ा उत्पाद",
    button: "शुरू करें",
  },
};

function ProductList() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div style={{ margin: 0, padding: 0 }}>

      {/* VIDEO SECTION */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          width: "95%",
          margin: "auto",
          overflow: "hidden",
          borderRadius: "15px",
          marginTop: "20px"
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
            borderRadius: "15px"
          }}
        >

          <source src="/videos/homevideo.mp4" type="video/mp4" />

        </video>


        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center"
          }}
        >

          <h1
            style={{
              fontSize: "35px",
              marginBottom: "10px"
            }}
          >
            {t.welcome}
          </h1>


          <p
            style={{
              fontSize: "18px"
            }}
          >
            {t.tagline}
          </p>


          <button
            style={{
              marginTop: "20px",
              padding: "10px 25px",
              background: "orange",
              border: "none",
              color: "white",
              fontSize: "15px",
              borderRadius: "8px",
              cursor: "pointer"
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