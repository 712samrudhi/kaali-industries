// src/Pages/About.jsx

import React from "react";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    heading: "Kaali Industries",
    para1: "At Kaali Industries, we are committed to delivering high-quality agricultural solutions that help farmers improve crop productivity, soil health, and sustainable farming practices. Our company specializes in the manufacturing and supply of advanced fertilizers, bio-fertilizers, micronutrients, plant growth promoters, and agricultural input products designed to meet the evolving needs of modern agriculture.",
    para2: "With a strong focus on quality, innovation, and farmer satisfaction, we aim to provide scientifically developed formulations that enhance crop performance and support long-term agricultural growth.",
    para3: "Our production processes follow strict quality standards, ensuring reliable and effective products for every farming condition. Through continuous research, modern technology, and customer-focused service, we strive to become a trusted name in the agricultural industry.",
    missionHeading: "Our Mission",
    mission: "To empower farmers with innovative and high-performance agricultural products that improve productivity, profitability, and sustainability.",
    visionHeading: "Our Vision",
    vision: "To become a leading agricultural solutions company recognized for quality, innovation, and commitment to modern farming.",
    productRangeHeading: "Our Product Range",
    products: ["Insecticide", "Pesticide", "Herbicide", "Plant Growth Promoters", "Seeds Production & Processing"],
    whyChooseHeading: "Why Choose Us",
    whyChoose: ["Premium Quality Products", "Advanced Manufacturing Processes", "Scientifically Developed Formulations", "Farmer-Centric Approach", "Strict Quality Control", "Sustainable Agricultural Solutions"],
    detailsHeading: "Details",
    companyName: "Kaali Industries",
    phoneLabel: "Phone Number",
    emailLabel: "Email",
    addressLabel: "Office Address",
    address: "C1-303, Sun Empire, Sun City Road, Sinhgad Road, Pune - 411051",
  },
  mr: {
    heading: "काली इंडस्ट्रीज",
    para1: "काली इंडस्ट्रीजमध्ये, आम्ही शेतकऱ्यांना पीक उत्पादकता, मातीचे आरोग्य आणि शाश्वत शेती पद्धती सुधारण्यास मदत करणारे उच्च-गुणवत्तेचे कृषी उपाय पुरवण्यास कटिबद्ध आहोत. आमची कंपनी आधुनिक शेतीच्या बदलत्या गरजा पूर्ण करण्यासाठी डिझाइन केलेली प्रगत खते, जैव-खते, सूक्ष्म पोषक तत्वे, वनस्पती वाढ प्रवर्तक आणि कृषी निविष्ठा उत्पादनांच्या निर्मिती आणि पुरवठ्यात विशेष कौशल्य आहे.",
    para2: "गुणवत्ता, नवोपक्रम आणि शेतकऱ्यांच्या समाधानावर मजबूत लक्ष केंद्रित करून, आम्ही पिकाची कामगिरी वाढवणारी आणि दीर्घकालीन कृषी वाढीला आधार देणारी वैज्ञानिकदृष्ट्या विकसित फॉर्म्युलेशन्स पुरवण्याचे उद्दिष्ट ठेवतो.",
    para3: "आमच्या उत्पादन प्रक्रिया कठोर गुणवत्ता मानकांचे पालन करतात, ज्यामुळे प्रत्येक शेती परिस्थितीसाठी विश्वासार्ह आणि प्रभावी उत्पादने सुनिश्चित होतात. सतत संशोधन, आधुनिक तंत्रज्ञान आणि ग्राहक-केंद्रित सेवेद्वारे, आम्ही कृषी उद्योगात एक विश्वासार्ह नाव बनण्याचा प्रयत्न करतो.",
    missionHeading: "आमचे ध्येय",
    mission: "उत्पादकता, नफा आणि शाश्वतता सुधारणाऱ्या नाविन्यपूर्ण आणि उच्च-कार्यक्षम कृषी उत्पादनांसह शेतकऱ्यांना सक्षम करणे.",
    visionHeading: "आमची दृष्टी",
    vision: "गुणवत्ता, नवोपक्रम आणि आधुनिक शेतीसाठी वचनबद्धतेसाठी ओळखली जाणारी अग्रगण्य कृषी उपाय कंपनी बनणे.",
    productRangeHeading: "आमची उत्पादन श्रेणी",
    products: ["कीटकनाशक", "कीडनाशक", "तणनाशक", "वनस्पती वाढ प्रवर्तक", "बियाणे उत्पादन आणि प्रक्रिया"],
    whyChooseHeading: "आम्हाला का निवडावे",
    whyChoose: ["प्रीमियम गुणवत्तेची उत्पादने", "प्रगत उत्पादन प्रक्रिया", "वैज्ञानिकदृष्ट्या विकसित फॉर्म्युलेशन्स", "शेतकरी-केंद्रित दृष्टिकोन", "कठोर गुणवत्ता नियंत्रण", "शाश्वत कृषी उपाय"],
    detailsHeading: "तपशील",
    companyName: "काली इंडस्ट्रीज",
    phoneLabel: "फोन नंबर",
    emailLabel: "ईमेल",
    addressLabel: "कार्यालयाचा पत्ता",
    address: "सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
  },
  hi: {
    heading: "काली इंडस्ट्रीज",
    para1: "काली इंडस्ट्रीज में, हम किसानों को फसल उत्पादकता, मिट्टी के स्वास्थ्य और टिकाऊ खेती प्रथाओं को बेहतर बनाने में मदद करने वाले उच्च-गुणवत्ता वाले कृषि समाधान प्रदान करने के लिए प्रतिबद्ध हैं। हमारी कंपनी आधुनिक कृषि की बदलती जरूरतों को पूरा करने के लिए डिज़ाइन किए गए उन्नत उर्वरक, जैव-उर्वरक, सूक्ष्म पोषक तत्व, पौध वृद्धि प्रवर्तक और कृषि इनपुट उत्पादों के निर्माण और आपूर्ति में विशेषज्ञ है।",
    para2: "गुणवत्ता, नवाचार और किसान संतुष्टि पर मजबूत फोकस के साथ, हमारा लक्ष्य वैज्ञानिक रूप से विकसित फॉर्मूलेशन प्रदान करना है जो फसल प्रदर्शन को बढ़ाते हैं और दीर्घकालिक कृषि विकास का समर्थन करते हैं।",
    para3: "हमारी उत्पादन प्रक्रियाएं सख्त गुणवत्ता मानकों का पालन करती हैं, जिससे हर खेती की स्थिति के लिए विश्वसनीय और प्रभावी उत्पाद सुनिश्चित होते हैं। निरंतर अनुसंधान, आधुनिक तकनीक और ग्राहक-केंद्रित सेवा के माध्यम से, हम कृषि उद्योग में एक विश्वसनीय नाम बनने का प्रयास करते हैं।",
    missionHeading: "हमारा मिशन",
    mission: "किसानों को नवोन्मेषी और उच्च-प्रदर्शन वाले कृषि उत्पादों के साथ सशक्त बनाना जो उत्पादकता, लाभप्रदता और स्थिरता में सुधार करते हैं।",
    visionHeading: "हमारी दृष्टि",
    vision: "गुणवत्ता, नवाचार और आधुनिक खेती के प्रति प्रतिबद्धता के लिए मान्यता प्राप्त एक अग्रणी कृषि समाधान कंपनी बनना।",
    productRangeHeading: "हमारी उत्पाद श्रृंखला",
    products: ["कीटनाशक", "पीड़कनाशी", "खरपतवारनाशी", "पौध वृद्धि प्रवर्तक", "बीज उत्पादन और प्रसंस्करण"],
    whyChooseHeading: "हमें क्यों चुनें",
    whyChoose: ["प्रीमियम गुणवत्ता वाले उत्पाद", "उन्नत विनिर्माण प्रक्रियाएं", "वैज्ञानिक रूप से विकसित फॉर्मूलेशन", "किसान-केंद्रित दृष्टिकोण", "सख्त गुणवत्ता नियंत्रण", "टिकाऊ कृषि समाधान"],
    detailsHeading: "विवरण",
    companyName: "काली इंडस्ट्रीज",
    phoneLabel: "फ़ोन नंबर",
    emailLabel: "ईमेल",
    addressLabel: "कार्यालय का पता",
    address: "सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
  },
};

