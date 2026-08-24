// src/Pages/About.jsx

import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const texts = {
  en: {
    badge: "Trusted Agricultural Partner",
    heading: "Kaali Industries",
    para1: "At Kaali Industries, we are committed to delivering high-quality agricultural solutions that help farmers improve crop productivity, soil health, and sustainable farming practices. Our company specializes in the manufacturing and supply of advanced fertilizers, bio-fertilizers, micronutrients, plant growth promoters, and agricultural input products designed to meet the evolving needs of modern agriculture.",
    para2: "With a strong focus on quality, innovation, and farmer satisfaction, we aim to provide scientifically developed formulations that enhance crop performance and support long-term agricultural growth.",
    para3: "Our production processes follow strict quality standards, ensuring reliable and effective products for every farming condition. Through continuous research, modern technology, and customer-focused service, we strive to become a trusted name in the agricultural industry.",
    missionVisionEyebrow: "Purpose & Direction",
    missionHeading: "Our Mission",
    mission: "To empower farmers with innovative and high-performance agricultural products that improve productivity, profitability, and sustainability.",
    visionHeading: "Our Vision",
    vision: "To become a leading agricultural solutions company recognized for quality, innovation, and commitment to modern farming.",
    productEyebrow: "What We Offer",
    productRangeHeading: "Our Product Range",
    products: ["Insecticide", "Pesticide", "Herbicide", "Plant Growth Promoters", "Seeds Production & Processing"],
    whyChooseEyebrow: "Our Strength",
    whyChooseHeading: "Why Choose Us",
    whyChoose: ["Premium Quality Products", "Advanced Manufacturing Processes", "Scientifically Developed Formulations", "Farmer-Centric Approach", "Strict Quality Control", "Sustainable Agricultural Solutions"],
    contactEyebrow: "Get In Touch",
    detailsHeading: "Details",
    companyName: "Kaali Industries",
    phoneLabel: "Phone Number",
    emailLabel: "Email",
    addressLabel: "Office Address",
    address: "C1-303, Sun Empire, Sun City Road, Sinhgad Road, Pune - 411051",
  },
  mr: {
    badge: "विश्वासार्ह कृषी भागीदार",
    heading: "काली इंडस्ट्रीज",
    para1: "काली इंडस्ट्रीजमध्ये, आम्ही शेतकऱ्यांना पीक उत्पादकता, मातीचे आरोग्य आणि शाश्वत शेती पद्धती सुधारण्यास मदत करणारे उच्च-गुणवत्तेचे कृषी उपाय पुरवण्यास कटिबद्ध आहोत. आमची कंपनी आधुनिक शेतीच्या बदलत्या गरजा पूर्ण करण्यासाठी डिझाइन केलेली प्रगत खते, जैव-खते, सूक्ष्म पोषक तत्वे, वनस्पती वाढ प्रवर्तक आणि कृषी निविष्ठा उत्पादनांच्या निर्मिती आणि पुरवठ्यात विशेष कौशल्य आहे.",
    para2: "गुणवत्ता, नवोपक्रम आणि शेतकऱ्यांच्या समाधानावर मजबूत लक्ष केंद्रित करून, आम्ही पिकाची कामगिरी वाढवणारी आणि दीर्घकालीन कृषी वाढीला आधार देणारी वैज्ञानिकदृष्ट्या विकसित फॉर्म्युलेशन्स पुरवण्याचे उद्दिष्ट ठेवतो.",
    para3: "आमच्या उत्पादन प्रक्रिया कठोर गुणवत्ता मानकांचे पालन करतात, ज्यामुळे प्रत्येक शेती परिस्थितीसाठी विश्वासार्ह आणि प्रभावी उत्पादने सुनिश्चित होतात. सतत संशोधन, आधुनिक तंत्रज्ञान आणि ग्राहक-केंद्रित सेवेद्वारे, आम्ही कृषी उद्योगात एक विश्वासार्ह नाव बनण्याचा प्रयत्न करतो.",
    missionVisionEyebrow: "उद्दिष्ट आणि दिशा",
    missionHeading: "आमचे ध्येय",
    mission: "उत्पादकता, नफा आणि शाश्वतता सुधारणाऱ्या नाविन्यपूर्ण आणि उच्च-कार्यक्षम कृषी उत्पादनांसह शेतकऱ्यांना सक्षम करणे.",
    visionHeading: "आमची दृष्टी",
    vision: "गुणवत्ता, नवोपक्रम आणि आधुनिक शेतीसाठी वचनबद्धतेसाठी ओळखली जाणारी अग्रगण्य कृषी उपाय कंपनी बनणे.",
    productEyebrow: "आम्ही काय देतो",
    productRangeHeading: "आमची उत्पादन श्रेणी",
    products: ["कीटकनाशक", "कीडनाशक", "तणनाशक", "वनस्पती वाढ प्रवर्तक", "बियाणे उत्पादन आणि प्रक्रिया"],
    whyChooseEyebrow: "आमची ताकद",
    whyChooseHeading: "आम्हाला का निवडावे",
    whyChoose: ["प्रीमियम गुणवत्तेची उत्पादने", "प्रगत उत्पादन प्रक्रिया", "वैज्ञानिकदृष्ट्या विकसित फॉर्म्युलेशन्स", "शेतकरी-केंद्रित दृष्टिकोन", "कठोर गुणवत्ता नियंत्रण", "शाश्वत कृषी उपाय"],
    contactEyebrow: "संपर्क साधा",
    detailsHeading: "तपशील",
    companyName: "काली इंडस्ट्रीज",
    phoneLabel: "फोन नंबर",
    emailLabel: "ईमेल",
    addressLabel: "कार्यालयाचा पत्ता",
    address: "सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
  },
  hi: {
    badge: "विश्वसनीय कृषि साझेदार",
    heading: "काली इंडस्ट्रीज",
    para1: "काली इंडस्ट्रीज में, हम किसानों को फसल उत्पादकता, मिट्टी के स्वास्थ्य और टिकाऊ खेती प्रथाओं को बेहतर बनाने में मदद करने वाले उच्च-गुणवत्ता वाले कृषि समाधान प्रदान करने के लिए प्रतिबद्ध हैं। हमारी कंपनी आधुनिक कृषि की बदलती जरूरतों को पूरा करने के लिए डिज़ाइन किए गए उन्नत उर्वरक, जैव-उर्वरक, सूक्ष्म पोषक तत्व, पौध वृद्धि प्रवर्तक और कृषि इनपुट उत्पादों के निर्माण और आपूर्ति में विशेषज्ञ है।",
    para2: "गुणवत्ता, नवाचार और किसान संतुष्टि पर मजबूत फोकस के साथ, हमारा लक्ष्य वैज्ञानिक रूप से विकसित फॉर्मूलेशन प्रदान करना है जो फसल प्रदर्शन को बढ़ाते हैं और दीर्घकालिक कृषि विकास का समर्थन करते हैं।",
    para3: "हमारी उत्पादन प्रक्रियाएं सख्त गुणवत्ता मानकों का पालन करती हैं, जिससे हर खेती की स्थिति के लिए विश्वसनीय और प्रभावी उत्पाद सुनिश्चित होते हैं। निरंतर अनुसंधान, आधुनिक तकनीक और ग्राहक-केंद्रित सेवा के माध्यम से, हम कृषि उद्योग में एक विश्वसनीय नाम बनने का प्रयास करते हैं।",
    missionVisionEyebrow: "उद्देश्य और दिशा",
    missionHeading: "हमारा मिशन",
    mission: "किसानों को नवोन्मेषी और उच्च-प्रदर्शन वाले कृषि उत्पादों के साथ सशक्त बनाना जो उत्पादकता, लाभप्रदता और स्थिरता में सुधार करते हैं।",
    visionHeading: "हमारी दृष्टि",
    vision: "गुणवत्ता, नवाचार और आधुनिक खेती के प्रति प्रतिबद्धता के लिए मान्यता प्राप्त एक अग्रणी कृषि समाधान कंपनी बनना।",
    productEyebrow: "हम क्या प्रदान करते हैं",
    productRangeHeading: "हमारी उत्पाद श्रृंखला",
    products: ["कीटनाशक", "पीड़कनाशी", "खरपतवारनाशी", "पौध वृद्धि प्रवर्तक", "बीज उत्पादन और प्रसंस्करण"],
    whyChooseEyebrow: "हमारी ताकत",
    whyChooseHeading: "हमें क्यों चुनें",
    whyChoose: ["प्रीमियम गुणवत्ता वाले उत्पाद", "उन्नत विनिर्माण प्रक्रियाएं", "वैज्ञानिक रूप से विकसित फॉर्मूलेशन", "किसान-केंद्रित दृष्टिकोण", "सख्त गुणवत्ता नियंत्रण", "टिकाऊ कृषि समाधान"],
    contactEyebrow: "संपर्क करें",
    detailsHeading: "विवरण",
    companyName: "काली इंडस्ट्रीज",
    phoneLabel: "फ़ोन नंबर",
    emailLabel: "ईमेल",
    addressLabel: "कार्यालय का पता",
    address: "सी1-303, सन एम्पायर, सन सिटी रोड, सिंहगड रोड, पुणे - 411051",
  },
};

