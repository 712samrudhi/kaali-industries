import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  // ================= GET PRODUCTS =================
  const getProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log("Get Products Error:", error);
      alert("Failed to Load Products ❌");
    }
  };

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      await axios.delete(`${BASE_URL}/product/${id}`);

      alert("Product Deleted ✅");

      getProducts();
    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Delete Failed ❌"
      );
    }
  };

  // ================= EDIT PRODUCT =================
  const editProduct = (product) => {
    setEditId(product.id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
    });

    setOldImage(product.image || null);

    if (product.image) {
      setPreview(`${BASE_URL}/uploads/${product.image}`);
    } else {
      setPreview(null);
    }

    setNewImage(null);
  };

  // ================= UPDATE PRODUCT =================
  const updateProduct = async () => {
    if (
      !form.name.trim() ||
      !form.price ||
      !form.category
    ) {
      alert("कृपया सर्व fields भरा");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("price", form.price);
      formData.append("category", form.category);

      // New image selected असल्यासच send होईल
      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await axios.put(
        `${BASE_URL}/product/${editId}`,
        formData
      );

      console.log("Update Response:", response.data);

      alert("Product Updated Successfully ✅");

      cancelEdit();

      getProducts();

    } catch (error) {
      console.log(
        "Update Error:",
        error.response?.data || error.message
      );

      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Update Failed ❌";

      alert(msg);

    } finally {
      setLoading(false);
    }
  };

  // ================= CANCEL EDIT =================
  const cancelEdit = () => {
    setEditId(null);

    setForm({
      name: "",
      price: "",
      category: "",
    });

    setNewImage(null);
    setPreview(null);
    setOldImage(null);
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setNewImage(file);

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#16a34a",
          marginBottom: "30px",
        }}
      >
        Manage Products
      </h1>

      {/* ================= EDIT FORM ================= */}
      {editId && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "30px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <h3>Edit Product</h3>

          {/* CURRENT IMAGE */}
          <div style={{ marginBottom: "15px" }}>
            <p
              style={{
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Current Image:
            </p>

            {preview ? (
              <img
                src={preview}
                alt="Product Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid #ddd",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>

          {/* CHANGE IMAGE */}
          <div style={{ marginBottom: "15px" }}>
            <p
              style={{
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Change Image (optional):
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: "100%",
                padding: "5px",
              }}
            />
          </div>

          {/* PRODUCT NAME */}
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            min="0"
            step="0.01"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          {/* CATEGORY */}
          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select Category</option>

            <option value="Fertilizer">
              Fertilizer
            </option>

            <option value="Biostimulant">
              Biostimulant
            </option>

            <option value="Seeds">
              Seeds
            </option>

            <option value="Pesticides">
              Pesticides
            </option>

            <option value="Herbicide">
              Herbicide
            </option>

            <option value="Fungicide">
              Fungicide
            </option>

            <option value="PGR">
              PGR
            </option>
          </select>

          {/* UPDATE BUTTON */}
          <button
            onClick={updateProduct}
            disabled={loading}
            style={{
              background: loading
                ? "#9ca3af"
                : "#16a34a",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            {loading
              ? "Updating..."
              : "Update Product ✅"}
          </button>

          {/* CANCEL BUTTON */}
          <button
            onClick={cancelEdit}
            disabled={loading}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Cancel ❌
          </button>
        </div>
      )}

      {/* ================= PRODUCTS ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            {/* PRODUCT IMAGE */}
            <img
              src={`${BASE_URL}/uploads/${p.image}`}
              alt={p.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

            {/* PRODUCT NAME */}
            <h3>{p.name}</h3>

            {/* PRICE */}
            <p>
              <b>₹ {p.price}</b>
            </p>

            {/* CATEGORY */}
            <p>
              Category: {p.category}
            </p>

            {/* EDIT BUTTON */}
            <button
              onClick={() => editProduct(p)}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "10px",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Edit
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() =>
                deleteProduct(p.id)
              }
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;