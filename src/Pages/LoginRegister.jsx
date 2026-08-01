import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    welcomeBack: "Welcome Back 👋",
    createAccountTitle: "Create Account ✨",
    loginSubtitle: "Login to continue shopping",
    registerSubtitle: "Register to start journey",
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
    welcomeBack: "पुन्हा स्वागत आहे 👋",
    createAccountTitle: "खाते तयार करा ✨",
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
    welcomeBack: "वापस स्वागत है 👋",
    createAccountTitle: "खाता बनाएं ✨",
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
        .auth-container { height:100vh; display:flex; justify-content:center; align-items:center; background:linear-gradient(135deg,#11998e,#38ef7d); font-family:Arial; }
        .auth-box { width:850px; height:520px; display:flex; background:white; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px #0003; }
        .auth-left { width:40%; background:linear-gradient(135deg,#11998e,#38ef7d); color:white; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:20px; text-align:center; }
        .auth-right { width:60%; padding:40px; display:flex; justify-content:center; flex-direction:column; }
        form { display:flex; flex-direction:column; }
        input { padding:12px; margin:8px 0; border-radius:8px; border:1px solid #ccc; }
        button { padding:12px; margin-top:10px; border:none; border-radius:8px; background:#11998e; color:white; cursor:pointer; font-weight:bold; }
        .auth-left button { background:white; color:#11998e; }
        h2 { color:#11998e; }
        @media(max-width:900px) { .auth-box { flex-direction:column; width:90%; height:auto; } .auth-left,.auth-right { width:100%; } }
      `}</style>
    </div>
  );
}

export default LoginRegister;