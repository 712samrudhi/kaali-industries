import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../config";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    about: "About Product",
    specification: "Specification",
    keyBenefits: "Key Benefits",
    modeOfAction: "Mode Of Action",
    recommendedApplication: "Recommended Application",
    suitableCrops: "Suitable Crops",
    features: "Features",
    selectVariant: "Select Variant",
    buyNow: "Buy Now",
    addToCart: "Add To Cart",
    addedToCart: "Added To Cart Successfully",
    relatedProducts: "Related Products",
    noRelated: "No Related Products Found",
    loading: "Loading...",
    backToProducts: "Back to Products",
  },
  mr: {
    about: "उत्पादनाबद्दल",
    specification: "वैशिष्ट्ये",
    keyBenefits: "मुख्य फायदे",
    modeOfAction: "कार्यपद्धती",
    recommendedApplication: "शिफारस केलेला वापर",
    suitableCrops: "योग्य पिके",
    features: "वैशिष्ट्ये",
    selectVariant: "प्रकार निवडा",
    buyNow: "आता खरेदी करा",
    addToCart: "कार्टमध्ये टाका",
    addedToCart: "कार्टमध्ये यशस्वीरित्या टाकले",
    relatedProducts: "संबंधित उत्पादने",
    noRelated: "संबंधित उत्पादने आढळली नाहीत",
    loading: "लोड होत आहे...",
    backToProducts: "उत्पादनांकडे परत जा",
  },
  hi: {
    about: "उत्पाद के बारे में",
    specification: "विशिष्टता",
    keyBenefits: "मुख्य लाभ",
    modeOfAction: "क्रिया विधि",
    recommendedApplication: "अनुशंसित उपयोग",
    suitableCrops: "उपयुक्त फसलें",
    features: "विशेषताएं",
    selectVariant: "प्रकार चुनें",
    buyNow: "अभी खरीदें",
    addToCart: "कार्ट में डालें",
    addedToCart: "कार्ट में सफलतापूर्वक जोड़ा गया",
    relatedProducts: "संबंधित उत्पाद",
    noRelated: "कोई संबंधित उत्पाद नहीं मिला",
    loading: "लोड हो रहा है...",
    backToProducts: "उत्पादों पर वापस जाएँ",
  },
};

