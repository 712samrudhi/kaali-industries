import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    eyebrow: "Borgave Industries",
    welcomeBack: "Welcome Back",
    createAccountTitle: "Create Account",
    loginSubtitle: "Login to continue shopping",
    registerSubtitle: "Register to start your journey",
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
    loginSuccess: "Login Successful ✅",
    registerFail: "Register Failed",
    loginFail: "Login Failed",
  },
  mr: {
    eyebrow: "बोरगावे इंडस्ट्रीज",
    welcomeBack: "पुन्हा स्वागत आहे",
    createAccountTitle: "खाते तयार करा",
    loginSubtitle: "खरेदी सुरू ठेवण्यासाठी लॉगिन करा",
    registerSubtitle: "प्रवास सुरू करण्यासाठी नोंदणी करा",
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
    loginSuccess: "लॉगिन यशस्वी ✅",
    registerFail: "नोंदणी अयशस्वी",
    loginFail: "लॉगिन अयशस्वी",
  },
  hi: {
    eyebrow: "बोरगावे इंडस्ट्रीज",
    welcomeBack: "वापस स्वागत है",
    createAccountTitle: "खाता बनाएं",
    loginSubtitle: "खरीदारी जारी रखने के लिए लॉगिन करें",
    registerSubtitle: "यात्रा शुरू करने के लिए रजिस्टर करें",
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
    loginSuccess: "लॉगिन सफल ✅",
    registerFail: "रजिस्ट्रेशन विफल",
    loginFail: "लॉगिन विफल",
  },
};

function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { lang } = useLanguage();
  const t = texts[lang];

  const [registerData, setRegisterData] = useState({
    name: "", email: "", mobile: "", address: "", username: "", password: ""
  });

  const [loginData, setLoginData] = useState({
    username: "", password: ""
  });

  const handleChange = (e, type) => {
    if (type === "login") {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
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
          username: res.data.farmer.username
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
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <span className="auth-eyebrow">{t.eyebrow}</span>
          <div className="auth-emoji">🌿</div>
          <h1>{isLogin ? t.welcomeBack : t.createAccountTitle}</h1>
          <p>{isLogin ? t.loginSubtitle : t.registerSubtitle}</p>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t.createAccountBtn : t.loginBtn}
          </button>
        </div>
        <div className="auth-right">
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <h2>{t.loginHeading}</h2>
              <input name="username" placeholder={t.username} value={loginData.username} onChange={(e) => handleChange(e, "login")} required />
              <input type="password" name="password" placeholder={t.password} value={loginData.password} onChange={(e) => handleChange(e, "login")} required />
              <button type="submit">{t.loginBtn}</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2>{t.registerHeading}</h2>
              <input name="name" placeholder={t.name} onChange={(e) => handleChange(e, "register")} required />
              <input name="email" placeholder={t.email} onChange={(e) => handleChange(e, "register")} required />
              <input name="mobile" placeholder={t.mobile} onChange={(e) => handleChange(e, "register")} required />
              <input name="address" placeholder={t.address} onChange={(e) => handleChange(e, "register")} required />
              <input name="username" placeholder={t.username} onChange={(e) => handleChange(e, "register")} required />
              <input type="password" name="password" placeholder={t.password} onChange={(e) => handleChange(e, "register")} required />
              <button type="submit">{t.registerHeading}</button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #F6F3EA;
          font-family: 'Segoe UI', Arial, sans-serif;
          padding: 30px 16px;
        }

        .auth-box {
          width: 880px;
          min-height: 540px;
          display: flex;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(23,63,46,0.18);
          border: 1px solid #E7E2D3;
        }

        .auth-left {
          position: relative;
          width: 42%;
          background: linear-gradient(160deg, #173F2E 0%, #0E2B20 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 30px;
          text-align: center;
          overflow: hidden;
        }

        .auth-left::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4C7A5D, #C9A24B);
        }

        .auth-eyebrow {
          display: inline-block;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-size: 11.5px;
          font-weight: 700;
          color: #C9A24B;
          border: 1px solid #C9A24B;
          border-radius: 999px;
          padding: 5px 14px;
          margin-bottom: 18px;
        }

        .auth-emoji {
          font-size: 44px;
          margin-bottom: 6px;
        }

        .auth-left h1 {
          font-size: 26px;
          font-weight: 800;
          margin: 6px 0 10px;
        }

        .auth-left p {
          color: #C9D6CD;
          font-size: 14.5px;
          line-height: 1.5;
          max-width: 260px;
        }

        .auth-left button {
          margin-top: 26px;
          padding: 12px 26px;
          border: 2px solid #C9A24B;
          border-radius: 999px;
          background: transparent;
          color: #C9A24B;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.3px;
          transition: all 0.25s ease;
        }

        .auth-left button:hover {
          background: #C9A24B;
          color: #0E2B20;
          transform: translateY(-2px);
        }

        .auth-right {
          width: 58%;
          padding: 48px 46px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }

        .auth-right h2 {
          color: #173F2E;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input {
          padding: 13px 16px;
          margin: 7px 0;
          border-radius: 10px;
          border: 1px solid #E0DBC9;
          font-size: 14.5px;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          font-family: inherit;
        }

        input:focus {
          border-color: #C9A24B;
          box-shadow: 0 0 0 3px rgba(201,162,75,0.18);
        }

        .auth-right button {
          padding: 13px;
          margin-top: 14px;
          border: none;
          border-radius: 10px;
          background: #173F2E;
          color: #fff;
          cursor: pointer;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.3px;
          transition: all 0.25s ease;
        }

        .auth-right button:hover {
          background: #C9A24B;
          color: #0E2B20;
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .auth-box { flex-direction: column; width: 100%; max-width: 440px; height: auto; }
          .auth-left, .auth-right { width: 100%; }
          .auth-right { padding: 34px 30px; }
        }
      `}</style>
    </div>
  );
}

export default LoginRegister;