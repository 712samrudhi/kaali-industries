
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin Panel</h2>

        <ul style={styles.menu}>
          <li>
            <Link to="/admin/dashboard" style={styles.link}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/add-product" style={styles.link}>
              Add Product
            </Link>
          </li>

          <li>
            <Link to="/admin/product-details" style={styles.link}>
              Product Details
            </Link>
          </li>

          <li>
            <Link to="/admin/products" style={styles.link}>
              Manage Products
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-product-details"
              style={styles.link}
            >
              Manage Product Details
            </Link>
          </li>

          <li>
            <Link
              to="/admin/contact-messages"
              style={styles.link}
            >
              Contact Messages
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              style={styles.link}
            >
              Manage Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              style={styles.link}
            >
              Orders
            </Link>
          </li>

          <li>
            <Link
              to="/admin/feedback"
              style={styles.link}
            >
              Farmer Feedback
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.heading}>
          Welcome Admin 👋
        </h1>

        <p style={styles.subText}>
          Manage Products, Orders, Feedback, Contact Messages and Users
        </p>

        <div style={styles.cardContainer}>
          <Card
            title="Add Product"
            text="Add new products."
            link="/admin/add-product"
            btn="Open"
          />

          <Card
            title="Product Details"
            text="Add product descriptions and images."
            link="/admin/product-details"
            btn="Open"
          />

          <Card
            title="Manage Products"
            text="Edit and Delete Products."
            link="/admin/products"
            btn="Manage"
          />

          <Card
            title="Manage Product Details"
            text="Edit and Delete Product Details."
            link="/admin/manage-product-details"
            btn="Manage"
          />

          <Card
            title="Contact Messages"
            text="View messages received from Contact Us page."
            link="/admin/contact-messages"
            btn="View"
          />

          <Card
            title="Manage Users"
            text="View all registered users."
            link="/admin/users"
            btn="Users"
          />

          <Card
            title="Orders"
            text="View and manage customer orders."
            link="/admin/orders"
            btn="View"
          />

          <Card
            title="Farmer Feedback"
            text="View all farmer feedback and ratings."
            link="/admin/feedback"
            btn="View"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, text, link, btn }) {
  return (
    <div style={styles.card}>
      <h2>{title}</h2>
      <p>{text}</p>

      <Link
        to={link}
        style={styles.cardBtn}
      >
        {btn}
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
  },

  sidebar: {
    width: "260px",
    background: "#111827",
    padding: "20px",
  },

  logo: {
    color: "#22c55e",
    textAlign: "center",
    marginBottom: "30px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
  },

  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    background: "#1f2937",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    fontWeight: "500",
  },

  logoutBtn: {
    width: "100%",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },

  mainContent: {
    flex: 1,
    padding: "40px",
  },

  heading: {
    marginBottom: "10px",
  },

  subText: {
    color: "#6b7280",
    marginBottom: "30px",
  },

  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },

  card: {
    background: "white",
    width: "280px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  cardBtn: {
    display: "inline-block",
    marginTop: "10px",
    background: "#22c55e",
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "8px",
  },
};

export default AdminDashboard;
