// src/Pages/About.jsx

import React from "react";
import Footer from "../../components/Footer";

function About() {
  return (
    <>
      <div style={styles.container}>

        {/* HERO SECTION */}
        <div style={styles.heroSection}>
          <div style={styles.left}>
            <h1 style={styles.heading}>Kaali Industries</h1>

            <p style={styles.text}>
              At Kaali Industries, we are committed to delivering high-quality agricultural solutions
              that help farmers improve crop productivity, soil health, and sustainable farming practices.
              Our company specializes in the manufacturing and supply of advanced fertilizers,
              bio-fertilizers, micronutrients, plant growth promoters, and agricultural input products
              designed to meet the evolving needs of modern agriculture.
            </p>

            <p style={styles.text}>
              With a strong focus on quality, innovation, and farmer satisfaction, we aim to provide
              scientifically developed formulations that enhance crop performance and support long-term
              agricultural growth.
            </p>

            <p style={styles.text}>
              Our production processes follow strict quality standards, ensuring reliable and effective
              products for every farming condition. Through continuous research, modern technology,
              and customer-focused service, we strive to become a trusted name in the agricultural industry.
            </p>
          </div>

          <div style={styles.right}>
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
              alt="farm"
              style={styles.image}
            />
          </div>
        </div>

        {/* MISSION & VISION */}
        <div style={styles.featureSection}>
          <h2 style={styles.subHeading}>Our Mission</h2>
          <p style={styles.visionText}>
            To empower farmers with innovative and high-performance agricultural products that improve
            productivity, profitability, and sustainability.
          </p>

          <h2 style={styles.subHeading}>Our Vision</h2>
          <p style={styles.visionText}>
            To become a leading agricultural solutions company recognized for quality, innovation,
            and commitment to modern farming.
          </p>
        </div>

        {/* PRODUCT RANGE */}
        <div style={styles.featureSection}>
          <h2 style={styles.subHeading}>Our Product Range</h2>

          <div style={styles.cardContainer}>
            <div style={styles.card}>Insecticide</div>
            <div style={styles.card}>Pesticide</div>
            <div style={styles.card}>Herbicide</div>
            <div style={styles.card}>Plant Growth Promoters</div>
            <div style={styles.card}>Seeds Production & Processing</div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div style={styles.featureSection}>
          <h2 style={styles.subHeading}>Why Choose Us</h2>

          <div style={styles.cardContainer}>
            <div style={styles.card}>Premium Quality Products</div>
            <div style={styles.card}>Advanced Manufacturing Processes</div>
            <div style={styles.card}>Scientifically Developed Formulations</div>
            <div style={styles.card}>Farmer-Centric Approach</div>
            <div style={styles.card}>Strict Quality Control</div>
            <div style={styles.card}>Sustainable Agricultural Solutions</div>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div style={styles.visionSection}>
          <h2 style={styles.subHeading}>Details</h2>
          <p style={styles.visionText}>
            <b>Kaali Industries</b><br />
            Phone Number: 7030056556<br />
            Email: nutrient0009@gmail.com<br />
            Office Address: C1-303, Sun Empire, Sun City Road, Sinhgad Road, Pune - 411051
          </p>
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

  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap",
    marginBottom: "80px",
  },

  left: { flex: 1, minWidth: "300px" },
  right: { flex: 1, minWidth: "300px", textAlign: "center" },

  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },

  heading: {
    fontSize: "45px",
    color: "#2e7d32",
    marginBottom: "25px",
  },

  text: {
    fontSize: "18px",
    lineHeight: "32px",
    color: "#444",
    marginBottom: "15px",
  },

  featureSection: {
    marginBottom: "70px",
  },

  subHeading: {
    textAlign: "center",
    fontSize: "34px",
    color: "#2e7d32",
    marginBottom: "30px",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    fontWeight: "500",
  },

  visionSection: {
    background: "#e8f5e9",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
  },

  visionText: {
    fontSize: "18px",
    lineHeight: "32px",
    color: "#333",
    maxWidth: "900px",
    margin: "auto",
  },
};

export default About;