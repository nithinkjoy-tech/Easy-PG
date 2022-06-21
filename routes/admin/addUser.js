const express = require("express");
const router = express.Router();
const {User} = require("../../models/user");
const findUser = require("../../utils/findUser");

router.post("/", async (req, res) => {
  //   console.log(req.body, "bdy");
  let email = await User.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (email)
    return res.status(400).send({
      property: "email",
      msg: "Email Already Registered",
    });

  let username = await User.findOne({
    username: req.body.username.toLowerCase(),
  });

  if (username)
    return res.status(400).send({
      property: "username",
      msg: "Username Already Taken",
    });

  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).send({
      property: "confirmPassword",
      msg: "Passwords doesn't Match'",
    });

  user = new User(req.body);
  user = await user.save();
  res.send(user);
});

module.exports = router;
