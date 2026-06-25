
import React from "react";

function ProductCard({ product }) {

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
        Category : {product.category}
      </p>

      <h2 style={{ color: "green" }}>
        ₹ {product.price}
      </h2>

    </div>
  );
}

export default ProductCard;
