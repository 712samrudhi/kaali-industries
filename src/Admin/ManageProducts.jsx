import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  useEffect(() => { getProducts(); }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      alert("Failed to Load Products");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete Product?")) return;
    try {
      await axios.delete(`${BASE_URL}/product/${id}`);
      alert("Product Deleted");
      getProducts();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const editProduct = (product) => {
    setEditId(product.id);
    setForm({ name: product.name, price: product.price, category: product.category });
    setOldImage(product.image);
    setPreview(`${BASE_URL}/uploads/${product.image}`);
    setNewImage(null);
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      if (newImage) {
        formData.append("image", newImage);
      }

      await axios.put(`${BASE_URL}/product/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Product Updated ✅");
      setEditId(null);
      setForm({ name: "", price: "", category: "" });
      setNewImage(null);
      setPreview(null);
      setOldImage(null);
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "#16a34a" }}>Manage Products</h1>

      {editId && (
        <div style={{ border: "1px solid #ddd", padding: "20px", marginBottom: "30px", borderRadius: "10px" }}>
          <h3>Edit Product</h3>

          {/* Image Preview */}
          <div style={{ marginBottom: "15px" }}>
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Current Image:</p>
            <img
              src={preview}
              alt="preview"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px", border: "2px solid #ddd" }}
              onError={(e) => e.target.style.display = "none"}
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: "10px" }}>
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Change Image (optional):</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            <option value="fertilizer">Fertilizer</option>
            <option value="seed">Seed</option>
            <option value="food">Food</option>
            <option value="vegetable">Vegetable</option>
          </select>

          <button
            onClick={updateProduct}
            style={{ background: "#16a34a", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px", marginRight: "10px" }}
          >
            Update Product ✅
          </button>

          <button
            onClick={() => { setEditId(null); setPreview(null); setNewImage(null); }}
            style={{ background: "#dc2626", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}
          >
            Cancel ❌
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <img
              src={`${BASE_URL}/uploads/${p.image}`}
              alt={p.name}
              style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px" }}
            />
            <h3>{p.name}</h3>
            <p><b>₹ {p.price}</b></p>
            <p>Category: {p.category}</p>
            <button
              onClick={() => editProduct(p)}
              style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px", marginRight: "10px", cursor: "pointer", borderRadius: "5px" }}
            >Edit</button>
            <button
              onClick={() => deleteProduct(p.id)}
              style={{ background: "#dc2626", color: "#fff", border: "none", padding: "10px", cursor: "pointer", borderRadius: "5px" }}
            >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;