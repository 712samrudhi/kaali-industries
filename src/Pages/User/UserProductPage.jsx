import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../../config";
import { useLanguage } from "../../context/LanguageContext";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='500' height='500' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f1'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23999' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const texts = {
  en: {
    heading: "Our Products",
    subtitle:
      "Innovative agricultural solutions for healthier crops and sustainable farming.",
    categoriesLabel: "Product Categories",
    categoryList: [
      "All Products",
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
    errorMsg: "Products could not be loaded. Please try again later.",
    buyNow: "Buy Now",
    details: "View Details",
    noProducts: "No Products Found",
    explore: "Explore Our Products",
    quality: "Quality Agricultural Solutions",
    qualityText:
      "Trusted products designed to support farmers and improve crop productivity.",
  },

  mr: {
    heading: "आमची उत्पादने",
    subtitle:
      "निरोगी पिके आणि शाश्वत शेतीसाठी आधुनिक कृषी उपाय.",
    categoriesLabel: "उत्पादन श्रेणी",
    categoryList: [
      "सर्व उत्पादने",
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
      "उत्पादने लोड होत नाहीत. कृपया नंतर पुन्हा प्रयत्न करा.",
    buyNow: "आता खरेदी करा",
    details: "तपशील पहा",
    noProducts: "उत्पादने आढळली नाहीत",
    explore: "आमची उत्पादने",
    quality: "उत्तम कृषी उपाय",
    qualityText:
      "शेतकऱ्यांसाठी विश्वासार्ह उत्पादने जी पिकांची गुणवत्ता आणि उत्पादनक्षमता वाढवण्यास मदत करतात.",
  },

  hi: {
    heading: "हमारे उत्पाद",
    subtitle:
      "स्वस्थ फसलों और टिकाऊ खेती के लिए आधुनिक कृषि समाधान।",
    categoriesLabel: "उत्पाद श्रेणियां",
    categoryList: [
      "सभी उत्पाद",
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
      "उत्पाद लोड नहीं हो रहे हैं। कृपया बाद में पुनः प्रयास करें।",
    buyNow: "अभी खरीदें",
    details: "विवरण देखें",
    noProducts: "कोई उत्पाद नहीं मिला",
    explore: "हमारे उत्पाद",
    quality: "गुणवत्तापूर्ण कृषि समाधान",
    qualityText:
      "किसानों के लिए विश्वसनीय उत्पाद जो फसल की गुणवत्ता और उत्पादकता बढ़ाने में मदद करते हैं।",
  },
};

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
  const t = texts[lang] || texts.en;

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        const data = res.data || [];

        setProducts(data);
        setFiltered(data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}/uploads/${image}`;
  };

  const getName = (item) => {
    if (lang === "mr" && item.name_mr) {
      return item.name_mr;
    }

    if (lang === "hi" && item.name_hi) {
      return item.name_hi;
    }

    return item.name_en || item.name;
  };

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
      <style>{`

        * {
          box-sizing: border-box;
        }

        .products-page {
          min-height: 100vh;
          background: #f7faf6;
          color: #1c2b20;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* HERO */

        .products-hero {
          position: relative;
          background:
            linear-gradient(
              135deg,
              rgba(22, 74, 38, 0.97),
              rgba(52, 112, 54, 0.92)
            );
          padding: 75px 30px 80px;
          overflow: hidden;
        }

        .products-hero::before {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          right: -100px;
          top: -180px;
        }

        .products-hero::after {
          content: "";
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          left: -100px;
          bottom: -150px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1150px;
          margin: auto;
          text-align: center;
          color: white;
        }

        .hero-small {
          display: inline-block;
          padding: 8px 18px;
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 30px;
          font-size: 13px;
          letter-spacing: 1px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .hero-title {
          margin: 0;
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          max-width: 700px;
          margin: 20px auto 0;
          font-size: 17px;
          line-height: 1.7;
          color: #e6f1e7;
        }

        /* MAIN */

        .products-container {
          max-width: 1250px;
          margin: auto;
          padding: 55px 25px 80px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-heading h2 {
          font-size: 32px;
          margin: 0 0 12px;
          color: #245c2c;
        }

        .section-heading p {
          color: #68746a;
          margin: 0;
        }

        .products-layout {
          display: grid;
          grid-template-columns: 230px 1fr;
          gap: 35px;
          align-items: start;
        }

        /* CATEGORY */

        .category-box {
          background: white;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid #e3ebe3;
          box-shadow: 0 8px 30px rgba(33, 76, 40, 0.07);
          position: sticky;
          top: 20px;
        }

        .category-title {
          margin: 0 0 15px;
          color: #245c2c;
          font-size: 18px;
        }

        .category-button {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          padding: 12px 14px;
          margin-bottom: 5px;
          border-radius: 8px;
          cursor: pointer;
          color: #536158;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .category-button:hover {
          background: #eef7ed;
          color: #2e7d32;
        }

        .category-button.active {
          background: #2e7d32;
          color: white;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(46,125,50,0.2);
        }

        /* PRODUCT GRID */

        .products-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(250px, 1fr)
          );
          gap: 25px;
        }

        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5ebe5;
          transition: all 0.3s ease;
          box-shadow: 0 7px 25px rgba(32, 69, 38, 0.06);
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(32, 69, 38, 0.13);
        }

        .product-image-wrapper {
          height: 250px;
          background: #f8faf7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-bottom: 1px solid #edf1ed;
          position: relative;
        }

        .product-image {
          width: 100%;
          height: 215px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-content {
          padding: 20px;
        }

        .product-category {
          display: inline-block;
          background: #edf7ec;
          color: #317038;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .product-name {
          font-size: 19px;
          line-height: 1.35;
          margin: 0 0 10px;
          color: #26372b;
          min-height: 50px;
        }

        .product-price {
          font-size: 22px;
          font-weight: 700;
          color: #b12704;
          margin: 12px 0 18px;
        }

        .product-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .buy-button,
        .details-button {
          border: none;
          padding: 11px 8px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .buy-button {
          background: #f4a261;
          color: white;
        }

        .buy-button:hover {
          background: #e8893e;
        }

        .details-button {
          background: #245c2c;
          color: white;
        }

        .details-button:hover {
          background: #17461f;
        }

        /* LOADING */

        .loading-box {
          background: white;
          border-radius: 15px;
          padding: 60px 20px;
          text-align: center;
          color: #47704c;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #dceadc;
          border-top: 4px solid #2e7d32;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 18px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ERROR */

        .error-box {
          background: #fff4f2;
          border: 1px solid #ffd5ce;
          color: #c0392b;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
        }

        /* EMPTY */

        .empty-box {
          background: white;
          border-radius: 15px;
          padding: 70px 20px;
          text-align: center;
          color: #718074;
        }

        .empty-icon {
          font-size: 45px;
          margin-bottom: 10px;
        }

        /* BOTTOM INFO */

        .quality-section {
          margin-top: 65px;
          background: linear-gradient(
            135deg,
            #edf7ec,
            #f8fbf7
          );
          border: 1px solid #dfeadf;
          border-radius: 18px;
          padding: 40px;
          text-align: center;
        }

        .quality-section h2 {
          color: #245c2c;
          margin: 0 0 12px;
          font-size: 28px;
        }

        .quality-section p {
          max-width: 700px;
          margin: auto;
          color: #627066;
          line-height: 1.7;
        }

        /* RESPONSIVE */

        @media (max-width: 850px) {

          .products-layout {
            grid-template-columns: 1fr;
          }

          .category-box {
            position: static;
          }

          .category-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 5px;
          }

          .category-button {
            margin: 0;
          }

          .hero-title {
            font-size: 38px;
          }
        }

        @media (max-width: 550px) {

          .products-hero {
            padding: 55px 20px 60px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 15px;
          }

          .products-container {
            padding: 40px 15px 60px;
          }

          .section-heading h2 {
            font-size: 26px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .category-buttons {
            grid-template-columns: 1fr;
          }

          .product-image-wrapper {
            height: 270px;
          }

          .product-image {
            height: 235px;
          }

          .quality-section {
            padding: 30px 20px;
          }
        }

      `}</style>

      <div className="products-page">

        {/* HERO */}
        <section className="products-hero">
          <div className="hero-content">

            <span className="hero-small">
              Agricultural Solutions
            </span>

            <h1 className="hero-title">
              {t.heading}
            </h1>

            <p className="hero-subtitle">
              {t.subtitle}
            </p>

          </div>
        </section>

        {/* MAIN */}
        <main className="products-container">

          <div className="section-heading">
            <h2>{t.explore}</h2>
            <p>{t.qualityText}</p>
          </div>

          <div className="products-layout">

            {/* CATEGORY */}
            <aside className="category-box">

              <h3 className="category-title">
                {t.categoriesLabel}
              </h3>

              <div className="category-buttons">

                {categoryKeys.map((catKey, index) => (
                  <button
                    key={catKey}
                    onClick={() => handleCategory(catKey)}
                    className={`category-button ${
                      category === catKey ? "active" : ""
                    }`}
                  >
                    {t.categoryList[index]}
                  </button>
                ))}

              </div>

            </aside>

            {/* PRODUCTS */}
            <section>

              {loading && (
                <div className="loading-box">

                  <div className="spinner"></div>

                  <strong>{t.loading}</strong>

                </div>
              )}

              {error && !loading && (
                <div className="error-box">
                  <strong>{t.errorMsg}</strong>
                </div>
              )}

              {!loading && !error && (
                <>
                  {filtered.length > 0 ? (

                    <div className="products-grid">

                      {filtered.map((item) => (

                        <article
                          className="product-card"
                          key={item.id}
                        >

                          {/* IMAGE */}
                          <div className="product-image-wrapper">

                            <img
                              className="product-image"
                              src={getImageSrc(item.image)}
                              alt={getName(item)}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = FALLBACK_IMAGE;
                              }}
                            />

                          </div>

                          {/* CONTENT */}
                          <div className="product-content">

                            <span className="product-category">
                              {getCategoryDisplay(item)}
                            </span>

                            <h3 className="product-name">
                              {getName(item)}
                            </h3>

                            <div className="product-price">
                              ₹ {item.price}
                            </div>

                            <div className="product-actions">

                              <button
                                className="buy-button"
                                onClick={() =>
                                  handleBuyNow(item)
                                }
                              >
                                {t.buyNow}
                              </button>

                              <button
                                className="details-button"
                                onClick={() =>
                                  isUser
                                    ? navigate(
                                        `/user/product/${item.id}`
                                      )
                                    : navigate(
                                        `/product/${item.id}`
                                      )
                                }
                              >
                                {t.details}
                              </button>

                            </div>

                          </div>

                        </article>

                      ))}

                    </div>

                  ) : (

                    <div className="empty-box">

                      <div className="empty-icon">
                        🌱
                      </div>

                      <h3>{t.noProducts}</h3>

                    </div>

                  )}
                </>
              )}

            </section>

          </div>

          {/* BOTTOM SECTION */}
          <section className="quality-section">

            <h2>{t.quality}</h2>

            <p>
              {t.qualityText}
            </p>

          </section>

        </main>

      </div>
    </>
  );
}

export default UserProductPage;
