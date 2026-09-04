// src/components/ProductCard.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { C, FONT_DISPLAY, FONT_BODY, Icon, kaaliGlobalCss } from "../theme/KaaliUI";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23F3EEE1'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23A9713D' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const texts = {
  en: { category: "Category" },
  mr: { category: "श्रेणी" },
  hi: { category: "श्रेणी" },
};

function ProductCard({ product, onClick }) {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <>
      <style>{kaaliGlobalCss}</style>
      <div
        className="ki-card ki-product-card"
        onClick={onClick}
        style={{
          background: "#FFFFFF",
          border: `1px solid ${C.line}`,
          borderRadius: 14,
          overflow: "hidden",
          fontFamily: FONT_BODY,
          cursor: onClick ? "pointer" : "default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="ki-image" style={{ position: "relative", background: C.paper, overflow: "hidden" }}>
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              display: "block",
            }}
          />
          {product.category && (
            <span
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(27,67,50,0.9)",
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.04em",
                padding: "5px 12px",
                borderRadius: 999,
              }}
            >
              {product.category}
            </span>
          )}
        </div>

        <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 18,
              color: C.ink,
              margin: "0 0 6px",
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>

          <p style={{ fontSize: 13, color: C.inkSoft, margin: "0 0 14px" }}>
            {t.category} : {product.category}
          </p>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 21, color: C.soil }}>
              ₹ {product.price}
            </span>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: C.paper,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon.Cart style={{ width: 16, height: 16, color: C.forest }} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;