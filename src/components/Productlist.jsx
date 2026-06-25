import React from "react";

function ProductList() {
  return (
    <div style={{ margin: 0, padding: 0 }}>

      {/* VIDEO SECTION */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          width: "95%",
          margin: "auto",
          overflow: "hidden",
          borderRadius: "15px",
          marginTop: "20px"
        }}
      >

        {/* VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px"
          }}
        >

          <source src="/videos/homevideo.mp4" type="video/mp4" />

        </video>


        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center"
          }}
        >

          <h1
            style={{
              fontSize: "35px",
              marginBottom: "10px"
            }}
          >
            Welcome to Organic Farming 🌿
          </h1>


          <p
            style={{
              fontSize: "18px"
            }}
          >
            Fresh Products Direct from Farmers
          </p>


          <button
            style={{
              marginTop: "20px",
              padding: "10px 25px",
              background: "orange",
              border: "none",
              color: "white",
              fontSize: "15px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Get Started
          </button>


        </div>

      </div>

    </div>
  );
}

export default ProductList;