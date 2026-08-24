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
          background:#0E2B20;
          padding:9px 30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          border-bottom: 1px solid rgba(201,162,75,0.25);
        }

        .contact-link{
          color:#EFEAD9;
          text-decoration:none;
          font-size:14px;
          font-weight:600;
          letter-spacing:0.5px;
          transition: color 0.25s ease;
        }

        .contact-link:hover{
          color:#C9A24B;
        }

        .lang-buttons{
          display:flex;
          gap:8px;
        }

        .lang-buttons button{
          border:1px solid rgba(201,162,75,0.4);
          background:transparent;
          color:#C9D6CD;
          padding:6px 14px;
          border-radius:20px;
          cursor:pointer;
          font-weight:600;
          font-size:13px;
          transition: all 0.25s ease;
        }

        .lang-buttons button:hover{
          border-color:#C9A24B;
          color:#C9A24B;
        }

        .lang-buttons button.active{
          background:#C9A24B;
          color:#0E2B20;
          border-color:#C9A24B;
        }

        .navbar{
          background:#F6F3EA;
          min-height:88px;
          padding:0 30px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          box-shadow:0 2px 14px rgba(23,63,46,0.08);
          position:sticky;
          top:0;
          z-index:1000;
          border-bottom: 1px solid #E7E2D3;
        }

        .logo-section{
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .logo{
          width:210px;
          height:66px;
          object-fit:contain;
          display:block;
        }

        .menu{
          display:flex;
          align-items:center;
          gap:38px;
          flex:1;
          justify-content:center;
        }

        .menu a{
          position:relative;
          text-decoration:none;
          color:#173F2E;
          font-size:15px;
          font-weight:600;
          letter-spacing:0.3px;
          padding: 6px 2px;
          transition:color 0.25s ease;
        }

        .menu a::after{
          content:"";
          position:absolute;
          left:0;
          bottom:0;
          width:0%;
          height:2px;
          background:#C9A24B;
          transition:width 0.25s ease;
        }

        .menu a:hover{
          color:#C9A24B;
        }

        .menu a:hover::after{
          width:100%;
        }

        .right-section{
          display:flex;
          align-items:center;
          gap:12px;
        }

        .search-box{
          display:flex;
          align-items:center;
          border:2px solid #4C7A5D;
          border-radius:30px;
          overflow:hidden;
          background:#fff;
          transition: border-color 0.25s ease;
        }

        .search-box:focus-within{
          border-color:#C9A24B;
        }

        .search-box input{
          border:none;
          outline:none;
          padding:9px 15px;
          width:170px;
          background:transparent;
          font-size:14px;
        }

        .search-btn{
          border:none;
          background:#173F2E;
          color:#C9A24B;
          padding:10px 14px;
          cursor:pointer;
          transition: background 0.25s ease;
        }

        .search-btn:hover{
          background:#0E2B20;
        }

        .login-btn{
          border:2px solid #173F2E;
          background:transparent;
          color:#173F2E;
          padding:9px 20px;
          border-radius:25px;
          cursor:pointer;
          font-weight:700;
          font-size:14px;
          transition: all 0.25s ease;
        }

        .login-btn:hover{
          background:#173F2E;
          color:#fff;
        }

        .admin-btn{
          border:none;
          background:#C9A24B;
          color:#0E2B20;
          padding:10px 20px;
          border-radius:25px;
          cursor:pointer;
          font-weight:700;
          font-size:14px;
          transition: all 0.25s ease;
        }

        .admin-btn:hover{
          background:#b8913f;
          transform: translateY(-1px);
        }

        .hamburger{
          display:none;
          font-size:26px;
          cursor:pointer;
          color:#173F2E;
        }

        @media(max-width:768px){

          .top-bar{
            flex-direction:column;
            gap:10px;
          }

          .menu{
            position:absolute;
            top:88px;
            left:0;
            width:100%;
            background:#F6F3EA;
            flex-direction:column;
            gap:20px;
            padding:24px 0;
            display:none;
            box-shadow:0 8px 20px rgba(23,63,46,0.12);
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
            width:160px;
            height:50px;
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