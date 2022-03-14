const express=require("express")
const adminSignin=require("../routes/admin/signin")
const userSignin=require("../routes/user/signin")
const addUser=require("../routes/admin/addUser")
// const signup=require("../routes/signup")
// const forgot=require("../routes/forgot")
// const dashboard=require("../routes/dashboard")
// const changePassword=require("../routes/changePassword")

module.exports = function (app) {
  app.use(express.json())
  app.use("/api/admin/signin", adminSignin);
  // app.use("/api/admin/signup", signin);
  app.use("/api/admin/adduser", addUser);
  app.use("/api/user/signin", userSignin);
//   app.use("/api/signup", signup);
//   app.use("/api/forgot", forgot);
//   app.use("/api/dashboard", dashboard);
//   app.use("/api/changePassword", changePassword);
};
 