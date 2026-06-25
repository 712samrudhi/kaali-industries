import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import BASE_URL from "../config";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/contact`, formData);
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#e8f5e9,#ffffff)", padding: "50px 8%" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "65px", marginBottom: "10px" }}>🌿</div>
        <h1 style={{ fontSize: "45px", color: "#1b5e20", margin: "10px" }}>Contact Us</h1>
        <p style={{ fontSize: "20px", color: "#555" }}>Sustainable Agricultural Solutions</p>
      </div>
      <div style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ background: "#fff", width: "450px", padding: "35px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}>
          <h2 style={{ color: "#2e7d32", fontSize: "30px" }}>Kaali Industries</h2>
          <p style={{ color: "#777" }}>🌱 Growing Better Future Together</p>
          <div style={itemStyle}><FaPhone style={iconStyle} /><div><h4>Phone Number</h4><p>7030056556</p></div></div>
          <div style={itemStyle}><FaEnvelope style={iconStyle} /><div><h4>Email Address</h4><p>nutrient0009@gmail.com</p></div></div>
          <div style={itemStyle}><FaMapMarkerAlt style={iconStyle} /><div><h4>Office Address</h4><p>C1-303, Sun Empire<br />Sun City Road<br />Sinhgad Road<br />Pune - 411051</p></div></div>
        </div>
        <div style={{ background: "#fff", width: "450px", padding: "35px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}>
          <h2 style={{ color: "#2e7d32" }}>Send Message</h2>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} style={inputStyle} />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} style={inputStyle} />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} style={{ ...inputStyle, height: "120px", resize: "none" }} />
          <button onClick={handleSubmit} style={{ width: "100%", padding: "14px", background: "#2e7d32", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

const itemStyle = { display: "flex", gap: "20px", alignItems: "flex-start", margin: "25px 0" };
const iconStyle = { fontSize: "25px", color: "#43a047" };
const inputStyle = { width: "100%", padding: "14px", margin: "12px 0", borderRadius: "10px", border: "1px solid #ddd", fontSize: "15px", outline: "none", boxSizing: "border-box" };

export default Contact;
