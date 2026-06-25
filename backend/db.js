const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "auth-db1877.hstgr.io",
    user: "u108577261_nutrientuser",
    password: "Prasam&712",
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