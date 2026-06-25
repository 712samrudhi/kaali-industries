import React, { useState } from "react";
import Footer from "../../components/Footer";

function UserProfile() {

  const storedUser = JSON.parse(localStorage.getItem("farmer")) || {};

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);

  const firstLetter = user.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  // INPUT CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE PROFILE
  const handleSave = () => {
    localStorage.setItem("farmer", JSON.stringify(user));
    setEditMode(false);
    alert("Profile Updated Successfully ✅");
  };

  return (
    <>
      {/* ❌ REMOVED UserNavbar (IMPORTANT FIX) */}

      <div style={styles.container}>

        <div style={styles.card}>

          {/* AVATAR */}
          <div style={styles.avatar}>
            {firstLetter}
          </div>

          <div style={styles.idBox}>
           Farmer ID : {user.farmer_id || user.id || "N/A"}
          </div>

          {/* VIEW MODE */}
          {!editMode ? (
            <>
              <h1 style={styles.name}>{user.name}</h1>

              <p style={styles.info}><b>Email :</b> {user.email}</p>
              <p style={styles.info}><b>Mobile :</b> {user.mobile}</p>
              <p style={styles.info}><b>Address :</b> {user.address}</p>
              <p style={styles.info}><b>Username :</b> {user.username}</p>

              <button
                style={styles.button}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* EDIT MODE */}
              <input style={styles.input} name="name" value={user.name || ""} onChange={handleChange} placeholder="Name" />
              <input style={styles.input} name="email" value={user.email || ""} onChange={handleChange} placeholder="Email" />
              <input style={styles.input} name="mobile" value={user.mobile || ""} onChange={handleChange} placeholder="Mobile" />
              <input style={styles.input} name="address" value={user.address || ""} onChange={handleChange} placeholder="Address" />
              <input style={styles.input} name="username" value={user.username || ""} onChange={handleChange} placeholder="Username" />

              <button style={styles.button} onClick={handleSave}>
                Save Profile
              </button>

              <button style={styles.cancelBtn} onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default UserProfile;

/* ================= STYLES ================= */

const styles = {

  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "450px",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  avatar: {
    width: "120px",
    height: "120px",
    margin: "0 auto 20px auto",
    borderRadius: "50%",
    background: "#2e7d32",
    color: "white",
    fontSize: "50px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  idBox: {
    background: "#2e7d32",
    color: "#fff",
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "20px",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  name: {
    color: "#2e7d32",
    marginBottom: "20px",
    fontSize: "32px",
  },

  info: {
    fontSize: "16px",
    marginBottom: "14px",
    color: "#444",
    textAlign: "left",
    background: "#f7f7f7",
    padding: "14px",
    borderRadius: "10px",
    borderLeft: "5px solid #2e7d32",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    marginTop: "15px",
    width: "100%",
    padding: "14px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancelBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};