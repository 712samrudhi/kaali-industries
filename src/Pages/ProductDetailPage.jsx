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
  },
};

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
    alert(t.addedToCart);
  };

  if (!product) {
    return <div style={{ textAlign: "center", padding: "50px" }}><h2>{t.loading}</h2></div>;
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
  const about = getField("about");
  const specification = getField("specification");
  const keyBenefits = getField("keyBenefits");
  const modeOfAction = getField("modeOfAction");
  const recommendedApplication = getField("recommendedApplication");
  const suitableCrops = getField("suitableCrops");
  const features = getField("features");
  const customSections = getCustomSections();

  return (
    <div style={{ padding: "10px 30px", background: "#f5f5f5" }}>

      <div style={{ display: "flex", gap: "5px", background: "#fff", padding: "20px", borderRadius: "10px", alignItems: "flex-start" }}>

        {/* Image Section */}
        <div style={{ width: "350px", minWidth: "350px" }}>
          <img
            src={`${BASE_URL}/uploads/${mainImage}`}
            alt=""
            style={{ width: "300px", height: "300px", objectFit: "contain", display: "block", margin: "0 auto" }}
          />
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {[product.image1, product.image2, product.image3, product.image4]
              .filter(Boolean)
              .map((img, index) => (
                <img
                  key={index}
                  src={`${BASE_URL}/uploads/${img}`}
                  alt=""
                  onClick={() => setMainImage(img)}
                  style={{ width: "70px", height: "70px", cursor: "pointer", border: "1px solid #ddd", padding: "5px" }}
                />
              ))}
          </div>
        </div>

        {/* Details Section */}
        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: 0 }}>{productName}</h1>
          <h2 style={{ color: "green" }}>₹ {selectedVariant?.price || product.price}</h2>

          {about && (
            <>
              <h3>{t.about}</h3>
              <p>{about}</p>
            </>
          )}

          {specification && (
            <>
              <h3>{t.specification}</h3>
              <p>{specification}</p>
            </>
          )}

          {keyBenefits && (
            <>
              <h3>{t.keyBenefits}</h3>
              <p>{keyBenefits}</p>
            </>
          )}

          {modeOfAction && (
            <>
              <h3>{t.modeOfAction}</h3>
              <p>{modeOfAction}</p>
            </>
          )}

          {recommendedApplication && (
            <>
              <h3>{t.recommendedApplication}</h3>
              <p>{recommendedApplication}</p>
            </>
          )}

          {suitableCrops && (
            <>
              <h3>{t.suitableCrops}</h3>
              <p>{suitableCrops}</p>
            </>
          )}

          {features && (
            <>
              <h3>{t.features}</h3>
              <p>{features}</p>
            </>
          )}

          {customSections && customSections.length > 0 &&
            customSections.map((sec, idx) => (
              <div key={idx}>
                <h3>{sec.title}</h3>
                <p>{sec.description}</p>
              </div>
            ))
          }

          {product.variants?.length > 0 && (
            <>
              <h3>{t.selectVariant}</h3>
              <select
                value={selectedVariant?.ml || ""}
                onChange={(e) => {
                  const variant = product.variants.find((v) => v.ml === e.target.value);
                  setSelectedVariant(variant);
                }}
              >
                {product.variants.map((v, i) => (
                  <option key={i} value={v.ml}>{v.ml} - ₹{v.price}</option>
                ))}
              </select>
            </>
          )}

          <br /><br />

          <button onClick={handleBuyNow} style={{ background: "orange", border: "none", padding: "12px 25px", cursor: "pointer" }}>
            {t.buyNow}
          </button>

          <button onClick={handleAddToCart} style={{ marginLeft: "10px", background: "black", color: "#fff", border: "none", padding: "12px 25px", cursor: "pointer" }}>
            {t.addToCart}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <h2 style={{ marginTop: "40px" }}>{t.relatedProducts}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "20px" }}>
        {related.length > 0 ? (
          related.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (location.pathname.startsWith("/user")) navigate(`/user/product/${item.productId}`);
                else navigate(`/product/${item.productId}`);
              }}
              style={{ background: "#fff", padding: "15px", cursor: "pointer", borderRadius: "10px" }}
            >
              <img
                src={`${BASE_URL}/uploads/${item.image1 || item.image}`}
                alt=""
                style={{ width: "100%", height: "220px", objectFit: "contain" }}
              />
              <h3>{item.productName || item.name}</h3>
              <h3 style={{ color: "green" }}>₹ {item.price}</h3>
            </div>
          ))
        ) : (
          <h3>{t.noRelated}</h3>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;