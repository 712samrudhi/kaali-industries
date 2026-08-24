import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const texts = {
  en: {
    badge: "Farm-Fresh Inputs",
    heading: "Our Products",
    subheading: "Everything your fields need — sourced, tested, and ready to ship.",
    categoriesLabel: "Categories",
    categoryList: ["All", "Fertilizer", "Seed", "Food", "Vegetable", "Fruit", "Grains"],
    categoryLabel: "Category",
    buyNow: "Buy Now",
    details: "Details",
    noProducts: "No Products Found",
    noProductsSub: "Try a different category from the list.",
  },
  mr: {
    badge: "शेतासाठी ताजे इनपुट",
    heading: "आमची उत्पादने",
    subheading: "तुमच्या शेतासाठी लागणारं सगळं — तपासलेलं आणि पाठवण्यास तयार.",
    categoriesLabel: "श्रेणी",
    categoryList: ["सर्व", "खत", "बियाणे", "अन्न", "भाजी", "फळ", "धान्य"],
    categoryLabel: "श्रेणी",
    buyNow: "आता खरेदी करा",
    details: "तपशील",
    noProducts: "उत्पादने आढळली नाहीत",
    noProductsSub: "यादीतील दुसरी श्रेणी निवडून पहा.",
  },
  hi: {
    badge: "खेत के लिए ताज़ा इनपुट",
    heading: "हमारे उत्पाद",
    subheading: "आपके खेत के लिए ज़रूरी सब कुछ — जांचा-परखा और भेजने के लिए तैयार.",
    categoriesLabel: "श्रेणियां",
    categoryList: ["सभी", "उर्वरक", "बीज", "भोजन", "सब्ज़ी", "फल", "अनाज"],
    categoryLabel: "श्रेणी",
    buyNow: "अभी खरीदें",
    details: "विवरण",
    noProducts: "कोई उत्पाद नहीं मिला",
    noProductsSub: "सूची में से कोई और श्रेणी आज़माएं.",
  },
};

// English category keys used for actual filtering logic (data stays in English on backend)
const categoryKeys = ["All", "Fertilizer", "Seed", "Food", "Vegetable", "Fruit", "Grains"];

/* ---------- Color / type tokens (shared visual language with About page) ---------- */
const C = {
  forest: "#1B4332",
  forestDark: "#0F2C21",
  crop: "#40916C",
  soil: "#7A4A1F",
  gold: "#DFA43B",
  parchment: "#FBF7EF",
  paper: "#F3EEE1",
  ink: "#26261F",
  inkSoft: "#5C594D",
  line: "#E4DCC8",
  danger: "#B12704",
};
const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', -apple-system, 'Segoe UI', sans-serif";

/* ---------- Inline icons (no external deps) ---------- */
const Icon = {
  Grid: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Sprout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21v-8" /><path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6Z" />
      <path d="M12 13c0-3.2-2.4-5.2-6-5.2C6 11.6 8.4 13 12 13Z" />
    </svg>
  ),
  Grain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3c2 2 2 4 0 6-2-2-2-4 0-6Z" /><path d="M12 9c2.5 2 2.5 4.5 0 7-2.5-2.5-2.5-5 0-7Z" />
      <path d="M12 16c2.5 2 2.5 3.5 0 5-2.5-1.5-2.5-3 0-5Z" />
    </svg>
  ),
  Basket: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 10h16l-1.5 9a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 10Z" />
      <path d="M8 10 10 4M16 10 14 4M2 10h20" />
    </svg>
  ),
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20c8-1 12-6 13-15-9 1-13 6-13 15Z" /><path d="M6 18C10 13 13 9 17 5" />
    </svg>
  ),
  Apple: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 8c-4 0-6.5 2.7-6.5 6.5S9 21 12 21s6.5-2.7 6.5-6.5S16 8 12 8Z" />
      <path d="M12 8c0-2 1-3.5 3-4" />
    </svg>
  ),
  Cart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" />
      <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  ),
  Info: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.01" />
    </svg>
  ),
  Empty: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 9l2-5h14l2 5M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18" />
      <path d="M9 13h6" />
    </svg>
  ),
};

const categoryIcons = [Icon.Grid, Icon.Sprout, Icon.Grain, Icon.Basket, Icon.Leaf, Icon.Apple, Icon.Grain];

function Furrow({ tone = C.line }) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ width: "100%", height: 22, display: "block" }} aria-hidden="true">
      <path
        d="M0 20 Q 50 4 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
        fill="none" stroke={tone} strokeWidth="1.5"
      />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div style={styles.card}>
      <div className="ki-skel" style={{ height: 220, borderRadius: 10 }} />
      <div style={{ padding: 16 }}>
        <div className="ki-skel" style={{ height: 16, width: "70%", borderRadius: 6, marginBottom: 10 }} />
        <div className="ki-skel" style={{ height: 12, width: "45%", borderRadius: 6, marginBottom: 14 }} />
        <div className="ki-skel" style={{ height: 20, width: "35%", borderRadius: 6 }} />
      </div>
    </div>
  );
}

function UserProductPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const t = texts[lang];

  const isUser = location.pathname.startsWith("/user");

  useEffect(() => {
    if (!document.getElementById("ki-shop-fonts")) {
      const link = document.createElement("link");
      link.id = "ki-shop-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);

    if (cat === "All") {
      setFiltered(products);
    } else {
      const data = products.filter(
        (item) => item.category && item.category.toLowerCase() === cat.toLowerCase()
      );
      setFiltered(data);
    }
  };

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: product });
  };

  return (
    <>
      <style>{globalCss}</style>

      <div style={styles.page} className="ki-shop-page">
        {/* HEADER */}
        <div style={styles.headerWrap}>
          <div style={styles.headerTexture} aria-hidden="true" />
          <div className="ki-shop-blob ki-shop-blob--gold" aria-hidden="true" />
          <div className="ki-shop-blob ki-shop-blob--crop" aria-hidden="true" />
          <div style={styles.eyebrow}>
            <span style={{ width: 18, height: 1.5, background: C.soil, display: "inline-block" }} />
            <Icon.Sprout style={{ width: 14, height: 14 }} />
            <span>{t.badge}</span>
          </div>
          <h1 style={styles.heading}>{t.heading}</h1>
          <p style={styles.subheading}>{t.subheading}</p>
        </div>

        <Furrow />

        <div style={styles.body}>
          <div style={styles.layout} className="ki-shop-layout">
            {/* CATEGORY SIDE */}
            <div style={styles.sidebar} className="ki-sidebar">
              <h3 style={styles.sidebarHeading}>{t.categoriesLabel}</h3>

              <div style={styles.categoryList} className="ki-category-list">
                {categoryKeys.map((catKey, index) => {
                  const CatIcon = categoryIcons[index % categoryIcons.length];
                  const active = category === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => handleCategory(catKey)}
                      className="ki-cat-btn"
                      style={{
                        ...styles.catButton,
                        background: active ? C.forest : "#FFFFFF",
                        color: active ? "#FFFFFF" : C.ink,
                        borderColor: active ? C.forest : C.line,
                      }}
                    >
                      <span
                        style={{
                          ...styles.catIconWrap,
                          background: active ? "rgba(255,255,255,0.14)" : C.paper,
                          color: active ? C.gold : C.forest,
                        }}
                      >
                        <CatIcon style={{ width: 16, height: 16 }} />
                      </span>
                      {t.categoryList[index]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRODUCT SECTION */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={styles.grid}>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <div
                      key={item.id}
                      className="ki-card"
                      style={{ ...styles.card, animationDelay: `${idx * 60}ms` }}
                    >
                      <div style={styles.imageBox}>
                        <img
                          src={
                            item.image
                              ? `/uploads/${item.image}`
                              : "https://placehold.co/300x300?text=No+Image"
                          }
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/300x300?text=No+Image";
                          }}
                          className="ki-card-image"
                          style={styles.image}
                        />
                      </div>

                      <div style={{ padding: "16px 18px 18px" }}>
                        <h3 style={styles.productName}>{item.name}</h3>

                        <p style={styles.categoryTag}>
                          {t.categoryLabel} : {item.category}
                        </p>

                        <h2 style={styles.price}>₹ {item.price}</h2>

                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={() => handleBuyNow(item)} className="ki-buy-btn" style={styles.buyBtn}>
                            <Icon.Cart style={{ width: 15, height: 15 }} />
                            {t.buyNow}
                          </button>

                          <button
                            onClick={() =>
                              isUser
                                ? navigate(`/user/product/${item.id}`)
                                : navigate(`/product/${item.id}`)
                            }
                            className="ki-details-btn"
                            style={styles.detailsBtn}
                          >
                            <Icon.Info style={{ width: 15, height: 15 }} />
                            {t.details}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={styles.emptyState}>
                    <Icon.Empty style={{ width: 46, height: 46, color: C.soil, opacity: 0.6 }} />
                    <h2 style={styles.emptyHeading}>{t.noProducts}</h2>
                    <p style={styles.emptySub}>{t.noProductsSub}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ---------- Global CSS ---------- */
const globalCss = `
  @keyframes kiCardIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ki-card {
    animation: kiCardIn 0.5s ease both;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .ki-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 30px rgba(27,67,50,0.16);
  }
  .ki-card-image { transition: transform 0.4s ease; }
  .ki-card:hover .ki-card-image { transform: scale(1.05); }
  .ki-cat-btn { transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease; }
  .ki-cat-btn:hover { transform: translateX(3px); border-color: ${C.crop} !important; }
  .ki-buy-btn, .ki-details-btn { transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease; }
  .ki-buy-btn:hover { filter: brightness(1.06); box-shadow: 0 8px 18px rgba(223,164,59,0.4); }
  .ki-details-btn:hover { filter: brightness(1.15); box-shadow: 0 8px 18px rgba(27,67,50,0.3); }
  .ki-shop-blob {
    position: absolute; border-radius: 50%; filter: blur(75px); pointer-events: none;
  }
  .ki-shop-blob--gold {
    top: -70px; right: 6%; width: 260px; height: 260px; background: ${C.gold}; opacity: 0.24;
  }
  .ki-shop-blob--crop {
    top: -20px; left: 4%; width: 220px; height: 220px; background: ${C.crop}; opacity: 0.16;
  }
  .ki-skel {
    background: linear-gradient(90deg, ${C.paper} 25%, #ECE5D3 37%, ${C.paper} 63%);
    background-size: 400% 100%;
    animation: kiShimmer 1.4s ease infinite;
  }
  @keyframes kiShimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ki-card, .ki-card-image, .ki-cat-btn, .ki-buy-btn, .ki-details-btn, .ki-skel { animation: none !important; transition: none !important; }
  }
  @media (max-width: 760px) {
    .ki-shop-layout { flex-direction: column !important; }
    .ki-sidebar { width: 100% !important; }
    .ki-category-list { flex-direction: row !important; flex-wrap: wrap; }
    .ki-cat-btn { width: auto !important; flex: 1 1 auto; justify-content: center !important; }
  }
`;

/* ---------- Styles ---------- */
const styles = {
  page: {
    background: `linear-gradient(180deg, ${C.paper} 0%, ${C.parchment} 260px)`,
    minHeight: "100vh",
    fontFamily: FONT_BODY,
    color: C.ink,
  },
  headerWrap: {
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    padding: "56px 8% 30px",
  },
  headerTexture: {
    position: "absolute",
    inset: 0,
    backgroundImage: `repeating-linear-gradient(120deg, ${C.paper} 0px, ${C.paper} 46px, transparent 46px, transparent 92px)`,
    opacity: 0.5,
    zIndex: 0,
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: C.soil,
    marginBottom: 12,
    position: "relative",
    zIndex: 1,
  },
  heading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: "clamp(32px, 4.6vw, 46px)",
    color: C.forest,
    margin: "0 0 10px",
    position: "relative",
    zIndex: 1,
  },
  subheading: {
    fontSize: 16,
    color: C.inkSoft,
    maxWidth: 520,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  body: {
    padding: "34px 8% 70px",
  },
  layout: {
    display: "flex",
    gap: 26,
    alignItems: "flex-start",
    maxWidth: 1300,
    margin: "0 auto",
  },
  sidebar: {
    width: 250,
    flexShrink: 0,
    background: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    border: `1px solid ${C.line}`,
    boxShadow: "0 6px 18px rgba(27,67,50,0.06)",
    position: "sticky",
    top: 16,
  },
  sidebarHeading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 18,
    color: C.forest,
    margin: "0 0 14px",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  catButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    border: "1px solid",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: FONT_BODY,
    textAlign: "left",
  },
  catIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
    gap: 22,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${C.line}`,
    boxShadow: "0 4px 14px rgba(27,67,50,0.06)",
  },
  imageBox: {
    height: 220,
    background: C.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  productName: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 18,
    color: C.ink,
    margin: "0 0 6px",
  },
  categoryTag: {
    fontSize: 13,
    color: C.inkSoft,
    margin: "0 0 10px",
  },
  price: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 22,
    color: C.danger,
    margin: "0 0 14px",
  },
  buyBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: C.gold,
    color: "#3A2A08",
    border: "none",
    padding: "11px 10px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13.5,
    fontFamily: FONT_BODY,
  },
  detailsBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: C.forest,
    color: "#FFFFFF",
    border: "none",
    padding: "11px 10px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13.5,
    fontFamily: FONT_BODY,
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    background: "#FFFFFF",
    border: `1px dashed ${C.line}`,
    borderRadius: 16,
  },
  emptyHeading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 22,
    color: C.forest,
    margin: "14px 0 6px",
  },
  emptySub: {
    fontSize: 14.5,
    color: C.inkSoft,
  },
};

export default UserProductPage;