/* ---------- Color / type tokens ---------- */
const C = {
  forest: "#1B4332",
  forestDark: "#0F2C21",
  crop: "#40916C",
  cropSoft: "#8FBFA0",
  soil: "#7A4A1F",
  soilSoft: "#A9713D",
  gold: "#DFA43B",
  parchment: "#FBF7EF",
  paper: "#F3EEE1",
  ink: "#26261F",
  inkSoft: "#5C594D",
  line: "#E4DCC8",
};
const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', -apple-system, 'Segoe UI', sans-serif";

/* ---------- Small inline icon set (no external deps) ---------- */
const Icon = {
  Sprout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6Z" />
      <path d="M12 13c0-3.2-2.4-5.2-6-5.2C6 11.6 8.4 13 12 13Z" />
    </svg>
  ),
  Target: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  ),
  Bug: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="8" y="9" width="8" height="10" rx="4" />
      <path d="M12 9V6M9 6l-2-2M15 6l2-2M6 12H3M21 12h-3M6 17l-2 2M18 17l2 2" />
    </svg>
  ),
  ShieldDrop: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M12 8c1.4 1.8 2 3 2 4a2 2 0 1 1-4 0c0-1 .6-2.2 2-4Z" />
    </svg>
  ),
  LeafSlash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20c8-1 12-6 13-15-9 1-13 6-13 15Z" />
      <path d="M6 18C10 13 13 9 17 5" />
    </svg>
  ),
  TrendUp: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 17l6-6 4 4 8-9" />
      <path d="M15 6h6v6" />
    </svg>
  ),
  Grain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3c2 2 2 4 0 6-2-2-2-4 0-6Z" />
      <path d="M12 9c2.5 2 2.5 4.5 0 7-2.5-2.5-2.5-5 0-7Z" />
      <path d="M12 16c2.5 2 2.5 3.5 0 5-2.5-1.5-2.5-3 0-5Z" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  ),
};

