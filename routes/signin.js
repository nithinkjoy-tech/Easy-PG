const express = require("express");
const router = express.Router();
const connection = require("../startup/db");

// router.get("/",async(req, res)=>{
//     const [rows,fields]=await connection.query("select * from USER")
//     res.send(rows)
// })

router.post("/", async (req, res) => {
  let {_id, name, username, password, mobile} = req.body;
  let values = [_id, name, username, password, mobile, null, null];
  connection
    .query(`insert into USER values(?,?,?,?,?,?,?)`, values)
    .then(() => res.send("One row inserted"))
    .catch(err => res.send(err.sqlMessage));
});

module.exports = router;
