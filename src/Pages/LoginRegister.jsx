// src/Pages/LoginRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import { useLanguage } from "../context/LanguageContext";
import { C, FONT_DISPLAY, FONT_BODY, Icon, useKaaliFonts, kaaliGlobalCss } from "../theme/KaaliUI";

const texts = {
  en: {
    badge: "Trusted Agricultural Partner",
    welcomeBack: "Welcome Back",
    createAccountTitle: "Create Your Account",
    loginSubtitle: "Login to continue shopping quality agri-inputs.",
    registerSubtitle: "Register to start your farming journey with us.",
    createAccountBtn: "Create Account",
    loginBtn: "Login",
    loginHeading: "Login",
    registerHeading: "Register",
    username: "Username",
    password: "Password",
    name: "Name",
    email: "Email",
    mobile: "Mobile",
    address: "Address",
    loginSuccess: "Login Successful",
    registerFail: "Register Failed",
    loginFail: "Login Failed",
    switchToRegister: "New here? Create an account",
    switchToLogin: "Already have an account? Login",
  },
  mr: {
    badge: "विश्वासार्ह कृषी भागीदार",
    welcomeBack: "पुन्हा स्वागत आहे",
    createAccountTitle: "तुमचे खाते तयार करा",
    loginSubtitle: "दर्जेदार कृषी उत्पादने खरेदी करण्यासाठी लॉगिन करा.",
    registerSubtitle: "आमच्यासोबत शेती प्रवास सुरू करण्यासाठी नोंदणी करा.",
    createAccountBtn: "खाते तयार करा",
    loginBtn: "लॉगिन",
    loginHeading: "लॉगिन",
    registerHeading: "नोंदणी",
    username: "युजरनेम",
    password: "पासवर्ड",
    name: "नाव",
    email: "ईमेल",
    mobile: "मोबाईल",
    address: "पत्ता",
    loginSuccess: "लॉगिन यशस्वी",
    registerFail: "नोंदणी अयशस्वी",
    loginFail: "लॉगिन अयशस्वी",
    switchToRegister: "नवीन आहात? खाते तयार करा",
    switchToLogin: "आधीच खाते आहे? लॉगिन करा",
  },
  hi: {
    badge: "विश्वसनीय कृषि साझेदार",
    welcomeBack: "वापस स्वागत है",
    createAccountTitle: "अपना खाता बनाएं",
    loginSubtitle: "गुणवत्तापूर्ण कृषि उत्पाद खरीदने के लिए लॉगिन करें।",
    registerSubtitle: "हमारे साथ खेती की यात्रा शुरू करने के लिए रजिस्टर करें।",
    createAccountBtn: "खाता बनाएं",
    loginBtn: "लॉगिन",
    loginHeading: "लॉगिन",
    registerHeading: "रजिस्टर",
    username: "यूज़रनेम",
    password: "पासवर्ड",
    name: "नाम",
    email: "ईमेल",
    mobile: "मोबाइल",
    address: "पता",
    loginSuccess: "लॉगिन सफल",
    registerFail: "रजिस्ट्रेशन विफल",
    loginFail: "लॉगिन विफल",
    switchToRegister: "नए हैं? खाता बनाएं",
    switchToLogin: "पहले से खाता है? लॉगिन करें",
  },
};

