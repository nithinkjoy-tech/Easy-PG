const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.mongoDBKey,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));
};