// Ordered list of the standard detail sections so we can render them
// with a running index (used for the numbered leaf-marker rail).
const SECTION_KEYS = [
  ["about", "about"],
  ["specification", "specification"],
  ["keyBenefits", "keyBenefits"],
  ["modeOfAction", "modeOfAction"],
  ["recommendedApplication", "recommendedApplication"],
  ["suitableCrops", "suitableCrops"],
  ["features", "features"],
];

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const t = texts[lang];

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [toast, setToast] = useState("");

  const isLoggedIn = () => {
    const farmer = localStorage.getItem("farmer");
    return farmer && farmer !== "null" && farmer !== "undefined";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${BASE_URL}/product-details/${id}`)
      .then((res) => {
        let data = res.data;

        try {
          data.variants = typeof data.variants === "string"
            ? JSON.parse(data.variants)
            : data.variants || [];
        } catch { data.variants = []; }

        ["customSections", "customSections_mr", "customSections_hi"].forEach((key) => {
          try {
            data[key] = typeof data[key] === "string" ? JSON.parse(data[key]) : data[key] || [];
          } catch { data[key] = []; }
        });

        setProduct(data);
        if (data.variants.length > 0) setSelectedVariant(data.variants[0]);
        else setSelectedVariant(null);
        setMainImage(data.image1 || "");
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get(`${BASE_URL}/related-products/${id}`)
      .then((res) => setRelated(res.data || []))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleBuyNow = () => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    const item = {
      id: product.productId || id,
      name: product.productName,
      price: Number(selectedVariant?.price || product.price || 0),
      ml: selectedVariant?.ml || "",
      image: product.image1,
      qty: 1,
    };
    localStorage.setItem("checkoutProduct", JSON.stringify({
      items: [item], totalItems: 1, totalPrice: item.price,
    }));
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.productId || id,
      name: product.productName,
      price: Number(selectedVariant?.price || product.price || 0),
      ml: selectedVariant?.ml || "",
      image: product.image1,
      qty: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    setToast(t.addedToCart);
  };

  if (!product) {
    return (
      <div className="pdp-loading">
        <PdpStyles />
        <div className="pdp-loading-mark" />
        <p>{t.loading}</p>
      </div>
    );
  }

  // Language-aware field getter with fallback to English/base field
  const getField = (baseField) => {
    if (lang === "mr" && product[`${baseField}_mr`]) return product[`${baseField}_mr`];
    if (lang === "hi" && product[`${baseField}_hi`]) return product[`${baseField}_hi`];
    return product[`${baseField}_en`] || product[baseField];
  };

  const getCustomSections = () => {
    if (lang === "mr" && product.customSections_mr?.length > 0) return product.customSections_mr;
    if (lang === "hi" && product.customSections_hi?.length > 0) return product.customSections_hi;
    return product.customSections || [];
  };

  const productName = getField("productName");
  const customSections = getCustomSections();

  const sections = SECTION_KEYS
    .map(([field, labelKey]) => ({ value: getField(field), label: t[labelKey] }))
    .filter((s) => s.value);

  const gallery = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
  const displayPrice = selectedVariant?.price || product.price;

  return (
    <div className="pdp-page">
      <PdpStyles />

      {toast && <div className="pdp-toast">{toast}</div>}

      <button className="pdp-back" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {t.backToProducts}
      </button>

      <div className="pdp-hero">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-gallery-main">
            <img src={`${BASE_URL}/uploads/${mainImage}`} alt={productName} />
          </div>
          {gallery.length > 1 && (
            <div className="pdp-gallery-thumbs">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  className={`pdp-thumb ${mainImage === img ? "is-active" : ""}`}
                  onClick={() => setMainImage(img)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={`${BASE_URL}/uploads/${img}`} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="pdp-details">
          <h1 className="pdp-name">{productName}</h1>
          <div className="pdp-price-row">
            <span className="pdp-price">₹{displayPrice}</span>
            {selectedVariant?.ml && <span className="pdp-price-unit">/ {selectedVariant.ml}</span>}
          </div>

          {product.variants?.length > 0 && (
            <div className="pdp-variant-block">
              <span className="pdp-variant-label">{t.selectVariant}</span>
              <div className="pdp-variant-pills">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    className={`pdp-pill ${selectedVariant?.ml === v.ml ? "is-active" : ""}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.ml}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp-cta-row">
            <button className="pdp-btn pdp-btn-primary" onClick={handleBuyNow}>
              {t.buyNow}
            </button>
            <button className="pdp-btn pdp-btn-secondary" onClick={handleAddToCart}>
              {t.addToCart}
            </button>
          </div>

          <div className="pdp-sections">
            {sections.map((sec, i) => (
              <div className="pdp-section" key={i}>
                <div className="pdp-section-rail">
                  <span className="pdp-leaf-dot" />
                  {i < sections.length - 1 && <span className="pdp-rail-line" />}
                </div>
                <div className="pdp-section-body">
                  <h3>{sec.label}</h3>
                  <p>{sec.value}</p>
                </div>
              </div>
            ))}

            {customSections.map((sec, idx) => (
              <div className="pdp-section" key={`custom-${idx}`}>
                <div className="pdp-section-rail">
                  <span className="pdp-leaf-dot" />
                  {idx < customSections.length - 1 && <span className="pdp-rail-line" />}
                </div>
                <div className="pdp-section-body">
                  <h3>{sec.title}</h3>
                  <p>{sec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="pdp-related">
        <h2>{t.relatedProducts}</h2>
        {related.length > 0 ? (
          <div className="pdp-related-grid">
            {related.map((item) => (
              <div
                key={item.id}
                className="pdp-related-card"
                onClick={() => {
                  if (location.pathname.startsWith("/user")) navigate(`/user/product/${item.productId}`);
                  else navigate(`/product/${item.productId}`);
                }}
              >
                <div className="pdp-related-img">
                  <img src={`${BASE_URL}/uploads/${item.image1 || item.image}`} alt={item.productName || item.name} />
                </div>
                <h3>{item.productName || item.name}</h3>
                <span className="pdp-related-price">₹{item.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="pdp-no-related">{t.noRelated}</p>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="pdp-sticky-bar">
        <div>
          <span className="pdp-sticky-price">₹{displayPrice}</span>
          {selectedVariant?.ml && <span className="pdp-sticky-unit">/ {selectedVariant.ml}</span>}
        </div>
        <div className="pdp-sticky-actions">
          <button className="pdp-btn pdp-btn-secondary" onClick={handleAddToCart}>{t.addToCart}</button>
          <button className="pdp-btn pdp-btn-primary" onClick={handleBuyNow}>{t.buyNow}</button>
        </div>
      </div>
    </div>
  );
}

function PdpStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

      .pdp-page {
        --forest: #163927;
        --leaf: #4C9A63;
        --leaf-soft: #E7F1E8;
        --gold: #C8922A;
        --cream: #FAF8F2;
        --soil: #6B5B45;
        --ink: #1C1E1B;
        --line: #E4E0D3;
        font-family: 'Inter', -apple-system, sans-serif;
        color: var(--ink);
        background: var(--cream);
        padding: 24px 6vw 90px;
        max-width: 1280px;
        margin: 0 auto;
        min-height: 100vh;
      }

      .pdp-loading {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        font-family: 'Inter', sans-serif;
        color: #6B5B45;
      }
      .pdp-loading-mark {
        width: 34px; height: 34px;
        border-radius: 50%;
        border: 3px solid #E7F1E8;
        border-top-color: #4C9A63;
        animation: pdp-spin 0.8s linear infinite;
      }
      @keyframes pdp-spin { to { transform: rotate(360deg); } }

      .pdp-back {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: none;
        border: none;
        color: var(--soil);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        padding: 8px 0 20px;
      }
      .pdp-back:hover { color: var(--forest); }

      .pdp-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--forest);
        color: #fff;
        padding: 12px 22px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 100;
        box-shadow: 0 8px 20px rgba(22,57,39,0.25);
      }

      .pdp-hero {
        display: grid;
        grid-template-columns: 400px 1fr;
        gap: 48px;
      }

      /* Gallery */
      .pdp-gallery {
        position: sticky;
        top: 20px;
        align-self: start;
      }
      .pdp-gallery-main {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 4px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .pdp-gallery-main img {
        width: 100%; height: 100%; object-fit: contain; padding: 24px;
      }
      .pdp-gallery-thumbs {
        display: flex;
        gap: 10px;
        margin-top: 12px;
      }
      .pdp-thumb {
        width: 64px; height: 64px;
        border: 1px solid var(--line);
        background: #fff;
        border-radius: 4px;
        padding: 6px;
        cursor: pointer;
        transition: border-color 0.15s ease;
      }
      .pdp-thumb img { width: 100%; height: 100%; object-fit: contain; }
      .pdp-thumb.is-active { border-color: var(--leaf); border-width: 2px; }

      /* Details */
      .pdp-name {
        font-family: 'Fraunces', serif;
        font-weight: 500;
        font-size: clamp(28px, 3vw, 38px);
        line-height: 1.15;
        margin: 0 0 10px;
        color: var(--forest);
      }
      .pdp-price-row {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 20px;
      }
      .pdp-price {
        font-family: 'Fraunces', serif;
        font-size: 26px;
        font-weight: 600;
        color: var(--gold);
      }
      .pdp-price-unit { font-size: 14px; color: var(--soil); }

      .pdp-variant-block { margin-bottom: 22px; }
      .pdp-variant-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: var(--soil);
        margin-bottom: 10px;
      }
      .pdp-variant-pills { display: flex; flex-wrap: wrap; gap: 8px; }
      .pdp-pill {
        border: 1px solid var(--line);
        background: #fff;
        color: var(--ink);
        padding: 8px 16px;
        border-radius: 100px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .pdp-pill:hover { border-color: var(--leaf); }
      .pdp-pill.is-active {
        background: var(--forest);
        border-color: var(--forest);
        color: #fff;
      }

      .pdp-cta-row {
        display: flex;
        gap: 12px;
        margin-bottom: 36px;
      }
      .pdp-btn {
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        font-weight: 600;
        border-radius: 4px;
        padding: 13px 28px;
        cursor: pointer;
        border: 1.5px solid transparent;
        transition: transform 0.1s ease, background 0.15s ease;
      }
      .pdp-btn:active { transform: scale(0.98); }
      .pdp-btn-primary { background: var(--gold); color: #2A1E08; }
      .pdp-btn-primary:hover { background: #B7831F; }
      .pdp-btn-secondary { background: var(--forest); color: #fff; }
      .pdp-btn-secondary:hover { background: #0F2B1C; }

      /* Content sections with leaf rail */
      .pdp-sections { border-top: 1px solid var(--line); padding-top: 8px; }
      .pdp-section { display: flex; gap: 18px; }
      .pdp-section-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 26px;
      }
      .pdp-leaf-dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--leaf);
        flex-shrink: 0;
      }
      .pdp-rail-line {
        width: 1px;
        flex: 1;
        background: var(--line);
        margin-top: 4px;
      }
      .pdp-section-body { padding: 20px 0; flex: 1; }
      .pdp-section-body h3 {
        font-family: 'Fraunces', serif;
        font-size: 17px;
        font-weight: 600;
        color: var(--forest);
        margin: 0 0 6px;
      }
      .pdp-section-body p {
        font-size: 14.5px;
        line-height: 1.7;
        color: #3A3A36;
        margin: 0;
        max-width: 65ch;
        white-space: pre-line;
      }

      /* Related */
      .pdp-related { margin-top: 64px; }
      .pdp-related h2 {
        font-family: 'Fraunces', serif;
        font-weight: 500;
        font-size: 24px;
        color: var(--forest);
        margin: 0 0 20px;
      }
      .pdp-related-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 18px;
      }
      .pdp-related-card {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 16px;
        cursor: pointer;
        transition: border-color 0.15s ease, transform 0.15s ease;
      }
      .pdp-related-card:hover { border-color: var(--leaf); transform: translateY(-2px); }
      .pdp-related-img {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
      }
      .pdp-related-img img { width: 100%; height: 100%; object-fit: contain; }
      .pdp-related-card h3 {
        font-size: 14px;
        font-weight: 500;
        margin: 0 0 6px;
        color: var(--ink);
        line-height: 1.4;
      }
      .pdp-related-price { font-weight: 600; color: var(--gold); font-size: 15px; }
      .pdp-no-related { color: var(--soil); font-size: 14px; }

      /* Mobile sticky bar */
      .pdp-sticky-bar { display: none; }

      @media (max-width: 860px) {
        .pdp-page { padding: 16px 5vw 100px; }
        .pdp-hero { grid-template-columns: 1fr; gap: 24px; }
        .pdp-gallery { position: static; }
        .pdp-cta-row { display: none; }
        .pdp-sticky-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #fff;
          border-top: 1px solid var(--line);
          padding: 12px 18px;
          box-shadow: 0 -6px 20px rgba(0,0,0,0.06);
          z-index: 50;
        }
        .pdp-sticky-price { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; color: var(--gold); }
        .pdp-sticky-unit { font-size: 12px; color: var(--soil); margin-left: 4px; }
        .pdp-sticky-actions { display: flex; gap: 8px; }
        .pdp-sticky-actions .pdp-btn { padding: 10px 16px; font-size: 13px; }
      }

      @media (max-width: 480px) {
        .pdp-related-grid { grid-template-columns: repeat(2, 1fr); }
      }
    `}</style>
  );
}

export default ProductDetailPage;