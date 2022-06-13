const express = require("express");
const moment = require("moment");
const _ = require("lodash");
const router = express.Router();
const auth = require("../../middleware/auth");
const {User} = require("../../models/user");
const {Transaction} = require("../../models/transaction");


router.get("/", [auth], async (req, res) => {
  const result = await User.find()
    .where("_id")
    .ne(req.user._id)
    .select({
      name: 1,
      username: 1,
      email: 1,
      address: 1,
      phoneNumber: 1,
      payableAmount: 1,
      amountsToCollect:1,
      credit: 1,
    })
    .lean();

  let payableAmountPresent=false
  result.forEach(element => {
    console.log(element,"el")
    if (element?.payableAmount) {
      if(_.has(element.payableAmount,req.user._id)){
        element.payableAmount = element?.payableAmount[req.user._id];
        payableAmountPresent=true
      }else{
        payableAmountPresent=true
        element.payableAmount=0
      }
    }
    if (element?.amountsToCollect) {
      element.amountsToCollect = element?.amountsToCollect[req.user._id];
    }
    if(!payableAmountPresent) element.payableAmount=0
  });

  // result.forEach(element => {
  // });
  console.log(result,"rs");
  res.send(result);
});

// router.get("/:id", [auth], async (req, res) => {
//   console.log(req.params.id);
//   const result = await Transaction.find().where("debtorId").eq(req.params.id).lean();
//   console.log(result,"rs")

//   res.send(result);
// });
router.get("/:id", [auth], async (req, res) => {
  console.log(req.params.id);
  //let output=[]
  const result = await Transaction.findById(req.params.id).select({repaymentDetails:1}).lean();
  console.log(result.repaymentDetails,"rs1")
  
  res.send(result.repaymentDetails);
});

router.get("/getmax/:id", [auth], async (req, res) => {
  console.log(req.params.id);
  const result = await Transaction.findById(req.params.id).select({repaymentDetails:1,amount:1}).lean();
  let paidAmount=0;
  result.repaymentDetails.forEach((element)=>{
    paidAmount+=element.amountPaid
  })
  console.log(result.amount,"m")
  res.send({maxAmount:result.amount-paidAmount});
});

router.put("/", [auth], async (req, res) => {
  let {userId, amountPaid, transactionId} = req.body;
  const result1 = await User.findById(userId);
  //console.log(result1,"r1")
  result1.payableAmount[req.user._id] = result1.payableAmount[req.user._id] - amountPaid;

  // if (result1.payableAmount[req.user._id] - amountPaid < 0)
  //   return res.status(400).send("check your amount");

  const result2 = await User.findById(req.user._id);
  result2.amountsToCollect[userId] = result2.amountsToCollect[userId] - amountPaid;

  result1.markModified("payableAmount");
  result1.save();
  result2.markModified("amountsToCollect");
  result2.save();

  let details = {
    date: moment().utcOffset(330).format("ddd, DD MMM YYYY HH:mm:ss [IST]"),
    amountPaid,
  };

  const transaction = await Transaction.findById(transactionId);
  let totalAmount=0
  transaction.repaymentDetails.forEach((obj)=>{
    console.log(obj.amountPaid,"oa")
    totalAmount+=obj.amountPaid
  })

  totalAmount+=amountPaid;
  console.log(totalAmount,transaction.amount,"k")
  if(totalAmount==transaction.amount){
    transaction.status="completed"
  }

  transaction.markModified("status")

  transaction.repaymentDetails.push(details)
  transaction.markModified("repaymentDetails","status");
  transaction.save()
  res.send("done");
});

router.delete("/",async(req,res)=>{
  
})

//?TODO:  store full transaction history

module.exports = router;
