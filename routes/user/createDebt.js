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
  let {includingMe,debtors, amount} = req.body;
  let perPersonAmount
  if(includingMe){
    perPersonAmount= amount / (debtors.length+1);
  }else{
    perPersonAmount= amount / (debtors.length);
  }
  const result = await User.findById(req.user._id);
  let debtorObject = result.amountsToCollect||{};
  let payableObject,result1

  //debtor is a person who need to pay back money to someone
  console.log(debtorObject)
  for (let i = 0; i < debtors.length; i++) {
    if(debtorObject[debtors[i]]){
      debtorObject[debtors[i]]=debtorObject[debtors[i]]+perPersonAmount
    }else{
      debtorObject[debtors[i]]=perPersonAmount
    }
  }

  result.amountsToCollect=debtorObject
  for(let userId in debtorObject){
    result1=await User.findByIdAndUpdate(userId)
    payableObject = result1.payableAmount||{};

  //debtor is a person who need to pay back money to someone
  console.log(payableObject)
  for (let i = 0; i < debtors.length; i++) {
    if(debtors[i]!=result1._id){
      if(payableObject[result._id]){
        payableObject[result._id]=payableObject[result._id]+perPersonAmount
      }else{
        payableObject[result._id]=perPersonAmount
      }
    }
  }
  result1.payableAmount=payableObject
  result1.markModified("payableAmount")
  await result1.save()
  }
  result.markModified("amountsToCollect")
  // result1.payableAmount=payableObject
  // result1.markModified("payableAmount")
  // await result1.save()
  res.send(await result.save());
});

module.exports = router;
