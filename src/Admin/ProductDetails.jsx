import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ProductDetails() {
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

  const [variants, setVariants] = useState([
    { ml: "", price: "" }
  ]);

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleVariantChange = (index, e) => {
    const updatedVariants = [...variants];
    updatedVariants[index][e.target.name] = e.target.value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { ml: "", price: "" }
    ]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    data.append(
      "recommendedApplication",
      formData.recommendedApplication
    );
    data.append("suitableCrops", formData.suitableCrops);
    data.append("features", formData.features);

    data.append(
      "variants",
      JSON.stringify(variants)
    );

    if (images.image1)
      data.append("image1", images.image1);

    if (images.image2)
      data.append("image2", images.image2);

    if (images.image3)
      data.append("image3", images.image3);

    if (images.image4)
      data.append("image4", images.image4);

    try {
      const res = await axios.post(
        `${BASE_URL}/product-details`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

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

      setVariants([
        { ml: "", price: "" }
      ]);

      setImages({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });

    } catch (err) {
      console.log(err);
      alert("Error Saving Product Details");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Product Details
      </h2>

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
              onChange={(e) =>
                handleVariantChange(index, e)
              }
              style={styles.variantInput}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={variant.price}
              onChange={(e) =>
                handleVariantChange(index, e)
              }
              style={styles.variantInput}
            />

            {variants.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  removeVariant(index)
                }
                style={styles.deleteBtn}
              >
                Delete
              </button>
            )}

          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          style={styles.addBtn}
        >
          + Add Variant
        </button>

        <h3>Product Images (Optional)</h3>

        <input
          type="file"
          name="image1"
          onChange={handleImage}
          style={styles.input}
        />

        <input
          type="file"
          name="image2"
          onChange={handleImage}
          style={styles.input}
        />

        <input
          type="file"
          name="image3"
          onChange={handleImage}
          style={styles.input}
        />

        <input
          type="file"
          name="image4"
          onChange={handleImage}
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.saveBtn}
        >
          Save Product Details
        </button>

      </form>
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

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

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

  variantRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  variantInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
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
};

export default ProductDetails;
