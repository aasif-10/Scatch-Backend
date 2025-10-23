const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signinUser = async (req, res) => {
  let { email, password } = req.body;
  let userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.send("Account does'nt exist. Please sign up");
  }
  bcrypt.compare(password, userFound.password, function (err, result) {
    if (!result) {
      return res.send("Incorrect Password");
    }
    let token = jwt.sign({ email, userid: userFound._id }, process.env.JWT_KEY);
    res.cookie("token", token);
    res.send("You can login");
  });
};
