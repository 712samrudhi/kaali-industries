import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");

    navigate("/admin");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">
        Admin Panel
      </h2>

      <ul>
        <li>
          <Link to="/admin/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/add-product">
            Add Product
          </Link>
        </li>

        <li>
          <Link to="/admin/products">
            Manage Products
          </Link>
        </li>

        <li>
          <Link to="/admin/users">
            Manage Users
          </Link>
        </li>

        <li>
          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
