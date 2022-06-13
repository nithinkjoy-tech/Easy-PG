const express = require("express");
const router = express.Router();
// const {Admin}=require("../../models/admin");
const findUser = require("../../utils/findUser");

router.post("/", async (req, res) => {
  let {userId} = req.body;
  console.log(userId,"uid");
  let user = await findUser(userId);
  console.log(user,"ur");
  if (!user) return res.status(400).send("UserId and Password doesn't Match");

  // let validPassword = await bcrypt.compare(req.body.password, admin.password);
  // if (!validPassword) return res.status(400).send("UserId and Password doesn't Match");

  if (req.body.password !== user.password)
    return res.status(400).send("UserId and Password doesn't Match");
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
