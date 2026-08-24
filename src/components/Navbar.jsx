import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const pageRoutes = {
  home: "/",
  about: "/about",
  products: "/products",
  services: "/services",
  contact: "/contact",
};

const texts = {
  en: {
    contact: "CONTACT US",
    home: "Home",
    about: "About",
    products: "Products",
    services: "Services",
    search: "Search here...",
    login: "Login",
    admin: "Admin",
  },
  mr: {
    contact: "संपर्क करा",
    home: "मुख्यपृष्ठ",
    about: "आमच्याबद्दल",
    products: "उत्पादने",
    services: "सेवा",
    search: "शोधा...",
    login: "लॉगिन",
    admin: "अ‍ॅडमिन",
  },
  hi: {
    contact: "संपर्क करें",
    home: "होम",
    about: "हमारे बारे में",
    products: "उत्पाद",
    services: "सेवाएं",
    search: "खोजें...",
    login: "लॉगिन",
    admin: "एडमिन",
  },
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const t = texts[lang];

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (q === "") return;

    if (pageRoutes[q]) {
      navigate(pageRoutes[q]);
    } else {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Segoe UI',sans-serif;
        }

        .top-bar{
          background:linear-gradient(90deg,#0f766e,#16a34a);
          padding:10px 30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .contact-link{
          color:white;
          text-decoration:none;
          font-size:16px;
          font-weight:600;
        }

        .lang-buttons{
          display:flex;
          gap:10px;
        }

        .lang-buttons button{
          border:none;
          background:white;
          color:#0f766e;
          padding:8px 15px;
          border-radius:20px;
          cursor:pointer;
          font-weight:600;
        }

        .lang-buttons button.active{
          background:#ff7a00;
          color:white;
        }

        .navbar{
          background:white;
          min-height:90px;
          padding:0 30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          box-shadow:0 2px 10px rgba(0,0,0,0.08);
          position:sticky;
          top:0;
          z-index:1000;
        }

        .logo-section{
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .logo{
          width:220px;
          height:70px;
          object-fit:contain;
          display:block;
        }

        .menu{
          display:flex;
          align-items:center;
          gap:35px;
          flex:1;
          justify-content:center;
        }

        .menu a{
          text-decoration:none;
          color:#333;
          font-size:16px;
          font-weight:600;
          transition:0.3s;
        }

        .menu a:hover{
          color:#16a34a;
        }

        .right-section{
          display:flex;
          align-items:center;
          gap:12px;
        }

        .search-box{
          display:flex;
          align-items:center;
          border:2px solid #16a34a;
          border-radius:30px;
          overflow:hidden;
        }

        .search-box input{
          border:none;
          outline:none;
          padding:10px 15px;
          width:180px;
        }

        .search-btn{
          border:none;
          background:#16a34a;
          color:white;
          padding:10px 14px;
          cursor:pointer;
        }

        .login-btn{
          border:none;
          background:#ff7a00;
          color:white;
          padding:10px 18px;
          border-radius:25px;
          cursor:pointer;
          font-weight:bold;
        }

        .admin-btn{
          border:none;
          background:#2563eb;
          color:white;
          padding:10px 18px;
          border-radius:25px;
          cursor:pointer;
          font-weight:bold;
        }

        .hamburger{
          display:none;
          font-size:28px;
          cursor:pointer;
          color:#0f766e;
        }

        @media(max-width:768px){

          .top-bar{
            flex-direction:column;
            gap:10px;
          }

          .menu{
            position:absolute;
            top:90px;
            left:0;
            width:100%;
            background:white;
            flex-direction:column;
            gap:20px;
            padding:20px 0;
            display:none;
            box-shadow:0 5px 10px rgba(0,0,0,0.1);
          }

          .menu.active{
            display:flex;
          }

          .right-section{
            display:none;
          }

          .hamburger{
            display:block;
          }

          .logo{
            width:170px;
            height:55px;
          }

          .navbar{
            padding:0 15px;
          }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <Link to="/contact" className="contact-link">
          {t.contact}
        </Link>

        <div className="lang-buttons">
          <button
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
          >
            English
          </button>
          <button
            className={lang === "mr" ? "active" : ""}
            onClick={() => setLang("mr")}
          >
            Marathi
          </button>
          <button
            className={lang === "hi" ? "active" : ""}
            onClick={() => setLang("hi")}
          >
            Hindi
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo-section">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="logo"
          />
        </div>

        <div className={`menu ${menuOpen ? "active" : ""}`}>
          <Link to="/">{t.home}</Link>
          <Link to="/about">{t.about}</Link>
          <Link to="/products">{t.products}</Link>
          <Link to="/services">{t.services}</Link>
        </div>

        <div className="right-section">

          <div className="search-box">
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          <Link to="/login">
            <button className="login-btn">{t.login}</button>
          </Link>

          <Link to="/admin">
            <button className="admin-btn">{t.admin}</button>
          </Link>

        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </nav>
    </>
  );
}

export default Navbar;