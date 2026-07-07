import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../config";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isUser = location.pathname.startsWith("/user");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data || []);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = products.filter((item) => {
    const name = item.name ? item.name.toLowerCase() : "";
    const category = item.category ? item.category.toLowerCase() : "";
    const q = query.toLowerCase();
    return name.includes(q) || category.includes(q);
  });

  const getImageSrc = (image) => {
    if (!image) return "https://via.placeholder.com/300";
    if (image.startsWith("http")) return image;
    return `${BASE_URL}/uploads/${image}`;
  };

  const handleBuyNow = (product) => {
    const farmer = localStorage.getItem("farmer");
    if (!farmer || farmer === "null") {
      navigate("/login");
      return;
    }
    localStorage.setItem(
      "checkoutProduct",
      JSON.stringify({
        items: [
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            ml: "",
            image: product.image,
            qty: 1,
          },
        ],
        totalItems: 1,
        totalPrice: Number(product.price),
      })
    );
    navigate("/checkout");
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "30px" }}>
      <h1 style={{ textAlign: "center", color: "#2e7d32", marginBottom: "10px" }}>
        Search Results
      </h1>

      <p style={{ textAlign: "center", color: "#666", marginBottom: "35px" }}>
        Showing results for: <b>"{query}"</b>
      </p>

      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading products...</h2>
      ) : error ? (
        <h2 style={{ textAlign: "center", color: "red" }}>
          Products load होत नाहीत. सर्व्हर तपासा किंवा नंतर प्रयत्न करा.
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px",
                  }}
                >
                  <img
                    src={getImageSrc(item.image)}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                    style={{ width: "100%", height: "220px", objectFit: "contain" }}
                  />
                </div>
                <div style={{ padding: "15px" }}>
                  <h3>{item.name}</h3>
                  <p style={{ color: "#666" }}>Category : {item.category}</p>
                  <h2 style={{ color: "#B12704" }}>₹ {item.price}</h2>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleBuyNow(item)}
                      style={{
                        flex: 1,
                        background: "orange",
                        color: "#fff",
                        border: "none",
                        padding: "12px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() =>
                        isUser
                          ? navigate(`/user/product/${item.id}`)
                          : navigate(`/product/${item.id}`)
                      }
                      style={{
                        flex: 1,
                        background: "#232f3e",
                        color: "#fff",
                        border: "none",
                        padding: "12px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 style={{ textAlign: "center", gridColumn: "1/-1" }}>
              कोणतेही परिणाम सापडले नाहीत. कृपया वेगळा शब्द वापरून पहा.
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;