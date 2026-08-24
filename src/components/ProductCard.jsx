import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: { category: "Category" },
  mr: { category: "श्रेणी" },
  hi: { category: "श्रेणी" },
};

// Matches the Borgave-Industries-inspired palette used in Services.jsx
const COLORS = {
  forest: "#173F2E",
  forestDeep: "#0E2B20",
  sage: "#4C7A5D",
  gold: "#C9A24B",
  cream: "#F6F3EA",
  cardWhite: "#FFFFFF",
  textMuted: "#5B6B60",
};

function ProductCard({ product }) {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <div
      className="product-card"
      style={{
        position: "relative",
        background: COLORS.cardWhite,
        border: `1px solid #E7E2D3`,
        borderRadius: "14px",
        padding: "0 0 20px",
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(23,63,46,0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 32px rgba(23,63,46,0.16)";
        e.currentTarget.style.borderColor = COLORS.gold;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(23,63,46,0.06)";
        e.currentTarget.style.borderColor = "#E7E2D3";
      }}
    >
      {/* top accent bar, echoes the Services card signature */}
      <div
        style={{
          height: "4px",
          width: "100%",
          background: `linear-gradient(90deg, ${COLORS.forest}, ${COLORS.gold})`,
        }}
      />

      {/* IMAGE */}
      <div style={{ position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: COLORS.forestDeep,
            color: COLORS.gold,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            padding: "4px 10px",
            borderRadius: "999px",
          }}
        >
          {t.category}: {product.category}
        </span>
      </div>

      <div style={{ padding: "18px 20px 0" }}>
        <h3
          style={{
            color: COLORS.forestDeep,
            fontSize: "18px",
            fontWeight: 700,
            margin: "0 0 10px",
          }}
        >
          {product.name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "6px",
          }}
        >
          <h2
            style={{
              color: COLORS.forest,
              fontSize: "22px",
              fontWeight: 800,
              margin: 0,
            }}
          >
            ₹ {product.price}
          </h2>

          <span
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `2px solid ${COLORS.sage}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.forest,
              fontSize: "18px",
              fontWeight: 700,
              background: COLORS.cream,
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;