import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config";

function Seed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then(res => setProducts(res.data.filter(item => item.category?.toLowerCase() === "seed")))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Seed Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
        {products.length > 0 ? products.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
            <img src={`${BASE_URL}/uploads/${item.image}`} alt={item.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/250x200?text=No+Image"; }} />
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <h2 style={{ color: "green" }}>₹ {item.price}</h2>
          </div>
        )) : <h2>No Seed Products Found</h2>}
      </div>
    </div>
  );
}
export default Seed;
