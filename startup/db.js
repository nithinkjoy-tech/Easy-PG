const mongoose = require("mongoose");

module.exports = () => {
  console.log(process.env.mongoDBKey);
  mongoose
    .connect(process.env.mongoDBKey, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Something went wrong, check your connection or MongoDB URL"));
};
