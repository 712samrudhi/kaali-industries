import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("image", image);

    try {
      const res = await axios.post(
        `${BASE_URL}/add-product`,
        formData
      );

      alert(res.data.message);

      setProduct({
        name: "",
        price: "",
        category: ""
      });

      setImage(null);

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error Adding Product");
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
        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="fertilizer">Fertilizer</option>
          <option value="seed">Seed</option>
          <option value="food">Food</option>
          <option value="vegetable">Vegetable</option>
        </select>

        <br /><br />

        <input type="file" onChange={handleImage} required />

        <br /><br />

        <button type="submit">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
