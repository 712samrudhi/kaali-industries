import React from "react";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: { category: "Category" },
  mr: { category: "श्रेणी" },
  hi: { category: "श्रेणी" },
};

function ProductCard({ product }) {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (

    <div
      className="product-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px"
      }}
    >

      {/* ✅ IMAGE FIX */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <h3>{product.name}</h3>

      <p>
        {t.category} : {product.category}
      </p>

      <h2 style={{ color: "green" }}>
        ₹ {product.price}
      </h2>

    </div>
  );
}

export default ProductCard;