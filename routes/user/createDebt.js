const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {User} = require("../../models/user");
const auth = require("../../middleware/auth");
const _ = require("lodash");

router.get("/", [auth], async (req, res) => {
  const result = await User.find().where("username").ne(req.user.username).select({_id: 1}).lean();
  let users = [];
  for (const [key, value] of debtorObjectect.entries(result[0])) {
    users.push(value);
  }
  res.send(users);
});

router.post("/", [auth], async (req, res) => {
  let {debtors, amount} = req.body;
  let perPersonAmount = amount / (debtors.length+1);
  const result = await User.findById(req.user._id);
  let debtorObject = result.debt||{};

  //debtor is a person who need to pay back money to someone
  for (let i = 0; i < debtors.length; i++) {
    if(debtorObject[debtors[i]]){
      debtorObject[debtors[i]]=debtorObject[debtors[i]]+perPersonAmount
    }else{
      debtorObject[debtors[i]]=perPersonAmount
    }
  }

  result.debtors=debtorObject
  result.markModified("debt")
  
  res.send(await result.save());
});

module.exports = router;
