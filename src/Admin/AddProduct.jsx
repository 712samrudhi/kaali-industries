import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("कृपया product image निवडा");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name.trim());
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("image", image);

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data?.message || "Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        category: "",
      });
      setImage(null);
      e.target.reset();
    } catch (err) {
      console.log(err.response?.data || err.message);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error Adding Product. सर्व्हर तपासा किंवा पुन्हा प्रयत्न करा.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
        <br />
        <br />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Fertilizer">Fertilizer</option>
          <option value="Biostimulant">Biostimulant</option>
          <option value="Seeds">Seeds</option>
          <option value="Pesticides">Pesticides</option>
          <option value="Herbicide">Herbicide</option>
          <option value="Fungicide">Fungicide</option>
          <option value="PGR">PGR</option>
        </select>

        <br />
        <br />

        <input type="file" accept="image/*" onChange={handleImage} required />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;