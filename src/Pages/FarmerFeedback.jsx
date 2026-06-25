import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function FarmerFeedback() {
  const [formData, setFormData] = useState({ name: "", phone: "", rating: "", feedback: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/feedback`, formData);
      if (res.data.success) {
        alert("Thank you for your feedback!");
        setFormData({ name: "", phone: "", rating: "", feedback: "" });
      }
    } catch (error) {
      console.error("Feedback Error:", error);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "25px", background: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "green", marginBottom: "20px" }}>Farmer Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        <input type="tel" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required style={inputStyle} />
        <select name="rating" value={formData.rating} onChange={handleChange} required style={inputStyle}>
          <option value="">Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Good</option>
          <option value="3">⭐⭐⭐ Average</option>
          <option value="2">⭐⭐ Poor</option>
          <option value="1">⭐ Very Poor</option>
        </select>
        <textarea name="feedback" placeholder="Write your feedback..." rows="5" value={formData.feedback} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={{ width: "100%", padding: "12px", background: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Submit Feedback</button>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "15px", boxSizing: "border-box" };

export default FarmerFeedback;
