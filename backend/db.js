const mysql = require("mysql2");

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: "srv1877.hstgr.io",
        user: "u108577261_nutrientuser",
        password: "Nutrient123456",
        database: "u108577261_nutrient",
        port: 3306
    });

    db.connect((err) => {
        if (err) {
            console.log("DB Connection Failed ❌", err);
            setTimeout(handleDisconnect, 3000); // 3 sec मध्ये retry
        } else {
            console.log("DB Connected Successfully ✅");
        }
    });

    db.on("error", (err) => {
        console.error("DB Error:", err.message);
        if (err.code === "PROTOCOL_CONNECTION_LOST" ||
            err.code === "ECONNRESET" ||
            err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
            handleDisconnect(); // Auto reconnect
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = {
    query: (...args) => db.query(...args)
};