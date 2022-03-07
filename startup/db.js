const mysql = require("mysql2/promise");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "easypg",
  password: "password",
});

module.exports = pool;
