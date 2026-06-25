import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

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
      alert(err.response?.data?.message || "Register Failed");
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
        alert("Login Successful ✅");
        navigate("/user", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h1>{isLogin ? "Welcome Back 👋" : "Create Account ✨"}</h1>
          <p>{isLogin ? "Login to continue shopping" : "Register to start journey"}</p>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>
        <div className="auth-right">
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <input name="username" placeholder="Username" value={loginData.username} onChange={(e) => handleChange(e, "login")} required />
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => handleChange(e, "login")} required />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2>Register</h2>
              <input name="name" placeholder="Name" onChange={(e) => handleChange(e, "register")} required />
              <input name="email" placeholder="Email" onChange={(e) => handleChange(e, "register")} required />
              <input name="mobile" placeholder="Mobile" onChange={(e) => handleChange(e, "register")} required />
              <input name="address" placeholder="Address" onChange={(e) => handleChange(e, "register")} required />
              <input name="username" placeholder="Username" onChange={(e) => handleChange(e, "register")} required />
              <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e, "register")} required />
              <button type="submit">Register</button>
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
