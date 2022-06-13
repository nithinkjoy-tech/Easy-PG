const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Yup = require("yup");

const transactionSchema = new mongoose.Schema({
  debtorId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  payerId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    min: 1,
    max: 100000,
    required: true,
  },
  debtName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  repaymentDetails: {
    type: Array,
    default: [],
  },
  date: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);

exports.Transaction = Transaction;
