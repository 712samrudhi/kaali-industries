// src/config.js

// Localhost var test kartana automatically localhost backend use hoईl.
// Live site (nutrientfert.com / www.nutrientfert.com) var automatically live backend use hoईl.

const BASE_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ?
    "http://localhost:5000" :
    "https://nutrientfert.com"; // <-- backend same domain var aahe

export default BASE_URL;