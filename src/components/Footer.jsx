import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>

      <h2 style={styles.title}>
        Kaali Industries
      </h2>

      <p>
        Agricultural solutions for better crop productivity
        and sustainable farming.
      </p>


      <div style={styles.details}>

        <p>
          📞 Phone: 7030056556
        </p>

        <p>
          ✉ Email: nutrient0009@gmail.com
        </p>

        <p>
          📍 C1-303, Sun Empire, Sun City Road,
          Sinhgad Road, Pune - 411051
        </p>

      </div>


      <p style={styles.copyright}>
        © 2026 Kaali Industries. All Rights Reserved.
      </p>

    </footer>
  );
}


const styles = {

footer:{
background:"#222",
color:"#fff",
textAlign:"center",
padding:"25px",
marginTop:"40px"
},


title:{
color:"#4ade80",
marginBottom:"10px"
},


details:{
marginTop:"15px",
fontSize:"14px",
lineHeight:"1.6"
},


copyright:{
marginTop:"15px",
fontSize:"13px",
color:"#ccc"
}

};


export default Footer;