const productIcons = [Icon.Bug, Icon.ShieldDrop, Icon.LeafSlash, Icon.TrendUp, Icon.Grain];

/* ---------- Furrow divider — the page's signature motif ---------- */
function Furrow({ tone = C.line, flip = false }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: 24,
        display: "block",
        transform: flip ? "scaleY(-1)" : "none",
      }}
      aria-hidden="true"
    >
      <path
        d="M0 20 Q 50 4 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
        fill="none"
        stroke={tone}
        strokeWidth="1.5"
      />
      <path
        d="M0 28 Q 50 12 100 28 T 200 28 T 300 28 T 400 28 T 500 28 T 600 28 T 700 28 T 800 28 T 900 28 T 1000 28 T 1100 28 T 1200 28"
        fill="none"
        stroke={tone}
        strokeWidth="1"
        opacity="0.55"
      />
    </svg>
  );
}

function Eyebrow({ children, dark }) {
  return (
    <div style={{ ...styles.eyebrow, color: dark ? C.gold : C.soil }}>
      <Icon.Sprout style={{ width: 14, height: 14 }} />
      <span>{children}</span>
    </div>
  );
}

function About() {
  const { lang } = useLanguage();
  const t = texts[lang];

  useEffect(() => {
    if (document.getElementById("ki-about-fonts")) return;
    const link = document.createElement("link");
    link.id = "ki-about-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{globalCss}</style>

      <div style={styles.page}>
        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroFurrowBg} aria-hidden="true" />
          <div style={styles.heroInner}>
            <div className="ki-fade" style={{ flex: "1 1 420px", minWidth: 300 }}>
              <Eyebrow>{t.badge}</Eyebrow>
              <h1 style={styles.heading}>{t.heading}</h1>
              <p style={styles.text}>{t.para1}</p>
              <p style={styles.text}>{t.para2}</p>
              <p style={styles.text}>{t.para3}</p>
            </div>

            <div className="ki-fade" style={{ flex: "1 1 380px", minWidth: 300, animationDelay: "0.15s" }}>
              <div style={styles.imageWrap}>
                <div style={styles.imageBacker} aria-hidden="true" />
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
                  alt="Farmland at Kaali Industries"
                  className="ki-image"
                  style={styles.image}
                />
              </div>
            </div>
          </div>
        </section>

        <Furrow tone={C.line} />

        {/* MISSION & VISION */}
        <section style={styles.mvSection}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow dark>{t.missionVisionEyebrow}</Eyebrow>
          </div>
          <div style={styles.mvGrid}>
            <div className="ki-card ki-card--dark" style={styles.mvCard}>
              <div style={styles.mvIconWrap}>
                <Icon.Sprout style={{ width: 26, height: 26, color: C.gold }} />
              </div>
              <h2 style={styles.mvHeading}>{t.missionHeading}</h2>
              <p style={styles.mvText}>{t.mission}</p>
            </div>
            <div className="ki-card ki-card--dark" style={styles.mvCard}>
              <div style={styles.mvIconWrap}>
                <Icon.Target style={{ width: 26, height: 26, color: C.gold }} />
              </div>
              <h2 style={styles.mvHeading}>{t.visionHeading}</h2>
              <p style={styles.mvText}>{t.vision}</p>
            </div>
          </div>
        </section>

        {/* PRODUCT RANGE */}
        <section style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <Eyebrow>{t.productEyebrow}</Eyebrow>
            <h2 style={styles.subHeading}>{t.productRangeHeading}</h2>
          </div>

          <div style={styles.productGrid}>
            {t.products.map((item, index) => {
              const ProdIcon = productIcons[index % productIcons.length];
              return (
                <div key={index} className="ki-card" style={styles.productCard}>
                  <div style={styles.productIconWrap}>
                    <ProdIcon style={{ width: 24, height: 24, color: C.forest }} />
                  </div>
                  <span style={styles.productLabel}>{item}</span>
                </div>
              );
            })}
          </div>
        </section>

        <Furrow tone={C.line} />

        {/* WHY CHOOSE US */}
        <section style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <Eyebrow>{t.whyChooseEyebrow}</Eyebrow>
            <h2 style={styles.subHeading}>{t.whyChooseHeading}</h2>
          </div>

          <div style={styles.whyGrid}>
            {t.whyChoose.map((item, index) => (
              <div key={index} className="ki-why-row" style={styles.whyRow}>
                <span style={styles.whyCheck}>
                  <Icon.Check style={{ width: 14, height: 14 }} />
                </span>
                <span style={styles.whyText}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT DETAILS */}
        <section style={styles.contactSection}>
          <div style={styles.contactCard}>
            <Eyebrow>{t.contactEyebrow}</Eyebrow>
            <h2 style={{ ...styles.subHeading, textAlign: "left", marginBottom: 22 }}>{t.detailsHeading}</h2>

            <div style={styles.contactCompany}>{t.companyName}</div>

            <div style={styles.contactRow}>
              <Icon.Phone style={styles.contactIcon} />
              <div>
                <div style={styles.contactLabel}>{t.phoneLabel}</div>
                <div style={styles.contactValue}>7030056556</div>
              </div>
            </div>

            <div style={styles.contactRow}>
              <Icon.Mail style={styles.contactIcon} />
              <div>
                <div style={styles.contactLabel}>{t.emailLabel}</div>
                <div style={styles.contactValue}>nutrient0009@gmail.com</div>
              </div>
            </div>

            <div style={styles.contactRow}>
              <Icon.Pin style={styles.contactIcon} />
              <div>
                <div style={styles.contactLabel}>{t.addressLabel}</div>
                <div style={styles.contactValue}>{t.address}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

/* ---------- Global CSS (hover states, animation, responsive) ---------- */
const globalCss = `
  @keyframes kiFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ki-fade {
    animation: kiFadeUp 0.7s ease both;
  }
  .ki-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .ki-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(27,67,50,0.14);
    border-color: ${C.crop};
  }
  .ki-card--dark:hover {
    box-shadow: 0 14px 30px rgba(0,0,0,0.28);
    border-color: ${C.gold};
  }
  .ki-why-row {
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .ki-why-row:hover {
    background: #FFFFFF;
    border-color: ${C.crop};
  }
  .ki-image {
    transition: transform 0.5s ease;
  }
  .ki-image:hover {
    transform: scale(1.03);
  }
  @media (prefers-reduced-motion: reduce) {
    .ki-fade { animation: none; }
    .ki-card, .ki-image, .ki-why-row { transition: none; }
  }
  @media (max-width: 640px) {
    .ki-about-page h1 { font-size: 34px !important; }
  }
`;

/* ---------- Styles ---------- */
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: C.parchment,
    color: C.ink,
    fontFamily: FONT_BODY,
    overflowX: "hidden",
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: FONT_BODY,
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: 14,
  },

  /* Hero */
  hero: {
    position: "relative",
    padding: "76px 8% 56px",
  },
  heroFurrowBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `repeating-linear-gradient(120deg, ${C.paper} 0px, ${C.paper} 46px, transparent 46px, transparent 92px)`,
    opacity: 0.55,
    zIndex: 0,
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 56,
    flexWrap: "wrap",
    maxWidth: 1240,
    margin: "0 auto",
  },
  heading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: "clamp(34px, 5vw, 54px)",
    color: C.forest,
    lineHeight: 1.08,
    marginBottom: 22,
    letterSpacing: "-0.01em",
  },
  text: {
    fontSize: 16.5,
    lineHeight: 1.75,
    color: C.inkSoft,
    marginBottom: 14,
    maxWidth: 560,
  },
  imageWrap: {
    position: "relative",
    maxWidth: 480,
    margin: "0 auto",
  },
  imageBacker: {
    position: "absolute",
    top: 18,
    left: 18,
    width: "100%",
    height: "100%",
    background: C.gold,
    borderRadius: 18,
    zIndex: 0,
  },
  image: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: 18,
    border: `1px solid ${C.line}`,
    boxShadow: "0 18px 40px rgba(15,44,33,0.18)",
  },

  /* Mission / Vision */
  mvSection: {
    background: C.forestDark,
    backgroundImage: `radial-gradient(circle at 15% 20%, ${C.forest} 0%, ${C.forestDark} 60%)`,
    padding: "64px 8%",
  },
  mvGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
    maxWidth: 1000,
    margin: "0 auto",
  },
  mvCard: {
    background: "rgba(255,255,255,0.04)",
    border: `1px solid rgba(255,255,255,0.12)`,
    borderRadius: 16,
    padding: "32px 28px",
  },
  mvIconWrap: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "rgba(223,164,59,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  mvHeading: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  mvText: {
    fontSize: 15.5,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.72)",
  },

  /* Generic section */
  section: {
    padding: "64px 8%",
    maxWidth: 1160,
    margin: "0 auto",
  },
  subHeading: {
    textAlign: "center",
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: "clamp(26px, 3.4vw, 36px)",
    color: C.forest,
    margin: "4px 0 32px",
  },

  /* Product grid */
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 18,
  },
  productCard: {
    background: "#FFFFFF",
    border: `1px solid ${C.line}`,
    borderRadius: 14,
    padding: "26px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 14,
  },
  productIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: C.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: C.ink,
  },

  /* Why choose us */
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
  },
  whyRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: C.paper,
    border: `1px solid ${C.line}`,
    borderRadius: 12,
    padding: "16px 18px",
  },
  whyCheck: {
    flexShrink: 0,
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: C.crop,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  whyText: {
    fontSize: 15.5,
    fontWeight: 500,
    color: C.ink,
  },

  /* Contact */
  contactSection: {
    padding: "16px 8% 88px",
  },
  contactCard: {
    maxWidth: 620,
    margin: "0 auto",
    background: "#FFFFFF",
    border: `1px solid ${C.line}`,
    borderTop: `4px solid ${C.soil}`,
    borderRadius: 16,
    padding: "36px 34px",
    boxShadow: "0 12px 30px rgba(27,67,50,0.08)",
  },
  contactCompany: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 22,
    color: C.forest,
    marginBottom: 20,
  },
  contactRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    padding: "14px 0",
    borderTop: `1px solid ${C.line}`,
  },
  contactIcon: {
    width: 20,
    height: 20,
    color: C.soil,
    marginTop: 2,
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: C.inkSoft,
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 16,
    color: C.ink,
    lineHeight: 1.55,
  },
};

export default About;