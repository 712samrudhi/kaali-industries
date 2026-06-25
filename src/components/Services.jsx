import React from "react";

function Services() {
  const services = [
    {
      icon: "🌾",
      title: "Farmer Support",
      desc: "Helping farmers connect directly with buyers."
    },
    {
      icon: "🛒",
      title: "Buyer Marketplace",
      desc: "Find quality agricultural products easily."
    },
    {
      icon: "📦",
      title: "Order Management",
      desc: "Manage and track orders efficiently."
    },
    {
      icon: "💰",
      title: "Price Transparency",
      desc: "Get fair and updated market prices."
    },
    {
      icon: "🚚",
      title: "Delivery Support",
      desc: "Fast and reliable product delivery."
    },
    {
      icon: "🌍",
      title: "Export Assistance",
      desc: "Support for national and international markets."
    }
  ];

  return (
    <div
      style={{
        padding: "60px 8%",
        background: "#f8f9fa",
        textAlign: "center"
      }}
    >
      <h2
        style={{
          fontSize: "36px",
          color: "#2e7d32",
          marginBottom: "40px"
        }}
      >
        Our Services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "30px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px"
              }}
            >
              {service.icon}
            </div>

            <h3
              style={{
                color: "#2e7d32",
                marginBottom: "10px"
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                color: "#666",
                lineHeight: "1.6"
              }}
            >
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;