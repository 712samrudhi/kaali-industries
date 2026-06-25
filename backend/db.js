require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.log("DB Connection Failed ❌", err);
        console.log("HOST:", process.env.DB_HOST);
        console.log("USER:", process.env.DB_USER);
        console.log("DB:", process.env.DB_NAME);
    } else {
        console.log("DB Connected Successfully ✅");
    }
});

module.exports = db;