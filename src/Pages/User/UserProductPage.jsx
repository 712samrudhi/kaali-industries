import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../../config";
import { useLanguage } from "../../context/LanguageContext";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23999' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const texts = {
  en: {
    heading: "Our Products",
    categoriesLabel: "Categories",
    categoryList: ["All", "Fertilizer", "Biostimulant", "Seeds", "Pesticides", "Herbicide", "Fungicide", "PGR"],
    categoryLabel: "Category",
    loading: "Loading products...",
    errorMsg: "Products load होत नाहीत. सर्व्हर तपासा किंवा नंतर प्रयत्न करा.",
    buyNow: "Buy Now",
    details: "Details",
    noProducts: "No Products Found",
  },
  mr: {
    heading: "आमची उत्पादने",
    categoriesLabel: "श्रेणी",
    categoryList: ["सर्व", "खत", "जैव-उत्तेजक", "बियाणे", "कीडनाशके", "तणनाशक", "बुरशीनाशक", "पीजीआर"],
    categoryLabel: "श्रेणी",
    loading: "उत्पादने लोड होत आहेत...",
    errorMsg: "उत्पादने लोड होत नाहीत. सर्व्हर तपासा किंवा नंतर प्रयत्न करा.",
    buyNow: "आता खरेदी करा",
    details: "तपशील",
    noProducts: "उत्पादने आढळली नाहीत",
  },
  hi: {
    heading: "हमारे उत्पाद",
    categoriesLabel: "श्रेणियां",
    categoryList: ["सभी", "उर्वरक", "जैव-उत्तेजक", "बीज", "कीटनाशक", "खरपतवारनाशी", "फफूंदनाशी", "पीजीआर"],
    categoryLabel: "श्रेणी",
    loading: "उत्पाद लोड हो रहे हैं...",
    errorMsg: "उत्पाद लोड नहीं हो रहे। सर्वर जांचें या बाद में प्रयास करें।",
    buyNow: "अभी खरीदें",
    details: "विवरण",
    noProducts: "कोई उत्पाद नहीं मिला",
  },
};

// English keys used for actual filtering logic — backend category values stay in English
const categoryKeys = ["All", "Fertilizer", "Biostimulant", "Seeds", "Pesticides", "Herbicide", "Fungicide", "PGR"];

function UserProductPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isUser = location.pathname.startsWith("/user");
  const { lang } = useLanguage();
  const t = texts[lang];

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data || []);
        setFiltered(res.data || []);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    if (cat === "All") setFiltered(products);
    else {
      const data = products.filter(
        (item) => item.category && item.category.toLowerCase() === cat.toLowerCase()
      );
      setFiltered(data);
    }
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

  const getImageSrc = (image) => {
    if (!image) return FALLBACK_IMAGE;
    if (image.startsWith("http")) return image;
    return `${BASE_URL}/uploads/${image}`;
  };

  // Pick the right language field, falling back to base field if translation is empty
  const getName = (item) => {
    if (lang === "mr" && item.name_mr) return item.name_mr;
    if (lang === "hi" && item.name_hi) return item.name_hi;
    return item.name_en || item.name;
  };

  const getCategoryDisplay = (item) => {
    if (lang === "mr" && item.category_mr) return item.category_mr;
    if (lang === "hi" && item.category_hi) return item.category_hi;
    return item.category_en || item.category;
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "30px" }}>
      <h1 style={{ textAlign: "center", color: "#2e7d32", marginBottom: "35px" }}>
        {t.heading}
      </h1>
      <div style={{ display: "flex", gap: "25px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "240px",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{t.categoriesLabel}</h3>
          {categoryKeys.map((catKey, index) => (
            <button
              key={catKey}
              onClick={() => handleCategory(catKey)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                background: category === catKey ? "#2e7d32" : "#f1f1f1",
                color: category === catKey ? "white" : "black",
              }}
            >
              {t.categoryList[index]}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {loading ? (
            <h2>{t.loading}</h2>
          ) : error ? (
            <h2 style={{ color: "red" }}>
              {t.errorMsg}
            </h2>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: "25px",
              }}
            >
              {filtered.length > 0 ? (
                filtered.map((item) => (
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
                          e.target.src = FALLBACK_IMAGE;
                        }}
                        style={{ width: "100%", height: "220px", objectFit: "contain" }}
                      />
                    </div>
                    <div style={{ padding: "15px" }}>
                      <h3>{getName(item)}</h3>
                      <p style={{ color: "#666" }}>{t.categoryLabel} : {getCategoryDisplay(item)}</p>
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
                          {t.buyNow}
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
                          {t.details}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>{t.noProducts}</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProductPage;