import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../../config";
import { useLanguage } from "../../context/LanguageContext";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3eee1'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%237a4a1f' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const texts = {
  en: {
    badge: "Agricultural Solutions",
    heading: "Our Products",
    subheading:
      "Quality agricultural products designed to support healthier crops and better farming.",
    categoriesLabel: "Categories",
    categoryList: [
      "All",
      "Fertilizer",
      "Biostimulant",
      "Seeds",
      "Pesticides",
      "Herbicide",
      "Fungicide",
      "PGR",
    ],
    categoryLabel: "Category",
    loading: "Loading products...",
    errorMsg:
      "Products could not be loaded. Please check the server and try again.",
    buyNow: "Buy Now",
    details: "Details",
    noProducts: "No Products Found",
    noProductsSub: "Try selecting another category.",
    priceLabel: "Price",
  },

  mr: {
    badge: "कृषी उपाय",
    heading: "आमची उत्पादने",
    subheading:
      "निरोगी पिके आणि चांगल्या शेतीसाठी दर्जेदार कृषी उत्पादने.",
    categoriesLabel: "श्रेणी",
    categoryList: [
      "सर्व",
      "खत",
      "जैव-उत्तेजक",
      "बियाणे",
      "कीडनाशके",
      "तणनाशक",
      "बुरशीनाशक",
      "पीजीआर",
    ],
    categoryLabel: "श्रेणी",
    loading: "उत्पादने लोड होत आहेत...",
    errorMsg:
      "उत्पादने लोड होत नाहीत. सर्व्हर तपासा आणि पुन्हा प्रयत्न करा.",
    buyNow: "आता खरेदी करा",
    details: "तपशील",
    noProducts: "उत्पादने आढळली नाहीत",
    noProductsSub: "दुसरी श्रेणी निवडून पहा.",
    priceLabel: "किंमत",
  },

  hi: {
    badge: "कृषि समाधान",
    heading: "हमारे उत्पाद",
    subheading:
      "स्वस्थ फसलों और बेहतर खेती के लिए गुणवत्तापूर्ण कृषि उत्पाद।",
    categoriesLabel: "श्रेणियां",
    categoryList: [
      "सभी",
      "उर्वरक",
      "जैव-उत्तेजक",
      "बीज",
      "कीटनाशक",
      "खरपतवारनाशी",
      "फफूंदनाशी",
      "पीजीआर",
    ],
    categoryLabel: "श्रेणी",
    loading: "उत्पाद लोड हो रहे हैं...",
    errorMsg:
      "उत्पाद लोड नहीं हो रहे। सर्वर जांचें और पुनः प्रयास करें।",
    buyNow: "अभी खरीदें",
    details: "विवरण",
    noProducts: "कोई उत्पाद नहीं मिला",
    noProductsSub: "कृपया कोई दूसरी श्रेणी चुनें।",
    priceLabel: "कीमत",
  },
};

// Backend category values
const categoryKeys = [
  "All",
  "Fertilizer",
  "Biostimulant",
  "Seeds",
  "Pesticides",
  "Herbicide",
  "Fungicide",
  "PGR",
];

/* =========================================================
   COLORS
========================================================= */

const C = {
  forest: "#1B4332",
  forestDark: "#0F2C21",
  crop: "#40916C",
  soil: "#7A4A1F",
  gold: "#DFA43B",
  parchment: "#FBF7EF",
  paper: "#F3EEE1",
  white: "#FFFFFF",
  ink: "#26261F",
  inkSoft: "#5C594D",
  line: "#E4DCC8",
  danger: "#B12704",
};

const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* =========================================================
   ICONS
========================================================= */

const Icon = {
  Grid: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),

  Sprout: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6Z" />
      <path d="M12 13c0-3.2-2.4-5.2-6-5.2C6 11.6 8.4 13 12 13Z" />
    </svg>
  ),

  Seed: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 21V8" />
      <path d="M12 8C8 8 5 5.5 5 2c4.5 0 7 2 7 6Z" />
      <path d="M12 12c4 0 7-2.5 7-6-4.5 0-7 2-7 6Z" />
    </svg>
  ),

  Leaf: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M4 20c8-1 12-6 13-15-9 1-13 6-13 15Z" />
      <path d="M6 18C10 13 13 9 17 5" />
    </svg>
  ),

  Drop: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M12 3s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12Z" />
    </svg>
  ),

  Flask: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M9 3h6" />
      <path d="M10 3v6l-5.5 9.2A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.8L14 9V3" />
      <path d="M8 15h8" />
    </svg>
  ),

  Cart: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  ),

  Info: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7.5v.01" />
    </svg>
  ),

  Empty: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M3 9l2-5h14l2 5" />
      <path d="M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
      <path d="M3 9h18" />
      <path d="M9 13h6" />
    </svg>
  ),
};

const categoryIcons = [
  Icon.Grid,
  Icon.Sprout,
  Icon.Flask,
  Icon.Seed,
  Icon.Drop,
  Icon.Leaf,
  Icon.Flask,
  Icon.Sprout,
];

/* =========================================================
   FURROW
========================================================= */

function Furrow({ tone = C.line }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: 22,
        display: "block",
      }}
      aria-hidden="true"
    >
      <path
        d="M0 20 Q 50 4 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
        fill="none"
        stroke={tone}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function SkeletonCard() {
  return (
    <div style={styles.card}>
      <div
        className="ki-skel"
        style={{
          height: 225,
          borderRadius: 0,
        }}
      />

      <div style={{ padding: 18 }}>
        <div
          className="ki-skel"
          style={{
            height: 18,
            width: "70%",
            borderRadius: 6,
            marginBottom: 11,
          }}
        />

        <div
          className="ki-skel"
          style={{
            height: 12,
            width: "45%",
            borderRadius: 6,
            marginBottom: 16,
          }}
        />

        <div
          className="ki-skel"
          style={{
            height: 22,
            width: "35%",
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function UserProductPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { lang } = useLanguage();
  const t = texts[lang] || texts.en;

  const isUser = location.pathname.startsWith("/user");

  /* -------------------------------------------------------
     GOOGLE FONTS
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     LOAD PRODUCTS
  ------------------------------------------------------- */

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];

        setProducts(data);
        setFiltered(data);
      })
      .catch((err) => {
        console.log("Products API Error:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* -------------------------------------------------------
     CATEGORY FILTER
  ------------------------------------------------------- */

  const handleCategory = (cat) => {
    setCategory(cat);

    if (cat === "All") {
      setFiltered(products);
      return;
    }

    const data = products.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase() === cat.toLowerCase()
    );

    setFiltered(data);
  };

  /* -------------------------------------------------------
     BUY NOW
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     IMAGE URL
  ------------------------------------------------------- */

  const getImageSrc = (image) => {
    if (!image) {
      return FALLBACK_IMAGE;
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}/uploads/${image}`;
  };

  /* -------------------------------------------------------
     MULTI LANGUAGE PRODUCT NAME
  ------------------------------------------------------- */

  const getName = (item) => {
    if (lang === "mr" && item.name_mr) {
      return item.name_mr;
    }

    if (lang === "hi" && item.name_hi) {
      return item.name_hi;
    }

    return item.name_en || item.name;
  };

  /* -------------------------------------------------------
     MULTI LANGUAGE CATEGORY
  ------------------------------------------------------- */

  const getCategoryDisplay = (item) => {
    if (lang === "mr" && item.category_mr) {
      return item.category_mr;
    }

    if (lang === "hi" && item.category_hi) {
      return item.category_hi;
    }

    return item.category_en || item.category;
  };

  return (
    <>
      <style>{globalCss}</style>

      <div style={styles.page} className="ki-shop-page">

        {/* =================================================
            HEADER
        ================================================= */}

        <header style={styles.headerWrap}>

          <div
            style={styles.headerTexture}
            aria-hidden="true"
          />

          <div
            className="ki-shop-blob ki-shop-blob--gold"
            aria-hidden="true"
          />

          <div
            className="ki-shop-blob ki-shop-blob--crop"
            aria-hidden="true"
          />

          <div style={styles.eyebrow}>

            <span
              style={{
                width: 20,
                height: 1.5,
                background: C.soil,
                display: "inline-block",
              }}
            />

            <Icon.Sprout
              style={{
                width: 15,
                height: 15,
              }}
            />

            <span>{t.badge}</span>

            <span
              style={{
                width: 20,
                height: 1.5,
                background: C.soil,
                display: "inline-block",
              }}
            />

          </div>

          <h1 style={styles.heading}>
            {t.heading}
          </h1>

          <p style={styles.subheading}>
            {t.subheading}
          </p>

        </header>

        <Furrow />

        {/* =================================================
            BODY
        ================================================= */}

        <main style={styles.body}>

          <div
            style={styles.layout}
            className="ki-shop-layout"
          >

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
              style={styles.sidebar}
              className="ki-sidebar"
            >

              <div style={styles.sidebarTop}>

                <div style={styles.sidebarIcon}>
                  <Icon.Grid
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                </div>

                <div>
                  <h3 style={styles.sidebarHeading}>
                    {t.categoriesLabel}
                  </h3>

                  <div style={styles.sidebarLine} />
                </div>

              </div>

              <div
                style={styles.categoryList}
                className="ki-category-list"
              >

                {categoryKeys.map((catKey, index) => {

                  const CatIcon =
                    categoryIcons[
                      index % categoryIcons.length
                    ];

                  const active =
                    category === catKey;

                  return (
                    <button
                      key={catKey}
                      onClick={() =>
                        handleCategory(catKey)
                      }
                      className="ki-cat-btn"
                      style={{
                        ...styles.catButton,

                        background: active
                          ? C.forest
                          : "#FFFFFF",

                        color: active
                          ? "#FFFFFF"
                          : C.ink,

                        borderColor: active
                          ? C.forest
                          : C.line,

                        boxShadow: active
                          ? "0 7px 16px rgba(27,67,50,0.16)"
                          : "none",
                      }}
                    >

                      <span
                        style={{
                          ...styles.catIconWrap,

                          background: active
                            ? "rgba(255,255,255,0.13)"
                            : C.paper,

                          color: active
                            ? C.gold
                            : C.forest,
                        }}
                      >

                        <CatIcon
                          style={{
                            width: 16,
                            height: 16,
                          }}
                        />

                      </span>

                      <span>
                        {t.categoryList[index]}
                      </span>

                    </button>
                  );
                })}

              </div>

            </aside>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <section
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >

              {/* TOP INFO */}

              {!loading && !error && (
                <div style={styles.resultsBar}>

                  <div>

                    <span style={styles.resultsLabel}>
                      {t.categoryList[
                        categoryKeys.indexOf(category)
                      ]}
                    </span>

                    <span style={styles.resultsCount}>
                      {" "}
                      · {filtered.length} products
                    </span>

                  </div>

                  <div style={styles.resultsLeaf}>
                    <Icon.Leaf
                      style={{
                        width: 17,
                        height: 17,
                      }}
                    />
                  </div>

                </div>
              )}

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading && (
                <div
                  style={styles.grid}
                  className="ki-products-grid"
                >
                  {Array.from({ length: 6 }).map(
                    (_, i) => (
                      <SkeletonCard key={i} />
                    )
                  )}
                </div>
              )}

              {/* =================================================
                  ERROR
              ================================================= */}

              {!loading && error && (
                <div style={styles.errorState}>

                  <Icon.Empty
                    style={{
                      width: 48,
                      height: 48,
                      color: C.soil,
                      opacity: 0.65,
                    }}
                  />

                  <h2
                    style={styles.emptyHeading}
                  >
                    {t.errorMsg}
                  </h2>

                </div>
              )}

              {/* =================================================
                  PRODUCT GRID
              ================================================= */}

              {!loading &&
                !error &&
                filtered.length > 0 && (

                  <div
                    style={styles.grid}
                    className="ki-products-grid"
                  >

                    {filtered.map((item, idx) => (

                      <article
                        key={item.id}
                        className="ki-card"
                        style={{
                          ...styles.card,
                          animationDelay:
                            `${idx * 60}ms`,
                        }}
                      >

                        {/* IMAGE */}

                        <div style={styles.imageBox}>

                          <div
                            style={styles.imageBadge}
                          >
                            <Icon.Sprout
                              style={{
                                width: 13,
                                height: 13,
                              }}
                            />

                            {getCategoryDisplay(item)}
                          </div>

                          <img
                            src={getImageSrc(
                              item.image
                            )}
                            alt={getName(item)}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                FALLBACK_IMAGE;
                            }}
                            className="ki-card-image"
                            style={styles.image}
                          />

                        </div>

                        {/* CONTENT */}

                        <div
                          style={styles.productContent}
                        >

                          <div
                            style={
                              styles.categoryMini
                            }
                          >
                            {t.categoryLabel}
                          </div>

                          <h3
                            style={
                              styles.productName
                            }
                          >
                            {getName(item)}
                          </h3>

                          <p
                            style={
                              styles.categoryText
                            }
                          >
                            {getCategoryDisplay(
                              item
                            )}
                          </p>

                          <div
                            style={
                              styles.productBottom
                            }
                          >

                            <div>

                              <div
                                style={
                                  styles.priceLabel
                                }
                              >
                                {t.priceLabel}
                              </div>

                              <h2
                                style={
                                  styles.price
                                }
                              >
                                ₹{" "}
                                {Number(
                                  item.price || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </h2>

                            </div>

                          </div>

                          {/* BUTTONS */}

                          <div
                            style={
                              styles.buttonRow
                            }
                          >

                            <button
                              onClick={() =>
                                handleBuyNow(
                                  item
                                )
                              }
                              className="ki-buy-btn"
                              style={
                                styles.buyBtn
                              }
                            >

                              <Icon.Cart
                                style={{
                                  width: 16,
                                  height: 16,
                                }}
                              />

                              {t.buyNow}

                            </button>

                            <button
                              onClick={() =>
                                isUser
                                  ? navigate(
                                      `/user/product/${item.id}`
                                    )
                                  : navigate(
                                      `/product/${item.id}`
                                    )
                              }
                              className="ki-details-btn"
                              style={
                                styles.detailsBtn
                              }
                            >

                              <Icon.Info
                                style={{
                                  width: 16,
                                  height: 16,
                                }}
                              />

                              {t.details}

                            </button>

                          </div>

                        </div>

                      </article>
                    ))}

                  </div>
                )}

              {/* =================================================
                  EMPTY
              ================================================= */}

              {!loading &&
                !error &&
                filtered.length === 0 && (

                  <div style={styles.emptyState}>

                    <Icon.Empty
                      style={{
                        width: 48,
                        height: 48,
                        color: C.soil,
                        opacity: 0.6,
                      }}
                    />

                    <h2
                      style={styles.emptyHeading}
                    >
                      {t.noProducts}
                    </h2>

                    <p
                      style={styles.emptySub}
                    >
                      {t.noProductsSub}
                    </p>

                  </div>
                )}

            </section>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}

/* =========================================================
   GLOBAL CSS
========================================================= */

const globalCss = `

  @keyframes kiCardIn {

    from {
      opacity: 0;
      transform: translateY(18px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }

  }

  .ki-card {

    animation: kiCardIn 0.5s ease both;

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease;

  }

  .ki-card:hover {

    transform: translateY(-6px);

    box-shadow:
      0 18px 35px rgba(27,67,50,0.15);

    border-color: #D8CDAF !important;

  }

  .ki-card-image {

    transition:
      transform 0.45s ease;

  }

  .ki-card:hover
  .ki-card-image {

    transform: scale(1.06);

  }

  .ki-cat-btn {

    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      border-color 0.18s ease;

  }

  .ki-cat-btn:hover {

    transform: translateX(4px);

    border-color:
      #40916C !important;

  }

  .ki-buy-btn,
  .ki-details-btn {

    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      filter 0.18s ease;

  }

  .ki-buy-btn:hover {

    transform: translateY(-2px);

    filter: brightness(1.06);

    box-shadow:
      0 8px 18px
      rgba(223,164,59,0.38);

  }

  .ki-details-btn:hover {

    transform: translateY(-2px);

    filter: brightness(1.12);

    box-shadow:
      0 8px 18px
      rgba(27,67,50,0.28);

  }

  .ki-shop-blob {

    position: absolute;

    border-radius: 50%;

    filter: blur(75px);

    pointer-events: none;

  }

  .ki-shop-blob--gold {

    top: -70px;
    right: 6%;

    width: 270px;
    height: 270px;

    background: #DFA43B;

    opacity: 0.23;

  }

  .ki-shop-blob--crop {

    top: -20px;
    left: 4%;

    width: 230px;
    height: 230px;

    background: #40916C;

    opacity: 0.15;

  }

  .ki-skel {

    background:
      linear-gradient(
        90deg,
        #F3EEE1 25%,
        #ECE5D3 37%,
        #F3EEE1 63%
      );

    background-size: 400% 100%;

    animation:
      kiShimmer 1.4s ease infinite;

  }

  @keyframes kiShimmer {

    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }

  }

  @media (prefers-reduced-motion: reduce) {

    .ki-card,
    .ki-card-image,
    .ki-cat-btn,
    .ki-buy-btn,
    .ki-details-btn,
    .ki-skel {

      animation: none !important;
      transition: none !important;

    }

  }

  @media (max-width: 900px) {

    .ki-shop-layout {

      flex-direction: column !important;

    }

    .ki-sidebar {

      width: 100% !important;

      position: static !important;

    }

    .ki-category-list {

      display: grid !important;

      grid-template-columns:
        repeat(4, 1fr) !important;

    }

    .ki-cat-btn {

      justify-content: center !important;

    }

  }

  @media (max-width: 650px) {

    .ki-category-list {

      grid-template-columns:
        repeat(2, 1fr) !important;

    }

    .ki-shop-layout {

      gap: 18px !important;

    }

    .ki-products-grid {

      grid-template-columns:
        repeat(1, minmax(0, 1fr)) !important;

    }

  }

  @media (max-width: 430px) {

    .ki-category-list {

      grid-template-columns:
        repeat(2, 1fr) !important;

    }

  }

`;

/* =========================================================
   STYLES
========================================================= */

const styles = {

  page: {

    background:
      `linear-gradient(
        180deg,
        ${C.paper} 0%,
        ${C.parchment} 280px
      )`,

    minHeight: "100vh",

    fontFamily: FONT_BODY,

    color: C.ink,

  },

  headerWrap: {

    position: "relative",

    overflow: "hidden",

    textAlign: "center",

    padding:
      "58px 8% 38px",

  },

  headerTexture: {

    position: "absolute",

    inset: 0,

    backgroundImage:
      `repeating-linear-gradient(
        120deg,
        ${C.paper} 0px,
        ${C.paper} 46px,
        transparent 46px,
        transparent 92px
      )`,

    opacity: 0.5,

    zIndex: 0,

  },

  eyebrow: {

    display: "inline-flex",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    fontSize: 12.5,

    fontWeight: 700,

    letterSpacing: "0.14em",

    textTransform: "uppercase",

    color: C.soil,

    marginBottom: 13,

    position: "relative",

    zIndex: 1,

  },

  heading: {

    fontFamily: FONT_DISPLAY,

    fontWeight: 600,

    fontSize:
      "clamp(34px, 5vw, 50px)",

    lineHeight: 1.1,

    color: C.forest,

    margin: "0 0 12px",

    position: "relative",

    zIndex: 1,

  },

  subheading: {

    fontSize: 16,

    lineHeight: 1.7,

    color: C.inkSoft,

    maxWidth: 600,

    margin: "0 auto",

    position: "relative",

    zIndex: 1,

  },

  body: {

    padding:
      "34px 6% 75px",

  },

  layout: {

    display: "flex",

    gap: 28,

    alignItems: "flex-start",

    maxWidth: 1380,

    margin: "0 auto",

  },

  sidebar: {

    width: 255,

    flexShrink: 0,

    background: "#FFFFFF",

    padding: 20,

    borderRadius: 16,

    border:
      `1px solid ${C.line}`,

    boxShadow:
      "0 7px 20px rgba(27,67,50,0.06)",

    position: "sticky",

    top: 16,

  },

  sidebarTop: {

    display: "flex",

    alignItems: "center",

    gap: 11,

    marginBottom: 18,

  },

  sidebarIcon: {

    width: 38,

    height: 38,

    borderRadius: 10,

    background: C.paper,

    color: C.forest,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

  },

  sidebarHeading: {

    fontFamily: FONT_DISPLAY,

    fontWeight: 600,

    fontSize: 19,

    color: C.forest,

    margin: 0,

  },

  sidebarLine: {

    width: 35,

    height: 2,

    background: C.gold,

    marginTop: 5,

    borderRadius: 3,

  },

  categoryList: {

    display: "flex",

    flexDirection: "column",

    gap: 9,

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

    fontSize: 13.5,

    fontFamily: FONT_BODY,

    textAlign: "left",

  },

  catIconWrap: {

    width: 29,

    height: 29,

    borderRadius: 8,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,

  },

  resultsBar: {

    display: "flex",

    alignItems: "center",

    justifyContent: "space-between",

    background: "rgba(255,255,255,0.65)",

    border:
      `1px solid ${C.line}`,

    borderRadius: 12,

    padding: "10px 14px",

    marginBottom: 16,

  },

  resultsLabel: {

    fontWeight: 700,

    color: C.forest,

    fontSize: 14,

  },

  resultsCount: {

    color: C.inkSoft,

    fontSize: 13,

  },

  resultsLeaf: {

    color: C.crop,

    display: "flex",

    alignItems: "center",

  },

  grid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fill, minmax(270px, 1fr))",

    gap: 22,

  },

  card: {

    background: "#FFFFFF",

    borderRadius: 16,

    overflow: "hidden",

    border:
      `1px solid ${C.line}`,

    boxShadow:
      "0 4px 14px rgba(27,67,50,0.06)",

  },

  imageBox: {

    height: 225,

    background: C.paper,

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: 16,

    overflow: "hidden",

    position: "relative",

  },

  imageBadge: {

    position: "absolute",

    top: 12,

    left: 12,

    zIndex: 2,

    display: "flex",

    alignItems: "center",

    gap: 5,

    background:
      "rgba(255,255,255,0.92)",

    color: C.forest,

    border:
      `1px solid ${C.line}`,

    padding: "5px 9px",

    borderRadius: 999,

    fontSize: 10.5,

    fontWeight: 700,

    maxWidth: "75%",

    whiteSpace: "nowrap",

    overflow: "hidden",

    textOverflow: "ellipsis",

  },

  image: {

    width: "100%",

    height: "100%",

    objectFit: "contain",

  },

  productContent: {

    padding:
      "17px 18px 18px",

  },

  categoryMini: {

    fontSize: 10.5,

    textTransform: "uppercase",

    letterSpacing: "0.11em",

    color: C.soil,

    fontWeight: 700,

    marginBottom: 5,

  },

  productName: {

    fontFamily: FONT_DISPLAY,

    fontWeight: 600,

    fontSize: 19,

    lineHeight: 1.25,

    color: C.ink,

    margin: "0 0 5px",

    minHeight: 48,

  },

  categoryText: {

    fontSize: 12.5,

    color: C.inkSoft,

    margin: "0 0 13px",

  },

  productBottom: {

    display: "flex",

    alignItems: "flex-end",

    justifyContent: "space-between",

    marginBottom: 14,

  },

  priceLabel: {

    fontSize: 10.5,

    color: C.inkSoft,

    textTransform: "uppercase",

    letterSpacing: "0.08em",

    marginBottom: 2,

  },

  price: {

    fontFamily: FONT_DISPLAY,

    fontWeight: 600,

    fontSize: 23,

    color: C.danger,

    margin: 0,

  },

  buttonRow: {

    display: "flex",

    gap: 9,

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

    padding: "11px 9px",

    borderRadius: 999,

    cursor: "pointer",

    fontWeight: 700,

    fontSize: 12.5,

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

    padding: "11px 9px",

    borderRadius: 999,

    cursor: "pointer",

    fontWeight: 700,

    fontSize: 12.5,

    fontFamily: FONT_BODY,

  },

  emptyState: {

    textAlign: "center",

    padding: "70px 25px",

    background: "#FFFFFF",

    border:
      `1px dashed ${C.line}`,

    borderRadius: 16,

    gridColumn: "1 / -1",

  },

  errorState: {

    textAlign: "center",

    padding: "70px 25px",

    background: "#FFFFFF",

    border:
      `1px solid ${C.line}`,

    borderRadius: 16,

  },

  emptyHeading: {

    fontFamily: FONT_DISPLAY,

    fontWeight: 600,

    fontSize: 23,

    color: C.forest,

    margin: "15px 0 7px",

  },

  emptySub: {

    fontSize: 14,

    color: C.inkSoft,

    margin: 0,

  },

};

export default UserProductPage;