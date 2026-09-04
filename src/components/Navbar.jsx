// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { C, FONT_DISPLAY, FONT_BODY, Icon, useKaaliFonts } from "../theme/KaaliUI";

const pageRoutes = {
  home: "/",
  about: "/about",
  products: "/products",
  services: "/services",
  contact: "/contact",
};

const texts = {
  en: { contact: "Contact Us", home: "Home", about: "About", products: "Products", services: "Services", search: "Search products, pages...", login: "Login", admin: "Admin" },
  mr: { contact: "संपर्क करा", home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", products: "उत्पादने", services: "सेवा", search: "उत्पादने, पाने शोधा...", login: "लॉगिन", admin: "अ‍ॅडमिन" },
  hi: { contact: "संपर्क करें", home: "होम", about: "हमारे बारे में", products: "उत्पाद", services: "सेवाएं", search: "उत्पाद, पेज खोजें...", login: "लॉगिन", admin: "एडमिन" },
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang } = useLanguage();
  const t = texts[lang];
  useKaaliFonts();

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (q === "") return;
    if (pageRoutes[q]) navigate(pageRoutes[q]);
    else navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setMenuOpen(false);
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();
  const isActive = (path) => (path === "/" ? location.pathname === "/" : location.pathname.startsWith(path));

  const navLinks = [
    { to: "/", label: t.home },
    { to: "/about", label: t.about },
    { to: "/products", label: t.products },
    { to: "/services", label: t.services },
  ];

  return (
    <>
      <style>{navCss}</style>

      {/* Top strip */}
      <div className="ki-nav-topbar">
        <Link to="/contact" className="ki-nav-contact ki-link">
          <Icon.Phone style={{ width: 13, height: 13 }} />
          <span>{t.contact}</span>
        </Link>

        <div className="ki-nav-langs">
          {[
            ["en", "English"],
            ["mr", "मराठी"],
            ["hi", "हिंदी"],
          ].map(([code, label]) => (
            <button
              key={code}
              className={`ki-nav-lang-btn ki-btn${lang === code ? " active" : ""}`}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav className="ki-navbar">
        <Link to="/" className="ki-nav-brand" onClick={() => setMenuOpen(false)}>
          <span className="ki-nav-brand-mark">
            <Icon.Sprout style={{ width: 20, height: 20, color: "#fff" }} />
          </span>
          <span className="ki-nav-brand-text">
            <span className="ki-nav-brand-name">Kaali Industries</span>
            <span className="ki-nav-brand-tag">Agricultural Solutions</span>
          </span>
        </Link>

        <div className={`ki-nav-links${menuOpen ? " open" : ""}`}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`ki-link${isActive(l.to) ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {/* Search + actions collapse into the mobile menu too */}
          <div className="ki-nav-mobile-extra">
            <div className="ki-nav-search">
              <input
                className="ki-input"
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="ki-nav-search-btn ki-btn" onClick={handleSearch} aria-label={t.search}>
                <Icon.Search style={{ width: 16, height: 16 }} />
              </button>
            </div>
            <div className="ki-nav-mobile-actions">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="ki-nav-btn ki-nav-btn--gold ki-btn">{t.login}</button>
              </Link>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                <button className="ki-nav-btn ki-nav-btn--forest ki-btn">{t.admin}</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="ki-nav-right">
          <div className="ki-nav-search">
            <input
              className="ki-input"
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="ki-nav-search-btn ki-btn" onClick={handleSearch} aria-label={t.search}>
              <Icon.Search style={{ width: 16, height: 16 }} />
            </button>
          </div>

          <Link to="/login">
            <button className="ki-nav-btn ki-nav-btn--gold ki-btn">{t.login}</button>
          </Link>
          <Link to="/admin">
            <button className="ki-nav-btn ki-nav-btn--forest ki-btn">{t.admin}</button>
          </Link>
        </div>

        <button
          className="ki-nav-hamburger ki-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <Icon.Close style={{ width: 24, height: 24 }} /> : <Icon.Menu style={{ width: 24, height: 24 }} />}
        </button>
      </nav>
    </>
  );
}

const navCss = `
  .ki-nav-topbar {
    background: linear-gradient(90deg, ${C.forestDark}, ${C.forest});
    padding: 8px 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ${FONT_BODY};
    flex-wrap: wrap;
    gap: 8px;
  }
  .ki-nav-contact {
    display: inline-flex; align-items: center; gap: 7px;
    color: rgba(255,255,255,0.92); font-size: 13px; font-weight: 600;
  }
  .ki-nav-contact::after { background: ${C.gold}; }
  .ki-nav-langs { display: flex; gap: 6px; }
  .ki-nav-lang-btn {
    border: 1px solid rgba(255,255,255,0.25); background: transparent; color: rgba(255,255,255,0.85);
    padding: 5px 13px; border-radius: 999px; font-size: 12.5px; font-weight: 600; font-family: ${FONT_BODY};
  }
  .ki-nav-lang-btn:hover { border-color: ${C.gold}; color: #fff; }
  .ki-nav-lang-btn.active { background: ${C.gold}; border-color: ${C.gold}; color: ${C.forestDark}; }

  .ki-navbar {
    background: ${C.parchment};
    min-height: 84px;
    padding: 10px 6%;
    display: flex;
    align-items: center;
    gap: 28px;
    box-shadow: 0 2px 14px rgba(27,67,50,0.08);
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid ${C.line};
  }

  .ki-nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
  .ki-nav-brand-mark {
    width: 42px; height: 42px; border-radius: 11px; background: ${C.forest};
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ki-nav-brand-text { display: flex; flex-direction: column; line-height: 1.15; }
  .ki-nav-brand-name { font-family: ${FONT_DISPLAY}; font-weight: 600; font-size: 20px; color: ${C.forest}; }
  .ki-nav-brand-tag { font-family: ${FONT_BODY}; font-size: 11px; letter-spacing: 0.05em; color: ${C.inkSoft}; }

  .ki-nav-links { display: flex; align-items: center; gap: 30px; flex: 1; }
  .ki-nav-links > .ki-link { color: ${C.ink}; font-family: ${FONT_BODY}; font-size: 15px; font-weight: 600; }
  .ki-nav-links > .ki-link.active { color: ${C.forest}; }
  .ki-nav-mobile-extra { display: none; }

  .ki-nav-right { display: flex; align-items: center; gap: 14px; }
  .ki-nav-search {
    display: flex; align-items: center; border: 1.5px solid ${C.line}; background: #fff;
    border-radius: 999px; overflow: hidden;
  }
  .ki-nav-search:focus-within { border-color: ${C.crop}; }
  .ki-input {
    border: none; outline: none; padding: 9px 4px 9px 16px; width: 190px; font-family: ${FONT_BODY};
    font-size: 13.5px; color: ${C.ink}; background: transparent;
  }
  .ki-nav-search-btn { border: none; background: ${C.forest}; color: #fff; padding: 9px 14px; display: flex; }
  .ki-nav-search-btn:hover { background: ${C.forestDark}; }

  .ki-nav-btn { border: none; padding: 10px 20px; border-radius: 999px; font-weight: 700; font-family: ${FONT_BODY}; font-size: 13.5px; }
  .ki-nav-btn--gold { background: transparent; color: ${C.soil}; border: 1.5px solid ${C.soilSoft}; }
  .ki-nav-btn--gold:hover { background: ${C.gold}; border-color: ${C.gold}; color: #fff; }
  .ki-nav-btn--forest { background: ${C.forest}; color: #fff; }
  .ki-nav-btn--forest:hover { background: ${C.forestDark}; box-shadow: 0 8px 18px rgba(27,67,50,0.28); }

  .ki-nav-hamburger { display: none; border: none; background: transparent; color: ${C.forest}; padding: 4px; }

  @media (max-width: 900px) {
    .ki-nav-links {
      position: absolute; top: 84px; left: 0; width: 100%; background: ${C.parchment};
      flex-direction: column; align-items: flex-start; gap: 18px; padding: 22px 6% 26px;
      display: none; box-shadow: 0 12px 24px rgba(27,67,50,0.12); border-bottom: 1px solid ${C.line};
    }
    .ki-nav-links.open { display: flex; }
    .ki-nav-right { display: none; }
    .ki-nav-hamburger { display: flex; margin-left: auto; }
    .ki-nav-mobile-extra { display: flex; flex-direction: column; gap: 14px; width: 100%; }
    .ki-nav-mobile-extra .ki-nav-search { width: 100%; }
    .ki-nav-mobile-extra .ki-input { width: 100%; }
    .ki-nav-mobile-actions { display: flex; gap: 10px; }
    .ki-nav-mobile-actions a { flex: 1; }
    .ki-nav-mobile-actions button { width: 100%; }
    .ki-nav-brand-tag { display: none; }
  }
`;

export default Navbar;