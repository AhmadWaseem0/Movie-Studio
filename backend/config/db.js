// // config/db.js
// const mysql = require("mysql2");

// const db = mysql.createPool({
//     // host: "localhost",
//     // user: "root",
//     // password: "",
//     // database: "moviestudio"

// });

// module.exports = db;

// const mysql = require("mysql2");

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
// });

// module.exports = db.promise();

// const mysql = require("mysql2");

// const db = mysql.createPool(process.env.MYSQL_URL);

// module.exports = db.promise();

const mysql = require("mysql2");

if (!process.env.MYSQL_URL) {
    console.error("❌ MYSQL_URL not found in environment variables");
    process.exit(1);
}

const db = mysql.createPool(process.env.MYSQL_URL);

module.exports = db.promise();