import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${BASE_URL}/admin/login`,
        {
          email,
          password
        }
      );

      alert(res.data.message);

      if (res.data.success) {

        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        );

        navigate("/admin/dashboard");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.loginBox}>

        <h1 style={styles.heading}>
          Admin Login
        </h1>

        <form onSubmit={handleLogin} style={styles.form}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

// ================= STYLES =================

const styles = {

  container: {
    width: "100%",
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: "linear-gradient(to right, #11998e, #38ef7d)"
  },

  loginBox: {
    width: "380px",

    background: "#fff",

    padding: "40px",

    borderRadius: "15px",

    boxShadow: "0 0 20px rgba(0,0,0,0.2)",

    textAlign: "center"
  },

  heading: {
    marginBottom: "30px",
    color: "#11998e",
    fontSize: "32px"
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },

  input: {
    padding: "14px",
    marginBottom: "20px",

    border: "1px solid #ccc",
    borderRadius: "8px",

    fontSize: "16px",
    outline: "none"
  },

  button: {
    padding: "14px",

    border: "none",
    borderRadius: "8px",

    background: "#11998e",

    color: "white",

    fontSize: "18px",
    fontWeight: "bold",

    cursor: "pointer"
  }
};

export default AdminLogin;
