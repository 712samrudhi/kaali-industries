const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "u108577261_nutrientuser",
    password: "Nutrient@07",
    database: "u108577261_nutrient",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.log("DB Connection Failed ❌", err);
    } else {
        console.log("DB Connected Successfully ✅");
    }
});

module.exports = db;