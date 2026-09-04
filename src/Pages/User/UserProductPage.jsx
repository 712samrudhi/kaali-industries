// src/pages/user/UserProductPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../../config";
import { useLanguage } from "../../context/LanguageContext";
import {
  C, FONT_DISPLAY, FONT_BODY, Icon, Reveal, Eyebrow, Swash,
  useKaaliFonts, kaaliGlobalCss,
} from "../../theme/KaaliUI";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23F3EEE1'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23A9713D' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const texts = {
  en: {
    eyebrow: "Shop The Range",
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
    eyebrow: "श्रेणी पहा",
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
    eyebrow: "श्रेणियां देखें",
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

// English keys drive the actual filter logic — backend category values stay in English
const categoryKeys = ["All", "Fertilizer", "Biostimulant", "Seeds", "Pesticides", "Herbicide", "Fungicide", "PGR"];
const categoryIcons = [Icon.Grain, Icon.Sprout, Icon.LeafSlash, Icon.Grain, Icon.Bug, Icon.LeafSlash, Icon.ShieldDrop, Icon.TrendUp];

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
  useKaaliFonts();

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
    <>
      <style>{kaaliGlobalCss}</style>
      <div style={styles.page}>
        <div style={styles.headerWrap}>
          <Reveal style={{ textAlign: "center" }}>
            <Eyebrow center>{t.eyebrow}</Eyebrow>
            <h1 style={styles.heading}>{t.heading}</h1>
            <Swash color={C.gold} />
          </Reveal>
        </div>

        <div style={styles.layout}>
          {/* Sidebar */}
          <Reveal style={{ ...styles.sidebarWrap }}>
            <aside style={styles.sidebar}>
              <h3 style={styles.sidebarHeading}>{t.categoriesLabel}</h3>
              <div style={styles.sidebarList}>
                {categoryKeys.map((catKey, index) => {
                  const CatIcon = categoryIcons[index % categoryIcons.length];
                  const active = category === catKey;
                  return (
                    <button
                      key={catKey}
                      className="ki-chip-btn ki-btn"
                      onClick={() => handleCategory(catKey)}
                      style={{
                        ...styles.sidebarBtn,
                        background: active ? C.forest : "transparent",
                        color: active ? "#fff" : C.ink,
                        border: `1px solid ${active ? C.forest : C.line}`,
                      }}
                    >
                      <CatIcon style={{ width: 16, height: 16, flexShrink: 0 }} />
                      <span>{t.categoryList[index]}</span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </Reveal>

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {loading ? (
              <div style={styles.stateBox}>
                <p style={styles.stateText}>{t.loading}</p>
              </div>
            ) : error ? (
              <div style={styles.stateBox}>
                <p style={{ ...styles.stateText, color: C.danger }}>{t.errorMsg}</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <Reveal key={item.id} delay={Math.min(i, 6) * 50}>
                      <div className="ki-card" style={styles.card}>
                        <div className="ki-image" style={styles.imageWrap}>
                          <img
                            src={getImageSrc(item.image)}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FALLBACK_IMAGE;
                            }}
                            style={styles.image}
                          />
                        </div>

                        <div style={styles.cardBody}>
                          <h3 style={styles.productName}>{getName(item)}</h3>
                          <p style={styles.productCategory}>
                            {t.categoryLabel} : {getCategoryDisplay(item)}
                          </p>
                          <div style={styles.priceRow}>₹ {item.price}</div>

                          <div style={styles.btnRow}>
                            <button
                              className="ki-btn"
                              onClick={() => handleBuyNow(item)}
                              style={styles.buyBtn}
                            >
                              {t.buyNow}
                            </button>
                            <button
                              className="ki-btn"
                              onClick={() =>
                                isUser
                                  ? navigate(`/user/product/${item.id}`)
                                  : navigate(`/product/${item.id}`)
                              }
                              style={styles.detailsBtn}
                            >
                              {t.details}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))
                ) : (
                  <div style={styles.stateBox}>
                    <p style={styles.stateText}>{t.noProducts}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    background: C.parchment,
    minHeight: "100vh",
    padding: "48px 6% 70px",
    fontFamily: FONT_BODY,
  },
  headerWrap: { marginBottom: 40 },
  heading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: "clamp(30px, 4vw, 44px)",
    color: C.forest,
    margin: "4px 0 0",
  },
  layout: {
    display: "flex",
    gap: 28,
    alignItems: "flex-start",
    maxWidth: 1280,
    margin: "0 auto",
    flexWrap: "wrap",
  },
  sidebarWrap: { flex: "0 0 240px" },
  sidebar: {
    width: "100%",
    minWidth: 220,
    background: "#FFFFFF",
    padding: "22px",
    borderRadius: 14,
    border: `1px solid ${C.line}`,
    position: "sticky",
    top: 100,
  },
  sidebarHeading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 17,
    color: C.forest,
    margin: "0 0 14px",
  },
  sidebarList: { display: "flex", flexDirection: "column", gap: 8 },
  sidebarBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    fontFamily: FONT_BODY,
    textAlign: "left",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 22,
    flex: 1,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    border: `1px solid ${C.line}`,
    display: "flex",
    flexDirection: "column",
  },
  imageWrap: {
    height: 210,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    background: C.paper,
  },
  image: { width: "100%", height: "100%", objectFit: "contain", display: "block" },
  cardBody: { padding: "16px 18px 20px", display: "flex", flexDirection: "column", flex: 1 },
  productName: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 17,
    color: C.ink,
    margin: "0 0 4px",
    lineHeight: 1.3,
  },
  productCategory: { fontSize: 12.5, color: C.inkSoft, margin: "0 0 10px" },
  priceRow: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 22,
    color: C.soil,
    marginBottom: 16,
  },
  btnRow: { display: "flex", gap: 10, marginTop: "auto" },
  buyBtn: {
    flex: 1,
    background: C.gold,
    color: "#fff",
    border: "none",
    padding: "11px 12px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13.5,
    fontFamily: FONT_BODY,
  },
  detailsBtn: {
    flex: 1,
    background: "transparent",
    color: C.forest,
    border: `1.5px solid ${C.forest}`,
    padding: "11px 12px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13.5,
    fontFamily: FONT_BODY,
  },
  stateBox: {
    background: "#FFFFFF",
    border: `1px dashed ${C.line}`,
    borderRadius: 14,
    padding: "60px 20px",
    textAlign: "center",
  },
  stateText: { fontSize: 16, color: C.inkSoft, fontWeight: 600, margin: 0 },
};

export default UserProductPage;