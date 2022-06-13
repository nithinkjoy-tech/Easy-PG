const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {User} = require("../../models/user");
const {Transaction} = require("../../models/transaction");
const auth = require("../../middleware/auth");
const _ = require("lodash");

router.get("/:id", [auth], async (req, res) => {
  console.log(req.params.id,"idd");
  const result=await Transaction.find({debtorId:req.user._id ,payerId: req.params.id,status:"pending"}).sort({_id:-1}).lean()
  let repaymentAmount=0
  result.forEach((element1)=>{
      if(element1.repaymentDetails){
          element1.repaymentDetails.forEach((element2)=>{
            repaymentAmount+=element2.amountPaid
          })
      }
      element1["amountPaid"] = repaymentAmount
      element1["amountPending"]=element1.amount-repaymentAmount
      repaymentAmount=0
  })
  console.log(result,"kk");
  res.send(result)
});

module.exports = router;
