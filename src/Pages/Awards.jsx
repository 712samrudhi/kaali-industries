// src/Pages/Awards.jsx

import React from "react";

import Footer from "../components/Footer";

function Awards() {

  const awards = [

    {
      id: 1,
      title: "Best Agriculture Startup",
      year: "2023",
      description:
        "Awarded for innovation in smart farming solutions.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Farmer Choice Award",
      year: "2024",
      description:
        "Recognized for excellent farmer support and services.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "Green Innovation Award",
      year: "2025",
      description:
        "Honored for promoting sustainable agriculture.",
      image:
        "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  return (

    <>

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Our Awards
        </h1>

        <p style={styles.subText}>
          AgroTech has been recognized for
          innovation, sustainability, and
          farmer-focused services.
        </p>

        <div style={styles.cardContainer}>

          {awards.map((award) => (

            <div key={award.id} style={styles.card}>

              <img
                src={award.image}
                alt={award.title}
                style={styles.image}
              />

              <div style={styles.content}>

                <h2 style={styles.title}>
                  {award.title}
                </h2>

                <h3 style={styles.year}>
                  {award.year}
                </h3>

                <p style={styles.description}>
                  {award.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Footer />

    </>

  );

}

const styles = {

  container: {
    width: "100%",
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "60px 8%",
    boxSizing: "border-box",
  },

  heading: {
    textAlign: "center",
    fontSize: "48px",
    color: "#2e7d32",
    marginBottom: "20px",
  },

  subText: {
    textAlign: "center",
    fontSize: "20px",
    color: "#555",
    marginBottom: "50px",
    lineHeight: "34px",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "35px",
  },

  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },

  content: {
    padding: "25px",
  },

  title: {
    fontSize: "28px",
    color: "#2e7d32",
    marginBottom: "10px",
  },

  year: {
    color: "#4CAF50",
    marginBottom: "15px",
  },

  description: {
    fontSize: "17px",
    color: "#444",
    lineHeight: "30px",
  },

};

export default Awards;