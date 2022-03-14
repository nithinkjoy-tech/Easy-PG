const {Admin} = require("../models/admin");

module.exports = async function (userId) {
  let user;
  userId = userId.toLowerCase();
  user = await Admin.findOne({
    email: userId,
  });

  if (!user) {
    user = await Admin.findOne().where("username").eq(userId)
  }
  
  return user;
};
