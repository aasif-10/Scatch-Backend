const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27107/scatch")
  .then(function () {
    console.log("DB Connected Successfully!");
  })
  .catch(function () {
    console.log(err);
  });

module.exports = mongoose.connection;