function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { lang } = useLanguage();
  const t = texts[lang];
  useKaaliFonts();

  const [registerData, setRegisterData] = useState({
    name: "", email: "", mobile: "", address: "", username: "", password: ""
  });
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleChange = (e, type) => {
    if (type === "login") setLoginData({ ...loginData, [e.target.name]: e.target.value });
    else setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/register`, registerData);
      alert(res.data.message);
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || t.registerFail);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, loginData);
      if (res.data.success) {
        const farmer = {
          id: res.data.farmer.id,
          farmer_id: res.data.farmer.id,
          name: res.data.farmer.name,
          email: res.data.farmer.email,
          mobile: res.data.farmer.mobile,
          address: res.data.farmer.address,
          username: res.data.farmer.username,
        };
        localStorage.setItem("farmer", JSON.stringify(farmer));
        alert(t.loginSuccess);
        navigate("/user", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || t.loginFail);
    }
  };

  return (
    <>
      <style>{kaaliGlobalCss}</style>
      <style>{authCss}</style>
      <div className="ki-auth-page">
        <div className="ki-blob ki-blob--gold" aria-hidden="true" />
        <div className="ki-blob ki-blob--crop" aria-hidden="true" />

        <div className="ki-auth-box">
          {/* Brand side */}
          <div className="ki-auth-left">
            <div className="ki-auth-mark">
              <Icon.Sprout style={{ width: 26, height: 26, color: "#fff" }} />
            </div>
            <div className="ki-auth-eyebrow">{t.badge}</div>
            <h1 className="ki-auth-heading">{isLogin ? t.welcomeBack : t.createAccountTitle}</h1>
            <p className="ki-auth-sub">{isLogin ? t.loginSubtitle : t.registerSubtitle}</p>
            <button className="ki-auth-switch ki-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? t.switchToRegister : t.switchToLogin}
            </button>
          </div>

          {/* Form side */}
          <div className="ki-auth-right">
            {isLogin ? (
              <form onSubmit={handleLogin} className="ki-auth-form">
                <h2 className="ki-auth-form-heading">{t.loginHeading}</h2>
                <label className="ki-auth-label">{t.username}</label>
                <input
                  className="ki-auth-input"
                  name="username"
                  placeholder={t.username}
                  value={loginData.username}
                  onChange={(e) => handleChange(e, "login")}
                  required
                />
                <label className="ki-auth-label">{t.password}</label>
                <input
                  className="ki-auth-input"
                  type="password"
                  name="password"
                  placeholder={t.password}
                  value={loginData.password}
                  onChange={(e) => handleChange(e, "login")}
                  required
                />
                <button type="submit" className="ki-auth-submit ki-btn">{t.loginBtn}</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="ki-auth-form">
                <h2 className="ki-auth-form-heading">{t.registerHeading}</h2>
                <div className="ki-auth-grid">
                  <div>
                    <label className="ki-auth-label">{t.name}</label>
                    <input className="ki-auth-input" name="name" placeholder={t.name} onChange={(e) => handleChange(e, "register")} required />
                  </div>
                  <div>
                    <label className="ki-auth-label">{t.email}</label>
                    <input className="ki-auth-input" name="email" placeholder={t.email} onChange={(e) => handleChange(e, "register")} required />
                  </div>
                  <div>
                    <label className="ki-auth-label">{t.mobile}</label>
                    <input className="ki-auth-input" name="mobile" placeholder={t.mobile} onChange={(e) => handleChange(e, "register")} required />
                  </div>
                  <div>
                    <label className="ki-auth-label">{t.username}</label>
                    <input className="ki-auth-input" name="username" placeholder={t.username} onChange={(e) => handleChange(e, "register")} required />
                  </div>
                </div>
                <label className="ki-auth-label">{t.address}</label>
                <input className="ki-auth-input" name="address" placeholder={t.address} onChange={(e) => handleChange(e, "register")} required />
                <label className="ki-auth-label">{t.password}</label>
                <input className="ki-auth-input" type="password" name="password" placeholder={t.password} onChange={(e) => handleChange(e, "register")} required />
                <button type="submit" className="ki-auth-submit ki-btn">{t.registerHeading}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const authCss = `
  .ki-auth-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 16px;
    background: ${C.parchment};
    overflow: hidden;
    font-family: ${FONT_BODY};
  }
  .ki-auth-box {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 900px;
    min-height: 540px;
    display: flex;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(27,67,50,0.16);
    border: 1px solid ${C.line};
  }
  .ki-auth-left {
    width: 40%;
    background: linear-gradient(160deg, ${C.forest}, ${C.forestDark});
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 44px 34px;
  }
  .ki-auth-mark {
    width: 48px; height: 48px; border-radius: 12px;
    background: rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 22px;
  }
  .ki-auth-eyebrow {
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${C.gold}; margin-bottom: 14px;
  }
  .ki-auth-heading {
    font-family: ${FONT_DISPLAY}; font-weight: 600; font-size: 30px; line-height: 1.18;
    margin-bottom: 14px;
  }
  .ki-auth-sub { font-size: 14.5px; line-height: 1.65; color: rgba(255,255,255,0.78); margin-bottom: 30px; }
  .ki-auth-switch {
    align-self: flex-start; background: transparent; border: 1.5px solid ${C.gold};
    color: ${C.gold}; padding: 11px 20px; border-radius: 999px; font-weight: 700; font-size: 13.5px;
  }
  .ki-auth-switch:hover { background: ${C.gold}; color: ${C.forestDark}; }

  .ki-auth-right { width: 60%; padding: 44px 40px; display: flex; align-items: center; }
  .ki-auth-form { display: flex; flex-direction: column; width: 100%; }
  .ki-auth-form-heading {
    font-family: ${FONT_DISPLAY}; font-weight: 600; font-size: 24px; color: ${C.forest}; margin-bottom: 18px;
  }
  .ki-auth-label {
    font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: ${C.inkSoft};
    margin: 10px 0 6px;
  }
  .ki-auth-input {
    padding: 12px 14px; border-radius: 10px; border: 1.5px solid ${C.line};
    font-family: ${FONT_BODY}; font-size: 14.5px; color: ${C.ink}; outline: none;
    transition: border-color 0.2s ease;
  }
  .ki-auth-input:focus { border-color: ${C.crop}; }
  .ki-auth-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
  .ki-auth-submit {
    margin-top: 22px; padding: 13px; border: none; border-radius: 999px;
    background: ${C.gold}; color: #fff; font-weight: 700; font-size: 15px;
  }
  .ki-auth-submit:hover { background: ${C.goldDark}; box-shadow: 0 10px 22px rgba(223,164,59,0.35); }

  @media (max-width: 760px) {
    .ki-auth-box { flex-direction: column; min-height: auto; }
    .ki-auth-left, .ki-auth-right { width: 100%; }
    .ki-auth-right { padding: 34px 26px 40px; }
    .ki-auth-grid { grid-template-columns: 1fr; }
  }
`;

export default LoginRegister;