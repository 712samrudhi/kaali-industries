import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageProductDetails() {
  // ===== List of all products (for selecting which one to edit) =====
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== Form state (same fields as ProductDetails.jsx) =====
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    specification: "",
    about: "",
    keyBenefits: "",
    modeOfAction: "",
    recommendedApplication: "",
    suitableCrops: "",
    features: "",
  });

  const [variants, setVariants] = useState([{ ml: "", price: "" }]);

  const [customSections, setCustomSections] = useState([
    { title: "", description: "" },
  ]);

  // New images the admin uploads to REPLACE existing ones
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // Existing image URLs coming from the server (for preview)
  const [existingImages, setExistingImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  // ===== Fetch all products for the dropdown =====
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product-details`);
      const list = res.data.products || res.data;
      // Only set if it's actually an array, otherwise fall back to []
      setProducts(Array.isArray(list) ? list : []);
    } catch (err) {
      console.log(err);
      setProducts([]); // prevent crash - keep products as an array even on error
      if (err.response && err.response.status === 401) {
        alert("Session Expired. Please login again.");
        // Optionally redirect to login:
        // window.location.href = "/admin-login";
      } else {
        alert("Error Loading Product List");
      }
    }
  };

  // ===== When admin selects a product, fetch its full details =====
  const handleSelectProduct = async (e) => {
    const id = e.target.value;
    setSelectedProductId(id);

    if (!id) {
      resetForm();
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/product-details/${id}`);
      const product = res.data.product || res.data;

      setFormData({
        productId: product.productId || "",
        productName: product.productName || "",
        specification: product.specification || "",
        about: product.about || "",
        keyBenefits: product.keyBenefits || "",
        modeOfAction: product.modeOfAction || "",
        recommendedApplication: product.recommendedApplication || "",
        suitableCrops: product.suitableCrops || "",
        features: product.features || "",
      });

      setVariants(
        product.variants && product.variants.length > 0
          ? product.variants
          : [{ ml: "", price: "" }]
      );

      setCustomSections(
        product.customSections && product.customSections.length > 0
          ? product.customSections
          : [{ title: "", description: "" }]
      );

      setExistingImages({
        image1: product.image1 || "",
        image2: product.image2 || "",
        image3: product.image3 || "",
        image4: product.image4 || "",
      });

      setImages({ image1: null, image2: null, image3: null, image4: null });
    } catch (err) {
      console.log(err);
      alert("Error Loading Product Details");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productId: "",
      productName: "",
      specification: "",
      about: "",
      keyBenefits: "",
      modeOfAction: "",
      recommendedApplication: "",
      suitableCrops: "",
      features: "",
    });
    setVariants([{ ml: "", price: "" }]);
    setCustomSections([{ title: "", description: "" }]);
    setImages({ image1: null, image2: null, image3: null, image4: null });
    setExistingImages({ image1: "", image2: "", image3: "", image4: "" });
  };

  // ===== Basic field handlers =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  // ===== Variant handlers =====
  const handleVariantChange = (index, e) => {
    const updatedVariants = [...variants];
    updatedVariants[index][e.target.name] = e.target.value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ml: "", price: "" }]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  // ===== Custom Section handlers =====
  const handleSectionChange = (index, e) => {
    const updated = [...customSections];
    updated[index][e.target.name] = e.target.value;
    setCustomSections(updated);
  };

  const addSection = () => {
    setCustomSections([...customSections, { title: "", description: "" }]);
  };

  const removeSection = (index) => {
    const updated = [...customSections];
    updated.splice(index, 1);
    setCustomSections(updated);
  };

  // ===== Submit updated details =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      alert("Please select a product to edit");
      return;
    }

    if (!formData.productId.trim()) {
      alert("Product ID is required");
      return;
    }

    const data = new FormData();

    data.append("productId", formData.productId);
    data.append("productName", formData.productName);
    data.append("specification", formData.specification);
    data.append("about", formData.about);
    data.append("keyBenefits", formData.keyBenefits);
    data.append("modeOfAction", formData.modeOfAction);
    data.append("recommendedApplication", formData.recommendedApplication);
    data.append("suitableCrops", formData.suitableCrops);
    data.append("features", formData.features);

    data.append("variants", JSON.stringify(variants));

    const filledSections = customSections.filter(
      (s) => s.title.trim() !== ""
    );
    data.append("customSections", JSON.stringify(filledSections));

    // Only send images that were actually replaced; backend should
    // keep the old image if a new one isn't provided.
    if (images.image1) data.append("image1", images.image1);
    if (images.image2) data.append("image2", images.image2);
    if (images.image3) data.append("image3", images.image3);
    if (images.image4) data.append("image4", images.image4);

    try {
      const res = await axios.put(
        `${BASE_URL}/product-details/${selectedProductId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message || "Product Updated Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Error Updating Product Details");
    }
  };

  // ===== Delete a product =====
  const handleDelete = async () => {
    if (!selectedProductId) {
      alert("Please select a product to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await axios.delete(
        `${BASE_URL}/product-details/${selectedProductId}`
      );
      alert(res.data.message || "Product Deleted Successfully");
      setSelectedProductId("");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Error Deleting Product");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Product Details</h2>

      {/* ===== Product selector ===== */}
      <select
        value={selectedProductId}
        onChange={handleSelectProduct}
        style={styles.input}
      >
        <option value="">-- Select Product to Edit --</option>
        {products.map((p) => (
          <option key={p._id || p.productId} value={p._id || p.productId}>
            {p.productName ? `${p.productId} - ${p.productName}` : p.productId}
          </option>
        ))}
      </select>

      {loading && <p>Loading product details...</p>}

      {selectedProductId && !loading && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productId"
            placeholder="Product ID *"
            value={formData.productId}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="productName"
            placeholder="Product Name (Optional)"
            value={formData.productName}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="specification"
            placeholder="Specification (Optional)"
            value={formData.specification}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <textarea
            name="about"
            placeholder="About (Optional)"
            value={formData.about}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <textarea
            name="keyBenefits"
            placeholder="Key Benefits (Optional)"
            value={formData.keyBenefits}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <textarea
            name="modeOfAction"
            placeholder="Mode Of Action (Optional)"
            value={formData.modeOfAction}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <textarea
            name="recommendedApplication"
            placeholder="Recommended Application (Optional)"
            value={formData.recommendedApplication}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <textarea
            name="suitableCrops"
            placeholder="Suitable Crops (Optional)"
            value={formData.suitableCrops}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <textarea
            name="features"
            placeholder="Features (Optional)"
            value={formData.features}
            onChange={handleChange}
            rows="3"
            style={styles.textarea}
          />

          <h3>Product Variants (Optional)</h3>

          {variants.map((variant, index) => (
            <div key={index} style={styles.variantRow}>
              <input
                type="text"
                name="ml"
                placeholder="ML (Example: 4ml)"
                value={variant.ml}
                onChange={(e) => handleVariantChange(index, e)}
                style={styles.variantInput}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, e)}
                style={styles.variantInput}
              />
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addVariant} style={styles.addBtn}>
            + Add Variant
          </button>

          {/* ===== Custom Sections ===== */}
          <h3>Additional Sections (Optional)</h3>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "-5px" }}>
            प्रत्येक product साठी वेगळी माहिती हवी असल्यास इथे स्वतःचा Title
            (बोल्ड हेडिंग) आणि Description टाका.
          </p>

          {customSections.map((section, index) => (
            <div key={index} style={styles.sectionBox}>
              <input
                type="text"
                name="title"
                placeholder="Section Title (e.g. Storage Instructions)"
                value={section.title}
                onChange={(e) => handleSectionChange(index, e)}
                style={styles.input}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={section.description}
                onChange={(e) => handleSectionChange(index, e)}
                rows="3"
                style={styles.textarea}
              />
              {customSections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  style={styles.deleteBtn}
                >
                  Delete Section
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addSection} style={styles.addBtn}>
            + Add Section
          </button>

          <h3>Product Images (Optional)</h3>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "-5px" }}>
            नवीन image निवडल्यासच जुनी image बदलेल, अन्यथा जुनीच राहील.
          </p>

          {["image1", "image2", "image3", "image4"].map((key) => (
            <div key={key} style={styles.imageBox}>
              {existingImages[key] && (
                <img
                  src={existingImages[key]}
                  alt={key}
                  style={styles.previewImg}
                />
              )}
              <input
                type="file"
                name={key}
                onChange={handleImage}
                style={styles.input}
              />
            </div>
          ))}

          <button type="submit" style={styles.saveBtn}>
            Update Product Details
          </button>

          <button
            type="button"
            onClick={handleDelete}
            style={styles.deleteProductBtn}
          >
            Delete Product
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "vertical",
  },
  variantRow: { display: "flex", gap: "10px", marginBottom: "10px" },
  variantInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  sectionBox: {
    border: "1px dashed #999",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    background: "#fafafa",
  },
  imageBox: {
    marginBottom: "15px",
  },
  previewImg: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px",
    display: "block",
    marginBottom: "8px",
    border: "1px solid #ccc",
  },
  addBtn: {
    background: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  deleteBtn: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveBtn: {
    width: "100%",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  deleteProductBtn: {
    width: "100%",
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default ManageProductDetails;