import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

function Checkout() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "", pincode: "", paymentMethod: "COD",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutProduct");
    if (savedData) {
      try { setData(JSON.parse(savedData)); } catch (error) { console.log("LocalStorage Error:", error); }
    }
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!data || !data.items || data.items.length === 0) { alert("No Product Found"); return; }
    const farmer = JSON.parse(localStorage.getItem("farmer"));
    if (!farmer) { alert("Please Login First"); return; }

    const order = {
      farmer_id: farmer.farmer_id,
      name: form.name, phone: form.phone, address: form.address,
      city: form.city, pincode: form.pincode, paymentMethod: form.paymentMethod,
      items: data.items, totalItems: data.totalItems, totalPrice: data.totalPrice,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const result = await res.json();
      if (result.success) {
        alert("Order Placed Successfully");
        localStorage.removeItem("checkoutProduct");
        navigate("/user/orders");
      } else {
        alert(result.message || "Order Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  if (!data) return <div style={{ padding: "30px", textAlign: "center" }}><h2>Loading Checkout...</h2></div>;
  if (!data.items || data.items.length === 0) return <div style={{ padding: "30px", textAlign: "center" }}><h2>No Product Selected</h2></div>;

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <div style={styles.formSection}>
          <h1>Checkout</h1>
          <form onSubmit={placeOrder}>
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={change} required style={styles.input} />
            <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={change} required style={styles.input} />
            <textarea name="address" placeholder="Address" value={form.address} onChange={change} required style={styles.textarea} />
            <input type="text" name="city" placeholder="City" value={form.city} onChange={change} required style={styles.input} />
            <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={change} required style={styles.input} />
            <select name="paymentMethod" value={form.paymentMethod} onChange={change} style={styles.input}>
              <option value="COD">Cash On Delivery</option>
            </select>
            <button type="submit" style={styles.button}>Place Order</button>
          </form>
        </div>
        <div style={styles.summary}>
          <h2>Order Summary</h2>
          {data.items.map((item, index) => (
            <div key={index} style={styles.product}>
              <img src={`${BASE_URL}/uploads/${item.image}`} alt={item.name} style={styles.image} />
              <h3>{item.name}</h3>
              <p>Variant: {item.ml}</p>
              <p>Quantity: {item.qty}</p>
              <p>Price: ₹{Number(item.price) * Number(item.qty)}</p>
              <hr />
            </div>
          ))}
          <h3>Total Items: {data.totalItems}</h3>
          <h2 style={{ color: "green" }}>Total Amount: ₹{data.totalPrice}</h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", padding: "30px" },
  box: { maxWidth: "1100px", margin: "auto", display: "flex", gap: "20px", flexWrap: "wrap" },
  formSection: { flex: 1, minWidth: "350px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  summary: { width: "350px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  input: { width: "100%", padding: "12px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" },
  textarea: { width: "100%", height: "100px", padding: "12px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" },
  image: { width: "100px", height: "100px", objectFit: "contain" },
  product: { marginBottom: "15px" },
};
