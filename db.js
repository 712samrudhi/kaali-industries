require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "nutrient",
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.log("DB Connection Failed ❌", err);
    } else {
        console.log("DB Connected Successfully ✅");
    }
});

module.exports = db;