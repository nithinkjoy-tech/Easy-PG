const mysql = require("mysql2/promise");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "easypg",
  password: "password",
});

pool
  .query("select 1+1 as Solution")
  .then(() => console.log("connected to database"))
  .catch(err => console.log(err.sqlMessage));

module.exports = pool;
