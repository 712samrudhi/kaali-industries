const mysql = require("mysql2");

const db = mysql.createPool({
    host: "srv1877.hstgr.io",
    user: "u108577261_nutrientuser",
    password: "Nutrient123456",
    database: "u108577261_nutrient",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("DB Connection Failed ❌", err);
    } else {
        console.log("DB Connected Successfully ✅");
        connection.release();
    }
});

module.exports = db;