function About() {
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <>
      <div style={styles.container}>

        {/* HERO SECTION */}
        <div style={styles.heroSection}>
          <div style={styles.left}>
            <h1 style={styles.heading}>{t.heading}</h1>

            <p style={styles.text}>{t.para1}</p>

            <p style={styles.text}>{t.para2}</p>

            <p style={styles.text}>{t.para3}</p>
          </div>

          <div style={styles.right}>
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
              alt="farm"
              style={styles.image}
            />
          </div>
        </div>

        {/* MISSION & VISION */}
        <div style={styles.featureSection}>
          <h2 style={styles.subHeading}>{t.missionHeading}</h2>
          <p style={styles.visionText}>{t.mission}</p>

          <h2 style={styles.subHeading}>{t.visionHeading}</h2>
          <p style={styles.visionText}>{t.vision}</p>
        </div>

        {/* PRODUCT RANGE */}
        <div style={styles.featureSection}>
          <h2 style={styles.subHeading}>{t.productRangeHeading}</h2>

          <div style={styles.cardContainer}>
            {t.products.map((item, index) => (
              <div key={index} style={styles.card}>{item}</div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div style={styles.featureSection}>
          <h2 style={styles.subHeading}>{t.whyChooseHeading}</h2>

          <div style={styles.cardContainer}>
            {t.whyChoose.map((item, index) => (
              <div key={index} style={styles.card}>{item}</div>
            ))}
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div style={styles.visionSection}>
          <h2 style={styles.subHeading}>{t.detailsHeading}</h2>
          <p style={styles.visionText}>
            <b>{t.companyName}</b><br />
            {t.phoneLabel}: 7030056556<br />
            {t.emailLabel}: nutrient0009@gmail.com<br />
            {t.addressLabel}: {t.address}
          </p>
        </div>

      </div>

      <Footer />
    </>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "60px 8%",
    boxSizing: "border-box",
  },

  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap",
    marginBottom: "80px",
  },

  left: { flex: 1, minWidth: "300px" },
  right: { flex: 1, minWidth: "300px", textAlign: "center" },

  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },

  heading: {
    fontSize: "45px",
    color: "#2e7d32",
    marginBottom: "25px",
  },

  text: {
    fontSize: "18px",
    lineHeight: "32px",
    color: "#444",
    marginBottom: "15px",
  },

  featureSection: {
    marginBottom: "70px",
  },

  subHeading: {
    textAlign: "center",
    fontSize: "34px",
    color: "#2e7d32",
    marginBottom: "30px",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    fontWeight: "500",
  },

  visionSection: {
    background: "#e8f5e9",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
  },

  visionText: {
    fontSize: "18px",
    lineHeight: "32px",
    color: "#333",
    maxWidth: "900px",
    margin: "auto",
  },
};

export default About;