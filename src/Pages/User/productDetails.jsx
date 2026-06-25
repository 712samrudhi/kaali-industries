import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../../config";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
          data.variants = typeof data.variants === "string" ? JSON.parse(data.variants) : data.variants || [];
        } catch { data.variants = []; }
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
    localStorage.setItem("checkoutProduct", JSON.stringify({ items: [item], totalItems: 1, totalPrice: item.price }));
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
    alert("Added To Cart Successfully");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "10px 30px", background: "#f5f5f5" }}>
      <div style={{ display: "flex", gap: "5px", background: "#fff", padding: "20px", borderRadius: "10px", alignItems: "flex-start" }}>
        <div style={{ width: "350px", minWidth: "350px" }}>
          <img src={`${BASE_URL}/uploads/${mainImage}`} alt="" style={{ width: "300px", height: "300px", objectFit: "contain", display: "block", margin: "0 auto" }} />
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {[product.image1, product.image2, product.image3, product.image4].filter(Boolean).map((img, index) => (
              <img key={index} src={`${BASE_URL}/uploads/${img}`} alt="" onClick={() => setMainImage(img)}
                style={{ width: "70px", height: "70px", cursor: "pointer", border: "1px solid #ddd", padding: "5px" }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: 0 }}>{product.productName}</h1>
          <h2 style={{ color: "green" }}>₹ {selectedVariant?.price || product.price}</h2>
          <h3>About Product</h3><p>{product.about}</p>
          <h3>Specification</h3><p>{product.specification}</p>
          <h3>Key Benefits</h3><p>{product.keyBenefits}</p>
          <h3>Mode Of Action</h3><p>{product.modeOfAction}</p>
          <h3>Recommended Application</h3><p>{product.recommendedApplication}</p>
          <h3>Suitable Crops</h3><p>{product.suitableCrops}</p>
          <h3>Features</h3><p>{product.features}</p>
          {product.variants?.length > 0 && (
            <>
              <h3>Select Variant</h3>
              <select value={selectedVariant?.ml || ""} onChange={(e) => {
                const variant = product.variants.find((v) => v.ml === e.target.value);
                setSelectedVariant(variant);
              }}>
                {product.variants.map((v, i) => (
                  <option key={i} value={v.ml}>{v.ml} - ₹{v.price}</option>
                ))}
              </select>
            </>
          )}
          <br /><br />
          <button onClick={handleBuyNow} style={{ background: "orange", border: "none", padding: "12px 25px", cursor: "pointer" }}>Buy Now</button>
          <button onClick={handleAddToCart} style={{ marginLeft: "10px", background: "black", color: "#fff", border: "none", padding: "12px 25px", cursor: "pointer" }}>Add To Cart</button>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Related Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "20px" }}>
        {related.length > 0 ? (
          related.map((item) => (
            <div key={item.id} onClick={() => {
              if (location.pathname.startsWith("/user")) navigate(`/user/product/${item.id}`);
              else navigate(`/product/${item.id}`);
            }} style={{ background: "#fff", padding: "15px", cursor: "pointer", borderRadius: "10px" }}>
              <img src={`${BASE_URL}/uploads/${item.image1 || item.image}`} alt="" style={{ width: "100%", height: "220px", objectFit: "contain" }} />
              <h3>{item.productName || item.name}</h3>
              <h3 style={{ color: "green" }}>₹ {item.price}</h3>
            </div>
          ))
        ) : (<h3>No Related Products Found</h3>)}
      </div>
    </div>
  );
}

export default ProductDetailPage;
